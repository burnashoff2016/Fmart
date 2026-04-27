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
                <Link key={product.slug} href={`/products/${product.slug}`} className="group surface-card overflow-hidden rounded-3xl transition hover:-translate-y-1">
                  <div className="relative aspect-square bg-[#f0f1eb] dark:bg-white/5">
                    <Image src={product.image} alt={product.name} fill className="object-contain p-4" />
                  </div>
                  <div className="p-6">
                    <div className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8a6f00] dark:text-[#ffd600]">{product.tagline}</div>
                    <h3 className="text-2xl font-black text-[#111315] dark:text-white">{product.name}</h3>
                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#656b72] dark:text-slate-300">{product.description}</p>
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
