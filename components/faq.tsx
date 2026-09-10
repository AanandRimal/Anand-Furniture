import { Plus } from 'lucide-react'
import { faqs } from '@/lib/catalog'
import { Reveal } from '@/components/reveal'

export function Faq() {
  return (
    <section className="border-t border-border bg-card">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-24 md:py-32 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-28 self-start">
          <p className="eyebrow text-primary">Before you call</p>
          <h2 className="text-display text-4xl md:text-6xl text-balance">The six things everyone asks.</h2>
          <p className="text-muted-foreground leading-relaxed text-pretty">
            If your question is not here, ask it on WhatsApp. Someone from the workshop answers, not a call centre.
          </p>
        </Reveal>
        <ul className="lg:col-span-8 flex flex-col divide-y divide-border border-y border-border">
          {faqs.map((f, i) => (
            <Reveal as="li" key={f.q} delay={i * 0.04}>
              <details className="group py-6">
                <summary className="flex cursor-pointer items-start justify-between gap-6 list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="font-serif text-2xl md:text-3xl leading-tight text-balance group-open:text-primary transition-colors">
                    {f.q}
                  </h3>
                  <Plus
                    className="size-5 shrink-0 translate-y-1.5 text-muted-foreground transition-transform duration-300 group-open:rotate-45 group-open:text-primary"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed text-pretty">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
