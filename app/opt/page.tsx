import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import Link from "next/link"
import { ContactForm } from "@/components/shared/contact-form"
import { Boxes, Handshake, Headphones, Truck } from "lucide-react"

export const metadata = {
  title: "Оптовая торговля — FMART Россия",
  description: "Стать партнером и покупать оптом роботoв-мойщиков окон FMART",
}

export default function OptPage() {
  return (
    <div className="site-shell min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.88fr] lg:items-center">
            <div>
              <p className="section-eyebrow mb-4">Партнёрам</p>
              <h1 className="text-balance text-5xl font-black leading-[1] text-[#111315] dark:text-white md:text-7xl">Оптовые продажи FMART</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#656b72] dark:text-slate-300">
                Программа для дилеров, маркетплейсов, региональных партнёров и корпоративных клиентов. Поможем собрать удобную модель закупки под ваш объём.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contacts" className="brand-button inline-flex items-center rounded-full px-6 py-3 text-sm font-black">
                  Связаться с отделом продаж
                </Link>
                <Link href="/products" className="ink-button inline-flex items-center rounded-full px-6 py-3 text-sm font-bold">
                  Смотреть линейку
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] bg-[#111315] p-8 text-white shadow-soft">
              <Handshake className="mb-5 h-8 w-8 text-[#ffd600]" />
              <h2 className="text-3xl font-black">Гибкие условия сотрудничества</h2>
              <p className="mt-4 text-sm leading-7 text-white/70">
                Поддерживаем переговоры по ассортименту, логистике, маркетинговому сопровождению и персональным условиям под канал продаж.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
            <div className="surface-card rounded-3xl p-6">
              <Boxes className="mb-5 h-8 w-8 text-[#65707b] dark:text-[#ffd600]" />
              <h3 className="text-xl font-black text-[#111315] dark:text-white">Минимальный заказ</h3>
              <p className="mt-3 text-sm leading-7 text-[#656b72] dark:text-slate-300">
                Можно начать с умеренного объёма и перейти к расширенной матрице после теста спроса и первых поставок.
              </p>
            </div>
            <div className="surface-card rounded-3xl p-6">
              <Truck className="mb-5 h-8 w-8 text-[#65707b] dark:text-[#ffd600]" />
              <h3 className="text-xl font-black text-[#111315] dark:text-white">Логистика</h3>
              <p className="mt-3 text-sm leading-7 text-[#656b72] dark:text-slate-300">
                Организуем поставки по регионам, согласуем сроки, упаковку и маршрут с учётом особенностей вашего бизнеса.
              </p>
            </div>
            <div className="surface-card rounded-3xl p-6">
              <Headphones className="mb-5 h-8 w-8 text-[#65707b] dark:text-[#ffd600]" />
              <h3 className="text-xl font-black text-[#111315] dark:text-white">Поддержка</h3>
              <p className="mt-3 text-sm leading-7 text-[#656b72] dark:text-slate-300">
                Менеджеры помогают с подбором моделей, презентацией продукта, материалами для продаж и запуском партнёрского направления.
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
