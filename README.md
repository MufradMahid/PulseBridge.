# PulseBridge 🫀

> **Better health understanding. Smarter next steps.**  
> A modern, multilingual healthcare education platform powered by Google Gemini AI.

PulseBridge is a full-stack healthcare education application designed to make health information easier to understand and access. It combines AI-assisted health explanations, interactive human anatomy learning, knowledge quizzes, and multilingual support in a single web experience.

**Live Demo:** https://pulse-bridge-86sm.vercel.app/

---

## 🌟 Design and User Experience

PulseBridge uses a modern sky-blue visual identity designed for a clean, accessible healthcare experience.

### Color Palette

- **Primary:** `#0284C7` — Sky Blue
- **Accent:** `#0EA5E9` — Light Blue
- **Background Tint:** `#E0F2FE` — Pale Blue
- **Surface:** `#F0F9FF` — Soft Sky
- **Text:** `#0C4A6E` — Deep Blue
- **Secondary Text:** `#334E68` — Slate

### Interface Design

- Liquid-glass-inspired surfaces with subtle blur and borders.
- Rounded cards and restrained shadows.
- Responsive layouts for desktop and mobile.
- Keyboard focus indicators.
- Motion-conscious interactions with support for reduced-motion preferences.

---

## 🚀 Key Features

### 1. AI Health Assistant

- Natural-language interaction for general health questions.
- Clear explanations of health topics.
- Multilingual responses.
- Loading and error handling for AI requests.
- Supporting web references when genuine search-grounding metadata is available.

### 2. Interactive Anatomy Explorer

- Visual exploration of human anatomy.
- Educational explanations of biological systems.
- Interactive learning designed to make anatomy easier to understand.

### 3. Knowledge Quizzes

- Multiple-choice educational questions.
- Answer feedback and score tracking.
- Self-paced learning.

### 4. Care Guidance

- General information about health concerns.
- Guidance on when to seek professional medical advice.
- Priority messaging for potentially life-threatening symptoms.

### 5. Multilingual Experience

PulseBridge is designed to support:

- English
- Bangla
- Urdu
- Japanese

The interface supports right-to-left layout for Urdu and left-to-right layout for English, Bangla, and Japanese.

---

## 🤖 Gemini AI Integration Architecture

### Server-Side API Requests

The application uses a backend integration to process AI requests. The configured Gemini API key should remain on the server and must never be exposed in frontend code.

The backend endpoints include:

- `/api/chat`
- `/api/anatomy-explain`
- `/api/care-guidance`

These endpoints are intended to connect the user interface with the AI service and return responses to the frontend.

### Google Gemini API

PulseBridge uses Google's Gemini API for AI-assisted health education.

The implementation uses the Google Gen AI SDK:

`@google/genai`

The exact model ID is determined by the model configured in the deployed application. Confirm the model name in the backend source code before documenting a specific version.

### Google Search Grounding

Where enabled and supported by the configured model, Google Search grounding can provide supporting web references.

Example configuration:

```typescript
tools: [{ googleSearch: {} }]
```

The application should display citations only when genuine grounding metadata is returned. It must not fabricate source titles, URLs, or claims of verification.

Search grounding can improve traceability, but it does not guarantee medical accuracy.

---

## 🛡️ Patient Safety

PulseBridge is designed for general health education, not medical diagnosis or treatment.

Its safety principles include:

- Clearly communicating the limitations of AI-generated information.
- Avoiding definitive medical diagnoses.
- Avoiding medication prescriptions and personalized dosage calculations.
- Encouraging consultation with qualified healthcare professionals.
- Prioritizing emergency assistance when serious warning signs are reported.

Potentially life-threatening symptoms, including severe chest pain, severe difficulty breathing, sudden stroke-like symptoms, uncontrolled bleeding, or loss of consciousness, require urgent attention.

Emergency contact information should be appropriate to the user's actual location and verified before use.

---

## 🌍 Multilingual and Regional Support

| Language | Layout | Regional considerations |
|---|---|---|
| English | LTR | Emergency information must match the user's location. |
| Urdu | RTL | Urdu text and right-to-left layout support. |
| Bangla | LTR | Bangla text and appropriate typography. |
| Japanese | LTR | Japanese text and appropriate typography. |

Language selection is maintained for the active browser session using `sessionStorage`, where implemented.

The application should not infer a user's country solely from their selected language.

---

## 🔐 Privacy and Security

PulseBridge follows a privacy-conscious implementation approach.

- Keep API credentials in server-side environment variables.
- Never commit API keys or `.env` files to the repository.
- Avoid unnecessary persistent storage of health conversations.
- Avoid logging full health-related messages.
- Validate user input before sending requests to AI services.
- Handle API errors without exposing secrets or sensitive internal details.

These practices should be confirmed against the actual code and hosting configuration before being described as fully implemented.

---

## 🧰 Technology Stack

The project uses the following technologies where configured in the current implementation:

| Component | Technology |
|---|---|
| Frontend | React and TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Backend | Node.js and Express |
| AI integration | Google Gemini API |
| SDK | `@google/genai` |
| Search grounding | Google Search grounding, when enabled |
| Deployment | Vercel |

Verify this list against `package.json`, the server code, and the deployment configuration.

---

## 🏗️ System Architecture

