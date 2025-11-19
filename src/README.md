# 🌌 Lorena Manifestation OS

> 一个融合莫比乌斯带连续性、阴阳二元性和阿卡西回路的宇宙导航面板

## 📖 项目概述

Lorena Manifestation OS 是一个宇宙主题的个人生活系统管理平台，整合了**Universe Life Map**（宇宙生命地图）和完整的**阿卡西记录生活系统矩阵**，旨在通过视觉化的界面帮助用户导航人生、管理资源、追踪目标并实现自我显化。

### 核心理念

- **莫比乌斯带连续性**：循环不息的能量流动
- **阴阳二元性**：平衡物质与精神、行动与休息
- **阿卡西回路**：记录、追踪和优化生活系统
- **宇宙美学**：空灵、流动、有呼吸感的设计

---

## 🎨 设计系统

### 配色方案
```css
主色调 - 青绿色宇宙美学：
  #42F5DC - 主要青色（Primary Cyan）
  #28D5C6 - 深青色（Deep Cyan）
  #6E79FF - 紫罗兰蓝（Violet Blue）
  #BFA36F - 金棕色（Golden Bronze）

辅助色：
  #04070F - 深空背景（Deep Space Background）
  #0B1C26 - 深海蓝背景（Deep Sea Blue）
  #0F3840 - 中性海蓝（Neutral Sea Blue）
  #C8A777 - 柔和金色（Soft Gold）
  #7CE8FF - 亮青色（Bright Cyan）
```

### 字体系统
- **标题/界面**：Space Grotesk（现代科技感）
- **装饰/引用**：Cormorant Garamond（优雅衬线）

### 视觉特效
- ✨ 星空粒子场（ParticleField）
- 🌊 网格叠加层（GridOverlay）
- 💫 环境光效（AmbientLights）
- 🎯 鼠标跟随器（MouseFollower）
- 🌌 宇宙背景（CosmicBackground）
- 💨 渐变发光线（GlowLine）

---

## 🗺️ 系统架构

### 三大核心页面

#### 1️⃣ 宇宙地图（Universe Life Map）
**路径**: `/#home`

**核心组件**：
- **HeroSection**：欢迎区域，展示系统标题和核心理念
- **SystemStatus**：系统状态指标，实时显示能量、时间、金钱等资源状态
- **MobiusMantra**：莫比乌斯咒语中心，展示核心信念和理念
- **FlowingQuadrants**：四大象限卡片系统
  - 🌌 **Space**（空间）：物理环境与空间管理
  - 🧘 **Body**（身体）：身体健康与运动系统
  - ✨ **Inspiration**（灵感）：创意与灵感源泉
  - 📅 **Daily Flow**（日常流动）：日常习惯与流程
- **FooterRules**：页脚规则和引用

**特色**：
- 3D视差效果（perspective: 1200px）
- 分层 transform-3d 效果
- 响应式四象限布局

---

#### 2️⃣ 生活系统矩阵（Akashic Life System Matrix）
**路径**: `/#system`

**6个功能标签页**：

##### 📍 Tab 1: 显化面板（Dashboard）
**组件**: `ManifestationEngine`

功能：
- 设定显化意图（Intention Setting）
- 能量对齐追踪（Energy Alignment）
- 行动步骤规划（Action Steps）
- 实时显化进度条
- 宇宙能量可视化

##### ⚡ Tab 2: 能量扫描（Energy Scan）
**组件**: `EnergyScanButton`

功能：
- 今日能量状态扫描
- Physical/Mental/Social 三维能量评估
- 实时动画扫描效果
- 能量建议和优化方向
- 历史能量趋势

##### 📖 Tab 3: 阿卡西日志（Akashic Logger）
**组件**: `AkashicLogger`

功能：
- 每日生活记录生成器
- 模板化日志系统
- 情绪、事件、反思三维记录
- 自动时间戳标记
- 日志历史查看

##### 🏃 Tab 4: 身体频率（Body Frequency）
**组件**: `BodyFrequency`

功能：
- 五频率运动系统：
  - 力量训练（Strength）
  - 攀岩（Climbing）
  - 游泳（Swimming）
  - 有氧运动（Cardio）
  - 瑜伽/拉伸（Yoga/Stretch）
- 每周运动计划追踪
- 运动强度可视化
- 身体指标监控

##### 🗺️ Tab 5: 三年路径（Three Year Path）
**组件**: `ThreeYearPath`

功能：
- 2025-2027 宇宙路径规划
- 年度目标分解
- 季度里程碑设置
- 进度可视化时间轴
- 阶段性成果追踪

##### 🧬 Tab 6: 系统基础（Core System）
展示系统架构总览：

