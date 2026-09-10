import Image from 'next/image'
import { formatPrice, waLink, type Category, type Design } from '@/lib/catalog'
import { WhatsAppGlyph } from '@/components/quick-contact'
import { SelectionToggle } from '@/components/selection-toggle'
import { Reveal } from '@/components/reveal'

const objectPositions = ['object-center', 'object-left', 'object-right', 'object-bottom']

export function DesignCard({ design, category, index }: { design: Design; category: Category; index: number }) {
  const href = waLink(
    `Hello Anand Furniture, I would like to know more about the "${design.name}" from your ${category.name} collection.`,
  )

  return (
    <Reveal as="li" delay={(index % 2) * 0.08} className="flex flex-col gap-5">
      <div className="relative aspect-[4/3] overflow-hidden border border-border bg-card group">
        <Image
          src={design.image}
          alt={design.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`object-cover ${objectPositions[index % objectPositions.length]} transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110`}
        />
        <p className="absolute left-4 top-4 font-mono text-xs text-foreground/70 bg-background/50 backdrop-blur px-2 py-1">
          {design.id.toUpperCase()}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-serif text-2xl md:text-3xl leading-tight tracking-tight">{design.name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{design.note}</p>
        </div>

        <p className="flex items-baseline gap-2 border-t border-border pt-4">
          <span className="font-mono text-base text-primary">{formatPrice(design)}</span>
          <span className="text-xs text-muted-foreground">from</span>
        </p>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-4 text-sm">
          <Spec label="Material" value={design.material} />
          <Spec label="Finish" value={design.finish} />
          <Spec label="Dimensions" value={design.dimensions} />
          <Spec label="Lead time" value={design.leadTime} />
        </dl>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex w-fit items-center gap-2 text-xs tracking-widest uppercase text-primary border-b border-primary/40 pt-1.5 pb-1 hover:border-primary transition-colors"
          >
            <WhatsAppGlyph className="size-3.5" />
            Ask about this design
          </a>
          <SelectionToggle id={design.id} className="px-4" />
        </div>
      </div>
    </Reveal>
  )
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="eyebrow text-muted-foreground">{label}</dt>
      <dd className="text-foreground/90">{value}</dd>
    </div>
  )
}
