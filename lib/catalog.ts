export const company = {
  name: 'Anand Furniture Pvt. Ltd.',
  shortName: 'Anand',
  tagline: 'Homes, made by hand.',
  phone: '9851099571',
  phoneDisplay: '+977 985-1099571',
  whatsapp: '9779851099571',
  email: 'hello@anandfurniture.com',
  address: 'Showroom & Workshop, Kathmandu, Nepal',
  hours: 'Sun – Fri, 10:00 – 18:30',
  founded: 1998,
  url: 'https://anandfurniture.com',
}

import { galleryFiles } from '@/lib/gallery.generated'

export type Design = {
  id: string
  name: string
  material: string
  finish: string
  dimensions: string
  leadTime: string
  /**
   * Indicative starting price in NPR. PLACEHOLDER VALUES — replace with the
   * real numbers before the site goes live. A price with a `priceUnit` is
   * charged by that unit, otherwise it is the price of the piece.
   */
  priceFrom: number
  priceUnit?: string
  image: string
  note: string
}

export type Shot = { src: string; caption: string }

/**
 * A material fact and where it sits on that room's photograph, as a percentage
 * of the frame from the left and the top. The site draws a leader line from
 * that point out to the label, so if you change a photograph, nudge these two
 * numbers until the pin lands on the thing it describes.
 */
export type Spec = { text: string; at: [number, number] }

export type Category = {
  slug: string
  name: string
  room: string
  sceneIndex: string
  /** Page title and meta description for this collection, written for search. */
  seo: { title: string; description: string }
  /**
   * Two or three technical facts about how this room is built, shown over the
   * photograph as you walk the house. These are PUBLIC CLAIMS, like the ones in
   * `craft` below: confirm every figure with the workshop before going live.
   */
  specs: [Spec, Spec, Spec]
  tagline: string
  description: string
  image: string
  accent: string
  /** Swatch strip: the materials this room is usually built from. */
  materials: { name: string; note: string; hex: string }[]
  gallery: Shot[]
  designs: Design[]
}

type CategorySeed = Omit<Category, 'image' | 'gallery' | 'designs' | 'sceneIndex'> & {
  /** One line per photograph, in the same order as the files. Extra photographs
   * simply show the room's tagline, so a caption is optional. */
  galleryCaptions: string[]
  designs: Omit<Design, 'image'>[]
}

const OAK = { name: 'Natural oak', note: 'Brushed, hard-wax oiled', hex: '#c99a63' }
const WALNUT = { name: 'American walnut', note: 'Hand-oiled, open grain', hex: '#6b4630' }
const TEAK = { name: 'Burma teak', note: 'Natural oil, ages golden', hex: '#a5763f' }
const ASH = { name: 'Smoked ash', note: 'Fumed, matte lacquer', hex: '#8a7660' }
const CHARCOAL = { name: 'Charcoal matte', note: 'Fingerprint-resistant laminate', hex: '#33302c' }
const LINEN = { name: 'Oatmeal linen', note: 'Belgian weave, 60k rubs', hex: '#cbbba4' }
const BRASS = { name: 'Antique brass', note: 'Solid, unlacquered', hex: '#b08d4f' }
const STONE = { name: 'Quartz stone', note: '20 mm, mitred edge', hex: '#9a958c' }
const VELVET = { name: 'Forest velvet', note: 'Cotton pile, stain-guarded', hex: '#3d4d3f' }
const GLASS = { name: 'Toughened glass', note: '12 mm, polished edge', hex: '#7d8a8c' }
const STEEL = { name: 'Blackened steel', note: 'Powder-coated, 3 mm', hex: '#2e2f31' }
const BOUCLE = { name: 'Ivory bouclé', note: 'Looped wool blend', hex: '#ddd2c0' }

