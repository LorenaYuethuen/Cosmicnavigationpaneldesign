import { motion } from 'motion/react';
import { useMemo } from 'react';

export function AmbientLights() {
  const lightSpots = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => {
      const duration = Math.max(12, 12 + i * 2);
      return {
        id: `spot-${i}`,
        left: 20 + i * 13,
        top: 10 + (i % 3) * 30,
        size: Math.max(100, 100 + (i * 15)),
        color: ['#42F5DC', '#6E79FF', '#28D5C6', '#BFA36F'][i % 4],
        duration,
        index: i,
      };
    })
  , []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Scanning light beam */}
      <motion.div
        className="absolute left-0 top-0 w-px h-full opacity-20"
        style={{
          background: 'linear-gradient(180deg, transparent, #42F5DC 20%, #42F5DC 80%, transparent)',
          filter: 'blur(2px)',
          boxShadow: '0 0 20px #42F5DC',
        }}
        animate={{
          x: ['0vw', '100vw'],
        }}
        transition={{
          duration: 15,
          repeat: 9999,
          ease: "linear",
        }}
      />

      {/* Vertical accent beams */}
      {[20, 50, 80].map((left, i) => {
        const duration = Math.max(4, 4 + i);
        return (
          <motion.div
            key={`vbeam-${i}`}
            className="absolute top-0 h-full w-px opacity-10"
            style={{
              left: `${left}%`,
              background: `linear-gradient(180deg, transparent, ${['#42F5DC', '#6E79FF', '#28D5C6'][i]} 50%, transparent)`,
              filter: 'blur(1px)',
            }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration,
              repeat: 9999,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Horizontal scanning lines */}
      {[15, 45, 75].map((top, i) => {
        const duration = Math.max(5, 5 + i);
        return (
          <motion.div
            key={`hbeam-${i}`}
            className="absolute left-0 w-full h-px opacity-5"
            style={{
              top: `${top}%`,
              background: `linear-gradient(90deg, transparent, ${['#6E79FF', '#42F5DC', '#28D5C6'][i]} 50%, transparent)`,
              filter: 'blur(1px)',
            }}
            animate={{
              opacity: [0.03, 0.08, 0.03],
              scaleX: [0.8, 1, 0.8],
            }}
            transition={{
              duration,
              repeat: 9999,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Corner spotlights */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #42F5DC, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: 9999,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #6E79FF, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: 9999,
          ease: "easeInOut",
        }}
      />

      {/* Floating light spots */}
      {lightSpots.map((spot) => (
        <motion.div
          key={spot.id}
          className="absolute rounded-full"
          style={{
            left: `${spot.left}%`,
            top: `${spot.top}%`,
            width: `${spot.size}px`,
            height: `${spot.size}px`,
            background: `radial-gradient(circle, ${spot.color}08, transparent 70%)`,
            filter: 'blur(50px)',
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.sin(spot.index) * 30, 0],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: spot.duration,
            repeat: 9999,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Data stream effect */}
      {Array.from({ length: 3 }).map((_, i) => {
        const duration = Math.max(4, 4 + i);
        return (
          <motion.div
            key={`stream-${i}`}
            className="absolute w-0.5 h-20 opacity-20"
            style={{
              left: `${30 + i * 25}%`,
              top: '-80px',
              background: `linear-gradient(180deg, transparent, ${['#42F5DC', '#6E79FF', '#28D5C6'][i]}, transparent)`,
              filter: 'blur(1px)',
              boxShadow: `0 0 10px ${['#42F5DC', '#6E79FF', '#28D5C6'][i]}`,
            }}
            animate={{
              y: ['0vh', '120vh'],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration,
              repeat: 9999,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}
