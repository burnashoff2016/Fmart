import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { ContactForm } from "@/components/shared/contact-form"
import { AddToCartButton } from "@/app/components/cart/add-to-cart-button"
import { PRODUCTS } from "@/lib/products"

export const metadata: Metadata = {
  title: "Каталог роботов-мойщиков окон — FMart Россия",
  description: "Каталог роботов-мойщиков окон FMart. T11, T10 PRO, T9, T8 PRO, W7, W6 — найдите идеальную модель для ваших задач.",
}

export default function ProductsPage() {
  return (
    <div className="site-shell min-h-screen">
      <Navbar />

      <main className="pt-20">
        <section className="px-6 pb-12 pt-16">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-end">
            <div>
              <p className="section-eyebrow mb-4">Каталог</p>
              <h1 className="text-balance text-5xl font-black leading-[1] text-[#111315] dark:text-white md:text-6xl">
                Роботы-мойщики окон FMART
              </h1>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[#656b72] dark:text-slate-300">
              Выберите модель под площадь остекления, нужную мощность и сценарий использования. Все устройства рассчитаны на безопасную работу на стекле и гладких поверхностях.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto grid max-w-6xl gap-6">
            {PRODUCTS.map((product) => (
              <article key={product.slug} className="surface-card overflow-hidden rounded-3xl">
                <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                  <Link href={`/products/${product.slug}`} className="group relative min-h-[320px] bg-[#f0f1eb] dark:bg-white/5 md:min-h-[420px]">
                    {product.tag && (
                      <span className="absolute left-5 top-5 z-10 rounded-full bg-[#ffd600] px-4 py-2 text-xs font-black text-[#111315]">
                        {product.tag}
                      </span>
                    )}
                    {!product.isAvailable && (
                      <span className="absolute right-5 top-5 z-10 rounded-full bg-[#111315] px-4 py-2 text-xs font-bold text-white">
                        Нет в наличии
                      </span>
                    )}
                    <Image src={product.image} alt={product.name} fill className="object-contain p-10 transition duration-500 group-hover:scale-105" />
                  </Link>

                  <div className="flex flex-col justify-center p-7 md:p-10">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#8a6f00] dark:text-[#ffd600]">{product.tagline}</p>
                    <h2 className="text-3xl font-black text-[#111315] dark:text-white md:text-4xl">{product.name}</h2>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-[#656b72] dark:text-slate-300">{product.description}</p>

                    <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {product.highlights.map((item) => (
                        <div key={item.label} className="soft-panel rounded-2xl p-4">
                          <div className="text-xl font-black text-[#111315] dark:text-white">{item.value}</div>
                          <div className="mt-1 text-xs text-[#656b72] dark:text-slate-300">{item.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span className="text-3xl font-black text-[#111315] dark:text-white">{product.price} ₽</span>
                        {product.oldPrice && <span className="ml-3 text-base text-[#8b929a] line-through">{product.oldPrice} ₽</span>}
                        <div className="mt-2 flex items-center gap-2 text-sm text-[#656b72] dark:text-slate-300">
                          <CheckCircle2 className="h-4 w-4 text-[#8a6f00] dark:text-[#ffd600]" />
                          {product.isAvailable ? "В наличии" : "Доступно под заказ"}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 sm:min-w-[260px]">
                        <AddToCartButton
                          product={product}
                          label="В корзину"
                          className="brand-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-black transition disabled:opacity-50"
                        />
                        <Link href={`/products/${product.slug}`} className="ink-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition hover:opacity-90">
                          Подробнее <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#f0f1eb] px-6 py-16 dark:bg-white/5">
          <div className="mx-auto max-w-xl">
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
