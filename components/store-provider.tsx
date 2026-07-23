'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type PanelName = 'menu' | 'login' | null

interface StoreState {
  wishlist: string[]
  cart: string[]
  panel: PanelName
  toast: string | null
  wishlistCount: number
  cartCount: number
  isWished: (id: string) => boolean
  toggleWish: (id: string, label: string) => void
  addToCart: (id: string, label: string) => void
  openPanel: (name: Exclude<PanelName, null>) => void
  closePanel: () => void
}

const StoreContext = createContext<StoreState | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([])
  const [cart, setCart] = useState<string[]>([])
  const [panel, setPanel] = useState<PanelName>(null)
  const [toast, setToast] = useState<string | null>(null)

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
      cartCount: cart.length,
      isWished: (id) => wishlist.includes(id),
      toggleWish,
      addToCart,
      openPanel: (name) => setPanel(name),
      closePanel: () => setPanel(null),
    }),
    [wishlist, cart, panel, toast, toggleWish, addToCart],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
