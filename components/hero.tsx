import { ArrowDownRight } from 'lucide-react'
import { ParallaxImage } from '@/components/parallax'

export function Hero() {
  return (
    <section id="top">
      <ParallaxImage
        src="/images/oonjal-hero.png"
        alt="A hand-carved teak Oonjal swing in a sunlit Chettinad courtyard"
        priority
        sizes="100vw"
        speed={0.16}
        className="h-[100svh] w-full"
      >
        <div className="absolute inset-0 bg-foreground/25" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-7 p-6 text-background md:p-12 lg:p-16">
          <p className="text-[10px] uppercase tracking-[0.24em]">The Karaikudi collection · 2026</p>
          <h1 className="max-w-5xl text-balance font-serif text-5xl leading-[0.92] tracking-tight md:text-8xl lg:text-9xl">
            Furniture with a memory.
          </h1>
          <div className="flex flex-wrap gap-3">
            <a href="#published" className="inline-flex items-center gap-3 bg-background px-6 py-3 text-xs uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
              Explore pieces <ArrowDownRight aria-hidden="true" />
            </a>
            <a href="#about" className="inline-flex items-center border border-background px-6 py-3 text-xs uppercase tracking-[0.14em] transition-colors hover:bg-background hover:text-foreground">
              Our story
            </a>
          </div>
        </div>
      </ParallaxImage>
    </section>
  )
}
