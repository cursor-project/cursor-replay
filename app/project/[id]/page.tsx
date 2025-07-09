import { notFound } from 'next/navigation';
import { mockProjects } from '@/data/mockProjects';
import ProjectDetail from '@/components/ProjectDetail';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = mockProjects.find(p => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}

// Generate static params for all projects
export function generateStaticParams() {
  return mockProjects.map((project) => ({
    id: project.id,
  }));
} 