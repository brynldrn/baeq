import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

// Import Swiper styles
import 'swiper/css';
import { useCallback, useState } from 'react';

export default function Projects({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const isSmallDesktop = useMediaQuery({
    minWidth: 1024
  })

  const onSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper?.activeIndex || 0)
  }, [])

  return (
    <section className="absolute top-0 left-0 w-full h-screen flex flex-wrap justify-center items-center content-center">
      <div className="mb-7 basis-full mx-3">
        <span className="block text-center text-white font-sans text-4xl">{projects[activeIndex].name}</span>
        <span className="block text-white text-center mt-2">{`${projects[activeIndex].year} - ${projects[activeIndex].position}`}</span>
      </div>
      {projects?.length && (
        <Swiper
          className="slider basis-full"
          slidesPerView="auto"
          slidesPerGroup={1}
          spaceBetween={isSmallDesktop ? 30 : 10}
          centeredSlides
          updateOnWindowResize
          observer
          onSlideChange={onSlideChange}
        >
          {
            projects?.length && projects.map((project) => (
              <SwiperSlide className="rounded-xl overflow-hidden relative max-w-[280px] lg:max-w-[420px]" key={project.id}>
                <Link href={`/projects/${project?.id}`}><a className="bg-transparent w-full h-full block opacity-0 absolute top-0 left-0 z-10">link</a></Link>
                <div className="bg-white h-96 lg:h-[520px]">
                  <Image src={project?.imageCap?.url} width="100%" height="100%"
                    layout="fill" objectFit="cover" alt="Project Preview" />
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      )}
    </section>
  )
}
