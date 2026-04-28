"use client"

import { Trash2, X } from "lucide-react"

type ConfirmRemoveModalProps = {
  productName?: string
  onCancel: () => void
  onConfirm: () => void
}

export function ConfirmRemoveModal({ productName, onCancel, onConfirm }: ConfirmRemoveModalProps) {
  return (
    <div className="fixed inset-0 z-[999] flex min-h-screen items-center justify-center bg-black/48 px-4 py-6 backdrop-blur-xl" role="dialog" aria-modal="true" aria-labelledby="remove-cart-item-title">
      <div className="cart-shell w-full max-w-sm overflow-hidden rounded-[1.75rem] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-500/12 text-red-500 dark:text-red-200">
            <Trash2 className="h-5 w-5" />
          </span>
          <button type="button" onClick={onCancel} aria-label="Отмена" className="cart-panel rounded-full p-2 transition hover:bg-[var(--cart-panel-strong)]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <h2 id="remove-cart-item-title" className="mt-5 text-2xl font-black text-[var(--cart-foreground)]">
          Удалить товар?
        </h2>
        <p className="cart-muted mt-3 text-sm leading-6">
          {productName ? `“${productName}” будет удалён из корзины.` : "Товар будет удалён из корзины."}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button type="button" onClick={onCancel} className="rounded-full border border-[var(--cart-border)] px-5 py-3 text-sm font-black text-[var(--cart-foreground)] transition hover:bg-[var(--cart-panel-strong)]">
            Оставить
          </button>
          <button type="button" onClick={onConfirm} className="rounded-full border border-red-500/20 bg-red-500/12 px-5 py-3 text-sm font-black text-red-500 transition hover:bg-red-500/18 dark:text-red-200">
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}
