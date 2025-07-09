'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Lightbulb, Code2, Zap, BookOpen, Target, ArrowRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  icon: React.ReactNode;
  content: {
    title: string;
    code?: string;
    description: string;
  }[];
}

const tutorials: Tutorial[] = [
  {
    id: 'prompt-basics',
    title: 'Prompt 编写基础',
    description: '学习如何编写清晰、准确的 Prompt，让 AI 更好地理解你的需求',
    level: 'beginner',
    icon: <Lightbulb className="h-6 w-6" />,
    content: [
      {
        title: '1. 明确具体的需求',
        code: '创建一个 React 组件，显示用户列表，包含头像、姓名和邮箱，使用 TypeScript',
        description: '避免模糊的描述，明确指出技术栈、功能需求和期望的输出'
      },
      {
        title: '2. 提供上下文信息',
        code: '在现有的 Next.js 项目中，添加一个深色模式切换功能，使用 Tailwind CSS，保存用户偏好到 localStorage',
        description: '说明项目环境、使用的框架和具体的实现要求'
      },
      {
        title: '3. 分步骤描述复杂任务',
        code: `1. 创建一个表单组件，包含用户名和密码输入
2. 添加表单验证（用户名至少3个字符，密码至少8个字符）
3. 实现提交功能，显示加载状态
4. 处理成功和错误响应`,
        description: '将复杂任务分解成清晰的步骤，让 AI 能够逐步实现'
      }
    ]
  },
  {
    id: 'model-selection',
    title: '选择合适的 AI 模型',
    description: '了解不同 AI 模型的特点，选择最适合你任务的模型',
    level: 'intermediate',
    icon: <Target className="h-6 w-6" />,
    content: [
      {
        title: 'Claude 3.5 Sonnet',
        description: '擅长：复杂的代码生成、系统架构设计、代码重构。特点：理解能力强，生成的代码质量高，适合大型项目开发。'
      },
      {
        title: 'GPT-4',
        description: '擅长：通用编程任务、算法实现、数据处理。特点：知识面广，适合各种编程语言和框架。'
      },
      {
        title: '选择建议',
        code: `// 复杂的业务逻辑 -> Claude 3.5 Sonnet
// 快速原型开发 -> GPT-4
// 特定框架的最佳实践 -> 查看该框架的专门模型`,
        description: '根据任务类型和复杂度选择合适的模型'
      }
    ]
  },
  {
    id: 'advanced-techniques',
    title: '高级 Prompt 技巧',
    description: '掌握进阶技巧，让 AI 生成更符合预期的代码',
    level: 'advanced',
    icon: <Zap className="h-6 w-6" />,
    content: [
      {
        title: '使用示例驱动',
        code: `输入示例：[1, 2, 3, 4, 5]
输出示例：[1, 4, 9, 16, 25]

请创建一个函数实现上述转换`,
        description: '通过输入输出示例，让 AI 准确理解需求'
      },
      {
        title: '指定代码风格',
        code: `使用以下代码风格创建组件：
- 使用 function 声明而非箭头函数
- Props 使用 interface 定义
- 使用具名导出
- 添加 JSDoc 注释`,
        description: '明确代码规范，保持项目一致性'
      },
      {
        title: '增量式开发',
        code: `基于上面的代码，添加以下功能：
1. 错误边界处理
2. 加载骨架屏
3. 分页功能`,
        description: '在已有代码基础上逐步添加功能，避免重复生成'
      }
    ]
  },
  {
    id: 'cursor-rules',
    title: 'Cursor Rules 最佳实践',
    description: '编写项目专属的 Cursor Rules，提高开发效率',
    level: 'intermediate',
    icon: <BookOpen className="h-6 w-6" />,
    content: [
      {
        title: '基础规则模板',
        code: `# Project Cursor Rules

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- State: Zustand

## Code Style
- Use functional components
- Prefer named exports
- Add TypeScript types for all props

## File Structure
- Components in /components
- Hooks in /hooks
- Types in /types`,
        description: '定义项目的技术栈、代码风格和文件结构'
      },
      {
        title: '具体实现规范',
        code: `## Component Guidelines
- Each component in its own file
- Props interface named [ComponentName]Props
- Use memo for expensive components

## Error Handling
- Use try-catch for async operations
- Show user-friendly error messages
- Log errors to console in development`,
        description: '提供具体的实现指导，确保代码质量'
      }
    ]
  }
];

const levelColors = {
  beginner: 'text-green-600 bg-green-100 dark:bg-green-900/20',
  intermediate: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
  advanced: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20'
};

const levelNames = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级'
};

export default function TutorialsPage() {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
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
            <GraduationCap className="h-10 w-10 text-primary" />
            Cursor AI 教程
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            掌握 Prompt 编写技巧，提升 AI 辅助编程效率
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 教程列表 */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">教程列表</h2>
            <div className="space-y-3">
              {tutorials.map((tutorial, index) => (
                <motion.button
                  key={tutorial.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedTutorial(tutorial)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedTutorial?.id === tutorial.id
                      ? 'bg-primary/10 border-primary'
                      : 'bg-card border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-primary mt-1">{tutorial.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{tutorial.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {tutorial.description}
                      </p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${levelColors[tutorial.level]}`}>
                        {levelNames[tutorial.level]}
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* 教程内容 */}
          <div className="lg:col-span-2">
            {selectedTutorial ? (
              <motion.div
                key={selectedTutorial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-primary">{selectedTutorial.icon}</div>
                  <div>
                    <h2 className="text-2xl font-semibold">{selectedTutorial.title}</h2>
                    <p className="text-muted-foreground">{selectedTutorial.description}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {selectedTutorial.content.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Code2 className="h-5 w-5 text-primary" />
                        {section.title}
                      </h3>
                      
                      {section.code && (
                        <div className="relative mb-4">
                          <pre className="bg-muted/50 rounded-lg p-4 overflow-x-auto">
                            <code className="text-sm">{section.code}</code>
                          </pre>
                          <button
                            onClick={() => copyCode(section.code!, index)}
                            className="absolute top-2 right-2 p-2 rounded-lg bg-background/80 hover:bg-background transition-colors"
                          >
                            {copiedIndex === index ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      )}
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    继续学习下一个教程，掌握更多技巧
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="bg-card rounded-xl border border-border p-12 text-center">
                <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  选择左侧的教程开始学习
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 提示卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-primary/20"
        >
          <h3 className="text-xl font-semibold mb-4">💡 学习建议</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">1. 循序渐进</h4>
              <p className="text-sm text-muted-foreground">
                从基础教程开始，逐步掌握高级技巧
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">2. 实践练习</h4>
              <p className="text-sm text-muted-foreground">
                将学到的技巧应用到实际项目中
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">3. 持续优化</h4>
              <p className="text-sm text-muted-foreground">
                根据生成结果不断改进 Prompt 写法
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 