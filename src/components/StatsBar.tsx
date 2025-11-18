import { motion } from 'motion/react';
import { Target, Zap, Heart, Sparkles } from 'lucide-react';

export function StatsBar() {
  const stats = [
    { icon: Target, label: '核心公式', value: '精力 × 时间 × 金钱', color: '#42F5DC' },
    { icon: Zap, label: '系统模块', value: '6大核心系统', color: '#6E79FF' },
    { icon: Heart, label: '生活层级', value: '身体·心智·知识', color: '#28D5C6' },
    { icon: Sparkles, label: '显化协议', value: 'MVP 灵活整合', color: '#BFA36F' },
  ];

  return (
    <section className="relative z-10 -mt-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-3xl p-8 md:p-10"
          style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <div 
                  className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                  }}
                >
                  <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                </div>
                <div className="text-sm text-white/50 mb-2 font-light">{stat.label}</div>
                <div className="text-lg text-white font-semibold">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
