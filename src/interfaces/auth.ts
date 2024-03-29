import { Actions, Roles, Subjects } from '~/configs/auth';

export interface User {
  email: string;
  role: AppRole;
  password?: string;
  id?: number;
  name?: string;
  isAuthenticated?: boolean;
}

export type UserLogin = Pick<User, 'email'>;

export type UserRegister = Omit<User, 'id' | 'isAuthenticated'>;

export type AppRole = `${Roles}`;

export type AppAction = `${Actions}`;

export type AppSubject = `${Subjects}`;
