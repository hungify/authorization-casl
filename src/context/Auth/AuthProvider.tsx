import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { Roles, User, UserLogin } from '~/interfaces/user';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  onLogin: (user: UserLogin) => void;
  onLogout: () => void;
}
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  onLogin: () => undefined,
  onLogout: () => undefined,
};

export const AuthContext = createContext(initialState);
AuthContext.displayName = 'AuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const navigate = useNavigate();

  const handleLogin = (data: UserLogin) => {
    const mockEmail = ['admin', 'subscriber', 'editor'];
    const isExistRole = mockEmail[mockEmail.findIndex((email) => email === data.email)];
    if (!isExistRole) {
      return;
    }
    const role = (isExistRole?.charAt(0).toUpperCase() + isExistRole.slice(1)) as Roles;

    setUser({
      ...data,
      role,
      isAuthenticated: true,
    });

    navigate(role.toLowerCase(), { replace: true });
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = {
    isAuthenticated: !!user,
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
