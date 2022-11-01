import Head from 'next/head';
import { motion } from 'framer-motion'
import Projects from '../components/Projects/Projects';
import MainLayout from '../layouts/MainLayout';
import client from '../../apollo-client'
import { gql } from '@apollo/client';

export default function Home({ projects }) {
  
  return (
    <>
      <Head>
        <title>Home | Bryan Aldrin E Quinalayo &ndash; Senior React Developer</title>
        <meta name="description" content="Professional Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <MainLayout>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, pointerEvents: 'none' }}
          transition={{ 
            duration: 1,
            delay: 3
          }}
          className="bg-black text-white h-screen w-full relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, pointerEvents: 'none' }}
            transition={{ duration: 3 }}
            className='w-full h-full flex flex-wrap justify-center items-center content-center'
          >
            <div className='border-2 border-white px-4 py-2 rounded-full'>Bryan Aldrin E. Quinalayo</div>
          </motion.div>
        </motion.div>
        <Projects projects={projects} />
      </MainLayout>
    </>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      {
        projects(orderBy: year_DESC) {
          id,
          name,
          year,
          imageCap {
            url
          },
          position,
        }
      }
    `
  });

  return {
    props: {
      projects: data.projects
    }
  };
}