import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { categories, company, craft, formatPrice, PRICE_NOTE } from '@/lib/catalog'
import { Reveal } from '@/components/reveal'
import { ContactCta } from '@/components/contact-cta'
import { CategoryRail } from '@/components/collections/category-rail'

export const metadata: Metadata = {
  title: 'Interior Designer in Nepal — Complete House Interiors',
  description:
    'Complete house interior design and decoration in Nepal from one Kathmandu workshop: kitchen, wardrobes, beds, sofas, dining, flooring and railings, with room-by-room starting prices.',
  keywords: [
    'interior designer in Nepal',
    'best interior designer in Nepal',
    'interior design Kathmandu',
    'house interior design Nepal',
    'complete house decoration Nepal',
    'house decoration furniture Nepal',
    'home interior Nepal price',
    'full house furniture Nepal',
    'flat interior design Kathmandu',
  ],
  alternates: { canonical: '/interior-design' },
  openGraph: {
    type: 'website',
    url: '/interior-design',
    title: 'Interior Designer in Nepal — Complete House Interiors',
    description:
      'One workshop for the whole house: kitchen, wardrobes, beds, sofas, dining, flooring and railings, drawn together and built in Kathmandu.',
    images: [
      { url: '/og/interior-design.jpg', width: 1200, height: 630, alt: 'A complete Anand Furniture house interior' },
    ],
  },
}

/** Written for this page only: the questions that come up before a whole-house job. */
const questions = [
  {
    q: 'Do you design the whole house, or only supply furniture?',
    a: 'Both, and the whole house is the work we are set up for. We draw every room together first, so the veneer in the kitchen, the wardrobe doors and the flooring are chosen against each other rather than one at a time. Then we build and install all of it ourselves.',
  },
  {
    q: 'What does a full house interior cost in Nepal?',
    a: 'It depends on how many rooms and which materials, but the table above gives an honest floor: add the rooms you need and you have the starting figure. A three-bedroom flat done properly, kitchen and wardrobes included, usually begins in the low tens of lakhs. We quote line by line after measuring, so you can see what each room costs and drop or delay any of it.',
  },
  {
    q: 'Can we do it in stages?',
    a: 'Yes, and most people do. Kitchen and wardrobes first, then beds and sofas, then flooring. Because the drawings and the material choices are recorded, a room added three years later still matches the first one.',
  },
  {
    q: 'Do you work outside Kathmandu?',
    a: 'We install across the valley, in Kathmandu, Lalitpur and Bhaktapur, and we have delivered outside it. For a site further away, tell us where and we will be straight about whether the travel makes sense for the size of the job.',
  },
  {
    q: 'Who actually turns up on site?',
    a: 'Our own fitters, from our own workshop, in our own van. The person who measured your wall is the person who answers for it, which is the whole reason we do not subcontract the installation.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${company.url}/interior-design#service`,
      name: 'Complete house interior design and furniture',
      serviceType: 'Interior design and bespoke furniture',
      provider: { '@id': `${company.url}#business` },
      areaServed: ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Nepal'].map((name) => ({ '@type': 'Place', name })),
      url: `${company.url}/interior-design`,
      description:
        'Design, manufacture and installation of complete house interiors in Nepal: modular kitchens, wardrobes, beds, sofas, dining tables, TV showcases, study tables, parquet flooring and wooden railings.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Rooms we fit out',
        itemListElement: categories.map((c) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: c.name, url: `${company.url}/collections/${c.slug}` },
        })),
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: questions.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: company.url },
        { '@type': 'ListItem', position: 2, name: 'Interior design', item: `${company.url}/interior-design` },
      ],
    },
  ],
}

/** Cheapest piece in each collection, so the table reads as a real floor price. */
const floors = categories.map((c) => {
  const cheapest = c.designs.reduce((low, d) => (d.priceFrom < low.priceFrom ? d : low), c.designs[0])
  return { category: c, cheapest }
})

