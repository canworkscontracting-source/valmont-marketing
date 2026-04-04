"use client";
import { useState, useEffect } from "react";

const C = {
  bg: "#050d1a", bg1: "#060e1e", bg2: "#0a1628", bg3: "#0d1d35",
  teal: "#00d4bf", tealLo: "rgba(0,212,191,0.10)", tealMd: "rgba(0,212,191,0.20)", tealHi: "rgba(0,212,191,0.35)",
  red: "#ff4d5e", white: "#ffffff", muted: "rgba(255,255,255,0.55)",
  border: "rgba(0,212,191,0.15)", borderHi: "rgba(0,212,191,0.35)",
};

const LS = {
  get: (k, d = null) => { try { const v = localStorage.getItem("vx_" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem("vx_" + k, JSON.stringify(v)); } catch {} },
};

const NAV_ITEMS = [
  { label: "DASHBOARD", module: "Intelligence Hub" },
  { label: "CLIENTS", module: "Client Profiles" },
  { label: "CONTENT", module: "Content Creator AI" },
  { label: "GROWTH", module: "Growth Strategy AI" },
  { label: "COMPETITOR", module: "Competitor Tracker" },
  { label: "PERFORMANCE", module: "Performance Tracker" },
  { label: "CALENDAR", module: "Content Calendar" },
  { label: "NICHE", module: "Niche Intelligence" },
  { label: "CONTENT LAB", module: "Content Lab" },
];

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

const CSS = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: rgba(0,212,191,0.2); border-radius: 2px; }

  @keyframes vx-spin { to { transform: rotate(360deg); } }
  @keyframes vx-pulse { 0%,100% { opacity:1; box-shadow:0 0 6px #00d4bf; } 50% { opacity:0.4; box-shadow:0 0 2px #00d4bf; } }
  @keyframes vx-slideIn { from { transform:translateX(100%); } to { transform:translateX(0); } }
  @keyframes vx-fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }

  .vx-root { font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; background:#050d1a; min-height:100vh; color:#fff; }

  /* ── NAV ── */
  .vx-nav { background:rgba(6,14,30,0.97); border-bottom:1px solid rgba(0,212,191,0.15); padding:0 32px; height:64px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:50; backdrop-filter:blur(16px); gap:16px; }
  .vx-nav-logo { display:flex; align-items:center; gap:10px; flex-shrink:0; }
  .vx-nav-links { display:flex; align-items:stretch; gap:2px; flex:1; justify-content:center; }
  .vx-nav-link { background:none; border:none; border-bottom:2px solid transparent; color:rgba(255,255,255,0.5); font-size:11px; font-weight:700; letter-spacing:0.12em; padding:0 12px; cursor:pointer; height:64px; display:flex; align-items:center; transition:color 0.2s,border-color 0.2s; white-space:nowrap; font-family:inherit; }
  .vx-nav-link:hover { color:#00d4bf; }
  .vx-nav-link.active { color:#00d4bf; border-bottom-color:#00d4bf; }
  .vx-nav-right { display:flex; align-items:center; gap:10px; flex-shrink:0; }
  .vx-hamburger { display:none; background:none; border:1px solid rgba(0,212,191,0.25); color:#00d4bf; padding:0; width:44px; height:44px; cursor:pointer; border-radius:5px; font-size:20px; align-items:center; justify-content:center; flex-shrink:0; }

  /* ── MOBILE DRAWER ── */
  .vx-mobile-overlay { display:none; position:fixed; inset:0; z-index:100; }
  .vx-mobile-overlay.open { display:block; }
  .vx-mobile-backdrop { position:absolute; inset:0; background:rgba(5,13,26,0.8); }
  .vx-mobile-drawer { position:absolute; top:0; right:0; bottom:0; width:min(300px,85vw); background:#060e1e; border-left:1px solid rgba(0,212,191,0.15); display:flex; flex-direction:column; animation:vx-slideIn 0.3s ease; overflow-y:auto; }
  .vx-mobile-drawer-head { padding:20px 20px 16px; border-bottom:1px solid rgba(0,212,191,0.1); display:flex; justify-content:space-between; align-items:center; }
  .vx-mobile-nav-link { display:flex; align-items:center; width:100%; background:none; border:none; border-left:3px solid transparent; color:rgba(255,255,255,0.5); font-size:14px; font-weight:700; letter-spacing:0.1em; padding:0 20px; height:48px; cursor:pointer; transition:all 0.2s; text-align:left; font-family:inherit; }
  .vx-mobile-nav-link:hover { color:#00d4bf; background:rgba(0,212,191,0.05); }
  .vx-mobile-nav-link.active { color:#00d4bf; border-left-color:#00d4bf; background:rgba(0,212,191,0.07); }

  /* ── CONTENT ── */
  .vx-content { padding:32px; max-width:1400px; margin:0 auto; animation:vx-fadeIn 0.3s ease; }

  /* ── CARDS ── */
  .vx-card { background:#0a1628; border:1px solid rgba(0,212,191,0.15); border-radius:8px; padding:24px; transition:border-color 0.25s,box-shadow 0.25s; }
  .vx-card-hover:hover { border-color:rgba(0,212,191,0.35); box-shadow:0 0 24px rgba(0,212,191,0.07); }
  .vx-card-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:18px; }
  .vx-card-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
  .vx-card-grid-2 { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
  .vx-dot-bg { background-image:radial-gradient(rgba(0,212,191,0.12) 1px,transparent 1px); background-size:28px 28px; }

  /* ── ICON BOX ── */
  .vx-icon-box { width:42px; height:42px; background:rgba(0,212,191,0.10); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:19px; flex-shrink:0; }

  /* ── BUTTONS ── */
  .vx-btn { display:inline-flex; align-items:center; justify-content:center; gap:7px; padding:10px 22px; border:none; border-radius:5px; font-size:12px; font-weight:700; letter-spacing:0.12em; cursor:pointer; transition:all 0.2s; font-family:inherit; white-space:nowrap; min-height:40px; }
  .vx-btn-primary { background:#00d4bf; color:#050d1a; }
  .vx-btn-primary:hover:not(:disabled) { background:#00f0d8; }
  .vx-btn-primary:disabled { opacity:0.5; cursor:not-allowed; }
  .vx-btn-outline { background:transparent; border:1px solid rgba(0,212,191,0.35); color:#00d4bf; }
  .vx-btn-outline:hover:not(:disabled) { background:rgba(0,212,191,0.09); border-color:#00d4bf; }
  .vx-btn-outline:disabled { opacity:0.5; cursor:not-allowed; }
  .vx-btn-danger { background:rgba(255,77,94,0.1); border:1px solid rgba(255,77,94,0.28); color:#ff4d5e; }
  .vx-btn-danger:hover { background:rgba(255,77,94,0.18); }
  .vx-btn-sm { padding:7px 14px; font-size:11px; min-height:34px; }
  .vx-btn-full { width:100%; }

  /* ── FORM ── */
  .vx-input { width:100%; background:#0d1d35; border:1px solid rgba(0,212,191,0.15); border-radius:5px; padding:11px 14px; color:#fff; font-size:14px; font-family:inherit; transition:border-color 0.2s; }
  .vx-input:focus { outline:none; border-color:#00d4bf; }
  .vx-input::placeholder { color:rgba(255,255,255,0.28); }
  .vx-label { font-size:11px; font-weight:700; letter-spacing:0.12em; color:rgba(255,255,255,0.5); margin-bottom:7px; display:block; text-transform:uppercase; }

  /* ── SELECT ── */
  .vx-select { background:#0a1628; border:1px solid rgba(0,212,191,0.2); color:#fff; padding:8px 12px; border-radius:5px; font-size:13px; cursor:pointer; font-family:inherit; transition:border-color 0.2s; }
  .vx-select:focus { outline:none; border-color:#00d4bf; }
  select option { background:#0a1628; }

  /* ── PILLS (content type selector) ── */
  .vx-pill { padding:7px 16px; border-radius:20px; cursor:pointer; font-size:11px; font-weight:700; letter-spacing:0.1em; border:1px solid rgba(0,212,191,0.2); background:transparent; color:rgba(255,255,255,0.5); transition:all 0.2s; font-family:inherit; }
  .vx-pill.active { background:#00d4bf; border-color:#00d4bf; color:#050d1a; }
  .vx-pill:hover:not(.active) { border-color:rgba(0,212,191,0.5); color:#00d4bf; }

  /* ── CONNECTED PILL ── */
  .vx-conn-pill { display:inline-flex; align-items:center; gap:7px; padding:8px 16px; background:rgba(0,212,191,0.08); border:1px solid rgba(0,212,191,0.3); border-radius:20px; color:#00d4bf; font-size:11px; font-weight:700; letter-spacing:0.1em; text-decoration:none; transition:all 0.2s; white-space:nowrap; }
  .vx-conn-pill:hover { background:rgba(0,212,191,0.15); border-color:#00d4bf; }
  .vx-conn-dot { width:7px; height:7px; border-radius:50%; background:#00d4bf; animation:vx-pulse 2s ease-in-out infinite; flex-shrink:0; }

  /* ── PULSE DOT (logo) ── */
  .vx-pulse-dot { width:7px; height:7px; border-radius:50%; background:#00d4bf; box-shadow:0 0 8px #00d4bf; animation:vx-pulse 2s ease-in-out infinite; flex-shrink:0; }

  /* ── SPINNER ── */
  .vx-spinner { width:16px; height:16px; border:2px solid rgba(0,212,191,0.15); border-top-color:#00d4bf; border-radius:50%; animation:vx-spin 0.8s linear infinite; flex-shrink:0; }
  .vx-spinner-lg { width:32px; height:32px; border-width:3px; }

  /* ── TABS ── */
  .vx-tabs { display:flex; gap:0; border-bottom:1px solid rgba(0,212,191,0.12); margin-bottom:22px; }
  .vx-tab { background:none; border:none; border-bottom:2px solid transparent; color:rgba(255,255,255,0.45); font-size:12px; font-weight:700; letter-spacing:0.1em; padding:10px 18px; cursor:pointer; transition:all 0.2s; margin-bottom:-1px; font-family:inherit; text-transform:uppercase; }
  .vx-tab.active { color:#00d4bf; border-bottom-color:#00d4bf; }
  .vx-tab:hover:not(.active) { color:rgba(255,255,255,0.75); }

  /* ── PAGE HEADER ── */
  .vx-page-header { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:28px; padding-bottom:22px; border-bottom:1px solid rgba(0,212,191,0.1); flex-wrap:wrap; }
  .vx-page-title { font-size:22px; font-weight:800; letter-spacing:0.06em; color:#fff; text-transform:uppercase; margin:0; }
  .vx-page-sub { font-size:13px; color:#00d4bf; margin-top:5px; }

  /* ── OUTPUT AREA ── */
  .vx-output { background:#0a1628; border:1px solid rgba(0,212,191,0.15); border-radius:8px; padding:24px; min-height:180px; }
  .vx-output-text { font-size:14px; color:rgba(255,255,255,0.88); line-height:1.9; white-space:pre-wrap; }
  .vx-empty-state { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; padding:48px 20px; color:rgba(255,255,255,0.45); text-align:center; }
  .vx-empty-icon { font-size:32px; opacity:0.6; }
  .vx-empty-text { font-size:13px; line-height:1.6; max-width:320px; }

  /* ── MOBILE STICKY BAR ── */
  .vx-mobile-sticky { display:none; position:fixed; bottom:0; left:0; right:0; background:rgba(6,14,30,0.98); border-top:1px solid rgba(0,212,191,0.15); padding:12px 16px; z-index:40; backdrop-filter:blur(16px); }

  /* ── CLIENT CARD ── */
  .vx-client-card { background:#0a1628; border:1px solid rgba(0,212,191,0.15); border-radius:8px; padding:20px; transition:border-color 0.25s,box-shadow 0.25s; cursor:pointer; }
  .vx-client-card:hover { border-color:rgba(0,212,191,0.35); box-shadow:0 0 20px rgba(0,212,191,0.07); }
  .vx-client-card.selected { border-color:rgba(0,212,191,0.5); background:rgba(0,212,191,0.05); }

  /* ── RESPONSIVE ── */
  @media (max-width:1023px) {
    .vx-nav { padding:0 20px; }
    .vx-nav-links { display:none; }
    .vx-nav-right { display:none; }
    .vx-hamburger { display:flex; }
    .vx-content { padding:24px 20px; }
    .vx-card-grid-3 { grid-template-columns:repeat(2,1fr); }
  }
  @media (max-width:767px) {
    .vx-nav { padding:0 16px; height:56px; }
    .vx-content { padding:16px; padding-bottom:80px; }
    .vx-card-grid-3 { grid-template-columns:1fr; }
    .vx-card-grid-2 { grid-template-columns:1fr; }
    .vx-card-grid { grid-template-columns:1fr; }
    .vx-mobile-sticky { display:flex; align-items:center; }
    .vx-mobile-hide { display:none !important; }
    .vx-page-title { font-size:18px; }
    .vx-card { padding:16px; }
    .vx-btn-full-m { width:100%; }
    .vx-row-m { flex-direction:column; }
    .vx-output { padding:16px; }
    .vx-page-header { flex-direction:column; align-items:stretch; }
  }
`;

/* ─── Shared UI components ─── */

function Spinner({ label, large }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, color: C.teal, fontSize: 12, letterSpacing: "0.12em", fontWeight: 600 }}>
      <div className={large ? "vx-spinner vx-spinner-lg" : "vx-spinner"} />
      {label && <span>{label}</span>}
    </div>
  );
}

function EmptyState({ icon = "✦", text }) {
  return (
    <div className="vx-empty-state">
      <div className="vx-empty-icon">{icon}</div>
      <div className="vx-empty-text">{text}</div>
    </div>
  );
}

function IconBox({ children }) {
  return <div className="vx-icon-box">{children}</div>;
}

/* ─── Nav component ─── */

function TopNav({ activeModule, clients, selectedClient, onNavigate, onSelectClient, menuOpen, setMenuOpen, onLogout }) {
  return (
    <>
      <nav className="vx-nav">
        {/* Logo */}
        <div className="vx-nav-logo">
          <div>
            <div style={{ fontWeight: 800, fontSize: 19, letterSpacing: "0.15em", color: C.teal, lineHeight: 1 }}>VANTIX</div>
            <div style={{ fontSize: 9, color: C.muted, letterSpacing: "0.18em", marginTop: 2 }}>POWERED BY VALMONT</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginLeft: 6 }}>
            <div className="vx-pulse-dot" />
            <span style={{ fontSize: 9, color: C.teal, letterSpacing: "0.14em", fontWeight: 700 }}>ONLINE</span>
          </div>
        </div>

        {/* Desktop nav links */}
        <div className="vx-nav-links">
          {NAV_ITEMS.map(item => (
            <button
              key={item.label}
              className={`vx-nav-link${activeModule === item.module ? " active" : ""}`}
              onClick={() => onNavigate(item.module)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop right controls */}
        <div className="vx-nav-right">
          <select
            className="vx-select"
            value={selectedClient?.id || ""}
            onChange={e => { const c = clients.find(x => x.id === e.target.value); if (c) onSelectClient(c); }}
          >
            <option value="">— Select Client —</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <a href="/vantix/connections" className="vx-conn-pill">
            <span className="vx-conn-dot" /> CONNECTED ACCOUNTS
          </a>
          <a href="/vantix/report" target="_blank" rel="noopener noreferrer" className="vx-btn vx-btn-outline vx-btn-sm" style={{ textDecoration: "none" }}>EXPORT REPORT</a>
          <button className="vx-btn vx-btn-sm" style={{ background: "rgba(255,77,94,0.1)", border: "1px solid rgba(255,77,94,0.25)", color: "#ff4d5e" }} onClick={onLogout}>LOGOUT</button>
        </div>

        {/* Hamburger */}
        <button className="vx-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">☰</button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="vx-mobile-overlay open">
          <div className="vx-mobile-backdrop" onClick={() => setMenuOpen(false)} />
          <div className="vx-mobile-drawer">
            <div className="vx-mobile-drawer-head">
              <div style={{ fontWeight: 800, fontSize: 18, color: C.teal, letterSpacing: "0.12em" }}>VANTIX</div>
              <button
                onClick={() => setMenuOpen(false)}
                style={{ background: "none", border: "none", color: C.muted, fontSize: 24, cursor: "pointer", padding: 0, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}
              >✕</button>
            </div>
            <div style={{ flex: 1, padding: "8px 0" }}>
              {NAV_ITEMS.map(item => (
                <button
                  key={item.label}
                  className={`vx-mobile-nav-link${activeModule === item.module ? " active" : ""}`}
                  onClick={() => { onNavigate(item.module); setMenuOpen(false); }}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div style={{ padding: "16px 20px", borderTop: `1px solid ${C.border}` }}>
              <label className="vx-label">CLIENT</label>
              <select
                className="vx-select"
                style={{ width: "100%" }}
                value={selectedClient?.id || ""}
                onChange={e => { const c = clients.find(x => x.id === e.target.value); if (c) { onSelectClient(c); setMenuOpen(false); } }}
              >
                <option value="">— Select Client —</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <a href="/vantix/report" target="_blank" rel="noopener noreferrer" className="vx-btn vx-btn-outline vx-btn-sm" style={{ flex: 1, textDecoration: "none", textAlign: "center" }} onClick={() => setMenuOpen(false)}>EXPORT REPORT</a>
                <button className="vx-btn vx-btn-sm" style={{ flex: 1, background: "rgba(255,77,94,0.1)", border: "1px solid rgba(255,77,94,0.25)", color: "#ff4d5e" }} onClick={() => { onLogout(); setMenuOpen(false); }}>LOGOUT</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Main Dashboard ─── */

export default function VantixDashboard() {
  const [activeModule, setActiveModule] = useState("Intelligence Hub");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem("vx_auth") !== "true") {
        window.location.replace("/vantix/login");
        return;
      }
      setAuthed(true);
    } catch {
      window.location.replace("/vantix/login");
      return;
    }
    const saved = LS.get("clients", []);
    setClients(saved);
    const selId = LS.get("selected_client_id");
    if (selId && saved.length) {
      const found = saved.find(c => c.id === selId);
      if (found) setSelectedClient(found);
    }
  }, []);

  const logout = () => {
    try { localStorage.removeItem("vx_auth"); } catch {}
    window.location.replace("/vantix/login");
  };

  const saveClient = (client) => {
    const updated = clients.find(c => c.id === client.id)
      ? clients.map(c => c.id === client.id ? client : c)
      : [...clients, client];
    setClients(updated);
    LS.set("clients", updated);
  };

  const deleteClient = (id) => {
    const updated = clients.filter(c => c.id !== id);
    setClients(updated);
    LS.set("clients", updated);
    if (selectedClient?.id === id) {
      setSelectedClient(updated[0] || null);
      LS.set("selected_client_id", updated[0]?.id || null);
    }
  };

  const selectClient = (client) => {
    setSelectedClient(client);
    LS.set("selected_client_id", client.id);
  };

  if (!mounted || !authed) return null;

  return (
    <div className="vx-root">
      <style>{CSS}</style>

      <TopNav
        activeModule={activeModule}
        clients={clients}
        selectedClient={selectedClient}
        onNavigate={setActiveModule}
        onSelectClient={selectClient}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onLogout={logout}
      />

      <main className="vx-content">
        {/* Page header */}
        <div className="vx-page-header">
          <div>
            <h1 className="vx-page-title">{activeModule}</h1>
            {selectedClient && (
              <div className="vx-page-sub">
                {selectedClient.name}{selectedClient.niche || selectedClient.industry ? ` · ${selectedClient.niche || selectedClient.industry}` : ""}
              </div>
            )}
          </div>
          {activeModule === "Intelligence Hub" && <IntelligenceHubActions />}
        </div>

        {/* Modules */}
        {activeModule === "Intelligence Hub" && <IntelligenceHub client={selectedClient} />}
        {activeModule === "Client Profiles" && (
          <ClientProfiles
            clients={clients}
            selectedClient={selectedClient}
            onSave={saveClient}
            onSelect={selectClient}
            onDelete={deleteClient}
          />
        )}
        {activeModule === "Content Creator AI" && <ContentCreatorAI client={selectedClient} />}
        {activeModule === "Growth Strategy AI" && <GrowthStrategyAI client={selectedClient} />}
        {activeModule === "Competitor Tracker" && <CompetitorTracker client={selectedClient} />}
        {activeModule === "Performance Tracker" && <PerformanceTracker client={selectedClient} />}
        {activeModule === "Content Calendar" && <ContentCalendar client={selectedClient} />}
        {!["Intelligence Hub", "Client Profiles", "Content Creator AI", "Growth Strategy AI", "Competitor Tracker", "Performance Tracker", "Content Calendar"].includes(activeModule) && (
          <SimpleModule title={activeModule} client={selectedClient} />
        )}
      </main>

      {/* Mobile sticky bar */}
      <div className="vx-mobile-sticky">
        <a href="/vantix/connections" className="vx-conn-pill" style={{ flex: 1, justifyContent: "center" }}>
          <span className="vx-conn-dot" /> CONNECTED ACCOUNTS
        </a>
      </div>
    </div>
  );
}

/* ─── Intelligence Hub ─── */

// Placeholder for actions slot in page header
function IntelligenceHubActions() {
  return null; // button rendered inside the module itself
}

function IntelligenceHub({ client }) {
  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setBrief("");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: "You are VANTIX Intelligence Hub. Generate a concise, high-signal daily marketing intelligence brief.",
          messages: [{
            role: "user",
            content: `Generate a daily AI marketing brief for ${client ? client.name + " in " + (client.niche || client.industry || "marketing") : "a marketing agency"}. Include: 1) Top trending content formats today 2) Algorithm insights 3) One key action to take today. Keep it sharp and actionable.`,
          }],
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
      setBrief(text || "No response received.");
    } catch (e) { setBrief("Error: " + e.message); }
    setLoading(false);
  };

  return (
    <div>
      {/* Hero card with dot bg */}
      <div className="vx-card vx-dot-bg" style={{ marginBottom: 20, padding: "32px 28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <IconBox>📡</IconBox>
            <div>
              <div style={{ fontSize: 12, color: C.teal, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 4 }}>Daily Intelligence Brief</div>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "0.04em", lineHeight: 1.1 }}>AI Marketing Signal</div>
              <div style={{ fontSize: 14, color: C.muted, marginTop: 8, lineHeight: 1.6, maxWidth: 480 }}>
                Real-time content trends, algorithm shifts, and the single highest-impact action you can take today.
              </div>
            </div>
          </div>
          <button
            className="vx-btn vx-btn-primary vx-btn-full-m"
            onClick={generate}
            disabled={loading}
          >
            {loading ? <><div className="vx-spinner" /> GENERATING…</> : "GENERATE BRIEF ›"}
          </button>
        </div>
      </div>

      {/* Output */}
      <div className="vx-output">
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 180 }}>
            <Spinner large label="VANTIX ANALYZING…" />
          </div>
        ) : brief ? (
          <div className="vx-output-text">{brief}</div>
        ) : (
          <EmptyState icon="📊" text={'Click "Generate Brief" to get your daily AI marketing intelligence.'} />
        )}
      </div>

      {/* Feature grid */}
      <div className="vx-card-grid-3" style={{ marginTop: 20 }}>
        {[
          { icon: "📈", title: "Content Trends", desc: "Live trending formats and content patterns across all major platforms." },
          { icon: "⚡", title: "Algorithm Insights", desc: "What the algorithm is rewarding right now — updated daily." },
          { icon: "🎯", title: "Action Signal", desc: "One specific, high-leverage action to execute today for maximum growth." },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="vx-card vx-card-hover" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <IconBox>{icon}</IconBox>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.teal }}>{title}</div>
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Client Profiles ─── */

function ClientProfiles({ clients, selectedClient, onSave, onSelect, onDelete }) {
  const empty = { id: "", name: "", niche: "", industry: "" };
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(false);
  const [isNew, setIsNew] = useState(true);

  const newClient = () => {
    setForm({ ...empty, id: Date.now().toString() });
    setIsNew(true);
    setEditing(true);
  };

  const editClient = (client) => {
    setForm({ ...client });
    setIsNew(false);
    setEditing(true);
  };

  const save = () => {
    if (!form.name.trim()) return;
    onSave(form);
    if (isNew) onSelect(form);
    setEditing(false);
    setForm(empty);
  };

  const remove = (client) => {
    if (window.confirm(`Remove ${client.name}?`)) onDelete(client.id);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, gap: 12, flexWrap: "wrap" }}>
        <div style={{ fontSize: 13, color: C.muted }}>{clients.length} client{clients.length !== 1 ? "s" : ""} total</div>
        <button className="vx-btn vx-btn-primary vx-btn-sm" onClick={newClient}>+ NEW CLIENT</button>
      </div>

      {/* Edit/create form */}
      {editing && (
        <div className="vx-card" style={{ borderColor: C.borderHi, marginBottom: 24, background: "rgba(0,212,191,0.03)" }}>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: C.teal, marginBottom: 20 }}>
            {isNew ? "✦ New Client" : "Edit Client"}
          </div>
          <div className="vx-card-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", marginBottom: 20 }}>
            {[["Client Name *", "name", "e.g. Nike, @username"], ["Niche", "niche", "e.g. Fitness, Real Estate"], ["Industry", "industry", "e.g. E-commerce, Coaching"]].map(([label, key, ph]) => (
              <div key={key}>
                <label className="vx-label">{label}</label>
                <input
                  className="vx-input"
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  placeholder={ph}
                  onKeyDown={e => e.key === "Enter" && save()}
                />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="vx-btn vx-btn-primary vx-btn-sm" onClick={save}>SAVE CLIENT</button>
            <button className="vx-btn vx-btn-outline vx-btn-sm" onClick={() => setEditing(false)}>CANCEL</button>
          </div>
        </div>
      )}

      {/* Client grid */}
      <div className="vx-card-grid">
        {clients.map(client => (
          <div
            key={client.id}
            className={`vx-client-card${selectedClient?.id === client.id ? " selected" : ""}`}
          >
            <div onClick={() => onSelect(client)} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: C.tealLo, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: C.teal, flexShrink: 0 }}>
                  {client.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: "0.04em" }}>{client.name}</div>
                  <div style={{ fontSize: 12, color: C.teal, marginTop: 1 }}>{client.niche || client.industry || "No niche set"}</div>
                </div>
              </div>
              {selectedClient?.id === client.id && (
                <div style={{ fontSize: 11, color: C.teal, fontWeight: 700, letterSpacing: "0.1em" }}>✓ ACTIVE CLIENT</div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="vx-btn vx-btn-outline vx-btn-sm" onClick={() => editClient(client)}>EDIT</button>
              <button className="vx-btn vx-btn-danger vx-btn-sm" onClick={() => remove(client)}>REMOVE</button>
            </div>
          </div>
        ))}
        {clients.length === 0 && !editing && (
          <div className="vx-card" style={{ gridColumn: "1/-1" }}>
            <EmptyState icon="👤" text={"No clients yet. Click \"+ New Client\" to add your first one."} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Content Creator AI ─── */

function ContentCreatorAI({ client }) {
  const TYPES = ["Caption", "Hook", "Reel Script", "Carousel"];
  const [contentType, setContentType] = useState("Caption");
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setOutput("");
    const niche = client?.niche || client?.industry || "general";
    const prompts = {
      Caption: `Write a high-performing Instagram caption for a ${niche} account about: "${topic}". Include a strong opening line, value-packed body, and a CTA. Add 20-25 relevant hashtags at the end. Format clearly.`,
      Hook: `Write 5 high-converting Instagram Reel hooks for a ${niche} account about: "${topic}". Each hook should stop the scroll in the first 3 seconds. Number them and explain why each works.`,
      "Reel Script": `Write a full Instagram Reel script for a ${niche} account about: "${topic}". Include: Hook (0-3s), Body (3-25s), CTA (25-30s). Add B-roll suggestions in [brackets]. Make it punchy and conversational.`,
      Carousel: `Create a full Instagram Carousel post for a ${niche} account about: "${topic}". Write: Slide 1 (Hook), Slides 2-7 (value/steps), Slide 8 (CTA). Keep each slide to 1-2 sentences. Format with slide numbers.`,
    };
    try {
      const text = await analyzeWithVantix(
        `You are VANTIX Content Creator AI. You write viral Instagram content for ${niche} accounts. Client: ${client?.name || "Unknown"}.`,
        prompts[contentType]
      );
      setOutput(text);
    } catch (e) { setOutput("Error: " + e.message); }
    setLoading(false);
  };

  return (
    <div>
      <div className="vx-card" style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 22 }}>
          <IconBox>✍️</IconBox>
          <div>
            <div style={{ fontSize: 13, color: C.teal, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 3 }}>Content Type</div>
            <div style={{ fontSize: 13, color: C.muted }}>Select what you want to create</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {TYPES.map(t => (
            <button key={t} className={`vx-pill${contentType === t ? " active" : ""}`} onClick={() => setContentType(t)}>
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="vx-card" style={{ marginBottom: 18 }}>
        <label className="vx-label">Topic / Idea</label>
        <div style={{ display: "flex", gap: 10 }} className="vx-row-m">
          <input
            className="vx-input"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            onKeyDown={e => e.key === "Enter" && generate()}
            placeholder={`e.g. "5 mistakes beginners make with ${client?.niche || "social media"}"`}
            style={{ flex: 1 }}
          />
          <button
            className="vx-btn vx-btn-primary vx-btn-full-m"
            onClick={generate}
            disabled={loading || !topic.trim()}
          >
            {loading ? <><div className="vx-spinner" /> WRITING…</> : "GENERATE ›"}
          </button>
        </div>
        {client && (
          <div style={{ marginTop: 10, fontSize: 12, color: C.muted }}>
            Tailored for <span style={{ color: C.teal }}>{client.name}</span> · {client.niche || client.industry || "No niche set"}
          </div>
        )}
      </div>

      <div className="vx-output">
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 160 }}>
            <Spinner label="VANTIX WRITING…" />
          </div>
        ) : output ? (
          <div className="vx-output-text">{output}</div>
        ) : (
          <EmptyState icon="✦" text="Select a content type, enter your topic, and click Generate." />
        )}
      </div>
    </div>
  );
}

/* ─── Growth Strategy AI ─── */

function GrowthStrategyAI({ client }) {
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!client) return;
    setLoading(true);
    setPlan("");
    const niche = client.niche || client.industry || "general";
    try {
      const text = await analyzeWithVantix(
        "You are VANTIX Growth Strategy AI. You build precise, data-driven 30-day Instagram growth plans. Be specific, actionable, and tactical. No fluff.",
        `Build a full 30-day Instagram growth plan for:\n\nCLIENT: ${client.name}\nNICHE: ${niche}\n\nInclude:\n1. Week 1 (Days 1-7): Foundation & Audit — profile optimization, content pillars, posting cadence\n2. Week 2 (Days 8-14): Content Blitz — specific reel ideas (write 3 full hooks), engagement strategy\n3. Week 3 (Days 15-21): Growth Sprint — collaboration tactics, hashtag strategy, DM funnel\n4. Week 4 (Days 22-30): Scale & Analyze — what to double down on, what to cut, KPIs to track\n5. Daily non-negotiables (3 habits every single day)\n6. Expected outcomes if plan is executed fully\n\nBe extremely specific to the ${niche} niche. Give exact post ideas, not generic advice.`
      );
      setPlan(text);
    } catch (e) { setPlan("Error: " + e.message); }
    setLoading(false);
  };

  return (
    <div>
      {/* Hero card */}
      <div className="vx-card vx-dot-bg" style={{ marginBottom: 18, padding: "28px 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <IconBox>🚀</IconBox>
            <div>
              <div style={{ fontSize: 12, color: C.teal, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 4 }}>30-Day Growth Plan</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{client ? client.name : "Select a client"}</div>
              {client && <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{client.niche || client.industry || "No niche set"}</div>}
            </div>
          </div>
          <button
            className="vx-btn vx-btn-primary vx-btn-full-m"
            onClick={generate}
            disabled={loading || !client}
          >
            {loading ? <><div className="vx-spinner" /> BUILDING…</> : plan ? "REGENERATE PLAN ›" : "GENERATE 30-DAY PLAN ›"}
          </button>
        </div>
        {!client && (
          <div style={{ marginTop: 16, padding: "10px 14px", background: "rgba(0,212,191,0.06)", border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, color: C.muted }}>
            Select a client from the dropdown in the nav bar to generate their growth plan.
          </div>
        )}
      </div>

      {/* Plan output */}
      <div className="vx-output">
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, minHeight: 220 }}>
            <Spinner large label="BUILDING YOUR 30-DAY GROWTH PLAN…" />
          </div>
        ) : plan ? (
          <div className="vx-output-text">{plan}</div>
        ) : (
          <EmptyState icon="📅" text={client ? `Click "Generate 30-Day Plan" to build a full Instagram growth strategy for ${client.name}.` : "Select a client first, then generate their growth plan."} />
        )}
      </div>
    </div>
  );
}

/* ─── Competitor Tracker ─── */

function CompetitorTracker({ client }) {
  const key = client ? `competitors_${client.id}` : "competitors_global";
  const [competitors, setCompetitors] = useState([]);
  const [form, setForm] = useState({ name: "", handle: "", niche: "" });
  const [adding, setAdding] = useState(false);
  const [analyzing, setAnalyzing] = useState(null);

  useEffect(() => {
    setCompetitors(LS.get(key, []));
  }, [key]);

  const save = (updated) => { setCompetitors(updated); LS.set(key, updated); };

  const addCompetitor = () => {
    if (!form.name.trim()) return;
    const entry = { id: Date.now().toString(), ...form, analysis: "", analyzedAt: null };
    save([...competitors, entry]);
    setForm({ name: "", handle: "", niche: "" });
    setAdding(false);
  };

  const remove = (id) => save(competitors.filter(c => c.id !== id));

  const analyze = async (comp) => {
    setAnalyzing(comp.id);
    const clientCtx = client ? `Client: ${client.name} in ${client.niche || client.industry || "marketing"}` : "No specific client context";
    try {
      const text = await analyzeWithVantix(
        "You are VANTIX Competitor Intelligence AI. Provide deep, actionable competitive analysis.",
        `Analyze competitor "${comp.name}" (Instagram: ${comp.handle || "unknown"}, Niche: ${comp.niche || "unknown"}).\n\n${clientCtx}\n\nProvide:\n1. Content Strategy Analysis — what types of content they likely post, posting frequency, engagement tactics\n2. Strengths & Weaknesses — what they do well vs. gaps to exploit\n3. Growth Patterns — estimated audience growth tactics, what's working for them\n4. Content Gaps — topics they're missing that our client could dominate\n5. 3 Specific Action Items — concrete ways our client can outperform this competitor\n\nBe specific, tactical, and actionable.`
      );
      const updated = competitors.map(c => c.id === comp.id ? { ...c, analysis: text, analyzedAt: new Date().toISOString() } : c);
      save(updated);
    } catch (e) {
      const updated = competitors.map(c => c.id === comp.id ? { ...c, analysis: "Error: " + e.message } : c);
      save(updated);
    }
    setAnalyzing(null);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 12, flexWrap: "wrap" }}>
        <div style={{ fontSize: 13, color: C.muted }}>{competitors.length} competitor{competitors.length !== 1 ? "s" : ""} tracked</div>
        <button className="vx-btn vx-btn-primary vx-btn-sm" onClick={() => setAdding(true)}>+ ADD COMPETITOR</button>
      </div>

      {!client && (
        <div className="vx-card" style={{ marginBottom: 18, borderColor: "rgba(0,212,191,0.1)" }}>
          <div style={{ fontSize: 13, color: C.muted, textAlign: "center", padding: "8px 0" }}>Select a client from the nav to track competitors per client.</div>
        </div>
      )}

      {adding && (
        <div className="vx-card" style={{ borderColor: C.borderHi, marginBottom: 20, background: "rgba(0,212,191,0.03)" }}>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: C.teal, marginBottom: 18 }}>✦ New Competitor</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 14, marginBottom: 16 }}>
            {[["Competitor Name *", "name", "e.g. Nike, @competitor"], ["Instagram Handle", "handle", "@handle"], ["Niche / Industry", "niche", "e.g. Fitness, Fashion"]].map(([label, field, ph]) => (
              <div key={field}>
                <label className="vx-label">{label}</label>
                <input className="vx-input" value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} placeholder={ph} onKeyDown={e => e.key === "Enter" && addCompetitor()} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="vx-btn vx-btn-primary vx-btn-sm" onClick={addCompetitor}>SAVE</button>
            <button className="vx-btn vx-btn-outline vx-btn-sm" onClick={() => { setAdding(false); setForm({ name: "", handle: "", niche: "" }); }}>CANCEL</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {competitors.map(comp => (
          <div key={comp.id} className="vx-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.tealLo, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: C.teal, flexShrink: 0 }}>
                  {comp.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{comp.name}</div>
                  {comp.handle && <div style={{ fontSize: 12, color: C.teal, marginTop: 2 }}>{comp.handle}</div>}
                  {comp.niche && <div style={{ fontSize: 12, color: C.muted, marginTop: 1 }}>{comp.niche}</div>}
                  {comp.analyzedAt && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", marginTop: 4 }}>Last analyzed: {new Date(comp.analyzedAt).toLocaleString()}</div>}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  className="vx-btn vx-btn-primary vx-btn-sm"
                  onClick={() => analyze(comp)}
                  disabled={analyzing === comp.id}
                >
                  {analyzing === comp.id ? <><div className="vx-spinner" /> ANALYZING…</> : "ANALYZE ›"}
                </button>
                <button className="vx-btn vx-btn-danger vx-btn-sm" onClick={() => remove(comp.id)}>REMOVE</button>
              </div>
            </div>

            {comp.analysis && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.teal, marginBottom: 10, textTransform: "uppercase" }}>Competitor Intelligence</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{comp.analysis}</div>
              </div>
            )}
            {analyzing === comp.id && !comp.analysis && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
                <Spinner label="VANTIX ANALYZING COMPETITOR…" />
              </div>
            )}
          </div>
        ))}
        {competitors.length === 0 && !adding && (
          <div className="vx-card">
            <EmptyState icon="🔍" text={'No competitors tracked yet. Click "+ Add Competitor" to start monitoring your client\'s competition.'} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Performance Tracker ─── */

function PerformanceTracker({ client }) {
  const key = client ? `performance_${client.id}` : "performance_global";
  const emptyForm = { date: new Date().toISOString().slice(0, 10), followers: "", posts: "", reach: "", impressions: "", engagementRate: "", avgLikes: "", avgComments: "", avgSaves: "", newLeads: "" };
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [logging, setLogging] = useState(false);
  const [insights, setInsights] = useState({});
  const [loadingInsight, setLoadingInsight] = useState(null);

  useEffect(() => {
    setEntries(LS.get(key, []));
  }, [key]);

  const saveEntries = (updated) => { setEntries(updated); LS.set(key, updated); };

  const addEntry = () => {
    if (!form.date || !form.followers) return;
    const entry = { id: Date.now().toString(), ...form };
    const updated = [entry, ...entries];
    saveEntries(updated);
    setForm(emptyForm);
    setLogging(false);
  };

  const removeEntry = (id) => saveEntries(entries.filter(e => e.id !== id));

  const growthPct = (curr, prev, field) => {
    const c = parseFloat(curr[field]);
    const p = parseFloat(prev[field]);
    if (!c || !p || p === 0) return null;
    return (((c - p) / p) * 100).toFixed(1);
  };

  const getInsight = async (entry) => {
    setLoadingInsight(entry.id);
    const clientCtx = client ? `Client: ${client.name} in ${client.niche || client.industry || "marketing"}` : "";
    try {
      const text = await analyzeWithVantix(
        "You are VANTIX Performance AI. Analyze Instagram performance data and provide precise, actionable insights.",
        `Analyze this Instagram performance data for ${clientCtx}:\n\nDate: ${entry.date}\nFollowers: ${entry.followers}\nPosts: ${entry.posts}\nReach: ${entry.reach}\nImpressions: ${entry.impressions}\nEngagement Rate: ${entry.engagementRate}%\nAvg Likes: ${entry.avgLikes} | Avg Comments: ${entry.avgComments} | Avg Saves: ${entry.avgSaves}\nNew Leads: ${entry.newLeads}\n\nProvide: 1) Performance Assessment (what's strong/weak) 2) Key Growth Lever (the single highest-leverage action) 3) Content Recommendation (what to post more/less of) 4) Next 7 Days Focus. Be specific and tactical.`
      );
      setInsights(prev => ({ ...prev, [entry.id]: text }));
    } catch (e) {
      setInsights(prev => ({ ...prev, [entry.id]: "Error: " + e.message }));
    }
    setLoadingInsight(null);
  };

  const FIELDS = [
    ["Date *", "date", "date"], ["Followers *", "followers", "number"], ["Posts", "posts", "number"],
    ["Reach", "reach", "number"], ["Impressions", "impressions", "number"], ["Engagement Rate (%)", "engagementRate", "text"],
    ["Avg Likes", "avgLikes", "number"], ["Avg Comments", "avgComments", "number"], ["Avg Saves", "avgSaves", "number"], ["New Leads", "newLeads", "number"],
  ];

  const totalEntries = entries.length;
  const overallGrowth = totalEntries >= 2 ? growthPct(entries[0], entries[totalEntries - 1], "followers") : null;
  const bestEngagement = entries.reduce((best, e) => {
    const v = parseFloat(e.engagementRate);
    return (!best || v > parseFloat(best.engagementRate)) ? e : best;
  }, null);

  return (
    <div>
      {/* Summary bar */}
      {totalEntries > 0 && (
        <div className="vx-card-grid-3" style={{ marginBottom: 20 }}>
          {[
            { label: "Total Entries", value: totalEntries, icon: "📋" },
            { label: "Overall Follower Growth", value: overallGrowth !== null ? `${overallGrowth > 0 ? "+" : ""}${overallGrowth}%` : "—", icon: "📈", color: overallGrowth > 0 ? C.teal : overallGrowth < 0 ? C.red : C.muted },
            { label: "Best Engagement Rate", value: bestEngagement?.engagementRate ? `${bestEngagement.engagementRate}%` : "—", icon: "⭐" },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="vx-card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: color || C.white, margin: "8px 0 4px" }}>{value}</div>
              <div style={{ fontSize: 11, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 12, flexWrap: "wrap" }}>
        <div style={{ fontSize: 13, color: C.muted }}>{totalEntries} log{totalEntries !== 1 ? "s" : ""} recorded</div>
        <button className="vx-btn vx-btn-primary vx-btn-sm" onClick={() => setLogging(true)}>+ LOG METRICS</button>
      </div>

      {logging && (
        <div className="vx-card" style={{ borderColor: C.borderHi, marginBottom: 20, background: "rgba(0,212,191,0.03)" }}>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: C.teal, marginBottom: 18 }}>✦ New Performance Log</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 14, marginBottom: 16 }}>
            {FIELDS.map(([label, field, type]) => (
              <div key={field}>
                <label className="vx-label">{label}</label>
                <input className="vx-input" type={type} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} placeholder={type === "number" ? "0" : ""} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="vx-btn vx-btn-primary vx-btn-sm" onClick={addEntry}>SAVE LOG</button>
            <button className="vx-btn vx-btn-outline vx-btn-sm" onClick={() => { setLogging(false); setForm(emptyForm); }}>CANCEL</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {entries.map((entry, i) => {
          const prev = entries[i + 1];
          const fg = prev ? growthPct(entry, prev, "followers") : null;
          return (
            <div key={entry.id} className="vx-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{entry.date}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                    {entry.followers && <span><span style={{ color: C.teal, fontWeight: 700 }}>{parseInt(entry.followers).toLocaleString()}</span> followers</span>}
                    {fg !== null && (
                      <span style={{ marginLeft: 10, color: fg > 0 ? C.teal : C.red, fontWeight: 700 }}>
                        {fg > 0 ? "▲" : "▼"} {Math.abs(fg)}% vs prev
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="vx-btn vx-btn-outline vx-btn-sm" onClick={() => getInsight(entry)} disabled={loadingInsight === entry.id}>
                    {loadingInsight === entry.id ? <><div className="vx-spinner" /> ANALYZING…</> : "AI INSIGHTS ›"}
                  </button>
                  <button className="vx-btn vx-btn-danger vx-btn-sm" onClick={() => removeEntry(entry.id)}>✕</button>
                </div>
              </div>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {[["Reach", entry.reach], ["Impressions", entry.impressions], ["Eng. Rate", entry.engagementRate ? entry.engagementRate + "%" : "—"], ["Avg Likes", entry.avgLikes], ["Avg Comments", entry.avgComments], ["Avg Saves", entry.avgSaves], ["New Leads", entry.newLeads]].filter(([, v]) => v).map(([label, val]) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.white }}>{isNaN(val) ? val : parseInt(val).toLocaleString()}</div>
                    <div style={{ fontSize: 10, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
                  </div>
                ))}
              </div>

              {insights[entry.id] && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.teal, marginBottom: 8, textTransform: "uppercase" }}>AI Insights</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{insights[entry.id]}</div>
                </div>
              )}
            </div>
          );
        })}
        {entries.length === 0 && !logging && (
          <div className="vx-card">
            <EmptyState icon="📊" text={'No performance logs yet. Click "+ Log Metrics" to start tracking your client\'s Instagram growth.'} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Content Calendar ─── */

function ContentCalendar({ client }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [posts, setPosts] = useState({});
  const [postForm, setPostForm] = useState({ platform: "Instagram", contentType: "Reel", caption: "", status: "Planned" });
  const [generatingIdea, setGeneratingIdea] = useState(false);

  const calKey = (y, m) => client ? `calendar_${client.id}_${y}_${m}` : `calendar_global_${y}_${m}`;

  useEffect(() => {
    setPosts(LS.get(calKey(year, month), {}));
  }, [year, month, client]);

  const savePosts = (updated) => { setPosts(updated); LS.set(calKey(year, month), updated); };

  const addPost = () => {
    if (!selectedDay || !postForm.caption.trim()) return;
    const dayKey = String(selectedDay);
    const dayPosts = posts[dayKey] || [];
    const updated = { ...posts, [dayKey]: [...dayPosts, { id: Date.now().toString(), ...postForm }] };
    savePosts(updated);
    setPostForm({ platform: "Instagram", contentType: "Reel", caption: "", status: "Planned" });
  };

  const removePost = (day, postId) => {
    const dayKey = String(day);
    const updated = { ...posts, [dayKey]: (posts[dayKey] || []).filter(p => p.id !== postId) };
    if (!updated[dayKey].length) delete updated[dayKey];
    savePosts(updated);
  };

  const generateIdea = async () => {
    if (!selectedDay) return;
    setGeneratingIdea(true);
    const clientCtx = client ? `Client: ${client.name}, Niche: ${client.niche || client.industry || "marketing"}` : "Marketing agency";
    try {
      const text = await analyzeWithVantix(
        "You are VANTIX Content Calendar AI. Generate specific, platform-tailored content ideas.",
        `Generate a content idea for ${clientCtx}.\n\nDate: ${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}\nPlatform: ${postForm.platform}\nContent Type: ${postForm.contentType}\n\nProvide: 1) Hook/Title (for Reels/Carousels) or Caption opening line 2) Main content angle 3) Key talking points (3 bullets) 4) CTA suggestion. Keep it sharp and platform-native.`
      );
      setPostForm(prev => ({ ...prev, caption: text }));
    } catch (e) {
      setPostForm(prev => ({ ...prev, caption: "Error: " + e.message }));
    }
    setGeneratingIdea(false);
  };

  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); setSelectedDay(null); };
  const nextMonth = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); setSelectedDay(null); };

  const PLATFORMS = ["Instagram", "TikTok", "Facebook", "LinkedIn", "YouTube"];
  const CONTENT_TYPES = ["Reel", "Carousel", "Static Post", "Story", "Live", "Short"];
  const STATUSES = ["Planned", "In Progress", "Published", "Cancelled"];

  // Platform colors
  const platColor = { Instagram: "#e1306c", TikTok: "#00f2ea", Facebook: "#1877f2", LinkedIn: "#0a66c2", YouTube: "#ff0000" };

  // Monthly summary
  const allPosts = Object.values(posts).flat();
  const byPlatform = PLATFORMS.reduce((acc, p) => { acc[p] = allPosts.filter(x => x.platform === p).length; return acc; }, {});
  const published = allPosts.filter(p => p.status === "Published").length;
  const planned = allPosts.filter(p => p.status !== "Published").length;

  return (
    <div>
      {/* Month summary bar */}
      {allPosts.length > 0 && (
        <div className="vx-card" style={{ marginBottom: 18, padding: "14px 20px" }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0 }}>This Month:</div>
            {PLATFORMS.filter(p => byPlatform[p] > 0).map(p => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: C.white }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: platColor[p] || C.teal }} />
                <span style={{ color: C.muted }}>{p}</span> <strong>{byPlatform[p]}</strong>
              </div>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", gap: 14 }}>
              <div style={{ fontSize: 12 }}><span style={{ color: C.teal, fontWeight: 700 }}>{published}</span> <span style={{ color: C.muted }}>published</span></div>
              <div style={{ fontSize: 12 }}><span style={{ color: C.muted, fontWeight: 700 }}>{planned}</span> <span style={{ color: C.muted }}>planned</span></div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: selectedDay ? "1fr 340px" : "1fr", gap: 20 }}>
        {/* Calendar */}
        <div className="vx-card" style={{ padding: "20px" }}>
          {/* Month navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <button className="vx-btn vx-btn-outline vx-btn-sm" onClick={prevMonth}>‹ PREV</button>
            <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: "0.06em" }}>{MONTHS[month]} {year}</div>
            <button className="vx-btn vx-btn-outline vx-btn-sm" onClick={nextMonth}>NEXT ›</button>
          </div>

          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 4 }}>
            {DAYS_OF_WEEK.map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", padding: "6px 0" }}>{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayPosts = posts[String(day)] || [];
              const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
              const isSelected = day === selectedDay;
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                  style={{
                    minHeight: 52, border: `1px solid ${isSelected ? C.teal : isToday ? "rgba(0,212,191,0.4)" : C.border}`,
                    borderRadius: 6, padding: "6px", cursor: "pointer", background: isSelected ? "rgba(0,212,191,0.08)" : isToday ? "rgba(0,212,191,0.04)" : "transparent",
                    transition: "all 0.15s", position: "relative",
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: isToday ? 800 : 500, color: isToday ? C.teal : C.white, marginBottom: 4 }}>{day}</div>
                  {dayPosts.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                      {dayPosts.slice(0, 3).map(p => (
                        <div key={p.id} style={{ width: 6, height: 6, borderRadius: "50%", background: platColor[p.platform] || C.teal }} />
                      ))}
                      {dayPosts.length > 3 && <div style={{ fontSize: 9, color: C.muted }}>+{dayPosts.length - 3}</div>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side panel */}
        {selectedDay && (
          <div className="vx-card" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: C.teal, marginBottom: 16 }}>
              {MONTHS[month]} {selectedDay}, {year}
            </div>

            {/* Existing posts */}
            {(posts[String(selectedDay)] || []).map(p => (
              <div key={p.id} style={{ background: C.bg3, borderRadius: 6, padding: "10px 12px", marginBottom: 10, border: `1px solid ${C.border}`, position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: platColor[p.platform] || C.teal }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.teal, letterSpacing: "0.08em" }}>{p.platform}</span>
                  <span style={{ fontSize: 11, color: C.muted }}>· {p.contentType}</span>
                  <span style={{ marginLeft: "auto", fontSize: 10, color: p.status === "Published" ? C.teal : C.muted, fontWeight: 700 }}>{p.status}</span>
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, marginBottom: 8, maxHeight: 60, overflow: "hidden" }}>{p.caption}</div>
                <button className="vx-btn vx-btn-danger vx-btn-sm" onClick={() => removePost(selectedDay, p.id)} style={{ fontSize: 10, padding: "4px 10px", minHeight: 28 }}>REMOVE</button>
              </div>
            ))}

            {/* Add post form */}
            <div style={{ borderTop: (posts[String(selectedDay)] || []).length > 0 ? `1px solid ${C.border}` : "none", paddingTop: (posts[String(selectedDay)] || []).length > 0 ? 14 : 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Add Post</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <div>
                  <label className="vx-label">Platform</label>
                  <select className="vx-select" style={{ width: "100%", fontSize: 12 }} value={postForm.platform} onChange={e => setPostForm(f => ({ ...f, platform: e.target.value }))}>
                    {PLATFORMS.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="vx-label">Content Type</label>
                  <select className="vx-select" style={{ width: "100%", fontSize: 12 }} value={postForm.contentType} onChange={e => setPostForm(f => ({ ...f, contentType: e.target.value }))}>
                    {CONTENT_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <label className="vx-label">Status</label>
                <select className="vx-select" style={{ width: "100%", fontSize: 12 }} value={postForm.status} onChange={e => setPostForm(f => ({ ...f, status: e.target.value }))}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 10 }}>
                <label className="vx-label">Caption / Notes</label>
                <textarea
                  className="vx-input"
                  value={postForm.caption}
                  onChange={e => setPostForm(f => ({ ...f, caption: e.target.value }))}
                  placeholder="Write caption or notes…"
                  rows={4}
                  style={{ resize: "vertical", minHeight: 80 }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button className="vx-btn vx-btn-outline vx-btn-sm vx-btn-full" onClick={generateIdea} disabled={generatingIdea}>
                  {generatingIdea ? <><div className="vx-spinner" /> GENERATING…</> : "GENERATE CONTENT IDEA ›"}
                </button>
                <button className="vx-btn vx-btn-primary vx-btn-sm vx-btn-full" onClick={addPost} disabled={!postForm.caption.trim()}>+ ADD POST</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Simple Module (placeholder for Content Lab, Niche Intelligence) ─── */

function SimpleModule({ title, client }) {
  const META = {
    "Content Lab": { icon: "🧪", desc: "A creative workspace for testing content angles, hooks, and formats before publishing. Iterate fast, win big." },
    "Niche Intelligence": { icon: "🧠", desc: "Deep-dive intelligence on any niche — top creators, content pillars, audience psychology, and monetization strategies." },
  };
  const meta = META[title] || { icon: "⚙️", desc: "This module is coming soon." };

  return (
    <div>
      <div className="vx-card vx-dot-bg" style={{ padding: "48px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>{meta.icon}</div>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>{title}</div>
        <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, maxWidth: 440, margin: "0 auto 28px" }}>{meta.desc}</div>
        {client ? (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px", background: C.tealLo, border: `1px solid ${C.border}`, borderRadius: 20, fontSize: 12, color: C.teal, fontWeight: 700, letterSpacing: "0.1em" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal, display: "inline-block" }} />
            CLIENT: {client.name.toUpperCase()}
          </div>
        ) : (
          <div style={{ fontSize: 13, color: C.muted }}>Select a client from the nav to get started.</div>
        )}
        <div style={{ marginTop: 24, display: "inline-block", padding: "8px 20px", background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 4, fontSize: 11, color: C.muted, letterSpacing: "0.1em" }}>
          COMING SOON
        </div>
      </div>
    </div>
  );
}
