import { SUBJECTS } from '~/configs/auth';
import { ACTIONS, ROLES } from '~/configs/auth';

export interface User {
  email: string;
  password?: string;
  role?: Roles;
  id?: number;
  name?: string;
  isAuthenticated?: boolean;
  abilities?: Abilities;
}

// export type UserLogin = Pick<User, 'email' | 'password'>;
export type UserLogin = Pick<User, 'email'>;

export type UserRegister = Omit<User, 'id' | 'isAuthenticated'>;

export type Roles = keyof typeof ROLES;

export type Actions = keyof typeof ACTIONS;

export type Subjects = keyof typeof SUBJECTS;

export type Abilities = {
  [key in Subjects]?: Actions[];
};
