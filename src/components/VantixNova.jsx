'use client';
import { useState, useRef, useEffect } from 'react';

const SYSTEM_PROMPT = `You are Nova, the AI assistant for Valmont Marketing & Intelligence. You are sharp, direct, and confident. Built by Valmont using VANTIX AI.

CRITICAL: Respond in the exact same language the user writes in. Punjabi reply Punjabi. Hinglish reply Hinglish. Punglish reply Punglish. NEVER say you cannot understand.

ABOUT VALMONT:
- AI-driven marketing agency, Ludhiana, Punjab, India
- Founded by Eren and Sarvpreet. Tagline: Intelligence, architected.
- Services: Meta and Instagram Ads, AI Chatbot Systems, Content Strategy, WhatsApp Marketing, Shopify E-commerce, Political Consulting, Marketing Dashboards

ABOUT VANTIX AI:
- Valmont proprietary AI infrastructure
- 10 agents called Solaris Knights: SCRIBE, HERALD, PHANTOM, ORACLE, CIPHER, FORGE, PIXEL, SENTINEL, AUDITOR, NEXUS
- Powered by Claude API, n8n, Supabase

NOVA PRICING:
- Basic: Rs 25,000/month
- Standard: Rs 45,000/month
- Premium: Rs 75,000 to 1,00,000/month

RULES: Under 80 words. Never apologize for language. For contact say drop details in the form. Be confident not corporate.`;

