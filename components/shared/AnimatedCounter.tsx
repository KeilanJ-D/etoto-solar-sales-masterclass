'use client'

// AnimatedCounter — renders a stat number statically.
//
// Previously this component started its display at 0 and animated up to the
// target value using framer-motion. The intent was a count-up polish effect,
// but the cost was visible: on the /agency hero (above the fold) and the
// /case-studies hero, users saw "£0M+, 0+, £0M/m, 0" for ~250ms then a flicker
// of mid-animation values like "£9M+, 9+, £0M/m, 1" before settling on the
// correct "£200M+, 200+, £5M/m, 12". Bad first impression on funnel pages.
//
// The fix is to just render the value. Count-up animations on a stat strip
// are gimmicky polish — the number IS the message. Keeping the component name
// + props so callsites don't need to change, but stripped the animation.

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
  /** Kept for API compatibility — no longer used. */
  duration?: number
  format?: (n: number) => string
  className?: string
}

export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  format,
  className = '',
}: AnimatedCounterProps) {
  const rendered = format
    ? format(value)
    : `${prefix}${value.toLocaleString('en-GB')}${suffix}`
  return <span className={className}>{rendered}</span>
}
