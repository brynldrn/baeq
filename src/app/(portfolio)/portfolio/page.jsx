import Link from 'next/link'
import { getPortfolioProjects } from '@/lib/projects.mjs'

export const metadata = {
  title: 'Portfolio',
  description: 'Selected software engineering work by Bryan Aldrin Quinalayo.',
}

export default async function WorkPage() {
  const projects = await getPortfolioProjects()
  const selected = projects.slice(0, 6)
  const archive = projects.slice(6)

  return (
    <>
      <h1>Portfolio</h1>
      <p className="page-intro">Selected product work, technical leadership, and experiments.</p>
      <ol className="portfolio-list">
        {selected.map((project) => (
          <li className="portfolio-item" key={project.id}>
            <h2><Link href={`/projects/${project.id}`}>{project.name}</Link></h2>
            <p>{project.year.replaceAll('—', '-').replaceAll('–', '-')} / {project.position}</p>
          </li>
        ))}
      </ol>
      {archive.length ? (
        <details className="portfolio-archive">
          <summary>View archive</summary>
          <ul className="archive-grid">
            {archive.map((project) => (
              <li key={project.id}>
                <Link href={`/projects/${project.id}`}>{project.name}</Link>
                <span>{project.year.replaceAll('—', '-').replaceAll('–', '-')}</span>
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </>
  )
}
