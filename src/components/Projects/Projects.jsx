import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import Image from 'next/image';

export default function Projects() {
  return (
    <section className='absolute top-0 left-0 w-full h-screen pt-[calc(100vh/5)]'>
      <div className='mb-7'>
        <span className='block text-center text-white font-sans text-4xl'>Project Title</span>
        <span className='block text-white text-center mt-2'>2017 - React - Code & Theory</span>
      </div>
      <Swiper
        className="slider"
        slidesPerView={1.5}
        spaceBetween={10}
        centeredSlides
      >
        <SwiperSlide className='rounded-xl overflow-hidden'>
          <div className='bg-white h-96'>
            <Image src="https://picsum.photos/seed/picsum/347/436" width={200} height={300} layout='responsive'  />
          </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-xl overflow-hidden'>
          <div className='bg-white h-96'>
            <Image src="https://picsum.photos/seed/picsum1/347/436" width={200} height={300} layout='responsive'  />
          </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-xl overflow-hidden'>
          <div className='bg-white h-96'>
            <Image src="https://picsum.photos/seed/picsum2/347/436" width={200} height={300} layout='responsive'  />
          </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-xl overflow-hidden'>
          <div className='bg-white h-96'>
            <Image src="https://picsum.photos/seed/picsum3/347/436" width={200} height={300} layout='responsive'  />
          </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-xl overflow-hidden'>
          <div className='bg-white h-96'>
            <Image src="https://picsum.photos/seed/picsum4/347/436" width={200} height={300} layout='responsive'  />
          </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-xl overflow-hidden'>
          <div className='bg-white h-96'>
            <Image src="https://picsum.photos/seed/picsum5/347/436" width={200} height={300} layout='responsive'  />
          </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-xl overflow-hidden'>
          <div className='bg-white h-96'>
            <Image src="https://picsum.photos/seed/picsum6/347/436" width={200} height={300} layout='responsive'  />
          </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-xl overflow-hidden'>
          <div className='bg-white h-96'>
            <Image src="https://picsum.photos/seed/picsum7/347/436" width={200} height={300} layout='responsive'  />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}