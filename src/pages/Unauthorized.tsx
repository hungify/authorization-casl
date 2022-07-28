import { useAuth } from '~/hooks/useAuth';

export default function Unauthorized() {
  const auth = useAuth();
  return (
    <div>
      <h1>Unauthorized</h1>
      <h2> Your role is: {auth?.user?.role}</h2>
      <h2>You are not authorized to access this page</h2>
    </div>
  );
}
