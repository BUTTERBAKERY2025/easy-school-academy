import type { LessonLibrary } from "./index";

export const americanLessons: LessonLibrary = {
  /* ------------------------------------------------ Kindergarten · counting */
  "american-g0-math-number-1": {
    durationMinutes: 12,
    free: true,
    objectives: [
      { ar: "أن يعدّ الطالب الأشياء حتى ١٠ عدًّا صحيحًا.", en: "Count objects up to 10 accurately." },
      { ar: "أن يربط العدد المنطوق بالرقم المكتوب.", en: "Match a spoken number to its written numeral." },
      { ar: "أن يعرف أن آخر عدد ينطقه هو عدد المجموعة كلها.", en: "Know the last number said tells how many there are." },
    ],
    blocks: [
      {
        kind: "concept",
        id: "c1",
        title: { ar: "نعدّ شيئًا واحدًا لكل عدد", en: "One number for each thing" },
        body: {
          ar: "عندما نعدّ، نلمس شيئًا واحدًا ونقول عددًا واحدًا: واحد، اثنان، ثلاثة… ولا نعدّ الشيء نفسه مرتين. آخر عدد نقوله يخبرنا كم شيئًا لدينا.",
          en: "When we count we touch one thing and say one number: one, two, three… We never count the same thing twice. The last number we say tells us how many there are.",
        },
        visual: {
          type: "array",
          rows: 1,
          cols: 5,
          glyph: "🍎",
          caption: { ar: "نعدّ التفاحات: ١، ٢، ٣، ٤، ٥. إذن لدينا ٥ تفاحات.", en: "Count the apples: 1, 2, 3, 4, 5. So there are 5 apples." },
        },
      },
      {
        kind: "example",
        id: "e1",
        title: { ar: "نعدّ معًا", en: "Let's count together" },
        steps: [
          { ar: "ضع إصبعك على أول نجمة وقل: واحد.", en: "Put your finger on the first star and say: one." },
          { ar: "انتقل للنجمة التالية وقل: اثنان.", en: "Move to the next star and say: two." },
          { ar: "أكمل حتى آخر نجمة: ثلاثة، أربعة، خمسة، ستة.", en: "Keep going to the last star: three, four, five, six." },
          { ar: "آخر عدد قلته هو ٦، إذن عدد النجوم ٦.", en: "The last number you said was 6, so there are 6 stars." },
        ],
        visual: { type: "array", rows: 2, cols: 3, glyph: "⭐" },
      },
      {
        kind: "mcq",
        id: "q1",
        prompt: { ar: "كم بالونة ترى؟", en: "How many balloons do you see?" },
        visual: { type: "array", rows: 1, cols: 4, glyph: "🎈" },
        choices: [
          { id: "a", label: { ar: "٣", en: "3" } },
          { id: "b", label: { ar: "٤", en: "4" } },
          { id: "c", label: { ar: "٥", en: "5" } },
        ],
        correctId: "b",
        hint: { ar: "المس كل بالونة وأنت تعدّ.", en: "Touch each balloon as you count." },
        explanation: {
          ar: "نعدّ: ١، ٢، ٣، ٤. آخر عدد قلناه هو ٤، إذن عدد البالونات ٤.",
          en: "We count 1, 2, 3, 4. The last number is 4, so there are 4 balloons.",
        },
      },
      {
        kind: "order",
        id: "q2",
        prompt: { ar: "رتّب الأعداد من الأصغر إلى الأكبر.", en: "Put the numbers in order from smallest to largest." },
        items: [
          { id: "n1", label: { ar: "١", en: "1" } },
          { id: "n2", label: { ar: "٢", en: "2" } },
          { id: "n3", label: { ar: "٣", en: "3" } },
          { id: "n4", label: { ar: "٤", en: "4" } },
          { id: "n5", label: { ar: "٥", en: "5" } },
        ],
        explanation: {
          ar: "هذا هو ترتيب العدّ الذي نستعمله كل يوم: ١، ٢، ٣، ٤، ٥.",
          en: "This is the counting order we use every day: 1, 2, 3, 4, 5.",
        },
      },
      {
        kind: "truefalse",
        id: "q3",
        statement: {
          ar: "إذا عددت نفس الدبدوب مرتين فسيكون العدد صحيحًا.",
          en: "If you count the same teddy twice, your total will still be right.",
        },
        answer: false,
        explanation: {
          ar: "لا. كل شيء يُعدّ مرة واحدة فقط، وإلا صار العدد أكبر من الحقيقة.",
          en: "No. Each object is counted once only, otherwise the total comes out too big.",
        },
      },
      {
        kind: "summary",
        id: "s1",
        title: { ar: "ماذا تعلّمنا؟", en: "What we learned" },
        points: [
          { ar: "نعدّ شيئًا واحدًا مع كل عدد.", en: "We say one number for each object." },
          { ar: "لا نعدّ الشيء الواحد مرتين.", en: "We never count an object twice." },
          { ar: "آخر عدد نقوله هو عدد المجموعة.", en: "The last number we say is how many there are." },
        ],
      },
    ],
  },

  /* ---------------------------------------- Grade 4 · adding like fractions */
  "american-g4-math-fractions-1": {
    durationMinutes: 22,
    free: true,
    objectives: [
      { ar: "أن يجمع ويطرح كسورًا لها المقام نفسه.", en: "Add and subtract fractions that share a denominator." },
      { ar: "أن يفسّر لماذا يبقى المقام كما هو.", en: "Explain why the denominator does not change." },
      { ar: "أن يحل مسألة كلامية على جمع الكسور.", en: "Solve a word problem involving adding fractions." },
    ],
    blocks: [
      {
        kind: "concept",
        id: "c1",
        title: { ar: "المقام يخبرنا بحجم القطعة", en: "The denominator tells us the size of the piece" },
        body: {
          ar: "في الكسر ٣/٨ المقام هو ٨، ويعني أن الكل قُسّم إلى ٨ قطع متساوية. والبسط ٣ يعني أننا أخذنا ٣ من تلك القطع. ما دام المقام واحدًا فالقطع كلها بالحجم نفسه، ولذلك نستطيع جمعها مباشرة.",
          en: "In the fraction 3/8 the denominator 8 says the whole was cut into 8 equal pieces, and the numerator 3 says we took 3 of them. As long as the denominator is the same, every piece is the same size, so we can simply add them.",
        },
        visual: { type: "fraction", numerator: 3, denominator: 8, caption: { ar: "٣ من ٨ قطع متساوية", en: "3 of 8 equal pieces" } },
      },
      {
        kind: "callout",
        id: "t1",
        tone: "tip",
        title: { ar: "القاعدة الذهبية", en: "The golden rule" },
        body: {
          ar: "اجمع البسط فقط، واترك المقام كما هو: أ/م + ب/م = (أ+ب)/م. المقام لم يتغير لأن حجم القطعة لم يتغير.",
          en: "Add the numerators only and keep the denominator: a/d + b/d = (a+b)/d. The denominator stays because the size of each piece has not changed.",
        },
      },
      {
        kind: "example",
        id: "e1",
        title: { ar: "مثال محلول: ٢/٥ + ١/٥", en: "Worked example: 2/5 + 1/5" },
        steps: [
          { ar: "المقامان متساويان (٥ و٥)، إذن نستطيع الجمع مباشرة.", en: "The denominators match (5 and 5), so we can add straight away." },
          { ar: "نجمع البسطين: ٢ + ١ = ٣.", en: "Add the numerators: 2 + 1 = 3." },
          { ar: "نترك المقام كما هو: ٥.", en: "Keep the denominator: 5." },
          { ar: "الناتج: ٣/٥.", en: "The answer is 3/5." },
        ],
        visual: { type: "fraction", numerator: 3, denominator: 5, caption: { ar: "٢/٥ ثم قطعة أخرى = ٣/٥", en: "2/5 plus one more piece makes 3/5" } },
      },
      {
        kind: "callout",
        id: "w1",
        tone: "warning",
        title: { ar: "الخطأ الأشهر", en: "The most common mistake" },
        body: {
          ar: "لا تجمع المقامات! ٢/٥ + ١/٥ ليست ٣/١٠. لو جمعت المقامات لكنت غيّرت حجم القطعة نفسها أثناء الحل.",
          en: "Do not add the denominators. 2/5 + 1/5 is not 3/10. Adding the denominators would change the size of the piece halfway through the problem.",
        },
      },
      {
        kind: "mcq",
        id: "q1",
        prompt: { ar: "ما ناتج ٣/٧ + ٢/٧؟", en: "What is 3/7 + 2/7?" },
        choices: [
          { id: "a", label: { ar: "٥/١٤", en: "5/14" } },
          { id: "b", label: { ar: "٥/٧", en: "5/7" } },
          { id: "c", label: { ar: "٦/٧", en: "6/7" } },
          { id: "d", label: { ar: "١/٧", en: "1/7" } },
        ],
        correctId: "b",
        hint: { ar: "اجمع البسطين فقط.", en: "Add only the numerators." },
        explanation: {
          ar: "٣ + ٢ = ٥ والمقام يبقى ٧، إذن الناتج ٥/٧.",
          en: "3 + 2 = 5 and the denominator stays 7, so the answer is 5/7.",
        },
      },
      {
        kind: "fill",
        id: "q2",
        prompt: { ar: "أكمل عملية الطرح.", en: "Complete the subtraction." },
        text: { ar: "٩/١٠ − ٤/١٠ = {{1}}/{{2}}", en: "9/10 − 4/10 = {{1}}/{{2}}" },
        blanks: [
          { id: "b1", answers: ["5", "٥"] },
          { id: "b2", answers: ["10", "١٠"] },
        ],
        explanation: {
          ar: "٩ − ٤ = ٥، والمقام يبقى ١٠، إذن الناتج ٥/١٠ (ويساوي نصفًا).",
          en: "9 − 4 = 5 and the denominator stays 10, so the answer is 5/10, which is one half.",
        },
      },
      {
        kind: "sort",
        id: "q3",
        prompt: {
          ar: "صنّف كل عملية: هل نستطيع جمعها مباشرة أم نحتاج لتوحيد المقامات؟",
          en: "Sort each calculation: can we add it straight away, or do we first need a common denominator?",
        },
        buckets: [
          { id: "direct", label: { ar: "نجمع مباشرة", en: "Add straight away" } },
          { id: "convert", label: { ar: "نحتاج توحيد المقامات", en: "Needs a common denominator" } },
        ],
        items: [
          { id: "i1", label: { ar: "١/٦ + ٤/٦", en: "1/6 + 4/6" }, bucketId: "direct" },
          { id: "i2", label: { ar: "١/٣ + ١/٤", en: "1/3 + 1/4" }, bucketId: "convert" },
          { id: "i3", label: { ar: "٥/٩ − ٢/٩", en: "5/9 − 2/9" }, bucketId: "direct" },
          { id: "i4", label: { ar: "٢/٥ + ١/٢", en: "2/5 + 1/2" }, bucketId: "convert" },
        ],
        explanation: {
          ar: "الجمع المباشر ممكن فقط عندما يكون المقامان متساويين، لأن القطع تكون بالحجم نفسه.",
          en: "Adding directly only works when the denominators match, because then the pieces are the same size.",
        },
      },
      {
        kind: "mcq",
        id: "q4",
        prompt: {
          ar: "أكلت سارة ٣/٨ من البيتزا، وأكل أخوها ٢/٨ منها. كم أكلا معًا؟",
          en: "Sara ate 3/8 of a pizza and her brother ate 2/8. How much did they eat together?",
        },
        choices: [
          { id: "a", label: { ar: "٥/٨ من البيتزا", en: "5/8 of the pizza" } },
          { id: "b", label: { ar: "٥/١٦ من البيتزا", en: "5/16 of the pizza" } },
          { id: "c", label: { ar: "١/٨ من البيتزا", en: "1/8 of the pizza" } },
        ],
        correctId: "a",
        explanation: {
          ar: "البيتزا نفسها مقسّمة إلى ٨ قطع، فنجمع البسطين: ٣ + ٢ = ٥، والناتج ٥/٨.",
          en: "The same pizza is cut into 8 pieces, so add the numerators: 3 + 2 = 5, giving 5/8.",
        },
      },
      {
        kind: "truefalse",
        id: "q5",
        statement: { ar: "٤/٩ + ٥/٩ يساوي واحدًا صحيحًا.", en: "4/9 + 5/9 equals one whole." },
        answer: true,
        explanation: {
          ar: "٤ + ٥ = ٩، والناتج ٩/٩، وأي كسر بسطه يساوي مقامه يساوي واحدًا صحيحًا.",
          en: "4 + 5 = 9, giving 9/9, and any fraction whose numerator equals its denominator is one whole.",
        },
      },
      {
        kind: "summary",
        id: "s1",
        title: { ar: "خلاصة الدرس", en: "Lesson summary" },
        points: [
          { ar: "المقام المشترك يعني أن القطع بالحجم نفسه.", en: "A shared denominator means the pieces are the same size." },
          { ar: "نجمع أو نطرح البسط فقط، والمقام يبقى كما هو.", en: "Add or subtract the numerators only; the denominator stays." },
          { ar: "إذا اختلف المقامان فلا بد من توحيدهما أولًا.", en: "If the denominators differ, make them the same first." },
        ],
      },
    ],
  },

  /* ------------------------------------------ Grade 5 · ecosystems & energy */
  "american-g5-science-life-2": {
    durationMinutes: 24,
    objectives: [
      { ar: "أن يتتبع انتقال الطاقة في سلسلة غذائية.", en: "Trace how energy moves along a food chain." },
      { ar: "أن يميّز بين المنتِج والمستهلك والمحلِّل.", en: "Tell producers, consumers and decomposers apart." },
      { ar: "أن يتوقع أثر اختفاء كائن على بقية النظام البيئي.", en: "Predict what happens to an ecosystem when one organism disappears." },
    ],
    blocks: [
      {
        kind: "concept",
        id: "c1",
        title: { ar: "كل طاقة في النظام البيئي بدأت من الشمس", en: "All the energy in an ecosystem starts at the Sun" },
        body: {
          ar: "النباتات تلتقط ضوء الشمس وتحوّله إلى غذاء مخزون. عندما يأكل حيوان نباتًا تنتقل جزء من هذه الطاقة إليه، وعندما يأكله حيوان آخر تنتقل مرة أخرى. لذلك نرسم السهم في السلسلة الغذائية في اتجاه انتقال الطاقة، لا في اتجاه الأكل.",
          en: "Plants capture sunlight and store it as food. When an animal eats a plant, some of that energy moves into the animal, and when something eats that animal it moves again. That is why the arrows in a food chain point the way the energy travels, not the way the eating happens.",
        },
        visual: {
          type: "steps",
          items: [
            { ar: "الشمس ☀️", en: "Sun ☀️" },
            { ar: "عشب 🌿 (منتِج)", en: "Grass 🌿 (producer)" },
            { ar: "أرنب 🐇 (مستهلك أول)", en: "Rabbit 🐇 (primary consumer)" },
            { ar: "ثعلب 🦊 (مستهلك ثانٍ)", en: "Fox 🦊 (secondary consumer)" },
          ],
          caption: { ar: "السهم يعني: الطاقة تنتقل إلى…", en: "The arrow means: energy passes to…" },
        },
      },
      {
        kind: "vocab",
        id: "v1",
        title: { ar: "مصطلحات الدرس", en: "Lesson vocabulary" },
        terms: [
          {
            term: { ar: "منتِج", en: "Producer" },
            meaning: { ar: "كائن يصنع غذاءه بنفسه من ضوء الشمس، مثل النبات والطحالب.", en: "An organism that makes its own food from sunlight, such as a plant or algae." },
          },
          {
            term: { ar: "مستهلك", en: "Consumer" },
            meaning: { ar: "كائن يحصل على الطاقة بأكل كائنات أخرى.", en: "An organism that gets energy by eating other organisms." },
          },
          {
            term: { ar: "محلِّل", en: "Decomposer" },
            meaning: { ar: "كائن يحلل بقايا الكائنات الميتة ويعيد المواد إلى التربة، مثل الفطريات والبكتيريا.", en: "An organism that breaks down dead material and returns nutrients to the soil, such as fungi and bacteria." },
          },
        ],
      },
      {
        kind: "concept",
        id: "c2",
        title: { ar: "لماذا تقصر السلاسل الغذائية؟", en: "Why food chains stay short" },
        body: {
          ar: "في كل مستوى تُفقد معظم الطاقة على شكل حرارة وحركة وتنفّس؛ لا ينتقل إلى المستوى التالي إلا نحو ١٠٪ منها. لهذا نادرًا ما تجد سلسلة غذائية فيها أكثر من أربعة أو خمسة مستويات: لا تبقى طاقة كافية.",
          en: "At every level most of the energy is lost as heat, movement and respiration; only about 10% passes to the next level. That is why food chains rarely have more than four or five levels — there simply is not enough energy left.",
        },
        visual: {
          type: "bars",
          items: [
            { label: { ar: "منتِجات", en: "Producers" }, value: 1000 },
            { label: { ar: "مستهلك أول", en: "1st consumer" }, value: 100 },
            { label: { ar: "مستهلك ثانٍ", en: "2nd consumer" }, value: 10 },
            { label: { ar: "مستهلك ثالث", en: "3rd consumer" }, value: 1 },
          ],
          caption: { ar: "الطاقة المتاحة بوحدات نسبية عند كل مستوى", en: "Relative energy available at each level" },
        },
      },
      {
        kind: "match",
        id: "q1",
        prompt: { ar: "وصّل كل كائن بدوره في النظام البيئي.", en: "Match each organism to its role in the ecosystem." },
        pairs: [
          { id: "p1", left: { ar: "شجرة البلوط 🌳", en: "Oak tree 🌳" }, right: { ar: "منتِج", en: "Producer" } },
          { id: "p2", left: { ar: "غزال 🦌", en: "Deer 🦌" }, right: { ar: "مستهلك أول", en: "Primary consumer" } },
          { id: "p3", left: { ar: "ذئب 🐺", en: "Wolf 🐺" }, right: { ar: "مستهلك ثانٍ", en: "Secondary consumer" } },
          { id: "p4", left: { ar: "فطر 🍄", en: "Mushroom 🍄" }, right: { ar: "محلِّل", en: "Decomposer" } },
        ],
        explanation: {
          ar: "النبات يصنع غذاءه، وآكل النبات مستهلك أول، وآكل اللحوم مستهلك ثانٍ، والفطر يحلل البقايا.",
          en: "The plant makes its own food, the plant-eater is a primary consumer, the meat-eater a secondary consumer, and the fungus breaks down remains.",
        },
      },
      {
        kind: "mcq",
        id: "q2",
        prompt: {
          ar: "في السلسلة: عشب ← جراد ← ضفدع ← ثعبان، ماذا يحدث غالبًا إذا اختفى الجراد؟",
          en: "In the chain grass → grasshopper → frog → snake, what most likely happens if the grasshoppers disappear?",
        },
        choices: [
          { id: "a", label: { ar: "يزداد عدد الضفادع لأن العشب سيكثر.", en: "Frogs increase because there will be more grass." } },
          { id: "b", label: { ar: "يقل عدد الضفادع، ثم يقل عدد الثعابين.", en: "Frogs decrease, and then snakes decrease too." } },
          { id: "c", label: { ar: "لا يتأثر أي كائن آخر.", en: "Nothing else is affected." } },
        ],
        correctId: "b",
        hint: { ar: "تتبّع السهم: من يعتمد على الجراد مباشرة؟", en: "Follow the arrow: who depends on the grasshopper directly?" },
        explanation: {
          ar: "الضفادع تعتمد على الجراد غذاءً، فيقل عددها، وبما أن الثعابين تأكل الضفادع فسيقل عددها بدوره. أثر أي كائن يمتد عبر السلسلة كلها.",
          en: "Frogs rely on grasshoppers for food, so their numbers fall, and because snakes eat frogs their numbers fall as well. A change to one organism travels along the whole chain.",
        },
      },
      {
        kind: "order",
        id: "q3",
        prompt: { ar: "رتّب مستويات السلسلة الغذائية من مصدر الطاقة إلى أعلى مستوى.", en: "Order the levels of the food chain from the energy source upwards." },
        items: [
          { id: "o1", label: { ar: "ضوء الشمس", en: "Sunlight" } },
          { id: "o2", label: { ar: "طحالب في البحيرة", en: "Algae in the lake" } },
          { id: "o3", label: { ar: "سمكة صغيرة", en: "Small fish" } },
          { id: "o4", label: { ar: "سمكة كبيرة", en: "Large fish" } },
          { id: "o5", label: { ar: "طائر بلشون", en: "Heron" } },
        ],
        explanation: {
          ar: "الطاقة تبدأ من الشمس، ثم المنتِج (الطحالب)، ثم تتدرج في المستهلكين.",
          en: "Energy starts at the Sun, moves into the producer (algae), then up through the consumers.",
        },
      },
      {
        kind: "truefalse",
        id: "q4",
        statement: {
          ar: "المحلِّلات لا أهمية لها في النظام البيئي لأنها لا تُؤكل.",
          en: "Decomposers do not matter in an ecosystem because nothing eats them.",
        },
        answer: false,
        explanation: {
          ar: "المحلِّلات ضرورية: بدونها تتراكم البقايا ولا تعود المغذيات إلى التربة، فتموت النباتات وتنهار السلسلة من أولها.",
          en: "Decomposers are essential: without them dead material piles up and nutrients never return to the soil, so plants die and the chain collapses at its base.",
        },
      },
      {
        kind: "summary",
        id: "s1",
        title: { ar: "خلاصة الدرس", en: "Lesson summary" },
        points: [
          { ar: "الطاقة تبدأ من الشمس وتنتقل عبر المنتِجات إلى المستهلكين.", en: "Energy starts at the Sun and moves through producers to consumers." },
          { ar: "نحو ١٠٪ فقط من الطاقة تنتقل بين المستويات.", en: "Only about 10% of energy passes between levels." },
          { ar: "المحلِّلات تعيد المغذيات إلى التربة فتغلق الدورة.", en: "Decomposers return nutrients to the soil and close the cycle." },
          { ar: "تغيّر كائن واحد يؤثر في النظام البيئي كله.", en: "A change to one organism affects the whole ecosystem." },
        ],
      },
    ],
  },

  /* ------------------------------------- Grade 7 · linear equations & slope */
  "american-g7-math-operations-1": {
    durationMinutes: 26,
    objectives: [
      { ar: "أن يحسب ميل مستقيم من نقطتين.", en: "Calculate the slope of a line from two points." },
      { ar: "أن يفسّر معنى الميل والمقطع الصادي في سياق واقعي.", en: "Interpret slope and y-intercept in a real context." },
      { ar: "أن يكتب معادلة مستقيم بصيغة y = mx + b.", en: "Write the equation of a line as y = mx + b." },
    ],
    blocks: [
      {
        kind: "concept",
        id: "c1",
        title: { ar: "الميل هو معدل التغيّر", en: "Slope is a rate of change" },
        body: {
          ar: "الميل m يخبرنا كم تتغيّر y مقابل كل زيادة مقدارها ١ في x. نحسبه من نقطتين بالعلاقة m = (y₂ − y₁) ÷ (x₂ − x₁)، أي «التغيّر الرأسي ÷ التغيّر الأفقي». الميل الموجب يعني صعودًا، والسالب هبوطًا، والصفر يعني خطًا أفقيًا.",
          en: "The slope m tells us how much y changes for every increase of 1 in x. From two points, m = (y₂ − y₁) ÷ (x₂ − x₁), that is 'rise over run'. A positive slope goes up, a negative slope goes down, and zero is a flat line.",
        },
      },
      {
        kind: "example",
        id: "e1",
        title: { ar: "مثال محلول: ميل المستقيم المار بـ (٢، ٣) و(٦، ١١)", en: "Worked example: the line through (2, 3) and (6, 11)" },
        steps: [
          { ar: "التغيّر الرأسي = y₂ − y₁ = ١١ − ٣ = ٨.", en: "Rise = y₂ − y₁ = 11 − 3 = 8." },
          { ar: "التغيّر الأفقي = x₂ − x₁ = ٦ − ٢ = ٤.", en: "Run = x₂ − x₁ = 6 − 2 = 4." },
          { ar: "الميل m = ٨ ÷ ٤ = ٢.", en: "Slope m = 8 ÷ 4 = 2." },
          { ar: "نعوّض في y = mx + b باستخدام النقطة (٢، ٣): ٣ = ٢(٢) + b، إذن b = −١.", en: "Substitute into y = mx + b using (2, 3): 3 = 2(2) + b, so b = −1." },
          { ar: "المعادلة: y = ٢x − ١.", en: "The equation is y = 2x − 1." },
        ],
      },
      {
        kind: "callout",
        id: "t1",
        tone: "tip",
        title: { ar: "رتّب النقطتين بالترتيب نفسه", en: "Keep the two points in the same order" },
        body: {
          ar: "إذا بدأت بـ y₂ في البسط فابدأ بـ x₂ في المقام. عكس الترتيب في أحدهما فقط يقلب إشارة الميل.",
          en: "If you start with y₂ on top, start with x₂ underneath. Swapping the order in only one of them flips the sign of the slope.",
        },
      },
      {
        kind: "mcq",
        id: "q1",
        prompt: { ar: "ما ميل المستقيم المار بالنقطتين (١، ٥) و(٤، ١٤)؟", en: "What is the slope of the line through (1, 5) and (4, 14)?" },
        choices: [
          { id: "a", label: { ar: "٣", en: "3" } },
          { id: "b", label: { ar: "٩", en: "9" } },
          { id: "c", label: { ar: "١/٣", en: "1/3" } },
          { id: "d", label: { ar: "−٣", en: "−3" } },
        ],
        correctId: "a",
        hint: { ar: "احسب (١٤ − ٥) ÷ (٤ − ١).", en: "Work out (14 − 5) ÷ (4 − 1)." },
        explanation: { ar: "(١٤ − ٥) ÷ (٤ − ١) = ٩ ÷ ٣ = ٣.", en: "(14 − 5) ÷ (4 − 1) = 9 ÷ 3 = 3." },
      },
      {
        kind: "concept",
        id: "c2",
        title: { ar: "الميل في مسألة واقعية", en: "Slope in a real problem" },
        body: {
          ar: "اشتراك ناد رياضي رسم انضمام ٥٠ ريالًا، ثم ٣٠ ريالًا شهريًا. إذا كانت y هي التكلفة و x عدد الشهور فإن y = ٣٠x + ٥٠. هنا الميل ٣٠ هو التكلفة الشهرية، والمقطع الصادي ٥٠ هو ما تدفعه قبل أن يمر أي شهر.",
          en: "A gym charges 50 to join and then 30 each month. If y is the cost and x the number of months, y = 30x + 50. Here the slope 30 is the monthly cost, and the y-intercept 50 is what you pay before a single month passes.",
        },
        visual: {
          type: "table",
          headers: [
            { ar: "عدد الشهور x", en: "Months x" },
            { ar: "التكلفة y", en: "Cost y" },
          ],
          rows: [
            [{ ar: "٠", en: "0" }, { ar: "٥٠", en: "50" }],
            [{ ar: "١", en: "1" }, { ar: "٨٠", en: "80" }],
            [{ ar: "٢", en: "2" }, { ar: "١١٠", en: "110" }],
            [{ ar: "٣", en: "3" }, { ar: "١٤٠", en: "140" }],
          ],
          caption: { ar: "تزيد التكلفة ٣٠ في كل شهر: هذا هو الميل.", en: "The cost rises by 30 each month: that is the slope." },
        },
      },
      {
        kind: "fill",
        id: "q2",
        prompt: { ar: "أكمل معادلة المستقيم.", en: "Complete the equation of the line." },
        text: {
          ar: "مستقيم ميله ٤ ويقطع المحور الصادي عند −٧، معادلته: y = {{1}}x + ({{2}})",
          en: "A line with slope 4 crossing the y-axis at −7 has the equation y = {{1}}x + ({{2}})",
        },
        blanks: [
          { id: "b1", answers: ["4", "٤"] },
          { id: "b2", answers: ["-7", "−7", "-٧", "−٧"] },
        ],
        explanation: {
          ar: "في الصيغة y = mx + b يكون m الميل و b المقطع الصادي، إذن y = ٤x + (−٧) = ٤x − ٧.",
          en: "In y = mx + b, m is the slope and b the y-intercept, so y = 4x + (−7) = 4x − 7.",
        },
      },
      {
        kind: "sort",
        id: "q3",
        prompt: { ar: "صنّف كل مستقيم حسب اتجاه ميله.", en: "Sort each line by the direction of its slope." },
        buckets: [
          { id: "pos", label: { ar: "ميل موجب", en: "Positive slope" } },
          { id: "neg", label: { ar: "ميل سالب", en: "Negative slope" } },
          { id: "zero", label: { ar: "ميل يساوي صفرًا", en: "Zero slope" } },
        ],
        items: [
          { id: "i1", label: { ar: "y = ٥x + ١", en: "y = 5x + 1" }, bucketId: "pos" },
          { id: "i2", label: { ar: "y = −٢x + ٩", en: "y = −2x + 9" }, bucketId: "neg" },
          { id: "i3", label: { ar: "y = ٧", en: "y = 7" }, bucketId: "zero" },
          { id: "i4", label: { ar: "y = ٠٫٥x", en: "y = 0.5x" }, bucketId: "pos" },
          { id: "i5", label: { ar: "y = −x − ٣", en: "y = −x − 3" }, bucketId: "neg" },
        ],
        explanation: {
          ar: "معامل x هو الميل. إذا كان موجبًا صعد المستقيم، وإذا كان سالبًا هبط، وإذا لم يوجد x فالميل صفر.",
          en: "The coefficient of x is the slope: positive rises, negative falls, and with no x term the slope is zero.",
        },
      },
      {
        kind: "mcq",
        id: "q4",
        prompt: {
          ar: "سيارة أجرة تحسب y = ٢٫٥x + ٨ حيث x المسافة بالكيلومترات. ماذا يمثّل العدد ٨؟",
          en: "A taxi charges y = 2.5x + 8, where x is the distance in kilometres. What does the 8 represent?",
        },
        choices: [
          { id: "a", label: { ar: "التكلفة لكل كيلومتر", en: "The cost per kilometre" } },
          { id: "b", label: { ar: "أجرة ثابتة عند بداية الرحلة", en: "A fixed charge at the start of the trip" } },
          { id: "c", label: { ar: "عدد الكيلومترات المجانية", en: "The number of free kilometres" } },
        ],
        correctId: "b",
        explanation: {
          ar: "عند x = ٠ تكون y = ٨، أي التكلفة قبل قطع أي مسافة: إنها الأجرة الثابتة، والميل ٢٫٥ هو التكلفة لكل كيلومتر.",
          en: "When x = 0, y = 8: the cost before travelling any distance. That is the fixed charge, while the slope 2.5 is the cost per kilometre.",
        },
      },
      {
        kind: "summary",
        id: "s1",
        title: { ar: "خلاصة الدرس", en: "Lesson summary" },
        points: [
          { ar: "الميل = التغيّر الرأسي ÷ التغيّر الأفقي.", en: "Slope = rise ÷ run." },
          { ar: "في y = mx + b: m الميل و b المقطع الصادي.", en: "In y = mx + b, m is the slope and b the y-intercept." },
          { ar: "الميل في الواقع هو «معدل لكل وحدة»، والمقطع الصادي هو القيمة الابتدائية.", en: "In context the slope is a 'per unit' rate and the intercept is the starting value." },
        ],
      },
    ],
  },

  /* ------------------------------- Grade 2 · characters, setting and events */
  "american-g2-ela-reading-1": {
    durationMinutes: 18,
    free: true,
    objectives: [
      { ar: "أن يحدد الطالب شخصيات القصة ومكانها وزمانها.", en: "Identify the characters, setting and events of a story." },
      { ar: "أن يرتّب أحداث القصة ترتيبًا صحيحًا.", en: "Put the events of a story in the right order." },
      { ar: "أن يصف شخصية بالاعتماد على ما فعلته في النص.", en: "Describe a character using evidence from the text." },
    ],
    blocks: [
      {
        kind: "concept",
        id: "c1",
        title: { ar: "كل قصة فيها ثلاثة أشياء", en: "Every story has three things" },
        body: {
          ar: "الشخصيات هم من في القصة، والمكان والزمان هما أين ومتى تحدث، والأحداث هي ما يقع فيها بالترتيب. إذا عرفت الثلاثة فقد فهمت القصة.",
          en: "Characters are who is in the story, the setting is where and when it happens, and the events are what happens, in order. Know all three and you have understood the story.",
        },
      },
      {
        kind: "concept",
        id: "c2",
        title: { ar: "اقرأ القصة", en: "Read the story" },
        body: {
          ar: "في صباح ممطر، وجدت ليلى قطة صغيرة مبللة عند باب المدرسة. حملتها بلطف وجفّفتها بمنشفتها، ثم ذهبت بها إلى الأستاذة هدى. بحثت الأستاذة عن صاحب القطة، وفي المساء جاء جار المدرسة يبحث عن قطته الضائعة. فرحت ليلى حين رأت القطة تعود إلى بيتها.",
          en: "On a rainy morning, Layla found a small wet kitten by the school gate. She picked it up gently, dried it with her towel, and took it to Miss Huda. The teacher looked for the kitten's owner, and in the evening the school's neighbour came looking for his lost cat. Layla was happy to see the kitten go home.",
        },
        visual: { type: "figure", glyph: "🐈", caption: { ar: "القطة الصغيرة عند باب المدرسة", en: "The little kitten at the school gate" } },
      },
      {
        kind: "mcq",
        id: "q1",
        prompt: { ar: "أين تقع أحداث القصة؟", en: "Where does the story take place?" },
        choices: [
          { id: "a", label: { ar: "في بيت ليلى", en: "At Layla's house" } },
          { id: "b", label: { ar: "عند باب المدرسة وفي المدرسة", en: "At the school gate and inside the school" } },
          { id: "c", label: { ar: "في حديقة الحيوان", en: "At the zoo" } },
        ],
        correctId: "b",
        hint: { ar: "ابحث في أول سطر عن كلمة تدل على المكان.", en: "Look in the first line for a word that names a place." },
        explanation: {
          ar: "النص يقول: «عند باب المدرسة»، ثم ذهبت بالقطة إلى الأستاذة داخل المدرسة.",
          en: "The text says 'by the school gate', and she then takes the kitten to her teacher inside the school.",
        },
      },
      {
        kind: "multi",
        id: "q2",
        prompt: { ar: "من شخصيات القصة؟ اختر كل الإجابات الصحيحة.", en: "Who are the characters? Choose all that apply." },
        choices: [
          { id: "a", label: { ar: "ليلى", en: "Layla" } },
          { id: "b", label: { ar: "الأستاذة هدى", en: "Miss Huda" } },
          { id: "c", label: { ar: "سائق الحافلة", en: "The bus driver" } },
          { id: "d", label: { ar: "جار المدرسة", en: "The school's neighbour" } },
        ],
        correctIds: ["a", "b", "d"],
        explanation: {
          ar: "ذُكرت ليلى والأستاذة هدى وجار المدرسة في النص، أما سائق الحافلة فلم يُذكر أبدًا.",
          en: "Layla, Miss Huda and the neighbour all appear in the text; the bus driver is never mentioned.",
        },
      },
      {
        kind: "order",
        id: "q3",
        prompt: { ar: "رتّب أحداث القصة كما وقعت.", en: "Put the story events in the order they happened." },
        items: [
          { id: "o1", label: { ar: "وجدت ليلى قطة مبللة.", en: "Layla found a wet kitten." } },
          { id: "o2", label: { ar: "جفّفت القطة بمنشفتها.", en: "She dried it with her towel." } },
          { id: "o3", label: { ar: "أخذتها إلى الأستاذة هدى.", en: "She took it to Miss Huda." } },
          { id: "o4", label: { ar: "جاء الجار يبحث عن قطته.", en: "The neighbour came looking for his cat." } },
          { id: "o5", label: { ar: "عادت القطة إلى بيتها.", en: "The kitten went home." } },
        ],
        explanation: {
          ar: "الترتيب يتبع النص: الوجود ثم التجفيف ثم الذهاب للأستاذة ثم مجيء الجار ثم العودة.",
          en: "The order follows the text: finding, drying, going to the teacher, the neighbour arriving, then going home.",
        },
      },
      {
        kind: "mcq",
        id: "q4",
        prompt: { ar: "أي كلمة تصف ليلى أفضل وصف بناءً على ما فعلته؟", en: "Which word best describes Layla, based on what she did?" },
        choices: [
          { id: "a", label: { ar: "عطوفة", en: "Kind" } },
          { id: "b", label: { ar: "خائفة", en: "Frightened" } },
          { id: "c", label: { ar: "كسولة", en: "Lazy" } },
        ],
        correctId: "a",
        explanation: {
          ar: "حملت القطة بلطف وجفّفتها وسعت لإعادتها لصاحبها، وكل ذلك يدل على العطف.",
          en: "She picked the kitten up gently, dried it and helped return it to its owner — all signs of kindness.",
        },
      },
      {
        kind: "summary",
        id: "s1",
        title: { ar: "خلاصة الدرس", en: "Lesson summary" },
        points: [
          { ar: "الشخصيات = من، والمكان والزمان = أين ومتى، والأحداث = ماذا حدث.", en: "Characters = who, setting = where and when, events = what happened." },
          { ar: "نصف الشخصية بما فعلته في النص، لا بما نتخيله.", en: "Describe a character from what the text shows, not from what we imagine." },
        ],
      },
    ],
  },
};
