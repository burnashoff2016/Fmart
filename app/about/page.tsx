import { Metadata } from "next"
import Image from "next/image"
import { Award, Factory, Globe, ShieldCheck, Sparkles, Users } from "lucide-react"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { ContactForm } from "@/components/shared/contact-form"
import { SourcePageContent } from "@/components/shared/source-page-content"
import { AnimatedContent } from "@/components/reactbits/animated-content"
import { CountUp } from "@/components/reactbits/count-up"

export const metadata: Metadata = {
  title: "О бренде FMART — история, представитель в России",
  description: "FMART Technology Co., Ltd. — бренд высокотехнологичных роботизированных решений. История компании и представительство в России.",
}

const STATS = [
  { icon: Factory, value: "30 000", label: "м² производства" },
  { icon: Globe, value: "1 000 000+", label: "устройств в год" },
  { icon: Award, value: "1 500+", label: "патентов" },
  { icon: Users, value: "2017", label: "год основания" },
]

const PRINCIPLES = [
  "Инженерная разработка и собственное производство",
  "Контроль полного цикла: от идеи до серийного выпуска",
  "Локальное сопровождение продаж и коммуникации в России",
]

const GALLERY = [
  "/images/about-1.jpg",
  "/images/about-2.jpg",
  "/images/about-3.jpg",
]

export default function AboutPage() {
  return (
    <div className="site-shell min-h-screen">
      <Navbar />

      <main className="pt-20">
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="section-eyebrow mb-4">О бренде</p>
              <h1 className="text-balance text-5xl font-black leading-[1] text-[#111315] dark:text-white md:text-7xl">
                FMART: робототехника для чистого пространства
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#656b72] dark:text-slate-300">
                FMART Technology Co., Ltd. объединяет исследования, разработку, производство и коммерческое развитие роботизированных решений для автоматизированной уборки.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-slate-300 bg-slate-100/70 px-4 py-2 text-sm font-bold text-[#65707b] dark:border-white/12 dark:bg-white/8 dark:text-slate-200">Global R&D</span>
                <span className="rounded-full border border-border bg-white/50 px-4 py-2 text-sm font-bold text-[#34383d] dark:bg-white/6 dark:text-white">FMART Russia</span>
              </div>
            </div>

            <div className="cart-shell relative overflow-hidden rounded-[2rem] p-4">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-slate-300/28 blur-3xl dark:bg-white/10" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                <Image src="/images/about-1.jpg" alt="Технологии FMART" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/38 p-4 text-white backdrop-blur-md">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#ffd600]">FMART Technology</div>
                  <div className="mt-1 text-xl font-black">Инженерный цикл под контролем</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="surface-card mx-auto max-w-6xl rounded-[2rem] p-6 md:p-10">
            <SourcePageContent slug="about" />
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((stat, index) => (
              <AnimatedContent key={stat.label} delay={index * 0.08} distance={28}>
                <div className="surface-card rounded-2xl p-6">
                <stat.icon className="mb-5 h-8 w-8 text-[#65707b] dark:text-[#ffd600]" />
                <div className="text-3xl font-black text-[#111315] dark:text-white">
                  {stat.label === "м² производства" && <CountUp to={30000} suffix="" />}
                  {stat.label === "устройств в год" && <CountUp to={1000000} suffix="+" />}
                  {stat.label === "патентов" && <CountUp to={1500} suffix="+" />}
                  {stat.label === "год основания" && <CountUp to={2017} suffix="" />}
                </div>
                <div className="mt-2 text-sm text-[#656b72] dark:text-slate-300">{stat.label}</div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="section-eyebrow mb-4">История</p>
              <h2 className="text-4xl font-black text-[#111315] dark:text-white">От фабрики в Чунцине до международного рынка</h2>
            </div>
            <div className="surface-card rounded-3xl p-7 md:p-9">
              <p className="text-lg leading-8 text-[#656b72] dark:text-slate-300">
                В 2017 году был создан бренд FMART, основана фабрика Chongqing FMART и начато развитие международного сотрудничества. Производственная база компании ориентирована на глобальный рынок и обеспечивает значительные объёмы выпуска продукции.
              </p>
              <p className="mt-6 text-lg leading-8 text-[#656b72] dark:text-slate-300">
                Парк площадью 30 000 м² рассчитан на производство более 1 миллиона единиц техники в год. Компания обладает более чем 1500 зарегистрированными патентами и специализируется на устройствах для автоматизированной уборки.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            {GALLERY.map((src, index) => (
              <div key={src} className="cart-panel-strong relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src={src} alt={`FMART производство ${index + 1}`} fill className="object-cover transition duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] bg-[#111315] p-8 text-white shadow-soft md:grid-cols-[1fr_0.9fr] md:p-10">
            <div>
              <Sparkles className="mb-5 h-8 w-8 text-[#ffd600]" />
              <h2 className="text-3xl font-black md:text-4xl">FMART в России</h2>
              <p className="mt-5 text-base leading-7 text-white/70">
                В России продукция FMART представляется компанией ООО «ТПГ РУСТЭК». Мы отвечаем за развитие бренда, локализацию продукции, сопровождение продаж и коммуникацию с клиентами и партнёрами.
              </p>
            </div>
            <div className="space-y-4">
              {PRINCIPLES.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white/7 p-4 ring-1 ring-white/10">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#ffd600]" />
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
