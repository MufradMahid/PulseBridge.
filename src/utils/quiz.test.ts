import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateQuizScore, QUIZ_QUESTIONS } from './quizData.ts';

test('calculates perfect quiz score correctly', () => {
  const perfectAnswers: Record<number, number> = {};
  for (const q of QUIZ_QUESTIONS) {
    perfectAnswers[q.id] = q.correctIndex;
  }
  const result = calculateQuizScore(perfectAnswers);
  assert.equal(result.score, 5);
  assert.equal(result.total, 5);
  assert.equal(result.percentage, 100);
  assert.equal(result.isPerfect, true);
});

test('calculates partial quiz score correctly', () => {
  // Give correct answer only for question 1 and 2
  const partialAnswers: Record<number, number> = {
    1: QUIZ_QUESTIONS[0].correctIndex,
    2: QUIZ_QUESTIONS[1].correctIndex,
    3: 999, // wrong
    4: 999, // wrong
    5: 999, // wrong
  };
  const result = calculateQuizScore(partialAnswers);
  assert.equal(result.score, 2);
  assert.equal(result.total, 5);
  assert.equal(result.percentage, 40);
  assert.equal(result.isPerfect, false);
});

test('verifies all 5 questions contain full translations in all 4 languages', () => {
  const languages = ['en', 'ur', 'bn', 'ja'] as const;
  assert.equal(QUIZ_QUESTIONS.length, 5);

  for (const q of QUIZ_QUESTIONS) {
    for (const lang of languages) {
      assert.ok(q.question[lang], `Question ${q.id} missing text for ${lang}`);
      assert.equal(q.options[lang].length, 4, `Question ${q.id} must have 4 options for ${lang}`);
      assert.ok(q.explanation[lang], `Question ${q.id} missing explanation for ${lang}`);
    }
  }
});
