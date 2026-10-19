import type { VercelRequest, VercelResponse } from '@vercel/node';
import chatHandler from './chat';
import healthHandler from './health';
import anatomyHandler from './anatomy-explain';
import careHandler from './care-guidance';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = req.url || '';

  if (url.includes('/chat')) {
    return chatHandler(req, res);
  }
  if (url.includes('/health')) {
    return healthHandler(req, res);
  }
  if (url.includes('/anatomy-explain')) {
    return anatomyHandler(req, res);
  }
  if (url.includes('/care-guidance')) {
    return careHandler(req, res);
  }

  return res.status(200).json({
    message: 'PulseBridge API is operational on Vercel.',
    endpoints: ['/api/chat', '/api/health', '/api/anatomy-explain', '/api/care-guidance'],
  });
}
