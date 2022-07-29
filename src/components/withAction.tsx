import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';
import { Actions } from '~/interfaces/auth';

export default function withAction<T>(actions: Actions[]) {
  return function (Component: React.ComponentType<T>) {
    return function WrappedComponent(props: T & React.HTMLAttributes<T>) {
      const { user, isAuthenticated } = useAuth();

      if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
      } else if (user?.role && actions.includes(user.role)) {
        return <Component {...props} />;
      }
      return <Navigate to='/unauthorized' replace />;
    };
  };
}
