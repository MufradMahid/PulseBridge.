import test from 'node:test';
import assert from 'node:assert/strict';
import { detectEmergencySigns, evaluateCareTriage } from './safety.ts';
import { COUNTRY_EMERGENCY_DATA } from './emergencyData.ts';
import { translations, isRTL, getDir } from './i18n.ts';
import type { SupportedLanguage } from '../types/index.ts';

test('detects severe chest pain in English as an immediate medical emergency', () => {
  const result = detectEmergencySigns('I have been experiencing crushing chest pain and pressure');
  assert.equal(result.isEmergency, true);
  assert.ok(result.matchedCategories.includes('chest_pain'));
});

test('detects emergency symptoms in Urdu (سینے میں درد)', () => {
  const result = detectEmergencySigns('مریض کو سینے میں درد اور سانس لینے میں دشواری ہے');
  assert.equal(result.isEmergency, true);
  assert.ok(result.matchedCategories.includes('chest_pain'));
});

test('detects emergency symptoms in Bangla (বুকে তীব্র ব্যথা ও শ্বাসকষ্ট)', () => {
  const result = detectEmergencySigns('হঠাৎ করে বুকে ব্যথা এবং শ্বাস নিতে পারছি না');
  assert.equal(result.isEmergency, true);
  assert.ok(result.matchedCategories.includes('chest_pain') || result.matchedCategories.includes('breathing'));
});

test('detects emergency symptoms in Japanese (胸の激しい痛み, 呼吸困難)', () => {
  const result = detectEmergencySigns('激しい息切れと胸の激しい痛みがあります');
  assert.equal(result.isEmergency, true);
  assert.ok(result.matchedCategories.includes('chest_pain') || result.matchedCategories.includes('breathing'));
});

test('detects stroke warning signs (facial droop and slurred speech)', () => {
  const result = detectEmergencySigns('Patient woke up with face drooping and slurred speech');
  assert.equal(result.isEmergency, true);
  assert.ok(result.matchedCategories.includes('stroke'));
});

test('classifies non-emergency mild symptoms safely as non-emergency', () => {
  const result = detectEmergencySigns('I have a mild tension headache from screen glare and feeling tired');
  assert.equal(result.isEmergency, false);
  assert.equal(result.matchedCategories.length, 0);

  const triage = evaluateCareTriage('I have a mild tension headache from screen glare and feeling tired', 'en');
  assert.equal(triage.isEmergency, false);
  assert.equal(triage.urgencyLevel, 'routine_educational');
  assert.ok(triage.guidanceText.en.actionSteps.length > 0);
});

test('identifies prompt consultation for high fever', () => {
  const triage = evaluateCareTriage('My child has high fever and persistent vomiting for 24 hours', 'en');
  assert.equal(triage.isEmergency, false);
  assert.equal(triage.urgencyLevel, 'prompt_consultation');
});

test('verifies real emergency numbers for Bangladesh (999 and 16263)', () => {
  const bd = COUNTRY_EMERGENCY_DATA.bn;
  assert.equal(bd.countryCode, 'BD');
  assert.equal(bd.primaryNumber, '999');
  assert.equal(bd.primaryTel, 'tel:999');
  assert.equal(bd.secondaryNumber, '16263');
  assert.equal(bd.secondaryTel, 'tel:16263');
  assert.ok(bd.warningSigns.length >= 6);
});

test('verifies real emergency numbers for Pakistan (1122 and 15)', () => {
  const pk = COUNTRY_EMERGENCY_DATA.ur;
  assert.equal(pk.countryCode, 'PK');
  assert.equal(pk.primaryNumber, '1122');
  assert.equal(pk.primaryTel, 'tel:1122');
  assert.equal(pk.secondaryNumber, '15');
  assert.equal(pk.secondaryTel, 'tel:15');
  assert.ok(pk.warningSigns.length >= 6);
});

test('verifies real emergency numbers for Japan (119 and #7119)', () => {
  const jp = COUNTRY_EMERGENCY_DATA.ja;
  assert.equal(jp.countryCode, 'JP');
  assert.equal(jp.primaryNumber, '119');
  assert.equal(jp.primaryTel, 'tel:119');
  assert.equal(jp.secondaryNumber, '#7119');
  assert.equal(jp.secondaryTel, 'tel:7119');
  assert.ok(jp.warningSigns.length >= 6);
});

test('verifies real emergency numbers for USA (911 and 988)', () => {
  const us = COUNTRY_EMERGENCY_DATA.en;
  assert.equal(us.countryCode, 'US');
  assert.equal(us.primaryNumber, '911');
  assert.equal(us.primaryTel, 'tel:911');
  assert.equal(us.secondaryNumber, '988');
  assert.equal(us.secondaryTel, 'tel:988');
  assert.ok(us.warningSigns.length >= 6);
});

test('verifies direction and RTL logic for all 4 supported languages', () => {
  const langs: SupportedLanguage[] = ['en', 'ur', 'bn', 'ja'];
  for (const lang of langs) {
    if (lang === 'ur') {
      assert.equal(isRTL(lang), true);
      assert.equal(getDir(lang), 'rtl');
    } else {
      assert.equal(isRTL(lang), false);
      assert.equal(getDir(lang), 'ltr');
    }
  }
});

test('verifies full translation completeness for all 4 languages', () => {
  const langs: SupportedLanguage[] = ['en', 'ur', 'bn', 'ja'];
  for (const lang of langs) {
    const dict = translations[lang];
    assert.ok(dict.appName, `${lang} missing appName`);
    assert.ok(dict.tagline, `${lang} missing tagline`);
    assert.ok(dict.home.welcomeTitle, `${lang} missing welcomeTitle`);
    assert.ok(dict.home.welcomeSubtitle, `${lang} missing welcomeSubtitle`);
    assert.ok(dict.home.welcomeMission, `${lang} missing welcomeMission`);
    assert.ok(dict.home.welcomeEvidence, `${lang} missing welcomeEvidence`);
    assert.ok(dict.home.valuesTitle, `${lang} missing valuesTitle`);
    assert.ok(dict.nav.home, `${lang} missing nav.home`);
    assert.ok(dict.nav.chat, `${lang} missing nav.chat`);
    assert.ok(dict.nav.anatomy, `${lang} missing nav.anatomy`);
    assert.ok(dict.nav.quiz, `${lang} missing nav.quiz`);
    assert.ok(dict.nav.care, `${lang} missing nav.care`);
  }
});
