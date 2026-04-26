import { Metadata } from "next"
import { Clock, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck } from "lucide-react"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { ContactForm } from "@/components/shared/contact-form"

export const metadata: Metadata = {
  title: "Контакты — FMart Россия",
  description: "Свяжитесь с нами для консультации по роботам-мойщикам окон FMart. Официальный представитель в России.",
}

const CONTACTS = [
  {
    icon: Phone,
    title: "Телефон",
    value: "+7 499 707-15-92",
    href: "tel:+74997071592",
    description: "Звоните в рабочее время",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@fmart.tech",
    href: "mailto:info@fmart.tech",
    description: "Ответим в течение дня",
  },
  {
    icon: MapPin,
    title: "Адрес",
    value: "Москва, ул. Воронцовские пруды, д. 3",
    href: "https://yandex.ru/maps/-/CDaJzQQJ",
    description: "Офис продаж",
  },
  {
    icon: MessageCircle,
    title: "Telegram",
    value: "@fmarttechat",
    href: "https://t.me/fmarttechat",
    description: "Чат поддержки",
  },
]

const HOURS = [
  { label: "Офис продаж", value: "ежедневно с 9:00 до 18:00" },
  { label: "Поддержка", value: "ежедневно с 9:00 до 21:00" },
]

export default function ContactsPage() {
  return (
    <div className="site-shell min-h-screen">
      <Navbar />

      <main className="pt-20">
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="section-eyebrow mb-4">Контакты</p>
              <h1 className="text-balance text-5xl font-black leading-[1] text-[#111315] dark:text-white md:text-7xl">
                Свяжитесь с FMART удобным способом
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#656b72] dark:text-slate-300">
                Поможем выбрать модель, уточнить наличие, условия доставки, гарантию и партнёрские возможности.
              </p>
            </div>

            <div className="cart-shell relative overflow-hidden rounded-[2rem] p-6">
              <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#ffd600]/16 blur-3xl" />
              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ffd600] text-[#111315] shadow-[0_0_30px_rgba(255,214,0,0.28)]">
                  <Send className="h-7 w-7" />
                </div>
                <h2 className="text-3xl font-black">Быстрый ответ</h2>
                <p className="cart-muted mt-3 text-sm leading-6">
                  Оставьте заявку или напишите в Telegram. Менеджер подскажет подходящую модель и условия покупки.
                </p>
                <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-200">
                  <div className="flex items-center gap-2 font-bold">
                    <ShieldCheck className="h-5 w-5" />
                    Официальный представитель в России
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
            {CONTACTS.map((contact) => (
              <a
                key={contact.title}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group surface-card rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-[#ffd600]/45"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffd600] text-[#111315] transition group-hover:scale-105">
                  <contact.icon className="h-6 w-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a6f00] dark:text-[#ffd600]">{contact.title}</div>
                <p className="mt-2 text-lg font-black text-[#111315] dark:text-white">{contact.value}</p>
                <p className="mt-3 text-sm leading-6 text-[#656b72] dark:text-slate-300">{contact.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="surface-card rounded-3xl p-7 md:p-8">
              <div className="mb-7 flex items-center gap-3">
                <Clock className="h-7 w-7 text-[#d0a900] dark:text-[#ffd600]" />
                <h2 className="text-3xl font-black text-[#111315] dark:text-white">Время работы</h2>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border">
                {HOURS.map((item, index) => (
                  <div key={item.label} className={`grid gap-2 p-5 sm:grid-cols-[1fr_auto] ${index !== HOURS.length - 1 ? "border-b border-border" : ""}`}>
                    <span className="text-sm text-[#656b72] dark:text-slate-300">{item.label}</span>
                    <span className="font-bold text-[#111315] dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#111315] p-7 text-white shadow-soft md:p-8">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ffd600]">Офис продаж</p>
                <h2 className="mt-2 text-3xl font-black">Москва</h2>
                <p className="mt-3 text-sm leading-6 text-white/68">
                  ул. Воронцовские пруды, д. 3. Для визита в офис продаж лучше заранее связаться с менеджером.
                </p>
              </div>
              <a
                href="https://yandex.ru/maps/-/CDaJzQQJ"
                target="_blank"
                rel="noopener noreferrer"
                className="brand-button inline-flex rounded-full px-6 py-3 text-sm font-black"
              >
                Открыть карту
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-xl">
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
