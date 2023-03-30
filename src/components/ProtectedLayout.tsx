import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';
import { AppRole } from '~/interfaces/auth';

interface ProtectedLayoutProps {
  allowedRoles?: AppRole[];
}

export default function ProtectedLayout({ allowedRoles }: ProtectedLayoutProps) {
  const location = useLocation();
  const auth = useAuth();

  if (auth?.isAuthenticated && auth?.user?.role) {
    const { role } = auth.user;
    const isAllowed = allowedRoles?.includes(role);

    if (isAllowed) return <Outlet />;

    return <Navigate to='unauthorized' state={{ from: location }} replace />;
  }
  return <Navigate to='login' state={{ from: location }} replace />;
}
