import { useState, useEffect } from "react";

// ─── CONFIG — PASTE YOUR APP ID HERE ──────────────────────────────
const META_APP_ID = "2104051133749518"; // Replace this with your App ID
const REDIRECT_URI = "https://valmontmarketing.com/vantix/auth/callback";

// Permissions we request from the client
const PERMISSIONS = [
  "instagram_basic",
  "instagram_manage_insights",
  "pages_show_list",
  "pages_read_engagement",
  "read_insights",
].join(",");

// ─── THEME ────────────────────────────────────────────────────────
const C = {
  bg: "#040810", bg1: "#070d1a", bg2: "#0b1424", bg3: "#0f1c30",
  teal: "#00D4B4", tealLo: "rgba(0,212,180,0.10)", tealMd: "rgba(0,212,180,0.20)",
  gold: "#C8A96E", goldLo: "rgba(200,169,110,0.10)",
  red: "#FF5060", redLo: "rgba(255,80,96,0.10)",
  white: "#E8EDF5", dim: "#7A8BA8",
  border: "rgba(0,212,180,0.10)", borderHi: "rgba(0,212,180,0.28)",
  instagram: "#E1306C", facebook: "#1877F2", youtube: "#FF0000",
};

const font = {
  display: "'Rajdhani', sans-serif",
  body: "'Outfit', sans-serif",
  mono: "'Space Mono', monospace",
};

// ─── LOCAL STORAGE ─────────────────────────────────────────────────
const LS = {
  get: (k, d = null) => { try { const v = localStorage.getItem("vx_" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem("vx_" + k, JSON.stringify(v)); } catch {} },
};

// ─── API HELPERS ───────────────────────────────────────────────────

// Exchange short-lived token for long-lived token (call from your backend ideally)
async function getLongLivedToken(shortToken) {
  // NOTE: In production, this should go through your backend to protect App Secret
  // For now this shows the flow — move to a Vercel serverless function later
  const res = await fetch(
    `https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${META_APP_ID}&client_secret=YOUR_APP_SECRET_HERE&fb_exchange_token=${shortToken}`
  );
  const data = await res.json();
  return data.access_token || shortToken;
}

// Get all Facebook Pages + connected Instagram accounts
async function getConnectedAccounts(accessToken) {
  const res = await fetch(
    `https://graph.facebook.com/v18.0/me/accounts?fields=id,name,instagram_business_account,access_token&access_token=${accessToken}`
  );
  return res.json();
}

// Get Instagram account details
async function getIGAccount(igId, pageToken) {
  const fields = "id,name,username,followers_count,follows_count,media_count,profile_picture_url,biography,website";
  const res = await fetch(
    `https://graph.facebook.com/v18.0/${igId}?fields=${fields}&access_token=${pageToken}`
  );
  return res.json();
}

// Get Instagram posts with insights
async function getIGPosts(igId, pageToken, limit = 25) {
  const fields = "id,caption,media_type,media_url,thumbnail_url,timestamp,like_count,comments_count,permalink";
  const res = await fetch(
    `https://graph.facebook.com/v18.0/${igId}/media?fields=${fields}&limit=${limit}&access_token=${pageToken}`
  );
  return res.json();
}

// Get insights for a specific post
async function getPostInsights(postId, pageToken) {
  const metrics = "impressions,reach,saved,video_views,plays";
  const res = await fetch(
    `https://graph.facebook.com/v18.0/${postId}/insights?metric=${metrics}&access_token=${pageToken}`
  );
  return res.json();
}

// Get account-level insights
async function getAccountInsights(igId, pageToken, period = "day", days = 30) {
  const since = Math.floor(Date.now() / 1000) - days * 24 * 60 * 60;
  const metrics = "impressions,reach,follower_count,profile_views";
  const res = await fetch(
    `https://graph.facebook.com/v18.0/${igId}/insights?metric=${metrics}&period=${period}&since=${since}&access_token=${pageToken}`
  );
  return res.json();
}

// Get audience demographics
async function getAudienceInsights(igId, pageToken) {
  const metrics = "audience_city,audience_country,audience_gender_age,audience_locale";
  const res = await fetch(
    `https://graph.facebook.com/v18.0/${igId}/insights?metric=${metrics}&period=lifetime&access_token=${pageToken}`
  );
  return res.json();
}

// VANTIX AI Analysis
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

// ─── SHARED UI ─────────────────────────────────────────────────────
const Label = ({ c }) => (
  <div style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: C.dim, marginBottom: 7 }}>{c}</div>
);