export default function VantixNova() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: 'assistant', content: "Hey! I'm Nova, Valmont's AI. Ask me anything about our services, VANTIX AI, or pricing.", id: 0 }]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [leads, setLeads] = useState([]);
  const [showLead, setShowLead] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [toast, setToast] = useState('');
  const msgsRef = useRef(null);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [msgs, typing]);

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(''), 2800); };

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || typing) return;
    setInput('');
    const userMsg = { role: 'user', content: msg, id: Date.now() };
    setMsgs(p => [...p, userMsg]);
    const newHist = [...history, { role: 'user', content: msg }];
    setHistory(newHist);
    if (/book|call|contact|meet|connect/i.test(msg)) setTimeout(() => setShowLead(true), 600);
    setTyping(true);
    try {
      const res = await fetch('/api/nova', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHist, system: SYSTEM_PROMPT }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Something went wrong, please try again.';
      setMsgs(p => [...p, { role: 'assistant', content: reply, id: Date.now() }]);
      setHistory(p => [...p, { role: 'assistant', content: reply }]);
    } catch {
      setMsgs(p => [...p, { role: 'assistant', content: 'Connection issue. Try again or email hello@valmontmarketing.com', id: Date.now() }]);
    }
    setTyping(false);
  };

  const saveLead = () => {
    if (!leadName.trim() || !leadContact.trim()) { showToast('Fill both fields'); return; }
    setLeads(p => [...p, { name: leadName, contact: leadContact }]);
    setShowLead(false);
    setLeadName(''); setLeadContact('');
    setMsgs(p => [...p, { role: 'assistant', content: `Got it ${leadName}! Our team will reach out shortly.`, id: Date.now() }]);
    showToast('Lead saved!');
  };

  const C = {
    teal: '#00C2B8', cyan: '#00D1FF', blue: '#2F80FF',
    bg: '#0B0F14', navy: '#0E1A22', panel: '#111A22',
    text: '#EAF2F7', text2: '#9FB3C8', text3: '#6B7C93',
    border: 'rgba(0,194,184,0.15)',
    grad: 'linear-gradient(135deg,#00C2B8,#00D1FF,#2F80FF)',
  };

  return (
    <>
      <style>{`
        @keyframes vnpulse{0%,100%{box-shadow:0 4px 20px rgba(0,194,184,.5),0 0 0 0 rgba(0,194,184,.3)}50%{box-shadow:0 4px 20px rgba(0,194,184,.5),0 0 0 10px rgba(0,194,184,0)}}
        @keyframes vnin{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        @keyframes vnbounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}
        @keyframes vnopen{from{opacity:0;transform:scale(0.88) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
        .vn-trigger{position:fixed;bottom:28px;right:28px;z-index:9990;width:58px;height:58px;border-radius:50%;border:none;cursor:pointer;background:linear-gradient(135deg,#00C2B8,#00D1FF,#2F80FF);display:flex;align-items:center;justify-content:center;animation:vnpulse 2.5s ease-in-out infinite;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}
        .vn-trigger:hover{transform:scale(1.1)}
        .vn-widget{position:fixed;bottom:98px;right:28px;z-index:9989;width:375px;height:600px;background:#0E1A22;border:1px solid rgba(0,194,184,.15);border-radius:20px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 24px 70px rgba(0,0,0,.6),0 0 30px rgba(0,194,184,.1);animation:vnopen .35s cubic-bezier(.34,1.56,.64,1)}
        .vn-msg{display:flex;gap:8px;animation:vnin .25s ease}
        .vn-msg.user{flex-direction:row-reverse}
        .vn-dot span{width:6px;height:6px;background:#00C2B8;border-radius:50%;display:inline-block;animation:vnbounce 1.2s ease-in-out infinite}
        .vn-dot span:nth-child(2){animation-delay:.15s}
        .vn-dot span:nth-child(3){animation-delay:.3s}
        .vn-chip{padding:5px 12px;border-radius:20px;font-size:11.5px;font-weight:500;border:1px solid rgba(0,194,184,.2);color:#9FB3C8;cursor:pointer;background:rgba(0,194,184,.05);transition:all .2s;font-family:inherit}
        .vn-chip:hover{background:rgba(0,194,184,.15);color:#00C2B8;border-color:#00C2B8}
        .vn-inp{flex:1;background:#111A22;border:1px solid rgba(0,194,184,.2);border-radius:10px;padding:9px 12px;color:#EAF2F7;font-size:13.5px;font-family:inherit;outline:none;resize:none;min-height:38px;max-height:90px;line-height:1.4;transition:border-color .2s}
        .vn-inp:focus{border-color:#00C2B8}
        .vn-inp::placeholder{color:#6B7C93}
        .vn-lfinp{width:100%;background:rgba(0,0,0,.3);border:1px solid rgba(0,194,184,.2);border-radius:8px;padding:8px 11px;color:#EAF2F7;font-size:13px;font-family:inherit;outline:none;transition:border-color .2s}
        .vn-lfinp:focus{border-color:#00C2B8}
        .vn-lfinp::placeholder{color:#6B7C93}
        @media(max-width:440px){.vn-widget{width:calc(100vw - 14px);right:7px;bottom:88px;height:calc(100vh - 108px)}}
      `}</style>

      {/* Trigger */}
      <button className="vn-trigger" onClick={() => setOpen(o => !o)} style={{ fontFamily: 'inherit' }}>
        {open
          ? <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          : <svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        }
      </button>

      {/* Widget */}
      {open && (
        <div className="vn-widget">
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg,rgba(0,194,184,.14),rgba(47,128,255,.08))', borderBottom: `1px solid ${C.border}`, padding: '13px 15px', display: 'flex', alignItems: 'center', gap: '11px', flexShrink: 0 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 17, color: 'white', flexShrink: 0, position: 'relative' }}>
              V
              <span style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, background: '#22c55e', borderRadius: '50%', border: `2px solid ${C.navy}` }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: C.text }}>VANTIX Nova — Valmont AI</div>
              <div style={{ fontSize: 11, color: '#22c55e', marginTop: 2 }}>● Online · AI Active</div>
            </div>
          </div>

          {/* Lang bar */}
          <div style={{ background: 'rgba(0,0,0,.18)', borderBottom: `1px solid ${C.border}`, padding: '7px 12px', display: 'flex', gap: 5, overflowX: 'auto', flexShrink: 0 }}>
            {[['en','English'],['hi','हिंदी'],['pa','ਪੰਜਾਬੀ'],['hi2','Hinglish'],['pa2','Punglish']].map(([k,l]) => (
              <button key={k} className="vn-chip" style={{ whiteSpace: 'nowrap', fontSize: 11 }}>{l}</button>
            ))}
          </div>

          {/* Messages */}
          <div ref={msgsRef} style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 11 }}>
            {msgs.map(m => (
              <div key={m.id} className={`vn-msg${m.role === 'user' ? ' user' : ''}`}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: m.role === 'user' ? '#152030' : C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: 'white', flexShrink: 0, marginTop: 3 }}>
                  {m.role === 'user' ? 'U' : 'V'}
                </div>
                <div style={{ maxWidth: '73%', padding: '10px 13px', borderRadius: 13, fontSize: 13.5, lineHeight: 1.55, color: C.text, whiteSpace: 'pre-wrap', background: m.role === 'user' ? 'linear-gradient(135deg,rgba(0,194,184,.22),rgba(47,128,255,.18))' : C.panel, border: `1px solid ${C.border}`, borderBottomLeftRadius: m.role === 'user' ? 13 : 3, borderBottomRightRadius: m.role === 'user' ? 3 : 13 }}>
                  {m.content}
                </div>
              </div>
            ))}
            {typing && (
              <div className="vn-msg">
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: 'white', flexShrink: 0 }}>V</div>
                <div style={{ padding: '12px 14px', background: C.panel, border: `1px solid ${C.border}`, borderRadius: 13, borderBottomLeftRadius: 3 }}>
                  <div className="vn-dot"><span/><span/><span/></div>
                </div>
              </div>
            )}
          </div>

          {/* Lead form */}
          {showLead && (
            <div style={{ margin: '0 12px 8px', padding: 14, background: C.panel, border: `1px solid rgba(0,194,184,.25)`, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: C.teal }}>📋 Let's get connected</div>
              <input className="vn-lfinp" placeholder="Your name" value={leadName} onChange={e => setLeadName(e.target.value)} />
              <input className="vn-lfinp" placeholder="Phone or email" value={leadContact} onChange={e => setLeadContact(e.target.value)} />
              <button onClick={saveLead} style={{ background: C.grad, border: 'none', borderRadius: 8, padding: 8, color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Send to Valmont →</button>
            </div>
          )}

          {/* Quick replies */}
          <div style={{ padding: '0 12px 8px', display: 'flex', flexWrap: 'wrap', gap: 5, flexShrink: 0 }}>
            {['What services do you offer?', 'Tell me about VANTIX AI', 'What are your pricing plans?', 'I want to book a call'].map(q => (
              <button key={q} className="vn-chip" onClick={() => send(q)}>{q}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '10px 12px 13px', borderTop: `1px solid ${C.border}`, background: 'rgba(0,0,0,.12)', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 7, alignItems: 'flex-end' }}>
              <textarea className="vn-inp" placeholder="Ask anything about Valmont..." value={input}
                onChange={e => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 90) + 'px'; }}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                rows={1}
              />
              <button onClick={() => send()} style={{ width: 38, height: 38, borderRadius: 10, border: 'none', cursor: 'pointer', background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
            <div style={{ textAlign: 'center', fontSize: 10, color: C.text3, marginTop: 7 }}>Powered by <span style={{ color: C.teal, fontWeight: 600 }}>VANTIX AI</span> · Valmont Marketing</div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 102, left: '50%', transform: 'translateX(-50%)', background: C.panel, border: `1px solid ${C.teal}`, borderRadius: 10, padding: '9px 18px', fontSize: 12.5, color: C.teal, fontWeight: 500, zIndex: 9999, whiteSpace: 'nowrap' }}>
          {toast}
        </div>
      )}
    </>
  );
}
