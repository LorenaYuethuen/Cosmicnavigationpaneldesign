import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Sparkles, Battery, BatteryMedium, BatteryLow, Sun, Cloud, Moon } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

type EnergyLevel = 'high' | 'medium' | 'low' | 'crash' | 'lowpool' | 'create' | 'reset';

interface EnergyResult {
  level: EnergyLevel;
  icon: any;
  color: string;
  title: string;
  description: string;
  actions: string[];
}

export function EnergyScanButton() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<EnergyResult | null>(null);

  const energyProfiles: Record<EnergyLevel, EnergyResult> = {
    high: {
      level: 'high',
      icon: Sun,
      color: '#42F5DC',
      title: '高能日 ⚡',
      description: '今天精力充沛，适合高强度创造和挑战',
      actions: [
        '力量训练 + 有氧运动',
        '完成重要项目/创作',
        '社交活动或深度学习',
        '处理复杂决策',
        '规划未来蓝图',
      ],
    },
    medium: {
      level: 'medium',
      icon: Cloud,
      color: '#6E79FF',
      title: '中能日 ☁️',
      description: '稳定的一天，适合日常运作和维护',
      actions: [
        '常规运动（游泳/瑜伽）',
        '日常工作任务',
        '整理环境/物品',
        '轻度学习或阅读',
        '温和社交',
      ],
    },
    low: {
      level: 'low',
      icon: Moon,
      color: '#BFA36F',
      title: '低能日 🌙',
      description: '今天需要温柔对待自己，减少消耗',
      actions: [
        '散步或拉伸',
        '简单日常任务',
        '看电影/听音乐',
        '整理灵感笔记',
        '早点休息',
      ],
    },
    crash: {
      level: 'crash',
      icon: BatteryLow,
      color: '#FF6B6B',
      title: '情绪崩溃日 💔',
      description: '情绪需要释放和疗愈，暂停所有计划',
      actions: [
        '允许自己哭泣/发泄',
        '寻求支持（朋友/按摩/spa）',
        '温暖的食物和饮品',
        '看治愈系内容',
        '写情绪日志',
      ],
    },
    lowpool: {
      level: 'lowpool',
      icon: Battery,
      color: '#FFB84D',
      title: '能量低池日 🔋',
      description: '电量不足，需要充电恢复',
      actions: [
        '睡眠补充（午睡必须）',
        '营养补充',
        '放空/冥想',
        '取消非必要活动',
        '舒适环境待着',
      ],
    },
    create: {
      level: 'create',
      icon: Sparkles,
      color: '#B794F6',
      title: '创造日 ✨',
      description: '灵感涌现，宇宙在召唤你创造',
      actions: [
        '跟随灵感流动',
        '艺术创作/写作',
        '探索新想法',
        '记录所有灵感',
        '不限制自己',
      ],
    },
    reset: {
      level: 'reset',
      icon: BatteryMedium,
      color: '#4ECDC4',
      title: 'Reset 日 🔄',
      description: '系统重启日，清理和重新对齐',
      actions: [
        '深度清理空间',
        '整理数字环境',
        '回顾和复盘',
        '设定新意图',
        '仪式感行动',
      ],
    },
  };

  const performScan = () => {
    setScanning(true);
    setResult(null);

    // 模拟扫描过程
    setTimeout(() => {
      // 随机选择一个能量状态（实际使用时可以基于问卷或其他输入）
      const levels: EnergyLevel[] = ['high', 'medium', 'low', 'crash', 'lowpool', 'create', 'reset'];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      setResult(energyProfiles[randomLevel]);
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Scan Button */}
      <motion.button
        onClick={performScan}
        disabled={scanning}
        className="relative w-full group"
        whileHover={{ scale: scanning ? 1 : 1.02 }}
        whileTap={{ scale: scanning ? 1 : 0.98 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#42F5DC] via-[#6E79FF] to-[#BFA36F] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-[#42F5DC] to-[#6E79FF] rounded-2xl p-6 flex items-center justify-center gap-3">
          {scanning ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: 9999, ease: 'linear' }}
              >
                <Zap className="w-6 h-6 text-[#04070F]" />
              </motion.div>
              <span className="text-xl text-[#04070F]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                扫描中...
              </span>
            </>
          ) : (
            <>
              <Zap className="w-6 h-6 text-[#04070F]" />
              <span className="text-xl text-[#04070F]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                启动今日能量扫描
              </span>
            </>
          )}
        </div>
      </motion.button>

      {/* Scanning Animation */}
      <AnimatePresence>
        {scanning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="bg-[#0B1C26]/60 border-[#42F5DC]/30 p-8">
              <div className="space-y-4">
                <motion.div
                  className="h-2 bg-[#04070F] rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#42F5DC] to-[#6E79FF]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  />
                </motion.div>
                <div className="text-center text-[#42F5DC] text-sm space-y-2">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: 9999 }}
                  >
                    正在分析身体信号...
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: 9999, delay: 0.5 }}
                  >
                    检测情绪频率...
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: 9999, delay: 1 }}
                  >
                    连接宇宙信号...
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Display */}
      <AnimatePresence mode="wait">
        {result && !scanning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card 
              className="bg-gradient-to-br from-[#0B1C26]/80 to-[#0F3840]/60 border-2 p-8"
              style={{ borderColor: result.color }}
            >
              <div className="flex items-start gap-6 mb-6">
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${result.color}20` }}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: 9999,
                    ease: 'easeInOut',
                  }}
                >
                  <result.icon className="w-8 h-8" style={{ color: result.color }} />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-2xl mb-2" style={{ color: result.color, fontFamily: 'Space Grotesk, sans-serif' }}>
                    {result.title}
                  </h3>
                  <p className="text-[#C8A777] mb-4">{result.description}</p>
                  <Badge className="bg-[#42F5DC]/20 text-[#42F5DC] border-[#42F5DC]/30">
                    今日推荐行动菜单
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-white mb-3">✨ 今日微动作菜单</h4>
                {result.actions.map((action, index) => (
                  <motion.div
                    key={action}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: result.color }}
                    />
                    <span className="text-[#C8A777] group-hover:text-white transition-colors">
                      {action}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={performScan}
                className="mt-6 w-full py-3 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                重新扫描
              </motion.button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
