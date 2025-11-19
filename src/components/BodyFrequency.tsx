import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, Plus, Mountain, Waves, Activity, User, X, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useLifeSystem } from '../contexts/LifeSystemContext';

const workoutTypes = {
  strength: { label: '力量训练', icon: Dumbbell, color: '#42F5DC', timeRange: '1-2h', frequency: '3-4次/周' },
  climbing: { label: '攀岩', icon: Mountain, color: '#6E79FF', timeRange: '2h', frequency: '1次/周' },
  swimming: { label: '游泳', icon: Waves, color: '#28D5C6', timeRange: '1h', frequency: '1-2次/周' },
  cardio: { label: '有氧运动', icon: Activity, color: '#BFA36F', timeRange: '30-45min', frequency: '2-3次/周' },
  yoga: { label: '瑜伽/拉伸', icon: User, color: '#B794F6', timeRange: '30-60min', frequency: '2-3次/周' },
};

type WorkoutType = keyof typeof workoutTypes;

export function BodyFrequency() {
  const { workouts, addWorkout, stats, currentEnergy } = useLifeSystem();
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    type: 'strength' as WorkoutType,
    duration: 60,
    intensity: 'medium' as 'low' | 'medium' | 'high',
    notes: '',
  });

  const handleAddWorkout = () => {
    addWorkout({
      ...newWorkout,
      date: new Date(),
    });
    setNewWorkout({
      type: 'strength',
      duration: 60,
      intensity: 'medium',
      notes: '',
    });
    setShowAddWorkout(false);
  };

  // 计算本周各类运动次数
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weeklyWorkoutsByType = Object.keys(workoutTypes).reduce((acc, type) => {
    acc[type as WorkoutType] = workouts.filter(
      w => w.type === type && w.date >= weekAgo
    ).length;
    return acc;
  }, {} as Record<WorkoutType, number>);

  const intensityColors = {
    low: '#BFA36F',
    medium: '#6E79FF',
    high: '#42F5DC',
  };

  const intensityLabels = {
    low: '低强度',
    medium: '中强度',
    high: '高强度',
  };

  // 本周运动目标
  const weeklyTarget = 4;
  const weeklyProgress = (stats.weeklyWorkouts / weeklyTarget) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <span className="bg-gradient-to-r from-[#42F5DC] via-[#28D5C6] to-[#BFA36F] bg-clip-text text-transparent">
              五频率运动系统
            </span>
          </h2>
          <p className="text-[#C8A777]">通过运动调节身体频率，释放内啡肽</p>
        </div>
        <motion.button
          onClick={() => setShowAddWorkout(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#42F5DC] to-[#28D5C6] text-[#04070F]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">记录运动</span>
        </motion.button>
      </div>

      {/* Weekly Progress */}
      <Card className="bg-gradient-to-br from-[#0B1C26]/80 to-[#0F3840]/60 border-[#42F5DC]/30 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl text-white mb-1">本周运动进度</h3>
            <p className="text-sm text-[#C8A777]">目标：每周 {weeklyTarget} 次</p>
          </div>
          <div className="text-right">
            <div className="text-3xl text-[#42F5DC]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {stats.weeklyWorkouts}/{weeklyTarget}
            </div>
            <div className="text-xs text-[#C8A777]">
              {weeklyProgress >= 100 ? '🎉 已完成' : `还需 ${weeklyTarget - stats.weeklyWorkouts} 次`}
            </div>
          </div>
        </div>
        <Progress value={weeklyProgress} className="h-3" />
        {currentEnergy && (
          <div className="mt-4 text-sm text-[#C8A777]">
            💡 当前能量状态：
            {(currentEnergy === 'high' || currentEnergy === 'create') && ' 适合高强度训练'}
            {(currentEnergy === 'medium' || currentEnergy === 'reset') && ' 适合常规训练'}
            {(currentEnergy === 'low' || currentEnergy === 'lowpool') && ' 建议轻度运动'}
            {currentEnergy === 'crash' && ' 建议休息为主'}
          </div>
        )}
      </Card>

      {/* Five Frequency Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(Object.keys(workoutTypes) as WorkoutType[]).map((type) => {
          const config = workoutTypes[type];
          const Icon = config.icon;
          const weeklyCount = weeklyWorkoutsByType[type];
          
          return (
            <motion.div
              key={type}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card
                className="bg-[#0B1C26]/60 border-2 p-5 hover:bg-[#0B1C26]/80 transition-all cursor-pointer group"
                style={{ borderColor: `${config.color}40` }}
                onClick={() => {
                  setNewWorkout({ ...newWorkout, type });
                  setShowAddWorkout(true);
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${config.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: config.color }} />
                  </div>
                  <Badge
                    style={{
                      backgroundColor: `${config.color}20`,
                      color: config.color,
                      borderColor: `${config.color}40`,
                    }}
                  >
                    本周 {weeklyCount}次
                  </Badge>
                </div>
                <h4 className="text-lg text-white mb-2">{config.label}</h4>
                <div className="text-xs text-[#C8A777] space-y-1">
                  <div>⏱ {config.timeRange}</div>
                  <div>📅 {config.frequency}</div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Add Workout Modal */}
      <AnimatePresence>
        {showAddWorkout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddWorkout(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="bg-gradient-to-br from-[#0B1C26] to-[#0F3840] border-[#42F5DC]/30 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl text-white">记录运动</h3>
                  <button
                    onClick={() => setShowAddWorkout(false)}
                    className="text-[#C8A777] hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Workout Type */}
                  <div>
                    <label className="block text-white mb-2 text-sm">运动类型</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(Object.keys(workoutTypes) as WorkoutType[]).map((type) => {
                        const config = workoutTypes[type];
                        const Icon = config.icon;
                        return (
                          <button
                            key={type}
                            onClick={() => setNewWorkout({ ...newWorkout, type })}
                            className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                              newWorkout.type === type
                                ? 'border-current bg-white/10'
                                : 'border-white/10 hover:border-white/20'
                            }`}
                            style={{
                              color: newWorkout.type === type ? config.color : '#C8A777',
                            }}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-xs">{config.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-white mb-2 text-sm">时长（分钟）</label>
                    <input
                      type="number"
                      value={newWorkout.duration}
                      onChange={(e) => setNewWorkout({ ...newWorkout, duration: parseInt(e.target.value) || 0 })}
                      className="w-full bg-[#04070F]/60 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#42F5DC]/50"
                      min={1}
                    />
                  </div>

                  {/* Intensity */}
                  <div>
                    <label className="block text-white mb-2 text-sm">强度</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['low', 'medium', 'high'] as const).map((intensity) => (
                        <button
                          key={intensity}
                          onClick={() => setNewWorkout({ ...newWorkout, intensity })}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            newWorkout.intensity === intensity
                              ? 'border-current bg-white/10'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                          style={{
                            color: newWorkout.intensity === intensity ? intensityColors[intensity] : '#C8A777',
                          }}
                        >
                          <div className="text-xs">{intensityLabels[intensity]}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-white mb-2 text-sm">备注（可选）</label>
                    <textarea
                      value={newWorkout.notes}
                      onChange={(e) => setNewWorkout({ ...newWorkout, notes: e.target.value })}
                      placeholder="感觉如何？有什么特别的体验？"
                      className="w-full bg-[#04070F]/60 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#42F5DC]/50 resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <motion.button
                      onClick={handleAddWorkout}
                      className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#42F5DC] to-[#28D5C6] text-[#04070F]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      保存记录
                    </motion.button>
                    <motion.button
                      onClick={() => setShowAddWorkout(false)}
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Workouts */}
      <div className="space-y-4">
        <h3 className="text-xl text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#42F5DC]" />
          最近运动记录
        </h3>
        
        {workouts.length === 0 ? (
          <Card className="bg-[#0B1C26]/40 border-[#28D5C6]/20 p-8 text-center">
            <Dumbbell className="w-12 h-12 text-[#42F5DC]/30 mx-auto mb-3" />
            <p className="text-[#C8A777]">开始记录你的运动轨迹</p>
          </Card>
        ) : (
          workouts.slice(0, 10).map((workout, index) => {
            const config = workoutTypes[workout.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-[#0B1C26]/60 border-2 p-4 hover:bg-[#0B1C26]/80 transition-all"
                  style={{ borderColor: `${config.color}40` }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${config.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: config.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white">{config.label}</h4>
                        <Badge
                          variant="outline"
                          style={{
                            borderColor: `${intensityColors[workout.intensity]}40`,
                            color: intensityColors[workout.intensity],
                          }}
                        >
                          {intensityLabels[workout.intensity]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#C8A777]">
                        <span>⏱ {workout.duration}分钟</span>
                        <span>📅 {workout.date.toLocaleDateString('zh-CN')}</span>
                      </div>
                      {workout.notes && (
                        <p className="text-sm text-[#C8A777] mt-2 italic">{workout.notes}</p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Tips */}
      <Card className="bg-gradient-to-r from-[#42F5DC]/10 to-[#28D5C6]/10 border-[#42F5DC]/30 p-4">
        <div className="flex items-start gap-3">
          <Dumbbell className="w-5 h-5 text-[#42F5DC] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-[#C8A777]">
            <span className="text-[#42F5DC]">运动原则：</span>
            {' '}规律运动 → 内啡肽分泌 → 情绪稳定 → 自信提升 → 身体健康
          </div>
        </div>
      </Card>
    </div>
  );
}