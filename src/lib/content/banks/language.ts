import { bank } from "./shared";

/** English for first-language curricula (US English Language Arts, UK English). */
export const englishNativeBank = bank("english-native", [
  {
    id: "reading",
    title: "Reading and Comprehension|القراءة والفهم",
    summary:
      "Decoding words, reading fluently and understanding what a text really says.|تحليل الكلمات والقراءة بطلاقة وفهم ما يقوله النص.",
    topics: {
      early: [
        "Letters and their sounds|الحروف وأصواتها",
        "Rhyming words|الكلمات المتشابهة في النهاية",
        "Listening to a story|الاستماع إلى قصة",
        "Holding a book and reading left to right|الإمساك بالكتاب واتجاه القراءة",
      ],
      lower: [
        "Blending sounds into words|دمج الأصوات لتكوين كلمات",
        "Common sight words|الكلمات البصرية الشائعة",
        "Retelling a story|إعادة سرد القصة",
        "Characters, setting and events|الشخصيات والمكان والأحداث",
        "Reading for details|القراءة لالتقاط التفاصيل",
        "Fiction and non-fiction|النصوص الأدبية والمعلوماتية",
      ],
      middle: [
        "Main idea and supporting details|الفكرة الرئيسة والتفاصيل الداعمة",
        "Making inferences|الاستنتاج",
        "Summarising a text|تلخيص النص",
        "Context clues for new words|استنتاج معنى الكلمة من السياق",
        "Compare and contrast texts|الموازنة بين نصين",
        "Author's purpose|هدف الكاتب",
        "Theme in a story|الفكرة العامة في القصة",
        "Point of view|وجهة النظر السردية",
        "Text structure in non-fiction|بنية النص المعلوماتي",
      ],
      upper: [
        "Analysing an argument|تحليل الحجة",
        "Evidence and citation|الاستشهاد بالدليل",
        "Figurative language|اللغة المجازية",
        "Tone, mood and word choice|النبرة والجو واختيار الألفاظ",
        "Comparing texts on one topic|موازنة نصوص حول موضوع واحد",
        "Reading Shakespeare and classic texts|قراءة النصوص الكلاسيكية",
        "Bias and reliability of sources|التحيّز وموثوقية المصادر",
        "Close reading of poetry|القراءة المتعمقة للشعر",
      ],
    },
  },
  {
    id: "writing",
    title: "Writing and Composition|الكتابة والتعبير",
    summary:
      "Planning, drafting and polishing writing for different purposes and readers.|التخطيط للكتابة وصياغتها وتحسينها بحسب الغرض والقارئ.",
    topics: {
      early: [
        "Writing my name|كتابة اسمي",
        "Drawing and labelling|الرسم وكتابة المسميات",
        "Writing simple sentences|كتابة جمل بسيطة",
      ],
      lower: [
        "Sentences with capitals and full stops|الجمل وعلامات الترقيم",
        "Writing about a personal event|الكتابة عن حدث شخصي",
        "Describing with adjectives|الوصف بالصفات",
        "Writing instructions|كتابة تعليمات",
      ],
      middle: [
        "Planning a paragraph|التخطيط للفقرة",
        "Narrative writing|الكتابة السردية",
        "Informative writing|الكتابة المعلوماتية",
        "Opinion and persuasive writing|كتابة الرأي والإقناع",
        "Editing and revising|المراجعة والتنقيح",
        "Writing a book review|كتابة مراجعة كتاب",
      ],
      upper: [
        "Structuring an essay|بناء المقال",
        "Thesis statements|صياغة الفكرة المركزية",
        "Persuasive techniques|أساليب الإقناع",
        "Creative writing: voice and style|الكتابة الإبداعية: الصوت والأسلوب",
        "Research writing and referencing|الكتابة البحثية والتوثيق",
        "Formal letters and reports|الرسائل الرسمية والتقارير",
      ],
    },
  },
  {
    id: "grammar",
    title: "Grammar and Vocabulary|القواعد والمفردات",
    summary:
      "How sentences are built, and the words that make writing precise.|كيف تُبنى الجملة، والمفردات التي تجعل الكتابة دقيقة.",
    topics: {
      early: ["Naming words|كلمات الأسماء", "Action words|كلمات الأفعال"],
      lower: [
        "Nouns, verbs and adjectives|الأسماء والأفعال والصفات",
        "Singular and plural|المفرد والجمع",
        "Present and past tense|المضارع والماضي",
        "Joining sentences with and, but, so|ربط الجمل",
      ],
      middle: [
        "Subject and predicate|المسند والمسند إليه",
        "Pronouns and antecedents|الضمائر ومرجعها",
        "Adverbs and prepositions|الظروف وحروف الجر",
        "Punctuation: commas and speech marks|الترقيم: الفواصل وعلامات الاقتباس",
        "Prefixes, suffixes and root words|السوابق واللواحق وجذور الكلمات",
        "Synonyms and antonyms|المترادفات والأضداد",
      ],
      upper: [
        "Clauses and complex sentences|الجمل المركّبة والعبارات",
        "Active and passive voice|المبني للمعلوم والمجهول",
        "Conditionals and modals|الجمل الشرطية وأفعال الاحتمال",
        "Consistent tense and agreement|اتساق الأزمنة والمطابقة",
        "Academic vocabulary|المفردات الأكاديمية",
        "Idioms and collocations|التعبيرات الاصطلاحية والمتلازمات",
      ],
    },
  },
  {
    id: "speaking",
    title: "Speaking and Listening|التحدث والاستماع",
    summary:
      "Talking clearly, listening carefully and presenting ideas to an audience.|التحدث بوضوح والاستماع الجيد وعرض الأفكار أمام الآخرين.",
    topics: {
      early: ["Talking about my day|أتحدث عن يومي"],
      lower: ["Asking and answering questions|السؤال والإجابة", "Sharing news with the class|مشاركة خبر مع الصف"],
      middle: ["Presenting to a group|العرض أمام مجموعة", "Listening to understand|الاستماع للفهم", "Working in a discussion|المشاركة في نقاش"],
      upper: ["Debating a motion|المناظرة", "Delivering a persuasive speech|إلقاء خطاب مقنع", "Giving and receiving feedback|إعطاء التغذية الراجعة وتلقيها"],
    },
  },
]);

