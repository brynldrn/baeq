import Image from 'next/image'
import Link from 'next/link'
import { getProjects } from '@/lib/projects.mjs'
import StarWarsOpening from './StarWarsOpening'

export const metadata = {
  title: 'Star Wars Portfolio | Bryan Aldrin Quinalayo',
  description: 'The original cinematic portfolio experience.',
}

export default async function StarWarsPage() {
  const projects = await getProjects()

  return (
    <main className="star-wars">
      <StarWarsOpening />

      <section id="star-wars-work" className="star-wars__work" aria-labelledby="star-wars-work-title">
        <h2 id="star-wars-work-title"><code>works</code></h2>
        <div className="star-wars__grid">
          {projects.map((project) => (
            <article className="legacy-project" key={project.id}>
              <div className="legacy-project__media">
                <div className="legacy-project__reel">
                  {[project.imageCap, ...project.gallery].filter(Boolean).map((image, index) => (
                    <span key={image.id ?? image.url}>
                      <Image src={image.url} alt={`${project.name} gallery image ${index + 1}`} fill sizes="(max-width: 720px) 86vw, 42vw" />
                    </span>
                  ))}
                </div>
                <span className="legacy-project__year">{project.year}</span>
              </div>
              <h3><Link href={`/star-wars/works/${project.id}`}>{project.name}</Link></h3>
            </article>
          ))}
        </div>
      </section>

      <footer className="star-wars__footer">
        <Link href="/">Return to the main site</Link>
        <span>Made with ❤️ · May the source be with you.</span>
      </footer>
    </main>
  )
}
