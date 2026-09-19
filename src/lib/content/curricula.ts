import type { Band, TopicBank } from "./banks/shared";
import { mathBank } from "./banks/math";
import { scienceBank } from "./banks/science";
import { arabicBank, englishEflBank, englishNativeBank } from "./banks/language";
import { humanitiesUkBank, islamicBank, socialSaBank, socialUsBank } from "./banks/humanities";
import { artsBank, computingBank } from "./banks/skills";
import type { SubjectTheme } from "./types";

export type SubjectDef = {
  key: string;
  /** "English|عربي" */
  title: string;
  description: string;
  glyph: string;
  theme: SubjectTheme;
  bank: TopicBank;
  /** Subjects that only start partway through the schooling, e.g. Saudi social studies. */
  fromOrdinal?: number;
};

export type GradeDef = {
  ordinal: number;
  title: string;
  shortTitle: string;
  ages: string;
  band: Band;
};

export type StageDef = {
  id: string;
  title: string;
  description: string;
  grades: GradeDef[];
};

export type CurriculumDef = {
  id: string;
  title: string;
  origin: string;
  flag: string;
  theme: SubjectTheme;
  description: string;
  highlights: string[];
  stages: StageDef[];
  subjects: SubjectDef[];
};

const americanCurriculum: CurriculumDef = {
  id: "american",
  title: "American Curriculum|المنهج الأمريكي",
  origin: "United States|الولايات المتحدة",
  flag: "🇺🇸",
  theme: "brand",
  description:
    "Common Core aligned mathematics and English Language Arts with NGSS-style science, from kindergarten through middle school.|رياضيات ولغة إنجليزية وفق معايير Common Core وعلوم على نسق NGSS، من الروضة حتى المرحلة المتوسطة.",
  highlights: [
    "Kindergarten to Grade 8|من الروضة حتى الصف الثامن",
    "Common Core scope and sequence|نطاق وتسلسل وفق Common Core",
    "Standards-based mastery checks|اختبارات إتقان مبنية على المعايير",
  ],
  stages: [
    {
      id: "early-years",
      title: "Early Years|السنوات المبكرة",
      description: "Play-based learning that builds early number, letter and science sense.|تعلّم باللعب يبني الحس العددي والحرفي والعلمي المبكر.",
      grades: [{ ordinal: 0, title: "Kindergarten", shortTitle: "KG", ages: "5-6", band: "early" }],
    },
    {
      id: "elementary",
      title: "Elementary School|المرحلة الابتدائية",
      description: "Grades 1 to 5, where the core skills of reading, writing and arithmetic are built.|الصفوف من الأول إلى الخامس، وفيها تُبنى مهارات القراءة والكتابة والحساب.",
      grades: [
        { ordinal: 1, title: "Grade 1", shortTitle: "G1", ages: "6-7", band: "lower" },
        { ordinal: 2, title: "Grade 2", shortTitle: "G2", ages: "7-8", band: "lower" },
        { ordinal: 3, title: "Grade 3", shortTitle: "G3", ages: "8-9", band: "middle" },
        { ordinal: 4, title: "Grade 4", shortTitle: "G4", ages: "9-10", band: "middle" },
        { ordinal: 5, title: "Grade 5", shortTitle: "G5", ages: "10-11", band: "middle" },
      ],
    },
    {
      id: "middle",
      title: "Middle School|المرحلة المتوسطة",
      description: "Grades 6 to 8, moving into algebra, lab science and analytical writing.|الصفوف من السادس إلى الثامن، وفيها ينتقل الطالب إلى الجبر والعلوم المعملية والكتابة التحليلية.",
      grades: [
        { ordinal: 6, title: "Grade 6", shortTitle: "G6", ages: "11-12", band: "upper" },
        { ordinal: 7, title: "Grade 7", shortTitle: "G7", ages: "12-13", band: "upper" },
        { ordinal: 8, title: "Grade 8", shortTitle: "G8", ages: "13-14", band: "upper" },
      ],
    },
  ],
  subjects: [
    {
      key: "math",
      title: "Mathematics|الرياضيات",
      description: "Number, operations, fractions, geometry and data, taught for understanding.|الأعداد والعمليات والكسور والهندسة والبيانات بفهم عميق.",
      glyph: "📐",
      theme: "brand",
      bank: mathBank,
    },
    {
      key: "science",
      title: "Science|العلوم",
      description: "Life, physical and earth science with hands-on investigation.|علوم الحياة والفيزياء والأرض مع الاستقصاء العملي.",
      glyph: "🔬",
      theme: "mint",
      bank: scienceBank,
    },
    {
      key: "ela",
      title: "English Language Arts",
      description: "Reading, writing, grammar and speaking as one connected course.|القراءة والكتابة والقواعد والتحدث في مقرر متكامل.",
      glyph: "📚",
      theme: "sun",
      bank: englishNativeBank,
    },
    {
      key: "social",
      title: "Social Studies|الدراسات الاجتماعية",
      description: "Civics, American history, geography and economics.|التربية الوطنية والتاريخ الأمريكي والجغرافيا والاقتصاد.",
      glyph: "🗺️",
      theme: "berry",
      bank: socialUsBank,
    },
    {
      key: "computing",
      title: "Computer Science|علوم الحاسب",
      description: "Digital literacy, algorithms and programming.|الثقافة الرقمية والخوارزميات والبرمجة.",
      glyph: "💻",
      theme: "ink",
      bank: computingBank,
    },
    {
      key: "arts",
      title: "Visual Arts|الفنون البصرية",
      description: "Making art and learning to look at it closely.|ممارسة الفن وتعلّم تذوّقه.",
      glyph: "🎨",
      theme: "berry",
      bank: artsBank,
    },
  ],
};

