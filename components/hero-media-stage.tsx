"use client"

import Image from "next/image"
import { Noise } from "@/components/reactbits/noise"

type HeroMediaMode = "video" | "model3d"

type HeroMediaStageProps = {
  mode?: HeroMediaMode
  posterSrc: string
  videoSrc?: string
  modelSrc?: string
  alt: string
}

export function HeroMediaStage({
  mode = "video",
  posterSrc,
  videoSrc,
  modelSrc,
  alt,
}: HeroMediaStageProps) {
  const showVideo = mode === "video" && videoSrc
  const showModelPlaceholder = mode === "model3d" && modelSrc

  return (
    <div className="hero-media-stage" data-media-mode={mode}>
      {showVideo ? (
        <video
          className="hero-media-stage__video"
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
        />
      ) : (
        <Image
          src={posterSrc}
          alt={alt}
          fill
          className="hero-media-stage__poster"
          priority
        />
      )}

      {showModelPlaceholder && (
        <div className="hero-media-stage__model-slot" data-model-src={modelSrc} aria-hidden="true" />
      )}

      {/* <div className="hero-media-stage__scan" aria-hidden="true" />
      <Noise className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08] mix-blend-soft-light" patternAlpha={12} patternRefreshInterval={6} />
      <div className="hero-media-stage__hud hero-media-stage__hud--top" aria-hidden="true">
        <span>FMART VISION</span>
        <b>ACTIVE</b>
      </div>
      <div className="hero-media-stage__hud hero-media-stage__hud--bottom" aria-hidden="true">
        <span>ROUTE</span>
        <b>AUTO</b>
      </div> */}
    </div>
  )
}
