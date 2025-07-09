'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Code2, FileText, Cpu, Star, Eye, ExternalLink, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CodeViewer from './CodeViewer';

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [currentReplayIndex, setCurrentReplayIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedRules, setCopiedRules] = useState(false);

  const currentReplay = project.replays[currentReplayIndex];

  // 自动播放功能
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentReplayIndex < project.replays.length - 1) {
        setCurrentReplayIndex(currentReplayIndex + 1);
      } else {
        setIsPlaying(false);
      }
    }, 3000); // 每3秒切换到下一个回放

    return () => clearTimeout(timer);
  }, [isPlaying, currentReplayIndex, project.replays.length]);

  const handlePrevious = () => {
    if (currentReplayIndex > 0) {
      setCurrentReplayIndex(currentReplayIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentReplayIndex < project.replays.length - 1) {
      setCurrentReplayIndex(currentReplayIndex + 1);
    }
  };

  const togglePlay = () => {
    if (currentReplayIndex === project.replays.length - 1 && !isPlaying) {
      setCurrentReplayIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const copyRules = () => {
    if (project.cursorRules) {
      navigator.clipboard.writeText(project.cursorRules);
      setCopiedRules(true);
      setTimeout(() => setCopiedRules(false), 2000);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            返回项目列表
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Project Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {project.stars} Stars
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {project.views} Views
                </span>
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    查看演示
                  </a>
                )}
              </div>
            </div>

            {/* Thumbnail */}
            <div className="lg:w-96">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Replay Section */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">代码回放</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentReplayIndex === 0}
                className="p-2 rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-muted-foreground px-3">
                {currentReplayIndex + 1} / {project.replays.length}
              </span>
              <button
                onClick={handleNext}
                disabled={currentReplayIndex === project.replays.length - 1}
                className="p-2 rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={togglePlay}
                className="ml-4 p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          {isPlaying && (
            <div className="mb-4 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: 'linear' }}
                key={currentReplayIndex}
              />
            </div>
          )}

          {/* Replay Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReplayIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Prompt */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="font-medium">Prompt</span>
                </div>
                <p className="text-sm leading-relaxed">{currentReplay.prompt}</p>
              </div>

              {/* Model & MCP */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-4 h-4 text-primary" />
                    <span className="font-medium">模型</span>
                  </div>
                  <p className="text-sm">{currentReplay.model}</p>
                </div>

                {currentReplay.mcp && currentReplay.mcp.length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Code2 className="w-4 h-4 text-primary" />
                      <span className="font-medium">MCP 工具</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {currentReplay.mcp.map((tool) => (
                        <span key={tool} className="text-sm px-2 py-1 bg-background rounded">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Code Changes */}
              <div className="space-y-4">
                <h3 className="font-medium">生成的代码</h3>
                {currentReplay.files.map((file, index) => (
                  <CodeViewer key={index} file={file} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Cursor Rules */}
        {project.cursorRules && (
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Cursor Rules</h2>
              <button
                onClick={copyRules}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
              >
                {copiedRules ? (
                  <>
                    <Check className="w-4 h-4" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    复制规则
                  </>
                )}
              </button>
            </div>
            <pre className="bg-muted/50 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm">{project.cursorRules}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 