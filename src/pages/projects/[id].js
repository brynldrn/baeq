import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion'
import Head from 'next/head';
import Image from 'next/image'
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import { useMediaQuery } from 'react-responsive';
import { useMemo } from 'react';
import { gql } from '@apollo/client';
import client from '../../../apollo-client';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export default function Project({ projectDetails }) {
  const isSmallDesktop = useMediaQuery({
    minWidth: 1024
  })
  const { project } = projectDetails;
  const { imageCap, longMd, url, name, year, position } = project

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
        <section className='relative h-full flex flex-wrap justify-center items-center content-center pt-36'>
          <motion.div
            className='w-full h-full pb-36'
            initial={{
              marginTop: 60,
            }}
            animate={{
              marginTop: 0,
              transition: {
                duration: 0.5
              }
            }}
          >
            <div className='mb-7 mx-3'>
              <span className='block text-center text-white font-sans text-4xl'>{name}</span>
              <span className='block text-white text-center mt-2'>{`${year} - ${position}`}</span>
            </div>
            <motion.div 
              className='mx-auto rounded-xl overflow-hidden relative'
              initial={initialValues}
              animate={animateValues}
            >
              <Image src={imageCap?.url} width="100%" height="100%" layout='fill' objectFit='contain' />
            </motion.div>
            <div className='px-5 mt-5 text-white lg:max-w-[720px] lg:px-0 lg:mx-auto'>
              <div className='flex justify-evenly mb-7 lg:justify-start'>
                <ButtonLink label='Visit Site' className='mr-5' url={url} />
                <ButtonLink buttonFace='B' label='Home' internal url='/' />
              </div>
              <ReactMarkdown components={{
                h3: ({ children }) => <h3 className='mt-5'>{children}</h3>,
                a: ({ children, href }) => <a href={href} className='text-red-500 underline' target="_blank">{children}</a>
              }}>
                {longMd}
              </ReactMarkdown>
              {/* <div className='flex justify-start mt-4'>
                <ButtonLink buttonFace='X' label='Back' internal url='/' />
              </div> */}
            </div>
          </motion.div>
        </section>
      </MainLayout>
    </>
  )
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      {
        projects(orderBy: year_DESC) {
          id
        }
      }
    `
  });

  const paths = data.projects.map(({ id }) => {
    return {
      params: {
        id
      }
    }
  });

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { data: projectDetails } = await client.query({
    query: gql`
      query Project($id: ID) {
          project(where: { id: $id }) {
          id,
          name,
          year,
          url,
          imageCap {
            url
          },
          longMd,
          gallery {
            id
          },
          position
        }
      }
    `,
    variables: {
      id: params.id
    }
  });

  return {
    props: {
      projectDetails
    }
  }
}
