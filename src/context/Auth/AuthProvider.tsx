import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { AppRole, User, UserLogin } from '~/interfaces/auth';

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

const sleep = (ms: number, data: UserLogin) => {
  return new Promise<{
    role: AppRole;
    isAuthenticated: boolean;
  }>((resolve, reject) => {
    setTimeout(() => {
      const mockEmail = {
        admin: 'Admin',
        subscriber: 'Subscriber',
        editor: 'Editor',
      };
      const isExistRole = mockEmail[data.email as keyof typeof mockEmail] as AppRole;
      if (isExistRole) {
        resolve({
          role: isExistRole,
          isAuthenticated: true,
        });
      }
      reject(new Error('Email not found'));
    }, ms);
  });
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const navigate = useNavigate();

  const handleLogin = async (data: UserLogin) => {
    const { role, isAuthenticated } = await sleep(1000, data);

    setUser({
      email: data.email,
      role,
      isAuthenticated,
    });

    navigate(data.email, { replace: true });
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
