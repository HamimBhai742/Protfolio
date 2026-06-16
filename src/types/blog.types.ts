export interface BlogFormData {
  title: string;
  status: 'draft' | 'published'|'';
  content: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: File[] | null;
}

export interface BlogPost extends Omit<BlogFormData, 'thumbnail'> {
  id: string;
  slug: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published';
  readTime: number;
  views?: number;
}

export const blogCategories = [
    'Technology',
    'Web_Development',
    'Programming',
    'Lifestyle',
    'Travel',
    'Photography',
    'Food',
    'Education',
    'Business',
    'Other'
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export interface BlogFilters {
  category?: string;
  status?: 'draft' | 'published' | 'all';
  search?: string;
}


export interface BlogCardProps {
  blog: BlogPost;
  onEdit: (blog: BlogPost) => void;
  onDelete: (id: number) => void;
}