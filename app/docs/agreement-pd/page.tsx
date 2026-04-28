import { TextPageShell } from "@/components/shared/text-page-shell"
import { SourcePageContent } from "@/components/shared/source-page-content"

export default function AgreementPDPage() {
  return (
    <TextPageShell
      eyebrow="Data"
      title="Обработка персональных данных"
      description="Основные принципы, цели и правила обработки персональных данных, передаваемых через сайт FMART Россия."
      badge="FMART data"
    >
      <SourcePageContent slug="agreement-pd" />
    </TextPageShell>
  )
}
