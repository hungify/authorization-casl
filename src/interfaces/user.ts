import { ROLES } from '~/configs/roles';

export type Roles = keyof typeof ROLES;

export interface User {
  email: string;
  password?: string;
  role?: Roles;
  id?: number;
  name?: string;
  isAuthenticated?: boolean;
}

// export type UserLogin = Pick<User, 'email' | 'password'>;
export type UserLogin = Pick<User, 'email'>;

export type UserRegister = Omit<User, 'id' | 'isAuthenticated'>;
