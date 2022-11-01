import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion'
import Head from 'next/head';
import Image from 'next/image'
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import { useMediaQuery } from 'react-responsive';
import { useMemo, useState } from 'react';

export default function Project() {
  const isSmallDesktop = useMediaQuery({
    minWidth: 1024
  })

  const initialValues = useMemo(() => {
    if (isSmallDesktop) {
      return {
        width: 420,
        height: 520,
      }
    }

    return {
      width: 280,
      height: 336
    }
  }, [isSmallDesktop])

  const animateValues = useMemo(() => {
    if (isSmallDesktop) {
      return {
        width: 720,
        height: 520,
      }
    }

    return {
      width: 340,
      height: 300
    }
  }, [isSmallDesktop])

  return (
    <>
      <Head>
        <title>Home | Bryan Aldrin E Quinalayo &ndash; Senior React Developer</title>
        <meta name="description" content="Professional Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <MainLayout>
        <section className='relative'>
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
              initial={initialValues}
              animate={animateValues}
            >
              <Image src="https://picsum.photos/seed/picsum/1920/720" width="100%" height="100%" layout='fill' objectFit='cover' />
            </motion.div>
            <div className='px-5 mt-5 text-white lg:max-w-[720px] lg:px-0 lg:mx-auto'>
              <div className='flex justify-evenly mb-7 lg:justify-start'>
                <ButtonLink label='Visit Site' className='mr-5' />
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
