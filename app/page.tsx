import { Bespoke } from '@/components/bespoke'
import { Collections } from '@/components/collections'
import { Hero } from '@/components/hero'
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
        <Bespoke />
      </main>
      <SiteFooter />
      <StoreOverlays />
    </StoreProvider>
  )
}
