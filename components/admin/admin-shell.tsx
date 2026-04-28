import Link from "next/link"
import { ExternalLink, LayoutDashboard, LogOut, Package, Store } from "lucide-react"
import { logoutAction } from "@/app/admin/actions"

const ADMIN_LINKS = [
  { href: "/admin", label: "Обзор", icon: LayoutDashboard },
  { href: "/admin/products", label: "Товары", icon: Package },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-4 py-4 sm:px-6 sm:py-6 lg:flex-row lg:gap-6">
        <aside className="cart-shell h-fit overflow-hidden rounded-[2rem] p-4 lg:sticky lg:top-6 lg:w-[19rem]">
          <div className="rounded-[1.5rem] bg-[#111315] p-4 text-white shadow-soft dark:bg-white/8">
            <Link href="/admin" className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffd600] text-[#111315]">
                <Store className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-xs font-black uppercase tracking-[0.16em] text-white/58">FMART</span>
                <span className="block text-xl font-black leading-none">Admin</span>
              </span>
            </Link>
            <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-bold text-white/64">
              <Link href="/" className="inline-flex items-center justify-center gap-1 rounded-full border border-white/10 bg-white/8 px-3 py-2 transition hover:bg-white/12">
                Сайт <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <Link href="/products" className="inline-flex items-center justify-center gap-1 rounded-full border border-white/10 bg-white/8 px-3 py-2 transition hover:bg-white/12">
                Каталог <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <nav className="mt-4 space-y-2">
            {ADMIN_LINKS.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href} className="cart-panel flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition hover:border-[#ffd600]/45 hover:bg-[var(--cart-panel-strong)]">
                  <Icon className="h-5 w-5 text-[#65707b] dark:text-[#ffd600]" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="mt-4 rounded-2xl border border-border bg-white/45 p-4 text-sm dark:bg-white/5">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#65707b] dark:text-slate-400">Рабочий режим</p>
            <p className="mt-2 text-sm font-bold leading-5 text-[#111315] dark:text-white">Изменения сохраняются в локальном каталоге товаров.</p>
          </div>

          <form action={logoutAction} className="mt-4">
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-black text-red-500 transition hover:bg-red-500/16 dark:text-red-200">
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
