// Export types
export * from './types';

// Export client
export { ApiClient } from './client';

// Re-export services
export { BlogService } from './services/blog';
export { ProjectsService } from './services/projects';
export { TeamService } from './services/team';
export { ContactService } from './services/contact';

// Create and export a default API client instance
import { ApiClient } from './client';
import { BlogService } from './services/blog';
import { ProjectsService } from './services/projects';
import { TeamService } from './services/team';
import { ContactService } from './services/contact';

// Create a singleton API client
const apiClient = new ApiClient();

// Create service instances
const blogService = new BlogService(apiClient);
const projectsService = new ProjectsService(apiClient);
const teamService = new TeamService(apiClient);
const contactService = new ContactService(apiClient);

// Export services
export const api = {
  client: apiClient,
  blog: blogService,
  projects: projectsService,
  team: teamService,
  contact: contactService,
}; 