import { catalog } from "@/lib/content";
import { EnrolmentForm, EnrolmentPickerFields, type CurriculumOption } from "./enrolment-picker";

/** Flattens the catalogue once on the server; the client only receives labels. */
function options(): CurriculumOption[] {
  return catalog.map((curriculum) => ({
    id: curriculum.id,
    title: curriculum.title,
    flag: curriculum.flag,
    grades: curriculum.stages.flatMap((stage) =>
      stage.grades.map((grade) => ({ id: grade.id, title: grade.title })),
    ),
  }));
}

export function EnrolmentPicker({
  curriculumId,
  gradeId,
}: {
  curriculumId?: string;
  gradeId?: string;
}) {
  return <EnrolmentForm options={options()} defaultCurriculumId={curriculumId} defaultGradeId={gradeId} />;
}

/** The same two selects without a form of their own, for the sign-up page. */
export function EnrolmentFields() {
  return <EnrolmentPickerFields options={options()} />;
}
