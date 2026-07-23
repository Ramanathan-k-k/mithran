export type Category =
  | 'Seating'
  | 'Tables'
  | 'Swings'
  | 'Storage'
  | 'Antiques'

export type Availability = 'in-stock' | 'made-to-order' | 'sold'

export interface Piece {
  id: string
  name: string
  category: Category
  description: string
  image: string
  alt: string
  /** Price in INR. Null means "Price on request" (typically one-of-one antiques). */
  price: number | null
  /** Optional original price in INR to show a sale. */
  compareAt?: number
  availability: Availability
  /** Higher = more recently published; used for default sorting. */
  published: number
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

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  'in-stock': 'In stock',
  'made-to-order': 'Made to order',
  sold: 'Sold',
}
