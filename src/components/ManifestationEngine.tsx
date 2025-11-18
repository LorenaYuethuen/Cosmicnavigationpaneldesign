import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Target, Compass, Zap, CheckCircle2, Circle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface Intention {
  id: string;
  text: string;
  area: 'body' | 'space' | 'inspiration' | 'flow';
  status: 'active' | 'completed' | 'pending';
  createdAt: Date;
}

const areaConfig = {
  body: { color: '#42F5DC', label: '身体频率', icon: Zap },
  space: { color: '#6E79FF', label: '空间体验', icon: Compass },
  inspiration: { color: '#BFA36F', label: '灵感源泉', icon: Sparkles },
  flow: { color: '#28D5C6', label: '日常流动', icon: Target },
};

export function ManifestationEngine() {
  const [intentions, setIntentions] = useState<Intention[]>([
    {
      id: '1',
      text: '每周完成3次力量训练',
      area: 'body',
      status: 'active',
      createdAt: new Date(),
    },
    {
      id: '2',
      text: '探索一个新的城市空间',
      area: 'space',
      status: 'active',
      createdAt: new Date(),
    },
  ]);

  const [newIntention, setNewIntention] = useState('');
  const [selectedArea, setSelectedArea] = useState<keyof typeof areaConfig>('body');

  const addIntention = () => {
    if (!newIntention.trim()) return;

    const intention: Intention = {
      id: Date.now().toString(),
      text: newIntention,
      area: selectedArea,
      status: 'active',
      createdAt: new Date(),
    };

    setIntentions([intention, ...intentions]);
    setNewIntention('');
  };

  const toggleStatus = (id: string) => {
    setIntentions(
      intentions.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'completed' ? 'active' : 'completed',
            }
          : item
      )
    );
  };

  const activeCount = intentions.filter((i) => i.status === 'active').length;
  const completedCount = intentions.filter((i) => i.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          className="inline-flex items-center gap-2 mb-4"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: 9999,
            ease: 'easeInOut',
          }}
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#42F5DC] to-[#6E79FF] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-[#04070F]" />
          </div>
        </motion.div>
        <h2 className="text-3xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <span className="bg-gradient-to-r from-[#42F5DC] via-[#6E79FF] to-[#BFA36F] bg-clip-text text-transparent">
            显化引擎
          </span>
        </h2>
        <p className="text-[#C8A777]">设定意图，让宇宙为你工作</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-[#0B1C26]/60 border-[#42F5DC]/30 p-4 text-center">
          <div className="text-3xl text-[#42F5DC] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {activeCount}
          </div>
          <div className="text-sm text-[#C8A777]">活跃意图</div>
        </Card>
        <Card className="bg-[#0B1C26]/60 border-[#28D5C6]/30 p-4 text-center">
          <div className="text-3xl text-[#28D5C6] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {completedCount}
          </div>
          <div className="text-sm text-[#C8A777]">已显化</div>
        </Card>
      </div>

      {/* Add New Intention */}
      <Card className="bg-gradient-to-br from-[#0B1C26]/80 to-[#0F3840]/60 border-[#42F5DC]/30 p-6">
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#42F5DC]" />
          设定新意图
        </h3>

        {/* Area Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {(Object.keys(areaConfig) as Array<keyof typeof areaConfig>).map((area) => {
            const config = areaConfig[area];
            const Icon = config.icon;
            return (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedArea === area
                    ? 'border-current bg-white/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
                style={{
                  color: selectedArea === area ? config.color : '#C8A777',
                }}
              >
                <Icon className="w-4 h-4 mx-auto mb-1" />
                <div className="text-xs">{config.label}</div>
              </button>
            );
          })}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newIntention}
            onChange={(e) => setNewIntention(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addIntention()}
            placeholder="输入你的意图..."
            className="flex-1 bg-[#04070F]/60 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#42F5DC]/50"
          />
          <motion.button
            onClick={addIntention}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#42F5DC] to-[#6E79FF] text-[#04070F]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.button>
        </div>
      </Card>

      {/* Intentions List */}
      <div className="space-y-3">
        {intentions.length === 0 ? (
          <Card className="bg-[#0B1C26]/40 border-[#28D5C6]/20 p-8 text-center">
            <Sparkles className="w-12 h-12 text-[#42F5DC]/30 mx-auto mb-3" />
            <p className="text-[#C8A777]">还没有设定意图，开始你的显化之旅吧</p>
          </Card>
        ) : (
          intentions.map((intention, index) => {
            const config = areaConfig[intention.area];
            const Icon = config.icon;
            return (
              <motion.div
                key={intention.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`p-4 border-2 transition-all cursor-pointer group ${
                    intention.status === 'completed'
                      ? 'bg-[#0B1C26]/40 border-[#28D5C6]/20 opacity-60'
                      : 'bg-[#0B1C26]/60 border-current hover:bg-[#0B1C26]/80'
                  }`}
                  style={{
                    borderColor: intention.status === 'completed' ? '#28D5C6' : config.color,
                  }}
                  onClick={() => toggleStatus(intention.id)}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${config.color}20` }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {intention.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5" style={{ color: '#28D5C6' }} />
                      ) : (
                        <Icon className="w-5 h-5" style={{ color: config.color }} />
                      )}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p
                          className={`text-white ${
                            intention.status === 'completed' ? 'line-through opacity-60' : ''
                          }`}
                        >
                          {intention.text}
                        </p>
                        <Badge
                          className="flex-shrink-0"
                          style={{
                            backgroundColor: `${config.color}20`,
                            color: config.color,
                            borderColor: `${config.color}40`,
                          }}
                        >
                          {config.label}
                        </Badge>
                      </div>
                      <div className="text-xs text-[#C8A777]">
                        {intention.status === 'completed' ? '✓ 已显化' : '⚡ 显化中'}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Manifestation Tip */}
      <Card className="bg-gradient-to-r from-[#42F5DC]/10 to-[#6E79FF]/10 border-[#42F5DC]/30 p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#42F5DC] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-[#C8A777]">
            <span className="text-[#42F5DC]">显化原则：</span>
            设定清晰意图 → 轻松行动 → 信任宇宙 → 允许接收
          </div>
        </div>
      </Card>
    </div>
  );
}
