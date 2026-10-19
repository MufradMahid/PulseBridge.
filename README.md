# PulseBridge 🫀


### Better health understanding. Smarter next steps.

**PulseBridge** is an AI-powered healthcare education platform designed to help people better understand health-related information, explore the human body, and find sensible next steps through accessible, multilingual guidance.

🌐 **Live Demo:** https://pulse-bridge-86sm.vercel.app/

📦 **GitHub Repository:** https://github.com/MufradMahid/PulseBridge./tree/main

🎯 **Hackathon:** NYLP AI Hackathon 2026

👤 **Team:** PulseForge — Solo Developer

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Problem Statement](#-problem-statement)
- [Our Solution](#-our-solution)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [How AI Is Used](#-how-ai-is-used)
- [Responsible AI, Safety, and Privacy](#-responsible-ai-safety-and-privacy)
- [Supported Languages](#-supported-languages)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Testing and Build](#-testing-and-build)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Team Member Contributions](#-team-member-contributions)
- [Limitations and Future Improvements](#-limitations-and-future-improvements)
- [Disclaimer](#-disclaimer)
- [License](#-license)

---

## 🌍 About the Project

Understanding health information can be difficult, especially when information is complicated, unfamiliar, or unavailable in a person's preferred language.

PulseBridge aims to make health education easier to access and understand through an interactive web experience that combines AI-powered explanations, educational tools, and responsible health guidance.

The platform is designed to support health literacy—not to replace qualified healthcare professionals.

## ❗ Problem Statement

Many people struggle to understand health-related information because:

- Medical terminology can be difficult to understand.
- Reliable information can be hard to interpret without medical knowledge.
- Language barriers can make health education less accessible.
- People may be unsure when symptoms require professional attention.
- Traditional health information websites may offer limited interactive learning experiences.

These challenges can make it harder for people to understand health topics and prepare informed questions for healthcare professionals.

## 💡 Our Solution

PulseBridge brings healthcare education tools together in one accessible platform.

Users can ask health-related educational questions, explore anatomy, test their knowledge with quizzes, and receive guidance about sensible next steps.

AI-generated responses are intended to explain information in understandable language, communicate uncertainty, and encourage professional care when appropriate.

The goal is to help users become better informed—not to diagnose medical conditions.

---

## ✨ Key Features

### 🤖 AI-Powered Health Education

Ask health-related questions and receive AI-generated educational explanations designed to make complex information easier to understand.

### 🌐 Multilingual Experience

PulseBridge supports a multilingual experience, including English, Bangla, Urdu, and Japanese.

### 🫀 Interactive Anatomy Explorer

Explore educational information about human anatomy through an interactive learning experience.

### 🧠 Health Knowledge Quizzes

Use quizzes to reinforce learning and improve understanding of health-related topics.

### 🔎 Grounded Information Where Supported

Google Search grounding can be used with supported AI requests to help connect responses to web information. Source references should be displayed only when genuine grounding metadata is returned.

### 🩺 Responsible Care Guidance

The application is designed to encourage appropriate professional medical care and highlight potentially urgent situations rather than presenting itself as a diagnostic system.

### 📱 Modern User Experience

A responsive interface uses a sky-blue color palette and a liquid-glass-inspired visual style to create a clean, approachable healthcare education experience.

---

## 🛠️ Technology Stack

PulseBridge uses a web application architecture. Confirm package names and versions against the current repository before submission.

| Area                  | Technology                                              |
| --------------------- | ------------------------------------------------------- |
| Frontend              | React                                                   |
| Development and build | Vite                                                    |
| Styling               | Tailwind CSS                                            |
| Backend               | Node.js and Express                                     |
| AI provider           | Google Gemini API                                       |
| AI SDK                | `@google/genai`                                         |
| Search grounding      | Google Search grounding, where configured and supported |
| Deployment            | Vercel                                                  |
| Programming language  | JavaScript / JSX                                        |

The backend handles AI API requests so that the Gemini API key can remain server-side rather than being exposed in browser code.

---

## 🧠 How AI Is Used

PulseBridge integrates Google's Gemini API to generate health education responses and support selected educational features.

### AI Workflow

1. A user submits a health-related question or requests an educational explanation.
2. The frontend sends the request to the application backend.
3. The backend processes the request and calls the configured Gemini model.
4. Where enabled and supported, Google Search grounding can provide additional information for the response.
5. The application returns the result to the frontend for display.

### Backend API Endpoints

The following endpoints are documented for the application. Confirm that their names match the current backend implementation.

| Endpoint               | Purpose                                           |
| ---------------------- | ------------------------------------------------- |
| `/api/chat`            | AI-powered health education conversations         |
| `/api/anatomy-explain` | Educational anatomy explanations                  |
| `/api/care-guidance`   | Health-related guidance and next-step information |
| `/api/health`          | Application health check, if implemented          |

### AI Model and API Usage

- **AI provider:** Google Gemini
- **SDK:** `@google/genai`
- **Model identifier:** The exact model configured in the backend
- **Search grounding:** Used where configured and supported
- **API credentials:** Configured through a server-side environment variable

The model identifier should match the one actually used by the deployed application.

### Grounding and Source References

When Google Search grounding is enabled, source references should be based on metadata returned by the API. The application should not fabricate citations or imply that information has been independently verified when no source metadata is available.

AI-generated content can still be incomplete or inaccurate, even when grounding is available.

---

## 🛡️ Responsible AI, Safety, and Privacy

Healthcare information requires careful handling. PulseBridge is intended for educational purposes and general guidance, not medical diagnosis or treatment.

### Safety Principles

- Do not present the application as a replacement for a licensed healthcare professional.
- Do not claim that AI responses provide a confirmed diagnosis.
- Avoid unsupported treatment recommendations and prescription or dosage instructions.
- Communicate uncertainty when available information is insufficient.
- Encourage users to consult qualified healthcare professionals for personal medical concerns.
- Treat potentially serious symptoms as reasons to seek appropriate urgent medical care.
- Ensure emergency instructions and contact information are appropriate to the user's actual location.

AI-generated responses are not guaranteed to be correct, complete, or appropriate for every person.

### Privacy Principles

PulseBridge aims to follow privacy-conscious practices when handling user conversations.

- Keep API credentials on the server.
- Avoid persistent storage of health conversations unless the application explicitly implements and discloses it.
- Avoid logging full health messages or unnecessary sensitive information.
- Be transparent about data processing performed by the application and third-party providers.

These statements should reflect the actual implementation and the data-handling practices of any external AI services used by the application.

---

## 🌐 Supported Languages

PulseBridge is designed to support:

- English
- Bangla
- Urdu
- Japanese

Language availability and response quality may vary by feature and language. A user's selected language does not necessarily indicate their country or emergency-service location.

---

## 🚀 Getting Started

Follow these instructions to run PulseBridge locally.

### Prerequisites

Install:

- Node.js, using a version supported by the project
- npm
- A Google Gemini API key for live Gemini-powered features

### 1. Clone the Repository

If your GitHub repository is named `PulseBridge` and the URL below is correct, run:

```bash
git clone https://github.com/MufradMahid/PulseBridge./tree/main
cd PulseBridge
```

If GitHub shows a different repository URL, copy the correct URL from the repository's **Code** button and use that instead.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and add the environment variable expected by your backend:

```env
```

Replace the example value with your own API key.

**Never commit your actual API key to GitHub.**

### 4. Start the Development Server

If your `package.json` defines the `dev` script, run:

```bash
npm run dev
```

### 5. Build the Application

```bash
npm run build
```

If your project defines a production start script, you can also run:

```bash
npm start
```

Check the `scripts` section of `package.json` to confirm which commands your project supports.

---

## 🔐 Environment Variables

| Variable         | Purpose                                      | Required                                   |
| ---------------- | -------------------------------------------- | ------------------------------------------ |
| `GEMINI_API_KEY` | Authenticates server-side requests to Gemini | Yes, for live Gemini-powered functionality |

For local development, configure environment variables in a local `.env` file. For deployment, configure them in your hosting provider's project settings.

Do not expose API keys through frontend code, public repositories, screenshots, or logs.

---

## 🧪 Testing and Build

Before submitting PulseBridge, verify the following:

- [x] Dependencies install successfully.
- [x] The production build completes.
- [x] The deployed website loads correctly.
- [x] AI requests return appropriate responses.
- [x] API failures and rate limits are handled appropriately.
- [x] Missing or invalid API credentials are handled safely.
- [x] Supported language selections work as expected.
- [x] Anatomy and quiz features function correctly.
- [x] Safety guidance is displayed appropriately.
- [x] API keys are not exposed in the frontend.
- [x] All links and screenshots in the README work.

If automated tests are available, run the test command defined in `package.json` and document the actual results. Only include test counts that have been verified.

---

## 📸 Screenshots

The following screenshots demonstrate the PulseBridge interface.

<img width="1920" height="2397" alt="1" src="https://github.com/user-attachments/assets/c9d09db1-d6f6-4d15-8478-47c03b2a2dd0" />

<img width="1920" height="1924" alt="2" src="https://github.com/user-attachments/assets/3d316229-9a7b-4e9e-876f-efb25068b47d" />

<img width="1920" height="2051" alt="3" src="https://github.com/user-attachments/assets/5592ad33-2d1d-47f4-9b8e-1954f3707311" />

<img width="1920" height="2016" alt="4" src="https://github.com/user-attachments/assets/bf46b549-b1be-4390-8b6c-f01bde274036" />

<img width="1920" height="1901" alt="5" src="https://github.com/user-attachments/assets/ba76dba2-8ceb-45fd-b239-198bc4d93eef" />

<img width="1918" height="942" alt="6" src="https://github.com/user-attachments/assets/9aaacb31-478c-4f58-9221-23a308e27b18" />

<img width="1911" height="936" alt="7" src="https://github.com/user-attachments/assets/a79e2ace-7ef8-49f0-8e00-a5c6a4f5f4ee" />

<img width="1919" height="934" alt="8" src="https://github.com/user-attachments/assets/a73a0949-f6a4-40e7-9717-36f1953aab59" />

<img width="1919" height="953" alt="9" src="https://github.com/user-attachments/assets/0246755a-c601-44b1-9727-308d0d019cf4" />

<img width="1920" height="1406" alt="10" src="https://github.com/user-attachments/assets/76d4e684-8482-48b2-88fc-597b3fbb1f75" />

<img width="1920" height="1430" alt="11" src="https://github.com/user-attachments/assets/f8342e21-8ffe-4c7a-acf8-a3f2ddef4fad" />

<img width="1920" height="1013" alt="12" src="https://github.com/user-attachments/assets/dade8294-1cc0-4682-a562-e9156deb28d8" />

<img width="1920" height="1003" alt="13" src="https://github.com/user-attachments/assets/d621c6b6-54a6-4efd-83aa-53000d06af5d" />

<img width="1920" height="5561" alt="14" src="https://github.com/user-attachments/assets/cf923fed-5c7f-48c0-85ef-656235fa4ad4" />

<img width="1920" height="6440" alt="15" src="https://github.com/user-attachments/assets/4bd10380-adc9-463b-a667-186b5bf26136" />



---

## ☁️ Deployment

PulseBridge is deployed on Vercel.

**Live Application:**
[https://pulse-bridge-86sm.vercel.app/](https://pulse-bridge-86sm.vercel.app/)

**Vercel Project Dashboard:**
[https://vercel.com/mahid1/pulse-bridge-86sm](https://vercel.com/mahid1/pulse-bridge-86sm)

The live application link is intended for judges and users. The Vercel dashboard may require account permissions.

For deployment:

1. Connect the correct repository to the Vercel project.
2. Configure the required environment variables.
3. Ensure build settings match the application configuration.
4. Redeploy after changing environment variables or application code.
5. Test the live website and its AI features after deployment.

Never include private dashboard credentials, API keys, or access tokens in the repository.

---

## 👨‍💻 Team Member Contributions

**Solo Developer — Quazi Mufrad Mahid**

Responsible for the complete development of PulseBridge, including:

- **Product Design & UI/UX:** Designed and built the user interface and responsive user experience.
- **Frontend Development:** Implemented the healthcare education interface, multilingual support, interactive anatomy explorer, and quizzes.
- **Backend Development:** Developed the server-side API endpoints and integrated the AI services.
- **AI Integration:** Integrated the Gemini API for AI-powered health education and implemented Google Search grounding where supported.
- **Safety & Privacy:** Implemented health-related safety boundaries, emergency guidance, and privacy-conscious handling of conversations.
- **Testing & Deployment:** Tested the application, resolved deployment issues, and deployed the live application.

All project development and implementation were completed independently as a solo participant.

---

## 🔭 Limitations and Future Improvements

Potential future improvements include:

- Expanding health education topics and learning activities.
- Improving factual accuracy evaluation across supported languages.
- Making source references and uncertainty easier to understand.
- Improving accessibility for a wider range of users.
- Expanding automated tests for API behavior, safety boundaries, and multilingual experiences.
- Further strengthening privacy documentation and validation of emergency guidance.

These are potential future improvements, not claims that the features are already implemented.

---

## ⚠️ Disclaimer

PulseBridge is an educational application. It does not provide a medical diagnosis, replace professional medical advice, or guarantee the accuracy of AI-generated information.

Do not delay emergency care or professional medical assessment because of information received from this application. In an emergency, contact the appropriate local emergency service.

---

##

---

**PulseBridge — Better health understanding. Smarter next steps.**

