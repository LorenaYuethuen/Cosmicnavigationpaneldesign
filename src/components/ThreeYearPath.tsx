import { motion } from 'motion/react';
import { TrendingUp, Target, Sparkles, Rocket, Map, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface Quarter {
  id: string;
  quarter: string;
  focus: string;
  goals: string[];
  status: 'completed' | 'current' | 'upcoming';
}

interface Year {
  year: number;
  theme: string;
  color: string;
  icon: any;
  description: string;
  quarters: Quarter[];
}

export function ThreeYearPath() {
  const pathData: Year[] = [
    {
      year: 1,
      theme: '重建能量体',
      color: '#42F5DC',
      icon: Sparkles,
      description: '身体 × 环境 × 信念',
      quarters: [
        {
          id: 'y1q1',
          quarter: 'Q1',
          focus: '身体系统启动',
          goals: [
            '建立运动习惯（3-4次/周）',
            '优化睡眠作息',
            '整理生活空间',
          ],
          status: 'completed',
        },
        {
          id: 'y1q2',
          quarter: 'Q2',
          focus: '能量优化',
          goals: [
            '精力管理系统',
            '营养知识学习',
            '情绪调节练习',
          ],
          status: 'current',
        },
        {
          id: 'y1q3',
          quarter: 'Q3',
          focus: '环境升级',
          goals: [
            '提升居住美学',
            '建立仪式感',
            '旅居探索开始',
          ],
          status: 'upcoming',
        },
        {
          id: 'y1q4',
          quarter: 'Q4',
          focus: '系统稳定',
          goals: [
            '巩固所有习惯',
            '年度复盘',
            '明年规划',
          ],
          status: 'upcoming',
        },
      ],
    },
    {
      year: 2,
      theme: '构建价值体',
      color: '#6E79FF',
      icon: Target,
      description: '技能 × 内容 × 灵感',
      quarters: [
        {
          id: 'y2q1',
          quarter: 'Q1',
          focus: '技能探索',
          goals: [
            '发现核心天赋',
            '学习专业技能',
            '建立作品集',
          ],
          status: 'upcoming',
        },
        {
          id: 'y2q2',
          quarter: 'Q2',
          focus: '内容创作',
          goals: [
            '开始创作输出',
            '建立个人品牌',
            '积累受众',
          ],
          status: 'upcoming',
        },
        {
          id: 'y2q3',
          quarter: 'Q3',
          focus: '价值变现',
          goals: [
            '第一个收入项目',
            '优化变现路径',
            '扩大影响力',
          ],
          status: 'upcoming',
        },
        {
          id: 'y2q4',
          quarter: 'Q4',
          focus: '系统迭代',
          goals: [
            '优化工作流',
            '年度总结',
            '战略调整',
          ],
          status: 'upcoming',
        },
      ],
    },
    {
      year: 3,
      theme: '激活宇宙体',
      color: '#BFA36F',
      icon: Rocket,
      description: '旅居 × 收入 × 创造',
      quarters: [
        {
          id: 'y3q1',
          quarter: 'Q1',
          focus: '自由启动',
          goals: [
            '实现位置自由',
            '第一次长期旅居',
            '远程收入稳定',
          ],
          status: 'upcoming',
        },
        {
          id: 'y3q2',
          quarter: 'Q2',
          focus: '体验扩展',
          goals: [
            '探索新城市',
            '多元文化体验',
            '灵感收集',
          ],
          status: 'upcoming',
        },
        {
          id: 'y3q3',
          quarter: 'Q3',
          focus: '创造爆发',
          goals: [
            '重大作品发布',
            '收入结构优化',
            '影响力提升',
          ],
          status: 'upcoming',
        },
        {
          id: 'y3q4',
          quarter: 'Q4',
          focus: '整合升华',
          goals: [
            '生活方式成熟',
            '三年复盘',
            '新周期规划',
          ],
          status: 'upcoming',
        },
      ],
    },
  ];

  const currentProgress = 25; // Q2 of Year 1

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          className="inline-flex items-center gap-2 mb-4"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: 9999,
            ease: 'easeInOut',
          }}
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#42F5DC] to-[#BFA36F] flex items-center justify-center">
            <Map className="w-6 h-6 text-[#04070F]" />
          </div>
        </motion.div>
        <h2 className="text-3xl md:text-4xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <span className="bg-gradient-to-r from-[#42F5DC] via-[#6E79FF] to-[#BFA36F] bg-clip-text text-transparent">
            三年宇宙路径
          </span>
        </h2>
        <p className="text-[#C8A777] mb-6">从现在走到"旅居+创造+收入"</p>

        {/* Overall Progress */}
        <Card className="bg-[#0B1C26]/60 border-[#42F5DC]/30 p-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white">整体进度</span>
            <span className="text-[#42F5DC]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {currentProgress}%
            </span>
          </div>
          <Progress value={currentProgress} className="h-3" />
          <div className="text-sm text-[#C8A777] mt-3 text-center">
            正在第一年 Q2：能量优化阶段
          </div>
        </Card>
      </div>

      {/* Timeline */}
      <div className="space-y-12">
        {pathData.map((year, yearIndex) => {
          const Icon = year.icon;
          return (
            <motion.div
              key={year.year}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: yearIndex * 0.2 }}
            >
              {/* Year Header */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${year.color}20` }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-8 h-8" style={{ color: year.color }} />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-2xl" style={{ color: year.color, fontFamily: 'Space Grotesk, sans-serif' }}>
                      Year {year.year}
                    </h3>
                    <Badge
                      style={{
                        backgroundColor: `${year.color}20`,
                        color: year.color,
                        borderColor: `${year.color}40`,
                      }}
                    >
                      {year.description}
                    </Badge>
                  </div>
                  <p className="text-xl text-white">{year.theme}</p>
                </div>
              </div>

              {/* Quarters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {year.quarters.map((quarter, qIndex) => (
                  <motion.div
                    key={quarter.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: yearIndex * 0.2 + qIndex * 0.1 }}
                  >
                    <Card
                      className={`p-5 border-2 transition-all h-full ${
                        quarter.status === 'current'
                          ? 'bg-[#0B1C26]/80 border-current shadow-lg'
                          : quarter.status === 'completed'
                          ? 'bg-[#0B1C26]/40 border-[#28D5C6]/30 opacity-75'
                          : 'bg-[#0B1C26]/40 border-white/10'
                      }`}
                      style={{
                        borderColor: quarter.status === 'current' ? year.color : undefined,
                      }}
                    >
                      {/* Quarter Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="text-sm px-2 py-1 rounded"
                          style={{
                            backgroundColor: `${year.color}20`,
                            color: year.color,
                          }}
                        >
                          {quarter.quarter}
                        </div>
                        {quarter.status === 'current' && (
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [1, 0.6, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: 9999,
                              ease: 'easeInOut',
                            }}
                          >
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: year.color }}
                            />
                          </motion.div>
                        )}
                        {quarter.status === 'completed' && (
                          <div className="text-[#28D5C6]">✓</div>
                        )}
                      </div>

                      <h4 className="text-white mb-3">{quarter.focus}</h4>

                      <div className="space-y-2">
                        {quarter.goals.map((goal, gIndex) => (
                          <div
                            key={gIndex}
                            className={`text-sm ${
                              quarter.status === 'completed'
                                ? 'text-[#C8A777] line-through'
                                : 'text-[#C8A777]'
                            }`}
                          >
                            <span
                              className="inline-block w-1.5 h-1.5 rounded-full mr-2"
                              style={{
                                backgroundColor: quarter.status === 'current' ? year.color : '#C8A777',
                              }}
                            />
                            {goal}
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Principles */}
      <Card className="bg-gradient-to-r from-[#42F5DC]/10 via-[#6E79FF]/10 to-[#BFA36F]/10 border-[#42F5DC]/30 p-6">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-[#42F5DC] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-[#C8A777]">
            <span className="text-[#42F5DC]">路径原则：</span>
            循序渐进 · 不逼迫自己 · 跟随召唤 · 信任时机 · 享受过程
          </div>
        </div>
      </Card>
    </div>
  );
}
