import { catalog, catalogStats } from "../src/lib/content/index.js";

const stats = catalogStats();
console.log("stats:", JSON.stringify(stats));

const want = process.argv[2];
for (const curriculum of catalog) {
  for (const stage of curriculum.stages) {
    for (const grade of stage.grades) {
      for (const subject of grade.subjects) {
        if (want && !subject.id.includes(want)) continue;
        console.log(`\n== ${subject.id} (${subject.title.en} / ${subject.title.ar})`);
        for (const unit of subject.units) {
          console.log(`  -- ${unit.id} :: ${unit.title.en}`);
          for (const lesson of unit.lessons) {
            console.log(`     ${lesson.id} :: ${lesson.title.en} | ${lesson.title.ar}`);
          }
        }
      }
    }
  }
}
