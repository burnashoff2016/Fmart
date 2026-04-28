import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Eye, FileText, Image as ImageIcon, Link2, ListChecks, Save, Settings2 } from "lucide-react"
import { saveProductAction } from "@/app/admin/actions"
import type { Product } from "@/lib/products"

const emptyProduct: Product = {
  slug: "",
  name: "",
  shortName: "",
  tagline: "",
  description: "",
  fullDescription: "",
  price: "",
  isNew: false,
  isAvailable: true,
  isPublished: true,
  sortOrder: 999,
  sku: "",
  sourceNote: "",
  image: "/placeholder.jpg",
  gallery: [],
  features: [],
  specs: [],
  highlights: [],
}

function specsToText(product: Product) {
  return product.specs.map((spec) => `${spec.label}: ${spec.value}`).join("\n")
}

function highlightsToText(product: Product) {
  return product.highlights.map((item) => `${item.value} | ${item.label}`).join("\n")
}

function galleryToText(product: Product) {
  return (product.gallery ?? []).join("\n")
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#65707b] dark:text-[#ffd600]">{label}</span>
      {children}
      {hint && <span className="mt-2 block text-xs leading-5 text-[#656b72] dark:text-slate-400">{hint}</span>}
    </label>
  )
}

const inputClass = "w-full rounded-2xl border border-border bg-[#f5f6f2] px-4 py-3 text-[#111315] outline-none transition focus:border-[#ffd600] dark:bg-white/5 dark:text-white"
const textareaClass = `${inputClass} min-h-32 resize-y`

