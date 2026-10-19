import type { CareTriageResult, SupportedLanguage } from '../types/index.ts';

export interface EmergencyRule {
  id: string;
  category: 'chest_pain' | 'breathing' | 'stroke' | 'bleeding' | 'consciousness';
  severity: 'critical';
  keywords: string[];
}

export const EMERGENCY_RULES: EmergencyRule[] = [
  {
    id: 'chest_pain',
    category: 'chest_pain',
    severity: 'critical',
    keywords: [
      'chest pain',
      'crushing chest',
      'pain radiating to arm',
      'tightness in chest',
      'heart attack',
      'pressure in chest',
      'سینے میں درد',
      'سینے میں دباؤ',
      'سینے میں شدید درد',
      'دل کا دورہ',
      'বুকে ব্যথা',
      'বুকে চাপ',
      'বুকে তীব্র ব্যথা',
      'হার্ট অ্যাটাক',
      '胸痛',
      '激しい胸痛',
      '胸の激しい痛み',
      '胸が締め付けられる',
      '締め付けられるような激しい胸痛',
      '心筋梗塞',
      '胸部圧迫感'
    ],
  },
  {
    id: 'severe_breathing',
    category: 'breathing',
    severity: 'critical',
    keywords: [
      'cannot breathe',
      "can't breathe",
      'severe shortness of breath',
      'unable to breathe',
      'gasping for air',
      'blue lips',
      'stridor',
      'سانس نہیں آرہا',
      'شدید دم گھٹنا',
      'سانس لینے میں شدید دشواری',
      'শ্বাস নিতে পারছি না',
      'তীব্র শ্বাসকষ্ট',
      'দম বন্ধ',
      '息ができない',
      '呼吸困難',
      '激しい息切れ',
      '呼吸が苦しい'
    ],
  },
  {
    id: 'stroke_signs',
    category: 'stroke',
    severity: 'critical',
    keywords: [
      'face drooping',
      'slurred speech',
      'arm weakness',
      'facial droop',
      'stroke',
      'sudden numbness one side',
      'cannot speak clearly',
      'فالج',
      'چہرہ ٹیڑھا',
      'بولنے میں رکاوٹ',
      'ایک طرف کمزوری',
      'মুখ বেঁকে যাওয়া',
      'কথা জড়িয়ে যাওয়া',
      'একপাশ অবশ',
      'স্ট্রোক',
      '顔のゆがみ',
      '顔の片側',
      'ろれつが回らない',
      '片側の麻痺',
      '脳卒中',
      '急に言葉が出ない',
      '言葉がうまく出ません'
    ],
  },
  {
    id: 'uncontrolled_bleeding',
    category: 'bleeding',
    severity: 'critical',
    keywords: [
      'uncontrolled bleeding',
      'bleeding heavily',
      'gushing blood',
      'cannot stop bleeding',
      'arterial bleeding',
      'خون رک نہیں رہا',
      'بے قابو خون بہنا',
      'شدید خونریزی',
      'রক্তপাত থামছে না',
      'প্রচুর রক্তপাত',
      'মারাত্মক রক্তক্ষরণ',
      '血が止まらない',
      '大量出血',
      '激しい出血'
    ],
  },
  {
    id: 'loss_of_consciousness',
    category: 'consciousness',
    severity: 'critical',
    keywords: [
      'unconscious',
      'passed out',
      'blacked out',
      'loss of consciousness',
      'unresponsive',
      'seizure active',
      'بے ہوش',
      'غشی',
      'ہوش کھو بیٹھا',
      'অজ্ঞান হয়ে গেছে',
      'জ্ঞান হারিয়েছে',
      'সাড়া দিচ্ছে না',
      '意識不明',
      '気を失った',
      '倒れて意識がない',
      '意識混濁'
    ],
  },
];

export const PROMPT_CONSULTATION_KEYWORDS = [
  'high fever',
  'persistent vomiting',
  'dehydration',
  'rash spreading',
  'deep wound',
  'severe abdominal pain',
  'blood in urine',
  'blood in stool',
  'شدید بخار',
  'مسلسل الٹیاں',
  'پیٹ میں شدید درد',
  'তীব্র জ্বর',
  'অতিরিক্ত বমি',
  'প্রস্রাবে রক্ত',
  '高熱',
  '激しい腹痛',
  '持続する嘔吐',
  '血尿'
];

/**
 * Checks text for red-flag emergency symptoms in any supported language
 */