const seeds: CategorySeed[] = [
  {
    slug: 'modular-kitchen',
    seo: {
      title: 'Modular Kitchen Design in Nepal — Prices & Photos',
      description: "Modular kitchen design and fitting in Kathmandu, from NPR 3,20,000. Island, parallel, straight and U-shaped kitchens in 18 mm BWP marine ply with soft-close hardware and quartz tops. Photos, prices and lead times.",
    },
    specs: [
      { text: '18 mm BWP marine ply carcass', at: [80, 26] },
      { text: 'Soft-close hinges, cycle-tested', at: [77, 60] },
      { text: '20 mm quartz top, mitred edge', at: [43, 47] },
    ],
    name: 'Modular Kitchen',
    room: 'The Kitchen',
    tagline: 'Where every morning begins.',
    description:
      'Handleless modular kitchens built around the way you actually cook. Soft-close hardware, marine-grade plywood carcasses and stone or laminate worktops, planned to the last millimetre.',
    accent: 'Charcoal & natural oak',
    materials: [CHARCOAL, OAK, STONE, BRASS],
    galleryCaptions: [
      'The full plan: island, tall units and a run of drawers under the hob.',
      'Handleless shutters with a 20 mm shadow gap, so nothing catches a sleeve.',
      'Breakfast ledge in solid oak, cantilevered off the island carcass.',
      'Inside a drawer: birch ply dividers cut for your own pans.',
      'The same soft-close runner, tested a hundred times before it leaves the bench.',
    ],
    designs: [
      { id: 'k1', name: 'Aarohan Island Kitchen', material: 'Marine ply, oak veneer', finish: 'Matte charcoal / clear oak', dimensions: 'L-shape, 3.6 m x 2.8 m', leadTime: '5–6 weeks', priceFrom: 650000, note: 'Central island with breakfast ledge and integrated hob.' },
      { id: 'k2', name: 'Linea Parallel Kitchen', material: 'HDHMR, acrylic shutters', finish: 'Warm white / walnut', dimensions: 'Parallel, 3.0 m runs', leadTime: '4–5 weeks', priceFrom: 480000, note: 'Two working walls, tall pantry unit with pull-out baskets.' },
      { id: 'k3', name: 'Nira Straight Kitchen', material: 'BWP ply, laminate', finish: 'Sage green / oak', dimensions: 'Straight, 3.2 m', leadTime: '3–4 weeks', priceFrom: 320000, note: 'Compact plan for apartments with overhead lift-up cabinets.' },
      { id: 'k4', name: 'Vistara Open Kitchen', material: 'Solid oak frames, quartz', finish: 'Natural oak / stone', dimensions: 'U-shape, 4.2 m x 3.4 m', leadTime: '6–8 weeks', priceFrom: 850000, note: 'Open-plan kitchen with a dining ledge that faces the living room.' },
    ],
  },
  {
    slug: 'living-room',
    seo: {
      title: 'Living Room & TV Showcase Design in Nepal',
      description: "TV showcase units, media walls, consoles and centre tables for Nepali living rooms. Fluted oak panelling, hidden shelf lighting and screwed ply backs, built and installed in Kathmandu. See designs, photos and starting prices.",
    },
    specs: [
      { text: 'Solid oak flutes, turned in-house', at: [54, 30] },
      { text: '9 mm ply back, screwed not stapled', at: [46, 62] },
      { text: 'Rebated LED, no visible fitting', at: [69, 21] },
    ],
    name: 'Living Room',
    room: 'The Living Room',
    tagline: 'The room that holds the family.',
    description:
      'TV units, wall panelling, centre tables and display consoles designed as one composition, so the room reads as a single quiet gesture rather than a collection of pieces.',
    accent: 'Fluted oak & linen',
    materials: [OAK, LINEN, WALNUT, BRASS],
    galleryCaptions: [
      'Panelling, console and centre table drawn as one elevation.',
      'Fluted oak, each rib turned on our own spindle moulder.',
      'The console floats 180 mm off the floor so the parquet runs unbroken.',
      'Shadow-gap lighting washes down the flutes after dark.',
      'Edge detail: solid lipping on veneer, so corners survive a vacuum cleaner.',
    ],
    designs: [
      { id: 'l1', name: 'Fluted Oak Media Wall', material: 'Solid oak fluting on ply', finish: 'Natural oil', dimensions: '4.2 m x 2.7 m', leadTime: '4–5 weeks', priceFrom: 285000, note: 'Floor-to-ceiling panelling with a floating walnut TV console.' },
      { id: 'l2', name: 'Shanti Low Console', material: 'Walnut veneer', finish: 'Satin lacquer', dimensions: '2.4 m x 0.45 m x 0.42 m', leadTime: '3 weeks', priceFrom: 95000, note: 'Three soft-close drawers, cable management channel.' },
      { id: 'l3', name: 'Kesar Centre Table', material: 'Solid walnut, marble top', finish: 'Hand-oiled', dimensions: '1.2 m x 0.7 m x 0.4 m', leadTime: '2–3 weeks', priceFrom: 48000, note: 'Rounded corners, marble inlay on a sculpted timber base.' },
    ],
  },
  {
    slug: 'wardrobes',
    seo: {
      title: 'Wardrobe Design in Nepal — Sliding, Walk-in & Dressing Tables',
      description: "Wardrobes and dressing tables made to your wall in Kathmandu: walk-in wardrobes, sliding three-door, hinged loft units. 18 mm BWP ply, sealed edges, full-extension runners. Designs, photos and prices from NPR 78,000.",
    },
    specs: [
      { text: '18 mm BWP ply, edges sealed', at: [29, 33] },
      { text: 'Full-extension runners, 40 kg rated', at: [61, 69] },
      { text: 'Solid brass hanging rail', at: [79, 39] },
    ],
    name: 'Wardrobes',
    room: 'The Dressing Room',
    tagline: 'Everything in its place.',
    description:
      'Sliding, hinged and walk-in wardrobes with internal fittings planned around your clothes, not a standard grid. Soft lighting, brass rails and drawers that glide.',
    accent: 'Walnut & brass',
    materials: [WALNUT, BRASS, GLASS, LINEN],
    galleryCaptions: [
      'A walk-in planned around a real wardrobe count, not a catalogue grid.',
      'Open shelving in walnut with a solid brass hanging rail.',
      'Glass-front drawers, so you can see the shirt without opening it.',
      'Sensor lighting inside the hanging bay, warm 2700 K.',
      'The drawer box: birch ply, dovetailed, no staples anywhere.',
    ],
    designs: [
      { id: 'w1', name: 'Aangan Walk-in Wardrobe', material: 'Walnut veneer on BWP ply', finish: 'Satin matte', dimensions: '3.6 m x 2.4 m room', leadTime: '6 weeks', priceFrom: 420000, note: 'Open shelving, glass-front drawers and a central island dresser.' },
      { id: 'w2', name: 'Sliding Wardrobe, 3 Door', material: 'HDHMR, lacquered glass', finish: 'Smoke grey / oak', dimensions: '2.7 m x 2.4 m x 0.6 m', leadTime: '4 weeks', priceFrom: 185000, note: 'Top-hung sliders with integrated mirror panel.' },
      { id: 'w4', name: 'Darpan Dressing Table', material: 'Walnut veneer, brass', finish: 'Satin matte', dimensions: '1.2 m x 0.45 m x 1.9 m', leadTime: '3 weeks', priceFrom: 78000, note: 'Lit mirror, three shallow drawers and a stool that tucks fully under.' },
      { id: 'w3', name: 'Hinged Loft Wardrobe', material: 'Marine ply, laminate', finish: 'Warm white / walnut', dimensions: '2.1 m x 2.7 m', leadTime: '3–4 weeks', priceFrom: 135000, note: 'Four doors with a loft storage band and shoe drawers.' },
    ],
  },
  {
    slug: 'dining-tables',
    seo: {
      title: 'Dining Table Design in Nepal — Solid Wood & Live Edge',
      description: "Solid wood dining tables in Kathmandu: live-edge walnut slabs, round teak pedestals and extendable tables, with chairs to match. Timber dried to 8–10% moisture. Photos, seating sizes and prices from NPR 18,500.",
    },
    specs: [
      { text: 'Single walnut slab, dried to 8–10%', at: [54, 60] },
      { text: 'Butterfly joints in contrasting teak', at: [71, 71] },
      { text: 'Blackened steel base, 3 mm', at: [57, 84] },
    ],
    name: 'Dining Tables',
    room: 'The Dining Room',
    tagline: 'Long tables, longer evenings.',
    description:
      'Solid timber dining tables built from single slabs and joined boards, paired with chairs upholstered in fabrics that age gracefully.',
    accent: 'Live-edge walnut',
    materials: [WALNUT, TEAK, STEEL, LINEN],
    galleryCaptions: [
      'Two-and-a-half metres of walnut, one slab, eight chairs.',
      'The live edge, sanded to 240 grit and left as the tree left it.',
      'Butterfly joints in contrasting teak hold the natural checks closed.',
      'Blackened steel base, welded and ground in the same workshop.',
      'Chair back rail, steam-bent over a form we cut for this shape.',
    ],
    designs: [
      { id: 'd1', name: 'Sabha Live-Edge Table', material: 'Solid walnut slab', finish: 'Hard-wax oil', dimensions: '2.4 m x 1.0 m, seats 8', leadTime: '5 weeks', priceFrom: 240000, note: 'Single slab with butterfly joints and a blackened steel base.' },
      { id: 'd2', name: 'Bhojan Round Table', material: 'Solid teak', finish: 'Natural oil', dimensions: '1.4 m diameter, seats 6', leadTime: '4 weeks', priceFrom: 145000, note: 'Pedestal base, gentle bevelled edge.' },
      { id: 'd3', name: 'Mehfil Extendable Table', material: 'Oak veneer, solid oak legs', finish: 'Clear matte', dimensions: '1.8 m to 2.4 m, seats 6–8', leadTime: '4–5 weeks', priceFrom: 165000, note: 'Butterfly leaf hidden under the top.' },
      { id: 'd4', name: 'Anand Dining Chair', material: 'Solid ash, linen', finish: 'Smoked ash', dimensions: '0.48 m x 0.55 m x 0.82 m', leadTime: '3 weeks', priceFrom: 18500, note: 'Curved back rail, available in 6 fabric options.' },
    ],
  },
  {
    slug: 'beds',
    seo: {
      title: 'Bed Design in Nepal — Platform, Storage & Upholstered',
      description: "Beds made in Kathmandu: platform beds, hydraulic storage beds and upholstered headboards on hardwood slat bases. Bedside tables matched to the grain. Photos, sizes and prices from NPR 78,000.",
    },
    specs: [
      { text: 'Hardwood slat base at 60 mm centres', at: [54, 73] },
      { text: 'Bouclé over a hardwood frame', at: [47, 39] },
      { text: 'Gas-strut lift on storage beds', at: [73, 61] },
    ],
    name: 'Beds',
    room: 'The Bedroom',
    tagline: 'Rest, built to last decades.',
    description:
      'Platform beds, upholstered headboards and storage beds in solid wood. Slatted bases, hydraulic lift storage and bedside tables that match to the grain.',
    accent: 'Bouclé & walnut slats',
    materials: [WALNUT, BOUCLE, OAK, BRASS],
    galleryCaptions: [
      'Headboard, side tables and slat wall set out from one centre line.',
      'Bouclé stretched over a hardwood frame, hand-stapled and piped.',
      'Side tables float off the headboard, so the floor stays clear.',
      'Slat wall in solid oak with acoustic felt behind it.',
      'Under the mattress: beech slats on rubber mounts, not a ply sheet.',
    ],
    designs: [
      { id: 'b1', name: 'Nidra Platform Bed', material: 'Solid walnut, bouclé', finish: 'Hand-oiled', dimensions: 'King, 1.8 m x 2.0 m', leadTime: '4 weeks', priceFrom: 165000, note: 'Tall upholstered headboard with floating side tables.' },
      { id: 'b2', name: 'Sanjh Storage Bed', material: 'BWP ply, walnut veneer', finish: 'Satin lacquer', dimensions: 'Queen, 1.5 m x 2.0 m', leadTime: '4–5 weeks', priceFrom: 135000, note: 'Hydraulic lift with full under-bed storage.' },
      { id: 'b3', name: 'Slat Wall Headboard', material: 'Solid oak slats on ply', finish: 'Natural oil', dimensions: '3.0 m x 2.4 m', leadTime: '3 weeks', priceFrom: 78000, note: 'Acoustic felt backing with concealed sconce wiring.' },
    ],
  },
  {
    slug: 'sofas',
    seo: {
      title: 'Sofa Design in Nepal — Sectionals, Three-Seaters & Armchairs',
      description: "Sofas built in Kathmandu on kiln-dried teak frames with high-resilience foam and feather-wrapped cushions, not the soft foam that flattens in a year. L-shaped sectionals, three-seaters and armchairs from NPR 62,000.",
    },
    specs: [
      { text: 'High-resilience foam, 35 density', at: [57, 41] },
      { text: 'Feather-wrapped seat cushions', at: [73, 33] },
      { text: 'Kiln-dried teak frame, dowelled', at: [49, 79] },
    ],
    name: 'Sofas',
    room: 'The Lounge',
    tagline: 'Sink in. Stay a while.',
    description:
      'Frames in kiln-dried hardwood, high-resilience foam with feather-wrapped cushions, and fabrics chosen for how they feel on a Sunday afternoon.',
    accent: 'Forest velvet & teak',
    materials: [VELVET, TEAK, LINEN, BOUCLE],
    galleryCaptions: [
      'A sectional sized to the room, not to a shipping carton.',
      'Exposed teak base, mitred and splined at every corner.',
      'Seat cushions: high-resilience foam wrapped in feather.',
      'Velvet laid so the pile runs one way across all three seats.',
      'Frame stage, before upholstery: kiln-dried hardwood, dowelled and glued.',
    ],
    designs: [
      { id: 's1', name: 'Vana L-Shaped Sectional', material: 'Teak frame, velvet', finish: 'Forest green', dimensions: '3.2 m x 1.8 m', leadTime: '4 weeks', priceFrom: 195000, note: 'Deep seat, loose back cushions, exposed teak base.' },
      { id: 's2', name: 'Chaya Three-Seater', material: 'Ash frame, linen blend', finish: 'Oatmeal', dimensions: '2.2 m x 0.9 m', leadTime: '3–4 weeks', priceFrom: 125000, note: 'Slim track arms and turned wooden legs.' },
      { id: 's3', name: 'Ekant Armchair', material: 'Walnut, bouclé', finish: 'Ivory bouclé', dimensions: '0.8 m x 0.85 m', leadTime: '3 weeks', priceFrom: 62000, note: 'Sculpted shell on a swivel timber base.' },
    ],
  },
  {
    slug: 'parquet-flooring',
    seo: {
      title: 'Parquet Flooring in Nepal — Herringbone, Chevron & Plank',
      description: "Engineered and solid parquet flooring supplied and laid in Kathmandu: herringbone, chevron and wide plank in oak and walnut, 14 mm with a 4 mm wear layer, finished on site with hard-wax oil. Prices per square foot.",
    },
    specs: [
      { text: '14 mm engineered oak, 4 mm wear layer', at: [44, 81] },
      { text: 'Hard-wax oil, no plastic film', at: [70, 64] },
      { text: 'Laid and finished on site', at: [86, 44] },
    ],
    name: 'Parquet Flooring',
    room: 'The Floor',
    tagline: 'The ground beneath every room.',
    description:
      'Engineered and solid parquet in herringbone, chevron and plank patterns. Laid by our own team and finished on site with hard-wax oils.',
    accent: 'Herringbone oak',
    materials: [OAK, WALNUT, ASH, TEAK],
    galleryCaptions: [
      'Herringbone set out from the centre of the room, both walls cut equal.',
      'Ninety-degree blocks, 600 x 120 mm, brushed and oiled.',
      'Where the pattern meets a doorway, a solid oak threshold takes the joint.',
      'Chevron in smoked oak: every board mitred at forty-five degrees.',
      'Second coat of hard-wax oil, buffed in by hand on site.',
    ],
    designs: [
      { id: 'p1', name: 'Herringbone Oak', material: 'Engineered oak, 14 mm', finish: 'Natural hard-wax oil', dimensions: '600 x 120 mm blocks', leadTime: '2–3 weeks', priceFrom: 850, priceUnit: 'per sq ft', note: 'Classic 90-degree pattern, brushed surface.' },
      { id: 'p2', name: 'Chevron Smoked Oak', material: 'Engineered oak, 15 mm', finish: 'Smoked & oiled', dimensions: '45-degree chevron', leadTime: '3 weeks', priceFrom: 950, priceUnit: 'per sq ft', note: 'Deeper tone for living and dining rooms.' },
      { id: 'p3', name: 'Wide Plank Walnut', material: 'Solid walnut, 18 mm', finish: 'Matte lacquer', dimensions: '1800 x 190 mm planks', leadTime: '3–4 weeks', priceFrom: 1250, priceUnit: 'per sq ft', note: 'Long boards for bedrooms and studies.' },
    ],
  },
  {
    slug: 'railings',
    seo: {
      title: 'Wooden Railing Design in Nepal — Stair & Balcony',
      description: "Wooden and glass stair railings in Kathmandu: solid oak handrails with laminated wreaths, blackened steel balusters and frameless glass infill, made and fitted to your stair. Prices per running metre.",
    },
    specs: [
      { text: 'Solid oak rail, laminated wreath', at: [59, 29] },
      { text: '3 mm steel, powder-coated', at: [73, 56] },
      { text: 'Balusters at 100 mm centres', at: [54, 71] },
    ],
    name: 'Railings',
    room: 'The Staircase',
    tagline: 'The line that carries you upstairs.',
    description:
      'Timber staircases and railings with continuous handrails, slim balusters and steel or glass infill, shaped by hand to fit your stair exactly.',
    accent: 'Walnut treads & oak balusters',
    materials: [OAK, WALNUT, STEEL, GLASS],
    galleryCaptions: [
      'One continuous handrail from the first tread to the landing.',
      'Balusters at 100 mm centres, slim enough to see through.',
      'The wreath: where the rail turns, laminated and shaped by hand.',
      'Glass infill on a timber base rail, no visible clamps.',
      'Open risers in solid walnut, housed and wedged into the string.',
    ],
    designs: [
      { id: 'r1', name: 'Vertical Baluster Railing', material: 'Solid oak, black steel', finish: 'Clear matte', dimensions: 'Per running metre', leadTime: '3–4 weeks', priceFrom: 12500, priceUnit: 'per running metre', note: 'Slim 40 mm balusters with a continuous wreathed handrail.' },
      { id: 'r2', name: 'Glass Infill Railing', material: 'Walnut, toughened glass', finish: 'Hand-oiled', dimensions: 'Per running metre', leadTime: '4 weeks', priceFrom: 18500, priceUnit: 'per running metre', note: 'Frameless glass panels on a timber base rail.' },
      { id: 'r3', name: 'Solid Tread Staircase', material: 'Solid walnut treads', finish: 'Hard-wax oil', dimensions: 'Custom to site', leadTime: '6–8 weeks', priceFrom: 22000, priceUnit: 'per running metre', note: 'Open riser stair with matching railing.' },
    ],
  },
  {
    slug: 'modular-design',
    seo: {
      title: 'Modular Furniture & Study Table Design in Nepal',
      description: "Library walls, home office units, study tables, shoe cabinets and pooja units built on an 18 mm ply grid in Kathmandu. Cable routes cut before assembly, interchangeable shelves. Photos and prices from NPR 55,000.",
    },
    specs: [
      { text: '18 mm ply on a 320 mm grid', at: [71, 34] },
      { text: 'Every upright takes the same shelf', at: [54, 24] },
      { text: 'Cable routes cut before assembly', at: [63, 71] },
    ],
    name: 'Modular Design',
    room: 'The Study',
    tagline: 'Systems that grow with you.',
    description:
      'Modular shelving, study units, shoe racks and pooja units on a shared grid, so pieces can be added, moved or reconfigured over the years.',
    accent: 'Walnut grid & brass',
    materials: [WALNUT, BRASS, OAK, ASH],
    galleryCaptions: [
      'A library wall on a 320 mm grid, desk built into the same run.',
      'Shelf lighting hidden in a rebate, no visible fitting.',
      'Every upright takes the same shelf, so the wall can be re-planned later.',
      'Carved jali doors for the pooja unit, cut in solid teak.',
      'Brass pulls, turned to our own profile and left unlacquered.',
    ],
    designs: [
      { id: 'm1', name: 'Granth Library Wall', material: 'Walnut veneer, solid edges', finish: 'Satin', dimensions: '4.0 m x 2.7 m', leadTime: '5–6 weeks', priceFrom: 320000, note: 'Integrated desk, hidden LED shelf lighting.' },
      { id: 'm2', name: 'Karya Home Office Unit', material: 'Oak veneer, steel', finish: 'Natural oak', dimensions: '1.8 m x 0.6 m x 2.1 m', leadTime: '4 weeks', priceFrom: 145000, note: 'Desk, overhead storage and cable trays in one module.' },
      { id: 'm3', name: 'Dwar Shoe & Entry Unit', material: 'BWP ply, laminate', finish: 'Warm white / oak', dimensions: '1.2 m x 0.35 m x 1.1 m', leadTime: '2–3 weeks', priceFrom: 68000, note: 'Tilt-out shoe drawers with a padded bench top.' },
      { id: 'm5', name: 'Adhyayan Study Table', material: 'Oak veneer, solid oak legs', finish: 'Clear matte', dimensions: '1.4 m x 0.6 m x 0.75 m', leadTime: '3 weeks', priceFrom: 55000, note: 'Cable tray, one drawer and a shelf sized for school books.' },
      { id: 'm4', name: 'Aradhana Pooja Unit', material: 'Solid teak', finish: 'Natural oil', dimensions: '0.9 m x 0.45 m x 2.1 m', leadTime: '4 weeks', priceFrom: 125000, note: 'Carved jali doors with a concealed drawer for essentials.' },
    ],
  },
]

