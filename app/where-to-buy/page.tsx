import { Navbar } from '@/components/shared/navbar'
import { Footer } from '@/components/shared/footer'
import Link from 'next/link'
import { ContactForm } from "@/components/shared/contact-form"
import { Globe, ShoppingBag, Store, Users } from "lucide-react"

export default function WhereToBuyPage() {
  return (
    <div className="site-shell min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.88fr] lg:items-center">
            <div>
              <p className="section-eyebrow mb-4">Каналы продаж</p>
              <h1 className="text-balance text-5xl font-black leading-[1] text-[#111315] dark:text-white md:text-7xl">Где купить FMART</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#656b72] dark:text-slate-300">
                Выберите удобный канал покупки: официальный сайт, партнёрские площадки или прямой контакт с отделом продаж для оптовых и корпоративных заказов.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products" className="brand-button inline-flex items-center rounded-full px-6 py-3 text-sm font-black">
                  Перейти в каталог
                </Link>
                <Link href="/delivery" className="ink-button inline-flex items-center rounded-full px-6 py-3 text-sm font-bold">
                  Условия доставки
                </Link>
              </div>
            </div>

            <div className="cart-shell relative overflow-hidden rounded-[2rem] p-6">
              <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-slate-300/28 blur-3xl dark:bg-white/10" />
              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200 text-[#111315] shadow-[0_0_30px_rgba(148,163,184,0.22)] ring-1 ring-slate-300/70 dark:bg-white/10 dark:text-[#ffd600] dark:ring-white/12">
                  <ShoppingBag className="h-7 w-7" />
                </div>
                <h2 className="text-3xl font-black">Официальные каналы покупки</h2>
                <p className="cart-muted mt-3 text-sm leading-6">
                  Мы помогаем выбрать подходящий способ заказа и подтвердим наличие, сроки и формат получения перед оформлением.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
            <div className="surface-card rounded-3xl p-6">
              <Globe className="mb-5 h-8 w-8 text-[#65707b] dark:text-[#ffd600]" />
              <h3 className="text-xl font-black text-[#111315] dark:text-white">Официальный сайт</h3>
              <p className="mt-3 text-sm leading-7 text-[#656b72] dark:text-slate-300">
                Полный каталог моделей, подробные карточки товара и оформление заказа напрямую через FMART Россия.
              </p>
            </div>
            <div className="surface-card rounded-3xl p-6">
              <Store className="mb-5 h-8 w-8 text-[#65707b] dark:text-[#ffd600]" />
              <h3 className="text-xl font-black text-[#111315] dark:text-white">Партнёрские площадки</h3>
              <p className="mt-3 text-sm leading-7 text-[#656b72] dark:text-slate-300">
                Доступны продажи через партнёрские онлайн-площадки и дистрибьюторов в разных регионах.
              </p>
            </div>
            <div className="surface-card rounded-3xl p-6">
              <Users className="mb-5 h-8 w-8 text-[#65707b] dark:text-[#ffd600]" />
              <h3 className="text-xl font-black text-[#111315] dark:text-white">Корпоративные и оптовые заказы</h3>
              <p className="mt-3 text-sm leading-7 text-[#656b72] dark:text-slate-300">
                Отдел продаж подскажет по объёмам, условиям сотрудничества и персональным предложениям для бизнеса.
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
