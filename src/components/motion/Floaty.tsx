import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  variant?: 'float' | 'float-slow' | 'wiggle' | 'bounce-soft'
  delay?: number
  className?: string
}

/**
 * Wraps children in a CSS keyframe loop. Cheaper than framer-motion for purely
 * decorative loops (no JS frame work — pure GPU compositor).
 */
export default function Floaty({ children, variant = 'float', delay = 0, className = '' }: Props) {
  const cls = {
    float: 'animate-float',
    'float-slow': 'animate-float-slow',
    wiggle: 'animate-wiggle',
    'bounce-soft': 'animate-bounce-soft',
  }[variant]

  return (
    <div className={`${cls} ${className}`} style={delay ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  )
}
