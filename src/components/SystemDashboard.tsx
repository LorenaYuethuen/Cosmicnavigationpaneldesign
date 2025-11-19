import { motion } from 'motion/react';
import { 
  Activity, 
  Zap, 
  Target, 
  BookOpen, 
  Dumbbell, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Calendar,
  Flame,
  BarChart3
} from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useLifeSystem } from '../contexts/LifeSystemContext';

export function SystemDashboard() {
  const {
    stats,
    currentEnergy,
    getSuggestedActions,
    getEnergyInsights,
    getSystemHealth,
    intentions,
    logs,
    workouts,
    yearGoals,
  } = useLifeSystem();

  const systemHealth = getSystemHealth();
  const energyInsights = getEnergyInsights();
  const suggestedActions = getSuggestedActions();

  const healthConfig = {
    excellent: {
      color: '#42F5DC',
      label: '优秀',
      icon: CheckCircle2,
      description: '系统运行完美，保持这个状态！',
    },
    good: {
      color: '#6E79FF',
      label: '良好',
      icon: Activity,
      description: '系统运行良好，继续优化',
    },
    needsAttention: {
      color: '#BFA36F',
      label: '需要关注',
      icon: AlertCircle,
      description: '某些方面需要更多注意',
    },
    critical: {
      color: '#FF6B6B',
      label: '需要改善',
      icon: AlertCircle,
      description: '系统需要紧急调整',
    },
  };

  const currentHealthConfig = healthConfig[systemHealth];
  const HealthIcon = currentHealthConfig.icon;

  // 计算意图完成率
  const intentionCompletionRate = stats.totalIntentions > 0
    ? (stats.completedIntentions / stats.totalIntentions) * 100
    : 0;

  // 获取最近的能量趋势
  const recentLogs = logs.slice(0, 7);
  const energyTrend = recentLogs.length > 0 
    ? recentLogs.filter(log => log.energy === 'high' || log.energy === 'create').length >= 4
      ? 'up' 
      : recentLogs.filter(log => log.energy === 'low' || log.energy === 'crash').length >= 4
        ? 'down'
        : 'stable'
    : 'stable';

  // 本周运动完成度
  const weeklyWorkoutTarget = 4;
  const workoutProgress = (stats.weeklyWorkouts / weeklyWorkoutTarget) * 100;

  return (
    <div className="space-y-8">
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
            <Activity className="w-6 h-6 text-[#04070F]" />
          </div>
        </motion.div>
        <h2 className="text-3xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <span className="bg-gradient-to-r from-[#42F5DC] via-[#6E79FF] to-[#BFA36F] bg-clip-text text-transparent">
            系统总览
          </span>
        </h2>
        <p className="text-[#C8A777]">全局视图 · 数据联动 · 智能洞察</p>
      </div>

      {/* System Health Status */}
      <Card 
        className="bg-gradient-to-br from-[#0B1C26]/80 to-[#0F3840]/60 border-2 p-6"
        style={{ borderColor: currentHealthConfig.color }}
      >
        <div className="flex items-start gap-6">
          <motion.div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${currentHealthConfig.color}20` }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: 9999,
              ease: 'easeInOut',
            }}
          >
            <HealthIcon className="w-8 h-8" style={{ color: currentHealthConfig.color }} />
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                系统健康度
              </h3>
              <Badge
                style={{
                  backgroundColor: `${currentHealthConfig.color}20`,
                  color: currentHealthConfig.color,
                  borderColor: `${currentHealthConfig.color}40`,
                }}
              >
                {currentHealthConfig.label}
              </Badge>
            </div>
            <p className="text-[#C8A777] mb-4">{currentHealthConfig.description}</p>
            <div className="text-sm text-[#42F5DC]">
              💡 {energyInsights}
            </div>
          </div>
        </div>
      </Card>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* 活跃意图 */}
        <Card className="bg-[#0B1C26]/60 border-[#42F5DC]/30 p-4 hover:border-[#42F5DC]/50 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <Target className="w-5 h-5 text-[#42F5DC]" />
            <motion.div
              animate={{ scale: stats.totalIntentions > stats.completedIntentions ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 2, repeat: 9999 }}
            >
              <div className="w-2 h-2 rounded-full bg-[#42F5DC] shadow-lg" 
                style={{ boxShadow: '0 0 8px #42F5DC' }}
              />
            </motion.div>
          </div>
          <div className="text-3xl text-[#42F5DC] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {stats.totalIntentions - stats.completedIntentions}
          </div>
          <div className="text-xs text-[#C8A777]">活跃意图</div>
          <Progress value={intentionCompletionRate} className="mt-2 h-1" />
        </Card>

        {/* 日志连续天数 */}
        <Card className="bg-[#0B1C26]/60 border-[#6E79FF]/30 p-4 hover:border-[#6E79FF]/50 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <Flame className="w-5 h-5 text-[#FF6B6B]" />
            {stats.currentStreak >= 7 && (
              <Sparkles className="w-4 h-4 text-[#FFB84D]" />
            )}
          </div>
          <div className="text-3xl text-[#6E79FF] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {stats.currentStreak}
          </div>
          <div className="text-xs text-[#C8A777]">连续记录天数</div>
          {stats.currentStreak >= 7 && (
            <div className="text-xs text-[#FFB84D] mt-1">🔥 保持火热</div>
          )}
        </Card>

        {/* 本周运动 */}
        <Card className="bg-[#0B1C26]/60 border-[#28D5C6]/30 p-4 hover:border-[#28D5C6]/50 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <Dumbbell className="w-5 h-5 text-[#28D5C6]" />
            <TrendingUp className="w-4 h-4 text-[#C8A777]" />
          </div>
          <div className="text-3xl text-[#28D5C6] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {stats.weeklyWorkouts}/{weeklyWorkoutTarget}
          </div>
          <div className="text-xs text-[#C8A777]">本周运动次数</div>
          <Progress value={workoutProgress} className="mt-2 h-1" />
        </Card>

        {/* 平均能量 */}
        <Card className="bg-[#0B1C26]/60 border-[#BFA36F]/30 p-4 hover:border-[#BFA36F]/50 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <Zap className="w-5 h-5 text-[#BFA36F]" />
            {energyTrend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
            {energyTrend === 'down' && <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />}
          </div>
          <div className="text-3xl text-[#BFA36F] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {stats.averageEnergy.toFixed(1)}
          </div>
          <div className="text-xs text-[#C8A777]">平均能量值</div>
          <div className="text-xs mt-1">
            {energyTrend === 'up' && <span className="text-green-400">↗ 上升趋势</span>}
            {energyTrend === 'down' && <span className="text-red-400">↘ 下降趋势</span>}
            {energyTrend === 'stable' && <span className="text-[#C8A777]">→ 稳定</span>}
          </div>
        </Card>
      </div>

      {/* AI Suggested Actions */}
      <Card className="bg-gradient-to-br from-[#0B1C26]/80 to-[#0F3840]/60 border-[#42F5DC]/30 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#42F5DC]/20 to-[#6E79FF]/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#42F5DC]" />
          </div>
          <h3 className="text-xl text-white">智能建议</h3>
          <Badge className="bg-[#42F5DC]/20 text-[#42F5DC] border-[#42F5DC]/30">
            基于系统分析
          </Badge>
        </div>

        {suggestedActions.length > 0 ? (
          <div className="space-y-3">
            {suggestedActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#42F5DC]/20 to-[#6E79FF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="text-xs text-[#42F5DC]">{index + 1}</div>
                </div>
                <span className="text-[#C8A777] group-hover:text-white transition-colors flex-1">
                  {action}
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-[#C8A777]">
            继续使用系统，将获得个性化建议
          </div>
        )}
      </Card>

      {/* Module Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          {
            title: '显化引擎',
            count: stats.totalIntentions,
            icon: Target,
            color: '#42F5DC',
            description: `${stats.completedIntentions}个已完成`,
          },
          {
            title: '阿卡西日志',
            count: stats.totalLogs,
            icon: BookOpen,
            color: '#6E79FF',
            description: `${stats.currentStreak}天连续`,
          },
          {
            title: '身体频率',
            count: workouts.length,
            icon: Dumbbell,
            color: '#28D5C6',
            description: `本周${stats.weeklyWorkouts}次`,
          },
          {
            title: '能量状态',
            count: currentEnergy ? '已扫描' : '未扫描',
            icon: Zap,
            color: '#BFA36F',
            description: currentEnergy || '待启动',
          },
          {
            title: '三年路径',
            count: yearGoals.length,
            icon: Calendar,
            color: '#B794F6',
            description: '宇宙规划',
          },
          {
            title: '系统分析',
            count: '100%',
            icon: BarChart3,
            color: '#FFB84D',
            description: '数据联动',
          },
        ].map((module, index) => (
          <motion.div
            key={module.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-[#0B1C26]/40 border-[#28D5C6]/20 p-4 hover:bg-[#0B1C26]/60 hover:border-[#42F5DC]/40 transition-all group cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${module.color}20` }}
                >
                  <module.icon className="w-4 h-4" style={{ color: module.color }} />
                </div>
                <h4 className="text-white text-sm">{module.title}</h4>
              </div>
              <div className="text-xl mb-1" style={{ color: module.color, fontFamily: 'Space Grotesk, sans-serif' }}>
                {module.count}
              </div>
              <div className="text-xs text-[#C8A777]">{module.description}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* System Insights */}
      <Card className="bg-gradient-to-r from-[#42F5DC]/10 to-[#6E79FF]/10 border-[#42F5DC]/30 p-6">
        <div className="flex items-start gap-3">
          <Activity className="w-5 h-5 text-[#42F5DC] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-[#C8A777]">
            <span className="text-[#42F5DC]">系统洞察：</span>
            {' '}各模块数据实时联动，智能分析你的生活状态，提供个性化建议。持续使用将获得更精准的洞察。
          </div>
        </div>
      </Card>
    </div>
  );
}
