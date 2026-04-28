import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Edit3, Eye, EyeOff, PackageCheck, Plus, Search, SlidersHorizontal, Trash2 } from "lucide-react"
import { deleteProductAction, toggleProductPublishedAction } from "@/app/admin/actions"
import { AdminShell } from "@/components/admin/admin-shell"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getProducts } from "@/lib/product-store"

type AdminProductsPageProps = {
  searchParams: Promise<{ q?: string; status?: string }>
}

const FILTERS = [
  { label: "Все", value: "all" },
  { label: "Опубликованные", value: "published" },
  { label: "Скрытые", value: "hidden" },
  { label: "Нет в наличии", value: "unavailable" },
]

export default async function AdminProductsPage({ searchParams }: AdminProductsPageProps) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login")
  }

  const params = await searchParams
  const query = String(params.q ?? "").trim().toLowerCase()
  const status = String(params.status ?? "all")
  const products = await getProducts({ includeDrafts: true })
  const published = products.filter((product) => product.isPublished !== false).length
  const available = products.filter((product) => product.isAvailable).length
  const hidden = products.filter((product) => product.isPublished === false).length
  const filteredProducts = products.filter((product) => {
    const matchesQuery = !query || [product.name, product.slug, product.sku, product.price].filter(Boolean).some((value) => String(value).toLowerCase().includes(query))
    const matchesStatus =
      status === "published"
        ? product.isPublished !== false
        : status === "hidden"
          ? product.isPublished === false
          : status === "unavailable"
            ? !product.isAvailable
            : true

    return matchesQuery && matchesStatus
  })

  return (
    <AdminShell>
      <section className="mb-6 rounded-[2rem] bg-[#111315] p-6 text-white shadow-soft md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-white/48">Каталог</p>
            <h1 className="mt-4 text-4xl font-black leading-none md:text-5xl">Товары</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60">
              Рабочий список моделей: цены, наличие, публикация и порядок отображения на публичном сайте.
            </p>
          </div>
          <Link href="/admin/products/new" className="brand-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-black">
            <Plus className="h-4 w-4" />
            Новый товар
          </Link>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
            <div className="text-3xl font-black">{published}</div>
            <div className="mt-1 text-xs font-bold text-white/56">опубликовано</div>
          </div>
          <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
            <div className="text-3xl font-black">{available}</div>
            <div className="mt-1 text-xs font-bold text-white/56">в наличии</div>
          </div>
          <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
            <div className="text-3xl font-black">{hidden}</div>
            <div className="mt-1 text-xs font-bold text-white/56">скрыто</div>
          </div>
        </div>
      </section>

      <section className="mb-4 flex flex-col gap-3 rounded-[2rem] border border-border bg-white/55 p-3 dark:bg-white/5 md:flex-row md:items-center md:justify-between">
        <form action="/admin/products" className="flex min-h-12 flex-1 items-center gap-3 rounded-full border border-border bg-white/70 px-4 dark:bg-white/5">
          <Search className="h-4 w-4 text-[#65707b] dark:text-slate-300" />
          <input name="q" defaultValue={params.q ?? ""} placeholder="Найти товар" className="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#111315] outline-none placeholder:text-[#656b72] dark:text-white dark:placeholder:text-slate-300" />
          <input type="hidden" name="status" value={status} />
        </form>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <Link
              key={filter.value}
              href={{ pathname: "/admin/products", query: { ...(params.q ? { q: params.q } : {}), status: filter.value } }}
              className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-black transition ${
                status === filter.value
                  ? "border-[#ffd600] bg-[#ffd600] text-[#111315]"
                  : "border-border bg-white/70 text-[#65707b] hover:border-[#ffd600]/45 dark:bg-white/5 dark:text-slate-300"
              }`}
            >
              {filter.label}
            </Link>
          ))}
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white/70 dark:bg-white/5">
            <SlidersHorizontal className="h-4 w-4 text-[#65707b] dark:text-slate-300" />
          </span>
        </div>
      </section>

      <section className="grid gap-3">
        {filteredProducts.map((product) => (
          <article key={product.slug} className="surface-card overflow-hidden rounded-[1.75rem] transition hover:-translate-y-0.5">
            <div className="grid gap-0 xl:grid-cols-[160px_1fr_190px_230px]">
              <div className="relative min-h-40 bg-[linear-gradient(135deg,#eef1f4,#dfe4ea)] dark:bg-white/5">
                <Image src={product.image} alt={product.name} fill className="object-contain p-6" />
              </div>

              <div className="p-5">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-black text-[#111315] dark:bg-white/10 dark:text-white">#{product.sortOrder ?? 999}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${product.isPublished === false ? "bg-red-500/12 text-red-500 dark:text-red-200" : "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300"}`}>
                    {product.isPublished === false ? "Скрыт" : "Опубликован"}
                  </span>
                  <span className="rounded-full bg-black/6 px-3 py-1 text-xs font-bold text-[#656b72] dark:bg-white/8 dark:text-slate-300">
                    {product.isAvailable ? "В наличии" : "Нет в наличии"}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-[#111315] dark:text-white">{product.name}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#656b72] dark:text-slate-300">{product.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-[#656b72] dark:text-slate-300">
                  <span>/{product.slug}</span>
                  {product.sku && <span>Артикул {product.sku}</span>}
                  <span>{product.gallery?.length ?? 0} фото</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-border p-5 xl:block xl:border-l xl:border-t-0">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.14em] text-[#65707b] dark:text-slate-400">Цена</div>
                  <div className="mt-2 text-2xl font-black text-[#111315] dark:text-white">{product.price} ₽</div>
                </div>
                <div className="xl:mt-5">
                  <div className="text-xs font-black uppercase tracking-[0.14em] text-[#65707b] dark:text-slate-400">Витрина</div>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-black/6 px-3 py-1.5 text-xs font-black text-[#111315] dark:bg-white/8 dark:text-white">
                    <PackageCheck className="h-3.5 w-3.5" />
                    {product.isAvailable ? "Можно продавать" : "Нет наличия"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-border p-5 xl:border-l xl:border-t-0">
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
        {filteredProducts.length === 0 && (
          <div className="surface-card rounded-[2rem] p-8 text-center">
            <Search className="mx-auto h-8 w-8 text-[#65707b] dark:text-[#ffd600]" />
            <h2 className="mt-4 text-2xl font-black text-[#111315] dark:text-white">Ничего не найдено</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#656b72] dark:text-slate-300">
              Попробуйте изменить запрос или переключить фильтр статуса.
            </p>
          </div>
        )}
      </section>
    </AdminShell>
  )
}
