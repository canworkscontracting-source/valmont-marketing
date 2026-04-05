"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const VantixBrain = dynamic(() => import("@/components/vantix/VantixBrain"), { ssr: false });

/* ─── Constants ─── */
const C = {
  bg: "#04080f", sidebar: "#060d1a", card: "#0a1628", card2: "#0d1d35",
  teal: "#00D4B4", tealLo: "rgba(0,212,180,0.08)", tealMd: "rgba(0,212,180,0.18)",
  danger: "#ff4757", text: "#e8edf5", muted: "rgba(232,237,245,0.45)",
  border: "rgba(0,212,180,0.08)", borderMd: "rgba(0,212,180,0.18)",
};

const LS = {
  get: (k, d = null) => { try { const v = localStorage.getItem("vx_" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem("vx_" + k, JSON.stringify(v)); } catch {} },
};

async function analyzeWithVantix(systemPrompt, userMessage) {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system: systemPrompt, messages: [{ role: "user", content: userMessage }] }),
  });
  const data = await res.json();
  if (data.error) throw new Error(typeof data.error === "object" ? data.error.message : data.error);
  return (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
}

const NAV = [
  { id: "intelligence", label: "INTELLIGENCE", icon: "◈" },
  { id: "clients",      label: "CLIENTS",      icon: "◉" },
  { id: "operations",   label: "OPERATIONS",   icon: "◫" },
  { id: "intel-ops",    label: "INTEL OPS",    icon: "◎" },
  { id: "brain",        label: "BRAIN",        icon: "◬" },
];

