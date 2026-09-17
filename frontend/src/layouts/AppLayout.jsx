// frontend/src/layouts/AppLayout.jsx
import Sidebar from '../components/Sidebar';

function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

export default AppLayout;