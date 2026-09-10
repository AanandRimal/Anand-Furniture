import { craft } from '@/lib/catalog'
import { Reveal } from '@/components/reveal'

export function Process() {
  return (
    <section className="bg-background border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 flex flex-col gap-14">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-primary">How it is made</p>
            <h2 className="text-display text-5xl md:text-7xl text-balance max-w-2xl">
              From a chosen board to a level door.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground leading-relaxed text-pretty">
            Six weeks, and this is where each of them goes. If a step here sounds slow, it is the step that decides
            whether the piece is still square in ten years.
          </p>
        </Reveal>

        <ol className="relative flex flex-col border-l border-border pl-8 md:pl-14">
          {craft.process.map((step, i) => (
            <li key={step.title} className="relative pb-12 last:pb-0">
              <span
                className="absolute -left-[calc(2rem+3px)] top-2 size-1.5 bg-primary md:-left-[calc(3.5rem+3px)]"
                aria-hidden="true"
              />
              <Reveal className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start md:gap-12">
                <div className="flex flex-col gap-2.5">
                  <p className="font-mono text-xs text-primary/60">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-serif text-2xl md:text-4xl leading-tight tracking-tight text-balance">
                    {step.title}
                  </h3>
                  <p className="max-w-2xl text-muted-foreground leading-relaxed text-pretty">{step.detail}</p>
                </div>
                <p className="eyebrow text-muted-foreground md:pt-1 md:text-right">{step.when}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <p className="max-w-3xl border-t border-border pt-8 font-serif text-xl md:text-2xl leading-snug text-balance">
            {craft.aftercare}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
