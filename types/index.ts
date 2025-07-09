export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  demoUrl?: string;
  createdAt: string;
  tags: string[];
  stars: number;
  views: number;
  replays: Replay[];
  cursorRules?: string;
}

export interface Replay {
  id: string;
  timestamp: string;
  prompt: string;
  model: string;
  mcp?: string[];
  files: FileChange[];
}

export interface FileChange {
  path: string;
  language: string;
  content: string;
  diff?: {
    added: number;
    removed: number;
  };
} 