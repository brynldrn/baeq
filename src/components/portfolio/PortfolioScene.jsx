'use client'

import { ArrowRight, BriefcaseBusiness, ChevronLeft, ChevronRight, Code2, Cpu, Layers3, Mouse, ShieldCheck, Star, Users2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getOrbitOffset, getSwipeDirection, getWheelDirection, isOrbitVisible, stepIndex } from '@/lib/orbit.mjs'

const orbitSlot = (offset) => {
  if (offset === 0) return 'active'
  if (offset === -1) return 'previous'
  if (offset === 1) return 'next'
  return offset < 0 ? 'far-previous' : 'far-next'
}

function SystemVisual({ index }) {
  return (
    <div className="system-visual" aria-hidden="true">
      <div className="system-ring system-ring-one" />
      <div className="system-ring system-ring-two" />
      <div className="system-node system-node-one" />
      <div className="system-node system-node-two" />
      <Layers3 size={54} strokeWidth={1.15} />
      <span>0{index + 1} / SYSTEM</span>
    </div>
  )
}

export default function PortfolioScene({ projects, children }) {
  const pathname = usePathname()
  const initialIndex = Math.max(0, projects.findIndex(({ id }) => pathname === `/projects/${id}`))
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const lastWheelAt = useRef(0)
  const wheelAccumulator = useRef({})
  const pointerStartY = useRef(0)
  const detailOpen = pathname.startsWith('/projects/')

  const move = useCallback((direction) => {
    setActiveIndex((index) => stepIndex(index, direction, projects.length))
  }, [projects.length])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const earlyIntent = window.__portfolioEarlyIntent
    const direction = earlyIntent?.consume?.()
    if (!detailOpen && direction) queueMicrotask(() => move(direction))
    earlyIntent?.cleanup?.()
    return undefined
  }, [detailOpen, move])

  useEffect(() => {
    if (detailOpen) return undefined

    const onKeyDown = (event) => {
      if (['ArrowLeft', 'ArrowUp'].includes(event.key)) {
        event.preventDefault()
        move(-1)
      }

      if (['ArrowRight', 'ArrowDown'].includes(event.key)) {
        event.preventDefault()
        move(1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [detailOpen, move])

  const onWheel = (event) => {
    if (detailOpen) {
      wheelAccumulator.current = {}
      return
    }

    const direction = getWheelDirection(event, wheelAccumulator.current)
    if (!direction) return

    event.preventDefault()
    const now = Date.now()
    if (now - lastWheelAt.current < 520) return

    lastWheelAt.current = now
    move(direction)
  }

  const onPointerUp = (event) => {
    if (detailOpen) return
    const direction = getSwipeDirection(pointerStartY.current, event.clientY)
    if (direction) move(direction)
  }

  const activeProject = projects[activeIndex]

  return (
    <section
      className="portfolio-shell"
      onWheel={onWheel}
      onPointerDown={(event) => { pointerStartY.current = event.clientY }}
      onPointerUp={onPointerUp}
      aria-label="Selected portfolio work"
    >
      <div className="portfolio-background" inert={detailOpen} aria-hidden={detailOpen || undefined}>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="portfolio-grid" aria-hidden="true" />
      <div className="portfolio-noise" aria-hidden="true" />

      <div className="availability glass">
        <span /> Available for select projects
      </div>

      <main className="portfolio-layout">
        <section className="expertise-card glass" aria-labelledby="portfolio-title">
          <div>
            <p className="eyebrow">BAEQ / 2026</p>
            <h1 id="portfolio-title">Bryan Aldrin<br />Quinalayo</h1>
            <p className="role">Senior Software Engineer</p>
          </div>

          <div className="proof-list">
            <p><Cpu /><span>10+ Years Enterprise React / Next.js Architecture</span></p>
            <p><ShieldCheck /><span>Technical Leadership & Scalable Product Delivery</span></p>
            <p><Code2 /><span>TypeScript, Supabase & Performance Optimization</span></p>
            <p><Users2 /><span>Mentorship & Code Quality Engineering</span></p>
          </div>

          <div className="profile-actions">
            <a href="https://www.linkedin.com/in/bryan-aldrin-quinalayo/" target="_blank" rel="noreferrer"><BriefcaseBusiness /> LinkedIn</a>
          </div>
        </section>

        <section className="orbit-stage" aria-label="Project orbit">
          {projects.map((project, index) => {
            if (!isOrbitVisible(index, activeIndex, projects.length)) return null

            const offset = getOrbitOffset(index, activeIndex, projects.length)
            const slot = orbitSlot(offset)
            const active = slot === 'active'
            const hidden = Math.abs(offset) > 1

            return (
              <article
                className="project-card glass"
                data-orbit={slot}
                aria-hidden={hidden || undefined}
                key={project.id}
              >
                {active ? (
                  <Link className="card-hit-area" href={`/projects/${project.id}`} aria-label={`Open ${project.name}`} />
                ) : (
                  <button className="card-hit-area" onClick={() => setActiveIndex(index)} disabled={hidden} aria-label={`Focus ${project.name}`} />
                )}

                <div className="project-visual">
                  {project.imageCap?.url ? (
                    <Image
                      src={project.imageCap.url}
                      alt={`${project.name} project preview`}
                      fill
                      sizes="(max-width: 767px) 76vw, 390px"
                      loading={active ? 'eager' : 'lazy'}
                    />
                  ) : <SystemVisual index={index} />}
                  <div className="visual-shade" />
                </div>

                <div className="project-copy">
                  <div className="project-meta"><span>0{index + 1}</span><span>{project.year}</span></div>
                  <h2>{project.name}</h2>
                  <p>{project.position}</p>
                  <div className="project-stack">{project.stack?.join(' · ') || project.position}</div>
                  <span className="view-cue">Explore <ArrowRight size={15} /></span>
                </div>
              </article>
            )
          })}
        </section>
      </main>

      <p className="sr-only" aria-live="polite">Focused project: {activeProject.name}</p>

      <div className="orbit-controls glass">
        <button onClick={() => move(-1)} aria-label="Previous project"><ChevronLeft /></button>
        <span>{String(activeIndex + 1).padStart(2, '0')}</span>
        <div className="progress-dots" aria-hidden="true">
          {projects.map(({ id }, index) => <i className={index === activeIndex ? 'active' : ''} key={id} />)}
        </div>
        <span>{String(projects.length).padStart(2, '0')}</span>
        <button onClick={() => move(1)} aria-label="Next project"><ChevronRight /></button>
      </div>

      <nav className="portfolio-nav glass" aria-label="Portfolio links">
        <a href="https://www.linkedin.com/in/bryan-aldrin-quinalayo/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" data-brand="linkedin"><circle cx="4" cy="4" r="2" /><rect width="4" height="12" x="2" y="9" /><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /></svg></a>
        <a href="https://github.com/brynldrn" target="_blank" rel="noreferrer" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" data-brand="github"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.293-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.105 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg></a>
        <Link href="/star-wars" aria-label="Legacy Star Wars portfolio"><Star /></Link>
      </nav>

      <div className="gesture-cue" aria-hidden="true"><Mouse size={15} /> Scroll or swipe</div>
      </div>
      {children}
    </section>
  )
}
