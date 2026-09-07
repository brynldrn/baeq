import Image from 'next/image'
import Link from 'next/link'
import { getProjects } from '@/lib/projects.mjs'

export const metadata = {
  title: 'Star Wars Portfolio | Bryan Aldrin Quinalayo',
  description: 'The original cinematic portfolio experience.',
}

export default async function StarWarsPage() {
  const projects = await getProjects()

  return (
    <main className="star-wars">
      <section className="star-wars__opening" aria-labelledby="star-wars-title">
        <p className="star-wars__intro">A long time ago, in a galaxy far, far away…</p>
        <h1 id="star-wars-title" className="star-wars__logo">
          <span>Bryan Aldrin</span>
          Quinalayo
        </h1>
        <p className="star-wars__role">Full-stack engineer · Builder · Gamer</p>
        <a className="star-wars__skip" href="#star-wars-work">Explore the archive ↓</a>
      </section>

      <section className="star-wars__about" aria-labelledby="star-wars-about">
        <p>Episode MMXXI</p>
        <h2 id="star-wars-about">A NEW PORTFOLIO</h2>
        <div className="star-wars__crawl">
          <p>From the Philippines, Bryan builds reliable products across frontend, backend, and cloud systems.</p>
          <p>This preserved edition celebrates the original portfolio while the main experience looks ahead.</p>
        </div>
      </section>

      <section id="star-wars-work" className="star-wars__work" aria-labelledby="star-wars-work-title">
        <p className="star-wars__kicker">Transmission archive</p>
        <h2 id="star-wars-work-title">Selected missions</h2>
        <div className="star-wars__grid">
          {projects.map((project) => (
            <Link className="star-wars__card" href={`/star-wars/works/${project.id}`} key={project.id}>
              <span className="star-wars__media">
                {project.imageCap?.url ? (
                  <Image src={project.imageCap.url} alt="" fill sizes="(max-width: 720px) 86vw, 38vw" />
                ) : null}
              </span>
              <span className="star-wars__card-copy">
                <span>{project.year}</span>
                <strong>{project.name}</strong>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="star-wars__footer">
        <Link href="/">Return to the 2026 experience</Link>
        <span>May the source be with you.</span>
      </footer>
    </main>
  )
}
