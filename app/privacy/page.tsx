import { Metadata } from "next"
import { SourcePageContent } from "@/components/shared/source-page-content"
import { TextPageShell } from "@/components/shared/text-page-shell"

export const metadata: Metadata = {
  title: "Политика конфиденциальности — FMart Россия",
  description: "Политика в отношении обработки персональных данных ООО «ТПГ «РУСТЭК»",
}

export default function PrivacyPage() {
  return (
    <TextPageShell
      eyebrow="Privacy"
      title="Политика в отношении обработки персональных данных"
      description="Персональные данные посетителя сайта, пользователя и покупателя обрабатываются в соответствии с Федеральным законом №152-ФЗ «О персональных данных»."
      badge="FMART privacy"
      sidebarTitle="Персональные данные"
      sidebarDescription="Этот раздел описывает, какие данные могут обрабатываться на сайте FMART Россия, для каких целей и какими мерами они защищаются."
      sidebarItems={[
        "Обработка данных в рамках закона №152-ФЗ",
        "Использование сведений только в заявленных целях",
        "Организационные и технические меры защиты",
      ]}
    >
      <SourcePageContent slug="privacy" />
    </TextPageShell>
  )
}
