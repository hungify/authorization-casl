import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';
import { Roles } from '~/interfaces/user';

interface ProtectedLayoutProps {
  allowedRoles?: Roles[];
}

export default function ProtectedLayout({ allowedRoles }: ProtectedLayoutProps) {
  const location = useLocation();
  const auth = useAuth();

  if (auth?.isAuthenticated && auth?.user?.role) {
    const { role } = auth.user;

    if (allowedRoles?.includes(role)) return <Outlet />;

    return <Navigate to='unauthorized' state={{ from: location }} replace />;
  }
  return <Navigate to='login' state={{ from: location }} replace />;
}