export function detectEmergencySigns(text: string): {
  isEmergency: boolean;
  matchedCategories: string[];
  matchedKeywords: string[];
} {
  const normalized = text.toLowerCase();
  const matchedCategories: string[] = [];
  const matchedKeywords: string[] = [];

  for (const rule of EMERGENCY_RULES) {
    for (const kw of rule.keywords) {
      if (normalized.includes(kw.toLowerCase())) {
        if (!matchedCategories.includes(rule.category)) {
          matchedCategories.push(rule.category);
        }
        if (!matchedKeywords.includes(kw)) {
          matchedKeywords.push(kw);
        }
      }
    }
  }

  return {
    isEmergency: matchedCategories.length > 0,
    matchedCategories,
    matchedKeywords,
  };
}

/**
 * Analyzes health text and returns a structured triage outcome
 */
export function evaluateCareTriage(userInput: string, _lang: SupportedLanguage = 'en'): CareTriageResult {
  const emergencyCheck = detectEmergencySigns(userInput);

  if (emergencyCheck.isEmergency) {
    return {
      isEmergency: true,
      urgencyLevel: 'immediate_emergency',
      detectedTriggers: emergencyCheck.matchedKeywords,
      guidanceText: {
        en: {
          bannerTitle: 'CRITICAL ALERT: Potential Medical Emergency Detected',
          bannerBody: 'The symptoms you described match emergency clinical indicators. Immediate medical intervention is required.',
          actionSteps: [
            'Call your local emergency number (e.g., 911 in North America, 112 in Europe, 999 in UK/Bangladesh, 119 in Japan) right now.',
            'Do NOT attempt to drive yourself to the emergency department. Request an ambulance.',
            'Sit or lie down in a safe, resting position while waiting for first responders.',
            'Keep doors unlocked so paramedics can enter easily if you are alone.'
          ],
          doctorQuestions: [
            'What exact time did these severe symptoms start?',
            'What medications, substances, or recent health events could be related?'
          ],
          redFlags: [
            'Worsening chest tightness, confusion, inability to speak, cyanosis (blue lips/fingers).'
          ],
          disclaimer: 'PulseBridge does not provide clinical diagnosis. Emergency protocols require immediate evaluation by certified emergency personnel.'
        },
        ur: {
          bannerTitle: 'شدید انتباہ: فوری طبی ایمرجنسی کی علامت پائی گئی ہے',
          bannerBody: 'آپ کی بیان کردہ علامات فوری ایمرجنسی خدمات کے دائرے میں آتی ہیں۔ وقت ضائع کیے بغیر طبی امداد لیں۔',
          actionSteps: [
            'فوری طور پر ریسکیو 1122 یا اپنے علاقے کی ایمرجنسی ہیلپ لائن پر کال کریں۔',
            'خود گاڑی چلا کر اسپتال جانے سے گریز کریں اور ایمبولینس کا انتظار کریں۔',
            'پرسکون پوزیشن میں بیٹھ جائیں یا لیٹ جائیں۔',
            'اگر اکیلے ہیں تو گھر کا دروازہ کھلا رکھیں تاکہ طبی عملہ آسانی سے داخل ہو سکے۔'
          ],
          doctorQuestions: [
            'یہ شدید علامات کس وقت شروع ہوئیں؟',
            'کیا اس سے پہلے دل، سانس یا بلڈ پریشر کا کوئی مسئلہ تھا؟'
          ],
          redFlags: [
            'ہوش و حواس میں کمی، ہونٹوں کا نیلا پڑنا، یا شدید پسینہ۔'
          ],
          disclaimer: 'پلس برج تشخیص نہیں کرتا۔ ایسی صورتحال میں فوری طور پر اسپتال کے ایمرجنسی روم پہنچنا ضروری ہے۔'
        },
        bn: {
          bannerTitle: 'জরুরি সতর্কতা: সম্ভাব্য জরুরি স্বাস্থ্যঝুঁকি শনাক্ত হয়েছে',
          bannerBody: 'আপনার উল্লেখিত লক্ষণসমূহ তাৎক্ষণিক জরুরি চিকিৎসার আওতাভুক্ত। অনুগ্রহ করে কালক্ষেপণ করবেন না।',
          actionSteps: [
            'অবিলম্বে স্থানীয় জরুরি সেবায় (যেমন ৯৯৯ বা ১১২) কল করে অ্যাম্বুলেন্স ডাকুন।',
            'নিজে গাড়ি চালিয়ে হাসপাতালে যাওয়ার চেষ্টা করবেন না।',
            'বিশ্রামের উপযুক্ত স্থানে স্থির হয়ে বসুন বা শুয়ে থাকুন।',
            'জরুরি কর্মীরা যাতে সহজে প্রবেশ করতে পারেন সেজন্য দরজা উন্মুক্ত রাখুন।'
          ],
          doctorQuestions: [
            'লক্ষণগুলো ঠিক কোন সময়ে তীব্র আকার ধারণ করেছে?',
            'পূর্বে এমন কোনো হৃদরোগ বা শ্বাসযন্ত্রের সমস্যা ছিল কি না?'
          ],
          redFlags: [
            'তীব্র বিভ্রান্তি, ঠোঁট বা নখ নীল হয়ে যাওয়া, কথা বন্ধ হয়ে যাওয়া।'
          ],
          disclaimer: 'পালসব্রিজ কোনো রোগ নির্ণয় করে না। জীবনরক্ষাকারী সহায়তার জন্য প্রত্যয়িত জরুরি চিকিৎসকদের শরণাপন্ন হওয়া আবশ্যক।'
        },
        ja: {
          bannerTitle: '緊急警告: 直ちに医療対応が必要な症状が検知されました',
          bannerBody: '入力された症状には、一刻を争う緊急病態の兆候が含まれています。直ちに救急医療機関を受診してください。',
          actionSteps: [
            '迷わず直ちに119番（救急要請）へ通報してください。',
            '自力で運転して病院へ向かわず、救急車の到着を待ってください。',
            '安全な場所で安静な姿勢を保ち、衣服を緩めて呼吸を確保してください。',
            '救急隊員が速やかに入室できるよう、可能であれば玄関の鍵を開けておいてください。'
          ],
          doctorQuestions: [
            '症状が最も強く現れ始めた正確な時刻はいつですか？',
            '現在服用している薬や、既往歴（心疾患や高血圧など）はありますか？'
          ],
          redFlags: [
            '意識の低下、チアノーゼ（唇や爪が青白い）、呼びかけへの反応の鈍化。'
          ],
          disclaimer: 'PulseBridgeは医療診断を行いません。直ちに有資格の救急医療チームによる評価と処置が必要です。'
        }
      }
    };
  }

  // Non-emergency educational triage
  const normalized = userInput.toLowerCase();
  const hasPromptKeyword = PROMPT_CONSULTATION_KEYWORDS.some(k => normalized.includes(k.toLowerCase()));

  const urgency = hasPromptKeyword ? 'prompt_consultation' : 'routine_educational';

  return {
    isEmergency: false,
    urgencyLevel: urgency,
    detectedTriggers: [],
    guidanceText: {
      en: {
        bannerTitle: urgency === 'prompt_consultation' ? 'Prompt Medical Evaluation Advised' : 'General Educational Health Information',
        bannerBody: urgency === 'prompt_consultation'
          ? 'Your symptoms suggest that speaking with a healthcare professional within 24 to 48 hours is strongly recommended.'
          : 'Based on your general health inquiry, here is educational context to understand your body and prepare for your doctor visit.',
        actionSteps: [
          'Track the pattern: Note when symptoms peak, what relieves them, and what makes them worse.',
          'Schedule a consultation with your primary care physician or local community clinic.',
          'Stay well-hydrated, rest adequately, and avoid strenuous exertion until evaluated.',
          'Do not take new over-the-counter medications that might mask diagnostic symptoms without consulting a pharmacist or doctor.'
        ],
        doctorQuestions: [
          'Based on my symptoms and health history, what tests or evaluations do you recommend?',
          'What are the possible underlying causes for this pattern of symptoms?',
          'What specific warning signs should prompt me to go to an urgent care clinic or emergency room?'
        ],
        redFlags: [
          'Sudden spike in high fever, confusion, persistent vomiting unable to keep liquids down, or severe new localized pain.'
        ],
        disclaimer: 'This guidance is educational and does not provide diagnosis or treatment recommendations. Always consult a licensed physician.'
      },
      ur: {
        bannerTitle: urgency === 'prompt_consultation' ? 'ڈاکٹر سے جلد معائنہ کروانے کا مشورہ' : 'عمومی تعلیمی رہنمائی',
        bannerBody: urgency === 'prompt_consultation'
          ? 'آپ کی علامات بتاتی ہیں کہ 24 سے 48 گھنٹوں کے اندر مستند معالج سے رجوع کرنا مناسب ہوگا۔'
          : 'آپ کی شکایت کے بارے میں تعلیمی معلومات اور ڈاکٹر سے گفتگو کی تیاری کے اہم نکات درج ذیل ہیں۔',
        actionSteps: [
          'علامات کی ڈائری بنائیں: درد یا تکلیف کب شروع ہوئی اور کس چیز سے آرام ملتا ہے۔',
          'اپنے خاندانی معالج یا قریبی کلینک سے معائنے کا وقت طے کریں۔',
          'مناسب آرام کریں اور خود سے کوئی نئی دوائی شروع کرنے سے گریز کریں۔',
          'پانی اور نمکیات کا مناسب استعمال یقینی بنائیں۔'
        ],
        doctorQuestions: [
          'ان علامات کی اصل وجہ جاننے کے لیے کن ٹیسٹوں کی ضرورت ہو سکتی ہے؟',
          'کیا یہ علامات کسی مخصوص طرز زندگی یا خوراک سے متعلق ہیں؟',
          'کن علامات کے ظاہر ہونے پر مجھے فوری ایمرجنسی میں جانا چاہیے؟'
        ],
        redFlags: [
          'بہت تیز بخار، شدید پیٹ درد، چکر آنا یا مسلسل قے آنا۔'
        ],
        disclaimer: 'یہ معلومات محض تعلیمی رہنمائی کے لیے ہیں۔ ڈاکٹر کا معائنہ لازمی ہے۔'
      },
      bn: {
        bannerTitle: urgency === 'prompt_consultation' ? 'চিকিৎসকের সাথে দ্রুত সাক্ষাতের পরামর্শ' : 'সাধারণ শিক্ষামূলক স্বাস্থ্য তথ্য',
        bannerBody: urgency === 'prompt_consultation'
          ? 'আপনার উল্লেখিত লক্ষণের প্রেক্ষিতে আগামী ২৪ থেকে ৪৮ ঘণ্টার মধ্যে একজন নিবন্ধিত চিকিৎসকের সাথে পরামর্শ করা বাঞ্ছনীয়।'
          : 'আপনার শারীরিক সমস্যা বোঝার জন্য এবং ডাক্তারের সাথে সঠিক আলোচনার সুবিধার্থে শিক্ষামূলক তথ্যাবলী নিচে দেওয়া হলো।',
        actionSteps: [
          'লক্ষণসমূহ পর্যবেক্ষণ করুন: কখন সমস্যা বাড়ে বা কমে তা লিখে রাখুন।',
          'আপনার প্রাথমিক স্বাস্থ্যসেবা চিকিৎসকের সাথে সাক্ষাতের সময় নির্ধারণ করুন।',
          'পর্যাপ্ত বিশ্রাম নিন এবং চিকিৎসকের পরামর্শ ছাড়া নিজের সিদ্ধান্তে ওষুধ গ্রহণ বন্ধ রাখুন।',
          'শরীরে পানির অভাব যাতে না ঘটে সেদিকে খেয়াল রাখুন।'
        ],
        doctorQuestions: [
          'আমার এই উপসর্গের সম্ভাব্য মূল কারণগুলো কী কী হতে পারে?',
          'রোগ নির্ণয়ের জন্য কোনো রক্ত বা ইমেজিং পরীক্ষার প্রয়োজন আছে কি?',
          'কোন নির্দিষ্ট লক্ষণ দেখা দিলে আমার জরুরি বিভাগে যাওয়া উচিত?'
        ],
        redFlags: [
          'অতিরিক্ত জ্বর, বিভ্রান্তি, কোনো তরল পানীয় পেটে রাখতে না পারা, বা তীব্র স্থানীয় ব্যথা।'
        ],
        disclaimer: 'এই নির্দেশিকা কোনো রোগ নির্ণয় বা চিকিৎসা প্রদান করে না। চিকিৎসকের পরামর্শই চূড়ান্ত।'
      },
      ja: {
        bannerTitle: urgency === 'prompt_consultation' ? '早めの医療機関受診をおすすめします' : '一般的な健康教育ガイダンス',
        bannerBody: urgency === 'prompt_consultation'
          ? '記載された症状からは、24〜48時間以内に医師の診察を受けることが推奨されます。'
          : 'ご自身の体の状態を理解し、医師との相談を円滑に進めるための健康情報です。',
        actionSteps: [
          '症状の記録: いつから始まり、どのような時に悪化・軽快するかをメモしておきましょう。',
          'かかりつけ医や地域の医療機関へ相談し、受診の予約を取りましょう。',
          '十分な休養と水分補給を心がけ、無理な運動は避けてください。',
          '症状を隠してしまう可能性があるため、医師への相談前に自己判断で市販薬を多用しないようにしましょう。'
        ],
        doctorQuestions: [
          'この症状の原因として、どのような病態が考えられますか？',
          '確定的な評価のために必要な検査（血液検査や画像検査など）はありますか？',
          'どのような変化があった場合、夜間や休日の救急外来を受診すべきですか？'
        ],
        redFlags: [
          '急な高熱、意識のもうろう感、飲食が全く受け付けられない状態、耐え難い局所痛。'
        ],
        disclaimer: '本ガイダンスは教育目的のものであり、医学的診断や処方を行うものではありません。'
      }
    }
  };
}
