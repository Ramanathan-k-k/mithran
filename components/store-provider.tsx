'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type PanelName = 'menu' | 'login' | 'cart' | null

export interface CartItem {
  key: string
  id: string
  quantity: number
  options: Record<string, string>
}

interface StoreState {
  wishlist: string[]
  cart: CartItem[]
  panel: PanelName
  toast: string | null
  wishlistCount: number
  wishlistReady: boolean
  cartCount: number
  isWished: (id: string) => boolean
  toggleWish: (id: string, label: string) => void
  addToCart: (id: string, label: string, options?: Record<string, string>) => void
  updateCartQuantity: (key: string, quantity: number) => void
  removeFromCart: (key: string) => void
  openPanel: (name: Exclude<PanelName, null>) => void
  closePanel: () => void
}

const StoreContext = createContext<StoreState | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([])
  const [cart, setCart] = useState<string[]>([])
  const [panel, setPanel] = useState<PanelName>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [wishlistReady, setWishlistReady] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('mithrans-wishlist')
      if (saved) {
        const parsed: unknown = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
          setWishlist(parsed)
        }
      }
    } catch {
      window.localStorage.removeItem('mithrans-wishlist')
    } finally {
      setWishlistReady(true)
    }
  }, [])

  useEffect(() => {
    if (wishlistReady) {
      window.localStorage.setItem('mithrans-wishlist', JSON.stringify(wishlist))
    }
  }, [wishlist, wishlistReady])

  const flash = useCallback((message: string) => {
    setToast(message)
    window.clearTimeout((flash as unknown as { t?: number }).t)
    ;(flash as unknown as { t?: number }).t = window.setTimeout(
      () => setToast(null),
      2200,
    )
  }, [])

  const toggleWish = useCallback(
    (id: string, label: string) => {
      setWishlist((prev) => {
        const has = prev.includes(id)
        flash(has ? `Removed ${label} from wishlist` : `Saved ${label} to wishlist`)
        return has ? prev.filter((x) => x !== id) : [...prev, id]
      })
    },
    [flash],
  )

  const addToCart = useCallback(
    (id: string, label: string) => {
      setCart((prev) => [...prev, id])
      flash(`Added ${label} to cart`)
    },
    [flash],
  )

  const value = useMemo<StoreState>(
    () => ({
      wishlist,
      cart,
      panel,
      toast,
      wishlistCount: wishlist.length,
      wishlistReady,
      cartCount: cart.length,
      isWished: (id) => wishlist.includes(id),
      toggleWish,
      addToCart,
      openPanel: (name) => setPanel(name),
      closePanel: () => setPanel(null),
    }),
    [wishlist, wishlistReady, cart, panel, toast, toggleWish, addToCart],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
