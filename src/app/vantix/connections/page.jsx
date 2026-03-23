"use client";
import { useState, useEffect } from "react";

const META_APP_ID = "2104051133749518";
const REDIRECT_URI = "https://valmontmarketing.com/vantix/auth/callback";

const C = {
  bg: "#040810", bg1: "#070d1a", bg2: "#0b1424", bg3: "#0f1c30",
  teal: "#00D4B4", tealLo: "rgba(0,212,180,0.10)", tealMd: "rgba(0,212,180,0.20)",
  gold: "#C8A96E", red: "#FF5060", white: "#E8EDF5", dim: "#7A8BA8",
  border: "rgba(0,212,180,0.10)", borderHi: "rgba(0,212,180,0.28)",
};
const font = { display: "'Rajdhani', sans-serif", body: "'Outfit', sans-serif", mono: "'Space Mono', monospace" };

const LS = {
  get: (k, d = null) => { try { const v = localStorage.getItem("vx_" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem("vx_" + k, JSON.stringify(v)); } catch {} },
};

const Card = ({ children, style = {} }) => (
  <div style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 4, padding: "20px 22px", ...style }}>{children}</div>
);

const Btn = ({ children, onClick, variant = "primary", small, disabled, full }) => (
  <button onClick={onClick} disabled={disabled} style={{
    fontFamily: font.display, fontWeight: 600, fontSize: small ? 11 : 12,
    letterSpacing: "0.18em", textTransform: "uppercase", cursor: disabled ? "not-allowed" : "pointer",
    padding: small ? "8px 16px" : "12px 24px", borderRadius: 3,
    background: variant === "primary" ? C.teal : variant === "red" ? C.red : C.bg3,
    color: variant === "ghost" ? C.dim : C.bg,
    border: variant === "ghost" ? `1px solid ${C.border}` : "none",
    opacity: disabled ? 0.5 : 1, width: full ? "100%" : "auto", transition: "all 0.2s",
  }}>{children}</button>
);

const Spinner = ({ label = "LOADING..." }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.teal, fontFamily: font.mono, fontSize: 11, letterSpacing: "0.2em" }}>
    <div style={{ width: 14, height: 14, border: `2px solid ${C.tealLo}`, borderTopColor: C.teal, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
    {label}
  </div>
);

async function analyzeWithVantix(systemPrompt, userMessage) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });
  const data = await res.json();
  return (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
}

async function getConnectedAccounts(accessToken) {
  const res = await fetch(`https://graph.facebook.com/v18.0/me/accounts?fields=id,name,instagram_business_account,access_token&access_token=${accessToken}`);
  return res.json();
}

async function getIGAccount(igId, pageToken) {
  const fields = "id,name,username,followers_count,follows_count,media_count,profile_picture_url,biography";
  const res = await fetch(`https://graph.facebook.com/v18.0/${igId}?fields=${fields}&access_token=${pageToken}`);
  return res.json();
}

async function getIGPosts(igId, pageToken) {
  const fields = "id,caption,media_type,media_url,thumbnail_url,timestamp,like_count,comments_count,permalink";
  const res = await fetch(`https://graph.facebook.com/v18.0/${igId}/media?fields=${fields}&limit=24&access_token=${pageToken}`);
  return res.json();
}

async function getPostInsights(postId, pageToken) {
  const res = await fetch(`https://graph.facebook.com/v18.0/${postId}/insights?metric=impressions,reach,saved,video_views&access_token=${pageToken}`);
  return res.json();
}

