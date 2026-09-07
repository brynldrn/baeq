'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'

export default function ProjectPanel({ project }) {
  const closeRef = useRef(null)
  const router = useRouter()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const previousFocus = document.activeElement
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') router.push('/')
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [router])

  return (
    <AnimatePresence>
      <motion.section
        className="project-panel glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-panel-title"
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94, y: reduceMotion ? 0 : 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
        transition={{ type: reduceMotion ? 'tween' : 'spring', stiffness: 220, damping: 26 }}
      >
        <header className="panel-header">
          <Link href="/" ref={closeRef} className="panel-close" aria-label="Close project"><X /></Link>
          <div className="panel-index">{project.year} / {project.position}</div>
        </header>

        <div className="panel-layout">
          <div className="panel-media">
            {project.imageCap?.url ? (
              <Image src={project.imageCap.url} alt={`${project.name} project preview`} fill sizes="(max-width: 800px) 92vw, 48vw" priority />
            ) : (
              <div className="panel-system" aria-hidden="true"><span /><span /><span /></div>
            )}
          </div>

          <div className="panel-content">
            <p className="eyebrow">Selected work</p>
            <h1 id="project-panel-title">{project.name}</h1>
            <p className="panel-summary">{project.summary}</p>
            <div className="panel-stack">{project.stack?.map((item) => <span key={item}>{item}</span>)}</div>
            <div className="project-markdown"><ReactMarkdown>{project.longMd}</ReactMarkdown></div>
            <div className="panel-actions">
              {project.url && <a href={project.url} target="_blank" rel="noreferrer">Visit project <ArrowUpRight size={17} /></a>}
              <Link href="/"><ArrowLeft size={17} /> Back to orbit</Link>
            </div>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}
