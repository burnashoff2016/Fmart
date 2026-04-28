import { TextPageShell } from "@/components/shared/text-page-shell"
import { SourcePageContent } from "@/components/shared/source-page-content"

export default function GuaranteesPage() {
  return (
    <TextPageShell
      eyebrow="Warranty"
      title="Гарантия и возврат"
      description="Информация о гарантийном обслуживании, правилах возврата и поддержке техники FMART после покупки."
      badge="FMART care"
    >
      <SourcePageContent slug="guarantees" />
    </TextPageShell>
  )
}
