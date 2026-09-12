import Link from 'next/link'
import { categories, company } from '@/lib/catalog'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-16 md:py-24 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5 flex flex-col gap-6">
          <p className="font-serif text-4xl md:text-5xl leading-none">Anand</p>
          <p className="text-muted-foreground max-w-sm leading-relaxed text-pretty">
            Furniture and interiors designed as one continuous home, built by hand in our own workshop since {company.founded}.
          </p>
          <a
            href={`tel:${company.phone}`}
            className="font-mono text-2xl md:text-3xl text-primary hover:underline underline-offset-8 decoration-1 w-fit"
          >
            {company.phoneDisplay}
          </a>
        </div>

        <div className="md:col-span-3 flex flex-col gap-4">
          <p className="eyebrow text-muted-foreground">Rooms</p>
          <ul className="flex flex-col gap-2.5">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/collections/${c.slug}`} className="inline-block py-1 text-sm text-foreground/80 hover:text-primary transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 flex flex-col gap-4">
          <p className="eyebrow text-muted-foreground">Company</p>
          <ul className="flex flex-col gap-2.5">
            <li><Link href="/" className="inline-block py-1 text-sm text-foreground/80 hover:text-primary transition-colors">The House</Link></li>
            <li><Link href="/collections" className="inline-block py-1 text-sm text-foreground/80 hover:text-primary transition-colors">Collections</Link></li>
            <li><Link href="/interior-design" className="inline-block py-1 text-sm text-foreground/80 hover:text-primary transition-colors">Complete house interiors</Link></li>
            <li><Link href="/about" className="inline-block py-1 text-sm text-foreground/80 hover:text-primary transition-colors">About</Link></li>
            <li><Link href="/contact" className="inline-block py-1 text-sm text-foreground/80 hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2 flex flex-col gap-4">
          <p className="eyebrow text-muted-foreground">Visit</p>
          <address className="not-italic text-sm text-foreground/80 leading-relaxed">
            <a
              href={company.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-1 hover:text-primary transition-colors"
            >
              {company.address}
            </a>
            <br />
            {company.hours}
            <br />
            <a href={`mailto:${company.email}`} className="inline-block py-1 hover:text-primary transition-colors">{company.email}</a>
            {company.social.length > 0 && (
              <>
                <br />
                {company.social.map((url) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-1 hover:text-primary transition-colors"
                  >
                    Facebook
                  </a>
                ))}
              </>
            )}
          </address>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-5 flex flex-col sm:flex-row gap-2 sm:items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p className="eyebrow">A house, told room by room.</p>
        </div>
      </div>
    </footer>
  )
}
