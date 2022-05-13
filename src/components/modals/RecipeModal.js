import { useState, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RecipeModal = forwardRef(({ children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    };
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
              transition: { delay: 0.4 },
            }}
            onClick={() => {
              setIsOpen(false);
            }}
            className='fixed h-screen w-screen top-0 left-0 bg-modalBackdrop z-50'
          />
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              scale: 0,
              transition: { delay: 0.4 },
            }}
            className='fixed w-95 lg:w-[900px] xl:w-[1100px] h-fit max-h-[900px] bg-secondary rounded-md shadow-form m-auto top-0 bottom-0 left-0 right-0 p-[50px] z-50 '
          >
            <motion.div
              initial={{
                x: 200,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: 0.3,
                },
              }}
              exit={{ x: 200, opacity: 0, transition: { duration: 0.3 } }}
              id='modal-content'
              className='max-h-[700px] overflow-auto'
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export default RecipeModal;
