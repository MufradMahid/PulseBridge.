# PulseBridge 🫀

**Better health understanding. Smarter next steps.**

PulseBridge is a multilingual, AI-powered healthcare education platform designed to make health information easier to understand through conversational AI, interactive anatomy learning, quizzes, and responsible care guidance.

🌐 **Live Demo:** https://pulse-bridge-86sm.vercel.app/

🌐 **Repository Link:** https://github.com/MufradMahid/PulseBridge./tree/main

## Problem

Reliable health information is not always easy to understand or access. Medical terminology, language barriers, and scattered online resources can make it difficult for people to understand health concerns, learn about the human body, and identify appropriate next steps.

These challenges can affect people seeking clear, accessible health education, especially when information is unavailable in their preferred language.

PulseBridge addresses this problem by bringing understandable, multilingual health education into one accessible web application.

## Solution

PulseBridge combines AI-powered explanations and interactive learning tools in a single platform.

Users can ask health-related educational questions, explore anatomy, take knowledge quizzes, and access general care guidance. Google Gemini powers AI-driven explanations, while Google Search grounding can provide supporting references when enabled and available.

The platform supports English, Bangla, Urdu, and Japanese, helping make health education more accessible to a wider audience.

**PulseBridge is a health literacy tool, not a medical diagnosis system or a replacement for qualified healthcare professionals.**

## Features

- **AI-powered health education:** Get accessible explanations of general health topics through a conversational interface.
- **Multilingual support:** Use the platform in English, Bangla, Urdu, and Japanese.
- **Interactive anatomy learning:** Explore educational content about the human body and its systems.
- **Health knowledge quizzes:** Reinforce learning and test your understanding of health-related topics.
- **Care guidance:** Get general educational information about possible next steps and preparing questions for a healthcare professional.
- **Source-supported responses:** Google Search grounding can help provide relevant external references when supported by the configured AI workflow.
- **Responsible AI approach:** Emphasizes the limits of AI-generated information and the importance of professional medical care.
- **Responsive interface:** Designed for a modern, accessible web experience across different screen sizes.
- **Server-side AI integration:** Backend API routes handle AI requests so API credentials can remain outside client-side code.

## Tech Stack

- **Frontend:** React 19, TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4
- **Icons and UI:** Lucide React, Motion
- **Backend:** Node.js, Express
- **AI SDK:** `@google/genai`
- **AI Provider:** Google Gemini API
- **Deployment:** Vercel
- **Testing:** Node.js test runner (`node:test`) and TypeScript compiler (`tsc`), as configured in the project

## AI / API Usage

PulseBridge integrates Google's Gemini API to support AI-powered health education and selected explanatory features.

**AI models reported for the project:**

- Primary model: `gemini-2.5-flash`
- Automatic fallback models: `gemini-2.0-flash` and `gemini-2.0-flash-lite`
- Educational fallback: A deterministic multilingual knowledge engine when configured AI services are unavailable or quota limits are reached.

Model availability and fallback behavior depend on the deployed configuration and current provider access.

**API and SDK:**

- Google Gemini API
- Official `@google/genai` TypeScript SDK
- Google Search grounding, where configured and supported

**Application API endpoints:**

| Endpoint                    | Purpose                                                     |
| --------------------------- | ----------------------------------------------------------- |
| `POST /api/chat`            | Health-related educational conversations                    |
| `POST /api/anatomy-explain` | Educational explanations of anatomy and physiology          |
| `POST /api/care-guidance`   | General care guidance and preparation for healthcare visits |
| `GET /api/health`           | Application health status, as implemented in the backend    |

**Typical AI workflow:**

1. The user submits a question or selects an educational feature.
2. The frontend sends the request to the backend.
3. The backend calls the configured AI model when available.
4. Where supported, grounding metadata can provide relevant source references.
5. The response is returned to the user, with a fallback response used where implemented if AI services are unavailable.

AI-generated health information can be incomplete or inaccurate. PulseBridge is intended for education and does not provide a confirmed medical diagnosis.

## Setup Instructions

### 1. Clone the repository

Copy the correct clone URL from the repository's GitHub **Code** button, then run:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd PulseBridge
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your actual Git repository URL. Do not use a GitHub `/tree/main` webpage URL as the clone URL.

### 2. Install dependencies

Make sure Node.js and npm are installed, then run:

```bash
npm install
```

### 4. Run the app

Start the development server using the script defined in your `package.json`:

```bash
npm run dev
```

To create a production build:

```bash
npm run build
```

Available scripts can vary by project configuration. Check `package.json` if a command is not defined.

## Screenshots

<img width="1920" height="2397" alt="1" src="https://github.com/user-attachments/assets/619bb2b2-dcdb-47fc-8440-7cf7778b346f" />