export function ProductForm({ product }: { product?: Product }) {
  const value = product ?? emptyProduct
  const isEditing = Boolean(product)
  const galleryCount = value.gallery?.length ?? 0
  const completionItems = [
    { label: "Название", done: Boolean(value.name) },
    { label: "Цена", done: Boolean(value.price) },
    { label: "Главное фото", done: Boolean(value.image && value.image !== "/placeholder.jpg") },
    { label: "Галерея", done: galleryCount > 0 },
    { label: "SEO", done: Boolean(value.seoTitle && value.seoDescription) },
  ]
  const completedCount = completionItems.filter((item) => item.done).length

  return (
    <form action={saveProductAction} className="grid gap-6 xl:grid-cols-[1fr_380px]">
      <input type="hidden" name="originalSlug" value={value.slug} />
      <section className="grid gap-5">
        <div className="cart-shell relative overflow-hidden rounded-[2rem] p-6 md:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-300 via-white to-slate-400/70 dark:from-white/10 dark:via-white/30 dark:to-white/10" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link href="/admin/products" className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-[#656b72] transition hover:text-[#111315] dark:text-slate-300 dark:hover:text-white">
                <ArrowLeft className="h-4 w-4" />
                К товарам
              </Link>
              <p className="section-eyebrow mb-3">{isEditing ? "Редактирование" : "Новый товар"}</p>
              <h1 className="text-4xl font-black leading-none text-[#111315] dark:text-white md:text-5xl">
                {isEditing ? value.name : "Карточка товара"}
              </h1>
            </div>
            <button type="submit" className="brand-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-black">
              <Save className="h-4 w-4" />
              Сохранить
            </button>
          </div>
        </div>

        <div className="surface-card rounded-[2rem] p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <Settings2 className="h-5 w-5 text-[#65707b] dark:text-[#ffd600]" />
            <h2 className="text-2xl font-black text-[#111315] dark:text-white">Основное</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Название">
              <input name="name" defaultValue={value.name} required className={inputClass} placeholder="FMart T11" />
            </Field>
            <Field label="Короткое название">
              <input name="shortName" defaultValue={value.shortName} className={inputClass} placeholder="T11" />
            </Field>
            <Field label="Slug / URL" hint="Если оставить пустым у нового товара, slug создастся из названия.">
              <input name="slug" defaultValue={value.slug} className={inputClass} placeholder="fmart-t11" />
            </Field>
            <Field label="Порядок">
              <input name="sortOrder" type="number" defaultValue={value.sortOrder ?? 999} className={inputClass} />
            </Field>
            <Field label="Подзаголовок">
              <input name="tagline" defaultValue={value.tagline} className={inputClass} placeholder="Новинка!" />
            </Field>
            <Field label="Метка">
              <input name="tag" defaultValue={value.tag ?? ""} className={inputClass} placeholder="ХИТ ПРОДАЖ" />
            </Field>
            <Field label="Артикул">
              <input name="sku" defaultValue={value.sku ?? ""} className={inputClass} placeholder="100011" />
            </Field>
            <Field label="Промо-заголовок">
              <input name="sourceNote" defaultValue={value.sourceNote ?? ""} className={inputClass} placeholder="Стойкие пятна? Не проблема!" />
            </Field>
          </div>
        </div>

        <div className="surface-card rounded-[2rem] p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <ListChecks className="h-5 w-5 text-[#65707b] dark:text-[#ffd600]" />
            <h2 className="text-2xl font-black text-[#111315] dark:text-white">Цена и статус</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Цена">
              <input name="price" defaultValue={value.price} required className={inputClass} placeholder="24 990" />
            </Field>
            <Field label="Старая цена">
              <input name="oldPrice" defaultValue={value.oldPrice ?? ""} className={inputClass} placeholder="29 990" />
            </Field>
            <div className="grid gap-3 md:col-span-2 md:grid-cols-3">
              <label className="soft-panel flex items-center gap-2 rounded-2xl p-4 text-sm font-bold">
                <input name="isAvailable" type="checkbox" defaultChecked={value.isAvailable} className="h-4 w-4 accent-[#ffd600]" />
                В наличии
              </label>
              <label className="soft-panel flex items-center gap-2 rounded-2xl p-4 text-sm font-bold">
                <input name="isNew" type="checkbox" defaultChecked={value.isNew} className="h-4 w-4 accent-[#ffd600]" />
                Новинка
              </label>
              <label className="soft-panel flex items-center gap-2 rounded-2xl p-4 text-sm font-bold">
                <input name="isPublished" type="checkbox" defaultChecked={value.isPublished !== false} className="h-4 w-4 accent-[#ffd600]" />
                Опубликован
              </label>
            </div>
          </div>
        </div>

        <div className="surface-card rounded-[2rem] p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <ImageIcon className="h-5 w-5 text-[#65707b] dark:text-[#ffd600]" />
            <h2 className="text-2xl font-black text-[#111315] dark:text-white">Фото и галерея</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Изображение" hint="Можно оставить текущий путь или загрузить новый файл ниже.">
              <input name="image" defaultValue={value.image} className={inputClass} placeholder="/images/product-t11.jpg" />
            </Field>
            <Field label="Загрузить файл" hint="Поддерживаются JPG, PNG, WebP и SVG. Файл сохранится в public/uploads.">
              <input name="imageFile" type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" className={inputClass} />
            </Field>
          </div>
          <div className="mt-5">
            <Field label="Галерея" hint="Один путь к фото с новой строки. Первое фото используется как основное.">
              <textarea name="gallery" defaultValue={galleryToText(value)} className={`${textareaClass} min-h-44`} />
            </Field>
          </div>
        </div>

        <div className="surface-card rounded-[2rem] p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <FileText className="h-5 w-5 text-[#65707b] dark:text-[#ffd600]" />
            <h2 className="text-2xl font-black text-[#111315] dark:text-white">Описание</h2>
          </div>
          <div className="grid gap-5">
            <Field label="Краткое описание">
              <textarea name="description" defaultValue={value.description} required className={textareaClass} />
            </Field>
            <Field label="Полное описание">
              <textarea name="fullDescription" defaultValue={value.fullDescription} required className={`${textareaClass} min-h-40`} />
            </Field>
            <Field label="Преимущества" hint="Каждое преимущество с новой строки.">
              <textarea name="features" defaultValue={value.features.join("\n")} className={textareaClass} />
            </Field>
          </div>
        </div>

        <div className="surface-card rounded-[2rem] p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <ListChecks className="h-5 w-5 text-[#65707b] dark:text-[#ffd600]" />
            <h2 className="text-2xl font-black text-[#111315] dark:text-white">Характеристики</h2>
          </div>
          <div className="grid gap-5">
            <Field label="Характеристики" hint="Формат: Вес: 1.1 кг">
              <textarea name="specs" defaultValue={specsToText(value)} className={textareaClass} />
            </Field>
            <Field label="Highlights" hint="Формат: 5300 Па | Мощность">
              <textarea name="highlights" defaultValue={highlightsToText(value)} className={textareaClass} />
            </Field>
          </div>
        </div>

        <div className="surface-card rounded-[2rem] p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <Link2 className="h-5 w-5 text-[#65707b] dark:text-[#ffd600]" />
            <h2 className="text-2xl font-black text-[#111315] dark:text-white">SEO</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="SEO title">
              <input name="seoTitle" defaultValue={value.seoTitle ?? ""} className={inputClass} />
            </Field>
            <Field label="SEO description">
              <input name="seoDescription" defaultValue={value.seoDescription ?? ""} className={inputClass} />
            </Field>
          </div>
        </div>
      </section>

      <aside className="grid h-fit gap-5 xl:sticky xl:top-6">
        <div className="cart-shell rounded-[2rem] p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-black text-[#65707b] dark:text-[#ffd600]">
              <Eye className="h-4 w-4" />
              Предпросмотр
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-black ${value.isPublished === false ? "bg-red-500/10 text-red-500 dark:text-red-200" : "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300"}`}>
              {value.isPublished === false ? "Скрыт" : "Опубликован"}
            </span>
          </div>
          <div className="surface-card overflow-hidden rounded-3xl">
            <div className="relative aspect-square bg-[#f0f1eb] dark:bg-white/5">
              {value.tag && <span className="absolute left-4 top-4 z-10 rounded-full bg-[#ffd600] px-3 py-1.5 text-xs font-black text-[#111315]">{value.tag}</span>}
              <Image src={value.image || "/placeholder.jpg"} alt={value.name || "FMART"} fill className="object-contain p-8" />
            </div>
            <div className="p-5">
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#65707b] dark:text-[#ffd600]">{value.tagline || "FMART"}</div>
              <h2 className="text-2xl font-black">{value.name || "Новый товар"}</h2>
              <p className="cart-muted mt-3 text-sm leading-6">{value.description || "Описание появится здесь после заполнения формы."}</p>
              <div className="mt-5 text-2xl font-black">{value.price || "0"} ₽</div>
            </div>
          </div>
          {isEditing && (
            <Link href={`/products/${value.slug}`} className="ink-button mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black">
              Открыть на сайте <Link2 className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="surface-card rounded-[2rem] p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black text-[#111315] dark:text-white">Готовность</h2>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-black text-[#111315] dark:bg-white/10 dark:text-white">{completedCount}/{completionItems.length}</span>
          </div>
          <div className="mt-4 grid gap-2">
            {completionItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-white/45 px-4 py-3 dark:bg-white/5">
                <span className="text-sm font-bold text-[#111315] dark:text-white">{item.label}</span>
                <CheckCircle2 className={`h-5 w-5 ${item.done ? "text-emerald-500" : "text-[#8b929a]"}`} />
              </div>
            ))}
          </div>
        </div>
      </aside>
    </form>
  )
}
