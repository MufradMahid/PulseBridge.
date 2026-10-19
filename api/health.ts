import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getGenAIClient } from '../src/utils/geminiClient';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (_req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { apiKey, keySource } = getGenAIClient();
  return res.status(200).json({
    status: 'ok',
    environment: 'vercel-serverless',
    hasApiKey: Boolean(apiKey),
    keyConfigured: Boolean(apiKey),
    keySource,
    model: 'gemini-2.5-flash',
    demoModeAvailable: true,
    professionalModeAvailable: true,
    timestamp: new Date().toISOString(),
  });
}
