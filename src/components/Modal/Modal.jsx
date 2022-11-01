import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function Modal({ isOpen = false, setIsOpen, children, link, isInternal }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="z-[99999] fixed inset-0 flex items-center justify-center overflow-y-auto">
          <div className="flex flex-col py-8 px-4 text-center">
            <Dialog.Overlay />
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-blur [backdrop-filter:blur(10px)]" />
            </div>
            <motion.div
              className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center"
              initial={{
                opacity: 0,
                scale: 0.75
              }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  ease: 'easeOut',
                  duration: 0.15
                }
              }}
              exit={{
                opacity: 0,
                scale: 0.75,
                transition: {
                  ease: 'easeIn',
                  duration: 0.15
                }
              }}
            >
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                      <AlertTriangle color="orange" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        Redirect Confirmation
                      </Dialog.Title>
                      <div className="mt-2">
                        <Dialog.Description
                          as="p"
                          className="text-sm text-gray-500"
                        >
                          {children}
                        </Dialog.Description>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  {isInternal ? (
                    <Link href={link}>
                      <a
                        tabIndex={0}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        Proceed
                      </a>
                    </Link>
                  ) : (
                    <a
                      href={link}
                      target="_blank"
                      tabIndex={0}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setIsOpen(false)} rel="noreferrer"
                    >
                      Proceed
                    </a>
                  )}
                  <button
                    type="button"
                    tabIndex={0}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
