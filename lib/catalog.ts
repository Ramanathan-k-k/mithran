export type Category =
  | 'Seating'
  | 'Tables'
  | 'Swings'
  | 'Storage'
  | 'Antiques'

export type Availability = 'in-stock' | 'made-to-order' | 'sold'

export interface ProductOption {
  name: string
  values: string[]
}

export interface ProductDetail {
  story: string
  materials: string
  dimensions: string
  delivery: string
  care: string
  options?: ProductOption[]
  variantSprite?: string
}

export interface Piece {
  id: string
  name: string
  category: Category
  description: string
  image: string
  alt: string
  price: number | null
  compareAt?: number
  availability: Availability
  published: number
  detail?: ProductDetail
}

export const CATEGORIES: {
  id: Category
  blurb: string
  image: string
  alt: string
}[] = [
  {
    id: 'Seating',
    blurb: 'Lounge chairs and low seating in teak and hand-woven cane.',
    image: '/images/naarkali-chair.png',
    alt: 'A carved teak lounge chair with woven cane',
  },
  {
    id: 'Tables',
    blurb: 'Dining and console tables held by quiet, precise joinery.',
    image: '/images/mesai-table.png',
    alt: 'A solid teak dining table in a heritage interior',
  },
  {
    id: 'Swings',
    blurb: 'Signature Oonjal swings suspended on aged brass chains.',
    image: '/images/oonjal-hero.png',
    alt: 'A hand-carved teak Oonjal swing in a courtyard',
  },
  {
    id: 'Storage',
    blurb: 'Consoles and cabinets that carry Karaikudi craft indoors.',
    image: '/images/karaikudi-console.png',
    alt: 'A slim handcrafted Karaikudi teak console table',
  },
  {
    id: 'Antiques',
    blurb: 'One-of-one restored pieces, sourced across Chettinad.',
    image: '/images/antique-cabinet.png',
    alt: 'A restored antique Karaikudi teak cabinet',
  },
]

