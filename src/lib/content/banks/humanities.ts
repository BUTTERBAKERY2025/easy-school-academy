import { bank } from "./shared";

/** US Social Studies: civics, American history, geography and economics. */
export const socialUsBank = bank("social-us", [
  {
    id: "civics",
    title: "Civics and Government|التربية الوطنية والحكومة",
    summary:
      "How communities and the United States government work, and what citizens do.|كيف تعمل المجتمعات والحكومة الأمريكية، وما دور المواطن.",
    topics: {
      early: ["Rules at home and school|القواعد في البيت والمدرسة", "People who help us|من يساعدنا في المجتمع"],
      lower: [
        "Being a good citizen|المواطن الصالح",
        "Community helpers and services|الخدمات في المجتمع",
        "National symbols and holidays|الرموز والأعياد الوطنية",
        "Making rules fairly|وضع القواعد بعدل",
      ],
      middle: [
        "Local, state and federal government|الحكومة المحلية والولائية والاتحادية",
        "The three branches of government|السلطات الثلاث",
        "The Constitution and the Bill of Rights|الدستور ووثيقة الحقوق",
        "Elections and voting|الانتخابات والتصويت",
        "Rights and responsibilities|الحقوق والواجبات",
        "How a bill becomes law|كيف يصبح المقترح قانونًا",
      ],
      upper: [
        "Checks and balances|الفصل بين السلطات",
        "The Supreme Court and landmark cases|المحكمة العليا وقضاياها المفصلية",
        "Political parties and campaigns|الأحزاب والحملات الانتخابية",
        "Civil rights movements|حركات الحقوق المدنية",
        "Federalism in practice|الفدرالية في التطبيق",
        "Citizenship and immigration|المواطنة والهجرة",
      ],
    },
  },
  {
    id: "history",
    title: "United States History|تاريخ الولايات المتحدة",
    summary:
      "The people and events that shaped the United States, from first peoples to today.|الأحداث والشخصيات التي شكّلت الولايات المتحدة من السكان الأصليين إلى اليوم.",
    topics: {
      early: ["Then and now|الماضي والحاضر"],
      lower: ["Family history and timelines|تاريخ الأسرة والخط الزمني", "Famous Americans|شخصيات أمريكية مشهورة"],
      middle: [
        "Native American nations|أمم السكان الأصليين",
        "Explorers and early colonies|المستكشفون والمستعمرات الأولى",
        "The American Revolution|الثورة الأمريكية",
        "Westward expansion|التوسع غربًا",
        "Slavery and the Civil War|الرق والحرب الأهلية",
        "Immigration and industry|الهجرة والصناعة",
      ],
      upper: [
        "Reconstruction and its legacy|إعادة الإعمار وأثرها",
        "The Industrial Revolution in America|الثورة الصناعية في أمريكا",
        "World War I and the 1920s|الحرب العالمية الأولى والعشرينيات",
        "The Great Depression and the New Deal|الكساد الكبير والصفقة الجديدة",
        "World War II|الحرب العالمية الثانية",
        "The Cold War era|حقبة الحرب الباردة",
        "The Civil Rights Movement|حركة الحقوق المدنية",
        "Modern America|أمريكا الحديثة",
      ],
    },
  },
  {
    id: "geography",
    title: "Geography and Economics|الجغرافيا والاقتصاد",
    summary:
      "Maps, regions, resources, and how people earn, spend and trade.|الخرائط والأقاليم والموارد، وكيف يكسب الناس وينفقون ويتاجرون.",
    topics: {
      early: ["My home and my school|بيتي ومدرستي"],
      lower: ["Maps and globes|الخرائط والكرة الأرضية", "Needs and wants|الحاجات والرغبات"],
      middle: [
        "Regions of the United States|أقاليم الولايات المتحدة",
        "Landforms and climate|التضاريس والمناخ",
        "Natural resources and industry|الموارد الطبيعية والصناعة",
        "Supply, demand and money|العرض والطلب والنقود",
        "Trade and interdependence|التجارة والاعتماد المتبادل",
        "Population and settlement|السكان والاستيطان",
      ],
      upper: [
        "World regions and cultures|أقاليم العالم وثقافاته",
        "Globalisation and trade|العولمة والتجارة",
        "Economic systems compared|مقارنة النظم الاقتصادية",
        "Personal finance and budgeting|التخطيط المالي الشخصي",
        "Urbanisation and its challenges|التحضّر وتحدياته",
        "Sustainability and resources|الاستدامة والموارد",
      ],
    },
  },
]);

