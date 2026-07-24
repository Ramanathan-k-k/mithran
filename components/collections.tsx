'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Check, ChevronDown, Heart, ShoppingBag, SlidersHorizontal } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useRef, useState } from 'react'
import { useStore } from '@/components/store-provider'
import { AVAILABILITY_LABEL, CATEGORIES, formatINR, getProductHref, PIECES, type Category } from '@/lib/catalog'
import { cn } from '@/lib/utils'

const SERIES = [
  { label: 'The Naarkali Series', pieces: ['naarkali'] },
  { label: 'The Metthu-Naarkali Series', pieces: ['naarkali', 'padukkai'] },
  { label: 'The Mesai Series', pieces: ['mesai'] },
  { label: 'The Padukkai Series', pieces: ['padukkai'] },
  { label: 'The Alamaari Series', pieces: ['karaikudi-console', 'antique-cabinet'] },
  { label: 'The Oonjal Series', pieces: ['oonjal'] },
  { label: 'The Kannadi Series', pieces: [] },
  { label: 'The Thalluvandi Series', pieces: [] },
  { label: 'The Paagangal Series', pieces: [] },
] as const

type SeriesLabel = (typeof SERIES)[number]['label']

export function Collections() {
  const [category, setCategory] = useState<'All' | Category>('All')
  const [series, setSeries] = useState<SeriesLabel | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 })
  const [availability, setAvailability] = useState('all')
  const [sort, setSort] = useState('newest')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { isWished, toggleWish, addToCart } = useStore()

  const visible = useMemo(() => {
    const selectedSeries = SERIES.find((item) => item.label === series)
    const list = PIECES.filter((piece) =>
      (category === 'All' || piece.category === category) &&
      (!selectedSeries || selectedSeries.pieces.some((id) => id === piece.id)) &&
      (availability === 'all' || piece.availability === availability),
    )
    return [...list].sort((a, b) => {
      if (sort === 'price-low') return (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER)
      if (sort === 'price-high') return (b.price ?? -1) - (a.price ?? -1)
      return b.published - a.published
    })
  }, [category, series, availability, sort])

  const selectSeries = (next: SeriesLabel, button: HTMLButtonElement) => {
    setSeries(next)
    setCategory('All')
    button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  const beginDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const slider = sliderRef.current
    if (!slider) return
    dragRef.current = { active: true, startX: event.clientX, scrollLeft: slider.scrollLeft }
  }

  const dragSlider = (event: React.PointerEvent<HTMLDivElement>) => {
    const slider = sliderRef.current
    if (!slider || !dragRef.current.active) return
    slider.scrollLeft = dragRef.current.scrollLeft - (event.clientX - dragRef.current.startX)
  }

  const endDrag = () => {
    dragRef.current.active = false
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
          <div
            ref={sliderRef}
            role="tablist"
            aria-label="Furniture series"
            onPointerDown={beginDrag}
            onPointerMove={dragSlider}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className="flex cursor-grab snap-x snap-mandatory gap-3 overflow-x-auto pb-2 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {SERIES.map((item) => {
              const active = series === item.label
              return (
                <button
                  key={item.label}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={(event) => selectSeries(item.label, event.currentTarget)}
                  className="relative shrink-0 snap-center overflow-hidden rounded-full border border-border px-5 py-3 text-sm text-heading transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {active ? (
                    <motion.span
                      layoutId="active-series"
                      className="absolute inset-0 bg-foreground"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className={cn('relative transition-colors', active && 'text-background')}>{item.label}</span>
                </button>
              )
            })}
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
                    <button key={item} type="button" onClick={() => { setCategory(item); setSeries(null) }} className={cn('filter-chip', category === item && !series && 'bg-foreground text-background')}>
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

          <motion.div layout className="mt-12 grid grid-cols-1 gap-x-4 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((piece) => {
                const wished = isWished(piece.id)
                const sold = piece.availability === 'sold'
                return (
                  <motion.article
                    layout
                    key={piece.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="group"
                  >
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <Image src={piece.image} alt={piece.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                    <Link href={getProductHref(piece)} aria-label={`View ${piece.name}`} className="absolute inset-0 z-[1]" />
                    <div className="absolute inset-x-3 top-3 z-10 flex items-start justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        {piece.compareAt ? <span className="product-badge bg-primary text-primary-foreground">Sale</span> : null}
                        <span className="product-badge bg-background/90 text-foreground">{AVAILABILITY_LABEL[piece.availability]}</span>
                      </div>
                      <button type="button" onClick={() => toggleWish(piece.id, piece.name)} aria-pressed={wished} aria-label={`${wished ? 'Remove' : 'Add'} ${piece.name} ${wished ? 'from' : 'to'} wishlist`} className="flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-foreground hover:text-background">
                        <Heart className={cn(wished && 'fill-current')} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-5 border-t border-border pt-4">
                    <div>
                      <p className="eyebrow">{piece.category}</p>
                      <h3 className="mt-2 font-serif text-3xl text-heading"><Link href={getProductHref(piece)} className="transition-colors hover:text-primary">{piece.name}</Link></h3>
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
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 ? (
            <div className="mt-12 border-y border-border py-20 text-center">
              <p className="font-serif text-4xl text-heading">No pieces match this edit.</p>
              <button type="button" onClick={() => { setCategory('All'); setSeries(null); setAvailability('all') }} className="mt-5 border-b border-foreground pb-1 text-xs uppercase tracking-[0.15em]">Clear filters</button>
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}
