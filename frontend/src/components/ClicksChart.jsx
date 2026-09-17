// frontend/src/components/ClicksChart.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function ClicksChart({ data }) {
  if (data.length === 0) {
    return <p className="text-muted text-sm">No clicks yet — data will appear here once your link gets traffic.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid stroke="#2A2D35" vertical={false} />
        <XAxis dataKey="_id" stroke="#8A8F98" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis stroke="#8A8F98" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={{ background: '#2A2D35', border: 'none', borderRadius: 4, fontSize: 13 }}
          labelStyle={{ color: '#8A8F98' }}
          itemStyle={{ color: '#22D3AA' }}
        />
        <Line type="monotone" dataKey="count" stroke="#22D3AA" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ClicksChart;