/** UK History and Geography, following the National Curriculum shape. */
export const humanitiesUkBank = bank("humanities-uk", [
  {
    id: "britain",
    title: "British History|تاريخ بريطانيا",
    summary:
      "Britain's story from the Stone Age through to the twentieth century.|قصة بريطانيا من العصر الحجري إلى القرن العشرين.",
    topics: {
      early: ["Old and new things|الأشياء القديمة والحديثة"],
      lower: ["Changes within living memory|التغيرات في الذاكرة الحية", "Significant people in Britain|شخصيات بريطانية مؤثرة"],
      middle: [
        "Stone Age to Iron Age Britain|بريطانيا من العصر الحجري إلى الحديدي",
        "The Roman conquest of Britain|الغزو الروماني لبريطانيا",
        "Anglo-Saxons and Vikings|الأنجلوسكسون والفايكنج",
        "The Norman Conquest of 1066|الغزو النورماندي 1066",
        "Medieval life and the Black Death|الحياة في العصور الوسطى والطاعون",
        "Tudors and the Elizabethan age|آل تيودور والعصر الإليزابيثي",
      ],
      upper: [
        "The English Civil War|الحرب الأهلية الإنجليزية",
        "The British Empire|الإمبراطورية البريطانية",
        "The Industrial Revolution|الثورة الصناعية",
        "Slavery and abolition|الرق وإلغاؤه",
        "World War I and the home front|الحرب العالمية الأولى والجبهة الداخلية",
        "World War II and the Blitz|الحرب العالمية الثانية والقصف",
        "Post-war Britain and the NHS|بريطانيا بعد الحرب وهيئة الصحة",
        "Votes for women|حق المرأة في التصويت",
      ],
    },
  },
  {
    id: "world",
    title: "World History|التاريخ العالمي",
    summary:
      "Ancient civilisations and the wider world beyond Britain.|الحضارات القديمة والعالم الأوسع خارج بريطانيا.",
    topics: {
      middle: [
        "Ancient Egypt|مصر القديمة",
        "Ancient Greece|اليونان القديمة",
        "The Roman Empire|الإمبراطورية الرومانية",
        "Early Islamic civilisation|الحضارة الإسلامية المبكرة",
        "The Maya civilisation|حضارة المايا",
        "The Indus Valley|حضارة وادي السند",
      ],
      upper: [
        "The Renaissance|عصر النهضة",
        "Revolutions in France and America|الثورتان الفرنسية والأمريكية",
        "The rise of dictatorships|صعود الأنظمة الديكتاتورية",
        "The Holocaust|الهولوكوست",
        "The Cold War|الحرب الباردة",
        "Decolonisation|إنهاء الاستعمار",
      ],
    },
  },
  {
    id: "geography",
    title: "Geography|الجغرافيا",
    summary:
      "Places, maps, physical processes and how people shape the environment.|الأماكن والخرائط والعمليات الطبيعية وأثر الإنسان في البيئة.",
    topics: {
      early: ["Where I live|أين أعيش", "Hot and cold places|الأماكن الحارة والباردة"],
      lower: [
        "The four countries of the UK|دول المملكة المتحدة الأربع",
        "Continents and oceans|القارات والمحيطات",
        "Using a simple map|استخدام خريطة بسيطة",
        "Seasonal weather patterns|أنماط الطقس الفصلية",
      ],
      middle: [
        "Rivers and the water cycle|الأنهار ودورة الماء",
        "Mountains and volcanoes|الجبال والبراكين",
        "Climate zones and biomes|النطاقات المناخية والأحياء",
        "Settlements and land use|المستوطنات واستخدام الأرض",
        "Ordnance Survey maps and grid references|الخرائط والإحداثيات",
        "Fieldwork and enquiry|العمل الميداني والاستقصاء",
      ],
      upper: [
        "Tectonic hazards|المخاطر التكتونية",
        "Coasts and erosion|السواحل والتعرية",
        "Population and migration|السكان والهجرة",
        "Urbanisation and megacities|التحضّر والمدن الكبرى",
        "Development and inequality|التنمية والتفاوت",
        "Climate change and sustainability|التغير المناخي والاستدامة",
      ],
    },
  },
]);