**三大系统层级**：
- **第一层：身体仪器** - 习惯与维护
  - 爱服美役（好心情系统）
  - 运动习惯（内啡肽系统）
  - 饮食习惯（燃料系统）
  - 作息 Routine（地基系统）
  
- **第二层：心智体验** - 爱好与创造
  - 听觉系统（音乐、播客）
  - 视觉系统（摄影、电影）
  - 书写/阅读系统（知识构建）
  - 嗅觉系统（香氛、感官）
  
- **第三层：居住环境** - WABI-SABI 庇护所
  - 阶段一：生存与安抚（10k-20k）
  - 阶段二：品质提升（20k-40k）
  - 阶段三：梦想实现（40k+）

**核心公式**：
```
精力 × (时间 / 爱好) × 金钱 = 体验
```

**系统运行机制**：
- 精力（P/M/S 三维）
- 时间（168h/周可支配）
- 金钱（资源配置）
- 体验（生活质量输出）

---

#### 3️⃣ 物品管理数据库（Items Management Database）
**路径**: `/#items`

**核心功能**：
- 📦 综合物品清单（30+ 项目）
- 🔍 智能搜索与过滤系统
- 📊 库存状态实时追踪
- 🏷️ 多维度标签分类
- 📈 统计数据面板

**分类系统**：
- 个人护理（Personal Care）
- 护肤品（Skincare）
- 彩妆（Makeup）
- 卫生用品（Hygiene）
- 家居用品（Household）
- 科技配件（Tech Accessories）
- 营养补充（Supplements）
- 服装（Clothing）
- 其他（Other）

**状态追踪**：
- ✅ 有库存（In Stock）
- ⚠️ 库存不足（Low Stock）
- ❌ 缺货（Out of Stock）
- 🛒 需要购买（Need to Buy）
- 🔬 研究中（Researching）

**优先级系统**：
- 🔴 高优先级（High Priority）
- 🟡 中优先级（Medium Priority）
- ⚪ 低优先级（Low Priority）

---

## 🎯 核心组件详解

### 背景与特效组件

#### CosmicBackground
宇宙星空背景，使用渐变和动画营造深空效果。

#### GridOverlay
网格叠加层，提供科技感的网格线条。

#### ParticleField
粒子场效果，模拟宇宙中的星尘和能量流动。

#### AmbientLights
环境光效，创造动态光影和氛围。

#### MouseFollower
鼠标跟随器，增强交互感和沉浸体验。

---

### 导航组件

#### ModernNav
现代化导航栏系统，包含：
- 响应式设计（桌面/移动端）
- 汉堡菜单（移动端）
- 页面路由管理
- 平滑过渡动画

**导航链接**：
- 🌌 宇宙地图（Universe Map）
- 📊 生活系统（Life System）
- 📦 物品管理（Items）

---

### 首页核心组件

#### HeroSection
欢迎英雄区：
- 主标题：Lorena Manifestation OS
- 副标题：宇宙导航 · 阿卡西记录 · 生活显化
- 动画发光线装饰

#### SystemStatus
系统状态指标卡片：
- 实时资源监控
- 动态数据可视化
- 悬停交互效果
- 渐变色彩编码

#### MobiusMantra
莫比乌斯咒语中心：
- 中心信念展示
- 旋转动画效果
- 能量流动可视化

#### FlowingQuadrants
流动四象限系统：
- Space（空间）
- Body（身体）
- Inspiration（灵感）
- Daily Flow（日常）
- 点击导航至生活系统对应模块

#### FooterRules
页脚规则区域：
- 核心原则展示
- 版权信息
- 链接和引用

---

### 生活系统核心组件

#### ManifestationEngine
显化引擎：
- 意图设定界面
- 能量对齐追踪
- 行动步骤管理
- 进度可视化
- 宇宙能量流动动画

#### EnergyScanButton
能量扫描器：
- 今日能量评估
- Physical/Mental/Social 三维分析
- 扫描动画效果
- 能量优化建议
- 交互式结果展示

#### AkashicLogger
阿卡西日志生成器：
- 模板化日志创建
- 情绪追踪
- 事件记录
- 反思笔记
- 时间戳自动生成

#### ThreeYearPath
三年路径规划：
- 2025-2027 时间轴
- 年度目标设定
- 季度里程碑
- 进度追踪
- 可视化路径图

#### BodyFrequency
五频率运动系统：
- 力量训练追踪
- 攀岩记录
- 游泳日志
- 有氧运动
- 瑜伽/拉伸
- 每周运动计划
- 身体数据可视化

#### InspirationSystem
灵感源栈（未来功能）：
- 灵感收集
- 创意管理
- 项目孵化

---

### UI基础组件

#### ModernCard
现代化卡片组件：
- 渐变背景
- 边框发光效果
- 悬停动画
- 响应式布局

