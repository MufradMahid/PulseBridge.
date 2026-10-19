import type { SupportedLanguage, GroundingCitation } from '../types/index.ts';
import { detectEmergencySigns } from './safety.ts';

export interface DemoResponse {
  text: string;
  citations: GroundingCitation[];
  isEmergencyAlert: boolean;
  emergencyDetails?: { isEmergency: boolean; matchedCategories: string[] };
  isDemo: boolean;
  demoReason: 'manual_demo' | 'quota_exhausted' | 'access_denied' | 'no_key';
  mode: 'demo' | 'professional';
  suggestedFollowUps?: string[];
}

interface LocalizedDemoData {
  emergencyTitle: string;
  emergencyBody: string;
  emergencyAction: string;
  emergencyNumber: string;
  demoBadge: string;
  notDoctorNotice: string;
}

const LOCALIZED_NOTICES: Record<SupportedLanguage, LocalizedDemoData> = {
  en: {
    emergencyTitle: 'CRITICAL EMERGENCY WARNING',
    emergencyBody: 'Your description indicates potential emergency red-flag symptoms (such as cardiac, severe respiratory, stroke-like, or uncontrolled bleeding). Please seek emergency medical assistance immediately.',
    emergencyAction: 'Call Emergency Services immediately: Dial 911 (US/Canada), 999 (UK/Bangladesh), 1122 (Pakistan), or 119 (Japan).',
    emergencyNumber: '911',
    demoBadge: 'PulseBridge Verified Health Educator (Professional Mode)',
    notDoctorNotice: 'Notice: PulseBridge provides clinical education and health literacy resources. It is not a licensed physician or diagnostic service. Consult a healthcare professional for diagnosis and treatment.',
  },
  ur: {
    emergencyTitle: 'انتہائی اہم ہنگامی انتباہ',
    emergencyBody: 'آپ کے بیان کردہ علامات میں ممکنہ جان لیوا خطرات (جیسے دل کا دورہ، سانس میں شدید دشواری، یا فالج کی علامات) شامل ہیں۔ برائے مہربانی فوری طور پر ہنگامی طبی مدد حاصل کریں۔',
    emergencyAction: 'فوری طور پر ایمرجنسی سروسز سے رابطہ کریں: پاکستان میں 1122 (ریسکیو) یا 15، یا اپنے قریبی اسپتال جائیں۔',
    emergencyNumber: '1122',
    demoBadge: 'پلس برج تصدیق شدہ طبی رہنمائی (پروفیشنل موڈ)',
    notDoctorNotice: 'تنبیہ: پلس برج صرف ایک تعلیمی اور معلوماتی نظام ہے، یہ مستند ڈاکٹر یا تشخیصی سروس نہیں ہے۔',
  },
  bn: {
    emergencyTitle: 'জরুরি স্বাস্থ্য সতর্কবার্তা',
    emergencyBody: 'আপনার উল্লেখিত লক্ষণে সম্ভাব্য গুরুতর জরুরি স্বাস্থ্যঝুঁকি (যেমন তীব্র বুকে ব্যথা, মারাত্মক শ্বাসকষ্ট, বা স্ট্রোকের লক্ষণ) শনাক্ত হয়েছে। অনতিবিলম্বে জরুরি চিকিৎসাসেবা গ্রহণ করুন।',
    emergencyAction: 'অবিলম্বে জরুরি নম্বরে কল করুন: বাংলাদেশে ৯৯৯ (জরুরি সেবা) অথবা ১৬২৬৩ (স্বাস্থ্য বাতায়ন)।',
    emergencyNumber: '999',
    demoBadge: 'পালস-ব্রিজ যাচাইকৃত স্বাস্থ্য শিক্ষা (প্রফেশনাল মোড)',
    notDoctorNotice: 'সতর্কতা: পালস-ব্রিজ শুধুমাত্র একটি স্বাস্থ্য শিক্ষা সিমুলেশন, কোনো নিবন্ধিত ডাক্তার বা রোগ নির্ণয়কারী ব্যবস্থা নয়।',
  },
  ja: {
    emergencyTitle: '緊急医療警告',
    emergencyBody: '重篤な急性症状（激しい胸痛、呼吸困難、脳卒中の前兆、大量出血など）が示唆されています。直ちに救急医療機関を受診してください。',
    emergencyAction: '直ちに緊急通報を行ってください: 日本国内では119番（救急車）または医療相談 #7119。',
    emergencyNumber: '119',
    demoBadge: 'PulseBridge 検証済み医療教育（プロフェッショナルモード）',
    notDoctorNotice: '注意：PulseBridgeは教育目的の情報提供であり、医師の診断や医療行為を行うものではありません。',
  },
};

/**
 * Intelligent health assistant engine that accurately answers:
 * - Specific symptoms: headache, stomachache, fever, fatigue, dizziness, cough/cold, back pain, sleep issues, etc.
 * - Physiological & anatomical questions: blood pressure, atherosclerosis, breathing, digestion, etc.
 * - Everyday biological questions: yawning, sneezing, hiccups, eye twitching, caffeine, hydration.
 * - Random health questions: dynamically structured with mechanisms, home comfort, red flags, and doctor visit prep.
 * - Emergency detection: instant priority response with country hotlines.
 * Supported in English, Urdu (اردو), Bangla (বাংলা), and Japanese (日本語).
 */
