import type { Category } from '@/lib/catalog'

export function MaterialStrip({ category }: { category: Category }) {
  return (
    <section aria-label="Materials and finishes" className="border-y border-border bg-card">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-12 md:py-16 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3 flex flex-col gap-3">
          <p className="eyebrow text-primary">Materials & finishes</p>
          <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
            What {category.room.toLowerCase()} is usually built from. Samples are in the showroom, and we will bring
            them to your site.
          </p>
        </div>
        <ul className="lg:col-span-9 grid grid-cols-2 gap-px bg-border border border-border md:grid-cols-4">
          {category.materials.map((m) => (
            <li key={m.name} className="bg-card flex flex-col gap-4 p-5 md:p-6">
              <span
                className="size-12 rounded-full border border-foreground/10 shadow-inner"
                style={{ backgroundColor: m.hex }}
                aria-hidden="true"
              />
              <span className="flex flex-col gap-1">
                <span className="font-serif text-lg md:text-xl leading-tight">{m.name}</span>
                <span className="text-xs text-muted-foreground leading-relaxed">{m.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
