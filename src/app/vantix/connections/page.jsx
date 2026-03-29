"use client";
import { useState, useEffect } from "react";

const META_APP_ID = "2104051133749518";
const REDIRECT_URI = "https://valmontmarketing.com/vantix/auth/callback";

const C = {
  bg: "#050d1a", bg1: "#060e1e", bg2: "#0a1628", bg3: "#0d1d35",
  teal: "#00d4bf", tealLo: "rgba(0,212,191,0.10)", tealMd: "rgba(0,212,191,0.20)", tealHi: "rgba(0,212,191,0.35)",
  red: "#ff4d5e", gold: "#c8a96e", white: "#ffffff", muted: "rgba(255,255,255,0.55)",
  border: "rgba(0,212,191,0.15)", borderHi: "rgba(0,212,191,0.35)",
};

const LS = {
  get: (k, d = null) => { try { const v = localStorage.getItem("vx_" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem("vx_" + k, JSON.stringify(v)); } catch {} },
};

const CSS = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: rgba(0,212,191,0.2); border-radius: 2px; }

  @keyframes vxc-spin { to { transform: rotate(360deg); } }
  @keyframes vxc-pulse { 0%,100% { opacity:1; box-shadow:0 0 6px #00d4bf; } 50% { opacity:0.4; box-shadow:0 0 2px #00d4bf; } }
  @keyframes vxc-fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }

  .vxc-root { font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; background:#050d1a; min-height:100vh; color:#fff; }

  /* NAV */
  .vxc-nav { background:rgba(6,14,30,0.97); border-bottom:1px solid rgba(0,212,191,0.15); padding:0 32px; height:64px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:50; backdrop-filter:blur(16px); gap:16px; }
  .vxc-nav-logo { display:flex; align-items:center; gap:10px; }
  .vxc-pulse-dot { width:7px; height:7px; border-radius:50%; background:#00d4bf; box-shadow:0 0 8px #00d4bf; animation:vxc-pulse 2s ease-in-out infinite; flex-shrink:0; }
  .vxc-nav-right { display:flex; align-items:center; gap:10px; }
  .vxc-back-link { display:inline-flex; align-items:center; gap:7px; padding:8px 16px; background:rgba(0,212,191,0.08); border:1px solid rgba(0,212,191,0.25); border-radius:20px; color:#00d4bf; font-size:11px; font-weight:700; letter-spacing:0.1em; text-decoration:none; transition:all 0.2s; }
  .vxc-back-link:hover { background:rgba(0,212,191,0.15); border-color:#00d4bf; }

  /* CONTENT */
  .vxc-content { padding:32px; max-width:1200px; margin:0 auto; animation:vxc-fadeIn 0.3s ease; }

  /* CARD */
  .vxc-card { background:#0a1628; border:1px solid rgba(0,212,191,0.15); border-radius:8px; padding:24px; transition:border-color 0.25s; }
  .vxc-card-hover:hover { border-color:rgba(0,212,191,0.35); }

  /* BUTTONS */
  .vxc-btn { display:inline-flex; align-items:center; justify-content:center; gap:7px; padding:10px 22px; border:none; border-radius:5px; font-size:12px; font-weight:700; letter-spacing:0.12em; cursor:pointer; transition:all 0.2s; font-family:inherit; white-space:nowrap; min-height:40px; min-width:44px; }
  .vxc-btn-primary { background:#00d4bf; color:#050d1a; }
  .vxc-btn-primary:hover:not(:disabled) { background:#00f0d8; }
  .vxc-btn-primary:disabled { opacity:0.5; cursor:not-allowed; }
  .vxc-btn-outline { background:transparent; border:1px solid rgba(0,212,191,0.35); color:#00d4bf; }
  .vxc-btn-outline:hover:not(:disabled) { background:rgba(0,212,191,0.09); border-color:#00d4bf; }
  .vxc-btn-outline:disabled { opacity:0.45; cursor:not-allowed; }
  .vxc-btn-danger { background:rgba(255,77,94,0.1); border:1px solid rgba(255,77,94,0.28); color:#ff4d5e; }
  .vxc-btn-danger:hover { background:rgba(255,77,94,0.18); }
  .vxc-btn-sm { padding:7px 14px; font-size:11px; min-height:34px; }

  /* SPINNER */
  .vxc-spinner { width:16px; height:16px; border:2px solid rgba(0,212,191,0.15); border-top-color:#00d4bf; border-radius:50%; animation:vxc-spin 0.8s linear infinite; flex-shrink:0; }
  .vxc-spinner-lg { width:28px; height:28px; border-width:3px; }

  /* TABS */
  .vxc-tabs { display:flex; gap:0; border-bottom:1px solid rgba(0,212,191,0.12); margin-bottom:22px; }
  .vxc-tab { background:none; border:none; border-bottom:2px solid transparent; color:rgba(255,255,255,0.45); font-size:12px; font-weight:700; letter-spacing:0.1em; padding:10px 20px; cursor:pointer; transition:all 0.2s; margin-bottom:-1px; font-family:inherit; text-transform:uppercase; }
  .vxc-tab.active { color:#00d4bf; border-bottom-color:#00d4bf; }
  .vxc-tab:hover:not(.active) { color:rgba(255,255,255,0.75); }

  /* POST GRID */
  .vxc-post-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
  .vxc-post-card { background:#0a1628; border:1px solid rgba(0,212,191,0.12); border-radius:7px; cursor:pointer; overflow:hidden; transition:border-color 0.2s,transform 0.2s; }
  .vxc-post-card:hover { border-color:rgba(0,212,191,0.35); transform:translateY(-2px); }

  /* ICON BOX */
  .vxc-icon-box { width:42px; height:42px; background:rgba(0,212,191,0.10); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:19px; flex-shrink:0; }

  /* OUTPUT */
  .vxc-output { background:#0a1628; border:1px solid rgba(0,212,191,0.15); border-radius:8px; padding:24px; }
  .vxc-output-text { font-size:13px; color:rgba(255,255,255,0.88); line-height:1.9; white-space:pre-wrap; }
  .vxc-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; padding:40px 20px; color:rgba(255,255,255,0.4); text-align:center; }

  /* STAT */
  .vxc-stat { text-align:center; }
  .vxc-stat-val { font-size:26px; font-weight:800; color:#00d4bf; line-height:1; }
  .vxc-stat-lbl { font-size:10px; color:rgba(255,255,255,0.45); letter-spacing:0.14em; text-transform:uppercase; margin-top:3px; }

  /* PROFILE BAR */
  .vxc-profile-bar { display:flex; align-items:center; gap:20px; margin-bottom:22px; padding:20px 24px; background:#060e1e; border-radius:8px; border:1px solid rgba(0,212,191,0.12); flex-wrap:wrap; }

  /* MODAL */
  .vxc-modal { position:fixed; inset:0; background:rgba(5,13,26,0.97); z-index:100; overflow-y:auto; padding:24px; backdrop-filter:blur(8px); }
  .vxc-modal-inner { max-width:860px; margin:0 auto; }
  .vxc-modal-grid { display:grid; grid-template-columns:260px 1fr; gap:16px; }

  /* RESPONSIVE */
  @media (max-width:1023px) {
    .vxc-nav { padding:0 20px; }
    .vxc-content { padding:24px 20px; }
    .vxc-post-grid { grid-template-columns:repeat(2,1fr); }
    .vxc-modal-grid { grid-template-columns:1fr; }
    .vxc-profile-stats { grid-template-columns:repeat(3,1fr); }
  }
  @media (max-width:767px) {
    .vxc-nav { padding:0 16px; height:56px; }
    .vxc-content { padding:16px; }
    .vxc-post-grid { grid-template-columns:repeat(2,1fr); gap:8px; }
    .vxc-profile-bar { flex-direction:column; align-items:flex-start; gap:16px; }
    .vxc-card { padding:16px; }
    .vxc-btn-full-m { width:100%; }
    .vxc-modal-grid { grid-template-columns:1fr; }
  }
  @media (max-width:420px) {
    .vxc-post-grid { grid-template-columns:1fr; }
  }

  select option { background:#0a1628; }
`;

/* ─── PostThumbnail with CORS-safe fallback ─── */

function PostThumbnail({ post }) {
  const isVideo = post.media_type === "VIDEO";
  const initial = isVideo
    ? (post.thumbnail_url || post.media_url || null)
    : (post.media_url || post.thumbnail_url || null);
  const [imgSrc, setImgSrc] = useState(initial);
  const [failed, setFailed] = useState(!initial);

  const handleError = () => {
    if (isVideo && imgSrc === post.thumbnail_url && post.media_url && post.media_url !== post.thumbnail_url) {
      setImgSrc(post.media_url);
    } else if (!isVideo && imgSrc === post.media_url && post.thumbnail_url && post.thumbnail_url !== post.media_url) {
      setImgSrc(post.thumbnail_url);
    } else {
      setFailed(true);
    }
  };

  if (failed || !imgSrc) {
    return (
      <div style={{ position: "absolute", inset: 0, background: C.bg3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <div style={{ fontSize: 24 }}>🎬</div>
        <div style={{ fontSize: 9, color: C.muted, letterSpacing: "0.14em", fontWeight: 700 }}>REEL</div>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt=""
      onError={handleError}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}

/* ─── Spinner ─── */

function Spinner({ label, large }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.teal, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>
      <div className={large ? "vxc-spinner vxc-spinner-lg" : "vxc-spinner"} />
      {label && <span>{label}</span>}
    </div>
  );
}

/* ─── analyzeWithVantix helper ─── */

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

/* ─── Connect Instagram panel ─── */

function ConnectInstagram({ clientId, onConnected }) {
  const handleConnect = () => {
    const PERMISSIONS = "instagram_basic,pages_show_list,pages_read_engagement";
    const oauthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${META_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${PERMISSIONS}&response_type=code&state=${clientId}`;
    const popup = window.open(oauthUrl, "Connect Instagram", "width=600,height=700,scrollbars=yes");
    window.addEventListener("message", async (event) => {
      if (event.data?.type === "VANTIX_AUTH_SUCCESS" && event.data.state === clientId) {
        LS.set(`meta_token_${clientId}`, event.data.accessToken);
        popup?.close();
        if (onConnected) onConnected(event.data.accessToken);
      }
    });
  };

  return (
    <div className="vxc-card" style={{ textAlign: "center", padding: "56px 32px", maxWidth: 560, margin: "0 auto" }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(0,212,191,0.08)", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 32 }}>📱</div>
      <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "0.05em", marginBottom: 10 }}>Connect Instagram</div>
      <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, maxWidth: 380, margin: "0 auto 28px" }}>
        Connect your client's Instagram Business account to pull posts, insights, reach, and engagement data into VANTIX.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 300, margin: "0 auto 32px", textAlign: "left" }}>
        {["Posts + performance auto-synced", "Real follower & reach analytics", "AI analyzes everything automatically", "Client keeps full account control"].map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.muted }}>
            <span style={{ color: C.teal, fontWeight: 800, fontSize: 14 }}>✓</span> {t}
          </div>
        ))}
      </div>
      <button
        className="vxc-btn vxc-btn-full-m"
        onClick={handleConnect}
        style={{
          background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
          color: "#fff", padding: "13px 32px", fontSize: 13, letterSpacing: "0.14em",
          border: "none", borderRadius: 5, cursor: "pointer", fontWeight: 700,
          fontFamily: "inherit", minHeight: 48, display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}
      >
        Connect with Instagram
      </button>
      <div style={{ fontSize: 11, color: C.muted, marginTop: 12 }}>Secure OAuth — we never see passwords</div>
      {META_APP_ID === "YOUR_FACEBOOK_APP_ID" && (
        <div style={{ marginTop: 16, padding: "10px 14px", background: "rgba(200,169,110,0.08)", border: "1px solid rgba(200,169,110,0.25)", borderRadius: 6, fontSize: 11, color: C.gold }}>
          ⚠ Add your Facebook App ID to enable connection
        </div>
      )}
    </div>
  );
}

/* ─── Post Analyzer ─── */

function PostAnalyzer({ post, insights, clientNiche }) {
  const [analysis, setAnalysis] = useState("");
  const [ideas, setIdeas] = useState("");
  const [loading, setLoading] = useState(false);
  const [ideasLoading, setIdeasLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    try {
      const text = await analyzeWithVantix(
        `You are VANTIX Post Intelligence. Analyze social media post performance precisely. Niche: ${clientNiche}.`,
        `Analyze this post:\nType: ${post.media_type}\nCaption: ${post.caption?.slice(0, 200)}\nLikes: ${post.like_count} Comments: ${post.comments_count}\nReach: ${insights?.reach || "unknown"} Saves: ${insights?.saved || "unknown"}\n\n1. Performance verdict (over/underperform?)\n2. What worked\n3. What failed\n4. Caption quality\n5. One highest-impact change for next time`
      );
      setAnalysis(text);
    } catch { setAnalysis("Error. Try again."); }
    setLoading(false);
  };

  const generateIdeas = async () => {
    setIdeasLoading(true);
    try {
      const text = await analyzeWithVantix(
        "You are VANTIX Content Strategy. Generate specific content ideas based on what worked.",
        `Based on this post (${post.media_type}, ${post.like_count} likes, ${post.comments_count} comments, caption: "${post.caption?.slice(0, 100)}") for niche: ${clientNiche}\n\n1. 5 specific reel ideas that will outperform this\n2. Best hook for the top idea (write it fully)\n3. Best day and time to post`
      );
      setIdeas(text);
    } catch { setIdeas("Error. Try again."); }
    setIdeasLoading(false);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        <button className="vxc-btn vxc-btn-primary vxc-btn-sm vxc-btn-full-m" onClick={analyze} disabled={loading}>
          {loading ? <><div className="vxc-spinner" /> Analyzing…</> : "Analyze Post"}
        </button>
        <button className="vxc-btn vxc-btn-outline vxc-btn-sm vxc-btn-full-m" onClick={generateIdeas} disabled={ideasLoading}>
          {ideasLoading ? <><div className="vxc-spinner" /> …</> : "Next Ideas"}
        </button>
      </div>
      {loading ? (
        <div style={{ padding: "20px 0" }}><Spinner label="ANALYZING POST…" /></div>
      ) : analysis ? (
        <div className="vxc-output-text" style={{ marginBottom: 16, fontSize: 12 }}>{analysis}</div>
      ) : null}
      {ideasLoading ? (
        <div style={{ padding: "20px 0" }}><Spinner label="GENERATING IDEAS…" /></div>
      ) : ideas ? (
        <div className="vxc-output-text" style={{ fontSize: 12 }}>{ideas}</div>
      ) : null}
      {!analysis && !ideas && !loading && !ideasLoading && (
        <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>Click Analyze Post for a full breakdown, or Next Ideas for content recommendations.</div>
      )}
    </div>
  );
}

/* ─── Instagram Dashboard ─── */

function InstagramDashboard({ client, token }) {
  const cacheKey = `ig_data_${client.id}`;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(() => LS.get(cacheKey, null));
  const [selectedPost, setSelectedPost] = useState(null);
  const [postInsights, setPostInsights] = useState(null);
  const [analysis, setAnalysis] = useState(() => LS.get(`ig_analysis_${client.id}`, ""));
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  const fetchData = async (accessToken) => {
    setLoading(true);
    setError(null);
    try {
      const pagesRes = await fetch(`https://graph.facebook.com/v18.0/me/accounts?fields=id,name,instagram_business_account,access_token&access_token=${accessToken}`);
      const pages = await pagesRes.json();
      if (!pages.data?.length) throw new Error("No Facebook Pages found. Make sure you logged in with the correct Facebook account.");
      const pageWithIG = pages.data.find(p => p.instagram_business_account);
      if (!pageWithIG) throw new Error("No Instagram Business account found on any of your Pages. Make sure Instagram is linked to your Facebook Page.");

      const igId = pageWithIG.instagram_business_account.id;
      const pageToken = pageWithIG.access_token;

      const account = await (await fetch(`https://graph.facebook.com/v18.0/${igId}?fields=id,name,username,followers_count,follows_count,media_count,profile_picture_url,biography&access_token=${pageToken}`)).json();
      const postsData = await (await fetch(`https://graph.facebook.com/v18.0/${igId}/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,like_count,comments_count,permalink&limit=24&access_token=${pageToken}`)).json();

      const result = { account, posts: postsData.data || [], igId, pageToken, fetchedAt: new Date().toISOString() };
      setData(result);
      LS.set(cacheKey, result);
    } catch (err) {
      setError(err.message || "Connection error. Try reconnecting.");
    }
    setLoading(false);
  };

  useEffect(() => { if (token && !data) fetchData(token); }, [token]);

  const openPost = async (post) => {
    setSelectedPost(post);
    if (data?.pageToken) {
      try {
        const ins = await fetch(`https://graph.facebook.com/v18.0/${post.id}/insights?metric=impressions,reach,saved,video_views&access_token=${data.pageToken}`);
        const insData = await ins.json();
        const insMap = {};
        (insData.data || []).forEach(m => { insMap[m.name] = m.values?.[0]?.value; });
        setPostInsights(insMap);
      } catch { setPostInsights({}); }
    }
  };

  const runAnalysis = async () => {
    if (!data?.posts?.length) return;
    setAnalysisLoading(true);
    const topPosts = [...data.posts]
      .sort((a, b) => (b.like_count + b.comments_count) - (a.like_count + a.comments_count))
      .slice(0, 10);
    const postsStr = topPosts.map(p =>
      `[${new Date(p.timestamp).toLocaleDateString()}] ${p.media_type} | Likes:${p.like_count} Comments:${p.comments_count} | "${p.caption?.slice(0, 80)}"`
    ).join("\n");
    try {
      const text = await analyzeWithVantix(
        `You are VANTIX Account Intelligence. Analyze Instagram performance and build growth strategies. Client: ${client.name}. Niche: ${client.niche || client.industry}.`,
        `Analyze this Instagram account:\n\nACCOUNT: @${data.account.username}\nFOLLOWERS: ${data.account.followers_count}\nNICHE: ${client.niche || client.industry}\n\nTOP POSTS:\n${postsStr}\n\n1. Account health score (1-10)\n2. What content is working\n3. What to stop immediately\n4. Top 5 reel ideas for next week\n5. 30-day action plan`
      );
      setAnalysis(text);
      LS.set(`ig_analysis_${client.id}`, text);
    } catch { setAnalysis("Analysis error. Try again."); }
    setAnalysisLoading(false);
  };

  const disconnect = () => {
    if (window.confirm("Disconnect this Instagram account?")) {
      LS.set(`meta_token_${client.id}`, null);
      LS.set(cacheKey, null);
      window.location.reload();
    }
  };

  if (loading) return (
    <div className="vxc-card" style={{ padding: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <Spinner large label="CONNECTING INSTAGRAM…" />
    </div>
  );

  if (error) return (
    <div className="vxc-card" style={{ padding: 28 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ fontSize: 22 }}>⚠️</div>
        <div>
          <div style={{ fontWeight: 700, color: C.red, marginBottom: 6 }}>Connection Error</div>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{error}</div>
          <button className="vxc-btn vxc-btn-outline vxc-btn-sm" style={{ marginTop: 16 }} onClick={() => fetchData(token)}>Try Again</button>
        </div>
      </div>
    </div>
  );

  if (!data) return (
    <div className="vxc-card" style={{ padding: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Spinner label="LOADING DATA…" />
    </div>
  );

  const { account, posts } = data;

  return (
    <div>
      {/* Profile bar */}
      <div className="vxc-profile-bar">
        {account.profile_picture_url && (
          <img
            src={account.profile_picture_url}
            alt=""
            style={{ width: 62, height: 62, borderRadius: "50%", border: `2px solid ${C.teal}`, flexShrink: 0 }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: "0.04em" }}>@{account.username}</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{account.biography?.slice(0, 100)}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, textAlign: "center" }} className="vxc-profile-stats">
          {[["Followers", account.followers_count], ["Posts", account.media_count], ["Following", account.follows_count]].map(([l, v]) => (
            <div key={l} className="vxc-stat">
              <div className="vxc-stat-val">{v?.toLocaleString() ?? "—"}</div>
              <div className="vxc-stat-lbl">{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap" }}>
          <button className="vxc-btn vxc-btn-outline vxc-btn-sm" onClick={() => fetchData(token)} disabled={loading}>↻ Sync</button>
          <button className="vxc-btn vxc-btn-danger vxc-btn-sm" onClick={disconnect}>Disconnect</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="vxc-tabs">
        {["posts", "analysis"].map(tab => (
          <button key={tab} className={`vxc-tab${activeTab === tab ? " active" : ""}`} onClick={() => setActiveTab(tab)}>
            {tab === "posts" ? `Posts (${posts.length})` : "AI Analysis"}
          </button>
        ))}
      </div>

      {/* Posts grid */}
      {activeTab === "posts" && (
        <div className="vxc-post-grid">
          {posts.map(post => (
            <div key={post.id} className="vxc-post-card" onClick={() => openPost(post)}>
              <div style={{ width: "100%", paddingBottom: "100%", position: "relative", background: C.bg3 }}>
                <PostThumbnail post={post} />
                {post.media_type === "VIDEO" && (
                  <div style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.75)", borderRadius: 3, padding: "2px 6px", fontSize: 9, color: C.white, fontWeight: 700, letterSpacing: "0.1em", zIndex: 1 }}>
                    REEL
                  </div>
                )}
              </div>
              <div style={{ padding: "10px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: C.teal, fontWeight: 700 }}>❤ {post.like_count?.toLocaleString() || 0}</span>
                  <span style={{ fontSize: 12, color: C.muted }}>💬 {post.comments_count?.toLocaleString() || 0}</span>
                </div>
                <div style={{ fontSize: 11, color: C.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {post.caption?.slice(0, 42) || "No caption"}
                </div>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div style={{ gridColumn: "1/-1" }}>
              <div className="vxc-card">
                <div className="vxc-empty">
                  <div style={{ fontSize: 32 }}>📷</div>
                  <div style={{ fontSize: 13, color: C.muted }}>No posts found on this account.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Analysis tab */}
      {activeTab === "analysis" && (
        <div className="vxc-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div className="vxc-icon-box">🧠</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>Account Intelligence</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>@{account.username}</div>
              </div>
            </div>
            <button className="vxc-btn vxc-btn-primary vxc-btn-sm vxc-btn-full-m" onClick={runAnalysis} disabled={analysisLoading}>
              {analysisLoading ? <><div className="vxc-spinner" /> Analyzing…</> : analysis ? "Re-analyze" : "Run Analysis"}
            </button>
          </div>
          {analysisLoading ? (
            <div style={{ padding: "32px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Spinner large label="VANTIX ANALYZING ACCOUNT…" />
            </div>
          ) : analysis ? (
            <div className="vxc-output-text">{analysis}</div>
          ) : (
            <div className="vxc-empty">
              <div style={{ fontSize: 28 }}>📊</div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                Click "Run Analysis" to get account health score,<br />what's working, what to stop, and your next 5 reel ideas.
              </div>
            </div>
          )}
        </div>
      )}

      {/* Post detail modal */}
      {selectedPost && (
        <div className="vxc-modal">
          <div className="vxc-modal-inner">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, gap: 12 }}>
              <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: "0.06em", textTransform: "uppercase" }}>Post Intelligence</div>
              <button
                className="vxc-btn vxc-btn-outline vxc-btn-sm"
                onClick={() => { setSelectedPost(null); setPostInsights(null); }}
              >
                CLOSE ✕
              </button>
            </div>
            <div className="vxc-modal-grid">
              {/* Post media + stats */}
              <div className="vxc-card">
                {(() => {
                  const isVid = selectedPost.media_type === "VIDEO";
                  const src = isVid
                    ? (selectedPost.thumbnail_url || selectedPost.media_url)
                    : (selectedPost.media_url || selectedPost.thumbnail_url);
                  return src ? (
                    <img src={src} alt="" style={{ width: "100%", borderRadius: 6, marginBottom: 14 }} />
                  ) : (
                    <div style={{ width: "100%", aspectRatio: "1", background: C.bg3, borderRadius: 6, marginBottom: 14, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <div style={{ fontSize: 36 }}>🎬</div>
                      <div style={{ fontSize: 10, color: C.muted, letterSpacing: "0.12em", fontWeight: 700 }}>REEL</div>
                    </div>
                  );
                })()}
                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, marginBottom: 14 }}>
                  {selectedPost.caption?.slice(0, 200)}
                </div>
                {[
                  ["Likes", selectedPost.like_count, C.teal],
                  ["Comments", selectedPost.comments_count, C.gold],
                  ["Reach", postInsights?.reach, C.white],
                  ["Saves", postInsights?.saved, C.teal],
                  ["Views", postInsights?.video_views, C.gold],
                ].filter(([, v]) => v).map(([l, v, color], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 11, color: C.muted, letterSpacing: "0.08em" }}>{l}</span>
                    <span style={{ fontSize: 14, color, fontWeight: 800 }}>{parseInt(v).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              {/* Post analyzer */}
              <div className="vxc-card">
                <div style={{ fontWeight: 800, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: C.teal, marginBottom: 16 }}>POST ANALYSIS</div>
                <PostAnalyzer
                  post={selectedPost}
                  insights={postInsights}
                  clientNiche={client.niche || client.industry}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Connections Page ─── */

export default function VantixConnections() {
  const [client, setClient] = useState(null);
  const [token, setToken] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const clients = JSON.parse(localStorage.getItem("vx_clients") || "[]");
      const selectedId = localStorage.getItem("vx_selected_client_id");
      const found = clients.find(c => c.id === (selectedId ? JSON.parse(selectedId) : null)) || clients[0] || null;
      setClient(found);
      if (found) {
        const savedToken = localStorage.getItem(`vx_meta_token_${found.id}`);
        if (savedToken) setToken(JSON.parse(savedToken));
      }
    } catch {}
  }, []);

  if (!mounted) return null;

  return (
    <div className="vxc-root">
      <style>{CSS}</style>

      {/* Nav */}
      <nav className="vxc-nav">
        <div className="vxc-nav-logo">
          <div>
            <div style={{ fontWeight: 800, fontSize: 19, letterSpacing: "0.15em", color: C.teal, lineHeight: 1 }}>VANTIX</div>
            <div style={{ fontSize: 9, color: C.muted, letterSpacing: "0.18em", marginTop: 2 }}>CONNECTED ACCOUNTS</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginLeft: 6 }}>
            <div className="vxc-pulse-dot" />
            <span style={{ fontSize: 9, color: C.teal, letterSpacing: "0.14em", fontWeight: 700 }}>ONLINE</span>
          </div>
        </div>

        <div className="vxc-nav-right">
          {client && (
            <div style={{ fontSize: 13, color: C.muted, display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal, display: "inline-block" }} />
              {client.name}
            </div>
          )}
          <a href="/vantix" className="vxc-back-link">← BACK TO VANTIX</a>
        </div>
      </nav>

      {/* Content */}
      <main className="vxc-content">
        {!client ? (
          <div className="vxc-card" style={{ textAlign: "center", padding: "56px 32px", maxWidth: 520, margin: "0 auto" }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>👤</div>
            <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 10 }}>No Client Selected</div>
            <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 28 }}>
              Go to VANTIX → select a client → then come back here to connect their Instagram.
            </div>
            <a href="/vantix" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
              background: C.teal, color: "#050d1a", fontWeight: 700, fontSize: 12,
              letterSpacing: "0.12em", borderRadius: 5, textDecoration: "none",
            }}>
              GO TO VANTIX ›
            </a>
          </div>
        ) : !token ? (
          <ConnectInstagram clientId={client.id} onConnected={setToken} />
        ) : (
          <InstagramDashboard client={client} token={token} />
        )}
      </main>
    </div>
  );
}