/**
 * The order the camera walks the house in: through the front door, up the stair,
 * across the floor, then room by room. Scene 01 is the door itself, so a room's
 * scene number is its position here plus one.
 */
export const houseRoute: readonly string[] = [
  'railings',
  'parquet-flooring',
  'living-room',
  'sofas',
  'dining-tables',
  'modular-kitchen',
  'beds',
  'wardrobes',
  'modular-design',
]

export const categories: Category[] = seeds.map((seed) => {
  // Photographs come from public/gallery/<slug>/, listed by scripts/gallery.mjs.
  const files = galleryFiles[seed.slug]?.length ? galleryFiles[seed.slug] : ['/rooms/workshop.webp']
  return {
    ...seed,
    image: files[0],
    sceneIndex: `Scene ${String(houseRoute.indexOf(seed.slug) + 2).padStart(2, '0')}`,
    gallery: files.map((src, i) => ({ src, caption: seed.galleryCaptions[i] ?? seed.tagline })),
    designs: seed.designs.map((d, i) => ({ ...d, image: files[i % files.length] })),
  }
})

export const totalDesigns = categories.reduce((a, c) => a + c.designs.length, 0)

/** Flat, browsable list of every design with the room it belongs to. */
export const allDesigns = categories.flatMap((c) => c.designs.map((design) => ({ design, category: c })))

