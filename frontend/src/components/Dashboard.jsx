// frontend/src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import ClicksChart from "../components/ClicksChart";
import StatCard from "./StateCard";
import Skeleton from "./Skeleton";
import { QRCodeSVG } from "qrcode.react";

function Dashboard({ shortCode }) {
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api
      .get(`/api/analytics/${shortCode}`)
      .then((res) => setAnalytics(res.data))
      .catch(() => setError("Failed to load analytics"));
  }, [shortCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_API_URL}/${shortCode}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (error) return <p className="text-danger">{error}</p>;
  if (!analytics)
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
        <Skeleton className="h-52" />
      </div>
    );

  const topReferrer = analytics.topReferrers[0];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs text-muted mb-1">Link</p>
          <h2 className="font-mono text-lg text-accent">{shortCode}</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-text p-2 rounded-sm">
            <QRCodeSVG
              value={`${import.meta.env.VITE_API_URL}/${shortCode}`}
              size={56}
            />
          </div>
          <button
            onClick={handleCopy}
            className="text-sm text-muted hover:text-text border border-surface rounded-sm px-3 py-1.5 transition-colors"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <StatCard label="Total clicks" value={analytics.totalClicks} accent />
        <StatCard
          label="Top referrer"
          value={topReferrer ? topReferrer._id || "Direct" : "—"}
        />
      </div>

      <div className="mb-10">
        <h3 className="text-sm text-muted mb-4">Clicks over time</h3>
        <ClicksChart data={analytics.clicksOverTime} />
      </div>

      <div>
        <h3 className="text-sm text-muted mb-4">Top referrers</h3>
        {analytics.topReferrers.length === 0 ? (
          <p className="text-muted text-sm">No referrer data yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {analytics.topReferrers.map((r) => {
              const max = analytics.topReferrers[0].count;
              const pct = (r.count / max) * 100;
              return (
                <li key={r._id || "direct"} className="flex items-center gap-4">
                  <span className="w-28 text-sm text-muted truncate">
                    {r._id || "Direct"}
                  </span>
                  <div className="flex-1 bg-surface rounded-sm h-2 overflow-hidden">
                    <div
                      className="bg-chart h-full rounded-sm"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-sm font-mono text-muted">
                    {r.count}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
