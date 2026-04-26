"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Check, CreditCard, LockKeyhole, MapPin, PackageCheck, ShieldCheck, Truck } from "lucide-react"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { useCart } from "@/app/contexts/CartProvider"

const STEPS = [
  { id: 1, label: "Контакты", icon: MapPin },
  { id: 2, label: "Оплата", icon: CreditCard },
  { id: 3, label: "Проверка", icon: PackageCheck },
]

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [shipping, setShipping] = useState({ name: "", phone: "", address: "", city: "" })
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" })

  useEffect(() => {
    if (!items || items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  const canProceed = () => {
    if (step === 1) return shipping.name.trim().length > 1 && shipping.phone.trim().length > 5 && shipping.address.trim().length > 3
    if (step === 2) return card.number.replace(/\D/g, "").length >= 12
    return true
  }

  const next = () => {
    if (step < 3) {
      setStep((current) => current + 1)
      return
    }

    const orderId = Math.floor(Math.random() * 1e8).toString()
    router.push(`/checkout/thanks?orderId=${orderId}`)
    clearCart()
  }

  const orderRows = useMemo(() => {
    return items.map((item) => {
      const price = Number(item.product.price.replace(/[^0-9]/g, ""))
      return {
        ...item,
        rowTotal: price * item.quantity,
      }
    })
  }, [items])

  return (
    <div className="site-shell min-h-screen">
      <Navbar />

      <main className="px-6 pb-20 pt-36">
        <section className="mx-auto max-w-6xl">
          <div className="cart-shell relative overflow-hidden rounded-[2rem] p-8 md:p-10">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#ffd600]/16 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#ffd600]/60 to-transparent" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="section-eyebrow mb-4">Secure checkout</p>
                <h1 className="text-5xl font-black leading-none md:text-6xl">Оформление заказа</h1>
                <p className="cart-muted mt-5 max-w-2xl text-base leading-7">
                  Проверьте данные, подтвердите способ оплаты и завершите демо-заказ. Реальный платёж здесь не проводится.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-700 dark:text-emerald-200">
                <LockKeyhole className="h-5 w-5" />
                Защищённый сценарий
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              <div className="surface-card rounded-3xl p-5">
                <div className="grid gap-3 md:grid-cols-3">
                  {STEPS.map((item) => {
                    const Icon = item.icon
                    const active = step === item.id
                    const done = step > item.id
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setStep(item.id)}
                        className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                          active
                            ? "border-[#ffd600]/60 bg-[#ffd600]/12"
                            : done
                              ? "border-emerald-500/25 bg-emerald-500/10"
                              : "border-border bg-black/[0.03] dark:bg-white/[0.04]"
                        }`}
                      >
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${done ? "bg-emerald-500 text-white" : "bg-[#ffd600] text-[#111315]"}`}>
                          {done ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                        </span>
                        <span>
                          <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8a6f00] dark:text-[#ffd600]">Шаг {item.id}</span>
                          <span className="block font-black text-[#111315] dark:text-white">{item.label}</span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="surface-card rounded-3xl p-6 md:p-8">
                {step === 1 && (
                  <div>
                    <h2 className="text-3xl font-black text-[#111315] dark:text-white">Контактная информация</h2>
                    <p className="mt-2 text-sm leading-6 text-[#656b72] dark:text-slate-300">Данные нужны менеджеру для подтверждения заказа и доставки.</p>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <input placeholder="Имя" value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} className="w-full rounded-xl border px-4 py-3" />
                      <input placeholder="Телефон" value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} className="w-full rounded-xl border px-4 py-3" />
                      <input placeholder="Город" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className="w-full rounded-xl border px-4 py-3" />
                      <input placeholder="Адрес" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} className="w-full rounded-xl border px-4 py-3" />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="text-3xl font-black text-[#111315] dark:text-white">Платёжная информация</h2>
                    <p className="mt-2 text-sm leading-6 text-[#656b72] dark:text-slate-300">Это демо-экран без реального списания. Можно использовать тестовые данные.</p>
                    <div className="mt-6 space-y-4">
                      <input placeholder="Номер карты" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} className="w-full rounded-xl border px-4 py-3" />
                      <div className="grid grid-cols-[1fr_120px] gap-3">
                        <input placeholder="MM/YY" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} className="w-full rounded-xl border px-4 py-3" />
                        <input placeholder="CVV" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} className="w-full rounded-xl border px-4 py-3" />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="text-3xl font-black text-[#111315] dark:text-white">Проверьте заказ</h2>
                    <p className="mt-2 text-sm leading-6 text-[#656b72] dark:text-slate-300">После подтверждения корзина очистится, а вы увидите номер демо-заказа.</p>
                    <div className="mt-6 grid gap-3">
                      <div className="cart-panel rounded-2xl p-4">
                        <div className="cart-muted text-xs">Получатель</div>
                        <div className="mt-1 font-black">{shipping.name || "Не указано"}</div>
                      </div>
                      <div className="cart-panel rounded-2xl p-4">
                        <div className="cart-muted text-xs">Доставка</div>
                        <div className="mt-1 font-black">{[shipping.city, shipping.address].filter(Boolean).join(", ") || "Не указано"}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button onClick={next} disabled={!canProceed()} className="brand-button inline-flex justify-center rounded-full px-7 py-4 text-sm font-black disabled:opacity-50">
                    {step === 3 ? "Оформить заказ" : "Продолжить"}
                  </button>
                  <Link href="/cart" className="inline-flex justify-center rounded-full border border-border px-7 py-4 text-sm font-bold text-[#34383d] transition hover:bg-black/5 dark:text-white dark:hover:bg-white/10">
                    Вернуться в корзину
                  </Link>
                </div>
              </div>
            </div>

            <aside className="cart-shell h-fit overflow-hidden rounded-3xl">
              <div className="border-b border-[var(--cart-border)] bg-[#ffd600]/10 p-6">
                <Truck className="mb-4 h-7 w-7 text-[#ffd600]" />
                <h2 className="text-2xl font-black">Ваш заказ</h2>
                <p className="cart-muted mt-2 text-sm leading-6">Официальная продукция FMART с сервисной поддержкой.</p>
              </div>

              <div className="space-y-3 p-5">
                {orderRows.map((item) => (
                  <div key={item.slug} className="cart-panel flex gap-3 rounded-2xl p-3">
                    <div className="cart-panel-strong relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-contain p-2" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-black">{item.product.name}</div>
                      <div className="cart-muted mt-1 text-xs">{item.quantity} шт.</div>
                    </div>
                    <div className="text-right text-sm font-black">
                      {item.rowTotal.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--cart-border)] p-6">
                <div className="mb-5 flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-200">
                  <ShieldCheck className="h-5 w-5" />
                  Гарантия и сервис FMART
                </div>
                <div className="flex items-center justify-between">
                  <span className="cart-muted">Итого</span>
                  <strong className="text-2xl">{Number(totalPrice).toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</strong>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
