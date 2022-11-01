import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

// Import Swiper styles
import "swiper/css";

export default function Projects() {
  const isSmallDesktop = useMediaQuery({
    minWidth: 1024
  })

  return (
    <section className='absolute top-0 left-0 w-full h-screen flex flex-wrap justify-center items-center content-center'>
      <div className='mb-7 basis-full'>
        <span className='block text-center text-white font-sans text-4xl'>Project Title</span>
        <span className='block text-white text-center mt-2'>2017 - React - Code & Theory</span>
      </div>
      <Swiper
        className="slider basis-full"
        slidesPerView='auto'
        spaceBetween={isSmallDesktop ? 30 : 10}
        centeredSlides={!isSmallDesktop}
        slidesOffsetBefore={isSmallDesktop ? 120 : 0}
        slidesOffsetAfter={isSmallDesktop ? 120 : 0}
        updateOnWindowResize
        observer
      >
        <SwiperSlide className='rounded-xl overflow-hidden relative max-w-[280px] lg:max-w-[420px]'>
          <Link href="/projects/first"><a className='bg-transparent w-full h-full block opacity-0 absolute top-0 left-0 z-10'>link</a></Link>
          <div className='bg-white h-96 lg:h-[520px]'>
            <Image src="https://picsum.photos/seed/picsum/347/436"  width="100%" height="100%" layout='fill' objectFit='cover' />
          </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-xl overflow-hidden relative max-w-[280px] lg:max-w-[420px]'>
          <div className='bg-white h-96 lg:h-[520px]'>
            <Image src="https://picsum.photos/seed/picsum1/347/436"  width="100%" height="100%" layout='fill' objectFit='cover' />
          </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-xl overflow-hidden relative max-w-[280px] lg:max-w-[420px]'>
          <div className='bg-white h-96 lg:h-[520px]'>
            <Image src="https://picsum.photos/seed/picsum2/347/436"  width="100%" height="100%" layout='fill' objectFit='cover' />
          </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-xl overflow-hidden relative max-w-[280px] lg:max-w-[420px]'>
          <div className='bg-white h-96 lg:h-[520px]'>
            <Image src="https://picsum.photos/seed/picsum3/347/436"  width="100%" height="100%" layout='fill' objectFit='cover' />
          </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-xl overflow-hidden relative max-w-[280px] lg:max-w-[420px]'>
          <div className='bg-white h-96 lg:h-[520px]'>
            <Image src="https://picsum.photos/seed/picsum4/347/436"  width="100%" height="100%" layout='fill' objectFit='cover' />
          </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-xl overflow-hidden relative max-w-[280px] lg:max-w-[420px]'>
          <div className='bg-white h-96 lg:h-[520px]'>
            <Image src="https://picsum.photos/seed/picsum5/347/436"  width="100%" height="100%" layout='fill' objectFit='cover' />
          </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-xl overflow-hidden relative max-w-[280px] lg:max-w-[420px]'>
          <div className='bg-white h-96 lg:h-[520px]'>
            <Image src="https://picsum.photos/seed/picsum6/347/436"  width="100%" height="100%" layout='fill' objectFit='cover' />
          </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-xl overflow-hidden relative max-w-[280px] lg:max-w-[420px]'>
          <div className='bg-white h-96 lg:h-[520px]'>
            <Image src="https://picsum.photos/seed/picsum7/347/436"  width="100%" height="100%" layout='fill' objectFit='cover' />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}