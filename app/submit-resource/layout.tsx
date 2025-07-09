import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '提交资源 | Cursor Replay',
  description: '分享对 Cursor AI 开发有帮助的工具、教程和资源，让社区一起成长',
  openGraph: {
    title: '提交资源 | Cursor Replay',
    description: '分享对 Cursor AI 开发有帮助的工具、教程和资源，让社区一起成长',
    type: 'website',
  },
};

export default function SubmitResourceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 