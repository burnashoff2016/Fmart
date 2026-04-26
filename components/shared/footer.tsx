"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#111315] px-6 py-16 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-12 md:grid-cols-4 mb-12">
          <div>
            <Image 
              src="/images/fmart-logo.png" 
              alt="FMart" 
              width={100} 
              height={33} 
              className="h-8 w-auto mb-4 brightness-0 invert" 
            />
            <p className="text-sm leading-relaxed text-white/58">
              Официальный представитель роботов-мойщиков окон FMART в России. ООО "ТПГ РУСТЭК"
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-[#ffd60a]">Модели</h4>
            <div className="space-y-2 text-sm text-white/58">
              <div><Link href="/products" className="hover:text-white transition">Все модели</Link></div>
              <div><Link href="/products/fmart-t11" className="hover:text-white transition">FMart T11</Link></div>
              <div><Link href="/products/fmart-t10-pro" className="hover:text-white transition">FMart T10 Pro</Link></div>
              <div><Link href="/products/fmart-t9" className="hover:text-white transition">FMart T9</Link></div>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-[#ffd60a]">Компания</h4>
            <div className="space-y-2 text-sm text-white/58">
              <div><Link href="/about" className="hover:text-white transition">О бренде</Link></div>
              <div><Link href="/opt" className="hover:text-white transition">Дистрибьюторам</Link></div>
              <div><Link href="/contacts" className="hover:text-white transition">Контакты</Link></div>
              <div><Link href="/docs/guarantees" className="hover:text-white transition">Гарантия и возврат</Link></div>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-[#ffd60a]">Контакты</h4>
            <div className="space-y-3 text-sm text-white/58">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#ffd60a]" />
                <a href="tel:+74997071592" className="hover:text-white transition">+7 499 707-15-92</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ffd60a]" />
                <a href="mailto:info@fmart.tech" className="hover:text-white transition">info@fmart.tech</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#ffd60a] mt-0.5" />
                <span>Москва, ул. Воронцовские пруды, д. 3</span>
              </div>
            </div>
            <div className="mt-4">
              <a 
                href="https://t.me/fmarttechat" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#ffd60a] transition hover:text-white"
              >
                Чат в Telegram
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <div className="text-sm text-white/42">
            © 2026 FMART Россия. Все права защищены.
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/42">
            <Link href="/docs/public-offer" className="hover:text-white transition">
              Публичная оферта
            </Link>
            <Link href="/docs/privacy" className="hover:text-white transition">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
