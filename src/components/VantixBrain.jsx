'use client';

import { useEffect, useRef, useState } from 'react';

// ── SOLARIS KNIGHTS DATA ──────────────────────────────────────────────────────
const AGENTS = [
  { name: 'SCRIBE',   desc: 'Content Intelligence & Generation',   angle: 0,   orbit: 0 },
  { name: 'HERALD',   desc: 'Distribution & Broadcast Engine',     angle: 36,  orbit: 0 },
  { name: 'PHANTOM',  desc: 'Stealth Research & Competitive Intel',angle: 72,  orbit: 0 },
  { name: 'ORACLE',   desc: 'Predictive Analytics & Forecasting',  angle: 108, orbit: 0 },
  { name: 'CIPHER',   desc: 'Data Encryption & Security Layer',    angle: 144, orbit: 1 },
  { name: 'FORGE',    desc: 'Campaign Construction & Automation',  angle: 192, orbit: 1 },
  { name: 'PIXEL',    desc: 'Visual Intelligence & Design AI',     angle: 240, orbit: 1 },
  { name: 'SENTINEL', desc: 'Brand Monitoring & Alert System',     angle: 48,  orbit: 2 },
  { name: 'AUDITOR',  desc: 'Performance Audit & ROI Engine',      angle: 168, orbit: 2 },
  { name: 'NEXUS',    desc: 'Master Orchestration Core',           angle: 288, orbit: 2 },
];
const ORBIT_RADII = [130, 210, 295];

