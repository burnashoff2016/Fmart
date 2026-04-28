"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo, useState } from "react"

type ProductGalleryProps = {
  images?: string[]
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const gallery = useMemo(() => (images?.length ? images : ["/placeholder.jpg"]), [images])
  const [active, setActive] = useState(0)
  const current = gallery[active] ?? gallery[0]

  const go = (direction: -1 | 1) => {
    setActive((index) => (index + direction + gallery.length) % gallery.length)
  }

  return (
    <div className="surface-card relative overflow-hidden rounded-3xl bg-[#f0f1eb] dark:bg-white/5">
      <div className="relative aspect-square">
        <Image src={current} alt={name} fill className="object-contain p-10" priority />
      </div>

      {gallery.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Предыдущее фото"
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/82 text-[#111315] shadow-[0_12px_30px_rgba(18,20,22,0.12)] backdrop-blur transition hover:bg-white dark:border-white/12 dark:bg-black/34 dark:text-white dark:hover:bg-black/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Следующее фото"
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/82 text-[#111315] shadow-[0_12px_30px_rgba(18,20,22,0.12)] backdrop-blur transition hover:bg-white dark:border-white/12 dark:bg-black/34 dark:text-white dark:hover:bg-black/50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="grid grid-cols-4 gap-2 border-t border-border bg-white/54 p-3 dark:bg-black/16 sm:grid-cols-8">
            {gallery.map((image, index) => (
              <button
                type="button"
                key={`${image}-${index}`}
                onClick={() => setActive(index)}
                aria-label={`Фото ${index + 1}`}
                className={`relative aspect-square overflow-hidden rounded-2xl border bg-white transition dark:bg-white/6 ${
                  active === index ? "border-[#111315] dark:border-[#ffd600]" : "border-border opacity-72 hover:opacity-100"
                }`}
              >
                <Image src={image} alt={`${name}, фото ${index + 1}`} fill className="object-contain p-1.5" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
