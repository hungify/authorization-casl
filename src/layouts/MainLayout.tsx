import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';

export default function MainLayout() {
  const auth = useAuth();

  const handleLogout = () => {
    auth.onLogout();
  };

  return (
    <>
      <Link to='login'>Login</Link>
      <br />
      <br />
      <Link to='admin'>Admin</Link>
      <br />
      <br />
      <Link to='editor'>Editor</Link>
      <br />
      <br />
      <Link to='subscriber'>Subscriber</Link>
      <br />
      <br />
      <Link to='todo'>Todo</Link>
      <br />
      <br />
      {auth.isAuthenticated && <button onClick={handleLogout}>Logout</button>}
      <Outlet />
    </>
  );
}
