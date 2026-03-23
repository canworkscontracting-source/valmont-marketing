import { useState, useEffect } from "react";

// ── THEME ──────────────────────────────────────────────────────────
const T = {
  bg0: "#050810",
  bg1: "#080d18",
  bg2: "#0d1525",
  bg3: "#111d30",
  border: "rgba(0,212,180,0.12)",
  borderHover: "rgba(0,212,180,0.3)",
  teal: "#00D4B4",
  tealDim: "rgba(0,212,180,0.15)",
  tealGlow: "rgba(0,212,180,0.08)",
  gold: "#C8A96E",
  white: "#E8EDF5",
  muted: "#6B7A99",
  danger: "#FF5555",
  success: "#00D4B4",
  warn: "#C8A96E",
};

const S = {
  app: {
    display: "flex",
    minHeight: "100vh",
    background: T.bg0,
    color: T.white,
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 300,
  },
  sidebar: {
    width: 220,
    minHeight: "100vh",
    background: T.bg1,
    borderRight: `1px solid ${T.border}`,
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 10,
  },
  sidebarLogo: {
    padding: "24px 20px 20px",
    borderBottom: `1px solid ${T.border}`,
  },
  logoTitle: {
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 700,
    fontSize: 22,
    letterSpacing: "0.15em",
    color: T.teal,
  },
  logoSub: {
    fontSize: 9,
    letterSpacing: "0.3em",
    color: T.muted,
    textTransform: "uppercase",
    marginTop: 2,
  },
  nav: {
    padding: "12px 0",
    flex: 1,
    overflowY: "auto",
  },
  navSection: {
    padding: "8px 16px 4px",
    fontSize: 9,
    letterSpacing: "0.3em",
    color: T.muted,
    textTransform: "uppercase",
    marginTop: 8,
  },
  navItem: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "9px 20px",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: active ? 500 : 400,
    color: active ? T.teal : T.muted,
    background: active ? T.tealGlow : "transparent",
    borderLeft: active ? `2px solid ${T.teal}` : "2px solid transparent",
    transition: "all 0.2s",
    letterSpacing: "0.02em",
  }),
  clientBadge: {
    padding: "0px 20px 16px",
    marginTop: "auto",
    borderTop: `1px solid ${T.border}`,
    paddingTop: 12,
  },
  main: {
    marginLeft: 220,
    flex: 1,
    minHeight: "100vh",
    background: T.bg0,
  },
  topbar: {
    background: T.bg1,
    borderBottom: `1px solid ${T.border}`,
    padding: "14px 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 5,
  },
  topbarTitle: {
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 700,
    fontSize: 18,
    letterSpacing: "0.08em",
    color: T.white,
  },
  content: {
    padding: "28px",
    maxWidth: 1100,
  },
  card: {
    background: T.bg2,
    border: `1px solid ${T.border}`,
    borderRadius: 4,
    padding: "20px 24px",
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: T.muted,
    marginBottom: 16,
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 14,
    marginBottom: 24,
  },
  statCard: {
    background: T.bg2,
    border: `1px solid ${T.border}`,
    borderRadius: 4,
    padding: "18px 20px",
  },
  statNum: {
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 700,
    fontSize: 36,
    color: T.teal,
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 11,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: T.muted,
    marginTop: 6,
  },
  input: {
    background: T.bg3,
    border: `1px solid ${T.border}`,
    borderRadius: 3,
    padding: "10px 14px",
    color: T.white,
    fontSize: 13,
    width: "100%",
    outline: "none",
    fontFamily: "'Outfit', sans-serif",
    transition: "border 0.2s",
  },
  select: {
    background: T.bg3,
    border: `1px solid ${T.border}`,
    borderRadius: 3,
    padding: "10px 14px",
    color: T.white,
    fontSize: 13,
    width: "100%",
    outline: "none",
    fontFamily: "'Outfit', sans-serif",
    cursor: "pointer",
  },
  textarea: {
    background: T.bg3,
    border: `1px solid ${T.border}`,
    borderRadius: 3,
    padding: "10px 14px",
    color: T.white,
    fontSize: 13,
    width: "100%",
    outline: "none",
    fontFamily: "'Outfit', sans-serif",
    resize: "vertical",
    minHeight: 80,
  },
  label: {
    fontSize: 11,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: T.muted,
    marginBottom: 6,
    display: "block",
  },
  btn: (variant = "primary") => ({
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    padding: "10px 22px",
    border: "none",
    borderRadius: 3,
    cursor: "pointer",
    background: variant === "primary" ? T.teal : variant === "danger" ? T.danger : T.bg3,
    color: variant === "primary" ? T.bg0 : T.white,
    border: variant === "ghost" ? `1px solid ${T.border}` : "none",
    transition: "all 0.2s",
  }),
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 14,
  },
  pill: (color = T.teal) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "3px 10px",
    borderRadius: 99,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    background: `${color}18`,
    color: color,
    border: `1px solid ${color}30`,
  }),
  formGroup: { marginBottom: 18 },
  divider: {
    height: 1,
    background: T.border,
    margin: "20px 0",
  },
  tag: {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    background: T.tealGlow,
    border: `1px solid ${T.border}`,
    color: T.teal,
    fontSize: 11,
    borderRadius: 3,
    marginRight: 6,
    marginBottom: 6,
    letterSpacing: "0.05em",
  },
  promptBox: {
    background: "#020508",
    border: `1px solid ${T.teal}30`,
    borderRadius: 4,
    padding: "16px 18px",
    fontFamily: "'Space Mono', monospace",
    fontSize: 12,
    color: "rgba(232,237,245,0.8)",
    lineHeight: 1.8,
    whiteSpace: "pre-wrap",
    position: "relative",
  },
};

// ── PLATFORMS ─────────────────────────────────────────────────────
const PLATFORMS = ["Instagram", "Facebook", "LinkedIn", "YouTube", "Twitter/X", "WhatsApp"];
const PLATFORMS_ICONS = {
  Instagram: "📸",
  Facebook: "🔵",
  LinkedIn: "💼",
  YouTube: "▶️",
  "Twitter/X": "✖️",
  WhatsApp: "💬",
};

