export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length < 20) {
      return Response.json(
        { error: "Text must be at least 20 characters" },
        { status: 400 }
      );
    }

    // Debug: Log the received text
    console.log("Received text for MCQs:", text);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content: `Generate 5 multiple choice questions in JSON format. 
              Return ONLY this structure:
              [{
                "question": "Your question here",
                "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                "answer": 0
              }]`
          },
          {
            role: "user",
            content: `Generate MCQs from: ${text}`
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 2000
      }),
    });

    // Debug: Log the raw API response
    console.log("MCQ API response status:", response.status);

    const data = await response.json();
    console.log("MCQ API response data:", data);

    if (!response.ok) throw new Error(data.error?.message || "API request failed");

    let questions = [];
    try {
      const content = data.choices[0]?.message?.content;
      const parsed = JSON.parse(content);
      questions = Array.isArray(parsed) ? parsed : parsed.questions || [];
    } catch (e) {
      console.error("Failed to parse MCQs:", e);
      throw new Error("Invalid MCQ format received");
    }

    // Debug: Log the final questions
    console.log("Generated questions:", questions);

    return Response.json({ result: questions.slice(0, 5) });
  } catch (error) {
    console.error("MCQ generation error:", error);
    return Response.json(
      { error: error.message || "MCQ generation failed" },
      { status: 500 }
    );
  }
}