import { motion } from 'motion/react';
import { Dumbbell, Waves, Zap, Wind, Anchor, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface FrequencyType {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  effect: string;
  activities: string[];
}

export function BodyFrequency() {
  const frequencies: FrequencyType[] = [
    {
      id: 'grounding',
      name: 'Grounding',
      icon: Anchor,
      color: '#BFA36F',
      description: '扎根频率',
      effect: '身体稳定 · 情绪平静 · 回归中心',
      activities: ['力量训练', '深蹲', '硬拉', '瑜伽（站立体式）', '太极'],
    },
    {
      id: 'flow',
      name: 'Flow',
      icon: Waves,
      color: '#28D5C6',
      description: '流动频率',
      effect: '能量循环 · 释放堵塞 · 身心合一',
      activities: ['游泳', '流瑜伽', '舞蹈', '太极', '气功'],
    },
    {
      id: 'lightness',
      name: 'Lightness',
      icon: Wind,
      color: '#42F5DC',
      description: '轻盈频率',
      effect: '身体轻盈 · 心情愉悦 · 灵感涌现',
      activities: ['慢跑', '快走', '游泳', '拉伸', '普拉提'],
    },
    {
      id: 'clearing',
      name: 'Clearing',
      icon: Sparkles,
      color: '#6E79FF',
      description: '清理频率',
      effect: '排毒净化 · 能量更新 · 系统重启',
      activities: ['HIIT', '有氧运动', '热瑜伽', '跑步', '单车'],
    },
    {
      id: 'sync',
      name: 'Sync',
      icon: Zap,
      color: '#B794F6',
      description: '同步频率',
      effect: '身心对齐 · 直觉增强 · 宇宙连接',
      activities: ['攀岩', '冥想运动', '瑜伽', '自然行走', '呼吸练习'],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          className="inline-flex items-center gap-2 mb-4"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: 9999,
            ease: 'easeInOut',
          }}
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#42F5DC] to-[#6E79FF] flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-[#04070F]" />
          </div>
        </motion.div>
        <h2 className="text-3xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <span className="bg-gradient-to-r from-[#42F5DC] via-[#6E79FF] to-[#BFA36F] bg-clip-text text-transparent">
            五频率运动系统
          </span>
        </h2>
        <p className="text-[#C8A777]">身体是宇宙天线，运动即调频</p>
      </div>

      {/* Frequency Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {frequencies.map((freq, index) => {
          const Icon = freq.icon;
          return (
            <motion.div
              key={freq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="bg-[#0B1C26]/60 border-2 p-6 hover:bg-[#0B1C26]/80 transition-all group h-full"
                style={{ borderColor: `${freq.color}40` }}
              >
                {/* Icon & Name */}
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${freq.color}20` }}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <Icon className="w-7 h-7" style={{ color: freq.color }} />
                  </motion.div>
                  <div>
                    <div
                      className="text-xl mb-1"
                      style={{ color: freq.color, fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {freq.name}
                    </div>
                    <div className="text-sm text-[#C8A777]">{freq.description}</div>
                  </div>
                </div>

                {/* Effect */}
                <div className="mb-4 pb-4 border-b border-white/10">
                  <Badge
                    className="mb-2"
                    style={{
                      backgroundColor: `${freq.color}20`,
                      color: freq.color,
                      borderColor: `${freq.color}40`,
                    }}
                  >
                    效果
                  </Badge>
                  <p className="text-sm text-[#C8A777]">{freq.effect}</p>
                </div>

                {/* Activities */}
                <div>
                  <div className="text-white text-sm mb-2">推荐运动</div>
                  <div className="space-y-2">
                    {freq.activities.map((activity, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#C8A777]">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: freq.color }}
                        />
                        {activity}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Glow */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                  style={{ backgroundColor: freq.color }}
                />
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Usage Guide */}
      <Card className="bg-gradient-to-br from-[#0F3840]/60 to-[#0B1C26]/60 border-[#42F5DC]/30 p-6">
        <h3 className="text-xl text-[#42F5DC] mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          使用指南
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#C8A777]">
          <div>
            <div className="text-white mb-2">根据需求选择频率</div>
            <div className="space-y-1">
              <div>• 焦虑不安 → Grounding</div>
              <div>• 能量堵塞 → Flow</div>
              <div>• 沉重疲惫 → Lightness</div>
              <div>• 需要清理 → Clearing</div>
              <div>• 失去连接 → Sync</div>
            </div>
          </div>
          <div>
            <div className="text-white mb-2">频率叠加</div>
            <div className="space-y-1">
              <div>• 可以组合多个频率</div>
              <div>• 一次训练包含多种效果</div>
              <div>• 跟随身体直觉选择</div>
              <div>• 不必追求完美执行</div>
              <div>• 享受过程即是调频</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Weekly Schedule Example */}
      <Card className="bg-[#0B1C26]/60 border-[#28D5C6]/30 p-6">
        <h3 className="text-xl text-white mb-4">示例：一周频率安排</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-3">
          {[
            { day: '周一', freq: 'Grounding', activity: '力量训练', color: '#BFA36F' },
            { day: '周二', freq: 'Flow', activity: '游泳', color: '#28D5C6' },
            { day: '周三', freq: 'Lightness', activity: '慢跑', color: '#42F5DC' },
            { day: '周四', freq: 'Clearing', activity: 'HIIT', color: '#6E79FF' },
            { day: '周五', freq: 'Sync', activity: '瑜伽', color: '#B794F6' },
            { day: '周六', freq: 'Flow', activity: '攀岩', color: '#28D5C6' },
            { day: '周日', freq: 'Lightness', activity: '拉伸', color: '#42F5DC' },
          ].map((item) => (
            <div
              key={item.day}
              className="p-3 rounded-lg border-2 transition-all hover:scale-105"
              style={{ borderColor: `${item.color}40`, backgroundColor: `${item.color}10` }}
            >
              <div className="text-white text-sm mb-1">{item.day}</div>
              <div className="text-xs" style={{ color: item.color }}>
                {item.freq}
              </div>
              <div className="text-xs text-[#C8A777] mt-1">{item.activity}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Theory */}
      <Card className="bg-gradient-to-r from-[#42F5DC]/10 to-[#6E79FF]/10 border-[#42F5DC]/30 p-6">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-[#42F5DC] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-[#C8A777]">
            <span className="text-[#42F5DC]">天线理论：</span>
            身体是接收宇宙信号的天线。通过不同频率的运动，我们调整身体频率，从而改变接收到的信号类型。
            每种运动都在重新校准你的能量场，让你与不同层次的宇宙智慧对齐。
          </div>
        </div>
      </Card>
    </div>
  );
}
