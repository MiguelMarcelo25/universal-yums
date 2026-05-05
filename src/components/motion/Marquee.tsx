import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** 'normal' = scroll left, 'reverse' = scroll right */
  direction?: 'normal' | 'reverse'
  /** Tailwind animation key — `marquee`, `marquee-fast`, `marquee-reverse` */
  speed?: 'normal' | 'fast'
  className?: string
  /** Inner gap between items, in tailwind units (default 6 → 1.5rem) */
  gap?: number
}

export default function Marquee({ children, direction = 'normal', speed = 'normal', className = '', gap = 6 }: Props) {
  const animClass =
    direction === 'reverse'
      ? 'animate-marquee-reverse'
      : speed === 'fast'
        ? 'animate-marquee-fast'
        : 'animate-marquee'

  return (
    <div className={`relative overflow-hidden pause-on-hover ${className}`}>
      <div className={`marquee-track ${animClass}`} style={{ gap: `${gap * 0.25}rem` }}>
        {/* Render twice for seamless loop */}
        <div className="flex flex-shrink-0" style={{ gap: `${gap * 0.25}rem` }}>
          {children}
        </div>
        <div className="flex flex-shrink-0" aria-hidden="true" style={{ gap: `${gap * 0.25}rem` }}>
          {children}
        </div>
      </div>
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-current to-transparent opacity-0 sm:opacity-100" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-current to-transparent opacity-0 sm:opacity-100" />
    </div>
  )
}
