"use client";

import { useActionState, useMemo, useState } from "react";
import { updateEnrolmentAction, type FormState } from "@/lib/auth/actions";
import { useI18n } from "@/lib/i18n/client";
import { t } from "@/lib/i18n/config";
export type CurriculumOption = {
  id: string;
  title: { ar: string; en: string };
  flag: string;
  grades: { id: string; title: { ar: string; en: string } }[];
};

export function EnrolmentPickerFields({
  options,
  defaultCurriculumId,
  defaultGradeId,
}: {
  options: CurriculumOption[];
  defaultCurriculumId?: string;
  defaultGradeId?: string;
}) {
  const { locale, d } = useI18n();
  const [curriculumId, setCurriculumId] = useState(defaultCurriculumId ?? options[0]?.id ?? "");
  const grades = useMemo(
    () => options.find((option) => option.id === curriculumId)?.grades ?? [],
    [options, curriculumId],
  );

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="block">
        <span className="mb-1 block text-sm font-semibold">{d.auth.curriculum}</span>
        <select
          name="curriculumId"
          className="field"
          value={curriculumId}
          onChange={(event) => setCurriculumId(event.target.value)}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.flag} {t(option.title, locale)}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-semibold">{d.auth.grade}</span>
        <select name="gradeId" className="field" defaultValue={defaultGradeId} key={curriculumId}>
          {grades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {t(grade.title, locale)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export function EnrolmentForm({
  options,
  defaultCurriculumId,
  defaultGradeId,
}: {
  options: CurriculumOption[];
  defaultCurriculumId?: string;
  defaultGradeId?: string;
}) {
  const { d } = useI18n();
  const [state, formAction, pending] = useActionState<FormState, FormData>(updateEnrolmentAction, {});

  return (
    <form action={formAction} className="space-y-4">
      <EnrolmentPickerFields options={options} defaultCurriculumId={defaultCurriculumId} defaultGradeId={defaultGradeId} />
      <button type="submit" className="btn btn-primary w-full" disabled={pending}>
        {pending ? d.common.loading : d.common.save}
      </button>
      {state.ok ? <p className="text-sm text-mint-600">✓</p> : null}
    </form>
  );
}
