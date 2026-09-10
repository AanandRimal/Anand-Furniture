import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { categories, company, getCategory, waLink } from '@/lib/catalog'
import { RoomHero } from '@/components/collections/room-hero'
import { CategoryRail } from '@/components/collections/category-rail'
import { RoomGallery } from '@/components/collections/room-gallery'
import { MaterialStrip } from '@/components/collections/material-strip'
import { DesignCard } from '@/components/collections/design-card'
import { ContactCta } from '@/components/contact-cta'
import { WhatsAppGlyph } from '@/components/quick-contact'
import { Reveal } from '@/components/reveal'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) return {}
  const url = `/collections/${slug}`
  const og = `/og/${slug}.jpg`
  return {
    title: category.seo.title,
    description: category.seo.description,
    keywords: [
      `${category.name.toLowerCase()} Nepal`,
      `${category.name.toLowerCase()} design Nepal`,
      `${category.name.toLowerCase()} price Nepal`,
      `${category.name.toLowerCase()} Kathmandu`,
      `best ${category.name.toLowerCase()} in Nepal`,
      'furniture Nepal',
      'interior designer in Nepal',
    ],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: category.seo.title,
      description: category.seo.description,
      images: [{ url: og, width: 1200, height: 630, alt: `${category.name} by Anand Furniture, Kathmandu` }],
    },
    twitter: { card: 'summary_large_image', images: [og] },
  }
}

function collectionSchema(category: NonNullable<ReturnType<typeof getCategory>>) {
  const url = `${company.url}/collections/${category.slug}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: company.url },
          { '@type': 'ListItem', position: 2, name: 'Collections', item: `${company.url}/collections` },
          { '@type': 'ListItem', position: 3, name: category.name, item: url },
        ],
      },
      {
        '@type': 'ItemList',
        name: `${category.name} designs by ${company.name}`,
        numberOfItems: category.designs.length,
        itemListElement: category.designs.map((design, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: design.name,
            sku: design.id,
            description: design.note,
            material: design.material,
            image: `${company.url}${design.image}`,
            url,
            brand: { '@type': 'Brand', name: company.name },
            // Starting prices, so the offer is aggregated rather than fixed.
            // These mirror the prices shown on the page: correct both together.
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'NPR',
              lowPrice: design.priceFrom,
              offerCount: 1,
              availability: 'https://schema.org/PreOrder',
              seller: { '@id': `${company.url}#business` },
            },
          },
        })),
      },
    ],
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  const index = categories.findIndex((c) => c.slug === slug)
  const next = categories[(index + 1) % categories.length]
  const prev = categories[(index - 1 + categories.length) % categories.length]

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema(category)) }}
      />
      <RoomHero category={category} />
      <CategoryRail current={category.slug} />

      <section className="pt-20 md:pt-28">
        <RoomGallery category={category} />
      </section>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-20 md:py-28 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28 self-start">
          <p className="eyebrow text-primary">The catalogue</p>
          <h2 className="text-display text-4xl md:text-5xl text-balance">{category.designs.length} designs to start from.</h2>
          <p className="text-muted-foreground leading-relaxed text-pretty">{category.description}</p>
          <dl className="grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm">
            <div className="flex flex-col gap-1">
              <dt className="eyebrow text-muted-foreground">Signature</dt>
              <dd>{category.accent}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="eyebrow text-muted-foreground">Made</dt>
              <dd>To measure, in our workshop</dd>
            </div>
          </dl>
          <div className="flex flex-col gap-3 pt-2">
            <a
              href={waLink(
                `Hello Anand Furniture, I would like a quote for ${category.name}. Could we arrange a site visit?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-3 bg-primary px-6 py-3.5 text-xs tracking-widest uppercase text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <WhatsAppGlyph className="size-4" />
              Book this room on WhatsApp
            </a>
            <Link
              href={`/contact?room=${encodeURIComponent(category.name)}`}
              className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors w-fit border-b border-border hover:border-primary pt-1.5 pb-1"
            >
              Or send an enquiry form
            </Link>
          </div>
        </Reveal>

        <ul className="lg:col-span-8 grid gap-10 sm:grid-cols-2">
          {category.designs.map((d, i) => (
            <DesignCard key={d.id} design={d} category={category} index={i} />
          ))}
        </ul>
      </section>

      <MaterialStrip category={category} />

      <nav aria-label="Other rooms" className="border-b border-border">
        <div className="mx-auto max-w-[1600px] grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <Link href={`/collections/${prev.slug}`} className="group flex items-center gap-5 px-5 md:px-10 py-10 hover:bg-card transition-colors">
            <ArrowLeft className="size-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" aria-hidden="true" />
            <span className="flex flex-col gap-1">
              <span className="eyebrow text-muted-foreground">Previous room</span>
              <span className="font-serif text-3xl leading-none">{prev.name}</span>
            </span>
          </Link>
          <Link href={`/collections/${next.slug}`} className="group flex items-center justify-end gap-5 px-5 md:px-10 py-10 text-right hover:bg-card transition-colors">
            <span className="flex flex-col gap-1">
              <span className="eyebrow text-muted-foreground">Next room</span>
              <span className="font-serif text-3xl leading-none">{next.name}</span>
            </span>
            <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" aria-hidden="true" />
          </Link>
        </div>
      </nav>

      <ContactCta />
    </main>
  )
}
