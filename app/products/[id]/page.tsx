import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetails } from '@/components/product-details'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { StoreOverlays } from '@/components/store-overlays'
import { StoreProvider } from '@/components/store-provider'
import { getPiece, PIECES } from '@/lib/catalog'

export function generateStaticParams() {
  return PIECES.map((piece) => ({ id: piece.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const piece = getPiece(id)
  if (!piece) return { title: "Product | Mithran's Atelier" }
  return {
    title: `${piece.name} | Mithran's Atelier`,
    description: piece.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const piece = getPiece(id)
  if (!piece) notFound()

  return (
    <StoreProvider>
      <SiteNav />
      <main>
        <ProductDetails piece={piece} />
      </main>
      <SiteFooter />
      <StoreOverlays />
    </StoreProvider>
  )
}
