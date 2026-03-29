'use client';
import { useState, useRef, useEffect, useCallback } from 'react';

const SYSTEM_PROMPT = 'You are Nova, the AI assistant for Valmont Marketing & Intelligence. You are a female AI — warm, sharp, direct and confident. Built by Valmont using VANTIX AI. CRITICAL: Respond in the exact same language the user writes in. Punjabi reply Punjabi. Hinglish reply Hinglish. Punglish reply Punglish. NEVER say you cannot understand. In Punjabi and Punglish always use respectful formal register — use tuhanu not tenu, tussi not tu, karo not kar, always polite tone. ABOUT VALMONT: AI-driven marketing agency, Ludhiana, Punjab, India. Founded by Sunny. Tagline: Intelligence, architected. Services: Meta and Instagram Ads, AI Chatbot Systems, Content Strategy, WhatsApp Marketing, Shopify E-commerce, Political Consulting, Marketing Dashboards. ABOUT VANTIX AI: 10 agents called Solaris Knights: SCRIBE, HERALD, PHANTOM, ORACLE, CIPHER, FORGE, PIXEL, SENTINEL, AUDITOR, NEXUS. Powered by Claude API, n8n, Supabase. PRICING: Basic Rs 25000/month, Standard Rs 45000/month, Premium Rs 75000 to 100000/month. RULES: Under 80 words. Never apologize for language. For contact say drop details in the form. Be confident not corporate.';

const LANGS = [
  { code: 'en', label: 'English',   greeting: "Hey! I'm Nova, Valmont's AI. Ask me anything about our services, VANTIX AI, or pricing." },
  { code: 'hi', label: '\u0939\u093f\u0928\u094d\u0926\u0940',  greeting: '\u0928\u092e\u0938\u094d\u0924\u0947! \u092e\u0948\u0902 Nova \u0939\u0942\u0901, Valmont AI. \u0938\u0947\u0935\u093e\u0913\u0902, \u092e\u0942\u0932\u094d\u092f, \u092f\u093e VANTIX \u0915\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902 \u092a\u0942\u091b\u0947\u0902\u0964' },
  { code: 'pa', label: '\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40', greeting: '\u0a38\u0a24\u0a3f \u0a38\u0a4d\u0a30\u0a40 \u0a05\u0a15\u0a3e\u0a32! \u0a2e\u0a48\u0a02 Nova \u0a39\u0a3e\u0a02, Valmont AI. \u0a38\u0a47\u0a35\u0a3e\u0a35\u0a3e\u0a02, \u0a15\u0a40\u0a2e\u0a24\u0a3e\u0a02, \u0a1c\u0a3e\u0a02 VANTIX \u0a2c\u0a3e\u0a30\u0a47 \u0a2a\u0a41\u0a71\u0a1b\u0a4b\u0964' },
  { code: 'hl', label: 'Hinglish',  greeting: "Hey yaar! Main Nova hoon, Valmont ka AI. Services, pricing ya VANTIX ke baare mein pooch lo." },
  { code: 'pl', label: 'Punglish',  greeting: "Sat Sri Akal yaar! Main Nova haan, Valmont da AI. Ki help kara tainu?" },
];

const QUICK_REPLIES = [
  'What services do you offer?',
  'Tell me about VANTIX AI',
  'What are your pricing plans?',
  'I want to book a call',
];

