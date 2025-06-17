import { ApiClient } from '../client';
import { ApiResponse, Project, ProjectInput, PaginatedResponse, QueryParams } from '../types';

export class ProjectsService {
  private client: ApiClient;
  private baseUrl: string = '/projects';

  constructor(apiClient: ApiClient) {
    this.client = apiClient;
  }

  // Get all projects with pagination
  public async getProjects(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Project>>> {
    return this.client.get<PaginatedResponse<Project>>(this.baseUrl, { params });
  }

  // Get a single project by ID or slug
  public async getProject(idOrSlug: string): Promise<ApiResponse<Project>> {
    return this.client.get<Project>(`${this.baseUrl}/${idOrSlug}`);
  }

  // Create a new project
  public async createProject(data: ProjectInput): Promise<ApiResponse<Project>> {
    return this.client.post<Project>(this.baseUrl, data);
  }

  // Update an existing project
  public async updateProject(id: string, data: Partial<ProjectInput>): Promise<ApiResponse<Project>> {
    return this.client.put<Project>(`${this.baseUrl}/${id}`, data);
  }

  // Delete a project
  public async deleteProject(id: string): Promise<ApiResponse<void>> {
    return this.client.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Get featured projects
  public async getFeaturedProjects(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Project>>> {
    return this.client.get<PaginatedResponse<Project>>(`${this.baseUrl}/featured`, { params });
  }

  // Get projects by technology
  public async getProjectsByTechnology(technology: string, params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Project>>> {
    return this.client.get<PaginatedResponse<Project>>(`${this.baseUrl}/technology/${technology}`, { params });
  }
} 