const britishCurriculum: CurriculumDef = {
  id: "british",
  title: "British Curriculum|المنهج البريطاني",
  origin: "United Kingdom|المملكة المتحدة",
  flag: "🇬🇧",
  theme: "berry",
  description:
    "The English National Curriculum across EYFS and Key Stages 1 to 3, with its own year groups and subject shape.|المنهج الوطني الإنجليزي عبر مرحلة التأسيس والمراحل الرئيسة من الأولى إلى الثالثة، بمسميات السنوات والمواد كما هي.",
  highlights: [
    "Reception to Year 9|من الروضة حتى السنة التاسعة",
    "Key Stage structure preserved|بنية المراحل الرئيسة كما هي",
    "History and Geography taught separately|التاريخ والجغرافيا كمادتين مستقلتين",
  ],
  stages: [
    {
      id: "eyfs",
      title: "Early Years Foundation Stage",
      description: "Reception year: learning through play, talk and early phonics.|سنة الروضة: التعلم باللعب والحوار وأساسيات الصوتيات.",
      grades: [{ ordinal: 0, title: "Reception", shortTitle: "R", ages: "4-5", band: "early" }],
    },
    {
      id: "ks1",
      title: "Key Stage 1",
      description: "Years 1 and 2, building phonics, number bonds and curiosity.|السنتان الأولى والثانية، لبناء الصوتيات وحقائق الأعداد وحب الاستطلاع.",
      grades: [
        { ordinal: 1, title: "Year 1", shortTitle: "Y1", ages: "5-6", band: "lower" },
        { ordinal: 2, title: "Year 2", shortTitle: "Y2", ages: "6-7", band: "lower" },
      ],
    },
    {
      id: "ks2",
      title: "Key Stage 2",
      description: "Years 3 to 6, the heart of primary school.|من السنة الثالثة إلى السادسة، قلب المرحلة الابتدائية.",
      grades: [
        { ordinal: 3, title: "Year 3", shortTitle: "Y3", ages: "7-8", band: "middle" },
        { ordinal: 4, title: "Year 4", shortTitle: "Y4", ages: "8-9", band: "middle" },
        { ordinal: 5, title: "Year 5", shortTitle: "Y5", ages: "9-10", band: "middle" },
        { ordinal: 6, title: "Year 6", shortTitle: "Y6", ages: "10-11", band: "middle" },
      ],
    },
    {
      id: "ks3",
      title: "Key Stage 3",
      description: "Years 7 to 9, the first years of secondary school.|من السنة السابعة إلى التاسعة، وهي أولى سنوات المرحلة الثانوية.",
      grades: [
        { ordinal: 7, title: "Year 7", shortTitle: "Y7", ages: "11-12", band: "upper" },
        { ordinal: 8, title: "Year 8", shortTitle: "Y8", ages: "12-13", band: "upper" },
        { ordinal: 9, title: "Year 9", shortTitle: "Y9", ages: "13-14", band: "upper" },
      ],
    },
  ],
  subjects: [
    {
      key: "maths",
      title: "Maths|الرياضيات",
      description: "Fluency, reasoning and problem solving as the National Curriculum frames them.|الطلاقة والاستدلال وحل المشكلات كما يصوغها المنهج الوطني.",
      glyph: "📐",
      theme: "brand",
      bank: mathBank,
    },
    {
      key: "english",
      title: "English|اللغة الإنجليزية",
      description: "Reading, writing, spelling, punctuation and grammar.|القراءة والكتابة والإملاء والترقيم والقواعد.",
      glyph: "📚",
      theme: "sun",
      bank: englishNativeBank,
    },
    {
      key: "science",
      title: "Science|العلوم",
      description: "Biology, chemistry and physics with working scientifically throughout.|الأحياء والكيمياء والفيزياء مع مهارات البحث العلمي.",
      glyph: "🔬",
      theme: "mint",
      bank: scienceBank,
    },
    {
      key: "humanities",
      title: "History and Geography|التاريخ والجغرافيا",
      description: "Britain's story, the wider world, and the physical and human geography behind it.|تاريخ بريطانيا والعالم، وجغرافيته الطبيعية والبشرية.",
      glyph: "🏰",
      theme: "berry",
      bank: humanitiesUkBank,
    },
    {
      key: "computing",
      title: "Computing|الحوسبة",
      description: "Computer science, information technology and digital literacy.|علوم الحاسب وتقنية المعلومات والثقافة الرقمية.",
      glyph: "💻",
      theme: "ink",
      bank: computingBank,
    },
    {
      key: "art",
      title: "Art and Design|الفن والتصميم",
      description: "Drawing, painting, sculpture and design thinking.|الرسم والتلوين والنحت والتفكير التصميمي.",
      glyph: "🎨",
      theme: "berry",
      bank: artsBank,
    },
  ],
};

