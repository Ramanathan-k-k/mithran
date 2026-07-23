'use client'

import Image from 'next/image'
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { useStore } from '@/components/store-provider'

const links = [
  ['#categories', 'Shop'],
  ['#published', 'New pieces'],
  ['#about', 'About'],
  ['#services', 'Services'],
]

function Count({ children }: { children: number }) {
  if (!children) return null
  return (
    <span className="absolute -right-1.5 -top-1.5 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] leading-4 text-primary-foreground">
      {children}
    </span>
  )
}

export function SiteNav() {
  const { wishlistCount, cartCount, panel, openPanel, closePanel } = useStore()
  const menuOpen = panel === 'menu'

  return (
    <header className="relative z-50 bg-background">
      <div className="bg-foreground px-4 py-2 text-center text-[10px] uppercase tracking-[0.18em] text-background">
        Made in Karaikudi <span aria-hidden="true">·</span> India retail{' '}
        <span aria-hidden="true">·</span> UK trade enquiries
      </div>

      <div className="mx-auto flex max-w-[1480px] items-center justify-between px-4 py-4 md:px-8 md:py-5">
        <button
          type="button"
          className="flex size-10 items-center justify-center md:hidden"
          onClick={() => (menuOpen ? closePanel() : openPanel('menu'))}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="text-[11px] uppercase tracking-[0.16em] transition-colors hover:text-primary">
              {label}
            </a>
          ))}
        </nav>

        <a href="#top" aria-label="Mithran's Atelier home" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/images/mithrans-atelier-logo.png"
            alt="Mithran's Atelier"
            width={782}
            height={647}
            priority
            className="h-14 w-auto object-contain md:h-20"
          />
        </a>

        <div className="ml-auto flex items-center gap-1 md:gap-3">
          <a href="#published" className="hidden size-10 items-center justify-center sm:flex" aria-label="Search published pieces">
            <Search aria-hidden="true" />
          </a>
          <a href="#published" className="relative flex size-10 items-center justify-center" aria-label={`Wishlist, ${wishlistCount} items`}>
            <Heart aria-hidden="true" />
            <Count>{wishlistCount}</Count>
          </a>
          <button type="button" className="hidden size-10 items-center justify-center sm:flex" onClick={() => openPanel('login')} aria-label="Log in">
            <UserRound aria-hidden="true" />
          </button>
          <button type="button" className="relative flex size-10 items-center justify-center" onClick={() => document.querySelector('#published')?.scrollIntoView()} aria-label={`Cart, ${cartCount} items`}>
            <ShoppingBag aria-hidden="true" />
            <Count>{cartCount}</Count>
          </button>
        </div>
      </div>

      <div className="hidden border-y border-border px-8 py-3 md:block">
        <nav className="mx-auto flex max-w-5xl items-center justify-center gap-10" aria-label="Categories">
          {['Seating', 'Tables', 'Swings', 'Storage', 'Antiques'].map((label) => (
            <a key={label} href={`#category-${label.toLowerCase()}`} className="text-[10px] uppercase tracking-[0.18em] transition-colors hover:text-primary">
              {label}
            </a>
          ))}
        </nav>
      </div>

      {menuOpen ? (
        <nav id="mobile-menu" aria-label="Mobile" className="absolute inset-x-0 top-full border-y border-border bg-background px-5 py-5 shadow-sm md:hidden">
          <div className="flex flex-col">
            {links.map(([href, label]) => (
              <a key={href} href={href} onClick={closePanel} className="border-b border-border py-4 font-serif text-3xl text-heading">
                {label}
              </a>
            ))}
            <button type="button" onClick={() => openPanel('login')} className="mt-5 inline-flex items-center justify-center gap-2 border border-foreground px-5 py-3 text-xs uppercase tracking-[0.15em]">
              <UserRound aria-hidden="true" /> Log in
            </button>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
