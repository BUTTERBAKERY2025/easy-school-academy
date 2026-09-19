import type { Locale, Localized } from "./config";

type DictNode = Localized | { [key: string]: DictNode };

const isLocalized = (node: DictNode): node is Localized =>
  typeof (node as Localized).ar === "string" && typeof (node as Localized).en === "string";

/** Every UI string in the product, in both languages. */
export const strings = {
  brand: {
    name: { ar: "أكاديمية إيزي سكول", en: "easy school academy" },
    short: { ar: "إيزي سكول", en: "easy school" },
    tagline: {
      ar: "مدرسة تفاعلية كاملة للمنهج الأمريكي والبريطاني والسعودي",
      en: "A complete interactive school for the American, British and Saudi curricula",
    },
  },
  nav: {
    home: { ar: "الرئيسية", en: "Home" },
    curricula: { ar: "المناهج", en: "Curricula" },
    howItWorks: { ar: "كيف تعمل المنصة", en: "How it works" },
    pricing: { ar: "الاشتراكات", en: "Pricing" },
    login: { ar: "تسجيل الدخول", en: "Log in" },
    register: { ar: "ابدأ مجانًا", en: "Start free" },
    dashboard: { ar: "لوحتي", en: "My dashboard" },
    logout: { ar: "تسجيل الخروج", en: "Log out" },
    parent: { ar: "ولي الأمر", en: "Parent" },
    teacher: { ar: "المعلم", en: "Teacher" },
    admin: { ar: "الإدارة", en: "Admin" },
    language: { ar: "اللغة", en: "Language" },
    menu: { ar: "القائمة", en: "Menu" },
  },
  home: {
    badge: { ar: "الحصة الأولى مجانية · بلا بطاقة بنكية", en: "First lesson free · no card needed" },
    heroTitle: { ar: "مدرسة ابنك كاملة، في البيت وبمتعة", en: "Your child's whole school, at home and actually fun" },
    heroHighlight: { ar: "وبمتعة", en: "actually fun" },
    heroBody: {
      ar: "المنهج الأمريكي والبريطاني والسعودي، من الروضة حتى الثالث المتوسط. دروس تفاعلية مبنية على كتاب المدرسة نفسه، يذاكرها الطالب وحده ويصحّح نفسه فورًا.",
      en: "American, British and Saudi curricula from kindergarten to Grade 9. Interactive lessons built on the same textbook, worked through independently and marked on the spot.",
    },
    ctaPrimary: { ar: "ابدأ درسًا مجانيًا", en: "Start a free lesson" },
    ctaSecondary: { ar: "استعرض المناهج", en: "Browse the curricula" },
    trustAges: { ar: "من 4 إلى 15 سنة", en: "Ages 4 to 15" },
    trustSelf: { ar: "يذاكر بمفرده", en: "Works independently" },
    trustBilingual: { ar: "عربي وإنجليزي", en: "Arabic and English" },
    statLessons: { ar: "درس تفاعلي", en: "Interactive lessons" },
    statSubjects: { ar: "مادة دراسية", en: "Subjects" },
    statGrades: { ar: "صف دراسي", en: "Grade levels" },
    statCurricula: { ar: "مناهج عالمية", en: "Curricula" },
    curriculaTitle: { ar: "اختر منهج مدرسة ابنك", en: "Pick your child's school curriculum" },
    curriculaBody: {
      ar: "كل منهج ببنيته الرسمية ومسمّيات صفوفه ومواده كما هي في المدرسة — فيقدر يتابع معها درسًا بدرس.",
      en: "Each curriculum keeps its official structure and the grade and subject names used at school, so a student can follow along lesson by lesson.",
    },
    curriculaOpen: { ar: "افتح المنهج", en: "Open curriculum" },
    howTitle: { ar: "كيف يذاكر عندنا؟", en: "How a lesson works" },
    howBody: {
      ar: "كل درس رحلة قصيرة من أربع محطات، لا يتجاوز الطالب المحطة حتى يتقنها.",
      en: "Every lesson is a short four-stop journey, and a student only moves on once they have it.",
    },
    insideTitle: { ar: "الدرس مش فيديو يتفرّج عليه", en: "A lesson is not a video to watch" },
    insideBody: {
      ar: "سبعة أنواع من الأنشطة تُصحَّح لحظيًا مع تفسير لكل إجابة. وبعد محاولتين خاطئتين يظهر «أظهر الحل» حتى لا يعلق الطالب أبدًا.",
      en: "Seven activity types, each marked instantly with an explanation. After two misses the answer unlocks, so a child is never stuck.",
    },
    insideCta: { ar: "جرّب نشاطًا الآن", en: "Try an activity now" },
    agesTitle: { ar: "كم عمر ابنك؟", en: "How old is your child?" },
    agesBody: { ar: "اختر العمر لتصل مباشرة إلى صفه ومواده.", en: "Pick an age to jump straight to the right grade and subjects." },
    whyTitle: { ar: "لماذا يختارنا أولياء الأمور", en: "Why parents choose us" },
    teachersTitle: { ar: "مدرس منهجي لكل مادة", en: "A curriculum teacher for every subject" },
    teachersBody: {
      ar: "لكل منهج ترتيبه ومصطلحاته وتسلسل مهاراته. لذلك لا يوجد شرح واحد يصلح للثلاثة: كل مادة في كل صف لها شرحها المبني من مقرّرها هي، خطوة بخطوة كما يشرحها معلم في الفصل.",
      en: "Each curriculum has its own order, its own terms and its own sequence of skills, so no single explanation fits all three. Every subject in every grade is explained from its own syllabus, step by step, the way a teacher would take it in class.",
    },
    teachersNote: {
      ar: "«المدرس المنهجي» هو الشرح نفسه: مكتوب لمقرّر بعينه، يتدرّج مع الطالب ويصحّح إجابته فورًا مع تفسيرها. أسماء الفريق التعليمي البشري تُعرض هنا عند اكتمال التعاقدات.",
      en: "The curriculum teacher is the explanation itself: written for one syllabus, paced with the student, and marking every answer on the spot with the reasoning behind it. The human teaching team is listed here once hiring is complete.",
    },
    voicesTitle: { ar: "كيف تبدو التجربة", en: "What the experience looks like" },
    voicesBody: {
      ar: "هذه نماذج توضيحية تبيّن شكل القسم — تُستبدل بآراء حقيقية من أولياء الأمور قبل الإطلاق.",
      en: "These are illustrative placeholders showing the section's shape — real parent feedback replaces them before launch.",
    },
    voicesPlaceholder: { ar: "نموذج توضيحي", en: "Placeholder" },
    plansTitle: { ar: "اشتراك واحد يفتح المنهج كاملًا", en: "One subscription unlocks the whole curriculum" },
    plansBody: { ar: "أول درس في كل مادة مجاني تمامًا. اشترك عندما تقتنع، وألغِ وقتما شئت.", en: "The first lesson of every subject is free. Subscribe when you are convinced, cancel whenever." },
    plansCta: { ar: "شاهد كل الخطط", en: "See all plans" },
    faqTitle: { ar: "أسئلة يسألها أولياء الأمور", en: "Questions parents ask" },
    finalTitle: { ar: "ابدأ اليوم بدرس واحد مجاني", en: "Start today with one free lesson" },
    finalBody: { ar: "بلا بطاقة بنكية، وبلا التزام — افتح أي مادة وجرّب أول درس فيها.", en: "No card, no commitment — open any subject and try its first lesson." },
    stickyCta: { ar: "جرّب مجانًا", en: "Try free" },
  },
  features: {
    textbookTitle: { ar: "مبني على الكتاب المدرسي", en: "Built on the textbook" },
    textbookBody: {
      ar: "الوحدات والدروس مرتّبة بنفس ترتيب المقرر، فيقدر الطالب يتابع مع مدرسته درسًا بدرس.",
      en: "Units and lessons follow the order of the official course, so a student can follow along with school lesson by lesson.",
    },
    interactiveTitle: { ar: "شرح تفاعلي لا مشاهدة سلبية", en: "Interactive, not passive watching" },
    interactiveBody: {
      ar: "كل درس مقسّم خطوات: فكرة، مثال محلول، نشاط يجرّبه الطالب بنفسه، ثم تمرين مصحّح فورًا.",
      en: "Every lesson is split into steps: an idea, a worked example, a hands-on activity, then instantly graded practice.",
    },
    bilingualTitle: { ar: "عربي وإنجليزي بالكامل", en: "Fully bilingual" },
    bilingualBody: {
      ar: "الواجهة والشرح بالعربية أو الإنجليزية بضغطة واحدة، مع دعم كامل للكتابة من اليمين لليسار.",
      en: "Interface and explanations switch between Arabic and English in one click, with full right-to-left support.",
    },
    masteryTitle: { ar: "إتقان قبل الانتقال", en: "Mastery before moving on" },
    masteryBody: {
      ar: "الطالب لا ينهي الدرس إلا بعد اجتياز نقاط التحقق، ويعيد المحاولة على ما أخطأ فيه فقط.",
      en: "A lesson is only complete once checkpoints are passed, and retries focus on what the student got wrong.",
    },
    parentTitle: { ar: "ولي الأمر يشوف كل شيء", en: "Parents see everything" },
    parentBody: {
      ar: "تقرير أسبوعي بالوقت المستغرق، والدروس المنجزة، ونسب الإتقان لكل مادة.",
      en: "A weekly report of time spent, lessons completed and mastery per subject.",
    },
    pacingTitle: { ar: "خطة يومية منظّمة", en: "An organised daily plan" },
    pacingBody: {
      ar: "المنصة توزّع المنهج على أسابيع السنة الدراسية وتقترح درس اليوم تلقائيًا.",
      en: "The platform spreads the curriculum across the school year and suggests today's lesson automatically.",
    },
  },
  how: {
    step1Title: { ar: "اختر المنهج والصف", en: "Pick curriculum and grade" },
    step1Body: {
      ar: "أمريكي أو بريطاني أو سعودي، ثم صف طفلك — وتظهر لك المواد كما في مدرسته.",
      en: "American, British or Saudi, then your child's grade — subjects appear exactly as at school.",
    },
    step2Title: { ar: "ادخل الدرس", en: "Open the lesson" },
    step2Body: {
      ar: "الدرس يبدأ بأهدافه، ثم شرح مبسّط بالصور والأمثلة المحلولة.",
      en: "Each lesson opens with its objectives, then a simple explanation with visuals and worked examples.",
    },
    step3Title: { ar: "تفاعل وجرّب", en: "Interact and practise" },
    step3Body: {
      ar: "أنشطة سحب وإفلات، ترتيب، توصيل، وأسئلة تُصحَّح لحظيًا مع تفسير الإجابة.",
      en: "Drag-and-drop, ordering and matching activities, plus questions graded on the spot with explanations.",
    },
    step4Title: { ar: "تابع تقدّمك", en: "Track progress" },
    step4Body: {
      ar: "نقاط وشارات وسلسلة أيام، وتقرير مفصّل لولي الأمر والمعلم.",
      en: "Points, badges and daily streaks, plus a detailed report for parents and teachers.",
    },
  },
  curricula: {
    title: { ar: "المناهج المتاحة", en: "Available curricula" },
    subtitle: {
      ar: "اختر المنهج ثم المرحلة والصف لتستعرض المواد والوحدات والدروس.",
      en: "Choose a curriculum, then a stage and grade to browse subjects, units and lessons.",
    },
    stages: { ar: "المراحل", en: "Stages" },
    grades: { ar: "الصفوف", en: "Grades" },
    subjects: { ar: "المواد", en: "Subjects" },
    units: { ar: "الوحدات", en: "Units" },
    lessons: { ar: "الدروس", en: "Lessons" },
    lesson: { ar: "درس", en: "lesson" },
    unit: { ar: "وحدة", en: "unit" },
    viewSubjects: { ar: "عرض المواد", en: "View subjects" },
    backToCurricula: { ar: "كل المناهج", en: "All curricula" },
    selectGrade: { ar: "اختر الصف", en: "Select a grade" },
  },
  lesson: {
    objectives: { ar: "أهداف الدرس", en: "Lesson objectives" },
    start: { ar: "ابدأ الدرس", en: "Start lesson" },
    resume: { ar: "أكمل الدرس", en: "Resume lesson" },
    review: { ar: "مراجعة الدرس", en: "Review lesson" },
    next: { ar: "التالي", en: "Next" },
    previous: { ar: "السابق", en: "Back" },
    check: { ar: "تحقق من الإجابة", en: "Check answer" },
    tryAgain: { ar: "حاول مرة أخرى", en: "Try again" },
    correct: { ar: "إجابة صحيحة!", en: "Correct!" },
    incorrect: { ar: "ليست صحيحة بعد", en: "Not quite yet" },
    explanation: { ar: "التفسير", en: "Explanation" },
    showAnswer: { ar: "أظهر الحل", en: "Show the answer" },
    hint: { ar: "تلميح", en: "Hint" },
    step: { ar: "خطوة", en: "Step" },
    of: { ar: "من", en: "of" },
    minutes: { ar: "دقيقة", en: "min" },
    finish: { ar: "أنهِ الدرس", en: "Finish lesson" },
    completedTitle: { ar: "أحسنت! أنهيت الدرس", en: "Well done! Lesson complete" },
    completedBody: {
      ar: "سجّلنا تقدّمك ونقاطك. تقدر تراجع الدرس في أي وقت.",
      en: "Your progress and points are saved. You can review this lesson any time.",
    },
    score: { ar: "نتيجتك", en: "Your score" },
    xpEarned: { ar: "نقاط مكتسبة", en: "Points earned" },
    backToSubject: { ar: "عودة للمادة", en: "Back to subject" },
    nextLesson: { ar: "الدرس التالي", en: "Next lesson" },
    locked: { ar: "هذا الدرس يحتاج اشتراكًا", en: "This lesson needs a subscription" },
    lockedBody: {
      ar: "أول درس في كل مادة مجاني. اشترك لفتح المنهج كاملًا بكل وحداته.",
      en: "The first lesson of every subject is free. Subscribe to unlock the full curriculum.",
    },
    freePreview: { ar: "درس مجاني", en: "Free lesson" },
    dragHere: { ar: "اسحب هنا", en: "Drop here" },
    matchPrompt: { ar: "وصّل كل عنصر بما يناسبه", en: "Match each item with its pair" },
    itemsToMatch: { ar: "عناصر للتوصيل", en: "Items to match" },
    possibleMatches: { ar: "الإجابات المحتملة", en: "Possible matches" },
    itemsToSort: { ar: "عناصر لم تُصنَّف بعد", en: "Items not sorted yet" },
    orderPrompt: { ar: "رتّب الخطوات بالترتيب الصحيح", en: "Put the steps in the right order" },
    fillPrompt: { ar: "أكمل الفراغات", en: "Fill in the blanks" },
    flashcardPrompt: { ar: "اضغط البطاقة لقلبها", en: "Tap the card to flip it" },
    reset: { ar: "إعادة", en: "Reset" },
  },
  dashboard: {
    greeting: { ar: "أهلًا بعودتك،", en: "Welcome back," },
    todaysPlan: { ar: "خطة اليوم", en: "Today's plan" },
    continueLearning: { ar: "أكمل من حيث توقفت", en: "Continue where you left off" },
    mySubjects: { ar: "موادي", en: "My subjects" },
    streak: { ar: "أيام متتالية", en: "day streak" },
    totalXp: { ar: "مجموع النقاط", en: "Total points" },
    lessonsDone: { ar: "دروس منجزة", en: "Lessons completed" },
    timeSpent: { ar: "وقت التعلّم", en: "Learning time" },
    mastery: { ar: "الإتقان", en: "Mastery" },
    noProgress: {
      ar: "لم تبدأ أي درس بعد. اختر مادة وابدأ أول درس.",
      en: "No lessons started yet. Pick a subject and begin your first lesson.",
    },
    badges: { ar: "الشارات", en: "Badges" },
    changeGrade: { ar: "تغيير الصف أو المنهج", en: "Change grade or curriculum" },
    recentActivity: { ar: "آخر النشاط", en: "Recent activity" },
  },
  parent: {
    title: { ar: "متابعة ولي الأمر", en: "Parent dashboard" },
    subtitle: {
      ar: "تابع تقدّم أبنائك، ووقت التعلّم، ونقاط القوة والضعف في كل مادة.",
      en: "Follow your children's progress, learning time and strengths per subject.",
    },
    children: { ar: "الأبناء", en: "Children" },
    addChild: { ar: "إضافة طالب", en: "Add a student" },
    weeklyReport: { ar: "التقرير الأسبوعي", en: "Weekly report" },
    noChildren: {
      ar: "لم تُضف أي طالب بعد. أضف طالبًا لربط حسابه بمتابعتك.",
      en: "No students added yet. Add a student to link their account to your dashboard.",
    },
    subscription: { ar: "الاشتراك", en: "Subscription" },
    manageSubscription: { ar: "إدارة الاشتراك", en: "Manage subscription" },
  },
  teacher: {
    title: { ar: "لوحة المعلم", en: "Teacher dashboard" },
    subtitle: {
      ar: "تابع فصولك، وأسند دروسًا، واطّلع على نتائج الطلاب.",
      en: "Follow your classes, assign lessons and review student results.",
    },
    classes: { ar: "الفصول", en: "Classes" },
    students: { ar: "الطلاب", en: "Students" },
    assignments: { ar: "الإسنادات", en: "Assignments" },
    averageMastery: { ar: "متوسط الإتقان", en: "Average mastery" },
  },
  admin: {
    title: { ar: "لوحة الإدارة", en: "Admin dashboard" },
    subtitle: {
      ar: "نظرة عامة على المستخدمين والاشتراكات ومحتوى المناهج.",
      en: "An overview of users, subscriptions and curriculum content.",
    },
    users: { ar: "المستخدمون", en: "Users" },
    activeSubs: { ar: "اشتراكات نشطة", en: "Active subscriptions" },
    contentCoverage: { ar: "تغطية المحتوى", en: "Content coverage" },
    recentUsers: { ar: "أحدث المستخدمين", en: "Newest users" },
    role: { ar: "الدور", en: "Role" },
    joined: { ar: "تاريخ الانضمام", en: "Joined" },
    authoredLessons: { ar: "دروس مكتملة التأليف", en: "Fully authored lessons" },
  },
  auth: {
    loginTitle: { ar: "تسجيل الدخول", en: "Log in" },
    loginSubtitle: { ar: "ادخل إلى أكاديميتك وأكمل دروسك.", en: "Enter your academy and pick up your lessons." },
    registerTitle: { ar: "إنشاء حساب", en: "Create an account" },
    registerSubtitle: {
      ar: "سجّل مجانًا وابدأ بأول درس في أي مادة.",
      en: "Register free and start with the first lesson in any subject.",
    },
    name: { ar: "الاسم", en: "Name" },
    email: { ar: "البريد الإلكتروني", en: "Email" },
    password: { ar: "كلمة المرور", en: "Password" },
    role: { ar: "أنا", en: "I am a" },
    roleStudent: { ar: "طالب", en: "Student" },
    roleParent: { ar: "ولي أمر", en: "Parent" },
    roleTeacher: { ar: "معلم", en: "Teacher" },
    curriculum: { ar: "المنهج", en: "Curriculum" },
    grade: { ar: "الصف", en: "Grade" },
    submitLogin: { ar: "دخول", en: "Log in" },
    submitRegister: { ar: "إنشاء الحساب", en: "Create account" },
    noAccount: { ar: "ليس لديك حساب؟", en: "No account yet?" },
    haveAccount: { ar: "لديك حساب؟", en: "Already registered?" },
    demoHint: {
      ar: "حساب تجريبي: student@easyschool.test / كلمة المرور: demo1234",
      en: "Demo account: student@easyschool.test / password: demo1234",
    },
    errorInvalid: { ar: "البريد أو كلمة المرور غير صحيحة.", en: "Email or password is incorrect." },
    errorTaken: { ar: "هذا البريد مسجّل بالفعل.", en: "That email is already registered." },
    errorShortPassword: { ar: "كلمة المرور يجب أن تكون 8 أحرف على الأقل.", en: "Password must be at least 8 characters." },
    errorRequired: { ar: "من فضلك أكمل كل الحقول.", en: "Please complete every field." },
  },
  /** The two-step age-then-curriculum picker that opens the homepage. */
  finder: {
    kicker: { ar: "سؤالان سريعان", en: "Two quick questions" },
    ageTitle: { ar: "كم عمر ابنك؟", en: "How old is your child?" },
    ageHint: {
      ar: "نوصّلك لصفه ومواده مباشرة — بلا تسجيل.",
      en: "We take you straight to their grade and subjects — no sign-up.",
    },
    curriculumTitle: { ar: "أي منهج تتبعه مدرسته؟", en: "Which curriculum does their school follow?" },
    resultTitle: { ar: "صف ابنك جاهز", en: "Your child's grade is ready" },
    open: { ar: "افتح المواد", en: "Open the subjects" },
    back: { ar: "رجوع", en: "Back" },
    change: { ar: "تغيير", en: "Change" },
    years: { ar: "سنة", en: "yrs" },
    freeNote: { ar: "أول درس في كل مادة مجاني، بلا بطاقة بنكية.", en: "The first lesson of every subject is free, with no card." },
  },
  /** The seven activity types, named for the "inside a lesson" grid. */
  questionKinds: {
    mcq: { ar: "اختيار من متعدد", en: "Multiple choice" },
    multi: { ar: "إجابات متعددة", en: "Multiple answers" },
    truefalse: { ar: "صح وخطأ", en: "True or false" },
    fill: { ar: "ملء الفراغات", en: "Fill the blanks" },
    match: { ar: "توصيل", en: "Matching" },
    order: { ar: "ترتيب", en: "Ordering" },
    sort: { ar: "تصنيف", en: "Sorting" },
  },
  teachers: {
    saudiName: { ar: "المدرس المنهجي السعودي", en: "The Saudi curriculum teacher" },
    saudiBody: {
      ar: "يشرح بترتيب مقرر وزارة التعليم، بمسميات المواد والوحدات كما هي في الكتاب المدرسي.",
      en: "Follows the Ministry of Education's own order, using the subject and unit names printed in the textbook.",
    },
    britishName: { ar: "المدرس المنهجي البريطاني", en: "The British curriculum teacher" },
    britishBody: {
      ar: "يتبع الـ Key Stages سنة بعد سنة، بمصطلحات المنهج الوطني الإنجليزي كما تُدرَّس.",
      en: "Works through the Key Stages year by year, in the National Curriculum's own terms.",
    },
    americanName: { ar: "المدرس المنهجي الأمريكي", en: "The American curriculum teacher" },
    americanBody: {
      ar: "يتدرّج Grade بعد Grade على نطاق المنهج وتسلسله المعتمد في المدارس الأمريكية.",
      en: "Moves Grade by Grade along the scope and sequence American schools teach to.",
    },
  },
  /** Illustrative placeholders until real parent feedback replaces them. */
  voices: {
    quote1: {
      ar: "ابني بقى يفتح الدرس لوحده قبل ما أفكر أذكّره.",
      en: "He now opens the lesson himself before I get to remind him.",
    },
    who1: { ar: "أم لطالب في الرابع الابتدائي", en: "Parent of a Grade 4 student" },
    quote2: {
      ar: "التقرير الأسبوعي وفّر عليّ سؤال «ذاكرت ولا لأ؟» كل يوم.",
      en: "The weekly report ended the daily 'did you study?' argument.",
    },
    who2: { ar: "والد طالبين", en: "Parent of two" },
    quote3: {
      ar: "الشرح بالعربي والإنجليزي ساعد بنتي في مدرستها الدولية.",
      en: "Having both languages helped my daughter at her international school.",
    },
    who3: { ar: "أم لطالبة في Year 5", en: "Parent of a Year 5 student" },
  },
  faq: {
    q1: { ar: "هل المحتوى مطابق لمنهج مدرسة ابني؟", en: "Does this match my child's school curriculum?" },
    a1: {
      ar: "الوحدات والدروس مبنية على النطاق والتسلسل الرسمي لكل منهج، بأسماء الصفوف والمواد والوحدات كما هي في المدرسة، فيقدر الطالب يتابع درسًا بدرس.",
      en: "Units and lessons follow the official scope and sequence of each curriculum, using the same grade, subject and unit names, so a student can follow along lesson by lesson.",
    },
    q2: { ar: "هل يحتاج ابني لمساعدتي أثناء الدرس؟", en: "Does my child need my help during a lesson?" },
    a2: {
      ar: "الدرس مصمم ليعمل عليه الطالب وحده: شرح مبسّط، ثم مثال محلول، ثم نشاط، ثم تمرين يُصحَّح فورًا مع تفسير الإجابة. وبعد محاولتين خاطئتين يظهر «أظهر الحل» حتى لا يعلق.",
      en: "Lessons are built for a student to work alone: a simple explanation, a worked example, an activity, then practice marked instantly with an explanation. After two misses the answer unlocks so nobody gets stuck.",
    },
    q3: { ar: "ماذا لو كان مستواه في مادة أقل من صفه؟", en: "What if they are behind in one subject?" },
    a3: {
      ar: "تقدر تفتح أي صف في أي مادة. المنصة لا تقيّدك بصف واحد، فيراجع صفًا سابقًا أو يتقدم لأعلى حسب مستواه.",
      en: "You can open any grade in any subject. Nothing locks a student to a single year, so they can revise a lower grade or move ahead.",
    },
    q4: { ar: "هل أستطيع التجربة قبل الاشتراك؟", en: "Can I try before subscribing?" },
    a4: {
      ar: "نعم. أول درس في كل مادة مجاني بالكامل بكل أنشطته، ولا يحتاج بطاقة بنكية.",
      en: "Yes. The first lesson of every subject is completely free, with all of its activities, and needs no card.",
    },
    q5: { ar: "هل أتابع تقدّمه؟", en: "Can I follow their progress?" },
    a5: {
      ar: "لوحة ولي الأمر تعرض الوقت المستغرق والدروس المنجزة ونسبة الإتقان لكل مادة، ولكل طالب في حسابك.",
      en: "The parent dashboard shows time spent, lessons completed and mastery per subject, for every student on your account.",
    },
  },
  pricing: {
    title: { ar: "خطط الاشتراك", en: "Subscription plans" },
    subtitle: {
      ar: "ابدأ مجانًا بأول درس في كل مادة، واشترك عندما تقتنع.",
      en: "Start free with the first lesson of every subject, and subscribe when you are convinced.",
    },
    monthly: { ar: "شهريًا", en: "Monthly" },
    yearly: { ar: "سنويًا", en: "Yearly" },
    perMonth: { ar: "/ شهر", en: "/ month" },
    perYear: { ar: "/ سنة", en: "/ year" },
    choose: { ar: "اشترك الآن", en: "Subscribe" },
    current: { ar: "خطتك الحالية", en: "Your current plan" },
    popular: { ar: "الأكثر اختيارًا", en: "Most popular" },
    saveHint: { ar: "وفّر شهرين مع الاشتراك السنوي", en: "Two months free on yearly billing" },
    guarantee: {
      ar: "إلغاء في أي وقت، واسترداد خلال 14 يومًا.",
      en: "Cancel any time, with a 14-day refund window.",
    },
    subscribed: { ar: "تم تفعيل اشتراكك", en: "Your subscription is active" },
    needLogin: { ar: "سجّل الدخول أولًا لإتمام الاشتراك.", en: "Log in first to complete your subscription." },
    demoNotice: {
      ar: "هذه بيئة عرض: الاشتراك يُفعَّل مباشرة دون بوابة دفع حقيقية.",
      en: "This is a demo environment: subscriptions activate instantly without a real payment gateway.",
    },
  },
  common: {
    loading: { ar: "جارٍ التحميل…", en: "Loading…" },
    comingSoon: { ar: "قيد الإعداد", en: "In preparation" },
    free: { ar: "مجاني", en: "Free" },
    minutes: { ar: "دقيقة", en: "min" },
    progress: { ar: "التقدّم", en: "Progress" },
    completed: { ar: "مكتمل", en: "Completed" },
    inProgress: { ar: "قيد التقدّم", en: "In progress" },
    notStarted: { ar: "لم يبدأ", en: "Not started" },
    open: { ar: "فتح", en: "Open" },
    save: { ar: "حفظ", en: "Save" },
    cancel: { ar: "إلغاء", en: "Cancel" },
    all: { ar: "الكل", en: "All" },
    footerRights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
    notFound: { ar: "الصفحة غير موجودة", en: "Page not found" },
    backHome: { ar: "العودة للرئيسية", en: "Back to home" },
  },
} as const satisfies Record<string, DictNode>;

type Strings = typeof strings;

type Translated<T> = {
  [K in keyof T]: T[K] extends Localized ? string : T[K] extends object ? Translated<T[K]> : never;
};

export type Dictionary = Translated<Strings>;

function resolve(node: DictNode, locale: Locale): unknown {
  if (isLocalized(node)) return node[locale];
  const out: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(node)) out[key] = resolve(child as DictNode, locale);
  return out;
}

const cache = new Map<Locale, Dictionary>();

export function getDictionary(locale: Locale): Dictionary {
  const hit = cache.get(locale);
  if (hit) return hit;
  const built = resolve(strings as unknown as DictNode, locale) as Dictionary;
  cache.set(locale, built);
  return built;
}
