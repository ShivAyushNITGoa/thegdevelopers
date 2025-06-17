"use client";

import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '../types';
import { api } from '../index';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  initialData?: T;
}

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
}

type ApiFunction<T, P extends any[]> = (...args: P) => Promise<T>;

export function useApi<T, P extends any[]>(
  apiFunction: ApiFunction<T, P>,
  options: UseApiOptions<T> = {}
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: options.initialData || null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: P) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const result = await apiFunction(...args);
        setState({ data: result, isLoading: false, error: null });
        options.onSuccess?.(result);
        return result;
      } catch (error) {
        const apiError = error as ApiError;
        setState({ data: null, isLoading: false, error: apiError });
        options.onError?.(apiError);
        throw error;
      }
    },
    [apiFunction, options]
  );

  return {
    ...state,
    execute,
    reset: useCallback(() => {
      setState({
        data: options.initialData || null,
        isLoading: false,
        error: null,
      });
    }, [options.initialData]),
  };
}

// Predefined hooks for common API operations
export function useBlogPosts(options: UseApiOptions<any> = {}) {
  return useApi(api.blog.getPosts.bind(api.blog), options);
}

export function useBlogPost(options: UseApiOptions<any> = {}) {
  return useApi(api.blog.getPost.bind(api.blog), options);
}

export function useProjects(options: UseApiOptions<any> = {}) {
  return useApi(api.projects.getProjects.bind(api.projects), options);
}

export function useProject(options: UseApiOptions<any> = {}) {
  return useApi(api.projects.getProject.bind(api.projects), options);
}

export function useTeamMembers(options: UseApiOptions<any> = {}) {
  return useApi(api.team.getTeamMembers.bind(api.team), options);
}

export function useTeamMember(options: UseApiOptions<any> = {}) {
  return useApi(api.team.getTeamMember.bind(api.team), options);
}

export function useSendContactMessage(options: UseApiOptions<any> = {}) {
  return useApi(api.contact.sendMessage.bind(api.contact), options);
} 