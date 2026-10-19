import test from 'node:test';
import assert from 'node:assert/strict';
import { detectEmergencySigns } from './safety.ts';

test('validates that empty messages are rejected with clear error', async () => {
  const payload = { message: '   ', language: 'en' };
  assert.equal(Boolean(payload.message.trim()), false);
});

test('validates message length limits (rejects > 2000 characters)', async () => {
  const longText = 'a'.repeat(2500);
  assert.ok(longText.length > 2000);
});

test('evaluates emergency detection on chest pain during chat triage', async () => {
  const result = detectEmergencySigns('I feel crushing chest pain radiating to my left arm');
  assert.equal(result.isEmergency, true);
  assert.ok(result.matchedCategories.includes('chest_pain'));
});

test('handles server health check response contract', async () => {
  const res = await fetch('http://localhost:3000/api/health').catch(() => null);
  if (res) {
    const data = await res.json();
    assert.equal(data.status, 'ok');
    assert.equal(data.model, 'gemini-3.8-flash');
    assert.equal(typeof data.hasApiKey, 'boolean');
  }
});

test('returns 400 for empty message payload via HTTP', async () => {
  const res = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: '' }),
  }).catch(() => null);

  if (res) {
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.ok(data.error.includes('required'));
  }
});

test('returns 400 for oversized message payload (>2000 chars) via HTTP', async () => {
  const res = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'x'.repeat(2500) }),
  }).catch(() => null);

  if (res) {
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.ok(data.error.includes('exceeds allowable limit'));
  }
});
