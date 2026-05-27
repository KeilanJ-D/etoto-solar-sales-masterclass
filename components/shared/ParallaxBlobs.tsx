'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ParallaxBlobsProps {
  intensity?: 'subtle' | 'medium' | 'strong'
  className?: string
  colors?: [string, string]
}

const RANGES = {
  subtle: [0, 60],
  medium: [0, 120],
  strong: [0, 200],
}

export default function ParallaxBlobs({
  intensity = 'medium',
  className = '',
  colors = ['#E8192C', '#F5921E'],
}: ParallaxBlobsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], RANGES[intensity])
  const y2 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -RANGES[intensity][1]]
  )

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <motion.div
        style={{ y: y1, backgroundColor: colors[0] }}
        className="absolute top-0 left-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl opacity-20 mix-blend-screen"
      />
      <motion.div
        style={{ y: y2, backgroundColor: colors[1] }}
        className="absolute bottom-0 right-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl opacity-20 mix-blend-screen"
      />
    </div>
  )
}
