import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface NavLinkProps {
  active: boolean;
  onClick: () => void;
  icon?: ReactNode;
  children: ReactNode;
}

export function ModernNavLink({ active, onClick, icon, children }: NavLinkProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative px-5 py-2.5 rounded-xl font-medium text-sm
        transition-all duration-300 transform-3d
        ${active 
          ? 'text-[#04070F] bg-gradient-to-r from-[#42F5DC] to-[#28D5C6]' 
          : 'text-[#C8A777] hover:text-[#42F5DC] hover:bg-white/5'
        }
      `}
      style={{
        boxShadow: active ? '0 4px 12px rgba(66, 245, 220, 0.3), 0 0 20px rgba(66, 245, 220, 0.1)' : 'none',
      }}
      whileHover={{ 
        scale: 1.05,
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{children}</span>
      </div>
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, #42F5DC 0%, #28D5C6 100%)',
            zIndex: -1,
          }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      {/* Hover glow */}
      {!active && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(66, 245, 220, 0.15), transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      )}
    </motion.button>
  );
}

interface ModernNavBarProps {
  children: ReactNode;
}

export function ModernNavBar({ children }: ModernNavBarProps) {
  return (
    <motion.nav 
      className="sticky top-0 z-50 glass-strong border-b border-white/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), 0 0 40px rgba(66, 245, 220, 0.05)',
      }}
    >
      {/* Subtle top glow */}
      <div 
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(66, 245, 220, 0.3) 50%, transparent)',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 py-4">
        {children}
      </div>
    </motion.nav>
  );
}
