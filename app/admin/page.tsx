import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowRight, Boxes, EyeOff, PackageCheck, Sparkles } from "lucide-react"
import { AdminShell } from "@/components/admin/admin-shell"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getProducts } from "@/lib/product-store"

export default async function AdminDashboardPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login")
  }

  const products = await getProducts({ includeDrafts: true })
  const published = products.filter((product) => product.isPublished !== false)
  const available = products.filter((product) => product.isAvailable)
  const hidden = products.filter((product) => product.isPublished === false)
  const featured = products.filter((product) => product.isNew || product.tag)

  const stats = [
    { label: "Всего товаров", value: products.length, icon: Boxes },
    { label: "Опубликовано", value: published.length, icon: PackageCheck },
    { label: "Скрыто", value: hidden.length, icon: EyeOff },
    { label: "С метками", value: featured.length, icon: Sparkles },
  ]

  return (
    <AdminShell>
      <section className="cart-shell relative overflow-hidden rounded-[2rem] p-8 md:p-10">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#ffd600]/16 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-eyebrow mb-4">Панель управления</p>
            <h1 className="text-5xl font-black leading-none md:text-6xl">FMART Admin</h1>
            <p className="cart-muted mt-5 max-w-2xl text-base leading-7">
              Управляйте товарами, публикацией и порядком моделей в каталоге, не меняя код публичного сайта.
            </p>
          </div>
          <Link href="/admin/products/new" className="brand-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-black">
            Добавить товар <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="surface-card rounded-3xl p-5">
              <Icon className="mb-5 h-7 w-7 text-[#ffd600]" />
              <div className="text-4xl font-black text-[#111315] dark:text-white">{item.value}</div>
              <div className="mt-2 text-sm font-semibold text-[#656b72] dark:text-slate-300">{item.label}</div>
            </div>
          )
        })}
      </section>

      <section className="mt-6 surface-card rounded-[2rem] p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-[#111315] dark:text-white">Последние товары</h2>
          <Link href="/admin/products" className="text-sm font-black text-[#8a6f00] transition hover:text-[#111315] dark:text-[#ffd600] dark:hover:text-white">
            Открыть все
          </Link>
        </div>
        <div className="grid gap-3">
          {products.slice(0, 5).map((product) => (
            <Link key={product.slug} href={`/admin/products/${product.slug}`} className="soft-panel flex items-center justify-between gap-4 rounded-2xl p-4 transition hover:border-[#ffd600]/45">
              <span>
                <span className="block font-black text-[#111315] dark:text-white">{product.name}</span>
                <span className="mt-1 block text-xs text-[#656b72] dark:text-slate-300">/{product.slug}</span>
              </span>
              <span className="text-sm font-black text-[#111315] dark:text-white">{product.price} ₽</span>
            </Link>
          ))}
        </div>
      </section>
    </AdminShell>
  )
}
