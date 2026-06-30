export interface Project {
  id: number;
  title: string;
  description: string;
  details?: string;
  features: string;
  thumbnail: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: ProjectCategory;
  startDate: string;
  endDate: string;
  images?: string[];
  videoUrl?: string;
  metrics?: Array<{ label: string; value: string }>;
  team?: Array<{
    name: string;
    role: string;
    avatar?: string;
    github?: string;
    linkedin?: string;
  }>;
  testimonials?: Array<{
    clientName: string;
    clientCompany: string;
    clientAvatar?: string;
    feedback: string;
    rating: number;
  }>;
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
