// frontend/src/components/CreateLinkForm.jsx
import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function CreateLinkForm({ onCreated }) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api.post("/shorten", {
        originalUrl,
        customAlias: customAlias || undefined,
      });
      setResult(res.data.shortUrl);
      setOriginalUrl("");
      setCustomAlias("");
      onCreated?.();
      toast.success("Link created");
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard");
  };
  return (
    <div className="w-full max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="url"
          placeholder="Paste a long URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
          className="bg-surface border border-surface focus:border-accent outline-none rounded-sm px-4 py-3 text-text placeholder:text-muted transition-colors"
        />
        <input
          type="text"
          placeholder="Custom alias (optional)"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
          className="bg-surface border border-surface focus:border-accent outline-none rounded-sm px-4 py-3 text-text placeholder:text-muted transition-colors font-mono text-sm"
        />
        {error && <p className="text-danger text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-accent text-text rounded-sm py-3 hover:bg-accent/90 disabled:opacity-50 transition-colors"
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {result && (
        <div className="mt-4 flex items-center justify-between bg-surface rounded-sm px-4 py-3">
          <a
            href={result}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-accent text-sm"
          >
            {result}
          </a>
          <button
            onClick={handleCopy}
            className="text-muted hover:text-text text-sm transition-colors"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateLinkForm;
