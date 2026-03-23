"use client";
import { useEffect, useState } from "react";

// This page lives at: valmontmarketing.com/vantix/auth/callback
// Facebook redirects here after client clicks "Allow"
// It exchanges the code for an access token and sends it back to VANTIX

const META_APP_ID = "2104051133749518";
const REDIRECT_URI = "https://valmontmarketing.com/vantix/auth/callback";

export default function AuthCallback() {
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Connecting your account...");

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state"); // This is the clientId we passed
      const error = params.get("error");

      if (error) {
        setStatus("error");
        setMessage("Connection cancelled. You can close this window.");
        return;
      }

      if (!code) {
        setStatus("error");
        setMessage("No authorization code received. Please try again.");
        return;
      }

      try {
        // Exchange code for access token
        // NOTE: In production, this should go through a backend endpoint
        // to protect your App Secret. For now we use a Vercel serverless function.
        // The endpoint /api/auth/instagram handles the exchange securely.
        
        const res = await fetch("/api/auth/instagram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, redirectUri: REDIRECT_URI }),
        });

        if (!res.ok) throw new Error("Token exchange failed");

        const data = await res.json();

        if (data.access_token) {
          // Send token back to the parent VANTIX window
          if (window.opener) {
            window.opener.postMessage(
              {
                type: "VANTIX_AUTH_SUCCESS",
                accessToken: data.access_token,
                state: state,
              },
              window.location.origin
            );
            setStatus("success");
            setMessage("Account connected! Closing window...");
            setTimeout(() => window.close(), 1500);
          } else {
            // No opener — store token and redirect to VANTIX
            localStorage.setItem(`vx_meta_token_${state}`, JSON.stringify(data.access_token));
            setStatus("success");
            setMessage("Account connected! Redirecting...");
            setTimeout(() => {
              window.location.href = "/vantix?connected=true&client=" + state;
            }, 1500);
          }
        } else {
          throw new Error(data.error || "No token received");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Connection failed: " + err.message + ". Please try again.");
      }
    };

    handleCallback();
  }, []);

  const colors = {
    processing: { bg: "#040810", accent: "#00D4B4", icon: "⟳", spinning: true },
    success: { bg: "#040810", accent: "#00D4B4", icon: "✓", spinning: false },
    error: { bg: "#040810", accent: "#FF5060", icon: "✕", spinning: false },
  };

  const style = colors[status];

  return (
    <div style={{
      minHeight: "100vh",
      background: style.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Outfit', sans-serif",
    }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&family=Outfit:wght@300;400&display=swap');
      `}</style>

      <div style={{
        textAlign: "center",
        animation: "fadeIn 0.5s ease",
        padding: "40px",
      }}>
        {/* VANTIX Logo */}
        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: "0.2em",
          color: "#00D4B4",
          marginBottom: 32,
        }}>
          VANTIX
        </div>

        {/* Status Icon */}
        <div style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          border: `2px solid ${style.accent}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          background: `${style.accent}10`,
          animation: style.spinning ? "spin 2s linear infinite" : "none",
        }}>
          <span style={{ fontSize: 32, animation: "none" }}>{style.icon}</span>
        </div>

        {/* Status Message */}
        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "0.1em",
          color: style.accent,
          marginBottom: 10,
          textTransform: "uppercase",
        }}>
          {status === "processing" ? "CONNECTING" : status === "success" ? "CONNECTED" : "ERROR"}
        </div>

        <div style={{
          fontSize: 14,
          color: "rgba(232,237,245,0.6)",
          maxWidth: 320,
          lineHeight: 1.6,
        }}>
          {message}
        </div>

        {status === "processing" && (
          <div style={{ marginTop: 24, display: "flex", gap: 6, justifyContent: "center" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#00D4B4",
                animation: `spin 1.2s ease-in-out ${i * 0.2}s infinite`,
                opacity: 0.6,
              }} />
            ))}
          </div>
        )}

        {status === "error" && (
          <button
            onClick={() => window.close()}
            style={{
              marginTop: 24,
              padding: "10px 24px",
              background: "none",
              border: "1px solid rgba(0,212,180,0.2)",
              borderRadius: 3,
              color: "rgba(232,237,245,0.6)",
              cursor: "pointer",
              fontFamily: "'Outfit', sans-serif",
              fontSize: 12,
            }}
          >
            Close Window
          </button>
        )}
      </div>
    </div>
  );
}
