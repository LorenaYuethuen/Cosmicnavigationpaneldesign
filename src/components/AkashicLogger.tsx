import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Plus, Sparkles, Calendar, Tag, TrendingUp, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useLifeSystem, EnergyLevel } from '../contexts/LifeSystemContext';

export function AkashicLogger() {
  const { logs, addLog, currentEnergy, stats, intentions } = useLifeSystem();
  const [showNewLog, setShowNewLog] = useState(false);
  const [newLog, setNewLog] = useState({
    energy: 'medium' as EnergyLevel,
    actions: '',
    synchronicity: '',
    bodyFeedback: '',
    inspiration: '',
    nextCall: '',
  });

  const energyColors = {
    high: '#42F5DC',
    medium: '#6E79FF',
    low: '#BFA36F',
    crash: '#FF6B6B',
    lowpool: '#FFB84D',
    create: '#B794F6',
    reset: '#4ECDC4',
  };

  const energyLabels = {
    high: '高能',
    medium: '中能',
    low: '低能',
    crash: '崩溃',
    lowpool: '低池',
    create: '创造',
    reset: '重启',
  };

  const createLog = () => {
    const entry = {
      date: new Date(),
      energy: newLog.energy,
      actions: newLog.actions.split('\n').filter((a) => a.trim()),
      synchronicity: newLog.synchronicity,
      bodyFeedback: newLog.bodyFeedback,
      inspiration: newLog.inspiration,
      nextCall: newLog.nextCall,
    };

    addLog(entry);
    setNewLog({
      energy: currentEnergy || 'medium',
      actions: '',
      synchronicity: '',
      bodyFeedback: '',
      inspiration: '',
      nextCall: '',
    });
    setShowNewLog(false);
  };

  const quickLog = () => {
    setShowNewLog(true);
    // 自动填充当前能量
    if (currentEnergy) {
      setNewLog(prev => ({ ...prev, energy: currentEnergy }));
    }
    
    // 自动建议今日动作（基于活跃意图）
    const activeIntentions = intentions.filter(i => i.status === 'active');
    if (activeIntentions.length > 0 && !newLog.actions) {
      const suggestedActions = activeIntentions.slice(0, 3).map(i => i.text).join('\n');
      setNewLog(prev => ({ ...prev, actions: suggestedActions }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <span className="bg-gradient-to-r from-[#42F5DC] via-[#6E79FF] to-[#BFA36F] bg-clip-text text-transparent">
              阿卡西日志
            </span>
          </h2>
          <p className="text-[#C8A777]">记录宇宙信号与生命节奏</p>
          {currentEnergy && (
            <Badge className="mt-2" style={{
              backgroundColor: `${energyColors[currentEnergy]}20`,
              color: energyColors[currentEnergy],
              borderColor: `${energyColors[currentEnergy]}40`,
            }}>
              <Zap className="w-3 h-3 mr-1" />
              当前能量：{energyLabels[currentEnergy]}
            </Badge>
          )}
        </div>
        <motion.button
          onClick={quickLog}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#42F5DC] to-[#6E79FF] text-[#04070F]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">新建日志</span>
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#0B1C26]/60 border-[#42F5DC]/30 p-4 text-center">
          <div
            className="text-2xl mb-1"
            style={{ color: '#42F5DC', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {stats.currentStreak}
          </div>
          <div className="text-xs text-[#C8A777]">连续天数</div>
          {stats.currentStreak >= 7 && (
            <div className="text-xs text-[#FFB84D] mt-1">🔥</div>
          )}
        </Card>
        <Card className="bg-[#0B1C26]/60 border-[#6E79FF]/30 p-4 text-center">
          <div
            className="text-2xl mb-1"
            style={{ color: '#6E79FF', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {stats.totalLogs}
          </div>
          <div className="text-xs text-[#C8A777]">总日志数</div>
        </Card>
        {(['high', 'low'] as const).map((level) => {
          const count = logs.filter((log) => log.energy === level).length;
          return (
            <Card
              key={level}
              className="bg-[#0B1C26]/60 border-2 p-4 text-center"
              style={{ borderColor: `${energyColors[level]}40` }}
            >
              <div
                className="text-2xl mb-1"
                style={{ color: energyColors[level], fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {count}
              </div>
              <div className="text-xs text-[#C8A777]">{energyLabels[level]}天数</div>
            </Card>
          );
        })}
      </div>

      {/* New Log Form */}
      <AnimatePresence>
        {showNewLog && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="bg-gradient-to-br from-[#0B1C26]/80 to-[#0F3840]/60 border-[#42F5DC]/30 p-6">
              <div className="space-y-4">
                {/* Energy Selection */}
                <div>
                  <label className="block text-white mb-2 text-sm">今日能量</label>
                  <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                    {(['high', 'medium', 'low', 'crash', 'lowpool', 'create', 'reset'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setNewLog({ ...newLog, energy: level })}
                        className={`p-3 rounded-lg border-2 transition-all text-xs ${
                          newLog.energy === level
                            ? 'border-current bg-white/10'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                        style={{
                          color: newLog.energy === level ? energyColors[level] : '#C8A777',
                        }}
                      >
                        {energyLabels[level]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <label className="block text-white mb-2 text-sm flex items-center gap-2">
                    今日动作（每行一个）
                    {intentions.filter(i => i.status === 'active').length > 0 && (
                      <Badge className="bg-[#42F5DC]/20 text-[#42F5DC] border-[#42F5DC]/30 text-xs">
                        已关联{intentions.filter(i => i.status === 'active').length}个活跃意图
                      </Badge>
                    )}
                  </label>
                  <textarea
                    value={newLog.actions}
                    onChange={(e) => setNewLog({ ...newLog, actions: e.target.value })}
                    placeholder="力量训练&#10;完成项目&#10;冥想20分钟"
                    className="w-full bg-[#04070F]/60 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#42F5DC]/50 resize-none"
                    rows={4}
                  />
                </div>

                {/* Synchronicity */}
                <div>
                  <label className="block text-white mb-2 text-sm">宇宙同步性</label>
                  <input
                    type="text"
                    value={newLog.synchronicity}
                    onChange={(e) => setNewLog({ ...newLog, synchronicity: e.target.value })}
                    placeholder="今天遇到的巧合、信号、有意义的事件..."
                    className="w-full bg-[#04070F]/60 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#42F5DC]/50"
                  />
                </div>

                {/* Body Feedback */}
                <div>
                  <label className="block text-white mb-2 text-sm">身体反馈</label>
                  <input
                    type="text"
                    value={newLog.bodyFeedback}
                    onChange={(e) => setNewLog({ ...newLog, bodyFeedback: e.target.value })}
                    placeholder="身体感觉如何？能量状态？"
                    className="w-full bg-[#04070F]/60 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#42F5DC]/50"
                  />
                </div>

                {/* Inspiration */}
                <div>
                  <label className="block text-white mb-2 text-sm">灵感出现点</label>
                  <input
                    type="text"
                    value={newLog.inspiration}
                    onChange={(e) => setNewLog({ ...newLog, inspiration: e.target.value })}
                    placeholder="今天有什么新想法、创意或触动？"
                    className="w-full bg-[#04070F]/60 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#42F5DC]/50"
                  />
                </div>

                {/* Next Call */}
                <div>
                  <label className="block text-white mb-2 text-sm">下个周期的召唤</label>
                  <input
                    type="text"
                    value={newLog.nextCall}
                    onChange={(e) => setNewLog({ ...newLog, nextCall: e.target.value })}
                    placeholder="接下来想做什么？"
                    className="w-full bg-[#04070F]/60 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#42F5DC]/50"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <motion.button
                    onClick={createLog}
                    className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#42F5DC] to-[#6E79FF] text-[#04070F]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    保存日志
                  </motion.button>
                  <motion.button
                    onClick={() => setShowNewLog(false)}
                    className="px-6 py-3 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    取消
                  </motion.button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logs List */}
      <div className="space-y-4">
        {logs.length === 0 ? (
          <Card className="bg-[#0B1C26]/40 border-[#28D5C6]/20 p-8 text-center">
            <BookOpen className="w-12 h-12 text-[#42F5DC]/30 mx-auto mb-3" />
            <p className="text-[#C8A777]">开始记录你的宇宙日志</p>
          </Card>
        ) : (
          logs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="bg-[#0B1C26]/60 border-2 p-6 hover:bg-[#0B1C26]/80 transition-all"
                style={{ borderColor: `${energyColors[log.energy]}40` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${energyColors[log.energy]}20` }}
                    >
                      <BookOpen className="w-5 h-5" style={{ color: energyColors[log.energy] }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-[#C8A777]" />
                        <span className="text-white">{log.date.toLocaleDateString('zh-CN')}</span>
                      </div>
                      <Badge
                        style={{
                          backgroundColor: `${energyColors[log.energy]}20`,
                          color: energyColors[log.energy],
                          borderColor: `${energyColors[log.energy]}40`,
                        }}
                      >
                        {energyLabels[log.energy]}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 text-sm">
                  {log.actions.length > 0 && (
                    <div>
                      <div className="text-[#42F5DC] mb-1 flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        今日动作
                      </div>
                      <div className="text-[#C8A777] pl-6 space-y-1">
                        {log.actions.map((action, i) => (
                          <div key={i}>• {action}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {log.synchronicity && (
                    <div>
                      <div className="text-[#6E79FF] mb-1 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        同步性
                      </div>
                      <div className="text-[#C8A777] pl-6">{log.synchronicity}</div>
                    </div>
                  )}

                  {log.bodyFeedback && (
                    <div>
                      <div className="text-[#28D5C6] mb-1">身体反馈</div>
                      <div className="text-[#C8A777] pl-6">{log.bodyFeedback}</div>
                    </div>
                  )}

                  {log.inspiration && (
                    <div>
                      <div className="text-[#BFA36F] mb-1">灵感出现</div>
                      <div className="text-[#C8A777] pl-6">{log.inspiration}</div>
                    </div>
                  )}

                  {log.nextCall && (
                    <div>
                      <div className="text-[#42F5DC] mb-1 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        下个召唤
                      </div>
                      <div className="text-[#C8A777] pl-6">{log.nextCall}</div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}