function ConnectInstagram({ clientId, onConnected }) {
  const handleConnect = () => {
    const PERMISSIONS = "instagram_business_basic,pages_show_list,pages_read_engagement";
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
    <Card style={{ textAlign: "center", padding: "48px 24px" }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>📱</div>
      <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Connect Instagram & Facebook</div>
      <div style={{ fontSize: 13, color: C.dim, lineHeight: 1.7, maxWidth: 360, margin: "0 auto 24px" }}>
        Connect your client's Instagram Business account to automatically pull posts, insights, reach, and engagement data into VANTIX.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: 280, margin: "0 auto 24px" }}>
        {["✓ Posts + performance auto-synced", "✓ Real follower & reach analytics", "✓ AI analyzes everything automatically", "✓ Client keeps full account control"].map((t, i) => (
          <div key={i} style={{ fontSize: 12, color: C.teal, textAlign: "left" }}>{t}</div>
        ))}
      </div>
      <button onClick={handleConnect} style={{
        padding: "12px 28px", borderRadius: 3, border: "none", cursor: "pointer",
        background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
        color: "#fff", fontFamily: font.display, fontWeight: 600, fontSize: 13, letterSpacing: "0.15em",
      }}>Connect with Instagram</button>
      <div style={{ fontSize: 11, color: C.dim, marginTop: 12 }}>Secure OAuth — we never see passwords</div>
      {META_APP_ID === "YOUR_FACEBOOK_APP_ID" && (
        <div style={{ marginTop: 16, padding: "10px", background: "rgba(200,169,110,0.1)", border: "1px solid rgba(200,169,110,0.3)", borderRadius: 3, fontSize: 11, color: C.gold }}>
          ⚠ Add your Facebook App ID to enable connection
        </div>
      )}
    </Card>
  );
}

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
      const pages = await getConnectedAccounts(accessToken);
      if (!pages.data?.length) throw new Error("No Facebook Pages found. Make sure the account has a Facebook Page.");
      const pageWithIG = pages.data.find(p => p.instagram_business_account);
      if (!pageWithIG) throw new Error("No Instagram Business account found. Switch Instagram to Business or Creator mode first.");
      const igId = pageWithIG.instagram_business_account.id;
      const pageToken = pageWithIG.access_token;
      const account = await getIGAccount(igId, pageToken);
      const postsData = await getIGPosts(igId, pageToken);
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
        const ins = await getPostInsights(post.id, data.pageToken);
        const insMap = {};
        (ins.data || []).forEach(m => { insMap[m.name] = m.values?.[0]?.value; });
        setPostInsights(insMap);
      } catch { setPostInsights({}); }
    }
  };

  const runAnalysis = async () => {
    if (!data?.posts?.length) return;
    setAnalysisLoading(true);
    const topPosts = [...data.posts].sort((a, b) => (b.like_count + b.comments_count) - (a.like_count + a.comments_count)).slice(0, 10);
    const postsStr = topPosts.map(p => `[${new Date(p.timestamp).toLocaleDateString()}] ${p.media_type} | Likes:${p.like_count} Comments:${p.comments_count} | "${p.caption?.slice(0, 80)}"`).join("\n");
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
    if (window.confirm("Disconnect this account?")) {
      LS.set(`meta_token_${client.id}`, null);
      LS.set(cacheKey, null);
      window.location.reload();
    }
  };

  if (loading) return <Card style={{ padding: 40, textAlign: "center" }}><Spinner label="CONNECTING INSTAGRAM..." /></Card>;
  if (error) return <Card><div style={{ color: C.red, padding: 16, fontSize: 13 }}>⚠ {error}</div></Card>;
  if (!data) return <Card style={{ padding: 40, textAlign: "center" }}><Spinner label="LOADING DATA..." /></Card>;

  const { account, posts } = data;

  return (
    <div>
      {/* Profile */}
      <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 20, padding: "16px 20px", background: C.bg1, borderRadius: 4, border: `1px solid ${C.border}` }}>
        {account.profile_picture_url && <img src={account.profile_picture_url} alt="" style={{ width: 60, height: 60, borderRadius: "50%", border: `2px solid ${C.teal}` }} />}
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 20 }}>@{account.username}</div>
          <div style={{ fontSize: 12, color: C.dim }}>{account.biography?.slice(0, 100)}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, textAlign: "center" }}>
          {[["Followers", account.followers_count], ["Posts", account.media_count], ["Following", account.follows_count]].map(([l, v]) => (
            <div key={l}><div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 24, color: C.teal }}>{v?.toLocaleString()}</div><div style={{ fontSize: 9, color: C.dim, fontFamily: font.mono, letterSpacing: "0.15em" }}>{l}</div></div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn small variant="ghost" onClick={() => fetchData(token)} disabled={loading}>↻ Sync</Btn>
          <Btn small variant="red" onClick={disconnect}>Disconnect</Btn>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["posts", "analysis"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: "8px 18px", borderRadius: 3, cursor: "pointer", fontFamily: font.mono,
            fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", border: "none",
            background: activeTab === tab ? C.teal : C.bg2, color: activeTab === tab ? C.bg : C.dim,
          }}>{tab}</button>
        ))}
      </div>

      {/* Posts grid */}
      {activeTab === "posts" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 10 }}>
          {posts.map(post => (
            <div key={post.id} onClick={() => openPost(post)} style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 4, cursor: "pointer", overflow: "hidden" }}>
              <div style={{ width: "100%", paddingBottom: "100%", position: "relative", background: C.bg3 }}>
                {(post.media_url || post.thumbnail_url) && <img src={post.media_url || post.thumbnail_url} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
                {post.media_type === "VIDEO" && <div style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.7)", borderRadius: 2, padding: "2px 5px", fontSize: 8, fontFamily: font.mono, color: C.white }}>REEL</div>}
              </div>
              <div style={{ padding: "8px 10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, color: C.teal }}>❤ {post.like_count?.toLocaleString() || 0}</span>
                  <span style={{ fontSize: 11, color: C.dim }}>💬 {post.comments_count?.toLocaleString() || 0}</span>
                </div>
                <div style={{ fontSize: 10, color: C.dim, marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.caption?.slice(0, 40) || "No caption"}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analysis tab */}
      {activeTab === "analysis" && (
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: "0.3em", color: C.dim }}>VANTIX ACCOUNT INTELLIGENCE</div>
            <Btn small onClick={runAnalysis} disabled={analysisLoading}>{analysisLoading ? "Analyzing..." : analysis ? "Re-analyze" : "Run Analysis"}</Btn>
          </div>
          {analysisLoading ? <Spinner label="VANTIX ANALYZING..." /> : (
            analysis ? <div style={{ fontSize: 13, color: "rgba(232,237,245,0.85)", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{analysis}</div>
            : <div style={{ textAlign: "center", padding: "40px 0", color: C.dim, fontFamily: font.mono, fontSize: 11, lineHeight: 1.9 }}>Click "Run Analysis" to get account health score,<br />what's working, what to stop, and your next 5 reel ideas.</div>
          )}
        </Card>
      )}

      {/* Post modal */}
      {selectedPost && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(4,8,16,0.97)", zIndex: 100, overflowY: "auto", padding: 24 }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 18 }}>POST INTELLIGENCE</div>
              <button onClick={() => { setSelectedPost(null); setPostInsights(null); }} style={{ background: "none", border: `1px solid ${C.border}`, color: C.dim, padding: "8px 16px", borderRadius: 3, cursor: "pointer", fontFamily: font.mono, fontSize: 11 }}>CLOSE</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 16 }}>
              <Card>
                {(selectedPost.media_url || selectedPost.thumbnail_url) && <img src={selectedPost.media_url || selectedPost.thumbnail_url} alt="" style={{ width: "100%", borderRadius: 3, marginBottom: 12 }} />}
                <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.6, marginBottom: 12 }}>{selectedPost.caption?.slice(0, 200)}</div>
                {[["Likes", selectedPost.like_count, C.teal], ["Comments", selectedPost.comments_count, C.gold], ["Reach", postInsights?.reach, C.white], ["Saves", postInsights?.saved, C.teal], ["Views", postInsights?.video_views, C.gold]].filter(([, v]) => v).map(([l, v, color], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 11, color: C.dim, fontFamily: font.mono }}>{l}</span>
                    <span style={{ fontSize: 13, color, fontWeight: 600 }}>{parseInt(v).toLocaleString()}</span>
                  </div>
                ))}
              </Card>
              <Card>
                <div style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: "0.3em", color: C.dim, marginBottom: 12 }}>POST ANALYSIS — Click to analyze</div>
                <PostAnalyzer post={selectedPost} insights={postInsights} clientNiche={client.niche || client.industry} />
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
        `You are VANTIX Content Strategy. Generate specific content ideas based on what worked.`,
        `Based on this post (${post.media_type}, ${post.like_count} likes, ${post.comments_count} comments, caption: "${post.caption?.slice(0, 100)}") for niche: ${clientNiche}\n\n1. 5 specific reel ideas that will outperform this\n2. Best hook for the top idea (write it fully)\n3. Best day and time to post`
      );
      setIdeas(text);
    } catch { setIdeas("Error. Try again."); }
    setIdeasLoading(false);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Btn small onClick={analyze} disabled={loading}>{loading ? "Analyzing..." : "Analyze Post"}</Btn>
        <Btn small variant="ghost" onClick={generateIdeas} disabled={ideasLoading}>{ideasLoading ? "..." : "Next Ideas"}</Btn>
      </div>
      {loading ? <Spinner /> : analysis && <div style={{ fontSize: 12, color: "rgba(232,237,245,0.85)", lineHeight: 1.85, whiteSpace: "pre-wrap", marginBottom: 16 }}>{analysis}</div>}
      {ideasLoading ? <Spinner label="GENERATING IDEAS..." /> : ideas && <div style={{ fontSize: 12, color: "rgba(232,237,245,0.85)", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{ideas}</div>}
      {!analysis && !ideas && !loading && !ideasLoading && <div style={{ color: C.dim, fontSize: 12 }}>Click Analyze Post for full breakdown, or Next Ideas for content recommendations.</div>}
    </div>
  );
}

