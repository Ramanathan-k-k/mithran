'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Check, ChevronDown, Heart, ShoppingBag, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useStore } from '@/components/store-provider'
import { AVAILABILITY_LABEL, CATEGORIES, formatINR, PIECES, type Category } from '@/lib/catalog'
import { cn } from '@/lib/utils'

export function Collections() {
  const [category, setCategory] = useState<'All' | Category>('All')
  const [availability, setAvailability] = useState('all')
  const [sort, setSort] = useState('newest')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { isWished, toggleWish, addToCart } = useStore()

  const visible = useMemo(() => {
    const list = PIECES.filter((piece) =>
      (category === 'All' || piece.category === category) &&
      (availability === 'all' || piece.availability === availability),
    )
    return [...list].sort((a, b) => {
      if (sort === 'price-low') return (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER)
      if (sort === 'price-high') return (b.price ?? -1) - (a.price ?? -1)
      return b.published - a.published
    })
  }, [category, availability, sort])

  const selectCategory = (next: Category) => {
    setCategory(next)
    document.querySelector('#published')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section id="categories" className="pb-24 md:pb-36">
        <div className="mx-auto max-w-[1480px] px-4 md:px-8">
          <div className="mb-10 flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Explore the atelier</p>
              <h2 className="mt-3 font-serif text-5xl leading-none text-heading md:text-7xl">Shop by category</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed">New furniture made in small runs, alongside exclusive antiques sourced across Chettinad.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {CATEGORIES.map((item) => (
              <button id={`category-${item.id.toLowerCase()}`} key={item.id} type="button" onClick={() => selectCategory(item.id)} className="group text-left focus-visible:outline-none">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <Image src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]" />
                </div>
                <h3 className="mt-4 font-serif text-2xl text-heading">{item.id}</h3>
                <p className="mt-1 hidden text-xs leading-relaxed md:block">{item.blurb}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="published" className="border-t border-border pb-28 pt-16 md:pb-40 md:pt-24">
        <div className="mx-auto max-w-[1480px] px-4 md:px-8">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">The current edit</p>
              <h2 className="mt-3 font-serif text-5xl leading-none text-heading md:text-7xl">Already published pieces</h2>
              <p className="mt-4 text-sm">{visible.length} pieces · Prices include GST for India</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setFiltersOpen((v) => !v)} aria-expanded={filtersOpen} className="control-button">
                <SlidersHorizontal aria-hidden="true" /> Filter
              </button>
              <label className="relative">
                <span className="sr-only">Sort pieces</span>
                <select value={sort} onChange={(event) => setSort(event.target.value)} className="control-select appearance-none pr-10">
                  <option value="newest">Newest first</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              </label>
            </div>
          </div>

          {filtersOpen ? (
            <div className="mt-7 grid gap-6 border-y border-border py-6 md:grid-cols-2">
              <fieldset>
                <legend className="eyebrow mb-3">Category</legend>
                <div className="flex flex-wrap gap-2">
                  {(['All', ...CATEGORIES.map((item) => item.id)] as const).map((item) => (
                    <button key={item} type="button" onClick={() => setCategory(item)} className={cn('filter-chip', category === item && 'bg-foreground text-background')}>
                      {category === item ? <Check aria-hidden="true" /> : null}{item}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="eyebrow mb-3">Availability</legend>
                <div className="flex flex-wrap gap-2">
                  {[['all', 'All'], ['in-stock', 'In stock'], ['made-to-order', 'Made to order']].map(([value, label]) => (
                    <button key={value} type="button" onClick={() => setAvailability(value)} className={cn('filter-chip', availability === value && 'bg-foreground text-background')}>
                      {availability === value ? <Check aria-hidden="true" /> : null}{label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          ) : null}

          <div className="mt-12 grid grid-cols-1 gap-x-4 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((piece) => {
              const wished = isWished(piece.id)
              const sold = piece.availability === 'sold'
              return (
                <article key={piece.id} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <Link href={`/products/${piece.id}`} aria-label={`View ${piece.name}`} className="absolute inset-0 z-10">
                      <Image src={piece.image} alt={piece.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                    </Link>
                    <div className="pointer-events-none absolute inset-x-3 top-3 z-20 flex items-start justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        {piece.compareAt ? <span className="product-badge bg-primary text-primary-foreground">Sale</span> : null}
                        <span className="product-badge bg-background/90 text-foreground">{AVAILABILITY_LABEL[piece.availability]}</span>
                      </div>
                      <button type="button" onClick={() => toggleWish(piece.id, piece.name)} aria-pressed={wished} aria-label={`${wished ? 'Remove' : 'Add'} ${piece.name} ${wished ? 'from' : 'to'} wishlist`} className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-foreground hover:text-background">
                        <Heart className={cn(wished && 'fill-current')} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-5 border-t border-border pt-4">
                    <div>
                      <p className="eyebrow">{piece.category}</p>
                      <h3 className="mt-2 font-serif text-3xl text-heading">
                        <Link href={`/products/${piece.id}`} className="transition-colors hover:text-primary">{piece.name}</Link>
                      </h3>
                      <p className="mt-2 max-w-sm text-xs leading-relaxed">{piece.description}</p>
                      <p className="mt-4 text-sm text-heading">
                        {piece.price === null ? 'Price on request' : formatINR(piece.price)}
                        {piece.compareAt ? <span className="ml-2 text-muted-foreground line-through">{formatINR(piece.compareAt)}</span> : null}
                      </p>
                    </div>
                    <button type="button" disabled={sold} onClick={() => addToCart(piece.id, piece.name)} aria-label={sold ? `${piece.name} is sold` : `Add ${piece.name} to cart`} className="flex size-11 shrink-0 items-center justify-center border border-foreground text-foreground transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-30">
                      <ShoppingBag aria-hidden="true" />
                    </button>
                  </div>
                </article>
              )
            })}
          </div>

          {visible.length === 0 ? (
            <div className="mt-12 border-y border-border py-20 text-center">
              <p className="font-serif text-4xl text-heading">No pieces match this edit.</p>
              <button type="button" onClick={() => { setCategory('All'); setAvailability('all') }} className="mt-5 border-b border-foreground pb-1 text-xs uppercase tracking-[0.15em]">Clear filters</button>
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}
