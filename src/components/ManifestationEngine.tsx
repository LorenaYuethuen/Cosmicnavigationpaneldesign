import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Target, Compass, Zap, CheckCircle2, Circle, FileText, Rocket } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useLifeSystem } from '../contexts/LifeSystemContext';

const areaConfig = {
  body: { color: '#42F5DC', label: '身体频率', icon: Zap },
  space: { color: '#6E79FF', label: '空间体验', icon: Compass },
  inspiration: { color: '#BFA36F', label: '灵感源泉', icon: Sparkles },
  flow: { color: '#28D5C6', label: '日常流动', icon: Target },
};

export function ManifestationEngine() {
  const { intentions, addIntention, toggleIntention, currentEnergy, convertIntentionsToLog, addLog } = useLifeSystem();
  const [newIntention, setNewIntention] = useState('');
  const [selectedArea, setSelectedArea] = useState<keyof typeof areaConfig>('body');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddIntention = () => {
    if (!newIntention.trim()) return;

    addIntention({
      text: newIntention,
      area: selectedArea,
      status: 'active',
    });
    setNewIntention('');
  };

  const handleQuickLog = () => {
    const logData = convertIntentionsToLog();
    if (logData) {
      addLog(logData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const activeCount = intentions.filter((i) => i.status === 'active').length;
  const completedCount = intentions.filter((i) => i.status === 'completed').length;
  const pendingCount = intentions.filter((i) => i.status === 'pending').length;

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
        {currentEnergy && (
          <Badge className="mt-2 bg-[#42F5DC]/20 text-[#42F5DC] border-[#42F5DC]/30">
            当前能量：{currentEnergy}
          </Badge>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-[#0B1C26]/60 border-[#42F5DC]/30 p-4 text-center">
          <div className="text-3xl text-[#42F5DC] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {activeCount}
          </div>
          <div className="text-sm text-[#C8A777]">活跃意图</div>
        </Card>
        <Card className="bg-[#0B1C26]/60 border-[#6E79FF]/30 p-4 text-center">
          <div className="text-3xl text-[#6E79FF] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {pendingCount}
          </div>
          <div className="text-sm text-[#C8A777]">待启动</div>
        </Card>
        <Card className="bg-[#0B1C26]/60 border-[#28D5C6]/30 p-4 text-center">
          <div className="text-3xl text-[#28D5C6] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {completedCount}
          </div>
          <div className="text-sm text-[#C8A777]">已显化</div>
        </Card>
      </div>

      {/* Quick Log Button */}
      {activeCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-r from-[#6E79FF]/10 to-[#42F5DC]/10 border-[#6E79FF]/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-[#6E79FF] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white mb-1">✨ 自动化联动</div>
                  <div className="text-sm text-[#C8A777]">
                    将 {activeCount} 个活跃意图一键转换为今日阿卡西日志
                  </div>
                </div>
              </div>
              <motion.button
                onClick={handleQuickLog}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#6E79FF] to-[#42F5DC] text-white flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className="w-4 h-4" />
                一键生成
              </motion.button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Card className="bg-gradient-to-r from-[#42F5DC]/20 to-[#28D5C6]/20 border-[#42F5DC]/50 p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#42F5DC]" />
              <div className="text-[#42F5DC]">
                ✅ 日志已自动生成！前往"阿卡西日志"标签查看和编辑
              </div>
            </div>
          </Card>
        </motion.div>
      )}

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
            onKeyDown={(e) => e.key === 'Enter' && handleAddIntention()}
            placeholder="输入你的意图..."
            className="flex-1 bg-[#04070F]/60 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#42F5DC]/50"
          />
          <motion.button
            onClick={handleAddIntention}
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
                  onClick={() => toggleIntention(intention.id)}
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