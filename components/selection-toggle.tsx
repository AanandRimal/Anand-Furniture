'use client'

import { Check, Plus } from 'lucide-react'
import { toggleSelected, useSelection } from '@/lib/selection'
import { cn } from '@/lib/utils'

export function SelectionToggle({ id, className }: { id: string; className?: string }) {
  const selected = useSelection().includes(id)

  return (
    <button
      type="button"
      onClick={() => toggleSelected(id)}
      aria-pressed={selected}
      className={cn(
        'inline-flex items-center justify-center gap-2 border py-2.5 text-[0.7rem] tracking-widest uppercase transition-colors',
        selected
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-border text-foreground/80 hover:border-foreground/50 hover:text-foreground',
        className,
      )}
    >
      {selected ? (
        <>
          <Check className="size-3.5" aria-hidden="true" />
          On list
        </>
      ) : (
        <>
          <Plus className="size-3.5" aria-hidden="true" />
          Add
        </>
      )}
    </button>
  )
}