const CONTENT_TYPES = {
  Instagram: ["Reel Script", "Carousel Post", "Story", "Caption", "Bio Rewrite"],
  Facebook: ["Post", "Ad Copy", "Group Post", "Video Script", "Event Description"],
  LinkedIn: ["Article", "Post", "Connection Message", "Cold DM", "Company Update"],
  YouTube: ["Video Script", "Short Script", "Description", "Thumbnail Idea", "Community Post"],
  "Twitter/X": ["Thread", "Single Tweet", "Reply Strategy", "Profile Bio"],
  WhatsApp: ["Broadcast Message", "Status Update", "Sales Script", "Follow-up Message"],
};

const GOALS = [
  "Increase followers",
  "Generate leads",
  "Drive website traffic",
  "Build brand authority",
  "Promote product/service",
  "Increase engagement",
  "Nurture existing audience",
  "Competitor takeover",
];

// ── STORAGE HELPERS ────────────────────────────────────────────────
const load = (key, def = []) => {
  try { return JSON.parse(localStorage.getItem("vantix_" + key)) ?? def; }
  catch { return def; }
};
const save = (key, val) => localStorage.setItem("vantix_" + key, JSON.stringify(val));

// ── BRAND VOICE QUESTIONS ──────────────────────────────────────────
const BV_QUESTIONS = [
  { id: "industry", label: "Industry / Niche", type: "input", placeholder: "e.g. Real Estate, D2C Fashion, SaaS" },
  { id: "target", label: "Ideal Customer (describe in detail)", type: "textarea", placeholder: "Age, income, problems, desires, location..." },
  { id: "offer", label: "Core Product or Service", type: "textarea", placeholder: "What exactly do they sell and what outcome does it deliver?" },
  { id: "tone", label: "Brand Tone", type: "select", options: ["Professional & Authoritative", "Friendly & Conversational", "Bold & Aggressive", "Luxury & Refined", "Educational & Insightful", "Humorous & Relatable"] },
  { id: "usp", label: "What Makes Them Different (USP)", type: "textarea", placeholder: "What can only they say? What do competitors miss?" },
  { id: "avoid", label: "What To NEVER Say or Do", type: "textarea", placeholder: "Forbidden phrases, topics, comparisons, competitor names..." },
  { id: "existing", label: "Best Performing Post (paste or describe)", type: "textarea", placeholder: "Paste a post that got great engagement or describe what worked..." },
  { id: "hooks", label: "3 Hook Styles That Work For This Brand", type: "textarea", placeholder: "e.g. Controversial opinion, 'Did you know...', Before/After..." },
  { id: "cta", label: "Primary CTA (what action should audience take?)", type: "input", placeholder: "e.g. Book a free call, DM us NOW, Click the link in bio" },
  { id: "platforms", label: "Active Platforms", type: "multi", options: PLATFORMS },
  { id: "posting", label: "Current Posting Frequency", type: "select", options: ["Not posting", "1-2x/week", "3-4x/week", "Daily", "Multiple times daily"] },
  { id: "goal90", label: "Goal for Next 90 Days", type: "select", options: GOALS },
  { id: "competitors", label: "Top 3 Competitors (names or handles)", type: "textarea", placeholder: "@competitor1, @competitor2, @competitor3" },
  { id: "extra", label: "Anything Else We Should Know", type: "textarea", placeholder: "Upcoming launches, sensitivities, languages, events..." },
];

// ── GENERATE BRAND VOICE PROMPT ────────────────────────────────────
const buildBrandVoicePrompt = (client, answers) => {
  return `You are a senior brand strategist and copywriter at VANTIX, an AI-powered marketing intelligence system.

TASK: Create a complete BRAND VOICE DOCUMENT for the following client.

═══ CLIENT INFORMATION ═══

Client Name: ${client.name}
Industry: ${answers.industry || "Not specified"}
Target Audience: ${answers.target || "Not specified"}
Core Offer: ${answers.offer || "Not specified"}
Brand Tone: ${answers.tone || "Professional & Authoritative"}
Unique Selling Point: ${answers.usp || "Not specified"}
Never Say or Do: ${answers.avoid || "Not specified"}
Best Performing Content: ${answers.existing || "Not specified"}
Hook Styles That Work: ${answers.hooks || "Not specified"}
Primary CTA: ${answers.cta || "Not specified"}
Active Platforms: ${answers.platforms ? answers.platforms.join(", ") : "Not specified"}
Posting Frequency: ${answers.posting || "Not specified"}
90-Day Goal: ${answers.goal90 || "Not specified"}
Key Competitors: ${answers.competitors || "Not specified"}
Additional Notes: ${answers.extra || "None"}

═══ OUTPUT REQUIRED ═══

Create a detailed Brand Voice Document including:

1. BRAND VOICE SUMMARY (2-3 sentences that capture the entire brand personality)

2. TONE GUIDE
   - When to be formal vs casual
   - Emotional triggers to use
   - Words and phrases that are ON-BRAND
   - Words and phrases that are OFF-BRAND

3. HOOK FORMULA (3 proven hooks for this brand, with examples)

4. CONTENT PILLARS (5 topic categories this brand should always post about)

5. CAPTION FORMULA (the structure of a perfect caption for this brand)

6. CTA MATRIX (different CTAs for different content types: awareness, consideration, conversion)

7. PLATFORM ADAPTATION RULES (how the voice changes per platform)

8. DO NOT CONFUSE THIS BRAND WITH (key differentiators vs competitors listed above)

Format this as a clean, actionable document that any content creator can follow.`;
};

