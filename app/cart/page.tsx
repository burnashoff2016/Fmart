"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Minus, Plus, ShieldCheck, Sparkles, Trash2, Zap } from "lucide-react"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { useCart } from "@/contexts/CartProvider"

export default function CartPage() {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart()

  return (
    <div className="site-shell min-h-screen">
      <Navbar />
      <main className="px-6 pb-20 pt-36">
        <section className="mx-auto max-w-6xl">
          <div className="cart-shell relative overflow-hidden rounded-[2rem] p-8 md:p-10">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#ffd600]/14 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-slate-300/70 to-transparent dark:via-white/14" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="section-eyebrow mb-4">Корзина</p>
                <h1 className="text-5xl font-black leading-none md:text-6xl">Ваш заказ</h1>
                <p className="cart-muted mt-5 max-w-2xl text-base leading-7">
                  Проверьте выбранные модели FMART, количество и итоговую стоимость перед оформлением.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
                <div className="cart-panel rounded-2xl p-4">
                  <div className="cart-muted text-xs">Позиций</div>
                  <div className="mt-1 text-2xl font-black">{items.length}</div>
                </div>
                <div className="rounded-2xl border border-slate-300 bg-slate-200/70 p-4 dark:border-white/12 dark:bg-white/8">
                  <div className="text-xs text-[#65707b] dark:text-[#ffd600]">Товаров</div>
                  <div className="mt-1 text-2xl font-black">{items.reduce((sum, item) => sum + item.quantity, 0)}</div>
                </div>
              </div>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="mt-8 rounded-[2rem] border border-dashed border-[var(--cart-border)] bg-[var(--cart-panel)] p-10 text-center">
              <Zap className="mx-auto mb-5 h-10 w-10 text-[#ffd600]" />
              <h2 className="text-2xl font-black">Корзина пока пустая</h2>
              <p className="cart-muted mx-auto mt-3 max-w-md text-sm leading-6">
                Выберите робот-мойщик, и он появится здесь вместе с быстрым оформлением заказа.
              </p>
              <Link href="/products" className="brand-button mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-black">
                Перейти в каталог <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
              <div className="space-y-4">
                {items.map((item) => (
                  <article key={item.slug} className="cart-panel group relative overflow-hidden rounded-3xl p-4 transition hover:border-[#ffd600]/45 hover:bg-[var(--cart-panel-strong)] sm:grid sm:grid-cols-[132px_1fr_auto] sm:items-center sm:gap-5">
                    <div className="absolute inset-y-0 left-0 w-1 bg-[#ffd600]/0 transition group-hover:bg-[#ffd600]" />
                    <div className="cart-panel-strong relative aspect-square rounded-2xl">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-contain p-4" />
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <div className="mb-2 inline-flex rounded-full border border-slate-300 bg-slate-100/70 px-3 py-1 text-xs font-bold text-[#65707b] dark:border-white/12 dark:bg-white/8 dark:text-[#ffd600]">
                        FMART
                      </div>
                      <h2 className="text-2xl font-black">{item.product.name}</h2>
                      <p className="cart-muted mt-2 text-sm">{item.product.price} ₽ за штуку</p>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-4 sm:mt-0 sm:justify-end">
                      <div className="cart-control flex items-center gap-2 rounded-full p-1">
                        <button onClick={() => updateQuantity(item.slug, item.quantity - 1)} className="rounded-full p-2 text-[var(--cart-muted)] transition hover:bg-[var(--cart-panel-strong)] hover:text-[var(--cart-foreground)]" aria-label="Уменьшить количество">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-black">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.slug, item.quantity + 1)} className="rounded-full p-2 text-[var(--cart-muted)] transition hover:bg-[var(--cart-panel-strong)] hover:text-[var(--cart-foreground)]" aria-label="Увеличить количество">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.slug)} className="rounded-full border border-red-500/20 bg-red-500/8 p-2 text-red-300 transition hover:bg-red-500/16 hover:text-red-200" aria-label="Удалить из корзины">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="cart-shell h-fit overflow-hidden rounded-3xl">
                <div className="border-b border-[var(--cart-border)] bg-slate-200/70 p-6 dark:bg-white/8">
                  <Sparkles className="mb-4 h-7 w-7 text-[#ffd600]" />
                  <h2 className="text-2xl font-black">Итого</h2>
                  <p className="cart-muted mt-2 text-sm leading-6">Быстрое оформление заказа без реального платежа.</p>
                </div>
                <div className="p-6">
                  <div className="mb-5 flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-200">
                    <ShieldCheck className="h-5 w-5" />
                    Гарантия и сервис FMART
                  </div>
                  <div className="flex items-center justify-between border-t border-[var(--cart-border)] pt-5">
                    <span className="cart-muted">Сумма заказа</span>
                    <strong className="text-2xl">
                    {Number(totalPrice).toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}
                    </strong>
                  </div>
                  <Link href="/checkout" className="brand-button mt-6 inline-flex w-full justify-center rounded-full px-6 py-4 text-sm font-black">
                    Оформить заказ
                  </Link>
                </div>
              </aside>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
