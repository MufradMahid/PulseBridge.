import type { SupportedLanguage } from '../types/index.ts';
import type { DemoResponse } from './demoAssistant.ts';

/**
 * Evaluates whether a user's query is asking for urgent first aid or immediate guidance
 * for acute daily accidents and injuries (e.g., broken bones, bleeding cuts, burns,
 * nosebleeds, sprains, choking, animal bites, chemical in eye).
 * Provides actionable, numbered step-by-step guidance in English, Urdu, Bangla, and Japanese.
 */
export function checkFirstAidQuery(
  message: string,
  language: SupportedLanguage,
  reason: 'manual_demo' | 'quota_exhausted' | 'access_denied' | 'no_key' = 'manual_demo'
): DemoResponse | null {
  // Auto-detect target language: if message contains specific script, honor it; otherwise use app language
  let lang = language;
  if (/[\u0600-\u06FF]/.test(message)) lang = 'ur';
  else if (/[\u0980-\u09FF]/.test(message)) lang = 'bn';
  else if (/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(message)) lang = 'ja';

  const q = message.toLowerCase().trim();

  // 1. FRACTURE / BROKEN BONE / BROKEN LEG ("i broke my leg whats now?")
  const isFracture =
    (q.includes('broke') || q.includes('broken') || q.includes('fracture')) &&
      (q.includes('leg') ||
        q.includes('bone') ||
        q.includes('arm') ||
        q.includes('ankle') ||
        q.includes('foot') ||
        q.includes('wrist') ||
        q.includes('hip') ||
        q.includes('finger') ||
        q.includes('toe')) ||
    q.includes('ہڈی ٹوٹ') ||
    q.includes('ٹانگ ٹوٹ') ||
    q.includes('ہاتھ ٹوٹ') ||
    q.includes('فریکچر') ||
    q.includes('پا ভেঙে') ||
    q.includes('হাত ভেঙে') ||
    q.includes('হাড় ভেঙে') ||
    q.includes('হাড় ভেঙে') ||
    q.includes('অস্থিভঙ্গ') ||
    q.includes('骨折') ||
    q.includes('足を骨折') ||
    q.includes('腕を骨折') ||
    q.includes('骨が折れ');

  if (isFracture) {
    if (lang === 'ur') {
      return {
        text: `### 🚨 فوری فرسٹ ایڈ: ٹوٹی ہوئی ٹانگ یا ہڈی کا فریکچر (Broken Bone First Aid)

**ٹانگ یا عضو کو بالکل نہ ہلائیں! ابھی اسی وقت درج ذیل اقدامات کریں:**

1. **پہلا قدم — ہڈی اور مریض کو بالکل ساکت رکھیں (Immobilize):**
   - مریض کو ہرگز ہلانے کی کوشش نہ کریں۔ ٹانگ پر کوئی وزن نہ ڈالیں اور چلنے کی کوشش نہ کریں۔
   - **ٹوٹی ہوئی ہڈی کو خود سیدھا کرنے یا اندر بٹھانے کی کوشش ہرگز نہ کریں!** ایسا کرنے سے خون کی شریانیں اور اعصاب کٹ سکتے ہیں۔

2. **دوسرا قدم — فوری ایمرجنسی کال کریں:**
   - پاکستان میں **1122 (ریسکیو)** یا **15 (پولیس)** پر فوری کال کریں۔
   - (اگر بیرون ملک ہیں: امریکہ میں **911**، بنگلہ دیش میں **999**، جاپان میں **119**).
   - خود گاڑی چلا کر ہسپتال جانے کی کوشش نہ کریں، ایمبولینس کا انتظار کریں۔

3. **تیسرا قدم — اگر ہڈی جلد چیر کر باہر نکلی ہو (اوپن فریکچر):**
   - ہڈی کو اندر دھکیلنے کی غلطی نہ کریں! زخم کے ارد گرد صاف جراثیم کش کپڑا یا گوز رکھ کر ہلکا دباؤ دیں تاکہ خون کا بہاؤ کنٹرول رہے۔

4. **چوتھا قدم — ٹانگ کو دونوں طرف سے سہارا دیں:**
   - ٹانگ جس حالت میں ہے اسی حالت میں رہنے دیں، دونوں اطراف موٹے تولیے، تکیے یا کمبل رکھ کر سہارا دیں تاکہ ایمبولینس آنے تک حرکت نہ ہو۔

5. **پانچواں قدم — سوجن روکنے کے لیے برف کی ٹکور:**
   - کسی کپڑے یا تولیے میں لپٹی ہوئی برف سوجن والے حصے پر 15 منٹ کے لیے رکھیں۔ برف کو براہ راست ننگی جلد پر نہ رکھیں۔

6. **چھٹا قدم — کچھ بھی کھانے یا پینے کو نہ دیں:**
   - مریض کو کمبل اوڑھا کر گرم رکھیں۔ ممکنہ ایمرجنسی سرجری یا بے ہوشی کی دوائی کے پیش نظر مریض کو پانی یا کھانا ہرگز نہ دیں۔

**⚠️ سخت ممانعتیں:**
- ❌ ٹانگ پر وزن ڈال کر چلنے کی کوشش نہ کریں۔
- ❌ ٹوٹی ہوئی جگہ کی مالش یا کھینچ تان نہ کریں۔

*نوٹس: یہ فرسٹ ایڈ کی تعلیمی معلومات ہیں اور مستند ڈاکٹر یا ہنگامی سروسز کا متبادل نہیں ہیں۔*`,
        citations: [
          { title: 'American College of Emergency Physicians - Fractures and Broken Bones', url: 'https://www.emergencyphysicians.org' },
          { title: 'MedlinePlus - Broken Bone First Aid', url: 'https://medlineplus.gov' },
          { title: 'American Red Cross - Bone and Joint Injuries', url: 'https://www.redcross.org' },
        ],
        isEmergencyAlert: true,
        emergencyDetails: { isEmergency: true, matchedCategories: ['fracture_emergency'] },
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
        suggestedFollowUps: [
          'ہڈی ٹوٹنے پر شاک (Shock) کی علامات',
          'ایمرجنسی سروسز کو کیا معلومات فراہم کرنی ہیں؟',
        ],
      };
    }

    if (lang === 'bn') {
      return {
        text: `### 🚨 জরুরি ফার্স্ট এইড: পা ভেঙে যাওয়া বা হাড়ের ফ্র্যাকচার (Broken Leg First Aid)

**পা একদম নাড়াবেন না! এই মুহূর্তে আপনার তাৎক্ষণিক করণীয় পদক্ষেপ:**

১. **১ম ধাপ — পা ও রোগীকে সম্পূর্ণ স্থির রাখুন (Immobilize):**
   - ভাঙা পায়ে কোনো ভর বা ওজন দেবেন না এবং হাঁটার চেষ্টা করবেন না।
   - **ভাঙা হাড় জোর করে সোজা করার বা ভেতরে ঠেলার চেষ্টা ভুলেও করবেন না!** এতে ভেতরের রক্তনালী ও স্নায়ু মারাত্মক ক্ষতিগ্রস্ত হতে পারে।

২. **২য় ধাপ — অবিলম্বে জরুরি অ্যাম্বুলেন্স ডাকুন:**
   - বাংলাদেশে অনতিবিলম্বে **৯৯৯ (জরুরি সেবা)** অথবা **১৬২৬৩ (স্বাস্থ্য বাতায়ন)**-এ কল করুন।
   - (যুক্তরাষ্ট্রে **911**, জাপানে **119**, পাকিস্তানে **1122**)।
   - নিজে ড্রাইভ করে হাসপাতালে যাওয়ার চেষ্টা করবেন না।

৩. **৩য় ধাপ — হাড় চামড়া ভেদ করে বের হয়ে থাকলে (ওপেন ফ্র্যাকচার):**
   - হাড় ভেতরে ঢোকানোর চেষ্টা করবেন না! ক্ষতের চারপাশে পরিষ্কার জীবাণুমুক্ত কাপড় বা গজ দিয়ে হালকা চেপে ধরে অতিরিক্ত রক্তপাত প্রতিরোধ করুন।

৪. **৪র্থ ধাপ — পা যে অবস্থায় আছে সেভাবেই সাপোর্ট দিন:**
   - পা সোজা করার চেষ্টা না করে যে ভঙ্গিতে আছে সেভাবেই পায়ের উভয় পাশে ভাঁজ করা বালিশ, কম্বল বা তোয়ালে দিয়ে আটকে রাখুন যাতে নড়াচড়া না হয়।

৫. **৫ম ধাপ — ফোলা কমাতে বরফের সেঁক:**
   - সুতি কাপড়ে পেঁচিয়ে বরফ বা কোল্ড প্যাক আলতো করে লাগিয়ে রাখুন (সরাসরি বরফ ত্বকে লাগাবেন না)।

৬. **৬ষ্ঠ ধাপ — খাবার বা পানি খাওয়াবেন না:**
   - রোগীকে কম্বল দিয়ে উষ্ণ ও শান্ত রাখুন। হাসপাতালে দ্রুত জরুরি অস্ত্রোপচার বা এনেস্থেশিয়ার প্রয়োজন হতে পারে, তাই রোগীকে কোনো খাবার বা পানি দেবেন না।

**⚠️ মারাত্মক ভুল যা একদম করবেন না:**
- ❌ রোগীকে ভর দিয়ে দাঁড় করানোর চেষ্টা করবেন না।
- ❌ ভাঙা স্থানে মালিশ বা টেপাটেপি করবেন না।

*সতর্কতা: এটি প্রাথমিক জীবনরক্ষাকারী ফার্স্ট এইড নির্দেশনা, নিবন্ধিত চিকিৎসক বা জরুরি সেবার বিকল্প নয়।*`,
        citations: [
          { title: 'American College of Emergency Physicians - Fractures First Aid', url: 'https://www.emergencyphysicians.org' },
          { title: 'MedlinePlus - Fractures and Broken Bones', url: 'https://medlineplus.gov' },
          { title: 'Red Cross - First Aid for Broken Bones', url: 'https://www.redcross.org' },
        ],
        isEmergencyAlert: true,
        emergencyDetails: { isEmergency: true, matchedCategories: ['fracture_emergency'] },
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
        suggestedFollowUps: [
          'হাড় ভাঙলে শক (Shock) এর লক্ষণসমূহ',
          'জরুরি অ্যাম্বুলেন্স আসার আগে করণীয়',
        ],
      };
    }

    if (lang === 'ja') {
      return {
        text: `### 🚨 緊急応急処置：足の骨折・疑いのある重度外傷（今すぐ行うべきこと）

**足を絶対に動かさないでください！直ちに以下の応急手順を実行してください:**

1. **ステップ1 — 患部を完全に安静にし、体重を一切かけない:**
   - 無理に立ち上がったり歩こうとしないでください。
   - **曲がった骨をまっすぐ戻そうとしたり、引っ張る行為は厳禁です！** 血管や神経を損傷する恐れがあります。

2. **ステップ2 — 直ちに救急車（119番）を要請する:**
   - 日本国内では直ちに **119番** へ通報してください（海外：米 911 / 伯 999 / 巴 1122）。
   - 自分で歩行・運転して受診しようとせず、救急隊の到着を待ってください。

3. **ステップ3 — 骨が皮膚から突き出ている場合（開放骨折）:**
   - 骨を絶対に押し戻してはいけません！骨の周囲を清潔な布や滅菌ガーゼで優しく覆い、圧迫止血を行ってください。

4. **ステップ4 — そのままの体勢で両脇から固定する（副木・支持）:**
   - 丸めたタオル、毛布、クッションを脚の両側に添えて、脚が揺れたり動かないように支持します。

5. **ステップ5 — タオル越しに冷やす:**
   - 腫れと激痛を緩和するため、タオルで包んだ氷嚢を当ててください（皮膚への直接氷当ては凍傷リスクがあるため避ける）。

6. **ステップ6 — 飲食は一切禁止:**
   - 病院到着後に緊急手術や麻酔が必要になる可能性が極めて高いため、水や食べ物は絶対に与えないでください。

**⚠️ 厳禁事項:**
- ❌ 患部に体重をかけたり歩行テストをしない。
- ❌ 患部を揉んだりマッサージしない。

*注意：本情報は応急救護の教育的ガイドラインであり、専門医師の診察に代わるものではありません。*`,
        citations: [
          { title: '日本骨折治療学会 - 骨折の応急手当', url: 'https://www.jsfr.jp' },
          { title: 'MedlinePlus - Broken Bone First Aid', url: 'https://medlineplus.gov' },
          { title: '日本赤十字社 - 骨折の救急処置', url: 'https://www.jrc.or.jp' },
        ],
        isEmergencyAlert: true,
        emergencyDetails: { isEmergency: true, matchedCategories: ['fracture_emergency'] },
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
        suggestedFollowUps: [
          '外傷性ショックの兆候と見分け方',
          '救急隊員に伝えるべき重要項目',
        ],
      };
    }

    // Default English
    return {
      text: `### 🚨 Immediate First Aid: Suspected Broken Leg or Fracture ("What to do now")

**DO NOT MOVE THE LEG. TAKE THESE IMMEDIATE ACTION STEPS RIGHT NOW:**

1. **STEP 1 — Immobilize Completely (Do NOT move the leg):**
   - Keep the person lying down or seated in the exact position found.
   - Do NOT bear weight or test walking on the injured leg.
   - **Do NOT attempt to realign, straighten, or force the broken bone back into place!** Manipulating a fracture can sever adjacent femoral or tibial arteries and nerves.

2. **STEP 2 — Call Emergency Medical Services Immediately:**
   - Dial **911** (USA/Canada), **1122** (Pakistan), **999** (Bangladesh/UK), or **119** (Japan).
   - Do NOT attempt to drive yourself to the emergency department.

3. **STEP 3 — If Skin Is Broken (Open / Compound Fracture):**
   - If bone is exposed, **never push it back in!**
   - Place a clean sterile cloth or gauze gently around the wound edges with light pressure to control active hemorrhaging.

4. **STEP 4 — Support and Splint in Place:**
   - Place rolled-up towels, blankets, or pillows on both sides of the injured leg to prevent any lateral rotation or shifting while awaiting first responders.

5. **STEP 5 — Apply Cold Packs (Indirectly):**
   - Apply an ice pack wrapped in a clean cloth for 15–20 minutes at a time to reduce acute edema and pain. Never apply bare ice directly to skin.

6. **STEP 6 — Prevent Shock & Do NOT Give Food or Drink:**
   - Keep the person warm with a blanket. Keep them calm.
   - Do NOT give oral fluids or food, as immediate emergency orthopedic surgery and general anesthesia may be required upon hospital arrival.

**⚠️ CRITICAL WARNINGS:**
- ❌ Do NOT try to test walking or standing.
- ❌ Do NOT massage, pull, or adjust the limb.

*Notice: This is critical first-aid educational guidance. Seek immediate emergency medical care.*`,
      citations: [
        { title: 'American College of Emergency Physicians - Fractures and Broken Bones', url: 'https://www.emergencyphysicians.org' },
        { title: 'MedlinePlus - Broken Bone First Aid', url: 'https://medlineplus.gov' },
        { title: 'American Red Cross - First Aid for Fractures and Dislocations', url: 'https://www.redcross.org' },
      ],
      isEmergencyAlert: true,
      emergencyDetails: { isEmergency: true, matchedCategories: ['fracture_emergency'] },
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
      suggestedFollowUps: [
        'How to recognize traumatic shock after injury',
        'What details to give the 911 / emergency dispatcher',
      ],
    };
  }

  // 2. CUT HAND / BLEEDING LACERATION ("i cut my hand now its bleeding whats now?")
  const isCutBleeding =
    ((q.includes('cut') || q.includes('lacerat') || q.includes('wound') || q.includes('gash') || q.includes('bleed')) &&
      (q.includes('hand') ||
        q.includes('finger') ||
        q.includes('arm') ||
        q.includes('knife') ||
        q.includes('now its bleeding') ||
        q.includes('bleeding now') ||
        q.includes("what's now") ||
        q.includes('whats now') ||
        q.includes('stop bleeding'))) ||
    q.includes('ہاتھ کٹ') ||
    (q.includes('کٹ') && q.includes('خون')) ||
    (q.includes('زخم') && q.includes('خون')) ||
    q.includes('হাত কেটে') ||
    (q.includes('কেটে') && q.includes('রক্ত')) ||
    q.includes('রক্ত পড়ছে') ||
    q.includes('手を切') ||
    q.includes('指を切') ||
    (q.includes('切り傷') && q.includes('血')) ||
    q.includes('血が出て');

  if (isCutBleeding) {
    if (lang === 'ur') {
      return {
        text: `### 🩸 فوری فرسٹ ایڈ: کٹا ہوا ہاتھ اور خون بہنا (Bleeding Cut First Aid)

**خون روکنے کے لیے ابھی اسی وقت درج ذیل 4 اقدامات پر فوری عمل کریں:**

1. **پہلا قدم — براہ راست مضبوط دباؤ (ابھی فوراً کریں):**
   - ایک صاف کپڑا، تولیہ یا جراثیم کش گوز لیں اور کٹے ہوئے حصے پر **5 سے 10 منٹ تک مسلسل مضبوطی سے دبائے رکھیں۔**
   - **بار بار کپڑا اٹھا کر نہ دیکھیں!** ہر 30 سیکنڈ بعد کپڑا ہٹانے سے خون جمنے (Clotting) کا قدرتی عمل ٹوٹ جاتا ہے۔

2. **دوسرا قدم — ہاتھ کو دل کی سطح سے اوپر اٹھائیں (Elevate):**
   - دباؤ برقرار رکھتے ہوئے اپنے زخمی ہاتھ کو اپنے سینے اور دل کی سطح سے اونچا رکھیں۔ کشش ثقل سے خون کا بہاؤ فوراً سست ہو جاتا ہے۔

3. **تیسرا قدم — نلکے کے پانی سے صفائی (خون رکنے کے بعد):**
   - نلکے کے صاف معتدل پانی سے 2 سے 3 منٹ تک زخم کو دھوئیں تاکہ مٹی یا گندگی نکل جائے۔
   - **زخم کے اندر صابن، ڈیٹول یا الکوحل براہ راست نہ ڈالیں!** یہ صحت مند خلیات کو جلا دیتے ہیں اور زخم بھرنے میں رکاوٹ بنتے ہیں۔

4. **چوتھا قدم — صاف جراثیم کش پٹی باندھیں:**
   - صاف بینڈیج یا گوز سے زخم کو محفوظ کریں تاکہ جراثیم نہ لگیں۔

**⚠️ کب فوری ہسپتال جا کر ٹانکے لگوانے کی ضرورت ہے:**
- 10 سے 15 منٹ مسلسل مضبوط دباؤ کے باوجود خون بند نہ ہو۔
- خون فوارے کی طرح جھٹکوں کے ساتھ نکل رہا ہو (شریان کا کٹنا — فوراً 1122 کال کریں!)۔
- کٹ گہرا ہو، کھل گیا ہو اور اندر چربی یا گوشت نظر آ رہا ہو (6 سے 8 گھنٹوں میں ٹانکے لگوانا ضروری ہے)۔
- انگلی میں بے حسی یا سن پن محسوس ہو، یا انگلی موڑنے میں دشواری ہو۔
- کٹ زنگ آلود یا گندے اوزار سے لگا ہو (48 گھنٹوں میں ٹیٹنس انجکشن لازمی ہے)۔

*نوٹس: یہ فرسٹ ایڈ کی تعلیمی رہنمائی ہے، سنگین کٹ کی صورت میں فوری ڈاکٹر سے رجوع کریں۔*`,
        citations: [
          { title: 'American College of Emergency Physicians - Cuts and Bleeding Care', url: 'https://www.emergencyphysicians.org' },
          { title: 'MedlinePlus - Bleeding and Cuts First Aid', url: 'https://medlineplus.gov' },
          { title: 'American Red Cross - First Aid for Bleeding', url: 'https://www.redcross.org' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
        suggestedFollowUps: [
          'کب کٹ پر ٹانکے (Stitches) لگوانا ضروری ہوتے ہیں؟',
          'ٹیٹنس (Tetanus) کی ویکسین کب لگوانی چاہیے؟',
        ],
      };
    }

    if (lang === 'bn') {
      return {
        text: `### 🩸 জরুরি ফার্স্ট এইড: হাত কেটে যাওয়া ও রক্তপাত (Bleeding Cut First Aid)

**রক্তক্ষরণ বন্ধ করতে এই মুহূর্তে নিম্নলিখিত ৪টি ধাপ অবিলম্বে অনুসরণ করুন:**

১. **১ম ধাপ — ক্ষতের ওপর সরাসরি শক্ত চাপ (এখনই করুন):**
   - একটি পরিষ্কার সুতি কাপড়, গজ বা তোয়ালে দিয়ে কাটা স্থানে **টানা ৫ থেকে ১০ মিনিট শক্ত করে চেপে ধরে রাখুন।**
   - রক্ত বন্ধ হয়েছে কি না দেখার জন্য **বারবার কাপড় তুলে দেখবেন না!** এতে সদ্য গঠিত রক্ত জমাট বাঁধার প্রক্রিয়া ভেঙে গিয়ে আবার রক্তপাত শুরু হয়।

২. **২য় ধাপ — হাত বুকের চেয়ে উঁচুতে তুলে রাখুন (Elevate):**
   - চাপ ধরে রেখেই হাতটি আপনার হৃৎপিণ্ডের চেয়ে উঁচুতে তুলে রাখুন। এতে রক্তপ্রবাহের চাপ কমে রক্তপাত দ্রুত হ্রাস পায়।

৩. **৩য় ধাপ — কলের পানি দিয়ে ধোয়া (রক্তক্ষরণ কমে আসার পর):**
   - কলের পরিষ্কার পানির নিচে ২-৩ মিনিট রেখে আলতো করে ধুলোবালি ধুয়ে ফেলুন।
   - ক্ষতের ভেতরে স্যাভলন, ডেটল, অ্যালকোহল বা হাইড্রোজেন পারক্সাইড সরাসরি ঢালবেন না (এতে সুস্থ রক্তকণিকা ক্ষতিগ্রস্ত হয় এবং ঘা শুকাতে দেরি হয়)।

৪. **৪র্থ ধাপ — পরিষ্কার ব্যান্ডেজ বাঁধুন:**
   - জীবাণুমুক্ত গজ বা ব্যান্ডেজ দিয়ে ক্ষতটি সুরক্ষিত করুন।

**⚠️ কখন অবিলম্বে হাসপাতালে গিয়ে সেলাই (Stitches) নিতে হবে:**
- টানা ১০-১৫ মিনিট শক্তভাবে চেপে রাখার পরও রক্তপাত বন্ধ না হলে।
- রক্ত যদি ফিনকি দিয়ে স্পন্দনের সাথে বের হয় (ধমনীর রক্তক্ষরণ — অবিলম্বে ৯৯৯-এ কল করুন!)।
- ক্ষত যদি গভীর ও ফাঁক হয়ে থাকে এবং ভেতরে হলুদ চর্বি বা পেশী দেখা যায় (সেলাই আবশ্যক)।
- আঙুল অবশ বা অসাড় লাগলে অথবা আঙুল নাড়াতে না পারলে (স্নায়ু বা টেন্ডনের আঘাত)।
- ময়লা, মরচে ধরা ব্লেড বা ধাতব জিনিসে কাটলে (৪৮ ঘণ্টার মধ্যে টিটেনাস ইনজেকশন আবশ্যক)।

*সতর্কতা: এটি প্রাথমিক জীবনরক্ষাকারী তথ্য, জটিল ক্ষতে অবিলম্বে চিকিৎসকের শরণাপন্ন হন।*`,
        citations: [
          { title: 'MedlinePlus - Bleeding and Wounds First Aid', url: 'https://medlineplus.gov' },
          { title: 'American Red Cross - First Aid for Bleeding', url: 'https://www.redcross.org' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
        suggestedFollowUps: [
          'কখন ক্ষতে সেলাই দেওয়া প্রয়োজন হয়?',
          'টিটেনাস টিকার সময়সীমা ও প্রয়োজনীয়তা',
        ],
      };
    }

    if (lang === 'ja') {
      return {
        text: `### 🩸 応急処置：手の切り傷・出血への即時対応（Bleeding Cut First Aid）

**出血を止めるため、今すぐ以下の4ステップを実行してください:**

1. **ステップ1 — 傷口を直接強く圧迫する（直接圧迫止血法）:**
   - 清潔なタオルやガーゼを傷口に強く当て、手のひらで **5〜10分間途切れることなく押し続けます。**
   - 止まったか確認するために **途中で布をめくってはいけません！** 形成途中の血栓（かさぶたの元）が剥がれて再出血します。

2. **ステップ2 — 患部を心臓より高く挙げる:**
   - 圧迫を維持したまま、傷ついた手を心臓の高さより高く持ち上げます。重力により毛細血管圧が下がり、止血が早まります。

3. **ステップ3 — 清潔な流水で洗浄（出血が落ち着いた後）:**
   - 水道水の清潔な流水で2〜3分洗い流し、異物や汚れを除去します。傷口の内部に直接アルコール消毒液を流し込まないでください（正常組織を傷つけ治癒が遅れます）。

4. **ステップ4 — 清潔な保護材（絆創膏・ガーゼ）で保護する:**
   - 傷口を保護し乾燥を防ぎます。

**⚠️ 縫合（ステッチ）や緊急受診が必要なレッドフラッグ:**
- 10〜15分間強く圧迫し続けても出血が止まらない。
- 脈拍に合わせてドクドクと血が噴き出す（動脈性出血 — 直ちに119番通報！）。
- 傷口が深く開き、皮下脂肪や筋肉が見えている（縫合が必要）。
- 指に痺れがある、指を曲げ伸ばしできない（神経や腱の損傷疑い）。
- 錆びた刃物や土に触れた傷（48時間以内の破傷風ワクチン接種が必要）。

*注意：本情報は応急手当の教育情報です。大量出血時は速やかに救急受診してください。*`,
        citations: [
          { title: '日本赤十字社 - 外傷と止血の手当', url: 'https://www.jrc.or.jp' },
          { title: 'MedlinePlus - Cuts and Puncture Wounds', url: 'https://medlineplus.gov' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
        suggestedFollowUps: [
          '縫合が必要な傷の見分け方',
          '破傷風ワクチンの必要期間について',
        ],
      };
    }

    // Default English
    return {
      text: `### 🩸 Immediate First Aid: Bleeding Hand Cut / Laceration ("What to do now")

**TAKE THESE 4 ACTION STEPS RIGHT NOW TO CONTROL BLEEDING:**

1. **STEP 1 — Direct Firm Pressure (Do this immediately):**
   - Place a clean cloth, sterile gauze, or towel directly over the wound.
   - Press **FIRMLY and CONTINUOUSLY for 5 to 10 full minutes without lifting.**
   - **Do NOT peek every 30 seconds!** Lifting disrupts platelet adherence and fibrin clot formation.

2. **STEP 2 — Elevate Above Heart Level:**
   - While maintaining firm pressure, raise your injured hand above the level of your heart. Gravity reduces hydrostatic capillary pressure and significantly slows blood flow.

3. **STEP 3 — Clean Gently Under Running Water (Once bleeding slows):**
   - Hold the cut under clean, cool or lukewarm running tap water for 2–3 minutes to irrigate debris and bacteria.
   - **Do NOT pour alcohol, hydrogen peroxide, or harsh iodine directly inside a deep wound** (these damage exposed fibroblasts and prolong wound healing). Wash gently around the edges with mild soap.

4. **STEP 4 — Apply Sterile Dressing:**
   - Apply a sterile non-stick bandage or clean dressing firmly over the cut.

**⚠️ WHEN YOU NEED STITCHES OR EMERGENCY EVALUATION:**
- Bleeding does NOT stop after 10–15 minutes of continuous firm pressure.
- Blood is spurting in rhythmic pulses (arterial bleeding — **call 911 / 1122 / 999 / 119 immediately!**).
- The wound edges gape open, or you can see yellowish subcutaneous fat globules, muscle, or tendon.
- You experience numbness, pins-and-needles, or cannot flex/extend your fingers (nerve or tendon laceration).
- Cut was caused by a dirty, rusty, or contaminated object (tetanus booster required within 48 hours).

*Notice: This is practical first-aid education. If bleeding is uncontrolled, seek emergency medical services.*`,
      citations: [
        { title: 'American College of Emergency Physicians - Cuts and Bleeding Care', url: 'https://www.emergencyphysicians.org' },
        { title: 'MedlinePlus - Bleeding and Wounds First Aid', url: 'https://medlineplus.gov' },
        { title: 'American Red Cross - First Aid for Bleeding', url: 'https://www.redcross.org' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
      suggestedFollowUps: [
        'How to recognize wounds that need surgical stitches',
        'Check tetanus vaccine requirements',
      ],
    };
  }

  // 3. BURNS & SCALDS ("i burned my hand with hot water whats now?")
  const isBurn =
    q.includes('burn') ||
    q.includes('burned') ||
    q.includes('burnt') ||
    q.includes('scald') ||
    q.includes('boiling water') ||
    q.includes('hot oil') ||
    q.includes('جل گیا') ||
    q.includes('جلنے') ||
    q.includes('হাত পুড়ে') ||
    q.includes('গরম পানিতে পুড়ে') ||
    q.includes('পোড়া') ||
    q.includes('火傷') ||
    q.includes('やけど');

  if (isBurn) {
    if (lang === 'ur') {
      return {
        text: `### 🔥 فوری فرسٹ ایڈ: جلنے یا گرم پانی کا زخم (Burn First Aid)

**ابھی اسی وقت درج ذیل اقدامات کریں:**

1. **پہلا قدم — ٹھنڈے نلکے کے پانی سے 10 سے 20 منٹ تک ٹھنڈا کریں:**
   - جلے ہوئے حصے کو نلکے کے بہتے ہوئے عام ٹھنڈے پانی کے نیچے 10 سے 20 منٹ تک رکھیں۔ یہ گہری بافتوں میں گرمی کے پھیلاؤ کو فوراً روکتا ہے۔

2. **دوسرا قدم — برف کا استعمال ہرگز نہ کریں!**
   - **برف لگانے سے جلی ہوئی جلد مزید مر جاتی ہے (Frostbite)۔** مکھن، ٹوتھ پیسٹ، تیل یا آٹا ہرگز نہ لگائیں، یہ گرمی کو اندر قید کر لیتے ہیں اور خطرناک انفیکشن پیدا کرتے ہیں۔

3. **تیسرا قدم — تنگ زیورات اور انگوٹھیاں فوراً اتاریں:**
   - جلی ہوئی جلد تیزی سے سوجتی ہے، اس لیے انگوٹھیاں فوراً اتار لیں۔

4. **چوتھا قدم — صاف کپڑے یا کلنگ ریپ سے ڈھانپیں:**
   - جلے ہوئے چھالوں (Blisters) کو کبھی نہ پھوڑیں۔ صاف نان اسٹک پٹی یا صاف پلاسٹک ریپ سے ڈھیلا ڈھانپیں۔

**⚠️ کب فوری ہسپتال جانا ضروری ہے:**
- جلا ہوا حصہ 3 انچ سے بڑا ہو، یا چہرے، ہاتھوں، جوڑوں پر ہو۔
- جلد سفید، سخت یا جھلس کر بے حس ہو چکی ہو (تھرڈ ڈگری برن)۔

*نوٹس: یہ فرسٹ ایڈ کی تعلیمی معلومات ہیں، سنگین جلنے پر فوری معالج سے رجوع کریں۔*`,
        citations: [
          { title: 'MedlinePlus - Burns First Aid', url: 'https://medlineplus.gov' },
          { title: 'American Burn Association - Burn Prevention and Care', url: 'https://ameriburn.org' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    if (lang === 'bn') {
      return {
        text: `### 🔥 জরুরি ফার্স্ট এইড: পুড়ে যাওয়া বা গরম পানির ছ্যাঁকা (Burn First Aid)

**এই মুহূর্তে আপনার করণীয় তাৎক্ষণিক পদক্ষেপ:**

১. **১ম ধাপ — কলের স্বাভাবিক ঠান্ডা পানির নিচে ১০-২০ মিনিট রাখুন:**
   - পোড়া অংশটি কলের পরিষ্কার স্বাভাবিক ঠান্ডা পানির ধারায় টানা ১০ থেকে ২০ মিনিট ধরে রাখুন। এটি ভেতরের কোষে তাপ ছড়ানো বন্ধ করে।

২. **২য় ধাপ — বরফ ভুলেও লাগাবেন না!**
   - **বরফ ক্ষতস্থানের রক্ত সঞ্চালন বন্ধ করে দেয়।** পোড়া স্থানে টুথপেস্ট, মাখন, তেল বা ডিম লাগাবেন না; এগুলো তাপ আটকে রাখে এবং মারাত্মক জীবাণু সংক্রমণ ঘটায়।

৩. **৩য় ধাপ — আংটি বা আঁটসাঁট গয়না দ্রুত খুলে ফেলুন:**
   - পোড়া স্থান দ্রুত ফুলে ওঠে, তাই রক্ত চলাচল বন্ধ হওয়ার আগেই আংটি খুলে নিন।

৪. **৪র্থ ধাপ — পরিষ্কার সুতি কাপড় দিয়ে আলতো ঢেকে রাখুন:**
   - পোড়ার ফোস্কা কখনোই ফাটাবেন না। পরিষ্কার পাতলা গজ দিয়ে ঢেকে রাখুন।

**⚠️ কখন জরুরি হাসপাতালে যাবেন:**
- পোড়া অংশ হাতের তালুর চেয়ে বড় হলে বা মুখমণ্ডল, হাত, যৌনাঙ্গ ও সংযোগস্থলে হলে।
- ত্বক পুড়ে সাদা, শক্ত বা অসাড় হয়ে গেলে (থার্ড ডিগ্রি বার্ন)।

*সতর্কতা: এটি প্রাথমিক জীবনরক্ষাকারী তথ্য, গুরুতর পোড়ায় অবিলম্বে হাসপাতালে যান।*`,
        citations: [
          { title: 'MedlinePlus - Burns Care', url: 'https://medlineplus.gov' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    if (lang === 'ja') {
      return {
        text: `### 🔥 応急処置：やけど（熱傷）への即時対応（Burn First Aid）

**今すぐ行うべき緊急ステップ:**

1. **ステップ1 — 直ちに水道水の流水で10〜20分冷やす:**
   - 患部に弱い流水を当て、深部組織への熱伝導を断ち切ります。

2. **ステップ2 — 氷を直接当てない！**
   - **氷を直接当てると凍傷や組織壊死を引き起こします。** アロエ、油、味噌、歯磨き粉などを塗るのは感染源になるため厳禁です。

3. **ステップ3 — 指輪や時計を速やかに外す:**
   - やけど部は急激に腫れるため、血流障害を防ぐため即座に外してください。

4. **ステップ4 — 水ぶくれ（水疱）は絶対に破らない:**
   - 水ぶくれは天然の無菌バリアです。破らずに清潔なラップやガーゼで保護します。

**⚠️ 救急受診が必要なレッドフラッグ:**
- 手のひらより広い範囲、顔、手足の関節部。
- 皮膚が白く硬くなっている、または黒く炭化している（III度熱傷）。

*注意：本情報は応急手当の教育情報です。重度のやけどは直ちに受診してください。*`,
        citations: [
          { title: '日本熱傷学会 - やけどの応急手当', url: 'https://www.jsbi-burn.org' },
          { title: 'MedlinePlus - Burns First Aid', url: 'https://medlineplus.gov' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    return {
      text: `### 🔥 Immediate First Aid: Burns & Scalds ("What to do now")

**TAKE THESE ACTION STEPS IMMEDIATELY:**

1. **STEP 1 — Cool Under Cool Running Water for 10–20 Minutes:**
   - Immediately hold the burn under cool, gentle running tap water. This draws residual thermal energy out of subcutaneous layers and halts tissue necrosis.

2. **STEP 2 — DO NOT USE ICE OR HOME REMEDIES:**
   - **Never apply direct ice** (causes vasoconstriction and frostbite necrosis on compromised tissue).
   - Never apply butter, mayonnaise, toothpaste, oil, or flour (these insulate heat and breed severe bacterial infections).

3. **STEP 3 — Remove Tight Rings & Jewelry Immediately:**
   - Burned extremities swell within minutes; rings can cause rapid digital ischemia.

4. **STEP 4 — Protect Without Breaking Blisters:**
   - Intact blisters are sterile biological dressings. Never pop them. Cover loosely with clean plastic wrap or non-stick sterile gauze.

**⚠️ WHEN TO GO TO THE EMERGENCY ROOM:**
- Burn area is larger than 3 inches in diameter, or involves the face, hands, feet, groin, or major joints.
- The burn looks leathery, waxy white, or charred, or has lost sensation (third-degree burn).

*Notice: This is practical first-aid education. Seek emergency care for severe burns.*`,
      citations: [
        { title: 'MedlinePlus - Burns First Aid', url: 'https://medlineplus.gov' },
        { title: 'American Burn Association - Burn Injury Care', url: 'https://ameriburn.org' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
    };
  }

  // 4. NOSEBLEEDS ("my nose is bleeding whats now?")
  const isNosebleed =
    (q.includes('nose') && (q.includes('bleed') || q.includes('blood'))) ||
    q.includes('nosebleed') ||
    q.includes('epistaxis') ||
    q.includes('نکسیر') ||
    q.includes('ناک سے خون') ||
    (q.includes('নাক') && q.includes('রক্ত')) ||
    q.includes('鼻血');

  if (isNosebleed) {
    if (lang === 'ur') {
      return {
        text: `### 🩸 فوری فرسٹ ایڈ: نکسیر یا ناک سے خون بہنا (Nosebleed First Aid)

**ابھی اسی وقت درج ذیل اقدامات کریں:**

1. **سیدھے بیٹھیں اور ہلکا سا آگے جھکیں (Lean Forward):**
   - **سر کو پیچھے ہرگز نہ جھکائیں!** سر پیچھے کرنے سے خون گلے کے ذریعے معدے میں چلا جاتا ہے جس سے قے اور متلی ہوتی ہے، یا سانس کی نالی میں جانے کا خطرہ ہوتا ہے۔

2. **ناک کا نرم حصہ دبائیں:**
   - اپنے انگوٹھے اور شہادت کی انگلی سے ناک کے ہڈی کے فوراً نیچے والے نرم حصے کو مضبوطی سے پکڑ کر دبائیں۔

3. **10 سے 15 منٹ تک مسلسل دباؤ رکھیں:**
   - منہ سے سانس لیں۔ ہر دو منٹ بعد ہاتھ نہ چھوڑیں تاکہ خون جم سکے۔

4. **برف کی ٹکور:**
   - ناک کے اوپر ہڈی پر اور گردن کے پیچھے برف رکھیں تاکہ شریانیں سکڑیں۔

**⚠️ کب ڈاکٹر کے پاس جائیں:** 20 منٹ مسلسل دبانے کے بعد بھی خون نہ رکے، یا سر میں چوٹ کے بعد خون آیا ہو۔`,
        citations: [{ title: 'MedlinePlus - Nosebleeds', url: 'https://medlineplus.gov' }],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    if (lang === 'bn') {
      return {
        text: `### 🩸 জরুরি ফার্স্ট এইড: নাক দিয়ে রক্ত পড়া (Nosebleed First Aid)

**এখনই এই পদক্ষেপগুলো অনুসরণ করুন:**

১. **সোজা হয়ে বসুন এবং সামান্য সামনের দিকে ঝুঁকুন:**
   - **মাথা কখনোই পেছনের দিকে হেলাবেন না!** মাথা পেছনে হেলালে রক্ত গলায় ও পাকস্থলীতে গিয়ে বমি বা শ্বাসনালীতে বাধার সৃষ্টি করে।

২. **নাকের নরম অংশ চেপে ধরুন:**
   - বুড়ো আঙুল ও তর্জনী দিয়ে নাকের হাড়ের ঠিক নিচের নরম অংশটি শক্ত করে চেপে ধরে রাখুন।

৩. **টানা ১০ থেকে ১৫ মিনিট চেপে রাখুন:**
   - মুখ দিয়ে শ্বাস নিন। রক্ত থেমেছে কি না দেখতে বারবার হাত সরাবেন না।

৪. **বরফের সেঁক:**
   - নাকের ওপর ও ঘাড়ের পেছনে বরফের প্যাক রাখলে রক্তনালী সংকুচিত হয়ে রক্তপাত দ্রুত বন্ধ হয়।

**⚠️ কখন জরুরি চিকিৎসা নেবেন:** টানা ২০ মিনিট চেপে রাখার পরও রক্ত না থামলে বা মাথায় আঘাতের পর রক্ত পড়লে।`,
        citations: [{ title: 'MedlinePlus - Nosebleeds Care', url: 'https://medlineplus.gov' }],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    if (lang === 'ja') {
      return {
        text: `### 🩸 応急処置：鼻血への即時対応（Nosebleed First Aid）

**今すぐ以下の手順を実行してください:**

1. **椅子に腰掛け、軽く前かがみになる（うつむく）:**
   - **頭を後ろに反らしてはいけません！** 血液が喉へ流れ込み、誤嚥や嘔吐の原因になります。

2. **小鼻（鼻の軟骨部分）を強くつまむ:**
   - 親指と人差し指で小鼻を両脇からしっかりと強く圧迫します。

3. **10〜15分間連続してつまみ続ける:**
   - 口で呼吸し、途中で確認するために指を離さないでください。

4. **鼻根部を冷やす:**
   - 鼻の付け根に保冷剤を当てると血管が収縮し止血を促進します。

**⚠️ 受診の目安:** 20分以上圧迫しても止まらない場合、頭部打撲後の鼻血。`,
        citations: [{ title: '日本耳鼻咽喉科頭頸部外科学会 - 鼻血の止め方', url: 'https://www.jibika.or.jp' }],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    return {
      text: `### 🩸 Immediate First Aid: Nosebleed (Epistaxis) ("What to do now")

**TAKE THESE IMMEDIATE ACTION STEPS:**

1. **Sit Upright and Lean Slightly FORWARD:**
   - **Never tilt your head backward!** Tilting backward causes blood to drain down the posterior pharynx into the stomach (inducing nausea and emesis) or into the trachea.

2. **Pinch the Soft Fleshy Part of the Nose:**
   - Using your thumb and forefinger, firmly compress the soft nasal alae just below the bony bridge (Kiesselbach's plexus).

3. **Maintain Firm Continuous Pressure for 10–15 Minutes:**
   - Breathe through your mouth. Do not release pressure every 2 minutes to check.

4. **Apply Cold to Nasal Bridge:**
   - Place an ice pack across the bridge of your nose and nape of neck to promote local vasoconstriction.

**⚠️ Red Flags to Seek Urgent Care:**
- Bleeding persists past 20 minutes of continuous direct compression.
- Blood volume is profuse or following blunt head trauma.`,
      citations: [{ title: 'MedlinePlus - Nosebleeds', url: 'https://medlineplus.gov' }],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
    };
  }

  // 5. SPRAINS, TWISTED ANKLE & JOINTS ("twisted my ankle swollen whats now?")
  const isSprain =
    q.includes('sprain') ||
    (q.includes('twist') && (q.includes('ankle') || q.includes('foot') || q.includes('knee') || q.includes('wrist'))) ||
    q.includes('موچ') ||
    q.includes('مچکے') ||
    q.includes('পা মচকে') ||
    q.includes('捻挫');

  if (isSprain) {
    return {
      text:
        lang === 'ur'
          ? `### 🦶 فوری فرسٹ ایڈ: پاؤں یا جوڑ کی موچ (Sprained Joint First Aid)

**R.I.C.E کے 4 اصولوں پر عمل کریں:**
1. **REST (آرام):** جوڑ پر وزن ڈالنا فوراً بند کریں۔
2. **ICE (برف):** کپڑے میں لپٹی برف 15 سے 20 منٹ رکھیں (براہ راست جلد پر نہ رکھیں)۔
3. **COMPRESSION (پٹی):** لچکدار کریپ بینڈیج سے اعتدال سے باندھیں (زیادہ تنگ نہ ہو)۔
4. **ELEVATION (بلندی):** پاؤں کو تکیے پر دل کی سطح سے اونچا رکھیں۔

**⚠️ کب ایکس رے ضروری ہے:** اگر پاؤں پر 4 قدم چلنا بالکل ناممکن ہو یا ہڈی پر ہاتھ لگانے سے شدید درد ہو۔`
          : lang === 'bn'
          ? `### 🦶 জরুরি ফার্স্ট এইড: পা মচকে যাওয়া (Sprained Ankle First Aid)

**R.I.C.E চিকিৎসা পদ্ধতি অনুসরণ করুন:**
১. **REST (বিশ্রাম):** আঘাতপ্রাপ্ত পায়ে ভর দিয়ে হাঁটা সাথে সাথে বন্ধ করুন।
২. **ICE (বরফ):** কাপড়ে পেঁচিয়ে বরফ ১৫-২০ মিনিট রাখুন ফোলা কমাতে।
৩. **COMPRESSION (ব্যান্ডেজ):** ক্রেপ ব্যান্ডেজ দিয়ে পরিমিত চাপে পেঁচিয়ে রাখুন।
৪. **ELEVATION (উঁচুতে রাখা):** পা বালিশের ওপর তুলে রাখুন।

**⚠️ কখন এক্স-রে লাগবে:** আঘাতের পর ৪ কদম পা ফেলা একদম অসম্ভব হলে বা হাড়ে তীব্র ব্যথা থাকলে।`
          : lang === 'ja'
          ? `### 🦶 応急処置：足首の捻挫（Sprained Ankle First Aid）

**RICE処置を速やかに実施してください:**
1. **REST（安静）:** 体重をかけず、歩行を中止する。
2. **ICE（冷却）:** タオルで包んだ氷で15〜20分患部を冷やす。
3. **COMPRESSION（圧迫）:** 弾性包帯で適度に圧迫し内出血と腫れを抑える。
4. **ELEVATION（挙上）:** 患部を心臓より高く上げる。

**⚠️ X線撮影が必要な目安:** 4歩以上自力で歩けない場合、骨の圧痛が強い場合。`
          : `### 🦶 Immediate First Aid: Sprained Ankle / Acute Joint Trauma ("What to do now")

**FOLLOW THE R.I.C.E. CLINICAL PROTOCOL RIGHT NOW:**
1. **REST:** Immediately remove all weight-bearing load from the joint.
2. **ICE:** Apply an ice pack wrapped in a cloth for 15–20 minutes every 2–3 hours.
3. **COMPRESSION:** Wrap firmly with an elastic bandage from toes upwards to prevent interstitial fluid pooling.
4. **ELEVATION:** Prop the limb on pillows above heart level to facilitate lymphatic drainage.

**⚠️ When You Need an X-Ray (Ottawa Ankle Criteria):**
- Inability to bear weight and take 4 steps immediately after injury.
- Exquisite bone tenderness over the posterior malleolus or base of the 5th metatarsal.`,
      citations: [{ title: 'MedlinePlus - Sprains and Strains', url: 'https://medlineplus.gov' }],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
    };
  }

  return null;
}
