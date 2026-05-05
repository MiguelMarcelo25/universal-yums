import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'

const colors = ['#e4322b', '#ffd93f', '#1f3a9e', '#ef4b44', '#f5c518', '#7e92e8']

type Props = {
  count?: number
  className?: string
}

/**
 * Lightweight confetti burst. Each piece is an absolutely-positioned div
 * that drops with random horizontal drift, rotation, and delay.
 * Lasts ~2.4s then settles below the container.
 */
export default function Confetti({ count = 36, className = '' }: Props) {
  const reduce = useReducedMotion()

  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1.6 + Math.random() * 1.2,
        drift: -40 + Math.random() * 80,
        rotate: -180 + Math.random() * 540,
        size: 6 + Math.random() * 8,
        color: colors[i % colors.length],
        shape: i % 3, // 0 square, 1 circle, 2 thin rect
      })),
    [count],
  )

  if (reduce) return null

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: -10,
            width: p.shape === 2 ? p.size * 0.4 : p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 1 ? '50%' : p.shape === 2 ? '2px' : '2px',
          }}
          initial={{ y: -20, x: 0, rotate: 0, opacity: 1 }}
          animate={{
            y: 240,
            x: p.drift,
            rotate: p.rotate,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeOut',
            times: [0, 0.7, 1],
          }}
        />
      ))}
    </div>
  )
}
