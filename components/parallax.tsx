'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface ParallaxImageProps {
  src: string
  alt: string
  priority?: boolean
  sizes?: string
  /**
   * How far the image drifts relative to the scroll of its frame.
   * 0 = locked to the page, ~0.1–0.3 = subtle depth. Higher moves more.
   */
  speed?: number
  /** Classes for the visible frame (set the height/aspect + rounding here). */
  className?: string
  /** Overlay content that scrolls at normal speed over the drifting image. */
  children?: React.ReactNode
  overlayClassName?: string
}

export function ParallaxImage({
  src,
  alt,
  priority,
  sizes = '100vw',
  speed = 0.18,
  className,
  children,
  overlayClassName,
}: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)

  // Extra image height above and below the frame so drifting never
  // reveals an empty edge. Scales with the requested speed.
  const overscan = Math.round(speed * 100) + 6

  useEffect(() => {
    const frame = frameRef.current
    const layer = layerRef.current
    if (!frame || !layer) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return

    let raf = 0

    const update = () => {
      raf = 0
      const rect = frame.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      // -1 as the frame enters from below, +1 as it exits past the top.
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2)
      const clamped = Math.max(-1, Math.min(1, progress))
      const shift = -clamped * speed * rect.height
      layer.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed])

  return (
    <div ref={frameRef} className={cn('relative overflow-hidden bg-muted', className)}>
      <div
        ref={layerRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `-${overscan}%`, bottom: `-${overscan}%` }}
      >
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
      {children ? (
        <div className={cn('relative z-10 h-full w-full', overlayClassName)}>{children}</div>
      ) : null}
    </div>
  )
}
