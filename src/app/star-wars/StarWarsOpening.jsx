'use client'

import { useEffect, useState } from 'react'
import { createStarField } from '@/lib/star-field.mjs'

export default function StarWarsOpening() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const frame = requestAnimationFrame(() => setStars(createStarField(150)))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section className="star-opening" aria-label="Bryan Aldrin Quinalayo">
      <div className="star-field" aria-hidden="true">
        {stars.map((star) => (
          <i
            key={star.id}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <p className="star-opening__intro">A long time ago, in a galaxy far,<br />far away…</p>
      <h1 className="star-opening__logo"><span>BRYAN ALDRIN</span><span>QUINALAYO</span></h1>

      <div className="star-crawl">
        <div className="star-crawl__content">
          <p>Episode MMXXVI</p>
          <h2>A NEW PORTFOLIO</h2>
          <p>From the Philippines, Bryan builds reliable products across frontend, backend, and cloud systems.</p>
          <p>For more than a decade, he has helped teams turn ambitious ideas into thoughtful digital experiences.</p>
          <p>The archive below records the missions completed along the way…</p>
        </div>
      </div>

      <a className="star-opening__skip" href="#star-wars-work">Skip intro ↓</a>
    </section>
  )
}
