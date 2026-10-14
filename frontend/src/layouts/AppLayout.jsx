// frontend/src/layouts/AppLayout.jsx
// import Sidebar from '../components/Sidebar';

// function AppLayout({ children }) {
//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <main className="flex-1 p-8">{children}</main>
//     </div>
//   );
// }

// export default AppLayout;

// frontend/src/layouts/AppLayout.jsx
import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Logo from '../components/Logo';

function AppLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-surface">
          <Logo />
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="text-muted hover:text-text">
            <Menu size={22} />
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;