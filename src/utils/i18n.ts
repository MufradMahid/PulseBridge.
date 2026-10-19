import type { SupportedLanguage } from '../types/index.ts';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  disclaimerShort: string;
  disclaimerFull: string;
  emergencyBanner: {
    title: string;
    description: string;
    callButton: string;
    dialTel: string;
    secondaryButton?: string;
    secondaryTel?: string;
    viewSigns: string;
    hideSigns: string;
  };
  nav: {
    home: string;
    chat: string;
    anatomy: string;
    quiz: string;
    care: string;
  };
  home: {
    badge: string;
    welcomeTitle: string;
    welcomeSubtitle: string;
    welcomeMission: string;
    welcomeEvidence: string;
    askQuickPrompt: string;
    askButton: string;
    featuresHeader: string;
    featuresSubheader: string;
    cardChatTitle: string;
    cardChatDesc: string;
    cardAnatomyTitle: string;
    cardAnatomyDesc: string;
    cardQuizTitle: string;
    cardQuizDesc: string;
    cardCareTitle: string;
    cardCareDesc: string;
    whyPulseBridgeTitle: string;
    whyItem1Title: string;
    whyItem1Desc: string;
    whyItem2Title: string;
    whyItem2Desc: string;
    whyItem3Title: string;
    whyItem3Desc: string;
    openToolBtn: string;
    valuesTitle: string;
    valuesPillar1Title: string;
    valuesPillar1Desc: string;
    valuesPillar2Title: string;
    valuesPillar2Desc: string;
    valuesPillar3Title: string;
    valuesPillar3Desc: string;
  };
  chat: {
    badge: string;
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    clear: string;
    emptyTitle: string;
    emptyDesc: string;
    suggestedLabel: string;
    suggestions: string[];
    sourcesLabel: string;
    groundedSearchNotice: string;
    loadingText: string;
    errorText: string;
    retryBtn: string;
    notDiagnosticNotice: string;
    emergencyDetectedNotice: string;
  };
  anatomy: {
    badge: string;
    title: string;
    subtitle: string;
    assetNotice: string;
    selectTopicLabel: string;
    keyFunctionsTitle: string;
    terminologyTitle: string;
    clinicalVsPlain: string;
    funFactTitle: string;
    aiExplainBtn: string;
    aiExplaining: string;
    aiModalTitle: string;
    closeBtn: string;
    zoomTip: string;
    arteryLabel: string;
    veinLabel: string;
    toggleMarkers: string;
  };
  quiz: {
    badge: string;
    title: string;
    subtitle: string;
    progressText: (current: number, total: number) => string;
    scoreText: (score: number, total: number) => string;
    explanationLabel: string;
    nextBtn: string;
    finishBtn: string;
    restartBtn: string;
    completedTitle: string;
    completedDesc: (score: number, total: number) => string;
    disclaimer: string;
  };
  care: {
    badge: string;
    title: string;
    subtitle: string;
    inputLabel: string;
    inputPlaceholder: string;
    submitBtn: string;
    analyzing: string;
    emergencyDetectedAlert: string;
    emergencyAction: string;
    emergencyCallNow: string;
    emergencyDialPrimary: string;
    emergencyDialSecondary?: string;
    guidanceTitle: string;
    whenToSeeDoctor: string;
    questionsForDoctor: string;
    selfCareTips: string;
    redFlagsTitle: string;
    samplePromptsTitle: string;
    disclaimer: string;
  };
  languages: {
    en: string;
    ur: string;
    bn: string;
    ja: string;
  };
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: 'PulseBridge',
    tagline: 'Better health understanding. Smarter next steps.',
    disclaimerShort: 'PulseBridge provides educational health information and is not a substitute for professional medical care, diagnosis, or emergency services.',
    disclaimerFull: 'PulseBridge is an educational platform designed to make human anatomy and medical terminology clear and accessible. It does not provide medical diagnoses, treatment plans, or prescription recommendations. If you have medical symptoms or need care, always consult a licensed physician. If you are experiencing a life-threatening medical emergency, call 911 immediately.',
    emergencyBanner: {
      title: 'Medical Emergency Warning Signs',
      description: 'If you or someone near you has severe chest pain, severe shortness of breath, stroke symptoms (facial droop, arm weakness, slurred speech), uncontrolled bleeding, or loss of consciousness, call 911 immediately.',
      callButton: 'Emergency: Call 911 (USA)',
      dialTel: 'tel:911',
      secondaryButton: 'Crisis: 988',
      secondaryTel: 'tel:988',
      viewSigns: 'View Warning Signs',
      hideSigns: 'Hide Warning Signs',
    },
    nav: {
      home: 'Dashboard',
      chat: 'AI Health Companion',
      anatomy: 'Anatomy Explorer',
      quiz: 'Knowledge Quiz',
      care: 'Care Guidance',
    },
    home: {
      badge: 'Better health understanding. Smarter next steps.',
      welcomeTitle: 'Bridging complex medicine and human understanding with calm, verified clarity.',
      welcomeSubtitle: 'Demystify clinical terminology, explore the intricate vascular systems of the human body, test your knowledge, and prepare for thoughtful, empowered conversations with your physician.',
      welcomeMission: 'Every patient deserves to understand their body without fear, confusion, or medical jargon.',
      welcomeEvidence: 'Evidence-grounded explanations, verified through real-time medical references, designed to guide your next steps with confidence.',
      askQuickPrompt: 'Ask any health or anatomy question...',
      askButton: 'Ask Companion',
      featuresHeader: 'Explore PulseBridge Modules',
      featuresSubheader: 'Choose a dedicated educational tool to understand your body and prepare for informed conversations with your doctor.',
      cardChatTitle: 'AI Health Companion',
      cardChatDesc: 'Translate medical terms into plain, grounded explanations with genuine web citations.',
      cardAnatomyTitle: 'Anatomy Explorer',
      cardAnatomyDesc: 'Explore the circulatory system, heart, organs, and vascular pathways with visual anatomical detail.',
      cardQuizTitle: 'Knowledge Quiz',
      cardQuizDesc: 'Test your understanding with a five-question interactive anatomy challenge and instant feedback.',
      cardCareTitle: 'Care Guidance',
      cardCareDesc: 'Receive cautious educational guidance on symptoms, emergency signs, and questions to ask your physician.',
      whyPulseBridgeTitle: 'Why PulseBridge?',
      whyItem1Title: 'Evidence-Grounded Information',
      whyItem1Desc: 'Powered by Gemini with real-time Google Search grounding to reference credible health institutions.',
      whyItem2Title: 'Multilingual Accessibility',
      whyItem2Desc: 'Full support for English, Urdu (اردو), Bangla (বাংলা), and Japanese (日本語) with native RTL/LTR layouts.',
      whyItem3Title: 'Patient Safety First',
      whyItem3Desc: 'Strict non-diagnostic boundaries with immediate emergency alerts for critical health signs.',
      openToolBtn: 'Open Module',
      valuesTitle: 'Core Healthcare Values',
      valuesPillar1Title: 'Clarity over Jargon',
      valuesPillar1Desc: 'We translate opaque clinical terminology into plain, compassionate language so you understand test results and diagnoses without anxiety.',
      valuesPillar2Title: 'Collaborative Doctor Visits',
      valuesPillar2Desc: 'Empowering you with well-structured questions and symptom chronologies to transform 15-minute consultations into effective partnerships.',
      valuesPillar3Title: 'Strict Safety Boundaries',
      valuesPillar3Desc: 'We never diagnose or prescribe. Immediate red-flag detection ensures acute emergencies are recognized instantly without delay.',
    },
    chat: {
      badge: 'AI Health & Anatomy Companion',
      title: 'AI Health Companion',
      subtitle: 'Ask about health terminology, biological processes, or lab results in plain language.',
      placeholder: 'E.g., What does systolic blood pressure mean, or how do pulmonary veins work?',
      send: 'Send Question',
      clear: 'Clear Chat',
      emptyTitle: 'Ask a Health or Anatomy Question',
      emptyDesc: 'Your questions will be explained in clear, patient-friendly language supported by verified medical references when available.',
      suggestedLabel: 'Suggested topics to ask:',
      suggestions: [
        'What is the difference between systolic and diastolic blood pressure?',
        'How does oxygen travel through the pulmonary circulation?',
        'Explain the role of hemoglobin in red blood cells simply.',
        'What does atherosclerosis mean and what are the main risk factors?'
      ],
      sourcesLabel: 'Verified Grounding Sources:',
      groundedSearchNotice: 'Grounded via real-time Google Search for factual accuracy.',
      loadingText: 'Consulting medical knowledge...',
      errorText: 'The Gemini API quota has been reached on this project. Please select or upgrade your API key in the Settings > Secrets panel.',
      retryBtn: 'Retry Query',
      notDiagnosticNotice: 'Notice: This response is for educational purposes only and is not a medical diagnosis. Consult a qualified clinician for health concerns.',
      emergencyDetectedNotice: 'Critical alert: Your query indicates a potential medical emergency. Please seek emergency medical care immediately.',
    },
    anatomy: {
      badge: 'Interactive Educational Anatomy',
      title: 'Interactive Anatomy Explorer',
      subtitle: 'Study human anatomical systems, understand vessel networks, and demystify clinical terms.',
      assetNotice: 'Human Circulatory & Vascular System Overview (Red = Arteries, Blue = Veins)',
      selectTopicLabel: 'Select an Anatomical Topic:',
      keyFunctionsTitle: 'Core Physiological Functions',
      terminologyTitle: 'Medical Terminology in Plain Words',
      clinicalVsPlain: 'Clinical vs. Plain English',
      funFactTitle: 'Clinical Insight',
      aiExplainBtn: 'Deep Dive with AI',
      aiExplaining: 'Generating physiological explanation...',
      aiModalTitle: 'AI Physiological Breakdown',
      closeBtn: 'Close',
      zoomTip: 'Inspect the vascular pathways, systemic loops, and vital organ connections below.',
      arteryLabel: 'A. = Artery',
      veinLabel: 'V. = Vein',
      toggleMarkers: 'Markers',
    },
    quiz: {
      badge: 'General Anatomy & Physiology Challenge',
      title: 'Anatomy & Health Knowledge Quiz',
      subtitle: 'A 5-question interactive quiz to test and build your understanding of the human body.',
      progressText: (current, total) => `Question ${current} of ${total}`,
      scoreText: (score, total) => `Score: ${score} / ${total}`,
      explanationLabel: 'Educational Explanation:',
      nextBtn: 'Next Question',
      finishBtn: 'View Final Results',
      restartBtn: 'Take Quiz Again',
      completedTitle: 'Quiz Complete!',
      completedDesc: (score, total) => `You scored ${score} out of ${total} (${Math.round((score / total) * 100)}%). Great effort learning about the human body!`,
      disclaimer: 'This quiz is an educational exercise designed for general anatomy learning. It is not an assessment of health or clinical knowledge.',
    },
    care: {
      badge: 'Patient Safety & Doctor Visit Navigator',
      title: 'Care Guidance & Safety Navigator',
      subtitle: 'Describe a health concern to receive educational context, red-flag triage, and preparation for your doctor visit.',
      inputLabel: 'Describe your symptom, situation, or general health question:',
      inputPlaceholder: 'E.g., I have had a mild dull headache for two days after working at my computer, and I am feeling fatigued...',
      submitBtn: 'Analyze & Get Guidance',
      analyzing: 'Evaluating safety criteria and guidance...',
      emergencyDetectedAlert: 'EMERGENCY WARNING DETECTED',
      emergencyAction: 'This situation may require immediate emergency medical evaluation. Do not delay or wait for an appointment.',
      emergencyCallNow: 'Call Emergency Services (911 in the USA) or go to the nearest emergency department right away.',
      emergencyDialPrimary: 'Call 911 (USA)',
      emergencyDialSecondary: 'Call 988 (Crisis)',
      guidanceTitle: 'Educational Health Guidance',
      whenToSeeDoctor: 'When to Seek Professional Medical Care',
      questionsForDoctor: 'Helpful Questions to Ask Your Healthcare Provider',
      selfCareTips: 'General Comfort & Observation Steps',
      redFlagsTitle: 'Warning Signs That Require Prompt Medical Attention',
      samplePromptsTitle: 'Sample scenarios to explore:',
      disclaimer: 'PulseBridge Care Guidance does not diagnose diseases, prescribe medication, or calculate dosages. It is an educational guide to help you decide when to seek professional care.',
    },
    languages: {
      en: 'English (US)',
      ur: 'اردو (Urdu - پاکستان)',
      bn: 'বাংলা (Bangla - বাংলাদেশ)',
      ja: '日本語 (Japanese - 日本)',
    },
  },
  ur: {
    appName: 'PulseBridge',
    tagline: 'صحت کی بہتر سمجھ۔ اگلے دانشمندانہ اقدامات۔',
    disclaimerShort: 'پلس برج تعلیمی اور معلوماتی پلیٹ فارم ہے، یہ ڈاکٹر یا تشخیصی نظام کا نعم البدل نہیں ہے۔',
    disclaimerFull: 'پلس برج ایک طبی معلوماتی اور تعلیمی ٹول ہے جس کا مقصد جسمانی ساخت اور طبی اصطلاحات کو آسان بنانا ہے۔ یہ کوئی طبی تشخیص، علاج کا منصوبہ یا ادویات تجویز نہیں کرتا۔ اگر آپ کو صحت کی شکایت ہے تو مستند ڈاکٹر سے رجوع کریں۔ ہنگامی صورتحال میں فوری طور پر ریسکیو 1122 پر رابطہ کریں۔',
    emergencyBanner: {
      title: 'طبی ایمرجنسی کی اہم علامات',
      description: 'اگر آپ یا آپ کے قریبی شخص کو سینے میں شدید درد، سانس لینے میں شدید دشواری، فالج کی علامات (چہرے کا جھکنا، بازو کی کمزوری، زبان کا لڑکھڑانا)، بے ہوشی یا شدید خونریزی کا سامنا ہو تو فوری 1122 پر کال کریں۔',
      callButton: 'ریسکیو 1122 پر کال کریں (پاکستان)',
      dialTel: 'tel:1122',
      secondaryButton: 'پولیس: 15',
      secondaryTel: 'tel:15',
      viewSigns: 'اہم انتباہی علامات دیکھیں',
      hideSigns: 'انتباہی علامات چھپائیں',
    },
    nav: {
      home: 'ڈیش بورڈ',
      chat: 'اے آئی ہیلتھ کمپینین',
      anatomy: 'جسمانی ساخت کا جائزہ',
      quiz: 'معلوماتی کوئز',
      care: 'طبی رہنمائی',
    },
    home: {
      badge: 'صحت کی بہتر سمجھ۔ اگلے دانشمندانہ اقدامات۔',
      welcomeTitle: 'طبی سائنس اور انسانی فہم کے درمیان پُرامن، تصدیق شدہ اور بااعتماد پُل۔',
      welcomeSubtitle: 'طبی اصطلاحات کی تفہیم کو آسان بنائیں، انسانی جسم کے نازک نظاموں کا مشاہدہ کریں، اپنی معلومات میں اضافہ کریں اور اپنے معالج کے ساتھ بااختیار گفتگو کی تیاری کریں۔',
      welcomeMission: 'ہر انسان کا بنیادی حق ہے کہ وہ اپنے جسم اور صحت کو بغیر کسی خوف، ابہام یا مشکل اصطلاحات کے آسانی سے سمجھے۔',
      welcomeEvidence: 'مستند سائنسی حوالوں اور معتبر ذرائع پر مبنی رہنمائی جو آپ کو محفوظ اور باخبر فیصلوں کی راہ دکھاتی ہے۔',
      askQuickPrompt: 'صحت یا انسانی جسم سے متعلق کوئی سوال پوچھیں...',
      askButton: 'سوال پوچھیں',
      featuresHeader: 'پلس برج کے اہم ماڈیولز',
      featuresSubheader: 'اپنے جسم کو سمجھنے اور ڈاکٹر سے گفتگو کے لیے تیار ہونے کے لیے کوئی بھی ٹول منتخب کریں۔',
      cardChatTitle: 'اے آئی ہیلتھ کمپینین',
      cardChatDesc: 'طبی اصطلاحات کو معتبر ذرائع کے ساتھ آسان اور عام فہم زبان میں سمجھیں۔',
      cardAnatomyTitle: 'جسمانی ساخت کا جائزہ',
      cardAnatomyDesc: 'نظامِ دورانِ خون، دل، رگوں اور دیگر اعضاء کی ساخت کا تفصیلی مشاہدہ کریں۔',
      cardQuizTitle: 'معلوماتی کوئز',
      cardQuizDesc: 'پانچ سوالات پر مشتمل تعلیمی کوئز کے ذریعے اپنی معلومات کی جانچ کریں۔',
      cardCareTitle: 'طبی رہنمائی',
      cardCareDesc: 'علامات کی نوعیت، ایمرجنسی خطرات اور ڈاکٹر سے پوچھنے والے سوالات کی رہنمائی۔',
      whyPulseBridgeTitle: 'پلس برج کیوں؟',
      whyItem1Title: 'مستند شواہد پر مبنی',
      whyItem1Desc: 'گوگل سرچ گراؤنڈنگ اور جیمینائی کی مدد سے معتبر طبی مآخذ فراہم کرتا ہے۔',
      whyItem2Title: 'کثیر لسانی رسائی',
      whyItem2Desc: 'اردو، انگریزی، بنگلہ اور جاپانی زبانوں میں دائیں سے بائیں (RTL) مکمل سہولت۔',
      whyItem3Title: 'مریض کی حفاظت اولین ترجیح',
      whyItem3Desc: 'تشخیص کے بغیر خالصتاً تعلیمی حد بندی اور فوری ایمرجنسی انتباہات۔',
      openToolBtn: 'ماڈیول کھولیں',
      valuesTitle: 'صحت سے متعلق ہمارے بنیادی اصول',
      valuesPillar1Title: 'پیچیدہ اصطلاحات کا خاتمہ',
      valuesPillar1Desc: 'ہم مشکل طبی رپورٹوں اور اصطلاحات کو ہمدردانہ اور واضح زبان میں سمجھاتے ہیں تاکہ آپ پریشانی سے بچ سکیں۔',
      valuesPillar2Title: 'ڈاکٹر سے نتیجہ خیز ملاقات',
      valuesPillar2Desc: 'ڈاکٹر کے پاس جانے سے پہلے درست سوالات کی تیاری آپ کی چند منٹ کی ملاقات کو انتہائی مؤثر بناتی ہے۔',
      valuesPillar3Title: 'حفاظت اور ایمرجنسی ترجیح',
      valuesPillar3Desc: 'ہم دوا یا تشخیص تجویز نہیں کرتے، لیکن خطرناک علامات کی صورت میں فوری طور پر ریسکیو 1122 کی رہنمائی کرتے ہیں۔',
    },
    chat: {
      badge: 'اے آئی ہیلتھ و اناٹومی کمپینین',
      title: 'اے آئی ہیلتھ کمپینین',
      subtitle: 'طبی اصطلاحات، حیاتیاتی عوامل یا لیب ٹیسٹ کے بارے میں عام فہم زبان میں سوالات پوچھیں۔',
      placeholder: 'مثال: سسٹولک بلڈ پریشر کا کیا مطلب ہے، یا دل خون کیسے پمپ کرتا ہے؟',
      send: 'سوال بھیجیں',
      clear: 'گفتگو صاف کریں',
      emptyTitle: 'صحت یا اناٹومی کا سوال پوچھیں',
      emptyDesc: 'آپ کے سوالات کی وضاحت سادہ زبان اور معتبر طبی حوالوں کے ساتھ کی جائے گی۔',
      suggestedLabel: 'تجویز کردہ موضوعات:',
      suggestions: [
        'سسٹولک اور ڈائسٹولک بلڈ پریشر میں کیا فرق ہے؟',
        'پھیپھڑوں کے ذریعے خون میں آکسیجن کیسے شامل ہوتی ہے؟',
        'ریڈ بلڈ سیلز میں ہیموگلوبن کا کیا کردار ہے؟',
        'شریانوں میں تنگی (Atherosclerosis) کا کیا مطلب ہے؟'
      ],
      sourcesLabel: 'تصدیق شدہ حوالہ جات:',
      groundedSearchNotice: 'حقیقی گوگل سرچ گراؤنڈنگ کے ذریعے تصدیق شدہ۔',
      loadingText: 'معتبر طبی معلومات تیار کی جا رہی ہیں...',
      errorText: 'اس پروجیکٹ پر جیمینائی اے پی آئی کوٹہ مکمل ہو چکا ہے۔ براہ کرم سیٹنگز میں اے پی آئی کی کو اپ گریڈ کریں۔',
      retryBtn: 'دوبارہ کوشش کریں',
      notDiagnosticNotice: 'انتباہ: یہ معلومات صرف تعلیمی مقصد کے لیے ہیں اور یہ طبی تشخیص نہیں۔ کسی بھی بیماری کے لیے مستند معالج سے رجوع کریں۔',
      emergencyDetectedNotice: 'اہم انتباہ: آپ کے سوال میں شدید طبی علامات کا اشارہ ہے۔ براہ کرم فوری طور پر ریسکیو 1122 سے رجوع کریں۔',
    },
    anatomy: {
      badge: 'انٹرایکٹو تعلیمی اناٹومی',
      title: 'جسمانی ساخت کا انٹرایکٹو جائزہ',
      subtitle: 'نظامِ دورانِ خون اور اہم اعضاء کا مطالعہ کریں اور طبی ناموں کو سمجھیں۔',
      assetNotice: 'انسانی نظامِ دورانِ خون کا جائزہ (سرخ = شریانیں / Arteries، نیلا = وریدیں / Veins)',
      selectTopicLabel: 'جسمانی نظام منتخب کریں:',
      keyFunctionsTitle: 'بنیادی جسمانی افعال',
      terminologyTitle: 'طبی اصطلاحات کی آسان وضاحت',
      clinicalVsPlain: 'طبی نام اور عام فہم معنی',
      funFactTitle: 'طبی معلوماتی نکتہ',
      aiExplainBtn: 'اے آئی کے ساتھ گہرائی سے سمجھیں',
      aiExplaining: 'وضاحت تیار کی جا رہی ہے...',
      aiModalTitle: 'تفصیلی طبی تجزیہ',
      closeBtn: 'بند کریں',
      zoomTip: 'نیچے شریانوں، وریدوں اور اہم اعضاء کے باہمی تعلق کا مشاہدہ کریں۔',
      arteryLabel: 'سرخ = شریان (Artery)',
      veinLabel: 'نیلا = ورید (Vein)',
      toggleMarkers: 'نشانات',
    },
    quiz: {
      badge: 'جسمانی ساخت و افعال چیلنج',
      title: 'اناٹومی اور صحت کا تعلیمی کوئز',
      subtitle: 'انسانی جسم کے بارے میں اپنی معلومات جانچنے کے لیے ۵ سوالات۔',
      progressText: (current, total) => `سوال ${current} از ${total}`,
      scoreText: (score, total) => `اسکور: ${score} / ${total}`,
      explanationLabel: 'تعلیمی وضاحت:',
      nextBtn: 'اگلا سوال',
      finishBtn: 'نتائج دیکھیں',
      restartBtn: 'کوئز دوبارہ شروع کریں',
      completedTitle: 'کوئز مکمل ہو گیا!',
      completedDesc: (score, total) => `آپ نے ${total} میں سے ${score} درست جوابات دیے۔ انسانی جسم کے بارے میں جاننا ایک عمدہ عمل ہے!`,
      disclaimer: 'یہ کوئز صرف عام تعلیمی آگاہی کے لیے ہے اور یہ کوئی طبی قابلیت کا امتحان نہیں ہے۔',
    },
    care: {
      badge: 'مریض کی حفاظت اور معالج سے مشاورت',
      title: 'طبی رہنمائی اور حفاظتی معاون',
      subtitle: 'اپنی عام شکایت بیان کریں تاکہ تعلیمی رہنمائی اور ڈاکٹر سے مشورے کے لیے مدد حاصل ہو سکے۔',
      inputLabel: 'اپنی شکایت یا عمومی صحت کا سوال بیان کریں:',
      inputPlaceholder: 'مثال: کمپیوٹر پر کام کے بعد دو دن سے سر میں ہلکا درد ہے اور تھکن محسوس ہو رہی ہے...',
      submitBtn: 'جائزہ لیں اور رہنمائی حاصل کریں',
      analyzing: 'حفاظتی معیار کی جانچ کی جا رہی ہے...',
      emergencyDetectedAlert: 'ایمرجنسی خطرے کی علامت',
      emergencyAction: 'اس صورتحال میں فوری ایمرجنسی طبی معائنے کی ضرورت ہو سکتی ہے۔ دیر نہ کریں۔',
      emergencyCallNow: 'فوری طور پر پاکستان میں ریسکیو 1122 پر کال کریں یا قریبی اسپتال کے ایمرجنسی وارڈ میں جائیں۔',
      emergencyDialPrimary: 'ریسکیو 1122 پر کال کریں',
      emergencyDialSecondary: 'پولیس 15',
      guidanceTitle: 'تعلیمی صحت کی رہنمائی',
      whenToSeeDoctor: 'ڈاکٹر سے کب رجوع کرنا ضروری ہے',
      questionsForDoctor: 'ڈاکٹر سے پوچھنے والے اہم سوالات',
      selfCareTips: 'عمومی سکون و نگہداشت کے طریقے',
      redFlagsTitle: 'اہم انتباہی علامات (Red Flags)',
      samplePromptsTitle: 'عام مثالیں:',
      disclaimer: 'پلس برج تشخیص نہیں کرتا اور نہ ہی ادویات تجویز کرتا ہے۔ یہ محض تعلیمی گائیڈ ہے۔',
    },
    languages: {
      en: 'English (انگریزی)',
      ur: 'اردو (Urdu - پاکستان)',
      bn: 'বাংলা (Bangla - বাংলাদেশ)',
      ja: '日本語 (Japanese - 日本)',
    },
  },
  bn: {
    appName: 'PulseBridge',
    tagline: 'স্বাস্থ্যের উন্নত উপলব্ধি। সঠিক পরবর্তী পদক্ষেপ।',
    disclaimerShort: 'পালসব্রিজ শিক্ষামূলক স্বাস্থ্য তথ্য প্রদান করে, এটি কোনো চিকিৎসক বা রোগ নির্ণয় ব্যবস্থার বিকল্প নয়।',
    disclaimerFull: 'পালসব্রিজ একটি শিক্ষামূলক প্ল্যাটফর্ম যা মানুষের শারীরস্থান এবং চিকিৎসা পরিভাষাকে সহজবোধ্য করতে তৈরি। এটি কোনো রোগ নির্ণয়, ব্যবস্থাপত্র বা প্রেসক্রিপশন প্রদান করে না। স্বাস্থ্য সংক্রান্ত যে কোনো উদ্বেগে সর্বদা নিবন্ধিত চিকিৎসকের পরামর্শ নিন। জীবন ঝুঁকিপূর্ণ জরুরি অবস্থায় অবিলম্বে ৯৯৯ নম্বরে কল করুন।',
    emergencyBanner: {
      title: 'জরুরি চিকিৎসার সতর্কবার্তা সংকেত',
      description: 'আপনার বা আশেপাশের কারও তীব্র বুকে ব্যথা, মারাত্মক শ্বাসকষ্ট, স্ট্রোকের লক্ষণ (মুখ বেঁকে যাওয়া, হাত অবশ হওয়া, কথা জড়িয়ে যাওয়া), রক্তপাত বা অচেতনতা দেখা দিলে অবিলম্বে ৯৯৯ অথবা ১৬২৬৩ নম্বরে যোগাযোগ করুন।',
      callButton: 'জরুরি সেবা: ৯৯৯ (বাংলাদেশ)',
      dialTel: 'tel:999',
      secondaryButton: 'স্বাস্থ্য বাতায়ন: ১৬২৬৩',
      secondaryTel: 'tel:16263',
      viewSigns: 'জরুরি সতর্ক সংকেতসমূহ দেখুন',
      hideSigns: 'সতর্ক সংকেত লুকান',
    },
    nav: {
      home: 'ড্যাশবোর্ড',
      chat: 'এআই হেলথ সঙ্গী',
      anatomy: 'শারীরস্থান এক্সপ্লোরার',
      quiz: 'জ্ঞানের কুইজ',
      care: 'সেবা নির্দেশিকা',
    },
    home: {
      badge: 'স্বাস্থ্যের উন্নত উপলব্ধি। সঠিক পরবর্তী পদক্ষেপ।',
      welcomeTitle: 'চিকিৎসাবিজ্ঞানের জটিলতা ও মানব উপলব্ধির মাঝে নির্ভরতা ও স্বচ্ছতার সেতুবন্ধন।',
      welcomeSubtitle: 'কঠিন চিকিৎসা পরিভাষা সহজ ভাষায় জানুন, মানবদেহের রক্ত সংবহন ও অঙ্গসমূহের কার্যপদ্ধতি অন্বেষণ করুন এবং চিকিৎসকের সাথে সাক্ষাতে সঠিক প্রশ্ন করতে নিজেকে প্রস্তুত করুন।',
      welcomeMission: 'ভয় বা বিভ্রান্তি নয়—নিজের শরীর ও স্বাস্থ্য সম্পর্কে স্পষ্ট ও নির্ভরযোগ্য জ্ঞান অর্জন প্রতিটি মানুষের মৌলিক অধিকার।',
      welcomeEvidence: 'যাচাইকৃত তথ্যসূত্র ও প্রামাণ্য বৈজ্ঞানিক প্রমাণের ভিত্তিতে আপনার পরবর্তী পদক্ষেপ হোক দৃঢ়, নিরাপদ ও আত্মবিশ্বাসী।',
      askQuickPrompt: 'স্বাস্থ্য বা শারীরস্থান সম্পর্কিত প্রশ্ন করুন...',
      askButton: 'প্রশ্ন জিজ্ঞাসা করুন',
      featuresHeader: 'পালসব্রিজের মডিউলসমূহ',
      featuresSubheader: 'আপনার শরীর বুঝতে এবং চিকিৎসকের সাথে অর্থপূর্ণ আলোচনার প্রস্তুতি নিতে যেকোনো টুল নির্বাচন করুন।',
      cardChatTitle: 'এআই হেলথ সঙ্গী',
      cardChatDesc: 'প্রামাণিক ওয়েব রেফারেন্সসহ চিকিৎসা পরিভাষার সহজ ব্যাখ্যা পান।',
      cardAnatomyTitle: 'শারীরস্থান এক্সপ্লোরার',
      cardAnatomyDesc: 'রক্তসংবহনতন্ত্র, হৃৎপিণ্ড, ধমনী ও শিরার পুঙ্খানুপুঙ্খ তথ্য অন্বেষণ করুন।',
      cardQuizTitle: 'জ্ঞানের কুইজ',
      cardQuizDesc: 'পাঁচটি প্রশ্নের ইন্টারেক্টিভ কুইজের মাধ্যমে আপনার স্বাস্থ্য জ্ঞান পরীক্ষা করুন।',
      cardCareTitle: 'সেবা নির্দেশিকা',
      cardCareDesc: 'লক্ষণ বিশ্লেষণ, জরুরি সতর্কবার্তা এবং ডাক্তারকে কী জিজ্ঞাসা করবেন তার স্পষ্ট রূপরেখা।',
      whyPulseBridgeTitle: 'পালসব্রিজ কেন?',
      whyItem1Title: 'প্রমাণ-ভিত্তিক তথ্য',
      whyItem1Desc: 'গুগল সার্চ গ্রাউন্ডিং ও জেমিনাই এর সহায়তায় তথ্যসূত্রের সত্যতা যাচাই।',
      whyItem2Title: 'বহুভাষিক সহজলভ্যতা',
      whyItem2Desc: 'বাংলা, ইংরেজি, উর্দু ও জাপানি ভাষায় সম্পূর্ণ ইন্টারফেস ও ডান-বাম লেআউট সমর্থন।',
      whyItem3Title: 'রোগীর সুরক্ষা প্রথম',
      whyItem3Desc: 'রোগ নির্ণয় এড়িয়ে শিক্ষামূলক সীমার মধ্যে থাকা এবং জরুরি সতর্কবার্তা প্রদর্শন।',
      openToolBtn: 'মডিউল চালু করুন',
      valuesTitle: 'আমাদের স্বাস্থ্যসেবার মূল অঙ্গীকার',
      valuesPillar1Title: 'কঠিন পরিভাষামুক্ত স্পষ্টতা',
      valuesPillar1Desc: 'আমরা জটিল প্যাথলজি ও ক্লিনিক্যাল রিপোর্ট সহজ ভাষায় ব্যাখ্যা করি, যাতে অযথা আতঙ্কিত না হয়ে সঠিক ধারণা পান।',
      valuesPillar2Title: 'ডাক্তারের সাথে ফলপ্রসূ সাক্ষাৎ',
      valuesPillar2Desc: 'সঠিক প্রশ্নাবলী ও লক্ষণের সময়ক্রম আগে থেকেই গুছিয়ে নিয়ে ডাক্তারের অল্প সময়ের অ্যাপয়েন্টমেন্টকে সর্বোচ্চ ফলপ্রসূ করুন।',
      valuesPillar3Title: 'সর্বোচ্চ নিরাপত্তা ও সতর্কতা',
      valuesPillar3Desc: 'আমরা কোনো প্রেসক্রিপশন বা চিকিৎসা দিই না; বরং ঝুঁকিপূর্ণ লক্ষণ দেখলেই তাৎক্ষণিকভাবে ৯৯৯ বা ১৬২৬৩ এর পরামর্শ দিই।',
    },
    chat: {
      badge: 'এআই স্বাস্থ্য ও শারীরস্থান সঙ্গী',
      title: 'এআই হেলথ সঙ্গী',
      subtitle: 'চিকিৎসা পরিভাষা, রক্তচাপ বা জৈবিক প্রক্রিয়া সম্পর্কে সহজ ভাষায় জানুন।',
      placeholder: 'যেমন: সিস্টোলিক রক্তচাপ কী, অথবা ফুসফুস কীভাবে রক্ত পরিশোধিত করে?',
      send: 'প্রশ্ন পাঠান',
      clear: 'চ্যাট মুছুন',
      emptyTitle: 'স্বাস্থ্য বা শারীরস্থান সম্পর্কিত প্রশ্ন করুন',
      emptyDesc: 'আপনার প্রশ্নের উত্তর সহজ বাংলায় দেওয়া হবে এবং প্রাসঙ্গিক তথ্যসূত্র সংযুক্ত থাকবে।',
      suggestedLabel: 'প্রস্তাবিত কিছু প্রশ্ন:',
      suggestions: [
        'সিস্টোলিক এবং ডায়াস্টোলিক রক্তচাপের মধ্যে পার্থক্য কী?',
        'ফুসফুসীয় সংবহনতন্ত্রের মাধ্যমে রক্তে অক্সিজেন কীভাবে মেশে?',
        'লোহিত রক্তকণিকায় হিমোগ্লোবিনের ভূমিকা কী?',
        'ধমনীতে রক্ত চলাচলে বাধার কারণ কী?'
      ],
      sourcesLabel: 'যাচাইকৃত তথ্যসূত্র:',
      groundedSearchNotice: 'গুগল সার্চের মাধ্যমে বাস্তব তথ্যের সাথে যাচাইকৃত।',
      loadingText: 'চিকিৎসা সংক্রান্ত জ্ঞান সংকলন করা হচ্ছে...',
      errorText: 'এই প্রজেক্টের জেমিনাই এপিআই কোটা পূর্ণ হয়েছে। অনুগ্রহ করে সেটিংসে এপিআই কি হালনাগাদ করুন।',
      retryBtn: 'আবার চেষ্টা করুন',
      notDiagnosticNotice: 'সতর্কতা: এই তথ্য শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে। এটি কোনো চিকিৎসাগত রোগ নির্ণয় নয়।',
      emergencyDetectedNotice: 'জরুরি সতর্কতা: আপনার বিবরণে গুরুতর স্বাস্থ্য ঝুঁকির লক্ষণ রয়েছে। অনতিবিলম্বে জরুরি চিকিৎসকের শরণাপন্ন হোন।',
    },
    anatomy: {
      badge: 'ইন্টারেক্টিভ শিক্ষামূলক শারীরস্থান',
      title: 'ইন্টারেক্টিভ শারীরস্থান এক্সপ্লোরার',
      subtitle: 'মানব রক্ত সংবহনতন্ত্র ও প্রধান অঙ্গসমূহের কার্যপদ্ধতি বিস্তারিত জানুন।',
      assetNotice: 'মানব সংবহন ও ভাস্কুলার সিস্টেম (লাল = ধমনী / Artery, নীল = শিরা / Vein)',
      selectTopicLabel: 'শারীরিক অঙ্গ নির্বাচন করুন:',
      keyFunctionsTitle: 'মূল শারীরবৃত্তীয় কার্যাবলী',
      terminologyTitle: 'কঠিন চিকিৎসা শব্দের সহজ অর্থ',
      clinicalVsPlain: 'চিকিৎসা শব্দ বনাম সহজ ভাষা',
      funFactTitle: 'চিকিৎসা তথ্য ও বাস্তবতা',
      aiExplainBtn: 'এআই দিয়ে বিস্তারিত জানুন',
      aiExplaining: 'শারীরবৃত্তীয় ব্যাখ্যা তৈরি হচ্ছে...',
      aiModalTitle: 'এআই শারীরবৃত্তীয় বিশ্লেষণ',
      closeBtn: 'বন্ধ করুন',
      zoomTip: 'নিচের চিত্রে ধমনী, শিরা এবং অঙ্গসমূহের সংযোগ লক্ষ্য করুন।',
      arteryLabel: 'লাল = ধমনী (Artery)',
      veinLabel: 'নীল = শিরা (Vein)',
      toggleMarkers: 'চিহ্নিত স্থান',
    },
    quiz: {
      badge: 'সাধারণ শারীরবিদ্যা চ্যালেঞ্জ',
      title: 'শারীরস্থান ও স্বাস্থ্য জ্ঞানের কুইজ',
      subtitle: 'মানবদেহ সম্পর্কে আপনার জ্ঞান যাচাই করতে ৫টি নির্বাচিত প্রশ্ন।',
      progressText: (current, total) => `প্রশ্ন ${current} / ${total}`,
      scoreText: (score, total) => `স্কোর: ${score} / ${total}`,
      explanationLabel: 'শিক্ষামূলক ব্যাখ্যা:',
      nextBtn: 'পরবর্তী প্রশ্ন',
      finishBtn: 'ফলাফল দেখুন',
      restartBtn: 'পুনরায় কুইজ দিন',
      completedTitle: 'কুইজ সম্পন্ন হয়েছে!',
      completedDesc: (score, total) => `আপনি ${total} এর মধ্যে ${score} স্কোর করেছেন (${Math.round((score / total) * 100)}%)। শরীর সম্পর্কে জানার দারুণ প্রচেষ্টা!`,
      disclaimer: 'এই কুইজটি কেবল সাধারণ শারীরস্থান শিক্ষার জন্য। এটি কোনো চিকিৎসাগত মূল্যায়ন নয়।',
    },
    care: {
      badge: 'রোগীর নিরাপত্তা ও ডাক্তার পরামর্শ নির্দেশক',
      title: 'সেবা নির্দেশিকা ও নিরাপত্তা সহায়ক',
      subtitle: 'আপনার শারীরিক অস্বস্তি সম্পর্কে বলুন যাতে ডাক্তারের সাথে সাক্ষাতের প্রস্তুতি ও প্রাথমিক সতর্কতা জানা যায়।',
      inputLabel: 'আপনার শারীরিক সমস্যা বা সাধারণ প্রশ্নটি বিস্তারিত লিখুন:',
      inputPlaceholder: 'যেমন: কম্পিউটারে কাজের পর দুই দিন ধরে মৃদু মাথাব্যথা হচ্ছে এবং ক্লান্ত লাগছে...',
      submitBtn: 'বিশ্লেষণ করুন ও নির্দেশনা পান',
      analyzing: 'নিরাপত্তা মানদণ্ড যাচাই করা হচ্ছে...',
      emergencyDetectedAlert: 'জরুরি সতর্কবার্তা শনাক্ত হয়েছে',
      emergencyAction: 'এই পরিস্থিতিতে অনতিবিলম্বে জরুরি চিকিৎসা মূল্যায়নের প্রয়োজন হতে পারে। বিলম্ব করবেন না।',
      emergencyCallNow: 'বাংলাদেশে অবিলম্বে জরুরি সেবা ৯৯৯ নম্বরে কল করুন অথবা স্বাস্থ্য বাতায়ন ১৬২৬৩ ডায়াল করুন।',
      emergencyDialPrimary: 'জরুরি সেবা ৯৯৯',
      emergencyDialSecondary: 'স্বাস্থ্য বাতায়ন ১৬২৬৩',
      guidanceTitle: 'শিক্ষামূলক স্বাস্থ্য নির্দেশনা',
      whenToSeeDoctor: 'কখন পেশাদার ডাক্তারের পরামর্শ নেবেন',
      questionsForDoctor: 'চিকিৎসককে জিজ্ঞাসা করার মতো দরকারি প্রশ্ন',
      selfCareTips: 'সাধারণ বিশ্রাম ও প্রাথমিক সতর্কতা',
      redFlagsTitle: 'বিপদচিহ্ন (যেসব ক্ষেত্রে দ্রুত হাসপাতালে যাওয়া উচিত)',
      samplePromptsTitle: 'সাধারণ নমুনা উদাহরণ:',
      disclaimer: 'পালসব্রিজ কোনো রোগ নির্ণয় করে না বা ওষুধ দেয় না। এটি সচেতনতার জন্য সাধারণ সহায়ক গাইড।',
    },
    languages: {
      en: 'English (ইংরেজি)',
      ur: 'اردو (উর্দু - পাকিস্তান)',
      bn: 'বাংলা (Bangla - বাংলাদেশ)',
      ja: '日本語 (জাপানি - 日本)',
    },
  },
  ja: {
    appName: 'PulseBridge',
    tagline: 'より良い健康理解を。賢い次のステップへ。',
    disclaimerShort: 'PulseBridgeは健康に関する教育情報ツールであり、医師の診察や診断、救急対応の代わりにはなりません。',
    disclaimerFull: 'PulseBridgeは、人体の解剖学的構造や医学用語をわかりやすく解説する教育プラットフォームです。診断や治療方針の決定、医薬品の処方は行いません。健康上の不安がある場合は必ず医療従事者にご相談ください。生命に関わる緊急時は直ちに119番へ通報してください。',
    emergencyBanner: {
      title: '医療緊急警告サイン',
      description: 'ご自身や周囲の方に激しい胸の痛み、強い息切れ、脳卒中の兆候（顔のゆがみ・手足の麻痺・言語障害）、大量の出血、意識混濁がある場合は直ちに119番へ連絡してください。',
      callButton: '救急要請: 119番 (日本)',
      dialTel: 'tel:119',
      secondaryButton: '救急相談: #7119',
      secondaryTel: 'tel:7119',
      viewSigns: '緊急警告サインを確認する',
      hideSigns: '警告サインを閉じる',
    },
    nav: {
      home: 'ダッシュボード',
      chat: 'AI健康コンパニオン',
      anatomy: '人体解剖エクスプローラー',
      quiz: '健康クイズ',
      care: '受診・ケアガイド',
    },
    home: {
      badge: 'より良い健康理解を。賢い次のステップへ。',
      welcomeTitle: '専門的な医療と日常の理解をつなぐ、信頼と安心のナビゲーター。',
      welcomeSubtitle: '難解な医学用語をやさしい言葉にひも解き、人体の循環器ネットワークを深く学び、医師との対話に向けた確かな準備をサポートします。',
      welcomeMission: '不安や医学用語の壁を取り払い、誰もが自分のからだの仕組みを正しく納得して理解できる世界を目指して。',
      welcomeEvidence: 'リアルタイムの確かな医療エビデンスに基づき、次のステップへ自信を持って進むための健康ガイダンス。',
      askQuickPrompt: '健康や体の仕組みについて質問する...',
      askButton: 'コンパニオンに質問',
      featuresHeader: 'PulseBridgeの機能',
      featuresSubheader: 'からだの仕組みを学び、医師との円滑な対話に役立つツールをお選びください。',
      cardChatTitle: 'AI健康コンパニオン',
      cardChatDesc: '信頼できる情報源に基づき、医学用語や生体の働きをわかりやすい言葉で解説します。',
      cardAnatomyTitle: '人体解剖エクスプローラー',
      cardAnatomyDesc: '循環器系、心臓、血管網（動脈・静脈）の構造と役割を視覚的に探究できます。',
      cardQuizTitle: '健康クイズ',
      cardQuizDesc: '解剖学と健康知識に関する5問のクイズで、楽しく学びを深めましょう。',
      cardCareTitle: '受診・ケアガイド',
      cardCareDesc: '症状の整理、緊急性の確認、受診時に医師へ聞くべき質問をサポートします。',
      whyPulseBridgeTitle: 'PulseBridgeが選ばれる理由',
      whyItem1Title: '根拠に基づく情報',
      whyItem1Desc: 'Google検索グラウンディングとGeminiを活用し、信頼性の高い医療ソースを参照。',
      whyItem2Title: '多言語・アクセシビリティ',
      whyItem2Desc: '英語、ウルドゥー語、ベンガル語、日本語に対応。文字方向や可読性にも配慮。',
      whyItem3Title: '安全性を最優先',
      whyItem3Desc: '診断行為を行わず、緊急サイン検知時には直ちに通報を促す安全設計。',
      openToolBtn: 'ツールを開く',
      valuesTitle: '私たちが大切にしている医療倫理',
      valuesPillar1Title: '専門用語に頼らない平易さ',
      valuesPillar1Desc: '検査結果や医学用語をわかりやすく解説し、患者様やご家族の不安を和らげます。',
      valuesPillar2Title: '医師との対話を実りあるものに',
      valuesPillar2Desc: '限られた診療時間の中で症状を正確に伝え、有意義な相談ができるよう質問リストの作成をサポートします。',
      valuesPillar3Title: '厳格な安全基準とトリアージ',
      valuesPillar3Desc: '診断や投薬は行いません。緊急性が疑われる兆候を検知した場合は迷わず119番通報を促します。',
    },
    chat: {
      badge: 'AI健康・解剖学コンパニオン',
      title: 'AI健康コンパニオン',
      subtitle: '検査値の意味、医学用語、生体機能についてわかりやすくお答えします。',
      placeholder: '例: 収縮期血圧とは何ですか？ 肺循環の仕組みを教えてください。',
      send: '質問を送信',
      clear: '履歴を消去',
      emptyTitle: '健康や解剖学について質問してください',
      emptyDesc: '患者様目線のやさしい言葉で、信頼できる参照情報とともに解説します。',
      suggestedLabel: '質問のヒント:',
      suggestions: [
        '収縮期血圧（上の血圧）と拡張期血圧（下の血圧）の違いは？',
        '肺循環と体循環の違いについてわかりやすく教えて。',
        '赤血球のヘモグロビンはどのような働きをしていますか？',
        '動脈硬化とはどのような状態ですか？'
      ],
      sourcesLabel: '参照された信頼できる情報源:',
      groundedSearchNotice: 'Google検索グラウンディングにより事実確認を行っています。',
      loadingText: '医学知識を整理しています...',
      errorText: 'Gemini APIの利用制限に達しました。設定画面よりAPIキーをご確認ください。',
      retryBtn: '再試行',
      notDiagnosticNotice: '注記: 本回答は情報提供および教育目的のみであり、医学的診断ではありません。心配な症状がある場合は必ず医師にご相談ください。',
      emergencyDetectedNotice: '緊急警告: 重篤な緊急サインが検知されました。直ちに119番へ救急要請を行ってください。',
    },
    anatomy: {
      badge: '対話型人体解剖ラーニング',
      title: '人体解剖エクスプローラー',
      subtitle: '血管網、心臓、主要臓器の働きを学び、難しい用語を平易に読み解きます。',
      assetNotice: '人体循環器・血管系マップ（赤 = 動脈 / Artery、青 = 静脈 / Vein）',
      selectTopicLabel: '学ぶ部位を選択してください:',
      keyFunctionsTitle: '主な生理的役割',
      terminologyTitle: '医学用語とやさしい言葉',
      clinicalVsPlain: '専門用語 と 日常語の対比',
      funFactTitle: '解剖学のポイント',
      aiExplainBtn: 'AIでさらに詳しく学ぶ',
      aiExplaining: '生理学的解説を生成中...',
      aiModalTitle: 'AIによる生理機能解説',
      closeBtn: '閉じる',
      zoomTip: '下記の血管ネットワークと全身の主要循環経路を確認してください。',
      arteryLabel: '赤 = 動脈 (Artery)',
      veinLabel: '青 = 静脈 (Vein)',
      toggleMarkers: 'マーカー表示',
    },
    quiz: {
      badge: '人体生理学チャレンジ',
      title: '解剖学＆健康知識クイズ',
      subtitle: 'からだの仕組みを楽しく学べる全5問の選択式クイズ。',
      progressText: (current, total) => `第 ${current} 問 / 全 ${total} 問`,
      scoreText: (score, total) => `スコア: ${score} / ${total}`,
      explanationLabel: '解説:',
      nextBtn: '次の問題へ',
      finishBtn: '結果を確認する',
      restartBtn: 'もう一度挑戦する',
      completedTitle: 'クイズ終了！',
      completedDesc: (score, total) => `${total}問中 ${score}問正解しました（正答率: ${Math.round((score / total) * 100)}%）。人体の理解がさらに深まりました！`,
      disclaimer: 'このクイズは人体の解剖学的理解を深めるための教育ツールであり、健康診断や医学的判定ではありません。',
    },
    care: {
      badge: '受診・患者安全ナビゲーター',
      title: '受診・ケア安全ナビゲーター',
      subtitle: '気になる症状や体調の変化について、受診目安や医師に相談するポイントを整理します。',
      inputLabel: '気になる症状や体調について入力してください:',
      inputPlaceholder: '例: パソコン作業の後、2日前から軽い頭痛が続いており、体がだるく感じます...',
      submitBtn: '受診目安と注意点を確認',
      analyzing: '安全性基準を照合中...',
      emergencyDetectedAlert: '緊急警告サインを検知しました',
      emergencyAction: 'この状況は直ちに救急医療機関での診察が必要な可能性があります。受診を先延ばしにしないでください。',
      emergencyCallNow: '直ちに日本の救急通報（119番）へ連絡するか、救急安心センター（#7119）にご相談ください。',
      emergencyDialPrimary: '救急通報 119番',
      emergencyDialSecondary: '救急相談 #7119',
      guidanceTitle: '教育的健康ガイダンス',
      whenToSeeDoctor: '医師の診察を受ける目安',
      questionsForDoctor: '受診時に医師へ聞くべき質問リスト',
      selfCareTips: '自宅での一般的な安静・観察ポイント',
      redFlagsTitle: '注意すべき危険信号（レッドフラッグ）',
      samplePromptsTitle: '質問例のサンプル:',
      disclaimer: 'PulseBridgeは疾患の診断や薬の処方を行いません。医療機関を受診する際の判断材料としてご活用ください。',
    },
    languages: {
      en: 'English (英語 - 米国)',
      ur: 'اردو (Urdu - پاکستان)',
      bn: 'বাংলা (Bangla - বাংলাদেশ)',
      ja: '日本語 (Japanese - 日本)',
    },
  },
};

export function isRTL(lang: SupportedLanguage): boolean {
  return lang === 'ur';
}

export function getDir(lang: SupportedLanguage): 'rtl' | 'ltr' {
  return isRTL(lang) ? 'rtl' : 'ltr';
}
