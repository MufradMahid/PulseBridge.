import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getGenAIClient, CANDIDATE_GEMINI_MODELS } from '../src/utils/geminiClient';
import { ANATOMY_TOPICS } from '../src/utils/anatomyData';
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
    const { topicName, language = 'en', specificQuestion = '', demoMode = false } = req.body || {};
    const currentLang = (language as SupportedLanguage) || 'en';

    if (!topicName || typeof topicName !== 'string') {
      return res.status(400).json({ error: 'Topic name is required.' });
    }

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

    const fallbackExplanation = `### 🫀 ${tName} (${tSubtitle})
${tSummary}

**Core Biological Functions:**
${tFunctions.map((fn: string) => `• ${fn}`).join('\n')}

**Everyday Health Fact:**
${tFact}`;

    if (demoMode) {
      return res.status(200).json({
        topic: topic.id,
        explanation: fallbackExplanation,
        citations: [
          { title: 'MedlinePlus - Human Anatomy & Physiology', url: 'https://medlineplus.gov' },
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
            contents: `Explain human anatomy topic "${tName}" simply in plain words. Address: "${specificQuestion || 'Explain how it works in everyday terms'}".`,
            config: {
              systemInstruction: `You are PulseBridge Anatomy Educator. Explain human anatomy in simple, friendly words that anyone can understand. Avoid complex medical school jargon.`,
              temperature: 0.3,
            },
          });

          if (response.text) {
            return res.status(200).json({
              topic: topic.id,
              explanation: response.text,
              citations: [
                { title: 'MedlinePlus - Human Anatomy & Body Systems', url: 'https://medlineplus.gov' },
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
      topic: topic.id,
      explanation: fallbackExplanation,
      citations: [
        { title: 'MedlinePlus - Human Anatomy & Body Systems', url: 'https://medlineplus.gov' },
      ],
      isDemo: true,
    });
  } catch (error: any) {
    return res.status(200).json({
      topic: 'general',
      explanation: 'Educational anatomy guidance is available.',
      citations: [],
      isDemo: true,
    });
  }
}
