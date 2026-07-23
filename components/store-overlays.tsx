'use client'

import { MessageCircle, X } from 'lucide-react'
import { useStore } from '@/components/store-provider'

export function StoreOverlays() {
  const { panel, closePanel, toast } = useStore()
  const loginOpen = panel === 'login'

  return (
    <>
      {loginOpen ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-end bg-foreground/35 p-0 sm:p-5" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closePanel() }}>
          <section role="dialog" aria-modal="true" aria-labelledby="login-title" className="w-full bg-background p-6 shadow-xl sm:max-w-md sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Client account</p>
                <h2 id="login-title" className="mt-3 font-serif text-4xl text-heading">Welcome to the atelier.</h2>
              </div>
              <button type="button" onClick={closePanel} className="flex size-10 items-center justify-center" aria-label="Close login panel"><X aria-hidden="true" /></button>
            </div>
            <p className="mt-4 text-sm leading-6">Account access is shown as a prototype in this preview.</p>
            <form className="mt-8 flex flex-col gap-4" onSubmit={(event) => { event.preventDefault(); closePanel() }}>
              <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.12em]">Email address<input type="email" required placeholder="you@example.com" className="border border-border bg-transparent px-4 py-3 text-sm normal-case tracking-normal text-heading outline-none focus:border-foreground" /></label>
              <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.12em]">Password<input type="password" required placeholder="Password" className="border border-border bg-transparent px-4 py-3 text-sm normal-case tracking-normal text-heading outline-none focus:border-foreground" /></label>
              <button type="submit" className="mt-2 bg-foreground px-5 py-3.5 text-xs uppercase tracking-[0.15em] text-background">Continue</button>
            </form>
          </section>
        </div>
      ) : null}

      <a href="https://wa.me/919000000000?text=Hello%20Mithran%27s%20Atelier%2C%20I%27d%20like%20help%20choosing%20a%20piece." target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-3 text-xs text-background shadow-lg transition-transform hover:-translate-y-0.5" aria-label="Get assistance from Mithran's Atelier on WhatsApp">
        <MessageCircle aria-hidden="true" /> <span className="hidden sm:inline">Need assistance?</span>
      </a>

      <div aria-live="polite" aria-atomic="true" className="pointer-events-none fixed inset-x-4 bottom-20 z-[80] flex justify-center">
        {toast ? <p className="bg-foreground px-5 py-3 text-xs text-background shadow-lg">{toast}</p> : null}
      </div>
    </>
  )
}
