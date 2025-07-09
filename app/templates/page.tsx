'use client';

import { motion } from 'framer-motion';
import { Package, Copy, Check, Globe, Smartphone, Chrome, Server, Database, Zap } from 'lucide-react';
import { useState } from 'react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  techStack: string[];
  prompt: string;
  cursorRules: string;
}

const templates: Template[] = [
  {
    id: 'nextjs-saas',
    name: 'Next.js SaaS 应用',
    description: '完整的 SaaS 应用模板，包含认证、支付、数据库等功能',
    category: 'Web 应用',
    icon: <Globe className="h-6 w-6" />,
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Prisma', 'Stripe'],
    prompt: `创建一个 Next.js SaaS 应用的基础结构，包含：
1. 用户认证系统（注册、登录、密码重置）
2. 定价页面和 Stripe 支付集成
3. 用户仪表板
4. 数据库模型设计
5. API 路由保护`,
    cursorRules: `# SaaS Application Rules

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + shadcn/ui
- Database: PostgreSQL with Prisma
- Auth: NextAuth.js
- Payment: Stripe

## File Structure
- app/ - Next.js app router pages
- components/ - Reusable components
- lib/ - Utility functions
- prisma/ - Database schema
- api/ - API routes

## Best Practices
- Use Server Components by default
- Implement proper error boundaries
- Add loading states for all async operations
- Use environment variables for secrets`
  },
  {
    id: 'react-dashboard',
    name: 'React 管理后台',
    description: '现代化的管理后台模板，包含图表、表格、表单等组件',
    category: 'Web 应用',
    icon: <Server className="h-6 w-6" />,
    techStack: ['React', 'TypeScript', 'Ant Design', 'Redux Toolkit', 'Recharts'],
    prompt: `创建一个 React 管理后台，包含：
1. 侧边栏导航和面包屑
2. 数据可视化仪表板（使用 Recharts）
3. 用户管理页面（表格、搜索、分页）
4. 表单页面（新建/编辑）
5. 权限管理系统`,
    cursorRules: `# Admin Dashboard Rules

## Tech Stack
- Framework: React 18
- Language: TypeScript
- UI Library: Ant Design
- State: Redux Toolkit
- Charts: Recharts
- Routing: React Router v6

## Code Style
- Use functional components with hooks
- Implement proper TypeScript types
- Use Redux Toolkit for state management

## Component Structure
- pages/ - Page components
- components/ - Reusable UI components
- features/ - Redux slices
- services/ - API calls
- utils/ - Helper functions`
  },
  {
    id: 'mobile-app',
    name: 'React Native 应用',
    description: '跨平台移动应用模板，支持 iOS 和 Android',
    category: '移动应用',
    icon: <Smartphone className="h-6 w-6" />,
    techStack: ['React Native', 'TypeScript', 'Expo', 'React Navigation', 'AsyncStorage'],
    prompt: `创建一个 React Native 应用，包含：
1. 底部标签导航
2. 用户认证流程
3. 列表页面和详情页面
4. 相机和图片选择功能
5. 本地数据存储`,
    cursorRules: `# React Native App Rules

## Tech Stack
- Framework: React Native with Expo
- Language: TypeScript
- Navigation: React Navigation
- Storage: AsyncStorage
- State: Context API

## Project Structure
- screens/ - Screen components
- components/ - Reusable components
- navigation/ - Navigation setup
- services/ - API and storage
- constants/ - App constants

## Best Practices
- Test on both iOS and Android
- Handle platform differences
- Optimize for performance
- Use Expo APIs when possible`
  },
  {
    id: 'chrome-extension',
    name: 'Chrome 扩展',
    description: '功能完整的 Chrome 浏览器扩展模板',
    category: '浏览器扩展',
    icon: <Chrome className="h-6 w-6" />,
    techStack: ['TypeScript', 'React', 'Webpack', 'Chrome APIs'],
    prompt: `创建一个 Chrome 扩展，包含：
1. Popup 界面（React）
2. Content Script 注入
3. Background Service Worker
4. Options 页面
5. 与网页通信功能`,
    cursorRules: `# Chrome Extension Rules

## Tech Stack
- Language: TypeScript
- UI: React for popup/options
- Build: Webpack
- Manifest: V3

## File Structure
- src/popup/ - Popup UI
- src/content/ - Content scripts
- src/background/ - Service worker
- src/options/ - Options page
- public/ - Static assets

## Chrome APIs
- Use chrome.storage for data
- Implement proper permissions
- Handle message passing
- Follow security best practices`
  },
  {
    id: 'api-server',
    name: 'Node.js API 服务',
    description: 'RESTful API 服务模板，包含认证、数据库、缓存等',
    category: 'API 服务',
    icon: <Database className="h-6 w-6" />,
    techStack: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Redis', 'JWT'],
    prompt: `创建一个 Node.js API 服务，包含：
1. RESTful API 设计
2. JWT 认证中间件
3. 数据库模型和迁移
4. Redis 缓存集成
5. API 文档（Swagger）`,
    cursorRules: `# API Server Rules

## Tech Stack
- Runtime: Node.js
- Framework: Express
- Language: TypeScript
- Database: PostgreSQL
- ORM: TypeORM
- Cache: Redis
- Auth: JWT

## Project Structure
- src/controllers/ - Route handlers
- src/models/ - Database models
- src/middlewares/ - Express middlewares
- src/services/ - Business logic
- src/utils/ - Helper functions

## API Design
- Follow RESTful principles
- Use proper HTTP status codes
- Implement pagination
- Add request validation
- Include error handling`
  },
  {
    id: 'ai-chatbot',
    name: 'AI 聊天机器人',
    description: '集成 AI API 的聊天应用模板',
    category: 'AI 应用',
    icon: <Zap className="h-6 w-6" />,
    techStack: ['Next.js', 'TypeScript', 'OpenAI API', 'Vercel AI SDK', 'Tailwind CSS'],
    prompt: `创建一个 AI 聊天应用，包含：
1. 流式对话界面
2. 多模型切换（GPT-4, Claude）
3. 对话历史保存
4. Markdown 渲染
5. 代码高亮显示`,
    cursorRules: `# AI Chat App Rules

## Tech Stack
- Framework: Next.js 14
- Language: TypeScript
- AI: OpenAI API / Anthropic API
- UI: Tailwind CSS
- Stream: Vercel AI SDK

## Features
- Streaming responses
- Message history
- Model selection
- Error handling
- Rate limiting

## Best Practices
- Handle API errors gracefully
- Implement proper loading states
- Save conversations locally
- Add export functionality`
  }
];

