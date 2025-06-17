// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Error Types
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Common Query Parameters
export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  [key: string]: any;
}

// Blog API Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: {
    name: string;
    image?: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
}

export interface BlogPostInput {
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  category: string;
  tags?: string[];
}

// Project API Types
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  images?: string[];
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  completedAt: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  images?: string[];
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  completedAt: string;
}

// Team API Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface TeamMemberInput {
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

// Contact API Types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied' | 'archived';
}

export interface ContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
} 