import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { getPortfolioProject, getPortfolioProjects } from '@/lib/projects.mjs'

export async function generateStaticParams() {
  return (await getPortfolioProjects()).map(({ id }) => ({ id }))
}

export async function generateMetadata({ params }) {
  const project = await getPortfolioProject((await params).id)
  return project ? { title: project.name, description: project.summary } : {}
}

export default async function ProjectPage({ params }) {
  const project = await getPortfolioProject((await params).id)
  if (!project) notFound()

  const images = [project.imageCap, ...project.gallery].filter(Boolean)

  return (
    <article>
      <p className="project-meta">{project.year.replaceAll('—', '-').replaceAll('–', '-')} / {project.position}</p>
      <h1>{project.name}</h1>
      {project.summary ? <p className="project-summary">{project.summary}</p> : null}
      {project.stack?.length ? <p className="project-stack">{project.stack.join(', ')}</p> : null}
      {images.length ? (
        <div className="project-media">
          {images.map((image, index) => (
            <Image
              className="project-image"
              src={image.url}
              alt={`${project.name} project image ${index + 1}`}
              width={1200}
              height={800}
              sizes="(max-width: 720px) 100vw, 680px"
              priority={index === 0}
              key={image.id ?? image.url}
            />
          ))}
        </div>
      ) : null}
      <div className="project-description"><ReactMarkdown>{project.longMd}</ReactMarkdown></div>
      <p className="project-actions">
        {project.url ? <a href={project.url} target="_blank" rel="noreferrer">Visit project</a> : null}
        <Link href="/portfolio">Back to portfolio</Link>
      </p>
    </article>
  )
}
