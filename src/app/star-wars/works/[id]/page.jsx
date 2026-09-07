import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { getProject, getProjects } from '@/lib/projects.mjs'

export async function generateStaticParams() {
  return (await getProjects()).map(({ id }) => ({ id }))
}

export async function generateMetadata({ params }) {
  const project = await getProject((await params).id)
  return project ? { title: `${project.name} | Star Wars Portfolio` } : {}
}

export default async function StarWarsProjectPage({ params }) {
  const project = await getProject((await params).id)
  if (!project) notFound()

  return (
    <main className="star-wars star-wars-project">
      <nav><Link href="/star-wars">← Back to the archive</Link></nav>
      <header>
        <p>{project.year}</p>
        <h1>{project.name}</h1>
        {project.position ? <span>{project.position}</span> : null}
      </header>
      {project.imageCap?.url ? (
        <div className="star-wars-project__media">
          <Image src={project.imageCap.url} alt="" fill preload sizes="(max-width: 900px) 92vw, 900px" />
        </div>
      ) : null}
      <article><ReactMarkdown>{project.longMd}</ReactMarkdown></article>
      {project.url ? <a className="star-wars-project__link" href={project.url} target="_blank" rel="noreferrer">Visit project ↗</a> : null}
    </main>
  )
}
