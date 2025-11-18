import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  glowing?: boolean;
  delay?: number;
}

export function ModernCard({ 
  children, 
  className = '', 
  hoverable = true,
  glowing = false,
  delay = 0 
}: ModernCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`
        glass rounded-2xl p-6
        ${hoverable ? 'hover:border-[#42F5DC]/30 cursor-pointer transition-all duration-300' : ''}
        ${glowing ? 'shadow-[0_0_40px_rgba(66,245,220,0.15)]' : 'shadow-[0_4px_24px_rgba(0,0,0,0.3)]'}
        ${className}
      `}
      whileHover={hoverable ? { 
        scale: 1.02,
        boxShadow: '0 0 40px rgba(66, 245, 220, 0.2)',
      } : {}}
    >
      {children}
    </motion.div>
  );
}
