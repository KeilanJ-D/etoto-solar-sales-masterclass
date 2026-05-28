'use client'

import { useEffect, useRef, useState } from 'react'

export function useAnimateOnScroll(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

export function useCountUp(end: number, duration: number = 2000, shouldStart: boolean = false): number {
  // If shouldStart is true on first render (i.e. above-the-fold stats like
  // the homepage Hero), initialise at the END value so SSR + first paint
  // both show the final number — no "0 Steps · £0+ · <0 mins" flash.
  // For below-the-fold use, shouldStart starts false → count starts at 0 →
  // animation runs when triggered.
  const [count, setCount] = useState(shouldStart ? end : 0)
  const hasAnimated = useRef(shouldStart)

  useEffect(() => {
    if (!shouldStart) return
    if (hasAnimated.current) {
      // Already showing the end value from initial state — skip animation
      // (the value is correct, no need to back up to 0 and re-count).
      setCount(end)
      return
    }
    hasAnimated.current = true

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, shouldStart])

  return count
}

export function useTypewriter(text: string, speed: number = 50, shouldStart: boolean = false): string {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    if (!shouldStart) {
      setDisplayText('')
      return
    }

    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, shouldStart])

  return displayText
}
