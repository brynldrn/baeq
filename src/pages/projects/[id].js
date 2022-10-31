import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion'
import Head from 'next/head';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import ExternalLink from '../../components/ButtonLink/ButtonLink';
import ButtonLink from '../../components/ButtonLink/ButtonLink';

export default function Project() {
  return (
    <>
      <Head>
        <title>Home | Bryan Aldrin E Quinalayo &ndash; Senior React Developer</title>
        <meta name="description" content="Professional Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <MainLayout>
        <section className='relative'>
          {/* <motion.div 
            className='fixed top-5 left-4 z-10'
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
          >
            <Link href="/">
              <a className='flex items-center'><div className='rounded-full bg-white mr-3'><ChevronLeft color='black' /></div> <span className='text-white'>Back</span></a>
            </Link>
          </motion.div> */}
          <motion.div
            className='w-full pt-[calc(100vh/5)] pb-[90px]'
            animate={{
              translateY: '-60px',
              transition: {
                duration: 0.5
              }
            }}
          >
            <div className='mb-7'>
              <span className='block text-center text-white font-sans text-4xl'>Project Title</span>
              <span className='block text-white text-center mt-2'>2017 - React - Code & Theory</span>
            </div>
            <motion.div 
              className='mx-auto rounded-xl overflow-hidden relative'
              initial={{
                width: 280,
                height: 336
              }}
              animate={{
                width: 340,
                height: 300
              }}
            >
              <Image src="https://picsum.photos/seed/picsum/1920/720" width="100%" height="100%" layout='fill' objectFit='cover' />
            </motion.div>
            <div className='px-5 mt-5 text-white'>
              <div className='flex justify-evenly mb-7'>
                <ButtonLink label='Visit Site' />
                <ButtonLink buttonFace='B' label='Home' internal url='/' />
              </div>
              <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nostrum similique impedit, itaque consectetur blanditiis aspernatur quia temporibus labore laborum minima, maxime deleniti corrupti aperiam, sunt sint iste. Facilis, accusamus.</p>
              <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nostrum similique impedit, itaque consectetur blanditiis aspernatur quia temporibus labore laborum minima, maxime deleniti corrupti aperiam, sunt sint iste. Facilis, accusamus.</p>
              <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nostrum similique impedit, itaque consectetur blanditiis aspernatur quia temporibus labore laborum minima, maxime deleniti corrupti aperiam, sunt sint iste. Facilis, accusamus.</p>
              <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nostrum similique impedit, itaque consectetur blanditiis aspernatur quia temporibus labore laborum minima, maxime deleniti corrupti aperiam, sunt sint iste. Facilis, accusamus.</p>
              <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nostrum similique impedit, itaque consectetur blanditiis aspernatur quia temporibus labore laborum minima, maxime deleniti corrupti aperiam, sunt sint iste. Facilis, accusamus.</p>
              <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nostrum similique impedit, itaque consectetur blanditiis aspernatur quia temporibus labore laborum minima, maxime deleniti corrupti aperiam, sunt sint iste. Facilis, accusamus.</p>
              <div className='flex justify-start mt-4'>
                <ButtonLink buttonFace='X' label='Back' internal url='/' />
              </div>
            </div>
          </motion.div>
        </section>
        
      </MainLayout>
    </>
  )
}