export default function InteriorDesignPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative flex min-h-[80svh] items-end overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src={categories.find((c) => c.slug === 'modular-design')!.image}
            alt="A complete house interior by Anand Furniture in Kathmandu"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 vignette" />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-5 md:px-10 pt-32 pb-16 md:pb-20">
          <div className="flex max-w-3xl flex-col gap-6">
            <p className="eyebrow text-primary">Interior design in Nepal</p>
            <h1 className="text-display text-[clamp(2.25rem,5vw,4.5rem)] text-balance">
              One workshop for the whole house.
            </h1>
            <p className="max-w-2xl text-base md:text-lg text-foreground/85 leading-relaxed text-pretty">
              Most houses in Kathmandu are furnished a room at a time, by whoever quoted lowest that month, and it
              shows: four shades of brown, three grades of plywood, doors that close differently in every room. We draw
              the whole house first, choose the materials against each other, then build and install all of it
              ourselves. That is the whole difference between decorating a house and furnishing one.
            </p>
          </div>
        </div>
      </section>

      <CategoryRail />

      <div className="tone-paper">
        <div className="h-20 md:h-28 cut-in" aria-hidden="true" />

        <section className="mx-auto max-w-[1600px] px-5 md:px-10 pb-24 md:pb-32 flex flex-col gap-14">
          <Reveal className="flex flex-col gap-4">
            <p className="eyebrow text-primary">What a house includes</p>
            <h2 className="text-display text-4xl md:text-6xl text-balance max-w-3xl">
              Nine rooms, drawn as one drawing.
            </h2>
            <p className="max-w-2xl text-muted-foreground leading-relaxed text-pretty">
              Every one of these is made by us, in the same workshop, from the same racks of timber. Follow any of them
              to see the designs, the materials and what they start at.
            </p>
          </Reveal>

          <ul className="grid gap-px bg-border border border-border md:grid-cols-2 xl:grid-cols-3">
            {categories.map((c) => (
              <li key={c.slug} className="bg-background">
                <Link href={`/collections/${c.slug}`} className="group flex h-full flex-col gap-3 p-6 md:p-8">
                  <p className="eyebrow text-muted-foreground">{c.room}</p>
                  <h3 className="font-serif text-2xl md:text-3xl leading-tight group-hover:text-primary transition-colors">
                    {c.name} design in Nepal
                  </h3>
                  <p className="flex-1 text-sm text-muted-foreground leading-relaxed text-pretty">{c.description}</p>
                  <p className="inline-flex items-center gap-2 pt-1 text-xs tracking-widest uppercase text-primary">
                    {c.designs.length} designs
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-24 md:py-32 flex flex-col gap-12">
            <Reveal className="flex flex-col gap-4">
              <p className="eyebrow text-primary">Room by room</p>
              <h2 className="text-display text-4xl md:text-6xl text-balance max-w-3xl">
                Where each room starts.
              </h2>
              <p className="max-w-2xl text-muted-foreground leading-relaxed text-pretty">
                The cheapest piece in each collection, so you can add up the rooms you need and see the floor before
                you call anybody.
              </p>
            </Reveal>

            {/* a real table, so the columns line up and a phone can scroll it */}
            <div className="max-w-4xl overflow-x-auto border border-border">
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <caption className="sr-only">Starting price for the least expensive design in each collection</caption>
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="eyebrow px-5 py-3 text-muted-foreground">Room</th>
                    <th scope="col" className="eyebrow px-5 py-3 text-muted-foreground">Starts with</th>
                    <th scope="col" className="eyebrow px-5 py-3 text-right text-primary">From</th>
                  </tr>
                </thead>
                <tbody>
                  {floors.map(({ category, cheapest }) => (
                    <tr key={category.slug} className="border-b border-border last:border-b-0">
                      <th scope="row" className="px-5 py-4 font-serif text-lg font-normal md:text-xl">
                        <Link href={`/collections/${category.slug}`} className="inline-block py-0.5 hover:text-primary transition-colors">
                          {category.name}
                        </Link>
                      </th>
                      <td className="px-5 py-4 text-sm text-muted-foreground">{cheapest.name}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-right font-mono text-sm text-primary">
                        {formatPrice(cheapest)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground">{PRICE_NOTE}</p>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-24 md:py-32 flex flex-col gap-12">
            <Reveal className="flex flex-col gap-4">
              <p className="eyebrow text-primary">Before you start</p>
              <h2 className="text-display text-4xl md:text-6xl text-balance max-w-3xl">
                What people ask us first.
              </h2>
            </Reveal>

            <ul className="border-t border-border">
              {questions.map((f) => (
                <li key={f.q} className="border-b border-border">
                  <Reveal className="grid gap-4 py-8 md:grid-cols-[1fr_1.4fr] md:gap-12 md:py-10">
                    <h3 className="font-serif text-xl md:text-2xl leading-snug text-balance">{f.q}</h3>
                    <p className="leading-relaxed text-muted-foreground text-pretty">{f.a}</p>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal>
              <p className="max-w-3xl border-t border-border pt-8 font-serif text-xl md:text-2xl leading-snug text-balance">
                {craft.aftercare}
              </p>
            </Reveal>
          </div>
        </section>

        <div className="h-20 md:h-28 cut-out" aria-hidden="true" />
      </div>

      <ContactCta />
    </main>
  )
}
