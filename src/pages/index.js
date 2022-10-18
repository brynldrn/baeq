import Head from 'next/head';
import { motion } from 'framer-motion'
import NotificationBar from '../components/NotificationBar/NotificationBar';
import MenuBar from '../components/MenuBar/MenuBar';
import Projects from '../components/Projects/Projects';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Bryan Aldrin E Quinalayo &ndash; Senior React Developer</title>
        <meta name="description" content="Professional Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <main className='relative'>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, pointerEvents: 'none' }}
          transition={{ 
            duration: 1,
            delay: 3
          }}
          className="bg-black text-white h-screen w-full relative z-[999999]"
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
        <NotificationBar /> 
        <MenuBar />
        <Projects />
      </main>
    </>
  )
}
