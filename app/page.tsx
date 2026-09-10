import { Manifesto } from '@/components/home/manifesto'
import { Walkthrough } from '@/components/home/walkthrough'
import { RoomsIndex } from '@/components/home/rooms-index'
import { DesignBrowser } from '@/components/design-browser'
import { MaterialTruth } from '@/components/home/material-truth'
import { Myths } from '@/components/home/myths'
import { Process } from '@/components/home/process'
import { CraftStrip } from '@/components/home/craft-strip'
import { Testimonials } from '@/components/home/testimonials'
import { ContactCta } from '@/components/contact-cta'

export default function HomePage() {
  return (
    <main>
      <Manifesto />

      {/* the walk through the house, on the dark stage */}
      <div id="walkthrough">
        <Walkthrough />
      </div>
      <RoomsIndex />

      {/* then the pieces and their prices, then the case for them, on paper */}
      <div className="tone-paper" id="catalogue">
        <div className="h-24 md:h-32 cut-in" aria-hidden="true" />
        <DesignBrowser
          perRoom
          eyebrow="The catalogue"
          heading="Every room, and what it starts at."
          intro="One piece from each of the nine rooms, with its starting price. Tap a room to see everything in it, add what you like to a list, or open the full catalogue."
        />
        <MaterialTruth />
        <Myths />
        <Process />
        <div className="h-24 md:h-32 cut-out" aria-hidden="true" />
      </div>

      <CraftStrip />
      <Testimonials />
      <ContactCta />
    </main>
  )
}
