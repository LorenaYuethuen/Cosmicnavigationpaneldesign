import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Package, ShoppingCart, AlertTriangle, CheckCircle, ArrowLeft, Home, Plus, X, Filter, SlidersHorizontal, Activity, TrendingUp } from 'lucide-react';
import { CosmicBackground } from '../components/CosmicBackground';
import { GlowLine } from '../components/GlowLine';
import { FilterPill } from '../components/FilterPill';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { itemsDatabase, categoryLabels, statusLabels, ItemCategory, ItemStatus } from '../data/items';

export function ItemsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ItemStatus | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<'high' | 'medium' | 'low' | 'all'>('all');
  const [showFilters, setShowFilters] = useState(true);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: itemsDatabase.length,
      needToBuy: itemsDatabase.filter(item => item.status === 'need-to-buy').length,
      lowStock: itemsDatabase.filter(item => item.status === 'low-stock').length,
      inStock: itemsDatabase.filter(item => item.status === 'in-stock').length,
    };
  }, []);

  // Filtered items
  const filteredItems = useMemo(() => {
    return itemsDatabase.filter(item => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      // Status filter
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;

      // Priority filter
      const matchesPriority = selectedPriority === 'all' || item.priority === selectedPriority;

      return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    });
  }, [searchQuery, selectedCategory, selectedStatus, selectedPriority]);

  const getStatusIcon = (status: ItemStatus) => {
    switch (status) {
      case 'in-stock':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'low-stock':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'out-of-stock':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'need-to-buy':
        return <ShoppingCart className="w-4 h-4 text-[#42F5DC]" />;
      case 'researching':
        return <Search className="w-4 h-4 text-[#BFA36F]" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#42F5DC';
      case 'medium':
        return '#BFA36F';
      case 'low':
        return '#FFFFFF99';
      default:
        return '#FFFFFF99';
    }
  };

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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6E79FF] to-[#42F5DC] flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl hidden sm:inline" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                物品管理数据库
              </span>
            </div>
            <motion.button
              onClick={() => window.location.hash = 'system'}
              className="text-[#C8A777] hover:text-[#42F5DC] transition-all px-3 py-2 rounded-lg hover:bg-[#42F5DC]/10 flex items-center gap-2"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hidden sm:inline">生活系统</span>
              <Activity className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-gradient-to-r from-[#6E79FF]/20 to-[#42F5DC]/20 text-[#42F5DC] border-[#6E79FF]/30 px-4 py-1.5">
            <Package className="w-3 h-3 inline mr-1" />
            物品管理系统
          </Badge>
          <h1 className="text-4xl md:text-6xl mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <span className="bg-gradient-to-r from-[#6E79FF] via-[#42F5DC] to-[#BFA36F] bg-clip-text text-transparent">
              阿卡西物品数据库
            </span>
          </h1>
          <p className="text-[#C8A777] max-w-2xl mx-auto mb-6 text-lg">
            追踪和管理日常用品库存，优化生活系统的资源分配
          </p>
          <GlowLine width="120px" className="mx-auto" />
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            { icon: Package, label: '总物品数', value: stats.total, color: 'from-[#42F5DC] to-[#BFA36F]', bgColor: 'from-[#42F5DC]/10 to-[#BFA36F]/10' },
            { icon: ShoppingCart, label: '需要购买', value: stats.needToBuy, color: 'from-[#6E79FF] to-[#42F5DC]', bgColor: 'from-[#6E79FF]/10 to-[#42F5DC]/10' },
            { icon: AlertTriangle, label: '库存不足', value: stats.lowStock, color: 'from-yellow-400 to-orange-400', bgColor: 'from-yellow-400/10 to-orange-400/10' },
            { icon: CheckCircle, label: '有库存', value: stats.inStock, color: 'from-green-400 to-emerald-400', bgColor: 'from-green-400/10 to-emerald-400/10' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-[#0B1C26]/60 to-[#0F3840]/40 border-[#28D5C6]/30 p-6 hover:border-[#42F5DC]/50 transition-all group relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon className="w-6 h-6 text-[#42F5DC] group-hover:scale-110 transition-transform" />
                    <TrendingUp className="w-4 h-4 text-[#C8A777]/50" />
                  </div>
                  <div className="text-sm text-[#C8A777] mb-2">{stat.label}</div>
                  <div className={`text-3xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-semibold`}>
                    {stat.value}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C8A777]" />
            <Input
              type="text"
              placeholder="搜索物品名称或标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 bg-gradient-to-r from-[#0B1C26]/60 to-[#0F3840]/40 border-[#28D5C6]/30 text-white placeholder:text-[#C8A777]/50 h-12 focus:border-[#42F5DC]/50 transition-colors"
            />
          </div>
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-6 py-3 rounded-xl border transition-all flex items-center gap-2 justify-center ${
              showFilters 
                ? 'bg-[#42F5DC]/20 border-[#42F5DC]/50 text-[#42F5DC]' 
                : 'bg-[#0B1C26]/40 border-[#28D5C6]/20 text-[#C8A777] hover:border-[#42F5DC]/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden sm:inline">筛选器</span>
          </motion.button>
        </div>

        {/* Filters */}
        <AnimatePresence mode="wait">
          {showFilters && (
            <motion.div 
              className="space-y-4 mb-8 bg-gradient-to-br from-[#0B1C26]/40 to-[#0F3840]/30 border border-[#28D5C6]/20 rounded-2xl p-6"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: 'top' }}
            >
              {/* Category Filter */}
              <div>
                <div className="text-sm text-[#42F5DC] mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-[#42F5DC] to-[#6E79FF] rounded-full" />
                  分类
                </div>
                <div className="flex flex-wrap gap-2">
                  <FilterPill
                    label="全部"
                    active={selectedCategory === 'all'}
                    onClick={() => setSelectedCategory('all')}
                  />
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <FilterPill
                      key={key}
                      label={label}
                      active={selectedCategory === key}
                      onClick={() => setSelectedCategory(key as ItemCategory)}
                    />
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <div className="text-sm text-[#42F5DC] mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-[#6E79FF] to-[#42F5DC] rounded-full" />
                  状态
                </div>
                <div className="flex flex-wrap gap-2">
                  <FilterPill
                    label="全部"
                    active={selectedStatus === 'all'}
                    onClick={() => setSelectedStatus('all')}
                  />
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <FilterPill
                      key={key}
                      label={label}
                      active={selectedStatus === key}
                      onClick={() => setSelectedStatus(key as ItemStatus)}
                    />
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div>
                <div className="text-sm text-[#42F5DC] mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-[#BFA36F] to-[#42F5DC] rounded-full" />
                  优先级
                </div>
                <div className="flex flex-wrap gap-2">
                  <FilterPill
                    label="全部"
                    active={selectedPriority === 'all'}
                    onClick={() => setSelectedPriority('all')}
                  />
                  <FilterPill
                    label="高"
                    active={selectedPriority === 'high'}
                    onClick={() => setSelectedPriority('high')}
                  />
                  <FilterPill
                    label="中"
                    active={selectedPriority === 'medium'}
                    onClick={() => setSelectedPriority('medium')}
                  />
                  <FilterPill
                    label="低"
                    active={selectedPriority === 'low'}
                    onClick={() => setSelectedPriority('low')}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-[#0B1C26]/60 to-[#0F3840]/40 border-[#28D5C6]/30 p-6 hover:border-[#42F5DC]/50 transition-all group relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#42F5DC]/5 to-transparent rounded-full blur-2xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg text-white group-hover:text-[#42F5DC] transition-colors">{item.name}</h3>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full shadow-lg"
                          style={{ 
                            backgroundColor: getPriorityColor(item.priority),
                            boxShadow: `0 0 8px ${getPriorityColor(item.priority)}`
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <Badge variant="outline" className="border-[#28D5C6]/30 text-[#C8A777] text-xs">
                        {categoryLabels[item.category]}
                      </Badge>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#0F3840]/50">
                        {getStatusIcon(item.status)}
                        <span className="text-xs text-[#C8A777]">
                          {statusLabels[item.status]}
                        </span>
                      </div>
                    </div>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {item.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-gradient-to-r from-[#0F3840]/60 to-[#0B1C26]/60 text-[#7CE8FF] text-xs border border-[#42F5DC]/20"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {item.notes && (
                      <p className="text-sm text-[#C8A777] mb-3 italic">{item.notes}</p>
                    )}

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#42F5DC] hover:text-[#BFA36F] transition-colors inline-flex items-center gap-1 group-hover:gap-2"
                      >
                        查看详情 
                        <span className="transition-all">→</span>
                      </a>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-[#C8A777]/50 mx-auto mb-4" />
            <p className="text-[#C8A777]">没有找到匹配的物品</p>
          </div>
        )}
      </div>
    </div>
  );
}
