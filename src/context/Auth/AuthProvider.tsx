import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { defineRulesFor } from '~/configs/auth';
import { Actions, Roles, Subjects, User, UserLogin } from '~/interfaces/auth';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  onLogin: (user: UserLogin) => void;
  onLogout: () => void;
  can: (subject: Subjects, action: Actions) => boolean;
}
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  onLogin: () => undefined,
  onLogout: () => undefined,
  can: () => false,
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
    const { abilities } = defineRulesFor(role);

    setUser({
      ...data,
      role,
      abilities,
      isAuthenticated: true,
    });

    navigate(role.toLowerCase(), { replace: true });
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const can = (subject: Subjects, action: Actions) => {
    if (!user?.abilities) {
      return false;
    }
    const isYouCanDoActionOfSubject = user.abilities[subject]?.includes(action);
    return isYouCanDoActionOfSubject ?? false;
  };

  const value = {
    isAuthenticated: !!user,
    user,
    can,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
