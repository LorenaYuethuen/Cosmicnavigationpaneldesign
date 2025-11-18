import { motion } from 'motion/react';
import { Activity, Zap, Clock, DollarSign } from 'lucide-react';

export function SystemStatus() {
  const metrics = [
    {
      icon: Zap,
      label: '精力',
      value: '88',
      unit: '%',
      color: '#42F5DC',
      trend: '+5%',
    },
    {
      icon: Clock,
      label: '时间效能',
      value: '76',
      unit: '%',
      color: '#6E79FF',
      trend: '+12%',
    },
    {
      icon: DollarSign,
      label: '资源优化',
      value: '82',
      unit: '%',
      color: '#28D5C6',
      trend: '+8%',
    },
    {
      icon: Activity,
      label: '系统健康',
      value: '91',
      unit: '%',
      color: '#BFA36F',
      trend: '+3%',
    },
  ];

  return (
    <section className="relative py-12 perspective-container">
      <div className="max-w-7xl mx-auto px-6 transform-3d">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative group transform-3d"
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ 
                y: -8,
                rotateX: 2,
                scale: 1.03,
                transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
              }}
            >
              {/* Card with depth */}
              <div 
                className="relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-5 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.04]"
                style={{
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3), 0 4px 24px rgba(0, 0, 0, 0.2)',
                  transform: 'translateZ(0)',
                }}
              >
                {/* Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="p-2 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${metric.color}15, ${metric.color}08)`,
                    }}
                  >
                    <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
                  </div>
                  
                  {/* Trend */}
                  <span className="text-xs text-white/40">{metric.trend}</span>
                </div>

                {/* Value */}
                <div className="mb-2">
                  <span 
                    className="text-3xl font-light tabular-nums"
                    style={{ color: metric.color }}
                  >
                    {metric.value}
                  </span>
                  <span className="text-lg text-white/40 ml-0.5">{metric.unit}</span>
                </div>

                {/* Label */}
                <p className="text-xs text-white/50">{metric.label}</p>

                {/* Progress bar */}
                <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${metric.color}, ${metric.color}80)`,
                    }}
                  />
                </div>
              </div>

              {/* Enhanced glow on hover with depth */}
              <div 
                className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${metric.color}20, ${metric.color}10 50%, transparent 70%)`,
                  filter: 'blur(30px)',
                  transform: 'translateZ(-15px) scale(1.1)',
                }}
              />
              
              {/* Outer glow layer */}
              <div 
                className="absolute inset-0 -z-20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${metric.color}12, transparent 75%)`,
                  filter: 'blur(50px)',
                  transform: 'translateZ(-25px) scale(1.2)',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
