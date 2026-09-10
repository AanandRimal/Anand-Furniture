import { craft } from '@/lib/catalog'
import { Reveal } from '@/components/reveal'

export function Myths() {
  return (
    <section className="bg-background border-t border-border">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-24 md:py-32 flex flex-col gap-14">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-primary">Straight answers</p>
            <h2 className="text-display text-5xl md:text-7xl text-balance max-w-2xl">
              What the market tells you, and what is actually true.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground leading-relaxed text-pretty">
            You will hear all of these while you shop. Some of them are honest mistakes. The rest are how a thin board
            gets sold at a thick board&apos;s price.
          </p>
        </Reveal>

        <ul className="border-t border-border">
          {craft.myths.map((m, i) => (
            <li key={m.myth} className="border-b border-border">
              <Reveal className="grid gap-6 py-10 md:grid-cols-[auto_1fr_1.4fr] md:gap-12 md:py-14">
                <p className="font-mono text-xs text-primary/50 md:pt-3">{String(i + 1).padStart(2, '0')}</p>

                <div className="flex flex-col gap-3">
                  <p className="eyebrow text-muted-foreground/70">The myth</p>
                  <p className="font-serif text-2xl md:text-3xl leading-snug tracking-tight text-muted-foreground/80 text-balance">
                    &ldquo;{m.myth}&rdquo;
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="eyebrow text-primary">The truth</p>
                  <p className="leading-relaxed text-pretty md:text-lg">{m.truth}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
