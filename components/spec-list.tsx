import type { Spec } from '@/lib/catalog'
import { cn } from '@/lib/utils'

/**
 * The facts that explain the price, as a compact label. Used on the collection
 * pages and on narrow screens, where the pinned callouts have no room to breathe.
 */
export function SpecList({
  items,
  className,
  label = 'Built with',
}: {
  items: readonly Spec[]
  className?: string
  label?: string
}) {
  return (
    <div className={cn('flex flex-col gap-2 border-l border-primary/40 pl-4', className)}>
      <p className="eyebrow text-primary/80">{label}</p>
      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item.text} className="flex items-start gap-2.5 font-mono text-xs leading-snug text-foreground/85">
            <span className="mt-1.5 size-1 shrink-0 bg-primary" aria-hidden="true" />
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
