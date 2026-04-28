import { TextPageShell } from "@/components/shared/text-page-shell"
import { SourcePageContent } from "@/components/shared/source-page-content"

export default function AgreementSendingPage() {
  return (
    <TextPageShell
      eyebrow="Mailing"
      title="Информационная рассылка"
      description="Условия получения сервисных и информационных сообщений от FMART Россия."
      badge="FMART mailing"
    >
      <SourcePageContent slug="agreement-sending" />
    </TextPageShell>
  )
}