/** English as an additional language, used by the Saudi curriculum. */
export const englishEflBank = bank("english-efl", [
  {
    id: "vocabulary",
    title: "Vocabulary and Everyday English|المفردات والإنجليزية اليومية",
    summary:
      "The words a learner needs to talk about school, family and daily life.|المفردات التي يحتاجها المتعلم للحديث عن المدرسة والأسرة والحياة اليومية.",
    topics: {
      early: ["Greetings and my name|التحية والتعريف بالاسم", "Colours and numbers 1-10|الألوان والأعداد ١-١٠"],
      lower: [
        "The alphabet and letter sounds|الحروف الإنجليزية وأصواتها",
        "My family|أسرتي",
        "Classroom objects|أدوات الفصل",
        "Days, months and weather|الأيام والشهور والطقس",
      ],
      middle: [
        "Food and drinks|الطعام والشراب",
        "Places in my city|أماكن في مدينتي",
        "Jobs and occupations|المهن",
        "Hobbies and free time|الهوايات ووقت الفراغ",
        "Clothes and shopping|الملابس والتسوق",
        "Travel and transport|السفر والمواصلات",
      ],
      upper: [
        "Technology and the internet|التقنية والإنترنت",
        "Health and lifestyle|الصحة ونمط الحياة",
        "The environment|البيئة",
        "Study and future careers|الدراسة والمستقبل المهني",
        "Phrasal verbs in daily use|الأفعال المركبة الشائعة",
        "Formal and informal register|اللغة الرسمية وغير الرسمية",
      ],
    },
  },
  {
    id: "grammar",
    title: "English Grammar|قواعد اللغة الإنجليزية",
    summary:
      "Sentence patterns and tenses, taught step by step for an Arabic-speaking learner.|أنماط الجمل والأزمنة مشروحة خطوة بخطوة للمتعلم الناطق بالعربية.",
    topics: {
      early: ["I am / You are|صيغة I am و You are"],
      lower: [
        "This is / These are|This is و These are",
        "Have got and possession|التعبير عن الملكية",
        "Simple present tense|زمن المضارع البسيط",
        "Question words|أدوات الاستفهام",
      ],
      middle: [
        "Present continuous|المضارع المستمر",
        "Simple past of regular verbs|الماضي البسيط للأفعال المنتظمة",
        "Irregular past verbs|الأفعال الشاذة في الماضي",
        "Comparatives and superlatives|اسم التفضيل",
        "Countable and uncountable nouns|الأسماء المعدودة وغير المعدودة",
        "Future with will and going to|المستقبل",
      ],
      upper: [
        "Present perfect|المضارع التام",
        "Past continuous and past perfect|الماضي المستمر والماضي التام",
        "Conditionals type 1 and 2|الجمل الشرطية الأولى والثانية",
        "Passive voice|المبني للمجهول",
        "Reported speech|الكلام المنقول",
        "Relative clauses|جمل الوصل",
      ],
    },
  },
  {
    id: "skills",
    title: "Reading and Writing Skills|مهارات القراءة والكتابة",
    summary:
      "Reading short texts with confidence and writing clear messages and paragraphs.|قراءة النصوص القصيرة بثقة وكتابة رسائل وفقرات واضحة.",
    topics: {
      early: ["Reading my first words|قراءة كلماتي الأولى"],
      lower: ["Reading short sentences|قراءة جمل قصيرة", "Writing about myself|الكتابة عن نفسي"],
      middle: [
        "Reading a short story|قراءة قصة قصيرة",
        "Understanding a timetable or menu|فهم جدول أو قائمة طعام",
        "Writing an email to a friend|كتابة رسالة إلكترونية لصديق",
        "Writing a short paragraph|كتابة فقرة قصيرة",
      ],
      upper: [
        "Reading an article for gist and detail|قراءة مقال للفكرة والتفاصيل",
        "Writing a formal email|كتابة رسالة رسمية",
        "Writing an opinion paragraph|كتابة فقرة رأي",
        "Summarising a text in English|تلخيص نص بالإنجليزية",
      ],
    },
  },
  {
    id: "listening",
    title: "Listening and Speaking|الاستماع والتحدث",
    summary:
      "Understanding spoken English and holding a simple conversation.|فهم اللغة المنطوقة وإدارة محادثة بسيطة.",
    topics: {
      early: ["Following simple instructions|اتباع تعليمات بسيطة"],
      lower: ["Introducing myself|التعريف بنفسي", "Asking for something politely|الطلب بأدب"],
      middle: ["Ordering food|طلب الطعام", "Asking for directions|السؤال عن الاتجاهات", "Talking about my weekend|الحديث عن عطلتي"],
      upper: ["Taking part in a discussion|المشاركة في نقاش", "Giving a short presentation|تقديم عرض قصير", "Understanding different accents|فهم اللهجات المختلفة"],
    },
  },
]);

