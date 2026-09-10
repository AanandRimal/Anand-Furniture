/**
 * Reads public/gallery/<category-slug>/ and writes the file list the site uses.
 * Runs automatically before `pnpm dev` and `pnpm build`, so adding a photo is
 * only ever: drop the file in the folder.
 */
import { existsSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const galleryDir = join(root, 'public', 'gallery')
const out = join(root, 'lib', 'gallery.generated.ts')
const isImage = /\.(webp|avif|jpe?g|png)$/i

const folders = existsSync(galleryDir)
  ? readdirSync(galleryDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort()
  : []

const blocks = []
let total = 0

for (const slug of folders) {
  const files = readdirSync(join(galleryDir, slug)).filter((f) => isImage.test(f)).sort()
  if (!files.length) {
    console.warn(`[gallery] public/gallery/${slug}/ has no images, skipping`)
    continue
  }
  total += files.length
  blocks.push(`  '${slug}': [\n${files.map((f) => `    '/gallery/${slug}/${f}',`).join('\n')}\n  ],`)
}

writeFileSync(
  out,
  `/**
 * GENERATED FILE — do not edit by hand.
 *
 * Rebuilt from public/gallery/ by scripts/gallery.mjs every time the site is
 * started or built. To add photographs to a category, drop image files into
 * public/gallery/<category-slug>/ and start the site again. Files are shown in
 * filename order, which is why they are numbered.
 */
export const galleryFiles: Record<string, string[]> = {
${blocks.join('\n')}
}
`,
)

console.log(`[gallery] ${total} photographs across ${blocks.length} categories`)
