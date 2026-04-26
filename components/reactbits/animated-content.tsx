"use client"

import type { ReactNode } from "react"
import { useEffect, useRef } from "react"
import { motion, useInView, useReducedMotion, useAnimationControls, type HTMLMotionProps } from "framer-motion"

type AnimatedContentProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode
  distance?: number
  direction?: "vertical" | "horizontal"
  reverse?: boolean
  duration?: number
  delay?: number
  initialOpacity?: number
  scale?: number
  threshold?: number
}

export function AnimatedContent({
  children,
  className,
  distance = 36,
  direction = "vertical",
  reverse = false,
  duration = 0.7,
  delay = 0,
  initialOpacity = 0,
  scale = 1,
  threshold = 0.2,
  ...props
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  const shouldReduceMotion = useReducedMotion()
  const controls = useAnimationControls()

  const offset = reverse ? -distance : distance
  const initialX = direction === "horizontal" ? offset : 0
  const initialY = direction === "vertical" ? offset : 0

  useEffect(() => {
    if (!isInView) return

    controls.start({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    })
  }, [controls, delay, duration, isInView, shouldReduceMotion])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: shouldReduceMotion ? 1 : initialOpacity,
        x: shouldReduceMotion ? 0 : initialX,
        y: shouldReduceMotion ? 0 : initialY,
        scale: shouldReduceMotion ? 1 : scale,
      }}
      animate={controls}
      {...props}
    >
      {children}
    </motion.div>
  )
}
