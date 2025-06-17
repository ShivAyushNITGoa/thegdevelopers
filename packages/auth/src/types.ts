export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// This is a mock database of users for demonstration purposes
// In a real application, this would be stored in a database
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@gdevelopers.com',
    role: UserRole.ADMIN,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  },
  {
    id: '2',
    name: 'Test User',
    email: 'user@example.com',
    role: UserRole.USER,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
]; 