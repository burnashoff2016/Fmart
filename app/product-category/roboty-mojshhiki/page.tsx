import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ContactForm } from "@/components/shared/contact-form"
import { getProducts } from "@/lib/product-store"

export const dynamic = "force-dynamic"

export default async function RobotyMojshhikiCategory() {
  const products = await getProducts()

  return (
    <div className="site-shell min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="px-6 pb-12 pt-16">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-end">
            <div>
              <p className="section-eyebrow mb-4">Категория</p>
              <h1 className="text-balance text-5xl font-black leading-[1] text-[#111315] dark:text-white md:text-6xl">
                Роботы-мойщики окон
              </h1>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[#656b72] dark:text-slate-300">
              Подборка моделей FMART для очистки окон, зеркал и других гладких поверхностей. Выберите нужный уровень мощности, функций и сценария применения.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
              {products.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`} className="group surface-card relative overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-300 via-white to-slate-400/70 dark:from-white/10 dark:via-white/30 dark:to-white/10" />
                  <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_34%_18%,rgba(255,255,255,0.95),transparent_18rem),linear-gradient(135deg,#eef1f4,#dfe4ea)] dark:bg-[radial-gradient(circle_at_34%_18%,rgba(255,255,255,0.10),transparent_18rem),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
                    {product.tag && (
                      <span className="absolute left-4 top-4 z-10 rounded-full bg-[#ffd600] px-3 py-1.5 text-xs font-black text-[#111315]">
                        {product.tag}
                      </span>
                    )}
                    {!product.isAvailable && (
                      <span className="absolute right-4 top-4 z-10 rounded-full bg-[#111315] px-3 py-1.5 text-xs font-bold text-white">
                        Нет в наличии
                      </span>
                    )}
                    <Image src={product.image} alt={product.name} fill className="object-contain p-7 transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <div className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#65707b] dark:text-[#ffd600]">{product.tagline}</div>
                    <h3 className="text-2xl font-black text-[#111315] dark:text-white">{product.name}</h3>
                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#656b72] dark:text-slate-300">{product.description}</p>
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {product.highlights.slice(0, 2).map((item) => (
                        <div key={item.label} className="soft-panel rounded-2xl p-3">
                          <div className="text-sm font-black text-[#111315] dark:text-white">{item.value}</div>
                          <div className="mt-0.5 text-[11px] text-[#656b72] dark:text-slate-300">{item.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex items-end justify-between gap-4">
                      <span className="text-2xl font-black text-[#111315] dark:text-white">{product.price} ₽</span>
                      <ArrowRight className="h-5 w-5 text-[#111315] transition group-hover:translate-x-1 dark:text-white" />
                    </div>
                  </div>
                </Link>
              ))}
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
