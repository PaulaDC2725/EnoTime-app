export const UserRoles = {
  ADMIN: 'Administrator',
  EMPLOYEE: 'Employee'
} as const;

export type UserRole = typeof UserRoles[keyof typeof UserRoles];

export interface User {
  id?: string;
  email: string;
  role: UserRole;
  fullName?: string;
}

export interface RegisterPayload {
  full_name?: string;
  position_title?: string;
  email: string;
  password: string;
  role: UserRole;
  manager_id?: number | null;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}