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
        "Flowering and non-flowering plants|النباتات الزهرية وغير الزهرية",
        "Pollination, fruits and seeds|التلقيح والثمار والبذور",
        "How seeds are spread|كيف تنتشر البذور",
        "Seed germination|إنبات البذرة",
      ],
    },
    {
      id: "sound",
      title: "Sound|الصوت",
      summary:
        "Where sound comes from, how it reaches your ear, and what makes one sound louder or higher than another.|من أين يأتي الصوت، وكيف يصل إلى أذنك، وما الذي يجعل صوتًا أعلى أو أحدّ من آخر.",
      lessons: [
        "How are sounds made?|كيف تتكوّن الأصوات؟",
        "Volume and pitch|شدة الصوت ودرجته",
        "Changing the volume of sound|تغيير شدة الصوت",
        "Changing the pitch of sound|تغيير درجة الصوت",
      ],
    },
    {
      id: "matter",
      title: "States and properties of matter|حالات المادة وخواصها",
      summary:
        "Gases you cannot see, the odd behaviour of water, and where the sugar goes when it dissolves.|غازات لا تراها، وسلوك الماء الغريب، وأين يذهب السكر حين يذوب.",
      lessons: [
        "Gases|الغازات",
        "Properties of water|خواص الماء",
        "Evaporation and condensation|التبخر والتكاثف",
        "Solutions|المحاليل",
      ],
    },
    {
      id: "digestion",
      title: "The digestive system|الجهاز الهضمي",
      summary:
        "The journey food makes through the body, and what a balanced diet actually balances.|رحلة الطعام داخل الجسم، وما الذي يوازنه الغذاء المتوازن فعلًا.",
      lessons: [
        "Parts and functions of the digestive system|أجزاء الجهاز الهضمي ووظائفها",
        "Balanced diets|الغذاء المتوازن",
      ],
    },
    {
      id: "forces",
      title: "Forces and magnetism|القوى والمغناطيسية",
      summary:
        "Pushes and pulls you can draw, why a satellite keeps falling without landing, and what a magnet reaches through.|دفعٌ وسحبٌ يمكنك رسمهما، ولماذا يظل القمر الصناعي يسقط دون أن يصل، وما الذي ينفذ خلاله المغناطيس.",
      lessons: [
        "Gravity, normal forces and applied forces|الجاذبية وقوة الاتزان والقوى المؤثرة",
        "Gravity and satellites|الجاذبية والأقمار الصناعية",
        "Friction, air resistance, water resistance and upthrust|الاحتكاك ومقاومة الهواء والماء وقوة الطفو",
        "Multiple forces|القوى المتعددة",
        "Magnets and magnetic materials|المغناطيس والمواد المغناطيسية",
        "Magnetic force|القوة المغناطيسية",
      ],
    },
    {
      id: "seasons",
      title: "Seasons and adaptations of plants and animals|الفصول وتكيّف النباتات والحيوانات",
      summary:
        "Why a year has seasons, and how living things are built for the place they live in.|لماذا للسنة فصول، وكيف تُبنى الكائنات لتناسب المكان الذي تعيش فيه.",
      lessons: [
        "The Earth moves around the sun|دوران الأرض حول الشمس",
        "Seasonal changes|التغيّرات الفصلية",
        "Plants and animals are adapted to different environments|تكيّف النباتات والحيوانات مع بيئاتها",
        "Adaptations of predators and prey|تكيّفات المفترس والفريسة",
      ],
    },
  ],
});
