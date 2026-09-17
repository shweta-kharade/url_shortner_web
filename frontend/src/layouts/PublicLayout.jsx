// frontend/src/layouts/PublicLayout.jsx
import { Link } from "react-router-dom";
import Logo from '../components/Logo';

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-8 py-5 border-b border-surface">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <div className="flex gap-4 text-sm">
          <Link
            to="/login"
            className="text-muted hover:text-text transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="px-3 py-1.5 bg-accent text-text rounded-sm hover:bg-accent/90 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-8">
        {children}
      </main>
    </div>
  );
}

export default PublicLayout;
