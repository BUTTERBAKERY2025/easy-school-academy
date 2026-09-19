import type { LessonLibrary } from "./index";

export const britishLessons: LessonLibrary = {
  /* ---------------------------------------- Year 1 · blending sounds (phonics) */
  "british-g1-english-reading-1": {
    durationMinutes: 15,
    free: true,
    objectives: [
      { ar: "أن يدمج الطالب أصوات الحروف لتكوين كلمة.", en: "Blend letter sounds together to read a word." },
      { ar: "أن يقرأ كلمات من ثلاثة أصوات (ص-ح-ص).", en: "Read three-sound (CVC) words." },
      { ar: "أن يميّز الصوت الأول والأخير في الكلمة.", en: "Hear the first and last sound in a word." },
    ],
    blocks: [
      {
        kind: "concept",
        id: "c1",
        title: { ar: "الدمج: نلصق الأصوات معًا", en: "Blending: push the sounds together" },
        body: {
          ar: "كل حرف له صوت. عندما نقول الأصوات بسرعة ونلصقها معًا نحصل على الكلمة. مثال: c – a – t تصبح «cat». لا نقول أسماء الحروف بل أصواتها.",
          en: "Each letter has a sound. When we say the sounds quickly and push them together we get the word. For example c – a – t becomes 'cat'. We say the sounds, not the letter names.",
        },
        visual: {
          type: "steps",
          items: [
            { ar: "c", en: "c" },
            { ar: "a", en: "a" },
            { ar: "t", en: "t" },
            { ar: "cat 🐱", en: "cat 🐱" },
          ],
        },
      },
      {
        kind: "example",
        id: "e1",
        title: { ar: "نقرأ كلمة معًا: s – u – n", en: "Let's read one together: s – u – n" },
        steps: [
          { ar: "قل الصوت الأول: /s/.", en: "Say the first sound: /s/." },
          { ar: "أضف الصوت الأوسط: /u/.", en: "Add the middle sound: /u/." },
          { ar: "أضف الصوت الأخير: /n/.", en: "Add the last sound: /n/." },
          { ar: "الآن قلها بسرعة: sun ☀️", en: "Now say it fast: sun ☀️" },
        ],
      },
      {
        kind: "flashcards",
        id: "f1",
        title: { ar: "بطاقات الدمج", en: "Blending cards" },
        cards: [
          { id: "fc1", front: { ar: "m – a – p", en: "m – a – p" }, back: { ar: "map 🗺️ خريطة", en: "map 🗺️" } },
          { id: "fc2", front: { ar: "b – e – d", en: "b – e – d" }, back: { ar: "bed 🛏️ سرير", en: "bed 🛏️" } },
          { id: "fc3", front: { ar: "p – i – g", en: "p – i – g" }, back: { ar: "pig 🐷 خنزير", en: "pig 🐷" } },
          { id: "fc4", front: { ar: "d – o – g", en: "d – o – g" }, back: { ar: "dog 🐶 كلب", en: "dog 🐶" } },
        ],
      },
      {
        kind: "mcq",
        id: "q1",
        prompt: { ar: "ادمج الأصوات: h – a – t. ما الكلمة؟", en: "Blend the sounds: h – a – t. What is the word?" },
        choices: [
          { id: "a", label: { ar: "hat 🎩", en: "hat 🎩" } },
          { id: "b", label: { ar: "hot 🔥", en: "hot 🔥" } },
          { id: "c", label: { ar: "hit", en: "hit" } },
        ],
        correctId: "a",
        hint: { ar: "الصوت الأوسط هو /a/.", en: "The middle sound is /a/." },
        explanation: { ar: "h + a + t تُقرأ «hat».", en: "h + a + t blends to 'hat'." },
      },
      {
        kind: "match",
        id: "q2",
        prompt: { ar: "وصّل كل مجموعة أصوات بالكلمة الصحيحة.", en: "Match each set of sounds to the right word." },
        pairs: [
          { id: "p1", left: { ar: "c – u – p", en: "c – u – p" }, right: { ar: "cup 🥤", en: "cup 🥤" } },
          { id: "p2", left: { ar: "b – u – s", en: "b – u – s" }, right: { ar: "bus 🚌", en: "bus 🚌" } },
          { id: "p3", left: { ar: "f – i – sh", en: "f – i – sh" }, right: { ar: "fish 🐟", en: "fish 🐟" } },
        ],
        explanation: {
          ar: "انطق الأصوات بترتيبها ثم ألصقها بسرعة لتظهر الكلمة.",
          en: "Say the sounds in order, then push them together quickly to hear the word.",
        },
      },
      {
        kind: "mcq",
        id: "q3",
        prompt: { ar: "ما الصوت الأخير في كلمة «dog»؟", en: "What is the last sound in the word 'dog'?" },
        choices: [
          { id: "a", label: { ar: "/d/", en: "/d/" } },
          { id: "b", label: { ar: "/o/", en: "/o/" } },
          { id: "c", label: { ar: "/g/", en: "/g/" } },
        ],
        correctId: "c",
        explanation: { ar: "نقول d – o – g، وآخر صوت ننطقه هو /g/.", en: "We say d – o – g, and the final sound is /g/." },
      },
      {
        kind: "summary",
        id: "s1",
        title: { ar: "خلاصة الدرس", en: "Lesson summary" },
        points: [
          { ar: "ننطق صوت كل حرف، لا اسمه.", en: "We say each letter's sound, not its name." },
          { ar: "نلصق الأصوات بسرعة لنسمع الكلمة.", en: "We push the sounds together quickly to hear the word." },
        ],
      },
    ],
  },

  /* -------------------------------------------- Year 3 · equivalent fractions */
  "british-g3-maths-fractions-2": {
    durationMinutes: 20,
    free: true,
    objectives: [
      { ar: "أن يتعرّف الطالب على الكسور المتكافئة.", en: "Recognise equivalent fractions." },
      { ar: "أن ينشئ كسرًا مكافئًا بالضرب أو القسمة في العدد نفسه.", en: "Make an equivalent fraction by multiplying or dividing by the same number." },
      { ar: "أن يبسّط كسرًا إلى أبسط صورة.", en: "Simplify a fraction to its simplest form." },
    ],
    blocks: [
      {
        kind: "concept",
        id: "c1",
        title: { ar: "الكسور المتكافئة: اسم مختلف لنفس المقدار", en: "Equivalent fractions: a different name for the same amount" },
        body: {
          ar: "1/2 و2/4 و4/8 كلها تعني النصف نفسه. الفرق أن الكل قُسّم إلى قطع أصغر وأكثر، لكن المقدار المأخوذ بقي كما هو.",
          en: "1/2, 2/4 and 4/8 all mean the same half. The whole has just been cut into more, smaller pieces, but the amount taken has not changed.",
        },
        visual: { type: "fraction", numerator: 4, denominator: 8, caption: { ar: "4/8 تساوي 1/2 تمامًا", en: "4/8 is exactly the same as 1/2" } },
      },
      {
        kind: "callout",
        id: "t1",
        tone: "tip",
        title: { ar: "اضرب أو اقسم الطرفين", en: "Multiply or divide both parts" },
        body: {
          ar: "لتحصل على كسر مكافئ اضرب البسط والمقام في العدد نفسه، أو اقسمهما على العدد نفسه. الشرط: العدد نفسه للطرفين.",
          en: "To make an equivalent fraction, multiply the numerator and denominator by the same number, or divide both by the same number. The key word is 'same'.",
        },
      },
      {
        kind: "example",
        id: "e1",
        title: { ar: "مثال محلول: أوجد كسرًا مكافئًا لـ 2/3", en: "Worked example: find a fraction equivalent to 2/3" },
        steps: [
          { ar: "نختار عددًا، ليكن 4.", en: "Choose a number, say 4." },
          { ar: "نضرب البسط: 2 × 4 = 8.", en: "Multiply the numerator: 2 × 4 = 8." },
          { ar: "نضرب المقام في العدد نفسه: 3 × 4 = 12.", en: "Multiply the denominator by the same number: 3 × 4 = 12." },
          { ar: "إذن 2/3 = 8/12.", en: "So 2/3 = 8/12." },
        ],
      },
      {
        kind: "mcq",
        id: "q1",
        prompt: { ar: "أي الكسور التالية يكافئ 3/4؟", en: "Which fraction is equivalent to 3/4?" },
        choices: [
          { id: "a", label: { ar: "6/8", en: "6/8" } },
          { id: "b", label: { ar: "4/5", en: "4/5" } },
          { id: "c", label: { ar: "3/8", en: "3/8" } },
          { id: "d", label: { ar: "6/4", en: "6/4" } },
        ],
        correctId: "a",
        hint: { ar: "جرّب أن تضرب البسط والمقام في 2.", en: "Try multiplying the top and bottom by 2." },
        explanation: { ar: "3 × 2 = 6 و 4 × 2 = 8، إذن 3/4 = 6/8.", en: "3 × 2 = 6 and 4 × 2 = 8, so 3/4 = 6/8." },
      },
      {
        kind: "fill",
        id: "q2",
        prompt: { ar: "أكمل الكسر المكافئ.", en: "Complete the equivalent fraction." },
        text: { ar: "1/5 = {{1}}/15", en: "1/5 = {{1}}/15" },
        blanks: [{ id: "b1", answers: ["3"] }],
        explanation: {
          ar: "المقام ضُرب في 3 (5 × 3 = 15)، فنضرب البسط في 3 أيضًا: 1 × 3 = 3.",
          en: "The denominator was multiplied by 3 (5 × 3 = 15), so multiply the numerator by 3 too: 1 × 3 = 3.",
        },
      },
      {
        kind: "sort",
        id: "q3",
        prompt: { ar: "صنّف كل كسر: هل يساوي 1/2 أم 1/3؟", en: "Sort each fraction: does it equal 1/2 or 1/3?" },
        buckets: [
          { id: "half", label: { ar: "يساوي 1/2", en: "Equals 1/2" } },
          { id: "third", label: { ar: "يساوي 1/3", en: "Equals 1/3" } },
        ],
        items: [
          { id: "i1", label: { ar: "3/6", en: "3/6" }, bucketId: "half" },
          { id: "i2", label: { ar: "2/6", en: "2/6" }, bucketId: "third" },
          { id: "i3", label: { ar: "5/10", en: "5/10" }, bucketId: "half" },
          { id: "i4", label: { ar: "4/12", en: "4/12" }, bucketId: "third" },
        ],
        explanation: {
          ar: "اقسم البسط والمقام على العامل المشترك: 3/6 ÷ 3 = 1/2، و4/12 ÷ 4 = 1/3.",
          en: "Divide top and bottom by a common factor: 3/6 ÷ 3 = 1/2, and 4/12 ÷ 4 = 1/3.",
        },
      },
      {
        kind: "truefalse",
        id: "q4",
        statement: { ar: "لتبسيط كسر نطرح العدد نفسه من البسط والمقام.", en: "To simplify a fraction we subtract the same number from the top and the bottom." },
        answer: false,
        explanation: {
          ar: "نقسم، لا نطرح. 4/6 ÷ 2 = 2/3 صحيحة، أما 4−2 / 6−2 = 2/4 فهي مقدار مختلف.",
          en: "We divide, not subtract. 4/6 ÷ 2 = 2/3 is right, but 4−2 over 6−2 gives 2/4, a different amount.",
        },
      },
      {
        kind: "summary",
        id: "s1",
        title: { ar: "خلاصة الدرس", en: "Lesson summary" },
        points: [
          { ar: "الكسور المتكافئة تمثل المقدار نفسه بأسماء مختلفة.", en: "Equivalent fractions are the same amount with different names." },
          { ar: "اضرب أو اقسم البسط والمقام في العدد نفسه.", en: "Multiply or divide the numerator and denominator by the same number." },
          { ar: "أبسط صورة تعني ألا يبقى عامل مشترك غير الواحد.", en: "Simplest form means no common factor except 1 is left." },
        ],
      },
    ],
  },

  /* ---------------------------------- Year 6 · Tudors and the Elizabethan age */
  "british-g6-humanities-britain-1": {
    durationMinutes: 25,
    free: true,
    objectives: [
      { ar: "أن يرتّب ملوك أسرة تيودور زمنيًا.", en: "Place the Tudor monarchs in chronological order." },
      { ar: "أن يشرح أثر الانفصال عن الكنيسة الكاثوليكية.", en: "Explain the effect of the break with the Catholic Church." },
      { ar: "أن يستخدم أدلة من المصادر لتقويم العصر الإليزابيثي.", en: "Use source evidence to judge the Elizabethan age." },
    ],
    blocks: [
      {
        kind: "concept",
        id: "c1",
        title: { ar: "من هم آل تيودور؟", en: "Who were the Tudors?" },
        body: {
          ar: "حكمت أسرة تيودور إنجلترا بين عامي 1485 و1603، أي نحو 118 عامًا. بدأت بهنري السابع بعد انتصاره في معركة بوسورث، وانتهت بوفاة إليزابيث الأولى. في هذه الفترة تغيّرت ديانة البلاد أكثر من مرة، واتسع أسطولها، وازدهر مسرحها.",
          en: "The Tudor family ruled England from 1485 to 1603, about 118 years. It began with Henry VII after his victory at the Battle of Bosworth and ended when Elizabeth I died. In that time the country's religion changed more than once, its navy grew, and its theatre flourished.",
        },
        visual: {
          type: "table",
          headers: [
            { ar: "الملك", en: "Monarch" },
            { ar: "سنوات الحكم", en: "Reign" },
            { ar: "أشهر ما ارتبط به", en: "Best known for" },
          ],
          rows: [
            [{ ar: "هنري السابع", en: "Henry VII" }, { ar: "1485–1509", en: "1485–1509" }, { ar: "إنهاء حرب الوردتين", en: "Ending the Wars of the Roses" }],
            [{ ar: "هنري الثامن", en: "Henry VIII" }, { ar: "1509–1547", en: "1509–1547" }, { ar: "الانفصال عن روما وزوجاته الست", en: "The break with Rome and his six wives" }],
            [{ ar: "إدوارد السادس", en: "Edward VI" }, { ar: "1547–1553", en: "1547–1553" }, { ar: "ترسيخ البروتستانتية", en: "Strengthening Protestantism" }],
            [{ ar: "ماري الأولى", en: "Mary I" }, { ar: "1553–1558", en: "1553–1558" }, { ar: "إعادة الكاثوليكية", en: "Restoring Catholicism" }],
            [{ ar: "إليزابيث الأولى", en: "Elizabeth I" }, { ar: "1558–1603", en: "1558–1603" }, { ar: "هزيمة الأرمادا وازدهار المسرح", en: "Defeating the Armada and the golden age of theatre" }],
          ],
        },
      },
      {
        kind: "concept",
        id: "c2",
        title: { ar: "الانفصال عن روما وأثره", en: "The break with Rome and what it changed" },
        body: {
          ar: "أراد هنري الثامن الطلاق من كاثرين الأراغونية، ورفض البابا. فأعلن هنري نفسه رئيسًا للكنيسة في إنجلترا عام 1534، وأغلق الأديرة وصادر أراضيها. لم يكن القرار دينيًا فحسب: فقد أصبح الملك أغنى وأقوى، وفقد كثير من الفقراء ما كانت الأديرة تقدّمه لهم من طعام ورعاية.",
          en: "Henry VIII wanted to divorce Catherine of Aragon and the Pope refused. In 1534 Henry declared himself head of the Church in England, closed the monasteries and seized their land. The decision was not only religious: the king became far richer and more powerful, while many poor people lost the food and care the monasteries had provided.",
        },
      },
      {
        kind: "order",
        id: "q1",
        prompt: { ar: "رتّب هذه الأحداث زمنيًا من الأقدم إلى الأحدث.", en: "Put these events in chronological order, earliest first." },
        items: [
          { id: "o1", label: { ar: "معركة بوسورث وبداية حكم آل تيودور (1485)", en: "The Battle of Bosworth begins Tudor rule (1485)" } },
          { id: "o2", label: { ar: "هنري الثامن يصبح رئيسًا لكنيسة إنجلترا (1534)", en: "Henry VIII becomes head of the Church of England (1534)" } },
          { id: "o3", label: { ar: "تولّي إليزابيث الأولى العرش (1558)", en: "Elizabeth I comes to the throne (1558)" } },
          { id: "o4", label: { ar: "هزيمة الأرمادا الإسبانية (1588)", en: "The defeat of the Spanish Armada (1588)" } },
          { id: "o5", label: { ar: "وفاة إليزابيث ونهاية حكم آل تيودور (1603)", en: "Elizabeth dies and Tudor rule ends (1603)" } },
        ],
        explanation: {
          ar: "التسلسل الزمني هو أساس فهم التاريخ: كل حدث يفسّر ما بعده.",
          en: "Chronology is the backbone of history: each event helps explain the next.",
        },
      },
      {
        kind: "mcq",
        id: "q2",
        prompt: {
          ar: "ما السبب المباشر لانفصال هنري الثامن عن الكنيسة الكاثوليكية؟",
          en: "What was the immediate reason for Henry VIII's break with the Catholic Church?",
        },
        choices: [
          { id: "a", label: { ar: "رفض البابا الموافقة على طلاقه.", en: "The Pope refused to allow his divorce." } },
          { id: "b", label: { ar: "هزيمة الأسطول الإنجليزي.", en: "The English fleet had been defeated." } },
          { id: "c", label: { ar: "طلب البرلمان ذلك.", en: "Parliament demanded it." } },
        ],
        correctId: "a",
        explanation: {
          ar: "الشرارة كانت رفض البابا الموافقة على الطلاق، وإن كانت هناك دوافع أخرى للمال والسلطة.",
          en: "The trigger was the Pope's refusal of the divorce, though money and power were motives as well.",
        },
      },
      {
        kind: "multi",
        id: "q3",
        prompt: { ar: "أي مما يلي من نتائج إغلاق الأديرة؟ اختر كل الصحيح.", en: "Which of these followed the closure of the monasteries? Choose all that apply." },
        choices: [
          { id: "a", label: { ar: "ازدادت ثروة التاج الإنجليزي.", en: "The Crown became wealthier." } },
          { id: "b", label: { ar: "فقد الفقراء مصدر رعاية وطعام.", en: "The poor lost a source of food and care." } },
          { id: "c", label: { ar: "انتقلت عاصمة إنجلترا إلى يورك.", en: "England's capital moved to York." } },
          { id: "d", label: { ar: "بيعت أراضٍ واسعة لنبلاء موالين للملك.", en: "Large estates were sold to nobles loyal to the king." } },
        ],
        correctIds: ["a", "b", "d"],
        explanation: {
          ar: "الإغلاق نقل الثروة والأرض إلى التاج وحلفائه، وأضرّ بالفقراء. أما العاصمة فبقيت لندن.",
          en: "The closures moved wealth and land to the Crown and its allies and hurt the poor. The capital remained London.",
        },
      },
      {
        kind: "truefalse",
        id: "q4",
        statement: {
          ar: "يسمّي المؤرخون العصر الإليزابيثي «عصرًا ذهبيًا» لأن كل الناس عاشوا فيه برخاء.",
          en: "Historians call the Elizabethan age a 'golden age' because everyone lived in prosperity.",
        },
        answer: false,
        explanation: {
          ar: "التسمية تعود لازدهار المسرح والاستكشاف والفن، لكن الفقر والمجاعات والأوبئة كانت واسعة الانتشار. المؤرخ يوازن بين الأدلة.",
          en: "The name comes from the flowering of theatre, exploration and the arts, but poverty, hunger and plague were widespread. A historian weighs all the evidence.",
        },
      },
      {
        kind: "summary",
        id: "s1",
        title: { ar: "خلاصة الدرس", en: "Lesson summary" },
        points: [
          { ar: "حكم آل تيودور إنجلترا 1485–1603.", en: "The Tudors ruled England from 1485 to 1603." },
          { ar: "انفصال هنري الثامن عن روما غيّر الدين والسلطة والثروة معًا.", en: "Henry VIII's break with Rome changed religion, power and wealth together." },
          { ar: "«العصر الذهبي» وصف يحتاج إلى دليل، لا يُقبل كما هو.", en: "'Golden age' is a claim that needs evidence, not a fact to accept as given." },
        ],
      },
    ],
  },
};