```text
User
  |
  v
PulseBridge Web Interface
  |
  v
Backend API
  |
  +---- /api/chat
  |
  +---- /api/anatomy-explain
  |
  +---- /api/care-guidance
  |
  v
Google Gemini API
  |
  +---- AI-generated response
  |
  +---- Grounding metadata, when available
  |
  v
Backend response
  |
  v
User Interface
```

The frontend handles user interaction and presentation. The backend handles request validation, API communication, and response processing.

---

## 🧪 Testing and Current Status

**Project status: Deployed and operational, according to the latest production verification reported by the developer.**

The live application is available at:

https://pulse-bridge-86sm.vercel.app/

| Test area | Status |
|---|---|
| Live website availability | Deployed |
| Gemini AI responses | Reported working in production |
| Input validation | Retain the previous passing result only if tests have been rerun or verified. |
| Missing API key handling | Retain the previous passing result only if verified against the current code. |
| Emergency-warning handling | Retain the previous passing result only if verified. |
| Multilingual behavior | Verify each supported language on the live application. |
| Search grounding and citations | Verify that actual grounding metadata and source links are returned. |
| Automated test suite | Record the latest test run and actual result. |
| Mobile and desktop usability | Verify on the deployed application. |

The previous sandbox environment encountered a Gemini HTTP 429 quota error. This is a historical sandbox issue and should not be presented as a current production failure if the live deployment now works.

Automated tests and successful AI responses do not, by themselves, establish clinical safety or medical validation.

---

## 🔑 Environment Configuration

The backend uses a Gemini API key configured through an environment variable:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

This is a placeholder, not a real credential.

### Local Configuration

1. Obtain a Gemini API key with access to the model configured in the application.
2. Configure `GEMINI_API_KEY` in the appropriate server-side environment.
3. For local development, use a local `.env` file if supported by the project.
4. For production, configure the secret through the hosting provider.
5. Never commit real credentials to GitHub.

Restart the application after changing environment variables if required by the runtime.

---

## 💻 Installation and Setup

### Prerequisites

- Node.js compatible with the project.
- npm.
- Git.
- A Gemini API key with access to the configured model.

### 1. Clone the Repository

Replace the placeholders with the actual repository URL and directory name.

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_DIRECTORY
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure the API Key

Set `GEMINI_API_KEY` in your local server environment or hosting provider's secret settings.

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Run Automated Tests

```bash
npm run test
```

### 6. Build for Production

```bash
npm run build
```

Use `npm start` only if the project defines that script in `package.json`.

Confirm all commands work from a fresh clone before relying on these instructions.

---

## 📸 Screenshots

Add screenshots captured from the actual deployed application to a `screenshots` folder in the repository.

Suggested files:

```text
screenshots/
├── dashboard.png
├── ai-chat.png
├── anatomy-explorer.png
└── quiz.png
```

### Dashboard

![PulseBridge dashboard](screenshots/dashboard.png)

### AI Health Assistant

![PulseBridge AI assistant](screenshots/ai-chat.png)

### Anatomy Explorer

![PulseBridge anatomy explorer](screenshots/anatomy-explorer.png)

### Knowledge Quiz

![PulseBridge quiz](screenshots/quiz.png)

Replace these example paths with actual screenshots committed to the repository so the images render correctly on GitHub.

---

## 🌐 Deployment

PulseBridge is deployed on Vercel.

**Live application:** https://pulse-bridge-86sm.vercel.app/

The production deployment should be tested after each significant update.

Recommended checks:

- Confirm the website loads successfully.
- Submit a question to the live AI assistant.
- Verify that the returned answer is displayed correctly.
- Test all supported languages.
- Test the anatomy and quiz features.
- Verify error handling when an API request fails.
- Confirm that private API credentials are not exposed to the browser.
- Test the layout on mobile and desktop.

---

## 🔭 Future Improvements

Potential improvements include:

- Expanding multilingual health-education content.
- Adding more anatomy topics and quizzes.
- Improving source evaluation and evidence transparency.
- Expanding automated and end-to-end testing.
- Conducting additional accessibility and security reviews.
- Improving resilience against API quota and availability issues.
- Adding more educational resources from reputable health authorities.

PulseBridge will remain an educational platform unless any future clinical functionality receives the appropriate validation and oversight.

---

## 👨‍💻 Team Contributions

### Solo Developer — [Your Full Name]

Responsible for the project work personally completed, including relevant areas such as:

- Project planning and requirements.
- Frontend implementation and UI design.
- Backend API development.
- Gemini AI integration.
- Multilingual interface implementation.
- Testing and debugging.
- Deployment and documentation.

Update this section to reflect your actual contributions.

---

## 🔗 Third-Party Services and Assets

- **Google Gemini API:** AI-assisted health explanations.
- **Google Search grounding:** Supporting web references when enabled and available.
- **Vercel:** Application hosting.
- **Anatomy illustrations and other visual assets:** Credit the original creator and include the applicable license or source.

Review the licensing terms of external assets before redistribution.

---

## ⚕️ Disclaimer

PulseBridge provides general educational information. It is not a substitute for professional medical advice, diagnosis, or treatment.

AI-generated information may be incomplete or inaccurate. Users should consult qualified healthcare professionals about medical concerns and contact local emergency services in an emergency.

---

**PulseBridge — Better health understanding. Smarter next steps.**
