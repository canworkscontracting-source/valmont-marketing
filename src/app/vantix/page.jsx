"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── THEME ───────────────────────────────────────────────────────────
const C = {
  bg:     "#040810",
  bg1:    "#070d1a",
  bg2:    "#0b1424",
  bg3:    "#0f1c30",
  bg4:    "#13223a",
  teal:   "#00D4B4",
  tealLo: "rgba(0,212,180,0.10)",
  tealMd: "rgba(0,212,180,0.20)",
  gold:   "#C8A96E",
  goldLo: "rgba(200,169,110,0.12)",
  red:    "#FF5060",
  redLo:  "rgba(255,80,96,0.12)",
  white:  "#E8EDF5",
  dim:    "#7A8BA8",
  border: "rgba(0,212,180,0.10)",
  borderHi:"rgba(0,212,180,0.28)",
};

const font = {
  display: "'Rajdhani', sans-serif",
  body:    "'Outfit', sans-serif",
  mono:    "'Space Mono', monospace",
};

// ─── LOCAL STORAGE ────────────────────────────────────────────────────
const LS = {
  get: (k, d = null) => { try { const v = localStorage.getItem("vx_" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem("vx_" + k, JSON.stringify(v)); } catch {} },
};

// ─── PLATFORMS ────────────────────────────────────────────────────────
const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: "IG" },
  { id: "facebook",  label: "Facebook",  icon: "FB" },
  { id: "youtube",   label: "YouTube",   icon: "YT" },
  { id: "linkedin",  label: "LinkedIn",  icon: "LI" },
  { id: "twitter",   label: "Twitter/X", icon: "TX" },
  { id: "whatsapp",  label: "WhatsApp",  icon: "WA" },
];

// ─── API CALL ─────────────────────────────────────────────────────────
async function callVantix({ systemPrompt, userMessage, useSearch = false, maxTokens = 2000 }) {
  const body = {
    model: "claude-sonnet-4-20250514",
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  };
  if (useSearch) {
    body.tools = [{ type: "web_search_20250305", name: "web_search" }];
  }

  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();

  // Extract all text blocks
  const text = (data.content || [])
    .filter(b => b.type === "text")
    .map(b => b.text)
    .join("\n");

  return text;
}

// ─── SHARED UI ────────────────────────────────────────────────────────
const Divider = () => <div style={{ height: 1, background: C.border, margin: "20px 0" }} />;

const Label = ({ children }) => (
  <div style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: C.dim, marginBottom: 7 }}>
    {children}
  </div>
);

const Input = ({ value, onChange, placeholder, multiline, rows = 3 }) => {
  const base = {
    background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 3,
    padding: "10px 13px", color: C.white, fontSize: 13, width: "100%",
    fontFamily: font.body, outline: "none", transition: "border 0.2s",
    boxSizing: "border-box",
  };
  return multiline
    ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
        style={{ ...base, resize: "vertical", minHeight: 70 }} />
    : <input value={value} onChange={onChange} placeholder={placeholder} style={base} />;
};

const Select = ({ value, onChange, children }) => (
  <select value={value} onChange={onChange} style={{
    background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 3,
    padding: "10px 13px", color: C.white, fontSize: 13, width: "100%",
    fontFamily: font.body, outline: "none", cursor: "pointer",
  }}>
    {children}
  </select>
);

const Btn = ({ children, onClick, variant = "primary", small, disabled, full }) => (
  <button onClick={onClick} disabled={disabled} style={{
    fontFamily: font.display, fontWeight: 600, fontSize: small ? 11 : 12,
    letterSpacing: "0.18em", textTransform: "uppercase", cursor: disabled ? "not-allowed" : "pointer",
    padding: small ? "7px 14px" : "11px 22px", borderRadius: 3, border: "none",
    background: variant === "primary" ? C.teal : variant === "red" ? C.red : variant === "gold" ? C.gold : C.bg3,
    color: variant === "ghost" ? C.dim : C.bg,
    border: variant === "ghost" ? `1px solid ${C.border}` : "none",
    opacity: disabled ? 0.5 : 1, width: full ? "100%" : "auto",
    transition: "all 0.2s",
  }}>{children}</button>
);

const Tag = ({ children, color = C.teal }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", padding: "3px 9px",
    background: `${color}15`, border: `1px solid ${color}35`,
    borderRadius: 2, fontSize: 10, fontFamily: font.mono,
    letterSpacing: "0.1em", textTransform: "uppercase", color,
  }}>{children}</span>
);

const Card = ({ children, style = {}, highlight }) => (
  <div style={{
    background: C.bg2, border: `1px solid ${highlight ? C.borderHi : C.border}`,
    borderRadius: 4, padding: "20px 22px",
    ...style,
  }}>{children}</div>
);

const CardTitle = ({ children }) => (
  <div style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: C.dim, marginBottom: 16 }}>
    {children}
  </div>
);

const Spinner = ({ label = "VANTIX PROCESSING..." }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.teal, fontFamily: font.mono, fontSize: 11, letterSpacing: "0.2em" }}>
    <div style={{
      width: 14, height: 14, border: `2px solid ${C.tealLo}`,
      borderTopColor: C.teal, borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
    }} />
    {label}
  </div>
);

