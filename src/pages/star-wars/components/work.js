import Carousel from 'react-multi-carousel'

export default function Work({ imageCap, year, index, gallery }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 9999, min: 1000 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1000, min: 768 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <article data-aos={`fade-up-${index % 2 === 0 ? 'left' : 'right'}`} className="works__work">
      <div className="works__work-media">
        <Carousel autoPlay={true} arrows={false} ssr={true}
          infinite={true} responsive={responsive}>
          <picture>
            <img src={imageCap} alt={'Gallery Image 1'} />
          </picture>
          {
            gallery?.length && gallery.map(({ url }, key) => (
              <picture key={key} >
                <img src={url} alt={`Gallery Image ${key + 2}`} />
              </picture>
            ))
          }
        </Carousel>;
        <span className="works__work-year">{ year }</span>
      </div>
    </article>
  )
}
