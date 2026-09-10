import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-svh flex flex-col items-center justify-center text-center gap-6 px-5 pt-20">
      <p className="eyebrow text-primary">Scene not found</p>
      <h1 className="text-display text-6xl md:text-8xl text-balance">This room isn&apos;t built yet.</h1>
      <Link href="/collections" className="text-sm tracking-widest uppercase text-primary border-b border-primary/50 pt-1.5 pb-1">
        Back to the collections
      </Link>
    </main>
  )
}