// ── GENERATE CONTENT PROMPT ────────────────────────────────────────
const buildContentPrompt = (client, bv, platform, contentType, topic, goal, tone, length) => {
  const brandContext = bv && bv.industry
    ? `\nBRAND CONTEXT:\n- Industry: ${bv.industry}\n- Target Audience: ${bv.target || "General business audience"}\n- Tone: ${bv.tone || "Professional"}\n- Core Offer: ${bv.offer || "Services"}\n- USP: ${bv.usp || "Quality and results"}\n- Primary CTA: ${bv.cta || "Contact us"}\n- Avoid: ${bv.avoid || "Nothing specified"}`
    : "\nNo brand voice document yet. Use professional marketing tone.";

  const platformGuide = {
    Instagram: "Hook in first line. Use line breaks. 3-5 relevant hashtags at end. Emojis strategically.",
    Facebook: "Conversational opener. Longer form acceptable. One link. Ask a question to drive comments.",
    LinkedIn: "Professional insight hook. Personal story or data. No more than 3 hashtags. Thought leadership tone.",
    YouTube: "Hook in first 30 seconds. Problem-Agitate-Solve structure. Strong retention pattern. Clear chapter points.",
    "Twitter/X": "Punchy. Under 280 chars per tweet. Thread format for depth. Controversy or insight to drive RT.",
    WhatsApp: "Informal and direct. Short sentences. Clear action. Personal and urgent tone.",
  };

  return `You are VANTIX — an elite AI marketing strategist working for Valmont Marketing.

CLIENT: ${client.name}
${brandContext}

═══ CONTENT REQUEST ═══

Platform: ${platform} ${PLATFORMS_ICONS[platform] || ""}
Content Type: ${contentType}
Topic / Angle: ${topic}
Content Goal: ${goal}
Tone Override: ${tone}
Length: ${length}

Platform Rules for ${platform}: ${platformGuide[platform] || "Follow platform best practices."}

═══ CREATE THE FOLLOWING ═══

1. HOOK (First line that stops the scroll — 3 variations, pick the best)

2. MAIN CONTENT
   ${platform === "YouTube" ? "Full script with [HOOK], [INTRO], [MAIN CONTENT], [CTA], [OUTRO] sections" :
     platform === "Instagram" && contentType === "Carousel Post" ? "All carousel slides with title, body text, and CTA slide" :
     platform === "Instagram" && contentType === "Reel Script" ? "Full reel script with scenes, dialogue, and on-screen text" :
     "Complete post/caption with proper formatting for " + platform}

3. CALL TO ACTION (2 variations — one soft, one direct)

4. HASHTAGS (if applicable — only relevant ones, no spam)

5. POSTING RECOMMENDATION (best day/time for this content type and goal)

6. QUICK VARIATION (slightly different angle for A/B testing)

Make it sound human. No AI clichés like "In today's fast-paced world" or "game-changing". Write like a top-tier content creator who deeply understands this brand.`;
};

// ── ICONS ──────────────────────────────────────────────────────────
const Icon = ({ name, size = 14 }) => {
  const icons = {
    dashboard: "◈", clients: "◉", voice: "◎", calendar: "▦", generator: "⟳",
    performance: "△", settings: "⚙", add: "+", edit: "✎", delete: "✕",
    copy: "⎘", check: "✓", arrow: "→", platform: "⬡", dot: "•", star: "★",
    instagram: "📸", facebook: "🔵", linkedin: "💼", youtube: "▶",
  };
  return <span style={{ fontSize: size, lineHeight: 1 }}>{icons[name] || "·"}</span>;
};

// ── SIDEBAR ────────────────────────────────────────────────────────
function Sidebar({ view, setView, clients, selectedClient, setSelectedClient }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", section: "VANTIX" },
    { id: "clients", label: "Clients", section: null },
    { id: "voice", label: "Brand Voice Builder", section: null },
    { id: "generator", label: "Content Generator", section: "TOOLS" },
    { id: "calendar", label: "Content Calendar", section: null },
    { id: "performance", label: "Performance Tracker", section: null },
  ];

  return (
    <div style={S.sidebar}>
      <div style={S.sidebarLogo}>
        <div style={S.logoTitle}>VANTIX</div>
        <div style={S.logoSub}>Social Media OS</div>
        <div style={{ marginTop: 8, ...S.pill() }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.teal, display: "inline-block", boxShadow: `0 0 6px ${T.teal}` }} />
          SYSTEM ACTIVE
        </div>
      </div>

      {/* Client Selector */}
      {clients.length > 0 && (
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ ...S.label, marginBottom: 6 }}>Active Client</div>
          <select
            style={{ ...S.select, fontSize: 12, padding: "7px 10px" }}
            value={selectedClient?.id || ""}
            onChange={e => {
              const c = clients.find(x => x.id === e.target.value);
              setSelectedClient(c || null);
            }}
          >
            <option value="">— Select Client —</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      )}

      <nav style={S.nav}>
        {navItems.map((item, i) => (
          <div key={item.id}>
            {item.section && (
              <div style={S.navSection}>{item.section}</div>
            )}
            <div
              style={S.navItem(view === item.id)}
              onClick={() => setView(item.id)}
            >
              <Icon name={item.id} size={12} />
              {item.label}
            </div>
          </div>
        ))}
      </nav>

      <div style={{ padding: "12px 16px", borderTop: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 10, color: T.muted, letterSpacing: "0.1em" }}>VALMONT MARKETING</div>
        <div style={{ fontSize: 9, color: "#3d4a60", marginTop: 2 }}>Powered by VANTIX v1.0</div>
      </div>
    </div>
  );
}