const Btn = ({ children, onClick, variant = "primary", small, disabled, full }) => (
  <button onClick={onClick} disabled={disabled} style={{
    fontFamily: font.display, fontWeight: 600, fontSize: small ? 11 : 12,
    letterSpacing: "0.18em", textTransform: "uppercase", cursor: disabled ? "not-allowed" : "pointer",
    padding: small ? "8px 16px" : "12px 24px", borderRadius: 3, border: "none",
    background: variant === "primary" ? C.teal : variant === "red" ? C.red : variant === "instagram" ? "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" : C.bg3,
    color: variant === "ghost" ? C.dim : C.bg,
    border: variant === "ghost" ? `1px solid ${C.border}` : "none",
    opacity: disabled ? 0.5 : 1, width: full ? "100%" : "auto",
    transition: "all 0.2s", boxShadow: variant === "primary" ? `0 0 20px ${C.tealMd}` : "none",
  }}>{children}</button>
);

const Card = ({ children, style = {}, color }) => (
  <div style={{
    background: C.bg2,
    border: `1px solid ${color ? color + "30" : C.border}`,
    borderRadius: 4, padding: "20px 22px", ...style,
  }}>{children}</div>
);

const Spinner = ({ label = "LOADING..." }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.teal, fontFamily: font.mono, fontSize: 11, letterSpacing: "0.2em" }}>
    <div style={{ width: 14, height: 14, border: `2px solid ${C.tealLo}`, borderTopColor: C.teal, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
    {label}
  </div>
);

const StatBox = ({ num, label, sub, color = C.teal }) => (
  <div style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 4, padding: "16px 18px" }}>
    <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 30, color, lineHeight: 1 }}>{num}</div>
    <div style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: C.dim, marginTop: 6 }}>{label}</div>
    {sub && <div style={{ fontSize: 10, color: sub.positive ? C.teal : C.red, marginTop: 4 }}>{sub.positive ? "↑" : "↓"} {sub.text}</div>}
  </div>
);

