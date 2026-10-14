// // frontend/src/components/Sidebar.jsx
// import {Link, NavLink, useNavigate } from 'react-router-dom';
// import Logo from './Logo';


// function Sidebar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const linkClasses = ({ isActive }) =>
//     `block px-4 py-2 rounded-none border-l-2 transition-colors ${
//       isActive
//         ? 'border-accent text-text bg-surface'
//         : 'border-transparent text-muted hover:text-text'
//     }`;

//   return (
//     <aside className="w-56 shrink-0 bg-ink border-r border-surface flex flex-col">
//       <Link to="/" className="px-4 py-6 block hover:opacity-80 transition-opacity">
//   <Logo />
// </Link>

//       <nav className="flex-1">
//         <NavLink to="/my-links" className={linkClasses}>
//           My Links
//         </NavLink>
//       </nav>

//       <button
//         onClick={handleLogout}
//         className="mx-4 mb-6 text-left text-sm text-muted hover:text-danger transition-colors"
//       >
//         Log out
//       </button>
//     </aside>
//   );
// }

// export default Sidebar;



// frontend/src/components/Sidebar.jsx
import { NavLink, Link } from 'react-router-dom';
import { Home, Link2, LogOut, X } from 'lucide-react';
import { getCurrentUser } from '../utils/auth';
import Logo from './Logo';

function Sidebar({ open, onClose }) {
  const user = getCurrentUser();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 md:py-2 text-sm border-l-2 transition-colors ${
      isActive
        ? 'border-accent text-text bg-surface'
        : 'border-transparent text-muted hover:text-text hover:bg-surface/50'
    }`;

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 md:w-56 shrink-0 bg-ink border-r border-surface flex flex-col transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 py-6">
          <Link to="/" onClick={onClose} className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>
          <button onClick={onClose} aria-label="Close menu" className="md:hidden text-muted hover:text-text">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1">
          <p className="px-4 text-xs text-muted uppercase tracking-wide mb-2">Menu</p>
          <nav className="flex flex-col gap-1">
            <NavLink to="/" end onClick={onClose} className={linkClasses}>
              <Home size={16} /> Home
            </NavLink>
            <NavLink to="/my-links" onClick={onClose} className={linkClasses}>
              <Link2 size={16} /> My Links
            </NavLink>
          </nav>
        </div>

        <div className="border-t border-surface px-4 py-4">
          {user?.email && <p className="text-xs text-muted truncate mb-2">{user.email}</p>}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted hover:text-danger transition-colors"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;