export default function VantixNova() {
  const [open, setOpen]           = useState(false);
  const [langIdx, setLangIdx]     = useState(0);
  const [msgs, setMsgs]           = useState([{ role: 'assistant', content: LANGS[0].greeting, id: 1 }]);
  const [history, setHistory]     = useState([]);
  const [input, setInput]         = useState('');
  const [typing, setTyping]       = useState(false);
  const [showLead, setShowLead]   = useState(false);
  const [leadName, setLeadName]   = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [leads, setLeads]         = useState([]);
  const [toast, setToast]         = useState('');
  const bottomRef = useRef(null);
  const taRef     = useRef(null);

  /* inject Google Fonts link once */
  useEffect(() => {
    const id = 'vn-gfonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id   = id;
      link.rel  = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  /* scroll to bottom on new messages */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  const showToast = useCallback((m) => {
    setToast(m);
    setTimeout(() => setToast(''), 2800);
  }, []);

  const switchLang = (i) => {
    setLangIdx(i);
    setMsgs([{ role: 'assistant', content: LANGS[i].greeting, id: Date.now() }]);
    setHistory([]);
    setShowLead(false);
  };

  const send = async (text) => {
    const msg = (text ?? input).trim();
    if (!msg || typing) return;
    setInput('');
    if (taRef.current) taRef.current.style.height = 'auto';
    const userMsg = { role: 'user', content: msg, id: Date.now() };
    setMsgs(p => [...p, userMsg]);
    const newHist = [...history, { role: 'user', content: msg }];
    setHistory(newHist);
    if (/book|call|contact|meet|connect|demo/i.test(msg)) {
      setTimeout(() => setShowLead(true), 500);
    }
    setTyping(true);
    try {
      const res = await fetch('/api/nova', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHist, system: SYSTEM_PROMPT }),
      });
      const data = await res.json();
      const reply = data?.content?.[0]?.text || 'Something went wrong, please try again.';
      setMsgs(p => [...p, { role: 'assistant', content: reply, id: Date.now() }]);
      setHistory(p => [...p, { role: 'assistant', content: reply }]);
    } catch {
      setMsgs(p => [...p, { role: 'assistant', content: 'Connection issue. Try again or email hello@valmontmarketing.com', id: Date.now() }]);
    }
    setTyping(false);
  };

  const saveLead = () => {
    if (!leadName.trim() || !leadContact.trim()) { showToast('Please fill both fields.'); return; }
    setLeads(p => [...p, { name: leadName, contact: leadContact }]);
    setShowLead(false);
    setLeadName(''); setLeadContact('');
    setMsgs(p => [...p, { role: 'assistant', content: 'Got it ' + leadName + '! Our team will reach out to you shortly.', id: Date.now() }]);
    showToast('Details saved! Team will reach out soon.');
  };

  const stripMd = (text) => text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/__(.*?)__/g, '$1').replace(/`(.*?)`/g, '$1');

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const onInput = (e) => {
    setInput(e.target.value);
    const el = taRef.current;
    if (el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 90) + 'px'; }
  };

  /* ── Styles: only keyframe animations here, NO @import ── */
  const keyframes = `
    @keyframes vn-pulse {
      0%, 100% { box-shadow: 0 4px 20px rgba(0,194,184,.5), 0 0 0 0 rgba(0,194,184,.3); }
      50%       { box-shadow: 0 4px 20px rgba(0,194,184,.5), 0 0 0 10px rgba(0,194,184,0); }
    }
    @keyframes vn-open {
      from { opacity: 0; transform: scale(0.88) translateY(16px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes vn-in {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes vn-bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30%            { transform: translateY(-5px); }
    }
    .vn-fab {
      position: fixed; bottom: 28px; right: 28px; z-index: 9990;
      width: 58px; height: 58px; border-radius: 50%; border: none; cursor: pointer;
      background: linear-gradient(135deg,#00C2B8,#00D1FF,#2F80FF);
      display: flex; align-items: center; justify-content: center;
      animation: vn-pulse 2.5s ease-in-out infinite;
      transition: transform .3s cubic-bezier(.34,1.56,.64,1);
    }
    .vn-fab:hover { transform: scale(1.1); }
    .vn-panel {
      position: fixed; bottom: 98px; right: 28px; z-index: 9989;
      width: 375px; height: 600px;
      background: #0E1A22; border: 1px solid rgba(0,194,184,.15); border-radius: 20px;
      overflow: hidden; display: flex; flex-direction: column;
      box-shadow: 0 24px 70px rgba(0,0,0,.6), 0 0 30px rgba(0,194,184,.1);
      animation: vn-open .35s cubic-bezier(.34,1.56,.64,1);
      font-family: 'Inter', system-ui, sans-serif;
    }
    .vn-msg { display: flex; gap: 8px; animation: vn-in .25s ease; }
    .vn-msg.user { flex-direction: row-reverse; }
    .vn-dot span {
      width: 6px; height: 6px; background: #00C2B8; border-radius: 50%;
      display: inline-block; animation: vn-bounce 1.2s ease-in-out infinite;
    }
    .vn-dot span:nth-child(2) { animation-delay: .15s; background: #00D1FF; }
    .vn-dot span:nth-child(3) { animation-delay: .30s; background: #2F80FF; }
    .vn-chip {
      padding: 5px 12px; border-radius: 20px; font-size: 11.5px; font-weight: 500;
      border: 1px solid rgba(0,194,184,.22); color: #9FB3C8; cursor: pointer;
      background: rgba(0,194,184,.06); transition: all .2s; font-family: inherit;
      white-space: nowrap;
    }
    .vn-chip:hover { background: rgba(0,194,184,.18); color: #00C2B8; border-color: #00C2B8; }
    .vn-ta {
      flex: 1; background: #111A22; border: 1px solid rgba(0,194,184,.2);
      border-radius: 10px; padding: 9px 12px; color: #EAF2F7;
      font-size: 13.5px; font-family: inherit; outline: none;
      resize: none; min-height: 38px; max-height: 90px; line-height: 1.4;
      transition: border-color .2s; scrollbar-width: none;
    }
    .vn-ta:focus { border-color: #00C2B8; }
    .vn-ta::placeholder { color: #6B7C93; }
    .vn-lf-inp {
      width: 100%; background: rgba(0,0,0,.3); border: 1px solid rgba(0,194,184,.2);
      border-radius: 8px; padding: 8px 11px; color: #EAF2F7;
      font-size: 13px; font-family: inherit; outline: none;
      transition: border-color .2s; box-sizing: border-box;
    }
    .vn-lf-inp:focus { border-color: #00C2B8; }
    .vn-lf-inp::placeholder { color: #6B7C93; }
    @media (max-width: 440px) {
      .vn-panel { width: calc(100vw - 14px); right: 7px; bottom: 88px; height: calc(100vh - 108px); }
      .vn-fab   { right: 16px; bottom: 16px; }
    }
  `;

  /* ── Shared colour tokens ── */
  const border  = 'rgba(0,194,184,.15)';
  const grad    = 'linear-gradient(135deg,#00C2B8,#00D1FF,#2F80FF)';
  const panel   = '#111A22';
  const text    = '#EAF2F7';
  const text2   = '#9FB3C8';

  return (
    <>
      <style>{keyframes}</style>

      {/* ── Floating Action Button ── */}
      <button className="vn-fab" onClick={() => setOpen(o => !o)} aria-label="Open VANTIX Nova">
        {open
          ? <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          : <svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        }
      </button>

      {/* ── Chat Panel ── */}
      {open && (
        <div className="vn-panel">

          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg,rgba(0,194,184,.13),rgba(47,128,255,.07))', borderBottom: '1px solid ' + border, padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 11, flexShrink: 0 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 17, color: '#fff', flexShrink: 0, position: 'relative' }}>
              V
              <span style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, background: '#22c55e', borderRadius: '50%', border: '2px solid #0E1A22' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 800, fontSize: 14, color: text, letterSpacing: '-.01em' }}>VANTIX Nova — Valmont AI</div>
              <div style={{ fontSize: 11, color: '#22c55e', marginTop: 2 }}>● Online · AI Active</div>
            </div>
          </div>

          {/* Language Bar */}
          <div style={{ display: 'flex', gap: 5, padding: '7px 12px', background: 'rgba(0,0,0,.25)', borderBottom: '1px solid rgba(255,255,255,.04)', overflowX: 'auto', scrollbarWidth: 'none', flexShrink: 0 }}>
            {LANGS.map((l, i) => (
              <button
                key={l.code}
                onClick={() => switchLang(i)}
                style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, border: '1px solid ' + (langIdx === i ? 'rgba(0,194,184,.6)' : 'rgba(255,255,255,.1)'), background: langIdx === i ? 'rgba(0,194,184,.14)' : 'transparent', color: langIdx === i ? '#00D1FF' : text2, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit', transition: 'all .2s' }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 9, scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,194,184,.2) transparent' }}>
            {msgs.map((m) => (
              <div key={m.id} className={'vn-msg' + (m.role === 'user' ? ' user' : '')}>
                {m.role === 'assistant' && (
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#fff', fontWeight: 800, flexShrink: 0, marginTop: 2 }}>V</div>
                )}
                <div style={{
                  padding: '9px 12px', borderRadius: 14, fontSize: 13.5, lineHeight: 1.5,
                  maxWidth: '82%', wordBreak: 'break-word',
                  ...(m.role === 'user'
                    ? { background: 'linear-gradient(135deg,rgba(0,194,184,.22),rgba(47,128,255,.22))', border: '1px solid rgba(0,194,184,.28)', color: text, borderBottomRightRadius: 3 }
                    : { background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.07)', color: text, borderBottomLeftRadius: 3 })
                }}>
                  {stripMd(m.content)}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="vn-msg">
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#fff', fontWeight: 800, flexShrink: 0, marginTop: 2 }}>V</div>
                <div style={{ padding: '10px 14px', borderRadius: 14, borderBottomLeftRadius: 3, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.07)' }}>
                  <div className="vn-dot" style={{ display: 'flex', gap: 4 }}><span /><span /><span /></div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, padding: '4px 12px 8px', flexShrink: 0 }}>
            {QUICK_REPLIES.map((qr) => (
              <button key={qr} className="vn-chip" onClick={() => send(qr)}>{qr}</button>
            ))}
          </div>

          {/* Lead Capture Form */}
          {showLead && (
            <div style={{ margin: '0 12px 10px', padding: 13, background: 'rgba(0,194,184,.06)', border: '1px solid rgba(0,194,184,.2)', borderRadius: 12, flexShrink: 0 }}>
              <div style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 11, fontWeight: 700, color: '#00D1FF', marginBottom: 9, textTransform: 'uppercase', letterSpacing: '.06em' }}>Get in Touch</div>
              <input className="vn-lf-inp" placeholder="Your name" value={leadName} onChange={e => setLeadName(e.target.value)} style={{ marginBottom: 7 }} />
              <input className="vn-lf-inp" placeholder="Email or WhatsApp number" value={leadContact} onChange={e => setLeadContact(e.target.value)} style={{ marginBottom: 9 }} />
              <button
                onClick={saveLead}
                style={{ width: '100%', padding: '8px 0', borderRadius: 8, background: grad, border: 'none', color: '#fff', fontFamily: "'Syne', system-ui, sans-serif", fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'opacity .2s' }}
                onMouseOver={e => { e.currentTarget.style.opacity = '.88'; }}
                onMouseOut={e => { e.currentTarget.style.opacity = '1'; }}
              >
                Send to Valmont Team →
              </button>
            </div>
          )}

          {/* Input Area */}
          <div style={{ padding: '9px 12px 14px', borderTop: '1px solid rgba(255,255,255,.06)', display: 'flex', gap: 8, alignItems: 'flex-end', background: 'rgba(0,0,0,.18)', flexShrink: 0 }}>
            <textarea
              ref={taRef}
              className="vn-ta"
              placeholder="Ask about our services…"
              value={input}
              rows={1}
              onChange={onInput}
              onKeyDown={onKeyDown}
            />
            <button
              onClick={() => send()}
              disabled={typing || !input.trim()}
              style={{ width: 38, height: 38, borderRadius: 10, background: grad, border: 'none', cursor: typing || !input.trim() ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: typing || !input.trim() ? .4 : 1, transition: 'opacity .2s, transform .2s' }}
              onMouseOver={e => { if (!typing && input.trim()) e.currentTarget.style.transform = 'scale(1.06)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 10001, background: 'rgba(11,15,20,.97)', border: '1px solid rgba(0,194,184,.35)', borderRadius: 9, padding: '9px 18px', fontSize: 12, color: '#00D1FF', boxShadow: '0 6px 20px rgba(0,0,0,.5)', fontFamily: "'Inter', system-ui, sans-serif", whiteSpace: 'nowrap' }}>
          {toast}
        </div>
      )}
    </>
  );
}
