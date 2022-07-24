import {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useContext,
  createContext,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegSadTear, FaRegSmileBeam } from 'react-icons/fa';
import { GoThumbsup } from 'react-icons/go';
import { AiOutlineMessage } from 'react-icons/ai';

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

const AlertProvider = (props) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const [isError, setIsError] = useState(true);
  const [isCloseable, setIsCloseable] = useState(true);

  const showError = ({
    message = 'Uventet fejl!',
    errors = [],
    closeable = true,
  }) => {
    setMessage(message);
    setErrors(errors);
    setIsCloseable(closeable);
    setIsError(true);
    setShow(true);
  };

  const showSuccess = ({
    message = 'Ok det er godkendt!',
    errors = [],
    closeable = true,
  }) => {
    setMessage(message);
    setErrors(errors);
    setIsCloseable(closeable);
    setIsError(false);
    setShow(true);
  };

  return (
    <AlertContext.Provider value={{ showError, showSuccess }}>
      <AlertComponent
        show={show}
        setShow={setShow}
        setIsError={setIsError}
        isCloseable={isCloseable}
        isError={isError}
        message={message}
        errors={errors}
      />
      {props.children}
    </AlertContext.Provider>
  );
};

const AlertComponent = ({
  show,
  setShow,
  setIsError,
  isCloseable,
  isError,
  message,
  errors,
}) => (
  <AnimatePresence>
    {show && (
      <div className='z-[100] fixed w-full'>
        <motion.div
          id='backdrop'
          initial={{ opacity: 0, transition: { duration: 0.3 } }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.4 } }}
          onClick={() => {
            if (!isCloseable) return;
            setShow(false);
            setIsError(false);
          }}
          className='h-full w-full bg-modalBackdrop top-0 left-0'
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
              duration: 0.3,
              delay: 0.5,
            },
          }}
          //w-90 md:w-3/4 xl:w-1/2*/
          className='absolute top-0 bottom-0 right-0 left-0 m-auto w-90 md:w-[600px] rounded-md h-fit max-h-[400px] bg-secondary shadow-hard'
        >
          {/** Header is h-1/4 */}
          <header
            className={`h-1/4 rounded-tr-md rounded-tl-md ${
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
              className='p-3 h-full flex justify-center items-center space-x-4'
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
          {/** content is h-3/4 */}
          <motion.section
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
                duration: 0.3,
                delay: 0.4,
              },
            }}
            className='h-3/4 max-h-3/4 '
            id='modal-section'
          >
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
              id='modal-content'
              className='h-full overflow-auto hide-scroll pr-[50px] pl-[50px] pt-[25px] pb-[25px] font-title2 text-md text-gray-400 flex flex-col items-strech'
            >
              {/** mt-auto applies to both to make the div above go center, and the footer go to the bottom */}
              <div className='mt-auto space-y-2'>
                <AiOutlineMessage
                  className={`${isError ? 'fill-red-400' : 'fill-green-400'}`}
                  size={30}
                />
                <div>
                  <>
                    <p>{message}</p>
                    {errors.length > 0 && (
                      <ul className='list-disc list-inside'>
                        {errors.map((error, idx) => {
                          return <li key={idx}>{error}</li>;
                        })}
                      </ul>
                    )}
                  </>
                </div>
              </div>
              <footer className={`flex justify-center`}>
                <button
                  disabled={isCloseable === false}
                  onClick={() => {
                    setShow(false);
                    setIsError(false);
                  }}
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
          </motion.section>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default AlertProvider;
