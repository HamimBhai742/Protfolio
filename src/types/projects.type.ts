export interface Project {
  id: number;
  userId: number;
  title: string;
  thumbnail?: string;
  description: string;
  details?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  startDate: string;
  endDate?: string;
  features: string;
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
  status: 'completed' | 'in_progress' | 'planned';
}

export interface ProjectCardProps {
  project: Project;
  viewMode: 'grid' | 'list';
  handleEdit: (project: Project) => void;
  handleDelete: (id: number) => void;
}

export interface ProjectsListProps {
  viewMode: 'grid' | 'list';
  filter: ProjectFiltersType;
  setShowAddForm: (show: boolean) => void;
  showAddForm: boolean;
}

export interface ProjectFiltersType {
  status?: 'completed' | 'in_progress' | 'planned' | 'all';
  search?: string;
}
