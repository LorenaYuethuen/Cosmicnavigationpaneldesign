import { motion } from 'motion/react';
import { Map, TrendingUp, Target, Sparkles, CheckCircle2, Circle, Wand2, ArrowRight } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useLifeSystem } from '../contexts/LifeSystemContext';
import { useState } from 'react';

export function ThreeYearPath() {
  const { yearGoals, updateYearGoal, decomposeYearGoalToIntentions, addIntentionsBatch } = useLifeSystem();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // 1-12
  
  // 确定当前季度
  const getCurrentQuarter = (): 'q1' | 'q2' | 'q3' | 'q4' => {
    if (currentMonth <= 3) return 'q1';
    if (currentMonth <= 6) return 'q2';
    if (currentMonth <= 9) return 'q3';
    return 'q4';
  };

  const handleDecomposeGoal = (goalId: string, quarter: 'q1' | 'q2' | 'q3' | 'q4') => {
    const newIntentions = decomposeYearGoalToIntentions(goalId, quarter);
    if (newIntentions.length > 0) {
      addIntentionsBatch(newIntentions);
      setSuccessMessage(`✨ 已将 ${newIntentions.length} 个季度目标转换为待启动意图！`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

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
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6E79FF] to-[#BFA36F] flex items-center justify-center">
            <Map className="w-6 h-6 text-[#04070F]" />
          </div>
        </motion.div>
        <h2 className="text-3xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <span className="bg-gradient-to-r from-[#6E79FF] via-[#BFA36F] to-[#42F5DC] bg-clip-text text-transparent">
            三年宇宙路径
          </span>
        </h2>
        <p className="text-[#C8A777]">2025-2027 · 系统演化 · 自由创造</p>
      </div>

      {/* Year Cards */}
      <div className="space-y-6">
        {yearGoals.map((goal, yearIndex) => {
          const yearColors = {
            2025: { primary: '#42F5DC', secondary: '#28D5C6', bg: 'from-[#42F5DC] to-[#28D5C6]' },
            2026: { primary: '#6E79FF', secondary: '#42F5DC', bg: 'from-[#6E79FF] to-[#42F5DC]' },
            2027: { primary: '#BFA36F', secondary: '#6E79FF', bg: 'from-[#BFA36F] to-[#6E79FF]' },
          };
          const colors = yearColors[goal.year as keyof typeof yearColors];
          const isCurrentYear = goal.year === currentYear;

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: yearIndex * 0.1 }}
            >
              <Card
                className={`bg-gradient-to-br from-[#0B1C26]/80 to-[#0F3840]/60 border-2 p-6 ${
                  isCurrentYear ? 'ring-2 ring-offset-2 ring-offset-[#04070F]' : ''
                }`}
                style={{
                  borderColor: `${colors.primary}40`,
                  ringColor: isCurrentYear ? colors.primary : undefined,
                }}
              >
                {/* Year Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${colors.primary}20` }}
                      >
                        <span
                          className="text-2xl"
                          style={{ color: colors.primary, fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                          {goal.year}
                        </span>
                      </div>
                      {isCurrentYear && (
                        <Badge className="bg-gradient-to-r from-[#42F5DC]/20 to-[#6E79FF]/20 text-[#42F5DC] border-[#42F5DC]/30">
                          <Sparkles className="w-3 h-3 mr-1" />
                          当前年份
                        </Badge>
                      )}
                    </div>
                    <h3
                      className="text-2xl mb-2"
                      style={{ color: colors.primary, fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {goal.title}
                    </h3>
                    <p className="text-[#C8A777]">{goal.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div
                      className="text-4xl mb-1"
                      style={{ color: colors.primary, fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {goal.progress}%
                    </div>
                    <div className="text-xs text-[#C8A777]">完成度</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <Progress value={goal.progress} className="h-2" />
                </div>

                {/* Quarterly Milestones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(['q1', 'q2', 'q3', 'q4'] as const).map((quarter, qIndex) => {
                    const quarterLabels = { q1: 'Q1', q2: 'Q2', q3: 'Q3', q4: 'Q4' };
                    const quarterNames = { q1: '第一季度', q2: '第二季度', q3: '第三季度', q4: '第四季度' };
                    const milestones = goal.quarters[quarter];
                    const quarterColor = qIndex % 2 === 0 ? colors.primary : colors.secondary;

                    return (
                      <Card
                        key={quarter}
                        className="bg-[#0F3840]/40 border p-4"
                        style={{ borderColor: `${quarterColor}30` }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${quarterColor}20` }}
                          >
                            <span className="text-sm" style={{ color: quarterColor }}>
                              {quarterLabels[quarter]}
                            </span>
                          </div>
                          <span className="text-white text-sm">{quarterNames[quarter]}</span>
                        </div>
                        <div className="space-y-2">
                          {milestones.map((milestone, mIndex) => (
                            <div
                              key={mIndex}
                              className="flex items-start gap-2 text-sm text-[#C8A777] hover:text-white transition-colors cursor-pointer group"
                            >
                              <Circle className="w-3 h-3 mt-0.5 flex-shrink-0 group-hover:hidden" />
                              <CheckCircle2
                                className="w-3 h-3 mt-0.5 flex-shrink-0 hidden group-hover:block"
                                style={{ color: quarterColor }}
                              />
                              <span className="flex-1">{milestone}</span>
                            </div>
                          ))}
                        </div>
                        {isCurrentYear && quarter === getCurrentQuarter() && (
                          <div className="mt-4">
                            <button
                              className="bg-gradient-to-r from-[#42F5DC] to-[#6E79FF] text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
                              onClick={() => handleDecomposeGoal(goal.id, quarter)}
                            >
                              <Wand2 className="w-4 h-4" />
                              分解目标
                            </button>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>

                {/* Year Focus */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r" style={{
                  background: `linear-gradient(to right, ${colors.primary}10, ${colors.secondary}10)`,
                }}>
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                    <div className="text-sm text-[#C8A777]">
                      <span style={{ color: colors.primary }}>年度焦点：</span>
                      {goal.year === 2025 && ' 建立习惯系统、优化环境、稳定收入'}
                      {goal.year === 2026 && ' 深化系统、提升品质、拓展体验'}
                      {goal.year === 2027 && ' 时间自由、创造价值、影响他人'}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Path Timeline */}
      <Card className="bg-gradient-to-br from-[#0B1C26]/60 to-[#0F3840]/40 border-[#42F5DC]/30 p-6">
        <h3 className="text-xl text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#42F5DC]" />
          三年演化路径
        </h3>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#42F5DC] via-[#6E79FF] to-[#BFA36F]" />
          
          {/* Timeline Points */}
          <div className="space-y-6">
            {[
              {
                year: 2025,
                title: '系统基础期',
                description: '建立核心习惯，优化生活环境，稳定资源输入',
                color: '#42F5DC',
              },
              {
                year: 2026,
                title: '系统优化期',
                description: '深化系统运行，提升生活品质，拓展体验边界',
                color: '#6E79FF',
              },
              {
                year: 2027,
                title: '自由创造期',
                description: '实现时间自由，持续创造价值，影响他人生活',
                color: '#BFA36F',
              },
            ].map((phase, index) => (
              <div key={phase.year} className="relative flex gap-4 items-start">
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                  style={{
                    backgroundColor: `${phase.color}20`,
                    border: `2px solid ${phase.color}`,
                  }}
                  animate={{
                    scale: phase.year === currentYear ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: phase.year === currentYear ? 9999 : 0,
                  }}
                >
                  <span style={{ color: phase.color }}>{index + 1}</span>
                </motion.div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white">{phase.title}</h4>
                    <span className="text-sm text-[#C8A777]">({phase.year})</span>
                  </div>
                  <p className="text-sm text-[#C8A777]">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Cosmic Insight */}
      <Card className="bg-gradient-to-r from-[#6E79FF]/10 to-[#BFA36F]/10 border-[#6E79FF]/30 p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#6E79FF] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-[#C8A777]">
            <span className="text-[#6E79FF]">宇宙法则：</span>
            {' '}系统 → 习惯 → 品质 → 自由 · 每一年都是下一年的基础 · 信任过程
          </div>
        </div>
      </Card>

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Card className="bg-gradient-to-r from-[#42F5DC]/20 to-[#6E79FF]/20 border-[#42F5DC]/50 p-4">
            <div className="flex items-center gap-3">
              <Wand2 className="w-5 h-5 text-[#42F5DC]" />
              <div className="text-[#42F5DC]">
                {successMessage} 前往"显化面板"查看
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}