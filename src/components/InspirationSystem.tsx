import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Plus, Music, Camera, Film, Palette, User, BookOpen, X } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface Inspiration {
  id: string;
  type: 'music' | 'photo' | 'film' | 'art' | 'person' | 'philosophy';
  title: string;
  description: string;
  tags: string[];
  color: string;
  createdAt: Date;
}

const typeConfig = {
  music: { icon: Music, label: '音乐', color: '#42F5DC' },
  photo: { icon: Camera, label: '摄影', color: '#6E79FF' },
  film: { icon: Film, label: '电影', color: '#BFA36F' },
  art: { icon: Palette, label: '艺术', color: '#28D5C6' },
  person: { icon: User, label: '人物', color: '#B794F6' },
  philosophy: { icon: BookOpen, label: '哲学', color: '#FFB84D' },
};

export function InspirationSystem() {
  const [inspirations, setInspirations] = useState<Inspiration[]>([
    {
      id: '1',
      type: 'music',
      title: 'Max Richter - On the Nature of Daylight',
      description: '空灵、深沉、触动灵魂的弦乐',
      tags: ['古典', '氛围', '冥想'],
      color: '#42F5DC',
      createdAt: new Date(),
    },
    {
      id: '2',
      type: 'film',
      title: 'Lost in Translation',
      description: '孤独、连接、异国他乡的情感共鸣',
      tags: ['东京', '存在主义', '美学'],
      color: '#BFA36F',
      createdAt: new Date(),
    },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newInspiration, setNewInspiration] = useState({
    type: 'music' as keyof typeof typeConfig,
    title: '',
    description: '',
    tags: '',
  });

  const [filterType, setFilterType] = useState<keyof typeof typeConfig | 'all'>('all');

  const addInspiration = () => {
    if (!newInspiration.title.trim()) return;

    const inspiration: Inspiration = {
      id: Date.now().toString(),
      type: newInspiration.type,
      title: newInspiration.title,
      description: newInspiration.description,
      tags: newInspiration.tags.split(',').map((t) => t.trim()).filter((t) => t),
      color: typeConfig[newInspiration.type].color,
      createdAt: new Date(),
    };

    setInspirations([inspiration, ...inspirations]);
    setNewInspiration({
      type: 'music',
      title: '',
      description: '',
      tags: '',
    });
    setShowAdd(false);
  };

  const filteredInspirations =
    filterType === 'all'
      ? inspirations
      : inspirations.filter((i) => i.type === filterType);

  const typeCounts = Object.keys(typeConfig).reduce((acc, type) => {
    acc[type] = inspirations.filter((i) => i.type === type).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <span className="bg-gradient-to-r from-[#42F5DC] via-[#6E79FF] to-[#BFA36F] bg-clip-text text-transparent">
              灵感源栈
            </span>
          </h2>
          <p className="text-[#C8A777]">收集触动你的一切</p>
        </div>
        <motion.button
          onClick={() => setShowAdd(!showAdd)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
            showAdd
              ? 'bg-white/10 text-white/60'
              : 'bg-gradient-to-r from-[#42F5DC] to-[#6E79FF] text-[#04070F]'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showAdd ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          <span className="hidden sm:inline">{showAdd ? '取消' : '添加灵感'}</span>
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {(Object.keys(typeConfig) as Array<keyof typeof typeConfig>).map((type) => {
          const config = typeConfig[type];
          const Icon = config.icon;
          return (
            <Card
              key={type}
              className="bg-[#0B1C26]/60 border-2 p-3 text-center cursor-pointer transition-all hover:scale-105"
              style={{
                borderColor: `${config.color}40`,
                backgroundColor: filterType === type ? `${config.color}20` : undefined,
              }}
              onClick={() => setFilterType(filterType === type ? 'all' : type)}
            >
              <Icon className="w-5 h-5 mx-auto mb-1" style={{ color: config.color }} />
              <div className="text-xs text-[#C8A777]">{config.label}</div>
              <div className="text-lg" style={{ color: config.color, fontFamily: 'Space Grotesk, sans-serif' }}>
                {typeCounts[type] || 0}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="bg-gradient-to-br from-[#0B1C26]/80 to-[#0F3840]/60 border-[#42F5DC]/30 p-6">
              <div className="space-y-4">
                {/* Type Selection */}
                <div>
                  <label className="block text-white mb-2 text-sm">类型</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {(Object.keys(typeConfig) as Array<keyof typeof typeConfig>).map((type) => {
                      const config = typeConfig[type];
                      const Icon = config.icon;
                      return (
                        <button
                          key={type}
                          onClick={() => setNewInspiration({ ...newInspiration, type })}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            newInspiration.type === type
                              ? 'border-current bg-white/10'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                          style={{
                            color: newInspiration.type === type ? config.color : '#C8A777',
                          }}
                        >
                          <Icon className="w-5 h-5 mx-auto mb-1" />
                          <div className="text-xs">{config.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-white mb-2 text-sm">标题</label>
                  <input
                    type="text"
                    value={newInspiration.title}
                    onChange={(e) => setNewInspiration({ ...newInspiration, title: e.target.value })}
                    placeholder="灵感的名称..."
                    className="w-full bg-[#04070F]/60 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#42F5DC]/50"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-white mb-2 text-sm">描述</label>
                  <textarea
                    value={newInspiration.description}
                    onChange={(e) => setNewInspiration({ ...newInspiration, description: e.target.value })}
                    placeholder="为什么触动你？给你什么感觉？"
                    className="w-full bg-[#04070F]/60 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#42F5DC]/50 resize-none"
                    rows={3}
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-white mb-2 text-sm">标签（用逗号分隔）</label>
                  <input
                    type="text"
                    value={newInspiration.tags}
                    onChange={(e) => setNewInspiration({ ...newInspiration, tags: e.target.value })}
                    placeholder="氛围, 治愈, 美学"
                    className="w-full bg-[#04070F]/60 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#42F5DC]/50"
                  />
                </div>

                {/* Button */}
                <motion.button
                  onClick={addInspiration}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-[#42F5DC] to-[#6E79FF] text-[#04070F]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  保存灵感
                </motion.button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Indicator */}
      {filterType !== 'all' && (
        <div className="flex items-center gap-2">
          <span className="text-[#C8A777] text-sm">筛选：</span>
          <Badge
            className="cursor-pointer"
            style={{
              backgroundColor: `${typeConfig[filterType].color}20`,
              color: typeConfig[filterType].color,
              borderColor: `${typeConfig[filterType].color}40`,
            }}
            onClick={() => setFilterType('all')}
          >
            {typeConfig[filterType].label}
            <X className="w-3 h-3 ml-1 inline" />
          </Badge>
        </div>
      )}

      {/* Inspirations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInspirations.length === 0 ? (
          <Card className="bg-[#0B1C26]/40 border-[#28D5C6]/20 p-8 text-center col-span-full">
            <Sparkles className="w-12 h-12 text-[#42F5DC]/30 mx-auto mb-3" />
            <p className="text-[#C8A777]">还没有收集灵感，开始记录触动你的一切</p>
          </Card>
        ) : (
          filteredInspirations.map((inspiration, index) => {
            const config = typeConfig[inspiration.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={inspiration.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className="bg-[#0B1C26]/60 border-2 p-5 hover:bg-[#0B1C26]/80 transition-all group h-full"
                  style={{ borderColor: `${inspiration.color}40` }}
                >
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <motion.div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${inspiration.color}20` }}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <Icon className="w-5 h-5" style={{ color: inspiration.color }} />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white mb-1 line-clamp-2">{inspiration.title}</h4>
                      <Badge
                        style={{
                          backgroundColor: `${inspiration.color}20`,
                          color: inspiration.color,
                          borderColor: `${inspiration.color}40`,
                        }}
                      >
                        {config.label}
                      </Badge>
                    </div>
                  </div>

                  {/* Description */}
                  {inspiration.description && (
                    <p className="text-sm text-[#C8A777] mb-3 line-clamp-3">
                      {inspiration.description}
                    </p>
                  )}

                  {/* Tags */}
                  {inspiration.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {inspiration.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded bg-white/5 text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Hover Glow */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                    style={{ backgroundColor: inspiration.color }}
                  />
                </Card>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Tip */}
      <Card className="bg-gradient-to-r from-[#42F5DC]/10 to-[#6E79FF]/10 border-[#42F5DC]/30 p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#42F5DC] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-[#C8A777]">
            <span className="text-[#42F5DC]">灵感法则：</span>
            记录所有触动你的瞬间。灵感不是凭空出现的，而是你持续感知的积累。定期回顾，让灵感相互碰撞，产生新的创意。
          </div>
        </div>
      </Card>
    </div>
  );
}
