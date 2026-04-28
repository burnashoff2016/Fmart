"use client"

import type { ReactNode } from "react"
import { FileText, ShieldCheck } from "lucide-react"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { AnimatedContent } from "@/components/reactbits/animated-content"

type TextPageShellProps = {
  eyebrow: string
  title: string
  description: string
  badge?: string
  sidebarTitle?: string
  sidebarDescription?: string
  sidebarItems?: string[]
  children: ReactNode
}

export function TextPageShell({
  eyebrow,
  title,
  description,
  badge = "FMART docs",
  sidebarTitle = "Официальная информация",
  sidebarDescription = "Страница оформлена в едином визуальном стиле сайта и содержит справочную информацию для клиентов и партнёров.",
  sidebarItems = ["Актуально для сайта FMART Россия", "Структурировано для быстрого чтения", "Единый визуальный стиль бренда"],
  children,
}: TextPageShellProps) {
  return (
    <div className="site-shell min-h-screen">
      <Navbar />

      <main className="pt-20">
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-center">
            <AnimatedContent>
              <div>
                <p className="section-eyebrow mb-4">{eyebrow}</p>
                <h1 className="text-balance text-5xl font-black leading-[1] text-[#111315] dark:text-white md:text-7xl">
                  {title}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#656b72] dark:text-slate-300">
                  {description}
                </p>
              </div>
            </AnimatedContent>

            <AnimatedContent delay={0.08}>
              <div className="cart-shell relative overflow-hidden rounded-[2rem] p-6">
                <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-slate-300/28 blur-3xl dark:bg-white/10" />
                <div className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200 text-[#111315] shadow-[0_0_30px_rgba(148,163,184,0.22)] ring-1 ring-slate-300/70 dark:bg-white/10 dark:text-[#ffd600] dark:ring-white/12">
                    <FileText className="h-7 w-7" />
                  </div>
                  <div className="mb-4 inline-flex rounded-full border border-slate-300 bg-slate-100/70 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#65707b] dark:border-white/12 dark:bg-white/8 dark:text-[#ffd600]">
                    {badge}
                  </div>
                  <h2 className="text-3xl font-black">{sidebarTitle}</h2>
                  <p className="cart-muted mt-3 text-sm leading-6">
                    {sidebarDescription}
                  </p>
                  <div className="mt-6 space-y-3">
                    {sidebarItems.map((item) => (
                      <div key={item} className="cart-panel flex gap-3 rounded-2xl p-4">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#ffd600]" />
                        <span className="text-sm leading-6">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedContent>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-6xl">
            <AnimatedContent>
              <div className="surface-card rounded-[2rem] p-6 md:p-10">
                <div className="mx-auto max-w-4xl space-y-8 text-[#34383d] dark:text-slate-200 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-[#111315] [&_h2]:dark:text-white [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-[#111315] [&_h3]:dark:text-white [&_li]:leading-7 [&_li]:text-[#656b72] [&_li]:dark:text-slate-300 [&_p]:leading-8 [&_p]:text-[#656b72] [&_p]:dark:text-slate-300 [&_ul]:space-y-3 [&_ul]:pl-5 [&_ul]:marker:text-[#65707b] [&_ul]:dark:marker:text-[#ffd600]">
                  {children}
                </div>
              </div>
            </AnimatedContent>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
