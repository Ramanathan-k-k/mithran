import { Bespoke } from '@/components/bespoke'
import { Collections } from '@/components/collections'
import { Hero } from '@/components/hero'
import { ParallaxBand } from '@/components/parallax-band'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { StoreOverlays } from '@/components/store-overlays'
import { StoreProvider } from '@/components/store-provider'
import { Story } from '@/components/story'

export default function Page() {
  return (
    <StoreProvider>
      <SiteNav />
      <main>
        <Hero />
        <Collections />
        <Story />
        <ParallaxBand />
        <Bespoke />
      </main>
      <SiteFooter />
      <StoreOverlays />
    </StoreProvider>
  )
}
