import { forwardRef, useRef, useState, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegSadTear, FaRegSmileBeam } from 'react-icons/fa';
import { GoThumbsup } from 'react-icons/go';
import { AiOutlineMessage } from 'react-icons/ai';
const Alert = forwardRef(({ children, isCloseable, isError }, ref) => {
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => setShow(true),
    hide: () => setShow(false),
  }));

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            id='backdrop'
            initial={{ opacity: 0, transition: { duration: 0.3 } }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.4 } }}
            onClick={() => {
              if (!isCloseable) return;
              setShow(false);
            }}
            className='fixed h-screen w-screen bg-modalBackdrop top-0 left-0 z-50'
          />
          <motion.div
            id='modal'
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
              transition: {
                duration: 0.4,
              },
            }}
            exit={{
              scale: 0,
              transition: {
                duration: 0.5,
                delay: 0.4,
              },
            }}
            className='fixed top-0 bottom-0 right-0 left-0 w-90 md:w-3/4 xl:w-1/2 rounded-md m-auto h-fit bg-secondary shadow-hard z-50'
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: {
                  duration: 0.3,
                  delay: 0.4,
                },
              }}
              exit={{
                scale: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.2,
                },
              }}
              id='modal-content'
            >
              <header
                className={`p-[10px] rounded-tr-md rounded-tl-md ${
                  isError ? 'bg-red-400' : 'bg-green-400'
                }`}
              >
                {/* p-3 needs because down in button theres a p-3 */}
                <motion.div
                  initial={{ x: 400, opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                      delay: 0.5,
                    },
                  }}
                  exit={{
                    x: 400,
                    opacity: 0,
                    transition: {
                      duration: 0.4,
                    },
                  }}
                  id='wrap-icon-title'
                  className='p-3 flex justify-center items-center space-x-4'
                >
                  {isError ? (
                    <FaRegSadTear size={43} fill='white' />
                  ) : (
                    <FaRegSmileBeam size={43} fill='white' />
                  )}
                  {isError && (
                    <h1
                      className={`font-title text-xl ${
                        isError ? 'text-white' : 'text-green-700'
                      } self-center`}
                    >
                      Åh nej, der er opstået en fejl.
                    </h1>
                  )}
                </motion.div>
              </header>
              <motion.div
                initial={{ x: 400, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    delay: 0.5,
                  },
                }}
                exit={{
                  x: 400,
                  opacity: 0,
                  transition: {
                    duration: 0.4,
                  },
                }}
                className='p-[25px] font-title2 text-md text-gray-400 flex flex-col items-center justify-center'
              >
                <AiOutlineMessage
                  className={`${isError ? 'fill-red-400' : 'fill-green-400'}`}
                  size={30}
                />
                {children}
              </motion.div>
              <footer className={`self-end flex justify-center`}>
                <button
                  disabled={isCloseable === false}
                  onClick={() => setShow(false)}
                  className={`w-fit shadow-form mb-5 p-2 px-10 rounded-full font-text2 ring-2 ${
                    isError
                      ? 'ring-red-300 text-white bg-red-400'
                      : 'ring-green-300 text-white bg-green-400'
                  } flex space-x-4`}
                >
                  <GoThumbsup
                    size={13}
                    className={`fill-white top-0 bottom-0 my-auto`}
                  />
                  <span>OK</span>
                </button>
              </footer>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export default Alert;