/**
 * CLAIMS ABOUT HOW ANAND BUILDS.
 *
 * Every line below is a public promise, so confirm each one with the workshop
 * before the site goes live and change anything that is not exactly true. The
 * board thicknesses, the moisture range, the cycle-tested hardware, the six
 * month revisit and the timings in `process` are the ones to check first.
 */
export const craft = {
  materials: [
    {
      part: 'Carcass',
      spec: '18 mm BWP marine plywood',
      why: 'Boiling-water-proof glue line. A Kathmandu monsoon swells particle board and MDF until the doors stop closing. This does not swell.',
    },
    {
      part: 'Frames & legs',
      spec: 'Kiln-seasoned hardwood, 8–10% moisture',
      why: 'Timber that was still green when it was cut keeps shrinking after it reaches your house. That is why cheap frames open at the joints in the first winter.',
    },
    {
      part: 'Surfaces',
      spec: '0.6 mm natural wood veneer',
      why: 'A real slice of the same log, so the grain runs continuously across a whole wardrobe. Printed laminate repeats every few feet and the eye always catches it.',
    },
    {
      part: 'Hardware',
      spec: 'Soft-close hinges, full-extension runners',
      why: 'Rated in tested opening cycles, not in years. The hinge is the first part of a kitchen to die, so it is the last part to economise on.',
    },
    {
      part: 'Finish',
      spec: 'Hard-wax oil or fully cured PU',
      why: 'It sits in the wood rather than on top of it, so a scratch can be spot-repaired in your house instead of resprayed in ours.',
    },
    {
      part: 'Edges',
      spec: 'Machine-pressed, sealed banding',
      why: 'That lifting strip on a five-year-old kitchen is a hand-glued edge. Pressed banding is sealed the same day the board is cut and does not peel.',
    },
  ],
  comparison: [
    { part: 'Carcass board', ours: '18 mm BWP marine ply', usual: '12 mm MDF or particle board' },
    { part: 'Back panel', ours: '9 mm ply, screwed to the frame', usual: '3 mm sheet, stapled on' },
    { part: 'Frame timber', ours: 'Kiln-seasoned, moisture checked', usual: 'Air-dried, sold the same week' },
    { part: 'Hinges & runners', ours: 'Soft-close, cycle-tested', usual: 'Unrated, replaced within two years' },
    { part: 'Exposed edges', ours: 'Pressed and sealed', usual: 'Glued strip' },
    { part: 'Finish', ours: 'Cured, spot-repairable', usual: 'One spray coat' },
    { part: 'Timeline', ours: 'In writing, before you pay', usual: '"Next week"' },
  ],
  myths: [
    {
      myth: 'Solid wood is always better than plywood.',
      truth:
        'Across a two-metre shutter, solid wood cups and splits as the seasons turn. Marine ply stays flat for decades. Solid wood belongs where it earns its place, in frames, legs and table tops, and we use it there. Anyone selling you solid panels everywhere is selling you future repairs.',
    },
    {
      myth: 'Modular means factory-made and generic.',
      truth:
        'Modular is a method of building, not a style. Your wall is never the round number on the drawing, so every carcass is cut to the measurement we take on site, in your house, with a laser.',
    },
    {
      myth: 'Veneer is fake wood.',
      truth:
        'Veneer is wood. It is a slice of the same log, laid over a substrate that will not move. It is how nearly every expensive piece of furniture in the world is made, because a solid panel that wide would tear itself apart.',
    },
    {
      myth: 'The shop down the road quoted half for the same thing.',
      truth:
        'It is not the same thing, and the difference is in the parts you cannot see from the showroom floor. Ask them to write down the board thickness, the back panel, the hinge rating and whether the edges are sealed. Then put their sheet next to ours.',
    },
    {
      myth: 'Good furniture should be ready next week.',
      truth:
        'Seasoned timber, a cured finish and a proper install take three to six weeks. Anything promised in a week skipped either the seasoning or the curing, and you will find out which one within a year.',
    },
    {
      myth: 'It is expensive.',
      truth:
        'It costs more once. Priced across the years you actually use it, a wardrobe replaced twice in fifteen years is the expensive one. We would rather build you one piece than three.',
    },
  ],
  process: [
    {
      title: 'We measure the wall you have',
      detail: 'A laser survey of the room as it was actually built, not as it was drawn. Floors slope and corners are rarely square, and both change the cut list.',
      when: 'Day one',
    },
    {
      title: 'You hold the materials',
      detail: 'Elevations to scale, the veneer and the finish in your hand, and a written specification with a price against every line. Nothing starts until you have signed that sheet.',
      when: 'Week one',
    },
    {
      title: 'Boards are chosen, not just ordered',
      detail: 'Timber is picked for grain and checked for moisture before a single cut. A board that reads badly next to its neighbour goes back on the rack.',
      when: 'Week one to two',
    },
    {
      title: 'Cut, and sealed the same day',
      detail: 'Panel-sawn to the millimetre. Every exposed edge is banded and pressed before the board leaves the bench, because an open edge drinks moisture overnight.',
      when: 'Week two to three',
    },
    {
      title: 'Joined, then left alone to cure',
      detail: 'Dowelled and screwed, never stapled. Sanded up through the grits, finished, and then simply left. A finish that has not cured will print every fingerprint for a year.',
      when: 'Week three to five',
    },
    {
      title: 'Installed by the people who built it',
      detail: 'Our own fitters, our own van. Levelled to your floor, scribed to your wall, and every door and drawer set by hand before we leave.',
      when: 'Week five to six',
    },
  ],
  aftercare:
    'We come back at six months to re-set every hinge and runner, because timber and a new house both move in the first year. There is no charge for that visit.',
} as const

