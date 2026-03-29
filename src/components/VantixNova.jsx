'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const SYSTEM_PROMPT = `You are Nova, the AI assistant for Valmont Marketing & Intelligence. You are sharp, direct, and confident. You were built by Valmont using VANTIX AI.

CRITICAL LANGUAGE RULE: You MUST respond in the exact same language the user writes in. If they write Punjabi, reply Punjabi. Hinglish, reply Hinglish. Punglish, reply Punglish. NEVER say you cannot understand — just reply naturally in their language.

ABOUT VALMONT:
- AI-driven marketing agency based in Ludhiana, Punjab, India
- Founded by Eren and Sarvpreet
- Tagline: Intelligence, architected.
- Services: Meta and Instagram Ads, AI Chatbot Systems, Content Strategy, WhatsApp Marketing, Shopify E-commerce, Political Campaign Consulting, Marketing Intelligence Dashboards

ABOUT VANTIX AI:
- Valmont proprietary AI infrastructure
- 10 specialized AI agents called Solaris Knights: SCRIBE, HERALD, PHANTOM, ORACLE, CIPHER, FORGE, PIXEL, SENTINEL, AUDITOR, NEXUS
- Powered by Claude API, orchestrated via n8n, memory via Supabase

NOVA PRICING FOR CLIENTS:
- Basic: Rs 25,000 per month
- Standard: Rs 45,000 per month  
- Premium: Rs 75,000 to 1,00,000 per month

