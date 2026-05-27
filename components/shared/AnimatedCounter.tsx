'use client'

import { animate, useInView, useMotionValue, useTransform, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  format?: (n: number) => string
  className?: string
}

export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.4,
  format,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { amount: 0.5, once: true })

  const motionValue = useMotionValue(0)
  const display = useTransform(motionValue, (latest) => {
    const rounded = Math.round(latest)
    if (format) return format(rounded)
    return `${prefix}${rounded.toLocaleString('en-GB')}${suffix}`
  })

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.22, 0.61, 0.36, 1],
    })
    return () => controls.stop()
  }, [inView, value, duration, motionValue])

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}