// ── TOPBAR ─────────────────────────────────────────────────────────
function Topbar({ title, subtitle, actions }) {
  return (
    <div style={S.topbar}>
      <div>
        <div style={S.topbarTitle}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{subtitle}</div>}
      </div>
      {actions && <div style={{ display: "flex", gap: 10 }}>{actions}</div>}
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────
function Dashboard({ clients }) {
  const posts = load("posts", []);
  const perf = load("performance", []);
  const today = new Date().toISOString().split("T")[0];
  const todayPosts = posts.filter(p => p.date === today);
  const thisWeekPosts = posts.filter(p => {
    const d = new Date(p.date);
    const now = new Date();
    const diff = (now - d) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  });

  const totalFollowers = perf.reduce((sum, p) => sum + (parseInt(p.followers) || 0), 0);

  const recentClients = clients.slice(-3).reverse();

  return (
    <div>
      <Topbar
        title="COMMAND DASHBOARD"
        subtitle={`${new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`}
      />
      <div style={S.content}>

        {/* Stats */}
        <div style={S.statGrid}>
          {[
            { num: clients.length, label: "Active Clients" },
            { num: posts.length, label: "Posts Scheduled" },
            { num: todayPosts.length, label: "Posts Today" },
            { num: thisWeekPosts.length, label: "Posts This Week" },
          ].map((s, i) => (
            <div key={i} style={S.statCard}>
              <div style={S.statNum}>{s.num}</div>
              <div style={S.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Two columns */}
        <div style={S.grid2}>
          {/* Recent Clients */}
          <div style={S.card}>
            <div style={S.cardTitle}>Recent Clients</div>
            {clients.length === 0 ? (
              <div style={{ color: T.muted, fontSize: 13 }}>No clients yet. Add your first client →</div>
            ) : (
              recentClients.map(c => (
                <div key={c.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 0", borderBottom: `1px solid ${T.border}`
                }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: T.muted }}>{c.industry || "No industry set"}</div>
                  </div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {(c.platforms || []).slice(0, 3).map(p => (
                      <span key={p} style={{ fontSize: 14 }}>{PLATFORMS_ICONS[p] || "◉"}</span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Today's Schedule */}
          <div style={S.card}>
            <div style={S.cardTitle}>Today's Content Schedule</div>
            {todayPosts.length === 0 ? (
              <div style={{ color: T.muted, fontSize: 13 }}>Nothing scheduled today.</div>
            ) : (
              todayPosts.map((p, i) => (
                <div key={i} style={{
                  padding: "8px 12px", background: T.bg3, borderRadius: 3,
                  marginBottom: 8, borderLeft: `2px solid ${T.teal}`
                }}>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{p.clientName} · {p.platform}</div>
                  <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{p.topic}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* VANTIX Tips */}
        <div style={{ ...S.card, borderColor: T.teal + "30", background: T.tealGlow }}>
          <div style={S.cardTitle}>VANTIX INTELLIGENCE BRIEF</div>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { tip: "Reels with text hooks in first 2 seconds get 3x more reach. Build every script with an on-screen hook.", label: "CONTENT TIP" },
              { tip: "Best posting times for Indian audiences: 7-9am, 12-1pm, 8-10pm IST across all platforms.", label: "TIMING INTEL" },
              { tip: "Use Brand Voice Builder before generating any content. Consistency = recognition = trust.", label: "SYSTEM NOTE" },
            ].map((t, i) => (
              <div key={i} style={{ flex: 1, padding: "12px 14px", background: T.bg2, borderRadius: 3, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 9, letterSpacing: "0.2em", color: T.teal, marginBottom: 6 }}>{t.label}</div>
                <div style={{ fontSize: 12, color: "rgba(232,237,245,0.7)", lineHeight: 1.6 }}>{t.tip}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ── CLIENTS ────────────────────────────────────────────────────────
function Clients({ clients, saveClients, setSelectedClient, setView }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", industry: "", website: "", platforms: [], contact: "", notes: "" });

  const addClient = () => {
    if (!form.name) return;
    const newClient = { ...form, id: Date.now().toString(), createdAt: new Date().toISOString() };
    const updated = [...clients, newClient];
    saveClients(updated);
    setSelectedClient(newClient);
    setForm({ name: "", industry: "", website: "", platforms: [], contact: "", notes: "" });
    setAdding(false);
  };

  const deleteClient = (id) => {
    if (window.confirm("Delete this client?")) {
      saveClients(clients.filter(c => c.id !== id));
    }
  };

  const togglePlatform = (p) => {
    setForm(f => ({
      ...f,
      platforms: f.platforms.includes(p) ? f.platforms.filter(x => x !== p) : [...f.platforms, p]
    }));
  };

  return (
    <div>
      <Topbar
        title="CLIENT MANAGER"
        subtitle={`${clients.length} clients managed`}
        actions={[
          <button key="add" style={S.btn("primary")} onClick={() => setAdding(!adding)}>
            {adding ? "Cancel" : "+ Add Client"}
          </button>
        ]}
      />
      <div style={S.content}>

        {/* Add Client Form */}
        {adding && (
          <div style={{ ...S.card, borderColor: T.teal + "40" }}>
            <div style={S.cardTitle}>New Client</div>
            <div style={S.grid2}>
              <div style={S.formGroup}>
                <label style={S.label}>Client / Brand Name *</label>
                <input style={S.input} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Sharma Realty" />
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Industry</label>
                <input style={S.input} value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))} placeholder="e.g. Real Estate" />
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Website / Social Handle</label>
                <input style={S.input} value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="@handle or website.com" />
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Contact Person</label>
                <input style={S.input} value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} placeholder="Name + Phone" />
              </div>
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>Active Platforms</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {PLATFORMS.map(p => (
                  <div
                    key={p}
                    onClick={() => togglePlatform(p)}
                    style={{
                      ...S.tag,
                      cursor: "pointer",
                      background: form.platforms.includes(p) ? T.tealDim : T.tealGlow,
                      borderColor: form.platforms.includes(p) ? T.teal : T.border,
                      color: form.platforms.includes(p) ? T.teal : T.muted,
                    }}
                  >
                    {PLATFORMS_ICONS[p]} {p}
                  </div>
                ))}
              </div>
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>Notes</label>
              <textarea style={S.textarea} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Budget, retainer amount, special requirements..." rows={3} />
            </div>
            <button style={S.btn("primary")} onClick={addClient}>Save Client</button>
          </div>
        )}

        {/* Client List */}
        {clients.length === 0 && !adding ? (
          <div style={{ ...S.card, textAlign: "center", padding: "48px 24px" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>◉</div>
            <div style={{ fontSize: 16, color: T.muted }}>No clients yet. Add your first client to get started.</div>
          </div>
        ) : (
          clients.map(c => (
            <div key={c.id} style={{ ...S.card, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 18 }}>{c.name}</span>
                  {c.industry && <span style={S.pill(T.gold)}>{c.industry}</span>}
                </div>
                {c.website && <div style={{ fontSize: 12, color: T.muted, marginBottom: 6 }}>{c.website}</div>}
                <div style={{ display: "flex", gap: 6 }}>
                  {(c.platforms || []).map(p => (
                    <span key={p} style={S.tag}>{PLATFORMS_ICONS[p]} {p}</span>
                  ))}
                </div>
                {c.notes && <div style={{ fontSize: 12, color: T.muted, marginTop: 8, fontStyle: "italic" }}>{c.notes}</div>}
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button style={{ ...S.btn("ghost"), fontSize: 11 }} onClick={() => { setSelectedClient(c); setView("voice"); }}>
                  Brand Voice
                </button>
                <button style={{ ...S.btn("ghost"), fontSize: 11 }} onClick={() => { setSelectedClient(c); setView("generator"); }}>
                  Generate Content
                </button>
                <button style={{ ...S.btn("danger"), fontSize: 11, padding: "8px 12px" }} onClick={() => deleteClient(c.id)}>✕</button>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

// ── BRAND VOICE BUILDER ────────────────────────────────────────────
function BrandVoice({ clients, selectedClient, saveClients }) {
  const storageKey = selectedClient ? `bv_${selectedClient.id}` : null;
  const [answers, setAnswers] = useState(storageKey ? load(storageKey, {}) : {});
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (storageKey) setAnswers(load(storageKey, {}));
  }, [selectedClient]);

  const setAnswer = (id, val) => {
    const updated = { ...answers, [id]: val };
    setAnswers(updated);
    if (storageKey) save(storageKey, updated);
  };

  const toggleOption = (id, val) => {
    const current = answers[id] || [];
    const updated = current.includes(val) ? current.filter(x => x !== val) : [...current, val];
    setAnswer(id, updated);
  };

  const generatePrompt = () => {
    if (!selectedClient) return;
    const p = buildBrandVoicePrompt(selectedClient, answers);
    setPrompt(p);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!selectedClient) {
    return (
      <div>
        <Topbar title="BRAND VOICE BUILDER" subtitle="Select a client first" />
        <div style={{ ...S.content, ...S.card, textAlign: "center", padding: 40 }}>
          <div style={{ color: T.muted }}>Select a client from the sidebar to build their brand voice document.</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Topbar
        title="BRAND VOICE BUILDER"
        subtitle={`Building voice for: ${selectedClient.name}`}
        actions={[
          <button key="gen" style={S.btn("primary")} onClick={generatePrompt}>
            Generate Claude Prompt
          </button>
        ]}
      />
      <div style={S.content}>
        <div style={S.grid2}>
          {/* Form */}
          <div>
            {BV_QUESTIONS.map(q => (
              <div key={q.id} style={{ ...S.card, padding: "16px 18px" }}>
                <label style={S.label}>{q.label}</label>
                {q.type === "input" && (
                  <input
                    style={S.input}
                    value={answers[q.id] || ""}
                    onChange={e => setAnswer(q.id, e.target.value)}
                    placeholder={q.placeholder}
                  />
                )}
                {q.type === "textarea" && (
                  <textarea
                    style={S.textarea}
                    value={answers[q.id] || ""}
                    onChange={e => setAnswer(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    rows={3}
                  />
                )}
                {q.type === "select" && (
                  <select style={S.select} value={answers[q.id] || ""} onChange={e => setAnswer(q.id, e.target.value)}>
                    <option value="">— Select —</option>
                    {q.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                )}
                {q.type === "multi" && (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {q.options.map(o => {
                      const sel = (answers[q.id] || []).includes(o);
                      return (
                        <div
                          key={o}
                          onClick={() => toggleOption(q.id, o)}
                          style={{
                            ...S.tag, cursor: "pointer",
                            background: sel ? T.tealDim : T.tealGlow,
                            borderColor: sel ? T.teal : T.border,
                            color: sel ? T.teal : T.muted,
                          }}
                        >
                          {PLATFORMS_ICONS[o]} {o}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Generated Prompt */}
          <div style={{ position: "sticky", top: 65, alignSelf: "flex-start" }}>
            <div style={S.card}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={S.cardTitle}>GENERATED CLAUDE PROMPT</div>
                {prompt && (
                  <button style={S.btn(copied ? "primary" : "ghost")} onClick={copyPrompt}>
                    {copied ? "✓ Copied!" : "⎘ Copy"}
                  </button>
                )}
              </div>
              {!prompt ? (
                <div style={{ color: T.muted, fontSize: 13, textAlign: "center", padding: "32px 0" }}>
                  Fill in the form and click "Generate Claude Prompt" →<br />
                  <br />
                  <span style={{ fontSize: 11 }}>Then paste this into Claude to get a complete Brand Voice Document for {selectedClient.name}.</span>
                </div>
              ) : (
                <div style={S.promptBox}>{prompt}</div>
              )}
            </div>
            <div style={{ ...S.card, borderColor: T.gold + "30", background: `${T.gold}08` }}>
              <div style={{ fontSize: 9, letterSpacing: "0.2em", color: T.gold, marginBottom: 8 }}>HOW TO USE</div>
              <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.7 }}>
                1. Fill all fields above<br />
                2. Click "Generate Claude Prompt"<br />
                3. Copy the prompt<br />
                4. Open Claude.ai in a new tab<br />
                5. Paste and send<br />
                6. Save Claude's output as your Brand Voice Doc<br />
                7. Store it back in "Extra Notes" for reference
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CONTENT GENERATOR ─────────────────────────────────────────────
function ContentGenerator({ clients, selectedClient }) {
  const [platform, setPlatform] = useState("Instagram");
  const [contentType, setContentType] = useState("Reel Script");
  const [topic, setTopic] = useState("");
  const [goal, setGoal] = useState(GOALS[0]);
  const [tone, setTone] = useState("Match brand voice");
  const [length, setLength] = useState("Medium (300-500 words)");
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState(load("gen_history", []));

  const bv = selectedClient ? load(`bv_${selectedClient.id}`, null) : null;

  const generate = () => {
    if (!topic || !selectedClient) return;
    const p = buildContentPrompt(selectedClient, bv, platform, contentType, topic, goal, tone, length);
    setPrompt(p);
    const entry = {
      id: Date.now(), client: selectedClient.name, platform, contentType, topic, goal,
      prompt: p, date: new Date().toISOString()
    };
    const updated = [entry, ...history].slice(0, 20);
    setHistory(updated);
    save("gen_history", updated);
  };

  const copy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TONE_OPTIONS = ["Match brand voice", "Bold & provocative", "Warm & friendly", "Educational & insightful", "Urgent & direct", "Luxury & aspirational", "Humorous & casual"];
  const LENGTH_OPTIONS = ["Short (under 150 words)", "Medium (300-500 words)", "Long (600-1000 words)", "Full script (1000+ words)"];

  return (
    <div>
      <Topbar
        title="CONTENT GENERATOR"
        subtitle={selectedClient ? `Generating for: ${selectedClient.name}` : "Select a client to generate content"}
      />
      <div style={S.content}>
        {!selectedClient && (
          <div style={{ ...S.card, textAlign: "center", padding: 32, borderColor: T.warn + "40" }}>
            <div style={{ color: T.warn, fontSize: 13 }}>⚠ Select a client from the sidebar dropdown to generate content.</div>
          </div>
        )}

        <div style={S.grid2}>
          {/* Controls */}
          <div>
            <div style={S.card}>
              <div style={S.cardTitle}>Content Configuration</div>

              {/* Platform */}
              <div style={S.formGroup}>
                <label style={S.label}>Platform</label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {PLATFORMS.map(p => (
                    <div
                      key={p}
                      onClick={() => { setPlatform(p); setContentType(CONTENT_TYPES[p][0]); }}
                      style={{
                        ...S.tag, cursor: "pointer", fontSize: 12, padding: "6px 12px",
                        background: platform === p ? T.tealDim : T.tealGlow,
                        borderColor: platform === p ? T.teal : T.border,
                        color: platform === p ? T.teal : T.muted,
                      }}
                    >
                      {PLATFORMS_ICONS[p]} {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Type */}
              <div style={S.formGroup}>
                <label style={S.label}>Content Type</label>
                <select style={S.select} value={contentType} onChange={e => setContentType(e.target.value)}>
                  {(CONTENT_TYPES[platform] || []).map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Topic */}
              <div style={S.formGroup}>
                <label style={S.label}>Topic / Angle *</label>
                <textarea
                  style={{ ...S.textarea, minHeight: 60 }}
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="e.g. '5 reasons why property prices in Chandigarh are rising in 2025' or 'Before/after client transformation'"
                  rows={3}
                />
              </div>

              <div style={S.grid2}>
                {/* Goal */}
                <div style={S.formGroup}>
                  <label style={S.label}>Content Goal</label>
                  <select style={S.select} value={goal} onChange={e => setGoal(e.target.value)}>
                    {GOALS.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>

                {/* Tone */}
                <div style={S.formGroup}>
                  <label style={S.label}>Tone Override</label>
                  <select style={S.select} value={tone} onChange={e => setTone(e.target.value)}>
                    {TONE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Length */}
              <div style={S.formGroup}>
                <label style={S.label}>Length</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {LENGTH_OPTIONS.map(l => (
                    <div
                      key={l}
                      onClick={() => setLength(l)}
                      style={{
                        ...S.tag, cursor: "pointer", fontSize: 11,
                        background: length === l ? T.tealDim : T.tealGlow,
                        borderColor: length === l ? T.teal : T.border,
                        color: length === l ? T.teal : T.muted,
                      }}
                    >
                      {l}
                    </div>
                  ))}
                </div>
              </div>

              {/* BV Status */}
              {selectedClient && (
                <div style={{
                  padding: "10px 12px", borderRadius: 3,
                  background: bv?.industry ? T.tealGlow : `${T.warn}10`,
                  border: `1px solid ${bv?.industry ? T.border : T.warn + "40"}`,
                  fontSize: 11, color: bv?.industry ? T.teal : T.warn
                }}>
                  {bv?.industry
                    ? `✓ Brand Voice loaded for ${selectedClient.name}. Content will be tailored to their voice.`
                    : `⚠ No Brand Voice for ${selectedClient.name}. Content will be generic. Build their Brand Voice first for best results.`
                  }
                </div>
              )}

              <div style={{ marginTop: 16 }}>
                <button
                  style={{ ...S.btn("primary"), width: "100%", padding: "14px", fontSize: 13, letterSpacing: "0.2em" }}
                  onClick={generate}
                  disabled={!topic || !selectedClient}
                >
                  ⟳ GENERATE VANTIX PROMPT
                </button>
              </div>
            </div>

            {/* History */}
            {history.length > 0 && (
              <div style={S.card}>
                <div style={S.cardTitle}>Recent Generations</div>
                {history.slice(0, 5).map(h => (
                  <div
                    key={h.id}
                    onClick={() => setPrompt(h.prompt)}
                    style={{
                      padding: "8px 12px", background: T.bg3, borderRadius: 3, marginBottom: 6,
                      cursor: "pointer", border: `1px solid ${T.border}`, transition: "border 0.2s"
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{h.client} · {h.platform}</div>
                    <div style={{ fontSize: 11, color: T.muted }}>{h.contentType} · {h.topic?.slice(0, 50)}...</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Output */}
          <div style={{ position: "sticky", top: 65, alignSelf: "flex-start" }}>
            <div style={S.card}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={S.cardTitle}>VANTIX PROMPT — COPY TO CLAUDE</div>
                {prompt && (
                  <button style={S.btn(copied ? "primary" : "ghost")} onClick={copy}>
                    {copied ? "✓ Copied!" : "⎘ Copy Prompt"}
                  </button>
                )}
              </div>
              {!prompt ? (
                <div style={{ textAlign: "center", padding: "48px 0", color: T.muted }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>⟳</div>
                  <div style={{ fontSize: 13 }}>Configure settings and click Generate</div>
                  <div style={{ fontSize: 11, marginTop: 8 }}>Prompt will appear here → copy to Claude.ai</div>
                </div>
              ) : (
                <>
                  <div style={S.promptBox}>{prompt}</div>
                  <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                    <button style={{ ...S.btn("primary"), flex: 1 }} onClick={copy}>
                      {copied ? "✓ Copied!" : "Copy Prompt"}
                    </button>
                    <button style={{ ...S.btn("ghost") }} onClick={() => window.open("https://claude.ai", "_blank")}>
                      Open Claude →
                    </button>
                  </div>
                  <div style={{ marginTop: 10, fontSize: 11, color: T.muted, textAlign: "center" }}>
                    Paste this prompt into Claude.ai to generate the content
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CONTENT CALENDAR ──────────────────────────────────────────────
function ContentCalendar({ clients, selectedClient, saveClients }) {
  const [posts, setPosts] = useState(load("posts", []));
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ date: new Date().toISOString().split("T")[0], platform: "Instagram", topic: "", status: "Planned", clientId: selectedClient?.id || "" });

  const now = new Date();
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [viewYear, setViewYear] = useState(now.getFullYear());

  const savePosts = (updated) => {
    setPosts(updated);
    save("posts", updated);
  };

  const addPost = () => {
    if (!form.topic) return;
    const clientObj = clients.find(c => c.id === form.clientId);
    const post = { ...form, id: Date.now().toString(), clientName: clientObj?.name || "Unknown" };
    savePosts([...posts, post]);
    setForm(f => ({ ...f, topic: "" }));
    setAdding(false);
  };

  const deletePost = (id) => savePosts(posts.filter(p => p.id !== id));

  const STATUS_COLORS = { Planned: T.muted, "In Progress": T.warn, Done: T.teal, Published: T.gold };

  // Calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const days = Array.from({ length: firstDay + daysInMonth }, (_, i) => i < firstDay ? null : i - firstDay + 1);
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getPostsForDay = (day) => {
    if (!day) return [];
    const date = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return posts.filter(p => p.date === date);
  };

  return (
    <div>
      <Topbar
        title="CONTENT CALENDAR"
        subtitle="Schedule and track all social media posts"
        actions={[
          <button key="add" style={S.btn("primary")} onClick={() => setAdding(!adding)}>
            {adding ? "Cancel" : "+ Add Post"}
          </button>
        ]}
      />
      <div style={S.content}>

        {/* Add Form */}
        {adding && (
          <div style={{ ...S.card, borderColor: T.teal + "40" }}>
            <div style={S.cardTitle}>Schedule a Post</div>
            <div style={S.grid3}>
              <div style={S.formGroup}>
                <label style={S.label}>Client</label>
                <select style={S.select} value={form.clientId} onChange={e => setForm(f => ({ ...f, clientId: e.target.value }))}>
                  <option value="">— Select —</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Platform</label>
                <select style={S.select} value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}>
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Date</label>
                <input type="date" style={S.input} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
            </div>
            <div style={S.grid2}>
              <div style={S.formGroup}>
                <label style={S.label}>Topic / Content Description</label>
                <input style={S.input} value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))} placeholder="What's this post about?" />
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Status</label>
                <select style={S.select} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  {["Planned", "In Progress", "Done", "Published"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <button style={S.btn("primary")} onClick={addPost}>Add to Calendar</button>
          </div>
        )}

        {/* Calendar Header */}
        <div style={{ ...S.card }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <button style={S.btn("ghost")} onClick={() => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); }}>← Prev</button>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 18 }}>{MONTHS[viewMonth]} {viewYear}</div>
            <button style={S.btn("ghost")} onClick={() => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); }}>Next →</button>
          </div>

          {/* Day Headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: 10, letterSpacing: "0.15em", color: T.muted, padding: "4px 0" }}>{d}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
            {days.map((day, i) => {
              const dayPosts = getPostsForDay(day);
              const isToday = day === now.getDate() && viewMonth === now.getMonth() && viewYear === now.getFullYear();
              return (
                <div key={i} style={{
                  minHeight: 80, padding: "6px 8px",
                  background: day ? (isToday ? T.tealGlow : T.bg3) : "transparent",
                  border: day ? `1px solid ${isToday ? T.teal : T.border}` : "none",
                  borderRadius: 3,
                }}>
                  {day && (
                    <>
                      <div style={{ fontSize: 12, fontWeight: isToday ? 700 : 400, color: isToday ? T.teal : T.muted, marginBottom: 4 }}>{day}</div>
                      {dayPosts.map(p => (
                        <div key={p.id} style={{
                          fontSize: 10, padding: "2px 5px", borderRadius: 2, marginBottom: 2,
                          background: `${STATUS_COLORS[p.status] || T.muted}20`,
                          color: STATUS_COLORS[p.status] || T.muted,
                          cursor: "pointer", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                        }} title={`${p.clientName} - ${p.platform} - ${p.topic}`}>
                          {PLATFORMS_ICONS[p.platform]} {p.topic?.slice(0, 15)}...
                        </div>
                      ))}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Posts List */}
        <div style={S.card}>
          <div style={S.cardTitle}>All Scheduled Posts</div>
          {posts.length === 0 ? (
            <div style={{ color: T.muted, fontSize: 13 }}>No posts scheduled yet.</div>
          ) : (
            posts.sort((a, b) => a.date > b.date ? 1 : -1).map(p => (
              <div key={p.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 0", borderBottom: `1px solid ${T.border}`
              }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ fontSize: 11, color: T.muted, minWidth: 80 }}>{p.date}</div>
                  <span>{PLATFORMS_ICONS[p.platform]}</span>
                  <div>
                    <div style={{ fontSize: 13 }}>{p.clientName} · {p.topic}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ ...S.pill(STATUS_COLORS[p.status] || T.muted) }}>{p.status}</span>
                  <button style={{ ...S.btn("danger"), padding: "4px 8px", fontSize: 11 }} onClick={() => deletePost(p.id)}>✕</button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

// ── PERFORMANCE TRACKER ────────────────────────────────────────────
function Performance({ clients, selectedClient, saveClients }) {
  const [records, setRecords] = useState(load("performance", []));
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({
    clientId: selectedClient?.id || "",
    date: new Date().toISOString().split("T")[0],
    platform: "Instagram",
    followers: "", reach: "", impressions: "", engagement: "", leads: "", spend: "", notes: ""
  });

  useEffect(() => {
    if (selectedClient) setForm(f => ({ ...f, clientId: selectedClient.id }));
  }, [selectedClient]);

  const saveRecords = (updated) => { setRecords(updated); save("performance", updated); };

  const add = () => {
    if (!form.clientId) return;
    const clientObj = clients.find(c => c.id === form.clientId);
    const r = { ...form, id: Date.now().toString(), clientName: clientObj?.name || "Unknown" };
    saveRecords([...records, r]);
    setForm(f => ({ ...f, followers: "", reach: "", impressions: "", engagement: "", leads: "", spend: "", notes: "" }));
    setAdding(false);
  };

  const clientRecords = selectedClient ? records.filter(r => r.clientId === selectedClient.id) : records;
  const latest = clientRecords[clientRecords.length - 1];
  const prev = clientRecords[clientRecords.length - 2];

  const growth = (curr, prev) => {
    if (!curr || !prev || !parseInt(prev)) return null;
    const pct = ((parseInt(curr) - parseInt(prev)) / parseInt(prev) * 100).toFixed(1);
    return { pct, positive: parseFloat(pct) >= 0 };
  };

  const METRICS = [
    { id: "followers", label: "Followers" },
    { id: "reach", label: "Reach" },
    { id: "impressions", label: "Impressions" },
    { id: "engagement", label: "Engagement %" },
    { id: "leads", label: "Leads Generated" },
    { id: "spend", label: "Ad Spend (₹)" },
  ];

  return (
    <div>
      <Topbar
        title="PERFORMANCE TRACKER"
        subtitle={selectedClient ? `Tracking: ${selectedClient.name}` : "All clients"}
        actions={[
          <button key="add" style={S.btn("primary")} onClick={() => setAdding(!adding)}>
            {adding ? "Cancel" : "+ Log Performance"}
          </button>
        ]}
      />
      <div style={S.content}>

        {/* Add Form */}
        {adding && (
          <div style={{ ...S.card, borderColor: T.teal + "40" }}>
            <div style={S.cardTitle}>Log Performance Data</div>
            <div style={S.grid3}>
              <div style={S.formGroup}>
                <label style={S.label}>Client</label>
                <select style={S.select} value={form.clientId} onChange={e => setForm(f => ({ ...f, clientId: e.target.value }))}>
                  <option value="">— Select —</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Platform</label>
                <select style={S.select} value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}>
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Date</label>
                <input type="date" style={S.input} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
            </div>
            <div style={S.grid3}>
              {METRICS.map(m => (
                <div key={m.id} style={S.formGroup}>
                  <label style={S.label}>{m.label}</label>
                  <input style={S.input} type="number" value={form[m.id]} onChange={e => setForm(f => ({ ...f, [m.id]: e.target.value }))} placeholder="0" />
                </div>
              ))}
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>Notes</label>
              <input style={S.input} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="What happened this period?" />
            </div>
            <button style={S.btn("primary")} onClick={add}>Save Entry</button>
          </div>
        )}

        {/* Latest Stats */}
        {latest && (
          <div style={S.grid3}>
            {METRICS.map(m => {
              const g = growth(latest[m.id], prev?.[m.id]);
              return (
                <div key={m.id} style={S.statCard}>
                  <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: T.muted, marginBottom: 8 }}>{m.label}</div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 28, color: T.white, lineHeight: 1 }}>
                    {latest[m.id] || "—"}
                  </div>
                  {g && (
                    <div style={{ fontSize: 11, color: g.positive ? T.teal : T.danger, marginTop: 6 }}>
                      {g.positive ? "↑" : "↓"} {Math.abs(g.pct)}% vs previous
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Records Table */}
        <div style={S.card}>
          <div style={S.cardTitle}>Performance History</div>
          {clientRecords.length === 0 ? (
            <div style={{ color: T.muted, fontSize: 13 }}>No performance data yet. Log your first entry.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                    {["Date", "Client", "Platform", "Followers", "Reach", "Engagement", "Leads", "Ad Spend", "Notes"].map(h => (
                      <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: T.muted, fontWeight: 600, letterSpacing: "0.1em", fontSize: 10 }}>{h.toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {clientRecords.reverse().map(r => (
                    <tr key={r.id} style={{ borderBottom: `1px solid ${T.border}20` }}>
                      <td style={{ padding: "10px 12px", color: T.muted }}>{r.date}</td>
                      <td style={{ padding: "10px 12px" }}>{r.clientName}</td>
                      <td style={{ padding: "10px 12px" }}>{PLATFORMS_ICONS[r.platform]} {r.platform}</td>
                      <td style={{ padding: "10px 12px", color: T.teal }}>{r.followers || "—"}</td>
                      <td style={{ padding: "10px 12px" }}>{r.reach || "—"}</td>
                      <td style={{ padding: "10px 12px" }}>{r.engagement || "—"}%</td>
                      <td style={{ padding: "10px 12px", color: T.gold }}>{r.leads || "—"}</td>
                      <td style={{ padding: "10px 12px" }}>₹{r.spend || "0"}</td>
                      <td style={{ padding: "10px 12px", color: T.muted, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ── ROOT APP ───────────────────────────────────────────────────────
export default function VantixApp() {
  const [view, setView] = useState("dashboard");
  const [clients, setClients] = useState(load("clients", []));
  const [selectedClient, setSelectedClient] = useState(null);

  const saveClients = (updated) => {
    setClients(updated);
    save("clients", updated);
  };

  useEffect(() => {
    const link1 = document.createElement("link");
    link1.rel = "preconnect";
    link1.href = "https://fonts.googleapis.com";
    document.head.appendChild(link1);
    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap";
    document.head.appendChild(link2);
  }, []);

  return (
    <div style={S.app}>
      <Sidebar
        view={view}
        setView={setView}
        clients={clients}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
      />
      <div style={S.main}>
        {view === "dashboard" && <Dashboard clients={clients} />}
        {view === "clients" && <Clients clients={clients} saveClients={saveClients} setSelectedClient={setSelectedClient} setView={setView} />}
        {view === "voice" && <BrandVoice clients={clients} selectedClient={selectedClient} saveClients={saveClients} />}
        {view === "generator" && <ContentGenerator clients={clients} selectedClient={selectedClient} />}
        {view === "calendar" && <ContentCalendar clients={clients} selectedClient={selectedClient} saveClients={saveClients} />}
        {view === "performance" && <Performance clients={clients} selectedClient={selectedClient} saveClients={saveClients} />}
      </div>
    </div>
  );
}
