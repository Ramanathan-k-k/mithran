import { ArrowUpRight, Hammer, PackageCheck, RefreshCw, Search, Ship, Sofa } from 'lucide-react'

const services = [
  [Sofa, 'Custom furniture', 'Proportion, timber and finishes adapted for your home.'],
  [Search, 'Antique sourcing', 'A considered search for singular pieces across Chettinad.'],
  [RefreshCw, 'Restoration', 'Conservation-led repair that keeps age and provenance visible.'],
  [Hammer, 'Trade projects', 'Furniture packages for architects, hotels and private interiors.'],
  [PackageCheck, 'India delivery', 'White-glove coordination across major Indian cities.'],
  [Ship, 'UK business', 'Trade, hospitality and export enquiries supported from Karaikudi.'],
]

export function Bespoke() {
  return (
    <section id="services" className="bg-foreground py-24 text-background md:py-36">
      <div className="mx-auto max-w-[1480px] px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-background/60">Services</p>
            <h2 className="mt-5 font-serif text-5xl leading-none md:text-7xl">Beyond the collection.</h2>
          </div>
          <div className="grid border-t border-background/20 md:col-span-7 md:col-start-6 md:grid-cols-2">
            {services.map(([Icon, title, copy]) => {
              const ServiceIcon = Icon as typeof Sofa
              return (
                <article key={title as string} className="border-b border-background/20 py-7 md:min-h-48 md:border-r md:px-7 md:py-8 even:md:border-r-0">
                  <ServiceIcon aria-hidden="true" />
                  <h3 className="mt-8 font-serif text-3xl">{title as string}</h3>
                  <p className="mt-3 text-sm leading-6 text-background/60">{copy as string}</p>
                </article>
              )
            })}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-6 border-t border-background/20 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl font-serif text-3xl">Have a room, an old piece, or a hard-to-find object in mind?</p>
          <a href="https://wa.me/919000000000?text=Hello%20Mithran%27s%20Atelier%2C%20I%27d%20like%20assistance%20with%20a%20piece." target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 border-b border-background pb-2 text-xs uppercase tracking-[0.15em]">
            Speak with the atelier <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