export const PIECES: Piece[] = [
  {
    id: 'naarkali',
    name: 'Naarkali Lounge Chair',
    category: 'Seating',
    description: 'A grounded lounge chair balancing carved teak with handwoven cane.',
    image: '/images/naarkali-chair.png',
    alt: 'A sculptural teak Naarkali lounge chair with handwoven cane',
    price: 46000,
    availability: 'in-stock',
    published: 6,
    detail: {
      story: 'The Naarkali is a quiet study in repose, shaped by the generous proportions of verandah seating found across Chettinad homes. Each frame is hand-finished so the joinery remains honest and the material can age with grace.',
      materials: 'FSC-certified teak, handwoven cane or natural upholstery, brass details',
      dimensions: 'W 74 × D 82 × H 76 cm · Seat height 40 cm',
      delivery: 'Dispatches in 7–10 working days when in stock.',
      care: 'Dust with a soft dry cloth. Keep away from direct heat and prolonged moisture.',
      options: [
        { name: 'Wood', values: ['Natural Teak', 'Dark Walnut', 'Smoked Teak'] },
        { name: 'Upholstery', values: ['Ivory Cane', 'Olive Linen', 'Rust Cotton'] },
      ],
      variantSprite: '/images/naarkali-variants.png',
    },
  },
  {
    id: 'mesai',
    name: 'Mesai Dining Table',
    category: 'Tables',
    description: 'An elemental table whose generous plane rests on precise joinery.',
    image: '/images/mesai-table.png',
    alt: 'A solid teak Mesai dining table in a sunlit heritage interior',
    price: 128000,
    availability: 'made-to-order',
    published: 5,
    detail: {
      story: 'Mesai distils the communal South Indian dining table into an elemental plane. Its broad top and restrained legs celebrate the weight, grain and enduring character of solid timber.',
      materials: 'Solid plantation teak, traditional mortise-and-tenon joinery',
      dimensions: 'L 220 × W 100 × H 76 cm · Seats 8',
      delivery: 'Made to order and delivered in approximately 8–10 weeks.',
      care: 'Use coasters and trivets. Wipe spills immediately with a soft damp cloth.',
      options: [{ name: 'Wood', values: ['Natural Teak', 'Dark Walnut', 'Smoked Teak'] }],
    },
  },
  {
    id: 'oonjal',
    name: 'Oonjal Signature Swing',
    category: 'Swings',
    description: 'A hand-carved teak swing suspended on aged brass chains.',
    image: '/images/oonjal-hero.png',
    alt: 'A hand-carved teak Oonjal swing suspended by brass chains',
    price: 164000,
    availability: 'made-to-order',
    published: 4,
    detail: {
      story: 'Oonjal reinterprets the ceremonial swing as a sculptural anchor for contemporary homes. Carved by hand and held aloft on aged brass chains, it brings rhythm and stillness into a room.',
      materials: 'Solid teak platform, hand-carved rails, aged brass suspension chains',
      dimensions: 'L 183 × D 71 × H 56 cm · Chain drop made to site',
      delivery: 'Made to order and delivered in approximately 10–12 weeks.',
      care: 'Dust timber and brass with separate soft cloths. Professional installation is required.',
      options: [{ name: 'Wood', values: ['Natural Teak', 'Dark Walnut', 'Smoked Teak'] }],
    },
  },
  {
    id: 'karaikudi-console',
    name: 'Karaikudi Console',
    category: 'Storage',
    description: 'A slim console with turned legs interpreted for contemporary rooms.',
    image: '/images/karaikudi-console.png',
    alt: 'A slim handcrafted Karaikudi teak console table',
    price: 72000,
    compareAt: 84000,
    availability: 'in-stock',
    published: 3,
    detail: {
      story: 'The Karaikudi Console takes the cadence of traditional turned columns and pares it back for modern rooms. Its narrow profile makes a generous gesture without asking for much space.',
      materials: 'Solid teak, hand-turned legs, natural oil finish',
      dimensions: 'L 150 × D 42 × H 80 cm',
      delivery: 'Dispatches in 7–10 working days when in stock.',
      care: 'Dust regularly and refresh with a natural furniture oil every 12–18 months.',
      options: [{ name: 'Wood', values: ['Natural Teak', 'Dark Walnut', 'Smoked Teak'] }],
    },
  },
  {
    id: 'padukkai',
    name: 'Padukkai Daybed',
    category: 'Seating',
    description: 'A low daybed for conversation and pause, softened in cane and linen.',
    image: '/images/padukkai-daybed.png',
    alt: 'A low dark-teak Padukkai daybed with woven cane and natural linen',
    price: 98000,
    availability: 'in-stock',
    published: 2,
    detail: {
      story: 'Padukkai is a low landscape for conversation, reading and unhurried afternoons. Cane panels keep its teak frame visually light while a tailored natural cushion softens its geometry.',
      materials: 'Solid teak, handwoven cane, removable natural-fibre cushion',
      dimensions: 'L 190 × D 82 × H 65 cm · Seat height 41 cm',
      delivery: 'Dispatches in 7–10 working days when in stock.',
      care: 'Vacuum upholstery gently. Rotate the cushion monthly and keep cane dry.',
      options: [
        { name: 'Wood', values: ['Natural Teak', 'Dark Walnut', 'Smoked Teak'] },
        { name: 'Upholstery', values: ['Ivory Linen', 'Olive Linen', 'Rust Cotton'] },
      ],
      variantSprite: '/images/padukkai-variants.png',
    },
  },
  {
    id: 'antique-cabinet',
    name: 'Chettinad Antique Cabinet',
    category: 'Antiques',
    description: 'A restored one-of-one cabinet with original brass and patina.',
    image: '/images/antique-cabinet.png',
    alt: 'A restored antique Karaikudi teak cabinet with brass hardware',
    price: null,
    availability: 'sold',
    published: 1,
    detail: {
      story: 'Sourced from a Chettinad family home, this one-of-one cabinet retains the marks of a long domestic life. Our restoration secures its structure while preserving its original brass and irreplaceable patina.',
      materials: 'Antique teak, original brass hardware, restored natural finish',
      dimensions: 'W 112 × D 52 × H 168 cm',
      delivery: 'This one-of-one piece has been sold. Contact the atelier to source something similar.',
      care: 'Avoid commercial polish. Dust lightly and consult the atelier before restoration work.',
    },
  },
]

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatINR(value: number) {
  return inr.format(value)
}

export function getPiece(id: string) {
  return PIECES.find((piece) => piece.id === id)
}

export function getProductHref(piece: Piece) {
  return `/products/${piece.id}`
}

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  'in-stock': 'In stock',
  'made-to-order': 'Made to order',
  sold: 'Sold',
}
