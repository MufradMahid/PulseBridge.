import type { SupportedLanguage } from '../types/index.ts';

export interface EmergencyContactInfo {
  countryName: string;
  countryCode: string;
  flagEmoji: string;
  primaryNumber: string;
  primaryTel: string;
  primaryLabel: string;
  secondaryNumber?: string;
  secondaryTel?: string;
  secondaryLabel?: string;
  emergencyDepartmentAdvice: string;
  helplineNotice: string;
  warningSigns: Array<{
    title: string;
    description: string;
  }>;
  hideSignsText: string;
  viewSignsText: string;
  educationalNotice: string;
}

export const COUNTRY_EMERGENCY_DATA: Record<SupportedLanguage, EmergencyContactInfo> = {
  en: {
    countryName: 'United States',
    countryCode: 'US',
    flagEmoji: '🇺🇸',
    primaryNumber: '911',
    primaryTel: 'tel:911',
    primaryLabel: 'Emergency: Call 911 (USA)',
    secondaryNumber: '988',
    secondaryTel: 'tel:988',
    secondaryLabel: 'Crisis Lifeline: 988',
    emergencyDepartmentAdvice: 'Go immediately to the nearest emergency room (ER) or call 911. Do not drive yourself if experiencing chest pain, shortness of breath, or neurological deficits.',
    helplineNotice: 'For non-emergency suicide and crisis counseling, dial 988. For Poison Control, dial 1-800-222-1222.',
    hideSignsText: 'Hide Warning Signs',
    viewSignsText: 'View Warning Signs',
    educationalNotice: 'PulseBridge provides educational health literacy and does not replace emergency dispatch or medical intervention.',
    warningSigns: [
      {
        title: 'Severe Chest Pressure or Pain',
        description: 'Crushing sensation, heaviness, or pain radiating into left arm, jaw, neck, or back.',
      },
      {
        title: 'Acute Shortness of Breath',
        description: 'Gasping for air, rapid shallow breathing, blue lips, or inability to speak full sentences.',
      },
      {
        title: 'Stroke Red Flags (F.A.S.T.)',
        description: 'Facial drooping, arm or leg weakness, slurred speech, or sudden loss of balance.',
      },
      {
        title: 'Sudden Confusion or Unresponsiveness',
        description: 'Fainting, seizures, inability to awaken, or extreme disorientation.',
      },
      {
        title: 'Uncontrolled Bleeding',
        description: 'Continuous arterial or severe gushing blood that does not stop with direct pressure.',
      },
      {
        title: 'Severe Allergic Anaphylaxis',
        description: 'Throat swelling, hives, rapid pulse, and difficulty swallowing.',
      },
    ],
  },
  ur: {
    countryName: 'پاکستان (Pakistan)',
    countryCode: 'PK',
    flagEmoji: '🇵🇰',
    primaryNumber: '1122',
    primaryTel: 'tel:1122',
    primaryLabel: 'ریسکیو 1122 پر کال کریں (پاکستان)',
    secondaryNumber: '15',
    secondaryTel: 'tel:15',
    secondaryLabel: 'پولیس ایمرجنسی: 15',
    emergencyDepartmentAdvice: 'فوری طور پر قریبی سرکاری یا نجی اسپتال کے ایمرجنسی وارڈ میں جائیں یا 1122 پر کال کریں۔ دل کے دورے یا فالج کی صورت میں خود گاڑی نہ چلائیں۔',
    helplineNotice: 'ریسکیو 1122 پاکستان بھر میں ایمبولینس، فائر اور طبی امداد کے لیے 24 گھنٹے فعال ہے۔ ایدھی ایمبولینس کے لیے 115 ملائیں۔',
    hideSignsText: 'انتباہی علامات چھپائیں',
    viewSignsText: 'اہم انتباہی علامات دیکھیں',
    educationalNotice: 'پلس برج ایک تعلیمی پلیٹ فارم ہے اور یہ فوری طبی یا ایمرجنسی سروسز کا متبادل نہیں ہے۔',
    warningSigns: [
      {
        title: 'سینے میں شدید درد یا دباؤ',
        description: 'سینے پر بھاری بوجھ، یا ایسا درد جو بائیں بازو، جبڑے، گردن یا کمر میں پھیل رہا ہو۔',
      },
      {
        title: 'سانس لینے میں شدید دشواری',
        description: 'ہوا کے لیے تڑپنا، ہونٹوں کا نیلا ہونا، یا مکمل جملہ بولنے سے قاصر ہونا۔',
      },
      {
        title: 'فالج کی واضح علامات (F.A.S.T.)',
        description: 'چہرے کا ایک طرف جھک جانا، بازو یا ٹانگ کا بے جان ہونا، یا زبان کا لڑکھڑانا۔',
      },
      {
        title: 'بے ہوشی یا شدید الجھن',
        description: 'غشی، جھٹکے لگنا، اچانک ہوش و حواس کھو دینا یا جاگنے میں ناکامی۔',
      },
      {
        title: 'بے قابو خون کا بہاؤ',
        description: 'ایسی شدید خونریزی جو مسلسل دباؤ کے باوجود بند نہ ہو رہی ہو۔',
      },
      {
        title: 'شدید الرجک ری ایکشن (اینافلیکسس)',
        description: 'گلے میں سوجن، نگلنے میں دشواری، جسم پر دانے اور سانس کا بند ہونا۔',
      },
    ],
  },
  bn: {
    countryName: 'বাংলাদেশ (Bangladesh)',
    countryCode: 'BD',
    flagEmoji: '🇧🇩',
    primaryNumber: '999',
    primaryTel: 'tel:999',
    primaryLabel: 'জরুরি সেবা: ৯৯৯ (বাংলাদেশ)',
    secondaryNumber: '16263',
    secondaryTel: 'tel:16263',
    secondaryLabel: 'স্বাস্থ্য বাতায়ন: ১৬২৬৩',
    emergencyDepartmentAdvice: 'অবিলম্বে নিকটস্থ সরকারি বা বেসরকারি হাসপাতালের জরুরি বিভাগে যান অথবা ৯৯৯ নম্বরে অ্যাম্বুলেন্স সেবা চান। বুকে ব্যথা বা স্ট্রোকের লক্ষণ থাকলে নিজে গাড়ি চালাবেন না।',
    helplineNotice: 'জাতীয় জরুরি সেবা ৯৯৯ (পুলিশ, অ্যাম্বুলেন্স, ফায়ার) এবং সরকারি স্বাস্থ্য বাতায়ন ১৬২৬৩ নম্বরে ২৪ ঘণ্টা চিকিৎসকের পরামর্শ পাওয়া যায়।',
    hideSignsText: 'সতর্ক সংকেত লুকান',
    viewSignsText: 'জরুরি সতর্ক সংকেতসমূহ দেখুন',
    educationalNotice: 'পালসব্রিজ কেবল শিক্ষামূলক তথ্য প্রদান করে এবং জরুরি জীবনরক্ষাকারী সেবার বিকল্প নয়।',
    warningSigns: [
      {
        title: 'বুকে তীব্র চাপ বা অসহ্য ব্যথা',
        description: 'ভারী পাথরের মতো চাপ অনুভব করা, যা বাম হাত, চোয়াল, ঘাড় বা পিঠের দিকে ছড়িয়ে পড়ে।',
      },
      {
        title: 'তীব্র শ্বাসকষ্ট বা শ্বাসরোধের অনুভূতি',
        description: 'বাতাসের জন্য হাঁসফাঁস করা, ঠোঁট বা নখ নীল হয়ে যাওয়া, কথা বলতে না পারা।',
      },
      {
        title: 'স্ট্রোকের বিপদচিহ্ন (F.A.S.T.)',
        description: 'মুখ একদিকে বেঁকে যাওয়া, হাত বা পা অবশ হওয়া, কথা জড়িয়ে যাওয়া বা কথা বলতে অক্ষমতা।',
      },
      {
        title: 'হঠাৎ জ্ঞান হারানো বা খিঁচুনি',
        description: 'অচেতন হয়ে পড়া, ডাকলে সাড়া না দেওয়া, অথবা হঠাৎ অস্বাভাবিক বিভ্রান্তি।',
      },
      {
        title: 'অবিরাম ও মারাত্মক রক্তক্ষরণ',
        description: 'চাপ প্রয়োগ করার পরেও রক্তপাত বন্ধ না হওয়া বা গভীর ক্ষতের রক্তক্ষরণ।',
      },
      {
        title: 'তীব্র অ্যালার্জি জনিত শ্বাসকষ্ট',
        description: 'গলা ফুলে যাওয়া, গিলতে কষ্ট হওয়া এবং সারা শরীরে দ্রুত চুলকানি ও ফোসকা পড়া।',
      },
    ],
  },
  ja: {
    countryName: '日本 (Japan)',
    countryCode: 'JP',
    flagEmoji: '🇯🇵',
    primaryNumber: '119',
    primaryTel: 'tel:119',
    primaryLabel: '救急要請: 119番 (日本)',
    secondaryNumber: '#7119',
    secondaryTel: 'tel:7119',
    secondaryLabel: '救急安心センター: #7119',
    emergencyDepartmentAdvice: '激しい胸痛や意識障害がある場合は自力で移動せず、直ちに119番で救急車を要請してください。到着まで安全な場所で安静を保ってください。',
    helplineNotice: '救急車を呼ぶべきか迷った時は、救急安心センター事業（#7119）で看護師や専門医の相談を受けることができます。',
    hideSignsText: '警告サインを閉じる',
    viewSignsText: '緊急警告サインを確認する',
    educationalNotice: 'PulseBridgeは健康教育プラットフォームであり、救急医療や緊急対応の代わりにはなりません。',
    warningSigns: [
      {
        title: '激しい胸の圧迫感・締め付けられる痛み',
        description: '締め付けられるような激痛、左肩・腕・顎・背中へ放散する持続的な痛み。',
      },
      {
        title: '呼吸困難・激しい息切れ',
        description: 'あえぐような呼吸、唇や爪が紫色になるチアノーゼ、会話が困難な息苦しさ。',
      },
      {
        title: '脳卒中の緊急兆候（F.A.S.T.）',
        description: '顔の片側のゆがみ、手足の脱力や麻痺、言葉のもつれ・ろれつが回らない。',
      },
      {
        title: '意識混濁・けいれん・失神',
        description: '呼びかけへの反応がない、倒れて動かない、突然の激しい痙攣。',
      },
      {
        title: '止まらない大量出血',
        description: '圧迫止血を行っても勢いよく流れ続ける出血や深い創傷。',
      },
      {
        title: 'アナフィラキシー（重度アレルギー）',
        description: '喉の腫れ、呼吸音の異常、急激な血圧低下、全身の激しいじんましん。',
      },
    ],
  },
};
