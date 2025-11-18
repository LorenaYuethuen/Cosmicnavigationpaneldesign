import { motion } from 'motion/react';
import { useMemo } from 'react';

export function CosmicBackground() {
  // Generate all star data at once - memoized to prevent re-generation
  const { starLayers, orbs } = useMemo(() => {
    const layers = [
      { count: 80, size: [0.3, 1] as [number, number], opacity: [0.1, 0.3] as [number, number], blur: 0 },
      { count: 60, size: [1, 2] as [number, number], opacity: [0.2, 0.5] as [number, number], blur: 0.5 },
      { count: 40, size: [1.5, 3] as [number, number], opacity: [0.3, 0.6] as [number, number], blur: 1 },
    ];

    const starsData = layers.map((layer, layerIndex) => ({
      ...layer,
      stars: Array.from({ length: layer.count }, (_, i) => {
        const duration = Math.random() * 3 + 2; // 2-5 seconds
        return {
          id: `${layerIndex}-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.max(0.1, Math.random() * (layer.size[1] - layer.size[0]) + layer.size[0]),
          opacity: Math.max(0.05, Math.random() * (layer.opacity[1] - layer.opacity[0]) + layer.opacity[0]),
          duration: Math.max(2, duration), // Ensure minimum 2 seconds
        };
      }),
    }));

    const orbsData = Array.from({ length: 8 }, (_, i) => {
      const duration = Math.max(15, 15 + i * 2);
      return {
        id: `orb-${i}`,
        left: (i * 13 + 10) % 90,
        top: (i * 17 + 5) % 80,
        size: 50 + (i * 10),
        color: ['#42F5DC', '#6E79FF', '#28D5C6'][i % 3],
        duration,
      };
    });

    return { starLayers: starsData, orbs: orbsData };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ perspective: '1200px' }}>
      {/* Deep space gradient background with layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#04070F] via-[#0B1C26] to-[#04070F]" />
      
      {/* Deep space nebula effect - multiple layers */}
      <motion.div 
        className="absolute -top-1/2 left-0 w-[800px] h-[800px] bg-[#42F5DC] rounded-full opacity-[0.08]"
        style={{ filter: 'blur(150px)' }}
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: 9999, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-[#6E79FF] rounded-full opacity-[0.06]"
        style={{ filter: 'blur(140px)' }}
        animate={{ 
          scale: [1, 1.15, 1],
          x: [0, -40, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 25, repeat: 9999, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute -bottom-1/3 left-1/3 w-[600px] h-[600px] bg-[#28D5C6] rounded-full opacity-[0.05]"
        style={{ filter: 'blur(130px)' }}
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 30, repeat: 9999, ease: "easeInOut" }}
      />

      {/* Layered star fields with depth */}
      {starLayers.map((layer, layerIndex) => (
        <div 
          key={layerIndex}
          className="absolute inset-0"
          style={{ 
            transform: `translateZ(${layerIndex * 20}px)`,
            filter: `blur(${layer.blur}px)`,
          }}
        >
          {layer.stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(124, 232, 255, 0.4))',
                boxShadow: `0 0 ${star.size * 2}px rgba(66, 245, 220, 0.3)`,
              }}
              animate={{
                opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: star.duration,
                repeat: 9999,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      ))}

      {/* Floating light orbs for depth */}
      {orbs.map((orb, index) => {
        const xOffset = Math.sin(index) * 50;
        return (
          <motion.div
            key={orb.id}
            className="absolute rounded-full"
            style={{
              left: `${orb.left}%`,
              top: `${orb.top}%`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              background: `radial-gradient(circle, ${orb.color}20, transparent)`,
              filter: 'blur(40px)',
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, xOffset, 0],
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: orb.duration,
              repeat: 9999,
              ease: "easeInOut",
            }}
          />
        );
      })}
      
      {/* Subtle grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Radial gradient overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(4, 7, 15, 0.4) 100%)',
        }}
      />
    </div>
  );
}
