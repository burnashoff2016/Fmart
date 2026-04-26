"use client"

import { useEffect, useRef } from "react"

type NoiseProps = {
  className?: string
  patternAlpha?: number
  patternRefreshInterval?: number
}

export function Noise({
  className,
  patternAlpha = 10,
  patternRefreshInterval = 5,
}: NoiseProps) {
  const grainRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = grainRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let frame = 0
    let animationId = 0
    const canvasSize = 160

    const resize = () => {
      canvas.width = canvasSize
      canvas.height = canvasSize
    }

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = patternAlpha
      }

      ctx.putImageData(imageData, 0, 0)
    }

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        drawGrain()
      }

      frame += 1
      animationId = window.requestAnimationFrame(loop)
    }

    resize()
    loop()

    return () => {
      window.cancelAnimationFrame(animationId)
    }
  }, [patternAlpha, patternRefreshInterval])

  return (
    <canvas
      ref={grainRef}
      className={className}
      style={{
        imageRendering: "pixelated",
      }}
      aria-hidden="true"
    />
  )
}
