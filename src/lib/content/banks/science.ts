import { bank } from "./shared";

export const scienceBank = bank("science", [
  {
    id: "life",
    title: "Living Things|الكائنات الحية",
    summary:
      "Plants, animals, the human body and how living things depend on each other.|النباتات والحيوانات وجسم الإنسان وكيف تعتمد الكائنات على بعضها.",
    topics: {
      early: [
        "Living and non-living things|الكائنات الحية وغير الحية",
        "Parts of a plant|أجزاء النبات",
        "Animals and their homes|الحيوانات ومساكنها",
        "Taking care of my body|العناية بجسمي",
      ],
      lower: [
        "What plants need to grow|ما يحتاجه النبات لينمو",
        "Animal groups: mammals, birds, fish|مجموعات الحيوانات: ثدييات وطيور وأسماك",
        "Life cycles of animals|دورة حياة الحيوان",
        "The five senses|الحواس الخمس",
        "Healthy food and healthy habits|الغذاء الصحي والعادات السليمة",
        "Habitats around the world|البيئات حول العالم",
      ],
      middle: [
        "Photosynthesis: how plants make food|البناء الضوئي: كيف يصنع النبات غذاءه",
        "Food chains and food webs|السلاسل والشبكات الغذائية",
        "Adaptation and survival|التكيّف والبقاء",
        "The skeletal and muscular systems|الجهازان الهيكلي والعضلي",
        "The digestive system|الجهاز الهضمي",
        "Classifying living things|تصنيف الكائنات الحية",
        "The circulatory and respiratory systems|الجهازان الدوري والتنفسي",
        "Ecosystems and energy flow|النظم البيئية وانتقال الطاقة",
        "Inherited traits and variation|الصفات الوراثية والاختلاف",
      ],
      upper: [
        "Cells and their organelles|الخلية وعضياتها",
        "Cell division and growth|انقسام الخلية والنمو",
        "Photosynthesis and respiration compared|مقارنة البناء الضوئي والتنفس الخلوي",
        "Genetics and DNA|الوراثة والحمض النووي",
        "Human body systems working together|تكامل أجهزة جسم الإنسان",
        "Microorganisms, disease and immunity|الكائنات الدقيقة والمرض والمناعة",
        "Natural selection and evolution|الانتخاب الطبيعي والتطور",
        "Biodiversity and conservation|التنوع الحيوي والمحافظة عليه",
      ],
    },
  },
  {
    id: "matter",
    title: "Matter and Chemistry|المادة والكيمياء",
    summary:
      "What things are made of, how matter changes, and the chemistry behind it.|مما تتكون الأشياء، وكيف تتغير المادة، والكيمياء وراء ذلك.",
    topics: {
      early: ["Hard, soft, rough and smooth|خشن وناعم وصلب ولين", "Water: liquid, ice and steam|الماء: سائل وجليد وبخار"],
      lower: [
        "Solids, liquids and gases|الصلب والسائل والغاز",
        "Properties of materials|خصائص المواد",
        "Heating and cooling|التسخين والتبريد",
        "Sorting materials for a purpose|اختيار المواد حسب الاستخدام",
      ],
      middle: [
        "States of matter and changes of state|حالات المادة وتحولاتها",
        "Mixtures and solutions|المخاليط والمحاليل",
        "Separating mixtures|فصل المخاليط",
        "Physical and chemical changes|التغيرات الفيزيائية والكيميائية",
        "Mass, volume and density|الكتلة والحجم والكثافة",
        "Conservation of matter|حفظ المادة",
      ],
      upper: [
        "Atoms, elements and compounds|الذرات والعناصر والمركبات",
        "The periodic table|الجدول الدوري",
        "Chemical bonding|الروابط الكيميائية",
        "Balancing chemical equations|موازنة المعادلات الكيميائية",
        "Acids, bases and the pH scale|الأحماض والقواعد ومقياس الأس الهيدروجيني",
        "Reaction rates and catalysts|سرعة التفاعل والعوامل المساعدة",
        "The reactivity series of metals|سلسلة نشاط الفلزات",
        "Organic chemistry basics|أساسيات الكيمياء العضوية",
      ],
    },
  },
  {
    id: "physical",
    title: "Forces and Energy|القوى والطاقة",
    summary:
      "Motion, forces, electricity, light, sound and the many forms of energy.|الحركة والقوى والكهرباء والضوء والصوت وأشكال الطاقة.",
    topics: {
      early: ["Push and pull|الدفع والسحب", "Loud and quiet sounds|الأصوات العالية والهادئة", "Light and shadow|الضوء والظل"],
      lower: [
        "Forces make things move|القوى تحرّك الأشياء",
        "Floating and sinking|الطفو والغرق",
        "Sources of light|مصادر الضوء",
        "How sound travels|كيف ينتقل الصوت",
        "Magnets and what they attract|المغناطيس وما يجذبه",
        "Hot and cold: temperature|الحار والبارد: درجة الحرارة",
      ],
      middle: [
        "Friction and air resistance|الاحتكاك ومقاومة الهواء",
        "Simple machines|الآلات البسيطة",
        "Forms of energy and energy transfer|أشكال الطاقة وانتقالها",
        "Electric circuits|الدوائر الكهربائية",
        "Conductors and insulators|الموصلات والعوازل",
        "Reflection and refraction of light|انعكاس الضوء وانكساره",
        "Speed, distance and time|السرعة والمسافة والزمن",
        "Heat transfer|انتقال الحرارة",
        "Renewable and non-renewable energy|الطاقة المتجددة وغير المتجددة",
      ],
      upper: [
        "Newton's laws of motion|قوانين نيوتن للحركة",
        "Work, power and efficiency|الشغل والقدرة والكفاءة",
        "Kinetic and potential energy|الطاقة الحركية وطاقة الوضع",
        "Waves: properties and behaviour|الموجات: خصائصها وسلوكها",
        "Electricity: current, voltage and resistance|الكهرباء: التيار والجهد والمقاومة",
        "Magnetism and electromagnets|المغناطيسية والمغناطيس الكهربائي",
        "Pressure in solids, liquids and gases|الضغط في المواد الصلبة والسائلة والغازية",
        "Radioactivity and nuclear energy|النشاط الإشعاعي والطاقة النووية",
      ],
    },
  },
  {
    id: "earth",
    title: "Earth and Space|الأرض والفضاء",
    summary:
      "Weather, rocks, water, the planet we live on and the universe around it.|الطقس والصخور والماء وكوكبنا والكون من حولنا.",
    topics: {
      early: ["Day and night|الليل والنهار", "Weather today|طقس اليوم", "Caring for our planet|العناية بكوكبنا"],
      lower: [
        "The four seasons|الفصول الأربعة",
        "Rocks, soil and sand|الصخور والتربة والرمل",
        "Where water is found|أين يوجد الماء",
        "Recycling and reusing|إعادة التدوير والاستخدام",
      ],
      middle: [
        "The water cycle|دورة الماء",
        "Weather and climate|الطقس والمناخ",
        "Rocks and the rock cycle|الصخور ودورتها",
        "The solar system|النظام الشمسي",
        "Earth's movements: day, night and seasons|حركات الأرض: الليل والنهار والفصول",
        "Natural resources and conservation|الموارد الطبيعية والمحافظة عليها",
        "Volcanoes and earthquakes|البراكين والزلازل",
        "Moon phases and eclipses|أطوار القمر والكسوف والخسوف",
        "Fossils and the history of Earth|الأحافير وتاريخ الأرض",
      ],
      upper: [
        "Plate tectonics|الصفائح التكتونية",
        "The atmosphere and climate change|الغلاف الجوي والتغير المناخي",
        "Stars, galaxies and the universe|النجوم والمجرات والكون",
        "Gravity and orbits|الجاذبية والمدارات",
        "Earth's carbon and nitrogen cycles|دورتا الكربون والنيتروجين",
        "Space exploration and technology|استكشاف الفضاء وتقنياته",
      ],
    },
  },
  {
    id: "inquiry",
    title: "Working Scientifically|مهارات البحث العلمي",
    summary:
      "Asking questions, planning fair tests, measuring carefully and explaining results.|طرح الأسئلة وتصميم التجارب العادلة والقياس الدقيق وتفسير النتائج.",
    topics: {
      early: ["Observing with our senses|الملاحظة بالحواس"],
      lower: ["Asking a science question|طرح سؤال علمي", "Recording what we observe|تسجيل الملاحظات"],
      middle: [
        "Planning a fair test|تصميم تجربة عادلة",
        "Variables in an experiment|المتغيرات في التجربة",
        "Recording and graphing results|تسجيل النتائج وتمثيلها",
      ],
      upper: [
        "Hypotheses and predictions|الفرضيات والتنبؤات",
        "Accuracy, precision and error|الدقة والضبط والخطأ",
        "Evaluating scientific evidence|تقويم الأدلة العلمية",
        "Writing a scientific report|كتابة التقرير العلمي",
      ],
    },
  },
]);
