export interface Project {
  id: number;
  title: string;
  description: string;
  features: string;
  thumbnail: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: ProjectCategory;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
}

export type ProjectCategory =
  | 'Web Development'
  | 'Mobile App'
  | 'Desktop App'
  | 'API Development'
  | 'UI/UX Design'
  | 'Other';

export type ProjectStatus =
  | 'completed'
  | 'in_progress'
  | 'planned';

export interface ProjectsClientProps {
  projects: Project[];
}