const categoryIcons: Record<string, React.ReactNode> = {
  'Web 应用': <Globe className="h-5 w-5" />,
  '移动应用': <Smartphone className="h-5 w-5" />,
  '浏览器扩展': <Chrome className="h-5 w-5" />,
  'API 服务': <Server className="h-5 w-5" />,
  'AI 应用': <Zap className="h-5 w-5" />
};

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];
  
  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
            <Package className="h-10 w-10 text-primary" />
            项目模板库
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            精选的项目模板，包含完整的 Prompt 和 Cursor Rules，快速启动你的项目
          </p>
        </motion.div>

        {/* 分类筛选 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category === 'all' ? '全部模板' : (
                <span className="flex items-center gap-2">
                  {categoryIcons[category]}
                  {category}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* 模板网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-card rounded-xl border border-border hover:border-primary/50 transition-all p-6"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="text-primary">{template.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
              </div>

              {/* 技术栈 */}
              <div className="mb-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">技术栈：</p>
                <div className="flex flex-wrap gap-1">
                  {template.techStack.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-secondary text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prompt 预览 */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-muted-foreground">Prompt：</p>
                  <button
                    onClick={() => copyToClipboard(template.prompt, `prompt-${template.id}`)}
                    className="p-1 rounded hover:bg-accent transition-colors"
                  >
                    {copiedId === `prompt-${template.id}` ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3 text-muted-foreground" />
                    )}
                  </button>
                </div>
                <pre className="bg-muted/50 rounded-lg p-3 text-xs overflow-hidden">
                  <code className="line-clamp-3">{template.prompt}</code>
                </pre>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(template.prompt, `prompt-full-${template.id}`)}
                  className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  复制 Prompt
                </button>
                <button
                  onClick={() => copyToClipboard(template.cursorRules, `rules-${template.id}`)}
                  className="flex-1 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  复制 Rules
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 使用提示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-primary/20"
        >
          <h3 className="text-xl font-semibold mb-4">💡 使用指南</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">如何使用模板？</h4>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>选择适合你项目的模板</li>
                <li>复制 Prompt 到 Cursor</li>
                <li>将 Cursor Rules 保存到项目根目录的 .cursorrules 文件</li>
                <li>根据需要调整和扩展</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium mb-2">模板优势</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 包含最佳实践和项目结构</li>
                <li>• 预设的技术栈和配置</li>
                <li>• 可直接使用的 Cursor Rules</li>
                <li>• 节省项目初始化时间</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 