'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, SortDesc, Calendar, Tag, Cpu, Star, Eye, TrendingUp, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectGrid from '@/components/ProjectGrid';
import { mockProjects } from '@/data/mockProjects';

const allTags = Array.from(
  new Set(mockProjects.flatMap(project => project.tags))
);

const allModels = Array.from(
  new Set(mockProjects.flatMap(project => 
    project.replays.map(replay => replay.model)
  ))
);

// 热门标签（根据使用频率排序）
const popularTags = allTags
  .map(tag => ({
    name: tag,
    count: mockProjects.filter(p => p.tags.includes(tag)).length
  }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 5)
  .map(t => t.name);

type SortOption = 'latest' | 'popular' | 'stars' | 'views';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [showFilters, setShowFilters] = useState(false);

  // 过滤和排序项目
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = mockProjects;

    // 搜索过滤
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // 标签过滤
    if (selectedTags.length > 0) {
      filtered = filtered.filter(project =>
        selectedTags.every(tag => project.tags.includes(tag))
      );
    }

    // 模型过滤
    if (selectedModel) {
      filtered = filtered.filter(project =>
        project.replays.some(replay => replay.model === selectedModel)
      );
    }

    // 排序
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'popular':
          return (b.stars + b.views) - (a.stars + a.views);
        case 'stars':
          return b.stars - a.stars;
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, selectedTags, selectedModel, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedModel('');
    setSortBy('latest');
  };

  const hasActiveFilters = searchQuery || selectedTags.length > 0 || selectedModel;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">探索项目</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            发现使用 Cursor AI 创建的精彩项目，学习最佳实践
          </p>
        </motion.div>

        {/* 搜索和筛选栏 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索项目名称、描述或标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            {/* 筛选和排序按钮 */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-lg border transition-all flex items-center gap-2 ${
                  showFilters || hasActiveFilters
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-border hover:bg-accent'
                }`}
              >
                <Filter className="h-5 w-5" />
                <span className="hidden sm:inline">筛选</span>
                {hasActiveFilters && (
                  <span className="bg-primary-foreground/20 px-2 py-0.5 rounded-full text-xs">
                    {(selectedTags.length > 0 ? 1 : 0) + (selectedModel ? 1 : 0)}
                  </span>
                )}
              </button>

              {/* 排序选择 */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
              >
                <option value="latest">最新发布</option>
                <option value="popular">最受欢迎</option>
                <option value="stars">最多星标</option>
                <option value="views">最多浏览</option>
              </select>
            </div>
          </div>

          {/* 快捷标签 */}
          {!showFilters && selectedTags.length === 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
              <span className="text-sm text-muted-foreground flex items-center gap-1 whitespace-nowrap">
                <Zap className="h-4 w-4" />
                快速筛选：
              </span>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="px-3 py-1 rounded-full text-sm bg-secondary/50 hover:bg-secondary text-secondary-foreground transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 筛选面板 */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                  {/* 标签筛选 */}
                  <div>
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      技术标签
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                            selectedTags.includes(tag)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 模型筛选 */}
                  <div>
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Cpu className="h-4 w-4" />
                      AI 模型
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedModel('')}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                          !selectedModel
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                      >
                        全部模型
                      </button>
                      {allModels.map(model => (
                        <button
                          key={model}
                          onClick={() => setSelectedModel(model)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                            selectedModel === model
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                        >
                          {model}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 清除筛选按钮 */}
                  {hasActiveFilters && (
                    <div className="flex justify-end">
                      <button
                        onClick={clearFilters}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        清除所有筛选
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 结果统计 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
        >
          <span className="text-sm text-muted-foreground">
            找到 {filteredAndSortedProjects.length} 个项目
            {hasActiveFilters && ` （共 ${mockProjects.length} 个）`}
          </span>
          
          {/* 项目统计信息 - 在移动端隐藏 */}
          <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              {filteredAndSortedProjects.reduce((sum, p) => sum + p.stars, 0)} 星标
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {filteredAndSortedProjects.reduce((sum, p) => sum + p.views, 0)} 浏览
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              {filteredAndSortedProjects.reduce((sum, p) => sum + p.replays.length, 0)} 代码生成
            </span>
          </div>
        </motion.div>

        {/* 项目列表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {filteredAndSortedProjects.length > 0 ? (
            <ProjectGrid projects={filteredAndSortedProjects} />
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">
                没有找到符合条件的项目
              </p>
              <button
                onClick={clearFilters}
                className="text-primary hover:underline"
              >
                清除筛选条件
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 