/**
 * VANTIX Nova — Embeddable Chat Widget
 * Usage: <script src="https://valmontmarketing.com/nova.js" data-client="valmont"></script>
 */
(function () {
  'use strict';

  var script = document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  var cfg = {
    client: script.getAttribute('data-client') || 'valmont',
    name: script.getAttribute('data-name') || 'VANTIX Nova',
    color: script.getAttribute('data-color') || '#00C2B8',
    api: script.getAttribute('data-api') || '/api/nova',
    greeting: script.getAttribute('data-greeting') || 'Hi! I\'m Nova, your AI assistant. How can I help you today?',
  };

  var SYSTEM = 'You are VANTIX Nova, the AI assistant for Valmont Marketing. Be concise, warm, and professional. Keep replies under 80 words. You help with: Brand Strategy, AI Systems (VANTIX with 10 Solaris Knights agents), Paid Media, SEO, Web Development, Political Consulting, HappieBaby, HappiePaw. Pricing: Basic ₹25k/mo, Standard ₹45k/mo, Premium ₹75k-1L/mo.';

  var messages = [];
  var isOpen = false;
  var isLoading = false;
  var leads = [];

  // ── Styles ──────────────────────────────────────────────────────────────────
  var css = '\n' +
    '#vnova-root*{box-sizing:border-box;font-family:system-ui,sans-serif}\n' +
    '#vnova-fab{position:fixed;bottom:24px;right:24px;z-index:9998;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#00C2B8,#00D1FF,#2F80FF);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(0,194,184,.5);transition:transform .2s,box-shadow .2s}\n' +
    '#vnova-fab:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(0,194,184,.65)}\n' +
    '.vnova-pulse{position:absolute;inset:-6px;border-radius:50%;border:2px solid rgba(0,194,184,.5);animation:vnovaP 2s ease-out infinite}\n' +
    '@keyframes vnovaP{0%{transform:scale(1);opacity:.8}100%{transform:scale(1.6);opacity:0}}\n' +
    '#vnova-panel{position:fixed;bottom:92px;right:24px;z-index:9999;width:360px;max-height:580px;background:rgba(11,15,20,.98);border:1px solid rgba(0,194,184,.22);border-radius:18px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.75);backdrop-filter:blur(20px);transform-origin:bottom right;transition:transform .35s cubic-bezier(.34,1.56,.64,1),opacity .25s}\n' +
    '#vnova-panel.hidden{transform:scale(.5) translateY(40px);opacity:0;pointer-events:none}\n' +
    '#vnova-panel.visible{transform:scale(1);opacity:1}\n' +
    '.vnh{padding:12px 14px;background:rgba(0,194,184,.07);border-bottom:1px solid rgba(0,194,184,.12);display:flex;align-items:center;gap:10px}\n' +
    '.vnav{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#00C2B8,#2F80FF);display:flex;align-items:center;justify-content:center;font-size:14px;color:#fff;position:relative;flex-shrink:0}\n' +
    '.vnavd{position:absolute;bottom:1px;right:1px;width:8px;height:8px;background:#22c55e;border-radius:50%;border:2px solid #0B0F14}\n' +
    '.vnn{font-size:13px;font-weight:700;color:#fff;flex:1}\n' +
    '.vns{font-size:11px;color:#22c55e}\n' +
    '.vnhb{width:28px;height:28px;border-radius:7px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.6);font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}\n' +
    '.vnhb:hover{background:rgba(0,194,184,.15);color:#00C2B8}\n' +
    '.vnm{flex:1;overflow-y:auto;padding:14px 12px;display:flex;flex-direction:column;gap:8px;scrollbar-width:thin;scrollbar-color:rgba(0,194,184,.2) transparent}\n' +
    '.vnm::-webkit-scrollbar{width:3px}.vnm::-webkit-scrollbar-thumb{background:rgba(0,194,184,.2);border-radius:2px}\n' +
    '.vnmsg{display:flex;gap:7px;max-width:86%;animation:vnmi .22s ease}\n' +
    '@keyframes vnmi{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}\n' +
    '.vnmsg.bot{align-self:flex-start}.vnmsg.user{align-self:flex-end;flex-direction:row-reverse}\n' +
    '.vnbbl{padding:9px 12px;border-radius:14px;font-size:13px;line-height:1.5;word-break:break-word}\n' +
    '.vnbbl.bot{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.9);border-bottom-left-radius:3px}\n' +
    '.vnbbl.user{background:linear-gradient(135deg,rgba(0,194,184,.25),rgba(47,128,255,.25));border:1px solid rgba(0,194,184,.3);color:#fff;border-bottom-right-radius:3px}\n' +
    '.vntyp{display:flex;align-items:center;gap:4px;padding:9px 12px}\n' +
    '.vntyp span{width:6px;height:6px;background:#00C2B8;border-radius:50%;animation:vnb 1.2s ease-in-out infinite}\n' +
    '.vntyp span:nth-child(2){animation-delay:.2s;background:#00D1FF}.vntyp span:nth-child(3){animation-delay:.4s;background:#2F80FF}\n' +
    '@keyframes vnb{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}\n' +
    '.vnqr{display:flex;flex-wrap:wrap;gap:5px;padding:4px 12px 6px}\n' +
    '.vnchip{padding:4px 10px;border-radius:18px;font-size:11px;font-weight:600;background:rgba(0,194,184,.08);border:1px solid rgba(0,194,184,.25);color:#00C2B8;cursor:pointer;transition:all .2s;white-space:nowrap}\n' +
    '.vnchip:hover{background:rgba(0,194,184,.18)}\n' +
    '.vnlf{margin:0 12px 8px;padding:12px;background:rgba(0,194,184,.05);border:1px solid rgba(0,194,184,.2);border-radius:12px}\n' +
    '.vnlft{font-size:11px;font-weight:700;color:#00D1FF;margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em}\n' +
    '.vnlfi{width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:7px;padding:7px 9px;font-size:12px;color:#fff;margin-bottom:7px;outline:none;transition:border-color .2s}\n' +
    '.vnlfi:focus{border-color:rgba(0,194,184,.5)}.vnlfi::placeholder{color:rgba(255,255,255,.3)}\n' +
    '.vnlfs{width:100%;padding:7px;border-radius:7px;background:linear-gradient(135deg,#00C2B8,#2F80FF);border:none;color:#fff;font-size:12px;font-weight:700;cursor:pointer;transition:opacity .2s}\n' +
    '.vnlfs:hover{opacity:.9}\n' +
    '.vnia{padding:9px 12px 13px;border-top:1px solid rgba(255,255,255,.06);display:flex;gap:7px;align-items:flex-end;background:rgba(0,0,0,.2)}\n' +
    '.vnta{flex:1;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:11px;padding:8px 11px;font-size:13px;color:#fff;resize:none;outline:none;min-height:38px;max-height:90px;line-height:1.5;transition:border-color .2s;scrollbar-width:none}\n' +
    '.vnta:focus{border-color:rgba(0,194,184,.4)}.vnta::placeholder{color:rgba(255,255,255,.3)}\n' +
    '.vnsb{width:38px;height:38px;border-radius:11px;background:linear-gradient(135deg,#00C2B8,#2F80FF);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity .2s,transform .2s}\n' +
    '.vnsb:hover{opacity:.9;transform:scale(1.05)}.vnsb:disabled{opacity:.4;cursor:default;transform:none}\n' +
    '.vntoast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:10001;background:rgba(11,15,20,.97);border:1px solid rgba(0,194,184,.35);border-radius:9px;padding:9px 18px;font-size:12px;color:#00D1FF;box-shadow:0 6px 20px rgba(0,0,0,.5);animation:vnti .3s ease}\n' +
    '@keyframes vnti{from{opacity:0;transform:translateX(-50%) translateY(14px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}\n' +
    '@media(max-width:400px){#vnova-panel{width:calc(100vw - 12px);right:6px}}\n';

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── DOM ──────────────────────────────────────────────────────────────────────
  var root = document.createElement('div');
  root.id = 'vnova-root';

  // FAB
  var fab = document.createElement('button');
  fab.id = 'vnova-fab';
  fab.setAttribute('aria-label', 'Open ' + cfg.name);
  fab.innerHTML = '<div class="vnova-pulse"></div><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  root.appendChild(fab);

  // Panel
  var panel = document.createElement('div');
  panel.id = 'vnova-panel';
  panel.className = 'hidden';
  panel.innerHTML =
    '<div class="vnh">' +
      '<div class="vnav">✦<div class="vnavd"></div></div>' +
      '<div style="flex:1;min-width:0"><div class="vnn">' + cfg.name + '</div><div class="vns">● Online · AI Active</div></div>' +
      '<button class="vnhb" id="vnova-handoff-btn" title="Request Human Agent"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></button>' +
    '</div>' +
    '<div id="vnova-msgs" class="vnm"></div>' +
    '<div id="vnova-qr" class="vnqr"></div>' +
    '<div id="vnova-lf" class="vnlf" style="display:none">' +
      '<div class="vnlft">Get in Touch</div>' +
      '<input class="vnlfi" id="vnova-lf-name" placeholder="Your name">' +
      '<input class="vnlfi" id="vnova-lf-contact" placeholder="Email or WhatsApp number">' +
      '<button class="vnlfs" id="vnova-lf-submit">Send to Team →</button>' +
    '</div>' +
    '<div class="vnia">' +
      '<textarea class="vnta" id="vnova-input" placeholder="Ask about our services…" rows="1"></textarea>' +
      '<button class="vnsb" id="vnova-send"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>' +
    '</div>';
  root.appendChild(panel);

  document.body.appendChild(root);

  // ── Helpers ──────────────────────────────────────────────────────────────────
  var msgsEl = document.getElementById('vnova-msgs');
  var inputEl = document.getElementById('vnova-input');
  var sendBtn = document.getElementById('vnova-send');
  var qrEl = document.getElementById('vnova-qr');
  var lfEl = document.getElementById('vnova-lf');
  var lfName = document.getElementById('vnova-lf-name');
  var lfContact = document.getElementById('vnova-lf-contact');
  var lfSubmit = document.getElementById('vnova-lf-submit');

  function scrollBottom() {
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function showToast(msg) {
    var t = document.getElementById('vnova-toast');
    if (t) t.remove();
    var el = document.createElement('div');
    el.id = 'vnova-toast';
    el.className = 'vntoast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.remove(); }, 3000);
  }

  function addMessage(role, text) {
    var wrap = document.createElement('div');
    wrap.className = 'vnmsg ' + (role === 'user' ? 'user' : 'bot');
    var bbl = document.createElement('div');
    bbl.className = 'vnbbl ' + (role === 'user' ? 'user' : 'bot');
    bbl.textContent = text;
    if (role === 'assistant') {
      var av = document.createElement('div');
      av.className = 'vnav';
      av.textContent = '✦';
      wrap.appendChild(av);
    }
    wrap.appendChild(bbl);
    msgsEl.appendChild(wrap);
    scrollBottom();
  }

  function showTyping() {
    var el = document.createElement('div');
    el.id = 'vnova-typing';
    el.className = 'vnmsg bot';
    el.innerHTML = '<div class="vnav">✦</div><div class="vnbbl bot"><div class="vntyp"><span></span><span></span><span></span></div></div>';
    msgsEl.appendChild(el);
    scrollBottom();
    return el;
  }

  function removeTyping() {
    var el = document.getElementById('vnova-typing');
    if (el) el.remove();
  }

  function setQuickReplies(chips) {
    qrEl.innerHTML = '';
    chips.forEach(function (c) {
      var btn = document.createElement('button');
      btn.className = 'vnchip';
      btn.textContent = c;
      btn.addEventListener('click', function () { sendMessage(c); });
      qrEl.appendChild(btn);
    });
  }

  var defaultChips = ['What services do you offer?', 'VANTIX AI agents', 'Pricing plans', 'Book a call'];
  var pricingChips = ['Basic ₹25k/mo', 'Standard ₹45k/mo', 'Premium ₹75k-1L', 'Book a demo'];
  var agentChips = ['Tell me about Orion', 'What does Atlas do?', 'All 10 agents', 'Nova pricing'];

  function detectContext(text) {
    var t = text.toLowerCase();
    if (t.match(/price|pricing|cost|plan|₹/)) setQuickReplies(pricingChips);
    else if (t.match(/agent|vantix|knight|orion|atlas|axon/)) setQuickReplies(agentChips);
    else setQuickReplies(defaultChips);
    if (t.match(/book|contact|call|demo|reach/)) lfEl.style.display = 'block';
  }

  async function sendMessage(text) {
    var trimmed = (text || inputEl.value).trim();
    if (!trimmed || isLoading) return;
    inputEl.value = '';
    inputEl.style.height = 'auto';
    messages.push({ role: 'user', content: trimmed });
    addMessage('user', trimmed);
    detectContext(trimmed);
    isLoading = true;
    sendBtn.disabled = true;
    var typingEl = showTyping();

    try {
      var res = await fetch(cfg.api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messages, system: SYSTEM }),
      });
      var data = await res.json();
      var reply = (data && data.content && data.content[0] && data.content[0].text) || 'Sorry, I could not respond. Please try again.';
      removeTyping();
      messages.push({ role: 'assistant', content: reply });
      addMessage('assistant', reply);
      detectContext(reply);
    } catch (e) {
      removeTyping();
      addMessage('assistant', 'Connection error. Please try again.');
    } finally {
      isLoading = false;
      sendBtn.disabled = false;
    }
  }

  // ── Events ───────────────────────────────────────────────────────────────────
  fab.addEventListener('click', function () {
    isOpen = !isOpen;
    panel.className = isOpen ? 'visible' : 'hidden';
    fab.innerHTML = isOpen
      ? '<div class="vnova-pulse"></div><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      : '<div class="vnova-pulse"></div><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  });

  sendBtn.addEventListener('click', function () { sendMessage(); });

  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  inputEl.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 90) + 'px';
  });

  document.getElementById('vnova-handoff-btn').addEventListener('click', function () {
    showToast('Handoff requested! A team member will join shortly.');
    addMessage('assistant', 'I\'ve connected you to our team. A human specialist will be with you shortly!');
  });

  lfSubmit.addEventListener('click', function () {
    var n = lfName.value.trim();
    var c = lfContact.value.trim();
    if (!n && !c) { showToast('Please enter your name or contact.'); return; }
    leads.push({ name: n || '—', contact: c || '—', time: new Date().toLocaleTimeString() });
    lfName.value = '';
    lfContact.value = '';
    lfEl.style.display = 'none';
    showToast('Thanks! Our team will reach out shortly.');
    addMessage('assistant', 'Got it! A Valmont specialist will reach out to ' + (c || n) + ' soon. Anything else I can help with?');
  });

  // ── Init ─────────────────────────────────────────────────────────────────────
  messages.push({ role: 'assistant', content: cfg.greeting });
  addMessage('assistant', cfg.greeting);
  setQuickReplies(defaultChips);

})();
