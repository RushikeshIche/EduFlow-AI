export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return Response.json(
        { error: "Text input is required", success: false },
        { status: 400 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324",
        messages: [
          {
            role: "system",
            content: "Return ONLY the generated notes as plain text, no JSON formatting"
          },
          {
            role: "user",
            content: `Create short study notes from:\n\n${text}`
          }
        ]
      }),
    });

    const data = await response.json();
    return Response.json({
      success: true,
      result: data.choices[0]?.message?.content || ""
    });

  } catch (error) {
    return Response.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}