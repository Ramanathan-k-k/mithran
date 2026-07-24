'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  ShoppingBag,
  Truck,
} from 'lucide-react'
import { useStore } from '@/components/store-provider'
import { AVAILABILITY_LABEL, formatINR, type Piece } from '@/lib/catalog'
import { cn } from '@/lib/utils'

const FABRICS = [
  { name: 'Ivory Linen', color: '#e7e1d3' },
  { name: 'Sand Boucle', color: '#cbb79a' },
  { name: 'Olive Linen', color: '#6f6f4e' },
  { name: 'Rust Cotton', color: '#9a5233' },
  { name: 'Indigo Cotton', color: '#3a4a63' },
  { name: 'Charcoal Weave', color: '#3b3a38' },
] as const

const WOOD_MATERIALS = ['Burma Teak', 'Indian Teak'] as const

const WOOD_FINISHES = [
  { name: 'Teak', color: '#9c6a34' },
  { name: 'Walnut', color: '#5a3b24' },
  { name: 'Black', color: '#2a2724' },
] as const

// Multiple gallery framings derived from the single product render, so the page
// presents a proper gallery even when no variant-specific assets are available.
const GALLERY_VIEWS = [
  { label: 'Full view', position: 'object-center', scale: 'scale-100' },
  { label: 'Profile', position: 'object-top', scale: 'scale-[1.4]' },
  { label: 'Material detail', position: 'object-bottom', scale: 'scale-[1.75]' },
] as const

