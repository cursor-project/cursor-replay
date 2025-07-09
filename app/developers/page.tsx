'use client';

import { motion } from 'framer-motion';
import { Users, Trophy, Star, GitBranch, GitPullRequest, Code2, Award, TrendingUp, Calendar, Eye, Github, Twitter, Globe, Zap, Sparkles, Activity } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Developer {
  id: string;
  name: string;
  avatar: string;
  username: string;
  bio: string;
  projectsCount: number;
  totalStars: number;
  totalViews: number;
  joinedAt: string;
  badges: string[];
  skills: string[];
  topProject?: {
    id: string;
    title: string;
    stars: number;
  };
  socials?: {
    github?: string;
    twitter?: string;
    website?: string;
  };
}

const mockDevelopers: Developer[] = [
  {
    id: '1',
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop',
    username: 'alexchen',
    bio: '全栈开发者 | AI 爱好者 | 开源贡献者',
    projectsCount: 23,
    totalStars: 3580,
    totalViews: 45420,
    joinedAt: '2024-01-01',
    badges: ['🚀 早期贡献者', '⭐ 明星开发者', '🎯 AI 先锋'],
    skills: ['TypeScript', 'React', 'Next.js', 'AI/ML'],
    topProject: {
      id: '1',
      title: 'AI Code Assistant',
      stars: 892
    },
    socials: {
      github: 'alexchen',
      twitter: 'alexchen_dev',
      website: 'alexchen.dev'
    }
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
    username: 'sarahj',
    bio: '前端架构师 | UI/UX 专家 | 技术博主',
    projectsCount: 18,
    totalStars: 2156,
    totalViews: 28930,
    joinedAt: '2024-01-05',
    badges: ['🎨 设计大师', '📚 教程作者', '💎 优质内容'],
    skills: ['React', 'Vue', 'Tailwind', 'Framer Motion'],
    topProject: {
      id: '3',
      title: 'Modern UI Kit',
      stars: 567
    },
    socials: {
      github: 'sarahj',
      twitter: 'sarah_codes'
    }
  },
  {
    id: '3',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    username: 'davidkim',
    bio: 'AI 工程师 | Prompt 工程专家 | 技术导师',
    projectsCount: 31,
    totalStars: 5240,
    totalViews: 68500,
    joinedAt: '2024-01-03',
    badges: ['🧙 Prompt 大师', '🏆 顶级贡献者', '👑 社区领袖'],
    skills: ['Python', 'LangChain', 'OpenAI', 'Machine Learning'],
    topProject: {
      id: '4',
      title: 'Smart Prompt Engine',
      stars: 1289
    },
    socials: {
      github: 'davidkim',
      website: 'davidkim.ai'
    }
  },
  {
    id: '4',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    username: 'emmaw',
    bio: '移动开发专家 | React Native 核心贡献者',
    projectsCount: 14,
    totalStars: 1678,
    totalViews: 15420,
    joinedAt: '2024-01-10',
    badges: ['📱 移动专家', '🌟 新星开发者', '🔥 热门创作者'],
    skills: ['React Native', 'Swift', 'Kotlin', 'Flutter'],
    topProject: {
      id: '2',
      title: 'Cross-Platform App Kit',
      stars: 428
    },
    socials: {
      github: 'emmaw',
      twitter: 'emma_mobile_dev'
    }
  },
  {
    id: '5',
    name: 'Michael Zhang',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    username: 'mzhang',
    bio: '后端架构师 | 云原生专家 | DevOps 倡导者',
    projectsCount: 27,
    totalStars: 4320,
    totalViews: 52100,
    joinedAt: '2024-01-02',
    badges: ['☁️ 云原生专家', '⚡ 性能优化大师', '🔧 基础设施专家'],
    skills: ['Go', 'Kubernetes', 'AWS', 'Microservices'],
    topProject: {
      id: '5',
      title: 'Cloud Native Toolkit',
      stars: 1102
    },
    socials: {
      github: 'mzhang',
      website: 'mzhang.tech'
    }
  },
  {
    id: '6',
    name: 'Lisa Park',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    username: 'lisapark',
    bio: '数据科学家 | 可视化专家 | 开源维护者',
    projectsCount: 20,
    totalStars: 2890,
    totalViews: 34500,
    joinedAt: '2024-01-08',
    badges: ['📊 数据大师', '🎯 精准分析', '🌈 可视化专家'],
    skills: ['D3.js', 'Python', 'R', 'Tableau'],
    topProject: {
      id: '6',
      title: 'Interactive Data Viz',
      stars: 756
    },
    socials: {
      github: 'lisapark',
      twitter: 'lisa_data_viz'
    }
  }
];

const achievements = [
  { icon: <Trophy className="h-6 w-6" />, name: '早期贡献者', description: '前 100 位加入的开发者' },
  { icon: <Star className="h-6 w-6" />, name: '优质创作者', description: '项目总星标超过 1000' },
  { icon: <GitPullRequest className="h-6 w-6" />, name: '活跃开发者', description: '月度发布 5 个以上项目' },
  { icon: <Award className="h-6 w-6" />, name: 'Prompt 大师', description: '教程被收藏超过 100 次' },
];