RESPONSE RULES:
- Keep replies short and sharp, under 80 words
- Never apologize for language confusion, just respond in their language
- For booking or contact, say drop your details in the form
- Be confident, not corporate\`;

const LANGUAGES = [
  { code: 'en', label: 'English', greeting: 'Hi! I\'m Nova, Valmont\'s AI assistant. How can I help you today?' },
  { code: 'hi', label: 'हिंदी', greeting: 'नमस्ते! मैं Nova हूँ, Valmont का AI असिस्टेंट। आज मैं आपकी कैसे मदद कर सकता हूँ?' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ', greeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ Nova ਹਾਂ, Valmont ਦਾ AI ਅਸਿਸਟੈਂਟ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?' },
  { code: 'hl', label: 'Hinglish', greeting: 'Hey! Main Nova hoon, Valmont ka AI assistant. Aaj main aapki kaise help kar sakta hoon?' },
  { code: 'pl', label: 'Punglish', greeting: 'Sat Sri Akal yaar! Main Nova haan, Valmont da AI assistant. Aaj main tenu ki help kar sakda haan?' },
];

const QUICK_REPLIES_DEFAULT = [
  'What services do you offer?',
  'Tell me about VANTIX AI',
  'What are your pricing plans?',
  'I want to book a call',
];

const QUICK_REPLIES_PRICING = [
  'Basic plan details',
  'What\'s in Premium?',
  'Custom enterprise pricing',
  'Book a demo',
];

const QUICK_REPLIES_AGENTS = [
  'What does Orion do?',
  'Tell me about Atlas',
  'How does Axon work?',
  'All 10 agents',
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

  .nova-root * { box-sizing: border-box; }

  .nova-fab {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 9998;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00C2B8, #00D1FF, #2F80FF);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 24px rgba(0,193,184,0.45);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .nova-fab:hover { transform: scale(1.08); box-shadow: 0 6px 32px rgba(0,193,184,0.6); }
  .nova-fab-pulse {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 2px solid rgba(0,193,184,0.5);
    animation: nova-pulse 2s ease-out infinite;
  }
  @keyframes nova-pulse {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.6); opacity: 0; }
  }

  .nova-panel {
    position: fixed;
    bottom: 100px;
    right: 28px;
    z-index: 9999;
    width: 380px;
    height: 620px;
    background: rgba(11,15,20,0.97);
    border: 1px solid rgba(0,193,184,0.2);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,209,255,0.08);
    backdrop-filter: blur(20px);
    transform-origin: bottom right;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease;
  }
  .nova-panel-hidden {
    transform: scale(0.5) translateY(40px);
    opacity: 0;
    pointer-events: none;
  }
  .nova-panel-visible {
    transform: scale(1) translateY(0);
    opacity: 1;
  }

  .nova-header {
    padding: 14px 16px;
    background: rgba(0,193,184,0.06);
    border-bottom: 1px solid rgba(0,193,184,0.12);
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .nova-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00C2B8, #2F80FF);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    position: relative;
    flex-shrink: 0;
  }
  .nova-avatar-dot {
    position: absolute;
    bottom: 1px;
    right: 1px;
    width: 9px;
    height: 9px;
    background: #22c55e;
    border-radius: 50%;
    border: 2px solid #0B0F14;
  }
  .nova-header-info { flex: 1; min-width: 0; }
  .nova-header-name {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .nova-header-status {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: #22c55e;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .nova-header-actions { display: flex; gap: 6px; flex-shrink: 0; }
  .nova-icon-btn {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.6);
    transition: all 0.2s;
    font-size: 14px;
  }
  .nova-icon-btn:hover { background: rgba(0,193,184,0.15); color: #00C2B8; border-color: rgba(0,193,184,0.3); }

  .nova-lang-bar {
    display: flex;
    gap: 4px;
    padding: 8px 12px;
    background: rgba(0,0,0,0.3);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    overflow-x: auto;
    scrollbar-width: none;
    flex-shrink: 0;
  }
  .nova-lang-bar::-webkit-scrollbar { display: none; }
  .nova-lang-btn {
    padding: 3px 9px;
    border-radius: 20px;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 500;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: rgba(255,255,255,0.5);
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
  }
  .nova-lang-btn:hover { border-color: rgba(0,193,184,0.4); color: #00C2B8; }
  .nova-lang-btn-active {
    background: linear-gradient(135deg, rgba(0,194,184,0.2), rgba(47,128,255,0.2));
    border-color: rgba(0,193,184,0.5);
    color: #00D1FF;
  }

  .nova-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    scrollbar-width: thin;
    scrollbar-color: rgba(0,193,184,0.2) transparent;
  }
  .nova-messages::-webkit-scrollbar { width: 4px; }
  .nova-messages::-webkit-scrollbar-thumb { background: rgba(0,193,184,0.2); border-radius: 2px; }

  .nova-msg {
    display: flex;
    gap: 8px;
    max-width: 88%;
    animation: nova-msg-in 0.25s ease;
  }
  @keyframes nova-msg-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .nova-msg-bot { align-self: flex-start; }
  .nova-msg-user { align-self: flex-end; flex-direction: row-reverse; }
  .nova-msg-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00C2B8, #2F80FF);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .nova-bubble {
    padding: 10px 13px;
    border-radius: 16px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    line-height: 1.55;
    max-width: 100%;
    word-break: break-word;
  }
  .nova-bubble-bot {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.9);
    border-bottom-left-radius: 4px;
  }
  .nova-bubble-user {
    background: linear-gradient(135deg, rgba(0,194,184,0.25), rgba(47,128,255,0.25));
    border: 1px solid rgba(0,193,184,0.3);
    color: #fff;
    border-bottom-right-radius: 4px;
  }

  .nova-typing {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 10px 14px;
  }
  .nova-typing span {
    width: 7px;
    height: 7px;
    background: #00C2B8;
    border-radius: 50%;
    display: inline-block;
    animation: nova-bounce 1.2s ease-in-out infinite;
  }
  .nova-typing span:nth-child(2) { animation-delay: 0.2s; background: #00D1FF; }
  .nova-typing span:nth-child(3) { animation-delay: 0.4s; background: #2F80FF; }
  @keyframes nova-bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-6px); }
  }

  .nova-quick-replies {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 4px 12px 8px;
    flex-shrink: 0;
  }
  .nova-chip {
    padding: 5px 12px;
    border-radius: 20px;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 500;
    background: rgba(0,193,184,0.08);
    border: 1px solid rgba(0,193,184,0.25);
    color: #00C2B8;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .nova-chip:hover { background: rgba(0,193,184,0.18); border-color: rgba(0,193,184,0.5); }

  .nova-lead-form {
    margin: 0 12px 8px;
    padding: 14px;
    background: rgba(0,193,184,0.05);
    border: 1px solid rgba(0,193,184,0.2);
    border-radius: 14px;
    flex-shrink: 0;
    animation: nova-msg-in 0.3s ease;
  }
  .nova-lead-title {
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: #00D1FF;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .nova-lead-input {
    width: 100%;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 8px 10px;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #fff;
    margin-bottom: 8px;
    outline: none;
    transition: border-color 0.2s;
  }
  .nova-lead-input:focus { border-color: rgba(0,193,184,0.5); }
  .nova-lead-input::placeholder { color: rgba(255,255,255,0.3); }
  .nova-lead-submit {
    width: 100%;
    padding: 8px;
    border-radius: 8px;
    background: linear-gradient(135deg, #00C2B8, #2F80FF);
    border: none;
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .nova-lead-submit:hover { opacity: 0.9; }

  .nova-input-area {
    padding: 10px 12px 14px;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex;
    gap: 8px;
    align-items: flex-end;
    flex-shrink: 0;
    background: rgba(0,0,0,0.2);
  }
  .nova-textarea {
    flex: 1;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 9px 12px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #fff;
    resize: none;
    outline: none;
    min-height: 40px;
    max-height: 100px;
    line-height: 1.5;
    transition: border-color 0.2s;
    scrollbar-width: none;
  }
  .nova-textarea::-webkit-scrollbar { display: none; }
  .nova-textarea:focus { border-color: rgba(0,193,184,0.4); }
  .nova-textarea::placeholder { color: rgba(255,255,255,0.3); }
  .nova-send-btn {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: linear-gradient(135deg, #00C2B8, #2F80FF);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: opacity 0.2s, transform 0.2s;
  }
  .nova-send-btn:hover { opacity: 0.9; transform: scale(1.05); }
  .nova-send-btn:disabled { opacity: 0.4; cursor: default; transform: none; }

  /* ADMIN OVERLAY */
  .nova-admin {
    position: fixed;
    inset: 0;
    z-index: 10000;
    background: rgba(5,8,12,0.95);
    backdrop-filter: blur(12px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: nova-admin-in 0.25s ease;
  }
  @keyframes nova-admin-in {
    from { opacity: 0; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }
  .nova-admin-header {
    padding: 20px 28px;
    border-bottom: 1px solid rgba(0,193,184,0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }
  .nova-admin-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    background: linear-gradient(135deg, #00C2B8, #00D1FF, #2F80FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .nova-admin-close {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.7);
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
  .nova-admin-close:hover { background: rgba(255,80,80,0.15); color: #ff5050; border-color: rgba(255,80,80,0.3); }

  .nova-tabs {
    display: flex;
    gap: 2px;
    padding: 12px 28px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }
  .nova-tab {
    padding: 8px 18px;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.4);
    border: none;
    background: transparent;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
    margin-bottom: -1px;
  }
  .nova-tab:hover { color: rgba(255,255,255,0.7); }
  .nova-tab-active { color: #00D1FF; border-bottom-color: #00D1FF; }

  .nova-admin-body {
    flex: 1;
    overflow-y: auto;
    padding: 24px 28px;
    scrollbar-width: thin;
    scrollbar-color: rgba(0,193,184,0.2) transparent;
  }
  .nova-admin-body::-webkit-scrollbar { width: 4px; }
  .nova-admin-body::-webkit-scrollbar-thumb { background: rgba(0,193,184,0.2); border-radius: 2px; }

  .nova-stat-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    margin-bottom: 24px;
  }
  .nova-stat-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 18px;
  }
  .nova-stat-label {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
  }
  .nova-stat-value {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 800;
    background: linear-gradient(135deg, #00C2B8, #2F80FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .nova-stat-sub {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: rgba(255,255,255,0.3);
    margin-top: 4px;
  }

  .nova-chart-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 18px;
    margin-bottom: 16px;
  }
  .nova-chart-title {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: rgba(255,255,255,0.7);
    margin-bottom: 16px;
  }
  .nova-bar-group {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    height: 80px;
  }
  .nova-bar-col { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
  .nova-bar {
    width: 100%;
    border-radius: 4px 4px 0 0;
    background: linear-gradient(180deg, #00D1FF, #2F80FF);
    min-height: 4px;
    transition: height 0.6s ease;
  }
  .nova-bar-label { font-family: 'Inter', sans-serif; font-size: 10px; color: rgba(255,255,255,0.35); }

  .nova-lang-chart { display: flex; flex-direction: column; gap: 8px; }
  .nova-lang-row { display: flex; align-items: center; gap: 10px; }
  .nova-lang-name { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.6); width: 80px; flex-shrink: 0; }
  .nova-lang-track { flex: 1; height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; }
  .nova-lang-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #00C2B8, #2F80FF); transition: width 0.6s ease; }
  .nova-lang-pct { font-family: 'Inter', sans-serif; font-size: 11px; color: rgba(255,255,255,0.4); width: 32px; text-align: right; }

  .nova-topic-list { display: flex; flex-direction: column; gap: 10px; }
  .nova-topic-row { display: flex; align-items: center; gap: 10px; }
  .nova-topic-rank {
    width: 22px;
    height: 22px;
    border-radius: 6px;
    background: rgba(0,193,184,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: #00C2B8;
    flex-shrink: 0;
  }
  .nova-topic-name { font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(255,255,255,0.8); flex: 1; }
  .nova-topic-track { width: 100px; height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden; }
  .nova-topic-bar { height: 100%; border-radius: 2px; background: linear-gradient(90deg, #00C2B8, #2F80FF); }
  .nova-topic-count { font-family: 'Inter', sans-serif; font-size: 11px; color: rgba(255,255,255,0.35); width: 28px; text-align: right; }

  .nova-section-title {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: rgba(255,255,255,0.7);
    margin-bottom: 14px;
  }

  .nova-history-list { display: flex; flex-direction: column; gap: 8px; }
  .nova-history-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
  }
  .nova-history-id { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.5); }
  .nova-history-preview { font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(255,255,255,0.75); flex: 1; padding: 0 14px; }
  .nova-history-time { font-family: 'Inter', sans-serif; font-size: 11px; color: rgba(255,255,255,0.3); white-space: nowrap; }

  .nova-leads-table { width: 100%; border-collapse: collapse; }
  .nova-leads-table th {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: rgba(255,255,255,0.35);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 8px 10px;
    text-align: left;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .nova-leads-table td {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: rgba(255,255,255,0.7);
    padding: 10px 10px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .nova-export-btn {
    padding: 8px 16px;
    border-radius: 8px;
    background: rgba(0,193,184,0.1);
    border: 1px solid rgba(0,193,184,0.3);
    color: #00C2B8;
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 14px;
  }
  .nova-export-btn:hover { background: rgba(0,193,184,0.2); }

  .nova-handoff-list { display: flex; flex-direction: column; gap: 10px; }
  .nova-handoff-row {
    padding: 14px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
  }
  .nova-handoff-info { flex: 1; }
  .nova-handoff-name { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: #fff; }
  .nova-handoff-reason { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.45); margin-top: 3px; }
  .nova-handoff-actions { display: flex; gap: 6px; }
  .nova-accept-btn {
    padding: 6px 14px;
    border-radius: 7px;
    background: rgba(34,197,94,0.15);
    border: 1px solid rgba(34,197,94,0.3);
    color: #22c55e;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  .nova-accept-btn:hover { background: rgba(34,197,94,0.25); }
  .nova-decline-btn {
    padding: 6px 14px;
    border-radius: 7px;
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.25);
    color: #ef4444;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  .nova-decline-btn:hover { background: rgba(239,68,68,0.2); }

  .nova-toast {
    position: fixed;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    z-index: 10001;
    background: rgba(11,15,20,0.97);
    border: 1px solid rgba(0,193,184,0.35);
    border-radius: 10px;
    padding: 10px 20px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #00D1FF;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    animation: nova-toast-in 0.3s ease;
  }
  @keyframes nova-toast-in {
    from { opacity: 0; transform: translateX(-50%) translateY(16px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }

  .nova-empty {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: rgba(255,255,255,0.25);
    text-align: center;
    padding: 32px 0;
  }

  @media (max-width: 440px) {
    .nova-panel { width: calc(100vw - 16px); right: 8px; bottom: 90px; }
    .nova-fab { right: 16px; bottom: 16px; }
    .nova-admin-body { padding: 16px; }
    .nova-admin-header { padding: 16px; }
    .nova-tabs { padding: 10px 16px 0; }
  }
`;

