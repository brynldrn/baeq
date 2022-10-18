import { Contact, Facebook, Linkedin, Star } from 'lucide-react';
import { motion } from 'framer-motion'

export default function MenuBar() {
  return (
    <div className='p-5 fixed border-t-2 border-white/[0.3] bottom-0 left-0 text-white w-full flex justify-center bg-blur [backdrop-filter:saturate(180%)blur(10px)] bg-dark-blue/[0.2] z-[9]'>
      <motion.button whileTap={{ scale: 0.9 }} className='rounded-full bg-switch-gray/[0.5] p-3 mr-4'>
        <Contact color="#ad4c4a" />
      </motion.button>
      <motion.button whileTap={{ scale: 0.9 }} className='rounded-full bg-switch-gray/[0.5] p-3 mr-4'>
        <Facebook color="#8c98a6" />
      </motion.button>
      <motion.button whileTap={{ scale: 0.9 }} className='rounded-full bg-switch-gray/[0.5] p-3 mr-4'>
        <Linkedin color="#b69d4e" />
      </motion.button>
      <motion.button whileTap={{ scale: 0.9 }} className='rounded-full bg-switch-gray/[0.5] p-3'>
        <Star color="#8c98a6" />
      </motion.button>
    </div>
  )
}