// ─── CONNECT BUTTON ────────────────────────────────────────────────
function ConnectInstagram({ clientId, onConnected }) {
  const handleConnect = () => {
    // Build OAuth URL
    const oauthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${META_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${PERMISSIONS}&response_type=code&state=${clientId}`;
    
    // Open OAuth popup
    const popup = window.open(oauthUrl, "Connect Instagram", "width=600,height=700,scrollbars=yes");
    
    // Listen for the callback
    const listener = window.addEventListener("message", async (event) => {
      if (event.data?.type === "VANTIX_AUTH_SUCCESS") {
        const { accessToken, state } = event.data;
        if (state === clientId) {
          // Save token
          LS.set(`meta_token_${clientId}`, accessToken);
          window.removeEventListener("message", listener);
          popup?.close();
          if (onConnected) onConnected(accessToken);
        }
      }
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "32px 24px" }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>📱</div>
      <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
        Connect Instagram & Facebook
      </div>
      <div style={{ fontSize: 13, color: C.dim, lineHeight: 1.7, marginBottom: 24, maxWidth: 360, margin: "0 auto 24px" }}>
        Connect your client's Instagram Business or Creator account to automatically pull posts, insights, reach, engagement, and audience data into VANTIX.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 280, margin: "0 auto 20px" }}>
        {[
          "✓ Posts + performance data auto-synced",
          "✓ Real follower & reach analytics",
          "✓ Audience demographics",
          "✓ AI analyzes everything automatically",
          "✓ Client keeps full control of their account",
        ].map((t, i) => (
          <div key={i} style={{ fontSize: 12, color: C.teal, textAlign: "left" }}>{t}</div>
        ))}
      </div>
      <Btn variant="instagram" onClick={handleConnect}>
        Connect with Instagram
      </Btn>
      <div style={{ fontSize: 11, color: C.dim, marginTop: 12 }}>
        Secure OAuth — we never see passwords
      </div>
    </div>
  );
}

// ─── ACCOUNT OVERVIEW ─────────────────────────────────────────────
function AccountOverview({ account, insights }) {
  if (!account) return null;

  const followerData = insights?.follower_count?.values || [];
  const reachData = insights?.reach?.values || [];

  const totalReach = reachData.reduce((s, d) => s + (d.value || 0), 0);
  const lastFollowers = followerData[followerData.length - 1]?.value || account.followers_count;
  const prevFollowers = followerData[0]?.value || account.followers_count;
  const followerGrowth = lastFollowers - prevFollowers;

  return (
    <div>
      {/* Profile header */}
      <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 24, padding: "18px 22px", background: C.bg1, borderRadius: 4, border: `1px solid ${C.border}` }}>
        {account.profile_picture_url && (
          <img src={account.profile_picture_url} alt="" style={{ width: 64, height: 64, borderRadius: "50%", border: `2px solid ${C.teal}` }} />
        )}
        <div>
          <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 22 }}>@{account.username}</div>
          <div style={{ fontSize: 13, color: C.dim, marginTop: 2 }}>{account.name}</div>
          {account.biography && <div style={{ fontSize: 12, color: C.dim, marginTop: 4, maxWidth: 400 }}>{account.biography}</div>}
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 28, color: C.teal }}>{account.followers_count?.toLocaleString()}</div>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.dim, letterSpacing: "0.2em" }}>FOLLOWERS</div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <StatBox num={account.followers_count?.toLocaleString() || "—"} label="Followers" sub={followerGrowth ? { positive: followerGrowth > 0, text: `${Math.abs(followerGrowth)} this month` } : null} />
        <StatBox num={account.media_count?.toLocaleString() || "—"} label="Total Posts" color={C.gold} />
        <StatBox num={totalReach?.toLocaleString() || "—"} label="30-Day Reach" color={C.white} />
        <StatBox num={account.follows_count?.toLocaleString() || "—"} label="Following" color={C.dim} />
      </div>
    </div>
  );
}

// ─── POSTS GRID ────────────────────────────────────────────────────
function PostsGrid({ posts, onSelectPost }) {
  if (!posts?.length) return (
    <Card><div style={{ textAlign: "center", padding: 32, color: C.dim }}>No posts found.</div></Card>
  );

  return (
    <div>
      <div style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: C.dim, marginBottom: 12 }}>
        RECENT POSTS ({posts.length})
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
        {posts.map(post => (
          <div
            key={post.id}
            onClick={() => onSelectPost(post)}
            style={{
              background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 4,
              cursor: "pointer", overflow: "hidden", transition: "border 0.2s",
            }}
          >
            {/* Media */}
            <div style={{ width: "100%", paddingBottom: "100%", position: "relative", background: C.bg3 }}>
              {(post.media_url || post.thumbnail_url) && (
                <img
                  src={post.media_url || post.thumbnail_url}
                  alt=""
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
              {post.media_type === "VIDEO" && (
                <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.6)", borderRadius: 3, padding: "2px 6px", fontSize: 9, fontFamily: font.mono, color: C.white }}>
                  REEL
                </div>
              )}
              {post.media_type === "CAROUSEL_ALBUM" && (
                <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.6)", borderRadius: 3, padding: "2px 6px", fontSize: 9, fontFamily: font.mono, color: C.white }}>
                  CAROUSEL
                </div>
              )}
            </div>

            {/* Stats */}
            <div style={{ padding: "10px 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: C.white }}>❤ {post.like_count?.toLocaleString() || 0}</span>
                <span style={{ fontSize: 12, color: C.dim }}>💬 {post.comments_count?.toLocaleString() || 0}</span>
              </div>
              <div style={{ fontSize: 10, color: C.dim, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {post.caption?.slice(0, 50) || "No caption"}
              </div>
              <div style={{ fontSize: 9, color: C.dim, marginTop: 4, fontFamily: font.mono }}>
                {new Date(post.timestamp).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── POST DETAIL + AI ANALYSIS ────────────────────────────────────
function PostDetail({ post, insights, clientProfile, onClose }) {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextIdeas, setNextIdeas] = useState("");
  const [ideasLoading, setIdeasLoading] = useState(false);

  const analyze = async () => {
    if (!post) return;
    setLoading(true);
    const engagementRate = post.like_count && insights?.reach
      ? ((post.like_count + post.comments_count) / insights.reach * 100).toFixed(2)
      : "Unknown";

    try {
      const text = await analyzeWithVantix(
        `You are VANTIX Post Intelligence. Analyze social media post performance with precision. Client niche: ${clientProfile?.niche || "general"}. Be specific, not generic.`,
        `Analyze this Instagram post:

TYPE: ${post.media_type}
DATE: ${new Date(post.timestamp).toLocaleDateString()}
CAPTION (first 200 chars): ${post.caption?.slice(0, 200) || "None"}

PERFORMANCE DATA:
- Likes: ${post.like_count || 0}
- Comments: ${post.comments_count || 0}
- Reach: ${insights?.reach || "Unknown"}
- Impressions: ${insights?.impressions || "Unknown"}
- Saves: ${insights?.saved || "Unknown"}
- Views: ${insights?.video_views || insights?.plays || "N/A"}
- Engagement Rate: ${engagementRate}%

CLIENT NICHE: ${clientProfile?.niche || "general"}
TARGET AUDIENCE: ${clientProfile?.target || "general"}

Analyze:
1. PERFORMANCE VERDICT — did this post over or underperform? Why?
2. WHAT WORKED — specific elements that drove engagement
3. WHAT FAILED — what held it back
4. CAPTION ANALYSIS — hook quality, readability, CTA effectiveness
5. CONTENT TYPE VERDICT — was this the right format for this topic?
6. ALGORITHM SIGNALS — what does this data tell us about how the algorithm treated it?
7. ONE THING TO CHANGE — the single highest-impact improvement for next time`
      );
      setAnalysis(text);
    } catch (e) {
      setAnalysis("Analysis error. Try again.");
    }
    setLoading(false);
  };

  const generateNextIdeas = async () => {
    setIdeasLoading(true);
    try {
      const text = await analyzeWithVantix(
        `You are VANTIX Content Strategy. You generate specific, high-performing content ideas based on what has already worked. Be precise and creative.`,
        `Based on this post's performance, generate next content ideas:

ORIGINAL POST:
Type: ${post.media_type}
Caption: ${post.caption?.slice(0, 200) || "None"}
Likes: ${post.like_count}, Comments: ${post.comments_count}, Saves: ${insights?.saved || "unknown"}

CLIENT NICHE: ${clientProfile?.niche || "general"}

Generate:
1. 5 IMMEDIATE REEL IDEAS — specific topics that will outperform this post
2. 3 CAROUSEL IDEAS — value-packed topics based on what this audience engaged with
3. 1 VIRAL ANGLE — a contrarian or unexpected take that could explode for this niche
4. BEST HOOK for the top reel idea (write it out fully)
5. POSTING RECOMMENDATION — exact day and time based on this content type

Make ideas specific enough to execute tomorrow. No vague topics.`
      );
      setNextIdeas(text);
    } catch (e) {
      setNextIdeas("Error generating ideas.");
    }
    setIdeasLoading(false);
  };

  const engRate = post.like_count && insights?.reach
    ? ((post.like_count + (post.comments_count || 0)) / insights.reach * 100).toFixed(2)
    : null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(4,8,16,0.95)", zIndex: 100, overflowY: "auto", padding: 24 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 18, letterSpacing: "0.1em" }}>POST INTELLIGENCE</div>
          <button onClick={onClose} style={{ background: "none", border: `1px solid ${C.border}`, color: C.dim, padding: "8px 16px", borderRadius: 3, cursor: "pointer", fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em" }}>
            CLOSE
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
          {/* Post preview */}
          <div>
            <Card>
              {(post.media_url || post.thumbnail_url) && (
                <img src={post.media_url || post.thumbnail_url} alt="" style={{ width: "100%", borderRadius: 3, marginBottom: 12 }} />
              )}
              <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.7, marginBottom: 12 }}>{post.caption?.slice(0, 200)}</div>
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
                {[
                  ["Likes", post.like_count, C.teal],
                  ["Comments", post.comments_count, C.gold],
                  ["Reach", insights?.reach, C.white],
                  ["Impressions", insights?.impressions, C.dim],
                  ["Saves", insights?.saved, C.teal],
                  ["Views", insights?.video_views || insights?.plays, C.gold],
                  engRate ? ["Eng. Rate", engRate + "%", engRate > 3 ? C.teal : engRate > 1 ? C.gold : C.red] : null,
                ].filter(Boolean).map(([label, val, color], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 11, color: C.dim, fontFamily: font.mono }}>{label}</span>
                    <span style={{ fontSize: 13, color, fontWeight: 600 }}>{val?.toLocaleString() || "—"}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Analysis */}
          <div>
            <Card style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: "0.3em", color: C.dim }}>AI POST ANALYSIS</div>
                <Btn small onClick={analyze} disabled={loading}>{loading ? "Analyzing..." : "Analyze Post"}</Btn>
              </div>
              {loading ? <Spinner label="VANTIX ANALYZING..." /> : (
                analysis
                  ? <div style={{ fontSize: 13, color: "rgba(232,237,245,0.85)", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{analysis}</div>
                  : <div style={{ color: C.dim, fontSize: 12 }}>Click "Analyze Post" to get a full breakdown of why this post performed the way it did.</div>
              )}
            </Card>

            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: "0.3em", color: C.dim }}>NEXT CONTENT IDEAS</div>
                <Btn small variant="ghost" onClick={generateNextIdeas} disabled={ideasLoading}>
                  {ideasLoading ? "Generating..." : "Generate Ideas"}
                </Btn>
              </div>
              {ideasLoading ? <Spinner label="GENERATING IDEAS..." /> : (
                nextIdeas
                  ? <div style={{ fontSize: 13, color: "rgba(232,237,245,0.85)", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{nextIdeas}</div>
                  : <div style={{ color: C.dim, fontSize: 12 }}>Based on this post's performance, VANTIX will generate your next 5 reel ideas, 3 carousels, and one viral angle.</div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN INSTAGRAM DASHBOARD ─────────────────────────────────────
function InstagramDashboard({ client }) {
  const tokenKey = `meta_token_${client.id}`;
  const cacheKey = `ig_data_${client.id}`;

  const [token, setToken] = useState(LS.get(tokenKey, null));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(LS.get(cacheKey, null));
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedInsights, setSelectedInsights] = useState(null);
  const [overallAnalysis, setOverallAnalysis] = useState(LS.get(`ig_analysis_${client.id}`, ""));
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [lastSync, setLastSync] = useState(LS.get(`ig_sync_${client.id}`, null));

  const fetchData = async (accessToken) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Get FB pages + IG accounts
      const pages = await getConnectedAccounts(accessToken);
      if (!pages.data?.length) throw new Error("No Facebook Pages found. Make sure the account has a Facebook Page connected to Instagram.");

      // Find page with Instagram business account
      const pageWithIG = pages.data.find(p => p.instagram_business_account);
      if (!pageWithIG) throw new Error("No Instagram Business/Creator account found. The Instagram account must be set to Business or Creator mode in Instagram settings.");

      const igId = pageWithIG.instagram_business_account.id;
      const pageToken = pageWithIG.access_token;

      // 2. Get IG profile
      const account = await getIGAccount(igId, pageToken);

      // 3. Get posts
      const postsData = await getIGPosts(igId, pageToken, 24);

      // 4. Get account insights
      let insights = {};
      try {
        const insightsData = await getAccountInsights(igId, pageToken);
        if (insightsData.data) {
          insightsData.data.forEach(metric => { insights[metric.name] = metric; });
        }
      } catch (e) { /* insights might not be available */ }

      // 5. Get audience data
      let audience = {};
      try {
        const audienceData = await getAudienceInsights(igId, pageToken);
        if (audienceData.data) {
          audienceData.data.forEach(metric => { audience[metric.name] = metric.values?.[0]?.value; });
        }
      } catch (e) { /* audience might not be available */ }

      const result = {
        account, posts: postsData.data || [],
        insights, audience, igId, pageToken,
        fetchedAt: new Date().toISOString()
      };

      setData(result);
      LS.set(cacheKey, result);
      LS.set(`ig_sync_${client.id}`, new Date().toISOString());
      setLastSync(new Date().toISOString());

    } catch (err) {
      setError(err.message || "Connection error. Try reconnecting.");
    }
    setLoading(false);
  };

  const handleConnected = async (accessToken) => {
    setToken(accessToken);
    LS.set(tokenKey, accessToken);
    await fetchData(accessToken);
  };

  const openPostDetail = async (post) => {
    setSelectedPost(post);
    // Fetch post-level insights
    if (data?.pageToken) {
      try {
        const insightData = await getPostInsights(post.id, data.pageToken);
        const ins = {};
        (insightData.data || []).forEach(m => { ins[m.name] = m.values?.[0]?.value; });
        setSelectedInsights(ins);
      } catch (e) { setSelectedInsights({}); }
    }
  };

  const runOverallAnalysis = async () => {
    if (!data?.posts?.length) return;
    setAnalysisLoading(true);
    const topPosts = data.posts
      .sort((a, b) => (b.like_count + b.comments_count) - (a.like_count + a.comments_count))
      .slice(0, 10);

    const postsStr = topPosts.map(p =>
      `[${new Date(p.timestamp).toLocaleDateString()}] ${p.media_type} | Likes:${p.like_count} Comments:${p.comments_count} | "${p.caption?.slice(0, 80)}"`
    ).join("\n");

    try {
      const text = await analyzeWithVantix(
        `You are VANTIX Account Intelligence. You analyze entire Instagram account performance and build growth strategies. Client: ${client.name}. Niche: ${client.niche || client.industry}.`,
        `Analyze this Instagram account's complete performance:

ACCOUNT: @${data.account.username}
FOLLOWERS: ${data.account.followers_count?.toLocaleString()}
TOTAL POSTS: ${data.account.media_count}
CLIENT NICHE: ${client.niche || client.industry}
TARGET AUDIENCE: ${client.target || "general"}

TOP 10 POSTS BY ENGAGEMENT:
${postsStr}

Build a complete account intelligence report:
1. ACCOUNT HEALTH SCORE (1-10) with reasoning
2. CONTENT THAT WORKS — specific formats and topics getting most engagement
3. CONTENT THAT FAILS — what to stop posting immediately
4. GROWTH BLOCKERS — 3 things holding this account back
5. AUDIENCE SIGNALS — what the engagement patterns tell us about this audience
6. POSTING CONSISTENCY — is the frequency hurting or helping?
7. TOP 5 CONTENT IDEAS — specific reels to make next, based on what already worked
8. 30-DAY ACTION PLAN — week by week, specific and executable
9. ONE THING TO DO THIS WEEK — highest leverage action right now`
      );
      setOverallAnalysis(text);
      LS.set(`ig_analysis_${client.id}`, text);
    } catch (e) {
      setOverallAnalysis("Analysis error. Try again.");
    }
    setAnalysisLoading(false);
  };

  const disconnect = () => {
    if (window.confirm("Disconnect this account?")) {
      LS.set(tokenKey, null);
      LS.set(cacheKey, null);
      setToken(null);
      setData(null);
    }
  };

  // Not connected
  if (!token || !data) {
    return (
      <Card>
        {error && (
          <div style={{ background: C.redLo, border: `1px solid ${C.red}30`, borderRadius: 3, padding: "12px 16px", marginBottom: 16, fontSize: 12, color: C.red }}>
            ⚠ {error}
          </div>
        )}
        {loading ? (
          <div style={{ padding: 40, textAlign: "center" }}><Spinner label="CONNECTING INSTAGRAM..." /></div>
        ) : (
          <ConnectInstagram clientId={client.id} onConnected={handleConnected} />
        )}
        {META_APP_ID === "2104051133749518" && (
          <div style={{ marginTop: 16, padding: "12px 16px", background: C.goldLo, border: `1px solid ${C.gold}30`, borderRadius: 3, fontSize: 12, color: C.gold, textAlign: "center" }}>
            ⚠ App ID not configured yet. Follow the setup guide and replace 2104051133749518 in the code.
          </div>
        )}
      </Card>
    );
  }

  return (
    <div>
      {/* Account overview */}
      <AccountOverview account={data.account} insights={data.insights} />

      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["posts", "analysis", "audience"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "8px 16px", borderRadius: 3, cursor: "pointer", fontFamily: font.mono,
              fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", border: "none",
              background: activeTab === tab ? C.teal : C.bg3,
              color: activeTab === tab ? C.bg : C.dim,
            }}>{tab}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {lastSync && <span style={{ fontSize: 10, color: C.dim, fontFamily: font.mono }}>Last sync: {new Date(lastSync).toLocaleTimeString()}</span>}
          <Btn small variant="ghost" onClick={() => fetchData(token)} disabled={loading}>{loading ? "Syncing..." : "↻ Sync"}</Btn>
          <Btn small variant="red" onClick={disconnect}>Disconnect</Btn>
        </div>
      </div>

      {/* Posts tab */}
      {activeTab === "posts" && (
        <PostsGrid posts={data.posts} onSelectPost={openPostDetail} />
      )}

      {/* Analysis tab */}
      {activeTab === "analysis" && (
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: "0.3em", color: C.dim }}>VANTIX ACCOUNT INTELLIGENCE</div>
            <Btn small onClick={runOverallAnalysis} disabled={analysisLoading}>
              {analysisLoading ? "Analyzing..." : overallAnalysis ? "Re-analyze" : "Run Full Analysis"}
            </Btn>
          </div>
          {analysisLoading ? (
            <div style={{ padding: "40px 0" }}><Spinner label="VANTIX ANALYZING YOUR ACCOUNT..." /></div>
          ) : overallAnalysis ? (
            <div style={{ fontSize: 13, color: "rgba(232,237,245,0.85)", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{overallAnalysis}</div>
          ) : (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ fontFamily: font.mono, fontSize: 11, color: C.dim, lineHeight: 1.9 }}>
                Click "Run Full Analysis" to get:<br /><br />
                · Account health score<br />
                · What content is working and why<br />
                · What to stop posting immediately<br />
                · Top 5 reel ideas based on your data<br />
                · 30-day action plan
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Audience tab */}
      {activeTab === "audience" && (
        <Card>
          <div style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: "0.3em", color: C.dim, marginBottom: 16 }}>AUDIENCE INTELLIGENCE</div>
          {data.audience && Object.keys(data.audience).length > 0 ? (
            <div>
              {data.audience.audience_gender_age && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, color: C.dim, marginBottom: 10, fontFamily: font.mono, letterSpacing: "0.1em" }}>GENDER & AGE</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {Object.entries(data.audience.audience_gender_age || {}).map(([key, val]) => (
                      <div key={key} style={{ padding: "8px 14px", background: C.bg3, borderRadius: 3, border: `1px solid ${C.border}` }}>
                        <div style={{ fontSize: 11, color: C.dim }}>{key}</div>
                        <div style={{ fontSize: 16, color: C.teal, fontFamily: font.display, fontWeight: 700 }}>{val}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {data.audience.audience_country && (
                <div>
                  <div style={{ fontSize: 12, color: C.dim, marginBottom: 10, fontFamily: font.mono, letterSpacing: "0.1em" }}>TOP COUNTRIES</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {Object.entries(data.audience.audience_country || {}).slice(0, 10).map(([country, val]) => (
                      <div key={country} style={{ padding: "6px 12px", background: C.bg3, borderRadius: 3, border: `1px solid ${C.border}`, fontSize: 12 }}>
                        {country}: <span style={{ color: C.teal }}>{val}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ color: C.dim, fontSize: 12, textAlign: "center", padding: "32px 0" }}>
              Audience data requires a Business account with sufficient followers (typically 100+ followers).<br />
              Sync the account to check availability.
            </div>
          )}
        </Card>
      )}

      {/* Post detail modal */}
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          insights={selectedInsights}
          clientProfile={client}
          onClose={() => { setSelectedPost(null); setSelectedInsights(null); }}
        />
      )}
    </div>
  );
}

// ─── FULL CONNECTIONS PAGE ─────────────────────────────────────────
export default function VantixConnections({ client }) {
  const [platform, setPlatform] = useState("instagram");

  if (!client) {
    return (
      <div style={{ fontFamily: font.body, background: C.bg, minHeight: "100vh", padding: 28 }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", padding: "80px 24px" }}>
          <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 22, marginBottom: 12 }}>SELECT A CLIENT FIRST</div>
          <div style={{ color: C.dim }}>Choose a client from the sidebar to connect and manage their social accounts.</div>
        </div>
      </div>
    );
  }

  const platforms = [
    { id: "instagram", label: "Instagram", color: C.instagram, connected: !!LS.get(`meta_token_${client.id}`) },
    { id: "facebook",  label: "Facebook",  color: C.facebook, connected: !!LS.get(`meta_token_${client.id}`) },
    { id: "youtube",   label: "YouTube",   color: C.youtube,  connected: false, soon: false },
    { id: "tiktok",    label: "TikTok",    color: "#000000",  connected: false, soon: true },
    { id: "linkedin",  label: "LinkedIn",  color: "#0A66C2",  connected: false, soon: true },
  ];

  return (
    <div style={{ fontFamily: font.body, background: C.bg, minHeight: "100vh" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } * { box-sizing: border-box; } body { margin: 0; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: rgba(0,212,180,0.2); border-radius: 2px; } select option { background: #0b1424; }`}</style>

      {/* Header */}
      <div style={{ background: C.bg1, borderBottom: `1px solid ${C.border}`, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 17, letterSpacing: "0.08em" }}>CONNECTED ACCOUNTS</div>
          <div style={{ fontSize: 11, color: C.dim, marginTop: 2, fontFamily: font.mono }}>Client: {client.name}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal, boxShadow: `0 0 8px ${C.teal}` }} />
          <span style={{ fontFamily: font.mono, fontSize: 9, color: C.teal, letterSpacing: "0.2em" }}>VANTIX ONLINE</span>
        </div>
      </div>

      <div style={{ padding: 28, maxWidth: 1100 }}>
        {/* Platform tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {platforms.map(p => (
            <button
              key={p.id}
              onClick={() => !p.soon && setPlatform(p.id)}
              disabled={p.soon}
              style={{
                padding: "10px 20px", borderRadius: 3, cursor: p.soon ? "not-allowed" : "pointer",
                fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
                background: platform === p.id ? p.color : C.bg2,
                color: platform === p.id ? "#fff" : p.soon ? C.border : C.dim,
                border: `1px solid ${platform === p.id ? p.color : C.border}`,
                opacity: p.soon ? 0.4 : 1, transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 8,
              }}
            >
              {p.label}
              {p.connected && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff88", display: "inline-block" }} />}
              {p.soon && <span style={{ fontSize: 8 }}>SOON</span>}
            </button>
          ))}
        </div>

        {/* Instagram / Facebook dashboard */}
        {(platform === "instagram" || platform === "facebook") && (
          <InstagramDashboard client={client} />
        )}

        {/* YouTube - coming soon */}
        {platform === "youtube" && (
          <Card style={{ textAlign: "center", padding: 52 }}>
            <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 20, marginBottom: 12 }}>YouTube Coming Next</div>
            <div style={{ color: C.dim, fontSize: 13 }}>YouTube Data API integration is next on the build list. Subscribe count, view analytics, and video performance will be pulled automatically.</div>
          </Card>
        )}
      </div>
    </div>
  );
}
