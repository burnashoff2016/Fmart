"use client"

import { Product } from "@/lib/products"
import { useCart } from "@/app/contexts/CartProvider"

export function AddToCartButton({ product, className, label }: { product: Product; className?: string; label?: string }) {
  const { addToCart } = useCart()
  const text = label ?? 'Добавить в корзину'

  if (!product.isAvailable) {
    return null
  }

  return (
    <button
      onClick={() => addToCart(product, 1)}
      className={className ?? 'inline-flex items-center gap-2 bg-[#1a1a2e] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#2a2a3e] transition'}
      aria-label={`Добавить ${product.name} в корзину`}
    >
      {text}
    </button>
  )
}
