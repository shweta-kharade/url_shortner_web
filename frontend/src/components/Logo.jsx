// frontend/src/components/Logo.jsx
function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="24" height="24" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="14" fill="#111318"/>
        <rect x="14" y="29" width="36" height="6" rx="3" fill="#8A8F98" opacity="0.4"/>
        <rect x="14" y="29" width="16" height="6" rx="3" fill="#3B5BFE"/>
        <rect x="34" y="29" width="6" height="6" fill="#111318"/>
        <rect x="36" y="20" width="4" height="24" rx="2" fill="#22D3AA" transform="rotate(20 38 32)"/>
      </svg>
      <span className="font-mono text-sm tracking-tight">shortn/</span>
    </div>
  );
}

export default Logo;