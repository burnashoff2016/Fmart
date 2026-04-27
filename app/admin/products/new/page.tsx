import { redirect } from "next/navigation"
import { AdminShell } from "@/components/admin/admin-shell"
import { ProductForm } from "@/components/admin/product-form"
import { isAdminAuthenticated } from "@/lib/admin-auth"

export default async function NewProductPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login")
  }

  return (
    <AdminShell>
      <ProductForm />
    </AdminShell>
  )
}
