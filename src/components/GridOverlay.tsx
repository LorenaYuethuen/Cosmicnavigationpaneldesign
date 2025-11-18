import { motion } from 'motion/react';

export function GridOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Perspective grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(66, 245, 220, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(66, 245, 220, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(500px) rotateX(60deg) scale(2)',
          transformOrigin: 'center bottom',
        }}
      />

      {/* Vertical grid lines with depth */}
      {Array.from({ length: 20 }).map((_, i) => {
        const duration = Math.max(5, 5 + (i % 3));
        return (
          <motion.div
            key={`vgrid-${i}`}
            className="absolute top-0 h-full w-px"
            style={{
              left: `${i * 5}%`,
              background: `linear-gradient(180deg, transparent, rgba(66, 245, 220, 0.1) 20%, rgba(66, 245, 220, 0.1) 80%, transparent)`,
              opacity: 0.05,
            }}
            animate={{
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration,
              repeat: 9999,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Radial gradient overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(4, 7, 15, 0.6) 100%)',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-40 h-40 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.path
            d="M 0 0 L 100 0 L 100 5 L 5 5 L 5 100 L 0 100 Z"
            fill="none"
            stroke="#42F5DC"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-40 h-40 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.path
            d="M 100 0 L 0 0 L 0 5 L 95 5 L 95 100 L 100 100 Z"
            fill="none"
            stroke="#6E79FF"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-40 h-40 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.path
            d="M 0 100 L 0 0 L 5 0 L 5 95 L 100 95 L 100 100 Z"
            fill="none"
            stroke="#28D5C6"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
          />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-40 h-40 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.path
            d="M 100 100 L 100 0 L 95 0 L 95 95 L 0 95 L 0 100 Z"
            fill="none"
            stroke="#BFA36F"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
          />
        </svg>
      </div>

      {/* Scanning effect */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #42F5DC 50%, transparent)',
          boxShadow: '0 0 20px #42F5DC',
          opacity: 0.15,
        }}
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: 9999,
          ease: "linear",
        }}
      />
    </div>
  );
}
