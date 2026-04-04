"use client";
import { useState, useEffect } from "react";

const LS = {
  get: (k, d = null) => { try { const v = localStorage.getItem("vx_" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
};

const PRINT_CSS = `
  @media print {
    body { margin: 0; background: #fff !important; color: #111 !important; }
    .no-print { display: none !important; }
    .page-break { page-break-before: always; }
    .vxr-root { background: #fff; color: #111; padding: 0; }
    .vxr-section { border-color: #ddd !important; background: #fff !important; }
    .vxr-header { background: #fff; border-bottom: 2px solid #00d4bf; }
  }
  @page { margin: 20mm; }
`;

const SCREEN_CSS = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  .vxr-root { font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; background: #fff; color: #111; min-height: 100vh; }
  .vxr-header { background: #050d1a; color: #fff; padding: 32px 48px; display: flex; justify-content: space-between; align-items: flex-start; }
  .vxr-logo { font-size: 28px; font-weight: 900; letter-spacing: 0.2em; color: #00d4bf; }
  .vxr-logo-sub { font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 0.2em; margin-top: 4px; }
  .vxr-header-right { text-align: right; }
  .vxr-report-title { font-size: 16px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #fff; }
  .vxr-report-date { font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 4px; }
  .vxr-client-badge { display: inline-block; margin-top: 8px; padding: 4px 14px; background: rgba(0,212,191,0.15); border: 1px solid rgba(0,212,191,0.4); border-radius: 20px; font-size: 11px; font-weight: 700; color: #00d4bf; letter-spacing: 0.1em; }
  .vxr-body { max-width: 900px; margin: 0 auto; padding: 40px 48px; }
  .vxr-section { border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px 28px; margin-bottom: 24px; }
  .vxr-section-title { font-size: 13px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: #00d4bf; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb; }
  .vxr-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 16px; }
  .vxr-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }
  .vxr-stat { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 14px; text-align: center; }
  .vxr-stat-value { font-size: 22px; font-weight: 800; color: #111; }
  .vxr-stat-label { font-size: 10px; color: #6b7280; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px; }
  .vxr-text { font-size: 13px; color: #374151; line-height: 1.8; white-space: pre-wrap; }
  .vxr-entry { border-bottom: 1px solid #f3f4f6; padding: 12px 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
  .vxr-entry:last-child { border-bottom: none; }
  .vxr-comp { background: #f9fafb; border-radius: 6px; padding: 14px; margin-bottom: 12px; }
  .vxr-comp-name { font-weight: 800; font-size: 14px; color: #111; }
  .vxr-comp-meta { font-size: 12px; color: #6b7280; margin-top: 2px; }
  .vxr-comp-analysis { font-size: 12px; color: #374151; line-height: 1.7; margin-top: 10px; white-space: pre-wrap; max-height: 200px; overflow: hidden; }
  .vxr-cal-day { display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
  .vxr-cal-day:last-child { border-bottom: none; }
  .vxr-cal-date { min-width: 28px; font-weight: 800; font-size: 16px; color: #111; }
  .vxr-cal-posts { display: flex; flex-direction: column; gap: 4px; }
  .vxr-cal-post { font-size: 12px; color: #374151; }
  .vxr-footer { background: #050d1a; color: rgba(255,255,255,0.4); text-align: center; padding: 24px; font-size: 11px; letter-spacing: 0.1em; }
  .vxr-print-btn { position: fixed; bottom: 32px; right: 32px; background: #00d4bf; color: #050d1a; border: none; border-radius: 8px; padding: 14px 28px; font-size: 13px; font-weight: 800; letter-spacing: 0.12em; cursor: pointer; transition: background 0.2s; z-index: 100; box-shadow: 0 4px 20px rgba(0,212,191,0.4); font-family: inherit; }
  .vxr-print-btn:hover { background: #00f0d8; }
  .vxr-back-btn { display: inline-flex; align-items: center; gap: 6px; margin-bottom: 24px; padding: 8px 16px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; color: #374151; text-decoration: none; cursor: pointer; background: #fff; font-family: inherit; }
  .vxr-back-btn:hover { background: #f9fafb; }
  .vxr-empty { color: #9ca3af; font-size: 13px; font-style: italic; }
  @media (max-width: 767px) {
    .vxr-header { padding: 20px 20px; }
    .vxr-body { padding: 20px; }
    .vxr-grid-3 { grid-template-columns: 1fr 1fr; }
    .vxr-grid-2 { grid-template-columns: 1fr; }
    .vxr-print-btn { bottom: 16px; right: 16px; }
  }
`;

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function VantixReport() {
  const [mounted, setMounted] = useState(false);
  const [client, setClient] = useState(null);
  const [perfEntries, setPerfEntries] = useState([]);
  const [competitors, setCompetitors] = useState([]);
  const [calData, setCalData] = useState({});
  const [aiRecs, setAiRecs] = useState("");
  const [loadingRecs, setLoadingRecs] = useState(false);

  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth();

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem("vx_auth") !== "true") {
        window.location.replace("/vantix/login");
        return;
      }
      const clients = JSON.parse(localStorage.getItem("vx_clients") || "[]");
      const selectedId = localStorage.getItem("vx_selected_client_id");
      const found = clients.find(c => c.id === (selectedId ? JSON.parse(selectedId) : null)) || clients[0] || null;
      setClient(found);
      if (found) {
        setPerfEntries(LS.get(`performance_${found.id}`, []));
        setCompetitors(LS.get(`competitors_${found.id}`, []));
        setCalData(LS.get(`calendar_${found.id}_${thisYear}_${thisMonth}`, {}));
      }
    } catch {
      window.location.replace("/vantix/login");
    }
  }, []);

  const generateRecs = async () => {
    setLoadingRecs(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: "You are VANTIX AI. Generate a concise strategic recommendations report.",
          messages: [{
            role: "user",
            content: `Generate 5 strategic AI recommendations for ${client ? client.name + " in " + (client.niche || client.industry || "marketing") : "a marketing client"} based on their performance data. Keep each recommendation specific, actionable, and results-focused. Format as numbered list with a clear action and expected outcome.`,
          }],
        }),
      });
      const data = await res.json();
      const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
      setAiRecs(text);
    } catch (e) { setAiRecs("Error generating recommendations."); }
    setLoadingRecs(false);
  };

  if (!mounted) return null;

  const latestPerf = perfEntries[0] || null;
  const prevPerf = perfEntries[1] || null;
  const followerGrowth = latestPerf && prevPerf && prevPerf.followers
    ? (((parseFloat(latestPerf.followers) - parseFloat(prevPerf.followers)) / parseFloat(prevPerf.followers)) * 100).toFixed(1)
    : null;

  const allCalPosts = Object.values(calData).flat();
  const published = allCalPosts.filter(p => p.status === "Published").length;

  const calDaysWithPosts = Object.entries(calData)
    .filter(([, posts]) => posts.length > 0)
    .sort(([a], [b]) => parseInt(a) - parseInt(b));

  return (
    <div className="vxr-root">
      <style>{SCREEN_CSS + PRINT_CSS}</style>

      {/* Header */}
      <div className="vxr-header">
        <div>
          <div className="vxr-logo">VANTIX</div>
          <div className="vxr-logo-sub">POWERED BY VALMONT MARKETING</div>
        </div>
        <div className="vxr-header-right">
          <div className="vxr-report-title">Performance Report</div>
          <div className="vxr-report-date">{now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
          {client && <div className="vxr-client-badge">{client.name.toUpperCase()}</div>}
        </div>
      </div>

      {/* Body */}
      <div className="vxr-body">
        <button className="vxr-back-btn no-print" onClick={() => window.history.back()}>← Back to Dashboard</button>

        {/* Performance Summary */}
        <div className="vxr-section">
          <div className="vxr-section-title">Performance Summary</div>
          {latestPerf ? (
            <>
              <div className="vxr-grid-3" style={{ marginBottom: 0 }}>
                {[
                  ["Followers", latestPerf.followers ? parseInt(latestPerf.followers).toLocaleString() : "—"],
                  ["Engagement Rate", latestPerf.engagementRate ? latestPerf.engagementRate + "%" : "—"],
                  ["Follower Growth", followerGrowth !== null ? (followerGrowth > 0 ? "+" : "") + followerGrowth + "%" : "—"],
                  ["Reach", latestPerf.reach ? parseInt(latestPerf.reach).toLocaleString() : "—"],
                  ["Impressions", latestPerf.impressions ? parseInt(latestPerf.impressions).toLocaleString() : "—"],
                  ["New Leads", latestPerf.newLeads ? parseInt(latestPerf.newLeads).toLocaleString() : "—"],
                ].map(([label, value]) => (
                  <div key={label} className="vxr-stat">
                    <div className="vxr-stat-value" style={{ color: value.includes("+") ? "#00d4bf" : value.includes("-") ? "#ef4444" : "#111" }}>{value}</div>
                    <div className="vxr-stat-label">{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, fontSize: 11, color: "#9ca3af" }}>Latest log: {latestPerf.date} · {perfEntries.length} total entries</div>
            </>
          ) : (
            <div className="vxr-empty">No performance data logged yet. Go to Performance Tracker to add metrics.</div>
          )}
        </div>

        {/* Growth Trend */}
        {perfEntries.length > 1 && (
          <div className="vxr-section">
            <div className="vxr-section-title">Growth Trend</div>
            {perfEntries.slice(0, 6).map((entry, i) => {
              const prev = perfEntries[i + 1];
              const growth = prev && prev.followers ? (((parseFloat(entry.followers) - parseFloat(prev.followers)) / parseFloat(prev.followers)) * 100).toFixed(1) : null;
              return (
                <div key={entry.id} className="vxr-entry">
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{entry.date}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>Eng. Rate: {entry.engagementRate || "—"}%</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>{entry.followers ? parseInt(entry.followers).toLocaleString() : "—"}</div>
                    {growth !== null && (
                      <div style={{ fontSize: 12, fontWeight: 700, color: growth > 0 ? "#00d4bf" : "#ef4444" }}>
                        {growth > 0 ? "▲" : "▼"} {Math.abs(growth)}%
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Content Calendar Summary */}
        <div className="vxr-section">
          <div className="vxr-section-title">Content Calendar — {MONTHS[thisMonth]} {thisYear}</div>
          {allCalPosts.length > 0 ? (
            <>
              <div className="vxr-grid-3" style={{ marginBottom: 16 }}>
                <div className="vxr-stat"><div className="vxr-stat-value">{allCalPosts.length}</div><div className="vxr-stat-label">Total Posts</div></div>
                <div className="vxr-stat"><div className="vxr-stat-value" style={{ color: "#00d4bf" }}>{published}</div><div className="vxr-stat-label">Published</div></div>
                <div className="vxr-stat"><div className="vxr-stat-value">{allCalPosts.length - published}</div><div className="vxr-stat-label">Planned</div></div>
              </div>
              {calDaysWithPosts.slice(0, 10).map(([day, posts]) => (
                <div key={day} className="vxr-cal-day">
                  <div className="vxr-cal-date">{day}</div>
                  <div className="vxr-cal-posts">
                    {posts.map(p => (
                      <div key={p.id} className="vxr-cal-post">
                        <strong>{p.platform}</strong> · {p.contentType} · <span style={{ color: p.status === "Published" ? "#00d4bf" : "#6b7280" }}>{p.status}</span>
                        {p.caption && <div style={{ color: "#6b7280", fontSize: 11, marginTop: 1 }}>{p.caption.slice(0, 80)}{p.caption.length > 80 ? "…" : ""}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {calDaysWithPosts.length > 10 && <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>+ {calDaysWithPosts.length - 10} more days…</div>}
            </>
          ) : (
            <div className="vxr-empty">No content scheduled for {MONTHS[thisMonth]}. Go to Content Calendar to plan posts.</div>
          )}
        </div>

        {/* Competitor Intelligence */}
        <div className="vxr-section">
          <div className="vxr-section-title">Competitor Intelligence</div>
          {competitors.length > 0 ? (
            competitors.map(comp => (
              <div key={comp.id} className="vxr-comp">
                <div className="vxr-comp-name">{comp.name}</div>
                <div className="vxr-comp-meta">{comp.handle && comp.handle + " · "}{comp.niche}</div>
                {comp.analysis ? (
                  <div className="vxr-comp-analysis">{comp.analysis}</div>
                ) : (
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>No analysis yet — go to Competitor Tracker to analyze.</div>
                )}
              </div>
            ))
          ) : (
            <div className="vxr-empty">No competitors tracked. Add competitors in the Competitor Tracker module.</div>
          )}
        </div>

        {/* AI Recommendations */}
        <div className="vxr-section">
          <div className="vxr-section-title">AI Recommendations</div>
          {aiRecs ? (
            <div className="vxr-text">{aiRecs}</div>
          ) : (
            <div>
              <div className="vxr-empty" style={{ marginBottom: 14 }}>Click below to generate AI-powered recommendations for this report.</div>
              <button
                className="no-print"
                onClick={generateRecs}
                disabled={loadingRecs}
                style={{ padding: "10px 22px", background: "#00d4bf", color: "#050d1a", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                {loadingRecs ? "GENERATING…" : "GENERATE AI RECOMMENDATIONS ›"}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", borderTop: "1px solid #e5e7eb", paddingTop: 24, marginTop: 8 }}>
          <div style={{ fontSize: 10, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Generated by VANTIX · Valmont Marketing · {now.toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Print button */}
      <button className="vxr-print-btn no-print" onClick={() => window.print()}>
        PRINT / EXPORT PDF ›
      </button>
    </div>
  );
}
