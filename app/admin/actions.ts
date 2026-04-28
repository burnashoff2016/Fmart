"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { promises as fs } from "node:fs"
import path from "node:path"
import { randomUUID } from "node:crypto"
import { clearAdminSession, createAdminSession, getAdminPassword, isAdminAuthenticated } from "@/lib/admin-auth"
import { deleteProduct, setProductPublished, slugifyProduct, upsertProduct } from "@/lib/product-store"
import type { Product } from "@/lib/products"

function parseBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true"
}

function parseLines(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseSpecs(value: FormDataEntryValue | null) {
  return parseLines(value).map((line) => {
    const [label, ...rest] = line.split(":")
    return {
      label: label?.trim() || "Характеристика",
      value: rest.join(":").trim() || "Не указано",
    }
  })
}

function parseHighlights(value: FormDataEntryValue | null) {
  return parseLines(value).map((line) => {
    const [valuePart, labelPart] = line.split("|")
    return {
      value: valuePart?.trim() || "—",
      label: labelPart?.trim() || "Показатель",
    }
  })
}

async function resolveProductImage(formData: FormData) {
  const imageFile = formData.get("imageFile")
  const currentImage = String(formData.get("image") ?? "").trim()

  if (!(imageFile instanceof File) || imageFile.size === 0) {
    return currentImage || "/placeholder.jpg"
  }

  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml"])
  if (!allowedTypes.has(imageFile.type)) {
    return currentImage || "/placeholder.jpg"
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads")
  await fs.mkdir(uploadsDir, { recursive: true })

  const extension = path.extname(imageFile.name) || ".jpg"
  const fileName = `${randomUUID()}${extension.toLowerCase()}`
  const target = path.join(uploadsDir, fileName)
  const buffer = Buffer.from(await imageFile.arrayBuffer())

  await fs.writeFile(target, buffer)
  return `/uploads/${fileName}`
}

async function productFromForm(formData: FormData): Promise<Product> {
  const name = String(formData.get("name") ?? "").trim()
  const slug = String(formData.get("slug") ?? "").trim() || slugifyProduct(name)
  const image = await resolveProductImage(formData)

  return {
    slug,
    name,
    shortName: String(formData.get("shortName") ?? "").trim() || name,
    tagline: String(formData.get("tagline") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    fullDescription: String(formData.get("fullDescription") ?? "").trim(),
    price: String(formData.get("price") ?? "").trim(),
    oldPrice: String(formData.get("oldPrice") ?? "").trim() || undefined,
    isNew: parseBoolean(formData.get("isNew")),
    isAvailable: parseBoolean(formData.get("isAvailable")),
    isPublished: parseBoolean(formData.get("isPublished")),
    sortOrder: Number(formData.get("sortOrder") || 999),
    tag: String(formData.get("tag") ?? "").trim() || undefined,
    sku: String(formData.get("sku") ?? "").trim() || undefined,
    sourceNote: String(formData.get("sourceNote") ?? "").trim() || undefined,
    image,
    gallery: parseLines(formData.get("gallery")),
    seoTitle: String(formData.get("seoTitle") ?? "").trim() || undefined,
    seoDescription: String(formData.get("seoDescription") ?? "").trim() || undefined,
    features: parseLines(formData.get("features")),
    specs: parseSpecs(formData.get("specs")),
    highlights: parseHighlights(formData.get("highlights")),
  }
}

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login")
  }
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "")
  const adminPassword = getAdminPassword()

  if (!adminPassword || password !== adminPassword) {
    redirect("/admin/login?error=1")
  }

  await createAdminSession()
  redirect("/admin")
}

export async function logoutAction() {
  await clearAdminSession()
  redirect("/admin/login")
}

export async function saveProductAction(formData: FormData) {
  await requireAdmin()
  const product = await productFromForm(formData)
  const originalSlug = String(formData.get("originalSlug") ?? "").trim()

  if (!product.name || !product.slug || !product.price) {
    redirect("/admin/products/new?error=required")
  }

  if (originalSlug && originalSlug !== product.slug) {
    await deleteProduct(originalSlug)
  }

  await upsertProduct(product)
  revalidatePath("/")
  revalidatePath("/products")
  revalidatePath(`/products/${product.slug}`)
  revalidatePath("/product-category/roboty-mojshhiki")
  redirect("/admin/products")
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin()
  const slug = String(formData.get("slug") ?? "")
  if (slug) {
    await deleteProduct(slug)
    revalidatePath("/")
    revalidatePath("/products")
    revalidatePath("/product-category/roboty-mojshhiki")
  }
  redirect("/admin/products")
}

export async function toggleProductPublishedAction(formData: FormData) {
  await requireAdmin()
  const slug = String(formData.get("slug") ?? "")
  const isPublished = parseBoolean(formData.get("isPublished"))
  if (slug) {
    await setProductPublished(slug, isPublished)
    revalidatePath("/")
    revalidatePath("/products")
    revalidatePath(`/products/${slug}`)
    revalidatePath("/product-category/roboty-mojshhiki")
  }
  redirect("/admin/products")
}
