import { TextPageShell } from "@/components/shared/text-page-shell"

export default function PaymentsPage() {
  return (
    <TextPageShell
      eyebrow="Payments"
      title="Способы оплаты"
      description="Краткая информация о доступных вариантах оплаты и подтверждении заказа на сайте FMART Россия."
      badge="FMART payment"
    >
      <h2>Доступные способы</h2>
      <p>В зависимости от способа оформления заказа и канала покупки могут быть доступны различные варианты оплаты. Точный формат оплаты подтверждается менеджером.</p>
      <ul>
        <li>Оплата при оформлении заказа.</li>
        <li>Согласование деталей после подтверждения заявки.</li>
        <li>Индивидуальные условия для корпоративных и оптовых клиентов.</li>
      </ul>
    </TextPageShell>
  )
}
