import { useState } from 'react';
import { useAuth } from '~/hooks/useAuth';

export default function Login() {
  const auth = useAuth();
  const [email, setEmail] = useState('admin');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const mockEmail = ['admin', 'subscriber', 'editor'];
    if (mockEmail.indexOf(email) > -1) {
      auth.onLogin({ email });
      setEmail('');
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  return auth?.isAuthenticated ? (
    <h1>
      You are logged in as email {auth.user?.email} and {auth?.user?.role} role
    </h1>
  ) : (
    <div>
      <h1>Login Page</h1>
      <h2>admin role: admin</h2>
      <h2>editor role: editor/editor</h2>
      <h2>subscriber role: subscriber/subscriber</h2>
      <div>
        <span>Password</span>
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <br />
      {error && <div>{error}</div>}
      <button type='submit' onClick={handleLogin}>
        Log in
      </button>
    </div>
  );
}
