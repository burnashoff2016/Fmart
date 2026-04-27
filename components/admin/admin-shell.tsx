import Link from "next/link"
import { LayoutDashboard, LogOut, Package, Store } from "lucide-react"
import { logoutAction } from "@/app/admin/actions"

const ADMIN_LINKS = [
  { href: "/admin", label: "Обзор", icon: LayoutDashboard },
  { href: "/admin/products", label: "Товары", icon: Package },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 lg:flex-row lg:gap-6">
        <aside className="cart-shell h-fit rounded-[2rem] p-4 lg:sticky lg:top-6 lg:w-72">
          <Link href="/" className="mb-6 flex items-center gap-3 rounded-2xl bg-[#ffd600] px-4 py-4 text-[#111315]">
            <Store className="h-6 w-6" />
            <span>
              <span className="block text-xs font-black uppercase tracking-[0.16em]">FMART</span>
              <span className="block text-lg font-black leading-none">Admin</span>
            </span>
          </Link>

          <nav className="space-y-2">
            {ADMIN_LINKS.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href} className="cart-panel flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition hover:border-[#ffd600]/45 hover:bg-[var(--cart-panel-strong)]">
                  <Icon className="h-5 w-5 text-[#ffd600]" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <form action={logoutAction} className="mt-6">
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-black text-red-200 transition hover:bg-red-500/16">
              <LogOut className="h-4 w-4" />
              Выйти
            </button>
          </form>
        </aside>

        <main className="mt-6 flex-1 lg:mt-0">
          {children}
        </main>
      </div>
    </div>
  )
}
