import { motion } from 'motion/react';
import { Infinity } from 'lucide-react';
import { useMemo } from 'react';

export function MobiusMantra() {
  // Memoize particle trail configurations to prevent Math.random() from running on every render
  const particleTrails = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => {
      const angle = i * 30;
      const radius = 80 + Math.random() * 20;
      const duration = 3 + Math.random() * 2; // Always positive, 3-5 seconds
      return {
        id: i,
        angle,
        radius: Math.max(80, radius),
        duration: Math.max(3, duration), // Ensure minimum 3 seconds
        color: ['#42F5DC', '#6E79FF', '#28D5C6'][i % 3],
      };
    })
  , []);

  return (
    <section id="mantra" className="relative flex flex-col items-center justify-center py-16 md:py-24 perspective-container">
      {/* Enhanced Möbius Visual with 3D depth */}
      <div className="relative mb-12 transform-3d">
        {/* Central Icon with Enhanced Glow */}
        <div className="relative">
          {/* Multi-layer pulsing glow */}
          <motion.div
            className="absolute -inset-16 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(66, 245, 220, 0.4) 0%, rgba(110, 121, 255, 0.2) 50%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: 9999, ease: "easeInOut" }}
          />
          
          <motion.div
            className="absolute -inset-12 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(66, 245, 220, 0.5) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 3, repeat: 9999, ease: "easeInOut" }}
          />
          
          {/* Infinity symbol with 3D effect */}
          <motion.div 
            className="relative p-6 rounded-full bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm"
            style={{
              boxShadow: '0 8px 32px rgba(66, 245, 220, 0.2), 0 0 60px rgba(66, 245, 220, 0.1)',
              transform: 'translateZ(20px)',
            }}
            animate={{
              rotateY: [0, 360],
            }}
            transition={{ duration: 20, repeat: 9999, ease: "linear" }}
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: 9999, ease: "easeInOut" }}
            >
              <Infinity className="w-16 h-16 md:w-20 md:h-20 text-[#42F5DC]" strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          {/* Orbiting dots with 3D rotation */}
          {[0, 90, 180, 270].map((angle, i) => {
            const radius = 60;
            const duration = 8;
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  background: `radial-gradient(circle, ${['#42F5DC', '#6E79FF', '#28D5C6', '#BFA36F'][i]}, transparent)`,
                  boxShadow: `0 0 12px ${['#42F5DC', '#6E79FF', '#28D5C6', '#BFA36F'][i]}`,
                }}
                animate={{
                  x: [
                    Math.cos(((angle + 0) * Math.PI) / 180) * radius,
                    Math.cos(((angle + 90) * Math.PI) / 180) * radius,
                    Math.cos(((angle + 180) * Math.PI) / 180) * radius,
                    Math.cos(((angle + 270) * Math.PI) / 180) * radius,
                    Math.cos(((angle + 360) * Math.PI) / 180) * radius,
                  ],
                  y: [
                    Math.sin(((angle + 0) * Math.PI) / 180) * radius,
                    Math.sin(((angle + 90) * Math.PI) / 180) * radius,
                    Math.sin(((angle + 180) * Math.PI) / 180) * radius,
                    Math.sin(((angle + 270) * Math.PI) / 180) * radius,
                    Math.sin(((angle + 360) * Math.PI) / 180) * radius,
                  ],
                  scale: [1, 1.3, 1, 0.8, 1],
                  opacity: [0.6, 1, 0.6, 0.4, 0.6],
                }}
                transition={{
                  duration,
                  repeat: 9999,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* Additional particle trails */}
          {particleTrails.map((particle) => (
            <motion.div
              key={`trail-${particle.id}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                background: `radial-gradient(circle, ${particle.color}40, transparent)`,
              }}
              animate={{
                x: [
                  0,
                  Math.cos((particle.angle * Math.PI) / 180) * particle.radius,
                ],
                y: [
                  0,
                  Math.sin((particle.angle * Math.PI) / 180) * particle.radius,
                ],
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: 9999,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Mantras */}
      <div className="text-center space-y-5 px-4 relative z-10 max-w-3xl">
        <motion.p
          className="text-2xl md:text-3xl italic text-white/80 leading-relaxed font-light"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          "Let me naturally align with the life meant for me."
        </motion.p>
        
        <motion.p
          className="text-lg md:text-xl text-[#C8A777]/70 font-light"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          我愿意流动，我愿意体验。
        </motion.p>

        {/* Divider line */}
        <motion.div
          initial={{ width: '0px', opacity: 0 }}
          whileInView={{ width: '80px', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="h-px bg-gradient-to-r from-transparent via-[#42F5DC]/50 to-transparent mx-auto mt-8"
        />
      </div>
    </section>
  );
}
