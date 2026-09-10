import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { company } from '@/lib/catalog'
import { Reveal } from '@/components/reveal'

const facts = [
  { label: 'Founded', value: String(company.founded) },
  { label: 'Workshop', value: 'Our own, in Kathmandu' },
  { label: 'Timber', value: 'Kiln-dried walnut, oak, teak & ash' },
  { label: 'Finishes', value: 'Applied and cured on site' },
]

export function CraftStrip() {
  return (
    <section className="relative border-y border-border bg-card">
      <div className="mx-auto max-w-[1600px] grid lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[720px] overflow-hidden">
          <Image
            src="/rooms/workshop.webp"
            alt="A walnut plank being hand-planed in the Anand workshop"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/40" />
          <div className="absolute left-5 bottom-5 md:left-10 md:bottom-10 w-40 md:w-56 aspect-[16/10] border border-border/60 overflow-hidden shadow-2xl">
            <Image src="/rooms/detail-joinery.webp" alt="Dovetail joinery detail on a walnut drawer" fill sizes="224px" className="object-cover" />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-10 px-5 py-16 md:px-16 md:py-24">
          <Reveal className="flex flex-col gap-5">
            <p className="eyebrow text-primary">Behind the scenes</p>
            <h2 className="text-display text-5xl md:text-6xl text-balance">Cut, joined and finished by the same hands.</h2>
            <p className="text-muted-foreground leading-relaxed text-pretty max-w-prose">
              Most furniture companies design in one place and build in another. Anand does both under one roof, so the
              person who drew your kitchen is the person who checks its final drawer. Boards are cut, edged and finished
              here, then loaded on our own van and installed by our own fitters.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-1">
                  <dt className="eyebrow text-muted-foreground">{f.label}</dt>
                  <dd className="font-serif text-xl md:text-2xl leading-tight">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.15}>
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 border-b border-primary/50 pt-1.5 pb-1 text-sm tracking-widest uppercase text-primary hover:border-primary transition-colors"
            >
              About the company
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
