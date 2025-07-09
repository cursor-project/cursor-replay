'use client';

import { TrendingUp, Flame, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import ProjectGrid from '@/components/ProjectGrid';
import { mockProjects } from '@/data/mockProjects';

export default function TrendingPage() {
  // 按热度排序（星标 + 浏览量）
  const trendingProjects = [...mockProjects]
    .sort((a, b) => (b.stars + b.views) - (a.stars + a.views));

  // 获取最近一周的项目
  const recentProjects = [...mockProjects]
    .filter(project => {
      const projectDate = new Date(project.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return projectDate > weekAgo;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // 按星标数排序
  const mostStarred = [...mockProjects]
    .sort((a, b) => b.stars - a.stars);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <TrendingUp className="h-10 w-10 text-primary" />
            热门项目
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            探索最受欢迎的 Cursor AI 项目，获取灵感
          </p>
        </motion.div>

        {/* 热门分类 */}
        <div className="space-y-16">
          {/* 综合热门 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Flame className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-semibold">综合热门</h2>
              <span className="text-sm text-muted-foreground">（星标 + 浏览量）</span>
            </div>
            <ProjectGrid projects={trendingProjects.slice(0, 3)} />
          </motion.section>

          {/* 本周新秀 */}
          {recentProjects.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Clock className="h-6 w-6 text-blue-500" />
                <h2 className="text-2xl font-semibold">本周新秀</h2>
                <span className="text-sm text-muted-foreground">（最近 7 天）</span>
              </div>
              <ProjectGrid projects={recentProjects} />
            </motion.section>
          )}

          {/* 最多星标 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-semibold">最多星标</h2>
            </div>
            <ProjectGrid projects={mostStarred.slice(0, 3)} />
          </motion.section>
        </div>
      </div>
    </div>
  );
} 