export default function DevelopersPage() {
  // 统计数据
  const totalProjects = mockDevelopers.reduce((sum, dev) => sum + dev.projectsCount, 0);
  const totalStars = mockDevelopers.reduce((sum, dev) => sum + dev.totalStars, 0);
  const totalViews = mockDevelopers.reduce((sum, dev) => sum + dev.totalViews, 0);

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-background via-background/95 to-background">
      <div className="container mx-auto max-w-7xl">
        {/* 页面标题 - 重新设计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            开发者社区
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
            遇见优秀的创作者
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            探索由 Cursor AI 驱动的创新项目，认识背后的开发者
          </p>
        </motion.div>

        {/* 统计数据 - 重新设计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { icon: Users, value: mockDevelopers.length, label: '活跃开发者', color: 'text-blue-500' },
            { icon: Code2, value: totalProjects, label: '项目总数', color: 'text-green-500' },
            { icon: Star, value: `${(totalStars / 1000).toFixed(1)}k`, label: '总星标数', color: 'text-yellow-500' },
            { icon: Activity, value: `${(totalViews / 1000).toFixed(1)}k`, label: '总浏览量', color: 'text-purple-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 hover:border-primary/30 transition-all group"
            >
              <stat.icon className={`h-8 w-8 ${stat.color} mb-3 group-hover:scale-110 transition-transform`} />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* 开发者网格 - 全新设计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-500" />
              顶级贡献者
            </h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                本周
              </button>
              <button className="px-4 py-2 text-muted-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors">
                本月
              </button>
              <button className="px-4 py-2 text-muted-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors">
                全部
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...mockDevelopers]
              .sort((a, b) => b.totalStars - a.totalStars)
              .map((developer, index) => (
                <motion.div
                  key={developer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="group relative"
                >
                  {/* 排名标签 */}
                  {index < 3 && (
                    <div className={`absolute -top-3 -right-3 z-10 h-12 w-12 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg shadow-yellow-500/30' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-lg shadow-gray-400/30' :
                      'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                    }`}>
                      {index + 1}
                    </div>
                  )}
                  
                  <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 p-6 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                    {/* 头部信息 */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <div className="h-16 w-16 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20 group-hover:scale-110 transition-transform">
                          <Image
                            src={developer.avatar}
                            alt={developer.name}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                          <Zap className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{developer.name}</h3>
                        <p className="text-sm text-muted-foreground">@{developer.username}</p>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{developer.bio}</p>

                    {/* 技能标签 */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {developer.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium">
                          {skill}
                        </span>
                      ))}
                      {developer.skills.length > 3 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                          +{developer.skills.length - 3}
                        </span>
                      )}
                    </div>

                    {/* 统计数据 */}
                    <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-border/50">
                      <div className="text-center">
                        <div className="text-lg font-semibold">{developer.projectsCount}</div>
                        <div className="text-xs text-muted-foreground">项目</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{(developer.totalStars / 1000).toFixed(1)}k</div>
                        <div className="text-xs text-muted-foreground">星标</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{(developer.totalViews / 1000).toFixed(1)}k</div>
                        <div className="text-xs text-muted-foreground">浏览</div>
                      </div>
                    </div>

                    {/* 徽章 */}
                    <div className="flex gap-1 mb-4">
                      {developer.badges.slice(0, 2).map(badge => (
                        <span key={badge} className="text-xs">
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* 最佳项目 */}
                    {developer.topProject && (
                      <Link 
                        href={`/project/${developer.topProject.id}`}
                        className="block p-3 bg-accent/50 rounded-lg hover:bg-accent transition-colors group/project"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{developer.topProject.title}</span>
                          </div>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {developer.topProject.stars}
                          </span>
                        </div>
                      </Link>
                    )}

                    {/* 社交链接 */}
                    {developer.socials && (
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
                        {developer.socials.github && (
                          <a href={`https://github.com/${developer.socials.github}`} className="text-muted-foreground hover:text-foreground transition-colors">
                            <Github className="h-5 w-5" />
                          </a>
                        )}
                        {developer.socials.twitter && (
                          <a href={`https://twitter.com/${developer.socials.twitter}`} className="text-muted-foreground hover:text-foreground transition-colors">
                            <Twitter className="h-5 w-5" />
                          </a>
                        )}
                        {developer.socials.website && (
                          <a href={`https://${developer.socials.website}`} className="text-muted-foreground hover:text-foreground transition-colors">
                            <Globe className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* 成就系统 - 重新设计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">🏆 成就与徽章</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Trophy className="h-8 w-8" />, name: '早期贡献者', description: '前 100 位加入', color: 'from-yellow-400 to-orange-500' },
              { icon: <Star className="h-8 w-8" />, name: '明星开发者', description: '获得 1000+ 星标', color: 'from-blue-400 to-purple-500' },
              { icon: <Zap className="h-8 w-8" />, name: '活跃贡献者', description: '月度 5+ 项目', color: 'from-green-400 to-teal-500' },
              { icon: <Award className="h-8 w-8" />, name: 'AI 大师', description: '优质 AI 项目', color: 'from-purple-400 to-pink-500' },
            ].map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl`} />
                <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 p-6 text-center hover:border-primary/50 transition-all">
                  <div className="text-white mb-3 mx-auto w-fit p-3 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20">
                    {achievement.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{achievement.name}</h3>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 加入社区 - 重新设计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
          <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl p-12 border border-primary/20 text-center">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">加入创作者社区</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              分享你的 Cursor AI 项目，获得社区认可，与全球开发者一起成长
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/submit"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              >
                提交项目
              </Link>
              <Link
                href="/tutorials"
                className="px-8 py-4 bg-card border border-border rounded-xl font-semibold hover:bg-accent transition-all inline-flex items-center justify-center gap-2"
              >
                浏览教程
                <GitBranch className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 