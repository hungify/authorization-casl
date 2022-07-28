import { useCallback, useReducer } from 'react';
import { UserLogin } from '~/interfaces/user';
import { AuthActionTypes, AuthTypes } from './authAction';
import { AuthState } from './AuthProvider';

export type Dispatch = (action: AuthActionTypes) => void;

export default function useAuthReducer(initialState: AuthState) {
  const [state, dispatch] = useReducer((state: AuthState, action: AuthActionTypes) => {
    const { type } = action;
    switch (type) {
      case AuthTypes.login:
        return {
          ...state,
          user: action.payload,
        };
      case AuthTypes.logout:
        return {
          ...state,
          user: null,
        };
      default:
        return state;
    }
  }, initialState);

  const handleLogin = useCallback((data: UserLogin) => {
    dispatch({ type: AuthTypes.login, payload: data });
  }, []);

  const handleLogout = useCallback(() => {
    dispatch({ type: AuthTypes.logout });
  }, []);

  return {
    state,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };
}