export function ProductDetails({ piece }: { piece: Piece }) {
  const { isWished, toggleWish, addToCart } = useStore()
  const [view, setView] = useState(0)
  const [fabric, setFabric] = useState<(typeof FABRICS)[number]>(FABRICS[0])
  const [woodMaterial, setWoodMaterial] = useState<(typeof WOOD_MATERIALS)[number]>(WOOD_MATERIALS[0])
  const [woodFinish, setWoodFinish] = useState<(typeof WOOD_FINISHES)[number]>(WOOD_FINISHES[0])
  const [openSection, setOpenSection] = useState<string | null>('Features')
  const [pincode, setPincode] = useState('')
  const [pincodeResult, setPincodeResult] = useState<string | null>(null)
  const [shareNote, setShareNote] = useState<string | null>(null)

  const wished = isWished(piece.id)
  const sold = piece.availability === 'sold'
  const detail = piece.detail

  const sections = [
    { id: 'Features', body: detail?.materials ?? piece.description },
    { id: 'Dimensions', body: detail?.dimensions ?? 'Dimensions available on request.' },
    { id: 'Care Instructions', body: detail?.care ?? 'Dust with a soft dry cloth and keep away from direct heat.' },
    { id: 'Packaging & Delivery Information', body: detail?.delivery ?? 'Carefully crated and delivered by our logistics partners.' },
    { id: 'Additional Information', body: detail?.story ?? piece.description },
  ]

  const nextView = () => setView((prev) => (prev + 1) % GALLERY_VIEWS.length)
  const prevView = () => setView((prev) => (prev - 1 + GALLERY_VIEWS.length) % GALLERY_VIEWS.length)

  const handlePincode = (event: React.FormEvent) => {
    event.preventDefault()
    if (/^\d{6}$/.test(pincode.trim())) {
      setPincodeResult(`Delivers to ${pincode.trim()} in 7–10 working days.`)
    } else {
      setPincodeResult('Enter a valid 6-digit Indian pincode.')
    }
  }

  const handleAddToCart = () => {
    addToCart(piece.id, piece.name, {
      Fabric: fabric.name,
      'Wood Material': woodMaterial,
      'Wood Finish': woodFinish.name,
    })
  }

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    try {
      if (navigator.share) {
        await navigator.share({ title: piece.name, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setShareNote('Link copied')
      window.setTimeout(() => setShareNote(null), 1800)
    } catch {
      // sharing dismissed or unavailable — no action needed
    }
  }

  const activeView = GALLERY_VIEWS[view]

  return (
    <div className="bg-background px-4 py-10 md:px-8 md:py-16">
      <div className="mx-auto max-w-[1480px]">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.16em]">
          <Link href="/#top" className="transition-colors hover:text-primary">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#published" className="transition-colors hover:text-primary">{piece.category}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-heading">{piece.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={view}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={piece.image}
                    alt={`${piece.name} — ${activeView.label}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={cn('object-cover transition-transform duration-700', activeView.position, activeView.scale)}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Fabric tint — hints the selected upholstery over the base render */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                animate={{ backgroundColor: fabric.color, opacity: 0.4 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
              {/* Wood finish tint — warms or darkens the timber tones */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 mix-blend-multiply"
                animate={{ backgroundColor: woodFinish.color, opacity: 0.14 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />

              <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {piece.compareAt ? <span className="product-badge bg-primary text-primary-foreground">Sale</span> : null}
                  <span className="product-badge bg-background/90 text-foreground">{AVAILABILITY_LABEL[piece.availability]}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => toggleWish(piece.id, piece.name)}
                    aria-pressed={wished}
                    aria-label={`${wished ? 'Remove' : 'Add'} ${piece.name} ${wished ? 'from' : 'to'} wishlist`}
                    className="flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-foreground hover:text-background"
                  >
                    <Heart className={cn(wished && 'fill-current')} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label={`Share ${piece.name}`}
                    className="flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-foreground hover:text-background"
                  >
                    <Share2 aria-hidden="true" />
                  </button>
                </div>
              </div>

              {shareNote ? (
                <p className="absolute right-3 top-16 bg-foreground px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-background">{shareNote}</p>
              ) : null}

              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                <button type="button" onClick={prevView} aria-label="Previous image" className="flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-foreground hover:text-background">
                  <ChevronLeft aria-hidden="true" />
                </button>
                <button type="button" onClick={nextView} aria-label="Next image" className="flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-foreground hover:text-background">
                  <ChevronRight aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {GALLERY_VIEWS.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setView(index)}
                  aria-label={`Show ${item.label}`}
                  aria-current={view === index}
                  className={cn('relative aspect-square overflow-hidden bg-muted transition-opacity', view === index ? 'ring-1 ring-foreground' : 'opacity-70 hover:opacity-100')}
                >
                  <Image src={piece.image} alt="" fill sizes="120px" className={cn('object-cover', item.position, item.scale)} />
                  <span className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ backgroundColor: fabric.color, opacity: 0.4 }} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="eyebrow">{piece.category}</p>
            <h1 className="mt-3 text-balance font-serif text-5xl leading-none text-heading md:text-6xl">{piece.name}</h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed">{piece.description}</p>
            <p className="mt-6 text-2xl text-heading">
              {piece.price === null ? 'Price on request' : formatINR(piece.price)}
              {piece.compareAt ? <span className="ml-3 text-base text-muted-foreground line-through">{formatINR(piece.compareAt)}</span> : null}
            </p>

            {/* Fabric selector */}
            <div className="mt-9 border-t border-border pt-6">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Fabric</p>
                <p className="text-xs text-heading">{fabric.name}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {FABRICS.map((item) => {
                  const active = item.name === fabric.name
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setFabric(item)}
                      aria-pressed={active}
                      aria-label={`Select ${item.name} fabric`}
                      title={item.name}
                      className={cn('relative size-10 rounded-full border transition-transform hover:scale-105', active ? 'border-foreground ring-1 ring-foreground ring-offset-2 ring-offset-background' : 'border-border')}
                      style={{ backgroundColor: item.color }}
                    >
                      {active ? <Check className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-background mix-blend-difference" aria-hidden="true" /> : null}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Wood material selector */}
            <div className="mt-6">
              <p className="eyebrow">Wood Material</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {WOOD_MATERIALS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setWoodMaterial(item)}
                    aria-pressed={woodMaterial === item}
                    className={cn('filter-chip min-h-10', woodMaterial === item && 'bg-foreground text-background')}
                  >
                    {woodMaterial === item ? <Check aria-hidden="true" /> : null}
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Wood finish selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Wood Finish</p>
                <p className="text-xs text-heading">{woodFinish.name}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {WOOD_FINISHES.map((item) => {
                  const active = item.name === woodFinish.name
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setWoodFinish(item)}
                      aria-pressed={active}
                      aria-label={`Select ${item.name} finish`}
                      className="flex items-center gap-2"
                    >
                      <span
                        className={cn('size-8 rounded-full border transition-transform hover:scale-105', active ? 'border-foreground ring-1 ring-foreground ring-offset-2 ring-offset-background' : 'border-border')}
                        style={{ backgroundColor: item.color }}
                      />
                      <span className={cn('text-xs', active ? 'text-heading' : 'text-foreground')}>{item.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Add to cart */}
            <div className="mt-9 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
              <button
                type="button"
                disabled={sold}
                onClick={handleAddToCart}
                className="inline-flex flex-1 items-center justify-center gap-2 bg-foreground px-6 py-4 text-xs uppercase tracking-[0.15em] text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ShoppingBag aria-hidden="true" />
                {sold ? 'Sold' : 'Add to cart'}
              </button>
              <button
                type="button"
                onClick={() => toggleWish(piece.id, piece.name)}
                className="inline-flex items-center justify-center gap-2 border border-foreground px-6 py-4 text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                <Heart className={cn(wished && 'fill-current')} aria-hidden="true" />
                {wished ? 'Saved' : 'Wishlist'}
              </button>
            </div>

            {/* Availability checker */}
            <form onSubmit={handlePincode} className="mt-6 border-t border-border pt-6">
              <label htmlFor="pincode" className="eyebrow flex items-center gap-2">
                <Truck aria-hidden="true" /> Check availability
              </label>
              <div className="mt-3 flex gap-2">
                <input
                  id="pincode"
                  inputMode="numeric"
                  maxLength={6}
                  value={pincode}
                  onChange={(event) => setPincode(event.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit pincode"
                  className="min-h-11 flex-1 border border-border bg-transparent px-4 text-sm text-heading outline-none focus:border-foreground"
                />
                <button type="submit" className="control-button">Check</button>
              </div>
              {pincodeResult ? <p className="mt-3 text-xs leading-relaxed text-heading">{pincodeResult}</p> : null}
            </form>

            {/* Expandable sections */}
            <div className="mt-6 border-t border-border">
              {sections.map((section) => {
                const open = openSection === section.id
                return (
                  <div key={section.id} className="border-b border-border">
                    <button
                      type="button"
                      onClick={() => setOpenSection(open ? null : section.id)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    >
                      <span className="text-xs uppercase tracking-[0.14em] text-heading">{section.id}</span>
                      <ChevronDown className={cn('transition-transform duration-300', open && 'rotate-180')} aria-hidden="true" />
                    </button>
                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 text-sm leading-relaxed">{section.body}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
