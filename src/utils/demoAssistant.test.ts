import { test } from 'node:test';
import assert from 'node:assert';
import { generateDemoResponse } from './demoAssistant.ts';

test('generates emergency guidance with local numbers when life-threatening symptoms reported in demo mode', () => {
  const enRes = generateDemoResponse('I have severe chest pain and cannot breathe', 'en', 'manual_demo');
  assert.strictEqual(enRes.isEmergencyAlert, true);
  assert.ok(enRes.text.includes('911'));
  assert.strictEqual(enRes.isDemo, true);

  const urRes = generateDemoResponse('سینے میں شدید درد اور سانس لینے میں دشواری ہے', 'ur', 'quota_exhausted');
  assert.strictEqual(urRes.isEmergencyAlert, true);
  assert.ok(urRes.text.includes('1122'));
  assert.strictEqual(urRes.isDemo, true);

  const bnRes = generateDemoResponse('হঠাৎ বুকে তীব্র ব্যথা ও শ্বাসকষ্ট হচ্ছে', 'bn', 'manual_demo');
  assert.strictEqual(bnRes.isEmergencyAlert, true);
  assert.ok(bnRes.text.includes('৯৯৯') || bnRes.text.includes('999'));

  const jaRes = generateDemoResponse('突然の激しい胸痛と呼吸困難があります', 'ja', 'manual_demo');
  assert.strictEqual(jaRes.isEmergencyAlert, true);
  assert.ok(jaRes.text.includes('119'));
});

test('generates structured symptom intake guide across languages', () => {
  const enRes = generateDemoResponse('Start symptom intake guide', 'en', 'manual_demo');
  assert.strictEqual(enRes.isEmergencyAlert, false);
  assert.ok(enRes.text.includes('Symptom Intake Guide'));
  assert.ok(enRes.text.includes('Onset & Chronology'));
  assert.strictEqual(enRes.isDemo, true);

  const urRes = generateDemoResponse('علامات کا جائزہ', 'ur', 'manual_demo');
  assert.ok(urRes.text.includes('علامات کا منظم جائزہ'));

  const bnRes = generateDemoResponse('লক্ষণ পর্যালোচনা', 'bn', 'manual_demo');
  assert.ok(bnRes.text.includes('লক্ষণ পর্যালোচনা'));

  const jaRes = generateDemoResponse('症状確認チェックシート', 'ja', 'manual_demo');
  assert.ok(jaRes.text.includes('症状確認チェックシート'));
});

test('generates doctor visit appointment preparation checklist across languages', () => {
  const enRes = generateDemoResponse('What questions should I ask my doctor at my appointment?', 'en', 'manual_demo');
  assert.ok(enRes.text.includes('Doctor Appointment Preparation Checklist'));
  assert.ok(enRes.text.includes('Differential Diagnosis'));

  const urRes = generateDemoResponse('ڈاکٹر سے ملاقات کی تیاری', 'ur', 'manual_demo');
  assert.ok(urRes.text.includes('ڈاکٹر سے معائنے کی تیاری'));

  const bnRes = generateDemoResponse('ডাক্তারের সাক্ষাতের প্রস্তুতি', 'bn', 'manual_demo');
  assert.ok(bnRes.text.includes('ডাক্তারের সাক্ষাতের প্রস্তুতি'));

  const jaRes = generateDemoResponse('医師の診察の準備', 'ja', 'manual_demo');
  assert.ok(jaRes.text.includes('医師の診察に向けた準備'));
});

test('explains blood pressure physiology without calling Gemini API', () => {
  const enRes = generateDemoResponse('Explain systolic vs diastolic blood pressure', 'en', 'quota_exhausted');
  assert.ok(enRes.text.includes('Systolic Blood Pressure'));
  assert.ok(enRes.text.includes('Diastolic Blood Pressure'));
  assert.strictEqual(enRes.isDemo, true);
  assert.strictEqual(enRes.demoReason, 'quota_exhausted');
});

test('explains emergency life-saving medicines and protocols across all languages', () => {
  const enRes = generateDemoResponse('What medicines can help in an emergency like aspirin, epipen or narcan?', 'en', 'manual_demo');
  assert.ok(enRes.text.includes('Essential Emergency Life-Saving Medicines'));
  assert.ok(enRes.text.includes('Chewable Aspirin'));
  assert.ok(enRes.text.includes('Epinephrine'));
  assert.ok(enRes.text.includes('Naloxone'));
  assert.ok(enRes.text.includes('Albuterol'));

  const urRes = generateDemoResponse('ایمرجنسی میں جان بچانے والی اہم ادویات اور اسپرین کا استعمال بتائیں', 'ur', 'manual_demo');
  assert.ok(urRes.text.includes('جان بچانے والی بنیادی ہنگامی ادویات'));
  assert.ok(urRes.text.includes('اسپرین'));
  assert.ok(urRes.text.includes('ایپی نیفرین'));

  const bnRes = generateDemoResponse('জরুরি অবস্থায় জীবন রক্ষাকারী ওষুধ এবং এপিপেন এর ব্যবহার বলুন', 'bn', 'manual_demo');
  assert.ok(bnRes.text.includes('জীবন রক্ষাকারী প্রধান জরুরি ওষুধ'));
  assert.ok(bnRes.text.includes('অ্যাসপিরিন'));
  assert.ok(bnRes.text.includes('এপিনেফ্রিন'));

  const jaRes = generateDemoResponse('緊急時に役立つ救命薬品とエピペンの使用法について', 'ja', 'manual_demo');
  assert.ok(jaRes.text.includes('救命のための主要な緊急医薬品'));
  assert.ok(jaRes.text.includes('アスピリン'));
  assert.ok(jaRes.text.includes('エピネフリン'));
});
