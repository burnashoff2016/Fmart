import "server-only"

import { promises as fs } from "node:fs"
import path from "node:path"
import { PRODUCTS, type Product } from "@/lib/products"

const DATA_DIR = path.join(process.cwd(), "data")
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json")

export type ProductInput = Omit<Product, "slug"> & {
  slug?: string
}

type ProductFilters = {
  includeDrafts?: boolean
}

function normalizeProduct(product: Product, index = 0): Product {
  return {
    ...product,
    slug: product.slug.trim(),
    image: product.image || "/placeholder.jpg",
    isPublished: product.isPublished ?? true,
    sortOrder: product.sortOrder ?? index + 1,
    features: product.features ?? [],
    specs: product.specs ?? [],
    highlights: product.highlights ?? [],
  }
}

function sortProducts(products: Product[]) {
  return [...products].sort((a, b) => {
    const order = (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999)
    if (order !== 0) return order
    return a.name.localeCompare(b.name, "ru")
  })
}

async function ensureProductsFile() {
  await fs.mkdir(DATA_DIR, { recursive: true })

  try {
    await fs.access(PRODUCTS_FILE)
  } catch {
    const seeded = PRODUCTS.map((product, index) => normalizeProduct(product, index))
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(seeded, null, 2), "utf8")
  }
}

async function readAllProducts() {
  await ensureProductsFile()
  const raw = await fs.readFile(PRODUCTS_FILE, "utf8")
  const parsed = JSON.parse(raw) as Product[]
  return sortProducts(parsed.map((product, index) => normalizeProduct(product, index)))
}

async function writeAllProducts(products: Product[]) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(sortProducts(products), null, 2), "utf8")
}

export function slugifyProduct(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/ё/g, "e")
    .replace(/й/g, "i")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9а-я]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function getProducts(filters: ProductFilters = {}) {
  const products = await readAllProducts()
  if (filters.includeDrafts) return products
  return products.filter((product) => product.isPublished !== false)
}

export async function getProductBySlugFromStore(slug: string, filters: ProductFilters = {}) {
  const products = await getProducts(filters)
  return products.find((product) => product.slug === slug)
}

export async function getFeaturedProductFromStore() {
  const products = await getProducts()
  return products.find((product) => product.isNew) ?? products[0]
}

export async function upsertProduct(product: Product) {
  const products = await readAllProducts()
  const nextProduct = normalizeProduct(product, products.length)
  const existingIndex = products.findIndex((item) => item.slug === nextProduct.slug)

  if (existingIndex >= 0) {
    products[existingIndex] = nextProduct
  } else {
    products.push(nextProduct)
  }

  await writeAllProducts(products)
  return nextProduct
}

export async function deleteProduct(slug: string) {
  const products = await readAllProducts()
  await writeAllProducts(products.filter((product) => product.slug !== slug))
}

export async function setProductPublished(slug: string, isPublished: boolean) {
  const products = await readAllProducts()
  await writeAllProducts(products.map((product) => (product.slug === slug ? { ...product, isPublished } : product)))
}
