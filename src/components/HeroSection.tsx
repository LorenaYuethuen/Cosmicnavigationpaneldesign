import { motion } from 'motion/react';
import { useMemo } from 'react';

export function HeroSection() {
  const particles = useMemo(() => 
    Array.from({ length: 5 }, (_, i) => {
      const duration = Math.max(4, 4 + i);
      return {
        id: `hero-particle-${i}`,
        left: 20 + i * 15,
        top: 30 + i * 10,
        size: Math.max(3, 3 + (i * 0.3)),
        color: ['#42F5DC', '#6E79FF', '#28D5C6'][i % 3],
        duration,
        index: i,
      };
    })
  , []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-20 perspective-container">
      {/* Floating light particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color}, transparent)`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -50, -100],
            x: [0, Math.sin(particle.index) * 20, Math.sin(particle.index) * 40],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: 9999,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Simple centered content with 3D transform */}
      <div className="relative z-10 max-w-4xl mx-auto text-center transform-3d">
        {/* Main Mantra */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 transform-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.p 
            className="text-3xl md:text-4xl lg:text-5xl text-white/90 mb-8 leading-relaxed font-light italic"
            style={{ 
              fontFamily: 'Cormorant Garamond, serif',
              textShadow: '0 4px 20px rgba(66, 245, 220, 0.1), 0 0 40px rgba(66, 245, 220, 0.05)',
            }}
            animate={{
              textShadow: [
                '0 4px 20px rgba(66, 245, 220, 0.1), 0 0 40px rgba(66, 245, 220, 0.05)',
                '0 4px 25px rgba(66, 245, 220, 0.15), 0 0 50px rgba(66, 245, 220, 0.08)',
                '0 4px 20px rgba(66, 245, 220, 0.1), 0 0 40px rgba(66, 245, 220, 0.05)',
              ],
            }}
            transition={{ duration: 4, repeat: 9999, ease: "easeInOut" }}
          >
            "Let me naturally align with the life meant for me."
          </motion.p>
          <motion.p 
            className="text-2xl md:text-3xl text-[#C8A777]/80 font-light"
            style={{ 
              fontFamily: 'Cormorant Garamond, serif',
              textShadow: '0 2px 15px rgba(191, 163, 111, 0.2)',
              transform: 'translateZ(10px)',
            }}
          >
            我愿意流动，我愿意体验。
          </motion.p>
        </motion.div>

        {/* Subtitle - System Philosophy with glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative inline-block mb-20"
        >
          <motion.div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(66, 245, 220, 0.2), transparent 70%)',
              filter: 'blur(30px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 3, repeat: 9999, ease: "easeInOut" }}
          />
          <p
            className="relative text-white/40 text-sm uppercase tracking-[0.3em] font-light px-8"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            精力 × 时间 × 金钱 = 体验
          </p>
        </motion.div>
      </div>

      {/* Scroll hint with enhanced glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: 9999, ease: "easeInOut" }}
          className="relative"
        >
          <div
            className="absolute inset-0 -z-10 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(66, 245, 220, 0.3), transparent)',
              filter: 'blur(20px)',
            }}
          />
          <div className="text-white/30 text-xs uppercase tracking-widest">
            探索
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
