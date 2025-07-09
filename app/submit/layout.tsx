import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '提交项目 | Cursor Replay',
  description: '分享你使用 Cursor AI 创建的项目，展示你的创造力和技术能力',
  openGraph: {
    title: '提交项目 | Cursor Replay',
    description: '分享你使用 Cursor AI 创建的项目，展示你的创造力和技术能力',
    type: 'website',
  },
};

export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 