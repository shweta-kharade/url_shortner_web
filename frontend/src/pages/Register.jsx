// frontend/src/pages/Register.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import PublicLayout from '../layouts/PublicLayout';

function Register({ onRegisterSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/register', { email, password });
      localStorage.setItem('token', res.data.token);
      onRegisterSuccess();
    } catch (err) {
      setError(err.response?.status === 409
        ? 'An account with this email already exists'
        : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="w-full max-w-sm">
        <h1 className="text-2xl mb-6">Create an account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} required
            className="bg-surface border border-surface focus:border-accent outline-none rounded-sm px-4 py-3 placeholder:text-muted transition-colors" />
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} required
            className="bg-surface border border-surface focus:border-accent outline-none rounded-sm px-4 py-3 placeholder:text-muted transition-colors" />
          <input type="password" placeholder="Confirm password" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} required
            className="bg-surface border border-surface focus:border-accent outline-none rounded-sm px-4 py-3 placeholder:text-muted transition-colors" />
          {error && <p className="text-danger text-sm">{error}</p>}
          <button type="submit" disabled={loading}
            className="bg-accent rounded-sm py-3 hover:bg-accent/90 disabled:opacity-50 transition-colors">
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
        <p className="text-muted text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:underline">Log in</Link>
        </p>
      </div>
    </PublicLayout>
  );
}

export default Register;