const saudiCurriculum: CurriculumDef = {
  id: "saudi",
  title: "المنهج السعودي|Saudi Curriculum",
  origin: "المملكة العربية السعودية|Saudi Arabia",
  flag: "🇸🇦",
  theme: "mint",
  description:
    "مناهج وزارة التعليم السعودية من الروضة حتى الصف الثالث المتوسط، بمسميات المواد والصفوف كما في المدرسة.|The Saudi Ministry of Education curriculum from kindergarten to Grade 9, with the same subject and grade names used at school.",
  highlights: [
    "من الروضة حتى الثالث المتوسط|From kindergarten to Grade 9",
    "القرآن والدراسات الإسلامية ولغتي|Qur'an, Islamic studies and Arabic",
    "شرح بالعربية أولًا|Explanations in Arabic first",
  ],
  stages: [
    {
      id: "rawdah",
      title: "مرحلة الروضة|Kindergarten",
      description: "تهيئة الطفل للقراءة والكتابة والحساب من خلال اللعب والأنشطة.|Preparing a child for reading, writing and number through play.",
      grades: [{ ordinal: 0, title: "الروضة|Kindergarten", shortTitle: "روضة|KG", ages: "5-6", band: "early" }],
    },
    {
      id: "ibtidai",
      title: "المرحلة الابتدائية|Primary stage",
      description: "الصفوف من الأول إلى السادس الابتدائي.|Grades 1 to 6 of primary school.",
      grades: [
        { ordinal: 1, title: "الصف الأول الابتدائي|Grade 1", shortTitle: "أول ابتدائي|G1", ages: "6-7", band: "lower" },
        { ordinal: 2, title: "الصف الثاني الابتدائي|Grade 2", shortTitle: "ثاني ابتدائي|G2", ages: "7-8", band: "lower" },
        { ordinal: 3, title: "الصف الثالث الابتدائي|Grade 3", shortTitle: "ثالث ابتدائي|G3", ages: "8-9", band: "middle" },
        { ordinal: 4, title: "الصف الرابع الابتدائي|Grade 4", shortTitle: "رابع ابتدائي|G4", ages: "9-10", band: "middle" },
        { ordinal: 5, title: "الصف الخامس الابتدائي|Grade 5", shortTitle: "خامس ابتدائي|G5", ages: "10-11", band: "middle" },
        { ordinal: 6, title: "الصف السادس الابتدائي|Grade 6", shortTitle: "سادس ابتدائي|G6", ages: "11-12", band: "middle" },
      ],
    },
    {
      id: "mutawasit",
      title: "المرحلة المتوسطة|Intermediate stage",
      description: "الصفوف من الأول إلى الثالث المتوسط.|Grades 7 to 9.",
      grades: [
        { ordinal: 7, title: "الصف الأول المتوسط|Grade 7", shortTitle: "أول متوسط|G7", ages: "12-13", band: "upper" },
        { ordinal: 8, title: "الصف الثاني المتوسط|Grade 8", shortTitle: "ثاني متوسط|G8", ages: "13-14", band: "upper" },
        { ordinal: 9, title: "الصف الثالث المتوسط|Grade 9", shortTitle: "ثالث متوسط|G9", ages: "14-15", band: "upper" },
      ],
    },
  ],
  subjects: [
    {
      key: "islamic",
      title: "الدراسات الإسلامية|Islamic Studies",
      description: "القرآن وتجويده والتوحيد والفقه والحديث والسيرة.|Qur'an and tajweed, belief, fiqh, hadith and the seerah.",
      glyph: "🕌",
      theme: "mint",
      bank: islamicBank,
    },
    {
      key: "arabic",
      title: "لغتي|Arabic Language",
      description: "القراءة والكتابة والنحو والتواصل الشفهي بالعربية الفصحى.|Reading, writing, grammar and oral communication in standard Arabic.",
      glyph: "✒️",
      theme: "sun",
      bank: arabicBank,
    },
    {
      key: "math",
      title: "الرياضيات|Mathematics",
      description: "الأعداد والعمليات والكسور والهندسة والبيانات.|Number, operations, fractions, geometry and data.",
      glyph: "📐",
      theme: "brand",
      bank: mathBank,
    },
    {
      key: "science",
      title: "العلوم|Science",
      description: "علوم الحياة والمادة والقوى والأرض والفضاء.|Life science, matter, forces, earth and space.",
      glyph: "🔬",
      theme: "mint",
      bank: scienceBank,
    },
    {
      key: "english",
      title: "اللغة الإنجليزية|English",
      description: "الإنجليزية كلغة ثانية: مفردات وقواعد ومهارات تواصل.|English as a second language: vocabulary, grammar and communication.",
      glyph: "🔤",
      theme: "berry",
      bank: englishEflBank,
      fromOrdinal: 1,
    },
    {
      key: "social",
      title: "الاجتماعيات والمواطنة|Social Studies and Citizenship",
      description: "جغرافية المملكة وتاريخها ونظامها ورؤيتها 2030.|The Kingdom's geography, history, governance and Vision 2030.",
      glyph: "🗺️",
      theme: "sun",
      bank: socialSaBank,
      fromOrdinal: 4,
    },
    {
      key: "digital",
      title: "المهارات الرقمية|Digital Skills",
      description: "التعامل مع الأجهزة والبرمجيات وأساسيات البرمجة والأمن الرقمي.|Devices, software, programming basics and digital safety.",
      glyph: "💻",
      theme: "ink",
      bank: computingBank,
      fromOrdinal: 4,
    },
  ],
};

export const curriculumDefs: CurriculumDef[] = [americanCurriculum, britishCurriculum, saudiCurriculum];
