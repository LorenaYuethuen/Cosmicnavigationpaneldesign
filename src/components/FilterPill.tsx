import { motion } from 'motion/react';

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border text-sm transition-all ${
        active
          ? 'bg-[#42F5DC] text-black border-[#42F5DC]'
          : 'bg-[#0F3840]/30 text-[#C8A777] border-[#28D5C6]/20 hover:border-[#42F5DC]/50'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  );
}
