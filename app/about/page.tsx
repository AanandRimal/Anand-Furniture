import type { Metadata } from 'next'
import Image from 'next/image'
import { company } from '@/lib/catalog'
import { Reveal } from '@/components/reveal'
import { ContactCta } from '@/components/contact-cta'

export const metadata: Metadata = {
  title: 'Our Workshop — Furniture Makers in Kathmandu',
  description: `A furniture and interior workshop in Kathmandu since ${company.founded}. We design, build and install complete house interiors ourselves, from the kitchen carcass to the last hinge.`,
  keywords: ['furniture manufacturer Nepal', 'furniture workshop Kathmandu', 'custom furniture maker Nepal'],
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    url: '/about',
    title: 'Our Workshop — Furniture Makers in Kathmandu',
    description: `Designing and building complete house interiors in Kathmandu since ${company.founded}.`,
    images: [{ url: '/og/home.jpg', width: 1200, height: 630, alt: 'Inside the Anand Furniture workshop' }],
  },
}

const process = [
  { step: 'Visit', text: 'We come to the site, measure every wall and listen to how you live in the space today.' },
  { step: 'Design', text: 'A room-by-room walkthrough of your home in 3D, so you see the kitchen before a board is cut.' },
  { step: 'Build', text: 'Cutting, joinery and finishing in our own workshop, checked by the person who drew it.' },
  { step: 'Install', text: 'Our own fitters install, level and finish on site, then walk the house with you once more.' },
]

const values = [
  { title: 'One grain across the house', text: 'Kitchens, wardrobes and beds are drawn together so timber, tone and hardware carry from room to room.' },
  { title: 'Honest materials', text: 'Kiln-dried hardwoods, marine-grade plywood, real veneers and finishes we are happy to name.' },
  { title: 'Built to be repaired', text: 'Screws instead of glue where it matters, so a drawer can be fixed in twenty years, not replaced.' },
]

export default function AboutPage() {
  return (
    <main className="pt-28 md:pt-40">
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 grid gap-10 lg:grid-cols-12 pb-20 md:pb-28">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <p className="eyebrow text-primary">About the company</p>
          <h1 className="text-display text-6xl md:text-8xl text-balance">A workshop that thinks in whole houses.</h1>
        </div>
        <div className="lg:col-span-5 lg:pt-8 flex flex-col gap-6 text-muted-foreground leading-relaxed">
          <p className="text-pretty">
            {company.name} was founded in {company.founded} as a small carpentry shop. Today it designs and builds complete
            interiors — from the parquet under your feet to the railing on the stair — with a single team from drawing
            to installation.
          </p>
          <p className="text-pretty">
            Two things have not changed since the first bench. Timber is still chosen board by board, and the person who
            draws a room is the person who signs it off on site. Everything else — the machines, the hardware, the
            software we design in — has been replaced at least twice.
          </p>
          <p className="text-pretty">
            We take on a limited number of houses at a time. It is slower than a showroom that sells from stock, and it
            is the only way we know to hand over a room that still closes softly in ten years.
          </p>
        </div>
      </section>

      <section className="relative h-[70svh] min-h-[420px] overflow-hidden">
        <Image src="/rooms/workshop.webp" alt="Inside the Anand Furniture workshop" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        <p className="absolute left-5 md:left-10 bottom-8 eyebrow text-foreground/80">The workshop, Kathmandu</p>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-24 md:py-32 flex flex-col gap-14">
        <Reveal className="flex flex-col gap-4 max-w-2xl">
          <p className="eyebrow text-primary">How a house gets made</p>
          <h2 className="text-display text-5xl md:text-6xl text-balance">Four steps, one team, no hand-offs.</h2>
        </Reveal>
        <ol className="grid gap-px bg-border border border-border md:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.step} as="li" delay={i * 0.08} className="bg-background p-7 md:p-8 flex flex-col gap-6 min-h-64">
              <span className="font-mono text-xs text-muted-foreground">Step {i + 1}</span>
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-3xl leading-none">{p.step}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-24 md:py-32 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px] overflow-hidden border border-border">
            <Image src="/rooms/detail-joinery.webp" alt="Dovetail joinery on a walnut drawer" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </Reveal>
          <div className="lg:col-span-7 flex flex-col gap-10 lg:pl-8">
            <Reveal className="flex flex-col gap-4">
              <p className="eyebrow text-primary">What we hold to</p>
              <h2 className="text-display text-5xl md:text-6xl text-balance">The details you only notice years later.</h2>
            </Reveal>
            <ul className="flex flex-col divide-y divide-border border-y border-border">
              {values.map((v, i) => (
                <Reveal key={v.title} as="li" delay={i * 0.08} className="py-6 grid gap-2 md:grid-cols-[1fr_2fr] md:gap-8">
                  <h3 className="font-serif text-2xl leading-tight">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{v.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContactCta />
    </main>
  )
}
