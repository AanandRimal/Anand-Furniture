'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import { categories, company, waLink } from '@/lib/catalog'
import { WhatsAppGlyph } from '@/components/quick-contact'
import { cn } from '@/lib/utils'

const fieldClass =
  'w-full bg-transparent border-b border-input py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors'

/** Compose the enquiry once, then hand it to WhatsApp or to email. */
function compose(form: HTMLFormElement, rooms: string[]) {
  const data = new FormData(form)
  const get = (k: string) => String(data.get(k) ?? '').trim()
  const name = get('name')
  const lines = [
    `Hello Anand Furniture, my name is ${name}.`,
    rooms.length ? `I am interested in: ${rooms.join(', ')}.` : '',
    get('location') ? `Project location: ${get('location')}.` : '',
    get('message') ? `Details: ${get('message')}` : '',
    get('phone') ? `You can reach me on ${get('phone')}.` : '',
  ].filter(Boolean)
  return { name, body: lines.join('\n') }
}

export function ContactForm() {
  const [rooms, setRooms] = useState<string[]>([])
  const formRef = useRef<HTMLFormElement>(null)

  // A room link from a collection page arrives as ?room=Modular Kitchen — start with it selected.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).getAll('room')
    const valid = categories.filter((c) => wanted.includes(c.name)).map((c) => c.name)
    if (valid.length) setRooms(valid)
  }, [])

  const toggleRoom = (name: string) =>
    setRooms((prev) => (prev.includes(name) ? prev.filter((r) => r !== name) : [...prev, name]))

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { body } = compose(e.currentTarget, rooms)
    window.open(waLink(body), '_blank', 'noopener,noreferrer')
  }

  const sendEmail = () => {
    const form = formRef.current
    if (!form || !form.reportValidity()) return
    const { name, body } = compose(form, rooms)
    const subject = rooms.length ? `Enquiry: ${rooms.join(', ')}` : `Enquiry from ${name || 'the website'}`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <p className="eyebrow text-primary">Send a message</p>
        <h2 className="font-serif text-3xl md:text-4xl leading-tight text-balance">
          Tell us about the rooms, and we will call you back within a working day.
        </h2>
        <p className="text-sm text-muted-foreground">
          Nothing is stored on this website. Your message opens in WhatsApp or your email app, straight to our workshop.
        </p>
      </div>

      <fieldset className="flex flex-col gap-4">
        <legend className="eyebrow text-muted-foreground mb-4">
          Which rooms?
          {rooms.length > 0 && <span className="text-primary ml-2 font-mono normal-case">{rooms.length} selected</span>}
        </legend>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const on = rooms.includes(c.name)
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => toggleRoom(c.name)}
                aria-pressed={on}
                className={cn(
                  'border px-4 py-2 text-sm transition-colors',
                  on
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-foreground/80 hover:border-foreground/50',
                )}
              >
                {c.name}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          pattern="[0-9+()\s-]{7,}"
          title="Please enter a phone number we can call back on"
        />
        <Field label="Project location" name="location" autoComplete="address-level2" placeholder="City or neighbourhood" />
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="message" className="eyebrow text-muted-foreground">
            Anything else
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={1500}
            placeholder="Sizes, timelines, references, questions…"
            className={cn(fieldClass, 'resize-none')}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          className="group inline-flex w-fit items-center gap-3 bg-primary px-7 py-4 text-sm tracking-widest uppercase text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <WhatsAppGlyph className="size-4" />
          Send via WhatsApp
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={sendEmail}
          className="inline-flex w-fit items-center gap-3 border border-foreground/25 px-7 py-4 text-sm tracking-widest uppercase text-foreground/80 hover:border-primary hover:text-primary transition-colors"
        >
          <Mail className="size-4" aria-hidden="true" />
          Send by email
        </button>
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  ...props
}: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="eyebrow text-muted-foreground">
        {label}
        {props.required && <span className="text-primary"> *</span>}
      </label>
      <input id={name} name={name} className={fieldClass} {...props} />
    </div>
  )
}
