# 部署指南

## 部署到 Vercel

### 方法一：通过 Vercel CLI

1. 安装 Vercel CLI：
```bash
npm install -g vercel
```

2. 在项目根目录运行：
```bash
vercel
```

3. 按照提示完成部署

### 方法二：通过 GitHub

1. 将项目推送到 GitHub：
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/cursor-replay.git
git push -u origin main
```

2. 登录 [Vercel](https://vercel.com)

3. 点击 "New Project"

4. 导入你的 GitHub 仓库

5. 保持默认设置，点击 "Deploy"

## 环境变量

如果你需要添加 API 密钥或其他环境变量：

1. 在 Vercel 项目设置中找到 "Environment Variables"
2. 添加你的环境变量
3. 重新部署项目

## 自定义域名

1. 在 Vercel 项目设置中找到 "Domains"
2. 添加你的自定义域名
3. 按照指示配置 DNS

## 注意事项

- 确保 `next.config.ts` 中的图片域名配置正确
- Mock 数据中的图片链接需要是 HTTPS
- 部署后可能需要清除缓存才能看到最新更改 