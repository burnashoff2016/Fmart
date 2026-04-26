import { TextPageShell } from "@/components/shared/text-page-shell"

export default function AgreementSendingPage() {
  return (
    <TextPageShell
      eyebrow="Mailing"
      title="Информационная рассылка"
      description="Условия получения сервисных и информационных сообщений от FMART Россия."
      badge="FMART mailing"
    >
      <h2>О чём эта страница</h2>
      <p>Информационная рассылка может включать уведомления о заявках, заказах, сервисной информации и маркетинговых сообщениях при наличии соответствующего согласия пользователя.</p>
      <h2>Отказ от рассылки</h2>
      <p>Пользователь вправе отказаться от получения рекламных и иных сообщений, уведомив об этом продавца по контактным каналам связи.</p>
    </TextPageShell>
  )
}
