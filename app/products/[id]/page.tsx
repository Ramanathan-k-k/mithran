import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, Plus } from 'lucide-react'
import { ProductConfigurator } from '@/components/product-configurator'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { StoreOverlays } from '@/components/store-overlays'
import { StoreProvider } from '@/components/store-provider'
import { AVAILABILITY_LABEL, formatINR, getConfig, getPiece, PIECES } from '@/lib/catalog'

export function generateStaticParams() {
  return PIECES.map((piece) => ({ id: piece.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const piece = getPiece(id)
  if (!piece) return { title: 'Piece not found · Mithran\u2019s Atelier' }
  return {
    title: `${piece.name} · Mithran\u2019s Atelier`,
    description: piece.description,
  }
}

const INFO_SECTIONS = [
  {
    title: 'Features',
    body: 'Hand-joined solid teak sourced and built in Karaikudi. Traditional mortise-and-tenon joinery, hand-finished surfaces, and cane woven by local artisans. Each piece is made to order in small runs.',
  },
  {
    title: 'Care instructions',
    body: 'Dust with a soft dry cloth. Keep out of prolonged direct sunlight and away from radiators. Treat teak surfaces with natural wood oil twice a year. Spot-clean upholstery; professional cleaning recommended for deep stains.',
  },
  {
    title: 'Packaging & delivery',
    body: 'Made-to-order pieces ship in 6\u20138 weeks, protected in reusable padded crating. White-glove delivery and placement is available across India; trade enquiries welcome for the UK.',
  },
]

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const piece = getPiece(id)
  if (!piece) notFound()

  const config = getConfig(id)

  return (
    <StoreProvider>
      <SiteNav />
      <main className="bg-background">
        <div className="mx-auto max-w-[1480px] px-4 py-6 md:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/#published" className="transition-colors hover:text-foreground">{piece.category}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">{piece.name}</span>
          </nav>
        </div>

        <div className="mx-auto max-w-[1480px] px-4 pb-24 md:px-8 md:pb-36">
          {config ? (
            <ProductConfigurator piece={piece} config={config} />
          ) : (
            <OneOfOne piece={piece} />
          )}

          {/* Product information */}
          <div className="mt-16 grid gap-x-14 gap-y-8 border-t border-border pt-10 md:mt-24 md:grid-cols-2">
            <div>
              <p className="eyebrow">The piece</p>
              <h2 className="mt-3 font-serif text-4xl leading-none text-heading md:text-5xl text-balance">
                Built to be lived with, for generations
              </h2>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {INFO_SECTIONS.map((section) => (
                <details key={section.title} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-sm uppercase tracking-[0.12em] text-heading">
                    {section.title}
                    <Plus className="transition-transform group-open:rotate-45" aria-hidden="true" />
                  </summary>
                  <p className="pb-6 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
                </details>
              ))}
            </div>
          </div>

          {/* You may also like */}
          <RelatedPieces currentId={piece.id} />
        </div>
      </main>
      <SiteFooter />
      <StoreOverlays />
    </StoreProvider>
  )
}

function OneOfOne({ piece }: { piece: ReturnType<typeof getPiece> }) {
  if (!piece) return null
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image src={piece.image} alt={piece.alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      </div>
      <div className="flex flex-col">
        <p className="eyebrow">{piece.category} · One of one</p>
        <h1 className="mt-3 font-serif text-4xl leading-none text-heading md:text-6xl">{piece.name}</h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed">{piece.description}</p>
        <p className="mt-6 text-2xl text-heading">
          {piece.price === null ? 'Price on request' : formatINR(piece.price)}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{AVAILABILITY_LABEL[piece.availability]} · Restored antique</p>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
          Antiques are single, restored pieces and are not configurable. Enquire for provenance, condition notes, and availability.
        </p>
        <a
          href="#services"
          className="mt-8 inline-flex w-fit items-center justify-center gap-2 bg-foreground px-8 py-4 text-xs uppercase tracking-[0.16em] text-background transition-opacity hover:opacity-90"
        >
          Enquire about this piece
        </a>
      </div>
    </div>
  )
}

function RelatedPieces({ currentId }: { currentId: string }) {
  const related = PIECES.filter((p) => p.id !== currentId).slice(0, 3)
  return (
    <section className="mt-20 border-t border-border pt-10 md:mt-28">
      <div className="mb-8 flex items-center gap-2">
        <ChevronLeft className="rotate-180" aria-hidden="true" />
        <h2 className="font-serif text-3xl text-heading md:text-4xl">You may also like</h2>
      </div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-3">
        {related.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`} className="group">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <Image src={p.image} alt={p.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            </div>
            <p className="eyebrow mt-4">{p.category}</p>
            <h3 className="mt-1 font-serif text-2xl text-heading">{p.name}</h3>
            <p className="mt-1 text-sm text-heading">{p.price === null ? 'Price on request' : formatINR(p.price)}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
