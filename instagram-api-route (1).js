// This file goes at: src/app/api/auth/instagram/route.js
// It runs on Vercel's server — your App Secret never touches the browser

export async function POST(request) {
  try {
    const { code, redirectUri } = await request.json();

    if (!code) {
      return Response.json({ error: "No code provided" }, { status: 400 });
    }

    // Exchange code for short-lived token
    const tokenRes = await fetch("https://graph.facebook.com/v18.0/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.META_APP_ID || "2104051133749518",
        client_secret: process.env.META_APP_SECRET,
        redirect_uri: redirectUri,
        code: code,
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      console.error("Token exchange error:", tokenData.error);
      return Response.json({ error: tokenData.error.message }, { status: 400 });
    }

    // Exchange for long-lived token (60 days instead of 1 hour)
    const longTokenRes = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.META_APP_ID}&client_secret=${process.env.META_APP_SECRET}&fb_exchange_token=${tokenData.access_token}`
    );

    const longTokenData = await longTokenRes.json();

    return Response.json({
      access_token: longTokenData.access_token || tokenData.access_token,
      expires_in: longTokenData.expires_in,
    });

  } catch (error) {
    console.error("Auth error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
