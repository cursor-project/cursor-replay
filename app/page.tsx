import Hero from '@/components/Hero';
import ProjectGrid from '@/components/ProjectGrid';
import { mockProjects } from '@/data/mockProjects';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">探索项目</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              发现使用 Cursor AI 创建的精彩项目，查看完整的生成过程和代码实现
            </p>
          </div>
          <ProjectGrid projects={mockProjects} />
        </div>
      </section>
    </div>
  );
}
