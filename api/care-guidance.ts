import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getGenAIClient, CANDIDATE_GEMINI_MODELS } from '../src/utils/geminiClient';
import { evaluateCareTriage } from '../src/utils/safety';
import type { SupportedLanguage } from '../src/types/index';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    const { concern = '', language = 'en', demoMode = false } = req.body || {};
    const currentLang = (language as SupportedLanguage) || 'en';

    if (!concern || typeof concern !== 'string' || !concern.trim()) {
      return res.status(400).json({ error: 'A health concern description is required.' });
    }

    const triage = evaluateCareTriage(concern, currentLang);
    const guidance = triage.guidanceText[currentLang] || triage.guidanceText.en;

    const fallbackGuidance = `### 🩺 Educational Health Guidance
${guidance.bannerBody}

**Helpful Questions for Your Doctor:**
${guidance.doctorQuestions.map((q) => `• ${q}`).join('\n')}

**Red Flag Symptoms to Watch For:**
${guidance.redFlags.map((r) => `• ${r}`).join('\n')}`;

    if (demoMode) {
      return res.status(200).json({
        triage,
        aiGuidance: fallbackGuidance,
        citations: [
          { title: 'MedlinePlus - When to Contact Your Doctor', url: 'https://medlineplus.gov' },
        ],
        isDemo: true,
      });
    }

    const { ai, apiKey } = getGenAIClient();
    if (ai && apiKey) {
      for (const modelName of CANDIDATE_GEMINI_MODELS) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: `Patient's concern: "${concern.slice(0, 500)}". Provide compassionate, simple, educational guidance and helpful questions to ask a doctor in ${currentLang}.`,
            config: {
              systemInstruction: `You are PulseBridge Care Guidance educator. Use friendly everyday words, never diagnose, and help patients prepare for productive doctor visits.`,
              temperature: 0.3,
            },
          });

          if (response.text) {
            return res.status(200).json({
              triage,
              aiGuidance: response.text,
              citations: [
                { title: 'MedlinePlus - Health Topics & Symptoms', url: 'https://medlineplus.gov' },
              ],
              isDemo: false,
            });
          }
        } catch {
          // Continue to next model or fallback
        }
      }
    }

    return res.status(200).json({
      triage,
      aiGuidance: fallbackGuidance,
      citations: [
        { title: 'MedlinePlus - Health Topics & Symptoms', url: 'https://medlineplus.gov' },
      ],
      isDemo: true,
    });
  } catch (error: any) {
    const currentLang = (req.body?.language as SupportedLanguage) || 'en';
    const triage = evaluateCareTriage(req.body?.concern || '', currentLang);
    return res.status(200).json({
      triage,
      aiGuidance: triage.guidanceText[currentLang]?.bannerBody || '',
      citations: [],
      isDemo: true,
    });
  }
}
