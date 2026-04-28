"use client"
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { CheckCircle2, PackageCheck } from 'lucide-react'
import { Navbar } from '@/components/shared/navbar'
import { Footer } from '@/components/shared/footer'

function ThanksContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || '000000'
  return (
    <div className="site-shell min-h-screen">
      <Navbar />
      <main className="px-6 py-36 text-center">
        <section className="cart-shell relative mx-auto max-w-xl overflow-hidden rounded-[2rem] p-10">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-slate-300/28 blur-3xl dark:bg-white/10" />
          <div className="relative">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-200 text-[#111315] shadow-[0_0_30px_rgba(148,163,184,0.22)] ring-1 ring-slate-300/70 dark:bg-white/10 dark:text-[#ffd600] dark:ring-white/12">
              <CheckCircle2 className="h-9 w-9" />
            </div>
          <p className="section-eyebrow mb-4">Order confirmed</p>
          <h1 className="mb-4 text-4xl font-black">Спасибо за заказ!</h1>
          <p className="cart-muted mb-6">Ваш заказ успешно оформлен. Номер заказа: {orderId}</p>
          <div className="cart-panel mb-6 flex items-center justify-center gap-3 rounded-2xl p-4 text-sm">
            <PackageCheck className="h-5 w-5 text-[#ffd600]" />
            Менеджер свяжется с вами для подтверждения деталей.
          </div>
          <Link href="/products" className="brand-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-black">
            Вернуться к покупкам
          </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default function ThanksPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThanksContent />
    </Suspense>
  )
}
