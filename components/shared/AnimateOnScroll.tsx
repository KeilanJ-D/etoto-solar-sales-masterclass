'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type Variant = 'fade-up' | 'fade' | 'slide-left' | 'slide-right' | 'scale'

const VARIANTS: Record<Variant, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
}

export default function AnimateOnScroll({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.6,
  amount = 0.2,
  className = '',
  once = true,
  id,
}: {
  children: ReactNode
  variant?: Variant
  delay?: number
  duration?: number
  amount?: number
  className?: string
  once?: boolean
  id?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount, once })

  return (
    <motion.div
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={VARIANTS[variant]}
      transition={{ duration, delay, ease: [0.22, 0.61, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
