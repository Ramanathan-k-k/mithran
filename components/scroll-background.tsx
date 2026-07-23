'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

// The hero image is pinned behind the whole page. A veil (the page colour)
// sits over it and grows more transparent as you scroll, so the further down
// you go, the more of the hero background shows through the content.
const VEIL_TOP = 0.94 // near the top the page is almost solid / readable
const VEIL_BOTTOM = 0.42 // by the end much more of the hero shows through

export function ScrollBackground() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const next = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      setProgress(next)
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
  }, [])

  const veilOpacity = VEIL_TOP + (VEIL_BOTTOM - VEIL_TOP) * progress

  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: -20 }} aria-hidden="true">
      <Image
        src="/images/oonjal-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="scale-105 object-cover"
      />
      {/* Page-coloured veil that thins out as the visitor scrolls down. */}
      <div className="absolute inset-0 bg-background transition-opacity duration-200" style={{ opacity: veilOpacity }} />
    </div>
  )
}
