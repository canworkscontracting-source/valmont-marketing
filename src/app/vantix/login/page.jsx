"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CSS = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  @keyframes vxl-fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  @keyframes vxl-pulse { 0%,100% { opacity:1; box-shadow:0 0 8px #00d4bf; } 50% { opacity:0.4; box-shadow:0 0 2px #00d4bf; } }
  @keyframes vxl-spin { to { transform:rotate(360deg); } }
  .vxl-root { min-height:100vh; background:#050d1a; display:flex; align-items:center; justify-content:center; font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; padding:16px; background-image:radial-gradient(rgba(0,212,191,0.07) 1px,transparent 1px); background-size:32px 32px; }
  .vxl-card { background:rgba(6,14,30,0.97); border:1px solid rgba(0,212,191,0.2); border-radius:12px; padding:48px 40px; width:100%; max-width:420px; animation:vxl-fadeIn 0.4s ease; backdrop-filter:blur(20px); }
  .vxl-logo { text-align:center; margin-bottom:36px; }
  .vxl-logo-dot { width:9px; height:9px; border-radius:50%; background:#00d4bf; box-shadow:0 0 10px #00d4bf; animation:vxl-pulse 2s ease-in-out infinite; display:inline-block; margin-bottom:16px; }
  .vxl-logo-name { font-size:32px; font-weight:900; letter-spacing:0.2em; color:#00d4bf; }
  .vxl-logo-sub { font-size:10px; color:rgba(255,255,255,0.4); letter-spacing:0.22em; margin-top:6px; }
  .vxl-label { font-size:11px; font-weight:700; letter-spacing:0.14em; color:rgba(255,255,255,0.45); margin-bottom:8px; display:block; text-transform:uppercase; }
  .vxl-input { width:100%; background:#0d1d35; border:1px solid rgba(0,212,191,0.15); border-radius:6px; padding:13px 16px; color:#fff; font-size:15px; font-family:inherit; transition:border-color 0.2s; outline:none; }
  .vxl-input:focus { border-color:#00d4bf; }
  .vxl-input::placeholder { color:rgba(255,255,255,0.2); }
  .vxl-btn { width:100%; padding:14px; background:#00d4bf; color:#050d1a; border:none; border-radius:6px; font-size:13px; font-weight:800; letter-spacing:0.16em; cursor:pointer; transition:background 0.2s; display:flex; align-items:center; justify-content:center; gap:10px; font-family:inherit; }
  .vxl-btn:hover:not(:disabled) { background:#00f0d8; }
  .vxl-btn:disabled { opacity:0.6; cursor:not-allowed; }
  .vxl-spinner { width:16px; height:16px; border:2px solid rgba(5,13,26,0.3); border-top-color:#050d1a; border-radius:50%; animation:vxl-spin 0.8s linear infinite; flex-shrink:0; }
  .vxl-error { background:rgba(255,77,94,0.1); border:1px solid rgba(255,77,94,0.35); border-radius:6px; padding:11px 14px; font-size:13px; color:#ff4d5e; font-weight:700; letter-spacing:0.1em; text-align:center; margin-top:14px; }
  .vxl-divider { border:none; border-top:1px solid rgba(0,212,191,0.1); margin:28px 0; }
  .vxl-footer { text-align:center; font-size:11px; color:rgba(255,255,255,0.25); letter-spacing:0.1em; }
`;

export default function VantixLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem("vx_auth") === "true") {
        router.replace("/vantix");
      }
    } catch {}
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 600));
    if (password === "valmont2026") {
      try { localStorage.setItem("vx_auth", "true"); } catch {}
      router.replace("/vantix");
    } else {
      setError("ACCESS DENIED");
      setLoading(false);
      setPassword("");
    }
  };

  if (!mounted) return null;

  return (
    <div className="vxl-root">
      <style>{CSS}</style>
      <div className="vxl-card">
        <div className="vxl-logo">
          <div className="vxl-logo-dot" />
          <div className="vxl-logo-name">VANTIX</div>
          <div className="vxl-logo-sub">POWERED BY VALMONT MARKETING</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label className="vxl-label">Access Key</label>
            <input
              className="vxl-input"
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(""); }}
              placeholder="Enter your access key"
              autoFocus
              autoComplete="current-password"
            />
          </div>

          <button className="vxl-btn" type="submit" disabled={loading || !password}>
            {loading ? <><div className="vxl-spinner" /> VERIFYING…</> : "ENTER VANTIX ›"}
          </button>

          {error && <div className="vxl-error">{error}</div>}
        </form>

        <hr className="vxl-divider" />
        <div className="vxl-footer">VALMONT MARKETING · INTERNAL AI SYSTEM</div>
      </div>
    </div>
  );
}
