import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import Link from "next/link"
import { ContactForm } from "@/components/shared/contact-form"
import { SourcePageContent } from "@/components/shared/source-page-content"
import { PackageCheck, Truck, ShieldCheck, MapPin } from "lucide-react"

export const metadata = {
  title: "Доставка — FMART Россия",
  description: "Информация о доставке роботoв-мойщиков окон FMART",
}

export default function DeliveryPage() {
  return (
    <div className="site-shell min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.88fr] lg:items-center">
            <div>
              <p className="section-eyebrow mb-4">Логистика</p>
              <h1 className="text-balance text-5xl font-black leading-[1] text-[#111315] dark:text-white md:text-7xl">Доставка FMART</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#656b72] dark:text-slate-300">
                Оформляйте заказ удобным способом. Мы подберём оптимальный вариант доставки по России и странам СНГ и согласуем все детали перед отправкой.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products" className="brand-button inline-flex items-center rounded-full px-6 py-3 text-sm font-black">
                  Посмотреть модели
                </Link>
                <Link href="/contacts" className="ink-button inline-flex items-center rounded-full px-6 py-3 text-sm font-bold">
                  Уточнить условия
                </Link>
              </div>
            </div>

            <div className="cart-shell relative overflow-hidden rounded-[2rem] p-6">
              <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-slate-300/28 blur-3xl dark:bg-white/10" />
              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200 text-[#111315] shadow-[0_0_30px_rgba(148,163,184,0.22)] ring-1 ring-slate-300/70 dark:bg-white/10 dark:text-[#ffd600] dark:ring-white/12">
                  <Truck className="h-7 w-7" />
                </div>
                <h2 className="text-3xl font-black">Бережная доставка техники</h2>
                <p className="cart-muted mt-3 text-sm leading-6">
                  Каждую поставку сопровождаем менеджером и заранее подтверждаем сроки, адрес и способ получения.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="surface-card mx-auto max-w-6xl rounded-[2rem] p-6 md:p-10">
            <SourcePageContent slug="delivery" />
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
            <div className="surface-card rounded-3xl p-6">
              <PackageCheck className="mb-5 h-8 w-8 text-[#65707b] dark:text-[#ffd600]" />
              <h3 className="text-xl font-black text-[#111315] dark:text-white">Условия доставки</h3>
              <p className="mt-3 text-sm leading-7 text-[#656b72] dark:text-slate-300">
                Доставка осуществляется курьером, транспортными службами и через самовывоз из офисов продаж по согласованию.
              </p>
            </div>
            <div className="surface-card rounded-3xl p-6">
              <MapPin className="mb-5 h-8 w-8 text-[#65707b] dark:text-[#ffd600]" />
              <h3 className="text-xl font-black text-[#111315] dark:text-white">География</h3>
              <p className="mt-3 text-sm leading-7 text-[#656b72] dark:text-slate-300">
                Работаем по всей России и с рядом направлений по СНГ. Точный маршрут и стоимость рассчитываются отдельно.
              </p>
            </div>
            <div className="surface-card rounded-3xl p-6">
              <ShieldCheck className="mb-5 h-8 w-8 text-[#65707b] dark:text-[#ffd600]" />
              <h3 className="text-xl font-black text-[#111315] dark:text-white">Сроки</h3>
              <p className="mt-3 text-sm leading-7 text-[#656b72] dark:text-slate-300">
                Обычно доставка занимает 3–7 рабочих дней, но по регионам сроки могут отличаться в зависимости от направления.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-xl">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
