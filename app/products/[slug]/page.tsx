import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Check, Shield, Truck, RotateCcw } from "lucide-react"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { ContactForm } from "@/components/shared/contact-form"
import { AddToCartButton } from "@/app/components/cart/add-to-cart-button"
import { getProductBySlugFromStore, getProducts } from "@/lib/product-store"

export const dynamic = "force-dynamic"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlugFromStore(slug)

  if (!product) {
    return { title: "Продукт не найден" }
  }

  return {
    title: product.seoTitle || `${product.name} — купить робот-мойщик окон | FMart Россия`,
    description: product.seoDescription || product.description,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlugFromStore(slug)

  if (!product) {
    notFound()
  }

  const products = await getProducts()
  const otherProducts = products.filter((item) => item.slug !== slug).slice(0, 3)

  return (
    <div className="site-shell min-h-screen">
      <Navbar />

      <main className="pt-20">
        <div className="px-6 py-5">
          <div className="mx-auto max-w-6xl">
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#656b72] transition hover:text-[#111315] dark:text-slate-300 dark:hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Назад к каталогу
            </Link>
          </div>
        </div>

        <section className="px-6 pb-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="surface-card relative overflow-hidden rounded-3xl bg-[#f0f1eb] dark:bg-white/5">
              {product.oldPrice && (
                <span className="absolute left-5 top-5 z-10 rounded-full bg-[#e11d48] px-4 py-2 text-xs font-black text-white">
                  -20%
                </span>
              )}
              {product.tag && (
                <span className={`absolute top-5 z-10 rounded-full px-4 py-2 text-xs font-black ${product.oldPrice ? "left-24" : "left-5"} bg-[#ffd600] text-[#111315]`}>
                  {product.tag}
                </span>
              )}
              <div className="relative aspect-square">
                <Image src={product.image} alt={product.name} fill className="object-contain p-10" priority />
              </div>
            </div>

            <div>
              <p className="section-eyebrow mb-4">{product.tagline}</p>
              <h1 className="text-balance text-5xl font-black leading-[1] text-[#111315] dark:text-white md:text-6xl">
                {product.name}
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#656b72] dark:text-slate-300">{product.fullDescription}</p>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {product.highlights.map((item) => (
                  <div key={item.label} className="soft-panel rounded-2xl p-4">
                    <div className="text-xl font-black text-[#111315] dark:text-white">{item.value}</div>
                    <div className="mt-1 text-xs text-[#656b72] dark:text-slate-300">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-end gap-4">
                <span className="text-4xl font-black text-[#111315] dark:text-white">{product.price} ₽</span>
                {product.oldPrice && <span className="pb-1 text-xl text-[#8b929a] line-through">{product.oldPrice} ₽</span>}
              </div>

              <div className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${product.isAvailable ? "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300" : "bg-black/6 text-[#656b72] dark:bg-white/8 dark:text-slate-300"}`}>
                <Check className="h-4 w-4" />
                {product.isAvailable ? "В наличии" : "Нет в наличии — оставьте заявку"}
              </div>

              {product.isAvailable ? (
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <AddToCartButton product={product} className="brand-button inline-flex flex-1 items-center justify-center rounded-full px-8 py-4 text-sm font-black transition" />
                  <Link href="/cart" className="ink-button inline-flex flex-1 items-center justify-center rounded-full px-8 py-4 text-sm font-bold transition hover:opacity-90">
                    Перейти в корзину
                  </Link>
                </div>
              ) : (
                <div className="mt-8 rounded-3xl border border-border bg-black/[0.03] p-5 dark:bg-white/[0.04]">
                  <p className="text-sm font-bold text-[#111315] dark:text-white">Модель временно недоступна для покупки через корзину.</p>
                  <p className="mt-2 text-sm leading-6 text-[#656b72] dark:text-slate-300">Оставьте заявку, и менеджер подскажет сроки поставки или поможет подобрать ближайшую альтернативу.</p>
                  <Link href="/contacts" className="brand-button mt-5 inline-flex rounded-full px-6 py-3 text-sm font-black">
                    Оставить заявку
                  </Link>
                </div>
              )}

              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="soft-panel rounded-2xl p-4 text-center">
                  <Truck className="mx-auto mb-2 h-6 w-6 text-[#65707b] dark:text-[#ffd600]" />
                  <div className="text-xs font-medium text-[#656b72] dark:text-slate-300">Доставка по РФ</div>
                </div>
                <div className="soft-panel rounded-2xl p-4 text-center">
                  <Shield className="mx-auto mb-2 h-6 w-6 text-[#65707b] dark:text-[#ffd600]" />
                  <div className="text-xs font-medium text-[#656b72] dark:text-slate-300">Гарантия 1 год</div>
                </div>
                <div className="soft-panel rounded-2xl p-4 text-center">
                  <RotateCcw className="mx-auto mb-2 h-6 w-6 text-[#65707b] dark:text-[#ffd600]" />
                  <div className="text-xs font-medium text-[#656b72] dark:text-slate-300">Возврат 14 дней</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f0f1eb] px-6 py-16 dark:bg-white/5">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-black text-[#111315] dark:text-white">Ключевые особенности</h2>
              <div className="grid gap-3">
                {product.features.map((feature) => (
                  <div key={feature} className="surface-card flex items-center gap-3 rounded-2xl p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffd600]">
                      <Check className="h-5 w-5 text-[#111315]" />
                    </span>
                    <span className="text-sm leading-6 text-[#34383d] dark:text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-black text-[#111315] dark:text-white">Характеристики</h2>
              <div className="surface-card overflow-hidden rounded-2xl">
                {product.specs.map((spec, index) => (
                  <div key={spec.label} className={`grid grid-cols-[1fr_auto] gap-4 p-4 ${index !== product.specs.length - 1 ? "border-b border-border" : ""}`}>
                    <span className="text-sm text-[#656b72] dark:text-slate-300">{spec.label}</span>
                    <span className="text-right text-sm font-bold text-[#111315] dark:text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 text-3xl font-black text-[#111315] dark:text-white">Другие модели</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {otherProducts.map((item) => (
                <Link key={item.slug} href={`/products/${item.slug}`} className="group surface-card overflow-hidden rounded-2xl transition hover:-translate-y-1">
                  <div className="relative aspect-square bg-[#f0f1eb] dark:bg-white/5">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-7 transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black text-[#111315] dark:text-white">{item.name}</h3>
                    <div className="mt-2 text-xl font-black text-[#111315] dark:text-white">{item.price} ₽</div>
                  </div>
                </Link>
              ))}
            </div>
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
