import { motion } from 'motion/react';

interface GlowLineProps {
  width?: string;
  className?: string;
}

export function GlowLine({ width = '120px', className = '' }: GlowLineProps) {
  return (
    <motion.div
      className={`h-[2px] ${className}`}
      style={{
        width,
        background: 'linear-gradient(to right, #42F5DC, #BFA36F)',
        boxShadow: '0 0 8px rgba(66, 245, 220, 0.4)',
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}
