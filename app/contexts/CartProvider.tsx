"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Product } from '@/lib/products'

type CartItem = {
  slug: string
  product: Product
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (slug: string) => void
  updateQuantity: (slug: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('fmart_cart')
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[]
        setItems(parsed)
      }
    } catch {
      // ignore
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fmart_cart', JSON.stringify(items))
    } catch {
      // ignore
    }
  }, [items])

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug)
      if (existing) {
        return prev.map((i) => (i.slug === product.slug ? { ...i, quantity: i.quantity + quantity } : i))
      }
      return [...prev, { slug: product.slug, product, quantity }]
    })
  }

  const removeFromCart = (slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug))
  }

  const updateQuantity = (slug: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(slug)
      return
    }
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, quantity } : i)))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((acc, it) => acc + it.quantity, 0)
  const totalPrice = items.reduce((acc, it) => {
    // Product.price is a string with possible spaces; convert to number
    const price = Number(String(it.product.price).replace(/[^0-9]/g, ''))
    return acc + price * it.quantity
  }, 0)

  const value = useMemo<CartContextValue>(() => ({ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
