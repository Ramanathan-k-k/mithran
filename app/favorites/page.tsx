import type { Metadata } from 'next'
import { FavoritesGallery } from '@/components/favorites-gallery'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { StoreOverlays } from '@/components/store-overlays'
import { StoreProvider } from '@/components/store-provider'

export const metadata: Metadata = {
  title: "Favorites | Mithran's Atelier",
  description: "Your saved furniture pieces from Mithran's Atelier.",
}

export default function FavoritesPage() {
  return (
    <StoreProvider>
      <SiteNav />
      <FavoritesGallery />
      <SiteFooter />
      <StoreOverlays />
    </StoreProvider>
  )
}
