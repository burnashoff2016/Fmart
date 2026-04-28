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
  const [direction, setDirection] = useState<"next" | "prev">("next")
  const [motionId, setMotionId] = useState(0)
  const current = gallery[active] ?? gallery[0]

  const go = (direction: -1 | 1) => {
    setDirection(direction > 0 ? "next" : "prev")
    setMotionId((value) => value + 1)
    setActive((index) => (index + direction + gallery.length) % gallery.length)
  }

  const pick = (index: number) => {
    if (index === active) return
    setDirection(index > active ? "next" : "prev")
    setMotionId((value) => value + 1)
    setActive(index)
  }

  return (
    <div className="product-gallery surface-card relative overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_34%_18%,rgba(255,255,255,0.95),transparent_25rem),linear-gradient(135deg,#eef1f4,#dfe4ea)] dark:bg-[radial-gradient(circle_at_34%_18%,rgba(255,255,255,0.10),transparent_24rem),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
      <div className="product-gallery__stage relative aspect-[4/5] overflow-hidden">
        <Image
          key={`${current}-${motionId}`}
          src={current}
          alt={name}
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="product-gallery__image object-cover"
          data-direction={direction}
          priority
        />
        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Предыдущее фото"
              className="group absolute inset-y-0 left-0 z-20 flex w-20 items-center justify-center bg-gradient-to-r from-white/54 to-transparent text-[#111315] opacity-90 transition hover:opacity-100 dark:from-black/30 dark:text-white sm:w-24"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/84 shadow-[0_12px_30px_rgba(18,20,22,0.12)] backdrop-blur transition group-hover:-translate-x-0.5 dark:border-white/12 dark:bg-black/38">
                <ChevronLeft className="h-5 w-5" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Следующее фото"
              className="group absolute inset-y-0 right-0 z-20 flex w-20 items-center justify-center bg-gradient-to-l from-white/54 to-transparent text-[#111315] opacity-90 transition hover:opacity-100 dark:from-black/30 dark:text-white sm:w-24"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/84 shadow-[0_12px_30px_rgba(18,20,22,0.12)] backdrop-blur transition group-hover:translate-x-0.5 dark:border-white/12 dark:bg-black/38">
                <ChevronRight className="h-5 w-5" />
              </span>
            </button>
          </>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="grid grid-cols-4 gap-2 border-t border-border bg-white/54 p-3 dark:bg-black/16 sm:grid-cols-8">
            {gallery.map((image, index) => (
              <button
                type="button"
                key={`${image}-${index}`}
                onClick={() => pick(index)}
                aria-label={`Фото ${index + 1}`}
                className={`relative aspect-square overflow-hidden rounded-2xl border bg-white transition dark:bg-white/6 ${
                  active === index ? "border-[#111315] dark:border-[#ffd600]" : "border-border opacity-72 hover:opacity-100"
                }`}
              >
                <Image src={image} alt={`${name}, фото ${index + 1}`} fill className="object-contain p-1.5" />
              </button>
            ))}
          </div>
      )}
    </div>
  )
}
