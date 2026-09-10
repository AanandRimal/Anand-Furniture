'use client'

import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { company, waLink } from '@/lib/catalog'
import { cn } from '@/lib/utils'

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.5 0-2.98-.4-4.27-1.17l-.31-.18-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.35c0-4.54 3.7-8.23 8.24-8.23 4.54 0 8.23 3.69 8.23 8.23 0 4.54-3.69 8.24-8.14 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.13-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.12-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.01-.39.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.01 2.57.12.17 1.72 2.63 4.17 3.69.58.25 1.04.4 1.39.51.59.19 1.12.16 1.55.1.47-.07 1.45-.59 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  )
}

/** Sticky call + WhatsApp dock: on a phone this is how people actually book. */
export function QuickContact() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed right-4 bottom-[calc(1.75rem+env(safe-area-inset-bottom))] md:right-6 md:bottom-8 z-40 flex flex-col items-end gap-3 transition-all duration-500',
        shown ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-4',
      )}
    >
      <a
        href={`tel:${company.phone}`}
        aria-label={`Call ${company.phoneDisplay}`}
        className="group flex items-center gap-0 overflow-hidden border border-border bg-background/85 backdrop-blur text-foreground/90 shadow-2xl transition-colors hover:border-primary/60 hover:text-primary"
      >
        <span className="grid size-12 place-items-center">
          <Phone className="size-[1.15rem]" aria-hidden="true" />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-mono text-sm transition-all duration-500 group-hover:max-w-[12rem] group-hover:pr-5">
          {company.phoneDisplay}
        </span>
      </a>
      <a
        href={waLink('Hello Anand Furniture, I would like to talk about furniture for my home.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Anand Furniture on WhatsApp"
        className="group flex items-center gap-0 overflow-hidden bg-primary text-primary-foreground shadow-2xl transition-colors hover:bg-primary/90"
      >
        <span className="grid size-14 place-items-center">
          <WhatsAppGlyph className="size-6" />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs uppercase tracking-widest transition-all duration-500 group-hover:max-w-[12rem] group-hover:pr-6">
          Message us
        </span>
      </a>
    </div>
  )
}
