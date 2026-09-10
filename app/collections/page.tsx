import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { categories, totalDesigns } from '@/lib/catalog'
import { Reveal } from '@/components/reveal'
import { ContactCta } from '@/components/contact-cta'
import { CategoryRail } from '@/components/collections/category-rail'
import { DesignBrowser } from '@/components/design-browser'

export const metadata: Metadata = {
  title: 'Furniture Collections in Nepal — Photos, Designs & Prices',
  description:
    'Browse every kind of furniture Anand builds in Kathmandu: modular kitchens, TV showcases, wardrobes, dining tables, beds, sofas, study tables, parquet flooring and railings, with prices.',
  keywords: [
    'furniture designs Nepal',
    'furniture catalogue Nepal',
    'furniture price in Nepal',
    'modern furniture designs Kathmandu',
    'beautiful furniture design',
    'house decoration furniture Nepal',
  ],
  alternates: { canonical: '/collections' },
  openGraph: {
    type: 'website',
    url: '/collections',
    title: 'Furniture Collections in Nepal — Photos, Designs & Prices',
    description:
      'Nine collections, thirty-two designs, every one made in our own Kathmandu workshop. Photos, materials and starting prices.',
    images: [{ url: '/og/home.jpg', width: 1200, height: 630, alt: 'Anand Furniture collections' }],
  },
}

export default function CollectionsPage() {
  return (
    <main className="pt-28 md:pt-40">
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between pb-16 md:pb-24">
        <div className="flex flex-col gap-4">
          <p className="eyebrow text-primary">Collections</p>
          <h1 className="text-display text-6xl md:text-8xl text-balance">Every room in the house.</h1>
        </div>
        <p className="max-w-sm text-muted-foreground leading-relaxed text-pretty">
          {categories.length} collections, {totalDesigns} designs and {categories.length * 5} photographs. Every design
          is a starting point. Every piece is then made to your own measurements.
        </p>
      </section>

      <CategoryRail />

      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-16 md:py-24">
        <ul className="grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.slug} as="li" delay={(i % 3) * 0.06} className="bg-background">
              <Link href={`/collections/${c.slug}`} className="group flex flex-col h-full">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                  <p className="absolute left-5 top-5 eyebrow text-foreground/80">{c.sceneIndex}</p>
                </div>
                <div className="flex items-start justify-between gap-4 p-6 flex-1">
                  <div className="flex flex-col gap-2">
                    <h2 className="font-serif text-3xl leading-none tracking-tight group-hover:text-primary transition-colors">
                      {c.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {c.accent} · {c.designs.length} designs · {c.gallery.length} photos
                    </p>
                  </div>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <div className="border-t border-border">
        <DesignBrowser
          eyebrow="All designs"
          heading="Browse everything we build."
          intro="Every design in every room, in one place. Filter by room, sort by price, and send any piece straight to WhatsApp."
        />
      </div>

      <ContactCta />
    </main>
  )
}
