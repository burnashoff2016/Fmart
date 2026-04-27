import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Edit3, Eye, EyeOff, Plus, Trash2 } from "lucide-react"
import { deleteProductAction, toggleProductPublishedAction } from "@/app/admin/actions"
import { AdminShell } from "@/components/admin/admin-shell"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getProducts } from "@/lib/product-store"

export default async function AdminProductsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login")
  }

  const products = await getProducts({ includeDrafts: true })

  return (
    <AdminShell>
      <section className="mb-6 flex flex-col gap-5 rounded-[2rem] bg-[#111315] p-8 text-white shadow-soft md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-eyebrow mb-4">Каталог</p>
          <h1 className="text-5xl font-black leading-none">Товары</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60">
            Добавляйте модели, меняйте цены, наличие, SEO и порядок отображения на публичном сайте.
          </p>
        </div>
        <Link href="/admin/products/new" className="brand-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-black">
          <Plus className="h-4 w-4" />
          Новый товар
        </Link>
      </section>

      <section className="grid gap-4">
        {products.map((product) => (
          <article key={product.slug} className="surface-card overflow-hidden rounded-3xl">
            <div className="grid gap-0 lg:grid-cols-[180px_1fr_auto]">
              <div className="relative min-h-44 bg-[#f0f1eb] dark:bg-white/5">
                <Image src={product.image} alt={product.name} fill className="object-contain p-6" />
              </div>

              <div className="p-5">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#ffd600] px-3 py-1 text-xs font-black text-[#111315]">#{product.sortOrder ?? 999}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${product.isPublished === false ? "bg-red-500/12 text-red-300" : "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300"}`}>
                    {product.isPublished === false ? "Скрыт" : "Опубликован"}
                  </span>
                  <span className="rounded-full bg-black/6 px-3 py-1 text-xs font-bold text-[#656b72] dark:bg-white/8 dark:text-slate-300">
                    {product.isAvailable ? "В наличии" : "Нет в наличии"}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-[#111315] dark:text-white">{product.name}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#656b72] dark:text-slate-300">{product.description}</p>
                <div className="mt-4 text-xl font-black text-[#111315] dark:text-white">{product.price} ₽</div>
              </div>

              <div className="flex flex-col gap-3 border-t border-border p-5 lg:min-w-56 lg:border-l lg:border-t-0">
                <Link href={`/admin/products/${product.slug}`} className="ink-button inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black">
                  <Edit3 className="h-4 w-4" />
                  Редактировать
                </Link>
                <form action={toggleProductPublishedAction}>
                  <input type="hidden" name="slug" value={product.slug} />
                  <input type="hidden" name="isPublished" value={product.isPublished === false ? "true" : "false"} />
                  <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-black transition hover:bg-black/5 dark:hover:bg-white/10">
                    {product.isPublished === false ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    {product.isPublished === false ? "Показать" : "Скрыть"}
                  </button>
                </form>
                <form action={deleteProductAction}>
                  <input type="hidden" name="slug" value={product.slug} />
                  <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-black text-red-200 transition hover:bg-red-500/16">
                    <Trash2 className="h-4 w-4" />
                    Удалить
                  </button>
                </form>
              </div>
            </div>
          </article>
        ))}
      </section>
    </AdminShell>
  )
}
