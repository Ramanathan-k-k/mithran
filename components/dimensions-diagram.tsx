import type { SizeOption } from '@/lib/catalog'

/**
 * A lightweight technical elevation diagram that redraws its proportions and
 * measurement labels whenever the selected size changes.
 */
export function DimensionsDiagram({ size }: { size: SizeOption }) {
  // Normalise the largest dimension to a fixed drawing box so proportions read true.
  const max = Math.max(size.w, size.h)
  const boxW = 200
  const boxH = 150
  const scale = Math.min(boxW / size.w, boxH / size.h) * 0.82
  const w = size.w * scale
  const h = size.h * scale
  const x = (boxW - w) / 2
  const y = boxH - h - 8

  return (
    <figure className="border border-border bg-background/70 p-4">
      <svg
        viewBox="0 0 240 172"
        className="h-auto w-full text-heading"
        role="img"
        aria-label={`Dimensions: width ${size.w} by depth ${size.d} by height ${size.h} centimetres`}
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          {/* Piece elevation */}
          <rect x={x} y={y} width={w} height={h} className="fill-muted" strokeWidth="1.25" />

          {/* Width measure (below) */}
          <line x1={x} y1={y + h + 12} x2={x + w} y2={y + h + 12} />
          <line x1={x} y1={y + h + 8} x2={x} y2={y + h + 16} />
          <line x1={x + w} y1={y + h + 8} x2={x + w} y2={y + h + 16} />

          {/* Height measure (right) */}
          <line x1={x + w + 14} y1={y} x2={x + w + 14} y2={y + h} />
          <line x1={x + w + 10} y1={y} x2={x + w + 18} y2={y} />
          <line x1={x + w + 10} y1={y + h} x2={x + w + 18} y2={y + h} />
        </g>
        <g fill="currentColor" fontSize="9" className="font-mono">
          <text x={x + w / 2} y={y + h + 26} textAnchor="middle">{`W ${size.w} cm`}</text>
          <text x={x + w + 22} y={y + h / 2} dominantBaseline="middle">{`H ${size.h}`}</text>
        </g>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-muted-foreground">
        {`${size.w} W × ${size.d} D × ${size.h} H cm`}
      </figcaption>
    </figure>
  )
}
