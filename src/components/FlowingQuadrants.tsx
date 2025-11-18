import { motion } from 'motion/react';
import { Compass, Radio, Eye, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';

interface FlowingQuadrantsProps {
  onNavigate: (page: string, tab?: string) => void;
}

export function FlowingQuadrants({ onNavigate }: FlowingQuadrantsProps) {
  const quadrants = [
    {
      id: 'space',
      icon: Compass,
      title: 'Space',
      subtitle: '空间频率',
      description: '旅居 = System Refresh',
      color: '#42F5DC',
      tab: 'home',
      stats: { value: '85%', label: '能量场更新率' },
      gradient: 'from-[#42F5DC]/20 via-[#42F5DC]/10 to-transparent',
    },
    {
      id: 'body',
      icon: Radio,
      title: 'Body',
      subtitle: '身体天线',
      description: '运动 = 调频',
      color: '#6E79FF',
      tab: 'body',
      stats: { value: '92%', label: '频率同步度' },
      gradient: 'from-[#6E79FF]/20 via-[#6E79FF]/10 to-transparent',
    },
    {
      id: 'inspiration',
      icon: Eye,
      title: 'Inspiration',
      subtitle: '灵感燃料',
      description: '多元感知 × 心灵滋养',
      color: '#28D5C6',
      tab: 'mind',
      stats: { value: '78%', label: '心智充能度' },
      gradient: 'from-[#28D5C6]/20 via-[#28D5C6]/10 to-transparent',
    },
    {
      id: 'flow',
      icon: Sparkles,
      title: 'Daily Flow',
      subtitle: '显化协议',
      description: '5分钟启动 → 自动运转',
      color: '#BFA36F',
      tab: 'mvp',
      stats: { value: '100%', label: '系统就绪' },
      gradient: 'from-[#BFA36F]/20 via-[#BFA36F]/10 to-transparent',
    },
  ];

  // Memoize ambient particles to prevent Math.random() from running on every render
  const ambientParticles = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => {
      const duration = Math.max(8, 8 + i);
      return {
        id: `quad-particle-${i}`,
        left: 10 + i * 12,
        top: 20 + (i % 3) * 20,
        width: Math.max(30, Math.random() * 60 + 30),
        height: Math.max(30, Math.random() * 60 + 30),
        color: quadrants[i % 4].color,
        duration,
        sinValue: Math.sin(i) * 20,
      };
    })
  , []);

  return (
    <section className="relative py-24 md:py-32 perspective-container">
      {/* Floating ambient particles */}
      {ambientParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            background: `radial-gradient(circle, ${particle.color}15, transparent)`,
            filter: 'blur(25px)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.sinValue, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: 9999,
            ease: "easeInOut",
          }}
        />
      ))}
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with System Status */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-3">
                Universe Operating System
              </p>
              <h2 
                className="text-3xl md:text-4xl text-white/90 font-light"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                四维流动入口
              </h2>
            </div>
            
            {/* System Health Indicator */}
            <div className="hidden md:flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-[#42F5DC]" />
                  <motion.div 
                    className="absolute inset-0 w-2 h-2 rounded-full bg-[#42F5DC]"
                    animate={{ 
                      scale: [1, 2],
                      opacity: [1, 0]
                    }}
                    transition={{
                      duration: 1,
                      repeat: 9999,
                      ease: "easeOut"
                    }}
                  />
                </div>
                <span className="text-xs text-white/60">System Active</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#42F5DC]" />
                <span className="text-xs text-white/60">88.8%</span>
              </div>
            </div>
          </div>

          {/* Flow Equation */}
          <motion.div 
            className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-r from-white/[0.03] to-white/[0.01] backdrop-blur-sm p-6"
            style={{
              boxShadow: '0 2px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}
            animate={{
              borderColor: [
                'rgba(255, 255, 255, 0.05)',
                'rgba(66, 245, 220, 0.1)',
                'rgba(255, 255, 255, 0.05)',
              ],
            }}
            transition={{
              duration: 4,
              repeat: 9999,
              ease: "easeInOut",
            }}
          >
            {/* Background glow pulse */}
            <motion.div
              className="absolute inset-0 opacity-50"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(66, 245, 220, 0.05), transparent 70%)',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: 9999,
                ease: "easeInOut",
              }}
            />
            
            <div className="relative flex items-center justify-center gap-3 text-sm md:text-base">
              <motion.span 
                className="text-[#42F5DC]"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: 9999, ease: "easeInOut" }}
              >
                精力
              </motion.span>
              <span className="text-white/30">×</span>
              <motion.span 
                className="text-[#6E79FF]"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: 9999, ease: "easeInOut" }}
              >
                时间
              </motion.span>
              <span className="text-white/30">×</span>
              <motion.span 
                className="text-[#28D5C6]"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: 9999, ease: "easeInOut" }}
              >
                金钱
              </motion.span>
              <span className="text-white/30">=</span>
              <motion.span 
                className="text-[#BFA36F]"
                animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: 9999, ease: "easeInOut" }}
              >
                体验
              </motion.span>
              <motion.span 
                className="text-white/30"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: 9999, ease: "easeInOut" }}
              >
                →
              </motion.span>
              <motion.span 
                className="text-[#42F5DC]/60"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: 9999, ease: "easeInOut" }}
              >
                循环
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* Quadrants Grid - Modern Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quadrants.map((quad, index) => (
            <motion.button
              key={quad.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              onClick={() => onNavigate('system', quad.tab)}
              className="group relative text-left overflow-hidden transform-3d"
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ 
                y: -12,
                rotateX: 3,
                rotateY: 2,
                scale: 1.02,
                transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
              }}
            >
              {/* Background gradient on hover */}
              <div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${quad.gradient}`}
                style={{ transform: 'translateZ(-10px)' }}
              />

              {/* Card with enhanced depth */}
              <div 
                className="relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/[0.04]"
                style={{
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3), 0 8px 48px rgba(0, 0, 0, 0.2)',
                  transform: 'translateZ(0)',
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div 
                    className="p-3.5 rounded-2xl transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${quad.color}15, ${quad.color}08)`,
                    }}
                  >
                    <quad.icon className="w-7 h-7" style={{ color: quad.color }} />
                  </div>
                  
                  {/* Arrow indicator */}
                  <div className="opacity-40 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <h3 
                      className="text-2xl text-white mb-1"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {quad.title}
                    </h3>
                    <p className="text-sm" style={{ color: quad.color }}>
                      {quad.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed">
                    {quad.description}
                  </p>

                  {/* Stats Bar */}
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white/40">{quad.stats.label}</span>
                      <span className="text-sm font-mono" style={{ color: quad.color }}>
                        {quad.stats.value}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: '0%' }}
                        whileInView={{ width: quad.stats.value }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${quad.color}, ${quad.color}80)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced glow effect with depth */}
              <div 
                className="absolute inset-0 -z-10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${quad.color}20, ${quad.color}10 50%, transparent 70%)`,
                  filter: 'blur(40px)',
                  transform: 'translateZ(-20px) scale(1.1)',
                }}
              />
              
              {/* Secondary glow layer */}
              <div 
                className="absolute inset-0 -z-20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${quad.color}15, transparent 80%)`,
                  filter: 'blur(60px)',
                  transform: 'translateZ(-30px) scale(1.2)',
                }}
              />
            </motion.button>
          ))}
        </div>

        {/* System Flow Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full bg-[#42F5DC]"
                  style={{ opacity: 0.6 }}
                />
              ))}
            </div>
            <span className="text-xs text-white/40 tracking-wider">系统持续运转中</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
