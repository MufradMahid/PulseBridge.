import type { QuizQuestion, SupportedLanguage } from '../types/index.ts';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'heart',
    correctIndex: 1, // Left Ventricle
    question: {
      en: 'Which chamber of the human heart has the thickest muscular wall to pump oxygenated blood through the systemic circulation?',
      ur: 'انسانی دل کے کس خانے کی عضلاتی دیوار سب سے موٹی ہوتی ہے تاکہ خون کو پورے جسم میں پمپ کیا جا سکے؟',
      bn: 'সারা শরীরে অক্সিজেনযুক্ত রক্ত পাম্প করার জন্য মানব হৃৎপিণ্ডের কোন প্রকোষ্ঠের প্রাচীর সবচেয়ে পুরু?',
      ja: '酸素を含んだ血液を全身（体循環）へ力強く送り出すため、最も厚い筋肉壁を持つ心臓の部屋はどれですか？',
    },
    options: {
      en: ['Right Atrium', 'Left Ventricle', 'Right Ventricle', 'Left Atrium'],
      ur: ['دایاں ایٹریم (Right Atrium)', 'بایاں وینٹریکل (Left Ventricle)', 'دایاں وینٹریکل (Right Ventricle)', 'بایاں ایٹریم (Left Atrium)'],
      bn: ['ডান অলিন্দ (Right Atrium)', 'বাম নিলয় (Left Ventricle)', 'ডান নিলয় (Right Ventricle)', 'বাম অলিন্দ (Left Atrium)'],
      ja: ['右心房 (Right Atrium)', '左心室 (Left Ventricle)', '右心室 (Right Ventricle)', '左心房 (Left Atrium)'],
    },
    explanation: {
      en: 'The left ventricle generates high pressure to pump oxygenated blood through the aorta to the entire body, so its myocardium is roughly 3 times thicker than the right ventricle.',
      ur: 'بایاں وینٹریکل پورے جسم میں خون کی فراہمی کے لیے زیادہ دباؤ پیدا کرتا ہے، اس لیے اس کی دیوار دائیں وینٹریکل سے تین گنا زیادہ موٹی ہوتی ہے۔',
      bn: 'বাম নিলয় মহাধমনীর মাধ্যমে সারা শরীরে রক্ত পাম্প করতে উচ্চ চাপ তৈরি করে, তাই এর পেশী প্রাচীর ডান নিলয়ের চেয়ে প্রায় ৩ গুণ পুরু।',
      ja: '左心室は大動脈を通じて全身の毛細血管に至る高圧の体循環を担うため、右心室の約3倍もの厚い筋壁を持っています。',
    },
  },
  {
    id: 2,
    topic: 'blood_vessels',
    correctIndex: 0, // Pulmonary Veins
    question: {
      en: 'Which blood vessels represent the primary exception by transporting oxygen-rich blood rather than deoxygenated blood?',
      ur: 'وہ کون سی خون کی نالیاں ہیں جو عام وریدوں کے برعکس آکسیجن سے بھرپور خون لے جاتی ہیں؟',
      bn: 'কোন রক্তনালী ব্যতিক্রম হিসেবে সাধারণ শিরার মতো না হয়ে অক্সিজেনসমৃদ্ধ রক্ত বহন করে?',
      ja: '一般的な静脈とは異なり、酸素に富んだ鮮紅色の動脈血を運ぶ例外的な血管はどれですか？',
    },
    options: {
      en: ['Pulmonary Veins', 'Inferior Vena Cava', 'Jugular Vein', 'Renal Vein'],
      ur: ['پلمونری وریدیں (Pulmonary Veins)', 'انفیریئر وینا کاوا (Vena Cava)', 'جگولر ورید (Jugular Vein)', 'رینل ورید (Renal Vein)'],
      bn: ['পালমোনারি শিরা (Pulmonary Veins)', 'ইনফেরিয়র ভেনাকাভা', 'জুগুলার শিরা (Jugular Vein)', 'রেনাল শিরা (Renal Vein)'],
      ja: ['肺静脈 (Pulmonary Veins)', '下大静脈 (Inferior Vena Cava)', '内頸静脈 (Jugular Vein)', '腎静脈 (Renal Vein)'],
    },
    explanation: {
      en: 'While most veins carry oxygen-poor blood to the heart, pulmonary veins collect freshly oxygenated blood from the lungs and deliver it into the left atrium.',
      ur: 'عام طور پر وریدیں غیر آکسیجن والا خون لاتی ہیں، لیکن پلمونری وریدیں پھیپھڑوں سے تازہ اور آکسیجن والا خون دل کے بائیں حصے میں لاتی ہیں۔',
      bn: 'অধিকাংশ শিরা অক্সিজেনবিহীন রক্ত বহন করলেও পালমোনারি শিরা ফুসফুস থেকে তাজা অক্সিজেনযুক্ত রক্ত বাম অলিন্দে পৌঁছে দেয়।',
      ja: '一般に静脈は酸素の少ない血液を運びますが、肺静脈は肺で酸素を受け取ったばかりの新鮮な動脈血を心臓（左心房）へと運びます。',
    },
  },
  {
    id: 3,
    topic: 'circulation_loops',
    correctIndex: 2, // Capillaries
    question: {
      en: 'Where does the actual microscopic exchange of oxygen, carbon dioxide, and nutrients between blood and body tissues take place?',
      ur: 'خون اور جسمانی خلیات کے درمیان آکسیجن اور خوراک کا اصل تبادلہ کن باریک نالیوں میں ہوتا ہے؟',
      bn: 'রক্ত এবং দৈহিক কোষের মধ্যে অক্সিজেন, কার্বন ডাই-অক্সাইড ও পুষ্টি উপাদানের প্রত্যক্ষ বিনিময় কোথায় ঘটে?',
      ja: '血液と全身の組織細胞との間で、酸素・二酸化炭素・栄養素の実際の交換が行われる微小血管はどれですか？',
    },
    options: {
      en: ['Aorta', 'Lymph nodes', 'Capillaries', 'Large Veins'],
      ur: ['شہ رگ (Aorta)', 'لمف نوڈز (Lymph Nodes)', 'کیپلیریز (Capillaries)', 'بڑی وریدیں (Large Veins)'],
      bn: ['মহাধমনী (Aorta)', 'লসিকা গ্রন্থি', 'কৈশিক জালিকা (Capillaries)', 'প্রধান শিরাসমূহ'],
      ja: ['大動脈 (Aorta)', 'リンパ節 (Lymph Nodes)', '毛細血管 (Capillaries)', '大静脈 (Large Veins)'],
    },
    explanation: {
      en: 'Capillaries have microscopic walls composed of just a single layer of endothelial cells, allowing gases and glucose to diffuse easily into surrounding tissue fluid.',
      ur: 'کیپلیریز کی دیواریں صرف ایک خلیے جتنی پتلی ہوتی ہیں، جس کی وجہ سے گیسیں اور خوراک آسانی سے خلیات میں داخل ہو جاتی ہیں۔',
      bn: 'কৈশিক জালিকার প্রাচীর মাত্র এক স্তরের কোষ দিয়ে গঠিত, যার ফলে গ্যাস ও পুষ্টি উপাদান সহজেই কোষে ব্যাপিত হতে পারে।',
      ja: '毛細血管の壁はわずか1層の内皮細胞でできており、極めて薄いため、酸素やブドウ糖などの物質交換が容易に行われます。',
    },
  },
  {
    id: 4,
    topic: 'respiratory',
    correctIndex: 3, // Alveoli
    question: {
      en: 'What are the tiny microscopic air sacs in the lungs where oxygen passes into the bloodstream called?',
      ur: 'پھیپھڑوں کے وہ باریک خانے کیا کہلاتے ہیں جہاں سے آکسیجن خون میں شامل ہوتی ہے؟',
      bn: 'ফুসফুসের ক্ষুদ্রাতিক্ষুদ্র বায়ুথলিগুলোকে কী বলা হয় যেখান থেকে রক্তে অক্সিজেন প্রবেশ করে?',
      ja: '吸い込んだ空気から血液中へ酸素を取り込む、肺の末端にある微小な袋状の構造を何と呼びますか？',
    },
    options: {
      en: ['Bronchioles', 'Pleura', 'Trachea', 'Alveoli'],
      ur: ['برونکیولز (Bronchioles)', 'پلورا (Pleura)', 'سانس کی نالی (Trachea)', 'ایلویولائی (Alveoli)'],
      bn: ['ব্রঙ্কিওল (Bronchioles)', 'প্লুরা (Pleura)', 'শ্বাসনালী (Trachea)', 'অ্যালভিওলাই (Alveoli)'],
      ja: ['細気管支 (Bronchioles)', '胸膜 (Pleura)', '気管 (Trachea)', '肺胞 (Alveoli)'],
    },
    explanation: {
      en: 'Human lungs contain hundreds of millions of alveoli. Their gossamer-thin membranes are enveloped in capillary networks for instantaneous gas exchange.',
      ur: 'پھیپھڑوں میں کروڑوں ایلویولائی پائے جاتے ہیں جن کے گرد کیپلیریز کا جال ہوتا ہے جو فوری طور پر گیسوں کا تبادلہ کرتا ہے۔',
      bn: 'মানব ফুসফুসে লক্ষ লক্ষ অ্যালভিওলাই থাকে। এর চারপাশের সূক্ষ্ম কৈশিক জালিকা রক্তে তাৎক্ষণিক গ্যাস বিনিময়ে ভূমিকা রাখে।',
      ja: '肺には約3億〜5億個の肺胞があり、周囲を覆う毛細血管網を通じて瞬時に二酸化炭素と酸素のガス交換を行います。',
    },
  },
  {
    id: 5,
    topic: 'brain_nervous',
    correctIndex: 2, // Sinoatrial (SA) node
    question: {
      en: 'Which anatomical structure serves as the natural electrical pacemaker of the heart, initiating every heartbeat?',
      ur: 'دل کا قدرتی برقی پیس میکر کون سا حصہ ہے جو ہر دھڑکن کی ابتدا کرتا ہے؟',
      bn: 'হৃৎপিণ্ডের প্রাকৃতিক বৈদ্যুতিক পেসমেকার কোনটি যা প্রতিটি স্পন্দন সূচনা করে?',
      ja: '自発的にリズミカルな電気信号を発生させ、心臓の拍動を開始する「自然のペースメーカー」はどれですか？',
    },
    options: {
      en: ['Bundle of His', 'Atrioventricular (AV) node', 'Sinoatrial (SA) node', 'Purkinje fibers'],
      ur: ['بنڈل آف ہس (Bundle of His)', 'اے وی نوڈ (AV Node)', 'ایس اے نوڈ (SA Node)', 'پرکنجی فائبرز (Purkinje Fibers)'],
      bn: ['বান্ডেল অব হিজ', 'এভি নোড (AV Node)', 'এসএ নোড বা সাইনোট্রিয়াল নোড', 'পারকিঞ্জি তন্তু'],
      ja: ['ヒス束 (Bundle of His)', '房室結節 (AV Node)', '洞房結節 (SA Node)', 'プルキンエ線維 (Purkinje Fibers)'],
    },
    explanation: {
      en: 'The sinoatrial (SA) node, situated in the upper wall of the right atrium, generates rhythmic electrical signals setting the natural resting pace of around 60–100 beats per minute.',
      ur: 'ایس اے نوڈ دائیں ایٹریم کی دیوار میں واقع ہوتا ہے جو قدرتی برقی سگنل بنا کر دل کو فی منٹ 60 سے 100 بار دھڑکاتا ہے۔',
      bn: 'সাইনোট্রিয়াল (SA) নোড ডান অলিন্দের উপরিভাগে অবস্থিত যা স্বাভাবিক বিশ্রামকালে প্রতি মিনিটে ৬০-১০০ বার স্পন্দনের বৈদ্যুতিক সংকেত পাঠায়।',
      ja: '右心房の上部にある洞房結節（SAノード）が規則的な電気パルスを発生させ、平常時の毎分約60〜100回の拍動リズムを生み出しています。',
    },
  },
];

/**
 * Pure helper function to calculate quiz scores and progress
 */
export function calculateQuizScore(userAnswers: Record<number, number>): {
  score: number;
  total: number;
  percentage: number;
  isPerfect: boolean;
} {
  let score = 0;
  const total = QUIZ_QUESTIONS.length;

  for (const q of QUIZ_QUESTIONS) {
    if (userAnswers[q.id] === q.correctIndex) {
      score++;
    }
  }

  const percentage = Math.round((score / total) * 100);
  return {
    score,
    total,
    percentage,
    isPerfect: score === total,
  };
}
