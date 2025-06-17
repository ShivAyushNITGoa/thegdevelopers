import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError, ApiResponse } from './types';

export class ApiClient {
  private client: AxiosInstance;
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'https://api.gdevelopers.com') {
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const apiError: ApiError = {
          status: error.response?.status || 500,
          message: error.response?.data?.message || 'An unknown error occurred',
          errors: error.response?.data?.errors,
        };
        return Promise.reject(apiError);
      }
    );
  }

  // Add auth token to requests
  public setAuthToken(token: string): void {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Remove auth token
  public clearAuthToken(): void {
    delete this.client.defaults.headers.common['Authorization'];
  }

  // Generic GET request
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await this.client.get(url, config);
      return this.formatResponse<T>(response);
    } catch (error) {
      throw error;
    }
  }

  // Generic POST request
  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await this.client.post(url, data, config);
      return this.formatResponse<T>(response);
    } catch (error) {
      throw error;
    }
  }

  // Generic PUT request
  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await this.client.put(url, data, config);
      return this.formatResponse<T>(response);
    } catch (error) {
      throw error;
    }
  }

  // Generic PATCH request
  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await this.client.patch(url, data, config);
      return this.formatResponse<T>(response);
    } catch (error) {
      throw error;
    }
  }

  // Generic DELETE request
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await this.client.delete(url, config);
      return this.formatResponse<T>(response);
    } catch (error) {
      throw error;
    }
  }

  // Format API response
  private formatResponse<T>(response: AxiosResponse): ApiResponse<T> {
    return {
      data: response.data.data || response.data,
      status: response.status,
      message: response.data.message || 'Success',
    };
  }
} 