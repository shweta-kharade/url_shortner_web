// frontend/src/pages/Login.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import PublicLayout from '../layouts/PublicLayout';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      onLoginSuccess();
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="w-full max-w-sm">
        <h1 className="text-2xl mb-6">Log in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-surface border border-surface focus:border-accent outline-none rounded-sm px-4 py-3 placeholder:text-muted transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-surface border border-surface focus:border-accent outline-none rounded-sm px-4 py-3 placeholder:text-muted transition-colors"
          />
          {error && <p className="text-danger text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-accent rounded-sm py-3 hover:bg-accent/90 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        <p className="text-muted text-sm mt-4">
          No account?{' '}
          <Link to="/register" className="text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </PublicLayout>
  );
}

export default Login;