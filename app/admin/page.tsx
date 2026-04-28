import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowRight, Boxes, CircleAlert, EyeOff, Image as ImageIcon, PackageCheck, Palette, Sparkles, Store, Tags } from "lucide-react"
import { saveSiteBackgroundAction } from "@/app/admin/actions"
import { AdminShell } from "@/components/admin/admin-shell"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getProducts } from "@/lib/product-store"
import { getSiteSettings, type SiteBackgroundMode } from "@/lib/site-settings"

const BACKGROUND_OPTIONS: Array<{ value: SiteBackgroundMode; label: string; description: string }> = [
  { value: "auto", label: "Авто", description: "Системный светлый или темный фон" },
  { value: "soft-gray", label: "Серый", description: "Мягкий технический градиент" },
  { value: "clean", label: "Чистый", description: "Спокойный почти однотонный фон" },
  { value: "contrast", label: "Контраст", description: "Более глубокая витринная сцена" },
]

export default async function AdminDashboardPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login")
  }

  const products = await getProducts({ includeDrafts: true })
  const settings = await getSiteSettings()
  const published = products.filter((product) => product.isPublished !== false)
  const available = products.filter((product) => product.isAvailable)
  const hidden = products.filter((product) => product.isPublished === false)
  const featured = products.filter((product) => product.isNew || product.tag)
  const withoutGallery = products.filter((product) => !product.gallery?.length)
  const withoutSeo = products.filter((product) => !product.seoTitle || !product.seoDescription)
  const withoutStock = products.filter((product) => !product.isAvailable)

  const stats = [
    { label: "Всего товаров", value: products.length, icon: Boxes },
    { label: "Опубликовано", value: published.length, icon: PackageCheck },
    { label: "В наличии", value: available.length, icon: Store },
    { label: "С метками", value: featured.length, icon: Tags },
  ]

  const attentionItems = [
    { label: "Скрытые товары", value: hidden.length, icon: EyeOff },
    { label: "Нет в наличии", value: withoutStock.length, icon: CircleAlert },
    { label: "Без галереи", value: withoutGallery.length, icon: ImageIcon },
    { label: "SEO не заполнено", value: withoutSeo.length, icon: Sparkles },
  ]

  return (
    <AdminShell>
      <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="cart-shell relative overflow-hidden rounded-[2rem] p-7 md:p-9">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-300 via-white to-slate-400/70 dark:from-white/10 dark:via-white/30 dark:to-white/10" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-eyebrow mb-4">Панель управления</p>
              <h1 className="text-4xl font-black leading-none text-[#111315] dark:text-white md:text-5xl">FMART Admin</h1>
              <p className="cart-muted mt-5 max-w-2xl text-base leading-7">
                Управляйте товарами, публикацией, ценами и наполнением каталога из одного рабочего экрана.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/admin/products" className="ink-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-black">
                Каталог <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/admin/products/new" className="brand-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-black">
                Добавить товар <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <aside className="rounded-[2rem] bg-[#111315] p-6 text-white shadow-soft">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-white/48">Состояние витрины</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
              <div className="text-3xl font-black">{published.length}</div>
              <div className="mt-1 text-xs font-bold text-white/56">видно на сайте</div>
            </div>
            <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
              <div className="text-3xl font-black">{available.length}</div>
              <div className="mt-1 text-xs font-bold text-white/56">доступно к продаже</div>
            </div>
          </div>
          <Link href="/products" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#111315] transition hover:bg-[#ffd600]">
            Открыть витрину <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="surface-card rounded-3xl p-5">
              <Icon className="mb-5 h-7 w-7 text-[#65707b] dark:text-[#ffd600]" />
              <div className="text-4xl font-black text-[#111315] dark:text-white">{item.value}</div>
              <div className="mt-2 text-sm font-semibold text-[#656b72] dark:text-slate-300">{item.label}</div>
            </div>
          )
        })}
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="surface-card rounded-[2rem] p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-[#111315] dark:text-white">Рабочий каталог</h2>
            <Link href="/admin/products" className="text-sm font-black text-[#65707b] transition hover:text-[#111315] dark:text-[#ffd600] dark:hover:text-white">
              Открыть все
            </Link>
          </div>
          <div className="grid gap-3">
            {products.slice(0, 6).map((product) => (
              <Link key={product.slug} href={`/admin/products/${product.slug}`} className="soft-panel grid gap-4 rounded-2xl p-4 transition hover:border-[#ffd600]/45 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                <span>
                  <span className="block font-black text-[#111315] dark:text-white">{product.name}</span>
                  <span className="mt-1 block text-xs text-[#656b72] dark:text-slate-300">/{product.slug}</span>
                </span>
                <span className={`w-fit rounded-full px-3 py-1 text-xs font-black ${product.isPublished === false ? "bg-red-500/10 text-red-500 dark:text-red-200" : "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300"}`}>
                  {product.isPublished === false ? "Скрыт" : "Опубликован"}
                </span>
                <span className="text-sm font-black text-[#111315] dark:text-white">{product.price} ₽</span>
              </Link>
            ))}
          </div>
        </div>

        <aside className="surface-card rounded-[2rem] p-6">
          <h2 className="text-2xl font-black text-[#111315] dark:text-white">Требует внимания</h2>
          <div className="mt-5 grid gap-3">
            {attentionItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-white/45 p-4 dark:bg-white/5">
                  <span className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-[#65707b] dark:text-[#ffd600]" />
                    <span className="text-sm font-bold text-[#111315] dark:text-white">{item.label}</span>
                  </span>
                  <span className="text-lg font-black text-[#111315] dark:text-white">{item.value}</span>
                </div>
              )
            })}
          </div>
        </aside>
      </section>

      <section className="mt-6 surface-card rounded-[2rem] p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-black text-[#65707b] dark:text-[#ffd600]">
              <Palette className="h-4 w-4" />
              Внешний фон
            </div>
            <h2 className="text-2xl font-black text-[#111315] dark:text-white">Фон сайта</h2>
            <p className="cart-muted mt-2 max-w-2xl text-sm leading-6">
              Основной режим - автоматический: фон подстраивается под светлую или темную тему системы.
            </p>
          </div>
          <span className="w-fit rounded-full bg-slate-200 px-3 py-1 text-xs font-black text-[#111315] dark:bg-white/10 dark:text-white">
            {BACKGROUND_OPTIONS.find((item) => item.value === settings.backgroundMode)?.label ?? "Авто"}
          </span>
        </div>

        <form action={saveSiteBackgroundAction} className="grid gap-3 md:grid-cols-4">
          {BACKGROUND_OPTIONS.map((option) => (
            <label key={option.value} className={`cursor-pointer rounded-2xl border p-4 transition ${settings.backgroundMode === option.value ? "border-[#ffd600] bg-[#ffd600]/16" : "border-border bg-white/45 hover:border-[#ffd600]/45 dark:bg-white/5"}`}>
              <input type="radio" name="backgroundMode" value={option.value} defaultChecked={settings.backgroundMode === option.value} className="sr-only" />
              <span className="block text-sm font-black text-[#111315] dark:text-white">{option.label}</span>
              <span className="mt-2 block text-xs leading-5 text-[#656b72] dark:text-slate-300">{option.description}</span>
            </label>
          ))}
          <button type="submit" className="brand-button inline-flex items-center justify-center rounded-full px-6 py-4 text-sm font-black md:col-span-4 md:w-fit">
            Сохранить фон
          </button>
        </form>
      </section>
    </AdminShell>
  )
}