/** Saudi Islamic studies: القرآن والتوحيد والفقه والسيرة. */
export const islamicBank = bank("islamic", [
  {
    id: "quran",
    title: "القرآن الكريم وتجويده|The Qur'an and its Recitation",
    summary:
      "حفظ السور وتلاوتها تلاوة صحيحة وفهم معانيها.|Memorising and reciting surahs correctly and understanding their meaning.",
    topics: {
      early: ["سور قصيرة من جزء عمّ|Short surahs from Juz' Amma", "آداب تلاوة القرآن|Manners of recitation"],
      lower: [
        "حفظ سورة الفاتحة وفهمها|Memorising and understanding Al-Fatiha",
        "سور من جزء عمّ|Surahs from Juz' Amma",
        "أحكام النون الساكنة|Rules of noon sakinah",
        "المدود في التلاوة|Elongation rules",
      ],
      middle: [
        "تفسير سور قصيرة|Tafsir of short surahs",
        "أحكام الميم الساكنة|Rules of meem sakinah",
        "القلقلة وصفات الحروف|Qalqalah and letter qualities",
        "آداب حامل القرآن|Manners of the Qur'an bearer",
        "الوقف والابتداء|Stopping and starting",
        "التدبر في الآيات|Reflecting on the verses",
      ],
      upper: [
        "علوم القرآن: المكي والمدني|Makki and Madani revelation",
        "أسباب النزول|Reasons for revelation",
        "التفسير الموضوعي|Thematic tafsir",
        "الإعجاز في القرآن|The inimitability of the Qur'an",
        "أحكام التجويد المتقدمة|Advanced tajweed",
        "جمع القرآن وحفظه|The compilation of the Qur'an",
      ],
    },
  },
  {
    id: "tawheed",
    title: "التوحيد والعقيدة|Belief and Monotheism",
    summary:
      "معرفة الله وأركان الإيمان وأثرها في حياة المسلم.|Knowing Allah, the pillars of faith and their effect on a Muslim's life.",
    topics: {
      early: ["الله خالقي|Allah is my Creator", "أركان الإسلام|The pillars of Islam"],
      lower: [
        "أركان الإيمان|The pillars of faith",
        "أسماء الله الحسنى|The names of Allah",
        "الإيمان بالملائكة|Belief in the angels",
        "الإيمان بالكتب والرسل|Belief in the books and messengers",
      ],
      middle: [
        "أنواع التوحيد|Categories of tawheed",
        "نواقض الإيمان|What nullifies faith",
        "الإيمان باليوم الآخر|Belief in the Last Day",
        "القضاء والقدر|Divine decree",
        "الشرك وخطره|Shirk and its danger",
        "الولاء والبراء|Loyalty and disavowal",
      ],
      upper: [
        "توحيد الأسماء والصفات|Tawheed of names and attributes",
        "البدع وأثرها|Innovations and their effect",
        "الفرق والمذاهب|Sects and schools",
        "الشبهات المعاصرة والرد عليها|Contemporary doubts and responses",
        "الإيمان والعمل|Faith and action",
        "الوسطية في الإسلام|Moderation in Islam",
      ],
    },
  },
  {
    id: "fiqh",
    title: "الفقه والسلوك|Jurisprudence and Conduct",
    summary:
      "أحكام العبادات والمعاملات وآداب السلوك اليومي.|Rulings on worship and dealings, and the manners of daily conduct.",
    topics: {
      early: ["آداب الطعام والشراب|Manners of eating and drinking", "النظافة والطهارة|Cleanliness and purity"],
      lower: [
        "الوضوء وصفته|How to perform wudu",
        "الصلاة: أركانها وواجباتها|The pillars of prayer",
        "آداب المسجد|Manners in the mosque",
        "بر الوالدين|Kindness to parents",
      ],
      middle: [
        "الصيام وأحكامه|Fasting and its rulings",
        "الزكاة ومصارفها|Zakah and its recipients",
        "صلاة الجماعة والجمعة|Congregational and Friday prayer",
        "الطهارة: أنواع المياه|Purity and types of water",
        "آداب الإسلام في التعامل|Islamic manners with others",
        "الأمانة والصدق|Trustworthiness and truthfulness",
      ],
      upper: [
        "الحج والعمرة|Hajj and Umrah",
        "أحكام المعاملات المالية|Financial dealings",
        "الأطعمة والأشربة|Foods and drinks",
        "أحكام الأسرة|Family rulings",
        "فقه الأولويات|The fiqh of priorities",
        "القضايا المعاصرة في الفقه|Contemporary fiqh issues",
      ],
    },
  },
  {
    id: "seerah",
    title: "الحديث والسيرة|Hadith and the Prophetic Biography",
    summary:
      "أحاديث نبوية مختارة وسيرة النبي صلى الله عليه وسلم.|Selected hadiths and the life of the Prophet ﷺ.",
    topics: {
      early: ["أحاديث قصيرة أحفظها|Short hadiths to memorise"],
      lower: ["مولد النبي ونشأته|The Prophet's birth and childhood", "أخلاق النبي|The Prophet's character"],
      middle: [
        "البعثة والدعوة في مكة|Prophethood and the call in Makkah",
        "الهجرة إلى المدينة|The migration to Madinah",
        "الغزوات الكبرى|The major expeditions",
        "فتح مكة وحجة الوداع|The conquest of Makkah and the farewell pilgrimage",
      ],
      upper: [
        "علوم الحديث ومصطلحه|Hadith sciences and terminology",
        "الخلفاء الراشدون|The rightly guided caliphs",
        "الحضارة الإسلامية|Islamic civilisation",
        "أثر السيرة في حياتنا|The seerah in our lives",
      ],
    },
  },
]);

