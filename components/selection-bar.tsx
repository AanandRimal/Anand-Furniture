'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { formatPrice } from '@/lib/catalog'
import {
  clearSelection,
  selectedItems,
  selectionTotal,
  selectionWaLink,
  toggleSelected,
  useSelection,
} from '@/lib/selection'
import { WhatsAppGlyph } from '@/components/quick-contact'

export function SelectionBar() {
  const ids = useSelection()
  const [open, setOpen] = useState(false)
  const items = selectedItems(ids)

  if (!items.length) return null

  const { total, measured } = selectionTotal(items)

  return (
    <div className="fixed left-4 bottom-[calc(1.75rem+env(safe-area-inset-bottom))] md:left-6 md:bottom-8 z-40 flex flex-col items-start gap-2">
      {open && (
        <div className="w-[min(86vw,25rem)] border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="eyebrow text-primary">Your list</p>
            <button
              type="button"
              onClick={clearSelection}
              className="text-[0.7rem] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          </div>

          <ul className="max-h-[45svh] overflow-y-auto divide-y divide-border">
            {items.map(({ design, category }) => (
              <li key={design.id} className="flex items-center gap-3 px-4 py-3">
                <div className="relative size-12 shrink-0 overflow-hidden bg-background">
                  <Image src={design.image} alt="" fill sizes="48px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="truncate font-serif text-base leading-tight">{design.name}</p>
                  <p className="truncate text-[0.7rem] text-muted-foreground">
                    {category.name} · {formatPrice(design)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleSelected(design.id)}
                  aria-label={`Remove ${design.name} from your list`}
                  className="shrink-0 p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 border-t border-border px-4 py-4">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-sm text-primary">
                {total > 0 ? `from NPR ${total.toLocaleString('en-IN')}` : 'Measured on site'}
              </p>
              <p className="text-[0.7rem] text-muted-foreground text-right">
                {measured > 0 && total > 0 ? `+ ${measured} measured on site` : 'Quoted after the site visit'}
              </p>
            </div>
            <a
              href={selectionWaLink(items)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary py-3 text-[0.7rem] tracking-widest uppercase text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <WhatsAppGlyph className="size-4" />
              Send the list on WhatsApp
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-3 border border-primary/60 bg-card/95 backdrop-blur px-4 py-3 text-xs tracking-widest uppercase text-foreground shadow-xl transition-colors hover:border-primary"
      >
        <span className="grid size-5 place-items-center bg-primary font-mono text-[0.65rem] text-primary-foreground">
          {items.length}
        </span>
        {items.length === 1 ? 'piece on your list' : 'pieces on your list'}
        {open ? <ChevronDown className="size-4 text-primary" aria-hidden="true" /> : <ChevronUp className="size-4 text-primary" aria-hidden="true" />}
      </button>
    </div>
  )
}
