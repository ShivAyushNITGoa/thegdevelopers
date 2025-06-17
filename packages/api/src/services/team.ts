import { ApiClient } from '../client';
import { ApiResponse, TeamMember, TeamMemberInput, PaginatedResponse, QueryParams } from '../types';

export class TeamService {
  private client: ApiClient;
  private baseUrl: string = '/team';

  constructor(apiClient: ApiClient) {
    this.client = apiClient;
  }

  // Get all team members with pagination
  public async getTeamMembers(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<TeamMember>>> {
    return this.client.get<PaginatedResponse<TeamMember>>(this.baseUrl, { params });
  }

  // Get a single team member by ID
  public async getTeamMember(id: string): Promise<ApiResponse<TeamMember>> {
    return this.client.get<TeamMember>(`${this.baseUrl}/${id}`);
  }

  // Create a new team member
  public async createTeamMember(data: TeamMemberInput): Promise<ApiResponse<TeamMember>> {
    return this.client.post<TeamMember>(this.baseUrl, data);
  }

  // Update an existing team member
  public async updateTeamMember(id: string, data: Partial<TeamMemberInput>): Promise<ApiResponse<TeamMember>> {
    return this.client.put<TeamMember>(`${this.baseUrl}/${id}`, data);
  }

  // Delete a team member
  public async deleteTeamMember(id: string): Promise<ApiResponse<void>> {
    return this.client.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Get team members by role
  public async getTeamMembersByRole(role: string, params?: QueryParams): Promise<ApiResponse<PaginatedResponse<TeamMember>>> {
    return this.client.get<PaginatedResponse<TeamMember>>(`${this.baseUrl}/role/${role}`, { params });
  }

  // Get team members by skill
  public async getTeamMembersBySkill(skill: string, params?: QueryParams): Promise<ApiResponse<PaginatedResponse<TeamMember>>> {
    return this.client.get<PaginatedResponse<TeamMember>>(`${this.baseUrl}/skill/${skill}`, { params });
  }
} 