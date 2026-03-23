"use client";
import { useEffect, useState } from "react";

const REDIRECT_URI = "https://valmontmarketing.com/vantix/auth/callback";

export default function AuthCallback() {
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Connecting your account...");

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");
      const error = params.get("error");

      if (error) {
        setStatus("error");
        setMessage("Connection cancelled. Please close this window.");
        return;
      }

      if (!code) {
        setStatus("error");
        setMessage("No authorization code received. Please try again.");
        return;
      }

      try {
        const res = await fetch("/api/auth/instagram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, redirectUri: REDIRECT_URI }),
        });

        // Always read the body first
        const data = await res.json();

        if (!res.ok || data.error) {
          // Show the actual Facebook error
          const errMsg = typeof data.error === "object" ? data.error.message : (data.error || "Token exchange failed");
          throw new Error(errMsg);
        }

        if (data.access_token) {
          if (window.opener) {
            window.opener.postMessage(
              { type: "VANTIX_AUTH_SUCCESS", accessToken: data.access_token, state: state },
              window.location.origin
            );
            setStatus("success");
            setMessage("Account connected! Closing window...");
            setTimeout(() => window.close(), 1500);
          } else {
            localStorage.setItem(`vx_meta_token_${state}`, JSON.stringify(data.access_token));
            setStatus("success");
            setMessage("Account connected! Redirecting...");
            setTimeout(() => { window.location.href = "/vantix?connected=true&client=" + state; }, 1500);
          }
        } else {
          throw new Error("No access token returned");
        }
      } catch (err) {
        setStatus("error");
        setMessage(err.message);
      }
    };

    handleCallback();
  }, []);

  const c = { processing: "#00D4B4", success: "#00D4B4", error: "#FF5060" };
  const accent = c[status];

  return (
    <div style={{ minHeight: "100vh", background: "#040810", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit', sans-serif" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ textAlign: "center", padding: 40 }}>
        <div style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: 28, letterSpacing: "0.2em", color: "#00D4B4", marginBottom: 32 }}>VANTIX</div>
        <div style={{ width: 80, height: 80, borderRadius: "50%", border: `2px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", background: `${accent}10`, animation: status === "processing" ? "spin 2s linear infinite" : "none" }}>
          <span style={{ fontSize: 32 }}>{status === "processing" ? "⟳" : status === "success" ? "✓" : "✕"}</span>
        </div>
        <div style={{ fontWeight: 700, fontSize: 18, color: accent, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {status === "processing" ? "CONNECTING" : status === "success" ? "CONNECTED" : "ERROR"}
        </div>
        <div style={{ fontSize: 13, color: "rgba(232,237,245,0.7)", maxWidth: 340, lineHeight: 1.7 }}>{message}</div>
        {status === "error" && (
          <button onClick={() => window.close()} style={{ marginTop: 24, padding: "10px 24px", background: "none", border: "1px solid rgba(0,212,180,0.2)", borderRadius: 3, color: "rgba(232,237,245,0.6)", cursor: "pointer", fontSize: 12 }}>
            Close Window
          </button>
        )}
      </div>
    </div>
  );
}
