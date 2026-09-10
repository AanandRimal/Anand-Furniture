'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Phone, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { company, categories } from '@/lib/catalog'

const links = [
  { href: '/', label: 'The House' },
  { href: '/collections', label: 'Collections' },
  { href: '/interior-design', label: 'Interiors' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function SiteNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Primary"
        className={cn(
          'transition-[background-color,border-color] duration-500 border-b',
          scrolled || open
            ? 'bg-background/80 backdrop-blur-md border-border'
            : 'bg-transparent border-transparent',
        )}
      >
        <div className="mx-auto flex h-16 md:h-20 max-w-[1600px] items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex items-baseline gap-2 group">
          <span className="font-serif text-2xl md:text-[1.75rem] tracking-tight leading-none">Anand</span>
          <span className="eyebrow text-muted-foreground hidden sm:inline group-hover:text-primary transition-colors">
            Furniture Pvt. Ltd.
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    'eyebrow relative py-2 transition-colors hover:text-primary',
                    active ? 'text-primary' : 'text-foreground/80',
                  )}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary"
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${company.phone}`}
            className="hidden md:inline-flex items-center gap-2 border border-primary/40 px-4 py-2 text-xs tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            <span className="font-mono">{company.phone}</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden inline-flex size-10 items-center justify-center text-foreground"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-background/95 backdrop-blur-lg overflow-y-auto border-t border-border"
          >
            <div className="flex flex-col gap-10 px-6 py-10">
              <ul className="flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link href={l.href} className="font-serif text-4xl py-2 block hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div>
                <p className="eyebrow text-muted-foreground mb-4">Rooms</p>
                <ul className="grid grid-cols-2 gap-y-3 gap-x-6">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/collections/${c.slug}`} className="text-sm text-foreground/80 hover:text-primary">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={`tel:${company.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-4 text-sm tracking-widest text-primary-foreground"
              >
                <Phone className="size-4" aria-hidden="true" />
                Call {company.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
