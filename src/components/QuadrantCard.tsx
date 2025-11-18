import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface QuadrantCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
  glowColor?: string;
  delay?: number;
  starDensity?: 'normal' | 'high';
  hasAurora?: boolean;
}

export function QuadrantCard({ 
  title, 
  subtitle, 
  icon, 
  children, 
  glowColor = '#42F5DC',
  delay = 0,
  starDensity = 'normal',
  hasAurora = false
}: QuadrantCardProps) {
  return (
    <motion.div
      className="relative p-8 rounded-3xl glass overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
      style={{
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Animated gradient border on hover */}
      <motion.div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${glowColor}15, transparent)`,
          border: `1px solid ${glowColor}30`,
        }}
      />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, ${glowColor} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      
      {/* Aurora wash */}
      {hasAurora && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#6E79FF]/3 via-transparent to-transparent pointer-events-none" />
      )}
      
      {/* Header */}
      <div className="relative flex items-start gap-4 mb-6">
        <motion.div 
          className="p-3.5 rounded-2xl glass-strong flex items-center justify-center"
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>
        <div className="flex-1 pt-1">
          <h2 className="text-lg uppercase tracking-wider text-white mb-1 font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {title}
          </h2>
          <p className="text-[#C8A777] text-sm font-light">
            {subtitle}
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative">
        {children}
      </div>
      
      {/* Accent glow */}
      <div 
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle, ${glowColor}15, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />
    </motion.div>
  );
}
