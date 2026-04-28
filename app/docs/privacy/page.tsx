import { TextPageShell } from "@/components/shared/text-page-shell"
import { SourcePageContent } from "@/components/shared/source-page-content"

export default function PrivacyPage() {
  return (
    <TextPageShell
      eyebrow="Privacy"
      title="Политика конфиденциальности"
      description="Мы уважительно относимся к приватности пользователей и применяем меры для защиты персональных данных, передаваемых через сайт FMART Россия."
      badge="FMART privacy"
    >
      <SourcePageContent slug="privacy" />
    </TextPageShell>
  )
}