export default function VantixConnections() {
  const [client, setClient] = useState(null);
  const [token, setToken] = useState(null);
  const [platform, setPlatform] = useState("instagram");
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
    <div style={{ fontFamily: font.body, background: C.bg, minHeight: "100vh", color: C.white }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } * { box-sizing: border-box; } body { margin: 0; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: rgba(0,212,180,0.2); border-radius: 2px; } select option { background: #0b1424; }`}</style>

      <div style={{ background: C.bg1, borderBottom: `1px solid ${C.border}`, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 17, letterSpacing: "0.08em" }}>CONNECTED ACCOUNTS</div>
          <div style={{ fontSize: 11, color: C.dim, marginTop: 2, fontFamily: font.mono }}>{client ? `Client: ${client.name}` : "Select a client in VANTIX first"}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal, boxShadow: `0 0 8px ${C.teal}` }} />
          <span style={{ fontFamily: font.mono, fontSize: 9, color: C.teal, letterSpacing: "0.2em" }}>VANTIX ONLINE</span>
        </div>
      </div>

      <div style={{ padding: 28, maxWidth: 1100 }}>
        {!client ? (
          <Card style={{ textAlign: "center", padding: 48 }}>
            <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 20, marginBottom: 10 }}>NO CLIENT SELECTED</div>
            <div style={{ color: C.dim, fontSize: 13 }}>Go to VANTIX → select a client → then come back here to connect their Instagram.</div>
            <div style={{ marginTop: 16 }}>
              <a href="/vantix" style={{ color: C.teal, fontSize: 13, textDecoration: "none", fontFamily: font.mono, letterSpacing: "0.1em" }}>← BACK TO VANTIX</a>
            </div>
          </Card>
        ) : !token ? (
          <ConnectInstagram clientId={client.id} onConnected={setToken} />
        ) : (
          <InstagramDashboard client={client} token={token} />
        )}
      </div>
    </div>
  );
}
