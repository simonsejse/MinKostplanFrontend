/**
 * Framer
 */
import { motion } from 'framer-motion';
/**
 * React
 */
import React from 'react';
import { useState } from 'react';

const variants = {
  SQUARE: {
    width: '300px',
    height: '400px',
    borderTopLeftRadius: '15px',
    borderBottomLeftRadius: '15px',
    alignItems: 'start',
    overflowY: 'auto',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
  },
  CIRCLE: {
    width: '60px',
    height: '60px',
    alignItems: 'center',
    boxShadow:
      'rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px',
    borderRadius: '100%',
  },
};

const HoverableCard = ({ children, Icon }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      onHoverEnd={() => {
        setIsHovering(false);
      }}
      /*onMouseLeave={() => {
        setIsHovering(false);
      }}*/
    >
      <motion.div
        animate={!isHovering ? 'CIRCLE' : 'SQUARE'}
        //transition={{ ease: [0.13, 0.37, 0.53, 0.67] }}
        variants={variants}
        onHoverStart={() => {
          setIsHovering(true);
        }}
        className={`bg-indigo-500 flex justify-center hide-scroll`}
      >
        <div id='content' className={`p-5 ${isHovering && 'w-full'}`}>
          {Icon}
          {isHovering && <>{children}</>}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HoverableCard;
