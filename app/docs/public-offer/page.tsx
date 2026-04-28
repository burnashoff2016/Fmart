import { TextPageShell } from "@/components/shared/text-page-shell"
import { SourcePageContent } from "@/components/shared/source-page-content"

export default function PublicOfferPage() {
  return (
    <TextPageShell
      eyebrow="Offer"
      title="Публичная оферта"
      description="Условия продажи товаров на сайте FMART Россия, порядок оформления заказа и базовые обязательства сторон."
      badge="FMART offer"
    >
      <SourcePageContent slug="public-offer" />
    </TextPageShell>
  )
}
