import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './Card';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';

function CourseSlider({ data, mostPopular }) {
  const [state, setState] = useState(0);
  const [direction, setDirection] = useState(0);

  const sortedData = useMemo(() => {
    const cloned = [...data];
    if (mostPopular) {
      return cloned.sort(
        (a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length
      );
    } else {
      return cloned.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
  }, [data, mostPopular]);

  useEffect(() => {
    setState(0);
  }, [mostPopular]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    if (newDirection === 1 && state < sortedData.length - 3) {
      setDirection(newDirection);
      setState(state + 3);
    } else if (newDirection === -1 && state > 0) {
      setDirection(newDirection);
      setState(state - 3);
    }
  };

  return (
    <div className="w-full flex gap-2 items-center relative mt-4">
      <button
        onClick={() => paginate(-1)}
        className="w-8 text-richblack-600 absolute -left-10 z-10 hover:text-richblack-400 transition-colors"
      >
        {state !== 0 && <IoIosArrowDropleftCircle size={30} />}
      </button>
      
      <div className="w-full overflow-hidden relative h-80">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={state}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full grid grid-cols-3 gap-8"
          >
            {sortedData.slice(state, state + 3).map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card data={course} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <button
        onClick={() => paginate(1)}
        className="w-8 text-richblack-600 absolute -right-10 z-10 hover:text-richblack-400 transition-colors"
      >
        {state + 3 < sortedData.length && (
          <IoIosArrowDroprightCircle size={30} />
        )}
      </button>
    </div>
  );
}

export default CourseSlider;