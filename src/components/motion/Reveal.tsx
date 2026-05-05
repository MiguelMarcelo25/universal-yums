import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

export default function Reveal({ children, delay = 0, y = 24, className, once = true }: Props) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
