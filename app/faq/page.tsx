import { SourcePageContent } from "@/components/shared/source-page-content"
import { TextPageShell } from "@/components/shared/text-page-shell"

export const metadata = {
  title: "Часто задаваемые вопросы — FMART Россия",
  description: "Ответы на частые вопросы о роботах-мойщиках окон FMART, использовании, безопасности и гарантии.",
}

export default function FAQPage() {
  return (
    <TextPageShell
      eyebrow="FAQ"
      title="Часто задаваемые вопросы"
      description="Ответы на вопросы о применении, безопасности, управлении и гарантийном обслуживании роботов-мойщиков окон FMART."
      badge="FMART FAQ"
    >
      <SourcePageContent slug="faq" />
    </TextPageShell>
  )
}
