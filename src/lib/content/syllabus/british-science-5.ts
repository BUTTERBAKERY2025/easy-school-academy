import { syllabus } from "./index";

/**
 * Cambridge Primary Science, Stage 5.
 *
 * The six units and their sequence follow the Cambridge Primary Science
 * curriculum framework as a Stage 5 course is organised: what is taught, and in
 * what order. That is a fact about the course, not anybody's prose — every
 * explanation, example, figure and question under these headings is written for
 * this academy, and no page, illustration or exercise from any published book is
 * reproduced here.
 *
 * Lesson titles are the topics themselves, in the language the course is taught
 * in, with the Arabic beside them: a child following the British curriculum
 * learns "photosynthesis" as photosynthesis, and meets البناء الضوئي as the way
 * to understand it rather than as a replacement for it.
 */
export const britishScience5 = syllabus({
  curriculumId: "british",
  gradeOrdinal: 5,
  subjectKey: "science",
  follows: "Cambridge Primary Science — Stage 5|Cambridge Primary Science — المرحلة الخامسة",
  units: [
    {
      id: "plants",
      title: "Life cycles of flowering plants|دورة حياة النباتات الزهرية",
      summary:
        "How a flowering plant makes seeds, how those seeds travel, and how a new plant begins.|كيف يصنع النبات الزهري بذوره، وكيف تنتقل تلك البذور، وكيف تبدأ نبتة جديدة.",
      lessons: [
        { t: "Flowering and non-flowering plants|النباتات الزهرية وغير الزهرية", page: 2 },
        { t: "Pollination, fruits and seeds|التلقيح والثمار والبذور", page: 9 },
        { t: "How seeds are spread|كيف تنتشر البذور", page: 15 },
        { t: "Seed germination|إنبات البذرة", page: 22 },
      ],
    },
    {
      id: "sound",
      title: "Sound|الصوت",
      summary:
        "Where sound comes from, how it reaches your ear, and what makes one sound louder or higher than another.|من أين يأتي الصوت، وكيف يصل إلى أذنك، وما الذي يجعل صوتًا أعلى أو أحدّ من آخر.",
      lessons: [
        { t: "How are sounds made?|كيف تتكوّن الأصوات؟", page: 31 },
        { t: "Volume and pitch|شدة الصوت ودرجته", page: 38 },
        { t: "Changing the volume of sound|تغيير شدة الصوت", page: 42 },
        { t: "Changing the pitch of sound|تغيير درجة الصوت", page: 48 },
      ],
    },
    {
      id: "matter",
      title: "States and properties of matter|حالات المادة وخواصها",
      summary:
        "Gases you cannot see, the odd behaviour of water, and where the sugar goes when it dissolves.|غازات لا تراها، وسلوك الماء الغريب، وأين يذهب السكر حين يذوب.",
      lessons: [
        { t: "Gases|الغازات", page: 58 },
        { t: "Properties of water|خواص الماء", page: 66 },
        { t: "Evaporation and condensation|التبخر والتكاثف", page: 73 },
        { t: "Solutions|المحاليل", page: 82 },
      ],
    },
    {
      id: "digestion",
      title: "The digestive system|الجهاز الهضمي",
      summary:
        "The journey food makes through the body, and what a balanced diet actually balances.|رحلة الطعام داخل الجسم، وما الذي يوازنه الغذاء المتوازن فعلًا.",
      lessons: [
        { t: "Parts and functions of the digestive system|أجزاء الجهاز الهضمي ووظائفها", page: 94 },
        { t: "Balanced diets|الغذاء المتوازن", page: 101 },
      ],
    },
    {
      id: "forces",
      title: "Forces and magnetism|القوى والمغناطيسية",
      summary:
        "Pushes and pulls you can draw, why a satellite keeps falling without landing, and what a magnet reaches through.|دفعٌ وسحبٌ يمكنك رسمهما، ولماذا يظل القمر الصناعي يسقط دون أن يصل، وما الذي ينفذ خلاله المغناطيس.",
      lessons: [
        { t: "Gravity, normal forces and applied forces|الجاذبية وقوة الاتزان والقوى المؤثرة", page: 110 },
        { t: "Gravity and satellites|الجاذبية والأقمار الصناعية", page: 114 },
        { t: "Friction, air resistance, water resistance and upthrust|الاحتكاك ومقاومة الهواء والماء وقوة الطفو", page: 119 },
        { t: "Multiple forces|القوى المتعددة", page: 124 },
        { t: "Magnets and magnetic materials|المغناطيس والمواد المغناطيسية", page: 128 },
        { t: "Magnetic force|القوة المغناطيسية", page: 134 },
      ],
    },
    {
      id: "seasons",
      title: "Seasons and adaptations of plants and animals|الفصول وتكيّف النباتات والحيوانات",
      summary:
        "Why a year has seasons, and how living things are built for the place they live in.|لماذا للسنة فصول، وكيف تُبنى الكائنات لتناسب المكان الذي تعيش فيه.",
      lessons: [
        { t: "The Earth moves around the sun|دوران الأرض حول الشمس", page: 142 },
        { t: "Seasonal changes|التغيّرات الفصلية", page: 148 },
        { t: "Plants and animals are adapted to different environments|تكيّف النباتات والحيوانات مع بيئاتها", page: 155 },
        { t: "Adaptations of predators and prey|تكيّفات المفترس والفريسة", page: 161 },
      ],
    },
  ],
});
