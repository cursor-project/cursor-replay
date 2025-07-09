'use client';

import { motion } from 'framer-motion';
import { Code2, Sparkles, Users, GitBranch, Zap, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const features = [
    {
      icon: <Code2 className="h-6 w-6" />,
      title: '代码回放',
      description: '查看每个 Prompt 生成的完整代码，学习 AI 如何一步步构建应用。'
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: '项目展示',
      description: '精美的项目展示页面，包含缩略图、标签、演示链接等完整信息。'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: '社区驱动',
      description: '由开发者社区共同维护，分享最佳实践和创新想法。'
    },
    {
      icon: <GitBranch className="h-6 w-6" />,
      title: '开源精神',
      description: '完全开源，欢迎贡献代码，让平台变得更好。'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: '快速搜索',
      description: '强大的搜索和筛选功能，快速找到你需要的项目和灵感。'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: '精选内容',
      description: '精心挑选的高质量项目，确保每个展示都有学习价值。'
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            关于 Cursor Replay
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            一个专注于展示和学习 Cursor AI 生成项目的开源平台
          </p>
        </motion.div>

        {/* 使命 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <div className="bg-card rounded-2xl p-8 sm:p-12 border border-border">
            <h2 className="text-2xl font-semibold mb-6">我们的使命</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Cursor Replay 诞生于一个简单的想法：让每个开发者都能学习和分享 AI 辅助编程的最佳实践。
              我们相信，通过展示完整的代码生成过程，可以帮助更多人理解如何更好地与 AI 协作。
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              无论你是 AI 编程的新手，还是经验丰富的开发者，都可以在这里找到灵感，
              学习他人的 Prompt 技巧，了解不同 AI 模型的特点，最终提升自己的开发效率。
            </p>
          </div>
        </motion.section>

        {/* 功能特点 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-semibold text-center mb-12">平台特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 加入我们 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-12 border border-primary/20">
            <h2 className="text-2xl font-semibold mb-4">加入社区</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Cursor Replay 是一个开放的社区项目。无论是贡献代码、分享项目，
              还是提供反馈建议，我们都非常欢迎你的参与。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <GitBranch className="h-5 w-5" />
                GitHub 仓库
              </a>
              <Link
                href="/submit"
                className="inline-flex items-center px-6 py-3 bg-card border border-border rounded-lg font-medium hover:bg-accent transition-colors"
              >
                提交项目
              </Link>
            </div>
          </div>
        </motion.section>

        {/* 版权信息 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20 text-sm text-muted-foreground"
        >
          <p>© 2024 Cursor Replay. 基于 MIT 协议开源。</p>
          <p className="mt-2">
            用 <Heart className="inline h-4 w-4 text-red-500" /> 打造，
            由 <span className="text-primary">Cursor AI</span> 辅助开发。
          </p>
        </motion.div>
      </div>
    </div>
  );
} 