import { redirect } from "next/navigation"
import { LockKeyhole, ShieldCheck } from "lucide-react"
import { loginAction } from "@/app/admin/actions"
import { getAdminPassword, isAdminAuthenticated } from "@/lib/admin-auth"

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  if (await isAdminAuthenticated()) {
    redirect("/admin")
  }

  const params = await searchParams
  const hasPassword = Boolean(getAdminPassword())
  const showDevHint = !process.env.ADMIN_PASSWORD && process.env.NODE_ENV !== "production"

  return (
    <div className="site-shell grid min-h-screen place-items-center px-6 py-12">
      <main className="cart-shell relative w-full max-w-md overflow-hidden rounded-[2rem] p-8">
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#ffd600]/16 blur-3xl" />
        <div className="relative">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ffd600] text-[#111315] shadow-[0_0_30px_rgba(255,214,0,0.28)]">
            <LockKeyhole className="h-7 w-7" />
          </div>
          <p className="section-eyebrow mb-4">FMART Admin</p>
          <h1 className="text-4xl font-black leading-none">Вход в панель</h1>
          <p className="cart-muted mt-4 text-sm leading-6">
            Закрытый раздел для управления товарами, публикацией и витриной каталога.
          </p>

          {params.error && (
            <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200">
              Неверный пароль администратора.
            </div>
          )}

          {!hasPassword && (
            <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200">
              В production нужно задать ADMIN_PASSWORD.
            </div>
          )}

          {showDevHint && (
            <div className="mt-5 flex gap-3 rounded-2xl border border-[#ffd600]/20 bg-[#ffd600]/10 px-4 py-3 text-sm text-[#ffd600]">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              Для локальной разработки пароль: fmart-admin
            </div>
          )}

          <form action={loginAction} className="mt-6 space-y-4">
            <input
              name="password"
              type="password"
              required
              placeholder="Пароль"
              className="w-full rounded-2xl border border-[var(--cart-border)] bg-[var(--cart-panel)] px-4 py-4 text-[var(--cart-foreground)] outline-none transition placeholder:text-[var(--cart-muted)] focus:border-[#ffd600]"
            />
            <button type="submit" className="brand-button inline-flex w-full justify-center rounded-full px-6 py-4 text-sm font-black">
              Войти
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
