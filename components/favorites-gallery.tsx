'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useStore } from '@/components/store-provider'
import { AVAILABILITY_LABEL, formatINR, getProductHref, PIECES } from '@/lib/catalog'

export function FavoritesGallery() {
  const { wishlist, wishlistReady, toggleWish, addToCart } = useStore()
  const favorites = PIECES.filter((piece) => wishlist.includes(piece.id))

  if (!wishlistReady) {
    return <div className="min-h-[42rem]" aria-label="Loading favorites" />
  }

  return (
    <main className="min-h-[42rem] bg-background px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1480px]">
        <div className="border-b border-border pb-8 md:flex md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Your edit</p>
            <h1 className="mt-4 text-balance font-serif text-5xl text-heading md:text-7xl">Favorites</h1>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.15em] md:mt-0">
            {favorites.length} {favorites.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>

        {favorites.length ? (
          <motion.div layout className="mt-12 grid grid-cols-1 gap-x-4 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {favorites.map((piece) => {
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
                      <Image
                        src={piece.image}
                        alt={piece.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                      <Link href={getProductHref(piece)} aria-label={`View ${piece.name}`} className="absolute inset-0 z-[1]" />
                      <div className="absolute inset-x-3 top-3 z-10 flex items-start justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                          {piece.compareAt ? <span className="product-badge bg-primary text-primary-foreground">Sale</span> : null}
                          <span className="product-badge bg-background/90 text-foreground">{AVAILABILITY_LABEL[piece.availability]}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleWish(piece.id, piece.name)}
                          aria-pressed="true"
                          aria-label={`Remove ${piece.name} from favorites`}
                          className="flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-foreground hover:text-background"
                        >
                          <Heart className="fill-current" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-5 border-t border-border pt-4">
                      <div>
                        <p className="eyebrow">{piece.category}</p>
                        <h2 className="mt-2 font-serif text-3xl text-heading"><Link href={getProductHref(piece)} className="transition-colors hover:text-primary">{piece.name}</Link></h2>
                        <p className="mt-2 max-w-sm text-xs leading-relaxed">{piece.description}</p>
                        <p className="mt-4 text-sm text-heading">
                          {piece.price === null ? 'Price on request' : formatINR(piece.price)}
                          {piece.compareAt ? <span className="ml-2 text-muted-foreground line-through">{formatINR(piece.compareAt)}</span> : null}
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled={sold}
                        onClick={() => addToCart(piece.id, piece.name)}
                        aria-label={sold ? `${piece.name} is sold` : `Add ${piece.name} to cart`}
                        className="flex size-11 shrink-0 items-center justify-center border border-foreground text-foreground transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <ShoppingBag aria-hidden="true" />
                      </button>
                    </div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <section className="flex min-h-96 flex-col items-center justify-center border-b border-border text-center">
            <Heart className="size-8" strokeWidth={1.25} aria-hidden="true" />
            <h2 className="mt-6 text-balance font-serif text-4xl text-heading md:text-5xl">You haven&apos;t liked any pieces yet</h2>
            <p className="mt-4 max-w-md text-sm leading-6">Save the pieces that speak to you and they&apos;ll appear here.</p>
            <a href="/#top" className="mt-8 bg-foreground px-6 py-4 text-xs uppercase tracking-[0.15em] text-background transition-opacity hover:opacity-80">
              Continue Exploring
            </a>
          </section>
        )}
      </div>
    </main>
  )
}
