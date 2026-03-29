export async function POST(request) {
  try {
    const body = await request.json();
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 2000,
        system: body.system || "You are a helpful AI assistant.",
        messages: body.messages,
      }),
    });
    const data = await res.json();
    if (data.error) {
      console.error("Anthropic error:", data.error);
      return Response.json({ error: data.error.message }, { status: 400 });
    }
    return Response.json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
