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

/* -------------------------------------------------------------------------- */
/*  Product configuration: sizes, materials, and reactive variant imagery      */
/* -------------------------------------------------------------------------- */

/** Which kind of material axis a product exposes. */
export type OptionAxis = 'cushion' | 'wood'

/** The visual "family" a material maps to. Drives which photo is shown. */
export type ImageFamily = 'natural' | 'charcoal' | 'leather' | 'maroon' | 'walnut' | 'ebony'

export interface SizeOption {
  id: string
  name: string
  /** Dimensions in centimetres. */
  w: number
  d: number
  h: number
  /** Added to (or subtracted from) the base price in INR. */
  priceDelta: number
}

export interface MaterialOption {
  id: string
  name: string
  group: string
  /** CSS colour used to render the swatch. */
  swatch: string
  /** Which generated photo family this material resolves to. */
  family: ImageFamily
  kind: 'fabric' | 'leather' | 'wood'
  /** Added to the base price in INR. */
  priceDelta: number
}

export interface ProductConfig {
  axis: OptionAxis
  /** Label shown above the material selector. */
  materialLabel: string
  sizes: SizeOption[]
  materials: MaterialOption[]
  /** Family shown when the base image is used (i.e. the default photograph). */
  baseFamily: ImageFamily
  /** Extra photos keyed by family. Missing families fall back to the base image. */
  variantImages: Partial<Record<ImageFamily, string>>
}

/** Upholstery library shared by seating pieces. */
export const CUSHION_MATERIALS: MaterialOption[] = [
  { id: 'natural-linen', name: 'Natural Linen', group: 'Linen', swatch: '#d8ccb4', family: 'natural', kind: 'fabric', priceDelta: 0 },
  { id: 'oatmeal', name: 'Oatmeal', group: 'Linen', swatch: '#cdbfa2', family: 'natural', kind: 'fabric', priceDelta: 0 },
  { id: 'sand', name: 'Sand', group: 'Linen', swatch: '#c7b088', family: 'natural', kind: 'fabric', priceDelta: 0 },
  { id: 'ecru-weave', name: 'Ecru Weave', group: 'Weave', swatch: '#e2dac4', family: 'natural', kind: 'fabric', priceDelta: 2400 },
  { id: 'flax-weave', name: 'Flax Weave', group: 'Weave', swatch: '#cbb98d', family: 'natural', kind: 'fabric', priceDelta: 2400 },
  { id: 'stone-grey', name: 'Stone Grey', group: 'Linen', swatch: '#b0aca1', family: 'charcoal', kind: 'fabric', priceDelta: 0 },
  { id: 'dove-grey', name: 'Dove Grey', group: 'Linen', swatch: '#9a9d99', family: 'charcoal', kind: 'fabric', priceDelta: 0 },
  { id: 'ash', name: 'Ash', group: 'Weave', swatch: '#7d817c', family: 'charcoal', kind: 'fabric', priceDelta: 2400 },
  { id: 'charcoal', name: 'Charcoal', group: 'Weave', swatch: '#3f423f', family: 'charcoal', kind: 'fabric', priceDelta: 2400 },
  { id: 'moss-velvet', name: 'Moss Velvet', group: 'Velvet', swatch: '#5b6347', family: 'charcoal', kind: 'fabric', priceDelta: 5200 },
  { id: 'olive-velvet', name: 'Olive Velvet', group: 'Velvet', swatch: '#6d6a3b', family: 'charcoal', kind: 'fabric', priceDelta: 5200 },
  { id: 'espresso-linen', name: 'Espresso Linen', group: 'Linen', swatch: '#4a382a', family: 'charcoal', kind: 'fabric', priceDelta: 0 },
  { id: 'tan-leather', name: 'Tan Leather', group: 'Leather', swatch: '#b07a48', family: 'leather', kind: 'leather', priceDelta: 12800 },
  { id: 'cognac-leather', name: 'Cognac Leather', group: 'Leather', swatch: '#8f5029', family: 'leather', kind: 'leather', priceDelta: 12800 },
  { id: 'chestnut-leather', name: 'Chestnut Leather', group: 'Leather', swatch: '#7a4327', family: 'leather', kind: 'leather', priceDelta: 12800 },
  { id: 'pebble-leather', name: 'Pebble Leather', group: 'Leather', swatch: '#a9a091', family: 'leather', kind: 'leather', priceDelta: 12800 },
  { id: 'umber-weave', name: 'Umber Weave', group: 'Weave', swatch: '#8a5a3c', family: 'leather', kind: 'fabric', priceDelta: 2400 },
  { id: 'deep-maroon', name: 'Deep Maroon Velvet', group: 'Velvet', swatch: '#5e2230', family: 'maroon', kind: 'fabric', priceDelta: 5200 },
  { id: 'rust-velvet', name: 'Rust Velvet', group: 'Velvet', swatch: '#8a4028', family: 'maroon', kind: 'fabric', priceDelta: 5200 },
  { id: 'aubergine-velvet', name: 'Aubergine Velvet', group: 'Velvet', swatch: '#4a2438', family: 'maroon', kind: 'fabric', priceDelta: 5200 },
  { id: 'teal-velvet', name: 'Teal Velvet', group: 'Velvet', swatch: '#2f5d5a', family: 'maroon', kind: 'fabric', priceDelta: 5200 },
  { id: 'ink-blue', name: 'Ink Blue', group: 'Weave', swatch: '#2b3a52', family: 'maroon', kind: 'fabric', priceDelta: 2400 },
  { id: 'indigo-block', name: 'Indigo Block Print', group: 'Print', swatch: '#33415c', family: 'maroon', kind: 'fabric', priceDelta: 6400 },
  { id: 'chettinad-floral', name: 'Chettinad Floral', group: 'Print', swatch: '#9c8b6f', family: 'natural', kind: 'fabric', priceDelta: 6400 },
]

