import { ParallaxImage } from '@/components/parallax'

export function ParallaxBand() {
  return (
    <section aria-label="From the atelier" className="border-t border-border">
      <ParallaxImage
        src="/images/mesai-table.png"
        alt="A solid teak Mesai dining table in a sunlit heritage interior"
        sizes="100vw"
        speed={0.24}
        className="flex min-h-[80svh] items-center justify-center md:min-h-[92svh]"
      >
        <div className="absolute inset-0 bg-foreground/45" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex h-full max-w-4xl items-center justify-center px-6 text-center text-background">
          <div className="flex flex-col items-center gap-8">
            <p className="text-[10px] uppercase tracking-[0.28em] text-background/80">Karaikudi · Chettinad</p>
            <blockquote className="text-balance font-serif text-4xl leading-[1.05] md:text-6xl lg:text-7xl">
              &ldquo;We do not finish a piece. We let it keep its memory, and add ours.&rdquo;
            </blockquote>
            <p className="text-xs uppercase tracking-[0.18em] text-background/80">The workshop, est. Karaikudi</p>
          </div>
        </div>
      </ParallaxImage>
    </section>
  )
}
