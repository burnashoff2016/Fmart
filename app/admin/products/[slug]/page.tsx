import { notFound, redirect } from "next/navigation"
import { AdminShell } from "@/components/admin/admin-shell"
import { ProductForm } from "@/components/admin/product-form"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getProductBySlugFromStore } from "@/lib/product-store"

type ProductAdminPageProps = {
  params: Promise<{ slug: string }>
}

export default async function EditProductPage({ params }: ProductAdminPageProps) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login")
  }

  const { slug } = await params
  const product = await getProductBySlugFromStore(slug, { includeDrafts: true })

  if (!product) {
    notFound()
  }

  return (
    <AdminShell>
      <ProductForm product={product} />
    </AdminShell>
  )
}
