import type { LessonLibrary } from "./index";
import type { Localized } from "@/lib/i18n/config";

/** Screen headings are short pairs; spelling out both keys each time is noise. */
const L = (ar: string, en: string): Localized => ({ ar, en });

export const britishLessons: LessonLibrary = {

  /* --------------------- Year 5 · Cambridge Primary Science, Stage 5 · Unit 1.1
   * Flowering and non-flowering plants.
   *
   * Written as seven screens rather than twenty steps, so a question, a reading
   * and a figure arrive as one move instead of three. Every screen says what it
   * is for before the child starts it, and the order is the book's own: look at
   * the page, ask before teaching, observe, name, explain, then check.
   *
   * The sentences are short on purpose. A ten-year-old reads "Some are big. Some
   * are tiny." and keeps both; a paragraph with three clauses loses them by the
   * second.
   */
  "british-g5-science-plants-1": {
    durationMinutes: 40,
    summary: {
      ar: "بعض النباتات لها أزهار وبعضها لا. هنا تتعرّف على المجموعتين، وعلى دورة حياة النبات الزهري، وعلى كل جزء في الزهرة ووظيفته.",
      en: "Some plants have flowers and some do not. Here you meet both groups, follow the life cycle of a flowering plant, and learn every part of a flower and what it is for.",
    },
    objectives: [
      { ar: "أن يعرف أن بعض النباتات لها أزهار وبعضها ليس له.", en: "Know that some plants have flowers and other plants do not." },
      { ar: "أن يذكر مراحل دورة حياة النبات الزهري.", en: "Say what the stages are in the life cycle of a flowering plant." },
      { ar: "أن يصنّف النباتات والأزهار في مجموعات.", en: "Sort and group flowers and plants." },
      { ar: "أن يسمّي أجزاء الزهرة ويصف وظيفة كل جزء.", en: "Identify the parts of a flower and describe their function." },
      { ar: "أن يلاحظ زهرة حقيقية ويرسمها.", en: "Observe a real flower and draw it." },
      { ar: "أن يصف نمطًا يلاحظه.", en: "Describe a pattern in what you observe." },
    ],
    screens: [
      {
        id: "open",
        kicker: L("افتح الدرس", "Open the lesson"),
        title: L("النباتات الزهرية وغير الزهرية", "Flowering and non-flowering plants"),
        lead: L("نفس صفحة كتابك. نبدأ بما تعرفه، ثم نلاحظ، ثم نسمّي الأجزاء ووظائفها.", "The same page as your book. We start with what you know, then observe, then name the parts and their jobs."),
        aim: L("تخرج من هذه الشاشة عارفًا ما الذي تعلّمك إياه هذه الصفحة، ولماذا رُتّبت هكذا.", "You leave this screen knowing what this page teaches, and why it is laid out the way it is."),
        blocks: [
        {
          kind: "pagewalk",
          id: "w0",
          title: { ar: "افتح كتابك على صفحة 2", en: "Open your book at page 2" },
          intro: {
            ar: "قبل أن نقرأ كلمة، انظر إلى الصفحة نفسها. المعلّم لا يبدأ بالقراءة بل بالإشارة: هذا صندوق الأهداف، وهذه المهمة، وهذه الكلمات التي ستحتاجها. اضغط كل رقم لتعرف ما هو ولماذا وُضع هناك.",
            en: "Before we read a word, look at the page itself. A teacher does not start by reading — they start by pointing: this is the aims box, this is the task, these are the words you will need. Tap each number to find out what it is and why it is there.",
          },
          page: 2,
          bigIdea: {
            ar: "ليس كل نبات له أزهار. النباتات الزهرية تصنع بذورًا؛ وغير الزهرية — كالسرخس — تصنع أبواغًا.",
            en: "Not every plant has flowers. Flowering plants make seeds. Non-flowering plants, such as ferns, make spores.",
          },
          regions: [
            {
              id: "title",
              rect: [3, 5, 90, 28],
              title: { ar: "عنوان الوحدة والدرس", en: "The unit and lesson title" },
              body: {
                ar: "الوحدة الأولى اسمها «دورة حياة النباتات الزهرية»، والدرس 1.1 يبدأ من هنا: بعض النباتات لها أزهار وبعضها ليس له. لاحظ أن عنوان الوحدة يذكر «دورة الحياة» — وهي الفكرة التي ستربط كل دروس الوحدة.",
                en: "Unit 1 is called Life cycles of flowering plants, and Lesson 1.1 begins here: some plants have flowers and some do not. Notice that the unit's title says life cycles — that is the idea tying every lesson in the unit together.",
              },
            },
            {
              id: "aims",
              rect: [8, 34, 83, 22],
              title: { ar: "«We are going to…» — ستة أهداف", en: "“We are going to…” — six aims" },
              body: {
                ar: "ستة أهداف، والكتاب يضعها قبل أي شرح حتى تعرف إلى أين تسير: أن تفرّق بين النبات الزهري وغيره، وتعرف مراحل دورة الحياة، وتصنّف الأزهار، وتسمّي أجزاء الزهرة ووظيفة كل جزء، وتلاحظ زهرة وترسمها، وتصف نمطًا في ملاحظاتك. ارجع إليها في آخر الدرس واسأل نفسك: أيها أستطيع الآن؟",
                en: "Six aims, and the book puts them before any explanation so you know where you are heading: tell flowering plants from non-flowering ones, know the life-cycle stages, sort and group flowers, name each flower part and its function, observe and draw a flower, and describe a pattern in what you see. Come back to them at the end and ask which ones you can now do.",
              },
            },
            {
              id: "start",
              rect: [8, 57, 83, 13],
              title: { ar: "«Getting started» — ابدأ بما تعرفه", en: "“Getting started” — begin with what you know" },
              body: {
                ar: "لا تحفظ أولًا. ارسم نبتة، ولوّنها، واكتب أسماء أجزائها، ثم قل لشخص بجوارك لماذا يحتاج النبات كل جزء. وأخيرًا اسأل: هل نبتتك لها زهرة؟ وهل كل النباتات لها أزهار؟ هذه هي طريقة الكتاب كلها: ابدأ بما في رأسك، ثم لاحظ، ثم سمِّ، ثم فسّر.",
                en: "Do not memorise first. Draw a plant, colour it, label its parts, then tell somebody beside you why the plant needs each one. Last, ask: does your plant have a flower? Do all plants have flowers? This is the book's whole method — start from what you already think, then observe, then name, then explain.",
              },
            },
            {
              id: "words",
              rect: [9, 71, 38, 18],
              title: { ar: "صندوق الكلمات المفتاحية", en: "The key words box" },
              body: {
                ar: "احتفظ بهذا الصندوق. ستقابل هذه الكلمات في الوحدة كلها: anther, carpel, filament, function, fruit, life cycle, ovary, petals, pollen, reproduce, scent, sepals, spores, stamen, stigma. لن تحفظها الآن — ستتعلّمها وأنت تستعملها.",
                en: "Keep this box. You will meet these words through the whole unit: anther, carpel, filament, function, fruit, life cycle, ovary, petals, pollen, reproduce, scent, sepals, spores, stamen, stigma. You are not learning them now — you will learn them by using them.",
              },
            },
          ],
        },
        {
          kind: "callout",
          id: "g1",
          tone: "tip",
          title: { ar: "كيف يعلّم هذا الكتاب", en: "How this book teaches" },
          body: {
            ar: "Cambridge Primary Science لا يبدأ بقائمة تُحفظ. الصفحة الأولى تفتح السؤال، ثم يستعمل الطالب ما يعرفه، ثم يلاحظ، ثم يسمّي الأجزاء، ثم يشرح وظيفة كل جزء. هذه طريقة الوحدة كلها — ونحن نتبعها هنا بالترتيب نفسه.",
            en: "Cambridge Primary Science does not begin with a list to memorise. The first page sets the enquiry; then you use what you already know, then you observe, then you name the parts, then you explain what each part is for. That is the method of the whole unit — and it is the order we follow here.",
          },
        },
        ],
      },
      {
        id: "think",
        kicker: L("فكّر أولًا", "Think first"),
        title: L("هل كل النباتات لها أزهار؟", "Do all plants have flowers?"),
        lead: L("اختر ما تظنه قبل أن تقرأ. الكتاب يسأل هذا السؤال قبل أن يشرح.", "Choose what you think before you read on. The book asks this before it teaches."),
        aim: L("تخرج عارفًا أن النباتات مجموعتان، وما الفرق بينهما.", "You leave knowing that plants come in two groups, and what the difference is."),
        blocks: [
        {
          kind: "mcq",
          id: "q0",
          prompt: { ar: "هل كل النباتات لها أزهار؟", en: "Do all plants have flowers?" },
          choices: [
            {
              id: "a",
              label: { ar: "نعم — كل نبات يُزهر ثم يصنع بذورًا.", en: "Yes — every plant flowers, then makes seeds." },
              feedback: {
                ar: "فكّر في السرخس. هل رأيته يومًا مُزهرًا؟ لا يُزهر أبدًا — ومع ذلك تخرج منه سرخسات جديدة.",
                en: "Think of a fern. Have you ever seen one in flower? It never flowers — and new ferns still appear.",
              },
            },
            { id: "b", label: { ar: "لا — بعض النباتات لا تُزهر أبدًا.", en: "No — some plants never flower at all." } },
          ],
          correctId: "b",
          explanation: {
            ar: "لا. كثير من النباتات له أزهار، لكن ليس كلها. السرخس مثال واضح: لا يُزهر، ولا يصنع بذورًا.",
            en: "No. Many plants have flowers, but not all of them. A fern is a clear example: it never flowers, and it makes no seeds.",
          },
        },
        {
          kind: "concept",
          id: "c1",
          title: { ar: "نباتات لها أزهار", en: "Plants with flowers" },
          body: {
            ar: "كثير من النباتات له أزهار. نسمّيها نباتات زهرية (flowering plants).\n\nوالأزهار ليست واحدة. منها الكبير. ومنها الصغير جدًّا. منها الزاهي. ومنها الأخضر الباهت الذي لا تكاد تراه. منها ما له رائحة. ومنها ما لا رائحة له.\n\nوكلها تؤدي العمل نفسه.",
            en: "Many plants have flowers. We call them flowering plants.\n\nFlowers are not all the same. Some are big. Some are tiny. Some are bright. Some are pale green and easy to miss. Some have a scent. Some have none.\n\nAnd every one of them does the same job.",
          },
        },
        {
          kind: "concept",
          id: "c2",
          title: { ar: "نباتات بلا أزهار", en: "Plants without flowers" },
          body: {
            ar: "بعض النباتات لا أزهار له إطلاقًا. نسمّيها نباتات غير زهرية (non-flowering plants).\n\nالسرخس والطحلب لا يصنعان بذورًا. يصنعان أبواغًا (spores) دقيقة جدًّا، والريح تحملها.\n\nوالصنوبر يصنع بذورًا. لكن بذوره على مخروط، لا داخل ثمرة. ولهذا هو أيضًا غير زهري.",
            en: "Some plants have no flowers at all. We call them non-flowering plants.\n\nFerns and mosses make no seeds. They make tiny spores, and the wind carries them away.\n\nA pine tree does make seeds. But its seeds sit on a cone, not inside a fruit. So a pine is non-flowering too.",
          },
        },
        {
          kind: "callout",
          id: "w1",
          tone: "warning",
          title: { ar: "انتبه لهذا", en: "Watch out for this" },
          body: {
            ar: "كثيرون يقولون إن العشب والبلوط بلا أزهار. هذا خطأ.\n\nلهما أزهار. لكنها صغيرة وخضراء بلا بتلات لافتة. الريح تنقل لقاحهما، فلا حاجة لجذب حشرة.\n\nالسؤال الصحيح ليس «هل أرى بتلات؟» بل «كيف يصنع هذا النبات بذوره؟»",
            en: "People often say grass and oak trees have no flowers. That is wrong.\n\nThey do have flowers — small green ones, with no showy petals. The wind carries their pollen, so there is no insect to attract.\n\nThe right question is not “can I see petals?” It is “how does this plant make its seeds?”",
          },
        },
        ],
      },
      {
        id: "sort",
        kicker: L("لاحِظ وصنّف", "Observe and sort"),
        title: L("ضع كل نبات في مجموعته", "Put each plant in its group"),
        lead: L("اسأل عن طريقة التكاثر، لا عن الشكل.", "Ask how it reproduces, not what it looks like."),
        aim: L("تخرج قادرًا على تصنيف نبات لم تره من قبل.", "You leave able to sort a plant you have never seen before."),
        blocks: [
        {
          kind: "sort",
          id: "q3",
          prompt: {
            ar: "صنّف كل نبات في مجموعته. اسأل عن طريقة التكاثر، لا عن الشكل.",
            en: "Sort each plant into its group. Ask how it reproduces, not what it looks like.",
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
            { id: "i6", label: { ar: "الطحلب (moss)", en: "Moss" }, bucketId: "non" },
          ],
          explanation: {
            ar: "الوردة والتفاح والعشب كلها تصنع أزهارًا وبذورًا داخل ثمرة — وإن كانت زهرة العشب صغيرة خضراء. والسرخس والطحلب يتكاثران بالأبواغ، والصنوبر يحمل بذوره في مخروط لا في ثمرة.",
            en: "Rose, apple and grass all make flowers and seeds inside a fruit — even though a grass flower is small and green. Ferns and mosses reproduce with spores, and a pine carries its seeds in a cone rather than a fruit.",
          },
        },
        {
          kind: "activity",
          id: "a1",
          title: { ar: "أزهارك المفضّلة", en: "Your favourite flowers" },
          intro: {
            ar: "قبل أن نتعلّم كيف تعمل الزهرة، انظر إليها بعينك. العالِم يلاحظ أولًا ثم يفسّر.",
            en: "Before you learn how a flower works, look at some. A scientist observes first and explains afterwards.",
          },
          needs: [
            { ar: "أزهار من حديقتك أو من صور", en: "Flowers from a garden, or pictures of flowers" },
            { ar: "ورق وألوان", en: "Paper and colouring pencils" },
          ],
          steps: [
            {
              ar: "اجمع صور خمس أزهار مختلفة، أو انظر إلى أزهار حقيقية حولك.",
              en: "Gather pictures of five different flowers, or look at real ones around you.",
            },
            {
              ar: "رتّبها في مجموعات كما تراه مناسبًا: بالحجم، أو باللون، أو بالرائحة. كم مجموعة استطعت أن تصنع؟",
              en: "Put them into groups however you think best: by size, by colour, or by scent. How many groups can you make?",
            },
            {
              ar: "ارسم زهرتك المفضّلة منها، واكتب بجانبها لماذا اخترتها.",
              en: "Draw your favourite one, and write beside it why you chose it.",
            },
            {
              ar: "اعرض مجموعاتك على شخص آخر واشرح له قاعدة التصنيف التي اتبعتها. هل كان سيصنّفها بالطريقة نفسها؟",
              en: "Show your groups to somebody else and explain the rule you sorted by. Would they have sorted them the same way?",
            },
          ],
        },
        ],
      },
      {
        id: "parts",
        kicker: L("سمِّ، ثم اشرح الوظيفة", "Name, then function"),
        title: L("أجزاء الزهرة", "The parts of a flower"),
        lead: L("الزهرة ليست زينة. هي مصنع البذور، ولكل جزء فيها عمل واحد.", "A flower is not decoration. It is a seed factory, and every part has one job."),
        aim: L("تخرج قادرًا على تسمية ستة أجزاء وقول وظيفة كل واحد.", "You leave able to name six parts and say what each one does."),
        blocks: [
        {
          kind: "vocab",
          id: "v1",
          title: { ar: "الكلمات التي ستحتاجها الآن", en: "The words you need right now" },
          terms: [
            { term: { ar: "petals — البتلات", en: "petals" }, meaning: { ar: "الأوراق الملوّنة. تجذب الحشرات.", en: "The coloured leaves. They attract insects." } },
            { term: { ar: "sepals — السبلات", en: "sepals" }, meaning: { ar: "أوراق صغيرة خضراء. تحمي البرعم.", en: "Small green leaves. They protect the bud." } },
            { term: { ar: "stamen — السداة", en: "stamen" }, meaning: { ar: "الجزء المذكّر. وهو anther مع filament.", en: "The male part. An anther plus a filament." } },
            { term: { ar: "anther — المتك", en: "anther" }, meaning: { ar: "يصنع حبوب اللقاح.", en: "It makes the pollen." } },
            { term: { ar: "pollen — حبوب اللقاح", en: "pollen" }, meaning: { ar: "مسحوق دقيق. منه تبدأ البذرة.", en: "A fine powder. A seed begins from it." } },
            { term: { ar: "carpel — الكربلة", en: "carpel" }, meaning: { ar: "الجزء المؤنّث. وهو stigma مع ovary.", en: "The female part. A stigma plus an ovary." } },
            { term: { ar: "stigma — الميسم", en: "stigma" }, meaning: { ar: "قمة لزجة. تلتقط اللقاح.", en: "A sticky top. It catches pollen." } },
            { term: { ar: "ovary — المبيض", en: "ovary" }, meaning: { ar: "فيه بويضات تصير بذورًا. ثم يصير ثمرة.", en: "It holds eggs that become seeds. Later it becomes the fruit." } },
            { term: { ar: "function — الوظيفة", en: "function" }, meaning: { ar: "العمل الذي يقوم به الجزء.", en: "The job a part does." } },
          ],
        },
        {
          kind: "diagram",
          id: "d2",
          title: { ar: "انظر داخل الزهرة", en: "Look inside a flower" },
          art: "flower",
          intro: {
            ar: "هذه زهرة مقطوعة من المنتصف — وهي الطريقة الوحيدة لرؤية المبيض. المس أي جزء لتعرف وظيفته، أو اختره من القائمة.",
            en: "This is a flower cut down the middle, which is the only way to see the ovary. Touch any part to find out what it does, or pick it from the list.",
          },
          parts: [
            {
              id: "sepals",
              term: { ar: "السبلات", en: "Sepals" },
              body: {
                ar: "أوراق صغيرة خضراء تحمي برعم الزهرة قبل أن يتفتّح. بعد التفتّح تبقى تحت البتلات، وكثيرًا ما لا ننتبه إليها.",
                en: "Little green leaves that protect the flower bud before it opens. Afterwards they stay underneath the petals, and are easy to miss.",
              },
            },
            {
              id: "petals",
              term: { ar: "البتلات", en: "Petals" },
              body: {
                ar: "كثيرًا ما تكون زاهية اللون لتجذب الحشرات إلى الزهرة. وأزهار الرياح — كالعشب — بتلاتها صغيرة خضراء أو معدومة، لأنها لا تحتاج أن تجذب أحدًا.",
                en: "Often brightly coloured, to attract insects to the flower. Wind-pollinated flowers such as grasses have small green petals or none at all, because they have nobody to attract.",
              },
            },
            {
              id: "filament",
              term: { ar: "الخيط", en: "Filament" },
              body: {
                ar: "الساق الرفيعة التي ترفع المتك إلى أعلى، حتى تلمسه الحشرة أو تحمل الرياح لقاحه.",
                en: "The slender stalk that holds the anther up high, so an insect brushes against it or the wind can carry its pollen away.",
              },
            },
            {
              id: "anther",
              term: { ar: "المتك", en: "Anther" },
              body: {
                ar: "هنا يُصنع مسحوق حبوب اللقاح (pollen). المتك والخيط معًا يُسمّيان السداة (stamen)، وهي الجزء المذكّر في الزهرة.",
                en: "This is where the powder called pollen is made. The anther and the filament together are called the stamen, the male part of the flower.",
              },
            },
            {
              id: "stigma",
              term: { ar: "الميسم", en: "Stigma" },
              body: {
                ar: "قمة الكربلة، وسطحها لزج عمدًا: أي حبة لقاح تلمسه تلتصق به ولا تسقط. وهي أول ما يستقبل اللقاح.",
                en: "The top of the carpel, and sticky on purpose: any grain of pollen that touches it holds fast instead of falling off. It is the first thing pollen arrives at.",
              },
            },
            {
              id: "ovary",
              term: { ar: "المبيض", en: "Ovary" },
              body: {
                ar: "الجزء المنتفخ في القاع، وفيه بويضات صغيرة تصير بذورًا. الميسم والمبيض معًا يُسمّيان الكربلة (carpel)، وهي الجزء المؤنّث. وهذا هو الجزء الذي يبقى بعد ذبول الزهرة ويتحوّل إلى ثمرة.",
                en: "The swollen part at the base, holding tiny eggs that become seeds. The stigma and the ovary together are called the carpel, the female part. This is the part that stays behind when the flower dies, and becomes the fruit.",
              },
            },
          ],
        },
        {
          kind: "multi",
          id: "q4",
          prompt: {
            ar: "أي هذه الأجزاء تُكوّن السداة (stamen)؟ اختر كل الإجابات الصحيحة.",
            en: "Which of these parts make up the stamen? Choose all the correct answers.",
          },
          choices: [
            { id: "a", label: { ar: "anther — المتك", en: "anther" } },
            { id: "b", label: { ar: "filament — الخيط", en: "filament" } },
            {
              id: "c",
              label: { ar: "stigma — الميسم", en: "stigma" },
              feedback: {
                ar: "الميسم في الجزء المؤنّث لا المذكّر. هو قمة الكربلة (carpel).",
                en: "The stigma is on the female side, not the male one. It is the top of the carpel.",
              },
            },
            {
              id: "d",
              label: { ar: "ovary — المبيض", en: "ovary" },
              feedback: {
                ar: "المبيض هو قاعدة الكربلة (carpel) — الجزء المؤنّث. فيه تنمو البذور.",
                en: "The ovary is the base of the carpel — the female part. It is where the seeds grow.",
              },
            },
          ],
          correctIds: ["a", "b"],
          explanation: {
            ar: "السداة هي الجزء المذكّر، وتتكوّن من المتك (anther) والخيط (filament). أما الميسم والمبيض فهما جزءان من الكربلة (carpel)، وهي الجزء المؤنّث.",
            en: "The stamen is the male part, made of the anther and the filament. The stigma and the ovary belong to the carpel, which is the female part.",
          },
        },
        {
          kind: "match",
          id: "q5",
          prompt: { ar: "صِل كل جزء بوظيفته.", en: "Match each part to its function." },
          pairs: [
            {
              id: "p1",
              left: { ar: "petals — البتلات", en: "petals" },
              right: { ar: "تجذب الحشرات إلى الزهرة", en: "Attract insects to the flower" },
            },
            {
              id: "p2",
              left: { ar: "anther — المتك", en: "anther" },
              right: { ar: "يصنع حبوب اللقاح", en: "Makes the pollen" },
            },
            {
              id: "p3",
              left: { ar: "stigma — الميسم", en: "stigma" },
              right: { ar: "لزج ليلتقط حبوب اللقاح", en: "Sticky, to catch pollen" },
            },
            {
              id: "p4",
              left: { ar: "ovary — المبيض", en: "ovary" },
              right: { ar: "فيه بويضات تصير بذورًا", en: "Holds the eggs that become seeds" },
            },
          ],
          explanation: {
            ar: "لكل جزء وظيفة واحدة واضحة: البتلات تجذب، والمتك يصنع، والميسم يلتقط، والمبيض يحفظ ما سيصير بذورًا.",
            en: "Each part has one clear job: the petals attract, the anther makes, the stigma catches, and the ovary holds what will become the seeds.",
          },
        },
        {
          kind: "activity",
          id: "a2",
          title: { ar: "فكّر كعالِم: لاحِظ زهرة وارسمها", en: "Think like a scientist: observe and draw a flower" },
          intro: {
            ar: "قرأت عن أجزاء الزهرة؛ الآن تحقّق منها بنفسك في زهرة حقيقية. هذا ما يفعله العالِم: لا يصدّق الرسم حتى يرى الشيء.",
            en: "You have read about the parts of a flower; now check them for yourself on a real one. This is what a scientist does: not trusting the diagram until they have seen the thing.",
          },
          needs: [
            { ar: "زهرة واحدة", en: "One flower" },
            { ar: "عدسة مكبّرة إن توفّرت", en: "A hand lens, if you have one" },
            { ar: "ملقط أو أصابع رفيقة", en: "Tweezers, or gentle fingers" },
          ],
          safety: {
            ar: "اغسل يديك بعد لمس الأزهار، ولا تضع أي جزء منها في فمك.",
              en: "Wash your hands after touching flowers, and never put any part of one in your mouth.",
          },
          steps: [
            { ar: "ارسم الزهرة كما تراها، واكتب اسم كل جزء تعرفه.", en: "Draw the flower as you see it, and label every part you know." },
            {
              ar: "عُدّ البتلات والسبلات والأسدية، وسجّل الأعداد في جدول.",
              en: "Count the petals, the sepals and the stamens, and record the numbers in a table.",
            },
            {
              ar: "انظر إلى جدولك: هل تجد نمطًا؟ مثلًا، هل عدد السبلات يساوي عدد البتلات؟",
              en: "Look at your table: can you see a pattern? For instance, is the number of sepals the same as the number of petals?",
            },
            {
              ar: "انزع البتلات والسبلات برفق بالملقط حتى ترى ما بداخلها.",
              en: "Carefully pull off the petals and the sepals with the tweezers so you can see inside.",
            },
            {
              ar: "المس طرف الـ anther برفق. ماذا ترى على إصبعك؟",
              en: "Touch the tip of an anther gently. What do you notice on your finger?",
            },
            {
              ar: "المس الـ stigma. كيف يبدو ملمسه؟ ولماذا تظنه كذلك؟",
              en: "Touch the stigma. How does it feel — and why do you think it feels that way?",
            },
          ],
        },
        ],
      },
      {
        id: "cycle",
        kicker: L("الدورة", "The cycle"),
        title: L("دورة حياة النبات الزهري", "The life cycle of a flowering plant"),
        lead: L("الزهرة تعيش أيامًا قليلة. ما الذي يبقى بعدها؟", "A flower lives only a few days. What stays behind?"),
        aim: L("تخرج قادرًا على ذكر خمس مراحل بالترتيب، وقول لماذا نرسمها دائرة.", "You leave able to name five stages in order, and say why we draw them as a circle."),
        blocks: [
        {
          kind: "concept",
          id: "c3",
          title: { ar: "ما الذي يبقى بعد الزهرة؟", en: "What stays behind after the flower?" },
          body: {
            ar: "الزهرة تعيش أيامًا قليلة. ثم تذبل وتسقط.\n\nلكن جزءًا واحدًا يبقى: المبيض (ovary). يتحوّل إلى ثمرة، وتنمو البذور داخلها.\n\nوتلك البذور تصير نباتات جديدة. وتلك النباتات تُزهر. ويحدث الأمر كله من جديد.\n\nولهذا نسمّيها دورة.",
            en: "A flower lives only a few days. Then it dies and falls off.\n\nBut one part stays behind: the ovary. It becomes the fruit, and the seeds grow inside it.\n\nThose seeds grow into new plants. Those plants flower. And the whole thing happens again.\n\nThat is why we call it a cycle.",
          },
        },
        {
          kind: "diagram",
          id: "d1",
          title: { ar: "الدورة، مرحلة بمرحلة", en: "The cycle, stage by stage" },
          art: "life-cycle",
          intro: {
            ar: "هذه هي الدورة كاملة. المس أي مرحلة لتعرف ما يحدث فيها، ولاحظ أن السهم الأخير يعود إلى الأولى.",
            en: "Here is the whole cycle. Touch any stage to find out what happens in it, and notice that the last arrow leads back to the first.",
          },
          parts: [
            {
              id: "seed",
              term: { ar: "البذرة", en: "Seed" },
              body: {
                ar: "البذرة تنتظر الماء والدفء. بداخلها نبتة صغيرة جدًّا وغذاء يكفيها حتى تخرج أوراقها الأولى.",
                en: "The seed waits for water and warmth. Inside it is a tiny plant and enough food to last until its first leaves open.",
              },
            },
            {
              id: "seedling",
              term: { ar: "البادرة", en: "Seedling" },
              body: {
                ar: "البذرة تنبت (germinates): ينزل الجذر أولًا بحثًا عن الماء، ثم تصعد الساق نحو الضوء.",
                en: "The seed germinates: the root goes down first, looking for water, then the shoot pushes up towards the light.",
              },
            },
            {
              id: "plant",
              term: { ar: "النبات الكامل", en: "Adult plant" },
              body: {
                ar: "النبات يكبر ويصنع غذاءه بنفسه من ضوء الشمس. لن يُزهر حتى يجمع طاقة تكفي لصنع البذور.",
                en: "The plant grows and makes its own food from sunlight. It will not flower until it has stored enough energy to make seeds.",
              },
            },
            {
              id: "flower",
              term: { ar: "الزهرة", en: "Flower" },
              body: {
                ar: "الزهرة تتفتّح بضعة أيام فقط ثم تذبل. وظيفتها في هذه الأيام القليلة أن يتكاثر النبات.",
                en: "The flower opens for only a few days, then dies. In those few days its job is to let the plant reproduce.",
              },
            },
            {
              id: "fruit",
              term: { ar: "الثمرة", en: "Fruit" },
              body: {
                ar: "المبيض هو الجزء الذي يبقى بعد سقوط الزهرة، ويتحوّل إلى ثمرة تحمي البذور بداخلها — ثم تُطلقها فتبدأ الدورة من جديد.",
                en: "The ovary is the part that stays behind after the flower falls. It becomes the fruit, protecting the seeds inside — then releases them, and the cycle starts again.",
              },
            },
          ],
        },
        {
          kind: "order",
          id: "q1",
          prompt: {
            ar: "هذه مراحل دورة حياة نبات الفاصولياء، لكنها مختلطة. رتّبها ابتداءً من البذرة.",
            en: "These are the stages in the life cycle of a bean plant, but they are mixed up. Put them in order, starting from the seed.",
          },
          items: [
            { id: "o1", label: { ar: "البذرة", en: "Seed" } },
            { id: "o2", label: { ar: "البادرة", en: "Seedling" } },
            { id: "o3", label: { ar: "النبات الكامل", en: "Adult plant" } },
            { id: "o4", label: { ar: "الزهرة", en: "Flower" } },
            { id: "o5", label: { ar: "قرن الفاصولياء (الثمرة)", en: "Bean pod (the fruit)" } },
          ],
          explanation: {
            ar: "البذرة تنبت فتصير بادرة، تكبر فتصير نباتًا كاملًا، ثم يُزهر، ثم تتحوّل الزهرة إلى قرن فيه بذور جديدة — وتبدأ الدورة من أولها.",
            en: "The seed germinates into a seedling, which grows into an adult plant, which flowers, and the flower becomes a pod holding new seeds — and the cycle begins again.",
          },
        },
        {
          kind: "mcq",
          id: "q2",
          prompt: { ar: "لماذا نرسم دورة الحياة على هيئة دائرة؟", en: "Why do we draw a life cycle as a circle?" },
          choices: [
            {
              id: "a",
              label: { ar: "لأن الدائرة أجمل في الرسم", en: "Because a circle looks nicer on the page" },
              feedback: {
                ar: "الشكل ليس سببًا. اسأل: ما الذي يحدث بعد آخر مرحلة؟",
                en: "A shape is not a reason. Ask yourself what happens after the last stage.",
              },
            },
            { id: "b", label: { ar: "لأن آخر مرحلة تؤدي إلى أول مرحلة فتتكرر بلا نهاية", en: "Because the last stage leads back to the first, so it repeats without end" } },
            {
              id: "c",
              label: { ar: "لأن النبات ينمو في شكل دائري", en: "Because the plant grows in a circular shape" },
              feedback: {
                ar: "النبات ينمو إلى أعلى لا في دائرة. الذي يعود إلى بدايته هو المراحل، لا شكل النبات.",
                en: "The plant grows upwards, not in a circle. It is the stages that come round again, not the plant's shape.",
              },
            },
          ],
          correctId: "b",
          hint: { ar: "ما معنى كلمة «دورة»؟", en: "What does the word “cycle” mean?" },
          explanation: {
            ar: "الدورة شيء يتكرر مرة بعد مرة. بذور النبات الجديد تنبت فتصنع نباتًا يُزهر ويصنع بذورًا — فلا بداية ولا نهاية للخط، ولهذا نرسمه دائرة.",
            en: "A cycle is something that happens over and over. The new plant's seeds germinate and make a plant that flowers and makes seeds — there is no end to the line, so we draw it as a circle.",
          },
        },
        ],
      },
      {
        id: "check",
        kicker: L("اختبار الإتقان", "Mastery check"),
        title: L("ثلاثة أسئلة، وتصحيح فوري", "Three questions, marked as you go"),
        lead: L("أجب من ذاكرتك. الرجوع إلى الأعلى لا يعلّمك شيئًا.", "Answer from memory. Scrolling back up teaches you nothing."),
        blocks: [
        {
          kind: "truefalse",
          id: "q6",
          statement: {
            ar: "كل زهرة لا بد أن تحتوي على الجزأين المذكّر والمؤنّث معًا.",
            en: "Every flower must contain both the male and the female parts.",
          },
          answer: false,
          whenWrong: {
            ar: "معظم الأزهار فيها الاثنان معًا — لكن «معظم» ليست «كل». فكّر في نبات تحمل بعض أزهاره اللقاح فقط.",
            en: "Most flowers do have both — but \u201cmost\u201d is not \u201cevery\u201d. Think of a plant where some flowers only carry pollen.",
          },
          explanation: {
            ar: "خطأ. معظم النباتات الزهرية لها أزهار تحمل الجزأين معًا، لكن بعض النباتات لها أزهار تحمل الجزء المذكّر وحده أو المؤنّث وحده.",
            en: "False. Most flowering plants have flowers with both parts, but some plants have flowers with only male parts, or only female parts.",
          },
        },
        {
          kind: "fill",
          id: "q7",
          prompt: { ar: "أكمل الجملتين.", en: "Complete the two sentences." },
          text: {
            ar: "الجزء الذي يصنع حبوب اللقاح هو {{1}}، والنبات الذي يتكاثر بالأبواغ بدل البذور مثل السرخس نسميه نباتًا {{2}}.",
            en: "The part of a flower that makes pollen is the {{1}}, and a plant such as a fern that reproduces with spores instead of seeds is called a {{2}} plant.",
          },
          blanks: [
            { id: "b1", answers: ["anther", "the anther", "المتك", "متك", "stamen", "السداة"] },
            { id: "b2", answers: ["non-flowering", "non flowering", "nonflowering", "غير زهري", "غير الزهري"] },
          ],
          explanation: {
            ar: "المتك (anther) هو مصنع اللقاح داخل السداة. والسرخس نبات غير زهري لأنه لا يصنع بذورًا ولا أزهارًا.",
            en: "The anther is the pollen factory inside the stamen. A fern is a non-flowering plant because it makes neither seeds nor flowers.",
          },
        },
        {
          kind: "mcq",
          id: "q8",
          prompt: {
            ar: "بعض الأزهار لونها بنّي محمر داكن ورائحتها كرائحة اللحم المتعفّن. ما تفسير ذلك في رأيك؟",
            en: "Some flowers are dark reddish brown with a scent like rotting meat. Why do you think that is?",
          },
          choices: [
            {
              id: "a",
              label: { ar: "لأنها نباتات مريضة", en: "Because those plants are diseased" },
              feedback: {
                ar: "هذه النباتات سليمة تمامًا. اسأل: لمن هذه الرائحة؟",
                en: "These plants are perfectly healthy. Ask instead: who is that smell for?",
              },
            },
            {
              id: "b",
              label: { ar: "لأن ملقّحاتها هي الذباب، والذباب ينجذب إلى ذلك اللون وتلك الرائحة", en: "Because their pollinators are flies, and flies are drawn to that colour and that smell" },
            },
            {
              id: "c",
              label: { ar: "لأنها لا تحتاج إلى التلقيح إطلاقًا", en: "Because they do not need pollinating at all" },
              feedback: {
                ar: "كل نبات زهري يحتاج التلقيح، وإلا فلا بذور. اسأل: أي حيوان تعجبه هذه الرائحة؟",
                en: "Every flowering plant needs pollinating, or there are no seeds. Ask which animal likes that smell.",
              },
            },
          ],
          correctId: "b",
          hint: { ar: "الزهرة لا تختار لونها لتعجبك أنت.", en: "A flower does not choose its colour to please you." },
          explanation: {
            ar: "الزهرة تُعلن عن نفسها لمن ينقل لقاحها. النحلة تنجذب إلى الألوان الزاهية والرائحة الحلوة، والذبابة تنجذب إلى اللحم المتعفّن — فصارت هذه الأزهار تشبهه لونًا ورائحة. كل زهرة تعلن بلغة ملقِّحها.",
            en: "A flower advertises to whatever carries its pollen. Bees are drawn to bright colours and sweet scents; flies are drawn to rotting meat — so these flowers have come to look and smell like it. Every flower advertises in the language of its own pollinator.",
          },
        },
        ],
      },
      {
        id: "done",
        kicker: L("ماذا تستطيع الآن", "What you can do now"),
        title: L("أنهيت الدرس 1.1", "Lesson 1.1 finished"),
        lead: L("ارجع إلى صندوق الأهداف في كتابك وقارنه بما علّمته على نفسك هنا.", "Go back to the aims box in your book and compare it with what you have just ticked here."),
        blocks: [
        {
          kind: "summary",
          id: "s1",
          title: { ar: "خلاصة الدرس", en: "Lesson summary" },
          points: [
            {
              ar: "النباتات نوعان: زهرية لها أزهار، وغير زهرية لا أزهار لها.",
              en: "Plants fall into two groups: flowering plants, which have flowers, and non-flowering plants, which do not.",
            },
            {
              ar: "وظيفة الزهرة أن يتكاثر النبات؛ فيتحوّل المبيض إلى ثمرة وتتكوّن البذور داخلها.",
              en: "A flower's job is to help the plant reproduce: the ovary becomes the fruit, and the seeds form inside it.",
            },
            {
              ar: "دورة الحياة: بذرة ← نبات ← زهرة ← ثمرة ← بذور جديدة، وتتكرر بلا نهاية.",
              en: "The life cycle: seed → plant → flower → fruit → new seeds, repeating without end.",
            },
            {
              ar: "أجزاء الزهرة في حلقات: سبلات تحمي، بتلات تجذب، سداة تصنع اللقاح، كربلة تلتقطه وتنمو فيها البذور.",
              en: "The parts sit in rings: sepals protect, petals attract, the stamen makes pollen, the carpel catches it and grows the seeds.",
            },
            {
              ar: "غير الزهرية نوعان: أبواغ (سرخس وطحلب) أو بذور في مخروط (صنوبر).",
              en: "Non-flowering plants come in two kinds: spores (ferns, mosses) or seeds in a cone (conifers).",
            },
          ],
        },
        {
          kind: "checklist",
          id: "k1",
          title: { ar: "انظر ماذا أستطيع الآن!", en: "Look what I can do!" },
          items: [
            {
              ar: "أعرف أن بعض النباتات لها أزهار وبعضها ليس له أزهار.",
              en: "I know that some plants have flowers and other plants do not.",
            },
            { ar: "أستطيع ذكر مراحل دورة حياة النبات الزهري.", en: "I can say what the stages are in the life cycle of a flowering plant." },
            { ar: "أستطيع تصنيف الأزهار والنباتات في مجموعات.", en: "I can sort and group flowers and plants." },
            {
              ar: "أستطيع تسمية أجزاء الزهرة ووصف وظيفة كل جزء.",
              en: "I can identify the parts of a flower and describe their functions.",
            },
            { ar: "أستطيع ملاحظة زهرة ورسمها وكتابة أسماء أجزائها.", en: "I can observe a flower, draw it and label its parts." },
            { ar: "أستطيع وصف نمط ألاحظه في نتائجي.", en: "I can describe a pattern in what I observe." },
          ],
        },
        {
          kind: "activity",
          id: "a3",
          title: { ar: "خطّط لتجربة: أي لون بتلات هو الأكثر شيوعًا؟", en: "Plan an investigation: which petal colour is most common?" },
          intro: {
            ar: "بتلات الأزهار ألوان مختلفة. هل بعضها أكثر شيوعًا من بعض؟ لن نجيب بالتخمين بل بجمع بيانات — وهذا هو الفرق.",
            en: "Flower petals come in different colours. Is one colour more common than the others? We will not answer by guessing but by collecting data — and that is the whole difference.",
          },
          steps: [
            {
              ar: "قرّر أين ستنظر: حديقة البيت؟ الشارع؟ الحديقة العامة؟ واكتب المكان.",
              en: "Decide where you will look: your garden, your street, a park? Write the place down.",
            },
            {
              ar: "قرّر كم زهرة ستعدّ. عشر أزهار قليلة جدًّا لتثق بنتيجتك — لماذا؟",
              en: "Decide how many flowers you will count. Ten is too few to trust your answer — why?",
            },
            {
              ar: "اصنع جدولًا فيه عمود للون وعمود للعدد، وسجّل فيه وأنت تعدّ.",
              en: "Make a table with a column for colour and a column for the count, and fill it in as you go.",
            },
            {
              ar: "قرّر كيف ستعرض نتيجتك: هل الرسم البياني بالأعمدة أوضح من الجدول؟ ولماذا؟",
              en: "Decide how you will present your result: would a bar chart show it more clearly than the table? Why?",
            },
            {
              ar: "وأخيرًا: هل نتيجتك تصلح لكل مكان في العالم، أم لمكانك أنت في هذا الوقت من السنة فقط؟",
              en: "Finally: does your answer hold everywhere in the world, or only for your place at this time of year?",
            },
          ],
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
