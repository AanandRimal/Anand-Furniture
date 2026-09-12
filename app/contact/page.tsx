import type { Metadata } from 'next'
import Image from 'next/image'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { categories, company, faqs, waLink } from '@/lib/catalog'
import { ContactForm } from '@/components/contact-form'
import { WhatsAppGlyph } from '@/components/quick-contact'
import { Faq } from '@/components/faq'

/** The showroom photograph on this page follows the living room collection. */
const showroom = categories.find((c) => c.slug === 'living-room')!

export const metadata: Metadata = {
  title: 'Contact — Furniture Showroom & Workshop in Kathmandu',
  description: `Talk to ${company.name} about furniture for your home. Call ${company.phoneDisplay}, message us on WhatsApp, or send the enquiry form. Showroom and workshop in Kathmandu, open ${company.hours}.`,
  keywords: [
    'furniture shop in Kathmandu',
    'furniture showroom Nepal',
    'furniture shop near me',
    'furniture contact Nepal',
    'interior designer contact Nepal',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    url: '/contact',
    title: 'Contact Anand Furniture — Kathmandu Showroom & Workshop',
    description: `Call ${company.phoneDisplay}, message on WhatsApp, or send an enquiry. Open ${company.hours}.`,
    images: [{ url: '/og/home.jpg', width: 1200, height: 630, alt: 'The Anand Furniture showroom' }],
  },
}

/** The FAQ that renders on this page, marked up so it can appear in search. */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function ContactPage() {
  return (
    <main className="pt-28 md:pt-40">
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 pb-16 md:pb-24 flex flex-col gap-6">
        <p className="eyebrow text-primary">Contact</p>
        <h1 className="text-display text-6xl md:text-8xl text-balance max-w-4xl">Let&apos;s talk about your house.</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
          <a
            href={`tel:${company.phone}`}
            className="font-mono text-3xl md:text-5xl text-primary w-fit hover:underline underline-offset-[12px] decoration-1"
          >
            {company.phoneDisplay}
          </a>
          <a
            href={waLink('Hello Anand Furniture, I would like to talk about furniture for my home.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-3 bg-primary px-6 py-3.5 text-xs tracking-widest uppercase text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <WhatsAppGlyph className="size-4" />
            Chat on WhatsApp
          </a>
        </div>
        <p className="max-w-xl text-muted-foreground leading-relaxed text-pretty">
          Call, message, or fill the form. The first visit, the measuring and the first drawing cost nothing, and you
          will speak to the person who would build your rooms.
        </p>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10 pb-24 md:pb-32 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5 flex flex-col gap-10">
          <ul className="flex flex-col divide-y divide-border border-y border-border">
            <Detail icon={Phone} label="Call">
              <a href={`tel:${company.phone}`} className="inline-block py-1 hover:text-primary transition-colors">{company.phoneDisplay}</a>
            </Detail>
            <Detail icon={WhatsAppGlyph} label="WhatsApp">
              <a
                href={waLink('Hello Anand Furniture, I would like to talk about furniture for my home.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1 hover:text-primary transition-colors"
              >
                Message us on WhatsApp
              </a>
            </Detail>
            <Detail icon={Mail} label="Email">
              <a href={`mailto:${company.email}`} className="inline-block py-1 hover:text-primary transition-colors">{company.email}</a>
            </Detail>
            <Detail icon={MapPin} label="Showroom & workshop">
              <a
                href={company.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1 hover:text-primary transition-colors"
              >
                {company.address}
                <span className="mt-1 block font-mono text-xs text-muted-foreground">{company.plusCode}</span>
              </a>
            </Detail>
            <Detail icon={Clock} label="Hours">
              {company.hours}
            </Detail>
          </ul>

          <div className="relative aspect-[16/10] overflow-hidden border border-border">
            <Image src={showroom.image} alt={`The Anand showroom: ${showroom.name}`} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <p className="absolute left-5 bottom-5 eyebrow text-foreground/80">Visit the showroom to touch the timber</p>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-10">
          <ContactForm />
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Faq />
    </main>
  )
}

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  children: React.ReactNode
}) {
  return (
    <li className="grid grid-cols-[1.5rem_6rem_1fr] items-baseline gap-4 py-5">
      <Icon className="size-4 text-primary translate-y-0.5" />
      <span className="eyebrow text-muted-foreground">{label}</span>
      <span className="text-foreground/90 leading-relaxed">{children}</span>
    </li>
  )
}
