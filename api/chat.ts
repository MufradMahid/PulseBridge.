import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getGenAIClient, CANDIDATE_GEMINI_MODELS } from '../src/utils/geminiClient';
import { detectEmergencySigns } from '../src/utils/safety';
import { generateDemoResponse } from '../src/utils/demoAssistant';
import type { SupportedLanguage } from '../src/types/index';

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  ur: 'Urdu (اردو)',
  bn: 'Bengali/Bangla (বাংলা)',
  ja: 'Japanese (日本語)',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS support for Vercel preview & production
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { message, conversationHistory = [], language = 'en', demoMode = false } = req.body || {};
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

    // If explicit Professional / Demo Mode is requested, serve verified scripted education directly
    if (demoMode) {
      const demo = generateDemoResponse(message, currentLang, 'manual_demo');
      return res.status(200).json({
        text: demo.text,
        reply: demo.text,
        content: demo.text,
        citations: demo.citations,
        isEmergency: demo.isEmergencyAlert,
        emergencyDetails: demo.emergencyDetails,
        isDemo: true,
        demoReason: 'manual_demo',
        mode: 'professional',
        language: currentLang,
      });
    }

    // 3. Check server-side API key configuration
    const { ai, apiKey, keySource } = getGenAIClient();
    if (!ai || !apiKey) {
      const demo = generateDemoResponse(message, currentLang, 'no_key');
      return res.status(200).json({
        text: demo.text,
        reply: demo.text,
        content: demo.text,
        citations: demo.citations,
        isEmergency: demo.isEmergencyAlert,
        emergencyDetails: demo.emergencyDetails,
        isDemo: true,
        demoReason: 'no_key',
        mode: 'professional',
        language: currentLang,
      });
    }

    // 4. Patient-friendly clinical educator system instruction (User-friendly, non-medical-school tone)
    const systemInstruction = `You are PulseBridge Health Companion, a warm, compassionate, patient-friendly health educator.
Your mission: Help everyday people understand health concerns, human anatomy, and medical terminology using simple, everyday words.
COMMUNICATION STYLE (VERY IMPORTANT):
- Use friendly, everyday conversational language that anyone can easily understand.
- Do NOT talk like a medical textbook or clinical professor.
- When explaining bodily processes, use simple everyday metaphors (e.g., comparing blood circulation to fresh oxygen delivery like a water delivery truck, or sleep cycles to a phone recharging battery).
- Keep advice empathetic, supportive, practical, and clear.
- Format with clean headings, short bullet points, and brief paragraphs so it is effortless to read on a mobile phone.
CRITICAL SAFETY & LINGUISTIC BOUNDARIES:
- You are an educational guide, NOT a doctor, diagnostic system, or prescribing tool.
- Never diagnose diseases, prescribe medicines, or promise treatment outcomes.
- If emergency red-flag symptoms are detected (such as sudden crushing chest pain, difficulty breathing, stroke signs, or uncontrolled bleeding), prioritize immediate emergency medical contact (911 USA/Canada, 1122 Pakistan, 999 Bangladesh/UK, 119 Japan).
- Respond directly in ${targetLangName}.
- Keep medical concepts 100% accurate while using warm, accessible vocabulary.`;

    // 5. Format recent conversation history
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

    // 6. Try calling available Gemini models (starting with free tier flash models)
    let generatedText = '';
    const citations: Array<{ title: string; url: string }> = [];
    let callSucceeded = false;
    let lastErrorMsg = '';

    for (const modelName of CANDIDATE_GEMINI_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction,
            temperature: 0.35,
          },
        });

        generatedText = response.text || '';

        // Extract real grounding metadata if present
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
                // Ignore URL parsing error
              }
            }
          }
        }

        callSucceeded = true;
        break; // Stop after first successful response
      } catch (err: any) {
        lastErrorMsg = err?.message || String(err);
        // Continue to next model if available
      }
    }

    if (callSucceeded && generatedText) {
      return res.status(200).json({
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
    }

    // 7. If API quota exhausted or permission denied, smoothly provide verified professional educational response
    let fallbackReason: 'quota_exhausted' | 'access_denied' | 'no_key' = 'quota_exhausted';
    if (lastErrorMsg.includes('403') || lastErrorMsg.includes('PERMISSION_DENIED') || lastErrorMsg.includes('denied access')) {
      fallbackReason = 'access_denied';
    } else if (lastErrorMsg.includes('429') || lastErrorMsg.includes('RESOURCE_EXHAUSTED')) {
      fallbackReason = 'quota_exhausted';
    }

    const demo = generateDemoResponse(message, currentLang, fallbackReason);
    return res.status(200).json({
      text: demo.text,
      reply: demo.text,
      content: demo.text,
      citations: demo.citations,
      isEmergency: demo.isEmergencyAlert,
      emergencyDetails: demo.emergencyDetails,
      isDemo: true,
      demoReason: fallbackReason,
      mode: 'professional',
      language: currentLang,
    });
  } catch (error: any) {
    const currentLang = (req.body?.language as SupportedLanguage) || 'en';
    const demo = generateDemoResponse(req.body?.message || '', currentLang, 'quota_exhausted');
    return res.status(200).json({
      text: demo.text,
      reply: demo.text,
      content: demo.text,
      citations: demo.citations,
      isEmergency: demo.isEmergencyAlert,
      isDemo: true,
      demoReason: 'quota_exhausted',
      mode: 'professional',
      language: currentLang,
    });
  }
}
