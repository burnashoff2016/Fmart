import { TextPageShell } from "@/components/shared/text-page-shell"
import { SourcePageContent } from "@/components/shared/source-page-content"

export default function PaymentsPage() {
  return (
    <TextPageShell
      eyebrow="Payments"
      title="Способы оплаты"
      description="Краткая информация о доступных вариантах оплаты и подтверждении заказа на сайте FMART Россия."
      badge="FMART payment"
    >
      <SourcePageContent slug="payments" />
    </TextPageShell>
  )
}
