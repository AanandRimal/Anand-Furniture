import { Check, X } from 'lucide-react'
import { craft } from '@/lib/catalog'
import { Reveal } from '@/components/reveal'

export function MaterialTruth() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 pb-24 md:pb-32 flex flex-col gap-16">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-primary">The material</p>
            <h2 className="text-display text-5xl md:text-7xl text-balance max-w-2xl">
              Premium is a specification, not an adjective.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground leading-relaxed text-pretty">
            Every showroom in the city says premium. Almost none of them will write down what is inside the board. Here
            is ours, in full, before you ask.
          </p>
        </Reveal>

        <ul className="grid gap-px bg-border border border-border md:grid-cols-2 xl:grid-cols-3">
          {craft.materials.map((m, i) => (
            <li key={m.part} className="bg-card flex flex-col gap-3 p-6 md:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <p className="eyebrow text-muted-foreground">{m.part}</p>
                <p className="font-mono text-[0.7rem] text-primary/60">{String(i + 1).padStart(2, '0')}</p>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl leading-tight tracking-tight text-balance">{m.spec}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{m.why}</p>
            </li>
          ))}
        </ul>

        <Reveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="eyebrow text-primary">Side by side</p>
            <h3 className="text-display text-3xl md:text-5xl text-balance max-w-3xl">
              What you cannot see from the showroom floor.
            </h3>
          </div>

          <div className="border border-border">
            <div className="hidden md:grid grid-cols-[1fr_1.3fr_1.3fr] gap-px bg-border">
              <p className="bg-card px-6 py-3 eyebrow text-muted-foreground">The part</p>
              <p className="bg-card px-6 py-3 eyebrow text-primary">Anand</p>
              <p className="bg-card px-6 py-3 eyebrow text-muted-foreground">Usually sold as</p>
            </div>

            {craft.comparison.map((row) => (
              <div
                key={row.part}
                className="grid gap-px bg-border border-t border-border md:grid-cols-[1fr_1.3fr_1.3fr]"
              >
                <p className="bg-card px-6 py-4 font-serif text-lg leading-tight md:text-xl">{row.part}</p>
                <p className="bg-card flex items-start gap-3 px-6 py-4 text-sm leading-relaxed">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {row.ours}
                </p>
                <p className="bg-card flex items-start gap-3 px-6 py-4 text-sm leading-relaxed text-muted-foreground">
                  <X className="mt-0.5 size-4 shrink-0 opacity-50" aria-hidden="true" />
                  {row.usual}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
