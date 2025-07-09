'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, X, Link as LinkIcon, Tag, Star, DollarSign, Users, Sparkles, AlertCircle, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ResourceInput {
  name: string;
  description: string;
  url: string;
  category: string;
  type: 'free' | 'paid' | 'freemium';
  tags: string[];
  rating: number;
  reason: string;
  author: string;
  authorUrl: string;
  thumbnail: string;
}

export default function SubmitResourcePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 表单状态
  const [resource, setResource] = useState<ResourceInput>({
    name: '',
    description: '',
    url: '',
    category: 'cursor-tools',
    type: 'free',
    tags: [],
    rating: 5,
    reason: '',
    author: '',
    authorUrl: '',
    thumbnail: ''
  });
  
  const [tagInput, setTagInput] = useState('');

  // 资源分类
  const categories = [
    { value: 'cursor-tools', label: 'Cursor 工具' },
    { value: 'vscode-extensions', label: 'VS Code 扩展' },
    { value: 'ai-tools', label: 'AI 工具' },
    { value: 'learning', label: '学习资源' },
    { value: 'templates', label: '项目模板' },
    { value: 'tutorials', label: '教程文档' },
    { value: 'videos', label: '视频教程' },
    { value: 'books', label: '书籍资料' },
    { value: 'communities', label: '社区论坛' },
    { value: 'dev-tools', label: '开发工具' }
  ];

  // 常用标签
  const popularTags = [
    'Cursor', 'AI', 'VSCode', '编程', 'TypeScript', 'React', 'Python', 
    'JavaScript', 'Node.js', 'GitHub', 'Git', 'Web开发', '移动开发',
    '机器学习', '深度学习', '代码生成', '自动化', '效率工具'
  ];

  // 更新资源字段
  const updateResource = (field: keyof ResourceInput, value: any) => {
    setResource(prev => ({ ...prev, [field]: value }));
  };

  // 添加标签
  const addTag = (tag: string) => {
    if (tag.trim() && !resource.tags.includes(tag.trim())) {
      updateResource('tags', [...resource.tags, tag.trim()]);
    }
  };

  // 删除标签
  const removeTag = (tag: string) => {
    updateResource('tags', resource.tags.filter(t => t !== tag));
  };

  // 添加流行标签
  const addPopularTag = (tag: string) => {
    addTag(tag);
  };

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 模拟提交
    setTimeout(() => {
      alert('资源提交成功！感谢你的分享！（这是模拟提交，实际需要连接后端）');
      router.push('/resources');
    }, 2000);
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <BookOpen className="h-10 w-10 text-primary" />
            提交资源
          </h1>
          <p className="text-muted-foreground text-lg">
            分享对 Cursor AI 开发有帮助的工具、教程和资源
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 基本信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              基本信息
            </h2>

            <div className="space-y-6">
              {/* 资源名称 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  资源名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={resource.name}
                  onChange={(e) => updateResource('name', e.target.value)}
                  placeholder="例如：Cursor AI 快速入门指南"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* 资源描述 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  资源描述 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={resource.description}
                  onChange={(e) => updateResource('description', e.target.value)}
                  placeholder="详细描述这个资源的内容和用途..."
                  rows={4}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* 资源链接 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <LinkIcon className="inline h-4 w-4 mr-1" />
                  资源链接 <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={resource.url}
                  onChange={(e) => updateResource('url', e.target.value)}
                  placeholder="https://example.com/resource"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* 分类和类型 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    资源分类 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={resource.category}
                    onChange={(e) => updateResource('category', e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <DollarSign className="inline h-4 w-4 mr-1" />
                    资源类型
                  </label>
                  <select
                    value={resource.type}
                    onChange={(e) => updateResource('type', e.target.value as 'free' | 'paid' | 'freemium')}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="free">免费</option>
                    <option value="paid">付费</option>
                    <option value="freemium">部分免费</option>
                  </select>
                </div>
              </div>

              {/* 缩略图 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  缩略图 URL（可选）
                </label>
                <input
                  type="url"
                  value={resource.thumbnail}
                  onChange={(e) => updateResource('thumbnail', e.target.value)}
                  placeholder="https://example.com/thumbnail.png"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>

          {/* 作者信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              作者信息
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  作者名称（可选）
                </label>
                <input
                  type="text"
                  value={resource.author}
                  onChange={(e) => updateResource('author', e.target.value)}
                  placeholder="资源作者或机构名称"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  作者链接（可选）
                </label>
                <input
                  type="url"
                  value={resource.authorUrl}
                  onChange={(e) => updateResource('authorUrl', e.target.value)}
                  placeholder="https://github.com/author"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>

          {/* 标签和评分 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              标签和评分
            </h2>

            <div className="space-y-6">
              {/* 标签 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  标签
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(tagInput), setTagInput(''))}
                    placeholder="输入标签并按回车"
                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => {addTag(tagInput); setTagInput('');}}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    添加
                  </button>
                </div>

                {/* 流行标签 */}
                <div className="mb-3">
                  <p className="text-sm text-muted-foreground mb-2">常用标签：</p>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addPopularTag(tag)}
                        disabled={resource.tags.includes(tag)}
                        className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 已选标签 */}
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* 评分 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Star className="inline h-4 w-4 mr-1" />
                  推荐评分
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => updateResource('rating', star)}
                        className={`p-1 rounded transition-colors ${
                          star <= resource.rating
                            ? 'text-yellow-500 hover:text-yellow-600'
                            : 'text-muted-foreground hover:text-yellow-500'
                        }`}
                      >
                        <Star className={`h-6 w-6 ${star <= resource.rating ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {resource.rating} / 5 星
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 推荐理由 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-primary" />
              推荐理由
            </h2>
            <textarea
              value={resource.reason}
              onChange={(e) => updateResource('reason', e.target.value)}
              placeholder="请说明为什么推荐这个资源，它对 Cursor AI 开发有什么帮助..."
              rows={5}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </motion.div>

          {/* 提交按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <div>
                <p>提交前请确保：</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>资源链接有效且内容质量良好</li>
                  <li>描述准确，分类正确</li>
                  <li>遵守相关版权和使用条款</li>
                  <li>资源对 Cursor AI 开发确实有帮助</li>
                </ul>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !resource.name || !resource.description || !resource.url}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent" />
                  提交中...
                </>
              ) : (
                <>
                  <BookOpen className="h-5 w-5" />
                  提交资源
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
} 