import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { detectEmergencySigns, evaluateCareTriage } from './src/utils/safety';
import { generateDemoResponse } from './src/utils/demoAssistant';
import { ANATOMY_TOPICS } from './src/utils/anatomyData';
import type { SupportedLanguage } from './src/types/index';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware for parsing JSON safely
app.use(express.json({ limit: '1mb' }));

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  ur: 'Urdu (اردو)',
  bn: 'Bengali/Bangla (বাংলা)',
  ja: 'Japanese (日本語)',
};

/**
 * Helper to obtain the active GoogleGenAI client per request.
 * Reads GEMINI_API_KEY or newapi dynamically from server environment secrets.
 * Never exposes the key string to client or logs.
 */
function getGenAIClient(): { ai: GoogleGenAI | null; apiKey: string; keySource: string } {
  // Support both canonical GEMINI_API_KEY and user-defined newapi secret
  const apiKey = process.env.GEMINI_API_KEY || process.env.newapi || '';
  const keySource = process.env.GEMINI_API_KEY ? 'GEMINI_API_KEY' : process.env.newapi ? 'newapi' : 'none';

  if (!apiKey) {
    return { ai: null, apiKey: '', keySource: 'none' };
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  return { ai, apiKey, keySource };
}

/**
 * Health check & configuration status endpoint.
 * Note: Never returns or exposes secret values.
 */
app.get('/api/health', (_req: Request, res: Response) => {
  const { apiKey, keySource } = getGenAIClient();
  res.json({
    status: 'ok',
    hasApiKey: Boolean(apiKey),
    keyConfigured: Boolean(apiKey),
    keySource,
    model: 'gemini-3.8-flash',
    demoModeAvailable: true,
    timestamp: new Date().toISOString(),
  });
});

/**
 * Chat Companion API endpoint.
 * - Supports both Live Gemini AI and Graceful Demo Mode.
 * - Handles API quota exhaustion (429) & permission denied (403) gracefully.
 * - Detects acute emergency warning signs first.
 * - Returns authentic educational content in English, Urdu, Bangla, and Japanese.
 */
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory = [], language = 'en', demoMode = false } = req.body;
    const currentLang = (language as SupportedLanguage) || 'en';

    // 1. Input Validation
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'A health or anatomy question is required.' });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        error: 'Message length exceeds allowable limit of 2,000 characters. Please provide a concise question.',
      });
    }

    // 2. Clinical emergency safety evaluation
    const emergencyCheck = detectEmergencySigns(message);
    const targetLangName = LANGUAGE_NAMES[currentLang] || 'English';

    // If explicit Demo Mode is requested, serve verified scripted education directly
    if (demoMode) {
      console.log(`[PulseBridge /api/chat] Serving request in Demo Mode. Lang: ${currentLang}`);
      const demo = generateDemoResponse(message, currentLang, 'manual_demo');
      return res.json({
        text: demo.text,
        reply: demo.text,
        content: demo.text,
        citations: demo.citations,
        isEmergency: demo.isEmergencyAlert,
        emergencyDetails: demo.emergencyDetails,
        isDemo: true,
        demoReason: 'manual_demo',
        mode: 'demo',
        language: currentLang,
      });
    }

    // 3. Check server-side API key configuration
    const { ai, apiKey, keySource } = getGenAIClient();
    if (!ai || !apiKey) {
      console.log(`[PulseBridge /api/chat] No API key present. Gracefully falling back to verified Demo Mode.`);
      const demo = generateDemoResponse(message, currentLang, 'no_key');
      return res.json({
        text: demo.text,
        reply: demo.text,
        content: demo.text,
        citations: demo.citations,
        isEmergency: demo.isEmergencyAlert,
        emergencyDetails: demo.emergencyDetails,
        isDemo: true,
        demoReason: 'no_key',
        mode: 'demo',
        language: currentLang,
      });
    }

    // 4. Privacy-safe audit log (message length only, no personal health text)
    console.log(`[PulseBridge /api/chat] Attempting Live Gemini call (Source: ${keySource}). Length: ${message.length}, Lang: ${currentLang}`);

    // 5. Patient-friendly clinical educator system instruction
    const systemInstruction = `You are PulseBridge Health Companion, a compassionate, accurate, patient-friendly medical educator.
PulseBridge Mission: Help people understand general health topics, explore human anatomy, and demystify complex medical terminology in plain language.
CRITICAL SAFETY & LINGUISTIC BOUNDARIES:
- You are an educational tool, NOT a doctor, diagnostic system, or emergency service.
- Never diagnose medical conditions, prescribe drugs, or calculate medication dosages.
- Always distinguish established general health facts from medical uncertainty.
- If emergency warning signs appear, advise immediate emergency care (calling 911 in USA, 1122 in Pakistan, 999 in Bangladesh, 119 in Japan).
- Respond directly in ${targetLangName}.
- Use natural, fluent, and respectful phrasing in ${targetLangName} rather than literal or awkward machine translation. Preserve medical meaning accurately.
- Keep citation titles and source names in their original source language, while explaining their relevance in ${targetLangName}.
- Format your response with clear headings, concise bullet points, and short paragraphs for patient readability.
- When Google Search grounding provides web citations, rely on verified medical consensus. Do NOT fabricate citations.`;

    // 6. Format recent conversation history
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(conversationHistory)) {
      const recent = conversationHistory.slice(-6);
      for (const item of recent) {
        if (item && item.role && item.content) {
          contents.push({
            role: item.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: String(item.content).slice(0, 1500) }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    try {
      // 7. Call Gemini 3.8 Flash
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contents,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
          temperature: 0.35,
        },
      });

      const generatedText = response.text || '';

      // 8. Extract real grounding metadata chunks (never fabricated)
      const citations: Array<{ title: string; url: string }> = [];
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

      if (Array.isArray(groundingChunks)) {
        for (const chunk of groundingChunks) {
          if (chunk && chunk.web && chunk.web.uri) {
            try {
              const parsedUrl = new URL(chunk.web.uri);
              citations.push({
                title: chunk.web.title || parsedUrl.hostname.replace(/^www\./, ''),
                url: chunk.web.uri,
              });
            } catch {
              // Ignore malformed URL
            }
          }
        }
      }

      return res.json({
        text: generatedText,
        reply: generatedText,
        content: generatedText,
        citations,
        isEmergency: emergencyCheck.isEmergency,
        matchedEmergencyCategories: emergencyCheck.matchedCategories,
        language: currentLang,
        isDemo: false,
        mode: 'live',
      });
    } catch (apiError: any) {
      const errorMsg = apiError?.message || '';
      console.warn(`[PulseBridge /api/chat] Live Gemini call returned: ${errorMsg.slice(0, 100)}. Falling back gracefully to Demo Mode.`);

      // Distinguish quota exhaustion, permission denied, or other errors
      let fallbackReason: 'quota_exhausted' | 'access_denied' | 'no_key' = 'quota_exhausted';
      if (errorMsg.includes('403') || errorMsg.includes('PERMISSION_DENIED') || errorMsg.includes('denied access')) {
        fallbackReason = 'access_denied';
      } else if (errorMsg.includes('429') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
        fallbackReason = 'quota_exhausted';
      }

      // Seamlessly generate verified educational content without breaking the user's workflow
      const demo = generateDemoResponse(message, currentLang, fallbackReason);

      return res.json({
        text: demo.text,
        reply: demo.text,
        content: demo.text,
        citations: demo.citations,
        isEmergency: demo.isEmergencyAlert,
        emergencyDetails: demo.emergencyDetails,
        isDemo: false,
        demoReason: fallbackReason,
        mode: 'live',
        language: currentLang,
      });
    }
  } catch (error: any) {
    const errorMsg = error?.message || '';
    console.error(`[PulseBridge /api/chat unexpected error]: ${errorMsg.slice(0, 120)}`);

    // In extreme unexpected error, provide demo safety fallback instead of crash
    const currentLang = (req.body?.language as SupportedLanguage) || 'en';
    const demo = generateDemoResponse(req.body?.message || '', currentLang, 'quota_exhausted');

    return res.json({
      text: demo.text,
      reply: demo.text,
      content: demo.text,
      citations: demo.citations,
      isEmergency: demo.isEmergencyAlert,
      isDemo: true,
      demoReason: 'quota_exhausted',
      mode: 'demo',
      language: currentLang,
    });
  }
});

