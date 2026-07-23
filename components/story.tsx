import { ParallaxImage } from '@/components/parallax'

const details = [
  ['Atelier-made', 'New pieces drawn in our studio and made in limited runs by our circle of craftspeople.'],
  ['One-of-one', 'Antique furniture selected for provenance, restored by hand, and published only once.'],
  ['Material record', 'Teak, cane and brass are preserved with their grain, marks and honest evidence of age.'],
]

export function Story() {
  return (
    <section id="about" className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-[1480px] px-4 md:px-8">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="eyebrow">About Mithran&apos;s Atelier</p>
            <h2 className="mt-5 text-balance font-serif text-5xl leading-[0.98] text-heading md:text-7xl">
              From houses built to outlive us.
            </h2>
            <p className="mt-8 max-w-md text-sm leading-7">
              Our practice begins in Karaikudi, where timber doors, shaded courtyards and furniture have carried family histories for generations. We make new pieces with that same patience, and restore antique ones without erasing where they have been.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ParallaxImage
              src="/images/antique-cabinet.png"
              alt="A restored antique Karaikudi cabinet with original brass hardware"
              sizes="(max-width: 768px) 100vw, 50vw"
              speed={0.14}
              className="aspect-[4/5]"
            />
          </div>
        </div>

        <div className="mt-16 grid border-t border-border md:mt-28 md:grid-cols-3">
          {details.map(([title, copy], index) => (
            <article key={title} className="border-b border-border py-7 md:border-b-0 md:border-r md:px-8 md:py-10 first:md:pl-0 last:md:border-r-0">
              <p className="text-[10px] tracking-[0.18em]">0{index + 1}</p>
              <h3 className="mt-8 font-serif text-3xl text-heading">{title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
