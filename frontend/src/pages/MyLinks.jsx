// frontend/src/pages/MyLinks.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function MyLinks() {
  const [links, setLinks] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/api/my-links')
      .then(res => setLinks(res.data))
      .catch(() => setError('Failed to load your links'));
  }, []);

  if (error) return <p className="text-danger">{error}</p>;
  if (!links) return <p className="text-muted">Loading...</p>;

  if (links.length === 0) {
    return (
      <div>
        <h2 className="text-xl mb-2">My Links</h2>
        <p className="text-muted text-sm">
          Nothing here yet —{' '}
          <Link to="/" className="text-accent hover:underline">shorten your first link</Link>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl">My Links</h2>
        <span className="text-sm text-muted">{links.length} total</span>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-muted border-b border-surface">
            <th className="pb-3 font-normal w-32">Short URL</th>
            <th className="pb-3 font-normal">Original URL</th>
            <th className="pb-3 font-normal w-20 ">Clicks</th>
            <th className="pb-3 font-normal w-28  ">Created</th>
            <th className="pb-3 font-normal w-20 ">Status</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => {
            const isExpired = link.expiresAt && new Date(link.expiresAt) < new Date();
            return (
              <tr
                key={link.shortCode}
                className="border-b border-surface/50 hover:bg-surface/30 transition-colors"
              >
                <td className="py-3">
                  <Link to={`/dashboard/${link.shortCode}`} className="font-mono text-accent hover:underline">
                    {link.shortCode}
                  </Link>
                </td>
                <td className="py-3 text-muted" title={link.originalUrl}>
                  {link.originalUrl.length > 48
                    ? link.originalUrl.slice(0, 48) + '…'
                    : link.originalUrl}
                </td>
                <td className="py-3 text-center font-mono">{link.clicks}</td>
                <td className="py-3 text-muted">
                  {new Date(link.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </td>
                <td className="py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-sm ${
                    isExpired ? 'bg-danger/15 text-danger' : 'bg-chart/15 text-chart'
                  }`}>
                    {isExpired ? 'Expired' : 'Active'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MyLinks;