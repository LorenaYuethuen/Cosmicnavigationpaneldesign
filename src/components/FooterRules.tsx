import { motion } from 'motion/react';

const rules = [
  '频率高于计划',
  '行动越轻松，显化越迅速',
  '灵感就是导航',
  '身体是宇宙开关',
  '空间重置人生状态',
  '低能量是后台处理',
  'Alignment > Discipline',
];

export function FooterRules() {
  return (
    <div className="relative mt-16 md:mt-24 pb-8 px-4">
      {/* Akashic glyph with enhanced depth */}
      <div className="flex justify-center mb-6">
        <motion.div
          className="relative"
          animate={{
            rotateZ: [0, 360],
          }}
          transition={{ duration: 60, repeat: 9999, ease: "linear" }}
        >
          {/* Outer glow */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle, rgba(66, 245, 220, 0.3), transparent 70%)',
              filter: 'blur(30px)',
              transform: 'scale(1.5)',
            }}
          />
          
          <svg 
            width="50" 
            height="50" 
            viewBox="0 0 50 50" 
            className="relative"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(66, 245, 220, 0.5))',
            }}
          >
            <motion.circle 
              cx="25" cy="25" r="22" 
              fill="none" stroke="#42F5DC" 
              strokeWidth="1" opacity="0.4"
              animate={{ strokeDashoffset: [0, 100] }}
              transition={{ duration: 8, repeat: 9999, ease: "linear" }}
              style={{ strokeDasharray: '10 5' }}
            />
            <motion.circle 
              cx="25" cy="25" r="15" 
              fill="none" stroke="#6E79FF" 
              strokeWidth="1" opacity="0.6"
              animate={{ strokeDashoffset: [0, -100] }}
              transition={{ duration: 6, repeat: 9999, ease: "linear" }}
              style={{ strokeDasharray: '8 4' }}
            />
            <motion.circle 
              cx="25" cy="25" r="8" 
              fill="none" stroke="#28D5C6" 
              strokeWidth="1" opacity="0.8"
              animate={{ 
                r: [8, 9, 8],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: 9999, ease: "easeInOut" }}
            />
            <circle cx="25" cy="7" r="2" fill="#42F5DC" />
            <circle cx="43" cy="25" r="2" fill="#42F5DC" />
            <circle cx="25" cy="43" r="2" fill="#42F5DC" />
            <circle cx="7" cy="25" r="2" fill="#42F5DC" />
            <motion.circle 
              cx="25" cy="25" r="3" 
              fill="#6E79FF" opacity="0.8"
              animate={{
                r: [3, 4, 3],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 1.5, repeat: 9999, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </div>
      
      {/* Label */}
      <div className="text-center mb-8">
        <span className="text-[#C8A777] text-sm uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Universe Operating Rules
        </span>
      </div>
      
      {/* Rules */}
      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-10 max-w-6xl mx-auto">
        {rules.map((rule, i) => (
          <motion.div
            key={rule}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative group"
            whileHover={{
              y: -4,
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <div 
              className="px-4 py-2.5 rounded-lg border border-[#28D5C6]/30 bg-[#0F3840]/30 backdrop-blur-sm group-hover:border-[#42F5DC]/50 group-hover:bg-[#0F3840]/50 transition-all"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              <span className="text-[#42F5DC] text-sm">{rule}</span>
            </div>
            
            {/* Enhanced glow on hover */}
            <div 
              className="absolute inset-0 -z-10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(66, 245, 220, 0.2), transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
            
            {/* Connecting line */}
            {i < rules.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 w-4 h-px bg-gradient-to-r from-[#28D5C6]/50 to-transparent" />
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Signature */}
      <div className="text-center space-y-2">
        <motion.p 
          className="text-[#C8A777] text-sm italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Lorena
        </motion.p>
        <motion.p 
          className="text-[#42F5DC] italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          "World is not linear, neither am I."
        </motion.p>
      </div>
    </div>
  );
}
