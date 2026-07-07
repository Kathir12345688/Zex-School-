import { useEffect, useRef, useState } from 'react'

const CounterStat = ({ value, label, suffix = '', revealDelay = 0, className = '' }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (hasAnimated) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const element = ref.current

    const startCount = () => {
      setHasAnimated(true)
      let start = 0
      const duration = 2000
      const step = Math.max(1, Math.round(value / (duration / 25)))
      const interval = window.setInterval(() => {
        start += step
        if (start >= value) {
          setCount(value)
          window.clearInterval(interval)
          return
        }
        setCount(start)
      }, 25)

      return () => window.clearInterval(interval)
    }

    if (reduceMotion.matches) {
      setCount(value)
      setHasAnimated(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          startCount()
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [hasAnimated, value])

  const revealStyle = { '--reveal-delay': `${revealDelay}ms` }

  return (
    <article ref={ref} className={['card', 'card--stat', className].filter(Boolean).join(' ')} data-reveal style={revealStyle}>
      <div className="card__body">
        <p className="stat-value">{`${count.toLocaleString()}${suffix}`}</p>
        <p>{label}</p>
      </div>
    </article>
  )
}

export default CounterStat