#### QuadrantCard
象限卡片组件：
- 四象限专用
- 图标 + 标题 + 描述
- 点击导航功能

#### FilterPill
过滤药丸按钮：
- 激活/非激活状态
- 平滑过渡动画
- 渐变色彩

#### GlowLine
发光分割线：
- 自定义宽度
- 渐变色彩
- 动画效果

#### StatsBar
统计条组件：
- 数据可视化
- 进度条效果
- 动态更新

---

## 📂 文件结构

```
/
├── App.tsx                          # 主应用入口，路由管理
├── README.md                        # 项目文档（本文件）
├── Attributions.md                  # 资源归属说明
│
├── components/                      # 组件目录
│   ├── AkashicLogger.tsx           # 阿卡西日志生成器
│   ├── AmbientLights.tsx           # 环境光效组件
│   ├── BodyFrequency.tsx           # 五频率运动系统
│   ├── CosmicBackground.tsx        # 宇宙背景组件
│   ├── EnergyScanButton.tsx        # 能量扫描器
│   ├── FilterPill.tsx              # 过滤药丸按钮
│   ├── FlowingQuadrants.tsx        # 流动四象限
│   ├── FooterRules.tsx             # 页脚规则
│   ├── GlowLine.tsx                # 发光分割线
│   ├── GridOverlay.tsx             # 网格叠加层
│   ├── HeroSection.tsx             # 英雄区组件
│   ├── InspirationSystem.tsx       # 灵感系统（未来）
│   ├── ManifestationEngine.tsx     # 显化引擎
│   ├── MobiusMantra.tsx            # 莫比乌斯咒语
│   ├── ModernCard.tsx              # 现代化卡片
│   ├── ModernNav.tsx               # 现代导航栏
│   ├── MouseFollower.tsx           # 鼠标跟随器
│   ├── ParallaxSection.tsx         # 视差滚动区域
│   ├── ParticleField.tsx           # 粒子场效果
│   ├── QuadrantCard.tsx            # 象限卡片
│   ├── StatsBar.tsx                # 统计条
│   ├── SystemStatus.tsx            # 系统状态指标
│   ├── ThreeYearPath.tsx           # 三年路径规划
│   │
│   ├── figma/                      # Figma 相关组件
│   │   └── ImageWithFallback.tsx  # 图片回退组件（受保护）
│   │
│   └── ui/                         # ShadCN UI 组件库
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       ├── tooltip.tsx
│       ├── use-mobile.ts
│       └── utils.ts
│
├── pages/                          # 页面目录
│   ├── LifeSystemPage.tsx         # 生活系统矩阵页面
│   └── ItemsPage.tsx              # 物品管理页面
│
├── data/                           # 数据目录
│   └── items.ts                   # 物品数据库
│
├── styles/                         # 样式目录
│   └── globals.css                # 全局样式、Tailwind配置
│
└── guidelines/                     # 指南目录
    └── Guidelines.md              # 开发指南
```

---

## 🔧 技术栈

### 核心框架
- **React 18+**：组件化UI框架
- **TypeScript**：类型安全
- **Vite**：现代化构建工具

### 样式系统
- **Tailwind CSS v4.0**：实用优先的CSS框架
- **自定义CSS变量**：统一设计系统

### 动画库
- **Motion (Framer Motion)**：强大的React动画库
  - 所有动画使用 `repeat: 9999` 避免 `Infinity` 错误
  - 平滑过渡和手势动画

### UI组件库
- **ShadCN UI**：高质量React组件集合
- **Lucide React**：现代图标库
- **Recharts**：图表可视化（未来功能）

### 路由
- **Hash-based Routing**：使用 `window.location.hash` 实现客户端路由

---

## 🎭 交互设计特性

### 动画系统
- ✨ 页面加载淡入效果
- 🌊 悬停状态过渡动画
- 💫 点击反馈缩放效果
- 🔄 无限循环旋转动画（9999次）
- 📐 3D视差效果

### 响应式设计
- 📱 移动端优先（Mobile First）
- 💻 桌面端优化
- 🔀 自适应布局
- 📏 弹性网格系统

### 交互反馈
- 🎯 鼠标跟随光效
- ✋ 悬停高亮
- 👆 点击波纹效果
- 🔊 视觉状态反馈

---

## 🌟 核心功能矩阵

| 功能模块 | 状态 | 描述 |
|---------|------|------|
| 宇宙地图 | ✅ 完成 | 首页核心四象限系统 |
| 系统状态 | ✅ 完成 | 资源实时监控 |
| 显化引擎 | ✅ 完成 | 意图设定与行动规划 |
| 能量扫描 | ✅ 完成 | 今日能量评估系统 |
| 阿卡西日志 | ✅ 完成 | 每日生活记录生成器 |
| 身体频率 | ✅ 完成 | 五频率运动追踪系统 |
| 三年路径 | ✅ 完成 | 2025-2027宇宙路径规划 |
| 物品管理 | ✅ 完成 | 30+物品数据库管理 |
| 系统基础 | ✅ 完成 | 三层系统架构展示 |
| 灵感源栈 | 🔄 规划中 | 创意收集与孵化系统 |