/** Saudi social studies: الاجتماعيات والمواطنة. */
export const socialSaBank = bank("social-sa", [
  {
    id: "watan",
    title: "المملكة العربية السعودية|The Kingdom of Saudi Arabia",
    summary:
      "جغرافية المملكة وتاريخها ونظامها ورؤيتها.|The Kingdom's geography, history, system of government and vision.",
    topics: {
      lower: ["وطني السعودية|My country Saudi Arabia", "العلم والنشيد الوطني|The flag and national anthem"],
      middle: [
        "موقع المملكة وحدودها|Location and borders of the Kingdom",
        "مناطق المملكة الإدارية|The administrative regions",
        "تأسيس الدولة السعودية|The founding of the Saudi state",
        "توحيد المملكة على يد الملك عبدالعزيز|The unification of the Kingdom",
        "الموارد الطبيعية في المملكة|Natural resources of the Kingdom",
        "المعالم والآثار السعودية|Saudi landmarks and heritage",
      ],
      upper: [
        "النظام الأساسي للحكم|The Basic Law of Governance",
        "رؤية المملكة 2030|Saudi Vision 2030",
        "الاقتصاد السعودي وتنويع مصادر الدخل|Economic diversification",
        "الدولتان السعوديتان الأولى والثانية|The first and second Saudi states",
        "مكانة المملكة عربيًا وعالميًا|The Kingdom's regional and global role",
        "التنمية المستدامة في المملكة|Sustainable development in the Kingdom",
      ],
    },
  },
  {
    id: "jughrafia",
    title: "الجغرافيا|Geography",
    summary:
      "الخرائط والتضاريس والمناخ والسكان في المملكة والعالم.|Maps, landforms, climate and population in the Kingdom and the world.",
    topics: {
      early: ["بيتي ومدرستي|My home and my school"],
      lower: ["الاتجاهات الأصلية|The main directions", "مظاهر السطح حولي|Landforms around me"],
      middle: [
        "قراءة الخريطة|Reading a map",
        "تضاريس شبه الجزيرة العربية|Landforms of the Arabian Peninsula",
        "المناخ في المملكة|Climate in the Kingdom",
        "المياه في المملكة|Water in the Kingdom",
        "السكان والمدن|Population and cities",
        "البيئة والمحافظة عليها|The environment and its protection",
      ],
      upper: [
        "القارات والمحيطات|Continents and oceans",
        "الأقاليم المناخية في العالم|World climate regions",
        "الجغرافيا الاقتصادية|Economic geography",
        "الهجرة والتوزيع السكاني|Migration and population distribution",
        "نظم المعلومات الجغرافية|Geographic information systems",
        "التحديات البيئية العالمية|Global environmental challenges",
      ],
    },
  },
  {
    id: "tarikh",
    title: "التاريخ والمواطنة|History and Citizenship",
    summary:
      "تاريخ الأمة وقيم المواطنة والمسؤولية المجتمعية.|The nation's history and the values of citizenship and responsibility.",
    topics: {
      early: ["أسرتي ومجتمعي|My family and community"],
      lower: ["آداب التعامل مع الآخرين|Manners with others", "المهن في مجتمعي|Jobs in my community"],
      middle: [
        "الحضارات القديمة في الجزيرة العربية|Ancient civilisations of the Arabian Peninsula",
        "الدولة الإسلامية الأولى|The first Islamic state",
        "الدولتان الأموية والعباسية|The Umayyad and Abbasid states",
        "حقوق الطفل وواجباته|Children's rights and duties",
        "النظام والانضباط في المجتمع|Order and discipline in society",
        "العمل التطوعي|Volunteering",
      ],
      upper: [
        "التاريخ الإسلامي الحديث|Modern Islamic history",
        "مجلس التعاون الخليجي|The Gulf Cooperation Council",
        "المنظمات الدولية|International organisations",
        "الهوية الوطنية|National identity",
        "حقوق الإنسان في الإسلام|Human rights in Islam",
        "المسؤولية المجتمعية|Social responsibility",
      ],
    },
  },
]);
