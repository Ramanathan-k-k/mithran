import Image from 'next/image'

const groups = [
  ['Explore', ['Shop pieces', 'About the atelier', 'Services', 'Journal']],
  ['Client care', ['Delivery', 'Care guide', 'Returns', 'Privacy']],
  ['Visit', ['Karaikudi, Tamil Nadu', 'India retail', 'UK trade & export', 'Instagram']],
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1480px] px-4 md:px-8">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Image src="/images/mithrans-atelier-logo.png" alt="Mithran's Atelier" width={782} height={647} className="h-28 w-auto object-contain" />
            <p className="mt-5 max-w-sm text-sm leading-6">Karaikudi furniture and exclusive antiques, made and restored in Tamil Nadu.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:col-start-6 md:grid-cols-3">
            {groups.map(([title, links]) => (
              <div key={title as string} className="flex flex-col gap-3 text-xs">
                <p className="eyebrow mb-2 text-heading">{title as string}</p>
                {(links as string[]).map((link) => <a key={link} href={link.includes('Shop') ? '#published' : link.includes('About') ? '#about' : link.includes('Services') ? '#services' : '#top'} className="transition-colors hover:text-heading">{link}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-6 text-[10px] uppercase tracking-[0.14em] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Mithran&apos;s Atelier</p>
          <p>India retail · UK business enquiries</p>
        </div>
      </div>
    </footer>
  )
}
