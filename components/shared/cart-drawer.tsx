"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShieldCheck, ShoppingBag, Trash, X, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { ConfirmRemoveModal } from "@/components/shared/confirm-remove-modal"
import { useCart } from "@/contexts/CartProvider"

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart()
  const [removeSlug, setRemoveSlug] = useState<string | null>(null)
  const removeItem = items.find((item) => item.slug === removeSlug)

  const confirmRemove = (slug: string) => {
    setRemoveSlug(slug)
  }

  const handleRemoveConfirmed = () => {
    if (!removeItem) return

    removeFromCart(removeItem.slug)
    toast.success("Товар удалён из корзины", {
      description: removeItem.product.name,
    })
    setRemoveSlug(null)
  }

  const decreaseQuantity = (slug: string, quantity: number) => {
    if (quantity <= 1) {
      confirmRemove(slug)
      return
    }

    updateQuantity(slug, quantity - 1)
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, onClose])

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={onClose}
      />

      <aside
        aria-label="Корзина"
        className={`cart-shell cart-drawer-shell fixed right-0 top-0 z-50 flex h-screen w-[min(100vw,430px)] transform flex-col overflow-hidden transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="relative overflow-hidden border-b border-[var(--cart-border)] px-5 py-5">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#ffd600]/14 blur-3xl" />
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-slate-300/70 to-transparent dark:via-white/14" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ffd600] text-[#111315] shadow-[0_0_28px_rgba(148,163,184,0.22)]">
                <ShoppingBag className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffd600]">FMART order</div>
                <strong className="text-2xl font-black text-white">Корзина</strong>
              </div>
            </div>
            <button onClick={onClose} aria-label="Закрыть корзину" className="cart-panel rounded-full p-2 transition hover:bg-[var(--cart-panel-strong)]">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative mt-5 grid grid-cols-2 gap-3">
            <div className="cart-panel rounded-2xl p-3">
              <div className="cart-muted text-xs">Позиций</div>
              <div className="mt-1 text-xl font-black">{items.length}</div>
            </div>
            <div className="rounded-2xl border border-slate-300 bg-slate-200/70 p-3 dark:border-white/12 dark:bg-white/8">
              <div className="text-xs text-[#65707b] dark:text-[#ffd600]">Товаров</div>
              <div className="mt-1 text-xl font-black">{totalItems}</div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[var(--cart-border)] bg-[var(--cart-panel)] p-8 text-center">
              <Zap className="mx-auto mb-4 h-8 w-8 text-[#ffd600]" />
              <p className="text-lg font-black">Корзина пуста</p>
              <p className="cart-muted mt-2 text-sm leading-6">Добавьте модель FMART, и заказ появится здесь.</p>
              <Link href="/products" onClick={onClose} className="brand-button mt-6 inline-flex rounded-full px-5 py-3 text-sm font-black">
                Выбрать модель
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.slug} className="cart-panel group relative overflow-hidden rounded-3xl p-3 transition hover:border-[#ffd600]/45 hover:bg-[var(--cart-panel-strong)]">
                  <div className="absolute inset-y-0 left-0 w-1 bg-[#ffd600]/0 transition group-hover:bg-[#ffd600]" />
                  <div className="flex gap-3">
                    <div className="cart-panel-strong relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-contain p-2" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-black">{item.product.name}</div>
                      <div className="cart-muted mt-1 text-xs font-medium">{item.product.price} ₽ за штуку</div>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="cart-control flex items-center rounded-full p-1">
                          <button onClick={() => decreaseQuantity(item.slug, item.quantity)} className="rounded-full p-1.5 text-[var(--cart-muted)] transition hover:bg-[var(--cart-panel-strong)] hover:text-[var(--cart-foreground)]" aria-label="Уменьшить количество">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-black">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.slug, item.quantity + 1)} className="rounded-full p-1.5 text-[var(--cart-muted)] transition hover:bg-[var(--cart-panel-strong)] hover:text-[var(--cart-foreground)]" aria-label="Увеличить количество">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button onClick={() => confirmRemove(item.slug)} aria-label="Удалить" className="rounded-full border border-red-500/20 bg-red-500/8 p-2 text-red-300 transition hover:bg-red-500/16 hover:text-red-200">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-[var(--cart-border)] bg-[var(--cart-panel)] px-5 py-5">
          <div className="mb-4 flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-200">
            <ShieldCheck className="h-5 w-5" />
            Официальная гарантия и сервис FMART
          </div>
          <div className="mb-4 flex items-center justify-between">
            <span className="cart-muted text-sm">Итого</span>
            <span className="text-2xl font-black">{Number(totalPrice).toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</span>
          </div>
          <Link href="/checkout" onClick={onClose} className="brand-button inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-black">
            Оформить заказ
          </Link>
        </div>
      </aside>

      {removeItem && (
        <ConfirmRemoveModal
          productName={removeItem.product.name}
          onCancel={() => setRemoveSlug(null)}
          onConfirm={handleRemoveConfirmed}
        />
      )}
    </>
  )
}
