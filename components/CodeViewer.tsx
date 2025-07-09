'use client';

import { FileChange } from '@/types';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChevronDown, ChevronRight, FileCode, Plus, Minus, Copy, Check } from 'lucide-react';

interface CodeViewerProps {
  file: FileChange;
}

export default function CodeViewer({ file }: CodeViewerProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-muted/50 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <FileCode className="w-4 h-4" />
          <span>{file.path}</span>
        </button>

        <div className="flex items-center gap-4">
          {file.diff && (
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-green-600">
                <Plus className="w-3 h-3" />
                {file.diff.added}
              </span>
              <span className="flex items-center gap-1 text-red-600">
                <Minus className="w-3 h-3" />
                {file.diff.removed}
              </span>
            </div>
          )}

          <button
            onClick={copyCode}
            className="p-1 rounded hover:bg-accent transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Code */}
      {isExpanded && (
        <div className="relative">
          <SyntaxHighlighter
            language={file.language}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.875rem',
              lineHeight: '1.5',
            }}
            showLineNumbers
          >
            {file.content}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
} 