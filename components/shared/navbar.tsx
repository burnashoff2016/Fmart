"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingCart } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import { CartDrawer } from "./cart-drawer"
import { useCart } from "@/contexts/CartProvider"

const NAV_LINKS = [
  { href: "/products", label: "Каталог" },
  { href: "/delivery", label: "Доставка" },
  { href: "/about", label: "О бренде" },
  { href: "/opt", label: "Опт" },
  { href: "/where-to-buy", label: "Где купить" },
  { href: "/contacts", label: "Контакты" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <nav className="site-navbar fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <span className="relative flex h-11 w-[168px] items-center rounded-full bg-white px-5 shadow-[0_10px_35px_rgba(255,214,0,0.12)] ring-1 ring-white/20">
            <Image src="/images/fmart-logo.png" alt="FMart" width={146} height={40} className="h-8 w-[146px] object-fill" priority />
          </span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-1 rounded-full bg-white/68 p-1 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
          {NAV_LINKS.map(link => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                pathname === link.href 
                  ? "bg-[#111315] text-white dark:bg-white dark:text-[#111315]" 
                  : "text-[#34383d] hover:bg-black/5 hover:text-[#111315] dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/products" 
            className="hidden sm:inline-flex brand-button rounded-full px-5 py-2.5 text-sm font-bold transition"
          >
            Купить
          </Link>
          <button onClick={() => setCartOpen(true)} aria-label="Открыть корзину" className="group relative hidden items-center gap-2 overflow-hidden rounded-full border border-[#d0a900]/50 bg-[#111315] px-4 py-2.5 text-white shadow-[0_12px_30px_rgba(18,20,22,0.18)] transition hover:border-[#d0a900] hover:bg-[#1d2024] dark:border-[#ffd600]/35 dark:bg-[#ffd600]/10 dark:shadow-[0_0_30px_rgba(255,214,0,0.10)] dark:hover:border-[#ffd600]/70 dark:hover:bg-[#ffd600]/16 md:inline-flex">
            <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,214,0,0.18),transparent)] opacity-0 transition group-hover:opacity-100" />
            <ShoppingCart className="relative h-5 w-5 text-[#ffd600]" />
            <span className="relative text-sm font-bold">Корзина</span>
            <span className="relative inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ffd600] px-1.5 text-xs font-black text-[#111315] shadow-[0_0_20px_rgba(255,214,0,0.35)]" aria-live="polite">{totalItems}</span>
          </button>
          <ThemeToggle />
          
          <button 
            className="lg:hidden rounded-full p-2 text-[#111315] transition hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Открыть меню"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background/96 px-6 py-4 shadow-soft backdrop-blur-xl">
          {NAV_LINKS.map(link => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`block rounded-xl px-3 py-3 text-base font-semibold ${
                pathname === link.href 
                  ? "bg-[#111315] text-white dark:bg-white dark:text-[#111315]" 
                  : "text-foreground hover:bg-black/5 dark:hover:bg-white/10"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/products" 
            className="mt-4 block rounded-full bg-[#ffd600] px-6 py-3 text-center font-bold text-[#111315]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Купить
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              setCartOpen(true)
            }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border px-6 py-3 font-semibold"
          >
            <ShoppingCart className="h-5 w-5" />
            Корзина ({totalItems})
          </button>
        </div>
      )}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  )
}