/** Wood finish library shared by tables, storage, and swings. */
export const WOOD_FINISHES: MaterialOption[] = [
  { id: 'natural-teak', name: 'Natural Teak', group: 'Teak', swatch: '#b07a45', family: 'natural', kind: 'wood', priceDelta: 0 },
  { id: 'honey-teak', name: 'Honey Teak', group: 'Teak', swatch: '#c58f4f', family: 'natural', kind: 'wood', priceDelta: 0 },
  { id: 'walnut', name: 'Walnut', group: 'Deep', swatch: '#5c3a24', family: 'walnut', kind: 'wood', priceDelta: 4800 },
  { id: 'rosewood', name: 'Rosewood', group: 'Deep', swatch: '#6b3320', family: 'walnut', kind: 'wood', priceDelta: 4800 },
  { id: 'ebony', name: 'Ebony', group: 'Deep', swatch: '#2a211c', family: 'ebony', kind: 'wood', priceDelta: 6400 },
  { id: 'charcoal-oak', name: 'Charcoal Oak', group: 'Deep', swatch: '#37332e', family: 'ebony', kind: 'wood', priceDelta: 6400 },
]

export const PRODUCT_CONFIG: Record<string, ProductConfig> = {
  naarkali: {
    axis: 'cushion',
    materialLabel: 'Cushion fabric / leather',
    baseFamily: 'natural',
    variantImages: {
      charcoal: '/images/variants/naarkali-charcoal.png',
      leather: '/images/variants/naarkali-leather.png',
      maroon: '/images/variants/naarkali-maroon.png',
    },
    sizes: [
      { id: 'petite', name: 'Petite', w: 68, d: 74, h: 78, priceDelta: -6000 },
      { id: 'standard', name: 'Standard', w: 76, d: 82, h: 82, priceDelta: 0 },
      { id: 'grand', name: 'Grand', w: 88, d: 90, h: 84, priceDelta: 9000 },
    ],
    materials: CUSHION_MATERIALS,
  },
  padukkai: {
    axis: 'cushion',
    materialLabel: 'Cushion fabric / leather',
    baseFamily: 'natural',
    variantImages: {
      charcoal: '/images/variants/padukkai-charcoal.png',
      leather: '/images/variants/padukkai-leather.png',
    },
    sizes: [
      { id: 'two-seat', name: 'Two Seater', w: 152, d: 88, h: 62, priceDelta: 0 },
      { id: 'three-seat', name: 'Three Seater', w: 198, d: 88, h: 62, priceDelta: 22000 },
    ],
    materials: CUSHION_MATERIALS,
  },
  mesai: {
    axis: 'wood',
    materialLabel: 'Wood finish',
    baseFamily: 'natural',
    variantImages: {
      walnut: '/images/variants/mesai-walnut.png',
      ebony: '/images/variants/mesai-ebony.png',
    },
    sizes: [
      { id: 'four', name: 'Seats 4', w: 150, d: 90, h: 76, priceDelta: 0 },
      { id: 'six', name: 'Seats 6', w: 200, d: 100, h: 76, priceDelta: 34000 },
      { id: 'eight', name: 'Seats 8', w: 240, d: 110, h: 76, priceDelta: 58000 },
    ],
    materials: WOOD_FINISHES,
  },
  'karaikudi-console': {
    axis: 'wood',
    materialLabel: 'Wood finish',
    baseFamily: 'natural',
    variantImages: {
      walnut: '/images/variants/karaikudi-console-walnut.png',
      ebony: '/images/variants/karaikudi-console-ebony.png',
    },
    sizes: [
      { id: 'compact', name: 'Compact', w: 110, d: 36, h: 78, priceDelta: 0 },
      { id: 'long', name: 'Long', w: 150, d: 40, h: 78, priceDelta: 16000 },
    ],
    materials: WOOD_FINISHES,
  },
  oonjal: {
    axis: 'wood',
    materialLabel: 'Wood finish',
    baseFamily: 'natural',
    variantImages: {
      walnut: '/images/variants/oonjal-walnut.png',
      ebony: '/images/variants/oonjal-ebony.png',
    },
    sizes: [
      { id: 'single', name: 'Single Seat', w: 120, d: 60, h: 180, priceDelta: 0 },
      { id: 'double', name: 'Double Seat', w: 170, d: 60, h: 180, priceDelta: 42000 },
    ],
    materials: WOOD_FINISHES,
  },
}

export function getPiece(id: string): Piece | undefined {
  return PIECES.find((piece) => piece.id === id)
}

export function getConfig(id: string): ProductConfig | undefined {
  return PRODUCT_CONFIG[id]
}

/** Resolve the correct photo for the selected material family. */
export function resolveVariantImage(piece: Piece, config: ProductConfig, family: ImageFamily): string {
  if (family === config.baseFamily) return piece.image
  return config.variantImages[family] ?? piece.image
}

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
