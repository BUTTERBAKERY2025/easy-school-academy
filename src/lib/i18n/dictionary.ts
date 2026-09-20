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
    parentTitle: { ar: "تعرف بالضبط أين وصل ابنك", en: "Know exactly where your child has got to" },
    parentBody: {
      ar: "لوحة ولي الأمر تعرض الوقت الذي قضاه، والدروس التي أنهاها، ونسبة الإتقان في كل مادة — ولكل طالب في حسابك على حدة. تعرف أين تعثّر قبل أن يخبرك، وأين لا يحتاج مساعدتك أصلًا.",
      en: "The parent dashboard shows time spent, lessons finished and mastery per subject — for each student on your account separately. You see where they got stuck before they tell you, and where they need no help at all.",
    },
    parentCta: { ar: "شاهد لوحة ولي الأمر", en: "See the parent dashboard" },
    certTitle: { ar: "كل وحدة يُنهيها تنتهي بشهادة", en: "Every unit finished ends in a certificate" },
    certBody: {
      ar: "عند إنهاء كل دروس الوحدة تصدر شهادة باسم الطالب، تحمل نسبة إتقانه ووقته ورقمًا للتحقق — يطبعها أو يحفظها PDF.",
      en: "Finish every lesson in a unit and a certificate is issued in the student's name, carrying their mastery, their time and a reference number — printable or saved as a PDF.",
    },
    certNote: {
      ar: "الشهادة محسوبة من درجاته لا ممنوحة بالحضور: لا تصدر حتى يُنهي كل درس في الوحدة.",
      en: "It is computed from their scores, not granted for turning up: nothing is issued until every lesson in the unit is done.",
    },
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
    activity: { ar: "نشاط عملي", en: "Practical activity" },
    readAloud: { ar: "اقرأ لي", en: "Read it to me" },
    stopReading: { ar: "أوقف القراءة", en: "Stop reading" },
    readAloudHint: { ar: "يقرأ هذه الشاشة بصوت، ويضيء ما يقرأه.", en: "Reads this screen aloud, and lights up the part it is reading." },
    diagramPrompt: { ar: "اختر جزءًا", en: "Choose a part" },
    pageWalk: { ar: "جولة في صفحة الكتاب", en: "A walk through the page" },
    pageWalkPrompt: { ar: "اضغط رقمًا على الصفحة لتعرف ما هذا الجزء ولماذا هو هناك.", en: "Tap a number on the page to find out what that part is and why it is there." },
    bigIdea: { ar: "الفكرة الكبرى في هذه الصفحة", en: "The big idea on this page" },
    youWillNeed: { ar: "ستحتاج إلى", en: "You will need" },
    checklistPrompt: {
      ar: "علّم ما تستطيع فعله الآن. هذه لك وحدك — لا تُحفظ ولا تُحتسب.",
      en: "Tick what you can do now. This is for you alone — nothing is saved or scored.",
    },
    inBookLanguage: { ar: "لغة المنهج", en: "Course language" },
    showSupport: { ar: "اعرض بالعربية", en: "Show in Arabic" },
    hideSupport: { ar: "أخفِ العربية", en: "Hide Arabic" },
    supportNote: {
      ar: "هذا المنهج يُدرَّس بالإنجليزية. العربية مساعدة عند الحاجة.",
      en: "This course is taught in English. Arabic is here to help when you need it.",
    },
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

    /* the plan */
    planTitle: { ar: "خطة اليوم", en: "Today's plan" },
    planBody: {
      ar: "ثلاث خطوات مختارة لك: مراجعة ما بدأ ينساه عقلك، ثم شيء جديد.",
      en: "Three steps chosen for you: revisit what is starting to fade, then something new.",
    },
    planEmpty: {
      ar: "لا شيء مستحق اليوم. اختر مادة وابدأ متى شئت.",
      en: "Nothing is due today. Pick a subject and start whenever you like.",
    },
    planDone: { ar: "أنهيت خطة اليوم. أحسنت.", en: "Today's plan is done. Well done." },
    reasonReview: { ar: "مراجعة", en: "Review" },
    reasonResume: { ar: "أكمل", en: "Resume" },
    reasonFresh: { ar: "درس جديد", en: "New lesson" },
    whyReview: {
      ar: "بدأت تنساه — المراجعة الآن تثبّته أطول.",
      en: "This is starting to fade — reviewing now makes it last longer.",
    },
    whyResume: { ar: "توقفت في منتصفه.", en: "You stopped partway through." },
    whyFresh: { ar: "الخطوة التالية في المادة.", en: "The next step in this subject." },
    aboutMinutes: { ar: "حوالي", en: "about" },

    /* the goal ring */
    goalTitle: { ar: "هدف اليوم", en: "Today's goal" },
    goalDone: { ar: "أنجزت هدف اليوم", en: "Goal reached" },
    goalOf: { ar: "من", en: "of" },
    goalChange: { ar: "غيّر الهدف", en: "Change goal" },
    goalMinutes: { ar: "دقيقة يوميًا", en: "minutes a day" },
    goalToGo: { ar: "واصل — أنت في الطريق", en: "Keep going — you are on your way" },
    goalHint: {
      ar: "أنت من يختار. عشر دقائق كل يوم تفيد أكثر من ساعة مرة في الأسبوع.",
      en: "This is your choice. Ten minutes every day does more than an hour once a week.",
    },

    /* the learner model */
    strengthTitle: { ar: "ما الذي تتقنه؟", en: "What do you know?" },
    strengthBody: {
      ar: "هذا تقدير لما تتذكره اليوم، لا مجرد عدد الدروس المنتهية. يضعف مع الوقت ويقوى بالمراجعة.",
      en: "An estimate of what you can recall today, not a count of lessons finished. It fades with time and firms up with review.",
    },
    levelNew: { ar: "لم يبدأ", en: "Not started" },
    levelAttempted: { ar: "بدأته", en: "Started" },
    levelFamiliar: { ar: "مررت عليه", en: "Familiar" },
    levelProficient: { ar: "متمكّن", en: "Proficient" },
    levelMastered: { ar: "متقن", en: "Mastered" },
    dueNow: { ar: "حان وقت مراجعته", en: "Due for review" },
    dueIn: { ar: "مراجعته بعد", en: "Review in" },
    days: { ar: "يوم", en: "days" },
    recallNow: { ar: "تتذكره الآن", en: "Recall now" },
    lastSeen: { ar: "آخر مرة", en: "Last seen" },
    today: { ar: "اليوم", en: "today" },
    daysAgo: { ar: "منذ", en: "ago" },

    /* the map */
    mapTitle: { ar: "مسار المادة", en: "Your path" },
    mapBody: { ar: "كل دائرة درس. لونها يقول كم تتقنه.", en: "Each circle is a lesson. Its colour says how well you hold it." },
    unitLabel: { ar: "الوحدة", en: "Unit" },

    /* the week */
    weekTitle: { ar: "أسبوعك", en: "Your week" },
    weekBody: { ar: "الأيام التي درست فيها.", en: "The days you studied." },
    noStudy: { ar: "لم تدرس", en: "No study" },

    /* badges */
    badgesTitle: { ar: "شاراتك", en: "Your badges" },
    badgesBody: { ar: "تُمنح على طريقة المذاكرة، لا على الوقت الذي تقضيه.", en: "Earned for how you study, not for how long you stay." },
    badgeLocked: { ar: "لم تُفتح بعد", en: "Not yet earned" },
    badgesEarned: { ar: "شارة", en: "badges" },
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
  certificates: {
    navTitle: { ar: "شهاداتي", en: "My certificates" },
    listTitle: { ar: "شهادات إتمام الوحدات", en: "Unit completion certificates" },
    listBody: {
      ar: "تُمنح الشهادة عند إنهاء كل دروس الوحدة. نسبة الإتقان هي متوسط درجاتك في دروسها.",
      en: "A certificate is issued once every lesson in a unit is finished. The mastery figure is your mean score across those lessons.",
    },
    empty: {
      ar: "لا توجد شهادات بعد. أنهِ كل دروس وحدة واحدة لتظهر شهادتها هنا.",
      en: "No certificates yet. Finish every lesson in one unit and its certificate appears here.",
    },
    emptyCta: { ar: "تابع دروسك", en: "Continue your lessons" },
    open: { ar: "عرض الشهادة", en: "View certificate" },
    /* the sheet itself */
    awardedTo: { ar: "شهادة إتمام مُنحت إلى", en: "Certificate of completion awarded to" },
    forUnit: { ar: "لإتمام وحدة", en: "for completing the unit" },
    inSubject: { ar: "في مادة", en: "in" },
    mastery: { ar: "نسبة الإتقان", en: "Mastery" },
    lessons: { ar: "الدروس المنجزة", en: "Lessons completed" },
    timeSpent: { ar: "الوقت المستغرق", en: "Time spent" },
    earnedOn: { ar: "بتاريخ", en: "Earned on" },
    reference: { ar: "رقم الشهادة", en: "Certificate no." },
    issuer: { ar: "صادرة عن أكاديمية إيزي سكول", en: "Issued by easy school academy" },
    print: { ar: "طباعة أو حفظ PDF", en: "Print or save as PDF" },
    back: { ar: "كل الشهادات", en: "All certificates" },
    minutes: { ar: "دقيقة", en: "min" },
    notEarned: { ar: "لم تُنجز هذه الوحدة بعد.", en: "This unit has not been completed yet." },
  },
  books: {
    navTitle: { ar: "كتبي المدرسية", en: "My school books" },
    subtitle: {
      ar: "كل كتاب من كتب صفك، بغلافه وفهرسه ووحداته — كما في حقيبتك تمامًا.",
      en: "Every book for your year, with its cover, its contents and its units — just like the bag you carry.",
    },
    openBook: { ar: "افتح الكتاب", en: "Open the book" },
    contents: { ar: "فهرس الكتاب", en: "Table of contents" },
    backToShelf: { ar: "كل كتبي", en: "All my books" },
    units: { ar: "وحدة", en: "units" },
    lessons: { ar: "درسًا", en: "lessons" },
    startUnit: { ar: "ابدأ الوحدة", en: "Start the unit" },
    continueUnit: { ar: "أكمل الوحدة", en: "Continue the unit" },
    unitDone: { ar: "أنهيت هذه الوحدة", en: "You finished this unit" },
    noBooks: { ar: "اختر صفك ومنهجك أولًا وستظهر كتبك هنا.", en: "Choose your year and curriculum and your books will appear here." },
    aboutCovers: {
      ar: "الأغلفة والمحتوى من إعداد الأكاديمية وفق إطار المنهج المكتوب على كل كتاب؛ لا نعيد نشر كتب أي ناشر.",
      en: "Covers and content are the academy's own, written to the framework named on each book; no publisher's book is reproduced.",
    },
    shelfFor: { ar: "كتب", en: "Books for" },
    follows: { ar: "مطابق لمنهج", en: "Aligned to" },
  },
  unit: {
    label: { ar: "الوحدة", en: "Unit" },
    openUnit: { ar: "افتح الوحدة", en: "Open the unit" },
    aboutTitle: { ar: "عن هذه الوحدة", en: "About this unit" },
    objectives: { ar: "بنهاية الوحدة ستكون قادرًا على", en: "By the end of this unit you will be able to" },
    lessonsTitle: { ar: "دروس الوحدة", en: "Lessons in this unit" },
    glossary: { ar: "مفردات الوحدة", en: "Words in this unit" },
    glossaryBody: {
      ar: "كلمة تقابلها مرة واحدة تُنسى؛ هذه هي كلمات الوحدة مجموعة في مكان واحد.",
      en: "A word met once is a word lost. These are the unit's words, gathered in one place.",
    },
    dueHere: { ar: "دروس حان وقت مراجعتها", en: "Due for review in this unit" },
    nextUnit: { ar: "الوحدة التالية", en: "Next unit" },
    previousUnit: { ar: "الوحدة السابقة", en: "Previous unit" },
    reviewTitle: { ar: "مراجعة نهاية الوحدة", en: "End-of-unit review" },
    reviewBody: {
      ar: "أسئلة من كل درس في الوحدة، بلا شرح — لأن استرجاع الإجابة من ذاكرتك هو ما يثبّتها، لا إعادة القراءة.",
      en: "Questions from every lesson in the unit and nothing else, because pulling an answer out of memory is what fixes it — re-reading only feels like it does.",
    },
    reviewQuestions: { ar: "أسئلة", en: "questions" },
    reviewStart: { ar: "ابدأ المراجعة", en: "Start the review" },
    reviewDone: { ar: "انتهت المراجعة", en: "Review finished" },
    reviewRefreshed: { ar: "دروس تم تثبيتها:", en: "Lessons refreshed:" },
    reviewNothingHeld: {
      ar: "لم يُثبَّت أي درس هذه المرة — وهذا طبيعي. أعد المحاولة بعد مراجعة الدرس.",
      en: "Nothing was refreshed this time, and that is normal. Go over the lesson and try again.",
    },
    reviewStillDue: {
      ar: "ما لم تُجبه بشكل كافٍ يبقى مستحقًا للمراجعة، وسيظهر لك في خطة اليوم.",
      en: "Whatever you did not hold stays due, and will come back in today's plan.",
    },
    reviewEmpty: {
      ar: "لا توجد أسئلة في هذه الوحدة بعد — دروسها ما زالت قيد الإعداد.",
      en: "There are no questions in this unit yet; its lessons are still in preparation.",
    },
  },
  reader: {
    title: { ar: "افتح كتابك", en: "Open your book" },
    privacy: {
      ar: "اختر نسختك من الكتاب (PDF). تُفتح داخل متصفحك على جهازك فقط — لا تُرفع إلى أي خادم ولا نحتفظ بها.",
      en: "Choose your own copy of the book (PDF). It opens inside your browser on this device only — nothing is uploaded and we keep no copy.",
    },
    choose: { ar: "اختر ملف الكتاب", en: "Choose the book file" },
    failed: { ar: "تعذّر فتح هذا الملف. تأكد أنه PDF سليم.", en: "That file could not be opened. Check that it is a valid PDF." },
    page: { ar: "صفحة", en: "Page" },
    lessonPage: { ar: "اذهب إلى صفحة الدرس", en: "Go to the lesson's page" },
    calibrate: { ar: "اضبط ترقيم الصفحات", en: "Set the page numbering" },
    calibrateAsk: { ar: "الرقم المطبوع على هذه الصفحة:", en: "The number printed on this page:" },
    forget: { ar: "أزل الملف", en: "Remove the file" },
    nudge: { ar: "ليست الصفحة الصحيحة؟", en: "Not the right page?" },
    nudgeBack: { ar: "صفحة للخلف", en: "One page back" },
    nudgeOn: { ar: "صفحة للأمام", en: "One page on" },
    sideBySide: { ar: "الكتاب بجانب الدرس", en: "The book beside the lesson" },
    hideBook: { ar: "أخفِ الكتاب", en: "Hide the book" },
    showBook: { ar: "افتح الكتاب بجانب الدرس", en: "Open the book beside the lesson" },
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
