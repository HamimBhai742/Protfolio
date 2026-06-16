export interface Project {
  id: number;
  userId: number;
  title: string;
  thumbnail?: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  startDate: string;
  endDate?: string;
  features: string;
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