<img width="1920" height="1924" alt="2" src="https://github.com/user-attachments/assets/4f24b932-b4ab-49a8-92b2-721063fe071e" />

<img width="1920" height="2051" alt="3" src="https://github.com/user-attachments/assets/71b274ed-caf2-4354-b24c-9107a2d5db83" />

<img width="1920" height="2016" alt="4" src="https://github.com/user-attachments/assets/7fdffc56-6290-4500-9bcf-c271bf4e9a5b" />

<img width="1920" height="1901" alt="5" src="https://github.com/user-attachments/assets/ee81829e-a055-4f04-b1a4-a8a12a8bae45" />

<img width="1918" height="942" alt="6" src="https://github.com/user-attachments/assets/74660c8b-3752-4d00-8a1f-f68b9b1f896d" />

<img width="1911" height="936" alt="7" src="https://github.com/user-attachments/assets/6c98102b-7852-442b-9160-91798f7dcda9" />
<img width="1919" height="934" alt="8" src="https://github.com/user-attachments/assets/7c52fc2f-6515-4a75-b4d9-f85a11d75585" />

<img width="1919" height="953" alt="9" src="https://github.com/user-attachments/assets/fe1e0c92-a7e2-4faf-9fa6-cf7867e57d8c" />

<img width="1920" height="1406" alt="10" src="https://github.com/user-attachments/assets/ca4ed97a-3bfa-4a33-b13e-4434678bee2c" />

<img width="1920" height="1430" alt="11" src="https://github.com/user-attachments/assets/ef468e5c-3c45-455f-9e00-1aa6aa109496" />

<img width="1920" height="1013" alt="12" src="https://github.com/user-attachments/assets/3f603fa8-8486-4906-9c6c-79d6bc44dd93" />

<img width="1920" height="1003" alt="13" src="https://github.com/user-attachments/assets/a3febe9d-5e5b-4f14-89e7-d6aafeebf980" />

<img width="1920" height="5561" alt="14" src="https://github.com/user-attachments/assets/e8a2d385-d239-4664-a8d3-00068d471471" />

<img width="1920" height="6440" alt="15" src="https://github.com/user-attachments/assets/3c1c5ab9-a8a2-476d-af35-1a9fc2ea62a1" />












### Main Interface

[https://pulse-bridge-86sm.vercel.app/](https://pulse-bridge-86sm.vercel.app/)
<img width="1920" height="2397" alt="1" src="https://github.com/user-attachments/assets/aebbc1b3-7e63-4a8a-a903-11259918d4c9" />



### AI Health

[https://pulse-bridge-86sm.vercel.app/](https://pulse-bridge-86sm.vercel.app/)
<img width="1919" height="934" alt="8" src="https://github.com/user-attachments/assets/77bc2219-f5bb-478a-8a11-ae3f2709aa81" />
<img width="1919" height="953" alt="9" src="https://github.com/user-attachments/assets/598aea87-4dfe-4d55-a436-4964eea4ee44" />




### Interactive Anatomy and Quizzes

[https://pulse-bridge-86sm.vercel.app/](https://pulse-bridge-86sm.vercel.app/)

<img width="1920" height="1406" alt="10" src="https://github.com/user-attachments/assets/23782439-492f-469d-8e1a-a1be252242f3" />

<img width="1920" height="1013" alt="12" src="https://github.com/user-attachments/assets/04d01fa8-9d21-4ed5-aeea-32a811cc713d" />


<img width="1920" height="1003" alt="13" src="https://github.com/user-attachments/assets/4c92de3b-d4bc-4c0a-a9c6-f7a8b1967e69" />




## Team Contributions

**Team Name:** PulseForge
**Team Size:** 1 — Solo Developer
**Developer:** Quazi Mufrad Mahid

As the solo developer, I independently handled the design, development, AI integration, testing, and deployment of PulseBridge.

- **Product Design and UI/UX:** Designed and implemented the user interface and responsive experience.
- **Frontend Development:** Built the application interface, multilingual experience, anatomy learning features, and quizzes.
- **Backend Development:** Integrated server-side API routes and connected the frontend to AI services.
- **AI Integration:** Integrated the Gemini API and supporting educational workflows.
- **Safety Considerations:** Designed the platform around health education rather than medical diagnosis.
- **Testing and Deployment:** Debugged application and deployment issues and deployed the live product on Vercel.

**Project:** NYLP AI Hackathon 2026
**Live Application:** [https://pulse-bridge-86sm.vercel.app/](https://pulse-bridge-86sm.vercel.app/)

---

*PulseBridge — Better health understanding. Smarter next steps.*
