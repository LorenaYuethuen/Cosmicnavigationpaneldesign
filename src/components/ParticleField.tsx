import { motion } from 'motion/react';
import { useMemo } from 'react';

export function ParticleField() {
  // Generate particles with 3D positions
  const particles = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => {
      const duration = Math.max(15, Math.random() * 20 + 15);
      const size = Math.max(1, Math.random() * 3 + 1);
      const opacity = Math.max(0.2, Math.min(1, Math.random() * 0.4 + 0.2));
      
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        depth: Math.random() * 100 - 50, // -50 to 50 for z-axis
        duration,
        color: ['#42F5DC', '#6E79FF', '#28D5C6', '#BFA36F'][Math.floor(Math.random() * 4)],
        opacity,
      };
    })
  , []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ perspective: '1000px' }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color}, transparent)`,
            opacity: particle.opacity,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.sin(particle.id) * 30, Math.sin(particle.id) * 60],
            scale: [1, 1.2, 0.8],
            opacity: [particle.opacity, particle.opacity * 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: 9999,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
