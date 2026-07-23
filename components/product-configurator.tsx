'use client'

import Image from 'next/image'
import { Check, Heart, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useStore } from '@/components/store-provider'
import { DimensionsDiagram } from '@/components/dimensions-diagram'
import {
  formatINR,
  resolveVariantImage,
  type ImageFamily,
  type MaterialOption,
  type Piece,
  type ProductConfig,
} from '@/lib/catalog'
import { cn } from '@/lib/utils'

export function ProductConfigurator({ piece, config }: { piece: Piece; config: ProductConfig }) {
  const { isWished, toggleWish, addToCart } = useStore()
  const [sizeId, setSizeId] = useState(config.sizes[0].id)
  const [materialId, setMaterialId] = useState(config.materials[0].id)
  const [qty, setQty] = useState(1)

  const size = config.sizes.find((s) => s.id === sizeId) ?? config.sizes[0]
  const material = config.materials.find((m) => m.id === materialId) ?? config.materials[0]

  const heroImage = resolveVariantImage(piece, config, material.family)

  // Distinct photos available, in display order, for the thumbnail rail.
  const gallery = useMemo(() => {
    const seen = new Map<string, ImageFamily>()
    const families: ImageFamily[] = [config.baseFamily, ...(Object.keys(config.variantImages) as ImageFamily[])]
    for (const fam of families) {
      const src = resolveVariantImage(piece, config, fam)
      if (!seen.has(src)) seen.set(src, fam)
    }
    return [...seen.entries()].map(([src, family]) => ({ src, family }))
  }, [piece, config])

  const unitPrice = (piece.price ?? 0) + size.priceDelta + material.priceDelta
  const total = unitPrice * qty
  const points = Math.round(total / 100)

  const groupedMaterials = useMemo(() => {
    const groups = new Map<string, MaterialOption[]>()
    for (const m of config.materials) {
      const list = groups.get(m.group) ?? []
      list.push(m)
      groups.set(m.group, list)
    }
    return [...groups.entries()]
  }, [config.materials])

  const wished = isWished(piece.id)

  const selectFamily = (family: ImageFamily) => {
    const match = config.materials.find((m) => m.family === family)
    if (match) setMaterialId(match.id)
  }

  const handleAdd = () => {
    addToCart(piece.id, `${piece.name} · ${size.name} · ${material.name} · ×${qty}`)
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      {/* Gallery — reacts to the selected material */}
      <div className="flex flex-col gap-4">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <Image
            key={heroImage}
            src={heroImage || '/placeholder.svg'}
            alt={`${piece.name} in ${material.name}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 bg-background/90 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-foreground">
            {material.name}
          </span>
        </div>
        {gallery.length > 1 ? (
          <div className="flex gap-3">
            {gallery.map((shot) => (
              <button
                key={shot.src}
                type="button"
                onClick={() => selectFamily(shot.family)}
                aria-label={`View ${shot.family} finish`}
                aria-pressed={shot.src === heroImage}
                className={cn(
                  'relative aspect-square w-20 shrink-0 overflow-hidden bg-muted ring-offset-2 ring-offset-background transition',
                  shot.src === heroImage ? 'ring-2 ring-foreground' : 'opacity-70 hover:opacity-100',
                )}
              >
                <Image src={shot.src || '/placeholder.svg'} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Configuration panel */}
      <div className="flex flex-col">
        <p className="eyebrow">{piece.category}</p>
        <h1 className="mt-3 font-serif text-4xl leading-none text-heading md:text-6xl">{piece.name}</h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed">{piece.description}</p>

        <p className="mt-6 text-2xl text-heading">{formatINR(unitPrice)}</p>
        <p className="mt-1 text-xs text-muted-foreground">Excl. of GST · Made to order in Karaikudi</p>

        {/* Size selector */}
        <fieldset className="mt-9">
          <legend className="eyebrow mb-3">Select size</legend>
          <div className="flex flex-wrap gap-2">
            {config.sizes.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSizeId(s.id)}
                className={cn(
                  'flex flex-col items-start border px-4 py-2 text-left transition-colors',
                  s.id === sizeId ? 'border-foreground bg-foreground text-background' : 'border-border hover:border-foreground',
                )}
              >
                <span className="text-xs uppercase tracking-[0.12em]">{s.name}</span>
                <span className="font-mono text-[11px] opacity-80">{`${s.w}×${s.d}×${s.h}`}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* Live dimensions diagram */}
        <div className="mt-5 max-w-[240px]">
          <DimensionsDiagram size={size} />
        </div>

        {/* Material selector */}
        <fieldset className="mt-9">
          <legend className="eyebrow mb-1">{config.materialLabel}</legend>
          <p className="mb-4 text-xs text-muted-foreground">
            {config.materials.length} finishes · selected <span className="text-foreground">{material.name}</span>
          </p>
          <div className="flex flex-col gap-5">
            {groupedMaterials.map(([group, list]) => (
              <div key={group}>
                <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{group}</p>
                <div className="flex flex-wrap gap-2.5">
                  {list.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMaterialId(m.id)}
                      title={`${m.name}${m.priceDelta ? ` · +${formatINR(m.priceDelta)}` : ''}`}
                      aria-label={m.name}
                      aria-pressed={m.id === materialId}
                      className={cn(
                        'relative size-9 rounded-full ring-offset-2 ring-offset-background transition',
                        m.id === materialId ? 'ring-2 ring-foreground' : 'ring-1 ring-border hover:ring-foreground',
                      )}
                      style={{ backgroundColor: m.swatch }}
                    >
                      {m.id === materialId ? (
                        <Check className="absolute inset-0 m-auto size-4 text-background mix-blend-difference" aria-hidden="true" />
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Quantity + price summary */}
        <div className="mt-9 flex flex-wrap items-end justify-between gap-6 border-t border-border pt-6">
          <div>
            <p className="eyebrow mb-3">Quantity</p>
            <div className="flex items-center border border-border">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex size-11 items-center justify-center hover:bg-muted" aria-label="Decrease quantity">
                <Minus aria-hidden="true" />
              </button>
              <span className="w-10 text-center text-sm" aria-live="polite">{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} className="flex size-11 items-center justify-center hover:bg-muted" aria-label="Increase quantity">
                <Plus aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="eyebrow mb-1">Total</p>
            <p className="text-3xl text-heading">{formatINR(total)}</p>
            <p className="mt-1 text-xs text-muted-foreground">Earn {points.toLocaleString('en-IN')} points</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleAdd}
            className="flex flex-1 items-center justify-center gap-2 bg-foreground py-4 text-xs uppercase tracking-[0.16em] text-background transition-opacity hover:opacity-90"
          >
            <ShoppingBag aria-hidden="true" /> Add to cart
          </button>
          <button
            type="button"
            onClick={() => toggleWish(piece.id, piece.name)}
            aria-pressed={wished}
            aria-label={`${wished ? 'Remove from' : 'Save to'} wishlist`}
            className="flex size-[54px] shrink-0 items-center justify-center border border-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            <Heart className={cn(wished && 'fill-current')} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
