import { UserLogin, UserRegister } from '~/interfaces/auth';

export const enum AuthTypes {
  login = 'auth/login',
  logout = 'auth/logout',
  register = 'auth/register',
  forgotPassword = 'auth/forgotPassword',
  resetPassword = 'auth/resetPassword',
  verifyEmail = 'auth/verifyEmail',
}

interface Login {
  type: AuthTypes.login;
  payload: UserLogin;
}

interface Register {
  type: AuthTypes.register;
  payload?: UserRegister;
}

interface Logout {
  type: AuthTypes.logout;
}

export type AuthActionTypes = Login | Register | Logout;
