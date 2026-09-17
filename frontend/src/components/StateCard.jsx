// frontend/src/components/StatCard.jsx
function StatCard({ label, value, accent = false }) {
  return (
    <div className="bg-surface rounded-sm px-6 py-5">
      <p className="text-xs text-muted mb-2">{label}</p>
      <p className={`text-3xl font-mono ${accent ? 'text-chart' : 'text-text'}`}>
        {value}
      </p>
    </div>
  );
}

export default StatCard;