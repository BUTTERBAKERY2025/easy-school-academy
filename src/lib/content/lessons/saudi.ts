import type { LessonLibrary } from "./index";

export const saudiLessons: LessonLibrary = {
  /* ------------------------------------ الصف الأول · الوضوء وصفته (الفقه) */
  "saudi-g1-islamic-fiqh-1": {
    durationMinutes: 16,
    free: true,
    objectives: [
      { ar: "أن يذكر الطالب فرائض الوضوء بالترتيب.", en: "List the obligatory acts of wudu in order." },
      { ar: "أن يؤدي الوضوء عمليًا أداءً صحيحًا.", en: "Perform wudu correctly in practice." },
      { ar: "أن يعرف نواقض الوضوء المشهورة.", en: "Know the well-known things that break wudu." },
    ],
    blocks: [
      {
        kind: "concept",
        id: "c1",
        title: { ar: "لماذا نتوضأ؟", en: "Why do we make wudu?" },
        body: {
          ar: "الوضوء طهارة نتهيأ بها للصلاة. قال الله تعالى: ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ﴾. فالآية ذكرت لنا أعضاء الوضوء وترتيبها.",
          en: "Wudu is the purification we prepare with before prayer. Allah says: 'O you who believe, when you rise for prayer, wash your faces and your hands to the elbows, wipe your heads and wash your feet to the ankles.' The verse names the limbs of wudu and their order.",
        },
        visual: { type: "figure", glyph: "💧", caption: { ar: "الطهارة مفتاح الصلاة", en: "Purity is the key to prayer" } },
      },
      {
        kind: "example",
        id: "e1",
        title: { ar: "صفة الوضوء خطوة بخطوة", en: "How to perform wudu, step by step" },
        steps: [
          { ar: "أنوي الوضوء بقلبي، وأقول: بسم الله.", en: "Make the intention in your heart and say: Bismillah." },
          { ar: "أغسل كفّي ثلاث مرات.", en: "Wash your hands three times." },
          { ar: "أتمضمض وأستنشق ثلاثًا.", en: "Rinse your mouth and nose three times." },
          { ar: "أغسل وجهي ثلاث مرات.", en: "Wash your face three times." },
          { ar: "أغسل يديّ إلى المرفقين، اليمنى ثم اليسرى.", en: "Wash your arms to the elbows, right then left." },
          { ar: "أمسح رأسي مرة واحدة، وأمسح أذنيّ.", en: "Wipe your head once, and wipe your ears." },
          { ar: "أغسل رجليّ إلى الكعبين، اليمنى ثم اليسرى.", en: "Wash your feet to the ankles, right then left." },
        ],
      },
      {
        kind: "order",
        id: "q1",
        prompt: { ar: "رتّب خطوات الوضوء بالترتيب الصحيح.", en: "Put the steps of wudu in the correct order." },
        items: [
          { id: "o1", label: { ar: "النية والتسمية", en: "Intention and saying Bismillah" } },
          { id: "o2", label: { ar: "غسل الكفين", en: "Washing the hands" } },
          { id: "o3", label: { ar: "المضمضة والاستنشاق", en: "Rinsing the mouth and nose" } },
          { id: "o4", label: { ar: "غسل الوجه", en: "Washing the face" } },
          { id: "o5", label: { ar: "غسل اليدين إلى المرفقين", en: "Washing the arms to the elbows" } },
          { id: "o6", label: { ar: "مسح الرأس", en: "Wiping the head" } },
          { id: "o7", label: { ar: "غسل الرجلين إلى الكعبين", en: "Washing the feet to the ankles" } },
        ],
        explanation: {
          ar: "هذا هو الترتيب الذي ورد في الآية وفي فعل النبي صلى الله عليه وسلم.",
          en: "This is the order given in the verse and in the Prophet's practice ﷺ.",
        },
      },
      {
        kind: "mcq",
        id: "q2",
        prompt: { ar: "إلى أين نغسل اليد في الوضوء؟", en: "How far do we wash the arm in wudu?" },
        choices: [
          { id: "a", label: { ar: "إلى الرسغ فقط", en: "To the wrist only" } },
          { id: "b", label: { ar: "إلى المرفق", en: "To the elbow" } },
          { id: "c", label: { ar: "إلى الكتف", en: "To the shoulder" } },
        ],
        correctId: "b",
        hint: { ar: "تذكّر لفظ الآية: «إلى المرافق».", en: "Remember the wording of the verse: 'to the elbows'." },
        explanation: { ar: "قال تعالى: ﴿وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ﴾، فيدخل المرفق في الغسل.", en: "The verse says 'and your hands to the elbows', and the elbow itself is included." },
      },
      {
        kind: "sort",
        id: "q3",
        prompt: { ar: "صنّف: هل ينقض الوضوء أم لا ينقضه؟", en: "Sort: does it break wudu or not?" },
        buckets: [
          { id: "breaks", label: { ar: "ينقض الوضوء", en: "Breaks wudu" } },
          { id: "keeps", label: { ar: "لا ينقض الوضوء", en: "Does not break wudu" } },
        ],
        items: [
          { id: "i1", label: { ar: "الخارج من السبيلين", en: "Relieving oneself" }, bucketId: "breaks" },
          { id: "i2", label: { ar: "النوم العميق", en: "Deep sleep" }, bucketId: "breaks" },
          { id: "i3", label: { ar: "شرب الماء", en: "Drinking water" }, bucketId: "keeps" },
          { id: "i4", label: { ar: "قراءة القرآن", en: "Reciting the Qur'an" }, bucketId: "keeps" },
          { id: "i5", label: { ar: "الضحك في الصلاة", en: "Laughing during prayer" }, bucketId: "keeps" },
        ],
        explanation: {
          ar: "من نواقض الوضوء المشهورة: الخارج من السبيلين وزوال العقل بالنوم العميق. أما الأكل والشرب وقراءة القرآن فلا تنقضه.",
          en: "The well-known things that break wudu include relieving oneself and losing awareness through deep sleep. Eating, drinking and reciting the Qur'an do not.",
        },
      },
      {
        kind: "truefalse",
        id: "q4",
        statement: { ar: "الترتيب بين أعضاء الوضوء غير مهم.", en: "The order of the limbs in wudu does not matter." },
        answer: false,
        explanation: {
          ar: "الترتيب من فرائض الوضوء عند جمهور أهل العلم، لأن الآية ذكرت الأعضاء مرتبة.",
          en: "Most scholars hold that the order is obligatory, because the verse lists the limbs in sequence.",
        },
      },
      {
        kind: "summary",
        id: "s1",
        title: { ar: "خلاصة الدرس", en: "Lesson summary" },
        points: [
          { ar: "الوضوء طهارة للصلاة وأعضاؤه في آية المائدة.", en: "Wudu purifies us for prayer, and its limbs are named in the Qur'an." },
          { ar: "الترتيب: الوجه، فاليدان إلى المرفقين، فمسح الرأس، فالرجلان.", en: "The order is face, arms to the elbows, wiping the head, then the feet." },
          { ar: "ينتقض الوضوء بالخارج من السبيلين وبالنوم العميق.", en: "Wudu is broken by relieving oneself and by deep sleep." },
        ],
      },
    ],
  },

  /* ------------------------------ الصف الرابع · جمع وطرح الكسور المتشابهة */
  "saudi-g4-math-fractions-1": {
    durationMinutes: 22,
    free: true,
    objectives: [
      { ar: "أن يجمع الطالب كسرين متشابهي المقام.", en: "Add two fractions with the same denominator." },
      { ar: "أن يطرح كسرين متشابهي المقام.", en: "Subtract two fractions with the same denominator." },
      { ar: "أن يحل مسألة حياتية على الكسور.", en: "Solve a real-life problem involving fractions." },
    ],
    blocks: [
      {
        kind: "concept",
        id: "c1",
        title: { ar: "الكسور المتشابهة هي التي تتساوى مقاماتها", en: "Like fractions share the same denominator" },
        body: {
          ar: "الكسران 2/7 و3/7 متشابهان لأن المقام في كليهما 7، أي أن الكل قُسّم إلى سبع قطع متساوية. وما دامت القطع بالحجم نفسه فجمعها سهل: نعدّ القطع فقط.",
          en: "The fractions 2/7 and 3/7 are alike because both have denominator 7, meaning the whole was cut into seven equal pieces. Since the pieces are the same size, adding them is simply counting pieces.",
        },
        visual: { type: "fraction", numerator: 5, denominator: 7, caption: { ar: "2/7 + 3/7 = 5/7", en: "2/7 + 3/7 = 5/7" } },
      },
      {
        kind: "callout",
        id: "t1",
        tone: "tip",
        title: { ar: "القاعدة", en: "The rule" },
        body: {
          ar: "أ/م + ب/م = (أ + ب)/م، و أ/م − ب/م = (أ − ب)/م. المقام لا يتغيّر أبدًا في هذه العملية.",
          en: "a/d + b/d = (a + b)/d and a/d − b/d = (a − b)/d. The denominator never changes here.",
        },
      },
      {
        kind: "example",
        id: "e1",
        title: { ar: "مثال محلول: 5/9 − 2/9", en: "Worked example: 5/9 − 2/9" },
        steps: [
          { ar: "المقامان متساويان: 9 و9.", en: "The denominators match: 9 and 9." },
          { ar: "نطرح البسطين: 5 − 2 = 3.", en: "Subtract the numerators: 5 − 2 = 3." },
          { ar: "نبقي المقام: 9.", en: "Keep the denominator: 9." },
          { ar: "الناتج 3/9، ويمكن تبسيطه إلى 1/3.", en: "The answer is 3/9, which simplifies to 1/3." },
        ],
      },
      {
        kind: "mcq",
        id: "q1",
        prompt: { ar: "ما ناتج 4/11 + 5/11؟", en: "What is 4/11 + 5/11?" },
        choices: [
          { id: "a", label: { ar: "9/22", en: "9/22" } },
          { id: "b", label: { ar: "9/11", en: "9/11" } },
          { id: "c", label: { ar: "20/11", en: "20/11" } },
        ],
        correctId: "b",
        hint: { ar: "المقام يبقى كما هو.", en: "The denominator stays the same." },
        explanation: { ar: "4 + 5 = 9 والمقام 11، فالناتج 9/11.", en: "4 + 5 = 9 with denominator 11, so the answer is 9/11." },
      },
      {
        kind: "fill",
        id: "q2",
        prompt: { ar: "أكمل الفراغين.", en: "Fill in both blanks." },
        text: { ar: "7/12 − 3/12 = {{1}}/{{2}}", en: "7/12 − 3/12 = {{1}}/{{2}}" },
        blanks: [
          { id: "b1", answers: ["4"] },
          { id: "b2", answers: ["12"] },
        ],
        explanation: { ar: "7 − 3 = 4، والمقام يبقى 12، فالناتج 4/12 = 1/3.", en: "7 − 3 = 4 and the denominator stays 12, giving 4/12 = 1/3." },
      },
      {
        kind: "mcq",
        id: "q3",
        prompt: {
          ar: "قرأ خالد 3/10 من الكتاب يوم السبت، و4/10 يوم الأحد. كم قرأ من الكتاب؟",
          en: "Khalid read 3/10 of a book on Saturday and 4/10 on Sunday. How much of the book has he read?",
        },
        choices: [
          { id: "a", label: { ar: "7/10", en: "7/10" } },
          { id: "b", label: { ar: "7/20", en: "7/20" } },
          { id: "c", label: { ar: "1/10", en: "1/10" } },
        ],
        correctId: "a",
        explanation: {
          ar: "الكتاب نفسه مقسّم إلى 10 أجزاء: 3 + 4 = 7، فقرأ 7/10 وبقي له 3/10.",
          en: "The same book is in 10 parts: 3 + 4 = 7, so he has read 7/10 and 3/10 remains.",
        },
      },
      {
        kind: "truefalse",
        id: "q4",
        statement: { ar: "عند جمع 2/6 + 3/6 نجمع المقامين فيصبح 5/12.", en: "When adding 2/6 + 3/6 we add the denominators to get 5/12." },
        answer: false,
        explanation: {
          ar: "خطأ شائع. المقام يبقى 6 لأن حجم القطعة لم يتغيّر، فالناتج 5/6.",
          en: "A common mistake. The denominator stays 6 because the size of the piece has not changed, so the answer is 5/6.",
        },
      },
      {
        kind: "summary",
        id: "s1",
        title: { ar: "خلاصة الدرس", en: "Lesson summary" },
        points: [
          { ar: "المتشابهة = المقامات متساوية.", en: "Like fractions have equal denominators." },
          { ar: "نجمع أو نطرح البسط فقط.", en: "Add or subtract only the numerators." },
          { ar: "نبسّط الناتج إذا أمكن.", en: "Simplify the result where possible." },
        ],
      },
    ],
  },

  /* ---------------------------------- الصف الرابع · أنواع النصوص (لغتي) */
  "saudi-g4-arabic-qiraa-1": {
    durationMinutes: 20,
    free: true,
    objectives: [
      { ar: "أن يميّز الطالب بين النص القصصي والمقالي والخبري.", en: "Tell narrative, article and news texts apart." },
      { ar: "أن يستدل على نوع النص بعلامات واضحة فيه.", en: "Use clear signals in a text to identify its type." },
      { ar: "أن يحدد هدف الكاتب من كل نوع.", en: "State the writer's purpose for each type." },
    ],
    blocks: [
      {
        kind: "concept",
        id: "c1",
        title: { ar: "لكل نص هدف وشكل", en: "Every text has a purpose and a shape" },
        body: {
          ar: "النص القصصي يروي حكاية فيها شخصيات وأحداث وزمان ومكان، وهدفه المتعة والعبرة. والنص المقالي يعرض رأي الكاتب وأدلته، وهدفه الإقناع. والنص الخبري ينقل معلومة وقعت فعلًا، وهدفه الإخبار، ويجيب عن: من؟ ماذا؟ متى؟ أين؟",
          en: "A narrative tells a story with characters, events, a time and a place, and aims to entertain and teach. An article presents the writer's opinion and evidence, and aims to persuade. A news text reports something that actually happened, aiming to inform, and answers who, what, when and where.",
        },
      },
      {
        kind: "vocab",
        id: "v1",
        title: { ar: "علامات تدل على نوع النص", en: "Signals that reveal the text type" },
        terms: [
          { term: { ar: "النص القصصي", en: "Narrative" }, meaning: { ar: "كلمات مثل: كان يا ما كان، ثم، وفي اليوم التالي، وأخيرًا.", en: "Words like: once upon a time, then, the next day, at last." } },
          { term: { ar: "النص المقالي", en: "Article" }, meaning: { ar: "عبارات مثل: أرى أن، ولذلك، والدليل على ذلك، وفي رأيي.", en: "Phrases like: I believe, therefore, the evidence for this, in my view." } },
          { term: { ar: "النص الخبري", en: "News report" }, meaning: { ar: "تاريخ ومكان وأسماء ومصدر: أعلنت، وذكرت الوكالة، أمس في الرياض.", en: "Dates, places, names and a source: announced, the agency reported, yesterday in Riyadh." } },
        ],
      },
      {
        kind: "concept",
        id: "c2",
        title: { ar: "اقرأ المقاطع الثلاثة", en: "Read the three passages" },
        body: {
          ar: "1) في صباح مشمس، خرج سعد إلى المزرعة فوجد عشًّا صغيرًا سقط من الشجرة، فحمله بحذر وأعاده إلى مكانه.\n\n2) أرى أن قراءة عشر دقائق يوميًا تغيّر حياة الطالب؛ فالدليل أن من يقرأ يوميًا تزداد حصيلته اللغوية ويتحسّن تعبيره.\n\n3) أعلنت أمانة منطقة الرياض أمس افتتاح حديقة جديدة في حي النرجس تضم مسارات للمشي وملاعب للأطفال.",
          en: "1) On a sunny morning, Saad went out to the farm and found a small nest fallen from a tree, so he carefully picked it up and put it back.\n\n2) I believe ten minutes of reading a day changes a student's life; the evidence is that daily readers build vocabulary and express themselves better.\n\n3) The Riyadh municipality announced yesterday the opening of a new park in Al-Narjis district with walking tracks and children's playgrounds.",
        },
      },
      {
        kind: "match",
        id: "q1",
        prompt: { ar: "وصّل كل مقطع بنوعه.", en: "Match each passage to its type." },
        pairs: [
          { id: "p1", left: { ar: "المقطع 1: سعد والعش", en: "Passage 1: Saad and the nest" }, right: { ar: "نص قصصي", en: "Narrative" } },
          { id: "p2", left: { ar: "المقطع 2: القراءة اليومية", en: "Passage 2: Reading daily" }, right: { ar: "نص مقالي", en: "Article" } },
          { id: "p3", left: { ar: "المقطع 3: افتتاح الحديقة", en: "Passage 3: The park opening" }, right: { ar: "نص خبري", en: "News report" } },
        ],
        explanation: {
          ar: "الأول فيه شخصية وأحداث، والثاني فيه «أرى أن» و«الدليل»، والثالث فيه جهة رسمية وزمان ومكان.",
          en: "The first has a character and events, the second has 'I believe' and 'the evidence', and the third names an official body, a time and a place.",
        },
      },
      {
        kind: "mcq",
        id: "q2",
        prompt: { ar: "ما هدف الكاتب في المقطع الثاني؟", en: "What is the writer's purpose in passage 2?" },
        choices: [
          { id: "a", label: { ar: "أن يسلّي القارئ بحكاية.", en: "To entertain with a story." } },
          { id: "b", label: { ar: "أن يقنع القارئ بعادة القراءة اليومية.", en: "To persuade the reader to read daily." } },
          { id: "c", label: { ar: "أن ينقل خبرًا رسميًا.", en: "To report official news." } },
        ],
        correctId: "b",
        explanation: {
          ar: "قال «أرى أن» ثم ساق دليلًا، وهذا أسلوب الإقناع في النص المقالي.",
          en: "He says 'I believe' and then gives evidence — the persuasive method of an article.",
        },
      },
      {
        kind: "sort",
        id: "q3",
        prompt: { ar: "صنّف كل عبارة تحت النوع الذي تدل عليه.", en: "Sort each phrase under the type it signals." },
        buckets: [
          { id: "story", label: { ar: "قصصي", en: "Narrative" } },
          { id: "essay", label: { ar: "مقالي", en: "Article" } },
          { id: "news", label: { ar: "خبري", en: "News" } },
        ],
        items: [
          { id: "i1", label: { ar: "«وفي اليوم التالي…»", en: "'The next day…'" }, bucketId: "story" },
          { id: "i2", label: { ar: "«والدليل على ذلك…»", en: "'The evidence for this is…'" }, bucketId: "essay" },
          { id: "i3", label: { ar: "«أعلنت الوزارة أمس…»", en: "'The ministry announced yesterday…'" }, bucketId: "news" },
          { id: "i4", label: { ar: "«كان يا ما كان…»", en: "'Once upon a time…'" }, bucketId: "story" },
          { id: "i5", label: { ar: "«أرى أن الحل هو…»", en: "'In my view the solution is…'" }, bucketId: "essay" },
        ],
        explanation: {
          ar: "روابط الزمن تدل على السرد، وألفاظ الرأي والدليل تدل على المقال، وذكر الجهة والتاريخ يدل على الخبر.",
          en: "Time connectives signal narrative, opinion and evidence words signal an article, and naming a body and a date signals news.",
        },
      },
      {
        kind: "summary",
        id: "s1",
        title: { ar: "خلاصة الدرس", en: "Lesson summary" },
        points: [
          { ar: "القصصي يروي، والمقالي يقنع، والخبري يخبر.", en: "Narratives tell, articles persuade, news reports inform." },
          { ar: "نستدل على النوع من ألفاظ النص نفسه.", en: "We identify the type from the words in the text itself." },
        ],
      },
    ],
  },

  /* ------------------------ الصف الرابع · توحيد المملكة (الاجتماعيات) */
  "saudi-g4-social-watan-2": {
    durationMinutes: 22,
    free: true,
    objectives: [
      { ar: "أن يذكر الطالب تاريخ استعادة الرياض وتاريخ توحيد المملكة.", en: "State the dates of the recapture of Riyadh and the unification of the Kingdom." },
      { ar: "أن يرتّب مراحل التوحيد زمنيًا.", en: "Order the stages of unification chronologically." },
      { ar: "أن يستنتج أثر التوحيد على حياة الناس.", en: "Infer the effect of unification on people's lives." },
    ],
    blocks: [
      {
        kind: "concept",
        id: "c1",
        title: { ar: "رحلة بدأت باسترداد الرياض", en: "A journey that began with the recapture of Riyadh" },
        body: {
          ar: "في الخامس من شوال 1319هـ (يناير 1902م) استعاد الملك عبدالعزيز بن عبدالرحمن آل سعود مدينة الرياض ومعه رجال قليلون. ومن الرياض بدأت رحلة امتدت نحو ثلاثين عامًا ضمّت خلالها مناطق نجد والأحساء وعسير والحجاز، حتى صدر المرسوم الملكي بتسمية البلاد «المملكة العربية السعودية» في 21 جمادى الأولى 1351هـ الموافق 23 سبتمبر 1932م.",
          en: "On 5 Shawwal 1319 AH (January 1902) King Abdulaziz bin Abdulrahman Al Saud retook the city of Riyadh with a small band of men. From Riyadh began a journey of some thirty years that brought in Najd, Al-Ahsa, Asir and the Hijaz, until the royal decree naming the country 'the Kingdom of Saudi Arabia' was issued on 21 Jumada al-Ula 1351 AH, 23 September 1932.",
        },
        visual: {
          type: "table",
          headers: [
            { ar: "الحدث", en: "Event" },
            { ar: "السنة الهجرية", en: "Hijri year" },
            { ar: "السنة الميلادية", en: "Gregorian year" },
          ],
          rows: [
            [{ ar: "استعادة الرياض", en: "Recapture of Riyadh" }, { ar: "1319هـ", en: "1319 AH" }, { ar: "1902م", en: "1902" }],
            [{ ar: "ضم الأحساء", en: "Al-Ahsa joins" }, { ar: "1331هـ", en: "1331 AH" }, { ar: "1913م", en: "1913" }],
            [{ ar: "ضم الحجاز", en: "The Hijaz joins" }, { ar: "1343هـ", en: "1343 AH" }, { ar: "1925م", en: "1925" }],
            [{ ar: "إعلان المملكة العربية السعودية", en: "The Kingdom is proclaimed" }, { ar: "1351هـ", en: "1351 AH" }, { ar: "1932م", en: "1932" }],
          ],
        },
      },
      {
        kind: "concept",
        id: "c2",
        title: { ar: "ماذا تغيّر بعد التوحيد؟", en: "What changed after unification?" },
        body: {
          ar: "قبل التوحيد كانت الطرق غير آمنة والقبائل متفرقة والأنظمة مختلفة من منطقة لأخرى. بعد التوحيد صار للبلاد نظام واحد وأمن على الطرق وعملة موحدة، ثم بدأت مشاريع التعليم والصحة والنقل تنتظم تحت دولة واحدة.\n\nومن هنا نفهم أن التوحيد لم يكن ضمّ أرض فحسب، بل بناء دولة.",
          en: "Before unification the roads were unsafe, the tribes were divided and rules differed from region to region. Afterwards the country had one system of government, safe roads and a single currency, and schools, health services and transport began to develop under one state.\n\nUnification was not only the joining of land; it was the building of a state.",
        },
      },
      {
        kind: "order",
        id: "q1",
        prompt: { ar: "رتّب مراحل التوحيد من الأقدم إلى الأحدث.", en: "Order the stages of unification, earliest first." },
        items: [
          { id: "o1", label: { ar: "استعادة الرياض 1319هـ", en: "Recapture of Riyadh, 1319 AH" } },
          { id: "o2", label: { ar: "ضم الأحساء 1331هـ", en: "Al-Ahsa joins, 1331 AH" } },
          { id: "o3", label: { ar: "ضم الحجاز 1343هـ", en: "The Hijaz joins, 1343 AH" } },
          { id: "o4", label: { ar: "إعلان المملكة العربية السعودية 1351هـ", en: "The Kingdom is proclaimed, 1351 AH" } },
        ],
        explanation: { ar: "بدأ التوحيد من الرياض واستمر ثلاثين عامًا حتى الإعلان.", en: "Unification began in Riyadh and continued for thirty years until the proclamation." },
      },
      {
        kind: "mcq",
        id: "q2",
        prompt: { ar: "في أي عام أُعلنت تسمية «المملكة العربية السعودية»؟", en: "In which year was the name 'Kingdom of Saudi Arabia' proclaimed?" },
        choices: [
          { id: "a", label: { ar: "1902م", en: "1902" } },
          { id: "b", label: { ar: "1925م", en: "1925" } },
          { id: "c", label: { ar: "1932م", en: "1932" } },
        ],
        correctId: "c",
        hint: { ar: "اليوم الوطني يوافق 23 سبتمبر من ذلك العام.", en: "The National Day falls on 23 September of that year." },
        explanation: { ar: "صدر المرسوم في 1351هـ الموافق 1932م، ويُحتفل به في اليوم الوطني.", en: "The decree was issued in 1351 AH / 1932, celebrated each year as National Day." },
      },
      {
        kind: "multi",
        id: "q3",
        prompt: { ar: "أي مما يلي من آثار التوحيد؟ اختر كل الصحيح.", en: "Which of these resulted from unification? Choose all that apply." },
        choices: [
          { id: "a", label: { ar: "الأمن على الطرق", en: "Safety on the roads" } },
          { id: "b", label: { ar: "نظام واحد للدولة", en: "One system of government" } },
          { id: "c", label: { ar: "تعدد العملات بين المناطق", en: "Different currencies in each region" } },
          { id: "d", label: { ar: "انتظام التعليم والخدمات", en: "Organised education and services" } },
        ],
        correctIds: ["a", "b", "d"],
        explanation: {
          ar: "التوحيد وحّد العملة ولم يعدّدها، وأتاح الأمن والنظام وانتظام الخدمات.",
          en: "Unification produced a single currency, not several, along with security, order and organised services.",
        },
      },
      {
        kind: "summary",
        id: "s1",
        title: { ar: "خلاصة الدرس", en: "Lesson summary" },
        points: [
          { ar: "بدأ التوحيد باستعادة الرياض 1319هـ / 1902م.", en: "Unification began with the recapture of Riyadh in 1319 AH / 1902." },
          { ar: "أُعلنت المملكة العربية السعودية 1351هـ / 1932م.", en: "The Kingdom of Saudi Arabia was proclaimed in 1351 AH / 1932." },
          { ar: "التوحيد بناء دولة لا ضمّ أرض فقط.", en: "Unification built a state, not merely joined territory." },
        ],
      },
    ],
  },

  /* -------------------------------- الأول المتوسط · الخلية وعضياتها (علوم) */
  "saudi-g7-science-life-1": {
    durationMinutes: 26,
    free: true,
    objectives: [
      { ar: "أن يصف الطالب تركيب الخلية الحيوانية والنباتية.", en: "Describe the structure of animal and plant cells." },
      { ar: "أن يربط كل عضيّ بوظيفته.", en: "Link each organelle to its function." },
      { ar: "أن يوازن بين الخلية النباتية والحيوانية.", en: "Compare plant and animal cells." },
    ],
    blocks: [
      {
        kind: "concept",
        id: "c1",
        title: { ar: "الخلية وحدة بناء الكائن الحي", en: "The cell is the building block of life" },
        body: {
          ar: "كل كائن حي مكوّن من خلية واحدة أو من ملايين الخلايا. والخلية ليست كيسًا فارغًا، بل مصنع منظّم فيه أقسام صغيرة تسمى العضيّات، لكل عضيّ وظيفة محددة، تمامًا كأقسام المصنع.",
          en: "Every living thing is made of one cell or of millions. A cell is not an empty bag but an organised factory: inside it are small compartments called organelles, each with its own job, exactly like departments in a factory.",
        },
        visual: { type: "figure", glyph: "🔬", caption: { ar: "لا نرى الخلية إلا بالمجهر", en: "A cell is only visible through a microscope" } },
      },
      {
        kind: "vocab",
        id: "v1",
        title: { ar: "العضيّات ووظائفها", en: "Organelles and their jobs" },
        terms: [
          { term: { ar: "النواة", en: "Nucleus" }, meaning: { ar: "مركز التحكم، تحوي المادة الوراثية DNA وتوجّه عمل الخلية.", en: "The control centre: it holds the DNA and directs the cell's work." } },
          { term: { ar: "الغشاء البلازمي", en: "Cell membrane" }, meaning: { ar: "يحيط بالخلية وينظّم دخول المواد وخروجها.", en: "Surrounds the cell and controls what enters and leaves." } },
          { term: { ar: "السيتوبلازم", en: "Cytoplasm" }, meaning: { ar: "سائل هلامي تسبح فيه العضيّات وتحدث فيه تفاعلات كثيرة.", en: "A jelly-like fluid where the organelles sit and many reactions happen." } },
          { term: { ar: "الميتوكوندريا", en: "Mitochondria" }, meaning: { ar: "محطة الطاقة: تحرر الطاقة من الغذاء بالتنفس الخلوي.", en: "The power station: it releases energy from food through respiration." } },
          { term: { ar: "البلاستيدات الخضراء", en: "Chloroplasts" }, meaning: { ar: "توجد في الخلية النباتية فقط وفيها يحدث البناء الضوئي.", en: "Found only in plant cells; this is where photosynthesis happens." } },
          { term: { ar: "الجدار الخلوي", en: "Cell wall" }, meaning: { ar: "غلاف صلب من السليلوز يدعم الخلية النباتية ويعطيها شكلها.", en: "A rigid cellulose layer that supports a plant cell and gives it shape." } },
        ],
      },
      {
        kind: "match",
        id: "q1",
        prompt: { ar: "وصّل كل عضيّ بوظيفته.", en: "Match each organelle to its function." },
        pairs: [
          { id: "p1", left: { ar: "النواة", en: "Nucleus" }, right: { ar: "تحفظ المادة الوراثية وتوجّه الخلية", en: "Holds the genetic material and directs the cell" } },
          { id: "p2", left: { ar: "الميتوكوندريا", en: "Mitochondria" }, right: { ar: "تحرر الطاقة من الغذاء", en: "Releases energy from food" } },
          { id: "p3", left: { ar: "الغشاء البلازمي", en: "Cell membrane" }, right: { ar: "ينظّم دخول المواد وخروجها", en: "Controls what enters and leaves" } },
          { id: "p4", left: { ar: "البلاستيدة الخضراء", en: "Chloroplast" }, right: { ar: "تقوم بالبناء الضوئي", en: "Carries out photosynthesis" } },
        ],
        explanation: {
          ar: "كل عضيّ متخصص، وتكامل العضيّات هو ما يبقي الخلية حية.",
          en: "Each organelle is specialised, and it is their teamwork that keeps the cell alive.",
        },
      },
      {
        kind: "sort",
        id: "q2",
        prompt: { ar: "صنّف كل تركيب: هل يوجد في الخلية النباتية فقط، أم في كليهما؟", en: "Sort each structure: plant cells only, or both cell types?" },
        buckets: [
          { id: "plant", label: { ar: "الخلية النباتية فقط", en: "Plant cells only" } },
          { id: "both", label: { ar: "في الاثنتين", en: "Both" } },
        ],
        items: [
          { id: "i1", label: { ar: "الجدار الخلوي", en: "Cell wall" }, bucketId: "plant" },
          { id: "i2", label: { ar: "البلاستيدات الخضراء", en: "Chloroplasts" }, bucketId: "plant" },
          { id: "i3", label: { ar: "النواة", en: "Nucleus" }, bucketId: "both" },
          { id: "i4", label: { ar: "الميتوكوندريا", en: "Mitochondria" }, bucketId: "both" },
          { id: "i5", label: { ar: "الفجوة العصارية الكبيرة", en: "Large central vacuole" }, bucketId: "plant" },
          { id: "i6", label: { ar: "الغشاء البلازمي", en: "Cell membrane" }, bucketId: "both" },
        ],
        explanation: {
          ar: "الجدار الخلوي والبلاستيدات والفجوة الكبيرة من مميزات الخلية النباتية، أما النواة والميتوكوندريا والغشاء فتوجد في الاثنتين.",
          en: "Cell wall, chloroplasts and the large vacuole are plant features, while nucleus, mitochondria and membrane are in both.",
        },
      },
      {
        kind: "mcq",
        id: "q3",
        prompt: {
          ar: "خلية عضلية تحتاج طاقة كبيرة. أي عضيّ تتوقع أن يكون عدده كبيرًا فيها؟",
          en: "A muscle cell needs a great deal of energy. Which organelle would you expect it to have many of?",
        },
        choices: [
          { id: "a", label: { ar: "النواة", en: "Nuclei" } },
          { id: "b", label: { ar: "الميتوكوندريا", en: "Mitochondria" } },
          { id: "c", label: { ar: "البلاستيدات الخضراء", en: "Chloroplasts" } },
        ],
        correctId: "b",
        hint: { ar: "أي عضيّ يحرر الطاقة؟", en: "Which organelle releases energy?" },
        explanation: {
          ar: "الميتوكوندريا تحرر الطاقة، ولذلك تكثر في الخلايا عالية النشاط كخلايا العضلات.",
          en: "Mitochondria release energy, so they are numerous in highly active cells such as muscle cells.",
        },
      },
      {
        kind: "fill",
        id: "q4",
        prompt: { ar: "أكمل الجملة العلمية.", en: "Complete the scientific sentence." },
        text: {
          ar: "يحيط بالخلية النباتية {{1}} صلب يمنحها شكلها الثابت، بينما تكتفي الخلية الحيوانية بالغشاء البلازمي.",
          en: "A plant cell is surrounded by a rigid cell {{1}} that gives it a fixed shape, while an animal cell has only a membrane.",
        },
        blanks: [{ id: "b1", answers: ["جدار", "الجدار", "جدار خلوي", "wall"] }],
        explanation: {
          ar: "الجدار الخلوي مكوّن من السليلوز، وهو سبب الشكل المنتظم للخلايا النباتية.",
          en: "The cell wall is made of cellulose and is why plant cells have such a regular shape.",
        },
      },
      {
        kind: "truefalse",
        id: "q5",
        statement: { ar: "كل خلية نباتية تحتوي بلاستيدات خضراء.", en: "Every plant cell contains chloroplasts." },
        answer: false,
        explanation: {
          ar: "خلايا الجذر مثلًا لا تحتوي بلاستيدات خضراء لأنها لا تتعرض للضوء، فالبناء الضوئي يحدث في الأجزاء الخضراء.",
          en: "Root cells, for instance, have no chloroplasts because they get no light; photosynthesis happens in the green parts.",
        },
      },
      {
        kind: "summary",
        id: "s1",
        title: { ar: "خلاصة الدرس", en: "Lesson summary" },
        points: [
          { ar: "الخلية وحدة بناء الكائن الحي ووظيفته.", en: "The cell is the unit of structure and function in living things." },
          { ar: "النواة مركز التحكم والميتوكوندريا محطة الطاقة.", en: "The nucleus is the control centre and mitochondria the power station." },
          { ar: "الجدار الخلوي والبلاستيدات والفجوة الكبيرة تميّز الخلية النباتية.", en: "Cell wall, chloroplasts and a large vacuole mark out the plant cell." },
        ],
      },
    ],
  },

  /* ------------------ الصف الخامس · Countable and uncountable nouns (EFL) */
  "saudi-g5-english-grammar-1": {
    durationMinutes: 18,
    free: true,
    objectives: [
      { ar: "أن يميّز الطالب بين الأسماء المعدودة وغير المعدودة.", en: "Tell countable and uncountable nouns apart." },
      { ar: "أن يستخدم many و much و some و any استخدامًا صحيحًا.", en: "Use many, much, some and any correctly." },
      { ar: "أن يسأل عن الكمية بصورة صحيحة.", en: "Ask about quantity correctly." },
    ],
    blocks: [
      {
        kind: "concept",
        id: "c1",
        title: { ar: "ما الفرق؟", en: "What is the difference?" },
        body: {
          ar: "الاسم المعدود (countable) نستطيع عدّه: one apple, two apples. وله مفرد وجمع. أما غير المعدود (uncountable) فلا نعدّه بالأرقام مباشرة: water, rice, money, information — ولا نضع له جمعًا بـ s، ونقيسه بوحدة: a glass of water.",
          en: "A countable noun can be counted: one apple, two apples. It has a singular and a plural. An uncountable noun cannot be counted directly — water, rice, money, information — takes no plural s, and is measured with a unit: a glass of water.",
        },
        visual: {
          type: "table",
          headers: [
            { ar: "معدود", en: "Countable" },
            { ar: "غير معدود", en: "Uncountable" },
          ],
          rows: [
            [{ ar: "book / books", en: "book / books" }, { ar: "water", en: "water" }],
            [{ ar: "apple / apples", en: "apple / apples" }, { ar: "rice", en: "rice" }],
            [{ ar: "chair / chairs", en: "chair / chairs" }, { ar: "money", en: "money" }],
            [{ ar: "idea / ideas", en: "idea / ideas" }, { ar: "information", en: "information" }],
          ],
        },
      },
      {
        kind: "callout",
        id: "t1",
        tone: "tip",
        title: { ar: "many أم much؟", en: "many or much?" },
        body: {
          ar: "نستخدم many مع المعدود: How many books? ونستخدم much مع غير المعدود: How much water? وأما a lot of فتصلح للنوعين.",
          en: "Use many with countables: How many books? Use much with uncountables: How much water? And a lot of works with both.",
        },
      },
      {
        kind: "mcq",
        id: "q1",
        prompt: { ar: "اختر الجملة الصحيحة.", en: "Choose the correct sentence." },
        choices: [
          { id: "a", label: { ar: "How much apples do you have?", en: "How much apples do you have?" } },
          { id: "b", label: { ar: "How many apples do you have?", en: "How many apples do you have?" } },
          { id: "c", label: { ar: "How many water do you have?", en: "How many water do you have?" } },
        ],
        correctId: "b",
        hint: { ar: "apples اسم معدود.", en: "'Apples' is countable." },
        explanation: { ar: "apples معدودة فنستخدم many معها.", en: "'Apples' is countable, so it takes many." },
      },
      {
        kind: "sort",
        id: "q2",
        prompt: { ar: "صنّف الكلمات: معدودة أم غير معدودة؟", en: "Sort the words: countable or uncountable?" },
        buckets: [
          { id: "count", label: { ar: "Countable معدود", en: "Countable" } },
          { id: "uncount", label: { ar: "Uncountable غير معدود", en: "Uncountable" } },
        ],
        items: [
          { id: "i1", label: { ar: "pencil", en: "pencil" }, bucketId: "count" },
          { id: "i2", label: { ar: "milk", en: "milk" }, bucketId: "uncount" },
          { id: "i3", label: { ar: "student", en: "student" }, bucketId: "count" },
          { id: "i4", label: { ar: "homework", en: "homework" }, bucketId: "uncount" },
          { id: "i5", label: { ar: "bottle", en: "bottle" }, bucketId: "count" },
          { id: "i6", label: { ar: "sugar", en: "sugar" }, bucketId: "uncount" },
        ],
        explanation: {
          ar: "ملاحظة مهمة: homework و information غير معدودتين في الإنجليزية وإن بدتا معدودتين بالعربية.",
          en: "Note: homework and information are uncountable in English even though they feel countable in Arabic.",
        },
      },
      {
        kind: "fill",
        id: "q3",
        prompt: { ar: "أكمل بـ many أو much.", en: "Complete with many or much." },
        text: { ar: "How {{1}} sugar do you want in your tea?", en: "How {{1}} sugar do you want in your tea?" },
        blanks: [{ id: "b1", answers: ["much"] }],
        explanation: { ar: "sugar غير معدود، فنستخدم much.", en: "'Sugar' is uncountable, so we use much." },
      },
      {
        kind: "match",
        id: "q4",
        prompt: { ar: "وصّل كل اسم غير معدود بوحدة قياسه المناسبة.", en: "Match each uncountable noun to a suitable unit." },
        pairs: [
          { id: "p1", left: { ar: "water", en: "water" }, right: { ar: "a glass of…", en: "a glass of…" } },
          { id: "p2", left: { ar: "bread", en: "bread" }, right: { ar: "a loaf of…", en: "a loaf of…" } },
          { id: "p3", left: { ar: "rice", en: "rice" }, right: { ar: "a bowl of…", en: "a bowl of…" } },
          { id: "p4", left: { ar: "paper", en: "paper" }, right: { ar: "a sheet of…", en: "a sheet of…" } },
        ],
        explanation: {
          ar: "الأسماء غير المعدودة تُقاس بوحدة، وهكذا نستطيع الحديث عن كمياتها.",
          en: "Uncountable nouns are measured with a unit, which is how we talk about their amounts.",
        },
      },
      {
        kind: "summary",
        id: "s1",
        title: { ar: "خلاصة الدرس", en: "Lesson summary" },
        points: [
          { ar: "المعدود له جمع، وغير المعدود لا جمع له.", en: "Countable nouns have plurals; uncountable nouns do not." },
          { ar: "many مع المعدود و much مع غير المعدود.", en: "many with countables, much with uncountables." },
          { ar: "نقيس غير المعدود بوحدة: a glass of water.", en: "Measure uncountables with a unit: a glass of water." },
        ],
      },
    ],
  },
};
