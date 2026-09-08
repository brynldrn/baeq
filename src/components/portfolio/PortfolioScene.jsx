'use client'

import { ArrowRight, BriefcaseBusiness, ChevronLeft, ChevronRight, Code2, Cpu, FileText, Layers3, Mouse, ShieldCheck, Sparkles, Users2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getOrbitOffset, getSwipeDirection, stepIndex } from '@/lib/orbit.mjs'

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
  const pointerStartY = useRef(0)
  const detailOpen = pathname.startsWith('/projects/')

  const move = useCallback((direction) => {
    setActiveIndex((index) => stepIndex(index, direction, projects.length))
  }, [projects.length])

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
    if (detailOpen || Math.abs(event.deltaY) + Math.abs(event.deltaX) < 18) return

    event.preventDefault()
    const now = Date.now()
    if (now - lastWheelAt.current < 520) return

    lastWheelAt.current = now
    move(event.deltaY + event.deltaX > 0 ? 1 : -1)
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
            <a href="https://docs.google.com/document/d/1tLdtA38D-Oek-n5P7vICXTq61Re1AKxXrDMlHoBlv5c/edit?usp=share_link" target="_blank" rel="noreferrer"><FileText /> Get CV</a>
          </div>
        </section>

        <section className="orbit-stage" aria-label="Project orbit">
          {projects.map((project, index) => {
            const offset = getOrbitOffset(index, activeIndex, projects.length)
            const slot = orbitSlot(offset)
            const active = slot === 'active'
            const hidden = !active && Math.abs(offset) > 1

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
        <a href="https://www.linkedin.com/in/bryan-aldrin-quinalayo/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness /></a>
        <a href="https://github.com/brynldrn" target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 /></a>
        <a href="https://docs.google.com/document/d/1tLdtA38D-Oek-n5P7vICXTq61Re1AKxXrDMlHoBlv5c/edit?usp=share_link" target="_blank" rel="noreferrer" aria-label="Curriculum vitae"><FileText /></a>
        <Link href="/star-wars" aria-label="Legacy Star Wars portfolio"><Sparkles /></Link>
      </nav>

      <div className="gesture-cue" aria-hidden="true"><Mouse size={15} /> Scroll or swipe</div>
      </div>
      {children}
    </section>
  )
}
