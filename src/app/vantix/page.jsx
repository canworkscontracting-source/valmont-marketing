"use client";
import { useState, useEffect } from "react";

const C = { bg: "#040810", bg1: "#070d1a", bg2: "#0b1424", bg3: "#0f1c30", teal: "#00D4B4", tealLo: "rgba(0,212,180,0.10)", gold: "#C8A96E", red: "#FF5060", white: "#E8EDF5", dim: "#7A8BA8", border: "rgba(0,212,180,0.10)", borderHi: "rgba(0,212,180,0.28)" };
const font = { display: "'Rajdhani', sans-serif", body: "'Outfit', sans-serif", mono: "'Space Mono', monospace" };
const LS = {
  get: (k, d = null) => { try { const v = localStorage.getItem("vx_" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem("vx_" + k, JSON.stringify(v)); } catch {} },
};

export default function VantixDashboard() {
  const [activeModule, setActiveModule] = useState("Intelligence Hub");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = LS.get("clients", []);
    setClients(saved);
    const selId = LS.get("selected_client_id");
    if (selId && saved.length) {
      const found = saved.find(c => c.id === selId);
      if (found) setSelectedClient(found);
    }
  }, []);

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

  const modules = [
    { group: "VANTIX CORE", items: ["Intelligence Hub", "Client Profiles"] },
    { group: "AI ENGINES", items: ["Competitor Tracker", "Content Lab", "Growth Strategy AI", "Content Creator AI", "Niche Intelligence"] },
  ];

  if (!mounted) return null;

  return (
    <div style={{ fontFamily: font.body, background: C.bg, minHeight: "100vh", color: C.white, display: "flex" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Outfit:wght@300;400;500&family=Space+Mono&display=swap'); * { box-sizing: border-box; } body { margin: 0; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: rgba(0,212,180,0.2); border-radius: 2px; }`}</style>

      {/* Sidebar */}
      <div style={{ width: 220, background: C.bg1, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", padding: "20px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 20px 20px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 22, color: C.teal, letterSpacing: "0.1em" }}>VANTIX</div>
          <div style={{ fontSize: 9, color: C.dim, fontFamily: font.mono, letterSpacing: "0.2em" }}>AI GROWTH INTELLIGENCE</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal, boxShadow: `0 0 8px ${C.teal}` }} />
            <span style={{ fontSize: 9, color: C.teal, fontFamily: font.mono, letterSpacing: "0.15em" }}>SYSTEM ONLINE</span>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 0" }}>
          {modules.map(group => (
            <div key={group.group} style={{ marginBottom: 8 }}>
              <div style={{ padding: "4px 20px", fontSize: 9, color: C.dim, fontFamily: font.mono, letterSpacing: "0.2em" }}>{group.group}</div>
              {group.items.map(item => (
                <button key={item} onClick={() => setActiveModule(item)} style={{
                  display: "block", width: "100%", textAlign: "left", padding: "9px 20px",
                  background: activeModule === item ? C.tealLo : "none",
                  borderLeft: activeModule === item ? `2px solid ${C.teal}` : "2px solid transparent",
                  border: "none", color: activeModule === item ? C.teal : C.dim,
                  fontFamily: font.body, fontSize: 13, cursor: "pointer",
                }}>
                  {item}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div style={{ padding: "16px 20px", borderTop: `1px solid ${C.border}` }}>
          <a href="/vantix/connections" style={{ display: "block", padding: "8px 12px", background: C.tealLo, border: `1px solid ${C.borderHi}`, borderRadius: 3, color: C.teal, fontSize: 11, fontFamily: font.mono, letterSpacing: "0.1em", textDecoration: "none", textAlign: "center" }}>
            CONNECTED ACCOUNTS
          </a>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ background: C.bg1, borderBottom: `1px solid ${C.border}`, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 18, letterSpacing: "0.08em" }}>{activeModule.toUpperCase()}</div>
          <select onChange={(e) => { const c = clients.find(x => x.id === e.target.value); if (c) selectClient(c); }} value={selectedClient?.id || ""} style={{ background: C.bg2, border: `1px solid ${C.border}`, color: selectedClient ? C.white : C.dim, padding: "6px 12px", borderRadius: 3, fontFamily: font.body, fontSize: 12 }}>
            <option value="">Select Client</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
          {activeModule === "Client Profiles" && <ClientProfiles clients={clients} selectedClient={selectedClient} onSave={saveClient} onSelect={selectClient} onDelete={deleteClient} />}
          {activeModule === "Intelligence Hub" && <IntelligenceHub client={selectedClient} />}
          {activeModule === "Content Creator AI" && <ContentCreatorAI client={selectedClient} />}
          {activeModule === "Growth Strategy AI" && <GrowthStrategyAI client={selectedClient} />}
          {activeModule !== "Client Profiles" && activeModule !== "Intelligence Hub" && activeModule !== "Content Creator AI" && activeModule !== "Growth Strategy AI" && <SimpleModule title={activeModule} client={selectedClient} />}
        </div>
      </div>
    </div>
  );
}

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
      Caption: `Write a high-performing Instagram caption for a ${niche} account about: "${topic}". Include a strong opening line, value-packed body, and a CTA. Add relevant hashtags at the end (20-25 hashtags). Format clearly.`,
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
      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 20 }}>CONTENT CREATOR AI</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, color: C.dim, fontFamily: "'Space Mono', monospace", letterSpacing: "0.15em", marginBottom: 6 }}>CONTENT TYPE</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {TYPES.map(t => (
              <button key={t} onClick={() => setContentType(t)} style={{
                padding: "7px 16px", borderRadius: 3, cursor: "pointer", fontFamily: "'Space Mono', monospace",
                fontSize: 10, letterSpacing: "0.1em", border: "none",
                background: contentType === t ? C.teal : C.bg3,
                color: contentType === t ? C.bg : C.dim,
              }}>{t.toUpperCase()}</button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: C.dim, fontFamily: "'Space Mono', monospace", letterSpacing: "0.15em", marginBottom: 6 }}>CLIENT</div>
          <div style={{ fontSize: 13, color: client ? C.white : C.dim, padding: "8px 0" }}>{client ? `${client.name} · ${client.niche || client.industry || "No niche"}` : "No client selected"}</div>
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: C.dim, fontFamily: "'Space Mono', monospace", letterSpacing: "0.15em", marginBottom: 6 }}>TOPIC / IDEA</div>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            value={topic}
            onChange={e => setTopic(e.target.value)}
            onKeyDown={e => e.key === "Enter" && generate()}
            placeholder={`e.g. "5 mistakes beginners make with ${client?.niche || "social media"}"`}
            style={{ flex: 1, background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 3, padding: "10px 14px", color: C.white, fontFamily: "'Outfit', sans-serif", fontSize: 13 }}
          />
          <button onClick={generate} disabled={loading || !topic.trim()} style={{
            padding: "10px 24px", background: loading ? C.bg3 : C.teal, color: loading ? C.dim : C.bg,
            border: "none", borderRadius: 3, fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
            fontSize: 12, letterSpacing: "0.15em", cursor: loading || !topic.trim() ? "not-allowed" : "pointer",
          }}>{loading ? "GENERATING..." : "GENERATE"}</button>
        </div>
      </div>
      <div style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 4, padding: 24, minHeight: 180 }}>
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.teal, fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.2em" }}>
            <div style={{ width: 14, height: 14, border: `2px solid rgba(0,212,180,0.1)`, borderTopColor: C.teal, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            VANTIX WRITING...
          </div>
        ) : output ? (
          <div style={{ fontSize: 13, color: "rgba(232,237,245,0.9)", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{output}</div>
        ) : (
          <div style={{ color: C.dim, fontSize: 13, textAlign: "center", paddingTop: 40 }}>
            Select a content type, enter your topic, and click Generate.
          </div>
        )}
      </div>
    </div>
  );
}

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
        `You are VANTIX Growth Strategy AI. You build precise, data-driven 30-day Instagram growth plans. Be specific, actionable, and tactical. No fluff.`,
        `Build a full 30-day Instagram growth plan for:\n\nCLIENT: ${client.name}\nNICHE: ${niche}\n\nInclude:\n1. Week 1 (Days 1-7): Foundation & Audit — profile optimization, content pillars, posting cadence\n2. Week 2 (Days 8-14): Content Blitz — specific reel ideas (write 3 full hooks), engagement strategy\n3. Week 3 (Days 15-21): Growth Sprint — collaboration tactics, hashtag strategy, DM funnel\n4. Week 4 (Days 22-30): Scale & Analyze — what to double down on, what to cut, KPIs to track\n5. Daily non-negotiables (3 habits to do every single day)\n6. Expected outcomes if plan is executed fully\n\nBe extremely specific to the ${niche} niche. Give exact post ideas, not generic advice.`
      );
      setPlan(text);
    } catch (e) { setPlan("Error: " + e.message); }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 18 }}>GROWTH STRATEGY AI</div>
        <button onClick={generate} disabled={loading || !client} style={{
          padding: "10px 20px", background: !client ? C.bg3 : C.teal, color: !client ? C.dim : C.bg,
          border: "none", borderRadius: 3, fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
          fontSize: 12, letterSpacing: "0.15em", cursor: loading || !client ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}>
          {loading ? "BUILDING PLAN..." : plan ? "REGENERATE PLAN" : "GENERATE 30-DAY PLAN"}
        </button>
      </div>
      {client && (
        <div style={{ background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 3, padding: "10px 16px", marginBottom: 16, display: "flex", gap: 24 }}>
          <div><span style={{ fontSize: 10, color: C.dim, fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}>CLIENT </span><span style={{ fontSize: 13, color: C.white }}>{client.name}</span></div>
          <div><span style={{ fontSize: 10, color: C.dim, fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}>NICHE </span><span style={{ fontSize: 13, color: C.teal }}>{client.niche || client.industry || "Not set"}</span></div>
        </div>
      )}
      <div style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 4, padding: 28, minHeight: 240 }}>
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.teal, fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.2em" }}>
            <div style={{ width: 14, height: 14, border: `2px solid rgba(0,212,180,0.1)`, borderTopColor: C.teal, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            BUILDING YOUR 30-DAY GROWTH PLAN...
          </div>
        ) : plan ? (
          <div style={{ fontSize: 13, color: "rgba(232,237,245,0.9)", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{plan}</div>
        ) : (
          <div style={{ color: C.dim, fontSize: 13, textAlign: "center", paddingTop: 60 }}>
            {client ? `Click "Generate 30-Day Plan" to build a full Instagram growth strategy for ${client.name}.` : "Select a client first, then generate their growth plan."}
          </div>
        )}
      </div>
    </div>
  );
}

function SimpleModule({ title, client }) {
  return (
    <div style={{ background: "#0b1424", border: "1px solid rgba(0,212,180,0.10)", borderRadius: 4, padding: 32, textAlign: "center" }}>
      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 10 }}>{title}</div>
      <div style={{ color: "#7A8BA8", fontSize: 13 }}>{client ? `Client: ${client.name}` : "Select a client to get started."}</div>
    </div>
  );
}

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 18 }}>CLIENT PROFILES</div>
        <button onClick={newClient} style={{ padding: "10px 20px", background: "#00D4B4", color: "#040810", border: "none", borderRadius: 3, fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.15em", cursor: "pointer" }}>+ NEW CLIENT</button>
      </div>

      {editing && (
        <div style={{ background: "#0b1424", border: "1px solid rgba(0,212,180,0.28)", borderRadius: 4, padding: 24, marginBottom: 20 }}>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>{isNew ? "NEW CLIENT" : "EDIT CLIENT"}</div>
          {[["Client Name *", "name"], ["Niche", "niche"], ["Industry", "industry"]].map(([label, key]) => (
            <div key={key} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#7A8BA8", fontFamily: "'Space Mono', monospace", letterSpacing: "0.15em", marginBottom: 4 }}>{label.toUpperCase()}</div>
              <input value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})} style={{ width: "100%", background: "#0f1c30", border: "1px solid rgba(0,212,180,0.10)", borderRadius: 3, padding: "8px 12px", color: "#E8EDF5", fontFamily: "'Outfit', sans-serif", fontSize: 13 }} />
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button onClick={save} style={{ padding: "10px 24px", background: "#00D4B4", color: "#040810", border: "none", borderRadius: 3, fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.15em", cursor: "pointer" }}>SAVE</button>
            <button onClick={() => setEditing(false)} style={{ padding: "10px 24px", background: "none", border: "1px solid rgba(0,212,180,0.1)", borderRadius: 3, color: "#7A8BA8", fontSize: 12, cursor: "pointer" }}>CANCEL</button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {clients.map(client => (
          <div key={client.id} style={{ background: selectedClient?.id === client.id ? "rgba(0,212,180,0.08)" : "#0b1424", border: `1px solid ${selectedClient?.id === client.id ? "rgba(0,212,180,0.28)" : "rgba(0,212,180,0.10)"}`, borderRadius: 4, padding: 20 }}>
            <div onClick={() => onSelect(client)} style={{ cursor: "pointer", marginBottom: 12 }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{client.name}</div>
              <div style={{ fontSize: 12, color: "#7A8BA8" }}>{client.niche || client.industry || "No niche set"}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => editClient(client)} style={{ padding: "5px 12px", background: "rgba(0,212,180,0.1)", border: "1px solid rgba(0,212,180,0.2)", borderRadius: 3, color: "#00D4B4", fontSize: 11, fontFamily: "'Space Mono', monospace", cursor: "pointer" }}>EDIT</button>
              <button onClick={() => remove(client)} style={{ padding: "5px 12px", background: "rgba(255,80,96,0.1)", border: "1px solid rgba(255,80,96,0.2)", borderRadius: 3, color: "#FF5060", fontSize: 11, fontFamily: "'Space Mono', monospace", cursor: "pointer" }}>REMOVE</button>
            </div>
          </div>
        ))}
        {clients.length === 0 && !editing && (
          <div style={{ color: "#7A8BA8", fontSize: 13, padding: 20 }}>No clients yet. Click "+ New Client" to add your first one.</div>
        )}
      </div>
    </div>
  );
}

function IntelligenceHub({ client }) {
  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: "You are VANTIX Intelligence Hub. Generate a concise daily marketing intelligence brief.",
          messages: [{ role: "user", content: `Generate a daily AI marketing brief for ${client ? client.name + " in " + (client.niche || client.industry || "marketing") : "a marketing agency"}. Include: 1) Top trending content formats today 2) Algorithm insights 3) One key action to take today. Keep it sharp and actionable.` }],
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 18 }}>DAILY INTELLIGENCE BRIEF</div>
        <button onClick={generate} disabled={loading} style={{ padding: "10px 20px", background: "#00D4B4", color: "#040810", border: "none", borderRadius: 3, fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.15em", cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
          {loading ? "GENERATING..." : "GENERATE BRIEF"}
        </button>
      </div>
      <div style={{ background: "#0b1424", border: "1px solid rgba(0,212,180,0.10)", borderRadius: 4, padding: 28, minHeight: 200 }}>
        {brief ? <div style={{ fontSize: 14, lineHeight: 1.9, whiteSpace: "pre-wrap", color: "rgba(232,237,245,0.85)" }}>{brief}</div>
          : <div style={{ color: "#7A8BA8", fontSize: 13, textAlign: "center", paddingTop: 60 }}>Click "Generate Brief" to get your daily AI marketing intelligence.</div>}
      </div>
    </div>
  );
}