const AIOutput = ({ content, loading, label = "VANTIX INTELLIGENCE OUTPUT" }) => (
  <div style={{ marginTop: 16 }}>
    <CardTitle>{label}</CardTitle>
    {loading ? <Spinner /> : (
      <div style={{
        background: C.bg, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.teal}`,
        borderRadius: 3, padding: "16px 18px", fontFamily: font.body,
        fontSize: 13, color: "rgba(232,237,245,0.85)", lineHeight: 1.9,
        whiteSpace: "pre-wrap", maxHeight: 480, overflowY: "auto",
      }}>{content || <span style={{ color: C.dim, fontSize: 12 }}>Output will appear here.</span>}</div>
    )}
  </div>
);

// ─── TOPBAR ───────────────────────────────────────────────────────────
function Topbar({ title, sub, actions }) {
  return (
    <div style={{
      background: C.bg1, borderBottom: `1px solid ${C.border}`,
      padding: "14px 28px", display: "flex", alignItems: "center",
      justifyContent: "space-between", position: "sticky", top: 0, zIndex: 8,
    }}>
      <div>
        <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 17, letterSpacing: "0.08em" }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: C.dim, marginTop: 2, fontFamily: font.mono, letterSpacing: "0.1em" }}>{sub}</div>}
      </div>
      {actions && <div style={{ display: "flex", gap: 10 }}>{actions}</div>}
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard",     label: "Intelligence Hub",     group: "VANTIX CORE" },
  { id: "clients",       label: "Client Profiles",      group: null },
  { id: "competitor",    label: "Competitor Tracker",   group: "AI ENGINES" },
  { id: "performance",   label: "Content Lab",          group: null },
  { id: "growth",        label: "Growth Strategy AI",   group: null },
  { id: "generator",     label: "Content Creator AI",   group: null },
  { id: "niche",         label: "Niche Intelligence",   group: null },
];

function Sidebar({ view, setView, clients, selectedClient, setSelectedClient }) {
  return (
    <div style={{
      width: 216, minHeight: "100vh", background: C.bg1,
      borderRight: `1px solid ${C.border}`, position: "fixed",
      top: 0, left: 0, bottom: 0, display: "flex", flexDirection: "column", zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{ padding: "22px 18px 16px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 24, letterSpacing: "0.2em", color: C.teal }}>VANTIX</div>
        <div style={{ fontFamily: font.mono, fontSize: 8, letterSpacing: "0.35em", color: C.dim, marginTop: 1 }}>AI GROWTH INTELLIGENCE</div>
        <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal, boxShadow: `0 0 8px ${C.teal}` }} />
          <span style={{ fontFamily: font.mono, fontSize: 9, color: C.teal, letterSpacing: "0.2em" }}>SYSTEM ONLINE</span>
        </div>
      </div>

      {/* Client selector */}
      {clients.length > 0 && (
        <div style={{ padding: "10px 14px", borderBottom: `1px solid ${C.border}` }}>
          <Label>Active Client</Label>
          <Select value={selectedClient?.id || ""} onChange={e => setSelectedClient(clients.find(c => c.id === e.target.value) || null)}>
            <option value="">— Select Client —</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
        {NAV.map(item => (
          <div key={item.id}>
            {item.group && (
              <div style={{ padding: "10px 18px 4px", fontFamily: font.mono, fontSize: 8, letterSpacing: "0.35em", color: "#3d4e66" }}>
                {item.group}
              </div>
            )}
            <div
              onClick={() => setView(item.id)}
              style={{
                padding: "9px 18px", cursor: "pointer", fontSize: 13, fontFamily: font.body,
                color: view === item.id ? C.teal : C.dim,
                background: view === item.id ? C.tealLo : "transparent",
                borderLeft: `2px solid ${view === item.id ? C.teal : "transparent"}`,
                fontWeight: view === item.id ? 500 : 300, transition: "all 0.15s",
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </nav>

      <div style={{ padding: "10px 18px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: font.mono, fontSize: 8, color: "#2a3a50", letterSpacing: "0.2em" }}>VALMONT MARKETING © 2025</div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────
function Dashboard({ clients, setView, setSelectedClient }) {
  const allPosts = LS.get("posts", []);
  const allComps = LS.get("competitors", []);
  const briefCache = LS.get("daily_brief", null);

  const todayStr = new Date().toISOString().split("T")[0];
  const [brief, setBrief] = useState(briefCache?.date === todayStr ? briefCache.text : "");
  const [loading, setLoading] = useState(false);

  const stats = [
    { num: clients.length,  label: "Clients Active" },
    { num: allPosts.length, label: "Posts Analyzed" },
    { num: allComps.length, label: "Competitors Tracked" },
    { num: clients.filter(c => (LS.get(`strategy_${c.id}`, null))).length, label: "Strategies Generated" },
  ];

  const generateBrief = async () => {
    if (!clients.length) return;
    setLoading(true);
    try {
      const niches = [...new Set(clients.map(c => c.niche).filter(Boolean))].join(", ");
      const text = await callVantix({
        systemPrompt: "You are VANTIX, an elite social media growth intelligence system. Be sharp, data-driven, and specific. No fluff.",
        userMessage: `Generate a concise intelligence brief for today (${todayStr}) for a social media agency managing clients in these niches: ${niches || "various businesses"}.

Include:
1. TOP 3 content opportunities this week across Instagram/Facebook/YouTube
2. Algorithm updates or platform changes relevant right now
3. One contrarian growth tactic most agencies aren't using
4. Engagement pattern insight for Indian/global audiences

Be specific. Numbers and tactics, not theory.`,
        useSearch: true,
        maxTokens: 1500,
      });
      setBrief(text);
      LS.set("daily_brief", { date: todayStr, text });
    } catch (e) {
      setBrief("Error generating brief. Check connection.");
    }
    setLoading(false);
  };

  return (
    <div>
      <Topbar title="INTELLIGENCE HUB" sub={`${new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`} />
      <div style={{ padding: 28, maxWidth: 1100 }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 4, padding: "18px 20px" }}>
              <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 38, color: C.teal, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: C.dim, marginTop: 7 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
          {/* Daily Brief */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <CardTitle>AI INTELLIGENCE BRIEF — TODAY</CardTitle>
              <Btn small onClick={generateBrief} disabled={loading}>
                {loading ? "Generating..." : brief ? "Refresh" : "Generate Brief"}
              </Btn>
            </div>
            {loading ? <Spinner label="VANTIX SCANNING MARKET..." /> : (
              brief
                ? <div style={{ fontFamily: font.body, fontSize: 13, color: "rgba(232,237,245,0.8)", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{brief}</div>
                : <div style={{ color: C.dim, fontSize: 13 }}>Click "Generate Brief" to get today's market intelligence for your niches.</div>
            )}
          </Card>

          {/* Quick actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Card>
              <CardTitle>QUICK ACTIONS</CardTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "→ Add New Client", view: "clients" },
                  { label: "→ Analyze Competitor", view: "competitor" },
                  { label: "→ Log Post Performance", view: "performance" },
                  { label: "→ Generate Growth Strategy", view: "growth" },
                  { label: "→ Create AI Content", view: "generator" },
                  { label: "→ Research Your Niche", view: "niche" },
                ].map(a => (
                  <div key={a.view} onClick={() => setView(a.view)} style={{
                    padding: "10px 14px", background: C.bg3, borderRadius: 3, cursor: "pointer",
                    fontSize: 13, color: C.dim, border: `1px solid ${C.border}`,
                    transition: "all 0.15s",
                  }}>
                    {a.label}
                  </div>
                ))}
              </div>
            </Card>

            <Card style={{ background: C.tealLo, borderColor: C.borderHi }}>
              <div style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: "0.3em", color: C.teal, marginBottom: 8 }}>HOW VANTIX LEARNS</div>
              <div style={{ fontSize: 12, color: "rgba(232,237,245,0.65)", lineHeight: 1.7 }}>
                1. Add client + niche profile<br />
                2. Track competitors → AI maps their strategy<br />
                3. Log every post + its real numbers<br />
                4. VANTIX reads the patterns and tells you what works<br />
                5. Growth Strategy AI builds your exact content plan<br />
                6. Content Creator uses winning patterns to create new posts
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CLIENT PROFILES ─────────────────────────────────────────────────
function Clients({ clients, saveClients, setSelectedClient, setView }) {
  const empty = { name: "", niche: "", industry: "", target: "", offer: "", usp: "", competitors: "", platforms: [], website: "", contact: "", notes: "" };
  const [form, setForm] = useState(empty);
  const [adding, setAdding] = useState(false);

  const add = () => {
    if (!form.name) return;
    const c = { ...form, id: Date.now().toString(), created: new Date().toISOString() };
    saveClients([...clients, c]);
    setSelectedClient(c);
    setForm(empty);
    setAdding(false);
  };

  const del = (id) => { if (window.confirm("Delete client?")) saveClients(clients.filter(c => c.id !== id)); };

  const togglePlatform = (p) => {
    setForm(f => ({ ...f, platforms: f.platforms.includes(p) ? f.platforms.filter(x => x !== p) : [...f.platforms, p] }));
  };

  const F = ({ label, id, multi, rows, placeholder }) => (
    <div style={{ marginBottom: 14 }}>
      <Label>{label}</Label>
      <Input value={form[id] || ""} onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
        placeholder={placeholder} multiline={multi} rows={rows} />
    </div>
  );

  return (
    <div>
      <Topbar title="CLIENT PROFILES" sub={`${clients.length} clients`} actions={[
        <Btn key="a" onClick={() => setAdding(!adding)}>{adding ? "Cancel" : "+ New Client"}</Btn>
      ]} />
      <div style={{ padding: 28, maxWidth: 1100 }}>

        {adding && (
          <Card highlight style={{ marginBottom: 20 }}>
            <CardTitle>NEW CLIENT PROFILE</CardTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <F label="Brand / Client Name *" id="name" placeholder="e.g. Sharma Real Estate" />
              <F label="Niche (specific)" id="niche" placeholder="e.g. Luxury Real Estate Chandigarh" />
              <F label="Industry" id="industry" placeholder="Real Estate / Fashion / Food..." />
              <F label="Website or Handle" id="website" placeholder="@handle or website.com" />
            </div>
            <F label="Target Audience (be detailed)" id="target" multi rows={2} placeholder="Who exactly is their customer? Age, income, location, biggest pain..." />
            <F label="Core Offer" id="offer" multi rows={2} placeholder="What do they sell and what outcome does it deliver?" />
            <F label="Unique Advantage (USP)" id="usp" multi rows={2} placeholder="What can ONLY they say? What do competitors miss?" />
            <F label="Top Competitors (handles or names)" id="competitors" placeholder="@comp1, @comp2, @comp3" />

            <div style={{ marginBottom: 14 }}>
              <Label>Active Platforms</Label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {PLATFORMS.map(p => (
                  <div key={p.id} onClick={() => togglePlatform(p.id)} style={{
                    padding: "6px 12px", borderRadius: 3, cursor: "pointer", fontSize: 12, fontFamily: font.mono,
                    letterSpacing: "0.1em", border: `1px solid ${form.platforms.includes(p.id) ? C.teal : C.border}`,
                    background: form.platforms.includes(p.id) ? C.tealLo : C.bg3,
                    color: form.platforms.includes(p.id) ? C.teal : C.dim,
                  }}>{p.label}</div>
                ))}
              </div>
            </div>
            <F label="Contact Person + Phone" id="contact" placeholder="Name, +91..." />
            <F label="Notes (budget, retainer, special requirements)" id="notes" multi rows={2} placeholder="Any additional context..." />
            <Btn onClick={add}>Save Client</Btn>
          </Card>
        )}

        {clients.length === 0 && !adding ? (
          <Card style={{ textAlign: "center", padding: 52 }}>
            <div style={{ fontSize: 32, color: C.border, marginBottom: 12 }}>◉</div>
            <div style={{ color: C.dim }}>No clients yet. Add your first client.</div>
          </Card>
        ) : (
          clients.map(c => (
            <Card key={c.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontFamily: font.display, fontWeight: 700, fontSize: 20 }}>{c.name}</span>
                    {c.industry && <Tag>{c.industry}</Tag>}
                    {c.niche && <Tag color={C.gold}>{c.niche}</Tag>}
                  </div>
                  {c.offer && <div style={{ fontSize: 13, color: C.dim, marginBottom: 6 }}>{c.offer}</div>}
                  <div style={{ display: "flex", gap: 6 }}>
                    {(c.platforms || []).map(pid => {
                      const p = PLATFORMS.find(x => x.id === pid);
                      return p ? <Tag key={pid} color={C.teal}>{p.label}</Tag> : null;
                    })}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <Btn small variant="ghost" onClick={() => { setSelectedClient(c); setView("competitor"); }}>Competitors</Btn>
                  <Btn small variant="ghost" onClick={() => { setSelectedClient(c); setView("performance"); }}>Content Lab</Btn>
                  <Btn small onClick={() => { setSelectedClient(c); setView("growth"); }}>Strategy AI</Btn>
                  <Btn small variant="red" onClick={() => del(c.id)}>✕</Btn>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

// ─── COMPETITOR TRACKER ───────────────────────────────────────────────
function CompetitorTracker({ clients, selectedClient }) {
  const key = selectedClient ? `comp_${selectedClient.id}` : null;
  const [comps, setComps] = useState(key ? LS.get(key, []) : []);
  const [handle, setHandle] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const saveComps = (updated) => { setComps(updated); if (key) LS.set(key, updated); };

  // Also save to global list for dashboard count
  const allComps = LS.get("competitors", []);

  const analyze = async (comp) => {
    if (!comp || !selectedClient) return;
    setSelected(comp.handle);
    setLoading(true);
    setAnalysis("");
    try {
      const text = await callVantix({
        systemPrompt: `You are VANTIX Competitor Intelligence. Analyze social media competitors with precision. Client niche: ${selectedClient.niche || selectedClient.industry || "general business"}. Target audience: ${selectedClient.target || "general"}.`,
        userMessage: `Analyze this competitor: ${comp.handle} on ${comp.platform}

Client we are working for: ${selectedClient.name} (${selectedClient.niche || selectedClient.industry})
Client's USP: ${selectedClient.usp || "Not specified"}

Search for and analyze:
1. FOLLOWER COUNT & GROWTH TRAJECTORY — what's their current size and is it growing fast or stagnant?
2. CONTENT PILLARS — what are the 4-5 main topics they post about?
3. TOP PERFORMING CONTENT TYPES — Reels vs Posts vs Stories vs Carousels
4. POSTING FREQUENCY — how often per week/day
5. ENGAGEMENT RATE — are they getting real engagement or ghost followers?
6. HOOK STRATEGY — what kind of hooks do they use in captions and videos?
7. CTA PATTERNS — what do they ask their audience to do?
8. CONTENT GAPS — what topics are they NOT covering that their audience wants?
9. WEAKNESSES — where are they losing engagement? What's their biggest mistake?
10. OPPORTUNITIES TO BEAT THEM — specific tactics my client can use to capture their audience

Be specific. Give exact examples where possible. This intelligence is used to build a growth strategy.`,
        useSearch: true,
        maxTokens: 2000,
      });
      setAnalysis(text);
      // Save analysis
      const updated = comps.map(c => c.handle === comp.handle ? { ...c, analysis: text, analyzedAt: new Date().toISOString() } : c);
      saveComps(updated);
      // Update global competitors list
      const existing = LS.get("competitors", []);
      if (!existing.find(x => x.handle === comp.handle)) {
        LS.set("competitors", [...existing, { handle: comp.handle, platform: comp.platform, client: selectedClient.name }]);
      }
    } catch (e) {
      setAnalysis("Analysis error. Try again.");
    }
    setLoading(false);
  };

  const addComp = () => {
    if (!handle) return;
    const c = { handle, platform, id: Date.now().toString(), addedAt: new Date().toISOString() };
    const updated = [...comps, c];
    saveComps(updated);
    setHandle("");
  };

  if (!selectedClient) return (
    <div>
      <Topbar title="COMPETITOR TRACKER" />
      <div style={{ padding: 28 }}>
        <Card style={{ textAlign: "center", padding: 40 }}>
          <div style={{ color: C.dim }}>Select a client from the sidebar to track their competitors.</div>
        </Card>
      </div>
    </div>
  );

  return (
    <div>
      <Topbar title="COMPETITOR INTELLIGENCE" sub={`Client: ${selectedClient.name} · ${comps.length} competitors tracked`} />
      <div style={{ padding: 28, maxWidth: 1100 }}>
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20 }}>
          {/* Left: add + list */}
          <div>
            <Card style={{ marginBottom: 14 }}>
              <CardTitle>TRACK COMPETITOR</CardTitle>
              <div style={{ marginBottom: 10 }}>
                <Label>Handle / Name</Label>
                <Input value={handle} onChange={e => setHandle(e.target.value)} placeholder="@handle or brand name" />
              </div>
              <div style={{ marginBottom: 14 }}>
                <Label>Platform</Label>
                <Select value={platform} onChange={e => setPlatform(e.target.value)}>
                  {PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                </Select>
              </div>
              <Btn onClick={addComp} full>Add Competitor</Btn>
            </Card>

            {/* Pre-filled from client profile */}
            {selectedClient.competitors && (
              <Card style={{ marginBottom: 14, borderColor: C.goldLo.replace("0.12", "0.3") }}>
                <CardTitle>FROM CLIENT PROFILE</CardTitle>
                <div style={{ fontSize: 12, color: C.dim }}>
                  {selectedClient.competitors.split(",").map(c => c.trim()).map((c, i) => (
                    <div key={i} style={{ padding: "4px 0", borderBottom: `1px solid ${C.border}`, cursor: "pointer", color: C.teal }}
                      onClick={() => setHandle(c)}>
                      {c}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: C.dim, marginTop: 8 }}>Click to prefill → then Add</div>
              </Card>
            )}

            {/* Competitors list */}
            <Card>
              <CardTitle>TRACKED ({comps.length})</CardTitle>
              {comps.length === 0 ? (
                <div style={{ color: C.dim, fontSize: 12 }}>Add competitors above.</div>
              ) : comps.map(c => (
                <div key={c.id} style={{
                  padding: "10px 12px", background: selected === c.handle ? C.tealLo : C.bg3,
                  borderRadius: 3, marginBottom: 6, cursor: "pointer",
                  border: `1px solid ${selected === c.handle ? C.teal : C.border}`,
                  transition: "all 0.15s",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, color: C.white }}>{c.handle}</div>
                      <div style={{ fontSize: 10, color: C.dim }}>{c.platform}</div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {c.analysis && <Tag color={C.gold}>Analyzed</Tag>}
                      <Btn small onClick={() => analyze(c)}>
                        {loading && selected === c.handle ? "..." : "Analyze"}
                      </Btn>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Right: analysis output */}
          <div>
            <Card>
              <CardTitle>COMPETITOR INTELLIGENCE REPORT</CardTitle>
              {loading ? (
                <div style={{ padding: "32px 0" }}><Spinner label="VANTIX SCANNING COMPETITOR..." /></div>
              ) : (
                analysis ? (
                  <div style={{ fontFamily: font.body, fontSize: 13, color: "rgba(232,237,245,0.85)", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>
                    {analysis}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "52px 0" }}>
                    <div style={{ fontFamily: font.mono, fontSize: 11, color: C.dim, letterSpacing: "0.15em" }}>
                      Select a competitor and click Analyze<br /><br />
                      VANTIX will search the internet and build a complete<br />
                      intelligence report on their strategy, weaknesses, and<br />
                      opportunities for your client to beat them.
                    </div>
                  </div>
                )
              )}
            </Card>

            {/* Show saved analyses */}
            {comps.filter(c => c.analysis && c.handle !== selected).length > 0 && (
              <Card style={{ marginTop: 14 }}>
                <CardTitle>SAVED ANALYSES — CLICK TO VIEW</CardTitle>
                {comps.filter(c => c.analysis).map(c => (
                  <div key={c.id} onClick={() => { setSelected(c.handle); setAnalysis(c.analysis); }}
                    style={{ padding: "8px 12px", background: C.bg3, borderRadius: 3, marginBottom: 6, cursor: "pointer", border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 12 }}>{c.handle} · {c.platform}</div>
                    <div style={{ fontSize: 10, color: C.dim }}>Analyzed {new Date(c.analyzedAt).toLocaleDateString()}</div>
                  </div>
                ))}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONTENT LAB (Performance + Learning) ─────────────────────────────
function ContentLab({ clients, selectedClient }) {
  const key = selectedClient ? `posts_${selectedClient.id}` : null;
  const [posts, setPosts] = useState(key ? LS.get(key, []) : []);
  const [form, setForm] = useState({
    platform: "instagram", type: "", topic: "", date: new Date().toISOString().split("T")[0],
    likes: "", comments: "", shares: "", saves: "", reach: "", impressions: "", followers: "",
    leads: "", caption: "", notes: ""
  });
  const [adding, setAdding] = useState(false);
  const [analysis, setAnalysis] = useState(LS.get(key ? `lab_analysis_${selectedClient?.id}` : "x", ""));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (key) {
      setPosts(LS.get(key, []));
      setAnalysis(LS.get(`lab_analysis_${selectedClient.id}`, ""));
    }
  }, [selectedClient]);

  const savePosts = (updated) => {
    setPosts(updated);
    if (key) {
      LS.set(key, updated);
      LS.set("posts", [...(LS.get("posts", [])).filter(p => p.clientId !== selectedClient.id), ...updated.map(p => ({ ...p, clientId: selectedClient.id }))]);
    }
  };

  const addPost = () => {
    const p = { ...form, id: Date.now().toString(), addedAt: new Date().toISOString() };
    savePosts([...posts, p]);
    setForm(f => ({ ...f, likes: "", comments: "", shares: "", saves: "", reach: "", impressions: "", followers: "", leads: "", topic: "", caption: "", notes: "" }));
    setAdding(false);
  };

  const analyzeAll = async () => {
    if (!posts.length || !selectedClient) return;
    setLoading(true);
    try {
      const postsData = posts.map(p =>
        `[${p.date}] ${p.platform} | ${p.type} | Topic: "${p.topic}" | Likes:${p.likes || 0} Comments:${p.comments || 0} Shares:${p.shares || 0} Saves:${p.saves || 0} Reach:${p.reach || 0} Impressions:${p.impressions || 0} Leads:${p.leads || 0}${p.caption ? ` | Caption: "${p.caption.slice(0, 100)}"` : ""}`
      ).join("\n");

      const text = await callVantix({
        systemPrompt: `You are VANTIX Content Intelligence. You analyze real social media performance data and extract precise, actionable patterns. Client: ${selectedClient.name}. Niche: ${selectedClient.niche || selectedClient.industry}. Target: ${selectedClient.target || "general"}.`,
        userMessage: `Analyze ALL this post performance data and build a complete learning profile:

${postsData}

Deliver:
1. WHAT IS WORKING (specific content types, topics, formats getting highest engagement)
2. WHAT IS FAILING (content that underperforms — why)
3. BEST PLATFORM for this client based on data
4. BEST CONTENT TYPE by engagement rate
5. BEST POSTING TOPICS by likes + comments + saves combined
6. ENGAGEMENT RATE ANALYSIS — are followers actually engaged or ghost?
7. LEAD GENERATION PATTERNS — which content types drive actual leads?
8. REACH VS ENGAGEMENT GAP — what this tells us about content quality
9. ALGORITHM SIGNALS — what patterns suggest algorithmic boost?
10. TOP 3 SPECIFIC RECOMMENDATIONS for next 30 days based purely on this data

Be precise. Show actual numbers. This is what separates intelligence from guesswork.`,
        maxTokens: 2500,
      });
      setAnalysis(text);
      if (key) LS.set(`lab_analysis_${selectedClient.id}`, text);
    } catch (e) {
      setAnalysis("Analysis error. Try again.");
    }
    setLoading(false);
  };

  const delPost = (id) => savePosts(posts.filter(p => p.id !== id));

  const CONTENT_TYPES = {
    instagram: ["Reel", "Carousel", "Single Image", "Story", "Live"],
    facebook: ["Video", "Post", "Reel", "Story", "Ad"],
    youtube: ["Long Video", "Short", "Live"],
    linkedin: ["Article", "Post", "Video", "Poll"],
    twitter: ["Tweet", "Thread", "Space"],
    whatsapp: ["Broadcast", "Status"],
  };

  if (!selectedClient) return (
    <div><Topbar title="CONTENT LAB" /><div style={{ padding: 28 }}><Card style={{ textAlign: "center", padding: 40 }}><div style={{ color: C.dim }}>Select a client to access Content Lab.</div></Card></div></div>
  );

  const avgEngagement = posts.length ? (
    posts.reduce((sum, p) => sum + (parseInt(p.likes) || 0) + (parseInt(p.comments) || 0) + (parseInt(p.saves) || 0), 0) / posts.length
  ).toFixed(0) : 0;

  return (
    <div>
      <Topbar
        title="CONTENT LAB"
        sub={`${selectedClient.name} · ${posts.length} posts analyzed`}
        actions={[
          <Btn key="an" variant="ghost" small onClick={analyzeAll} disabled={!posts.length || loading}>
            {loading ? "Analyzing..." : "Run AI Analysis"}
          </Btn>,
          <Btn key="add" onClick={() => setAdding(!adding)}>{adding ? "Cancel" : "+ Log Post"}</Btn>
        ]}
      />
      <div style={{ padding: 28, maxWidth: 1100 }}>

        {/* Mini stats */}
        {posts.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 20 }}>
            {[
              { num: posts.length, label: "Posts Logged" },
              { num: posts.reduce((s, p) => s + (parseInt(p.likes) || 0), 0).toLocaleString(), label: "Total Likes" },
              { num: posts.reduce((s, p) => s + (parseInt(p.comments) || 0), 0).toLocaleString(), label: "Total Comments" },
              { num: posts.reduce((s, p) => s + (parseInt(p.leads) || 0), 0).toLocaleString(), label: "Total Leads" },
              { num: avgEngagement, label: "Avg Engagement" },
            ].map((s, i) => (
              <div key={i} style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 4, padding: "14px 16px" }}>
                <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 26, color: C.teal }}>{s.num}</div>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.dim, letterSpacing: "0.2em", marginTop: 5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Add post */}
        {adding && (
          <Card highlight style={{ marginBottom: 20 }}>
            <CardTitle>LOG POST PERFORMANCE</CardTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0 20px" }}>
              {[
                { label: "Platform", id: "platform", type: "select" },
                { label: "Content Type", id: "type", type: "select2" },
                { label: "Date Posted", id: "date", type: "date" },
              ].map(f => (
                <div key={f.id} style={{ marginBottom: 14 }}>
                  <Label>{f.label}</Label>
                  {f.type === "select" && (
                    <Select value={form.platform} onChange={e => setForm(f2 => ({ ...f2, platform: e.target.value, type: "" }))}>
                      {PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                    </Select>
                  )}
                  {f.type === "select2" && (
                    <Select value={form.type} onChange={e => setForm(f2 => ({ ...f2, type: e.target.value }))}>
                      <option value="">— Type —</option>
                      {(CONTENT_TYPES[form.platform] || []).map(t => <option key={t} value={t}>{t}</option>)}
                    </Select>
                  )}
                  {f.type === "date" && (
                    <input type="date" value={form.date} onChange={e => setForm(f2 => ({ ...f2, date: e.target.value }))}
                      style={{ background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 3, padding: "10px 13px", color: C.white, fontSize: 13, width: "100%", fontFamily: font.body, outline: "none", boxSizing: "border-box" }} />
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 14 }}>
              <Label>Post Topic / Description</Label>
              <Input value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))} placeholder="What was this post about?" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0 16px" }}>
              {[
                { label: "Likes", id: "likes" }, { label: "Comments", id: "comments" },
                { label: "Shares", id: "shares" }, { label: "Saves", id: "saves" },
                { label: "Reach", id: "reach" }, { label: "Impressions", id: "impressions" },
                { label: "New Followers", id: "followers" }, { label: "Leads Generated", id: "leads" },
              ].map(m => (
                <div key={m.id} style={{ marginBottom: 14 }}>
                  <Label>{m.label}</Label>
                  <input type="number" value={form[m.id]} onChange={e => setForm(f => ({ ...f, [m.id]: e.target.value }))}
                    placeholder="0"
                    style={{ background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 3, padding: "10px 13px", color: C.white, fontSize: 13, width: "100%", fontFamily: font.body, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 14 }}>
              <Label>Caption / Hook Used (optional)</Label>
              <Input value={form.caption} onChange={e => setForm(f => ({ ...f, caption: e.target.value }))} multiline rows={2} placeholder="Paste the first line or the full caption..." />
            </div>
            <div style={{ marginBottom: 14 }}>
              <Label>Notes</Label>
              <Input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Ran ads? Boosted? Any context that explains the numbers..." />
            </div>
            <Btn onClick={addPost}>Save Post Data</Btn>
          </Card>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20 }}>
          {/* Posts table */}
          <div>
            <Card>
              <CardTitle>LOGGED POSTS ({posts.length})</CardTitle>
              {posts.length === 0 ? (
                <div style={{ color: C.dim, fontSize: 13, textAlign: "center", padding: "32px 0" }}>
                  No posts logged yet.<br />Log every post you publish with its real numbers.<br />The more data, the smarter the analysis.
                </div>
              ) : posts.slice().reverse().map(p => (
                <div key={p.id} style={{ padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontFamily: font.mono, color: C.dim }}>{p.date}</span>
                        <Tag>{p.platform}</Tag>
                        {p.type && <Tag color={C.gold}>{p.type}</Tag>}
                      </div>
                      <div style={{ fontSize: 13, marginBottom: 4 }}>{p.topic}</div>
                      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                        {[
                          ["❤", p.likes], ["💬", p.comments], ["🔁", p.shares],
                          ["🔖", p.saves], ["👁", p.reach], ["🎯", p.leads],
                        ].filter(([, v]) => v && parseInt(v) > 0).map(([icon, val], i) => (
                          <span key={i} style={{ fontSize: 11, color: C.dim }}>{icon} {parseInt(val).toLocaleString()}</span>
                        ))}
                      </div>
                    </div>
                    <Btn small variant="red" onClick={() => delPost(p.id)}>✕</Btn>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* AI Analysis */}
          <div>
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <CardTitle>AI PATTERN ANALYSIS</CardTitle>
                {posts.length > 0 && <Btn small onClick={analyzeAll} disabled={loading}>{loading ? "..." : "Run"}</Btn>}
              </div>
              {loading ? (
                <div style={{ padding: "32px 0" }}>
                  <Spinner label="VANTIX LEARNING FROM YOUR DATA..." />
                  <div style={{ fontSize: 11, color: C.dim, marginTop: 12, fontFamily: font.mono }}>
                    Analyzing {posts.length} posts for patterns...
                  </div>
                </div>
              ) : analysis ? (
                <div style={{ fontFamily: font.body, fontSize: 12, color: "rgba(232,237,245,0.8)", lineHeight: 1.85, whiteSpace: "pre-wrap", maxHeight: 520, overflowY: "auto" }}>
                  {analysis}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontFamily: font.mono, fontSize: 11, color: C.dim, lineHeight: 1.8 }}>
                    Log your posts → Click "Run AI Analysis"<br /><br />
                    VANTIX will read all your performance data,<br />
                    find what's actually working, and tell you<br />
                    exactly what content to double down on.
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GROWTH STRATEGY AI ───────────────────────────────────────────────
function GrowthStrategy({ clients, selectedClient }) {
  const [strategy, setStrategy] = useState(selectedClient ? LS.get(`strategy_${selectedClient.id}`, "") : "");
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState({ followers: "", leads: "", engagement: "", timeline: "30 days", budget: "organic only" });

  useEffect(() => {
    if (selectedClient) setStrategy(LS.get(`strategy_${selectedClient.id}`, ""));
  }, [selectedClient]);

  const generate = async () => {
    if (!selectedClient) return;
    setLoading(true);

    // Pull all their data
    const posts = LS.get(`posts_${selectedClient.id}`, []);
    const comps = LS.get(`comp_${selectedClient.id}`, []);
    const labAnalysis = LS.get(`lab_analysis_${selectedClient.id}`, "");

    const postSummary = posts.length
      ? `${posts.length} posts logged. Top performing: ${posts.sort((a, b) => (parseInt(b.likes) + parseInt(b.comments) || 0) - (parseInt(a.likes) + parseInt(a.comments) || 0)).slice(0, 3).map(p => `"${p.topic}" (${p.likes} likes, ${p.comments} comments)`).join("; ")}`
      : "No post data yet.";

    const compSummary = comps.length
      ? comps.map(c => c.handle).join(", ")
      : "No competitors tracked yet.";

    try {
      const text = await callVantix({
        systemPrompt: `You are VANTIX Growth Strategy Engine. You build precise, platform-native growth strategies based on real data. You never give generic advice. Every recommendation is specific to this client's niche, audience, and actual performance data.`,
        userMessage: `Build a complete growth strategy for:

CLIENT: ${selectedClient.name}
NICHE: ${selectedClient.niche || "General business"}
INDUSTRY: ${selectedClient.industry}
TARGET AUDIENCE: ${selectedClient.target || "Not specified"}
OFFER: ${selectedClient.offer || "Not specified"}
USP: ${selectedClient.usp || "Not specified"}
PLATFORMS: ${(selectedClient.platforms || []).join(", ") || "Not specified"}

GOALS:
- Follower growth target: ${goals.followers || "Not specified"}
- Lead generation target: ${goals.leads || "Not specified"}
- Engagement target: ${goals.engagement || "Not specified"}
- Timeline: ${goals.timeline}
- Budget: ${goals.budget}

CURRENT PERFORMANCE DATA:
${postSummary}

COMPETITORS TRACKED: ${compSummary}

AI CONTENT LAB ANALYSIS:
${labAnalysis || "Not run yet."}

Build a COMPLETE 30-day growth strategy including:

1. PLATFORM PRIORITY — which platform to focus on and why (based on their audience)
2. CONTENT CALENDAR FRAMEWORK — exact posting schedule (days + times + content types)
3. CONTENT PILLARS — 5 specific topic categories to own in their niche
4. HOOK STRATEGY — 5 specific hook formulas that work for this niche
5. GROWTH TACTICS (non-obvious, not generic):
   - Follower growth specific actions (not just "post consistently")
   - Engagement triggers specific to this niche
   - Lead conversion from social (specific CTA strategy)
6. COLLABORATION OPPORTUNITIES — types of accounts to partner with
7. 30-DAY CONTENT PLAN — week by week breakdown of what to post
8. KPIs TO TRACK WEEKLY — exact metrics and target numbers
9. WHAT TO STOP DOING — common mistakes for this niche
10. THE ONE THING — single highest-leverage action to do this week

Make this so specific that someone can execute it tomorrow morning without any additional guidance.`,
        useSearch: true,
        maxTokens: 3000,
      });
      setStrategy(text);
      LS.set(`strategy_${selectedClient.id}`, text);
    } catch (e) {
      setStrategy("Error generating strategy. Try again.");
    }
    setLoading(false);
  };

  if (!selectedClient) return (
    <div><Topbar title="GROWTH STRATEGY AI" /><div style={{ padding: 28 }}><Card style={{ textAlign: "center", padding: 40 }}><div style={{ color: C.dim }}>Select a client to generate their growth strategy.</div></Card></div></div>
  );

  return (
    <div>
      <Topbar title="GROWTH STRATEGY AI" sub={`Building strategy for: ${selectedClient.name}`} actions={[
        <Btn key="g" onClick={generate} disabled={loading}>{loading ? "Generating..." : "Generate Full Strategy"}</Btn>
      ]} />
      <div style={{ padding: 28, maxWidth: 1100 }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
          {/* Settings */}
          <div>
            <Card>
              <CardTitle>STRATEGY PARAMETERS</CardTitle>
              {[
                { label: "Follower Growth Goal", id: "followers", placeholder: "e.g. +5,000" },
                { label: "Lead Generation Goal", id: "leads", placeholder: "e.g. 50 leads/month" },
                { label: "Engagement Rate Goal", id: "engagement", placeholder: "e.g. 5%" },
              ].map(f => (
                <div key={f.id} style={{ marginBottom: 14 }}>
                  <Label>{f.label}</Label>
                  <Input value={goals[f.id]} onChange={e => setGoals(g => ({ ...g, [f.id]: e.target.value }))} placeholder={f.placeholder} />
                </div>
              ))}
              <div style={{ marginBottom: 14 }}>
                <Label>Timeline</Label>
                <Select value={goals.timeline} onChange={e => setGoals(g => ({ ...g, timeline: e.target.value }))}>
                  {["30 days", "60 days", "90 days", "6 months"].map(t => <option key={t} value={t}>{t}</option>)}
                </Select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <Label>Budget Type</Label>
                <Select value={goals.budget} onChange={e => setGoals(g => ({ ...g, budget: e.target.value }))}>
                  {["Organic only", "Small budget (₹5-15k/month)", "Medium budget (₹15-50k/month)", "Paid + Organic"].map(t => <option key={t} value={t}>{t}</option>)}
                </Select>
              </div>
              <Btn full onClick={generate} disabled={loading}>
                {loading ? "VANTIX Working..." : "Generate Strategy"}
              </Btn>
            </Card>

            <Card style={{ marginTop: 14, borderColor: C.tealMd }}>
              <div style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: "0.3em", color: C.teal, marginBottom: 10 }}>DATA USED</div>
              <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.7 }}>
                ✓ Client niche profile<br />
                {LS.get(`posts_${selectedClient.id}`, []).length > 0 ? `✓ ${LS.get(`posts_${selectedClient.id}`, []).length} post performance records` : "✗ No post data (add in Content Lab)"}<br />
                {LS.get(`comp_${selectedClient.id}`, []).length > 0 ? `✓ ${LS.get(`comp_${selectedClient.id}`, []).length} competitor analyses` : "✗ No competitors (add in Competitor Tracker)"}<br />
                {LS.get(`lab_analysis_${selectedClient.id}`, "") ? "✓ AI content analysis" : "✗ No AI analysis (run in Content Lab)"}<br />
                ✓ Live market research via web search
              </div>
              <div style={{ fontSize: 10, color: C.dim, marginTop: 8 }}>More data = sharper strategy</div>
            </Card>
          </div>

          {/* Strategy output */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <CardTitle>AI GROWTH STRATEGY</CardTitle>
              {strategy && (
                <Btn small variant="ghost" onClick={() => { navigator.clipboard.writeText(strategy); }}>Copy</Btn>
              )}
            </div>
            {loading ? (
              <div style={{ padding: "52px 0", textAlign: "center" }}>
                <Spinner label="VANTIX BUILDING GROWTH STRATEGY..." />
                <div style={{ fontFamily: font.mono, fontSize: 10, color: C.dim, marginTop: 16, lineHeight: 1.8 }}>
                  Analyzing niche data...<br />
                  Scanning market trends...<br />
                  Processing competitor intelligence...<br />
                  Building content framework...
                </div>
              </div>
            ) : strategy ? (
              <div style={{ fontFamily: font.body, fontSize: 13, color: "rgba(232,237,245,0.85)", lineHeight: 1.9, whiteSpace: "pre-wrap", maxHeight: 620, overflowY: "auto" }}>
                {strategy}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontFamily: font.mono, fontSize: 12, color: C.dim, lineHeight: 1.9 }}>
                  Set your goals and click<br />"Generate Full Strategy"<br /><br />
                  VANTIX combines:<br />
                  · Your client's niche + audience<br />
                  · Real post performance patterns<br />
                  · Competitor intelligence<br />
                  · Live market research<br /><br />
                  Into one precise, executable growth plan.
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── CONTENT CREATOR AI ───────────────────────────────────────────────
function ContentCreator({ clients, selectedClient }) {
  const [platform, setPlatform] = useState("instagram");
  const [contentType, setContentType] = useState("");
  const [topic, setTopic] = useState("");
  const [goal, setGoal] = useState("Increase followers");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(LS.get("content_history", []));

  const CONTENT_TYPES = {
    instagram: ["Reel Script", "Carousel (all slides)", "Caption", "Story Sequence", "Bio Rewrite"],
    facebook: ["Video Script", "Post", "Ad Copy", "Group Post"],
    youtube: ["Full Video Script", "YouTube Short Script", "Video Description", "Thumbnail Concept"],
    linkedin: ["Thought Leadership Post", "Article Intro", "Cold Connection Message", "Company Update"],
    twitter: ["Thread (10 tweets)", "Single Tweet", "Reply Strategy"],
    whatsapp: ["Broadcast Message", "Sales Script", "Follow-up Sequence"],
  };

  const GOALS = ["Increase followers", "Generate leads", "Drive website traffic", "Build authority", "Promote offer", "Viral reach", "Educate audience", "Convert warm leads"];

  const generate = async () => {
    if (!topic || !selectedClient) return;
    setLoading(true);
    setOutput("");

    const posts = LS.get(`posts_${selectedClient.id}`, []);
    const topPosts = posts.sort((a, b) => (parseInt(b.likes) + parseInt(b.comments) || 0) - (parseInt(a.likes) + parseInt(a.comments) || 0)).slice(0, 3);
    const winningPatterns = topPosts.length
      ? `Top performing content: ${topPosts.map(p => `"${p.topic}" (${p.likes} likes, ${p.saves} saves)`).join("; ")}`
      : "No performance data yet.";

    const strategy = LS.get(`strategy_${selectedClient.id}`, "");

    try {
      const text = await callVantix({
        systemPrompt: `You are VANTIX Content Creator. You create platform-native, high-performing social media content. You write like a top creator who deeply understands the brand, audience, and platform algorithm. Never use AI clichés. Write human, write bold.`,
        userMessage: `Create ${contentType || "content"} for ${platform} for this client:

CLIENT: ${selectedClient.name}
NICHE: ${selectedClient.niche || selectedClient.industry}
TARGET AUDIENCE: ${selectedClient.target || "General business audience"}
OFFER: ${selectedClient.offer || "Services"}
USP: ${selectedClient.usp || "Quality and results"}
CTA: ${selectedClient.cta || "Contact us"}

WHAT HAS WORKED FOR THEM:
${winningPatterns}

TOPIC/ANGLE: ${topic}
GOAL: ${goal}
CONTENT TYPE: ${contentType || "Post"}
PLATFORM: ${platform}

Platform requirements:
${platform === "instagram" && contentType === "Reel Script" ? "- Hook in first 3 seconds\n- Scenes with timing\n- Strong audio cue\n- End CTA with visual" : ""}
${platform === "instagram" && contentType?.includes("Carousel") ? "- Slide 1: Hook\n- Slides 2-8: Value delivery\n- Last slide: CTA\n- Each slide: max 15 words" : ""}
${platform === "youtube" && contentType?.includes("Full") ? "- Open loop hook (first 30 sec)\n- Chapter structure\n- Retention pattern every 2-3 min\n- Strong CTA at 80% mark" : ""}
${platform === "linkedin" ? "- No hashtag spam\n- Strong first line\n- Whitespace for readability\n- Personal insight or data point\n- Max 3 hashtags" : ""}
${platform === "whatsapp" ? "- Conversational, not formal\n- Short paragraphs\n- Bold key phrases using *asterisks*\n- Clear action at the end" : ""}

CREATE:
1. COMPLETE CONTENT (ready to post — no placeholders)
2. 3 HOOK VARIATIONS (test these)
3. CTA OPTIONS (2 — soft and direct)
4. BEST TIME TO POST this specific content
5. ONE A/B VARIATION with slightly different angle

Make it sound human. Make it perform. Use patterns from what already worked for them.`,
        maxTokens: 2500,
      });
      setOutput(text);
      const entry = { id: Date.now(), client: selectedClient.name, platform, contentType, topic, date: new Date().toISOString(), preview: text.slice(0, 120) };
      const updated = [entry, ...history].slice(0, 15);
      setHistory(updated);
      LS.set("content_history", updated);
    } catch (e) {
      setOutput("Error generating content. Try again.");
    }
    setLoading(false);
  };

  if (!selectedClient) return (
    <div><Topbar title="CONTENT CREATOR AI" /><div style={{ padding: 28 }}><Card style={{ textAlign: "center", padding: 40 }}><div style={{ color: C.dim }}>Select a client to create content.</div></Card></div></div>
  );

  return (
    <div>
      <Topbar title="CONTENT CREATOR AI" sub={`Creating for: ${selectedClient.name}`} />
      <div style={{ padding: 28, maxWidth: 1100 }}>
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20 }}>
          {/* Controls */}
          <div>
            <Card>
              <CardTitle>CONTENT SETTINGS</CardTitle>
              <div style={{ marginBottom: 14 }}>
                <Label>Platform</Label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {PLATFORMS.map(p => (
                    <div key={p.id} onClick={() => { setPlatform(p.id); setContentType(""); }} style={{
                      padding: "6px 11px", borderRadius: 3, cursor: "pointer", fontFamily: font.mono,
                      fontSize: 10, letterSpacing: "0.1em", border: `1px solid ${platform === p.id ? C.teal : C.border}`,
                      background: platform === p.id ? C.tealLo : C.bg3,
                      color: platform === p.id ? C.teal : C.dim,
                    }}>{p.label}</div>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <Label>Content Type</Label>
                <Select value={contentType} onChange={e => setContentType(e.target.value)}>
                  <option value="">— Select Type —</option>
                  {(CONTENT_TYPES[platform] || []).map(t => <option key={t} value={t}>{t}</option>)}
                </Select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <Label>Topic / Angle *</Label>
                <Input value={topic} onChange={e => setTopic(e.target.value)} multiline rows={3}
                  placeholder="e.g. 'Why 90% of real estate buyers make this mistake' or 'Before/after client transformation in 30 days'" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <Label>Content Goal</Label>
                <Select value={goal} onChange={e => setGoal(e.target.value)}>
                  {GOALS.map(g => <option key={g} value={g}>{g}</option>)}
                </Select>
              </div>
              <Btn full onClick={generate} disabled={!topic || loading}>
                {loading ? "VANTIX Creating..." : "Create Content"}
              </Btn>
            </Card>

            {/* History */}
            {history.length > 0 && (
              <Card style={{ marginTop: 14 }}>
                <CardTitle>RECENT ({history.length})</CardTitle>
                {history.slice(0, 5).map(h => (
                  <div key={h.id} style={{ padding: "8px 0", borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}>
                    <div style={{ fontSize: 11, color: C.teal }}>{h.client} · {h.platform}</div>
                    <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{h.contentType} · {h.topic?.slice(0, 40)}</div>
                  </div>
                ))}
              </Card>
            )}
          </div>

          {/* Output */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <CardTitle>AI GENERATED CONTENT</CardTitle>
              {output && (
                <Btn small variant="ghost" onClick={() => navigator.clipboard.writeText(output)}>Copy All</Btn>
              )}
            </div>
            {loading ? (
              <div style={{ padding: "60px 0", textAlign: "center" }}>
                <Spinner label="VANTIX CREATING CONTENT..." />
                <div style={{ fontFamily: font.mono, fontSize: 10, color: C.dim, marginTop: 16, lineHeight: 1.8 }}>
                  Analyzing what worked for {selectedClient.name}...<br />
                  Applying winning patterns...<br />
                  Writing platform-native content...
                </div>
              </div>
            ) : output ? (
              <div style={{ fontFamily: font.body, fontSize: 13, color: "rgba(232,237,245,0.88)", lineHeight: 1.9, whiteSpace: "pre-wrap", maxHeight: 620, overflowY: "auto" }}>
                {output}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontFamily: font.mono, fontSize: 11, color: C.dim, lineHeight: 1.9 }}>
                  Select platform + content type<br />
                  Enter your topic<br />
                  Click Create Content<br /><br />
                  VANTIX uses your client's<br />
                  actual performance data to create<br />
                  content that matches what already works.
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── NICHE INTELLIGENCE ───────────────────────────────────────────────
function NicheIntelligence({ clients, selectedClient }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("trending");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const TYPES = [
    { id: "trending", label: "Trending Topics" },
    { id: "audience", label: "Audience Insights" },
    { id: "hashtags", label: "Hashtag Strategy" },
    { id: "hooks", label: "Hook Research" },
    { id: "viral", label: "Viral Content Patterns" },
    { id: "gaps", label: "Content Gaps" },
  ];

  const research = async () => {
    const niche = selectedClient?.niche || query;
    if (!niche) return;
    setLoading(true);
    setOutput("");

    const prompts = {
      trending: `Research current trending topics, viral content angles, and emerging conversations in the ${niche} niche on social media (Instagram, YouTube, LinkedIn). What are people talking about RIGHT NOW? What content is going viral? What questions are the audience asking? Give specific examples and angles a creator can use this week.`,
      audience: `Research the audience psychology for the ${niche} niche. Who exactly follows these accounts? What are their top 5 frustrations? What do they secretly want? What kind of content do they save, share, comment on? What triggers them to follow a new account? What makes them unfollow? Give specific insights, not generic observations.`,
      hashtags: `Build a complete hashtag strategy for ${niche} on Instagram and LinkedIn. Provide: 5 mega hashtags (1M+ posts), 10 mid hashtags (100k-1M), 10 niche hashtags (under 100k), 5 community hashtags, and 3 branded hashtag ideas. Also tell us what hashtags the top creators in this niche are using and why.`,
      hooks: `Research the most effective hooks being used by top creators in the ${niche} niche. Provide: 10 specific hook formulas with examples, what makes each one work psychologically, which platforms each hook works best on, and 5 hooks nobody in this niche is using yet (opportunity gaps).`,
      viral: `Research what content goes viral in the ${niche} niche. Analyze: the structure of viral posts, emotional triggers used, content formats that get shared most, timing patterns, collaboration angles that amplify reach, and the specific elements that separate a 1,000 view post from a 1,000,000 view post in this niche.`,
      gaps: `Identify content gaps in the ${niche} niche. What questions is the audience asking that no creator is answering well? What topics are underserved? What content angles would be controversial but shareable? What expertise is missing from the current content landscape? This is about finding unfair advantages.`,
    };

    try {
      const text = await callVantix({
        systemPrompt: "You are VANTIX Niche Intelligence. You research social media niches with precision, finding real trends, real patterns, and real opportunities. Be specific. Give examples. No generic advice.",
        userMessage: prompts[type],
        useSearch: true,
        maxTokens: 2000,
      });
      setOutput(text);
    } catch (e) {
      setOutput("Research error. Try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <Topbar title="NICHE INTELLIGENCE" sub={selectedClient ? `Research mode: ${selectedClient.niche || selectedClient.name}` : "Market Research Engine"} />
      <div style={{ padding: 28, maxWidth: 1100 }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
          {/* Controls */}
          <div>
            <Card>
              <CardTitle>RESEARCH PARAMETERS</CardTitle>
              {!selectedClient && (
                <div style={{ marginBottom: 14 }}>
                  <Label>Niche to Research</Label>
                  <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g. Real estate India, D2C skincare, B2B SaaS" />
                </div>
              )}
              {selectedClient && (
                <div style={{ marginBottom: 14, padding: "10px 12px", background: C.tealLo, borderRadius: 3, border: `1px solid ${C.borderHi}` }}>
                  <div style={{ fontFamily: font.mono, fontSize: 9, color: C.teal, letterSpacing: "0.2em" }}>RESEARCHING</div>
                  <div style={{ fontSize: 13, color: C.white, marginTop: 4 }}>{selectedClient.niche || selectedClient.name}</div>
                </div>
              )}

              <div style={{ marginBottom: 16 }}>
                <Label>Research Type</Label>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {TYPES.map(t => (
                    <div key={t.id} onClick={() => setType(t.id)} style={{
                      padding: "9px 13px", borderRadius: 3, cursor: "pointer", fontSize: 13,
                      border: `1px solid ${type === t.id ? C.teal : C.border}`,
                      background: type === t.id ? C.tealLo : C.bg3,
                      color: type === t.id ? C.teal : C.dim,
                      transition: "all 0.15s",
                    }}>{t.label}</div>
                  ))}
                </div>
              </div>
              <Btn full onClick={research} disabled={(!query && !selectedClient) || loading}>
                {loading ? "Researching..." : "Run Intelligence"}
              </Btn>
            </Card>
          </div>

          {/* Output */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <CardTitle>INTELLIGENCE REPORT — {TYPES.find(t => t.id === type)?.label?.toUpperCase()}</CardTitle>
              {output && <Btn small variant="ghost" onClick={() => navigator.clipboard.writeText(output)}>Copy</Btn>}
            </div>
            {loading ? (
              <div style={{ padding: "60px 0", textAlign: "center" }}>
                <Spinner label="VANTIX SCANNING MARKET..." />
                <div style={{ fontFamily: font.mono, fontSize: 10, color: C.dim, marginTop: 16, lineHeight: 1.8 }}>
                  Searching live data...<br />
                  Analyzing niche patterns...<br />
                  Building intelligence report...
                </div>
              </div>
            ) : output ? (
              <div style={{ fontFamily: font.body, fontSize: 13, color: "rgba(232,237,245,0.85)", lineHeight: 1.9, whiteSpace: "pre-wrap", maxHeight: 620, overflowY: "auto" }}>
                {output}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontFamily: font.mono, fontSize: 11, color: C.dim, lineHeight: 1.9 }}>
                  Select a research type<br />
                  Click "Run Intelligence"<br /><br />
                  VANTIX will search the live internet<br />
                  and build a precise intelligence report<br />
                  on any niche, trend, or opportunity.
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────
export default function VantixSystem() {
  const [view, setView] = useState("dashboard");
  const [clients, setClients] = useState(() => LS.get("clients", []));
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; }
      body { margin: 0; background: #040810; }
      @keyframes spin { to { transform: rotate(360deg); } }
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(0,212,180,0.2); border-radius: 2px; }
      input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
      select option { background: #0b1424; }
    `;
    document.head.appendChild(style);
  }, []);

  const saveClients = (updated) => { setClients(updated); LS.set("clients", updated); };

  const props = { clients, saveClients, selectedClient, setSelectedClient, setView };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, color: C.white, fontFamily: font.body, fontWeight: 300 }}>
      <Sidebar view={view} setView={setView} clients={clients} selectedClient={selectedClient} setSelectedClient={setSelectedClient} />
      <div style={{ marginLeft: 216, flex: 1, minHeight: "100vh" }}>
        {view === "dashboard"   && <Dashboard {...props} />}
        {view === "clients"     && <Clients {...props} />}
        {view === "competitor"  && <CompetitorTracker {...props} />}
        {view === "performance" && <ContentLab {...props} />}
        {view === "growth"      && <GrowthStrategy {...props} />}
        {view === "generator"   && <ContentCreator {...props} />}
        {view === "niche"       && <NicheIntelligence {...props} />}
      </div>
    </div>
  );
}
