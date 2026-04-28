"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Cpu, Droplets, Shield, Sparkles, Zap } from "lucide-react"
import { Navbar } from "./shared/navbar"
import { Footer } from "./shared/footer"
import { ContactForm } from "./shared/contact-form"
import { HeroMediaStage } from "./hero-media-stage"
import { AnimatedContent } from "@/components/reactbits/animated-content"
import type { Product } from "@/lib/products"

const FEATURES = [
  { icon: Zap, title: "5300 Па", desc: "Вакуумная фиксация и стабильная тяга" },
  { icon: Droplets, title: "4 форсунки", desc: "Ультразвуковое распыление без разводов" },
  { icon: Cpu, title: "Умный маршрут", desc: "Равномерное покрытие всей поверхности" },
  { icon: Shield, title: "ИБП до 50 мин", desc: "Запас питания и страховочный трос" },
]

const TRUST_ITEMS = [
  "Официальная гарантия и сервисное обслуживание",
  "Оригинальная продукция от представителя FMART в России",
  "Покупка на сайте или через привычные маркетплейсы",
]

const HERO_MEDIA = {
  mode: "video" as const,
  posterSrc: "/images/hero-robot.jpg",
  videoSrc: undefined,
  modelSrc: undefined,
}

export function HomePage({ products, featured }: { products: Product[]; featured: Product }) {
  return (
    <div className="site-shell min-h-screen">
      <Navbar />

      <main>
        <section className="relative flex h-[86svh] min-h-[640px] items-center overflow-hidden pt-20">
          <HeroMediaStage
            mode={HERO_MEDIA.mode}
            posterSrc={HERO_MEDIA.posterSrc}
            videoSrc={HERO_MEDIA.videoSrc}
            modelSrc={HERO_MEDIA.modelSrc}
            alt="Робот-мойщик окон FMart на стекле"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(245,246,242,0.96)_0%,_rgba(245,246,242,0.88)_38%,_rgba(245,246,242,0.34)_68%,_rgba(245,246,242,0.1)_100%)] dark:bg-[linear-gradient(90deg,_rgba(11,13,15,0.96)_0%,_rgba(11,13,15,0.86)_42%,_rgba(11,13,15,0.32)_70%,_rgba(11,13,15,0.08)_100%)]" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
            <AnimatedContent className="max-w-2xl" distance={44} duration={0.8}>
              <p className="section-eyebrow mb-5">Роботы-мойщики окон FMart</p>
              <h1 className="text-balance text-5xl font-black leading-[0.96] text-[#111315] dark:text-white md:text-7xl">
                Моют окна, пока вы отдыхаете
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#4d535a] dark:text-slate-200">
                {featured.name} очищает стекло, зеркала и гладкие поверхности с вакуумной фиксацией, автоматическим распылением и интеллектуальной навигацией.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link href={`/products/${featured.slug}`} className="brand-button inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-black transition">
                  Подробнее о T11 <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/products" className="inline-flex items-center justify-center gap-2 rounded-full border border-black/12 bg-white/72 px-7 py-4 text-sm font-bold text-[#111315] transition hover:bg-white dark:border-white/16 dark:bg-white/8 dark:text-white dark:hover:bg-white/12">
                  Смотреть каталог
                </Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                {featured.highlights.map((item) => (
                  <AnimatedContent key={item.label} delay={0.08} distance={24} className="rounded-2xl bg-white/76 p-4 ring-1 ring-black/10 backdrop-blur dark:bg-white/8 dark:ring-white/12">
                    <div className="text-xl font-black text-[#111315] dark:text-white">{item.value}</div>
                    <div className="mt-1 text-xs font-medium text-[#6b6f76] dark:text-slate-300">{item.label}</div>
                  </AnimatedContent>
                ))}
              </div>
            </AnimatedContent>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
            {FEATURES.map((feature, index) => (
              <AnimatedContent key={feature.title} delay={index * 0.08} distance={28}>
                <div className="surface-card rounded-2xl p-6">
                <feature.icon className="mb-5 h-7 w-7 text-[#65707b] dark:text-[#ffd600]" />
                <h3 className="text-lg font-black text-[#111315] dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#656b72] dark:text-slate-300">{feature.desc}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="section-eyebrow mb-3">Модели</p>
                <h2 className="text-4xl font-black tracking-normal text-[#111315] dark:text-white md:text-5xl">Линейка FMART</h2>
              </div>
              <p className="max-w-md text-base leading-7 text-[#656b72] dark:text-slate-300">
                От компактных решений до флагманского T11 с четырёхсторонним распылением и повышенной мощностью.
              </p>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <AnimatedContent key={product.slug} delay={index * 0.06} distance={30} className="h-full">
                  <Link href={`/products/${product.slug}`} className="group surface-card relative flex h-full flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1">
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
                      <Image src={product.image} alt={product.name} fill className="object-contain p-8 transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 min-h-4 text-xs font-bold uppercase tracking-[0.14em] text-[#65707b] dark:text-[#ffd600]">{product.tagline}</div>
                      <h3 className="min-h-[64px] text-2xl font-black text-[#111315] dark:text-white">{product.name}</h3>
                      <p className="mt-3 min-h-[168px] text-sm leading-6 text-[#656b72] dark:text-slate-300 sm:min-h-[144px] lg:min-h-[168px]">{product.description}</p>
                      <div className="mt-auto pt-5">
                        <div className="grid grid-cols-2 gap-2">
                          {product.highlights.slice(0, 2).map((item) => (
                            <div key={item.label} className="soft-panel rounded-2xl p-3">
                              <div className="text-sm font-black text-[#111315] dark:text-white">{item.value}</div>
                              <div className="mt-0.5 text-[11px] text-[#656b72] dark:text-slate-300">{item.label}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 flex min-h-[42px] items-end justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                              <span className="text-2xl font-black text-[#111315] dark:text-white">{product.price} ₽</span>
                              {product.oldPrice && <span className="text-sm text-[#8b929a] line-through">{product.oldPrice} ₽</span>}
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 shrink-0 text-[#111315] transition group-hover:translate-x-1 dark:text-white" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl bg-[#111315] p-8 text-white shadow-soft md:grid-cols-[1fr_0.8fr] md:p-12">
            <div>
              <Sparkles className="mb-5 h-8 w-8 text-[#ffd600]" />
              <h2 className="max-w-2xl text-3xl font-black md:text-4xl">Покупайте там, где удобно</h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/68">
                FMART можно приобрести через официальный сайт и партнёрские онлайн-площадки. На продукцию распространяется официальная гарантия и сервисное обслуживание.
              </p>
            </div>
            <div className="space-y-4">
              {TRUST_ITEMS.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white/7 p-4 ring-1 ring-white/10">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#ffd600]" />
                  <span className="text-sm leading-6 text-white/78">{item}</span>
                </div>
              ))}
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
