import { Contact, Facebook, Linkedin, Star } from 'lucide-react';
import { motion } from 'framer-motion'
import { useCallback, useState } from 'react';
import Modal from '../Modal/Modal';

export default function MenuBar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');
  const [isInternal, setIsInternal] = useState(false)

  const openModal = useCallback(({ url, message, internal }) => {
    setModalOpen(true);
    setLink(url);
    setMessage(message);
    setIsInternal(!!internal);
  }, [])

  return (
    <>
      <Modal 
        isOpen={modalOpen} 
        setIsOpen={setModalOpen}
        link={link}
        isInternal={isInternal}
      >
        {message}
      </Modal>
      <div className='p-5 fixed border-t-2 border-white/[0.3] xs:bottom-0 left-0 text-white w-full flex justify-center bg-blur [backdrop-filter:saturate(180%)blur(10px)] bg-dark-blue/[0.2] z-[9] lg:w-auto lg:top-0 lg:h-full lg:flex-col lg:border-t-0 lg:border-r-2'>
        <motion.button onClick={() => openModal({ url: 'https://docs.google.com/document/d/1tLdtA38D-Oek-n5P7vICXTq61Re1AKxXrDMlHoBlv5c/edit?usp=share_link', message: 'You are about to download my current CV' })} whileTap={{ scale: 0.9 }} className='rounded-full bg-switch-gray/[0.5] p-3 mr-4 lg:mr-0 lg:mb-4'>
          <Contact className='pointer-events-none' color="#ad4c4a" />
        </motion.button>
        <motion.button onClick={() => openModal({ url: 'https://fb.me/bryanaldrin09', message: 'You are about to be redirected to my Facebook page' })} whileTap={{ scale: 0.9 }} className='rounded-full bg-switch-gray/[0.5] p-3 mr-4 lg:mr-0 lg:mb-4'>
          <Facebook className='pointer-events-none' color="#8c98a6" />
        </motion.button>
        <motion.button onClick={() => openModal({ url: 'https://www.linkedin.com/in/bryan-aldrin-quinalayo/', message: 'You are about to be redirected to my LinkedIn profile' })} whileTap={{ scale: 0.9 }} className='rounded-full bg-switch-gray/[0.5] p-3 mr-4 lg:mr-0 lg:mb-4'>
          <Linkedin className='pointer-events-none' color="#b69d4e" />
        </motion.button>
        <motion.button onClick={() => openModal({ url: '/star-wars', message: 'You are about to be redirected to the old ✨Star Wars✨ version of this portfolio', internal: true })} whileTap={{ scale: 0.9 }} className='rounded-full bg-switch-gray/[0.5] p-3 lg:mr-0 lg:mb-4'>
          <Star className='pointer-events-none' color="#8c98a6" />
        </motion.button>
      </div>
    </>
  )
}
