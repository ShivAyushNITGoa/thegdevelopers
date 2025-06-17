import { ApiClient } from '../client';
import { ApiResponse, ContactMessage, ContactMessageInput, PaginatedResponse, QueryParams } from '../types';

export class ContactService {
  private client: ApiClient;
  private baseUrl: string = '/contact';

  constructor(apiClient: ApiClient) {
    this.client = apiClient;
  }

  // Get all contact messages with pagination (admin only)
  public async getMessages(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<ContactMessage>>> {
    return this.client.get<PaginatedResponse<ContactMessage>>(this.baseUrl, { params });
  }

  // Get a single contact message by ID (admin only)
  public async getMessage(id: string): Promise<ApiResponse<ContactMessage>> {
    return this.client.get<ContactMessage>(`${this.baseUrl}/${id}`);
  }

  // Send a new contact message
  public async sendMessage(data: ContactMessageInput): Promise<ApiResponse<void>> {
    return this.client.post<void>(this.baseUrl, data);
  }

  // Update message status (admin only)
  public async updateMessageStatus(id: string, status: ContactMessage['status']): Promise<ApiResponse<ContactMessage>> {
    return this.client.patch<ContactMessage>(`${this.baseUrl}/${id}`, { status });
  }

  // Delete a message (admin only)
  public async deleteMessage(id: string): Promise<ApiResponse<void>> {
    return this.client.delete<void>(`${this.baseUrl}/${id}`);
  }
} 