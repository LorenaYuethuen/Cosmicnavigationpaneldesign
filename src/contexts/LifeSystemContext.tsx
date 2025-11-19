import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// ==================== 类型定义 ====================

export type EnergyLevel = 'high' | 'medium' | 'low' | 'crash' | 'lowpool' | 'create' | 'reset';

export interface Intention {
  id: string;
  text: string;
  area: 'body' | 'space' | 'inspiration' | 'flow';
  status: 'active' | 'completed' | 'pending';
  createdAt: Date;
  energyWhenCreated?: EnergyLevel;
}

export interface LogEntry {
  id: string;
  date: Date;
  energy: EnergyLevel;
  actions: string[];
  synchronicity: string;
  bodyFeedback: string;
  inspiration: string;
  nextCall: string;
}

export interface WorkoutSession {
  id: string;
  type: 'strength' | 'climbing' | 'swimming' | 'cardio' | 'yoga';
  date: Date;
  duration: number; // 分钟
  intensity: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface YearGoal {
  id: string;
  year: number;
  title: string;
  description: string;
  quarters: {
    q1: string[];
    q2: string[];
    q3: string[];
    q4: string[];
  };
  progress: number; // 0-100
}

export interface SystemStats {
  totalIntentions: number;
  completedIntentions: number;
  totalLogs: number;
  averageEnergy: number;
  weeklyWorkouts: number;
  currentStreak: number;
}

// ==================== Context 定义 ====================

interface LifeSystemContextType {
  // 能量扫描
  currentEnergy: EnergyLevel | null;
  energyHistory: Array<{ date: Date; level: EnergyLevel }>;
  setCurrentEnergy: (energy: EnergyLevel) => void;
  
  // 显化引擎
  intentions: Intention[];
  addIntention: (intention: Omit<Intention, 'id' | 'createdAt' | 'energyWhenCreated'>) => void;
  addIntentionsBatch: (intentions: Array<Omit<Intention, 'id' | 'createdAt' | 'energyWhenCreated'>>) => void;
  convertIntentionsToLog: () => Omit<LogEntry, 'id'> | null;
  decomposeYearGoalToIntentions: (goalId: string, quarter: 'q1' | 'q2' | 'q3' | 'q4') => Array<Omit<Intention, 'id' | 'createdAt' | 'energyWhenCreated'>>;
  toggleIntention: (id: string) => void;
  deleteIntention: (id: string) => void;
  
  // 阿卡西日志
  logs: LogEntry[];
  addLog: (log: Omit<LogEntry, 'id'>) => void;
  deleteLog: (id: string) => void;
  
  // 身体频率
  workouts: WorkoutSession[];
  addWorkout: (workout: Omit<WorkoutSession, 'id'>) => void;
  deleteWorkout: (id: string) => void;
  
  // 三年路径
  yearGoals: YearGoal[];
  updateYearGoal: (goal: YearGoal) => void;
  
  // 系统统计
  stats: SystemStats;
  
