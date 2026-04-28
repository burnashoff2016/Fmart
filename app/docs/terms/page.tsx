import { TextPageShell } from "@/components/shared/text-page-shell"
import { SourcePageContent } from "@/components/shared/source-page-content"

export default function TermsPage() {
  return (
    <TextPageShell
      eyebrow="Terms"
      title="Пользовательское соглашение"
      description="Основные условия использования сайта FMART Россия, взаимодействия с контентом, формами и сервисными разделами."
      badge="FMART terms"
    >
      <SourcePageContent slug="terms" />
    </TextPageShell>
  )
}
