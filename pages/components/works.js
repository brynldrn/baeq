import Link from 'next/link';

export default function Works({ projects }) {
  console.log(projects)
  return (
    <section className="works">
      <div className="works__wrapper">
        <h1 className="works__header">Works</h1>
        
        {
          projects.map(({ id, name, year, imageCap }, key) => (
            <Link href="/works/test" key={key}>
              <article className="works__project" id={id}>
                <figure>
                  <picture>
                    <img src={imageCap.url} alt="Project Image" />
                  </picture>
                </figure>
                <div className="works__project-caption">
                  <span className="works__project-name">{ name }</span>
                  <span className="works__project-year">{ year }</span>
                </div>
              </article>
            </Link>
          ))
        }

      </div>
    </section>
  )
}