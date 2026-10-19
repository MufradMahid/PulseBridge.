import { GoogleGenAI } from '@google/genai';

export interface GenAIClientInfo {
  ai: GoogleGenAI | null;
  apiKey: string;
  keySource: string;
}

/**
 * Helper to obtain the active GoogleGenAI client per request.
 * Reads GEMINI_API_KEY or newapi dynamically from server environment secrets.
 * Never exposes the key string to client or logs.
 */
export function getGenAIClient(): GenAIClientInfo {
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

export const CANDIDATE_GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
];