  // 联动功能
  getSuggestedActions: () => string[];
  getEnergyInsights: () => string;
  getSystemHealth: () => 'excellent' | 'good' | 'needsAttention' | 'critical';
}

const LifeSystemContext = createContext<LifeSystemContextType | undefined>(undefined);

// ==================== Provider ====================

export function LifeSystemProvider({ children }: { children: ReactNode }) {
  // 状态管理
  const [currentEnergy, setCurrentEnergyState] = useState<EnergyLevel | null>(null);
  const [energyHistory, setEnergyHistory] = useState<Array<{ date: Date; level: EnergyLevel }>>([]);
  const [intentions, setIntentions] = useState<Intention[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [yearGoals, setYearGoals] = useState<YearGoal[]>([
    {
      id: '2025',
      year: 2025,
      title: '建立系统基础',
      description: '完善生活系统，培养核心习惯',
      quarters: {
        q1: ['建立运动习惯', '优化居住环境', '开始阿卡西记录'],
        q2: ['提升收入水平', '探索新城市', '深化知识体系'],
        q3: ['稳定运动频率', '发展创意项目', '优化时间管理'],
        q4: ['年度复盘总结', '设定2026目标', '庆祝成长'],
      },
      progress: 25,
    },
    {
      id: '2026',
      year: 2026,
      title: '系统优化升级',
      description: '深化系统运行，追求品质生活',
      quarters: {
        q1: ['收入突破新阶段', '升级居住环境', '拓展社交网络'],
        q2: ['探索艺术创作', '旅行体验新文化', '深化精神实践'],
        q3: ['专业技能提升', '建立被动收入', '优化健康系统'],
        q4: ['复盘与调整', '准备2027跃迁', '感恩与庆祝'],
      },
      progress: 0,
    },
    {
      id: '2027',
      year: 2027,
      title: '自由与创造',
      description: '实现生活自主，创造理想状态',
      quarters: {
        q1: ['实现时间自由', '开启梦想项目', '享受生活质感'],
        q2: ['旅居体验', '艺术创作展示', '知识体系输出'],
        q3: ['持续创造价值', '分享系统经验', '影响他人生活'],
        q4: ['年度总结', '三年回顾', '开启新周期'],
      },
      progress: 0,
    },
  ]);

  // 设置能量并记录历史
  const setCurrentEnergy = (energy: EnergyLevel) => {
    setCurrentEnergyState(energy);
    setEnergyHistory((prev) => [...prev, { date: new Date(), level: energy }]);
  };

  // 添加意图（关联当前能量）
  const addIntention = (intention: Omit<Intention, 'id' | 'createdAt' | 'energyWhenCreated'>) => {
    const newIntention: Intention = {
      ...intention,
      id: Date.now().toString(),
      createdAt: new Date(),
      energyWhenCreated: currentEnergy || undefined,
    };
    setIntentions((prev) => [newIntention, ...prev]);
  };

  // 批量添加意图（用于目标分解）
  const addIntentionsBatch = (intentions: Array<Omit<Intention, 'id' | 'createdAt' | 'energyWhenCreated'>>) => {
    const newIntentions = intentions.map((intention, index) => ({
      ...intention,
      id: (Date.now() + index).toString(),
      createdAt: new Date(),
      energyWhenCreated: currentEnergy || undefined,
    }));
    setIntentions((prev) => [...newIntentions, ...prev]);
  };

  // 一键转换意图为日志
  const convertIntentionsToLog = () => {
    const activeIntentions = intentions.filter(i => i.status === 'active');
    if (activeIntentions.length === 0) return null;

    const logEntry = {
      date: new Date(),
      energy: currentEnergy || ('medium' as EnergyLevel),
      actions: activeIntentions.map(i => i.text),
      synchronicity: '',
      bodyFeedback: '',
      inspiration: '',
      nextCall: '',
    };

    return logEntry;
  };

  // 从年度目标生成月度意图
  const decomposeYearGoalToIntentions = (goalId: string, quarter: 'q1' | 'q2' | 'q3' | 'q4') => {
    const goal = yearGoals.find(g => g.id === goalId);
    if (!goal) return [];

    const milestones = goal.quarters[quarter];
    const areaMap = {
      '身体': 'body' as const,
      '空间': 'space' as const,
      '灵感': 'inspiration' as const,
      '工作': 'flow' as const,
      '运动': 'body' as const,
      '环境': 'space' as const,
      '创作': 'inspiration' as const,
      '学习': 'flow' as const,
      '收入': 'flow' as const,
      '旅行': 'space' as const,
      '社交': 'space' as const,
      '项目': 'flow' as const,
    };

    const newIntentions = milestones.map(milestone => {
      // 智能识别意图领域
      let area: 'body' | 'space' | 'inspiration' | 'flow' = 'flow';
      for (const [keyword, mappedArea] of Object.entries(areaMap)) {
        if (milestone.includes(keyword)) {
          area = mappedArea;
          break;
        }
      }

      return {
        text: milestone,
        area,
        status: 'pending' as const,
      };
    });

    return newIntentions;
  };

  // 切换意图状态
  const toggleIntention = (id: string) => {
    setIntentions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'completed' ? 'active' : 'completed',
            }
          : item
      )
    );
  };

  // 删除意图
  const deleteIntention = (id: string) => {
    setIntentions((prev) => prev.filter((item) => item.id !== id));
  };

  // 添加日志
  const addLog = (log: Omit<LogEntry, 'id'>) => {
    const newLog: LogEntry = {
      ...log,
      id: Date.now().toString(),
    };
    setLogs((prev) => [newLog, ...prev]);
    
    // 联动：日志中的能量等级会影响能量历史
    setEnergyHistory((prev) => [...prev, { date: log.date, level: log.energy }]);
  };

  // 删除日志
  const deleteLog = (id: string) => {
    setLogs((prev) => prev.filter((item) => item.id !== id));
  };

  // 添加运动记录
  const addWorkout = (workout: Omit<WorkoutSession, 'id'>) => {
    const newWorkout: WorkoutSession = {
      ...workout,
      id: Date.now().toString(),
    };
    setWorkouts((prev) => [newWorkout, ...prev]);
  };

  // 删除运动记录
  const deleteWorkout = (id: string) => {
    setWorkouts((prev) => prev.filter((item) => item.id !== id));
  };

  // 更新年度目标
  const updateYearGoal = (goal: YearGoal) => {
    setYearGoals((prev) => prev.map((g) => (g.id === goal.id ? goal : g)));
  };

  // 计算系统统计
  const stats: SystemStats = {
    totalIntentions: intentions.length,
    completedIntentions: intentions.filter((i) => i.status === 'completed').length,
    totalLogs: logs.length,
    averageEnergy:
      energyHistory.length > 0
        ? energyHistory.reduce((sum, entry) => {
            const energyValue = { high: 3, medium: 2, low: 1, create: 3, reset: 2, lowpool: 1, crash: 0 }[
              entry.level
            ];
            return sum + energyValue;
          }, 0) / energyHistory.length
        : 2,
    weeklyWorkouts: workouts.filter((w) => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return w.date >= weekAgo;
    }).length,
    currentStreak: calculateStreak(logs),
  };

  // 计算连续记录天数
  function calculateStreak(logs: LogEntry[]): number {
    if (logs.length === 0) return 0;
    
    const sortedLogs = [...logs].sort((a, b) => b.date.getTime() - a.date.getTime());
    let streak = 1;
    
    for (let i = 0; i < sortedLogs.length - 1; i++) {
      const current = new Date(sortedLogs[i].date);
      const next = new Date(sortedLogs[i + 1].date);
      const diffDays = Math.floor((current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }

  // 联动功能：根据当前状态获取建议行动
  const getSuggestedActions = (): string[] => {
    const suggestions: string[] = [];
    
    // 基于能量等级的建议
    if (currentEnergy === 'high' || currentEnergy === 'create') {
      suggestions.push('完成一个显化意图中的重要任务');
      suggestions.push('进行高强度运动（力量训练或攀岩）');
      suggestions.push('开展创意项目或深度学习');
    } else if (currentEnergy === 'low' || currentEnergy === 'lowpool') {
      suggestions.push('轻度运动如散步或瑜伽');
      suggestions.push('整理阿卡西日志，回顾最近体验');
      suggestions.push('休息和自我滋养');
    } else if (currentEnergy === 'crash') {
      suggestions.push('取消所有计划，专注疗愈');
      suggestions.push('寻求支持和温暖');
      suggestions.push('记录情绪日志');
    }
    
    // 基于运动频率的建议
    if (stats.weeklyWorkouts < 3) {
      suggestions.push('本周运动次数不足，考虑增加运动');
    }
    
    // 基于日志记录的建议
    if (stats.currentStreak === 0) {
      suggestions.push('开始今日的阿卡西日志记录');
    } else if (stats.currentStreak >= 7) {
      suggestions.push(`已连续记录${stats.currentStreak}天，保持下去！`);
    }
    
    // 基于意图完成度的建议
    if (stats.totalIntentions > 0) {
      const completionRate = (stats.completedIntentions / stats.totalIntentions) * 100;
      if (completionRate < 30) {
        suggestions.push('关注显化引擎中的活跃意图，采取行动');
      }
    }
    
    return suggestions;
  };

  // 联动功能：能量洞察
  const getEnergyInsights = (): string => {
    if (energyHistory.length === 0) {
      return '开始能量扫描，追踪你的生命节奏';
    }
    
    const recentEnergy = energyHistory.slice(-7); // 最近7次
    const highCount = recentEnergy.filter((e) => e.level === 'high' || e.level === 'create').length;
    const lowCount = recentEnergy.filter((e) => e.level === 'low' || e.level === 'lowpool' || e.level === 'crash').length;
    
    if (highCount >= 5) {
      return '🌟 你处于高能量周期，适合推进重要项目和目标';
    } else if (lowCount >= 5) {
      return '🌙 你需要更多休息和滋养，温柔对待自己';
    } else {
      return '⚖️ 能量波动正常，保持平衡的生活节奏';
    }
  };

  // 联动功能：系统健康度
  const getSystemHealth = (): 'excellent' | 'good' | 'needsAttention' | 'critical' => {
    let score = 0;
    
    // 评分因素1: 运动频率（0-30分）
    if (stats.weeklyWorkouts >= 4) score += 30;
    else if (stats.weeklyWorkouts >= 3) score += 20;
    else if (stats.weeklyWorkouts >= 2) score += 10;
    
    // 评分因素2: 日志连续性（0-30分）
    if (stats.currentStreak >= 14) score += 30;
    else if (stats.currentStreak >= 7) score += 20;
    else if (stats.currentStreak >= 3) score += 10;
    
    // 评分因素3: 意图完成率（0-30分）
    if (stats.totalIntentions > 0) {
      const completionRate = (stats.completedIntentions / stats.totalIntentions) * 100;
      if (completionRate >= 60) score += 30;
      else if (completionRate >= 40) score += 20;
      else if (completionRate >= 20) score += 10;
    }
    
    // 评分因素4: 平均能量（0-10分）
    if (stats.averageEnergy >= 2.5) score += 10;
    else if (stats.averageEnergy >= 2.0) score += 7;
    else if (stats.averageEnergy >= 1.5) score += 4;
    
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'needsAttention';
    return 'critical';
  };

  const value: LifeSystemContextType = {
    currentEnergy,
    energyHistory,
    setCurrentEnergy,
    intentions,
    addIntention,
    addIntentionsBatch,
    convertIntentionsToLog,
    decomposeYearGoalToIntentions,
    toggleIntention,
    deleteIntention,
    logs,
    addLog,
    deleteLog,
    workouts,
    addWorkout,
    deleteWorkout,
    yearGoals,
    updateYearGoal,
    stats,
    getSuggestedActions,
    getEnergyInsights,
    getSystemHealth,
  };

  return <LifeSystemContext.Provider value={value}>{children}</LifeSystemContext.Provider>;
}

// ==================== Hook ====================

export function useLifeSystem() {
  const context = useContext(LifeSystemContext);
  if (context === undefined) {
    throw new Error('useLifeSystem must be used within a LifeSystemProvider');
  }
  return context;
}