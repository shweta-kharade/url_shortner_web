// frontend/src/components/Sidebar.jsx
import {Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';


function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const linkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded-none border-l-2 transition-colors ${
      isActive
        ? 'border-accent text-text bg-surface'
        : 'border-transparent text-muted hover:text-text'
    }`;

  return (
    <aside className="w-56 shrink-0 bg-ink border-r border-surface flex flex-col">
      <Link to="/" className="px-4 py-6 block hover:opacity-80 transition-opacity">
  <Logo />
</Link>

      <nav className="flex-1">
        <NavLink to="/my-links" className={linkClasses}>
          My Links
        </NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className="mx-4 mb-6 text-left text-sm text-muted hover:text-danger transition-colors"
      >
        Log out
      </button>
    </aside>
  );
}

export default Sidebar;