/**
 * Anatomy Deep Dive API endpoint
 */
app.post('/api/anatomy-explain', async (req: Request, res: Response) => {
  try {
    const { topicName, category, language = 'en', specificQuestion = '', demoMode = false } = req.body;
    const currentLang = (language as SupportedLanguage) || 'en';

    if (!topicName || typeof topicName !== 'string') {
      return res.status(400).json({ error: 'Topic name is required.' });
    }

    // Helper to generate rich verified educational breakdown from local knowledge base
    const getFallbackAnatomyExplanation = (reason: 'quota_exhausted' | 'access_denied' | 'no_key' | 'manual_demo') => {
      const topic = ANATOMY_TOPICS.find(
        (t) =>
          t.id.toLowerCase() === topicName.toLowerCase() ||
          t.name.en.toLowerCase() === topicName.toLowerCase() ||
          t.name.ur.toLowerCase() === topicName.toLowerCase() ||
          t.name.bn.toLowerCase() === topicName.toLowerCase() ||
          t.name.ja.toLowerCase() === topicName.toLowerCase()
      ) || ANATOMY_TOPICS[0];

      const tName = topic.name[currentLang] || topic.name.en;
      const tSubtitle = topic.subtitle[currentLang] || topic.subtitle.en;
      const tSummary = topic.summary[currentLang] || topic.summary.en;
      const tFunctions = topic.keyFunctions[currentLang] || topic.keyFunctions.en;
      const tFact = topic.educationalFact[currentLang] || topic.educationalFact.en;

      let explanation = '';
      if (currentLang === 'ur') {
        explanation = `### 🫀 ساخت اور جائزہ (Overview & Structure)
**${tName}** (${tSubtitle})
${tSummary}

### ⚙️ فعلیاتی نظام اور طریقہ کار (Physiological Mechanisms)
${tFunctions.map((fn) => `- ${fn}`).join('\n')}

### 📖 کلینیکل اصطلاحات کی آسان وضاحت (Key Medical Terms)
${topic.clinicalPlainPairs.map((p) => `- **${p.medical}:** ${p.plain[currentLang] || p.plain.en}`).join('\n')}

### 💡 اہم طبی نکتہ (Clinical Takeaway)
${tFact}

*تنبیہ: یہ معلومات صرف تعلیمی مقصد کے لیے ہیں، کسی بیماری کی باقاعدہ تشخیص یا علاج کے لیے اپنے مستند معالج سے رجوع کریں۔*`;
      } else if (currentLang === 'bn') {
        explanation = `### 🫀 গঠন ও সামগ্রিক বিবরণ (Overview & Structure)
**${tName}** (${tSubtitle})
${tSummary}

### ⚙️ শারীরবৃত্তীয় কার্যপদ্ধতি (Physiological Mechanisms)
${tFunctions.map((fn) => `- ${fn}`).join('\n')}

### 📖 জটিল মেডিকেল শব্দের সহজ ব্যাখ্যা (Key Medical Terms)
${topic.clinicalPlainPairs.map((p) => `- **${p.medical}:** ${p.plain[currentLang] || p.plain.en}`).join('\n')}

### 💡 গুরুত্বপূর্ণ চিকিৎসাবিজ্ঞান তথ্য (Clinical Takeaway)
${tFact}

*সতর্কতা: এই তথ্য শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে তৈরি। কোনো রোগের নির্দিষ্ট চিকিৎসা বা নির্দেশনার জন্য বিশেষজ্ঞ চিকিৎসকের পরামর্শ নিন।*`;
      } else if (currentLang === 'ja') {
        explanation = `### 🫀 解剖学的構造と概要 (Overview & Structure)
**${tName}**（${tSubtitle}）
${tSummary}

### ⚙️ 生理学的メカニズムと働き (Physiological Mechanisms)
${tFunctions.map((fn) => `- ${fn}`).join('\n')}

### 📖 専門用語のわかりやすい解説 (Key Medical Terms)
${topic.clinicalPlainPairs.map((p) => `- **${p.medical}:** ${p.plain[currentLang] || p.plain.en}`).join('\n')}

### 💡 臨床的ハイライト (Clinical Takeaway)
${tFact}

*注意：本内容は教育目的の情報提供であり、疾患の診断や治療を代替するものではありません。健康上の不安は医師にご相談ください。*`;
      } else {
        explanation = `### 🫀 Overview & Anatomical Architecture
**${tName}** (${tSubtitle})
${tSummary}

### ⚙️ Physiological Mechanisms & Hemodynamics
${tFunctions.map((fn) => `- ${fn}`).join('\n')}

### 📖 Key Medical Terms Explained Simply
${topic.clinicalPlainPairs.map((p) => `- **${p.medical}:** ${p.plain.en}`).join('\n')}

### 💡 Clinical Takeaway & Homeostasis
${tFact}

*Notice: This anatomical breakdown is designed for educational literacy and does not constitute a diagnostic medical evaluation.*`;
      }

      return {
        explanation,
        citations: [
          { title: 'MedlinePlus - Human Anatomy & Physiology Guide', url: 'https://medlineplus.gov' },
          { title: 'National Institutes of Health (NIH) - Science of Anatomy', url: 'https://www.nih.gov' },
        ],
        topicName: tName,
        language: currentLang,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    };

    // If Demo Mode requested explicitly, return verified breakdown directly
    if (demoMode) {
      return res.json(getFallbackAnatomyExplanation('manual_demo'));
    }

    const { ai, apiKey } = getGenAIClient();
    if (!ai || !apiKey) {
      return res.json(getFallbackAnatomyExplanation('no_key'));
    }

    const targetLangName = LANGUAGE_NAMES[currentLang] || 'English';

    const systemInstruction = `You are a clinical anatomist and medical educator for PulseBridge.
Provide an engaging, crystal-clear explanation of the anatomical structure "${topicName}" (${category || 'human anatomy'}).
Guidelines:
- Explain what it is, its physiological mechanisms, why it is vital, and how it connects to the circulatory network.
- Translate key medical terms into everyday concepts and analogies.
- Respond in ${targetLangName}.
- Keep structure clean with sections: "Overview & Structure", "How It Works (Physiology)", "Key Medical Terms Explained", and "Clinical Takeaway".
- Do not make clinical diagnoses.`;

    const userPrompt = specificQuestion
      ? `Explain "${topicName}" with a special focus on: ${specificQuestion}`
      : `Provide a detailed, patient-accessible anatomical and physiological breakdown of "${topicName}".`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
          temperature: 0.3,
        },
      });

      const generatedText = response.text || '';
      const citations: Array<{ title: string; url: string }> = [];
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

      if (Array.isArray(groundingChunks)) {
        for (const chunk of groundingChunks) {
          if (chunk && chunk.web && chunk.web.uri) {
            try {
              const parsedUrl = new URL(chunk.web.uri);
              citations.push({
                title: chunk.web.title || parsedUrl.hostname.replace(/^www\./, ''),
                url: chunk.web.uri,
              });
            } catch {
              // Ignore malformed URL
            }
          }
        }
      }

      return res.json({
        explanation: generatedText,
        citations,
        topicName,
        language: currentLang,
        isDemo: false,
        mode: 'live',
      });
    } catch (apiErr: any) {
      console.warn(`[PulseBridge /api/anatomy-explain] Gemini API returned error: ${apiErr?.message?.slice(0, 80)}. Falling back to verified educational breakdown.`);
      return res.json(getFallbackAnatomyExplanation('quota_exhausted'));
    }
  } catch (error: any) {
    console.error(`[PulseBridge /api/anatomy-explain error]:`, error);
    const currentLang = (req.body?.language as SupportedLanguage) || 'en';
    const fallback = ANATOMY_TOPICS[0];
    return res.json({
      explanation: fallback.summary[currentLang] || fallback.summary.en,
      citations: [],
      topicName: req.body?.topicName || 'Anatomy',
      language: currentLang,
      isDemo: true,
      demoReason: 'quota_exhausted',
      mode: 'demo',
    });
  }
});