---

## 📊 数据模型

### 物品数据模型
```typescript
interface Item {
  id: string;                    // 唯一标识
  name: string;                  // 物品名称
  category: ItemCategory;        // 分类
  status: ItemStatus;            // 状态
  priority: 'high' | 'medium' | 'low';  // 优先级
  notes?: string;                // 备注
  link?: string;                 // 相关链接
  tags?: string[];               // 标签
}
```

### 能量评估模型
```typescript
interface EnergyAssessment {
  physical: number;    // 体能（0-100）
  mental: number;      // 心智（0-100）
  social: number;      // 社交（0-100）
  timestamp: Date;     // 评估时间
}
```

### 显化意图模型
```typescript
interface ManifestationIntention {
  intention: string;       // 意图描述
  energyAlignment: number; // 能量对齐度（0-100）
  actionSteps: string[];   // 行动步骤
  progress: number;        // 进度（0-100）
  createdAt: Date;        // 创建时间
}
```

---

## 🚀 开发指南

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

---

## ��� 设计参考

### 美学灵感
- **ORION**：现代科技美学
- **X-AI**：流动、空灵的界面设计
- **宇宙主题**：星空、光效、粒子
- **Wabi-Sabi**：侘寂美学的平静与自然

### 交互参考
- **Apple**：精致的动画细节
- **Linear**：流畅的页面过渡
- **Stripe**：渐变与光效运用

---

## 🔮 未来规划

### Phase 1: 基础系统（✅ 已完成）
- ✅ 宇宙地图首页
- ✅ 生活系统矩阵 6 大模块
- ✅ 物品管理数据库
- ✅ 响应式设计
- ✅ 动画系统优化

### Phase 2: 数据持久化（🔄 规划中）
- 📦 本地存储集成
- ☁️ Supabase 云端同步（可选）
- 💾 数据导入/导出功能
- 📊 历史数据追踪

### Phase 3: 高级功能（🔮 未来）
- 📈 数据可视化仪表板
- 📅 日历集成
- 🔔 提醒与通知系统
- 🤖 AI 助手集成
- 📱 PWA 移动应用
- 🔗 第三方服务集成

### Phase 4: 社区功能（🌈 愿景）
- 👥 用户分享与交流
- 📚 模板市场
- 🎓 知识库与教程
- 🏆 成就系统

---

## 📝 开发注意事项

### Motion动画库
⚠️ **重要**：所有 `motion` 动画必须使用 `repeat: 9999` 代替 `repeat: Infinity`，以避免 "iterationCount must be non-negative" 错误。

```tsx
// ✅ 正确
<motion.div
  animate={{ rotate: 360 }}
  transition={{ repeat: 9999, duration: 2 }}
/>

// ❌ 错误
<motion.div
  animate={{ rotate: 360 }}
  transition={{ repeat: Infinity, duration: 2 }}
/>
```

### 受保护文件
以下文件为系统文件，禁止修改或覆盖：
- `/components/figma/ImageWithFallback.tsx`

### Tailwind CSS
- 不要使用字体大小类（如 `text-2xl`），除非用户特别要求
- 不要使用字体粗细类（如 `font-bold`），除非用户特别要求
- 不要使用行高类（如 `leading-none`），除非用户特别要求
- 全局字体样式已在 `/styles/globals.css` 中定义

---

## 🙏 致谢

本项目设计与开发过程中参考了：
- **ORION** 和 **X-AI** 的现代科技美学
- **ShadCN UI** 组件库的优秀设计
- **Motion (Framer Motion)** 强大的动画能力
- **Tailwind CSS** 实用优先的设计哲学

---

## 📜 版本历史

### v2.0.0 - 2025-01-19
- ✅ 完成生活系统矩阵 6 大交互模块
- ✅ 修复所有 motion 动画库错误
- ✅ 优化响应式布局
- ✅ 完善物品管理数据库

### v1.0.0 - 2025-01-15
- 🎉 初始版本发布
- ✨ 宇宙地图首页
- 📊 生活系统基础架构
- 📦 物品管理系统

---

## 📧 联系方式

**项目名称**：Lorena Manifestation OS  
**版本**：v2.0.0  
**最后更新**：2025-01-19  

---

<div align="center">

### ✨ 愿你的显化之旅，星光璀璨 ✨

**Lorena Universe OS** · 宇宙导航 · 阿卡西记录 · 生活显化

---

Made with 💫 and ✨ by Lorena

</div>
