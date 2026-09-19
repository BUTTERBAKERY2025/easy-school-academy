import type { LessonLibrary } from "./index";

export const britishLessons: LessonLibrary = {

  /* ------------------------ Year 5 · Cambridge Primary Science, Stage 5, Unit 1.1
   * Flowering and non-flowering plants.
   *
   * The unit's first lesson, and the one that has to do the most work: a child
   * arrives certain that "plant with a flower" means "plant with petals", and
   * leaves able to sort a fern, a pine and a blade of grass correctly. The
   * misconception is met head-on rather than avoided, because grasses and oaks
   * are exactly the plants a wrong rule gets wrong.
   *
   * Written for this academy. Scientific terms are kept in English on both sides
   * — a child on the British curriculum learns the stamen as the stamen — with
   * the Arabic beside it to understand it by, not to replace it.
   */
  "british-g5-science-plants-1": {
    durationMinutes: 25,
    summary: {
      ar: "كل النباتات تصنع غذاءها، لكنها لا تتكاثر بالطريقة نفسها. في هذا الدرس نفرّق بين النبات الزهري وغير الزهري، ونتعلّم أجزاء الزهرة ووظيفة كل جزء.",
      en: "Every plant makes its own food, but they do not all reproduce the same way. Here you separate flowering from non-flowering plants, and learn the parts of a flower and what each one is for.",
    },
    objectives: [
      {
        ar: "أن يذكر الطالب أجزاء الزهرة (petals, sepals, stamen, carpel) ووظيفة كل جزء.",
        en: "Name the parts of a flower — petals, sepals, stamen and carpel — and say what each one does.",
      },
      {
        ar: "أن يميّز بين النبات الزهري وغير الزهري اعتمادًا على طريقة تكاثره لا على شكله.",
        en: "Tell a flowering plant from a non-flowering one by how it reproduces, not by how it looks.",
      },
      {
        ar: "أن يصنّف نباتات مألوفة كالسرخس والصنوبر والعشب تصنيفًا صحيحًا.",
        en: "Classify familiar plants such as ferns, conifers and grasses correctly.",
      },
    ],
    blocks: [
      {
        kind: "concept",
        id: "c1",
        title: { ar: "ما الذي تشترك فيه كل النباتات؟", en: "What every plant has in common" },
        body: {
          ar: "كل النباتات تصنع غذاءها بنفسها من ضوء الشمس والماء وثاني أكسيد الكربون. هذا ما يجعلها نباتًا. لكنها تختلف في شيء واحد مهم: كيف تصنع جيلًا جديدًا. بعضها يفعل ذلك بزهرة (flower)، وبعضها لا يملك زهرة أصلًا — وهذا هو الفرق الذي نبني عليه هذا الدرس.",
          en: "Every plant makes its own food from sunlight, water and carbon dioxide. That is what makes it a plant. But plants differ in one important way: how they make the next generation. Some do it with a flower; some have no flower at all — and that is the difference this lesson is built on.",
        },
        visual: {
          type: "table",
          headers: [
            { ar: "السؤال", en: "Question" },
            { ar: "كل النباتات", en: "All plants" },
          ],
          rows: [
            [
              { ar: "هل تصنع غذاءها بنفسها؟", en: "Does it make its own food?" },
              { ar: "نعم", en: "Yes" },
            ],
            [
              { ar: "هل لها جذور وساق وأوراق؟", en: "Does it have roots, a stem and leaves?" },
              { ar: "في الغالب نعم", en: "Usually yes" },
            ],
            [
              { ar: "هل تتكاثر بزهرة؟", en: "Does it reproduce with a flower?" },
              { ar: "ليست كلها — وهنا الفرق", en: "Not all of them — this is the difference" },
            ],
          ],
          caption: {
            ar: "أول سؤالين إجابتهما واحدة، والثالث هو الذي يقسم النباتات إلى مجموعتين.",
            en: "The first two answers are the same for every plant. The third one splits them into two groups.",
          },
        },
      },
      {
        kind: "vocab",
        id: "v1",
        title: { ar: "كلمات هذا الدرس", en: "Words for this lesson" },
        terms: [
          {
            term: { ar: "flowering plant — نبات زهري", en: "flowering plant" },
            meaning: {
              ar: "نبات يتكاثر بالأزهار، وتنمو بذوره داخل ثمرة.",
              en: "A plant that reproduces using flowers, and whose seeds grow inside a fruit.",
            },
          },
          {
            term: { ar: "non-flowering plant — نبات غير زهري", en: "non-flowering plant" },
            meaning: {
              ar: "نبات لا يصنع أزهارًا؛ يتكاثر بالأبواغ (spores) أو بالمخاريط (cones).",
              en: "A plant that makes no flowers; it reproduces with spores or with cones.",
            },
          },
          {
            term: { ar: "stamen — السداة", en: "stamen" },
            meaning: {
              ar: "الجزء المذكّر في الزهرة، وهو الذي يصنع حبوب اللقاح (pollen).",
              en: "The male part of a flower. It is the part that makes pollen.",
            },
          },
          {
            term: { ar: "carpel — الكربلة", en: "carpel" },
            meaning: {
              ar: "الجزء المؤنّث في الزهرة، ويحتوي المبيض (ovary) الذي تنمو فيه البذور.",
              en: "The female part of a flower. It holds the ovary, where the seeds grow.",
            },
          },
          {
            term: { ar: "spore — بوغ", en: "spore" },
            meaning: {
              ar: "حبيبة دقيقة جدًّا تنتشر بالهواء وتنمو منها نبتة جديدة، وليست بذرة.",
              en: "A tiny grain carried on the air that grows into a new plant. It is not a seed.",
            },
          },
          {
            term: { ar: "cone — مخروط", en: "cone" },
            meaning: {
              ar: "تركيب خشبي الملمس تحمل حراشفه البذور مكشوفة، كما في الصنوبر.",
              en: "A woody structure whose scales carry seeds out in the open, as in a pine.",
            },
          },
        ],
      },
      {
        kind: "concept",
        id: "c2",
        title: { ar: "أجزاء الزهرة ووظائفها", en: "The parts of a flower, and their jobs" },
        body: {
          ar: "الزهرة ليست زينة — هي مصنع البذور. لكل جزء فيها وظيفة واحدة واضحة: البتلات (petals) تجذب الملقّحات، والسبلات (sepals) كانت تحمي البرعم قبل أن يتفتّح، والسداة (stamen) تصنع حبوب اللقاح، والكربلة (carpel) تستقبلها ثم تنمو البذور داخل مبيضها.",
          en: "A flower is not decoration — it is a seed factory. Each part has one clear job: the petals attract pollinators, the sepals protected the bud before it opened, the stamen makes the pollen, and the carpel receives it and grows the seeds inside its ovary.",
        },
        visual: {
          type: "table",
          headers: [
            { ar: "الجزء", en: "Part" },
            { ar: "وظيفته", en: "Its job" },
          ],
          rows: [
            [
              { ar: "petals — البتلات", en: "petals" },
              { ar: "تجذب الحشرات والطيور بلونها ورائحتها", en: "Attract insects and birds with colour and scent" },
            ],
            [
              { ar: "sepals — السبلات", en: "sepals" },
              { ar: "تحمي البرعم قبل تفتّحه", en: "Protect the bud before it opens" },
            ],
            [
              { ar: "stamen — السداة", en: "stamen" },
              { ar: "تصنع حبوب اللقاح (الجزء المذكّر)", en: "Makes the pollen (the male part)" },
            ],
            [
              { ar: "carpel — الكربلة", en: "carpel" },
              { ar: "تستقبل اللقاح وتنمو فيها البذور (الجزء المؤنّث)", en: "Receives pollen and grows the seeds (the female part)" },
            ],
          ],
        },
      },
      {
        kind: "mcq",
        id: "q1",
        prompt: {
          ar: "أي جزء من الزهرة هو الذي يصنع حبوب اللقاح؟",
          en: "Which part of a flower makes the pollen?",
        },
        choices: [
          { id: "a", label: { ar: "petals — البتلات", en: "The petals" } },
          { id: "b", label: { ar: "stamen — السداة", en: "The stamen" } },
          { id: "c", label: { ar: "sepals — السبلات", en: "The sepals" } },
          { id: "d", label: { ar: "carpel — الكربلة", en: "The carpel" } },
        ],
        correctId: "b",
        hint: { ar: "ابحث عن الجزء المذكّر.", en: "Look for the male part." },
        explanation: {
          ar: "السداة (stamen) هي الجزء المذكّر وتصنع حبوب اللقاح. أما الكربلة (carpel) فهي الجزء المؤنّث الذي يستقبلها.",
          en: "The stamen is the male part and makes the pollen. The carpel is the female part that receives it.",
        },
      },
      {
        kind: "example",
        id: "e1",
        title: { ar: "اختبار من ثلاث خطوات: أزهري أم غير زهري؟", en: "A three-step test: flowering or not?" },
        steps: [
          {
            ar: "١. ابحث عن زهرة — وليس عن بتلات ملوّنة. كثير من الأزهار صغيرة وخضراء بلا بتلات تُرى.",
            en: "1. Look for a flower — not for colourful petals. Many flowers are small and green with no petals to see.",
          },
          {
            ar: "٢. اسأل: أين تنمو البذور؟ إن نمت داخل ثمرة فالنبات زهري.",
            en: "2. Ask where the seeds grow. If they grow inside a fruit, the plant is a flowering plant.",
          },
          {
            ar: "٣. إن لم تجد بذورًا أصلًا، فابحث عن أبواغ (spores) تحت الورقة أو عن مخروط (cone): هذه علامات النبات غير الزهري.",
            en: "3. If there are no seeds at all, look for spores under a leaf or for a cone. Those mark a non-flowering plant.",
          },
        ],
        visual: {
          type: "steps",
          items: [
            { ar: "هل فيه زهرة؟", en: "Is there a flower?" },
            { ar: "أين تنمو البذرة؟", en: "Where does the seed grow?" },
            { ar: "أبواغ أم مخروط؟", en: "Spores or a cone?" },
          ],
        },
      },
      {
        kind: "callout",
        id: "w1",
        tone: "warning",
        title: { ar: "الخطأ الذي يقع فيه الجميع", en: "The mistake almost everyone makes" },
        body: {
          ar: "«العشب والبلوط ليس لهما أزهار» — غير صحيح. لهما أزهار، لكنها صغيرة وخضراء وبلا بتلات لافتة، لأن الرياح هي التي تنقل لقاحها ولا تحتاج إلى جذب حشرة. القاعدة الصحيحة ليست «هل أرى بتلات؟» بل «كيف يصنع هذا النبات بذوره؟».",
          en: "“Grass and oak trees have no flowers” — not true. They do have flowers, but small green ones with no showy petals, because the wind carries their pollen and there is no insect to attract. The rule is not “can I see petals?” but “how does this plant make its seeds?”",
        },
      },
      {
        kind: "sort",
        id: "q2",
        prompt: {
          ar: "صنّف كل نبات في مجموعته. تذكّر أن تسأل عن طريقة التكاثر لا عن الشكل.",
          en: "Sort each plant into its group. Remember to ask how it reproduces, not what it looks like.",
        },
        buckets: [
          { id: "flowering", label: { ar: "نباتات زهرية", en: "Flowering plants" } },
          { id: "non", label: { ar: "نباتات غير زهرية", en: "Non-flowering plants" } },
        ],
        items: [
          { id: "i1", label: { ar: "الوردة 🌹", en: "Rose 🌹" }, bucketId: "flowering" },
          { id: "i2", label: { ar: "السرخس 🌿", en: "Fern 🌿" }, bucketId: "non" },
          { id: "i3", label: { ar: "شجرة التفاح 🍎", en: "Apple tree 🍎" }, bucketId: "flowering" },
          { id: "i4", label: { ar: "الصنوبر 🌲", en: "Pine tree 🌲" }, bucketId: "non" },
          { id: "i5", label: { ar: "العشب 🌾", en: "Grass 🌾" }, bucketId: "flowering" },
          { id: "i6", label: { ar: "الطحلب البرّي (moss)", en: "Moss" }, bucketId: "non" },
        ],
        explanation: {
          ar: "الوردة والتفاح والعشب كلها تصنع أزهارًا وبذورًا داخل ثمرة — وإن كانت زهرة العشب صغيرة خضراء. أما السرخس والطحلب فيتكاثران بالأبواغ، والصنوبر يحمل بذوره مكشوفة على حراشف المخروط لا داخل ثمرة.",
          en: "Rose, apple and grass all make flowers and seeds inside a fruit — even though a grass flower is small and green. Ferns and mosses reproduce with spores, and a pine carries its seeds out in the open on cone scales rather than inside a fruit.",
        },
      },
      {
        kind: "concept",
        id: "c3",
        title: { ar: "كيف تتكاثر النباتات غير الزهرية؟", en: "How non-flowering plants reproduce" },
        body: {
          ar: "ليست كل النباتات غير الزهرية متشابهة. السرخس والطحلب لا يصنعان بذورًا إطلاقًا، بل أبواغًا دقيقة تحملها الرياح. أما الصنوبر وأشباهه (conifers) فتصنع بذورًا حقيقية، لكنها تنمو مكشوفة على حراشف المخروط بدل أن تُغلَّف داخل ثمرة — ولهذا لا نعدّها نباتات زهرية.",
          en: "Non-flowering plants are not all alike. Ferns and mosses make no seeds at all — they make tiny spores that the wind carries. Conifers such as pines do make real seeds, but the seeds sit out in the open on the scales of a cone instead of being wrapped inside a fruit — which is why they are not counted as flowering plants.",
        },
        visual: {
          type: "table",
          headers: [
            { ar: "المجموعة", en: "Group" },
            { ar: "بماذا تتكاثر؟", en: "Reproduces with" },
            { ar: "مثال", en: "Example" },
          ],
          rows: [
            [
              { ar: "نباتات زهرية", en: "Flowering plants" },
              { ar: "بذور داخل ثمرة", en: "Seeds inside a fruit" },
              { ar: "التفاح، العشب", en: "Apple, grass" },
            ],
            [
              { ar: "conifers — المخروطيات", en: "Conifers" },
              { ar: "بذور مكشوفة على مخروط", en: "Seeds in the open on a cone" },
              { ar: "الصنوبر", en: "Pine" },
            ],
            [
              { ar: "السرخسيات والطحالب", en: "Ferns and mosses" },
              { ar: "أبواغ (spores)", en: "Spores" },
              { ar: "السرخس، الطحلب", en: "Fern, moss" },
            ],
          ],
        },
      },
      {
        kind: "truefalse",
        id: "q3",
        statement: {
          ar: "كل نبات يصنع بذورًا لا بدّ أن يكون له زهرة.",
          en: "Every plant that makes seeds must have a flower.",
        },
        answer: false,
        explanation: {
          ar: "خطأ. المخروطيات (conifers) كالصنوبر تصنع بذورًا حقيقية بلا زهرة؛ بذورها تنمو مكشوفة على حراشف المخروط.",
          en: "False. Conifers such as pines make real seeds with no flower at all; their seeds grow out in the open on the scales of a cone.",
        },
      },
      {
        kind: "match",
        id: "q4",
        prompt: { ar: "وصّل كل نبات بطريقة تكاثره.", en: "Match each plant to the way it reproduces." },
        pairs: [
          {
            id: "p1",
            left: { ar: "السرخس 🌿", en: "Fern 🌿" },
            right: { ar: "أبواغ تحت الورقة", en: "Spores under the leaf" },
          },
          {
            id: "p2",
            left: { ar: "الصنوبر 🌲", en: "Pine 🌲" },
            right: { ar: "بذور على حراشف مخروط", en: "Seeds on the scales of a cone" },
          },
          {
            id: "p3",
            left: { ar: "شجرة التفاح 🍎", en: "Apple tree 🍎" },
            right: { ar: "بذور داخل ثمرة", en: "Seeds inside a fruit" },
          },
        ],
        explanation: {
          ar: "الثلاثة تصنع جيلًا جديدًا، لكن بثلاث طرق مختلفة: بوغ، وبذرة مكشوفة، وبذرة داخل ثمرة.",
          en: "All three make a new generation, but in three different ways: a spore, an uncovered seed, and a seed inside a fruit.",
        },
      },
      {
        kind: "fill",
        id: "q5",
        prompt: { ar: "أكمل الجملتين بالكلمة المناسبة.", en: "Complete the two sentences." },
        text: {
          ar: "الجزء الذي يصنع حبوب اللقاح في الزهرة هو {{1}}، والنبات الذي يتكاثر بالأبواغ بدل البذور هو {{2}}.",
          en: "The part of a flower that makes pollen is the {{1}}, and a plant that reproduces with spores instead of seeds is a {{2}}.",
        },
        blanks: [
          { id: "b1", answers: ["stamen", "السداة", "سداة", "the stamen"] },
          { id: "b2", answers: ["fern", "moss", "السرخس", "سرخس", "الطحلب", "طحلب"] },
        ],
        explanation: {
          ar: "السداة (stamen) هي مصنع اللقاح، والسرخس والطحلب مثالان على التكاثر بالأبواغ.",
          en: "The stamen is the pollen factory, and ferns and mosses are both examples of reproducing by spores.",
        },
      },
      {
        kind: "summary",
        id: "s1",
        title: { ar: "خلاصة الدرس", en: "Lesson summary" },
        points: [
          {
            ar: "كل النباتات تصنع غذاءها، لكنها تختلف في طريقة تكاثرها.",
            en: "Every plant makes its own food, but plants differ in how they reproduce.",
          },
          {
            ar: "في الزهرة: petals تجذب، sepals تحمي، stamen تصنع اللقاح، carpel تنمو فيها البذور.",
            en: "In a flower: petals attract, sepals protect, the stamen makes pollen, and seeds grow in the carpel.",
          },
          {
            ar: "النبات الزهري بذوره داخل ثمرة — حتى لو كانت زهرته صغيرة خضراء كالعشب.",
            en: "A flowering plant keeps its seeds inside a fruit — even if its flower is small and green, like grass.",
          },
          {
            ar: "غير الزهري نوعان: أبواغ (سرخس وطحلب) أو بذور مكشوفة على مخروط (صنوبر).",
            en: "Non-flowering plants come in two kinds: spores (ferns, mosses) or uncovered seeds on a cone (conifers).",
          },
        ],
      },
    ],
  },
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