export const PRICE_NOTE =
  'Indicative starting prices. Every piece is made to measure, so the final quote follows the site visit.'

export function formatPrice({ priceFrom, priceUnit }: Pick<Design, 'priceFrom' | 'priceUnit'>) {
  return `NPR ${priceFrom.toLocaleString('en-IN')}${priceUnit ? ` ${priceUnit}` : ''}`
}

export const walkthroughScenes = [
  {
    slug: 'entrance',
    label: 'The Entrance',
    index: 'Scene 01',
    title: 'Step inside.',
    copy: 'Every Anand home begins at the door. Solid walnut, brass, and the floor you will walk on for the next thirty years.',
    image: '/rooms/entrance.webp',
    href: '/collections',
    specs: [
      { text: 'Solid walnut door, 45 mm thick', at: [61, 44] },
      { text: 'Unlacquered brass, left to age', at: [70, 54] },
      { text: 'Herringbone oak underfoot', at: [74, 86] },
    ] as [Spec, Spec, Spec],
  },
  ...houseRoute.map((slug) => {
    const c = categories.find((x) => x.slug === slug)!
    return {
      slug: c.slug,
      label: c.room,
      index: c.sceneIndex,
      title: c.tagline,
      copy: c.description,
      image: c.image,
      href: `/collections/${c.slug}`,
      specs: c.specs,
    }
  }),
]

