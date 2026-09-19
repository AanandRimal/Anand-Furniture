import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Manrope } from 'next/font/google'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { QuickContact } from '@/components/quick-contact'
import { SelectionBar } from '@/components/selection-bar'
import { categories, company } from '@/lib/catalog'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz'],
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: 'Anand Furniture — Premium Furniture & Interiors in Nepal',
    template: `%s | ${company.shortName} Furniture`,
  },
  description:
    'Premium furniture and complete house interiors in Nepal — modular kitchens, wardrobes, beds, sofas, dining tables, parquet flooring and wooden railings, made in our own Kathmandu workshop.',
  applicationName: company.name,
  authors: [{ name: company.name, url: company.url }],
  creator: company.name,
  publisher: company.name,
  category: 'Furniture & Interior Design',
  keywords: [
    'furniture Nepal',
    'best furniture in Nepal',
    'premium furniture Nepal',
    'modern furniture Nepal',
    'furniture in Kathmandu',
    'furniture shop near me',
    'luxury furniture Nepal',
    'modular kitchen Nepal',
    'kitchen design Nepal',
    'wardrobe design Nepal',
    'sliding wardrobe Kathmandu',
    'dressing table Nepal',
    'bed design Nepal',
    'sofa design Nepal',
    'L-shaped sofa Nepal',
    'dining table Nepal',
    'study table Nepal',
    'TV showcase design Nepal',
    'living room design Nepal',
    'parquet flooring Nepal',
    'best parquet flooring in Nepal',
    'wooden flooring Kathmandu',
    'wooden railing Nepal',
    'best railing in Nepal',
    'stair railing design Nepal',
    'interior designer in Nepal',
    'best interior designer in Nepal',
    'house interior design Nepal',
    'complete house decoration Nepal',
    'house decoration furniture Nepal',
    'beautiful furniture design',
    'custom furniture Kathmandu',
    'Anand Furniture',
  ],
  openGraph: {
    type: 'website',
    siteName: company.name,
    locale: 'en_NP',
    url: company.url,
    title: 'Premium Furniture in Nepal — Anand Furniture, Kathmandu',
    description:
      'Modular kitchens, wardrobes, beds, sofas, dining tables, parquet flooring and railings, designed as one home and built by hand in Kathmandu.',
    images: [
      {
        url: '/og/home.jpg',
        width: 1200,
        height: 630,
        alt: 'An Anand Furniture living room with a fluted oak media wall',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Furniture in Nepal — Anand Furniture, Kathmandu',
    description:
      'Kitchens, wardrobes, beds, sofas, dining tables, parquet and railings, built by hand in Kathmandu.',
    images: ['/og/home.jpg'],
  },
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel to the token Search
  // Console gives you, then redeploy. No code change needed.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  // The armchair mark cropped from public/Anand-Furniture.png. It has its own
  // fixed background, so unlike the old placeholder there is no separate
  // light/dark variant — one file covers both the browser tab and Google's
  // search result icon.
  // Google's favicon guidelines want the icon square and a multiple of 48px
  // to be eligible to show in search results (https://developers.google.com/search/docs/appearance/favicon-in-search).
  // 32/16 satisfy browser tabs but not that rule, so icon-96x96 is listed
  // first for Google's favicon crawler to prefer.
  icons: {
    icon: [
      { url: '/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#221d18',
}

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FurnitureStore',
      '@id': `${company.url}#business`,
      name: company.name,
      alternateName: ['Anand Furniture', 'Anand Furniture Nepal', 'आनन्द फर्निचर'],
      url: company.url,
      telephone: `+977${company.phone}`,
      email: company.email,
      foundingDate: String(company.founded),
      slogan: company.tagline,
      description:
        'Furniture maker and interior design workshop in Kathmandu, Nepal. Modular kitchens, wardrobes, beds, sofas, dining tables, TV showcases, study tables, parquet flooring and wooden railings, designed and built in house.',
      image: [`${company.url}/og/home.jpg`, `${company.url}/og/modular-kitchen.jpg`],
      logo: `${company.url}/apple-icon.png`,
      priceRange: '$$$',
      currenciesAccepted: 'NPR',
      knowsLanguage: ['en', 'ne'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: company.addressParts.street,
        addressLocality: company.addressParts.locality,
        addressRegion: company.addressParts.region,
        postalCode: company.addressParts.postalCode,
        addressCountry: company.addressParts.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: company.geo.latitude,
        longitude: company.geo.longitude,
      },
      hasMap: company.mapUrl,
      sameAs: company.social,
      areaServed: ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Nepal'].map((name) => ({ '@type': 'Place', name })),
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '18:30',
      },
      // Typed as Service, not Product: these are category listings with no
      // price of their own, and Google's Product rich-result check requires
      // every 'Product' it finds to carry offers, a review or an
      // aggregateRating. Marking these Product produced nine "critical
      // issue" entries on every single page of the site, because this schema
      // is emitted site-wide from the root layout. The real priced items are
      // the individual designs, correctly typed Product with an offer, in
      // each collection page's own schema below.
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Furniture collections',
        itemListElement: categories.map((c) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: c.name,
            description: c.description,
            url: `${company.url}/collections/${c.slug}`,
            image: `${company.url}/og/${c.slug}.jpg`,
          },
        })),
      },
      // Add the Instagram and Google Business Profile URLs to company.social
      // as they exist.
      //
      // No aggregateRating until the testimonials on this site are real,
      // verifiable customers. Marking up invented reviews breaks Google's
      // policy and can get the whole site's rich results removed.
    },
    {
      '@type': 'WebSite',
      '@id': `${company.url}#website`,
      url: company.url,
      name: company.name,
      inLanguage: 'en-NP',
      publisher: { '@id': `${company.url}#business` },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-NP" className={`bg-background ${fraunces.variable} ${manrope.variable}`}>
      <body className="antialiased min-h-svh flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteNav />
        <div id="main" className="flex-1">
          {children}
        </div>
        <QuickContact />
        <SelectionBar />
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
