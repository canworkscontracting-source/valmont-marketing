'use client';

import { useEffect, useRef, useState } from 'react';

const AGENTS = [
  { name: 'SCRIBE',   desc: 'Content Intelligence & Generation',    angle: 0,   orbit: 0 },
  { name: 'HERALD',   desc: 'Distribution & Broadcast Engine',      angle: 36,  orbit: 0 },
  { name: 'PHANTOM',  desc: 'Stealth Research & Competitive Intel',  angle: 72,  orbit: 0 },
  { name: 'ORACLE',   desc: 'Predictive Analytics & Forecasting',   angle: 108, orbit: 0 },
  { name: 'CIPHER',   desc: 'Data Encryption & Security Layer',     angle: 144, orbit: 1 },
  { name: 'FORGE',    desc: 'Campaign Construction & Automation',   angle: 192, orbit: 1 },
  { name: 'PIXEL',    desc: 'Visual Intelligence & Design AI',      angle: 240, orbit: 1 },
  { name: 'SENTINEL', desc: 'Brand Monitoring & Alert System',      angle: 48,  orbit: 2 },
  { name: 'AUDITOR',  desc: 'Performance Audit & ROI Engine',       angle: 168, orbit: 2 },
  { name: 'NEXUS',    desc: 'Master Orchestration Core',            angle: 288, orbit: 2 },
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
    heartbeat: 0,
  });

  const [tooltip, setTooltip]       = useState({ show: false, name: '', desc: '', x: 0, y: 0 });
  const [activeAgent, setActiveAgent] = useState(0);
  const [gestureLabel, setGestureLabel] = useState('MOTION CONTROL: READY');
  const [metrics, setMetrics] = useState({ neural: '87.3', intel: '94.1', streams: '1.2', uptime: '00:00:00' });
  const startTimeRef = useRef(Date.now());
  const queryRef = useRef(0);

  // init particles
  useEffect(() => {
    const p = [];
    for (let i = 0; i < 130; i++) {
      p.push({ x: Math.random()*1920, y: Math.random()*1080, vx:(Math.random()-0.5)*0.15, vy:(Math.random()-0.5)*0.15, r:Math.random()*1.2+0.2, a:Math.random()*0.45+0.05 });
    }
    stateRef.current.particles = p;
  }, []);

  // main canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H, cx, cy;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      cx = W/2; cy = H/2;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function addSpark(sx, sy, tx, ty) {
      for (let j=0; j<3; j++) stateRef.current.sparks.push({ x:sx, y:sy, tx:tx+(Math.random()-0.5)*18, ty:ty+(Math.random()-0.5)*18, t:0 });
    }

    const sparkIv = setInterval(() => {
      const s = stateRef.current;
      const i = Math.floor(Math.random()*AGENTS.length);
      const a = AGENTS[i];
      const rotated = (a.angle*Math.PI/180) + s.orbitAngle;
      const r = ORBIT_RADII[a.orbit] * s.zoomFactor;
      addSpark(cx, cy, cx+Math.cos(rotated)*r, cy+Math.sin(rotated)*r);
    }, 650);

    const metricIv = setInterval(() => {
      const s = stateRef.current;
      const nl = (82+Math.sin(Date.now()*0.0007)*8).toFixed(1);
      const ii = (91+Math.sin(Date.now()*0.0005+1)*4).toFixed(1);
      const ds = (0.9+Math.sin(Date.now()*0.0009)*0.5).toFixed(1);
      const elapsed = Math.floor((Date.now()-startTimeRef.current)/1000);
      const hh = String(Math.floor(elapsed/3600)).padStart(2,'0');
      const mm = String(Math.floor((elapsed%3600)/60)).padStart(2,'0');
      const ss = String(elapsed%60).padStart(2,'0');
      if (Math.random()<0.3) queryRef.current++;
      setMetrics({ neural:nl, intel:ii, streams:ds, uptime:`${hh}:${mm}:${ss}` });
      if (Math.random()<0.08) setActiveAgent(Math.floor(Math.random()*10));
    }, 900);

    function draw() {
      const s  = stateRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      s.heartbeat += 0.04;

      ctx.clearRect(0,0,W,H);

      // bg
      const bg = ctx.createRadialGradient(cx,cy,0,cx,cy,Math.max(W,H)*0.7);
      bg.addColorStop(0,'rgba(9,19,37,1)');
      bg.addColorStop(1,'rgba(6,13,26,1)');
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

      // grid
      ctx.save(); ctx.globalAlpha=0.025; ctx.strokeStyle='#00C2B8'; ctx.lineWidth=0.5;
      for(let x=0;x<W;x+=60){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=0;y<H;y+=60){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
      ctx.restore();

      // starfield
      for(const p of s.particles){
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        ctx.save(); ctx.globalAlpha=p.a; ctx.fillStyle='#00C2B8';
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); ctx.restore();
      }

      // radar
      s.radarAngle+=0.008;
      ctx.save(); ctx.globalAlpha=0.055; ctx.fillStyle='#00C2B8';
      ctx.beginPath(); ctx.moveTo(cx,cy);
      ctx.arc(cx,cy,(ORBIT_RADII[2]+20)*s.zoomFactor,s.radarAngle-0.45,s.radarAngle);
      ctx.closePath(); ctx.fill(); ctx.restore();

      // orbits
      [0,1,2].forEach(idx=>{
        const r=ORBIT_RADII[idx]*s.zoomFactor;
        ctx.save(); ctx.globalAlpha=0.07; ctx.strokeStyle='#00C2B8'; ctx.lineWidth=1;
        if(idx!==1) ctx.setLineDash([4,8]);
        ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke();
        ctx.setLineDash([]); ctx.restore();
      });

      // connections + travelling dots
      for(let i=0;i<AGENTS.length;i++){
        const a=AGENTS[i];
        const rotated=(a.angle*Math.PI/180)+s.orbitAngle;
        const r=ORBIT_RADII[a.orbit]*s.zoomFactor;
        const nx=cx+Math.cos(rotated)*r, ny=cy+Math.sin(rotated)*r;
        const t=(Date.now()*0.0008+i*0.28)%1;
        ctx.save(); ctx.globalAlpha=0.035; ctx.strokeStyle='#00C2B8'; ctx.lineWidth=0.5;
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(nx,ny); ctx.stroke();
        ctx.globalAlpha=0.55; ctx.fillStyle='#00E5FF';
        ctx.beginPath(); ctx.arc(cx+(nx-cx)*t,cy+(ny-cy)*t,1.8,0,Math.PI*2); ctx.fill();
        ctx.restore();
      }

      // HEARTBEAT CORE
      const zoomProximity = Math.max(0, (s.zoomFactor - 1) / 1.2);
      const basePulse = 0.82 + 0.18*Math.sin(s.heartbeat);
      const heartIntensity = basePulse + zoomProximity * (0.35*Math.sin(s.heartbeat*2.5) + 0.15*Math.sin(s.heartbeat*5));
      const coreR = 48 * s.zoomFactor;

      const ambientR = coreR * (2.5 + zoomProximity * 1.2);
      const ambGrd = ctx.createRadialGradient(cx,cy,0,cx,cy,ambientR);
      ambGrd.addColorStop(0, `rgba(0,194,184,${0.08 + zoomProximity*0.18})`);
      ambGrd.addColorStop(0.4,`rgba(0,194,184,${0.03 + zoomProximity*0.08})`);
      ambGrd.addColorStop(1,'transparent');
      ctx.fillStyle=ambGrd; ctx.beginPath(); ctx.arc(cx,cy,ambientR,0,Math.PI*2); ctx.fill();

      [0.45,0.75,1].forEach(f=>{
        ctx.save(); ctx.globalAlpha=0.07+zoomProximity*0.08; ctx.strokeStyle='#00C2B8'; ctx.lineWidth=1;
        ctx.beginPath(); ctx.arc(cx,cy,coreR*f,0,Math.PI*2); ctx.stroke(); ctx.restore();
      });

      if(zoomProximity>0.05){
        const hbScale = 1 + 0.22*Math.sin(s.heartbeat*2.5)*zoomProximity;
        ctx.save();
        ctx.globalAlpha = zoomProximity * (0.4 + 0.3*Math.sin(s.heartbeat*2.5));
        ctx.strokeStyle='#00E5FF'; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.arc(cx,cy,coreR*hbScale,0,Math.PI*2); ctx.stroke();
        ctx.restore();
      }

      const cGrd=ctx.createRadialGradient(cx,cy,0,cx,cy,coreR*heartIntensity);
      cGrd.addColorStop(0,`rgba(0,229,255,${0.85+zoomProximity*0.15})`);
      cGrd.addColorStop(0.5,`rgba(0,194,184,${0.5+zoomProximity*0.2})`);
      cGrd.addColorStop(1,'transparent');
      ctx.fillStyle=cGrd; ctx.beginPath(); ctx.arc(cx,cy,coreR*heartIntensity,0,Math.PI*2); ctx.fill();

      ctx.save(); ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.font=`900 ${Math.round(11*s.zoomFactor)}px Orbitron,monospace`;
      ctx.fillStyle=`rgba(255,255,255,${0.88+zoomProximity*0.12})`;
      ctx.fillText('VANTIX',cx,cy-7*s.zoomFactor);
      ctx.font=`400 ${Math.round(6.5*s.zoomFactor)}px 'Share Tech Mono',monospace`;
      ctx.fillStyle=`rgba(0,229,255,${0.5+zoomProximity*0.3})`;
      ctx.fillText('NEURAL CORE',cx,cy+8*s.zoomFactor);
      if(zoomProximity>0.3){
        ctx.font=`400 ${Math.round(5.5*s.zoomFactor)}px 'Share Tech Mono',monospace`;
        ctx.fillStyle=`rgba(0,229,255,${zoomProximity*0.6})`;
        ctx.fillText(`♥ ${(72+Math.sin(s.heartbeat*2.5)*12).toFixed(0)} BPM`,cx,cy+20*s.zoomFactor);
      }
      ctx.restore();

      // NODES
      let hovered=false;
      for(let i=0;i<AGENTS.length;i++){
        const a=AGENTS[i];
        const rotated=(a.angle*Math.PI/180)+s.orbitAngle;
        const r=ORBIT_RADII[a.orbit]*s.zoomFactor;
        const nx=cx+Math.cos(rotated)*r, ny=cy+Math.sin(rotated)*r;
        const nr=12*s.zoomFactor;
        const dx=mx-nx, dy=my-ny;
        const isHover=Math.sqrt(dx*dx+dy*dy)<nr*2.8;
        if(isHover){ hovered=true; setTooltip({show:true,name:a.name,desc:a.desc,x:nx+18,y:ny-18}); setActiveAgent(i); }
        if(isHover||activeAgent===i){
          const gGrd=ctx.createRadialGradient(nx,ny,0,nx,ny,nr*3);
          gGrd.addColorStop(0,'rgba(0,194,184,0.22)'); gGrd.addColorStop(1,'transparent');
          ctx.fillStyle=gGrd; ctx.beginPath(); ctx.arc(nx,ny,nr*3,0,Math.PI*2); ctx.fill();
        }
        ctx.save();
        ctx.strokeStyle='#00C2B8'; ctx.lineWidth=isHover?1.5:0.8; ctx.globalAlpha=isHover?0.95:0.4;
        ctx.beginPath(); ctx.arc(nx,ny,nr,0,Math.PI*2); ctx.stroke();
        const nGrd=ctx.createRadialGradient(nx,ny,0,nx,ny,nr);
        nGrd.addColorStop(0,isHover?'rgba(0,229,255,0.7)':'rgba(0,194,184,0.28)'); nGrd.addColorStop(1,'transparent');
        ctx.fillStyle=nGrd; ctx.globalAlpha=1; ctx.beginPath(); ctx.arc(nx,ny,nr,0,Math.PI*2); ctx.fill();
        ctx.font=`600 ${Math.round(6.5*s.zoomFactor)}px Orbitron,monospace`;
        ctx.fillStyle=isHover?'#fff':'rgba(0,194,184,0.72)';
        ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.globalAlpha=isHover?1:0.85;
        ctx.fillText(a.name,nx,ny); ctx.restore();
      }
      if(!hovered) setTooltip(t=>t.show?{...t,show:false}:t);

      // sparks
      for(let i=s.sparks.length-1;i>=0;i--){
        const sp=s.sparks[i]; sp.t+=0.025;
        if(sp.t>=1){s.sparks.splice(i,1);continue;}
        const px=sp.x+(sp.tx-sp.x)*sp.t, py=sp.y+(sp.ty-sp.y)*sp.t;
        ctx.save(); ctx.globalAlpha=(1-sp.t)*0.75; ctx.fillStyle='#00E5FF';
        ctx.beginPath(); ctx.arc(px,py,2,0,Math.PI*2); ctx.fill(); ctx.restore();
      }

      if(!s.paused){
        s.orbitAngle+=0.004;
        s.zoomFactor+=(s.targetZoom-s.zoomFactor)*0.05;
      }
      animId=requestAnimationFrame(draw);
    }
    animId=requestAnimationFrame(draw);

    return()=>{
      cancelAnimationFrame(animId);
      clearInterval(sparkIv);
      clearInterval(metricIv);
      ro.disconnect();
    };
  }, []);

  // mouse + keyboard
  useEffect(()=>{
    const s=stateRef.current;
    const onMove=e=>{
      const rect=canvasRef.current?.getBoundingClientRect();
      if(rect) mouseRef.current={x:e.clientX-rect.left,y:e.clientY-rect.top};
      if(s.dragX!==null){s.orbitAngle+=(e.clientX-s.dragX)*0.005;s.dragX=e.clientX;}
    };
    const onDown=e=>{s.dragX=e.clientX;};
    const onUp=()=>{s.dragX=null;};
    const onWheel=e=>{s.targetZoom=Math.max(0.5,Math.min(2.5,s.targetZoom-e.deltaY*0.001));};
    const onKey=e=>{
      if(e.key===' ')s.paused=!s.paused;
      if(e.key==='+'||e.key==='=')s.targetZoom=Math.min(2.5,s.targetZoom+0.15);
      if(e.key==='-')s.targetZoom=Math.max(0.5,s.targetZoom-0.15);
      if(e.key==='ArrowLeft')s.orbitAngle-=0.1;
      if(e.key==='ArrowRight')s.orbitAngle+=0.1;
    };
    window.addEventListener('mousemove',onMove);
    window.addEventListener('mousedown',onDown);
    window.addEventListener('mouseup',onUp);
    window.addEventListener('wheel',onWheel,{passive:true});
    window.addEventListener('keydown',onKey);
    return()=>{
      window.removeEventListener('mousemove',onMove);
      window.removeEventListener('mousedown',onDown);
      window.removeEventListener('mouseup',onUp);
      window.removeEventListener('wheel',onWheel);
      window.removeEventListener('keydown',onKey);
    };
  },[]);

  // mediapipe
  useEffect(()=>{
    if(typeof window==='undefined') return;
    const videoEl=document.createElement('video');
    videoEl.autoplay=true; videoEl.playsInline=true; videoEl.style.display='none';
    document.body.appendChild(videoEl);
    let handsInst=null, camInst=null, handX=null, pinchD=null;
    function dist(a,b){return Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2);}
    function classify(lm){
      const p=dist(lm[4],lm[8]);
      if(p<0.07)return'PINCH';
      const iUp=lm[8].y<lm[5].y-0.05,mUp=lm[12].y<lm[9].y-0.05;
      const rDn=lm[16].y>lm[5].y-0.02,pDn=lm[20].y>lm[5].y-0.02;
      if(iUp&&!mUp&&rDn&&pDn)return'POINT';
      if(!iUp&&!mUp)return'FIST';
      if(iUp&&mUp)return'OPEN';
      return'IDLE';
    }
    async function init(){
      try{
        const {Hands}=await import('@mediapipe/hands');
        const {Camera}=await import('@mediapipe/camera_utils');
        handsInst=new Hands({locateFile:f=>`https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`});
        handsInst.setOptions({maxNumHands:1,modelComplexity:0,minDetectionConfidence:0.7,minTrackingConfidence:0.5});
        handsInst.onResults(results=>{
          const s=stateRef.current;
          if(!results.multiHandLandmarks?.length){setGestureLabel('SCANNING...');handX=null;pinchD=null;return;}
          const lm=results.multiHandLandmarks[0];
          const g=classify(lm);
          setGestureLabel(`GESTURE: ${g}`);
          if(g==='OPEN'){if(handX!==null)s.orbitAngle+=(lm[0].x-handX)*8;handX=lm[0].x;s.paused=false;}
          else if(g==='PINCH'){const cd=dist(lm[4],lm[8]);if(pinchD!==null)s.targetZoom=Math.max(0.5,Math.min(2.5,s.targetZoom+(cd-pinchD)*3));pinchD=cd;handX=null;}
          else if(g==='FIST'){s.paused=true;handX=null;setGestureLabel('ORBIT PAUSED');}
          else{handX=null;pinchD=null;s.paused=false;}
        });
        camInst=new Camera(videoEl,{onFrame:async()=>{if(handsInst)await handsInst.send({image:videoEl});},width:320,height:240});
        await camInst.start();
        setGestureLabel('MOTION CONTROL: ACTIVE');
      }catch{setGestureLabel('MOUSE MODE');}
    }
    init();
    return()=>{try{camInst?.stop();handsInst?.close();}catch{}document.body.removeChild(videoEl);};
  },[]);

  return (
    <div style={{position:'relative',width:'100%',height:'100%',background:'#060d1a',overflow:'hidden',cursor:'crosshair'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Share+Tech+Mono&display=swap');@keyframes blink{0%,100%{opacity:1}50%{opacity:0.25}}`}</style>

      <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%'}}/>

      {/* scanline */}
      <div style={{position:'absolute',inset:0,background:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)',pointerEvents:'none'}}/>
      {/* vignette */}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at center,transparent 48%,rgba(0,0,0,0.55) 100%)',pointerEvents:'none'}}/>

      {/* HUD corners */}
      {[['top:8px','left:8px',''],['top:8px','right:8px','scaleX(-1)'],['bottom:8px','left:8px','scaleY(-1)'],['bottom:8px','right:8px','scale(-1)']].map(([t,s2,tf],i)=>(
        <div key={i} style={{position:'absolute',width:40,height:40,[t.split(':')[0]]:t.split(':')[1],[s2.split(':')[0]]:s2.split(':')[1],transform:tf,pointerEvents:'none'}}>
          <div style={{position:'absolute',width:'100%',height:2,background:'#00C2B8',boxShadow:'0 0 8px #00E5FF'}}/>
          <div style={{position:'absolute',width:2,height:'100%',background:'#00C2B8',boxShadow:'0 0 8px #00E5FF'}}/>
        </div>
      ))}

      {/* left panel */}
      <div style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',display:'flex',flexDirection:'column',gap:4,zIndex:10}}>
        {AGENTS.map((a,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:8,fontFamily:'Share Tech Mono,monospace',fontSize:'0.55rem',letterSpacing:'0.1em',color:activeAgent===i?'#00C2B8':'rgba(0,194,184,0.35)',padding:'2px 7px',borderLeft:activeAgent===i?'1px solid #00C2B8':'1px solid rgba(0,194,184,0.1)',transition:'all 0.3s ease'}}>
            <div style={{width:4,height:4,borderRadius:'50%',background:activeAgent===i?'#00C2B8':'rgba(0,194,184,0.2)',boxShadow:activeAgent===i?'0 0 6px #00C2B8':'none',transition:'all 0.3s'}}/>
            {a.name}
          </div>
        ))}
      </div>

      {/* right metrics */}
      <div style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',display:'flex',flexDirection:'column',gap:8,zIndex:10}}>
        {[['NEURAL LOAD',`${metrics.neural}%`,parseFloat(metrics.neural)],['INTEL INDEX',`${metrics.intel}%`,parseFloat(metrics.intel)],['DATA STREAMS',`${metrics.streams}M/s`,parseFloat(metrics.streams)*50],['UPTIME',metrics.uptime,100]].map(([l,v,p],i)=>(
          <div key={i} style={{width:155,border:'1px solid rgba(0,194,184,0.1)',background:'rgba(6,13,26,0.8)',backdropFilter:'blur(8px)',padding:'7px 11px'}}>
            <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.48rem',letterSpacing:'0.18em',color:'rgba(0,194,184,0.3)',marginBottom:4}}>{l}</div>
            <div style={{fontFamily:'Orbitron,monospace',fontSize:'0.8rem',fontWeight:600,color:'#00E5FF',textShadow:'0 0 8px rgba(0,229,255,0.4)'}}>{v}</div>
            <div style={{height:2,background:'rgba(0,194,184,0.1)',marginTop:4}}><div style={{height:'100%',width:`${p}%`,background:'linear-gradient(90deg,#00C2B8,#00E5FF)',transition:'width 1.2s ease'}}/></div>
          </div>
        ))}
      </div>

      {/* gesture label */}
      <div style={{position:'absolute',bottom:12,right:12,fontFamily:'Share Tech Mono,monospace',fontSize:'0.55rem',letterSpacing:'0.12em',color:'rgba(0,194,184,0.35)',textAlign:'right',lineHeight:1.8,zIndex:10}}>
        {gestureLabel}<br/>
        <span style={{fontSize:'0.48rem',color:'rgba(0,194,184,0.2)'}}>✋ ROTATE · 👌 ZOOM · ✊ PAUSE</span>
      </div>

      {/* tooltip */}
      {tooltip.show&&(
        <div style={{position:'absolute',left:tooltip.x,top:tooltip.y,background:'rgba(6,13,26,0.92)',border:'1px solid rgba(0,194,184,0.28)',padding:'8px 13px',zIndex:50,backdropFilter:'blur(12px)',pointerEvents:'none'}}>
          <div style={{fontFamily:'Orbitron,monospace',fontSize:'0.68rem',fontWeight:700,color:'#00C2B8',letterSpacing:'0.12em'}}>{tooltip.name}</div>
          <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:'0.7rem',color:'rgba(0,194,184,0.55)',marginTop:3,maxWidth:175,lineHeight:1.4}}>{tooltip.desc}</div>
        </div>
      )}

      {/* watermark */}
      <div style={{position:'absolute',bottom:10,left:'50%',transform:'translateX(-50%)',fontFamily:'Share Tech Mono,monospace',fontSize:'0.45rem',letterSpacing:'0.35em',color:'rgba(0,194,184,0.12)',whiteSpace:'nowrap',textTransform:'uppercase'}}>
        VALMONT MARKETING — VANTIX AI INTELLIGENCE PLATFORM
      </div>
    </div>
  );
}
