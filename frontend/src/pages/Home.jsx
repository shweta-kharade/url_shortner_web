// frontend/src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import CreateLinkForm from "../components/CreateLinkForm";
import PublicLayout from "../layouts/PublicLayout";
import AppLayout from "../layouts/AppLayout";

function Home() {
  const isLoggedIn = !!localStorage.getItem("token");
  const [recentLinks, setRecentLinks] = useState([]);

  const fetchRecent = () => {
    if (!isLoggedIn) return;
    api
      .get("/api/my-links")
      .then((res) => setRecentLinks(res.data.slice(0, 5)))
      .catch(() => {});
  };

  useEffect(fetchRecent, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <PublicLayout>
        <div className="text-center max-w-lg animate-fade-in">
          <div className="flex justify-center mb-6">
            <svg
              width="48"
              height="48"
              viewBox="0 0 64 64"
              className="animate-float"
            >
              <rect width="64" height="64" rx="14" fill="#111318" />
              <rect
                x="14"
                y="29"
                width="36"
                height="6"
                rx="3"
                fill="#8A8F98"
                opacity="0.4"
              />
              <rect x="14" y="29" width="16" height="6" rx="3" fill="#3B5BFE" />
              <rect x="34" y="29" width="6" height="6" fill="#111318" />
              <rect
                x="36"
                y="20"
                width="4"
                height="24"
                rx="2"
                fill="#22D3AA"
                transform="rotate(20 38 32)"
              />
            </svg>
          </div>
          <h1 className="text-4xl leading-tight mb-3">
            Shorten a link.
            <br />
            See what happens to it.
          </h1>
          <p className="text-muted mb-10">
            Free to use. Create an account to track clicks over time.
          </p>
          <CreateLinkForm />
          <div className="flex justify-center gap-8 mt-12 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-chart" /> No signup
              required
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Click
              analytics
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-chart" /> Custom
              aliases
            </span>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <AppLayout>
      <h2 className="text-xl mb-6">Shorten a link</h2>
      <CreateLinkForm onCreated={fetchRecent} />

      <div className="mt-12 border-t border-surface pt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-muted">Recent links</h3>
          <Link to="/my-links" className="text-sm text-accent hover:underline">
            View all
          </Link>
        </div>
        {recentLinks.length === 0 ? (
          <p className="text-muted text-sm">
            Nothing here yet — shorten your first link above.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {recentLinks.map((link) => (
              <li
                key={link.shortCode}
                className="flex justify-between items-center text-sm py-3 border-b border-surface/50 hover:bg-surface/30 -mx-2 px-2 rounded-sm transition-colors"
              >
                <Link
                  to={`/dashboard/${link.shortCode}`}
                  className="font-mono text-accent hover:underline"
                >
                  {link.shortCode}
                </Link>
                <span className="text-muted font-mono">
                  {link.clicks} clicks
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppLayout>
  );
}

export default Home;
