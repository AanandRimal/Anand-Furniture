import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { categories, company, formatPrice } from '@/lib/catalog'
import { Reveal } from '@/components/reveal'

/** The photograph behind the first screen. */
const hero = categories.find((c) => c.slug === 'living-room')!

const proof = [
  { label: 'The board', value: 'Marine ply, never MDF' },
  { label: 'The timber', value: 'Seasoned to 8–10%' },
  { label: 'The hands', value: 'Ours, start to finish' },
]

/** Four pieces on the first screen, so the work is visible before a word is read. */
const glance = ['modular-kitchen', 'wardrobes', 'beds', 'sofas'].map((slug) => {
  const category = categories.find((c) => c.slug === slug)!
  return { category, design: category.designs[0] }
})

export function Manifesto() {
  return (
    <section className="relative flex min-h-svh flex-col justify-between overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt={`${hero.name}: ${hero.designs[0].name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />
        <div className="absolute inset-0 vignette" />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-5 md:px-10 pt-24 md:pt-32">
        <div className="flex max-w-3xl flex-col gap-6 md:gap-7">
          <Reveal className="flex flex-col gap-5">
            <p className="eyebrow text-primary">
              Anand Furniture Pvt. Ltd.{' '}
              <span className="text-muted-foreground">· Kathmandu · since {company.founded}</span>
            </p>
            <h1 className="text-display text-[clamp(2.25rem,4.6vw,4.25rem)] text-balance">
              We are not the cheapest quote you will get.
              <br />
              <span className="italic font-light text-primary">Here is where the money goes.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-5 md:gap-6">
            <p className="max-w-xl text-sm md:text-lg text-foreground/85 leading-relaxed text-pretty">
              The board inside a wardrobe, the moisture in its frame and whether the people who built it are the people
              who hang its doors. We save money on none of the three, so we will never be your lowest number. We would
              rather be the last one you act on.
            </p>

            <dl className="flex max-w-3xl gap-px overflow-x-auto border border-border bg-border sm:grid sm:grid-cols-3 sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {proof.map((p) => (
                <div key={p.label} className="flex min-w-[11rem] flex-1 flex-col gap-1 bg-background/70 px-4 py-3 backdrop-blur-sm sm:px-5 sm:py-4">
                  <dt className="eyebrow text-muted-foreground">{p.label}</dt>
                  <dd className="font-serif text-base md:text-xl leading-tight">{p.value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="#catalogue"
                className="group inline-flex items-center gap-3 bg-primary px-6 py-3.5 text-xs tracking-widest uppercase text-primary-foreground transition-colors hover:bg-primary/90"
              >
                See the pieces and prices
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
              <a
                href="#walkthrough"
                className="group inline-flex items-center gap-3 border-b border-primary/40 pt-1.5 pb-1 text-xs tracking-widest uppercase text-primary hover:border-primary transition-colors"
              >
                Or walk the whole house
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal
        delay={0.2}
        className="relative mx-auto w-full max-w-[1600px] px-5 md:px-10 pt-8 pb-6 md:pt-14 md:pb-10"
      >
        <div className="flex items-center justify-between gap-4 pb-3">
          <p className="eyebrow text-muted-foreground">A few of the {categories.length} rooms</p>
          <Link
            href="/collections"
            className="eyebrow py-1.5 text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
          >
            See all
          </Link>
        </div>
        <ul className="flex gap-px overflow-x-auto border border-border bg-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {glance.map(({ category, design }) => (
            <li key={category.slug} className="min-w-[14rem] flex-1 bg-background/80 backdrop-blur-sm">
              <Link href={`/collections/${category.slug}`} className="group flex items-center gap-4 p-3">
                <div className="relative size-16 shrink-0 overflow-hidden bg-card md:size-20">
                  <Image
                    src={design.image}
                    alt={design.name}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="eyebrow text-muted-foreground whitespace-nowrap">{category.name}</p>
                  <p className="truncate font-serif text-lg leading-tight group-hover:text-primary transition-colors">
                    {design.name}
                  </p>
                  <p className="font-mono text-xs text-primary">from {formatPrice(design)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
