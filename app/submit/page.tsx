'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Plus, X, Code2, FileText, Cpu, Tag, Link as LinkIcon, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ReplayInput {
  id: string;
  prompt: string;
  model: string;
  mcp: string[];
  files: {
    path: string;
    language: string;
    content: string;
  }[];
}

export default function SubmitPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 表单状态
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [cursorRules, setCursorRules] = useState('');
  const [replays, setReplays] = useState<ReplayInput[]>([
    {
      id: '1',
      prompt: '',
      model: 'Claude 3.5 Sonnet',
      mcp: [],
      files: []
    }
  ]);

  // 可用的 AI 模型
  const availableModels = [
    'Claude 3.5 Sonnet',
    'Claude 3 Opus',
    'GPT-4',
    'GPT-4 Turbo',
    'GPT-3.5 Turbo'
  ];

  // 可用的 MCP 工具
  const availableMCPs = [
    'filesystem',
    'github',
    'websocket',
    'browser',
    'terminal'
  ];

  // 添加标签
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  // 删除标签
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  // 添加回放记录
  const addReplay = () => {
    setReplays([...replays, {
      id: Date.now().toString(),
      prompt: '',
      model: 'Claude 3.5 Sonnet',
      mcp: [],
      files: []
    }]);
  };

  // 删除回放记录
  const removeReplay = (id: string) => {
    if (replays.length > 1) {
      setReplays(replays.filter(r => r.id !== id));
    }
  };

  // 更新回放记录
  const updateReplay = (id: string, field: keyof ReplayInput, value: any) => {
    setReplays(replays.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  // 添加文件到回放
  const addFileToReplay = (replayId: string) => {
    const replay = replays.find(r => r.id === replayId);
    if (replay) {
      updateReplay(replayId, 'files', [...replay.files, {
        path: '',
        language: 'typescript',
        content: ''
      }]);
    }
  };

  // 删除文件
  const removeFileFromReplay = (replayId: string, fileIndex: number) => {
    const replay = replays.find(r => r.id === replayId);
    if (replay) {
      updateReplay(replayId, 'files', replay.files.filter((_, i) => i !== fileIndex));
    }
  };

  // 更新文件
  const updateFile = (replayId: string, fileIndex: number, field: string, value: string) => {
    const replay = replays.find(r => r.id === replayId);
    if (replay) {
      const newFiles = [...replay.files];
      newFiles[fileIndex] = { ...newFiles[fileIndex], [field]: value };
      updateReplay(replayId, 'files', newFiles);
    }
  };

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 模拟提交
    setTimeout(() => {
      alert('项目提交成功！（这是模拟提交，实际需要连接后端）');
      router.push('/');
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
            <Upload className="h-10 w-10 text-primary" />
            提交项目
          </h1>
          <p className="text-muted-foreground text-lg">
            分享你使用 Cursor AI 创建的项目，帮助社区学习和成长
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
              {/* 项目标题 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  项目标题 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="例如：AI 聊天应用"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* 项目描述 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  项目描述 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="详细描述你的项目功能和特点..."
                  rows={4}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* 缩略图 URL */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <ImageIcon className="inline h-4 w-4 mr-1" />
                  缩略图 URL
                </label>
                <input
                  type="url"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="https://example.com/image.png"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  建议使用 16:9 比例的图片，推荐尺寸 800x600
                </p>
              </div>

              {/* 演示链接 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <LinkIcon className="inline h-4 w-4 mr-1" />
                  演示链接
                </label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://your-demo.vercel.app"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* 标签 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Tag className="inline h-4 w-4 mr-1" />
                  技术标签
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="输入标签并按回车"
                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    添加
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm flex items-center gap-1">
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
            </div>
          </motion.div>

          {/* 代码回放 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                代码回放记录
              </h2>
              <button
                type="button"
                onClick={addReplay}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                <Plus className="h-4 w-4" />
                添加回放
              </button>
            </div>

            <div className="space-y-6">
              {replays.map((replay, replayIndex) => (
                <div key={replay.id} className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">回放 #{replayIndex + 1}</h3>
                    {replays.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeReplay(replay.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  {/* Prompt */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      <FileText className="inline h-4 w-4 mr-1" />
                      Prompt <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={replay.prompt}
                      onChange={(e) => updateReplay(replay.id, 'prompt', e.target.value)}
                      placeholder="输入你给 Cursor 的指令..."
                      rows={3}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      required
                    />
                  </div>

                  {/* 模型选择 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Cpu className="inline h-4 w-4 mr-1" />
                        AI 模型
                      </label>
                      <select
                        value={replay.model}
                        onChange={(e) => updateReplay(replay.id, 'model', e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {availableModels.map(model => (
                          <option key={model} value={model}>{model}</option>
                        ))}
                      </select>
                    </div>

                    {/* MCP 工具 */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        MCP 工具（可选）
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {availableMCPs.map(mcp => (
                          <label key={mcp} className="flex items-center gap-1">
                            <input
                              type="checkbox"
                              checked={replay.mcp.includes(mcp)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  updateReplay(replay.id, 'mcp', [...replay.mcp, mcp]);
                                } else {
                                  updateReplay(replay.id, 'mcp', replay.mcp.filter(m => m !== mcp));
                                }
                              }}
                              className="rounded border-border text-primary focus:ring-primary"
                            />
                            <span className="text-sm">{mcp}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 生成的文件 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">生成的文件</label>
                      <button
                        type="button"
                        onClick={() => addFileToReplay(replay.id)}
                        className="text-sm text-primary hover:underline"
                      >
                        + 添加文件
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {replay.files.map((file, fileIndex) => (
                        <div key={fileIndex} className="bg-background rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">文件 #{fileIndex + 1}</span>
                            <button
                              type="button"
                              onClick={() => removeFileFromReplay(replay.id, fileIndex)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={file.path}
                              onChange={(e) => updateFile(replay.id, fileIndex, 'path', e.target.value)}
                              placeholder="文件路径，如：src/App.tsx"
                              className="px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                            />
                            <select
                              value={file.language}
                              onChange={(e) => updateFile(replay.id, fileIndex, 'language', e.target.value)}
                              className="px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                            >
                              <option value="typescript">TypeScript</option>
                              <option value="javascript">JavaScript</option>
                              <option value="python">Python</option>
                              <option value="java">Java</option>
                              <option value="go">Go</option>
                              <option value="rust">Rust</option>
                              <option value="html">HTML</option>
                              <option value="css">CSS</option>
                              <option value="other">其他</option>
                            </select>
                          </div>
                          
                          <textarea
                            value={file.content}
                            onChange={(e) => updateFile(replay.id, fileIndex, 'content', e.target.value)}
                            placeholder="粘贴文件内容..."
                            rows={5}
                            className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm font-mono"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cursor Rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Cursor Rules（可选）
            </h2>
            <textarea
              value={cursorRules}
              onChange={(e) => setCursorRules(e.target.value)}
              placeholder="如果你的项目有自定义的 Cursor Rules，请粘贴在这里..."
              rows={8}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm"
            />
          </motion.div>

          {/* 提交按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <div>
                <p>提交前请确保：</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>所有必填字段都已填写</li>
                  <li>代码内容真实有效</li>
                  <li>不包含敏感信息</li>
                </ul>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !title || !description || replays.every(r => !r.prompt)}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent" />
                  提交中...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  提交项目
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
} 