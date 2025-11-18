import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect } from 'react';

export function MouseFollower() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: '-50%',
          y: '-50%',
        }}
      >
        <div
          className="w-64 h-64 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(66, 245, 220, 0.4), rgba(66, 245, 220, 0.1) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* Secondary glow */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: '-50%',
          y: '-50%',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 150 }}
      >
        <div
          className="w-32 h-32 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(110, 121, 255, 0.4), transparent 60%)',
            filter: 'blur(20px)',
          }}
        />
      </motion.div>
    </>
  );
}