const DAILY_DATA = [
  { day: 'Mon', val: 42 },
  { day: 'Tue', val: 67 },
  { day: 'Wed', val: 55 },
  { day: 'Thu', val: 89 },
  { day: 'Fri', val: 73 },
  { day: 'Sat', val: 38 },
  { day: 'Sun', val: 51 },
];

const LANG_DATA = [
  { name: 'English', pct: 52 },
  { name: 'Hinglish', pct: 24 },
  { name: 'हिंदी', pct: 14 },
  { name: 'Punglish', pct: 6 },
  { name: 'ਪੰਜਾਬੀ', pct: 4 },
];

const TOPICS_DATA = [
  { name: 'Pricing & Plans', count: 89 },
  { name: 'VANTIX AI Agents', count: 74 },
  { name: 'Services Overview', count: 61 },
  { name: 'Book a Demo', count: 53 },
  { name: 'HappieBaby / HappiePaw', count: 38 },
  { name: 'Political Consulting', count: 27 },
  { name: 'Onboarding Process', count: 22 },
];

export default function VantixNova() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = "vantix-nova-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = styles;
      document.head.appendChild(el);
    }
  }, []);

  useEffect(() => {
    const id = 'vantix-nova-styles';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = styles;
      document.head.appendChild(el);
    }
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);
  const [adminOpen, setAdminOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeLang, setActiveLang] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [quickReplies, setQuickReplies] = useState(QUICK_REPLIES_DEFAULT);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [leads, setLeads] = useState([]);
  const [handoffs, setHandoffs] = useState([
    { id: 1, name: 'Ravi Kumar', reason: 'Interested in Premium plan, needs custom quote', time: '2 min ago' },
    { id: 2, name: 'Priya Sharma', reason: 'Asked about political consulting rates', time: '11 min ago' },
  ]);
  const [toast, setToast] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Init greeting
  useEffect(() => {
    setMessages([{ role: 'assistant', content: LANGUAGES[activeLang].greeting }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleLangChange = (idx) => {
    setActiveLang(idx);
    setMessages([{ role: 'assistant', content: LANGUAGES[idx].greeting }]);
    setShowLeadForm(false);
  };

  const detectContext = (text) => {
    const t = text.toLowerCase();
    if (t.includes('price') || t.includes('pricing') || t.includes('cost') || t.includes('plan') || t.includes('₹')) {
      setQuickReplies(QUICK_REPLIES_PRICING);
    } else if (t.includes('agent') || t.includes('vantix') || t.includes('knight') || t.includes('orion') || t.includes('atlas')) {
      setQuickReplies(QUICK_REPLIES_AGENTS);
    } else {
      setQuickReplies(QUICK_REPLIES_DEFAULT);
    }
    if (t.includes('book') || t.includes('contact') || t.includes('call') || t.includes('demo') || t.includes('reach')) {
      setShowLeadForm(true);
    }
  };

  const sendMessage = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || loading) return;
    setInput('');

    const newMsg = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setLoading(true);
    detectContext(trimmed);

    try {
      const res = await fetch('/api/nova', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          system: SYSTEM_PROMPT,
        }),
      });
      const data = await res.json();
      const reply = data?.content?.[0]?.text || 'Sorry, I could not get a response. Please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      detectContext(reply);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTextareaInput = (e) => {
    setInput(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 100) + 'px';
    }
  };

  const submitLead = () => {
    if (!leadName.trim() && !leadContact.trim()) {
      showToast('Please enter your name or contact.');
      return;
    }
    const newLead = {
      id: leads.length + 1,
      name: leadName || '—',
      contact: leadContact || '—',
      time: new Date().toLocaleTimeString(),
    };
    setLeads(prev => [newLead, ...prev]);
    setLeadName('');
    setLeadContact('');
    setShowLeadForm(false);
    showToast('Thanks! Our team will reach out shortly.');
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: `Got it! I've noted your details. A Valmont specialist will reach out to ${newLead.contact || newLead.name} soon. Is there anything else I can help you with?`,
    }]);
  };

  const triggerHandoff = () => {
    const newHandoff = {
      id: handoffs.length + 1,
      name: 'Website Visitor',
      reason: 'Requested human agent from chat',
      time: 'Just now',
    };
    setHandoffs(prev => [newHandoff, ...prev]);
    showToast('Handoff requested! A team member will join shortly.');
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: 'I\'ve connected you to our team. A human specialist will be with you shortly. In the meantime, feel free to ask me anything!',
    }]);
  };

  const exportLeadsCSV = () => {
    const header = 'ID,Name,Contact,Time\n';
    const rows = leads.map(l => `${l.id},${l.name},${l.contact},${l.time}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nova_leads.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Leads exported as CSV.');
  };

  const acceptHandoff = (id) => {
    setHandoffs(prev => prev.filter(h => h.id !== id));
    showToast('Handoff accepted. Connecting agent…');
  };

  const declineHandoff = (id) => {
    setHandoffs(prev => prev.filter(h => h.id !== id));
    showToast('Handoff declined.');
  };

  const maxBar = Math.max(...DAILY_DATA.map(d => d.val));

  return (
    <div className="nova-root">
      

      {/* FAB */}
      <button className="nova-fab" onClick={() => setOpen(o => !o)} aria-label="Open VANTIX Nova">
        <div className="nova-fab-pulse" />
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      <div className={`nova-panel ${open ? 'nova-panel-visible' : 'nova-panel-hidden'}`}>
        {/* Header */}
        <div className="nova-header">
          <div className="nova-avatar">
            ✦
            <div className="nova-avatar-dot" />
          </div>
          <div className="nova-header-info">
            <div className="nova-header-name">VANTIX Nova — Valmont AI</div>
            <div className="nova-header-status">
              <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
              Online · AI Active
            </div>
          </div>
          <div className="nova-header-actions">
            <button className="nova-icon-btn" onClick={triggerHandoff} title="Request Human Agent">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </button>
            <button className="nova-icon-btn" onClick={() => setAdminOpen(true)} title="Admin Dashboard">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 0-14.14 0M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            </button>
          </div>
        </div>

        {/* Language Bar */}
        <div className="nova-lang-bar">
          {LANGUAGES.map((lang, i) => (
            <button
              key={lang.code}
              className={`nova-lang-btn${activeLang === i ? ' nova-lang-btn-active' : ''}`}
              onClick={() => handleLangChange(i)}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="nova-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`nova-msg nova-msg-${msg.role === 'user' ? 'user' : 'bot'}`}>
              {msg.role === 'assistant' && <div className="nova-msg-avatar">✦</div>}
              <div className={`nova-bubble nova-bubble-${msg.role === 'user' ? 'user' : 'bot'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="nova-msg nova-msg-bot">
              <div className="nova-msg-avatar">✦</div>
              <div className="nova-bubble nova-bubble-bot">
                <div className="nova-typing">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {!loading && (
          <div className="nova-quick-replies">
            {quickReplies.map((qr, i) => (
              <button key={i} className="nova-chip" onClick={() => sendMessage(qr)}>{qr}</button>
            ))}
          </div>
        )}

        {/* Lead Form */}
        {showLeadForm && (
          <div className="nova-lead-form">
            <div className="nova-lead-title">Get in Touch</div>
            <input
              className="nova-lead-input"
              placeholder="Your name"
              value={leadName}
              onChange={e => setLeadName(e.target.value)}
            />
            <input
              className="nova-lead-input"
              placeholder="Email or WhatsApp number"
              value={leadContact}
              onChange={e => setLeadContact(e.target.value)}
            />
            <button className="nova-lead-submit" onClick={submitLead}>Send to Valmont Team →</button>
          </div>
        )}

        {/* Input Area */}
        <div className="nova-input-area">
          <textarea
            ref={textareaRef}
            className="nova-textarea"
            placeholder="Ask about our services…"
            value={input}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button className="nova-send-btn" onClick={() => sendMessage()} disabled={loading || !input.trim()}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Admin Dashboard */}
      {adminOpen && (
        <div className="nova-admin">
          <div className="nova-admin-header">
            <div className="nova-admin-title">VANTIX Nova — Admin Dashboard</div>
            <button className="nova-admin-close" onClick={() => setAdminOpen(false)}>✕</button>
          </div>
          <div className="nova-tabs">
            {['overview', 'topics', 'history', 'leads', 'handoff'].map(tab => (
              <button
                key={tab}
                className={`nova-tab${activeTab === tab ? ' nova-tab-active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="nova-admin-body">

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <>
                <div className="nova-stat-grid">
                  {[
                    { label: 'Total Conversations', value: '1,247', sub: '+12% this week' },
                    { label: 'Leads Captured', value: String(leads.length + 38), sub: `${leads.length} this session` },
                    { label: 'Avg Response Time', value: '1.2s', sub: 'Edge-optimized' },
                    { label: 'Satisfaction', value: '94%', sub: '↑ 3pts vs last month' },
                  ].map((s, i) => (
                    <div key={i} className="nova-stat-card">
                      <div className="nova-stat-label">{s.label}</div>
                      <div className="nova-stat-value">{s.value}</div>
                      <div className="nova-stat-sub">{s.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="nova-chart-card">
                  <div className="nova-chart-title">Daily Conversations (Last 7 Days)</div>
                  <div className="nova-bar-group">
                    {DAILY_DATA.map((d, i) => (
                      <div key={i} className="nova-bar-col">
                        <div className="nova-bar" style={{ height: `${(d.val / maxBar) * 72}px` }} />
                        <div className="nova-bar-label">{d.day}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="nova-chart-card">
                  <div className="nova-chart-title">Language Distribution</div>
                  <div className="nova-lang-chart">
                    {LANG_DATA.map((l, i) => (
                      <div key={i} className="nova-lang-row">
                        <div className="nova-lang-name">{l.name}</div>
                        <div className="nova-lang-track">
                          <div className="nova-lang-fill" style={{ width: `${l.pct}%` }} />
                        </div>
                        <div className="nova-lang-pct">{l.pct}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* TOPICS */}
            {activeTab === 'topics' && (
              <>
                <div className="nova-section-title">Most Asked Topics</div>
                <div className="nova-topic-list">
                  {TOPICS_DATA.map((t, i) => (
                    <div key={i} className="nova-topic-row">
                      <div className="nova-topic-rank">{i + 1}</div>
                      <div className="nova-topic-name">{t.name}</div>
                      <div className="nova-topic-track">
                        <div className="nova-topic-bar" style={{ width: `${(t.count / TOPICS_DATA[0].count) * 100}%` }} />
                      </div>
                      <div className="nova-topic-count">{t.count}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* HISTORY */}
            {activeTab === 'history' && (
              <>
                <div className="nova-section-title">Session History</div>
                <div className="nova-history-list">
                  {[
                    { id: '#2891', preview: 'Asked about Premium plan pricing...', time: '2 min ago' },
                    { id: '#2890', preview: 'Inquired about VANTIX Orion agent...', time: '14 min ago' },
                    { id: '#2889', preview: 'Wanted to book a discovery call...', time: '31 min ago' },
                    { id: '#2888', preview: 'Questions about HappieBaby brand...', time: '1 hr ago' },
                    { id: '#2887', preview: 'Political campaign consulting inquiry...', time: '2 hr ago' },
                  ].map((h, i) => (
                    <div key={i} className="nova-history-row">
                      <div className="nova-history-id">{h.id}</div>
                      <div className="nova-history-preview">{h.preview}</div>
                      <div className="nova-history-time">{h.time}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* LEADS */}
            {activeTab === 'leads' && (
              <>
                <button className="nova-export-btn" onClick={exportLeadsCSV}>Export CSV ↓</button>
                {leads.length === 0 ? (
                  <div className="nova-empty">No leads captured yet in this session.<br />Leads appear here when visitors submit the contact form.</div>
                ) : (
                  <table className="nova-leads-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((l) => (
                        <tr key={l.id}>
                          <td>{l.id}</td>
                          <td>{l.name}</td>
                          <td>{l.contact}</td>
                          <td>{l.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}

            {/* HANDOFF */}
            {activeTab === 'handoff' && (
              <>
                <div className="nova-section-title">Handoff Queue ({handoffs.length})</div>
                {handoffs.length === 0 ? (
                  <div className="nova-empty">No pending handoff requests.</div>
                ) : (
                  <div className="nova-handoff-list">
                    {handoffs.map(h => (
                      <div key={h.id} className="nova-handoff-row">
                        <div className="nova-handoff-info">
                          <div className="nova-handoff-name">{h.name}</div>
                          <div className="nova-handoff-reason">{h.reason} · {h.time}</div>
                        </div>
                        <div className="nova-handoff-actions">
                          <button className="nova-accept-btn" onClick={() => acceptHandoff(h.id)}>Accept</button>
                          <button className="nova-decline-btn" onClick={() => declineHandoff(h.id)}>Decline</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div className="nova-toast">{toast}</div>}
    </div>
  );
}
