"use client"

import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

type CountUpProps = {
  to: number
  from?: number
  duration?: number
  delay?: number
  className?: string
  separator?: string
  suffix?: string
}

export function CountUp({
  to,
  from = 0,
  duration = 1.8,
  delay = 0,
  className,
  separator = " ",
  suffix = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })
  const motionValue = useMotionValue(from)
  const springValue = useSpring(motionValue, {
    damping: 24,
    stiffness: 90,
  })

  useEffect(() => {
    if (!ref.current) return
    ref.current.textContent = `${Intl.NumberFormat("ru-RU").format(from).replace(/,/g, separator)}${suffix}`
  }, [from, separator, suffix])

  useEffect(() => {
    if (!isInView) return

    const timeoutId = window.setTimeout(() => {
      motionValue.set(to)
    }, delay * 1000)

    return () => window.clearTimeout(timeoutId)
  }, [delay, isInView, motionValue, to])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (!ref.current) return
      ref.current.textContent = `${Intl.NumberFormat("ru-RU")
        .format(Math.round(latest))
        .replace(/,/g, separator)}${suffix}`
    })
  }, [separator, springValue, suffix])

  return <span ref={ref} className={className} data-duration={duration} />
}
