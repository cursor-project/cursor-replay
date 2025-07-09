# Cursor Replay

一个用于托管和展示 Cursor AI 生成项目的现代化网站，支持代码生成过程回放功能。

## 功能特点

- 🎨 **现代化 UI 设计** - 参考 Cursor 官网风格，简洁优雅
- 🔄 **代码回放功能** - 展示 Cursor 每次 Prompt 生成的文件和代码
- 💡 **项目展示** - 包含缩略图、演示链接、标签等完整信息
- 📝 **Cursor Rules 展示** - 查看和复制项目的 Cursor 规则
- 🚀 **性能优化** - 使用 Next.js 14 App Router，支持 SSG
- 🌙 **深色模式** - 默认深色主题，保护眼睛

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **代码高亮**: React Syntax Highlighter
- **图标**: Lucide React
- **部署**: Vercel

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## 项目结构

```
cursor-replay-app/
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── project/[id]/      # 项目详情页
├── components/            # React 组件
│   ├── Navbar.tsx        # 导航栏
│   ├── Hero.tsx          # 首页 Hero 区域
│   ├── ProjectGrid.tsx   # 项目网格
│   ├── ProjectCard.tsx   # 项目卡片
│   ├── ProjectDetail.tsx # 项目详情
│   └── CodeViewer.tsx    # 代码查看器
├── data/                  # Mock 数据
│   └── mockProjects.ts   # 模拟项目数据
├── types/                 # TypeScript 类型定义
│   └── index.ts          # 类型定义
└── public/               # 静态资源
```

## 数据结构

项目使用以下主要数据结构：

- **Project**: 项目信息，包含标题、描述、标签、回放等
- **Replay**: 单次代码生成记录，包含 Prompt、模型、文件变更等
- **FileChange**: 文件变更信息，包含路径、语言、内容等

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 选择 Next.js 框架预设
4. 点击部署

## 待实现功能

- [ ] 搜索功能
- [ ] 用户认证
- [ ] 项目上传
- [ ] 评论系统
- [ ] 自动播放回放
- [ ] 代码 diff 视图
- [ ] 响应式优化

## License

MIT