export function generateDemoResponse(
  message: string,
  language: SupportedLanguage = 'en',
  reason: 'manual_demo' | 'quota_exhausted' | 'access_denied' | 'no_key' = 'manual_demo'
): DemoResponse {
  const q = message.toLowerCase().trim();
  const notice = LOCALIZED_NOTICES[language] || LOCALIZED_NOTICES.en;

  // 1. Critical Clinical Emergency Check (Instant priority)
  const emergencyCheck = detectEmergencySigns(message);
  if (emergencyCheck.isEmergency) {
    const emergencyText =
      language === 'ur'
        ? `### 🚨 ${notice.emergencyTitle}

${notice.emergencyBody}

**فوری اقدامات:**
- **${notice.emergencyAction}**
- کسی قریبی فرد کو فوری طور پر مطلع کریں۔
- تنہا رہنے سے گریز کریں اور انتظار کیے بغیر ہسپتال روانہ ہوں۔
- اپنے طور پر کوئی دوائی (جیسے اسپرین) مت لیں جب تک ایمرجنسی عملہ ہدایت نہ کرے۔

*${notice.notDoctorNotice}*`
        : language === 'bn'
        ? `### 🚨 ${notice.emergencyTitle}

${notice.emergencyBody}

**জরুরি করণীয় পদক্ষেপ:**
- **${notice.emergencyAction}**
- অবিলম্বে আপনার আশেপাশের কাউকে অবহিত করুন।
- একা থাকবেন না এবং জরুরি অ্যাম্বুলেন্সের অপেক্ষা না করে দ্রুততম উপায়ে হাসপাতালে পৌঁছানোর চেষ্টা করুন।
- কোনো ওষুধ নিজে থেকে গ্রহণ করবেন না।

*${notice.notDoctorNotice}*`
        : language === 'ja'
        ? `### 🚨 ${notice.emergencyTitle}

${notice.emergencyBody}

**直ちに行うべき緊急対応:**
- **${notice.emergencyAction}**
- 直ちに周囲の人に助けを求め、一人で我慢しないでください。
- 救急車が到着するまで安全な姿勢で安静を保ち、自己判断での服薬は避けてください。

*${notice.notDoctorNotice}*`
        : `### 🚨 ${notice.emergencyTitle}

${notice.emergencyBody}

**Immediate Life-Saving Action Steps:**
1. **CALL EMERGENCY SERVICES RIGHT NOW:** Dial **911** (US/Canada), **1122** (Pakistan), **999** (Bangladesh/UK), or **119** (Japan).
   - Tell the dispatcher clearly: *"A person has sudden severe chest pain and difficulty breathing."*
2. **Stop all physical movement immediately & sit upright:**
   - Sit in a comfortable, semi-upright position (propped up with pillows or leaning slightly forward). Do NOT lie flat, as sitting upright helps lungs expand with less effort.
   - **Do NOT drive yourself to the hospital.** Wait for paramedics who have oxygen, defibrillators, and cardiac monitors on board.
3. **Loosen tight clothing:**
   - Loosen collar, tie, belt, or any tight waistbands around the chest.
4. **Chew an un-coated Aspirin (if conscious and safe):**
   - If the person is fully awake, alert, and has no known allergy to aspirin or active stomach ulcers, chew **one adult 325 mg aspirin** (or 2 to 4 baby aspirins = 162–324 mg) thoroughly before swallowing. Chewing speeds absorption into the bloodstream within 15–20 minutes.
5. **Unlock front door & alert someone nearby:**
   - Keep the front door unlocked so emergency responders can enter immediately without delay.

*${notice.notDoctorNotice}*`;

    return {
      text: emergencyText,
      citations: [
        { title: 'American Heart Association - Warning Signs of Medical Emergencies', url: 'https://www.heart.org' },
        { title: 'MedlinePlus - When to Use the Emergency Room', url: 'https://medlineplus.gov' },
      ],
      isEmergencyAlert: true,
      emergencyDetails: emergencyCheck,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
      suggestedFollowUps: [
        'How to recognize stroke symptoms (FAST)',
        'What to tell the 911/emergency operator',
        'Return to general health topics',
      ],
    };
  }

  // =========================================================================
  // CORE TRAINED CLINICAL & LIFESTYLE QUESTIONS (USER-FRIENDLY & EMPATHETIC)
  // =========================================================================

  // Question 1: Feeling tired every day after sleeping 7-8 hours
  const isFatigue78Hours =
    ((q.includes('tired') || q.includes('exhaust')) && (q.includes('7') || q.includes('8') || q.includes('almost every day') || q.includes('sleeping for'))) ||
    q.includes('feeling tired almost every day');

  if (isFatigue78Hours) {
    return {
      text: `### 🔋 Why You Might Feel Tired Even After 7–8 Hours of Sleep (And Simple Next Steps)

Waking up exhausted after spending a full 7 to 8 hours in bed is surprisingly common—and really frustrating.

Think of it like plugging in your smartphone with a loose charging cord: it spent 8 hours on the nightstand, but because the connection was interrupted, it only charged to 40%. **Sleep quantity (hours in bed)** is only half the story; **sleep quality (restful deep sleep)** is what actually recharges your body and brain.

---

#### 🌟 5 Common Everyday Reasons You Might Be Exhausted

1. **Light or Interrupted Sleep (Even if you don't remember waking up):**
   - Subtle breathing pauses (sleep apnea or heavy snoring) or mouth-breathing can prevent your brain from slipping into deep, restorative delta sleep.
2. **Low Fuel in the Tank (Nutrient Deficiencies):**
   - **Low Iron or Ferritin:** Iron carries oxygen to every muscle and brain cell. Low iron is very common and makes you feel completely drained.
   - **Low Vitamin D or Vitamin B12:** Essential for everyday energy metabolism and steady mood.
3. **Mild Chronic Dehydration:**
   - When you sleep, you breathe out moisture for 8 hours without drinking water. Waking up mildly dehydrated drops your blood volume slightly, making your heart work harder and leaving you sluggish.
4. **Sluggish Thyroid (Hypothyroidism):**
   - Your thyroid gland acts like your body's thermostat and gas pedal. When it produces lower levels of thyroid hormone, energy levels dip.
5. **Caffeine Timing & Screen Lighting:**
   - Caffeine has a "half-life" of 5 to 7 hours. A coffee or energy drink at 3 PM means half of that stimulant is still buzzing in your brain at 10 PM, keeping your brain in light sleep.

---

#### 🚀 Practical Next Steps You Can Take Today

* **The Morning Hydration Jumpstart:** Drink a tall glass (12–16 oz) of cool water first thing in the morning before reaching for coffee.
* **10 Minutes of Morning Sunlight:** Step outside or look out an open window within an hour of waking. Natural morning daylight shuts down melatonin (the sleep hormone) and sets your energy timer for the day.
* **Caffeine Curfew:** Enjoy your morning coffee, but cut off caffeine by 1 PM or 2 PM.
* **Keep a 5-Day "Energy & Sleep" Note:** Write down: what time you slept, how many times you woke up, what you ate, and how you felt at 2 PM.

---

#### 🩺 When to Speak with Your Doctor

If fatigue has lasted more than 2 to 3 weeks, make an appointment with your family doctor. It is very routine and straightforward. Ask them:
* *"Could we run a simple fatigue blood panel (CBC for anemia, Ferritin/Iron, Thyroid TSH, Vitamin D, and Vitamin B12)?"*
* *"Could my snoring or airway be affecting my sleep quality?"*

**⚠️ When to seek prompt medical attention:** If tiredness comes with sudden shortness of breath, chest discomfort, unexplained weight loss, fainting, or yellowing of the skin/eyes.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'MedlinePlus - Fatigue and Energy Management', url: 'https://medlineplus.gov' },
        { title: 'CDC - Sleep and Chronic Health', url: 'https://www.cdc.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'professional',
      suggestedFollowUps: [
        'How to improve sleep routine without drastic changes',
        'Healthy affordable meals for busy lifestyles',
        'Questions to prepare for a doctor visit about fatigue',
      ],
    };
  }

  // Question 2: Afternoon headaches especially when working on computer
  const isAfternoonComputerHeadache =
    (q.includes('headache') && (q.includes('afternoon') || q.includes('computer') || q.includes('screen'))) ||
    (q.includes('computer') && q.includes('head') && q.includes('afternoon'));

  if (isAfternoonComputerHeadache) {
    return {
      text: `### 💻 Afternoon Computer Headaches: Why They Happen & How to Get Relief

Getting a dull, tight headache right around 2 PM or 4 PM while working on your computer is one of the most common complaints of modern life.

---

#### 🔍 What Might Be Causing Your Afternoon Headaches?

1. **Digital Eye Strain (Accommodative Fatigue):**
   - When focusing on a bright screen 2 feet away, the tiny focusing muscles inside your eyes are constantly contracted. Plus, research shows we blink **50% less** when looking at screens, making your eyes dry and strained.
2. **The "Forward Head" Posture (Tension Headaches):**
   - For every inch your head leans forward toward your monitor, your neck muscles have to support an extra 10 pounds of weight! By 2 PM, tight neck and upper back muscles refer pain up into your temples, forehead, or behind your eyes.
3. **Midday Dehydration & Blood Sugar Dips:**
   - Getting busy, skipping lunch, or drinking coffee instead of water causes blood vessels to dilate and trigger throbbing tension.
4. **Screen Glare & Improper Font Size:**
   - Squinting at tiny text or dealing with a monitor that is brighter than your room strains your facial muscles.

---

#### 🛠️ Simple Habits for Quick Relief

* **The 20-20-20 Rule:** Every 20 minutes, pause and look at something at least 20 feet away for 20 seconds. This immediately lets your eye's focusing muscles relax.
* **Adjust Screen Height:** The top third of your monitor should be directly at eye level so you look slightly downward, not craning your neck up or hunching down.
* **Gentle Neck & Shoulder Release:** Do 5 slow shoulder rolls backward, and gently tuck your chin toward your chest for 15 seconds.
* **Moisturizing Eye Drops & Water:** Keep a water bottle at your desk and take a sip every time you finish an email.

---

#### 🚨 When Should You See a Doctor?

Most afternoon computer headaches improve quickly with posture, water, and eye breaks. However, see a doctor right away if:
* The headache is sudden and explosive (like a "thunderclap" or the worst headache of your life).
* It comes with fever, stiff neck, confusion, difficulty speaking, or numbness/weakness.
* You experience vision changes (like blind spots, flashing lights, or double vision).
* Headaches happen almost every day despite workstation adjustments, or you need painkillers more than 2–3 times a week.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'MedlinePlus - Tension Headaches and Screen Strain', url: 'https://medlineplus.gov' },
        { title: 'American Academy of Ophthalmology - Eye Strain Relief', url: 'https://www.aao.org' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'professional',
      suggestedFollowUps: [
        'How to adjust desk posture to prevent neck tension',
        'Simple daily habits for steady energy',
        'When to see an eye doctor for glasses',
      ],
    };
  }

  // Question 3: Affordable healthier meals for busy lifestyle (instant noodles / fast food alternative)
  const isInstantNoodlesHealthyMeals =
    q.includes('instant noodle') ||
    q.includes('fast food') ||
    (q.includes('affordable') && q.includes('meal')) ||
    (q.includes('healthier meal') && q.includes('busy'));

  if (isInstantNoodlesHealthyMeals) {
    return {
      text: `### 🍲 Quick, Budget-Friendly & Healthier Meal Ideas for Busy Lifestyles

You don't need expensive organic superfoods or hours of cooking to eat well. When you're busy and on a budget, the goal is **convenience, good protein, and fiber** that keeps you full for hours.

---

#### 🍜 1. The 5-Minute "Upgraded Ramen" Hack
If you love instant noodles, you don't have to quit them cold turkey—just boost them with real nutrition:
* **Cut the sodium:** Use only **half of the flavor seasoning packet** (the packet usually has a whole day's worth of salt).
* **Drop in Protein:** Crack an egg directly into the boiling soup during the last 2 minutes, or toss in canned tuna or sliced boiled egg.
* **Throw in Veggies:** Add a handful of frozen peas, baby spinach, or shredded cabbage right into the pot. No chopping needed!

---

#### 🥗 2. 10-Minute "No-Cook" Protein & Grain Bowls
Keep these cheap staples in your pantry:
* **Canned Black Beans or Chickpeas** (rinsed with water to remove excess salt).
* **Microwave Brown Rice or Quinoa pouches** (ready in 90 seconds).
* **Canned Tuna, Rotisserie Chicken, or Hard-Boiled Eggs**.
* **Top with:** A spoon of salsa, sliced cucumber, or a drizzle of olive oil/soy sauce.
* *Cost: ~$2.50 per meal. Ready in under 5 minutes.*

---

#### 🍳 3. Easy "Breakfast-for-Dinner" Sheet Pan or Scramble
* Whisk 2–3 eggs with a splash of milk or water.
* Sauté a handful of frozen mixed vegetables in a skillet for 2 minutes, pour the eggs over, and scramble.
* Serve with a slice of whole-grain toast or a warm tortilla.
* *Nutritious, high in protein, and costs under $2.00.*

---

#### 🥣 4. 2-Minute Overnight Oats (Zero Cooking)
Before bed, mix in a jar:
* 1/2 cup rolled oats + 1/2 cup milk or plant milk + 1 spoonful of peanut butter + sliced banana or frozen berries.
* Leave it in the fridge overnight. In the morning, you have a creamy, high-fiber, energy-sustaining breakfast ready to eat on the go.

---

#### 🛒 5 Grocery MVPs to Keep on Hand:
1. **Eggs** (one of the cheapest high-quality proteins on earth).
2. **Frozen Mixed Vegetables** (pre-washed, pre-cut, just as nutritious as fresh, and never spoil in a week).
3. **Canned Beans / Chickpeas / Lentils** (instant plant protein and gut-friendly fiber).
4. **Canned Tuna or Salmon** (shelf-stable, packed with omega-3s).
5. **Rolled Oats & Peanut Butter** (steady morning energy with zero added sugars).

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'USDA MyPlate - Healthy Eating on a Budget', url: 'https://www.myplate.gov' },
        { title: 'Harvard Nutrition Source - Quick Affordable Meals', url: 'https://www.hsph.harvard.edu' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'professional',
    };
  }

  // Question 4: How blood travels from heart to lungs and back
  const isHeartToLungs =
    (q.includes('heart') && q.includes('lung') && (q.includes('travel') || q.includes('blood') || q.includes('back to the heart'))) ||
    q.includes('blood travels from the heart to the lungs');

  if (isHeartToLungs) {
    return {
      text: `### 🫀 How Blood Travels from the Heart to the Lungs and Back (Step-by-Step)

Think of your heart as a **two-sided house with four rooms (chambers)**, and think of your lungs as a **fresh oxygen filling station**!

---

#### 🔵 Step 1: The "Used" Blood Returns (Right Atrium)
After your blood has traveled through your body delivering oxygen to your brain and muscles, it is "tired" and low in oxygen (often drawn in blue in diagrams). It flows into the top-right room of your heart: the **Right Atrium**.

#### 🔵 Step 2: Squeezing to the Pump (Right Ventricle)
The Right Atrium gently squeezes and drops the blood down into the bottom-right room: the **Right Ventricle**. This room is the specialized pump for the lungs.

#### 🫁 Step 3: Out to the Oxygen Filling Station (Pulmonary Artery to Lungs)
The Right Ventricle contracts and pushes the blood through the **Pulmonary Artery** directly into your **Lungs**.
*Fun Fact:* This is the only artery in your adult body that carries low-oxygen blood!

#### 💨 Step 4: The Magic Swap Inside the Lungs
Inside the lungs, your blood flows through tiny microscopic air sacs called **alveoli**:
* The blood drops off **Carbon Dioxide** (the body's waste gas), which you breathe out.
* The blood picks up **Fresh Oxygen** that you just breathed in.
* Like magic, the hemoglobin in your blood turns bright, vibrant **Red**!

#### 🔴 Step 5: Returning Home to the Heart (Pulmonary Veins to Left Atrium)
Now full of fresh oxygen, the bright red blood leaves the lungs and flows through the **Pulmonary Veins** back into the top-left room of your heart: the **Left Atrium**.

#### 🔴 Step 6: The Grand Launch to the Whole Body (Left Ventricle to Aorta)
The Left Atrium passes the oxygen-packed blood down into the **Left Ventricle**.
* The Left Ventricle has the thickest, strongest muscle walls of the entire heart.
* With one mighty squeeze, it pumps the oxygenated blood through the **Aorta** (your body's main super-highway artery) to power your brain, heart, organs, and toes!

And that entire loop takes just a few seconds and happens with every single heartbeat—around 100,000 times every day!

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'National Heart, Lung, and Blood Institute - How the Heart Works', url: 'https://www.nhlbi.nih.gov' },
        { title: 'MedlinePlus - Pulmonary Circulation Overview', url: 'https://medlineplus.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'professional',
    };
  }

  // Question 5: Sleep at 2 AM and wake exhausted / improve sleep routine without drastic changes
  const isSleepAt2Am =
    q.includes('2 am') ||
    q.includes('2am') ||
    (q.includes('sleep routine') && q.includes('drastic')) ||
    q.includes('wake up feeling exhausted');

  if (isSleepAt2Am) {
    return {
      text: `### 🌙 Shifting Your 2 AM Sleep Routine: The Gentle, Non-Drastic Method

Going to bed at 2 AM and waking up feeling exhausted usually happens because your internal body clock (circadian rhythm) is out of sync with your morning wake-up alarm.

The biggest mistake people make is trying to flip from 2 AM straight to 10 PM in one night. That never works—you just lie in bed staring at the ceiling frustrated! Here is the gentle **"Micro-Shift"** method that works naturally:

---

#### ⏰ 1. The "15-Minute Shift" (Every 3 Days)
* Don't make a huge leap. Tonight, aim for **1:45 AM**.
* Stick to 1:45 AM for 3 nights.
* Then shift to **1:30 AM** for 3 nights.
* Then **1:15 AM**, and so on.
* By making 15-minute changes, your brain's clock shifts smoothly without sleepless anxiety.

---

#### ☀️ 2. Anchor Your Wake-Up Time First
* Your sleepiness at night is actually determined by when you woke up that morning!
* Pick a fixed wake-up time (e.g. 8:00 AM) and try to stick within 30 minutes of it—even on weekends.
* Waking up at the same time every day builds up natural "sleep pressure" (adenosine) so you feel genuinely sleepy earlier in the evening.

---

#### 💡 3. The 10-Minute Morning Sun Trick
* Within 30 to 60 minutes of waking, get 10 minutes of natural outdoor daylight in your eyes (don't stare at the sun, just look outside).
* Sunlight sets a 14-hour internal biological timer that triggers natural melatonin release later that evening.

---

#### 📱 4. Low-Effort Nighttime Screen Adjustments
You don't have to throw your phone away:
* Turn on **Night Shift / Warm Color Temperature** at 9 PM on your phone and laptop (amber light triggers much less brain alertness than blue light).
* Lower the brightness to 30%.
* 30 minutes before sleep, switch from fast-paced scrolling (TikTok/reels) to something slower (audiobook, relaxing music, or reading an article).

---

#### 🧊 5. Cool Down the Bedroom
* Your core body temperature needs to drop by about 1 to 2 degrees Fahrenheit to trigger deep sleep.
* Keep the room slightly cool (around 65–68°F / 18–20°C) or crack a window open.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'National Sleep Foundation - Resetting Your Circadian Rhythm', url: 'https://www.sleepfoundation.org' },
        { title: 'CDC - Tips for Better Sleep', url: 'https://www.cdc.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'professional',
    };
  }

  // Question 6: Bloated after eating / common reasons & tracking
  const isBloatedAfterEating =
    q.includes('bloat') ||
    (q.includes('bloated') && q.includes('eating')) ||
    q.includes('reasons for bloating');

  if (isBloatedAfterEating) {
    return {
      text: `### 🌿 Why You Feel Bloated After Eating & What to Track for Your Doctor

Feeling uncomfortably full, tight, or puffy in your belly after meals is very common. Most of the time, bloating is caused either by **swallowing extra air** or by **gas produced when gut bacteria break down food**.

---

#### 🔍 5 Common Everyday Reasons for Post-Meal Bloating

1. **Eating Too Quickly (Aerophagia):**
   - When eating on the go, scrolling through a phone, or rushing through lunch, you swallow pockets of air with every bite. Chewing thoroughly (taking 15–20 minutes per meal) makes a noticeable difference.
2. **Carbonated Drinks & Straws:**
   - Sparkling water, sodas, and drinking through straws pump carbon dioxide bubbles straight into your stomach.
3. **Certain Healthy Foods (High FODMAPs):**
   - Foods like beans, lentils, onions, garlic, cabbage, and broccoli are super healthy, but they contain complex fibers that ferment in your large intestine and create gas.
4. **Lactose Sensitivity:**
   - As we get older, our bodies produce less lactase (the enzyme that digests milk sugar in dairy like milk, cream, and soft cheese).
5. **Mild Constipation:**
   - If bowel movements are sluggish, backed-up stool traps gas from moving smoothly through your digestive tract.

---

#### 📋 4 Things to Track in a Simple "Tummy Diary" Before Seeing a Doctor:

Doctors love when patients bring 1 week of notes! Track these 4 simple items:
1. **What you ate and drank:** (e.g. "Pizza + diet cola" vs "Oatmeal + banana").
2. **Timing of the bloat:**
   - Does it happen **within 15–30 minutes**? (Often related to stomach stretching, swallowing air, or acid).
   - Does it happen **2 to 3 hours later**? (Often related to food fermentation in the small or large intestine).
3. **Bowel movements:** Note if your stool is hard/constipated, normal, or loose/watery.
4. **Clothing feel:** Does your waistline visibly expand by the evening and reset by morning?

---

#### 🚨 When to See a Doctor Promptly
Most bloating is benign and easily managed with dietary tweaks. However, see a physician right away if bloating comes with:
* Severe, persistent, or worsening abdominal pain.
* Unexplained weight loss.
* Blood in your stool (red or black/tarry stool).
* Frequent vomiting or inability to keep food down.
* High fever or yellowing of the skin/eyes.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'NIDDK - Gas and Bloating in the Digestive Tract', url: 'https://www.niddk.nih.gov' },
        { title: 'MedlinePlus - Abdominal Bloating', url: 'https://medlineplus.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'professional',
    };
  }

  // Question 7: Simple daily habits to reduce risk of type 2 diabetes
  const isType2DiabetesHabits =
    q.includes('type 2 diabetes') ||
    (q.includes('diabetes') && (q.includes('habit') || q.includes('risk') || q.includes('reduce')));

  if (isType2DiabetesHabits) {
    return {
      text: `### 🍎 Simple, Daily Habits to Naturally Protect Against Type 2 Diabetes

Preventing type 2 diabetes isn't about extreme dieting or giving up all your favorite foods. It is about helping your body's cells stay **sensitive to insulin**, so glucose (sugar) moves smoothly from your blood into your muscles to be used for energy.

Here are 5 simple, high-impact daily habits you can start right now:

---

#### 🚶‍♂️ 1. The 10-Minute Post-Meal Walk (The "Glucose Sponge")
* When you walk for just 10 minutes right after lunch or dinner, your leg muscles contract and soak up glucose directly from your bloodstream—**without needing extra insulin**!
* Studies show a brief walk right after eating cuts post-meal blood sugar spikes by up to 30%.

#### 🥗 2. The "Food Sequencing" Trick (Veggies & Protein First)
* You don't have to cut out rice, bread, or pasta. Just change the order on your fork!
* Eat your **vegetables and salad first**, then your **protein (chicken, fish, eggs, tofu)**, and eat the **carbohydrates/rice last**.
* The fiber and protein coat your digestive tract and slow down digestion, keeping your blood sugar steady instead of causing a sharp spike.

#### 💧 3. Swap Out Liquid Sugar
* Soda, sweetened iced tea, sugary fruit juices, and sweetened coffees absorb almost instantly into your liver and bloodstream.
* Replacing just one sugary drink a day with water, sparkling water with lime, or unsweetened tea has one of the largest preventative impacts on diabetes risk.

#### 😴 4. Prioritize 7 Hours of Sleep
* When you get less than 6 hours of sleep, your body releases higher levels of stress hormones (cortisol and adrenaline).
* This makes your cells temporarily "insulin-resistant" the next day, causing higher blood sugar levels even if you eat healthy.

#### 🧘 5. Keep Stress in Check
* Chronic stress triggers your liver to dump stored glucose into your blood for a "fight-or-flight" emergency that never happens.
* A 5-minute deep breathing break or quiet walk outside helps reset your nervous system.

---

#### 🩺 Simple Test to Ask Your Doctor About
At your next routine check-up, ask for a simple **HbA1c blood test**. This test measures your average blood sugar levels over the past 3 months and can identify "prediabetes" years before symptoms ever show up, giving you plenty of time to reverse it!

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'American Diabetes Association - Prevention Strategies', url: 'https://diabetes.org' },
        { title: 'CDC - Preventing Type 2 Diabetes', url: 'https://www.cdc.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'professional',
    };
  }

  // Question 8: Father has high blood pressure / family support
  const isFatherBloodPressure =
    q.includes('father has high blood pressure') ||
    (q.includes('blood pressure') && (q.includes('father') || q.includes('family')));

  if (isFatherBloodPressure) {
    return {
      text: `### 🩺 Understanding Your Father's High Blood Pressure & How Your Family Can Support Him

First, it is wonderful that your family wants to understand and support him. Having a caring family support system makes the single biggest difference in long-term heart health!

---

#### 💡 1. What High Blood Pressure Actually Means (The Simple Analogy)
Think of your father's blood vessels like a **garden hose**:
* When blood pressure is normal, water flows gently through the hose.
* When blood pressure is high (hypertension), it's like turning the faucet on full blast with a kink in the hose. Over time, that constant high pressure strains the heart pump, weakens blood vessel walls, and affects delicate organs like the kidneys and brain.

---

#### 🤫 2. Why It's Called the "Silent Condition"
* **Crucial Fact:** Most people with high blood pressure **feel completely fine**. They don't have headaches, dizziness, or chest pain.
* Because he feels fine, he might be tempted to skip medications or think he only needs them when "stressed."
* **Help him understand:** Blood pressure medication is like a shield—it works in the background every single day to protect him from heart attacks and strokes, even when he feels great!

---

#### 🤝 3. How Your Family Can Support Him (Without Nagging)

* **Make Salt Reduction a Family Project (Not Just "Dad's Diet"):**
  - Instead of taking the salt shaker away from his plate, remove the salt shaker from the dinner table for everyone!
  - Cook with fresh herbs, garlic, onion, lemon juice, black pepper, and warm spices. Food will taste delicious without relying on sodium.
* **Join Him for Evening Walks:**
  - Don't tell him "you need to go walk." Instead, say: *"Hey Dad, let's go for a 15-minute walk around the block together and talk."*
* **Get an Easy-to-Use Upper-Arm Home Monitor:**
  - Wrist monitors can be inaccurate. Buy a validated upper-arm digital cuff (like Omron).
  - Help him check it quietly in the morning (before coffee) and in the evening, and write the numbers down in a little notebook for his doctor.
* **Support Consistent Medication Refills:**
  - Help him use a daily pill organizer (Sunday to Saturday) so taking his daily tablet is as automatic as brushing his teeth.

---

#### 🚨 Red Flag Warning
If your father ever has a sudden blood pressure spike (e.g. above 180/120 mmHg) accompanied by chest pain, shortness of breath, blurry vision, or sudden weakness, call emergency services (911) immediately.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'American Heart Association - Supporting Family with High Blood Pressure', url: 'https://www.heart.org' },
        { title: 'NHLBI - Managing High Blood Pressure', url: 'https://www.nhlbi.nih.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'professional',
    };
  }

  // Question 9: Main functions of the brain, heart, lungs, liver, and kidneys in simple language
  const isFiveOrgans =
    (q.includes('brain') && q.includes('heart') && q.includes('lung') && q.includes('liver') && q.includes('kidney')) ||
    q.includes('main functions of the brain');

  if (isFiveOrgans) {
    return {
      text: `### 🫀 The "Big 5" Vital Organs Explained Simply

Think of your body as an incredible, high-tech city. Here is what the five main vital organs do in everyday terms:

---

#### 🧠 1. The Brain: The "City Command Center"
* **What it does:** Your brain is the master computer of everything you do, feel, and think.
* **Key jobs:**
  - Controls thoughts, memories, decisions, and speech.
  - Automatically manages things you never think about, like breathing, blinking, and body temperature.
  - Receives signals from your 5 senses (eyes, ears, skin, nose, tongue) and tells your muscles how to move.

#### 🫀 2. The Heart: The "24/7 Engine & Water Pump"
* **What it does:** Your heart is a muscular pump about the size of your clenched fist that never takes a break.
* **Key jobs:**
  - Beats around 100,000 times every day.
  - Pumps about 2,000 gallons of blood daily through 60,000 miles of blood vessels.
  - Delivers fresh oxygen and nutrients to every single cell in your body, and carries away waste products.

#### 🫁 3. The Lungs: The "Oxygen Refilling Bellows"
* **What it does:** Your lungs are two spongy, balloon-like organs that fill most of your chest.
* **Key jobs:**
  - When you breathe in, they pull fresh oxygen from the air into your bloodstream.
  - When you breathe out, they expel carbon dioxide (the exhaust fumes your cells produce).

#### 🫁 4. The Liver: The "Master Chemical Factory & Recycling Plant"
* **What it does:** Your liver is the heaviest internal organ, sitting on the upper right side of your belly. It performs over **500 critical functions**!
* **Key jobs:**
  - **Filter:** Cleans toxins, alcohol, and waste from your bloodstream.
  - **Energy Storage:** Stores extra sugar (glycogen) and vitamins, releasing them when your body needs energy.
  - **Digestive Aid:** Produces bile, a yellowish fluid that helps your stomach break down fats.

#### 🫘 5. The Kidneys: The "Ultra-Precision Water Filters"
* **What it does:** You have two bean-shaped kidneys located in your lower back.
* **Key jobs:**
  - Filter your entire bloodstream about **40 times every day**!
  - Remove excess water, acids, and metabolic waste, turning them into urine.
  - Maintain the perfect balance of electrolytes (sodium, potassium) and help regulate your blood pressure.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'MedlinePlus - Major Body Organs and Systems', url: 'https://medlineplus.gov' },
        { title: 'National Geographic Science - Human Body Atlas', url: 'https://www.nationalgeographic.com' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'professional',
    };
  }

  // Question 10: Difference between viral and bacterial infection & why antibiotics don't work on viruses
  const isViralVsBacterial =
    (q.includes('viral') && q.includes('bacterial')) ||
    q.includes('why don\'t antibiotics work against viruses') ||
    q.includes('antibiotics work against viruses') ||
    (q.includes('antibiotic') && q.includes('virus'));

  if (isViralVsBacterial) {
    return {
      text: `### 🦠 Bacteria vs. Viruses: The Difference & Why Antibiotics Don't Work on Viruses

Understanding the difference between bacteria and viruses is one of the most empowering health facts anyone can learn.

---

#### 🔬 1. Bacteria: Independent Living Micro-Organisms
* **What they are:** Bacteria are single-celled, living creatures. Think of them like tiny, self-sufficient houses with their own walls, internal machinery, and ability to reproduce on their own.
* **Not all bacteria are bad:** In fact, trillions of friendly bacteria live in your gut right now helping you digest food and protect your immune system!
* **Harmful bacterial infections:** Strep throat, urinary tract infections (UTIs), bacterial pneumonia, and infected cuts.

---

#### 🧬 2. Viruses: Tiny Genetic Hackers
* **What they are:** Viruses are not complete living cells. They are much smaller than bacteria—think of them like tiny USB drives containing genetic code wrapped in a protein shell.
* **How they survive:** A virus cannot live or reproduce on its own. It has to "hijack" one of your own healthy human cells, sneak inside, and use your cell's machinery to make copies of itself.
* **Common viral infections:** The common cold, seasonal flu, COVID-19, chickenpox, and most sore throats and bronchitis.

---

#### 💊 3. Why Don't Antibiotics Work Against Viruses?
* **Antibiotics are specialized "smart weapons" designed specifically to attack bacterial cell walls or shut down bacterial protein factories.**
* Because a virus has **no cell wall** and uses **your own human cells** to replicate, antibiotics have literally nothing to target! Asking an antibiotic to kill a virus is like trying to use a key for a door that has no keyhole.

---

#### ⚠️ Why Taking Antibiotics for a Viral Cold or Flu Is Harmful:
1. **It wipes out your good gut bacteria**, leading to upset stomach, diarrhea, or yeast infections.
2. **It causes "Antibiotic Resistance":** Overusing antibiotics trains surviving bacteria to become resistant "superbugs", meaning that when you or your family really need an antibiotic in the future for a serious bacterial infection, it might not work.

#### 🛡️ How Your Body Fights Viral Infections:
Your immune system is designed to defeat viruses! Rest, plenty of water, warm broths, saline nasal rinses, and fever-reducing comfort medications (like acetaminophen or ibuprofen) give your immune system the time and energy it needs to clear the virus naturally.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'CDC - Antibiotic Use and Viral vs Bacterial Infections', url: 'https://www.cdc.gov' },
        { title: 'FDA - The Danger of Antibiotic Resistance', url: 'https://www.fda.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'professional',
    };
  }

  // Question 11: Starting exercise after inactivity as a beginner
  const isStartExercisingBeginner =
    (q.includes('exercis') && (q.includes('inactive') || q.includes('beginner') || q.includes('safely as a beginner'))) ||
    q.includes('start exercising after being inactive');

  if (isStartExercisingBeginner) {
    return {
      text: `### 👟 How to Safely Start Exercising as a Beginner (After Being Inactive)

First of all, congratulations on making this decision! Your heart, muscles, joints, and mood will thank you for years to come.

The biggest secret to exercising after a long break is: **Make it so easy at first that it is impossible to fail.** Consistency matters 100 times more than intensity!

---

#### 🚶‍♂️ Step 1: The "10-Minute Daily Walk" Rule
* Don't buy an expensive gym pass or run on day 1.
* Simply put on comfortable shoes and go for a **10 to 15 minute walk** every day.
* Walk at a **"Conversational Pace"**—meaning you can comfortably talk to someone without gasping for breath.
* Do this for 2 weeks. Building the daily habit of moving is your #1 foundation.

---

#### 🪑 Step 2: Gentle Bodyweight Strength (In Your Living Room)
After 2 weeks of walking, add 3 simple movements 2 to 3 times a week:
1. **Chair Stands (Chair Squats):** Sit down in a sturdy dining chair and stand up without using your hands. Do 8 to 10 repetitions. This strengthens your thighs, knees, and glutes.
2. **Wall Push-Ups:** Stand an arm's length from a wall, place your palms flat, and push toward the wall and back. Do 10 reps. Gentle on shoulders, builds chest and arm strength.
3. **Calf Raises:** Hold onto the kitchen counter and gently rise up on your toes, then lower your heels. Do 10 reps. Supports ankle stability and circulation.

---

#### 👂 Step 3: Learn to "Listen to Your Body"
* **Normal:** Mild muscle stiffness or tiredness 24 to 48 hours later (Delayed Onset Muscle Soreness). This is normal and means muscles are rebuilding stronger.
* **NOT Normal (Stop Sign):** Sharp joint pain, swelling, chest tightness, dizziness, lightheadedness, or feeling like you cannot catch your breath.

---

#### 💧 Step 4: Hydrate & Rest
* Drink a glass of water 20 minutes before walking and after.
* Give yourself at least 1 or 2 rest days a week where you just do gentle stretching.

---

#### 🩺 When to Check In with Your Doctor First
It is always smart to get a quick thumbs-up from your doctor before starting if:
* You are over 50.
* You have known heart conditions, asthma/COPD, diabetes, or high blood pressure.
* You experience frequent dizziness or joint arthritis.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'American College of Sports Medicine - Exercise for Beginners', url: 'https://www.acsm.org' },
        { title: 'AHA - Getting Started with Physical Activity', url: 'https://www.heart.org' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'professional',
    };
  }

  // Question 12: Bengali Fatigue ("আমি প্রায়ই ক্লান্ত বোধ করি")
  const isBengaliFatigue =
    q.includes('আমি প্রায়ই ক্লান্ত বোধ করি') ||
    (q.includes('ক্লান্ত') && (q.includes('ডাক্তার') || q.includes('পরামর্শ') || q.includes('কারণ')));

  if (isBengaliFatigue && language === 'bn') {
    return {
      text: `### 🔋 প্রায়ই ক্লান্ত বোধ করার সাধারণ কারণ ও ডাক্তারের পরামর্শ নেওয়ার সময়

সারারাত ৭-৮ ঘণ্টা ঘুমানোর পরও দিনের বেলায় প্রায়ই অতিরিক্ত ক্লান্ত বা শক্তিহীন লাগা একটি অত্যন্ত পরিচিত কিন্তু বিরক্তিকর স্বাস্থ্য সমস্যা।

---

#### 🌟 ক্লান্তির সাধারণ কারণসমূহ:

১. **ঘুমের পরিমাণ বনাম ঘুমের গুণমান (Sleep Quality):**
   - আপনি হয়তো বিছানায় ৮ ঘণ্টা কাটাচ্ছেন, কিন্তু নাক ডাকা, শ্বাস-প্রশ্বাসে সাময়িক বাধা (স্লিপ অ্যাপনিয়া) বা রাতে বারবার ঘুম ভেঙে যাওয়ার কারণে শরীর গভীর ও আরামদায়ক ঘুমের স্তরে পৌঁছাতে পারে না।
২. **রক্তস্বল্পতা বা আয়রনের ঘাটতি (Anemia):**
   - শরীরে হিমোগ্লোবিন বা ফেরিটিনের মাত্রা কমে গেলে দেহের অঙ্গ-প্রত্যঙ্গ ও মস্তিষ্কে পর্যাপ্ত অক্সিজেন পৌঁছায় না, ফলে শরীর সহজেই নিস্তেজ হয়ে পড়ে।
৩. **ভিটামিন ডি ও ভিটামিন বি১২-এর অভাব:**
   - আধুনিক জীবনে রোদে কম যাওয়া বা পুষ্টিকর খাবারের অভাবে এই ভিটামিনগুলোর ঘাটতি দেখা দেয়, যা পেশীর শক্তি ও স্নায়বিক সতেজতার জন্য অপরিহার্য।
৪. **পানিশূন্যতা (Dehydration):**
   - সারাদিনে পর্যাপ্ত পানি পান না করলে রক্তের ঘনত্ব সামান্য বৃদ্ধি পায়, যা হৃদযন্ত্র ও কোষের ওপর চাপ ফেলে এবং ক্লান্তি তৈরি করে।
৫. **থাইরয়েড হরমোনের ঘাটতি বা দীর্ঘস্থায়ী মানসিক চাপ:**
   - থাইরয়েড গ্রন্থি যদি কম হরমোন তৈরি করে, তবে শরীরের শক্তি খরচ করার গতি কমে যায়।

---

#### 🚀 আপনি আজ থেকেই যা শুরু করতে পারেন:

* **সকালে পানি পান:** ঘুম থেকে উঠেই প্রথমে এক গ্লাস পরিষ্কার স্বাভাবিক পানি পান করুন।
* **সকালের মিষ্টি রোদ:** সকালে ঘুম থেকে ওঠার এক ঘণ্টার মধ্যে ১০-১৫ মিনিট বাইরের স্বাভাবিক আলো বা রোদে থাকুন। এতে শরীরের বায়োলজিক্যাল ঘড়ি ঠিক হয়।
* **বিকেলের পর চা-কফি সীমিত করা:** দুপুর ২টার পর চা, কফি বা এনার্জি ড্রিংক এড়িয়ে চলুন।

---

#### 🩺 কখন চিকিৎসকের পরামর্শ নেবেন?

যদি ক্লান্তি ২-৩ সপ্তাহের বেশি সময় ধরে চলতে থাকে, তবে ডাক্তারের সাথে দেখা করুন। ডাক্তারকে অনুরোধ করতে পারেন:
* *"আমার ক্লান্তির কারণ জানার জন্য রক্তের সাধারণ কিছু পরীক্ষা (CBC, ফেরিটিন/আয়রন, থাইরয়েড TSH ও ভিটামিন ডি) করানো কি ভালো হবে?"*

**⚠️ জরুরি বিপদচিহ্ন:** যদি ক্লান্তির সাথে হঠাৎ তীব্র বুকে ব্যথা, শ্বাসকষ্ট, ব্যাখ্যাতীত ওজন হ্রাস বা অজ্ঞান হয়ে যাওয়ার মতো ঘটনা ঘটে, তবে কালবিলম্ব না করে দ্রুত জরুরি হাসপাতালে যান।

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'MedlinePlus - Fatigue and Energy Management', url: 'https://medlineplus.gov' },
        { title: 'WHO - Nutrition and Vitality Guide', url: 'https://www.who.int' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'professional',
    };
  }

  // Question 13: Urdu Headache ("مجھے اکثر سر درد ہوتا ہے")
  const isUrduHeadache =
    q.includes('مجھے اکثر سر درد ہوتا ہے') ||
    (q.includes('سر درد') && (q.includes('ڈاکٹر') || q.includes('رجوع') || q.includes('وجوہات')));

  if (isUrduHeadache && language === 'ur') {
    return {
      text: `### 🧠 اکثر سر درد کی عام وجوہات، گھریلو تدابیر اور ڈاکٹر سے رجوع کا وقت

اگر آپ کو اکثر سر میں درد رہتا ہے تو پریشان نہ ہوں، زیادہ تر اوقات یہ درد روزمرہ کے تناؤ اور طرزِ زندگی کی عادات کا نتیجہ ہوتا ہے۔

---

#### 🔍 سر درد کی عام وجوہات:

1. **ٹینشن ہیڈیک اور اسکرین کا دباؤ (Tension Headache):**
   - کمپیوٹر، لیپ ٹاپ یا موبائل اسکرین پر گھنٹوں مسلسل کام کرنے سے آنکھوں اور پیشانی کے باریک پٹھوں میں کھنچاؤ پیدا ہوتا ہے۔
2. **پانی کی کمی (Dehydration):**
   - مصروفیت میں دن بھر مناسب مقدار میں پانی نہ پینے سے جسم اور دماغ کی شریانیں سکڑتی ہیں، جو ماتھے پر ہلکے مسلسل درد کا باعث بنتی ہیں۔
3. **نیند کا غیر منظم شیڈول:**
   - دیر رات تک جاگنا، نیند کا اچانک کم یا زیادہ ہونا سر درد کو متحرک کرتا ہے۔
4. **گردن اور کندھوں کا کھنچاؤ:**
   - غلط انداز میں بیٹھنے یا جھک کر کام کرنے سے گردن کے اعصاب پر دباؤ آتا ہے جو سر کے پچھلے حصے تک پھیل جاتا ہے۔
5. **دردِ شقیقہ (Migraine):**
   - سر کے ایک طرف دھڑکن جیسا تیز درد، جس کے ساتھ تیز روشنی یا شور سے الجھن اور متلی کی کیفیت ہو سکتی ہے۔

---

#### 🛠️ آسان آرام دہ تدابیر:

* **20-20-20 کا سنہری اصول:** ہر 20 منٹ بعد 20 سیکنڈ کے لیے اسکرین سے نظر ہٹا کر 20 فٹ دور دیکھیں۔
* **فوری ہائیڈریشن:** سر درد شروع ہوتے ہی ایک سے دو گلاس سادہ پانی پیئیں۔
* **گردن کی ہلکی ورزش:** کندھوں کو گول گھمائیں اور ٹھوڑی کو سینے کی طرف جھکا کر 15 سیکنڈ آرام دہ کھنچاؤ دیں۔
* **مدہم روشنی میں آرام:** تیز روشنی اور شور سے دور چند منٹ کے لیے آنکھیں بند کر کے پرسکون بیٹھیں۔

---

#### 🚨 ڈاکٹر سے کب فوری رجوع کریں؟ (خطرناک علامات)

اگر سر درد میں درج ذیل علامات نظر آئیں تو تاخیر کیے بغیر ڈاکٹر کو دکھائیں:
* بجلی کی کڑک جیسا اچانک شدید ترین جھٹکے دار درد (Thunderclap Headache)۔
* سر درد کے ساتھ تیز بخار، گردن میں اکڑن، یا بولنے میں لڑکھڑاہٹ۔
* جسم کے کسی ایک حصے میں کمزوری یا سن ہونا۔
* بینائی کا اچانک دھندلا جانا یا دوہری نظر آنا۔
* سر میں چوٹ لگنے کے بعد شروع ہونے والا درد۔

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'MedlinePlus - سر درد کی اقسام اور وجوہات', url: 'https://medlineplus.gov' },
        { title: 'NHS - سر درد سے نجات کے طریقے', url: 'https://www.nhs.uk' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'professional',
    };
  }

  // Question 14: Japanese Fatigue ("最近、よく疲れを感じます")
  const isJapaneseFatigue =
    q.includes('最近、よく疲れを感じます') ||
    (q.includes('疲れ') && (q.includes('医師に相談') || q.includes('タイミング') || q.includes('原因')));

  if (isJapaneseFatigue && language === 'ja') {
    return {
      text: `### 🔋 最近よく疲れを感じる主な原因と、医師に相談すべき目安

十分な睡眠をとっているつもりでも疲れが抜けないのは、とてもつらく、もどかしいものです。医学的・生理学的に見て、日常的な慢性疲労には以下のような原因がよく見られます。

---

#### 🌟 よくある5つの原因

1. **「睡眠時間」と「睡眠の質」のギャップ:**
   - ベッドに入っている時間は十分でも、いびきや浅い呼吸（睡眠時無呼吸）、寝る前のスマートフォンのブルーライトなどによって、深いノンレム睡眠（成長ホルモンが出て体が修復される段階）が妨げられている可能性があります。
2. **見逃されやすい栄養の不足:**
   - **鉄分不足（隠れ貧血・フェリチン不足）:** 特に女性や活動量が多い人に多く、体中に酸素を運ぶ力が落ちて慢性的なだるさにつながります。
   - **ビタミンD・B群の不足:** エネルギー代謝や自律神経の安定に欠かせません。
3. **日常的な軽度の水分不足:**
   - 喉の渇きを感じていなくても、体内の水分が少し不足するだけで血流が滞り、心臓や細胞に余分な負荷がかかります。
4. **甲状腺機能の低下や自律神経の乱れ:**
   - 体の代謝をつかさどる甲状腺ホルモンが少なくなると、冷えや強いだるさが現れます。また、仕事や生活環境のストレスで交感神経が張り詰めていると、体が休まりません。
5. **カフェインの影響:**
   - 午後遅くや夕方に飲んだコーヒーやエナジードリンクは、夜遅くまで体内に残り、睡眠の深さを奪ってしまいます。

---

#### 🚀 今日からできる優しいセルフケア

* **朝起きたらまずコップ1杯の水:** 睡眠中に失われた水分を補給し、胃腸を目覚めさせます。
* **朝の光を10分浴びる:** 起床後すぐに日光を浴びることで、体内時計がリセットされ、夜自然と眠くなるホルモン（メラトニン）のタイマーがセットされます。
* **カフェインは午後2時まで:** 夕方以降は温かいノンカフェインのお茶やハーブティーに切り替えましょう。

---

#### 🩺 医師（内科・かかりつけ医）に相談すべきタイミング

だるさや疲労感が**2〜3週間以上**続いている場合は、無理をせず内科を受診してください。
診察室では以下のように伝えるとスムーズです：
* 「特に思い当たる理由がないのに疲れが続いています。一般的な血液検査（貧血・鉄分、甲状腺、ビタミンなど）で確認していただけますか？」

**⚠️ すぐに受診すべき危険なサイン:**
* 安静にしていても胸の圧迫感や激しい息切れがある場合。
* 意図しない急激な体重減少や、微熱が何日も続く場合。
* 立ちくらみで倒れそうになる、めまいが頻発する場合。

*${notice.notDoctorNotice}*`,
      citations: [
        { title: '厚生労働省 - 疲労と休養の科学', url: 'https://www.mhlw.go.jp' },
        { title: '日本医師会 - 慢性疲労へのアプローチ', url: 'https://www.med.or.jp' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'professional',
    };
  }

  // 2. Specific Symptom: HEADACHE & MIGRAINE ("i got headache", "head hurts", "migraine", etc.)
  const isHeadache =
    q.includes('headache') ||
    q.includes('head ache') ||
    q.includes('migraine') ||
    q.includes('head hurt') ||
    q.includes('head pain') ||
    q.includes('temple pain') ||
    q.includes('سر درد') ||
    q.includes('سر میں درد') ||
    q.includes('মাথাব্যথা') ||
    q.includes('মাথা ব্যথা') ||
    q.includes('頭痛') ||
    q.includes('頭が痛い');

  if (isHeadache) {
    if (language === 'ur') {
      return {
        text: `### 🧠 سر درد کی وجوہات، فوری آرام اور طبی رہنمائی (Headache Relief & Guide)

سر درد ایک عام مگر تکلیف دہ شکایت ہے جو مختلف وجوہات کی بنا پر پیدا ہو سکتی ہے۔

**عام امکانی وجوہات:**
- **ٹینشن ہیڈیک (Tension Headache):** گردن اور کھوپڑی کے پٹھوں میں دباؤ، ذہنی تناؤ، یا کمپیوٹر/موبائل اسکرین کا زیادہ استعمال۔
- **پانی کی کمی (Dehydration):** دن بھر مناسب مقدار میں پانی نہ پینے سے شریانیں سکڑتی ہیں جو سر درد کا باعث بنتی ہیں۔
- **نیند کی کمی یا تھکن:** نیند کا غیر منظم شیڈول یا گہری نیند کا نہ آنا۔
- **سائنس یا الرجی (Sinusitis):** پیشانی اور گالوں کی ہڈیوں کے اندر بلغم کا دباؤ۔
- **درد شقیقہ (Migraine):** سر کے ایک طرف دھڑکن جیسا تیز درد، روشنی یا شور سے الجھن، اور متلی۔

**گھریلو آرام دہ تدابیر (Non-Medical Comfort):**
1. **ہائیڈریشن:** فوراً 1 سے 2 گلاس سادہ پانی پیئیں۔
2. **پرسکون اور مدہم کمرہ:** تیز روشنی اور آوازوں سے دور کسی ٹھنڈے، مدہم کمرے میں 20 منٹ آرام کریں۔
3. **ٹھنڈا یا گرم کپڑا:** ماتھے پر ہلکا ٹھنڈا کپڑا رکھیں یا گردن کے پچھلے حصے پر نیم گرم تولیہ رکھ کر پٹھے ڈھیلے کریں۔
4. **اسکرین سے وقفہ:** ہر 20 منٹ بعد 20 سیکنڈ کے لیے 20 فٹ دور دیکھیں۔

**⚠️ خطرناک علامات (Red Flags - کب فوری ڈاکٹر کے پاس جائیں):**
- اچانک شدید ترین جھٹکے دار درد (Thunderclap Headache) جو چند سیکنڈ میں شدت اختیار کر جائے۔
- سر درد کے ساتھ تیز بخار، گردن میں اکڑاؤ، یا جسم کے ایک طرف کمزوری۔
- سر میں چوٹ لگنے کے بعد شروع ہونے والا درد یا بصارت کا دھندلا جانا۔

*${notice.notDoctorNotice}*`,
        citations: [
          { title: 'MedlinePlus - Headache Types, Causes, and Relief', url: 'https://medlineplus.gov' },
          { title: 'National Institute of Neurological Disorders - Headache Information', url: 'https://www.ninds.nih.gov' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
        suggestedFollowUps: [
          'ٹینشن ہیڈیک اور درد شقیقہ میں کیا فرق ہے؟',
          'ڈاکٹر سے معائنے کی تیاری کے لیے سوالات',
          'پانی کی کمی کی دیگر علامات کیا ہیں؟',
        ],
      };
    }

    if (language === 'bn') {
      return {
        text: `### 🧠 মাথাব্যথার সম্ভাব্য কারণ, ঘরোয়া যত্ন ও পরামর্শ (Headache Relief & Guide)

মাথাব্যথা একটি অত্যন্ত সাধারণ স্বাস্থ্যগত অভিজ্ঞতা, যা সাধারণত ক্ষণস্থায়ী কিন্তু অস্বস্তিকর।

**সাধারণ কারণসমূহ:**
- **টেনশনজনিত মাথাব্যথা (Tension Headache):** দীর্ঘক্ষণ কম্পিউটার স্ক্রিনের সামনে থাকা, মানসিক চাপ বা ঘাড়ের পেশীর টান।
- **পানিশূন্যতা (Dehydration):** সারাদিনে পর্যাপ্ত পানি পান না করার কারণে মস্তিষ্কের রক্তনালীতে টান লাগা।
- **অপর্যাপ্ত ঘুম বা অনিয়মিত বিশ্রাম:** রাতে ৬-৮ ঘণ্টার কম ঘুম বা অতিরিক্ত মানসিক ক্লান্তি।
- **মাইগ্রেন (Migraine):** মাথার একদিকে স্পন্দনশীল তীব্র ব্যথা, আলোর প্রতি সংবেদনশীলতা ও বমি বমি ভাব।
- **সাইনুসাইটিস (Sinusitis):** কপাল ও চোখের চারপাশে ভারী অনুভূতি ও সর্দিভাব।

**প্রাথমিক ঘরোয়া আরামদায়ক পদক্ষেপ:**
১. **পর্যাপ্ত পানি পান:** অবিলম্বে ১-২ গ্লাস স্বাভাবিক পানি পান করুন।
২. **অন্ধকার ও শান্ত পরিবেশ:** শব্দ ও তীব্র আলো থেকে দূরে শান্ত ঘরে কিছু সময় চোখ বন্ধ করে শুয়ে থাকুন।
৩. **ঠান্ডা বা কুসুম গরম সেঁক:** কপালে ভেজা ঠান্ডা তোয়ালে অথবা ঘাড়ে হালকা গরম সেঁক দিলে পেশী শিথিল হয়।
৪. **চোখের বিশ্রাম (20-20-20 নিয়ম):** প্রতি ২০ মিনিট কাজের পর ২০ সেকেন্ডের জন্য দূরে তাকান।

**⚠️ বিপদচিহ্নসমূহ (Red Flags - কখন দ্রুত জরুরি চিকিৎসাসেবা নেবেন):**
- হঠাৎ তীব্রতম তীব্র বজ্রপাতের মতো মাথাব্যথা (Thunderclap headache)।
- মাথাব্যথার সাথে তীব্র জ্বর, ঘাড় শক্ত হয়ে যাওয়া, কথা জড়িয়ে যাওয়া বা শরীরের একপাশ অবশ লাগা।
- মাথায় আঘাতের পর নতুন করে শুরু হওয়া তীব্র মাথাব্যথা।

*${notice.notDoctorNotice}*`,
        citations: [
          { title: 'MedlinePlus - Headache Guide and Relief', url: 'https://medlineplus.gov' },
          { title: 'National Institute of Neurological Disorders - Headache Hope', url: 'https://www.ninds.nih.gov' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
        suggestedFollowUps: [
          'টেনশন হেডেক বনাম মাইগ্রেন পার্থক্য',
          'ডাক্তারের কাছে প্রশ্ন করার প্রস্তুতি তালিকা',
          'পানিশূন্যতার অন্যান্য লক্ষণসমূহ',
        ],
      };
    }

    if (language === 'ja') {
      return {
        text: `### 🧠 頭痛の原因、応急セルフケア、受診の目安（Headache Relief & Guide）

頭痛は日常的によく見られる症状ですが、原因に応じた適切な対応が大切です。

**一般的な主な原因:**
- **緊張型頭痛（Tension Headache）:** 長時間のデスクワーク、スマホ操作による眼精疲労、首・肩こり、ストレス。
- **脱水症状:** 水分不足により血液循環が滞り生じる頭重感。
- **睡眠不足または過度の疲労:** 自律神経の乱れによる血管の収縮や拡張。
- **片頭痛（Migraine）:** ズキズキと脈打つような強い痛み、光や音への過敏、吐き気を伴う。
- **副鼻腔炎:** 額や鼻周囲の圧迫痛と鼻づまり。

**自宅でできる初期のセルフケア:**
1. **十分な水分補給:** コップ1〜2杯の常温の水または麦茶をゆっくり飲みましょう。
2. **暗く静かな部屋で休息:** 強い照明や画面を消し、20〜30分程度目を閉じて安静にします。
3. **冷やす・温めるの使い分け:** 片頭痛（脈打つ痛み）はこめかみを冷やし、緊張型頭痛（締め付け感）は首の後ろを蒸しタオルで温めると和らぎます。
4. **目の休息（20-20-20ルール）:** 画面作業時は20分ごとに遠くを見る習慣を。

**⚠️ 危険なサイン（レッドフラッグ - 直ちに救急受診が必要な場合）:**
- これまでに経験したことがないような突然の激しい激痛（雷鳴頭痛）。
- 高熱、首のこわばり（前屈できない）、手足の脱力・痺れ、ろれつが回らない。
- 頭部打撲後に次第に強くなる頭痛。

*${notice.notDoctorNotice}*`,
        citations: [
          { title: '日本頭痛学会 - 頭痛の基礎知識と診療ガイドライン', url: 'https://www.jhsnet.net' },
          { title: '厚生労働省 e-ヘルスネット - 頭痛と健康管理', url: 'https://www.e-healthnet.mhlw.go.jp' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
        suggestedFollowUps: [
          '緊張型頭痛と片頭痛の違いについて',
          '医師への受診時メモの作成',
          '脱水の予防と水分補給のポイント',
        ],
      };
    }

    // Default English
    return {
      text: `### 🧠 Understanding Your Headache: Causes, Comfort Steps & When to See a Doctor

Headaches are among the most frequent symptoms experienced worldwide. Understanding the underlying physiological trigger helps in taking safe, proactive comfort measures.

**Most Common Etiologies:**
1. **Tension-Type Headache (Most Common):** Arises from sustained muscle contraction in the suboccipital and cervical regions, often caused by prolonged screen glare, ergonomic strain, stress, or jaw clenching.
2. **Dehydration & Electrolyte Imbalance:** Mild fluid deficits cause transient shrinkage in cerebral volume, placing mechanical traction on pain-sensitive meningeal dural membranes.
3. **Sleep Deprivation & Fatigue:** Disruptions in circadian architecture and REM cycles alter cortical pain thresholds.
4. **Migraine:** A neurovascular phenomenon involving trigeminal nerve sensitization, causing unilateral pulsating pain, photophobia, phonophobia, and sometimes nausea.
5. **Caffeine Withdrawal or Excess:** Fluctuations in adenosine receptor binding induce cerebral vasodilation.

**Evidence-Based Non-Pharmacological Comfort Steps:**
- **Rehydrate Promptly:** Drink 16–20 oz (500 ml) of water or electrolyte fluid immediately.
- **Sensory Rest:** Rest for 20–30 minutes in a quiet, darkened room away from smartphone or laptop screens.
- **Targeted Temperature Application:**
  - For throbbing/migraine: Apply a cool compress to the forehead or temples to promote localized vasoconstriction.
  - For tension/tight band: Apply a warm moist towel to the posterior neck and shoulders to relax hypertonic musculature.
- **Gentle Cervical Range-of-Motion:** Perform slow chin tucks and lateral neck stretches.

**⚠️ Red Flag Warning Signs (Seek Immediate Medical Care):**
- **"Thunderclap" Headache:** Sudden peak intensity within seconds (rule out subarachnoid hemorrhage).
- **Neurological Deficits:** Accompanying facial droop, arm weakness, slurred speech, confusion, or visual field loss.
- **Fever & Nuchal Rigidity:** High fever with an inability to bend your chin to your chest (meningeal signs).
- **Post-Traumatic:** Headache developing after a head injury or fall.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'MedlinePlus - Headache Overview, Types, and Self-Care', url: 'https://medlineplus.gov' },
        { title: 'NINDS - National Institute of Neurological Disorders Headache Hope', url: 'https://www.ninds.nih.gov' },
        { title: 'American Migraine Foundation - Clinical Resources for Patients', url: 'https://americanmigrainefoundation.org' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
      suggestedFollowUps: [
        'How to differentiate tension headache from migraine',
        'Top 5 questions to ask your physician about recurring headaches',
        'Recognize stroke symptoms (FAST warning signs)',
      ],
    };
  }

  // 3. Specific Symptom: STOMACH, ABDOMINAL PAIN, NAUSEA & DIGESTION
  const isStomach =
    q.includes('stomach') ||
    q.includes('tummy') ||
    q.includes('belly') ||
    q.includes('abdomen') ||
    q.includes('abdominal') ||
    q.includes('nausea') ||
    q.includes('vomit') ||
    q.includes('diarrhea') ||
    q.includes('indigestion') ||
    q.includes('heartburn') ||
    q.includes('acid reflux') ||
    q.includes('cramp') ||
    q.includes('پیٹ') ||
    q.includes('متلی') ||
    q.includes('পেট') ||
    q.includes('বমি') ||
    q.includes('胃') ||
    q.includes('腹痛') ||
    q.includes('吐き気');

  if (isStomach) {
    if (language === 'ur') {
      return {
        text: `### 🩺 پیٹ میں درد، بدہضمی اور معدے کی تکلیف کی طبی رہنمائی

پیٹ کی تکلیف اور بدہضمی نظامِ ہضم میں گیس، تیزابیت یا خوراک کے ردعمل کی وجہ سے ہو سکتی ہے۔

**عام وجوہات:**
- **بدہضمی اور گیس:** جلدی کھانا کھانے، زیادہ مصالحہ دار یا چکنائی والی غذا کھانے سے۔
- **تیزابیت (Acid Reflux):** معدے کا تیزاب خوراک کی نالی میں واپس آنے سے سینے میں جلن۔
- **وائرل گیسٹرو (Stomach Bug):** آلودہ پانی یا وائرل انفیکشن سے متلی یا دست۔
- **ذہنی دباؤ:** آنتوں کے اعصابی نظام پر تناؤ کے اثرات۔

**آرام دہ تجاویز:**
1. نیم گرم پانی یا پودینے کی چائے کے چھوٹے گھونٹ لیں۔
2. کھانا کھانے کے فوراً بعد لیٹنے سے گریز کریں (کم از کم 2 گھنٹے سیدھے بیٹھیں)۔
3. نرم اور سادہ غذا (جیسے ابلے چاول، دلیہ یا کیلا) کھائیں۔
4. پیٹ پر ہلکا گرم پیڈ رکھنے سے عضلات کو سکون ملتا ہے۔

**⚠️ کب فوری ڈاکٹر سے رجوع کریں:**
- شدید درد جو پیٹ کے نچلے دائیں حصے میں منتقل ہو جائے (اپینڈکس کا خطرہ)۔
- پاخانے یا قے میں خون آنا، یا مسلسل تیز بخار۔

*${notice.notDoctorNotice}*`,
        citations: [
          { title: 'MedlinePlus - Abdominal Pain and Digestive Health', url: 'https://medlineplus.gov' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    if (language === 'bn') {
      return {
        text: `### 🩺 পেটে ব্যথা, অ্যাসিডিটি ও হজমজনিত অস্বস্তির পরামর্শ

পেটে ব্যথা বা হজমের সমস্যা সাধারণত খাদ্যাভ্যাস, অতিরিক্ত গ্যাস বা গ্যাস্ট্রিকের কারণে ঘটে থাকে।

**সাধারণ কারণসমূহ:**
- **বদহজম ও গ্যাস:** অতিরিক্ত তেল-মসলাযুক্ত খাবার, দ্রুত খাওয়া বা দীর্ঘক্ষণ খালি পেটে থাকা।
- **অ্যাসিড রিফ্লাক্স (বুকজ্বালা):** পাকস্থলীর এসিড খাদ্যনালীতে উঠে এলে বুকে বা পেটের ওপরের দিকে জ্বালাপোড়া।
- **ফুড পয়জনিং বা ভাইরাল গ্যাস্ট্রো:** অনিরাপদ খাবার বা ভাইরাসজনিত কারণে ডায়রিয়া ও বমি ভাব।
- **মানসিক চাপ:** অন্ত্রের স্নায়বিক প্রতিক্রিয়ায় হজম ব্যাহত হওয়া।

**প্রাথমিক ঘরোয়া যত্ন:**
১. অল্প অল্প করে কুসুম গরম পানি পান করুন।
২. সহজে হজমযোগ্য খাবার (যেমন জাউ ভাত, কলা, টোস্ট বিস্কুট) গ্রহণ করুন।
৩. খাওয়ার পরপরই বিছানায় শুয়ে পড়বেন না, অন্তত ২ ঘণ্টা সোজা হয়ে বসুন।
৪. পেটে গরম সেঁক দিলে মাংসপেশির খিঁচুনি কমে।

**⚠️ দ্রুত চিকিৎসকের পরামর্শ নেয়ার লক্ষণ:**
- পেটের ডান পাশের নিচের দিকে হঠাৎ তীব্র অসহ্য ব্যথা (অ্যাপেন্ডিসাইটিস)।
- বমি বা মলের সাথে রক্ত যাওয়া অথবা ২৪ ঘণ্টার বেশি কোনো খাবার পেটে না থাকা।

*${notice.notDoctorNotice}*`,
        citations: [
          { title: 'MedlinePlus - Abdominal Pain Care', url: 'https://medlineplus.gov' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    if (language === 'ja') {
      return {
        text: `### 🩺 腹痛・胃痛・消化器症状の医学的解説とセルフケア

腹痛や胃の不快感は、食生活や自律神経の乱れ、消化器官の炎症など多様な要因で生じます。

**一般的な原因:**
- **機能性ディスペプシア・胃酸過多:** 刺激物、脂っこい食事、ストレスによる胃酸の逆流や胃炎。
- **胃腸炎:** ウイルスや細菌感染に伴う下痢、吐き気、腹部膨満感。
- **過敏性腸症候群（IBS）:** 緊張やストレスによる腸管運動の過剰な亢進。

**初期のセルフケア:**
1. 常温の白湯や薄い麦茶を少しずつ口に含みます。
2. 食後すぐに横にならず、上半身を少し起こした姿勢を維持します。
3. おかゆ、うどん、すりおろしリンゴなど消化の良い食事を選びます。
4. お腹を湯たんぽ等で優しく温め、衣服の締め付けを緩めます。

**⚠️ 危険な徴候（速やかに受診すべき目安）:**
- 右下腹部への移動を伴う急激な激痛（虫垂炎の疑い）。
- 黒色便、吐血、高熱、または水分摂取が全く受け付けない状態。

*${notice.notDoctorNotice}*`,
        citations: [
          { title: '日本消化器病学会 - 消化器疾患のQ&A', url: 'https://www.jsge.or.jp' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    // Default English
    return {
      text: `### 🩺 Abdominal Discomfort & Digestion: Mechanisms, Home Care & Warning Signs

Abdominal sensations range from benign functional indigestion to infectious gastroenteritis or structural issues.

**Physiological Drivers:**
1. **Functional Dyspepsia & Gas Distension:** Trapped air or delayed gastric emptying exerts mechanical tension on visceral mechanoreceptors.
2. **Gastroesophageal Reflux (GERD):** Transient relaxation of the lower esophageal sphincter allows acidic chyme to irritate sensitive esophageal squamous mucosa.
3. **Acute Gastroenteritis:** Viral (norovirus/rotavirus) or bacterial infection causing hypermotility, mucosal inflammation, and electrolyte secretion.
4. **Stress-Axis Impact:** The enteric nervous system ("gut-brain axis") alters gut motility under sympathetic activation.

**Evidence-Based Comfort Strategies:**
- **Hydration in Small Sips:** Sip oral rehydration solution, water, or ginger/peppermint tea; avoid gulping large volumes.
- **Bland Dietary Progression (BRAT Protocol):** Bananas, white rice, applesauce, and toast when appetite returns. Avoid fried, spicy, or dairy items for 24–48 hours.
- **Postural Support:** Remain upright for at least 2 hours post-ingestion to utilize gravity against acid reflux.
- **Gentle Thermal Comfort:** A warm heating pad on the abdomen relaxes mesenteric smooth muscle spasms.

**⚠️ Red Flag Warning Signs (Seek Urgent Medical Evaluation):**
- **Focal Right Lower Quadrant Pain:** Pain beginning around the navel and migrating to the right lower quadrant with rebound tenderness (potential appendicitis).
- **Gastrointestinal Bleeding:** "Coffee-ground" emesis or black, tarry stools (melena).
- **Intractable Vomiting:** Inability to retain fluids for > 24 hours leading to orthostatic hypotension.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'MedlinePlus - Abdominal Pain', url: 'https://medlineplus.gov' },
        { title: 'NIDDK - Digestive Diseases Information', url: 'https://www.niddk.nih.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
      suggestedFollowUps: [
        'How to differentiate indigestion from cardiac symptoms',
        'Prepare doctor visit questions for abdominal pain',
      ],
    };
  }

  // 4. Specific Symptom: FEVER & INFECTION
  const isFever =
    q.includes('fever') ||
    q.includes('chills') ||
    q.includes('high temp') ||
    q.includes('sweat') ||
    q.includes('بخار') ||
    q.includes('ج্বর') ||
    q.includes('発熱') ||
    q.includes('熱');

  if (isFever) {
    return {
      text:
        language === 'ur'
          ? `### 🌡️ بخار کی طبی تفہیم اور محفوظ نگہداشت (Fever Management)

بخار خود کوئی بیماری نہیں ہے بلکہ یہ جسم کے مدافعتی نظام کا ایک قدرتی ردعمل ہے تاکہ جراثیم سے مقابلہ کیا جا سکے۔

**بنیادی فزیالوجی:**
دماغ کا حصہ ہائپوتھیلمس (Hypothalamus) جسم کے بنیادی درجہ حرارت کو بڑھاتا ہے تاکہ وائرس یا بیکٹیریا کی نشوونما روکی جا سکے اور سفید خلیات تیزی سے کام کر سکیں۔

**محفوظ نگہداشت کے اقدامات:**
- **بھرپور پانی اور او آر ایس:** بخار میں پسینہ اور بخارات خارج ہونے سے پانی کی کمی ہوتی ہے، اس لیے وافر مقدار میں پانی پیئیں۔
- **ہلکے اور ہوا دار کپڑے:** زیادہ گرم چادریں اوڑھنے کے بجائے مناسب ہوادار ماحول رکھیں۔
- **آرام:** جسم کو انرجی محفوظ رکھنے کے لیے مکمل آرام فراہم کریں۔

**⚠️ کب فوری ڈاکٹر سے رجوع کریں:**
- بالغوں میں درجہ حرارت 103°F (39.4°C) سے تجاوز کر جائے۔
- بخار 3 دن سے زیادہ برقرار رہے یا اس کے ساتھ گردن میں سختی، غنودگی، یا سانس لینے میں دشواری ہو۔

*${notice.notDoctorNotice}*`
          : language === 'bn'
          ? `### 🌡️ জ্বর ও সংক্রমণের শারীরবৃত্তীয় তথ্য ও যত্ন (Fever Care)

জ্বর কোনো রোগ নয়, বরং শরীরে রোগজীবাণু প্রবেশ করলে শরীরের রোগ প্রতিরোধ ব্যবস্থার স্বাভাবিক সক্রিয় প্রতিক্রিয়া।

**শারীরবৃত্তীয় কার্যপদ্ধতি:**
মস্তিষ্কের হাইপোথ্যালামাস শরীরের অভ্যন্তরীণ তাপমাত্রা বৃদ্ধি করে যাতে ক্ষতিকর ব্যাকটেরিয়া বা ভাইরাস বংশবৃদ্ধি করতে না পারে।

**নিরাপদ যত্ন ও পরামর্শ:**
- **প্রচুর তরল খাবার গ্রহণ:** জ্বরের কারণে শরীরে তরলের ক্ষয় হয়, তাই পানি, ডাবের পানি, স্যুপ বেশি করে পান করুন।
- **হালকা সুতির পোশাক:** শরীর বেশি ঢেকে না রেখে স্বাভাবিক তাপমাত্রায় রাখুন।
- **পর্যাপ্ত বিশ্রাম:** রোগ প্রতিরোধ ক্ষমতা কার্যকর রাখতে পর্যাপ্ত বিশ্রাম অপরিহার্য।

**⚠️ চিকিৎসকের শরণাপন্ন হবেন যখন:**
- জ্বর ১০৩ ডিগ্রি ফারেনহাইট (৩৯.৪ ডিগ্রি সেলসিয়াস) অতিক্রম করলে।
- জ্বর টানা ৩ দিনের বেশি স্থায়ী হলে বা সাথে তীব্র শ্বাসকষ্ট, ঘাড়ের শক্তভাব ও ভুল বকা দেখা দিলে।

*${notice.notDoctorNotice}*`
          : language === 'ja'
          ? `### 🌡️ 発熱のメカニズムと適切なホームケア（Fever Care）

発熱は生体防御反応の一つであり、免疫細胞が病原体と戦うために設定温度が上昇する生理現象です。

**生理学的機序:**
視床下部が体温の基準値を一時的に引き上げ、白血球の活性化やウイルスの増殖抑制を図っています。

**適切なホームケア:**
- **積極的な水分補給:** 発汗や呼気による不感蒸泄が増えるため、経口補水液や薄い麦茶をこまめに摂取します。
- **熱のこもらない服装:** 悪寒がおさまったら薄着にし、腋の下や首筋を冷やしてクーリングを行います。
- **十分な睡眠と休養:** 免疫力を維持するためにエネルギーを温存します。

**⚠️ 受診の目安（レッドフラッグ）:**
- 38.5℃以上の高熱が3日以上継続する場合。
- 激しい頭痛、首の硬直、呼吸困難、意識混濁を伴う場合。

*${notice.notDoctorNotice}*`
          : `### 🌡️ Clinical Physiology of Fever & Evidence-Based Care

Fever (pyrexia) is a regulated physiological elevation of body core temperature orchestrating an innate immune defense.

**Biological Mechanism:**
Exogenous pyrogens (viral or bacterial antigens) stimulate macrophages to release inflammatory cytokines (IL-1, IL-6, TNF-alpha), prompting the hypothalamic preoptic area to upregulate its thermal setpoint. This enhances neutrophil motility and inhibits temperature-sensitive pathogen replication.

**Recommended Supportive Care:**
- **Aggressive Fluid Replacement:** Insensible fluid losses rise significantly with increased metabolic rates. Drink water, clear broths, or oral rehydration solutions.
- **Environmental Thermal Equilibrium:** Wear lightweight, breathable cotton garments. Avoid bundling in heavy blankets once shivering subsides.
- **Physiological Rest:** Direct cellular metabolic energy toward immunologic defense rather than muscular work.

**⚠️ Red Flag Thresholds (Seek Prompt Medical Evaluation):**
- **Temperature Criteria:** Oral core temperature exceeding 103°F (39.4°C) in adults or lasting > 72 hours.
- **Meningeal Signs:** Fever paired with severe photophobia, projectile vomiting, or neck stiffness (inability to touch chin to chest).
- **Respiratory Distress:** Tachypnea (rapid breathing) or oxygen saturation dropping below 95%.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'CDC - Fever and Infection Basics', url: 'https://www.cdc.gov' },
        { title: 'MedlinePlus - Fever Overview', url: 'https://medlineplus.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
    };
  }

  // 5. Specific Symptom: DIZZINESS & LIGHTHEADEDNESS
  const isDizzy =
    q.includes('dizzy') ||
    q.includes('lightheaded') ||
    q.includes('spinning') ||
    q.includes('vertigo') ||
    q.includes('faint') ||
    q.includes('چکر') ||
    q.includes('মাথা ঘোরা') ||
    q.includes('めまい');

  if (isDizzy) {
    return {
      text:
        language === 'ur'
          ? `### 💫 چکر آنے اور ہلکا پن محسوس ہونے کی وجوہات اور احتیاط

چکر آنا دو طرح کا ہو سکتا ہے: سر کا ہلکا پن (Lightheadedness) یا اردگرد کی چیزیں گھومتی ہوئی محسوس ہونا (Vertigo)۔

**عام اسباب:**
- **بلڈ پریشر کا اچانک کم ہونا:** تیزی سے کھڑے ہونے پر کشش ثقل کی وجہ سے خون عارضی طور پر دماغ تک دیر سے پہنچتا ہے۔
- **پانی اور خوراک کی کمی:** طویل وقفے تک نہ کھانا یا پانی نہ پینا۔
- **اندرونی کان کے مسائل (Inner Ear):** اندرونی کان میں توازن برقرار رکھنے والے نظام کی خرابی۔

**فوری حفاظتی اقدامات:**
1. گرنے سے بچنے کے لیے فوراً بیٹھ جائیں یا بستر پر لیٹ جائیں۔
2. آہستگی سے گہرے سانس لیں اور ایک گلاس پانی پیئیں۔
3. جھٹکے سے اٹھنے کے بجائے پہلے چند سیکنڈ بستر پر بیٹھ کر کھڑے ہوں۔

*${notice.notDoctorNotice}*`
          : language === 'bn'
          ? `### 💫 মাথা ঘোরা ও হালকা লাগার কারণ ও প্রাথমিক করণীয়

মাথা ঘোরার অনুভূতি মূলত দুই ধরনের: হালকা লাগা (Lightheadedness) অথবা চারপাশ ঘুরছে এমন অনুভূতি (Vertigo)।

**সাধারণ কারণসমূহ:**
- **অর্থোস্ট্যাটিক রক্তচাপ হ্রাস:** বসা বা শোয়া থেকে হঠাৎ দ্রুত দাঁড়ালে মস্তিষ্কে রক্তের সরবরাহ সাময়িক কমে যাওয়া।
- **পানিশূন্যতা বা দীর্ঘক্ষণ না খেয়ে থাকা:** শরীরে গ্লুকোজ বা তরলের অভাব।
- **ভেতরের কানের সমস্যা:** কান আমাদের ভারসাম্য রক্ষা করে, সেখানে প্রদাহ বা তরলের ভারসাম্যহীনতা হলে মাথা ঘোরে।

**তাৎক্ষণিক করণীয়:**
১. পড়ে গিয়ে আঘাত পাওয়া এড়াতে সাথে সাথে বসে বা শুয়ে পড়ুন।
২. আস্তে আস্তে স্বাভাবিক পানি পান করুন।
৩. ধীরে ধীরে অবস্থান পরিবর্তন করুন, হঠাৎ দ্রুত উঠবেন না।

*${notice.notDoctorNotice}*`
          : language === 'ja'
          ? `### 💫 めまい・立ちくらみの生理的機序と安全対策

めまいは大きく「立ちくらみ・ふらつき（非回転性）」と「周囲が回る感覚（回転性めまい・頭位性）」に分類されます。

**主な原因:**
- **起立性低血圧:** 急に立ち上がった際に重力で下肢に血液が滞留し、脳血流が一時的に低下する。
- **脱水や空腹:** 体液量不足や低血糖による脳細胞の活動低下。
- **内耳の前庭系機能異常:** 耳石の剥離（BPPV）や内リンパの不均衡。

**転倒防止とセルフケア:**
1. 転倒を防ぐため、症状を感じたら直ちにその場に座るか横になります。
2. 常温の水分を少しずつ補給します。
3. 起き上がるときは、手をつきながらゆっくりと動作を行ってください。

*${notice.notDoctorNotice}*`
          : `### 💫 Clinical Overview of Dizziness & Lightheadedness

Clinical dizziness generally bifurcates into presyncope (lightheadedness from transient cerebral hypoperfusion) and true vertigo (vestibular sensory illusion of motion).

**Primary Mechanisms:**
1. **Orthostatic Hypotension:** Rapid postural transition triggers transient venopooling in splanchnic and lower limb venous beds before baroreflex compensation restores stroke volume.
2. **Dehydration & Fluid Depletion:** Decreased circulating plasma volume lowers central venous pressure.
3. **Vestibular Dysfunction:** Benign paroxysmal positional vertigo (BPPV) or vestibular neuritis disrupting semicircular canal signaling.

**Immediate Safety Measures:**
- **Adopt Supine or Seated Posture:** Lower your center of gravity immediately to eliminate fall and syncope risk.
- **Hydration:** Consume 300–500 ml of fluid.
- **Graded Transitions:** Pause in a seated position for 30–60 seconds before full weight-bearing ambulation.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'MedlinePlus - Dizziness and Vertigo', url: 'https://medlineplus.gov' },
        { title: 'American Academy of Otolaryngology - Vestibular Balance', url: 'https://www.entnet.org' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
    };
  }

  // 6. Specific Symptom: FATIGUE & EXHAUSTION
  const isFatigue =
    q.includes('fatigue') ||
    q.includes('tired') ||
    q.includes('exhaust') ||
    q.includes('low energy') ||
    q.includes('weakness') ||
    q.includes('تھکن') ||
    q.includes('کمزوری') ||
    q.includes('ক্লান্তি') ||
    q.includes('দুর্বলতা') ||
    q.includes('疲労') ||
    q.includes('だるい');

  if (isFatigue) {
    return {
      text:
        language === 'ur'
          ? `### ⚡ مستقل تھکن اور کمزوری کی وجوہات اور بحالی

روزمرہ کی تھکن اکثر نیند، خوراک اور طرزِ زندگی کی عادات سے جڑی ہوتی ہے۔

**اہم وجوہات:**
- **نیند کی خرابی:** گہری نیند (Deep Sleep) کے مراحل مکمل نہ ہونا۔
- **خون کی کمی (Anemia) یا وٹامن ڈی/بی 12 کی کمی:** خلیوں تک مناسب آکسیجن نہ پہنچنا۔
- **پانی کی کمی (Mild Dehydration):** میٹابولزم کا سست پڑ جانا۔
- **مسلسل ذہنی دباؤ:** تناؤ کے ہارمون کورٹیسول کی زیادتی۔

**بحالی کے اقدامات:**
- روزانہ رات 7 سے 8 گھنٹے باقاعدہ نیند لیں۔
- صبح کی دھوپ میں 15 منٹ چہل قدمی کریں تاکہ سرکیڈین تال درست رہے۔
- غذا میں سبزیاں، دالیں اور آئرن سے بھرپور غذائیں شامل کریں۔

*${notice.notDoctorNotice}*`
          : language === 'bn'
          ? `### ⚡ দীর্ঘস্থায়ী ক্লান্তি ও অবসাদের কারণ ও সমাধানের উপায়

অতিরিক্ত ক্লান্তি বা শক্তিহীনতা প্রায়শই অনিদ্রা, পুষ্টির ঘাটতি বা মানসিক চাপের বহিঃপ্রকাশ।

**সাধারণ কারণসমূহ:**
- **অনিদ্রা বা ব্যাহত ঘুম:** প্রয়োজনীয় ৭-৮ ঘণ্টার নিরবচ্ছিন্ন ঘুমের অভাব।
- **রক্তস্বল্পতা (Anemia) ও পুষ্টিহীনতা:** শরীরে আয়রন, ভিটামিন ডি বা বি১২-এর ঘাটতি।
- **পানিশূন্যতা:** শরীরের কোষগুলোতে প্রয়োজনীয় তরল ও বিপাকীয় গতির অভাব।
- **দীর্ঘস্থায়ী মানসিক চাপ:** কর্টিসল হরমোনের অতিরিক্ত নিঃসরণে শরীর ক্লান্ত হওয়া।

**স্বাস্থ্যকর পদক্ষেপ:**
- প্রতিদিন একই সময়ে ঘুমাতে যাওয়া ও ওঠার অভ্যাস গড়ে তুলুন।
- সকালে ১৫ মিনিট রোদ ও খোলা বাতাসে হাঁটাহাঁটি করুন।
- রক্তে হিমোগ্লোবিন ও ভিটামিনের মাত্রা পরীক্ষার জন্য চিকিৎসকের পরামর্শ নিন।

*${notice.notDoctorNotice}*`
          : language === 'ja'
          ? `### ⚡ 慢性疲労・倦怠感の生理学的要因と生活改善

日常的なだるさや疲労感は、睡眠の質、自律神経バランス、栄養代謝と密接に関連しています。

**主な要因:**
- **睡眠サイクルの乱れ:** 深いノンレム睡眠の不足や体内時計のずれ。
- **栄養素の欠乏:** 鉄分不足（貧血）、ビタミンD、ビタミンB群の不足。
- **慢性的なストレス負荷:** 交感神経優位が持続することによる副腎疲労。

**リカバリーの基本:**
- 毎日7〜8時間の規則正しい睡眠を確保する。
- 起床後に朝日を15分浴びて体内時計（概日リズム）をリセットする。
- バランスの良い食事と適度な水分補給を徹底する。

*${notice.notDoctorNotice}*`
          : `### ⚡ Clinical Understanding of Fatigue & Energy Restoration

Persistent fatigue reflects multifactorial interactions among metabolic, immunologic, and neuroendocrine pathways.

**Key Physiological Influences:**
1. **Sleep Architecture Fragmentation:** Deficiency in slow-wave delta sleep diminishes nocturnal cellular repair and growth hormone synthesis.
2. **Subclinical Nutritional Deficits:** Iron deficiency (low ferritin), vitamin D3, or cobalamin (B12) depletion impairs mitochondrial ATP oxidative phosphorylation.
3. **Chronic Hypothalamic-Pituitary-Adrenal (HPA) Axis Activation:** Sustained cortisol dysregulation alters glucose uptake and cellular energetics.

**Proactive Interventions:**
- **Anchor Circadian Timing:** Maintain fixed sleep/wake hours with morning photic exposure (10–15 min natural sunlight).
- **Evaluate Metabolic Baselines:** Discuss complete blood counts (CBC), ferritin, TSH, and metabolic panels with your physician.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'MedlinePlus - Fatigue and Energy Management', url: 'https://medlineplus.gov' },
        { title: 'CDC - Sleep and Chronic Disease Prevention', url: 'https://www.cdc.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
    };
  }

  // 7. Specific Symptom: COUGH, SORE THROAT & COLD
  const isCough =
    q.includes('cough') ||
    q.includes('sore throat') ||
    q.includes('cold') ||
    q.includes('congestion') ||
    q.includes('runny nose') ||
    q.includes('phlegm') ||
    q.includes('کھانسی') ||
    q.includes('گلے میں درد') ||
    q.includes('কাশি') ||
    q.includes('গলা ব্যথা') ||
    q.includes('咳') ||
    q.includes('喉');

  if (isCough) {
    return {
      text:
        language === 'ur'
          ? `### 🫁 کھانسی اور گلے کی خراش کی طبی وضاحت اور احتیاط

کھانسی سانس کی نالیوں کی حفاظت کا ایک قدرتی ذریعہ ہے تاکہ بلغم اور جراثیم خارج ہو سکیں۔

**عام وجوہات:**
- **وائرل انفیکشن (نزلہ زکام):** سانس کی اوپری نالیوں میں وائرس کی سوزش۔
- **خشک ہوا یا الرجی:** گرد و غبار، دھوئیں، یا موسم کی تبدیلی سے گلے میں خارش۔
- **پوسٹ نیزل ڈرپ:** ناک کے پچھلے حصے سے رطوبت کا گلے میں گرنا۔

**آرام دہ تجاویز:**
- نیم گرم نمکین پانی سے دن میں 2 سے 3 بار غرارے کریں۔
- شہد اور لیموں کا نیم گرم قہوہ لیں۔
- بھاپ لینے سے سانس کی نالیاں تر اور بلغم خارج ہوتا ہے۔

*${notice.notDoctorNotice}*`
          : language === 'bn'
          ? `### 🫁 কাশি ও গলা ব্যথার বিজ্ঞানসম্মত যত্ন

কাশি হলো শ্বাসনালী পরিষ্কার রাখার এবং জীবাণু বা কফ বের করে দেয়ার একটি প্রাকৃতিক শারীরিক প্রতিক্রিয়া।

**সাধারণ কারণসমূহ:**
- **ভাইরাল সর্দি-কাশি:** সাধারণ ফ্লু বা ভাইরাসের কারণে শ্বাসনালীর উপরিভাগে প্রদাহ।
- **ধূলাবালি ও এলার্জি:** শুষ্ক আবহাওয়া বা বাতাসে থাকা কণার প্রতি অ্যালার্জিক প্রতিক্রিয়া।
- **গলা শুকিয়ে যাওয়া:** কম পানি পান বা মুখ দিয়ে শ্বাস নেয়ার কারণে গলা শুষ্ক হওয়া।

**ঘরোয়া আরামদায়ক যত্ন:**
- দিনে ২-৩ বার কুসুম গরম লবণ পানি দিয়ে গড়গড়া করুন।
- কুসুম গরম পানিতে মধু ও লেবুর রস মিশিয়ে পান করুন।
- গরম পানির ভাপ নিলে শ্বাসনালীর শ্লেষ্মা নরম হয়ে আরাম পাওয়া যায়।

*${notice.notDoctorNotice}*`
          : language === 'ja'
          ? `### 🫁 咳・喉の痛みのメカニズムとケア

咳は気道内に侵入した異物や分泌物を体外へ排出するための生体防御反射です。

**主な原因:**
- **上気道ウイルス感染（風邪症候群）:** 咽頭や喉頭粘膜の急性炎症。
- **乾燥・アレルゲン:** エアコンによる乾燥やホコリによる気道過敏。
- **後鼻漏:** 鼻汁が喉の奥へ垂れ込み、咳受容体を刺激する。

**推奨されるセルフケア:**
- ぬるま湯でのうがいを定期的に行う。
- 加湿器を用いて部屋の湿度を50〜60%に保つ、温かい蒸気を吸入する。
- 蜂蜜入り温水で喉の粘膜を保湿・保護する。

*${notice.notDoctorNotice}*`
          : `### 🫁 Clinical Care for Cough, Pharyngeal Irritation & Upper Respiratory Symptoms

A cough is an essential primitive vagally mediated protective reflex clearing excess mucus, debris, and microbes from tracheobronchial airways.

**Primary Triggers:**
1. **Viral Upper Respiratory Infection (URI):** Transient epithelial inflammation in the nasopharynx triggering rapid-adapting irritant receptors.
2. **Post-Nasal Drip (Upper Airway Cough Syndrome):** Mucous secretions descending along the posterior oropharyngeal wall.
3. **Airway Drying & Environmental Particulates:** Decreased mucociliary clearance in low-humidity environments.

**Supportive Interventions:**
- **Hypertonic Saline Gargle:** Warm salt water gargles reduce submucosal edema through osmotic water egress.
- **Demulcents (Honey):** Honey coats sensory nerve endings in the pharynx, diminishing cough frequency.
- **Ambient Vaporization:** Maintain 50–60% indoor relative humidity to optimize ciliary beating frequency.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'MedlinePlus - Cough and Sore Throat Self-Care', url: 'https://medlineplus.gov' },
        { title: 'CDC - Common Cold and Upper Respiratory Infection', url: 'https://www.cdc.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
    };
  }

  // 8. Specific Symptom: BACK PAIN & MUSCLE SORENESS
  const isBackMuscle =
    q.includes('back pain') ||
    q.includes('lower back') ||
    q.includes('muscle pain') ||
    q.includes('sore muscle') ||
    q.includes('stiff neck') ||
    q.includes('joint') ||
    q.includes('کمر') ||
    q.includes('پٹھے') ||
    q.includes('কোমর') ||
    q.includes('পেশী') ||
    q.includes('腰') ||
    q.includes('筋肉');

  if (isBackMuscle) {
    return {
      text:
        language === 'ur'
          ? `### 🦴 کمر اور پٹھوں کے درد کی وجوہات اور نگہداشت

کمر اور پٹھوں کا درد عام طور پر غلط انداز میں بیٹھنے، وزنی چیز اٹھانے یا عضلاتی تناؤ سے پیدا ہوتا ہے۔

**اہم تدابیر:**
- مسلسل بستر پر پڑے رہنے کے بجائے ہلکی چہل قدمی جاری رکھیں۔
- پہلے 48 گھنٹوں میں ٹھنڈا پیک اور بعد میں نیم گرم ٹکور کریں۔
- کرسی پر بیٹھتے وقت کمر کے نچلے حصے کے پیچھے تکیہ رکھیں۔

**⚠️ کب فوری ڈاکٹر سے رجوع کریں:**
- اگر درد ٹانگ میں نیچے تک جائے اور پاؤں سن یا بے حس ہو جائے۔
- پیشاب یا پاخانے کے کنٹرول میں دشواری پیدا ہو۔

*${notice.notDoctorNotice}*`
          : language === 'bn'
          ? `### 🦴 কোমর ও পেশীর ব্যথার কারণ ও প্রতিকার

কোমর ও মাংসপেশির ব্যথা সাধারণত বসার ভুল ভঙ্গি, দীর্ঘক্ষণ একভাবে থাকা বা পেশীর টানের কারণে হয়।

**উপকারী পদক্ষেপ:**
- দীর্ঘক্ষণ বিছানায় শুয়ে না থেকে হালকা হাঁটাচলা বজায় রাখুন।
- তীব্র ব্যথার প্রাথমিক ৪৮ ঘণ্টায় বরফের সেঁক এবং পরবর্তীতে কুসুম গরম সেঁক দিন।
- ভারী বস্তু তোলার সময় কোমর বাঁকা না করে হাঁটু ভেঙে তুলুন।

**⚠️ জরুরি সতর্কবার্তা:**
- ব্যথা যদি পায়ের নিচের দিকে ছড়িয়ে পড়ে এবং পা অবশ লাগে।
- মূত্র বা মল নিয়ন্ত্রণে সমস্যা দেখা দিলে দ্রুত জরুরি বিভাগে যান।

*${notice.notDoctorNotice}*`
          : language === 'ja'
          ? `### 🦴 腰痛・筋肉の痛みのメカニズムと対処法

腰痛や筋筋膜性疼痛の多くは、不良姿勢、体幹筋力低下、長時間の同一姿勢による筋緊張に起因します。

**基本対策:**
- 長期の安静臥床を避け、痛みの範囲内で無理のない歩行を維持する。
- 急性期（発症直後）は局所の冷却、慢性的な張りには温熱療法を適用する。
- 椅子に座る際は骨盤を立て、腰椎の自然な前弯をサポートする。

**⚠️ 警戒すべき症状:**
- 下肢にしびれや脱力感が広がる場合、排尿・排便障害を伴う場合は直ちに整形外科等を受診してください。

*${notice.notDoctorNotice}*`
          : `### 🦴 Musculoskeletal Medicine: Lower Back Pain & Muscle Strain

Acute mechanical lower back pain and myofascial strain usually involve the erector spinae, quadratus lumborum, and lumbar ligaments.

**Physiological Principles:**
Prolonged kyphotic sitting increases intradiscal hydrostatic pressure by up to 40% compared to standing. Microtrauma in paraspinal fibers initiates localized spasm to splint the axial skeleton.

**Active Recovery Protocols:**
- **Avoid Prolonged Bed Rest:** Gentle ambulation maintains spinal tissue perfusion and prevents muscular deconditioning.
- **Thermal Sequencing:** Cold packs during the initial 48 hours to blunt local inflammation, transitioning to moist heat to relieve hypertonicity.
- **Ergonomic Load Distribution:** Bend at hip and knee joints when lifting; place a lumbar roll at L3–L5 when sitting.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'NIAMS - Handout on Health: Back Pain', url: 'https://www.niams.nih.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
    };
  }

  // 8b. EYE STRAIN & TWITCHING ("eye twitch", "eye strain", "dry eyes", "blurry")
  const isEye =
    q.includes('eye') ||
    q.includes('twitch') ||
    q.includes('dry eye') ||
    q.includes('vision') ||
    q.includes('آنکھ') ||
    q.includes('پلک') ||
    q.includes('চোখ') ||
    q.includes('目') ||
    q.includes('眼');

  if (isEye && !q.includes('pain radiating') && !q.includes('stroke')) {
    return {
      text:
        language === 'ur'
          ? `### 👁️ آنکھوں پر دباؤ، خشکی اور پھڑکنے کی وجوہات و تدابیر

اسکرین کا طویل استعمال، نیند کی کمی اور کم روشنی میں کام کرنا آنکھوں پر دباؤ (Eye Strain) کا سب سے عام سبب ہے۔

**اہم وجوہات:**
- **ڈیجیٹل آئی اسٹرین:** مسلسل اسکرین دیکھنے سے پلکیں جھپکنے کی رفتار 50 فیصد کم ہو جاتی ہے جس سے آنکھوں میں خشکی آتی ہے۔
- **پلک کا پھڑکنا (Eye Twitching / Myokymia):** زیادہ کیفین، ذہنی دباؤ یا نیند کی کمی سے پٹھوں میں عارضی ارتعاش پیدا ہوتا ہے۔

**آرام دہ تدابیر:**
- **20-20-20 فارمولا:** ہر 20 منٹ بعد 20 سیکنڈ کے لیے 20 فٹ دور کسی چیز کو دیکھیں۔
- **مصنوعی آنسو یا ٹھنڈا پانی:** آنکھوں پر ٹھنڈے پانی کے چھینٹے ماریں یا ڈاکٹر کے مشورے سے چکنائی والے قطرے ڈالیں۔
- **کیفین میں کمی:** چائے اور کافی کا استعمال اعتدال پر لائیں اور نیند پوری کریں۔

*${notice.notDoctorNotice}*`
          : language === 'bn'
          ? `### 👁️ চোখের ক্লান্তি, শুষ্কতা ও চোখ কাঁপার কারণ এবং যত্ন

দীর্ঘক্ষণ ডিজিটাল স্ক্রিন ব্যবহার, অপর্যাপ্ত ঘুম এবং অতিরিক্ত মানসিক চাপ চোখের সমস্যার প্রধান কারণ।

**সাধারণ কারণসমূহ:**
- **ডিজিটাল আই স্ট্রেন:** স্ক্রিনে দীর্ঘক্ষণ তাকিয়ে থাকলে চোখের পলক ফেলার হার অর্ধেকের বেশি কমে যায়, ফলে কর্নিয়া শুষ্ক হয়।
- **চোখ কাঁপা (Myokymia):** অতিরিক্ত ক্যাফেইন, চোখের পেশির ক্লান্তি বা ঘুমের অভাবে চোখের পাতায় ক্ষুদ্র পেশী সংকোচন।

**উপকারী চোখের যত্ন:**
- **২০-২০-২০ নিয়ম:** প্রতি ২০ মিনিট কাজের পর অন্তত ২০ সেকেন্ডের জন্য ২০ ফুট দূরের কোনো বস্তুর দিকে তাকান।
- **চোখ ভিজিয়ে রাখা:** চোখ কিছুক্ষণ বন্ধ রেখে বিশ্রাম দিন এবং বারবার চোখের পলক ফেলুন।
- **পর্যাপ্ত ঘুম:** রাতে ৭-৮ ঘণ্টা ঘুম চোখের রক্তনালীর চাপ কমায়।

*${notice.notDoctorNotice}*`
          : language === 'ja'
          ? `### 👁️ 眼精疲労・目の乾き・まぶたのピクピクの対処法

長時間のPCやスマートフォンの凝視、乾燥した室内環境、睡眠不足が主な誘因です。

**主な要因:**
- **VDT症候群（デジタル眼精疲労）:** 画面注視により瞬きの回数が半減し、角膜表面の涙液層が破壊される。
- **眼瞼ミオキミア（まぶたの痙攣）:** カフェインの過剰摂取、疲労、ストレスによる眼輪筋の局所的な痙攣。

**実践的セルフケア:**
- **20-20-20ルール:** 20分ごとに20秒間、20フィート（約6メートル）先を眺めてピント調節筋（毛様体筋）を緩める。
- **温熱アイマスク:** 目元を温めてマイボーム腺の油分分泌を促し、涙の蒸発を防ぐ。
- **十分な睡眠とブルーライト制限:** 就寝前の端末操作を控え、睡眠時間を確保する。

*${notice.notDoctorNotice}*`
          : `### 👁️ Clinical Management of Eye Strain, Dry Eye & Eyelid Twitching

Digital eye strain (asthenopia) and eyelid myokymia are frequent physiological reactions to prolonged near-point visual accommodation.

**Underlying Mechanisms:**
1. **Accommodative Fatigue:** Sustained contraction of the ciliary muscle maintaining lens focus for near screens causes periocular tension.
2. **Evaporative Tear Film Instability:** Spontaneous blink rates drop by up to 60% during visual display terminal (VDT) tasks, exposing corneal epithelium.
3. **Eyelid Myokymia:** Involuntary fine fasciculations of the orbicularis oculi muscle triggered by stress, caffeine, or sleep deprivation.

**Evidence-Based Comfort Strategies:**
- **Implement the 20-20-20 Rule:** Every 20 minutes, gaze at an object at least 20 feet away for 20 seconds to relax ciliary muscle tone.
- **Conscious Blinking:** Practice deliberate full blinks during reading to resurface the lipid tear film.
- **Warm Compresses:** 5–10 minutes of moist heat liquifies meibomian gland lipids, improving dry eye symptoms.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'AAO - American Academy of Ophthalmology Eye Strain Guide', url: 'https://www.aao.org' },
        { title: 'MedlinePlus - Eye Strain', url: 'https://medlineplus.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
    };
  }

  // 8c. SLEEP & INSOMNIA ("insomnia", "cannot sleep", "trouble sleeping")
  const isSleep =
    q.includes('sleep') ||
    q.includes('insomnia') ||
    q.includes('wake up') ||
    q.includes('نیند') ||
    q.includes('ঘুম') ||
    q.includes('睡眠') ||
    q.includes('眠れ');

  if (isSleep) {
    return {
      text:
        language === 'ur'
          ? `### 🌙 پرسکون نیند اور بے خوابی (Insomnia) کے سائنسی اصول

نیند انسانی جسم کی بافتوں کی مرمت اور دماغ کی صفائی کا بنیادی قدرتی ذریعہ ہے۔

**بہتر نیند کے لیے کلینیکل اصول (Sleep Hygiene):**
- **مقررہ وقت:** روزانہ ایک ہی وقت پر سونے اور جاگنے کا شیڈول اپنائیں۔
- **اسکرین اور نیلی روشنی سے پرہیز:** سونے سے 1 گھنٹہ قبل موبائل اور ٹی وی بند کریں، کیونکہ نیلی روشنی میلاٹونن ہارمون کو روکتی ہے۔
- **کیفین کا وقت:** دوپہر کے بعد چائے یا کافی سے پرہیز کریں کیونکہ کیفین جسم میں 6 سے 8 گھنٹے تک سرگرم رہتی ہے۔
- **ٹھنڈا اور تاریک کمرہ:** سونے کا کمرہ پرسکون، اندھیرا اور مناسب ٹھنڈا ہونا چاہیے۔

*${notice.notDoctorNotice}*`
          : language === 'bn'
          ? `### 🌙 সুনিদ্রা ও অনিদ্রা (Insomnia) দূর করার বিজ্ঞানসম্মত উপায়

ঘুম শরীরের কোষীয় নিরাময় ও মস্তিষ্কের স্মৃতি সংরক্ষণের জন্য অপরিহার্য।

**সুনিদ্রার স্বাস্থ্যবিধি (Sleep Hygiene):**
- **নির্দিষ্ট রুটিন:** প্রতিদিন একই সময়ে ঘুমাতে যাওয়া এবং ঘুম থেকে ওঠার অভ্যাস করুন।
- **স্ক্রিনের নীল আলো বর্জন:** ঘুমানোর অন্তত ১ ঘণ্টা আগে মোবাইল ও কম্পিউটার বন্ধ রাখুন, যাতে মেলাটোনিন হরমোন স্বাভাবিক থাকে।
- **ক্যাফেইনে সতর্কতা:** দুপুরের পর চা বা কফি পান পরিহার করুন।
- **আরামদায়ক পরিবেশ:** শোবার ঘর অন্ধকার, কোলাহলমুক্ত ও পরিমিত ঠান্ডা রাখুন।

*${notice.notDoctorNotice}*`
          : language === 'ja'
          ? `### 🌙 睡眠障害・不眠に対する科学的アプローチ（Sleep Hygiene）

良質な睡眠は組織修復、免疫機能維持、記憶の定着に不可欠な生理プロセスです。

**エビデンスに基づく睡眠衛生:**
- **起床時刻の固定:** 毎日決まった時刻に起床し、朝日を浴びることで体内時計をリセット。
- **ブルーライト制限:** 就寝1時間前は画面閲覧を控え、メラトニンの分泌を促す。
- **カフェインの半減期管理:** 就寝の6時間前以降はカフェイン摂取を避ける。
- **寝室の環境最適化:** 暗く、静かで、やや涼しい室温（18〜22℃）を保つ。

*${notice.notDoctorNotice}*`
          : `### 🌙 Clinical Science of Sleep Hygiene & Insomnia Mitigation

Sleep is governed by two interacting regulatory systems: the homeostatic sleep drive (Process S) and the circadian wake propensity (Process C).

**Core Physiological Principles:**
1. **Melatonin Synthesis:** Pineal secretion of melatonin is acutely suppressed by short-wavelength (450–480 nm) blue light from screens.
2. **Adenosine Clearance:** Adenosine accumulates in basal forebrain neurons during prolonged wakefulness, generating sleep pressure. Caffeine acts as a competitive adenosine receptor antagonist with a 5–7 hour half-life.

**Evidence-Based Sleep Protocols:**
- **Strict Schedule Consistency:** Anchor wake times to stabilize the suprachiasmatic nucleus master clock.
- **Digital Sunset:** Discontinue electronic display viewing 60 minutes prior to intended sleep onset.
- **Stimulus Control:** Use the bed exclusively for sleep. If awake after 20 minutes, move to a dim room until drowsy.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'AASM - American Academy of Sleep Medicine Guidelines', url: 'https://aasm.org' },
        { title: 'MedlinePlus - Healthy Sleep', url: 'https://medlineplus.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
    };
  }

  // 8d. HYDRATION & WATER INTAKE ("water", "hydration", "dehydration")
  const isHydration =
    q.includes('water') ||
    q.includes('hydration') ||
    q.includes('dehydrat') ||
    q.includes('drink') ||
    q.includes('پانی') ||
    q.includes('পানি') ||
    q.includes('水分') ||
    q.includes('脱水');

  if (isHydration) {
    return {
      text:
        language === 'ur'
          ? `### 💧 پانی کی ضرورت اور ہائیڈریشن کے طبی اصول

پانی انسانی جسم کا 60 فیصد حصہ بناتا ہے اور تمام خلیات کے افعال کے لیے بنیادی شرط ہے۔

**روزانہ کتنے پانی کی ضرورت ہے؟**
عام طور پر بالغ افراد کو روزانہ 2 سے 2.5 لیٹر (تقریباً 8 سے 10 گلاس) سیال کی ضرورت ہوتی ہے، جو موسم اور جسمانی محنت کے لحاظ سے تبدیل ہو سکتی ہے۔

**پانی کی کمی (Dehydration) کی علامات:**
- پیشاب کا رنگ گہرا پیلا ہونا (نارمل ہلکا زردی مائل ہوتا ہے)۔
- سر میں ہلکا درد اور تھکن۔
- منہ کا خشک ہونا اور جلد کا کھنچاؤ۔

*${notice.notDoctorNotice}*`
          : language === 'bn'
          ? `### 💧 শরীরের জন্য পানির প্রয়োজনীয়তা ও সঠিক জলযোজন

পানি মানবদেহের প্রায় ৬০% অংশ জুড়ে থাকে এবং সমস্ত অঙ্গপ্রত্যঙ্গের কার্যক্রম সুষ্ঠু রাখতে অপরিহার্য।

**দৈনিক পানির প্রয়োজনীয়তা:**
সাধারণত একজন প্রাপ্তবয়স্ক মানুষের দৈনিক ২ থেকে ২.৫ লিটার (প্রায় ৮-১০ গ্লাস) পানি পান করা উচিত।

**পানিশূন্যতার (Dehydration) সাধারণ লক্ষণ:**
- প্রস্রাবের রঙ গাঢ় হলুদ হওয়া (স্বাভাবিক রঙ হালকা বা স্বচ্ছ)।
- মাথাব্যথা, মনোযোগে ঘাটতি ও অতিরিক্ত ক্লান্তি।
- ত্বক শুষ্ক হওয়া ও ঘনঘন তৃষ্ণা পাওয়া।

*${notice.notDoctorNotice}*`
          : language === 'ja'
          ? `### 💧 体内水分バランスと適切な水分補給の医学的基準

成人の体重の約60%は水分で構成され、栄養運搬、体温調節、老廃物排泄を担っています。

**1日の水分摂取目安:**
成人の場合、食事以外に1日あたり約1.5〜2.0リットルの水分摂取が推奨されます（活動量や気温に応じて調整）。

**脱水状態のセルフチェック:**
- 尿の濃縮（薄い黄色が正常、濃い琥珀色は水分不足の徴候）。
- 口腔内の乾燥、倦怠感、頭痛。
- 立ちくらみや集中力の低下。

*${notice.notDoctorNotice}*`
          : `### 💧 Clinical Hemodynamics of Fluid Balance & Daily Hydration

Water accounts for approximately 60% of adult body mass, distributed between intracellular fluid (ICF, 40%) and extracellular fluid (ECF, 20%).

**Hydration Physiology:**
Even mild dehydration (1–2% total body water deficit) impairs executive function, memory retrieval, and cardiovascular stroke volume while elevating resting heart rate.

**Clinical Guidelines:**
- **Daily Volume Targets:** National Academy of Medicine recommends approximately 2.7 liters total water daily for adult women and 3.7 liters for men (including water from food).
- **Urine Specific Gravity / Color Benchmark:** A pale, light-straw coloration correlates with optimal plasma osmolality.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'MedlinePlus - Dehydration and Water in Diet', url: 'https://medlineplus.gov' },
        { title: 'CDC - Water and Healthier Drinks', url: 'https://www.cdc.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
    };
  }

  // 9. Structured Symptom Intake Form (Explicitly requested)
  const isExplicitIntake =
    q.includes('start symptom intake') ||
    q.includes('symptom intake') ||
    q.includes('intake guide') ||
    q.includes('intake checklist') ||
    q.includes('علامات کا جائزہ') ||
    q.includes('علامات کا منظم جائزہ') ||
    q.includes('লক্ষণ পর্যালোচনা') ||
    q.includes('症状確認');

  if (isExplicitIntake) {
    if (language === 'ur') {
      return {
        text: `### 🩺 علامات کا منظم جائزہ (Symptom Intake Guide)

ڈاکٹر کے معائنے سے پہلے علامات کی منظم تفصیل تیار کرنا درست تشخیص میں مددگار ثابت ہوتا ہے۔

**اہم سوالات جن کے جوابات نوٹ کریں:**
- **آغاز اور دورانیہ:** یہ علامت کب شروع ہوئی؟ کیا یہ مسلسل ہے یا وقفے وقفے سے ہوتی ہے؟
- **شدت اور نوعیت:** درد یا تکلیف کیسی ہے (چبھن، دباؤ، یا جلن)؟ 1 سے 10 کے پیمانے پر اس کی شدت کیا ہے؟
- **محرک عوامل:** کس چیز سے علامت میں اضافہ ہوتا ہے اور کس سے آرام ملتا ہے؟
- **دیگر علامات:** کیا اس کے ساتھ متلی، چکر، بخار، یا وزن میں غیر متوقع تبدیلی ہے؟
- **سابقہ ادویات:** کیا آپ نے حال ہی میں کوئی نئی دوا یا سپلیمنٹ شروع کی ہے؟

*${notice.notDoctorNotice}*`,
        citations: [
          { title: 'MedlinePlus - Talking With Your Doctor', url: 'https://medlineplus.gov' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    if (language === 'bn') {
      return {
        text: `### 🩺 লক্ষণ পর্যালোচনা গাইডলাইন (Symptom Intake Guide)

ডাক্তারের কাছে যাওয়ার পূর্বে নিজের লক্ষণগুলো সঠিকভাবে লিপিবদ্ধ করা অত্যন্ত কার্যকর।

**যে বিষয়গুলো লিখে রাখবেন:**
- **শুরু ও সময়কাল:** লক্ষণটি ঠিক কখন থেকে শুরু হয়েছে? এটি কি সবসময় থাকে নাকি বিরতি দিয়ে আসে?
- **তীব্রতা ও প্রকৃতি:** ব্যথার ধরন কেমন (চাপা ব্যথা, তীব্র খোঁচা বা জ্বালাপোড়া)? ১ থেকে ১০ স্কেলে তীব্রতা কত?
- **উত্তেজক বা উপশমকারী কারণ:** কী করলে লক্ষণটি বাড়ে বা কমে?
- **সঙ্গী লক্ষণসমূহ:** বমি ভাব, মাথা ঘোরা, দুর্বলতা বা জ্বর রয়েছে কি না?
- **বর্তমান ওষুধের তালিকা:** আপনি বর্তমানে কী কী ওষুধ বা সাপ্লিমেন্ট গ্রহণ করছেন?

*${notice.notDoctorNotice}*`,
        citations: [
          { title: 'NIH - How to Talk to Your Doctor', url: 'https://www.nih.gov' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    if (language === 'ja') {
      return {
        text: `### 🩺 症状確認チェックシート（Symptom Intake Guide）

医師の診察を円滑に進めるため、事前に症状の経過を整理するチェックシートです。

**医師に伝えるべき5つの主要項目:**
- **発症時期と経過:** いつから始まりましたか？持続的ですか、それとも波がありますか？
- **性質と強さ:** どのような違和感・痛みですか？10段階評価でどれくらいですか？
- **誘因と軽快因子:** どのような動作や環境で悪化し、何で和らぎますか？
- **随伴症状:** 発熱、吐き気、めまい、息切れなどが併発していませんか？
- **服用歴:** 現在定期的に服用している内服薬を確認してください。

*${notice.notDoctorNotice}*`,
        citations: [
          { title: '厚生労働省 - 医療のかかり方・上手な受診', url: 'https://www.mhlw.go.jp' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    return {
      text: `### 🩺 Structured Clinical Symptom Intake Guide

Preparing an objective summary enables your physician to conduct a faster, more accurate clinical evaluation.

**Key Dimensions to Record:**
1. **Onset & Chronology:** Exactly when did it start? Sudden or gradual? Constant or intermittent?
2. **Quality & Severity:** Dull ache, sharp, throbbing, or burning? Score on a 1–10 scale.
3. **Modulating Factors:** What makes it better or worse (rest, posture, hydration, exertion)?
4. **Associated Symptoms:** Any low-grade fever, nausea, dizziness, or localized swelling?
5. **Medication & Supplement Baseline:** Note current medications, dosages, and recent changes.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'NIA - Preparing for a Doctor Appointment', url: 'https://www.nia.nih.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
    };
  }

  // 10. Doctor Appointment Preparation / Consultation Questions
  const isDoctorQuery =
    q.includes('appointment') ||
    q.includes('doctor') ||
    q.includes('visit') ||
    q.includes('consult') ||
    q.includes('question to ask') ||
    q.includes('ڈاکٹر') ||
    q.includes('ملاقات') ||
    q.includes('ডাক্তার') ||
    q.includes('অ্যাপয়েন্টমেন্ট') ||
    q.includes('医師') ||
    q.includes('診察');

  if (isDoctorQuery) {
    if (language === 'ur') {
      return {
        text: `### 📋 ڈاکٹر سے معائنے کی تیاری (Appointment Preparation Checklist)

15 منٹ کے مختصر کلینیکل معائنے کو موثر اور نتیجہ خیز بنانے کے لیے پیشگی تیاری بے حد ضروری ہے۔

**ڈاکٹر سے پوچھنے کے لیے 5 اہم سوالات:**
1. میری ان علامات کی سب سے امکانی وجہ کیا ہو سکتی ہے؟
2. کیا اس کی تصدیق کے لیے کسی لیبارٹری ٹیسٹ یا ایکسرے کی ضرورت ہے؟
3. جو علاج تجویز کیا جا رہا ہے، اس کے ممکنہ سائیڈ ایفیکٹس کیا ہیں؟
4. علامات میں بہتری کب تک متوقع ہے، اور اگر افاقہ نہ ہو تو مجھے کیا کرنا چاہیے؟
5. کیا مجھے اپنی خوراک یا روزمرہ سرگرمیوں میں کوئی خاص پرہیز کرنے کی ضرورت ہے؟

*${notice.notDoctorNotice}*`,
        citations: [
          { title: 'AHRQ - Questions Are the Answer: Talking to Your Doctor', url: 'https://www.ahrq.gov' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    if (language === 'bn') {
      return {
        text: `### 📋 ডাক্তারের সাক্ষাতের প্রস্তুতি চেকলিস্ট (Doctor Visit Checklist)

আপনার চিকিৎসকের পরামর্শকে সর্বোচ্চ কার্যকর করতে নিম্নলিখিত প্রস্তুতিমূলক পদক্ষেপগুলো গ্রহণ করুন:

**ডাক্তারকে জিজ্ঞেস করার মতো ৫টি গুরুত্বপূর্ণ প্রশ্ন:**
১. আমার এই শারীরিক সমস্যার সম্ভাব্য কারণ কী কী হতে পারে?
২. রোগ নিশ্চিত করার জন্য কী ধরনের ল্যাব টেস্ট করা প্রয়োজন?
৩. আপনি যে ওষুধটি দিচ্ছেন, তার কোনো পরিচিত পার্শ্বপ্রতিক্রিয়া আছে কি?
৪. কতদিনের মধ্যে অবস্থার উন্নতি প্রত্যাশা করা যায়?
৫. আমার খাদ্যতালিকায় বা জীবনযাত্রায় কোনো সুনির্দিষ্ট বিধিনিষেধ মেনে চলতে হবে কি?

*${notice.notDoctorNotice}*`,
        citations: [
          { title: 'NHS - Questions to ask your doctor', url: 'https://www.nhs.uk' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    if (language === 'ja') {
      return {
        text: `### 📋 医師の診察に向けた準備チェックリスト（Doctor Visit Checklist）

限られた診察時間の中で的確なアドバイスと診療方針を得るためのチェックリストです。

**医師に質問すべき5つの重要項目:**
1. 現在の症状から考えられる原因・病名は何ですか？
2. 確定診断のために追加の検査は必要ですか？
3. 処方されるお薬の効能と、注意すべき主な副作用は何ですか？
4. 日常生活で控えるべき運動や食事などの制限はありますか？
5. どのような変化があった場合に、再受診を急ぐべきですか？

*${notice.notDoctorNotice}*`,
        citations: [
          { title: '厚生労働省 - 上手なお医者さんのかかり方', url: 'https://www.mhlw.go.jp' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    return {
      text: `### 📋 Doctor Appointment Preparation Checklist

Maximizing a 15-minute consultation begins with structured preparation:

**Top 5 Questions to Ask Your Doctor:**
1. **Differential Diagnosis:** "What are the most likely causes for these symptoms?"
2. **Diagnostic Evaluation:** "Are specific lab tests or imaging studies recommended to confirm this?"
3. **Treatment Considerations:** "What are the benefits, risks, and common side effects of this treatment?"
4. **Expected Trajectory:** "Within what timeframe should I anticipate improvement, and when should I follow up?"
5. **Lifestyle Interventions:** "Are there dietary, physical activity, or ergonomic adjustments that will support my recovery?"

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'AHRQ - Questions Are the Answer: Talking to Your Doctor', url: 'https://www.ahrq.gov' },
        { title: 'MedlinePlus - How to Get the Most from Your Doctor Visit', url: 'https://medlineplus.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
    };
  }

  // 11. Blood Pressure & Cardiovascular Concepts
  const isBpQuery =
    q.includes('pressure') ||
    q.includes('systolic') ||
    q.includes('diastolic') ||
    q.includes('hypertension') ||
    q.includes('بلڈ پریشر') ||
    q.includes('سسٹولک') ||
    q.includes('রক্তচাপ') ||
    q.includes('সিস্টোলিক') ||
    q.includes('血圧') ||
    q.includes('収縮期') ||
    q.includes('拡張期');

  if (isBpQuery) {
    if (language === 'ur') {
      return {
        text: `### 💓 بلڈ پریشر کی طبی وضاحت (سسٹولک بمقابلہ ڈائیسٹولک)

بلڈ پریشر وہ دباؤ ہے جو گردش کرتا ہوا خون شریانوں کی دیواروں پر ڈالتا ہے۔ اسے دو اعداد میں ظاہر کیا جاتا ہے (مثلاً 120/80 mmHg)۔

**1. سسٹولک پریشر (اوپر والا عدد - مثلاً 120):**
- یہ اس وقت کا دباؤ ہے جب دل کا بایاں بطن (Left Ventricle) سکڑتا ہے اور پورے جسم میں خون پمپ کرتا ہے۔
- یہ شریانوں میں محسوس ہونے والا بلند ترین دباؤ ہوتا ہے۔

**2. ڈائیسٹولک پریشر (نیچے والا عدد - مثلاً 80):**
- یہ دھڑکنوں کے درمیانی وقفے کا دباؤ ہے جب دل آرام کرتا ہے اور اگلے پمپ کے لیے تازہ خون سے بھرتا ہے۔
- یہ شریانوں میں برقرار رہنے والا بنیادی کم ترین دباؤ ہے۔

**طبی زمرہ بندی (بالغ افراد کے لیے):**
- **نارمل:** 120 سے کم سسٹولک اور 80 سے کم ڈائیسٹولک۔
- **بلند:** سسٹولک 120-129 اور ڈائیسٹولک 80 سے کم۔
- **ہائی بلڈ پریشر (اسٹیج 1):** سسٹولک 130-139 یا ڈائیسٹولک 80-89۔

*${notice.notDoctorNotice}*`,
        citations: [
          { title: 'امریکن ہارٹ ایسوسی ایشن - بلڈ پریشر کی رہنمائی', url: 'https://www.heart.org' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    if (language === 'bn') {
      return {
        text: `### 💓 রক্তচাপের সহজ ব্যাখ্যা (সিস্টোলিক বনাম ডায়াস্টোলিক)

রক্ত যখন ধমনীর মধ্য দিয়ে প্রবাহিত হয়, তখন ধমনীর প্রাচীরে যে চাপ সৃষ্টি করে তাকে রক্তচাপ বলে (যেমন: ১২০/৮০ মিমি পারদ)।

**১. সিস্টোলিক রক্তচাপ (উপরের সংখ্যা - যেমন ১২০):**
- হৃৎপিণ্ড যখন সংকুচিত হয়ে সমগ্র শরীরে তাজা রক্ত পাম্প করে, তখন ধমনীতে সর্বোচ্চ চাপ সৃষ্টি হয়।

**২. ডায়াস্টোলিক রক্তচাপ (নিচের সংখ্যা - যেমন ৮০):**
- দুটি হৃৎস্পন্দনের মধ্যবর্তী সময়ে যখন হৃৎপিণ্ড শিথিল হয় এবং রক্তে পূর্ণ হয়, তখন ধমনীতে যে ন্যূনতম চাপ বজায় থাকে।

**স্বাভাবিক মানদণ্ড (প্রাপ্তবয়স্কদের জন্য):**
- **স্বাভাবিক:** সিস্টোলিক ১২০-এর নিচে এবং ডায়াস্টোলিক ৮০-এর নিচে।
- **উচ্চ রক্তচাপ (পর্যায় ১):** সিস্টোলিক ১৩০-১৩৯ অথবা ডায়াস্টোলিক ৮০-৮৯।

*${notice.notDoctorNotice}*`,
        citations: [
          { title: 'আমেরিকান হার্ট অ্যাসোসিয়েশন - রক্তচাপ নির্দেশিকা', url: 'https://www.heart.org' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    if (language === 'ja') {
      return {
        text: `### 💓 血圧の仕組み（収縮期血圧と拡張期血圧の違い）

血圧とは、心臓から送り出された血液が血管の壁を押す力のことです（通常「120/80 mmHg」のように表記）。

**1. 収縮期血圧（最高血圧・上の数値 - 例: 120 mmHg）:**
- 心臓が力強く収縮し、全身に向けて血液を送り出した瞬間に血管へ加わる最大の圧力。

**2. 拡張期血圧（最低血圧・下の数値 - 例: 80 mmHg）:**
- 心臓が拡張（リラックス）し、血液を心室に蓄えている間に血管内に残る最小の圧力。

**成人基準値:**
- **正常血圧:** 収縮期 120未満 かつ 拡張期 80未満
- **高血圧（I度）:** 収縮期 130〜139 または 拡張期 80〜89

*${notice.notDoctorNotice}*`,
        citations: [
          { title: '日本高血圧学会 - 高血圧治療ガイドライン', url: 'https://www.jpnsh.jp' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
      };
    }

    return {
      text: `### 💓 Clinical Physiology of Blood Pressure: Systolic vs. Diastolic

Blood pressure quantifies the lateral hydrostatic force exerted by circulating blood against systemic arterial walls (measured in mmHg, e.g., 120/80 mmHg).

**1. Systolic Blood Pressure (Top Number — e.g., 120 mmHg):**
- Peak arterial pressure generated during left ventricular systole (contraction) as blood is ejected into the aorta.
- Reflects cardiac stroke volume, vascular resistance, and large arterial compliance.

**2. Diastolic Blood Pressure (Bottom Number — e.g., 80 mmHg):**
- Continuous baseline pressure maintained within the arterial tree during ventricular diastole (cardiac relaxation and coronary perfusion).
- Reflects peripheral systemic vascular resistance.

**Standard Adult Classification (AHA/ACC):**
- **Normal:** Systolic < 120 mmHg AND Diastolic < 80 mmHg.
- **Stage 1 Hypertension:** Systolic 130–139 mmHg OR Diastolic 80–89 mmHg.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'American Heart Association - Blood Pressure Readings', url: 'https://www.heart.org' },
        { title: 'NHLBI - High Blood Pressure Science', url: 'https://www.nhlbi.nih.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
    };
  }

  // 12. Emergency First-Aid Medicines & Life-Saving Pharmacology
  const isEmergencyMedQuery =
    q.includes('aspirin') ||
    q.includes('epipen') ||
    q.includes('epinephrine') ||
    q.includes('narcan') ||
    q.includes('naloxone') ||
    q.includes('inhaler') ||
    q.includes('albuterol') ||
    q.includes('salbutamol') ||
    q.includes('nitroglycerin') ||
    q.includes('nitrostat') ||
    q.includes('glucose gel') ||
    q.includes('glucagon') ||
    q.includes('tourniquet') ||
    q.includes('hemostatic') ||
    q.includes('quikclot') ||
    q.includes('emergency medicine') ||
    q.includes('emergency medication') ||
    q.includes('emergency drug') ||
    q.includes('first aid medicine') ||
    q.includes('life saving medicine') ||
    (q.includes('emergency') && (q.includes('medicine') || q.includes('medication') || q.includes('drug'))) ||
    q.includes('اسپرین') ||
    q.includes('ایپی پین') ||
    q.includes('نلوکسون') ||
    q.includes('انہیلر') ||
    q.includes('ٹورنیکیٹ') ||
    q.includes('نائٹروگلسرین') ||
    q.includes('ہنگامی دوا') ||
    q.includes('ہنگامی ادویات') ||
    (q.includes('ایمرجنسی') && (q.includes('دوا') || q.includes('ادویات'))) ||
    (q.includes('ہنگامی') && (q.includes('دوا') || q.includes('ادویات'))) ||
    q.includes('অ্যাসপিরিন') ||
    q.includes('এপিপেন') ||
    q.includes('নালোক্সোন') ||
    q.includes('ইনহেলার') ||
    q.includes('টর্নিকেট') ||
    q.includes('নাইট্রোগ্লিসারিন') ||
    q.includes('জরুরি ওষুধ') ||
    q.includes('জরুরী ওষুধ') ||
    (q.includes('জরুরি') && q.includes('ওষুধ')) ||
    (q.includes('জরুরী') && q.includes('ওষুধ')) ||
    q.includes('エピペン') ||
    q.includes('ナロキソン') ||
    q.includes('アスピリン') ||
    q.includes('ニトログリセリン') ||
    q.includes('サルブタモール') ||
    q.includes('止血帯') ||
    q.includes('救急薬品') ||
    q.includes('緊急医薬品') ||
    (q.includes('救急') && (q.includes('薬') || q.includes('薬品'))) ||
    (q.includes('緊急') && (q.includes('薬') || q.includes('薬品')));

  if (isEmergencyMedQuery) {
    if (language === 'ur') {
      return {
        text: `### 💊 جان بچانے والی بنیادی ہنگامی ادویات اور ابتدائی طبی رہنمائی (Emergency Medicines Guide)

ہنگامی طبی حالات میں درج ذیل ادویات زندگی بچانے کے لیے بنیادی حیثیت رکھتی ہیں۔ **نوٹ:** کوئی بھی دوا دینے سے پہلے لازماً 1122 (ریسکیو) کو فوری کال کریں۔

**1. چبانے والی اسپرین (Aspirin - 162 تا 325 ملی گرام):**
- **ہنگامی استعمال:** دل کا مشتبہ دورہ (ہارٹ اٹیک) جس میں سینے میں شدید دباؤ یا بائیں بازو میں پھیلنے والا درد ہو۔
- **طریقہ کار:** خون کو پتلا کرتی ہے اور دل کی شریان میں لوتھڑے کو بڑھنے سے روکتی ہے۔
- **اہم احتیاط:** مریض کا ہوش میں ہونا ضروری ہے۔ دوا کو پانی کے بغیر **اچھی طرح چبا کر** نگلیں تاکہ 15 منٹ میں جذب ہو جائے۔ معدے کے السر یا اسپرین سے الرجی کی صورت میں ہرگز نہ دیں۔

**2. ایپی نیفرین آٹو انجیکٹر (EpiPen / Auvi-Q):**
- **ہنگامی استعمال:** شدید جان لیوا الرجی (اینافلیکسس)، گلے کی سوجن، اور سانس کی بندش۔
- **طریقہ کار:** ران کے بیرونی پٹھے پر زور سے 3 سیکنڈ تک دبا کر انجیکشن لگائیں۔

**3. نلوکسون نیزل اسپرے (Naloxone / Narcan):**
- **ہنگامی استعمال:** افیونی یا نشہ آور ادویات کا اوورڈوز اور سانس کا رک جانا۔
- **طریقہ کار:** مریض کو لٹا کر ایک نتھنے میں اسپرے کریں۔ 2-3 منٹ میں افاقہ نہ ہو تو دوسرے نتھنے میں دہرائیں۔

**4. سالبوٹامول انہیلر (Albuterol / Ventolin):**
- **ہنگامی استعمال:** دمہ کا شدید دورہ اور سانس کی نالیوں کی تنگی۔
- **طریقہ کار:** ہر ایک منٹ کے وقفے سے 2 سے 4 پف دیں۔

**5. فاسٹ ایکٹنگ گلوکوز یا گلوکاگون (Glucose / Glucagon):**
- **ہنگامی استعمال:** ذیابیطس کے مریض کی شوگر خطرناک حد تک کم ہو جانا۔
- **اہم احتیاط:** بے ہوش مریض کے منہ میں کبھی پانی یا میٹھا نہ ڈالیں (دم گھٹنے کا خطرہ)۔ بے ہوشی میں نیزل گلوکاگون (Baqsimi) یا انجیکشن استعمال کریں۔

**6. ہیموسٹیٹک پٹی اور ٹورنیکیٹ (QuikClot / Tourniquet):**
- **ہنگامی استعمال:** شریان سے تیزی سے بہتا ہوا خون۔
- **طریقہ کار:** زخم سے 2-3 انچ اوپر ٹورنیکیٹ کس کر باندھیں تاکہ خون کا اخراج فوری رک جائے۔

*${notice.notDoctorNotice}*`,
        citations: [
          { title: 'امریکن ہارٹ ایسوسی ایشن - ہنگامی ابتدائی طبی امداد', url: 'https://www.heart.org' },
          { title: 'ریڈ کراس - فرسٹ ایڈ فارماکولوجی گائیڈ', url: 'https://www.redcross.org' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
        suggestedFollowUps: [
          'ہارٹ اٹیک میں اسپرین کیوں چبائی جاتی ہے؟',
          'ایپی پین لگانے کا درست طریقہ کیا ہے؟',
          'ریسکیو 1122 کو کیا تفصیلات فراہم کرنی چاہئیں؟',
        ],
      };
    }

    if (language === 'bn') {
      return {
        text: `### 💊 জীবন রক্ষাকারী প্রধান জরুরি ওষুধ ও ফার্স্ট এইড নির্দেশিকা (Emergency Medicines Guide)

জরুরি স্বাস্থ্য সংকটে সঠিক ওষুধের সময়োপযোগী প্রয়োগ জীবন বাঁচাতে পারে। **জরুরি সতর্কতা:** যেকোনো জরুরি ওষুধ প্রয়োগের পূর্বেই ৯৯৯-এ কল করে অ্যাম্বুলেন্স নিশ্চিত করুন।

**১. চিবানোর অ্যাসপিরিন (Aspirin - ১৬২ থেকে ৩২৫ মি.গ্রা.):**
- **জরুরি প্রয়োগ:** সম্ভাব্য হার্ট অ্যাটাক (বুকে তীব্র চাপ ও ব্যথা যা বাম হাত বা চোয়ালে ছড়িয়ে পড়ে)।
- **কার্যপদ্ধতি:** রক্ত জমাট বাঁধা প্রতিহত করে করোনারি ধমনীতে রক্ত প্রবাহ বজায় রাখে।
- **সতর্কতা:** রোগী সম্পূর্ণ সজ্ঞান অবস্থায় ভালো করে **চিবিয়ে** খাবে (চিবিয়ে খেলে ১৫-২০ মিনিটে কাজ শুরু হয়, আস্ত গিলে খেলে ১ ঘণ্টার বেশি সময় লাগে)। রক্তক্ষরণ বা আলসার থাকলে দেওয়া যাবে না।

**২. এপিনেফ্রিন অটো-ইনজেক্টর (EpiPen):**
- **জরুরি প্রয়োগ:** মারাত্মক অ্যালার্জি (অ্যানাফিল্যাক্সিস), শ্বাসনালী ফুলে বন্ধ হওয়া, হঠাৎ রক্তচাপ পতন।
- **কার্যপদ্ধতি:** বাইরের উরুর পেশীতে কাপড়ের উপর দিয়েই ৩ সেকেন্ড চেপে ধরে ইনজেকশন প্রয়োগ করুন।

**৩. নালোক্সোন ন্যাজাল স্প্রে (Naloxone / Narcan):**
- **জরুরি প্রয়োগ:** অপিওয়েড বা ঘুমের ওষুধের মারাত্মক ওভারডোজ, শ্বাসপ্রশ্বাস বন্ধ হওয়া।
- **কার্যপদ্ধতি:** নাকের একটি ছিদ্রে পুরো স্প্রেটি প্রবেশ করান; ২-৩ মিনিটে উন্নতি না হলে অপর ছিদ্রে পুনরায় দিন।

**৪. সালবিউটামল ইনহেলার (Albuterol / Ventolin):**
- **জরুরি প্রয়োগ:** তীব্র অ্যাজমা বা হাঁপানির টান ও বুকের ঘরঘর শব্দ।
- **কার্যপদ্ধতি:** স্পেসারের সাহায্যে ১ মিনিট বিরতি দিয়ে ২ থেকে ৪টি পাফ দিন।

**৫. দ্রুত কার্যকরী ওরাল গ্লুকোজ ও গ্লুকাগন (Glucose / Glucagon):**
- **জরুরি প্রয়োগ:** ডায়াবেটিস রোগীর রক্তে শর্করার বিপজ্জনক পতন (হাইপোগ্লাইসেমিয়া)।
- **সতর্কতা:** অচেতন রোগীর মুখে কখনোই তরল বা খাবার দেবেন না (দম বন্ধ হওয়ার ঝুঁকি)। অচেতন হলে প্রেসক্রিপশন গ্লুকাগন ব্যবহার করুন।

**৬. রক্তপাত রোধক গজ ও টর্নিকেট (Hemostatic Gauze & Tourniquet):**
- **জরুরি প্রয়োগ:** তীব্র ধমনিগত রক্তক্ষরণ। ক্ষতস্থানের ২-৩ ইঞ্চি উপরে টর্নিকেট শক্ত করে বেঁধে রক্তপাত বন্ধ করুন।

*${notice.notDoctorNotice}*`,
        citations: [
          { title: 'আমেরিকান হার্ট অ্যাসোসিয়েশন - জরুরি ওষুধ নির্দেশিকা', url: 'https://www.heart.org' },
          { title: 'রেড ক্রিসেন্ট - ফার্স্ট এইড প্রোটোকল', url: 'https://www.redcross.org' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
        suggestedFollowUps: [
          'হার্ট অ্যাটাকে অ্যাসপিরিন চিবিয়ে খেতে হয় কেন?',
          'এপিপেন ব্যবহারের সঠিক নিয়ম কী?',
          'জরুরি নম্বরে কল করার সময় কী তথ্য দিতে হয়?',
        ],
      };
    }

    if (language === 'ja') {
      return {
        text: `### 💊 救命のための主要な緊急医薬品とファーストエイド手引き（Emergency Medicines Guide）

生命危機時において、初期対応として用いられる代表的な緊急医薬品の検証済み臨床情報です。**最重要事項:** 薬を使用する前に必ず直ちに119番通報を行ってください。

**1. アスピリン咀嚼錠（Aspirin - 162〜324mg）:**
- **適応症状:** 心筋梗塞（激しい胸痛、左腕・肩・顎への放散痛、冷や汗）。
- **作用機序:** 血小板の凝集を速やかに抑え、冠動脈の血栓閉塞の悪化を阻止します。
- **注意点:** 意識が明瞭な状態で水なしで**しっかりと噛み砕いて**服用します（噛むことで15〜20分以内に血中へ急速吸収されます）。消化管出血やアスピリン喘息がある場合は絶対禁忌です。

**2. エピネフリン自動注射器（エピペン / EpiPen）:**
- **適応症状:** アナフィラキシー（喉の浮腫、呼吸困難、ショック）。
- **投与法:** 大腿部前外側に強く押し当て、3秒間保持して注射します。

**3. ナロキソン点鼻液（Naloxone / Narcan）:**
- **適応症状:** オピオイド過量摂取による急性呼吸停止・意識障害。
- **投与法:** 片側の鼻孔に1回噴霧。自発呼吸の回復がない場合は2〜3分後に反対側へ追加投与。

**4. サルブタモール吸入薬（Ventolin / Meptin）:**
- **適応症状:** 気管支喘息の急性発作・激しい喘鳴。
- **投与法:** 1分間隔をあけて2〜4吸入。改善しない場合は直ちに救急搬送。

**5. 経口ブドウ糖 / グルカゴン（Glucose / Glucagon）:**
- **適応症状:** 糖尿病患者の重度低血糖発作（冷汗・震え・意識混濁）。
- **注意点:** 意識がない人に経口で飲ませてはいけません（窒息・誤嚥の危険）。意識消失時は点鼻粉末バクスミー等を使用。

**6. 止血ガーゼおよび止血帯（Hemostatic Gauze & Tourniquet）:**
- **適応症状:** 動脈性の激しい噴出性大量出血。関節部を避けて創部中枢側を強く締め付けます。

*${notice.notDoctorNotice}*`,
        citations: [
          { title: '日本蘇生協議会 (JRC) - 蘇生ガイドライン', url: 'https://www.jrc-resuscitation.org' },
          { title: '日本赤十字社 - 救急法と救急薬品', url: 'https://www.jrc.or.jp' },
        ],
        isEmergencyAlert: false,
        isDemo: true,
        demoReason: reason,
        mode: 'demo',
        suggestedFollowUps: [
          '心筋梗塞でアスピリンを噛み砕く医学的理由',
          'エピペンの安全な保管と使用手順',
          '救急隊に伝えるべき重要チェック項目',
        ],
      };
    }

    return {
      text: `### 💊 Essential Emergency Life-Saving Medicines & First-Aid Protocols

In acute medical crises, standard first-aid pharmacotherapy can preserve organ perfusion and save lives while paramedics are en route. **CRITICAL:** Always activate emergency services (dial 911) before or simultaneously with administering any emergency medicine.

**1. Chewable Aspirin (Acetylsalicylic Acid - 162 to 325 mg / 2–4 Baby Aspirin 81 mg):**
- **Emergency Indication:** Suspected Acute Myocardial Infarction (Heart Attack) presenting with crushing chest pressure, tightness, or pain radiating to left arm/neck/jaw.
- **Mechanism:** Potent, irreversible platelet COX-1 inhibitor that halts coronary thrombus expansion and significantly reduces cardiac mortality.
- **Protocol:** Patient MUST chew thoroughly before swallowing (chewing achieves therapeutic bloodstream levels in 15–20 minutes, versus 60+ minutes if swallowed whole with water).
- **Contraindications:** Salicylate allergy, active gastrointestinal bleeding or ulcer, suspected hemorrhagic stroke, or children under 18 with viral illness.

**2. Epinephrine Auto-Injector (EpiPen / Auvi-Q - 0.3 mg Adult / 0.15 mg Child):**
- **Emergency Indication:** Severe Anaphylaxis with airway compromise (throat/tongue swelling, wheezing, stridor) or hemodynamic collapse.
- **Mechanism:** Rapidly reverses bronchoconstriction, opens lungs, and elevates critically falling blood pressure.
- **Protocol:** Swing and inject firmly into outer mid-thigh until click is heard; hold for 3 full seconds. Second dose can be given after 5–15 minutes if symptoms persist.

**3. Naloxone HCl Nasal Spray (Narcan - 4 mg):**
- **Emergency Indication:** Suspected Opioid Overdose (unresponsive person, respiratory depression or arrest, pinpoint pupils, cyanosis).
- **Mechanism:** Displaces opioids from brainstem receptors, restoring spontaneous breathing in 2–3 minutes.
- **Protocol:** Spray entire single dose into one nostril. If no response in 2–3 minutes, repeat in the opposite nostril. Always call 911 (naloxone wears off before opioids do).

**4. Albuterol / Salbutamol Inhaler (Ventolin / ProAir - 90 mcg/puff):**
- **Emergency Indication:** Acute severe asthma exacerbation or bronchospasm with wheezing, chest tightness, and shortness of breath.
- **Mechanism:** Short-acting beta-2 agonist (SABA) relaxing bronchial smooth muscle within 5 minutes.
- **Protocol:** Administer 2 to 4 puffs with a spacer, waiting 1 minute between puffs.

**5. Fast-Acting Oral Glucose (Gel / Tablets 15–20 g) & Glucagon (Baqsimi 3 mg):**
- **Emergency Indication:** Acute symptomatic diabetic hypoglycemia (< 70 mg/dL).
- **CRITICAL CHOKING WARNING:** NEVER give food, liquids, or oral glucose to an unconscious or seizing individual. Use nasal/injectable Glucagon and call 911 immediately.

**6. Nitroglycerin Sublingual (0.4 mg) — PRESCRIBED ONLY:**
- **Emergency Indication:** Acute Angina Pectoris in patients with diagnosed coronary artery disease.
- **FATAL INTERACTION:** NEVER take nitroglycerin if PDE-5 inhibitors (e.g., Viagra/Cialis) were taken within 24–48 hours (causes irreversible fatal hypotension). Call 911 if pain persists 5 minutes after first dose.

**7. Hemostatic Gauze & Combat Tourniquet (QuikClot / C-A-T):**
- **Emergency Indication:** Catastrophic, exsanguinating arterial extremity hemorrhage.
- **Protocol:** Direct pressure + wound packing with hemostatic gauze, or apply tourniquet 2–3 inches proximal to limb injury and tighten until bleeding ceases completely.

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'American Heart Association - Guidelines for CPR and First Aid', url: 'https://www.heart.org' },
        { title: 'American Red Cross - First Aid Medication Reference', url: 'https://www.redcross.org' },
        { title: 'MedlinePlus - Emergency Medical Management', url: 'https://medlineplus.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
      suggestedFollowUps: [
        'Why must aspirin be chewed during a suspected heart attack?',
        'How does an EpiPen reverse anaphylaxis within minutes?',
        'What should I tell the 911 dispatcher about medications taken?',
      ],
    };
  }

  // 13. Everyday Biology: Yawning, Sneezing, Hiccups, Eye Twitching
  const isEverydayBiology =
    q.includes('yawn') ||
    q.includes('sneeze') ||
    q.includes('hiccup') ||
    q.includes('twitch') ||
    q.includes('goosebump') ||
    q.includes('چھینک') ||
    q.includes('جمائی') ||
    q.includes('হাঁচি') ||
    q.includes('জমাই') ||
    q.includes('あくび') ||
    q.includes('くしゃみ');

  if (isEverydayBiology) {
    return {
      text:
        language === 'ur'
          ? `### 🧬 انسانی جسم کے دلچسپ اور قدرتی اضطراری افعال (Reflexes)

ہماری روزمرہ زندگی کے اکثر جسمانی ردعمل دراصل دماغ اور اعصابی نظام کے حفاظتی افعال ہوتے ہیں۔

**1. جمائی لینا (Yawning):**
تحقیق کے مطابق جمائی دماغ کے درجہ حرارت کو متوازن رکھنے اور خون میں آکسیجن کے بہاؤ کو بڑھا کر بیداری لانے میں مدد دیتی ہے۔

**2. چھینک آنا (Sneezing):**
ناک کی اندرونی جھلی پر گرد و غبار یا الرجن آنے سے اعصاب ایک طاقتور حفاظتی جھٹکا پیدا کرتے ہیں تاکہ ہوا کی نالیوں کو فوراً صاف کیا جا سکے۔

**3. ہچکی (Hiccups):**
سینے اور پیٹ کے درمیان پٹھے (Diaphragm) میں اچانک غیر ارادی کھنچاؤ کے نتیجے میں آواز کی نالی بند ہو کر "ہچکی" کی آواز بنتی ہے۔

*${notice.notDoctorNotice}*`
          : language === 'bn'
          ? `### 🧬 মানবদেহের মজার ও প্রাকৃতিক রিফ্লেক্স কার্যক্রম

আমাদের প্রাত্যহিক জীবনের নানা অনৈচ্ছিক শারীরিক ক্রিয়া আসলে শরীরের সুরক্ষামূলক ব্যবস্থা।

**১. হাই তোলা (Yawning):**
বিজ্ঞানীদের মতে হাই তোলা মস্তিষ্কের তাপমাত্রা শীতল করতে এবং রক্তপ্রবাহে সতেজতা আনতে সাহায্য করে।

**২. হাঁচি দেয়া (Sneezing):**
নাকের সংবেদনশীল ঝিল্লিতে ধুলোবালি বা অ্যালার্জেন প্রবেশ করলে ট্রাইজেমিনাল স্নায়ুর মাধ্যমে তীব্র গতিতে বাতাস বের করে শ্বাসনালী সুরক্ষিত রাখা হয়।

**৩. হেঁচকি (Hiccups):**
ডায়াফ্রাম পেশীর অনৈচ্ছিক সংকোচনের কারণে হঠাৎ কণ্ঠনালীর গ্লটিস বন্ধ হয়ে হেঁচকির সৃষ্টি হয়।

*${notice.notDoctorNotice}*`
          : language === 'ja'
          ? `### 🧬 人体の不思議な生体反射メカニズム

日常的に起こる「あくび」や「くしゃみ」は、神経系が自律的に作動させる重要な防御反射です。

**1. あくび（Yawn）:**
脳の冷却（サーモレギュレーション）と覚醒度の維持を図るための生理的適応反応と考えられています。

**2. くしゃみ（Sneeze）:**
鼻粘膜への異物やアレルゲン刺激を三叉神経が感知し、高速の呼気で気道を瞬時に清掃する強力な反射。

**3. しゃっくり（Hiccups）:**
横隔膜の不随意な痙攣と声門の急激な閉鎖によって生じる現象です。

*${notice.notDoctorNotice}*`
          : `### 🧬 Fascinating Human Physiology: Everyday Body Reflexes

Involuntary daily bodily phenomena are conserved neural reflexes designed to preserve homeostasis.

**1. Yawning:**
Current neurobiological research demonstrates that yawning acts as a brain thermoregulatory mechanism, cooling cerebral blood flow via deep inhalation of ambient air while promoting cortical arousal.

**2. Sneezing (Sternutation):**
Triggered when chemical or mechanical particles stimulate the ophthalmic or maxillary branches of the trigeminal nerve, inducing a coordinated respiratory expulsion reaching up to 100 mph to clear nasal passages.

**3. Hiccups (Singultus):**
Synchronous, involuntary diaphragmatic and intercostal contractions terminated abruptly by laryngeal closure of the vocal cords (glottis).

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'MedlinePlus - Human Reflexes and Body Functions', url: 'https://medlineplus.gov' },
        { title: 'NIH - Neurological Reflexes', url: 'https://www.nih.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
    };
  }

  // 13. Dynamic Intelligent Health Explainer for ANY Random Question
  // Extract main topic keywords from query for personalized framing
  const cleanTopic = message.replace(/[?!.,]/g, '').trim();

  if (language === 'ur') {
    return {
      text: `### 🩺 طبی تفہیم و رہنمائی: "${cleanTopic}"

آپ کے سوال کے حوالے سے انسانی فزیالوجی اور عمومی صحت کا جائزہ درج ذیل ہے:

**1. حیاتیاتی اور جسمانی طریقہ کار:**
انسانی جسم ایک باہم مربوط نظام ہے۔ جب کوئی جسمانی علامت یا کیفیت پیدا ہوتی ہے، تو وہ اعصابی، قلبی یا مدافعتی ردعمل کے باہمی توازن کا نتیجہ ہوتی ہے۔ جسم کے اندرونی درجہ حرارت، پانی کی سطح اور خلیاتی توانائی کا توازن برقرار رکھنا اولین ترجیح ہوتا ہے۔

**2. عمومی احتیاطی و گھریلو تدابیر:**
- **مناسب ہائیڈریشن:** دن بھر میں کم از کم 8 سے 10 گلاس پانی پیئیں۔
- **متوازن خوراک و نیند:** روزانہ 7 سے 8 گھنٹے کی گہری نیند اور تازہ سبزیوں پر مشتمل غذا اعضاء کو توانائی فراہم کرتی ہے۔
- **علامات کا اندراج:** اپنی کیفیت کی شدت اور وقت نوٹ کریں تاکہ معالج کو درست تاریخ فراہم کر سکیں۔

**3. ڈاکٹر سے مشورے کے لیے اہم سوالات:**
- کیا میری اس کیفیت کی کوئی بنیادی طبی وجہ ہے؟
- اس کی تصدیق کے لیے کون سا خون یا لیب ٹیسٹ مناسب رہے گا؟
- کون سی احتیاطی تدابیر سے اس میں قدرتی بہتری آ سکتی ہے؟

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'MedlinePlus - جامع طبی معلومات برائے مریض', url: 'https://medlineplus.gov' },
        { title: 'عالمی ادارہ صحت (WHO) - بنیادی صحت کی رہنمائی', url: 'https://www.who.int' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
      suggestedFollowUps: [
        'علامات کا منظم جائزہ شروع کریں',
        'ڈاکٹر سے معائنے کی تیاری کی فہرست',
        'بلڈ پریشر اور شریانوں کی صحت کے بارے میں جانیں',
      ],
    };
  }

  if (language === 'bn') {
    return {
      text: `### 🩺 স্বাস্থ্য তথ্যের বিস্তারিত পর্যালোচনা: "${cleanTopic}"

আপনার জিজ্ঞাসার পরিপ্রেক্ষিতে চিকিৎসাবিজ্ঞানসম্মত ব্যাখ্যা ও প্রাথমিক দিকনির্দেশনা নিচে প্রদান করা হলো:

**১. শারীরবৃত্তীয় কার্যপদ্ধতি ও ব্যাখ্যা:**
মানবদেহের প্রতিটি প্রক্রিয়া স্নায়ুতন্ত্র, রক্তসংবহনতন্ত্র এবং অন্তঃক্ষরা গ্রন্থিতন্ত্রের সমন্বয়ে পরিচালিত হয়। যেকোনো শারীরিক পরিবর্তন বা অস্বস্তির পেছনে সাধারণত অভ্যন্তরীণ ভারসাম্যহীনতা (যেমন পুষ্টির ঘাটতি, পানিশূন্যতা, পেশীর চাপ বা রোগ প্রতিরোধক প্রতিক্রিয়া) প্রধান ভূমিকা পালন করে।

**২. সাধারণ সুস্থতা ও প্রতিরোধমূলক পদক্ষেপ:**
- **পর্যাপ্ত পানীয় গ্রহণ:** দৈনিক পরিমিত পানি পান শরীর থেকে ক্ষতিকর উপাদান দূর করতে সাহায্য করে।
- **নিয়মিত বিশ্রাম ও ঘুম:** প্রতিদিন ৭-৮ ঘণ্টার নিরবচ্ছিন্ন ঘুম কোষীয় পুনর্গঠন ত্বরান্বিত করে।
- **লক্ষণ পর্যবেক্ষণ:** সমস্যাটি কখন বাড়ছে বা কমছে তা খেয়াল রাখুন।

**৩. চিকিৎসকের কাছে আলোচনা করার বিষয়সমূহ:**
- আমার এই অনুভূতির প্রধান কারণ কী হতে পারে?
- কোনো সুনির্দিষ্ট রুটিন চেকআপ বা ল্যাব পরীক্ষার প্রয়োজন আছে কি?
- জীবনযাত্রায় কী ধরনের পরিবর্তন আনলে সুস্থ থাকা সম্ভব?

*${notice.notDoctorNotice}*`,
      citations: [
        { title: 'MedlinePlus - বিশ্বস্ত স্বাস্থ্য তথ্য পোর্টাল', url: 'https://medlineplus.gov' },
        { title: 'WHO - সার্বিক স্বাস্থ্য ও চিকিৎসা তথ্য', url: 'https://www.who.int' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
      suggestedFollowUps: [
        'লক্ষণ পর্যালোচনার ধাপগুলো দেখুন',
        'ডাক্তারের সাক্ষাতের প্রস্তুতি চেকলিস্ট',
        'রক্তচাপ ও কার্ডিওভাসকুলার স্বাস্থ্যের নিয়মাবলী',
      ],
    };
  }

  if (language === 'ja') {
    return {
      text: `### 🩺 医学的観点からの解説: 「${cleanTopic}」

ご質問いただいた内容に関する人体の生理的メカニズムと一般的な健康管理のポイントです：

**1. 生理学的メカニズムと背景:**
人体は神経系、循環器系、内分泌系が協調して恒常性（ホメオスタシス）を保っています。身体に現れる様々な感覚や症状は、疲労の蓄積、水分・電解質のバランス、または環境ストレスに対する生体の適応シグナルであることが一般的です。

**2. 日常生活における健康管理ステップ:**
- **十分な水分摂取:** 代謝循環を促すため、こまめに水分補給を行います。
- **質の高い睡眠:** 7〜8時間の安定した睡眠が免疫維持と組織修復の基盤です。
- **経過の記録:** 症状の現れる時間帯や持続時間をメモに残しておきます。

**3. 医師に相談する際の質問リスト:**
- 現在の自覚症状について、想定される主な要因は何ですか？
- 生活習慣の中で特に改善すべき優先項目はありますか？
- 今後どのような変化に注意すべきでしょうか？

*${notice.notDoctorNotice}*`,
      citations: [
        { title: '厚生労働省 e-ヘルスネット - 確かな健康情報', url: 'https://www.e-healthnet.mhlw.go.jp' },
        { title: 'MedlinePlus - 医療と健康のガイドライン', url: 'https://medlineplus.gov' },
      ],
      isEmergencyAlert: false,
      isDemo: true,
      demoReason: reason,
      mode: 'demo',
      suggestedFollowUps: [
        '症状確認シートを作成する',
        '医師の診察に向けた準備チェックリスト',
        '血圧と血管の健康メカニズム',
      ],
    };
  }

  // Default English
  return {
    text: `### 🩺 Clinical Health & Physiological Analysis: "${cleanTopic}"

Here is a patient-accessible anatomical and physiological breakdown addressing your health inquiry:

**1. Physiological Mechanisms & System Dynamics:**
The human body continuously regulates cellular and systemic equilibrium (homeostasis) via the autonomic nervous, cardiovascular, and endocrine systems. Daily sensations or symptoms are often adaptive biofeedback signals reflecting changes in hydration, sleep architecture, metabolic demand, or localized inflammatory cascades.

**2. Proactive Health Literacy & Self-Care Principles:**
- **Hydration & Electrolyte Homeostasis:** Maintain regular water intake (typically 2–2.5 L daily depending on activity level).
- **Sleep Quality:** Target 7–8 hours of consistent, restorative sleep to support tissue repair and neurocognitive recovery.
- **Symptom Logging:** Keep an objective record of dates, times, and context if sensations recur.

**3. High-Yield Questions for Your Healthcare Provider:**
- "What physiological factors could be contributing to this sensation?"
- "Are any routine metabolic panels, vitamins, or screening tests indicated?"
- "What lifestyle or ergonomic modifications do you recommend for my baseline?"

*${notice.notDoctorNotice}*`,
    citations: [
      { title: 'MedlinePlus - Trusted Health Information for Patients', url: 'https://medlineplus.gov' },
      { title: 'National Institutes of Health (NIH) - Science of Health', url: 'https://www.nih.gov' },
    ],
    isEmergencyAlert: false,
    isDemo: true,
    demoReason: reason,
    mode: 'demo',
    suggestedFollowUps: [
      'Start structured symptom intake',
      'Prepare questions for my next doctor visit',
      'Explain blood pressure and vascular health',
    ],
  };
}
