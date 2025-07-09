'use client';

import { motion } from 'framer-motion';
import { BookOpen, Package, Video, FileText, ExternalLink, Github, Globe, Zap, Code2, Terminal, Palette, Database, Plus } from 'lucide-react';
import Link from 'next/link';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  link: string;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

const resources: Resource[] = [
  // Cursor 相关
  {
    id: 'cursor-official',
    title: 'Cursor 官网',
    description: '官方网站，下载最新版本的 Cursor IDE',
    category: 'Cursor 工具',
    icon: <Code2 className="h-5 w-5" />,
    link: 'https://cursor.sh',
    tags: ['官方', 'IDE'],
    isFeatured: true
  },
  {
    id: 'cursor-docs',
    title: 'Cursor 文档',
    description: '官方文档，了解所有功能和快捷键',
    category: 'Cursor 工具',
    icon: <FileText className="h-5 w-5" />,
    link: 'https://docs.cursor.sh',
    tags: ['文档', '教程']
  },
  {
    id: 'cursor-forum',
    title: 'Cursor 社区论坛',
    description: '官方论坛，与其他用户交流经验',
    category: 'Cursor 工具',
    icon: <Globe className="h-5 w-5" />,
    link: 'https://forum.cursor.sh',
    tags: ['社区', '讨论']
  },

  // VS Code 扩展
  {
    id: 'github-copilot',
    title: 'GitHub Copilot',
    description: 'AI 代码补全工具，提高编码效率',
    category: 'VS Code 扩展',
    icon: <Github className="h-5 w-5" />,
    link: 'https://marketplace.visualstudio.com/items?itemName=GitHub.copilot',
    tags: ['AI', '代码补全'],
    isFeatured: true
  },
  {
    id: 'prettier',
    title: 'Prettier',
    description: '代码格式化工具，保持代码风格一致',
    category: 'VS Code 扩展',
    icon: <Palette className="h-5 w-5" />,
    link: 'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode',
    tags: ['格式化', '代码规范']
  },
  {
    id: 'eslint',
    title: 'ESLint',
    description: 'JavaScript 代码检查工具',
    category: 'VS Code 扩展',
    icon: <Terminal className="h-5 w-5" />,
    link: 'https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint',
    tags: ['代码检查', 'JavaScript']
  },

  // AI 工具
  {
    id: 'claude-ai',
    title: 'Claude',
    description: 'Anthropic 的 AI 助手，擅长代码生成和分析',
    category: 'AI 工具',
    icon: <Zap className="h-5 w-5" />,
    link: 'https://claude.ai',
    tags: ['AI', '聊天机器人'],
    isFeatured: true
  },
  {
    id: 'chatgpt',
    title: 'ChatGPT',
    description: 'OpenAI 的对话式 AI，支持代码生成',
    category: 'AI 工具',
    icon: <Zap className="h-5 w-5" />,
    link: 'https://chat.openai.com',
    tags: ['AI', '聊天机器人']
  },
  {
    id: 'perplexity',
    title: 'Perplexity AI',
    description: 'AI 搜索引擎，快速查找技术文档',
    category: 'AI 工具',
    icon: <Globe className="h-5 w-5" />,
    link: 'https://perplexity.ai',
    tags: ['AI', '搜索']
  },

  // 学习资源
  {
    id: 'mdn-docs',
    title: 'MDN Web Docs',
    description: 'Web 开发权威文档',
    category: '学习资源',
    icon: <BookOpen className="h-5 w-5" />,
    link: 'https://developer.mozilla.org',
    tags: ['文档', 'Web开发']
  },
  {
    id: 'react-docs',
    title: 'React 官方文档',
    description: 'React 框架的官方学习资源',
    category: '学习资源',
    icon: <BookOpen className="h-5 w-5" />,
    link: 'https://react.dev',
    tags: ['React', '文档'],
    isNew: true
  },
  {
    id: 'nextjs-docs',
    title: 'Next.js 文档',
    description: '全栈 React 框架文档',
    category: '学习资源',
    icon: <BookOpen className="h-5 w-5" />,
    link: 'https://nextjs.org/docs',
    tags: ['Next.js', '文档']
  },

  // 视频教程
  {
    id: 'youtube-fireship',
    title: 'Fireship',
    description: '高质量的编程教程视频',
    category: '视频教程',
    icon: <Video className="h-5 w-5" />,
    link: 'https://www.youtube.com/@Fireship',
    tags: ['YouTube', '教程']
  },
  {
    id: 'youtube-traversy',
    title: 'Traversy Media',
    description: '全栈开发教程频道',
    category: '视频教程',
    icon: <Video className="h-5 w-5" />,
    link: 'https://www.youtube.com/@TraversyMedia',
    tags: ['YouTube', '全栈']
  },
  {
    id: 'youtube-theo',
    title: 'Theo - t3.gg',
    description: '现代 Web 开发技术分享',
    category: '视频教程',
    icon: <Video className="h-5 w-5" />,
    link: 'https://www.youtube.com/@t3dotgg',
    tags: ['YouTube', 'Web开发'],
    isNew: true
  },

  // 开发工具
  {
    id: 'vercel',
    title: 'Vercel',
    description: '前端应用部署平台',
    category: '开发工具',
    icon: <Globe className="h-5 w-5" />,
    link: 'https://vercel.com',
    tags: ['部署', '托管']
  },
  {
    id: 'supabase',
    title: 'Supabase',
    description: '开源的 Firebase 替代品',
    category: '开发工具',
    icon: <Database className="h-5 w-5" />,
    link: 'https://supabase.com',
    tags: ['数据库', 'BaaS']
  },
  {
    id: 'tailwindcss',
    title: 'Tailwind CSS',
    description: '实用优先的 CSS 框架',
    category: '开发工具',
    icon: <Palette className="h-5 w-5" />,
    link: 'https://tailwindcss.com',
    tags: ['CSS', '样式']
  }
];

