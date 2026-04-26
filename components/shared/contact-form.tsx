"use client"

import { useState } from "react"
import Link from "next/link"
import { Send, Check } from "lucide-react"

export function ContactForm({ darkBg = false }: { darkBg?: boolean }) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет логика отправки формы
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const inputClass = darkBg
    ? "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 transition focus:border-[#ffd60a] focus:outline-none"
    : "w-full rounded-xl border border-border bg-[#f5f6f2] px-4 py-3 text-[#111315] placeholder:text-[#8b929a] transition focus:border-[#ffd60a] focus:outline-none dark:bg-white/5 dark:text-white"

  return (
    <div className={`rounded-2xl p-8 ${darkBg ? "bg-[#111315]" : "surface-card"}`}>
      <h3 className={`mb-2 text-2xl font-black ${darkBg ? "text-white" : "text-[#111315] dark:text-white"}`}>
        Свяжитесь с нами
      </h3>
      <p className={`mb-6 ${darkBg ? "text-white/58" : "text-[#656b72] dark:text-slate-300"}`}>
        Оставьте заявку — мы обязательно вам перезвоним
      </p>
      
      {submitted ? (
        <div className="flex items-center gap-3 p-4 bg-green-500/20 rounded-xl">
          <Check className="w-6 h-6 text-green-500" />
          <span className={darkBg ? "text-white" : "text-[#1a1a2e]"}>
            Спасибо! Мы свяжемся с вами в ближайшее время.
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Ваше имя"
              required
              className={inputClass}
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Телефон"
              required
              className={inputClass}
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <textarea
              placeholder="Сообщение (необязательно)"
              rows={3}
              className={inputClass}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="brand-button flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-black transition"
          >
            Отправить <Send className="w-5 h-5" />
          </button>
          <p className={`text-xs ${darkBg ? "text-white/42" : "text-[#8b929a] dark:text-slate-400"}`}>
            Отправляя сообщение, я соглашаюсь с{" "}
            <Link href="/privacy" className="underline hover:text-[#ffd60a] transition">
              политикой обработки персональных данных
            </Link>
          </p>
        </form>
      )}
    </div>
  )
}
