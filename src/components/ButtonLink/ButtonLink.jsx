import classNames from 'classnames';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import Modal from '../Modal/Modal';

export default function ButtonLink({ url = '', label = 'Open Link', buttonFace = 'A', internal = false, className = '' }) {
  const [modalOpen, setModalOpen] = useState(false);

  const onExternalClick = useCallback(() => {
    setModalOpen(true);
  }, [])

  return (
    <>
      <Modal 
        isOpen={modalOpen} 
        setIsOpen={setModalOpen}
        link={url}
      >
        You are about to visit an external site
      </Modal>
      {
        internal ? (
          <Link href={url} >
            <a className={classNames('inline-flex items-center', className)}>
              <span className='text-black bg-white rounded-full font-semibold w-6 inline-block text-center mr-3'>{buttonFace}</span> <span>{label}</span>
            </a>
          </Link>
        ) : (
          <button onClick={onExternalClick} className={classNames('inline-flex items-center', className)}>
            <span className='text-black bg-white rounded-full font-semibold w-6 inline-block text-center mr-3'>{buttonFace}</span> <span>{label}</span>
          </button>
        )
      }
    </>
    
  )
}
