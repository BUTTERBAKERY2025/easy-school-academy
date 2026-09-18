import { bank } from "./shared";

/** Computing / digital skills, shared by the three curricula. */
export const computingBank = bank("computing", [
  {
    id: "digital",
    title: "Digital Literacy|المهارات الرقمية الأساسية",
    summary:
      "Using a device, files and the internet confidently and safely.|استخدام الجهاز والملفات والإنترنت بثقة وأمان.",
    topics: {
      early: ["Parts of a computer|أجزاء الحاسب", "Using a mouse and touchscreen|استخدام الفأرة والشاشة اللمسية"],
      lower: [
        "Keyboard basics|أساسيات لوحة المفاتيح",
        "Saving and finding files|حفظ الملفات والبحث عنها",
        "Drawing and typing on a device|الرسم والكتابة على الجهاز",
        "Staying safe online|الأمان على الإنترنت",
      ],
      middle: [
        "Searching the web effectively|البحث الفعّال في الإنترنت",
        "Word processing and formatting|معالجة النصوص والتنسيق",
        "Spreadsheets and simple formulas|الجداول الحسابية والصيغ البسيطة",
        "Making a presentation|إعداد عرض تقديمي",
        "Judging whether a source is reliable|تقويم موثوقية المصدر",
        "Digital citizenship and kindness online|المواطنة الرقمية",
      ],
      upper: [
        "Collaborating on cloud documents|العمل التشاركي على المستندات السحابية",
        "Data, charts and analysis|البيانات والرسوم والتحليل",
        "Cyber security and strong passwords|الأمن السيبراني وكلمات المرور",
        "Digital footprint and privacy|الأثر الرقمي والخصوصية",
        "Artificial intelligence in daily life|الذكاء الاصطناعي في الحياة اليومية",
        "Copyright and fair use|حقوق النشر والاستخدام العادل",
      ],
    },
  },
  {
    id: "programming",
    title: "Programming and Problem Solving|البرمجة وحل المشكلات",
    summary:
      "Thinking in algorithms and turning ideas into working programs.|التفكير بالخوارزميات وتحويل الأفكار إلى برامج تعمل.",
    topics: {
      early: ["Giving step-by-step instructions|إعطاء تعليمات متسلسلة"],
      lower: [
        "Algorithms as everyday steps|الخوارزمية كخطوات يومية",
        "Sequencing blocks in Scratch|ترتيب اللبنات في سكراتش",
        "Loops that repeat|التكرار في البرمجة",
        "Finding and fixing a bug|اكتشاف الخطأ وإصلاحه",
      ],
      middle: [
        "Conditionals: if this, then that|الجمل الشرطية",
        "Variables that store values|المتغيرات",
        "Events and user input|الأحداث ومدخلات المستخدم",
        "Building a simple game|بناء لعبة بسيطة",
        "Decomposing a big problem|تفكيك المشكلة الكبيرة",
        "Testing and debugging|الاختبار وتصحيح الأخطاء",
      ],
      upper: [
        "Python basics: variables and types|أساسيات بايثون: المتغيرات والأنواع",
        "Loops and conditions in Python|الحلقات والشروط في بايثون",
        "Functions and reuse|الدوال وإعادة الاستخدام",
        "Lists and dictionaries|القوائم والقواميس",
        "Working with files and data|التعامل مع الملفات والبيانات",
        "Building a small project|بناء مشروع صغير",
      ],
    },
  },
  {
    id: "systems",
    title: "How Computers Work|كيف تعمل الحواسيب",
    summary:
      "Hardware, networks and the ideas behind the machines we use.|العتاد والشبكات والأفكار وراء الأجهزة التي نستخدمها.",
    topics: {
      lower: ["Inputs and outputs|المدخلات والمخرجات"],
      middle: [
        "Hardware and software|العتاد والبرمجيات",
        "How the internet connects us|كيف يربطنا الإنترنت",
        "Storage and memory|التخزين والذاكرة",
      ],
      upper: [
        "Binary and data representation|النظام الثنائي وتمثيل البيانات",
        "Networks, servers and protocols|الشبكات والخوادم والبروتوكولات",
        "The CPU and how it executes code|المعالج وتنفيذ الأوامر",
        "Databases and structured data|قواعد البيانات",
      ],
    },
  },
]);

/** Art, design and creative expression. */
export const artsBank = bank("arts", [
  {
    id: "making",
    title: "Making Art|الممارسة الفنية",
    summary:
      "Drawing, painting, sculpting and designing with real techniques.|الرسم والتلوين والتشكيل والتصميم بتقنيات حقيقية.",
    topics: {
      early: ["Colours and mixing|الألوان وخلطها", "Drawing what I see|أرسم ما أرى"],
      lower: [
        "Lines, shapes and texture|الخط والشكل والملمس",
        "Painting with brushes|التلوين بالفرشاة",
        "Collage and printing|القص واللصق والطباعة",
        "Modelling with clay|التشكيل بالصلصال",
      ],
      middle: [
        "Light, shade and form|الضوء والظل والتجسيم",
        "Perspective drawing|الرسم المنظوري",
        "Colour theory|نظرية اللون",
        "Portrait and figure drawing|رسم الوجه والجسم",
        "Pattern and Islamic geometric design|الزخرفة والتصميم الهندسي الإسلامي",
        "Digital art tools|أدوات الفن الرقمي",
      ],
      upper: [
        "Developing a personal style|تطوير الأسلوب الشخصي",
        "Mixed media and experimentation|الوسائط المتعددة والتجريب",
        "Graphic design and typography|التصميم الجرافيكي والخط",
        "Photography and composition|التصوير والتكوين",
        "Sculpture and three-dimensional work|النحت والعمل المجسم",
        "Building a portfolio|بناء ملف الأعمال",
      ],
    },
  },
  {
    id: "appreciation",
    title: "Looking at Art|تذوق الفن",
    summary:
      "Reading artworks, their history and the cultures behind them.|قراءة الأعمال الفنية وتاريخها والثقافات التي أنتجتها.",
    topics: {
      early: ["Talking about a picture|أتحدث عن صورة"],
      lower: ["Artists and their work|فنانون وأعمالهم", "Art in my culture|الفن في ثقافتي"],
      middle: [
        "Famous artworks and why they matter|أعمال فنية شهيرة وأهميتها",
        "Islamic art and calligraphy|الفن الإسلامي والخط العربي",
        "Art movements through time|المدارس الفنية عبر الزمن",
      ],
      upper: [
        "Critiquing an artwork|نقد عمل فني",
        "Art, identity and society|الفن والهوية والمجتمع",
        "Careers in creative industries|المهن في الصناعات الإبداعية",
      ],
    },
  },
]);
