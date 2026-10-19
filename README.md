# PulseBridge 🫀

> **“Better health understanding. Smarter next steps.”**  
> *Modern Sky-Blue Healthcare Educational Platform powered by Gemini 3.8 Flash*

PulseBridge is a full-stack, multilingual healthcare educational application. It empowers patients, students, and curious individuals to demystify complex medical terminology, explore interactive human anatomy, take interactive knowledge quizzes, and navigate healthcare questions in their native language with evidence-based search grounding.

---

## 🌟 Modern Sky Blue Edition

- **Classy, Modern Sky Blue Palette**:
  - Sky Primary: `#0284C7` (Sky-600)
  - Sky Accent: `#0EA5E9` (Sky-500)
  - Sky Tint: `#E0F2FE` (Sky-100) & `#F0F9FF` (Sky-50)
  - Oceanic Deep Text: `#0C4A6E` (Sky-900) & Slate `#334E68`
- **Liquid-Glass Aesthetic**: Frosted glass cards (`backdrop-blur-md`), delicate sky-blue borders, gentle depth shadows, and consistent `rounded-3xl` corners.
- **Accessible & Motion-Conscious**: WCAG high-contrast compliance, `:focus-visible` outlines, and full support for `prefers-reduced-motion: reduce`.

---

## 🤖 Gemini AI Integration Architecture

### 1. Server-Side Execution Only
- The browser **never** connects directly to Gemini and **never** receives or stores the API key.
- All requests flow to the Express backend (`/api/chat`, `/api/anatomy-explain`, `/api/care-guidance`).
- Uses the official, currently supported `@google/genai` TypeScript SDK (v2.4.0) with model **`gemini-3.8-flash`**.

### 2. Google Search Grounding
- Configured via `tools: [{ googleSearch: {} }]`.
- When search results are returned, genuine `groundingChunks` metadata is extracted to provide real web sources with page titles, domain hosts, and direct URLs.
- **Strict Anti-Hallucination Rule**: If no grounding metadata is returned, an empty list is sent to the frontend; citations are never fabricated or simulated.

### 3. Patient Safety & Non-Diagnostic Boundaries
- The AI prompt explicitly enforces educational boundaries:
  - Not a substitute for a licensed physician or clinical diagnosis.
  - No drug prescribing or personalized dosage calculation.
  - Acknowledges uncertainty and encourages consulting a healthcare professional.
  - Automatically screens for acute emergency signs (chest pain, breathing difficulties, stroke signs, severe hemorrhage, loss of consciousness) and triggers high-priority emergency alerts immediately.

### 4. Health Data Privacy (No Persistent Storage)
- User chat messages and symptom concerns are kept strictly in ephemeral React state during the active browser session.
- No database storage, file persistence, or telemetry logging of user message bodies.
- Server logs only metadata (e.g. message character length and language code) to protect privacy.

---

## 🌍 Multilingual & Regional Emergency Support

PulseBridge provides native, natural translation and cultural layout adaptation for:
1. **English (USA)**:
   - Primary Emergency Hotline: **911**
   - Crisis & Mental Health Hotline: **988**
   - Layout: Left-to-Right (LTR)
2. **Urdu (اردو - پاکستان)**:
   - Primary Emergency Ambulance / Rescue: **1122 (Rescue 1122)**
   - Police Emergency: **15**
   - Layout: Right-to-Left (RTL) with Noto Nastaliq Urdu / Noto Sans Arabic typography
3. **Bangla (বাংলা - বাংলাদেশ)**:
   - Primary National Emergency: **999**
   - Government 24/7 Health Hotline: **16263 (স্বাস্থ্য বাতায়ন)**
   - Layout: Left-to-Right (LTR) with Noto Sans Bengali typography
4. **Japanese (日本語 - 日本)**:
   - Primary Emergency Ambulance / Fire: **119番 (救急・消防)**
   - Emergency Medical Consultation: **#7119 (救急安心センター)**
   - Layout: Left-to-Right (LTR) with Noto Sans JP typography

### Session Persistence
Language selection is persisted within the user's active session via `sessionStorage` (`pulsebridge_session_lang`), ensuring instant zero-flicker reload without requiring any external database.

---

## 🧪 Testing Results & Status

| Test Scenario | Status | Notes |
|---|---|---|
| **Input Validation (Empty / Whitespace)** | ✅ **Passed** | `/api/chat` rejects empty questions with HTTP 400. |
| **Input Validation (Length Limit > 2,000 chars)** | ✅ **Passed** | Oversized payloads rejected with HTTP 400 to prevent buffer abuse. |
| **Missing API Key Handling** | ✅ **Passed** | Server returns HTTP 503 with clear instructions to configure `GEMINI_API_KEY` in Settings > Secrets. |
| **Emergency Detection Triage** | ✅ **Passed** | Acute red flags (crushing chest pain, stroke symptoms) immediately trigger RED priority emergency alert. |
| **Unit & Integration Test Suite (`node:test`)** | ✅ **22/22 Passed** | 22 comprehensive tests pass in ~710ms across all 4 languages and country numbers. |
| **Real Country Emergency Data** | ✅ **Passed** | Verified 911/988 (USA), 1122/15 (Pakistan), 999/16263 (Bangladesh), 119/#7119 (Japan). |
| **RTL & LTR Dynamics** | ✅ **Passed** | Verified `dir="rtl"` for Urdu and `dir="ltr"` for English, Bangla, and Japanese. |
| **Live Gemini API Call** | ⚠️ **Quota Blocked (HTTP 429)** | In the sandbox project, the attached key hit `429 RESOURCE_EXHAUSTED`. Handled safely with clear retry UI and error status. |

---

## 🔑 Safe Configuration Guide

The application requires the server-side environment secret:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### In Google AI Studio:
1. Open the **Settings > Secrets** panel in the AI Studio sidebar.
2. Select or create an API key with active quota on model `gemini-3.8-flash`.
3. AI Studio automatically injects this secret into `process.env.GEMINI_API_KEY` on the server runtime.
4. Restart or reload the app to pick up the updated key.

---

## 🚀 Running the App

```bash
# 1. Install dependencies
npm install

# 2. Run test suites
npm run test

# 3. Start development server (Port 3000)
npm run dev

# 4. Build for production
npm run build && npm start
```