/** Arabic as a first language: the Saudi «لغتي» course. */
export const arabicBank = bank("arabic", [
  {
    id: "qiraa",
    title: "القراءة والاستيعاب|Reading and Comprehension",
    summary:
      "قراءة النصوص بطلاقة وفهم معانيها واستخلاص أفكارها.|Reading Arabic texts fluently and drawing out their meaning.",
    topics: {
      early: [
        "الحروف الهجائية وأصواتها|Arabic letters and their sounds",
        "المدود القصيرة والحركات|Short vowels and harakat",
        "قراءة الكلمات الأولى|Reading first words",
        "الاستماع إلى قصة|Listening to a story",
      ],
      lower: [
        "المقاطع والمدود|Syllables and long vowels",
        "التنوين والسكون|Tanween and sukoon",
        "اللام الشمسية والقمرية|Sun and moon laam",
        "قراءة نص قصير بطلاقة|Reading a short text fluently",
        "فهم المقروء: أسئلة مباشرة|Direct comprehension questions",
        "الترتيب الزمني للأحداث|Sequencing events",
      ],
      middle: [
        "الفكرة الرئيسة والأفكار الفرعية|Main and supporting ideas",
        "استخراج المعلومات من النص|Finding information in a text",
        "معاني المفردات من السياق|Word meaning from context",
        "أنواع النصوص: قصة ومقال وخبر|Text types",
        "التلخيص|Summarising",
        "الاستنتاج والتوقع|Inference and prediction",
        "قراءة النص الشعري|Reading poetry",
        "الموازنة بين نصين|Comparing two texts",
        "القراءة الناقدة|Critical reading",
      ],
      upper: [
        "تحليل النص الأدبي|Analysing a literary text",
        "الصور البيانية: التشبيه والاستعارة|Simile and metaphor",
        "الشعر العربي: البحور والقافية|Arabic poetry: metre and rhyme",
        "النص الإقناعي وأساليبه|Persuasive texts",
        "النص المعلوماتي وبنيته|Structure of informational texts",
        "أدب الرحلة والسيرة|Travel writing and biography",
        "تحليل الحجج والأدلة|Analysing arguments and evidence",
        "المدارس الأدبية الحديثة|Modern literary movements",
      ],
    },
  },
  {
    id: "kitaba",
    title: "الكتابة والتعبير|Writing and Expression",
    summary:
      "كتابة الحروف والكلمات ثم إنشاء الفقرات والنصوص المتكاملة.|From letter formation to writing full paragraphs and texts.",
    topics: {
      early: ["كتابة الحروف|Forming letters", "نسخ الكلمات|Copying words"],
      lower: [
        "كتابة الجملة المفيدة|Writing a complete sentence",
        "الإملاء المنظور|Guided dictation",
        "علامات الترقيم الأساسية|Basic punctuation",
        "التعبير عن صورة|Writing about a picture",
      ],
      middle: [
        "بناء الفقرة|Building a paragraph",
        "التعبير السردي|Narrative writing",
        "التعبير الوصفي|Descriptive writing",
        "كتابة الرسالة|Writing a letter",
        "الإملاء: الهمزات|Spelling the hamza",
        "المراجعة والتنقيح|Revising and editing",
      ],
      upper: [
        "كتابة المقال|Writing an essay",
        "المقدمة والخاتمة|Introductions and conclusions",
        "التقرير والملخص|Reports and summaries",
        "الكتابة الإقناعية|Persuasive writing",
        "الكتابة الإبداعية|Creative writing",
        "الاقتباس والتوثيق|Quoting and referencing",
      ],
    },
  },
  {
    id: "nahw",
    title: "الظواهر النحوية|Arabic Grammar",
    summary:
      "قواعد النحو والصرف التي تضبط الجملة العربية.|The grammar and morphology that hold an Arabic sentence together.",
    topics: {
      early: ["الاسم والفعل|Nouns and verbs"],
      lower: [
        "الجملة الاسمية|The nominal sentence",
        "الجملة الفعلية|The verbal sentence",
        "المفرد والمثنى والجمع|Singular, dual and plural",
        "المذكر والمؤنث|Masculine and feminine",
      ],
      middle: [
        "المبتدأ والخبر|Subject and predicate",
        "الفعل وأزمنته|Verb tenses",
        "الفاعل والمفعول به|Doer and object",
        "الضمائر|Pronouns",
        "حروف الجر|Prepositions",
        "النعت والإضافة|Adjectives and idafa",
      ],
      upper: [
        "كان وأخواتها|Kana and its sisters",
        "إنّ وأخواتها|Inna and its sisters",
        "الأفعال الخمسة|The five verbs",
        "المفعول لأجله والمفعول المطلق|Objects of purpose and absolute",
        "الممنوع من الصرف|Diptotes",
        "الاشتقاق والميزان الصرفي|Derivation and morphological patterns",
      ],
    },
  },
  {
    id: "tawasul",
    title: "التواصل الشفهي|Oral Communication",
    summary:
      "الاستماع الجيد والتحدث بالفصحى أمام الآخرين.|Listening well and speaking standard Arabic with confidence.",
    topics: {
      early: ["التحدث عن نفسي|Talking about myself"],
      lower: ["إلقاء نشيد|Reciting a rhyme", "سرد قصة سمعتها|Retelling a story"],
      middle: ["الإلقاء أمام الصف|Presenting to the class", "الحوار والمناقشة|Dialogue and discussion", "وصف مشهد شفهيًا|Describing a scene aloud"],
      upper: ["الخطابة|Public speaking", "المناظرة|Debate", "إدارة حوار|Leading a discussion"],
    },
  },
]);