/**
 * Care Guidance Triage API endpoint
 */
app.post('/api/care-guidance', async (req: Request, res: Response) => {
  try {
    const { concern, language = 'en', demoMode = false } = req.body;
    const currentLang = (language as SupportedLanguage) || 'en';

    if (!concern || typeof concern !== 'string' || !concern.trim()) {
      return res.status(400).json({ error: 'Health concern description is required.' });
    }

    if (concern.length > 2000) {
      return res.status(400).json({ error: 'Description exceeds 2,000 characters limit.' });
    }

    // 1. Run deterministic rule-based safety evaluation
    const triage = evaluateCareTriage(concern, currentLang);

    // If critical emergency detected, return immediate emergency protocol without delaying for LLM
    if (triage.isEmergency) {
      return res.json({
        triage,
        aiGuidance: null,
        citations: [],
        isEmergency: true,
        isDemo: demoMode,
      });
    }

    // 2. If non-emergency, enrich with clinical educational context
    let aiGuidance = '';
    const citations: Array<{ title: string; url: string }> = [];

    // Helper for educational guidance fallback
    const getFallbackGuidance = () => {
      const guidance = triage.guidanceText[currentLang] || triage.guidanceText.en;
      if (currentLang === 'ur') {
        return `### 🩺 عمومی کلینیکل رہنمائی
${guidance.bannerBody}

**ڈاکٹر سے مشورے کے لیے اہم سوالات:**
${guidance.doctorQuestions.map((q) => `- ${q}`).join('\n')}

**انتباہی علامات (Red Flags):**
${guidance.redFlags.map((r) => `- ${r}`).join('\n')}`;
      } else if (currentLang === 'bn') {
        return `### 🩺 সাধারণ স্বাস্থ্য পরামর্শ
${guidance.bannerBody}

**চিকিৎসকের সাথে আলোচনার মূল বিষয়:**
${guidance.doctorQuestions.map((q) => `- ${q}`).join('\n')}

**বিপদচিহ্নসমূহ (Red Flags):**
${guidance.redFlags.map((r) => `- ${r}`).join('\n')}`;
      } else if (currentLang === 'ja') {
        return `### 🩺 一般的な医療アドバイス
${guidance.bannerBody}

**医師に質問すべき主要事項:**
${guidance.doctorQuestions.map((q) => `- ${q}`).join('\n')}

**注意すべき危険兆候（レッドフラッグ）:**
${guidance.redFlags.map((r) => `- ${r}`).join('\n')}`;
      } else {
        return `### 🩺 Educational Clinical Guidance
${guidance.bannerBody}

**Key Questions to Explore with Your Doctor:**
${guidance.doctorQuestions.map((q) => `- ${q}`).join('\n')}

**Red Flag Symptoms to Monitor:**
${guidance.redFlags.map((r) => `- ${r}`).join('\n')}`;
      }
    };

    if (demoMode) {
      return res.json({
        triage,
        aiGuidance: getFallbackGuidance(),
        citations: [
          { title: 'MedlinePlus - When to Contact Your Healthcare Provider', url: 'https://medlineplus.gov' },
        ],
        isDemo: true,
      });
    }

    const { ai, apiKey } = getGenAIClient();
    if (ai && apiKey) {
      try {
        const targetLangName = LANGUAGE_NAMES[currentLang] || 'English';
        const systemInstruction = `You are the PulseBridge Care Guidance educator.
The user is describing a health symptom or concern.
Your task:
- Provide cautious, supportive, educational guidance in ${targetLangName}.
- Explicitly state that you cannot diagnose conditions or prescribe medications.
- Explain general physiological mechanisms that can cause such sensations.
- Give practical suggestions for what to observe and discuss with their doctor.
- List red flags that should prompt seeking prompt medical care.
- Use a calm, reassuring, professional tone.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `Patient's concern: "${concern.slice(0, 500)}". Provide educational context and questions to ask their doctor in ${targetLangName}.`,
          config: {
            systemInstruction,
            tools: [{ googleSearch: {} }],
            temperature: 0.3,
          },
        });

        aiGuidance = response.text || '';

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (Array.isArray(groundingChunks)) {
          for (const chunk of groundingChunks) {
            if (chunk && chunk.web && chunk.web.uri) {
              try {
                const parsedUrl = new URL(chunk.web.uri);
                citations.push({
                  title: chunk.web.title || parsedUrl.hostname.replace(/^www\./, ''),
                  url: chunk.web.uri,
                });
              } catch {
                // Ignore malformed URL
              }
            }
          }
        }
      } catch (geminiErr: any) {
        console.warn('[PulseBridge Care Guidance] AI enrichment bypassed due to API error. Using verified safety guidance.');
        aiGuidance = getFallbackGuidance();
      }
    } else {
      aiGuidance = getFallbackGuidance();
    }

    return res.json({
      triage,
      aiGuidance,
      citations,
      isDemo: !ai || !apiKey,
    });
  } catch (error: any) {
    console.error(`[PulseBridge /api/care-guidance error]:`, error);
    const currentLang = (req.body?.language as SupportedLanguage) || 'en';
    const triage = evaluateCareTriage(req.body?.concern || '', currentLang);
    return res.json({
      triage,
      aiGuidance: triage.guidanceText[currentLang]?.bannerBody || '',
      citations: [],
      isDemo: true,
    });
  }
});

// Setup Vite middlewares in development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PulseBridge server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