export const testimonials = [
  { name: 'Priya Shrestha', location: 'Lazimpat', rating: 5, text: 'They walked us through the whole house on a screen before a single board was cut. The kitchen looks exactly like the render, only warmer.' },
  { name: 'Rajan Maharjan', location: 'Bhaisepati', rating: 5, text: 'Our parquet was laid in four days and finished on site. Three years on, not a single board has lifted.' },
  { name: 'Anita & Sunil Gurung', location: 'Pokhara', rating: 5, text: 'The wardrobe was planned around our actual clothes. Every drawer has a purpose. That is the difference.' },
  { name: 'Deepak Karki', location: 'Budhanilkantha', rating: 4, text: 'Beautiful dining table, honest lead time. Would have liked more fabric samples for the chairs but the finish is superb.' },
]

export const faqs = [
  {
    q: 'How does a project start?',
    a: 'With a visit. We come to the site, measure every wall, and talk through how you use the rooms today. The first conversation and the first drawing are free.',
  },
  {
    q: 'Can you do the whole house, or only one room?',
    a: 'Both. Most clients start with a kitchen or a wardrobe and carry on room by room. Because we draw the whole house first, the timber and hardware still match three years later.',
  },
  {
    q: 'How long does it take?',
    a: 'A single wardrobe or table is three to four weeks. A full kitchen is five to six. A complete house is usually eight to twelve weeks, planned so you can keep living in it.',
  },
  {
    q: 'What does it cost?',
    a: 'It depends on timber, size and finish, so we quote per project rather than per square foot. You get an itemised quote before anything is cut, and the price does not move unless the design does.',
  },
  {
    q: 'Do you install, or only supply?',
    a: 'Our own fitters install everything. The person who drew your kitchen checks it on site before we hand over the keys.',
  },
  {
    q: 'Is there a guarantee?',
    a: 'Ten years on our joinery and the structure, and the manufacturer warranty on hardware. We use screws where it matters, so a drawer can be repaired in twenty years rather than replaced.',
  },
]

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}

/** Prefilled WhatsApp deep link. */
export function waLink(text: string) {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`
}
