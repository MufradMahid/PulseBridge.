export type SupportedLanguage = 'en' | 'ur' | 'bn' | 'ja';

export interface GroundingCitation {
  title: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  citations?: GroundingCitation[];
  isEmergencyAlert?: boolean;
  emergencyDetails?: { isEmergency: boolean; matchedCategories: string[] };
  language?: SupportedLanguage;
  isDemo?: boolean;
  demoReason?: string;
}

export interface AnatomyTopic {
  id: string;
  name: Record<SupportedLanguage, string>;
  subtitle: Record<SupportedLanguage, string>;
  category: 'circulatory' | 'respiratory' | 'digestive' | 'nervous' | 'muscular';
  summary: Record<SupportedLanguage, string>;
  keyFunctions: Record<SupportedLanguage, string[]>;
  clinicalPlainPairs: {
    medical: string;
    plain: Record<SupportedLanguage, string>;
  }[];
  educationalFact: Record<SupportedLanguage, string>;
  svgRegionId?: string;
}

export interface QuizQuestion {
  id: number;
  question: Record<SupportedLanguage, string>;
  options: Record<SupportedLanguage, string[]>;
  correctIndex: number;
  explanation: Record<SupportedLanguage, string>;
  topic: string;
}

export interface CareTriageResult {
  isEmergency: boolean;
  urgencyLevel: 'immediate_emergency' | 'prompt_consultation' | 'routine_educational';
  detectedTriggers: string[];
  guidanceText: Record<SupportedLanguage, {
    bannerTitle: string;
    bannerBody: string;
    actionSteps: string[];
    doctorQuestions: string[];
    redFlags: string[];
    disclaimer: string;
  }>;
}

export type ActiveTab = 'dashboard' | 'chat' | 'anatomy' | 'quiz' | 'care';

export type EmergencyUrgency = 'critical' | 'urgent' | 'prescribed' | 'guided';

export type EmergencyMedCategory =
  | 'all'
  | 'cardiac'
  | 'anaphylaxis'
  | 'respiratory'
  | 'overdose'
  | 'diabetic'
  | 'trauma'
  | 'allergic'
  | 'dehydration';

export interface EmergencyMedicine {
  id: string;
  name: Record<SupportedLanguage, string>;
  brandNames: string[];
  category: Exclude<EmergencyMedCategory, 'all'>;
  urgency: EmergencyUrgency;
  primaryIndication: Record<SupportedLanguage, string>;
  mechanismPlain: Record<SupportedLanguage, string>;
  emergencyAdministration: Record<SupportedLanguage, string[]>;
  criticalWarnings: Record<SupportedLanguage, string[]>;
  contraindications: Record<SupportedLanguage, string[]>;
  emsAdvice: Record<SupportedLanguage, string>;
  commonForm: string;
  iconType: 'heart' | 'alert' | 'wind' | 'shield' | 'drop' | 'pill' | 'activity' | 'zap';
}
