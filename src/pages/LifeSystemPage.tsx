import { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Dumbbell, Heart, Home, DollarSign, CheckCircle2, Target, Clock, Zap, Music, Camera, BookOpen, Sparkles, Package, ArrowLeft, TrendingUp, Activity, Map, Calendar } from 'lucide-react';
import { CosmicBackground } from '../components/CosmicBackground';
import { GlowLine } from '../components/GlowLine';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Progress } from '../components/ui/progress';
import { EnergyScanButton } from '../components/EnergyScanButton';
import { ManifestationEngine } from '../components/ManifestationEngine';
import { AkashicLogger } from '../components/AkashicLogger';
import { ThreeYearPath } from '../components/ThreeYearPath';
import { BodyFrequency } from '../components/BodyFrequency';
import { SystemDashboard } from '../components/SystemDashboard';
import { useLifeSystem } from '../contexts/LifeSystemContext';

export function LifeSystemPage() {
  // Check if there's a hash for initial tab (e.g., #system#body)
  const getInitialTab = () => {
    const hash = window.location.hash;
    const match = hash.match(/#system#(\w+)/);
    return match ? match[1] : 'dashboard';
  };
  
  const [activeTab, setActiveTab] = useState(getInitialTab());

  return (
    <div className="min-h-screen bg-[#04070F] text-white relative overflow-x-hidden">
      <CosmicBackground />

      {/* Navigation Bar */}
      <nav className="relative z-20 border-b border-[#28D5C6]/20 bg-[#04070F]/95 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => window.location.hash = 'home'}
              className="flex items-center gap-2 text-[#C8A777] hover:text-[#42F5DC] transition-all px-3 py-2 rounded-lg hover:bg-[#42F5DC]/10"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">返回宇宙地图</span>
            </motion.button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#42F5DC] to-[#28D5C6] flex items-center justify-center">
                <Layers className="w-5 h-5 text-[#04070F]" />
              </div>
              <span className="text-xl hidden sm:inline" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                生活系统矩阵
              </span>
            </div>
            <motion.button
              onClick={() => window.location.hash = 'items'}
              className="text-[#C8A777] hover:text-[#42F5DC] transition-all px-3 py-2 rounded-lg hover:bg-[#42F5DC]/10 flex items-center gap-2"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hidden sm:inline">物品管理</span>
              <Package className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-gradient-to-r from-[#42F5DC]/20 to-[#6E79FF]/20 text-[#42F5DC] border-[#42F5DC]/30 px-4 py-1.5">
            <Activity className="w-3 h-3 inline mr-1" />
            Available
          </Badge>
          <h1 className="text-4xl md:text-6xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            阿卡西记录 V2.0
          </h1>
          <h2 className="text-3xl md:text-5xl mb-6">
            <span className="bg-gradient-to-r from-[#42F5DC] via-[#6E79FF] to-[#BFA36F] bg-clip-text text-transparent">
              生活系统矩阵
            </span>
          </h2>
          <p className="text-[#C8A777] max-w-2xl mx-auto mb-8 text-lg">
            全交互式宇宙导航系统 · 每日能量扫描 · 显化引擎 · 阿卡西日志 · 三年路径图
          </p>
          <GlowLine width="120px" className="mx-auto mb-12" />

          {/* Core Resources */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              { icon: Clock, title: '时间', desc: 'Time', value: '168h', color: 'from-[#42F5DC] to-[#28D5C6]' },
              { icon: DollarSign, title: '金钱', desc: 'Money', value: '优化中', color: 'from-[#6E79FF] to-[#42F5DC]' },
              { icon: Zap, title: '精力', desc: 'Energy', value: '85%', color: 'from-[#BFA36F] to-[#6E79FF]' },
              { icon: Target, title: '关联', desc: 'Synergy', value: 'Active', color: 'from-[#28D5C6] to-[#BFA36F]' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-[#0B1C26]/60 to-[#0F3840]/40 border-[#28D5C6]/30 p-6 text-center hover:border-[#42F5DC]/50 transition-all group relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <item.icon className="w-10 h-10 text-[#42F5DC] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white mb-1 text-lg">{item.title}</h4>
                  <p className="text-xs text-[#C8A777] mb-2">{item.desc}</p>
                  <div className={`text-sm bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-semibold`}>
                    {item.value}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full md:w-auto mb-8 bg-[#0B1C26] border border-[#28D5C6]/20 p-1 flex-wrap justify-center gap-1">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              显化面板
            </TabsTrigger>
            <TabsTrigger value="energy" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              能量扫描
            </TabsTrigger>
            <TabsTrigger value="akashic" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              阿卡西日志
            </TabsTrigger>
            <TabsTrigger value="frequency" className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4" />
              身体频率
            </TabsTrigger>
            <TabsTrigger value="path" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              三年路径
            </TabsTrigger>
            <TabsTrigger value="core" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              系统基础
            </TabsTrigger>
          </TabsList>

          {/* Tab: Dashboard - Manifestation Engine */}
          <TabsContent value="dashboard" className="space-y-8">
            <ManifestationEngine />
          </TabsContent>

          {/* Tab: Energy Scan */}
          <TabsContent value="energy" className="space-y-8">
            <div className="max-w-3xl mx-auto">
              <EnergyScanButton />
            </div>
          </TabsContent>

          {/* Tab: Akashic Logger */}
          <TabsContent value="akashic" className="space-y-8">
            <AkashicLogger />
          </TabsContent>

          {/* Tab: Body Frequency */}
          <TabsContent value="frequency" className="space-y-8">
            <BodyFrequency />
          </TabsContent>

          {/* Tab: Three Year Path */}
          <TabsContent value="path" className="space-y-8">
            <ThreeYearPath />
          </TabsContent>

          {/* Tab: Core System */}
          <TabsContent value="core" className="space-y-8">
            <SystemDashboard />
          </TabsContent>

          {/* Tab 1: Body System */}
          <TabsContent value="body" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <span className="bg-gradient-to-r from-[#42F5DC] to-[#BFA36F] bg-clip-text text-transparent">
                  第一层：身体仪器 - 习惯与维护
                </span>
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="beauty" className="bg-[#0B1C26]/40 border border-[#28D5C6]/20 rounded-2xl px-6">
                <AccordionTrigger className="text-[#42F5DC] hover:no-underline">
                  <div className="flex items-center gap-4">
                    <Sparkles className="w-6 h-6" />
                    <span className="text-xl">爱服美役 - 好心情系统</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="space-y-4 text-[#C8A777]">
                    <div>
                      <div className="text-white mb-2">预算分配</div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>• 爱：5000 RMB (按摩/spa/情绪关系维护)</div>
                        <div>• 服：5000 RMB (衣服/鞋子)</div>
                        <div>• 美：5000 RMB (护肤/彩妆/理发/美甲/皮肤管理)</div>
                        <div>• 役：5000 RMB (家政/保洁)</div>
                      </div>
                    </div>
                    <p className="italic text-[#42F5DC] pt-4 border-t border-[#28D5C6]/20">
                      核心关联：心情愉悦 → 多巴胺分泌 → 行动力提升 → 执行力增强
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="exercise" className="bg-[#0B1C26]/40 border border-[#28D5C6]/20 rounded-2xl px-6">
                <AccordionTrigger className="text-[#42F5DC] hover:no-underline">
                  <div className="flex items-center gap-4">
                    <Dumbbell className="w-6 h-6" />
                    <span className="text-xl">运动习惯 - 正反馈内啡肽激素系统</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="space-y-4 text-[#C8A777]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          name: '力量训练',
                          time: '1.5h/次, 3-4次/周',
                          money: '120 RMB/月 (健身房)',
                          energy: 'P-, M+, S-',
                        },
                        {
                          name: '攀岩',
                          time: '2h/次, 1次/周',
                          money: '200 RMB/月',
                          energy: 'P-, M++, S+',
                        },
                        {
                          name: '游泳',
                          time: '1h/次, 1-2次/周',
                          money: '包含在健身房',
                          energy: 'P-, M+, S-',
                        },
                        {
                          name: '有氧 (坡走/慢跑)',
                          time: '30-45min, 2-3次/周',
                          money: '0 RMB',
                          energy: 'P-, M+, S-',
                        },
                      ].map((exercise) => (
                        <Card key={exercise.name} className="bg-[#0F3840]/40 border-[#28D5C6]/20 p-4">
                          <h4 className="text-white mb-2">{exercise.name}</h4>
                          <div className="space-y-1 text-sm">
                            <div>⏱ {exercise.time}</div>
                            <div>💰 {exercise.money}</div>
                            <div>⚡ {exercise.energy}</div>
                          </div>
                        </Card>
                      ))}
                    </div>
                    <p className="italic text-[#42F5DC] pt-4 border-t border-[#28D5C6]/20">
                      核心关联：内啡肽分泌 → 情绪稳定 → 自信提升 → 身体健康
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="diet" className="bg-[#0B1C26]/40 border border-[#28D5C6]/20 rounded-2xl px-6">
                <AccordionTrigger className="text-[#42F5DC] hover:no-underline">
                  <div className="flex items-center gap-4">
                    <Target className="w-6 h-6" />
                    <span className="text-xl">饮食习惯 - 精妙仪器燃料系统</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="space-y-4 text-[#C8A777]">
                    <div>
                      <div className="text-white mb-2">营养学知识需求</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>• 蛋白质摄入量与时机</div>
                        <div>• 碳水化合物选择</div>
                        <div>• 脂肪来源与比例</div>
                        <div>• 维生素与矿物质补充</div>
                        <div>• 水分摄入量</div>
                        <div>• 餐次安排</div>
                      </div>
                    </div>
                    <p className="italic text-[#42F5DC] pt-4 border-t border-[#28D5C6]/20">
                      核心关联：优质燃料 → 稳定能量 → 大脑清晰 → 高效产出
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="routine" className="bg-[#0B1C26]/40 border border-[#28D5C6]/20 rounded-2xl px-6">
                <AccordionTrigger className="text-[#42F5DC] hover:no-underline">
                  <div className="flex items-center gap-4">
                    <Clock className="w-6 h-6" />
                    <span className="text-xl">作息Routine - 精妙仪器地基系统</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="space-y-4 text-[#C8A777]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-white mb-2">睡眠</div>
                        <div>• 22:30-23:00 入睡</div>
                        <div>• 7-8小时睡眠</div>
                        <div>• 午休 20-30 分钟</div>
                      </div>
                      <div>
                        <div className="text-white mb-2">大脑训练</div>
                        <div>• 冥想 10-20 分钟</div>
                        <div>• 阅读 30-60 分钟</div>
                        <div>• 写作/思考 20-30 分钟</div>
                      </div>
                    </div>
                    <p className="italic text-[#42F5DC] pt-4 border-t border-[#28D5C6]/20">
                      核心关联：优质睡眠 → 大脑修复 → 精力充沛 → 高效运转
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Tab 2: Mind System */}
          <TabsContent value="mind" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <span className="bg-gradient-to-r from-[#42F5DC] to-[#BFA36F] bg-clip-text text-transparent">
                  第二层：心智体验 - 爱好与创造
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Music,
                  title: '听觉系统 - 滋养频率',
                  items: ['音乐欣赏', '播客学习', '有声书', '冥想音频'],
                  goal: '通过声音滋养心灵，调节情绪频率',
                },
                {
                  icon: Camera,
                  title: '视觉系统 - 美学感知',
                  items: ['摄影', '电影', '艺术展览', '设计欣赏'],
                  goal: '通过视觉输入提升审美，培养创造力',
                },
                {
                  icon: BookOpen,
                  title: '书写/阅读系统 - 知识构建',
                  items: ['阅读', '写作', '笔记整理', '知识管理'],
                  goal: '通过文字输入输出，构建知识体系',
                },
                {
                  icon: Sparkles,
                  title: '嗅觉系统 - 感官探索',
                  items: ['香氛', '精油', '自然气味', '烹饪香气'],
                  goal: '通过嗅觉唤醒记忆，提升生活质感',
                },
              ].map((system) => (
                <Card key={system.title} className="bg-[#0B1C26]/40 border-[#28D5C6]/20 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <system.icon className="w-8 h-8 text-[#42F5DC]" />
                    <h3 className="text-xl text-white">{system.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {system.items.map((item) => (
                      <div key={item} className="text-[#C8A777]">• {item}</div>
                    ))}
                    <p className="text-sm text-[#42F5DC] italic pt-3 border-t border-[#28D5C6]/20">
                      {system.goal}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab 3: Home Environment */}
          <TabsContent value="home" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <span className="bg-gradient-to-r from-[#42F5DC] to-[#BFA36F] bg-clip-text text-transparent">
                  第三层：居住环境 - WABI-SABI 庇护所
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  stage: '阶段一',
                  title: '生存与安抚',
                  income: '月收入 10k-20k',
                  actions: ['整理现有空间', '购买必需品', '建立基础美感'],
                },
                {
                  stage: '阶段二',
                  title: '品质提升',
                  income: '月收入 20k-40k',
                  actions: ['升级家具', '增加美学元素', '优化空间布局'],
                },
                {
                  stage: '阶段三',
                  title: '梦想实现',
                  income: '月收入 40k+',
                  actions: ['理想家具配置', '艺术品收藏', '完整美学体系'],
                },
              ].map((phase) => (
                <Card key={phase.stage} className="bg-[#0B1C26]/40 border-[#28D5C6]/20 p-6">
                  <div className="text-[#42F5DC] mb-2">{phase.stage}</div>
                  <h3 className="text-xl text-white mb-2">{phase.title}</h3>
                  <div className="text-sm text-[#BFA36F] mb-4">{phase.income}</div>
                  <div className="space-y-2 text-[#C8A777]">
                    {phase.actions.map((action) => (
                      <div key={action}>• {action}</div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <Card className="bg-[#0B1C26]/40 border-[#28D5C6]/20 p-6">
              <h3 className="text-2xl text-[#42F5DC] mb-4">理想环境构成</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#C8A777]">
                <div>
                  <h4 className="text-white mb-2">空间美学</h4>
                  <div>• Wabi-Sabi 美学风格</div>
                  <div>• 自然光线充足</div>
                  <div>• 植物与自然元素</div>
                  <div>• 简约而有质感</div>
                </div>
                <div>
                  <h4 className="text-white mb-2">功能配置</h4>
                  <div>• 工作区域独立</div>
                  <div>• 休息区域舒适</div>
                  <div>• 运动空间充足</div>
                  <div>• 储物系统完善</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab 4: System Matrix */}
          <TabsContent value="matrix" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <span className="bg-gradient-to-r from-[#42F5DC] to-[#BFA36F] bg-clip-text text-transparent">
                  系统矩阵 - 资源配置总览
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-[#0B1C26]/40 border-[#28D5C6]/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-8 h-8 text-[#42F5DC]" />
                  <h3 className="text-xl text-white">【金钱】模块</h3>
                </div>
                <div className="space-y-3 text-[#C8A777]">
                  <div>• 爱服美役: 20,000/年</div>
                  <div>• 学习成长: 10,000/年</div>
                  <div>• 旅居体验: 30,000/年</div>
                  <div>• 居住环境: 按阶段</div>
                  <div>• 储蓄投资: 收入20-30%</div>
                </div>
              </Card>

              <Card className="bg-[#0B1C26]/40 border-[#28D5C6]/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-8 h-8 text-[#42F5DC]" />
                  <h3 className="text-xl text-white">【时间 & 精力】模块</h3>
                </div>
                <div className="space-y-3 text-[#C8A777]">
                  <div>• 工作: 8h × 5天/周</div>
                  <div>• 运动: 7-10h/周</div>
                  <div>• 学习: 5-7h/周</div>
                  <div>• 爱好: 5-10h/周</div>
                  <div>• 休息: 充足睡眠+自由时间</div>
                </div>
              </Card>

              <Card className="bg-[#0B1C26]/40 border-[#28D5C6]/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-[#42F5DC]" />
                  <h3 className="text-xl text-white">【爱好】模块</h3>
                </div>
                <div className="space-y-3 text-[#C8A777]">
                  <div>• 听觉: 音乐/播客</div>
                  <div>• 视觉: 摄影/电影/艺术</div>
                  <div>• 书写: 阅读/写作/笔记</div>
                  <div>• 嗅觉: 香氛/烹饪</div>
                  <div>• 创造: 设计/创作</div>
                </div>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-[#0F3840]/60 to-[#0B1C26]/60 border-2 border-[#42F5DC]/30 p-8 text-center">
              <div className="text-3xl md:text-4xl text-[#42F5DC] font-mono mb-4">
                精力 × (时间 / 爱好) × 金钱 = 体验
              </div>
              <p className="text-[#C8A777]">
                优化每个变量，最大化人生体验质量
              </p>
            </Card>
          </TabsContent>

          {/* Tab 5: MVP Protocol */}
          <TabsContent value="mvp" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <span className="bg-gradient-to-r from-[#42F5DC] to-[#BFA36F] bg-clip-text text-transparent">
                  MVP 协议 - Flex-Integration Protocol
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-[#0B1C26]/40 border-[#28D5C6]/20 p-6">
                <h3 className="text-2xl text-[#42F5DC] mb-4">工作日流程</h3>
                <div className="space-y-3 text-[#C8A777]">
                  <div>06:30-07:00 起床/洗漱</div>
                  <div>07:00-08:00 运动/冥想</div>
                  <div>08:00-09:00 早餐/准备</div>
                  <div>09:00-18:00 工作时间</div>
                  <div>18:00-19:00 晚餐/休息</div>
                  <div>19:00-21:00 学习/爱好</div>
                  <div>21:00-22:30 自由时间/放松</div>
                  <div>22:30-23:00 睡前准备</div>
                </div>
              </Card>

              <Card className="bg-[#0B1C26]/40 border-[#28D5C6]/20 p-6">
                <h3 className="text-2xl text-[#42F5DC] mb-4">周末流程</h3>
                <div className="space-y-3 text-[#C8A777]">
                  <div>08:00-09:00 自然醒/早餐</div>
                  <div>09:00-12:00 深度学习/项目</div>
                  <div>12:00-13:00 午餐</div>
                  <div>13:00-15:00 运动/户外</div>
                  <div>15:00-18:00 爱好/创作</div>
                  <div>18:00-19:00 晚餐</div>
                  <div>19:00-22:00 自由安排</div>
                  <div>22:00-23:00 整理/计划</div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: '灵活性原则',
                  desc: '不是严格遵守时间表，而是理解每个时间段的目标和意义',
                },
                {
                  title: '优先级原则',
                  desc: '精力最好时做最重要的事，低精力时做低负荷任务',
                },
                {
                  title: '平衡原则',
                  desc: '工作、运动、学习、爱好、休息的动态平衡',
                },
              ].map((principle) => (
                <Card key={principle.title} className="bg-[#0B1C26]/40 border-[#28D5C6]/20 p-6">
                  <h4 className="text-xl text-[#42F5DC] mb-3">{principle.title}</h4>
                  <p className="text-[#C8A777]">{principle.desc}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#28D5C6]/20 text-center">
          <p className="text-[#C8A777] mb-4">
            从驾驶员到总设计师的进化之路
          </p>
          <div className="text-[#42F5DC] italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            "System is not rigid, life is fluid."
          </div>
        </div>
      </div>
    </div>
  );
}