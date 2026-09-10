import Image from 'next/image'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { company, waLink } from '@/lib/catalog'
import { WhatsAppGlyph } from '@/components/quick-contact'
import { Reveal } from '@/components/reveal'

export function ContactCta() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <Image
        src="/rooms/entrance.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10 py-28 md:py-40 flex flex-col items-center text-center gap-8">
        <Reveal className="flex flex-col items-center gap-6">
          <p className="eyebrow text-primary">Start your house</p>
          <h2 className="text-display text-5xl md:text-8xl text-balance max-w-4xl">Tell us which room to begin with.</h2>
          <p className="text-muted-foreground max-w-lg leading-relaxed text-pretty">
            One call and we will visit, measure and sketch. No charge for the first conversation.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href={`tel:${company.phone}`}
            className="inline-flex items-center gap-3 bg-primary px-7 py-4 text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
          >
            <Phone className="size-4" aria-hidden="true" />
            <span className="font-mono normal-case tracking-normal text-base">{company.phone}</span>
          </a>
          <a
            href={waLink('Hello Anand Furniture, I would like to start planning a room in my home.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-foreground/30 px-7 py-4 text-sm tracking-widest uppercase hover:border-primary hover:text-primary transition-colors"
          >
            <WhatsAppGlyph className="size-4" />
            WhatsApp
          </a>
          <Link href="/contact" className="text-sm tracking-widest uppercase text-muted-foreground hover:text-primary px-4 py-4 transition-colors">
            Or write to us
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
