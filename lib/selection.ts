'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { allDesigns, company, formatPrice } from '@/lib/catalog'

const KEY = 'anand-selection'
const EMPTY: string[] = []

let ids: string[] = EMPTY
let hydrated = false
const listeners = new Set<() => void>()

function emit() {
  for (const fn of listeners) fn()
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids))
  } catch {
    // private mode, or storage disabled: the list still works for this page view
  }
}

/**
 * Read storage once after mount rather than at module load, so the first client
 * render matches the server's empty list and hydration stays quiet.
 */
function hydrate() {
  if (hydrated) return
  hydrated = true
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : null
    if (Array.isArray(parsed)) {
      const known = parsed.filter((id): id is string => allDesigns.some((d) => d.design.id === id))
      if (known.length) {
        ids = known
        emit()
      }
    }
  } catch {
    // ignore unreadable storage
  }
}

function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

const getSnapshot = () => ids
const getServerSnapshot = () => EMPTY

export function useSelection() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  useEffect(hydrate, [])
  return current
}

export function toggleSelected(id: string) {
  ids = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
  persist()
  emit()
}

export function clearSelection() {
  ids = EMPTY
  persist()
  emit()
}

/** The chosen designs, in the order they were added. */
export function selectedItems(current: string[]) {
  return current.flatMap((id) => allDesigns.filter((d) => d.design.id === id))
}

/**
 * Pieces carry a price each; flooring and railings are quoted by area or length,
 * so they are counted but deliberately left out of the running total.
 */
export function selectionTotal(items: ReturnType<typeof selectedItems>) {
  const pieces = items.filter((i) => !i.design.priceUnit)
  const measured = items.length - pieces.length
  return {
    total: pieces.reduce((sum, i) => sum + i.design.priceFrom, 0),
    measured,
  }
}

export function selectionWaLink(items: ReturnType<typeof selectedItems>) {
  const lines = items.map((i, n) => `${n + 1}. ${i.design.name} (${i.category.name}) — from ${formatPrice(i.design)}`)
  const { total, measured } = selectionTotal(items)
  const summary = [
    total > 0 ? `Indicative total from NPR ${total.toLocaleString('en-IN')}` : null,
    measured > 0 ? `${measured} item${measured > 1 ? 's' : ''} to be measured on site` : null,
  ].filter(Boolean)

  const text = [
    'Hello Anand Furniture, I would like a quote for these pieces:',
    '',
    ...lines,
    '',
    ...summary,
    '',
    'Could you tell me the next step?',
  ].join('\n')

  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`
}
