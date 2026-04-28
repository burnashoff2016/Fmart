"use client"

import { Check, ShoppingCart } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"
import { Product } from "@/lib/products"
import { useCart } from "@/app/contexts/CartProvider"

export function AddToCartButton({ product, className, label }: { product: Product; className?: string; label?: string }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const text = label ?? 'Добавить в корзину'

  if (!product.isAvailable) {
    return null
  }

  const handleAdd = () => {
    addToCart(product, 1)
    setAdded(true)
    toast.success("Добавлено в корзину", {
      description: product.name,
    })

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setAdded(false), 1200)
  }

  return (
    <button
      onClick={handleAdd}
      className={`${className ?? 'inline-flex items-center gap-2 bg-[#1a1a2e] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#2a2a3e] transition'} add-to-cart-button ${added ? "is-added" : ""}`}
      aria-label={`Добавить ${product.name} в корзину`}
    >
      <span className="add-to-cart-button__icon">
        {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
      </span>
      <span>{added ? "Добавлено" : text}</span>
    </button>
  )
}
