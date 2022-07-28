import { Navigate } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';
import { Roles } from '~/interfaces/user';

export default function withRole<T>(roles: Roles[]) {
  return function NewComponent(Component: React.ComponentType<T>) {
    return function WrappedComponent(props: T) {
      const { user, isAuthenticated } = useAuth();

      if (!isAuthenticated) {
        return <Navigate to='/login' state={{}} replace />;
      } else if (user?.role && roles.includes(user.role)) {
        return <Component {...props} />;
      }
      return <Navigate to='/unauthorized' replace />;
    };
  };
}
