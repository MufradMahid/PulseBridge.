import { AnatomyTopic } from '../types';

export const ANATOMY_TOPICS: AnatomyTopic[] = [
  {
    id: 'heart',
    category: 'circulatory',
    svgRegionId: 'heart_region',
    name: {
      en: 'The Human Heart',
      ur: 'انسانی دل (The Heart)',
      bn: 'মানব হৃৎপিণ্ড (The Heart)',
      ja: '心臓 (The Human Heart)',
    },
    subtitle: {
      en: 'Central muscular pump of the cardiovascular system',
      ur: 'قلبی نظام کا مرکزی عضلاتی پمپ',
      bn: 'রক্তসংবহনতন্ত্রের প্রধান পেশীবহুল পাম্প',
      ja: '全身に血液を送り出す中心的な筋性ポンプ',
    },
    summary: {
      en: 'The heart is a four-chambered muscular organ roughly the size of a fist. It beats approximately 100,000 times a day, propelling oxygen-rich blood through thousands of miles of blood vessels to sustain every organ.',
      ur: 'دل ایک چار خانوں پر مشتمل عضلاتی عضو ہے جو مٹھی کے برابر ہوتا ہے۔ یہ روزانہ تقریباً ایک لاکھ بار دھڑکتا ہے اور جسم کے تمام اعضاء کو آکسیجن سے بھرپور خون پہنچاتا ہے۔',
      bn: 'হৃৎপিণ্ড চারটি প্রকোষ্ঠ বিশিষ্ট একটি পেশীবহুল অঙ্গ যা প্রায় একটি মুষ্টির সমান। এটি দিনে প্রায় ১,০০,০০০ বার স্পন্দিত হয়ে সমগ্র দেহে অক্সিজেন সমৃদ্ধ রক্ত সঞ্চালিত করে।',
      ja: '心臓は握りこぶし大の筋肉でできた4つの部屋を持つ臓器です。1日に約10万回拍動し、酸素と栄養に富んだ血液を全身の血管網へ送り出しています。',
    },
    keyFunctions: {
      en: [
        'Right atrium & ventricle pump deoxygenated blood to the lungs for gas exchange.',
        'Left atrium & ventricle pump oxygenated blood through the aorta to the entire body.',
        'Cardiac valves (mitral, tricuspid, aortic, pulmonary) enforce unidirectional blood flow.',
        'Sinoatrial (SA) node generates natural electrical impulses regulating heart rate.'
      ],
      ur: [
        'دایاں ایٹریم اور وینٹریکل غیر آکسیجن شدہ خون کو گیسوں کے تبادلے کے لیے پھیپھڑوں میں بھیجتے ہیں۔',
        'بایاں ایٹریم اور وینٹریکل آکسیجن شدہ خون کو شہ رگ (Aorta) کے ذریعے پورے جسم میں پمپ کرتے ہیں۔',
        'دل کے والوز خون کے بہاؤ کو صرف ایک سمت میں برقرار رکھتے ہیں۔',
        'ایس اے نوڈ (SA Node) دل کی دھڑکن کو متوازن رکھنے کے لیے قدرتی برقی سگنل پیدا کرتا ہے۔'
      ],
      bn: [
        'ডান অলিন্দ ও নিলয় অক্সিজেনবিহীন রক্ত ফুসফুসে পাঠায় গ্যাসীয় বিনিময়ের জন্য।',
        'বাম অলিন্দ ও নিলয় অক্সিজেনযুক্ত রক্ত মহাধমনীর (Aorta) মাধ্যমে সারা শরীরে পাম্প করে।',
        'হৃদকপাটিকাসমূহ রক্তের একমুখী প্রবাহ নিশ্চিত করে।',
        'সাইনোট্রিয়াল নোড (SA node) প্রাকৃতিক বৈদ্যুতিক সংকেত তৈরি করে হৃদস্পন্দন নিয়ন্ত্রণ করে।'
      ],
      ja: [
        '右心房・右心室が酸素を失った静脈血を肺へ送り出し、ガス交換を行います。',
        '左心房・左心室が酸素をたっぷり含んだ動脈血を大動脈を通して全身へ拍出します。',
        '4つの心臓弁（僧帽弁、三尖弁、大動脈弁、肺動脈弁）が逆流を防ぎ一方向の血流を保ちます。',
        '洞結節（SAノード）が規則的な電気刺激を発生させ、心拍リズムを調整します。'
      ]
    },
    clinicalPlainPairs: [
      {
        medical: 'Myocardium',
        plain: {
          en: 'The thick muscular middle layer of the heart wall responsible for pumping.',
          ur: 'دل کی درمیانی موٹی عضلاتی تہ جو خون پمپ کرنے کا کام کرتی ہے۔',
          bn: 'হৃৎপিণ্ডের মধ্যবর্তী প্রধান পেশীস্তর যা সংকুচিত হয়ে রক্ত পাম্প করে।',
          ja: '力強く収縮して血液を押し出す、心臓の壁を構成する厚い筋肉層。'
        }
      },
      {
        medical: 'Systole & Diastole',
        plain: {
          en: 'Systole is when the heart contracts (pumps out); diastole is when it relaxes and refills.',
          ur: 'سسٹول وہ مرحلہ ہے جب دل سکڑ کر خون باہر پھینکتا ہے، اور ڈائسٹول میں دل پھیل کر خون سے بھرتا ہے۔',
          bn: 'সিস্টোল হলো হৃৎপিণ্ডের সংকোচনের সময় এবং ডায়াস্টোল হলো হৃদপেশীর শিথিল হয়ে রক্তে পূর্ণ হওয়ার সময়।',
          ja: '収縮期（シストール）は心臓が血液を押し出す時、拡張期（ディアストール）は心臓が広がり血液を補充する時です。'
        }
      },
      {
        medical: 'Coronary Arteries',
        plain: {
          en: 'Specialized blood vessels wrapping the exterior of the heart to nourish the heart muscle itself.',
          ur: 'دل کی بیرونی سطح پر موجود وہ خون کی نالیاں جو خود دل کے پٹھوں کو خون اور آکسیجن فراہم کرتی ہیں۔',
          bn: 'হৃৎপিণ্ডের বাইরের বিশেষ রক্তনালী যা সরাসরি হৃদপেশীতে অক্সিজেন ও পুষ্টি সরবরাহ করে।',
          ja: '心臓自身の筋肉に酸素と栄養を直接供給する冠状動脈（冠動脈）。'
        }
      }
    ],
    educationalFact: {
      en: 'The human heart pumps roughly 2,000 gallons (7,570 liters) of blood every single day through a network exceeding 60,000 miles of vessels.',
      ur: 'انسانی دل روزانہ تقریباً ساڑھے سات ہزار لیٹر خون پمپ کرتا ہے جو ساٹھ ہزار میل طویل نالیوں میں گردش کرتا ہے۔',
      bn: 'মানব হৃৎপিণ্ড প্রতিদিন প্রায় ৭,৫৭০ লিটার রক্ত ৬০,০০০ মাইলেরও বেশি দীর্ঘ রক্তনালী জালিকার মধ্য দিয়ে সঞ্চালিত করে।',
      ja: '人間の心臓は1日に約7,500リットルもの血液を、全長約9万キロメートル（地球2周強）にも及ぶ血管網へと送り出しています。'
    }
  },
  {
    id: 'blood_vessels',
    category: 'circulatory',
    svgRegionId: 'vessels_region',
    name: {
      en: 'Blood Vessels: Arteries & Veins',
      ur: 'خون کی نالیاں: شریانیں اور وریدیں',
      bn: 'রক্তনালী: ধমনী ও শিরা (Arteries & Veins)',
      ja: '血管系: 動脈と静脈 (Arteries & Veins)',
    },
    subtitle: {
      en: 'High-pressure distribution and return network',
      ur: 'خون کی ترسیل اور واپسی کا متوازن نظام',
      bn: 'উচ্চচাপ সংবহন এবং রক্ত প্রত্যাবর্তন তন্ত্র',
      ja: '酸素供給と老廃物回収を担う高圧・低圧の循環網',
    },
    summary: {
      en: 'Blood vessels are the highways of the human body. Arteries carry oxygen-rich blood away from the heart under high pressure with elastic, muscular walls. Veins carry deoxygenated blood back to the heart under low pressure, assisted by one-way valves.',
      ur: 'خون کی نالیاں جسم کی شریانیں اور راستے ہیں۔ شریانیں (Arteries) دل سے تازہ خون پورے جسم میں لے جاتی ہیں جبکہ وریدیں (Veins) والوز کی مدد سے استعمال شدہ خون واپس دل تک لاتی ہیں۔',
      bn: 'রক্তনালীগুলো মানবদেহের প্রধান পরিবহন পথ। ধমনী (লাল) উচ্চ চাপে হৃদপিণ্ড থেকে সারা দেহে অক্সিজেনযুক্ত রক্ত বহন করে। শিরা (নীল) একমুখী কপাটিকার সাহায্যে রক্ত পুনরায় হৃৎপিণ্ডে ফেরত নিয়ে আসে।',
      ja: '血管は人体のハイウェイです。動脈（赤）は弾力ある厚い壁で高い圧力に耐えながら酸素の多い血液を全身へ届け、静脈（青）は逆流防止弁を使って低圧の血液を心臓へ送り返します。',
    },
    keyFunctions: {
      en: [
        'Arteries (Red) feature thick elastic muscular walls to withstand systolic blood pressure.',
        'Arterioles act as adjustable resistance valves regulating regional blood flow and systemic blood pressure.',
        'Capillaries are microscopic single-cell-thick vessels where nutrient and gas diffusion actually occurs.',
        'Veins (Blue) contain pocket valves preventing backflow against gravity on the return trip to the heart.'
      ],
      ur: [
        'شریانوں (سرخ) کی دیواریں موٹی اور لچکدار ہوتی ہیں تاکہ خون کے دباؤ کو برداشت کر سکیں۔',
        'کیپلیریز (باریک رگیں) اتنی پتلی ہوتی ہیں کہ وہاں خوراک اور آکسیجن خلیات میں داخل ہوتی ہے۔',
        'وریدوں (نیلا) میں والوز ہوتے ہیں جو خون کو کشش ثقل کے خلاف نیچے گرنے سے روکتے ہیں۔'
      ],
      bn: [
        'ধমনীর প্রাচীর পুরু ও স্থিতিস্থাপক যা উচ্চ রক্তচাপ সহ্য করতে পারে।',
        'কৈশিক জালিকা (Capillaries) একস্তরীয় পাতলা নালী যেখানে কোষের সাথে গ্যাস ও পুষ্টির বিনিময় ঘটে।',
        'শিরার মধ্যে কপাটিকা থাকে যা মাধ্যাকর্ষণের বিপরীতে রক্তের বিপরীতমুখী প্রবাহ প্রতিরোধ করে।'
      ],
      ja: [
        '動脈（赤）は厚く弾力のある筋肉質の壁を持ち、心臓の強い拍出圧に耐えます。',
        '毛細血管は一層の細胞でできた極薄の管で、細胞との間で酸素・栄養素・老廃物の交換を行います。',
        '静脈（青）は重力に逆らって心臓へ戻るため、逆流を防ぐ静脈弁を備えています。'
      ]
    },
    clinicalPlainPairs: [
      {
        medical: 'Vasoconstriction vs. Vasodilation',
        plain: {
          en: 'Vasoconstriction is the narrowing of vessels (raising pressure); vasodilation is their widening (lowering pressure).',
          ur: 'واسوکنسٹرکشن کا مطلب رگوں کا سکڑنا ہے (پریشر بڑھتا ہے)، اور واسوڈیلیشن کا مطلب رگوں کا پھیلنا ہے۔',
          bn: 'ভাসোকনস্ট্রিকশন হলো রক্তনালী সংকুচিত হওয়া (চাপ বৃদ্ধি), আর ভাসোডাইলেটেশন হলো রক্তনালী প্রসারিত হওয়া।',
          ja: '血管収縮は血管が細くなり血圧が上がること、血管拡張は血管が緩んで広がり血圧が下がることです。'
        }
      },
      {
        medical: 'Endothelium',
        plain: {
          en: 'The ultra-smooth single layer of cells lining all blood vessels preventing unwanted clotting.',
          ur: 'رگوں کے اندر کی انتہائی ہموار تہ جو خون کو جمنے سے روکتی ہے اور روانی برقرار رکھتی ہے۔',
          bn: 'রক্তনালীর অভ্যন্তরীণ অতি মসৃণ কোষস্তর যা অবাঞ্ছিত রক্ত জমাট বাঁধতে বাধা দেয়।',
          ja: '血管の内側を覆う滑らかな細胞層（血管内皮）で、不要な血栓形成を防ぎ血流を滑らかに保ちます。'
        }
      }
    ],
    educationalFact: {
      en: 'If all the blood vessels in an average human adult were unraveled and laid end to end, they would stretch about 60,000 miles (100,000 km) — enough to circle the Earth twice.',
      ur: 'اگر ایک بالغ انسان کی تمام رگوں کو ایک سیدھ میں جوڑ دیا جائے تو ان کی لمبائی تقریباً ایک لاکھ کلومیٹر ہو جائے گی۔',
      bn: 'একজন প্রাপ্তবয়স্ক মানুষের সমস্ত রক্তনালী একসাথে জোড়া দিলে তা প্রায় ১,০০,০০০ কিলোমিটার দীর্ঘ হবে, যা দিয়ে পৃথিবীকে দুবারের বেশি জড়ানো যাবে।',
      ja: '成人1人の体内にあるすべての血管をつなぎ合わせると、その長さは約10万キロメートルに達し、地球を2周半できる長さになります。'
    }
  },
  {
    id: 'circulation_loops',
    category: 'circulatory',
    svgRegionId: 'loops_region',
    name: {
      en: 'Blood Circulation Loops',
      ur: 'خون کی گردش کے دوہرے راستے (Circulation Loops)',
      bn: 'রক্ত সংবহন চক্র (Systemic & Pulmonary Loops)',
      ja: '血液循環経路: 肺循環と体循環',
    },
    subtitle: {
      en: 'Pulmonary circuit (to lungs) and systemic circuit (to body)',
      ur: 'پھیپھڑوں اور جسم کا دوہرا نظامِ دورانِ خون',
      bn: 'ফুসফুসীয় এবং দৈহিক রক্ত সংবহন পথ',
      ja: '酸素補給の「肺循環」と全身への供給「体循環」の二重ループ',
    },
    summary: {
      en: 'Humans possess a double circulatory system. The pulmonary circuit routes deoxygenated blood to the lungs to offload carbon dioxide and absorb oxygen. The systemic circuit routes this freshly oxygenated blood to all peripheral tissues, organs, and muscles.',
      ur: 'انسان میں دوہرا نظامِ دورانِ خون ہوتا ہے۔ پھیپھڑوں کا نظام (Pulmonary) خون میں آکسیجن بھرتا ہے، جبکہ جسمانی نظام (Systemic) اس تازہ خون کو سر سے پاؤں تک ہر عضو کو فراہم کرتا ہے۔',
      bn: 'মানবদেহে দ্বৈত রক্ত সংবহন ব্যবস্থা বিদ্যমান। ফুসফুসীয় সংবহন (Pulmonary) কার্বন ডাই-অক্সাইড বের করে অক্সিজেন গ্রহণ করে, এবং সার্বিক সংবহন (Systemic) সেই বিশুদ্ধ রক্ত সারা শরীরে পৌঁছে দেয়।',
      ja: 'ヒトの循環系は「肺循環」と「体循環」という2つの独立したループで構成されています。肺循環で二酸化炭素を捨てて酸素を取り込み、体循環でその新鮮な酸素を脳や手足、内臓へと送ります。',
    },
    keyFunctions: {
      en: [
        'Pulmonary Circuit: Right ventricle -> Pulmonary arteries -> Lung capillary beds -> Pulmonary veins -> Left atrium.',
        'Systemic Circuit: Left ventricle -> Aorta -> Body organs & tissues -> Vena cava -> Right atrium.',
        'Hepatic Portal System: Diverts nutrient-rich blood from digestive intestines through the liver for toxin screening.',
        'Renal Circulation: Continuously filters metabolic waste products through kidneys (approx 180 liters of filtrate daily).'
      ],
      ur: [
        'پلمونری چکر: دایاں وینٹریکل -> پلمونری شریان -> پھیپھڑے -> پلمونری ورید -> بایاں ایٹریم۔',
        'سسٹیمک چکر: بایاں وینٹریکل -> شہ رگ (Aorta) -> تمام اعضاء -> وینا کاوا -> دایاں ایٹریم۔',
        'جگر کا نظام: آنتوں سے جذب ہونے والے غذائی اجزاء کو زہریلے مادوں سے پاک کرنے کے لیے جگر میں بھیجتا ہے۔',
        'گردے کی گردش: خون سے فاسد مادوں کو خارج کرنے کے لیے روزانہ سینکڑوں لیٹر خون فلٹر کرتی ہے۔'
      ],
      bn: [
        'ফুসফুসীয় চক্র: ডান নিলয় -> পালমোনারি ধমনী -> ফুসফুস -> পালমোনারি শিরা -> বাম অলিন্দ।',
        'দৈহিক চক্র: বাম নিলয় -> মহাধমনী -> সারা শরীর -> ভেনাকাভা -> ডান অলিন্দ।',
        'হেপাটিক পোর্টাল চক্র: খাদ্যনালী থেকে শোষিত রক্ত যকৃতে নিয়ে গিয়ে ক্ষতিকর উপাদান দূর করে।',
        'বৃক্কীয় সংবহন: কিডনির মাধ্যমে বিপাকীয় বর্জ্য ছেঁকে বের করে রক্ত বিশুদ্ধ রাখে।'
      ],
      ja: [
        '肺循環: 右心室 → 肺動脈 → 肺毛細血管（ガス交換） → 肺静脈 → 左心房。',
        '体循環: 左心室 → 大動脈 → 全身の臓器・組織 → 大静脈 → 右心房。',
        '門脈循環: 消化管から吸収した栄養豊富な血液をまず肝臓に集め、解毒と代謝を行います。',
        '腎循環: 血液を腎臓で絶え間なくろ過し、老廃物や余分な水分を尿として排出します。'
      ]
    },
    clinicalPlainPairs: [
      {
        medical: 'Pulmonary Artery Exception',
        plain: {
          en: 'While almost all arteries carry oxygenated blood, the pulmonary artery is the only artery that carries oxygen-poor blood.',
          ur: 'تمام شریانیں آکسیجن والا خون لے جاتی ہیں، لیکن پلمونری شریان واحد شریان ہے جو غیر آکسیجن والا خون پھیپھڑوں تک لے جاتی ہے۔',
          bn: 'সব ধমনী অক্সিজেনযুক্ত রক্ত বহন করলেও ফুসফুসীয় ধমনী একমাত্র ব্যতিক্রম যা অক্সিজেনবিহীন রক্ত ফুসফুসে নিয়ে যায়।',
          ja: '動脈の中で唯一、肺動脈だけは酸素の少ない静脈血を運んでいます（肺静脈はその逆で動脈血を運びます）。'
        }
      }
    ],
    educationalFact: {
      en: 'It takes just about 20 to 60 seconds for a single red blood cell to complete an entire journey from your heart, through your feet or brain, and back.',
      ur: 'ایک ریڈ بلڈ سیل کو دل سے نکل کر پورے جسم کا چکر لگا کر واپس دل تک آنے میں صرف 20 سے 60 سیکنڈ لگتے ہیں۔',
      bn: 'একটি লোহিত রক্তকণিকা হৃৎপিণ্ড থেকে বের হয়ে মস্তিষ্ক বা পায়ের আঙ্গুল ঘুরে আবার হৃৎপিণ্ডে ফিরে আসতে মাত্র ২০ থেকে ৬০ সেকেন্ড সময় নেয়।',
      ja: '1つの赤血球が心臓を出発し、足先や脳を巡って再び心臓に戻るまでの時間は、わずか20〜60秒程度です。'
    }
  },
  {
    id: 'respiratory',
    category: 'respiratory',
    svgRegionId: 'lungs_region',
    name: {
      en: 'Respiratory System',
      ur: 'نظامِ تنفس (Respiratory System)',
      bn: 'শ্বসনতন্ত্র (Respiratory System)',
      ja: '呼吸器系 (Respiratory System)',
    },
    subtitle: {
      en: 'Gas exchange, alveoli, and pulmonary ventilation',
      ur: 'گیسوں کا تبادلہ اور پھیپھڑوں کی کارکردگی',
      bn: 'গ্যাস বিনিময়, অ্যালভিওলাই এবং ফুসফুসীয় ক্রিয়া',
      ja: '肺胞でのガス交換と換気メカニズム',
    },
    summary: {
      en: 'The respiratory system works in close synchrony with the circulatory system. Each breath brings air containing approximately 21% oxygen through the trachea and bronchi into approximately 300 to 500 million microscopic alveoli, where oxygen diffuses across a sub-micron barrier directly into blood capillaries.',
      ur: 'نظامِ تنفس دل اور خون کی نالیوں کے ساتھ مل کر کام کرتا ہے۔ سانس لینے سے ہوا پھیپھڑوں کے لاکھوں باریک خانوں (Alveoli) میں پہنچتی ہے جہاں سے آکسیجن خون میں اور کاربن ڈائی آکسائیڈ باہر چلی جاتی ہے۔',
      bn: 'শ্বসনতন্ত্র রক্তসংবহনতন্ত্রের সাথে নিবিড়ভাবে কাজ করে। শ্বাসের মাধ্যমে গৃহীত বাতাস শ্বাসনালী দিয়ে ফুসফুসের লক্ষ লক্ষ ক্ষুদ্র বায়ুথলিতে (Alveoli) পৌঁছায় এবং সরাসরি রক্তে অক্সিজেন সঞ্চালিত হয়।',
      ja: '呼吸器系は循環器系と一体となって生命を維持しています。吸い込んだ空気は気管・気管支を経て肺の約3億個もの肺胞に届き、毛細血管へと瞬時に酸素を送り届けます。',
    },
    keyFunctions: {
      en: [
        'Pulmonary ventilation: Diaphragm contraction creates negative thoracic pressure pulling air inward.',
        'External respiration: Diffusion of O2 into pulmonary capillaries and CO2 into alveoli.',
        'Acid-Base homeostasis: Regulates systemic blood pH (7.35–7.45) by blowing off CO2.',
        'Defense mechanism: Ciliated epithelial cells trap airborne pathogens and dust particles.'
      ],
      ur: [
        'ڈایافرام کا سکڑنا سینے میں منفی دباؤ پیدا کرتا ہے جس سے ہوا اندر کھنچتی ہے۔',
        'خون کے پی ایچ (pH) لیول کو متوازن رکھنے کے لیے کاربن ڈائی آکسائیڈ کا اخراج۔',
        'ہوا میں موجود جراثیم اور مٹی کو پھیپھڑوں کے دفاعی خلیات روکتے ہیں۔'
      ],
      bn: [
        'মধ্যচ্ছদা বা ডায়াফ্রামের সংকোচন বক্ষগহ্বরে ঋণাত্মক চাপ তৈরি করে ফুসফুসে বাতাস টেনে নেয়।',
        'অ্যালভিওলাই এর মাধ্যমে রক্তে অক্সিজেন গ্রহণ ও কার্বন ডাই-অক্সাইড ত্যাগ।',
        'রক্তের এসিড-ক্ষার ভারসাম্য (pH ৭.৩৫–৭.৪৫) নিয়ন্ত্রণে সহায়তা।',
        'ধূলিকণা ও জীবাণু আটকে রাখার জন্য সিলিয়াযুক্ত অভ্যন্তরীণ প্রতিরক্ষা ব্যবস্থা।'
      ],
      ja: [
        '横隔膜の収縮と弛緩により胸腔内圧を変化させ、肺に空気を取り込みます。',
        '肺胞表面の極めて薄い膜を介して酸素を取り込み、二酸化炭素を排出します。',
        '二酸化炭素の排出量を調整することで、血液の酸塩基平衡（pH 7.35〜7.45）を安定させます。',
        '気道の粘液と線毛運動によって、空気中のチリや病原体を捕獲・排出します。'
      ]
    },
    clinicalPlainPairs: [
      {
        medical: 'Alveoli',
        plain: {
          en: 'Microscopic balloon-like air sacs at the end of airways where oxygen crosses into the bloodstream.',
          ur: 'پھیپھڑوں کے سروں پر غبارے نما باریک خانے جہاں سے آکسیجن خون میں شامل ہوتی ہے۔',
          bn: 'ফুসফুসের ক্ষুদ্র বেলুনের মতো বায়ুথলি যেখানে রক্তে অক্সিজেনের প্রত্যক্ষ আদান-প্রদান ঘটে।',
          ja: '気管支の末端にある無数の微小な袋で、毛細血管と接して酸素と二酸化炭素を交換します。'
        }
      },
      {
        medical: 'Oxygen Saturation (SpO2)',
        plain: {
          en: 'The percentage of hemoglobin binding sites in the bloodstream carrying oxygen (normal is 95%–100%).',
          ur: 'خون میں آکسیجن کے تناسب کی پیمائش (عام طور پر 95 سے 100 فیصد کے درمیان ہوتی ہے)۔',
          bn: 'রক্তের হিমোগ্লোবিনে অক্সিজেনের সম্পৃক্ততার হার (স্বাভাবিক মাত্রা ৯৫% থেকে ১০০%)।',
          ja: '血液中のヘモグロビンが酸素と結びついている割合（通常は95％〜100％）。'
        }
      }
    ],
    educationalFact: {
      en: 'The combined surface area of all alveoli in human lungs is approximately 70 square meters — roughly equivalent to half of a professional tennis court.',
      ur: 'پھیپھڑوں کے تمام ایلویولائی کی سطح کا رقبہ تقریباً 70 مربع میٹر ہے جو آدھے ٹینس کورٹ کے برابر ہے۔',
      bn: 'উভয় ফুসফুসের সমস্ত অ্যালভিওলাই মেলে ধরলে তার ক্ষেত্রফল প্রায় ৭০ বর্গমিটার, যা প্রায় অর্ধেক টেনিস কোর্টের সমান।',
      ja: '人間の両肺にある肺胞の表面積をすべて広げると約70平方メートルになり、テニスコートの約半面に匹敵します。'
    }
  },
  {
    id: 'brain_nervous',
    category: 'nervous',
    svgRegionId: 'brain_region',
    name: {
      en: 'Brain & Nervous System',
      ur: 'دماغ اور اعصابی نظام',
      bn: 'মস্তিষ্ক ও স্নায়ুতন্ত্র (Brain & Nervous System)',
      ja: '脳と神経系 (Brain & Nervous System)',
    },
    subtitle: {
      en: 'Master command center and electrical signaling network',
      ur: 'جسم کا مرکزی کنٹرول روم اور برقی سگنلز کا جال',
      bn: 'দেহের কেন্দ্রীয় নিয়ন্ত্রণ কক্ষ এবং জৈব-বৈদ্যুতিক সংকেত ব্যবস্থা',
      ja: '全身の司令塔と生体電気情報ネットワーク',
    },
    summary: {
      en: 'The human brain contains roughly 86 billion neurons communicating through trillions of synaptic connections. It regulates involuntary life support functions (heart rate, respiration) via the autonomic nervous system while coordinating thoughts, memory, and voluntary motor action.',
      ur: 'انسانی دماغ میں تقریباً 86 ارب نیورونز پائے جاتے ہیں۔ یہ دل کی دھڑکن اور سانس جیسے خودکار نظام کو کنٹرول کرتا ہے اور تمام سوچ، یادداشت اور حرکات کا مرکز ہے۔',
      bn: 'মানব মস্তিষ্কে প্রায় ৮৬ বিলিয়ন নিউরন রয়েছে। এটি হৃদস্পন্দন ও শ্বাসপ্রশ্বাসের মতো অনৈচ্ছিক প্রক্রিয়া পরিচালনা করার পাশাপাশি চিন্তা, স্মৃতি এবং সমস্ত শারীরিক চলন নিয়ন্ত্রণ করে।',
      ja: '脳には約860億個の神経細胞（ニューロン）が存在し、無数のシナプス結合を通じて情報を行き来させています。自律神経を通じて呼吸や心拍を24時間保ちつつ、知性や運動を統括します。',
    },
    keyFunctions: {
      en: [
        'Central Nervous System (CNS): Brain and spinal cord process sensory input and dictate responses.',
        'Autonomic Nervous System: Sympathetic (fight/flight) and Parasympathetic (rest/digest) homeostasis.',
        'Cerebral Cortex: Coordinates sensory perception, abstract reasoning, language, and executive planning.',
        'Blood-Brain Barrier (BBB): Highly selective semipermeable endothelial border protecting neural tissue.'
      ],
      ur: [
        'مرکزی اعصابی نظام دماغ اور حرام مغز کے ذریعے تمام حسی پیغامات کو پروسیس کرتا ہے۔',
        'خودکار نظام خوف یا تناؤ میں دل کی دھڑکن بڑھاتا ہے اور پرسکون حالت میں معمول پر لاتا ہے۔',
        'بلڈ برین بیریئر دماغ کو خون کے نقصان دہ کیمیکلز سے محفوظ رکھتا ہے۔'
      ],
      bn: [
        'কেন্দ্রীয় স্নায়ুতন্ত্র: মস্তিষ্ক এবং সুষুম্নাকাণ্ড সমস্ত সংবেদন গ্রহণ ও প্রতিক্রিয়া পরিচালনা করে।',
        'স্বয়ংক্রিয় স্নায়ুতন্ত্র: বিপদের সময় প্রতিক্রিয়া এবং বিশ্রামের সময় শরীর শিথিল রাখে।',
        'ব্লাড-ব্রেন ব্যারিয়ার: মস্তিষ্ককে রক্তের বিষাক্ত উপাদান থেকে সুরক্ষিত রাখার বিশেষ কোষীয় বাধা।'
      ],
      ja: [
        '中枢神経系（脳と脊髄）が全身からの感覚情報を受け取り、適切な指示を下します。',
        '自律神経系（交感神経と副交感神経）が緊張とリラックスのバランスを保ちます。',
        '大脳皮質が高次の思考、記憶、感情、言語、運動判断をコントロールします。',
        '血液脳関門（BBB）が有害物質の侵入を防ぎ、脳内環境を厳密に保護します。'
      ]
    },
    clinicalPlainPairs: [
      {
        medical: 'Action Potential',
        plain: {
          en: 'A brief electrical pulse that travels down a nerve fiber to transmit messages across the body.',
          ur: 'ایک برقی لہر جو اعصاب کے ذریعے جسم کے ایک حصے سے دوسرے حصے تک معلومات پہنچاتی ہے۔',
          bn: 'একটি ক্ষুদ্র বৈদ্যুতিক সংকেত যা স্নায়ুর মধ্য দিয়ে প্রবাহিত হয়ে দেহে তথ্য আদান-প্রদান করে।',
          ja: '神経細胞の膜を伝わる微弱な電気信号で、全身に情報や指令を瞬時に伝達します。'
        }
      },
      {
        medical: 'Neurotransmitter',
        plain: {
          en: 'Chemical messengers (like dopamine and serotonin) that jump the tiny gap between neurons.',
          ur: 'وہ کیمیائی مادے (جیسے ڈوپامائن) جو ایک نیورون سے دوسرے نیورون تک پیغام پہنچاتے ہیں۔',
          bn: 'রাসায়নিক বার্তাবাহক (যেমন ডোপামিন, সেরোটোনিন) যা স্নায়ুর সংযোগস্থলে বার্তা পরিবহন করে।',
          ja: '神経細胞同士のすき間（シナプス）で情報をバトンタッチする化学物質（ドーパミンやセロトニンなど）。'
        }
      }
    ],
    educationalFact: {
      en: 'Despite accounting for only about 2% of total body weight, the human brain consumes nearly 20% of the body’s oxygen and glucose at all times.',
      ur: 'دماغ کا وزن کل جسمانی وزن کا صرف 2 فیصد ہوتا ہے، لیکن یہ جسم کی کل آکسیجن اور گلوکوز کا 20 فیصد استعمال کرتا ہے۔',
      bn: 'মানব মস্তিষ্ক মোট শরীরের ওজনের মাত্র ২% হলেও এটি দেহের মোট অক্সিজেন ও গ্লুকোজের প্রায় ২০% একাই ব্যবহার করে।',
      ja: '脳の重量は体重のわずか約2％にすぎませんが、安静時でも全身の酸素とブドウ糖の約20％を常に消費しています。'
    }
  },
  {
    id: 'digestive',
    category: 'digestive',
    svgRegionId: 'digestive_region',
    name: {
      en: 'Digestive & Metabolic System',
      ur: 'نظامِ انہضام اور میٹابولزم',
      bn: 'পরিপাক ও বিপাকতন্ত্র (Digestive System)',
      ja: '消化器・代謝系 (Digestive & Metabolic System)',
    },
    subtitle: {
      en: 'Nutrient breakdown, assimilation, and hepatic filtration',
      ur: 'خوراک کا ہضم ہونا اور جگر کی فلٹریشن',
      bn: 'পুষ্টি উপাদান শোষণ এবং যকৃতের পরিশোধন প্রক্রিয়া',
      ja: '栄養素の分解・吸収と肝臓による代謝・解毒',
    },
    summary: {
      en: 'The gastrointestinal tract converts ingested food into bioavailable energy, amino acids, and essential micronutrients. Nutrients absorbed across the small intestine enter the mesenteric veins and travel directly through the portal vein to the liver for metabolic processing and toxin neutralization.',
      ur: 'نظامِ انہضام خوراک کو جسم کی قابلِ استعمال توانائی میں تبدیل کرتا ہے۔ چھوٹی آنت سے جذب ہونے والی خوراک جگر میں جاتی ہے جہاں ضروری کیمیائی تبدیلیاں اور صفائی ہوتی ہے۔',
      bn: 'পরিপাকতন্ত্র গ্রহণ করা খাদ্যকে কোষে ব্যবহারের উপযোগী শক্তিতে রূপান্তরিত করে। ক্ষুদ্রান্ত্র থেকে শোষিত পুষ্টি উপাদান যকৃতে (Liver) পৌঁছে মেটাবলিজম ও পরিশোধিত হয়।',
      ja: '消化管は摂取した食物を消化酵素によって微細に分解し、小腸から吸収します。吸収された栄養は門脈を通じて肝臓へ送られ、代謝と解毒が行われます。',
    },
    keyFunctions: {
      en: [
        'Mechanical & Chemical Digestion: Gastric acid (HCl) and pepsin denature dietary proteins.',
        'Intestinal Absorption: Millions of microscopic villi amplify small intestine surface area for nutrient uptake.',
        'Hepatic Processing: Liver synthesizes plasma proteins, stores glycogen, and secretes bile salts.',
        'Gut Microbiome: Trillions of symbiotic bacteria synthesize vitamins B & K and modulate immune health.'
      ],
      ur: [
        'معدے کا تیزاب اور اینزائمز خوراک کو توڑتے ہیں۔',
        'چھوٹی آنت کی اندرونی ساخت خوراک کے جذب ہونے کی صلاحیت کو کئی گنا بڑھاتی ہے۔',
        'جگر بائل (صفراء) بناتا ہے جو چکنائی کو ہضم کرنے میں مدد دیتا ہے۔'
      ],
      bn: [
        'যান্ত্রিক ও রাসায়নিক পরিপাক: পাকস্থলীর এসিড ও এনজাইম প্রোটিন ভেঙে ফেলে।',
        'অন্ত্রের শোষণ: ভিলাই নামক ক্ষুদ্র প্রবর্ধক খাদ্য উপাদান শোষণে সাহায্য করে।',
        'যকৃতের ভূমিকা: গ্লাইকোজেন সঞ্চয়, পিত্তরস তৈরি এবং রক্ত পরিষ্কার রাখা।'
      ],
      ja: [
        '胃酸（塩酸）と消化酵素（ペプシン）によりタンパク質を変性・分解します。',
        '小腸の内面にある無数の絨毛（じゅうもう）が表面積を広げ、効率よく栄養を吸収します。',
        '肝臓がグリコーゲンを貯蔵し、胆汁を生成して脂質の消化を助け、有害物質を解毒します。'
      ]
    },
    clinicalPlainPairs: [
      {
        medical: 'Peristalsis',
        plain: {
          en: 'Coordinated wave-like smooth muscle contractions that propel food automatically along the digestive tract.',
          ur: 'عضلات کی لہر نما حرکت جو خوراک کو خودکار طریقے سے خوراک کی نالی اور آنتوں میں آگے دھکیلتی ہے۔',
          bn: 'পরিপাকনালীর পেশীর ছন্দময় সংকোচন যা খাদ্যকে স্বয়ংক্রিয়ভাবে সামনের দিকে চালিত করে।',
          ja: '食道や胃、腸の筋肉が波打つように順番に収縮し、内容物を先へ押し出す自律的な運動。'
        }
      }
    ],
    educationalFact: {
      en: 'The human gastrointestinal tract is home to an estimated 38 trillion microorganisms, collectively weighing around 1 to 2 kilograms, critical to immunity and neurotransmitter production.',
      ur: 'انسانی آنتوں میں تقریباً 38 کھرب دوست بیکٹیریا رہتے ہیں جو قوت مدافعت اور ہاضمے کے لیے ناگزیر ہیں۔',
      bn: 'মানব পরিপাকতন্ত্রে প্রায় ৩৮ ট্রিলিয়ন উপকারী অণুজীব বসবাস করে, যা রোগ প্রতিরোধ ক্ষমতা ও হজমে অপরিহার্য।',
      ja: '人間の腸内には約38兆個もの腸内細菌が共生しており、その総重量は約1〜2kgに達し、免疫機能にも深く関わっています。'
    }
  },
  {
    id: 'muscular',
    category: 'muscular',
    svgRegionId: 'muscles_region',
    name: {
      en: 'Muscular System',
      ur: 'عضلاتی نظام (Muscular System)',
      bn: 'পেশীতন্ত্র (Muscular System)',
      ja: '筋肉系 (Muscular System)',
    },
    subtitle: {
      en: 'Locomotion, posture, heat generation, and visceral motion',
      ur: 'حرکت، جسمانی توازن اور حرارت کی پیداوار',
      bn: 'চলন, শারীরিক ভারসাম্য এবং তাপ উৎপাদন ব্যবস্থা',
      ja: '運動、姿勢保持、熱産生、および内臓運動を担う筋群',
    },
    summary: {
      en: 'The human body contains over 600 skeletal muscles alongside involuntary smooth and cardiac muscles. Skeletal muscles work in antagonistic pairs connected to bones via tendons, converting chemical ATP energy into kinetic movement while acting as the body’s primary metabolic heat engine.',
      ur: 'انسانی جسم میں 600 سے زائد پٹھے ہوتے ہیں۔ یہ ہڈیوں کو حرکت دینے، جسم کو سہارا دینے اور سردی میں حرارت پیدا کرنے کا کام کرتے ہیں۔',
      bn: 'মানবদেহে ৬০০ টিরও বেশি ঐচ্ছিক পেশী রয়েছে। পেশীসমূহ টেন্ডনের মাধ্যমে অস্থির সাথে যুক্ত থেকে শারীরিক চলন নিশ্চিত করে এবং দেহে তাপশক্তি উৎপন্ন করে।',
      ja: '人体には600以上の骨格筋に加え、心筋や平滑筋があります。筋繊維の収縮により関節を動かして歩行や動作を可能にし、体熱の産生や血液循環を助けます。',
    },
    keyFunctions: {
      en: [
        'Skeletal Muscle: Voluntary striated fibers responsible for locomotion, fine motor control, and joint stabilization.',
        'Smooth Muscle: Involuntary unstriated muscle lining vascular walls and digestive tracts.',
        'Thermogenesis: Muscle contraction releases metabolic heat maintaining normal body temperature (37°C / 98.6°F).',
        'Muscle Venous Pump: Calf muscle contraction actively compresses deep leg veins to assist blood return against gravity.'
      ],
      ur: [
        'ہڈیوں سے جڑے پٹھے ارادی حرکات اور توازن برقرار رکھتے ہیں۔',
        'پٹھوں کی حرکت سے جسمانی درجہ حرارت برقرار رہتا ہے۔',
        'پنڈلی کے پٹھے سکڑ کر ٹانگوں سے خون کو کشش ثقل کے خلاف اوپر دل کی طرف دھکیلتے ہیں۔'
      ],
      bn: [
        'কঙ্কাল পেশী: ঐচ্ছিক চলন, ভারসাম্য ও দৈহিক অঙ্গভঙ্গি রক্ষা করে।',
        'মসৃণ পেশী: রক্তনালী ও পরিপাকতন্ত্রের অনৈচ্ছিক কার্য পরিচালনা করে।',
        'তাপ উৎপাদন: পেশী সংকোচনের মাধ্যমে শরীরের স্বাভাবিক তাপমাত্রা বজায় থাকে।',
        'পায়ের পেশীর সংকোচন পায়ের গভীর শিরা থেকে রক্ত হৃৎপিণ্ডে পাঠাতে সহায়তা করে।'
      ],
      ja: [
        '骨格筋: 骨と腱でつながり、意思に従って関節を動かし歩行や繊細な作業を担います。',
        '平滑筋: 胃腸や血管の壁に存在し、無意識下で消化や血圧調整を行います。',
        '産熱作用: 筋肉の活動やふるえによって体温（約37℃）を一定に保ちます。',
        '筋ポンプ作用: ふくらはぎなどの筋肉が収縮することで、脚の静脈血を心臓へ押し上げます（第2の心臓）。'
      ]
    },
    clinicalPlainPairs: [
      {
        medical: 'Lactic Acid & DOMS',
        plain: {
          en: 'Soreness felt 24–48 hours post-workout is primarily microscopic muscle fiber repair (DOMS), not trapped lactic acid.',
          ur: 'ورزش کے بعد ہونے والا درد پٹھوں کے ریشوں کی باریک مرمت کی وجہ سے ہوتا ہے، محض لیکٹک ایسڈ کی وجہ سے نہیں۔',
          bn: 'ব্যায়ামের পরদিন পেশীতে যে ব্যথা হয় তা মূলত পেশীতন্তুর অতিসূক্ষ্ম মেরামতের ফল (DOMS)।',
          ja: '運動翌日以降の筋肉痛（遅発性筋肉痛: DOMS）は乳酸ではなく、傷ついた微細な筋線維が修復される過程の炎症です。'
        }
      }
    ],
    educationalFact: {
      en: 'The muscle that exerts the most dynamic raw force relative to its size is the masseter (jaw muscle), capable of biting down with a force exceeding 200 pounds (90 kg) on the molars.',
      ur: 'جسم کا سب سے طاقتور پٹھا جبڑے کا پٹھا (Masseter) ہے جو دانتوں پر 90 کلوگرام تک دباؤ ڈال سکتا ہے۔',
      bn: 'দেহের আকারের তুলনায় সবচেয়ে শক্তিশালী বলপ্রয়োগকারী পেশী হলো চোয়ালের পেশী (Masseter), যা প্রায় ৯০ কেজি বল প্রয়োগ করতে সক্ষম।',
      ja: '自身の大きさに比べて最も大きな力を発揮できる筋肉はあごの「咬筋（こうきん）」で、奥歯で約90kg以上の圧力をかけることができます。'
    }
  }
];
