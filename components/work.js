export default function Work({ imageCap, year, index }) {
  return (
    <article data-aos={`fade-up-${index % 2 === 0 ? 'left' : 'right'}`} className="works__work">
      <div className="works__work-media">
        <picture>
          <img src={ imageCap } alt="Cover Image" />
        </picture>
        <span className="works__work-year">{ year }</span>
      </div>
    </article>
  )
}