/* ─── CSS ─── */
const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; background: #04080f; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(0,212,180,0.15); }

  @keyframes vx-spin { to { transform: rotate(360deg); } }
  @keyframes vx-fade { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
  @keyframes vx-blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }

  /* ── ROOT LAYOUT ── */
  .vx { font-family: system-ui,-apple-system,"Segoe UI",sans-serif; background:#04080f; color:#e8edf5; min-height:100vh; display:flex; flex-direction:column; }

  /* ── TOP BAR ── */
  .vx-topbar { height:48px; background:#060d1a; border-bottom:1px solid rgba(0,212,180,0.08); display:flex; align-items:center; padding:0 24px; gap:16px; flex-shrink:0; position:sticky; top:0; z-index:60; }
  .vx-topbar-logo { font-size:15px; font-weight:700; letter-spacing:0.22em; color:#00D4B4; flex-shrink:0; }
  .vx-topbar-sep { width:1px; height:20px; background:rgba(0,212,180,0.12); flex-shrink:0; }
  .vx-topbar-client { flex:1; font-size:12px; font-weight:600; letter-spacing:0.1em; color:rgba(232,237,245,0.55); text-transform:uppercase; }
  .vx-topbar-client span { color:#e8edf5; }
  .vx-topbar-right { display:flex; align-items:center; gap:8px; flex-shrink:0; }
  .vx-status-dot { width:6px; height:6px; border-radius:50%; background:#00D4B4; animation:vx-blink 3s ease-in-out infinite; flex-shrink:0; }
  .vx-topbar-status { font-size:10px; letter-spacing:0.16em; color:#00D4B4; font-weight:700; }

  /* ── BODY (sidebar + content) ── */
  .vx-body { display:flex; flex:1; min-height:0; }

  /* ── SIDEBAR ── */
  .vx-sidebar { width:200px; flex-shrink:0; background:#060d1a; border-right:1px solid rgba(0,212,180,0.08); display:flex; flex-direction:column; position:sticky; top:48px; height:calc(100vh - 48px); overflow-y:auto; }
  .vx-nav-item { display:flex; align-items:center; gap:10px; padding:0 20px; height:44px; background:none; border:none; border-left:2px solid transparent; color:rgba(232,237,245,0.45); font-size:11px; font-weight:700; letter-spacing:0.14em; cursor:pointer; width:100%; text-align:left; transition:color 0.15s, border-color 0.15s, background 0.15s; font-family:inherit; white-space:nowrap; }
  .vx-nav-item:hover { color:#e8edf5; background:rgba(0,212,180,0.04); }
  .vx-nav-item.active { color:#00D4B4; border-left-color:#00D4B4; background:rgba(0,212,180,0.06); }
  .vx-nav-icon { font-size:13px; flex-shrink:0; }
  .vx-sidebar-bottom { margin-top:auto; padding:16px; border-top:1px solid rgba(0,212,180,0.08); }
  .vx-sidebar-label { font-size:9px; font-weight:700; letter-spacing:0.18em; color:rgba(232,237,245,0.3); text-transform:uppercase; margin-bottom:8px; }
  .vx-client-select { width:100%; background:#04080f; border:1px solid rgba(0,212,180,0.12); color:#e8edf5; padding:7px 10px; font-size:11px; cursor:pointer; font-family:inherit; letter-spacing:0.06em; appearance:none; -webkit-appearance:none; }
  .vx-client-select:focus { outline:1px solid #00D4B4; }
  select option { background:#04080f; }
  .vx-logout-btn { display:flex; align-items:center; width:100%; background:none; border:none; border-top:1px solid rgba(255,71,87,0.1); color:rgba(255,71,87,0.6); font-size:10px; font-weight:700; letter-spacing:0.14em; cursor:pointer; padding:12px 0 0; margin-top:12px; font-family:inherit; transition:color 0.15s; }
  .vx-logout-btn:hover { color:#ff4757; }

  /* ── MAIN CONTENT ── */
  .vx-main { flex:1; min-width:0; overflow-y:auto; animation:vx-fade 0.2s ease; position:relative; }
  .vx-main-brain { overflow:hidden; }
  .vx-section { padding:28px 32px; max-width:1400px; }

  /* ── SECTION HEADER ── */
  .vx-sec-hd { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid rgba(0,212,180,0.08); flex-wrap:wrap; }
  .vx-sec-title { font-size:11px; font-weight:700; letter-spacing:0.22em; color:rgba(232,237,245,0.45); text-transform:uppercase; }
  .vx-sec-name { font-size:20px; font-weight:700; letter-spacing:0.04em; color:#e8edf5; margin-top:4px; }

  /* ── CARDS ── */
  .vx-card { background:#0a1628; border:1px solid rgba(0,212,180,0.08); padding:16px; }
  .vx-card-accent { border-left:2px solid #00D4B4; }
  .vx-card-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:1px; background:rgba(0,212,180,0.08); }
  .vx-card-grid > * { background:#0a1628; }
  .vx-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:rgba(0,212,180,0.08); }
  .vx-grid-3 > * { background:#0a1628; }
  .vx-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }

  /* ── STAT ── */
  .vx-stat { padding:16px; }
  .vx-stat-val { font-size:24px; font-weight:700; color:#00D4B4; font-variant-numeric:tabular-nums; letter-spacing:-0.01em; }
  .vx-stat-label { font-size:10px; font-weight:700; letter-spacing:0.16em; color:rgba(232,237,245,0.35); text-transform:uppercase; margin-top:4px; }
  .vx-stat-delta { font-size:11px; font-weight:600; margin-top:4px; }

  /* ── BUTTONS ── */
  .vx-btn { display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:8px 18px; border:none; font-size:11px; font-weight:700; letter-spacing:0.12em; cursor:pointer; transition:opacity 0.15s, background 0.15s; font-family:inherit; white-space:nowrap; text-transform:uppercase; border-radius:0; }
  .vx-btn-primary { background:#00D4B4; color:#04080f; }
  .vx-btn-primary:hover:not(:disabled) { background:#00f0cc; }
  .vx-btn-primary:disabled { opacity:0.4; cursor:not-allowed; }
  .vx-btn-secondary { background:transparent; border:1px solid rgba(0,212,180,0.25); color:#00D4B4; }
  .vx-btn-secondary:hover:not(:disabled) { background:rgba(0,212,180,0.08); }
  .vx-btn-secondary:disabled { opacity:0.4; cursor:not-allowed; }
  .vx-btn-danger { background:transparent; border:1px solid rgba(255,71,87,0.25); color:#ff4757; }
  .vx-btn-danger:hover { background:rgba(255,71,87,0.08); }
  .vx-btn-sm { padding:5px 12px; font-size:10px; }
  .vx-btn-full { width:100%; }

  /* ── FORM ── */
  .vx-input { width:100%; background:#04080f; border:1px solid rgba(0,212,180,0.12); color:#e8edf5; padding:9px 12px; font-size:13px; font-family:inherit; transition:border-color 0.15s; border-radius:0; }
  .vx-input:focus { outline:none; border-color:#00D4B4; }
  .vx-input::placeholder { color:rgba(232,237,245,0.2); }
  .vx-label { font-size:9px; font-weight:700; letter-spacing:0.18em; color:rgba(232,237,245,0.35); text-transform:uppercase; margin-bottom:6px; display:block; }
  .vx-select-field { width:100%; background:#04080f; border:1px solid rgba(0,212,180,0.12); color:#e8edf5; padding:9px 12px; font-size:12px; cursor:pointer; font-family:inherit; }
  .vx-select-field:focus { outline:1px solid #00D4B4; }

  /* ── OUTPUT ── */
  .vx-output { background:#04080f; border:1px solid rgba(0,212,180,0.08); border-left:2px solid rgba(0,212,180,0.3); padding:20px; min-height:160px; }
  .vx-output-text { font-family:"SF Mono","Fira Mono","Fira Code","Consolas",monospace; font-size:13px; color:rgba(232,237,245,0.85); line-height:1.85; white-space:pre-wrap; }
  .vx-empty { padding:40px 20px; text-align:center; color:rgba(232,237,245,0.25); font-size:12px; letter-spacing:0.12em; text-transform:uppercase; }

  /* ── SPINNER ── */
  .vx-spin { width:14px; height:14px; border:1.5px solid rgba(0,212,180,0.15); border-top-color:#00D4B4; border-radius:50%; animation:vx-spin 0.7s linear infinite; flex-shrink:0; }
  .vx-spin-lg { width:24px; height:24px; border-width:2px; }

  /* ── INNER TABS ── */
  .vx-tabs { display:flex; border-bottom:1px solid rgba(0,212,180,0.08); margin-bottom:24px; }
  .vx-tab { background:none; border:none; border-bottom:1px solid transparent; color:rgba(232,237,245,0.35); font-size:10px; font-weight:700; letter-spacing:0.16em; padding:10px 16px; cursor:pointer; font-family:inherit; text-transform:uppercase; transition:color 0.15s, border-color 0.15s; margin-bottom:-1px; }
  .vx-tab.active { color:#00D4B4; border-bottom-color:#00D4B4; }
  .vx-tab:hover:not(.active) { color:#e8edf5; }

  /* ── TABLE ── */
  .vx-table { width:100%; border-collapse:collapse; font-size:12px; }
  .vx-table th { text-align:left; font-size:9px; font-weight:700; letter-spacing:0.16em; color:rgba(232,237,245,0.3); text-transform:uppercase; padding:8px 12px; border-bottom:1px solid rgba(0,212,180,0.08); }
  .vx-table td { padding:10px 12px; border-bottom:1px solid rgba(0,212,180,0.05); color:rgba(232,237,245,0.75); vertical-align:top; }
  .vx-table tr:hover td { background:rgba(0,212,180,0.03); }
  .vx-table tr.selected td { background:rgba(0,212,180,0.06); }

  /* ── SIGNAL CARDS ── */
  .vx-signal { border-left:2px solid #00D4B4; padding:14px 16px; background:#0a1628; border-top:1px solid rgba(0,212,180,0.08); border-right:1px solid rgba(0,212,180,0.08); border-bottom:1px solid rgba(0,212,180,0.08); }
  .vx-signal-label { font-size:9px; font-weight:700; letter-spacing:0.2em; color:#00D4B4; text-transform:uppercase; margin-bottom:6px; }
  .vx-signal-text { font-size:12px; color:rgba(232,237,245,0.65); line-height:1.6; }

  /* ── INLINE PILL ── */
  .vx-pill { display:inline-flex; align-items:center; gap:4px; padding:3px 10px; border:1px solid rgba(0,212,180,0.2); font-size:10px; font-weight:700; letter-spacing:0.1em; cursor:pointer; text-transform:uppercase; background:transparent; color:rgba(232,237,245,0.5); font-family:inherit; transition:all 0.15s; }
  .vx-pill.active { background:rgba(0,212,180,0.12); border-color:#00D4B4; color:#00D4B4; }
  .vx-pill:hover:not(.active) { color:#e8edf5; border-color:rgba(0,212,180,0.4); }

  /* ── CALENDAR ── */
  .vx-cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:1px; background:rgba(0,212,180,0.06); }
  .vx-cal-day { background:#04080f; min-height:56px; padding:6px; cursor:pointer; border:1px solid transparent; transition:border-color 0.1s; }
  .vx-cal-day:hover { border-color:rgba(0,212,180,0.25); }
  .vx-cal-day.today { background:rgba(0,212,180,0.04); }
  .vx-cal-day.sel { border-color:#00D4B4; background:rgba(0,212,180,0.08); }
  .vx-cal-num { font-size:11px; font-weight:600; color:rgba(232,237,245,0.55); margin-bottom:4px; }
  .vx-cal-num.today-num { color:#00D4B4; font-weight:700; }

  /* ── MOBILE BOTTOM NAV ── */
  .vx-mobile-nav { display:none; position:fixed; bottom:0; left:0; right:0; background:#060d1a; border-top:1px solid rgba(0,212,180,0.1); z-index:70; height:56px; }
  .vx-mobile-nav-inner { display:flex; height:100%; }
  .vx-mobile-nav-btn { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; background:none; border:none; cursor:pointer; color:rgba(232,237,245,0.35); font-family:inherit; transition:color 0.15s; padding:0; }
  .vx-mobile-nav-btn.active { color:#00D4B4; }
  .vx-mobile-nav-btn span:first-child { font-size:16px; }
  .vx-mobile-nav-btn span:last-child { font-size:8px; font-weight:700; letter-spacing:0.1em; }

  /* ── RESPONSIVE ── */
  @media (max-width:1023px) {
    .vx-section { padding:20px; }
    .vx-grid-3 { grid-template-columns:1fr 1fr; }
  }
  @media (max-width:767px) {
    .vx-sidebar { display:none; }
    .vx-main { padding-bottom:56px; }
    .vx-mobile-nav { display:block; }
    .vx-section { padding:16px; }
    .vx-grid-3 { grid-template-columns:1fr; }
    .vx-grid-2 { grid-template-columns:1fr; }
    .vx-sec-name { font-size:16px; }
    .vx-topbar-client { display:none; }
    .vx-intel-layout { grid-template-columns:1fr !important; }
    .vx-clients-layout { grid-template-columns:1fr !important; }
    .vx-intel-ops-layout { grid-template-columns:1fr !important; }
  }
  @media (min-width:768px) { .vx-mobile-hide { display:none !important; } }

  /* ── Hide global Nova chat bubble on all VANTIX pages ── */
  .vn-fab, .vn-panel { display:none !important; }
`;

/* ─── Shared micro-components ─── */
function Spin({ large }) {
  return <div className={large ? "vx-spin vx-spin-lg" : "vx-spin"} />;
}
function Empty({ text }) {
  return <div className="vx-empty">{text}</div>;
}

/* ─── Main Dashboard ─── */
export default function VantixDashboard() {
  const [section, setSection] = useState("intelligence");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem("vx_auth") !== "true") { window.location.replace("/vantix/login"); return; }
      setAuthed(true);
    } catch { window.location.replace("/vantix/login"); return; }
    const saved = LS.get("clients", []);
    setClients(saved);
    const selId = LS.get("selected_client_id");
    if (selId && saved.length) { const f = saved.find(c => c.id === selId); if (f) setSelectedClient(f); }
  }, []);

  const logout = () => { try { localStorage.removeItem("vx_auth"); } catch {} window.location.replace("/vantix/login"); };

  const saveClient = (client) => {
    const updated = clients.find(c => c.id === client.id) ? clients.map(c => c.id === client.id ? client : c) : [...clients, client];
    setClients(updated); LS.set("clients", updated);
  };
  const deleteClient = (id) => {
    const updated = clients.filter(c => c.id !== id);
    setClients(updated); LS.set("clients", updated);
    if (selectedClient?.id === id) { setSelectedClient(updated[0] || null); LS.set("selected_client_id", updated[0]?.id || null); }
  };
  const selectClient = (client) => { setSelectedClient(client); LS.set("selected_client_id", client.id); };

  if (!mounted || !authed) return null;

  return (
    <div className="vx">
      <style>{CSS}</style>

      {/* Top bar */}
      <header className="vx-topbar">
        <span className="vx-topbar-logo">VANTIX</span>
        <div className="vx-topbar-sep" />
        <div className="vx-topbar-client">
          {selectedClient ? <><span>{selectedClient.name}</span>{selectedClient.niche ? ` · ${selectedClient.niche}` : ""}</> : "No client selected"}
        </div>
        <div className="vx-topbar-right">
          <div className="vx-status-dot" />
          <span className="vx-topbar-status">ONLINE</span>
        </div>
      </header>

      <div className="vx-body">
        {/* Sidebar */}
        <aside className="vx-sidebar">
          <nav style={{ paddingTop: 12 }}>
            {NAV.map(n => (
              <button key={n.id} className={`vx-nav-item${section === n.id ? " active" : ""}`} onClick={() => setSection(n.id)}>
                <span className="vx-nav-icon">{n.icon}</span>
                {n.label}
              </button>
            ))}
          </nav>
          <div className="vx-sidebar-bottom">
            <div className="vx-sidebar-label">Active Client</div>
            <select
              className="vx-client-select"
              value={selectedClient?.id || ""}
              onChange={e => { const c = clients.find(x => x.id === e.target.value); if (c) selectClient(c); }}
            >
              <option value="">— Select —</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <button className="vx-logout-btn" onClick={logout}>LOGOUT</button>
          </div>
        </aside>

        {/* Main */}
        <main className={`vx-main${section === "brain" ? " vx-main-brain" : ""}`}>
          {section === "intelligence" && <IntelligencePage client={selectedClient} />}
          {section === "clients" && <ClientsPage clients={clients} selectedClient={selectedClient} onSave={saveClient} onSelect={selectClient} onDelete={deleteClient} />}
          {section === "operations" && <OperationsPage client={selectedClient} />}
          {section === "intel-ops" && <IntelOpsPage client={selectedClient} />}
          {section === "brain" && <BrainPage />}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="vx-mobile-nav">
        <div className="vx-mobile-nav-inner">
          {NAV.map(n => (
            <button key={n.id} className={`vx-mobile-nav-btn${section === n.id ? " active" : ""}`} onClick={() => setSection(n.id)}>
              <span>{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

/* ═══════════════════════════════════════════
   INTELLIGENCE PAGE
═══════════════════════════════════════════ */
function IntelligencePage({ client }) {
  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true); setBrief("");
    try {
      const data = await fetch("/api/analyze", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: "You are VANTIX Intelligence. Generate concise, high-signal daily marketing intelligence.",
          messages: [{ role: "user", content: `Generate a daily intelligence brief for ${client ? client.name + " in " + (client.niche || client.industry || "marketing") : "a marketing agency"}. Include: 1) Top trending content formats now 2) Algorithm insights 3) One high-leverage action for today. Be direct and specific.` }],
        }),
      }).then(r => r.json());
      if (data.error) throw new Error(data.error);
      setBrief((data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n") || "No response.");
    } catch (e) { setBrief("ERR: " + e.message); }
    setLoading(false);
  };

  // Pull latest performance data
  const perfKey = client ? `performance_${client.id}` : null;
  const perf = perfKey ? LS.get(perfKey, []) : [];
  const latest = perf[0] || null;
  const prev = perf[1] || null;
  const followerGrowth = latest && prev && prev.followers
    ? (((parseFloat(latest.followers) - parseFloat(prev.followers)) / parseFloat(prev.followers)) * 100).toFixed(1)
    : null;
  const now = new Date();
  const calKey = client ? `calendar_${client.id}_${now.getFullYear()}_${now.getMonth()}` : null;
  const calData = calKey ? LS.get(calKey, {}) : {};
  const postsThisMonth = Object.values(calData).flat().length;

  return (
    <div className="vx-section">
      <div className="vx-sec-hd">
        <div>
          <div className="vx-sec-title">INTELLIGENCE SYSTEM</div>
          <div className="vx-sec-name">Daily Brief</div>
        </div>
        <button className="vx-btn vx-btn-primary" onClick={generate} disabled={loading}>
          {loading ? <><Spin /> ANALYZING…</> : "GENERATE BRIEF"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, alignItems: "start" }} className="vx-intel-layout">
        {/* Brief output */}
        <div>
          <div className="vx-output" style={{ minHeight: 320 }}>
            {loading
              ? <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "60px 0", justifyContent: "center", color: C.teal, fontSize: 11, letterSpacing: "0.14em" }}><Spin large /> PROCESSING INTELLIGENCE…</div>
              : brief
                ? <div className="vx-output-text">{brief}</div>
                : <Empty text="Generate brief to receive daily intelligence signal" />
            }
          </div>

          {/* Signal cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, marginTop: 16, background: "rgba(0,212,180,0.06)" }}>
            {[
              { label: "CONTENT TRENDS", text: "Track trending formats. Reels under 15s, text-on-screen carousels, and authentic talking-head content are dominating feeds." },
              { label: "ALGORITHM SIGNAL", text: "Saves and shares outweigh likes. Content that provokes saves is being rewarded with 3-5x organic reach multipliers." },
              { label: "ACTION SIGNAL", text: "Post your highest-performing content type from last month. Double down on what the data shows is working for this account." },
            ].map(s => (
              <div key={s.label} className="vx-signal">
                <div className="vx-signal-label">{s.label}</div>
                <div className="vx-signal-text">{s.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Metric stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "rgba(0,212,180,0.06)" }}>
          {[
            { label: "FOLLOWERS", value: latest?.followers ? parseInt(latest.followers).toLocaleString() : "—", delta: followerGrowth },
            { label: "ENGAGEMENT RATE", value: latest?.engagementRate ? latest.engagementRate + "%" : "—" },
            { label: "POSTS THIS MONTH", value: postsThisMonth || "—" },
            { label: "FOLLOWER GROWTH", value: followerGrowth !== null ? (followerGrowth > 0 ? "+" : "") + followerGrowth + "%" : "—", color: followerGrowth > 0 ? C.teal : followerGrowth < 0 ? C.danger : undefined },
          ].map(m => (
            <div key={m.label} className="vx-stat">
              <div className="vx-stat-val" style={m.color ? { color: m.color } : {}}>{m.value}</div>
              <div className="vx-stat-label">{m.label}</div>
            </div>
          ))}
          {!client && <div style={{ padding: 14, fontSize: 11, color: C.muted, letterSpacing: "0.1em" }}>SELECT A CLIENT TO VIEW METRICS</div>}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CLIENTS PAGE
═══════════════════════════════════════════ */
function ClientsPage({ clients, selectedClient, onSave, onSelect, onDelete }) {
  const empty = { id: "", name: "", niche: "", industry: "" };
  const [editing, setEditing] = useState(null); // null | "new" | client.id
  const [form, setForm] = useState(empty);
  const [detailClient, setDetailClient] = useState(selectedClient);

  useEffect(() => { if (selectedClient && !detailClient) setDetailClient(selectedClient); }, [selectedClient]);

  const startNew = () => { setForm({ ...empty, id: Date.now().toString() }); setEditing("new"); };
  const startEdit = (c) => { setForm({ ...c }); setEditing(c.id); };
  const cancelEdit = () => { setEditing(null); setForm(empty); };

  const save = () => {
    if (!form.name.trim()) return;
    onSave(form);
    if (editing === "new") { onSelect(form); setDetailClient(form); }
    else { setDetailClient(form); }
    setEditing(null); setForm(empty);
  };

  const remove = (c) => {
    if (window.confirm(`Remove ${c.name}?`)) {
      onDelete(c.id);
      if (detailClient?.id === c.id) setDetailClient(clients.find(x => x.id !== c.id) || null);
    }
  };

  // Performance data for detail panel
  const perf = detailClient ? LS.get(`performance_${detailClient.id}`, []) : [];
  const latest = perf[0] || null;

  return (
    <div className="vx-section">
      <div className="vx-sec-hd">
        <div>
          <div className="vx-sec-title">CLIENT MANAGEMENT</div>
          <div className="vx-sec-name">Client Profiles</div>
        </div>
        <button className="vx-btn vx-btn-primary" onClick={startNew}>+ NEW CLIENT</button>
      </div>

      {/* Inline new form */}
      {editing === "new" && (
        <div className="vx-card vx-card-accent" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: C.teal, marginBottom: 12 }}>NEW CLIENT</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12, marginBottom: 12 }}>
            {[["Client Name *", "name"], ["Niche", "niche"], ["Industry", "industry"]].map(([label, key]) => (
              <div key={key}>
                <label className="vx-label">{label}</label>
                <input className="vx-input" value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} onKeyDown={e => e.key === "Enter" && save()} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="vx-btn vx-btn-primary vx-btn-sm" onClick={save}>SAVE</button>
            <button className="vx-btn vx-btn-secondary vx-btn-sm" onClick={cancelEdit}>CANCEL</button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 16, alignItems: "start" }} className="vx-clients-layout">
        {/* Client list */}
        <div style={{ border: "1px solid rgba(0,212,180,0.08)" }}>
          <table className="vx-table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>CLIENT</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(c => (
                <tr key={c.id} className={detailClient?.id === c.id ? "selected" : ""} style={{ cursor: "pointer" }}
                  onClick={() => { setDetailClient(c); onSelect(c); setEditing(null); }}>
                  <td>
                    <div style={{ fontWeight: 600, color: C.text, fontSize: 13 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{c.niche || c.industry || "—"}</div>
                  </td>
                  <td>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal }} />
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr><td colSpan={2} style={{ textAlign: "center", color: C.muted, padding: "24px 12px", fontSize: 11, letterSpacing: "0.1em" }}>NO CLIENTS</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Detail panel */}
        <div>
          {detailClient ? (
            <div>
              {editing === detailClient.id ? (
                <div className="vx-card vx-card-accent" style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: C.teal, marginBottom: 12 }}>EDIT CLIENT</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12, marginBottom: 12 }}>
                    {[["Client Name *", "name"], ["Niche", "niche"], ["Industry", "industry"]].map(([label, key]) => (
                      <div key={key}>
                        <label className="vx-label">{label}</label>
                        <input className="vx-input" value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} onKeyDown={e => e.key === "Enter" && save()} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="vx-btn vx-btn-primary vx-btn-sm" onClick={save}>SAVE</button>
                    <button className="vx-btn vx-btn-secondary vx-btn-sm" onClick={cancelEdit}>CANCEL</button>
                  </div>
                </div>
              ) : (
                <div className="vx-card vx-card-accent" style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{detailClient.name}</div>
                      <div style={{ fontSize: 12, color: C.teal, marginTop: 3, letterSpacing: "0.08em" }}>{detailClient.niche || detailClient.industry || "No niche set"}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="vx-btn vx-btn-secondary vx-btn-sm" onClick={() => startEdit(detailClient)}>EDIT</button>
                      <button className="vx-btn vx-btn-danger vx-btn-sm" onClick={() => remove(detailClient)}>REMOVE</button>
                    </div>
                  </div>

                  {/* Performance summary */}
                  {latest && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(0,212,180,0.06)", marginTop: 16 }}>
                      {[
                        ["FOLLOWERS", latest.followers ? parseInt(latest.followers).toLocaleString() : "—"],
                        ["ENG. RATE", latest.engagementRate ? latest.engagementRate + "%" : "—"],
                        ["REACH", latest.reach ? parseInt(latest.reach).toLocaleString() : "—"],
                        ["NEW LEADS", latest.newLeads || "—"],
                      ].map(([label, val]) => (
                        <div key={label} style={{ padding: "10px 12px", background: "#0a1628" }}>
                          <div style={{ fontSize: 15, fontWeight: 700, color: C.teal }}>{val}</div>
                          <div style={{ fontSize: 9, color: C.muted, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 2 }}>{label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quick actions */}
                  <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                    <a href="/vantix/connections" className="vx-btn vx-btn-secondary vx-btn-sm" style={{ textDecoration: "none" }}>CONNECT INSTAGRAM</a>
                    <a href="/vantix/report" target="_blank" rel="noopener noreferrer" className="vx-btn vx-btn-secondary vx-btn-sm" style={{ textDecoration: "none" }}>VIEW REPORT</a>
                  </div>
                </div>
              )}

              {/* Performance log */}
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: C.muted, marginBottom: 8 }}>PERFORMANCE LOG</div>
              <PerformanceTracker client={detailClient} compact />
            </div>
          ) : (
            <div className="vx-card"><Empty text="Select a client to view details" /></div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Performance Tracker (used in Clients + standalone) ─── */
function PerformanceTracker({ client, compact }) {
  const key = client ? `performance_${client.id}` : "performance_global";
  const emptyForm = { date: new Date().toISOString().slice(0, 10), followers: "", posts: "", reach: "", impressions: "", engagementRate: "", avgLikes: "", avgComments: "", avgSaves: "", newLeads: "" };
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [logging, setLogging] = useState(false);
  const [insights, setInsights] = useState({});
  const [loadingInsight, setLoadingInsight] = useState(null);

  useEffect(() => { setEntries(LS.get(key, [])); }, [key]);
  const saveEntries = (u) => { setEntries(u); LS.set(key, u); };
  const addEntry = () => {
    if (!form.date || !form.followers) return;
    saveEntries([{ id: Date.now().toString(), ...form }, ...entries]);
    setForm(emptyForm); setLogging(false);
  };
  const removeEntry = (id) => saveEntries(entries.filter(e => e.id !== id));
  const growthPct = (curr, prev, field) => {
    const c = parseFloat(curr[field]), p = parseFloat(prev[field]);
    if (!c || !p || p === 0) return null;
    return (((c - p) / p) * 100).toFixed(1);
  };
  const getInsight = async (entry) => {
    setLoadingInsight(entry.id);
    try {
      const text = await analyzeWithVantix(
        "You are VANTIX Performance AI. Analyze Instagram data and give precise, actionable insights.",
        `Performance data for ${client?.name || "client"}:\nDate:${entry.date} Followers:${entry.followers} Eng:${entry.engagementRate}% Reach:${entry.reach} Impressions:${entry.impressions}\nAvg Likes:${entry.avgLikes} Comments:${entry.avgComments} Saves:${entry.avgSaves} Leads:${entry.newLeads}\n\n1) Assessment 2) Key growth lever 3) Content recommendation 4) Next 7 days focus.`
      );
      setInsights(p => ({ ...p, [entry.id]: text }));
    } catch (e) { setInsights(p => ({ ...p, [entry.id]: "Error: " + e.message })); }
    setLoadingInsight(null);
  };

  const FIELDS = [["Date *","date","date"],["Followers *","followers","number"],["Posts","posts","number"],["Reach","reach","number"],["Impressions","impressions","number"],["Eng. Rate (%)","engagementRate","text"],["Avg Likes","avgLikes","number"],["Avg Comments","avgComments","number"],["Avg Saves","avgSaves","number"],["New Leads","newLeads","number"]];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 8 }}>
        <span style={{ fontSize: 11, color: C.muted }}>{entries.length} log{entries.length !== 1 ? "s" : ""}</span>
        <button className="vx-btn vx-btn-secondary vx-btn-sm" onClick={() => setLogging(!logging)}>
          {logging ? "CANCEL" : "+ LOG METRICS"}
        </button>
      </div>

      {logging && (
        <div className="vx-card vx-card-accent" style={{ marginBottom: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 10, marginBottom: 12 }}>
            {FIELDS.map(([label, field, type]) => (
              <div key={field}>
                <label className="vx-label">{label}</label>
                <input className="vx-input" type={type} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="vx-btn vx-btn-primary vx-btn-sm" onClick={addEntry}>SAVE LOG</button>
            <button className="vx-btn vx-btn-secondary vx-btn-sm" onClick={() => { setLogging(false); setForm(emptyForm); }}>CANCEL</button>
          </div>
        </div>
      )}

      <div style={{ border: "1px solid rgba(0,212,180,0.08)" }}>
        <table className="vx-table" style={{ width: "100%" }}>
          <thead><tr><th>DATE</th><th>FOLLOWERS</th><th>ENG. RATE</th><th>GROWTH</th><th></th></tr></thead>
          <tbody>
            {entries.map((entry, i) => {
              const prev = entries[i + 1];
              const fg = prev ? growthPct(entry, prev, "followers") : null;
              return (
                <>
                  <tr key={entry.id}>
                    <td style={{ fontWeight: 600 }}>{entry.date}</td>
                    <td style={{ color: C.teal, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{entry.followers ? parseInt(entry.followers).toLocaleString() : "—"}</td>
                    <td>{entry.engagementRate ? entry.engagementRate + "%" : "—"}</td>
                    <td style={{ color: fg > 0 ? C.teal : fg < 0 ? C.danger : C.muted, fontWeight: 600 }}>
                      {fg !== null ? `${fg > 0 ? "+" : ""}${fg}%` : "—"}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        {!compact && (
                          <button className="vx-btn vx-btn-secondary vx-btn-sm" onClick={() => getInsight(entry)} disabled={loadingInsight === entry.id}>
                            {loadingInsight === entry.id ? <Spin /> : "ANALYZE"}
                          </button>
                        )}
                        <button className="vx-btn vx-btn-danger vx-btn-sm" onClick={() => removeEntry(entry.id)}>✕</button>
                      </div>
                    </td>
                  </tr>
                  {insights[entry.id] && (
                    <tr key={entry.id + "_insight"}>
                      <td colSpan={5} style={{ padding: "10px 12px" }}>
                        <div style={{ fontSize: 12, color: "rgba(232,237,245,0.75)", lineHeight: 1.75, whiteSpace: "pre-wrap", borderLeft: "2px solid rgba(0,212,180,0.3)", paddingLeft: 12 }}>{insights[entry.id]}</div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
            {entries.length === 0 && !logging && (
              <tr><td colSpan={5} style={{ textAlign: "center", color: C.muted, padding: "24px", fontSize: 11, letterSpacing: "0.1em" }}>NO PERFORMANCE LOGS</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   OPERATIONS PAGE
═══════════════════════════════════════════ */
function OperationsPage({ client }) {
  const [tab, setTab] = useState("content");
  const TABS = [
    { id: "content", label: "CONTENT CREATOR" },
    { id: "growth", label: "GROWTH STRATEGY" },
    { id: "calendar", label: "CONTENT CALENDAR" },
    { id: "lab", label: "CONTENT LAB" },
  ];
  return (
    <div className="vx-section">
      <div className="vx-sec-hd">
        <div>
          <div className="vx-sec-title">OPERATIONS CENTER</div>
          <div className="vx-sec-name">Content & Growth</div>
        </div>
      </div>
      <div className="vx-tabs">
        {TABS.map(t => <button key={t.id} className={`vx-tab${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>)}
      </div>
      {tab === "content" && <ContentCreatorAI client={client} />}
      {tab === "growth" && <GrowthStrategyAI client={client} />}
      {tab === "calendar" && <ContentCalendar client={client} />}
      {tab === "lab" && <ContentLab client={client} />}
    </div>
  );
}

function ContentCreatorAI({ client }) {
  const TYPES = ["Caption", "Hook", "Reel Script", "Carousel"];
  const [contentType, setContentType] = useState("Caption");
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true); setOutput("");
    const niche = client?.niche || client?.industry || "general";
    const prompts = {
      Caption: `Write a high-performing Instagram caption for a ${niche} account about: "${topic}". Strong opening, value body, CTA, 20-25 hashtags.`,
      Hook: `Write 5 high-converting Instagram Reel hooks for a ${niche} account about: "${topic}". Number them and explain why each works.`,
      "Reel Script": `Write a full Reel script for a ${niche} account about: "${topic}". Hook (0-3s), Body (3-25s), CTA (25-30s). Add B-roll notes in [brackets].`,
      Carousel: `Create a carousel post for a ${niche} account about: "${topic}". Slide 1 (Hook), Slides 2-7 (value), Slide 8 (CTA). 1-2 sentences per slide.`,
    };
    try {
      const text = await analyzeWithVantix(`You are VANTIX Content AI for ${niche}. Client: ${client?.name || "Unknown"}.`, prompts[contentType]);
      setOutput(text);
    } catch (e) { setOutput("Error: " + e.message); }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {TYPES.map(t => <button key={t} className={`vx-pill${contentType === t ? " active" : ""}`} onClick={() => setContentType(t)}>{t}</button>)}
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <input className="vx-input" value={topic} onChange={e => setTopic(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()} placeholder={`Topic for ${contentType.toLowerCase()}…`} style={{ flex: 1 }} />
        <button className="vx-btn vx-btn-primary" onClick={generate} disabled={loading || !topic.trim()}>
          {loading ? <><Spin /> WRITING…</> : "GENERATE"}
        </button>
      </div>
      {client && <div style={{ fontSize: 11, color: C.muted, marginBottom: 14, letterSpacing: "0.08em" }}>TARGETING: {client.name.toUpperCase()} · {(client.niche || client.industry || "—").toUpperCase()}</div>}
      <div className="vx-output" style={{ minHeight: 200 }}>
        {loading
          ? <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "60px 0", justifyContent: "center", color: C.teal, fontSize: 11, letterSpacing: "0.14em" }}><Spin large /> GENERATING…</div>
          : output ? <div className="vx-output-text">{output}</div> : <Empty text="Enter topic and click Generate" />
        }
      </div>
    </div>
  );
}

function GrowthStrategyAI({ client }) {
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const generate = async () => {
    if (!client) return;
    setLoading(true); setPlan("");
    const niche = client.niche || client.industry || "general";
    try {
      const text = await analyzeWithVantix(
        "You are VANTIX Growth Strategy AI. Build precise, data-driven 30-day Instagram growth plans. Be specific and tactical.",
        `Build a 30-day Instagram growth plan for:\nCLIENT: ${client.name}\nNICHE: ${niche}\n\n1) Week 1: Foundation & Audit 2) Week 2: Content Blitz (3 full hook examples) 3) Week 3: Growth Sprint 4) Week 4: Scale & Analyze 5) Daily non-negotiables 6) Expected outcomes\n\nBe specific to ${niche}. No generic advice.`
      );
      setPlan(text);
    } catch (e) { setPlan("Error: " + e.message); }
    setLoading(false);
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{client ? client.name : "No client selected"}</div>
          {client && <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{client.niche || client.industry || "—"}</div>}
        </div>
        <button className="vx-btn vx-btn-primary" onClick={generate} disabled={loading || !client}>
          {loading ? <><Spin /> BUILDING…</> : plan ? "REGENERATE PLAN" : "GENERATE 30-DAY PLAN"}
        </button>
      </div>
      {!client && <div style={{ padding: "12px 16px", border: "1px solid rgba(0,212,180,0.1)", fontSize: 12, color: C.muted, marginBottom: 16 }}>Select a client from the sidebar to generate their growth plan.</div>}
      <div className="vx-output" style={{ minHeight: 260 }}>
        {loading
          ? <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "80px 0", justifyContent: "center", color: C.teal, fontSize: 11, letterSpacing: "0.14em" }}><Spin large /> BUILDING 30-DAY PLAN…</div>
          : plan ? <div className="vx-output-text">{plan}</div>
          : <Empty text={client ? "Click Generate 30-Day Plan to build growth strategy" : "Select a client first"} />
        }
      </div>
    </div>
  );
}

function ContentCalendar({ client }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [posts, setPosts] = useState({});
  const [postForm, setPostForm] = useState({ platform: "Instagram", contentType: "Reel", caption: "", status: "Planned" });
  const [generatingIdea, setGeneratingIdea] = useState(false);

  const calKey = (y, m) => client ? `calendar_${client.id}_${y}_${m}` : `calendar_global_${y}_${m}`;
  useEffect(() => { setPosts(LS.get(calKey(year, month), {})); setSelectedDay(null); }, [year, month, client?.id]);
  const savePosts = (u) => { setPosts(u); LS.set(calKey(year, month), u); };

  const addPost = () => {
    if (!selectedDay || !postForm.caption.trim()) return;
    const k = String(selectedDay);
    savePosts({ ...posts, [k]: [...(posts[k] || []), { id: Date.now().toString(), ...postForm }] });
    setPostForm({ platform: "Instagram", contentType: "Reel", caption: "", status: "Planned" });
  };
  const removePost = (day, postId) => {
    const k = String(day);
    const updated = { ...posts, [k]: (posts[k] || []).filter(p => p.id !== postId) };
    if (!updated[k].length) delete updated[k];
    savePosts(updated);
  };
  const generateIdea = async () => {
    if (!selectedDay) return;
    setGeneratingIdea(true);
    try {
      const text = await analyzeWithVantix(
        "You are VANTIX Content Calendar AI. Generate specific, platform-tailored content ideas.",
        `Content idea for ${client ? client.name + ", niche:" + (client.niche || client.industry) : "marketing agency"}. Date:${year}-${String(month+1).padStart(2,"0")}-${String(selectedDay).padStart(2,"0")} Platform:${postForm.platform} Type:${postForm.contentType}\n\n1) Hook/Title 2) Content angle 3) Key talking points 4) CTA`
      );
      setPostForm(f => ({ ...f, caption: text }));
    } catch (e) { setPostForm(f => ({ ...f, caption: "Error: " + e.message })); }
    setGeneratingIdea(false);
  };

  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DOW = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonth = () => { if (month === 0) { setYear(y => y-1); setMonth(11); } else setMonth(m => m-1); };
  const nextMonth = () => { if (month === 11) { setYear(y => y+1); setMonth(0); } else setMonth(m => m+1); };

  const PLATFORMS = ["Instagram","TikTok","Facebook","LinkedIn","YouTube"];
  const CTYPES = ["Reel","Carousel","Static Post","Story","Live","Short"];
  const STATUSES = ["Planned","In Progress","Published","Cancelled"];
  const platColor = { Instagram:"#e1306c", TikTok:"#00f2ea", Facebook:"#1877f2", LinkedIn:"#0a66c2", YouTube:"#ff0000" };

  const allPosts = Object.values(posts).flat();
  const published = allPosts.filter(p => p.status === "Published").length;

  return (
    <div>
      {/* Summary */}
      <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16, fontSize: 11, color: C.muted, flexWrap: "wrap" }}>
        <span style={{ fontWeight: 700, color: C.text }}>{MONTHS[month]} {year}</span>
        <span>{allPosts.length} posts · {published} published</span>
        {PLATFORMS.filter(p => allPosts.some(x => x.platform === p)).map(p => (
          <span key={p} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: platColor[p], display: "inline-block" }} />
            {p} {allPosts.filter(x => x.platform === p).length}
          </span>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selectedDay ? "1fr 300px" : "1fr", gap: 16 }}>
        <div>
          {/* Month nav */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <button className="vx-btn vx-btn-secondary vx-btn-sm" onClick={prevMonth}>‹ PREV</button>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em" }}>{MONTHS[month].toUpperCase()} {year}</div>
            <button className="vx-btn vx-btn-secondary vx-btn-sm" onClick={nextMonth}>NEXT ›</button>
          </div>
          {/* DOW headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 1, marginBottom: 1 }}>
            {DOW.map(d => <div key={d} style={{ padding: "6px 4px", textAlign: "center", fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", color: C.muted }}>{d}</div>)}
          </div>
          {/* Days */}
          <div className="vx-cal-grid">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} style={{ background: "#04080f", minHeight: 56 }} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayPosts = posts[String(day)] || [];
              const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
              const isSel = day === selectedDay;
              return (
                <div key={day} className={`vx-cal-day${isToday ? " today" : ""}${isSel ? " sel" : ""}`} onClick={() => setSelectedDay(day === selectedDay ? null : day)}>
                  <div className={`vx-cal-num${isToday ? " today-num" : ""}`}>{day}</div>
                  <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    {dayPosts.slice(0, 4).map(p => <div key={p.id} style={{ width: 5, height: 5, borderRadius: "50%", background: platColor[p.platform] || C.teal }} />)}
                    {dayPosts.length > 4 && <span style={{ fontSize: 8, color: C.muted }}>+{dayPosts.length - 4}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day panel */}
        {selectedDay && (
          <div style={{ border: "1px solid rgba(0,212,180,0.12)", background: "#0a1628", overflowY: "auto", maxHeight: "60vh" }}>
            <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(0,212,180,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.teal }}>{MONTHS[month].toUpperCase()} {selectedDay}</div>
            </div>
            <div style={{ padding: 14 }}>
              {(posts[String(selectedDay)] || []).map(p => (
                <div key={p.id} style={{ padding: "8px 10px", background: "#04080f", border: "1px solid rgba(0,212,180,0.06)", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: platColor[p.platform] || C.teal }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.teal, letterSpacing: "0.1em" }}>{p.platform}</span>
                    <span style={{ fontSize: 10, color: C.muted }}>· {p.contentType}</span>
                    <span style={{ marginLeft: "auto", fontSize: 9, color: p.status === "Published" ? C.teal : C.muted, fontWeight: 700 }}>{p.status}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(232,237,245,0.7)", lineHeight: 1.5, maxHeight: 50, overflow: "hidden", marginBottom: 6 }}>{p.caption}</div>
                  <button className="vx-btn vx-btn-danger vx-btn-sm" style={{ fontSize: 9, padding: "3px 8px" }} onClick={() => removePost(selectedDay, p.id)}>REMOVE</button>
                </div>
              ))}

              {/* Add form */}
              <div style={{ borderTop: (posts[String(selectedDay)] || []).length > 0 ? "1px solid rgba(0,212,180,0.08)" : "none", paddingTop: 12 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", color: C.muted, marginBottom: 10 }}>ADD POST</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                  <div>
                    <label className="vx-label">Platform</label>
                    <select className="vx-select-field" value={postForm.platform} onChange={e => setPostForm(f => ({ ...f, platform: e.target.value }))}>
                      {PLATFORMS.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="vx-label">Type</label>
                    <select className="vx-select-field" value={postForm.contentType} onChange={e => setPostForm(f => ({ ...f, contentType: e.target.value }))}>
                      {CTYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <label className="vx-label">Status</label>
                  <select className="vx-select-field" value={postForm.status} onChange={e => setPostForm(f => ({ ...f, status: e.target.value }))}>
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <label className="vx-label">Caption / Notes</label>
                  <textarea className="vx-input" value={postForm.caption} onChange={e => setPostForm(f => ({ ...f, caption: e.target.value }))} rows={3} style={{ resize: "vertical" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <button className="vx-btn vx-btn-secondary vx-btn-full" onClick={generateIdea} disabled={generatingIdea} style={{ fontSize: 10 }}>
                    {generatingIdea ? <><Spin /> GENERATING…</> : "GENERATE CONTENT IDEA"}
                  </button>
                  <button className="vx-btn vx-btn-primary vx-btn-full" onClick={addPost} disabled={!postForm.caption.trim()} style={{ fontSize: 10 }}>+ ADD POST</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ContentLab({ client }) {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!prompt.trim()) return;
    setLoading(true); setOutput("");
    try {
      const text = await analyzeWithVantix(
        `You are VANTIX Content Lab — a creative testing environment for ${client?.name || "a marketing account"} in ${client?.niche || "general"} niche. Test, iterate, and refine content concepts. Be specific and tactical.`,
        prompt
      );
      setOutput(text);
    } catch (e) { setOutput("Error: " + e.message); }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ fontSize: 11, color: C.muted, marginBottom: 16, letterSpacing: "0.1em" }}>FREEFORM CONTENT TESTING ENVIRONMENT — test angles, hooks, formats, and ideas before publishing.</div>
      <div style={{ marginBottom: 14 }}>
        <label className="vx-label">Prompt / Request</label>
        <textarea className="vx-input" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="e.g. Test 3 different hook angles for a fitness transformation post…" rows={3} style={{ resize: "vertical" }} />
      </div>
      <button className="vx-btn vx-btn-primary" onClick={run} disabled={loading || !prompt.trim()} style={{ marginBottom: 14 }}>
        {loading ? <><Spin /> RUNNING…</> : "RUN EXPERIMENT"}
      </button>
      <div className="vx-output" style={{ minHeight: 160 }}>
        {loading
          ? <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "50px 0", justifyContent: "center", color: C.teal, fontSize: 11, letterSpacing: "0.14em" }}><Spin large /> RUNNING EXPERIMENT…</div>
          : output ? <div className="vx-output-text">{output}</div>
          : <Empty text="Enter a prompt and run an experiment" />
        }
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   INTEL OPS PAGE
═══════════════════════════════════════════ */
function IntelOpsPage({ client }) {
  const key = client ? `competitors_${client.id}` : "competitors_global";
  const [competitors, setCompetitors] = useState([]);
  const [form, setForm] = useState({ name: "", handle: "", niche: "" });
  const [adding, setAdding] = useState(false);
  const [analyzing, setAnalyzing] = useState(null);
  const [activeComp, setActiveComp] = useState(null);

  useEffect(() => {
    const comps = LS.get(key, []);
    setCompetitors(comps);
    if (comps.length && !activeComp) setActiveComp(comps[0]);
  }, [key]);

  const save = (u) => { setCompetitors(u); LS.set(key, u); };

  const addCompetitor = () => {
    if (!form.name.trim()) return;
    const entry = { id: Date.now().toString(), ...form, analysis: "", analyzedAt: null };
    const updated = [...competitors, entry];
    save(updated); setActiveComp(entry);
    setForm({ name: "", handle: "", niche: "" }); setAdding(false);
  };

  const remove = (id) => {
    const updated = competitors.filter(c => c.id !== id);
    save(updated);
    if (activeComp?.id === id) setActiveComp(updated[0] || null);
  };

  const analyze = async (comp) => {
    setAnalyzing(comp.id);
    const clientCtx = client ? `Client: ${client.name} in ${client.niche || client.industry || "marketing"}` : "No client context";
    try {
      const text = await analyzeWithVantix(
        "You are VANTIX Competitor Intelligence AI. Provide deep, actionable competitive analysis.",
        `Analyze competitor "${comp.name}" (IG: ${comp.handle || "unknown"}, Niche: ${comp.niche || "unknown"}).\n${clientCtx}\n\n1) Content Strategy Analysis 2) Strengths & Weaknesses 3) Growth Patterns 4) Content Gaps 5) 3 Action Items to outperform them. Be specific and tactical.`
      );
      const updated = competitors.map(c => c.id === comp.id ? { ...c, analysis: text, analyzedAt: new Date().toISOString() } : c);
      save(updated);
      setActiveComp(updated.find(c => c.id === comp.id));
    } catch (e) {
      const updated = competitors.map(c => c.id === comp.id ? { ...c, analysis: "Error: " + e.message } : c);
      save(updated);
    }
    setAnalyzing(null);
  };

  return (
    <div className="vx-section">
      <div className="vx-sec-hd">
        <div>
          <div className="vx-sec-title">INTELLIGENCE OPERATIONS</div>
          <div className="vx-sec-name">Competitor Intel</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <a href="/vantix/connections" className="vx-btn vx-btn-secondary vx-btn-sm" style={{ textDecoration: "none" }}>CONNECTED ACCOUNTS</a>
          <a href="/vantix/report" target="_blank" rel="noopener noreferrer" className="vx-btn vx-btn-secondary vx-btn-sm" style={{ textDecoration: "none" }}>EXPORT REPORT</a>
          <button className="vx-btn vx-btn-primary vx-btn-sm" onClick={() => setAdding(!adding)}>+ ADD TARGET</button>
        </div>
      </div>

      {adding && (
        <div className="vx-card vx-card-accent" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: C.teal, marginBottom: 12 }}>NEW COMPETITOR TARGET</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 10, marginBottom: 12 }}>
            {[["Name *","name"],["Instagram Handle","handle"],["Niche","niche"]].map(([label, field]) => (
              <div key={field}>
                <label className="vx-label">{label}</label>
                <input className="vx-input" value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} onKeyDown={e => e.key === "Enter" && addCompetitor()} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="vx-btn vx-btn-primary vx-btn-sm" onClick={addCompetitor}>ADD TARGET</button>
            <button className="vx-btn vx-btn-secondary vx-btn-sm" onClick={() => { setAdding(false); setForm({ name: "", handle: "", niche: "" }); }}>CANCEL</button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 16, alignItems: "start" }} className="vx-intel-ops-layout">
        {/* Competitor list */}
        <div style={{ border: "1px solid rgba(0,212,180,0.08)" }}>
          <table className="vx-table" style={{ width: "100%" }}>
            <thead><tr><th>TARGET</th><th></th></tr></thead>
            <tbody>
              {competitors.map(comp => (
                <tr key={comp.id} className={activeComp?.id === comp.id ? "selected" : ""} style={{ cursor: "pointer" }} onClick={() => setActiveComp(comp)}>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 13, color: C.text }}>{comp.name}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{comp.handle || comp.niche || "—"}</div>
                    {comp.analyzedAt && <div style={{ fontSize: 9, color: "rgba(232,237,245,0.25)", marginTop: 2 }}>{new Date(comp.analyzedAt).toLocaleDateString()}</div>}
                  </td>
                  <td>
                    <button className="vx-btn vx-btn-danger vx-btn-sm" style={{ fontSize: 9, padding: "2px 7px" }} onClick={e => { e.stopPropagation(); remove(comp.id); }}>✕</button>
                  </td>
                </tr>
              ))}
              {competitors.length === 0 && (
                <tr><td colSpan={2} style={{ textAlign: "center", color: C.muted, padding: "24px 12px", fontSize: 11, letterSpacing: "0.1em" }}>NO TARGETS</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Analysis panel */}
        <div>
          {activeComp ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{activeComp.name}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{activeComp.handle} {activeComp.niche ? `· ${activeComp.niche}` : ""}</div>
                </div>
                <button className="vx-btn vx-btn-primary vx-btn-sm" onClick={() => analyze(activeComp)} disabled={analyzing === activeComp.id}>
                  {analyzing === activeComp.id ? <><Spin /> ANALYZING…</> : activeComp.analysis ? "RE-ANALYZE" : "ANALYZE TARGET"}
                </button>
              </div>
              <div className="vx-output" style={{ minHeight: 260 }}>
                {analyzing === activeComp.id
                  ? <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "80px 0", justifyContent: "center", color: C.teal, fontSize: 11, letterSpacing: "0.14em" }}><Spin large /> ANALYZING TARGET…</div>
                  : activeComp.analysis
                    ? <div className="vx-output-text">{activeComp.analysis}</div>
                    : <Empty text="Click Analyze Target to run competitive intelligence" />
                }
              </div>
              {activeComp.analyzedAt && (
                <div style={{ fontSize: 10, color: C.muted, marginTop: 8, letterSpacing: "0.1em" }}>LAST ANALYZED: {new Date(activeComp.analyzedAt).toLocaleString().toUpperCase()}</div>
              )}
            </div>
          ) : (
            <div className="vx-card"><Empty text="Add a competitor target to begin analysis" /></div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   BRAIN PAGE
═══════════════════════════════════════════ */
function BrainPage() {
  return (
    <div style={{ position: "absolute", inset: 0, background: C.bg }}>
      <VantixBrain />
    </div>
  );
}
