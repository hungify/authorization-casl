import { useAuth } from '~/hooks/useAuth';

export default function Editor() {
  const { user } = useAuth();
  return (
    <div>
      <h1>This is the Editor Page</h1>
      <h2> Your role is: {user?.role}</h2>
    </div>
  );
}