const categories = Array.from(new Set(resources.map(r => r.category)));

export default function ResourcesPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <BookOpen className="h-10 w-10 text-primary" />
            资源中心
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            精选的开发工具、学习资源和社区链接，助力你的 AI 编程之旅
          </p>
          <Link
            href="/submit-resource"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-5 w-5" />
            提交资源
          </Link>
        </motion.div>

        {/* 精选资源 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            ⭐ 精选推荐
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resources
              .filter(r => r.isFeatured)
              .map((resource, index) => (
                <motion.a
                  key={resource.id}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="group bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl border border-primary/20 p-6 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-primary">{resource.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
                        {resource.title}
                        <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                      <div className="flex gap-1">
                        {resource.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
          </div>
        </motion.div>

        {/* 分类资源 */}
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + categoryIndex * 0.1 }}
            className="mb-12"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              {category === 'Cursor 工具' && <Code2 className="h-5 w-5" />}
              {category === 'VS Code 扩展' && <Package className="h-5 w-5" />}
              {category === 'AI 工具' && <Zap className="h-5 w-5" />}
              {category === '学习资源' && <BookOpen className="h-5 w-5" />}
              {category === '视频教程' && <Video className="h-5 w-5" />}
              {category === '开发工具' && <Terminal className="h-5 w-5" />}
              {category}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources
                .filter(r => r.category === category && !r.isFeatured)
                .map((resource, index) => (
                  <motion.a
                    key={resource.id}
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="group bg-card rounded-xl border border-border p-4 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-muted-foreground group-hover:text-primary transition-colors">
                        {resource.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
                          {resource.title}
                          {resource.isNew && (
                            <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-600 rounded-full">
                              NEW
                            </span>
                          )}
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {resource.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {resource.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
            </div>
          </motion.div>
        ))}

        {/* 贡献资源 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-primary/20 text-center"
        >
          <h3 className="text-2xl font-semibold mb-4">推荐资源</h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            发现了有用的工具或资源？欢迎向社区推荐，帮助更多开发者！
          </p>
          <Link
            href="/submit-resource"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            提交资源
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 