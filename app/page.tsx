import { HomePage } from "@/components/home-page"
import { getFeaturedProductFromStore, getProducts } from "@/lib/product-store"

export const dynamic = "force-dynamic"

export default async function Page() {
  const products = await getProducts()
  const featured = await getFeaturedProductFromStore()

  return <HomePage products={products} featured={featured} />
}