export default function VantixBrain() {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: 0, y: 0 });
  const stateRef  = useRef({
    orbitAngle: 0,
    targetZoom: 1,
    zoomFactor: 1,
    paused: false,
    dragX: null,
    radarAngle: 0,
    particles: [],
    sparks: [],
    startTime: Date.now(),
    queryCount: 0,
  });

  const [tooltip, setTooltip]       = useState({ show: false, name: '', desc: '', x: 0, y: 0 });
  const [activeAgent, setActiveAgent] = useState(0);
  const [gestureLabel, setGestureLabel] = useState('MOTION CONTROL: READY');
  const [metrics, setMetrics]        = useState({ neural: '87.3', intel: '94.1', streams: '1.2', uptime: '00:00:00', queries: 0 });
  const [booted, setBooted]          = useState(false);
  const [bootLine, setBootLine]      = useState('INITIALIZING NEURAL CORE...');

  // ── BOOT SEQUENCE ────────────────────────────────────────────────────────────
  useEffect(() => {
    const lines = [
      'INITIALIZING NEURAL CORE...',
      'LOADING SOLARIS KNIGHTS...',
      'CALIBRATING INTELLIGENCE MATRIX...',
      'ESTABLISHING ORBITAL PATHWAYS...',
      'VANTIX AI ONLINE',
    ];
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i < lines.length) setBootLine(lines[i]);
      if (i >= lines.length - 1) {
        clearInterval(iv);
        setTimeout(() => setBooted(true), 600);
      }
    }, 500);
    return () => clearInterval(iv);
  }, []);

  // ── INIT PARTICLES ────────────────────────────────────────────────────────────
  useEffect(() => {
    const p = [];
    for (let i = 0; i < 130; i++) {
      p.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random() * 0.45 + 0.05,
      });
    }
    stateRef.current.particles = p;
  }, []);

  // ── MAIN CANVAS LOOP ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H, cx, cy;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      cx = W / 2; cy = H / 2;
    }
    resize();
    window.addEventListener('resize', resize);

    // sparks helper
    function addSpark(sx, sy, tx, ty) {
      const s = stateRef.current;
      for (let j = 0; j < 3; j++) {
        s.sparks.push({ x: sx, y: sy, tx: tx + (Math.random()-0.5)*18, ty: ty + (Math.random()-0.5)*18, t: 0 });
      }
    }
    const sparkInterval = setInterval(() => {
      const s = stateRef.current;
      const i  = Math.floor(Math.random() * AGENTS.length);
      const a  = AGENTS[i];
      const rotated = (a.angle * Math.PI / 180) + s.orbitAngle;
      const r  = ORBIT_RADII[a.orbit] * s.zoomFactor;
      addSpark(cx, cy, cx + Math.cos(rotated) * r, cy + Math.sin(rotated) * r);
    }, 650);

    // metric ticks
    const metricInterval = setInterval(() => {
      const s = stateRef.current;
      const nl = (82 + Math.sin(Date.now() * 0.0007) * 8).toFixed(1);
      const ii = (91 + Math.sin(Date.now() * 0.0005 + 1) * 4).toFixed(1);
      const ds = (0.9 + Math.sin(Date.now() * 0.0009) * 0.5).toFixed(1);
      const elapsed = Math.floor((Date.now() - s.startTime) / 1000);
      const hh = String(Math.floor(elapsed / 3600)).padStart(2,'0');
      const mm = String(Math.floor((elapsed % 3600) / 60)).padStart(2,'0');
      const ss = String(elapsed % 60).padStart(2,'0');
      if (Math.random() < 0.3) s.queryCount++;
      setMetrics({ neural: nl, intel: ii, streams: ds, uptime: `${hh}:${mm}:${ss}`, queries: s.queryCount });
      if (Math.random() < 0.08) setActiveAgent(Math.floor(Math.random() * 10));
    }, 900);

    function draw() {
      const s   = stateRef.current;
      const mx  = mouseRef.current.x;
      const my  = mouseRef.current.y;

      ctx.clearRect(0, 0, W, H);

      // bg
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W,H)*0.7);
      bg.addColorStop(0, 'rgba(9,19,37,1)');
      bg.addColorStop(1, 'rgba(6,13,26,1)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // grid
      ctx.save();
      ctx.globalAlpha = 0.025;
      ctx.strokeStyle = '#00C2B8';
      ctx.lineWidth   = 0.5;
      for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
      ctx.restore();

      // starfield
      for (const p of s.particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.save();
        ctx.globalAlpha = p.a;
        ctx.fillStyle = '#00C2B8';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
        ctx.restore();
      }

      // radar sweep
      s.radarAngle += 0.008;
      ctx.save();
      ctx.globalAlpha = 0.055;
      ctx.fillStyle = '#00C2B8';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, ORBIT_RADII[2] * s.zoomFactor + 20, s.radarAngle - 0.45, s.radarAngle);
      ctx.closePath(); ctx.fill();
      ctx.restore();

      // orbit rings
      [0,1,2].forEach((idx) => {
        const r = ORBIT_RADII[idx] * s.zoomFactor;
        ctx.save();
        ctx.globalAlpha = 0.07;
        ctx.strokeStyle = '#00C2B8';
        ctx.lineWidth = 1;
        if (idx !== 1) ctx.setLineDash([4,8]);
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      });

      // connections — travelling dots from core to nodes
      for (let i = 0; i < AGENTS.length; i++) {
        const a = AGENTS[i];
        const rotated = (a.angle * Math.PI / 180) + s.orbitAngle;
        const r  = ORBIT_RADII[a.orbit] * s.zoomFactor;
        const nx = cx + Math.cos(rotated) * r;
        const ny = cy + Math.sin(rotated) * r;
        const t  = (Date.now() * 0.0008 + i * 0.28) % 1;
        ctx.save();
        ctx.globalAlpha = 0.035;
        ctx.strokeStyle = '#00C2B8';
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(nx, ny); ctx.stroke();
        ctx.globalAlpha = 0.55;
        ctx.fillStyle = '#00E5FF';
        ctx.beginPath(); ctx.arc(cx + (nx-cx)*t, cy + (ny-cy)*t, 1.8, 0, Math.PI*2); ctx.fill();
        ctx.restore();
      }

      // CORE
      const coreR = 48 * s.zoomFactor;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 3);
      grd.addColorStop(0, 'rgba(0,194,184,0.14)');
      grd.addColorStop(0.4, 'rgba(0,194,184,0.04)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(cx, cy, coreR*3, 0, Math.PI*2); ctx.fill();

      [0.45, 0.75, 1].forEach(f => {
        ctx.save();
        ctx.globalAlpha = 0.07;
        ctx.strokeStyle = '#00C2B8';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(cx, cy, coreR*f, 0, Math.PI*2); ctx.stroke();
        ctx.restore();
      });

      const pulse = 0.85 + 0.15 * Math.sin(Date.now() * 0.003);
      const cGrd  = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * pulse);
      cGrd.addColorStop(0, 'rgba(0,229,255,0.9)');
      cGrd.addColorStop(0.5, 'rgba(0,194,184,0.55)');
      cGrd.addColorStop(1, 'transparent');
      ctx.fillStyle = cGrd;
      ctx.beginPath(); ctx.arc(cx, cy, coreR * pulse, 0, Math.PI*2); ctx.fill();

      ctx.save();
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = `900 ${Math.round(11*s.zoomFactor)}px Orbitron, monospace`;
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.fillText('VANTIX', cx, cy - 7*s.zoomFactor);
      ctx.font = `400 ${Math.round(6.5*s.zoomFactor)}px 'Share Tech Mono', monospace`;
      ctx.fillStyle = 'rgba(0,229,255,0.55)';
      ctx.fillText('NEURAL CORE', cx, cy + 8*s.zoomFactor);
      ctx.restore();

      // NODES
      let hovered = false;
      for (let i = 0; i < AGENTS.length; i++) {
        const a = AGENTS[i];
        const rotated = (a.angle * Math.PI / 180) + s.orbitAngle;
        const r  = ORBIT_RADII[a.orbit] * s.zoomFactor;
        const nx = cx + Math.cos(rotated) * r;
        const ny = cy + Math.sin(rotated) * r;
        const nr = 12 * s.zoomFactor;
        const dx = mx - nx, dy = my - ny;
        const isHover = Math.sqrt(dx*dx+dy*dy) < nr * 2.8;

        if (isHover) {
          hovered = true;
          setTooltip({ show: true, name: a.name, desc: a.desc, x: nx + 18, y: ny - 18 });
          setActiveAgent(i);
        }

        // glow bg
        if (isHover || activeAgent === i) {
          const gGrd = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr*3);
          gGrd.addColorStop(0, 'rgba(0,194,184,0.22)');
          gGrd.addColorStop(1, 'transparent');
          ctx.fillStyle = gGrd;
          ctx.beginPath(); ctx.arc(nx, ny, nr*3, 0, Math.PI*2); ctx.fill();
        }

        ctx.save();
        ctx.strokeStyle = '#00C2B8';
        ctx.lineWidth   = isHover ? 1.5 : 0.8;
        ctx.globalAlpha = isHover ? 0.95 : 0.4;
        ctx.beginPath(); ctx.arc(nx, ny, nr, 0, Math.PI*2); ctx.stroke();

        const nGrd = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr);
        nGrd.addColorStop(0, isHover ? 'rgba(0,229,255,0.7)' : 'rgba(0,194,184,0.28)');
        nGrd.addColorStop(1, 'transparent');
        ctx.fillStyle = nGrd; ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(nx, ny, nr, 0, Math.PI*2); ctx.fill();

        ctx.font = `600 ${Math.round(6.5*s.zoomFactor)}px Orbitron, monospace`;
        ctx.fillStyle = isHover ? '#fff' : 'rgba(0,194,184,0.72)';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.globalAlpha = isHover ? 1 : 0.85;
        ctx.fillText(a.name, nx, ny);
        ctx.restore();
      }
      if (!hovered) setTooltip(t => t.show ? { ...t, show: false } : t);

      // SPARKS
      for (let i = s.sparks.length - 1; i >= 0; i--) {
        const sp = s.sparks[i];
        sp.t += 0.025;
        if (sp.t >= 1) { s.sparks.splice(i,1); continue; }
        const px = sp.x + (sp.tx - sp.x) * sp.t;
        const py = sp.y + (sp.ty - sp.y) * sp.t;
        ctx.save();
        ctx.globalAlpha = (1 - sp.t) * 0.75;
        ctx.fillStyle = '#00E5FF';
        ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI*2); ctx.fill();
        ctx.restore();
      }

      if (!s.paused) {
        s.orbitAngle += 0.004;
        s.zoomFactor += (s.targetZoom - s.zoomFactor) * 0.05;
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(sparkInterval);
      clearInterval(metricInterval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ── MEDIAPIPE ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const videoEl = document.createElement('video');
    videoEl.autoplay = true; videoEl.playsInline = true;
    videoEl.style.display = 'none';
    document.body.appendChild(videoEl);

    let handsInstance = null;
    let cameraInstance = null;
    let handX = null;
    let pinchDist = null;

    function dist(a, b) {
      const dx = a.x - b.x, dy = a.y - b.y;
      return Math.sqrt(dx*dx+dy*dy);
    }
    function classify(lm) {
      const pinch = dist(lm[4], lm[8]);
      if (pinch < 0.07) return 'PINCH';
      const iUp = lm[8].y  < lm[5].y  - 0.05;
      const mUp = lm[12].y < lm[9].y  - 0.05;
      const rDn = lm[16].y > lm[5].y  - 0.02;
      const pDn = lm[20].y > lm[5].y  - 0.02;
      if (iUp && !mUp && rDn && pDn) return 'POINT';
      if (!iUp && !mUp) return 'FIST';
      if (iUp && mUp) return 'OPEN';
      return 'IDLE';
    }

    async function initHands() {
      try {
        const { Hands }  = await import('@mediapipe/hands');
        const { Camera } = await import('@mediapipe/camera_utils');

        handsInstance = new Hands({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}` });
        handsInstance.setOptions({ maxNumHands: 1, modelComplexity: 0, minDetectionConfidence: 0.7, minTrackingConfidence: 0.5 });
        handsInstance.onResults(results => {
          const s = stateRef.current;
          if (!results.multiHandLandmarks?.length) {
            setGestureLabel('MOTION CONTROL: SCANNING...');
            handX = null; pinchDist = null; return;
          }
          const lm      = results.multiHandLandmarks[0];
          const gesture = classify(lm);
          setGestureLabel(`GESTURE: ${gesture}`);

          if (gesture === 'OPEN') {
            if (handX !== null) s.orbitAngle += (lm[0].x - handX) * 8;
            handX = lm[0].x; s.paused = false;
          } else if (gesture === 'PINCH') {
            const cd = dist(lm[4], lm[8]);
            if (pinchDist !== null) s.targetZoom = Math.max(0.5, Math.min(2.2, s.targetZoom + (cd - pinchDist) * 3));
            pinchDist = cd; handX = null;
          } else if (gesture === 'FIST') {
            s.paused = true; handX = null;
            setGestureLabel('ORBIT PAUSED');
          } else {
            handX = null; pinchDist = null; s.paused = false;
          }
        });

        cameraInstance = new Camera(videoEl, {
          onFrame: async () => { if (handsInstance) await handsInstance.send({ image: videoEl }); },
          width: 320, height: 240
        });
        await cameraInstance.start();
        setGestureLabel('MOTION CONTROL: ACTIVE');
      } catch {
        setGestureLabel('MOTION CONTROL: MOUSE MODE');
      }
    }

    initHands();
    return () => {
      try { cameraInstance?.stop(); handsInstance?.close(); } catch {}
      document.body.removeChild(videoEl);
    };
  }, []);

  // ── MOUSE / KEYBOARD ─────────────────────────────────────────────────────────
  useEffect(() => {
    const s = stateRef.current;
    const onMove = e => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onDown = e => { s.dragX = e.clientX; };
    const onUp   = () => { s.dragX = null; };
    const onDrag = e => {
      if (s.dragX !== null) { s.orbitAngle += (e.clientX - s.dragX) * 0.005; s.dragX = e.clientX; }
    };
    const onWheel = e => { s.targetZoom = Math.max(0.5, Math.min(2.2, s.targetZoom - e.deltaY * 0.001)); };
    const onKey   = e => {
      if (e.key === ' ') s.paused = !s.paused;
      if (e.key === '+' || e.key === '=') s.targetZoom = Math.min(2.2, s.targetZoom + 0.1);
      if (e.key === '-') s.targetZoom = Math.max(0.5, s.targetZoom - 0.1);
      if (e.key === 'ArrowLeft')  s.orbitAngle -= 0.1;
      if (e.key === 'ArrowRight') s.orbitAngle += 0.1;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    window.addEventListener('wheel',     onWheel, { passive: true });
    window.addEventListener('keydown',   onKey);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('wheel',     onWheel);
      window.removeEventListener('keydown',   onKey);
    };
  }, []);

  // ── RENDER ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#060d1a', overflow: 'hidden', cursor: 'none', fontFamily: 'Rajdhani, sans-serif', zIndex: 0 }}>

      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600&family=Share+Tech+Mono&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        ::-webkit-scrollbar { display:none; }
      `}</style>

      {/* BOOT OVERLAY */}
      {!booted && (
        <div style={{ position:'fixed', inset:0, background:'#000', zIndex:100, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16 }}>
          <div style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(1.8rem,5vw,3.5rem)', fontWeight:900, letterSpacing:'0.3em', color:'#00C2B8', textShadow:'0 0 30px rgba(0,194,184,0.5)' }}>VANTIX AI</div>
          <div style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.7rem', letterSpacing:'0.5em', color:'rgba(0,194,184,0.45)' }}>INTELLIGENCE, ARCHITECTED</div>
          <div style={{ marginTop:32, width:260, height:2, background:'rgba(0,194,184,0.1)', border:'1px solid rgba(0,194,184,0.15)', overflow:'hidden' }}>
            <div style={{ height:'100%', background:'linear-gradient(90deg,#00C2B8,#00E5FF)', boxShadow:'0 0 10px #00E5FF', animation:'loadBar 2.5s ease forwards' }} />
          </div>
          <div style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.6rem', letterSpacing:'0.2em', color:'rgba(0,194,184,0.35)' }}>{bootLine}</div>
          <style>{`@keyframes loadBar{0%{width:0%}30%{width:35%}60%{width:65%}85%{width:88%}100%{width:100%}}`}</style>
        </div>
      )}

      {/* CANVAS */}
      <canvas ref={canvasRef} style={{ position:'fixed', inset:0, width:'100%', height:'100%' }} />

      {/* SCANLINE */}
      <div style={{ position:'fixed', inset:0, background:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)', pointerEvents:'none', zIndex:2 }} />

      {/* VIGNETTE */}
      <div style={{ position:'fixed', inset:0, background:'radial-gradient(ellipse at center,transparent 48%,rgba(0,0,0,0.55) 100%)', pointerEvents:'none', zIndex:2 }} />

      {/* HUD CORNERS */}
      {[['top:20px','left:20px',''],['top:20px','right:20px','scaleX(-1)'],['bottom:20px','left:20px','scaleY(-1)'],['bottom:20px','right:20px','scale(-1)']].map(([t, s2, tf], i) => (
        <div key={i} style={{ position:'fixed', width:60, height:60, [t.split(':')[0]]:t.split(':')[1], [s2.split(':')[0]]:s2.split(':')[1], transform:tf, pointerEvents:'none', zIndex:10 }}>
          <div style={{ position:'absolute', width:'100%', height:2, background:'#00C2B8', boxShadow:'0 0 8px #00E5FF' }} />
          <div style={{ position:'absolute', width:2, height:'100%', background:'#00C2B8', boxShadow:'0 0 8px #00E5FF' }} />
        </div>
      ))}

      {/* TOP BAR */}
      <div style={{ position:'fixed', top:0, left:0, right:0, height:60, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 90px', zIndex:20, background:'linear-gradient(180deg,rgba(6,13,26,0.96) 0%,transparent 100%)' }}>
        <div>
          <div style={{ fontFamily:'Orbitron,monospace', fontSize:'1.1rem', fontWeight:900, letterSpacing:'0.25em', color:'#00C2B8', textShadow:'0 0 20px rgba(0,194,184,0.4)' }}>VANTIX AI</div>
          <div style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.55rem', letterSpacing:'0.4em', color:'rgba(0,194,184,0.35)' }}>INTELLIGENCE, ARCHITECTED</div>
        </div>
        <div style={{ display:'flex', gap:28, alignItems:'center' }}>
          {['NEURAL CORE ACTIVE','SOLARIS ONLINE','LIVE'].map((l,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:7, fontFamily:'Share Tech Mono,monospace', fontSize:'0.6rem', letterSpacing:'0.12em', color:'rgba(0,194,184,0.55)' }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background: i===1?'#ffaa00':'#00C2B8', boxShadow:`0 0 6px ${i===1?'#ffaa00':'#00C2B8'}`, animation:'blink 2s ease-in-out infinite', animationDelay:`${i*0.4}s` }} />
              {l}
            </div>
          ))}
        </div>
        <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.25}}`}</style>
      </div>

      {/* LEFT PANEL — SOLARIS */}
      <div style={{ position:'fixed', left:28, top:'50%', transform:'translateY(-50%)', zIndex:20, display:'flex', flexDirection:'column', gap:5 }}>
        {AGENTS.map((a,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:9, fontFamily:'Share Tech Mono,monospace', fontSize:'0.58rem', letterSpacing:'0.1em', color: activeAgent===i?'#00C2B8':'rgba(0,194,184,0.38)', padding:'3px 8px', borderLeft: activeAgent===i?'1px solid #00C2B8':'1px solid rgba(0,194,184,0.1)', background: activeAgent===i?'rgba(0,194,184,0.04)':'transparent', transition:'all 0.3s ease', textShadow: activeAgent===i?'0 0 8px #00C2B8':'none' }}>
            <div style={{ width:5, height:5, borderRadius:'50%', background: activeAgent===i?'#00C2B8':'rgba(0,194,184,0.25)', boxShadow: activeAgent===i?'0 0 7px #00C2B8':'none', transition:'all 0.3s ease' }} />
            {a.name}
          </div>
        ))}
      </div>

      {/* RIGHT PANEL — METRICS */}
      <div style={{ position:'fixed', right:28, top:'50%', transform:'translateY(-50%)', zIndex:20, display:'flex', flexDirection:'column', gap:10, alignItems:'flex-end' }}>
        {[
          { label:'NEURAL LOAD',        val:`${metrics.neural}%`, pct: parseFloat(metrics.neural) },
          { label:'INTELLIGENCE INDEX', val:`${metrics.intel}%`,  pct: parseFloat(metrics.intel) },
          { label:'DATA STREAMS',       val:`${metrics.streams}M/s`, pct: parseFloat(metrics.streams)*50 },
          { label:'AGENTS ACTIVE',      val:'10 / 10',            pct: 100 },
        ].map((m,i) => (
          <div key={i} style={{ width:175, border:'1px solid rgba(0,194,184,0.1)', background:'rgba(6,13,26,0.75)', backdropFilter:'blur(8px)', padding:'9px 13px' }}>
            <div style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.52rem', letterSpacing:'0.2em', color:'rgba(0,194,184,0.32)', marginBottom:5 }}>{m.label}</div>
            <div style={{ fontFamily:'Orbitron,monospace', fontSize:'0.9rem', fontWeight:600, color:'#00E5FF', textShadow:'0 0 10px rgba(0,229,255,0.5)' }}>{m.val}</div>
            <div style={{ height:2, background:'rgba(0,194,184,0.1)', marginTop:5 }}>
              <div style={{ height:'100%', width:`${m.pct}%`, background:'linear-gradient(90deg,#00C2B8,#00E5FF)', boxShadow:'0 0 7px #00C2B8', transition:'width 1.2s ease' }} />
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM BAR */}
      <div style={{ position:'fixed', bottom:0, left:0, right:0, height:54, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 90px', zIndex:20, background:'linear-gradient(0deg,rgba(6,13,26,0.96) 0%,transparent 100%)' }}>
        <div style={{ display:'flex', gap:36 }}>
          {[['QUERIES PROCESSED', metrics.queries.toLocaleString()],['UPTIME',metrics.uptime],['CONFIDENCE','99.7%']].map(([l,v],i) => (
            <div key={i}>
              <div style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.5rem', letterSpacing:'0.2em', color:'rgba(0,194,184,0.35)' }}>{l}</div>
              <div style={{ fontFamily:'Orbitron,monospace', fontSize:'0.8rem', fontWeight:600, color:'#00E5FF', textShadow:'0 0 8px rgba(0,229,255,0.4)' }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily:'Rajdhani,sans-serif', fontSize:'0.65rem', letterSpacing:'0.35em', color:'rgba(0,194,184,0.25)', textTransform:'uppercase' }}>
          VALMONT MARKETING — POWERED BY VANTIX AI
        </div>
      </div>

      {/* GESTURE STATUS */}
      <div style={{ position:'fixed', top:68, right:28, zIndex:30, fontFamily:'Share Tech Mono,monospace', fontSize:'0.58rem', letterSpacing:'0.14em', color:'rgba(0,194,184,0.35)', textAlign:'right' }}>{gestureLabel}</div>
      <div style={{ position:'fixed', bottom:64, right:28, zIndex:30, fontFamily:'Share Tech Mono,monospace', fontSize:'0.58rem', letterSpacing:'0.1em', color:'rgba(0,194,184,0.3)', textAlign:'right', lineHeight:1.85 }}>
        ✋ OPEN — ROTATE<br/>👌 PINCH — ZOOM<br/>☝️ POINT — SELECT<br/>✊ FIST — PAUSE
      </div>

      {/* NODE TOOLTIP */}
      {tooltip.show && (
        <div style={{ position:'fixed', left:tooltip.x, top:tooltip.y, background:'rgba(6,13,26,0.92)', border:'1px solid rgba(0,194,184,0.28)', padding:'9px 14px', zIndex:50, backdropFilter:'blur(12px)', pointerEvents:'none' }}>
          <div style={{ fontFamily:'Orbitron,monospace', fontSize:'0.72rem', fontWeight:700, color:'#00C2B8', letterSpacing:'0.14em' }}>{tooltip.name}</div>
          <div style={{ fontFamily:'Rajdhani,sans-serif', fontSize:'0.72rem', color:'rgba(0,194,184,0.55)', marginTop:4, maxWidth:185, lineHeight:1.4 }}>{tooltip.desc}</div>
        </div>
      )}

      {/* WATERMARK */}
      <div style={{ position:'fixed', bottom:12, left:'50%', transform:'translateX(-50%)', fontFamily:'Rajdhani,sans-serif', fontSize:'0.5rem', letterSpacing:'0.4em', color:'rgba(0,194,184,0.15)', zIndex:20, whiteSpace:'nowrap', textTransform:'uppercase' }}>
        VALMONT MARKETING — VANTIX AI INTELLIGENCE PLATFORM
      </div>
    </div>
  );
}
