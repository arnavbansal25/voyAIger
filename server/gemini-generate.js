const GEMINI_MODEL = "gemini-3.5-flash";
const MAX_PROMPT_LENGTH = 50_000;

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export function isAllowedOrigin(origin) {
  if (!origin) return true;
  const allowed = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://voyaiger.netlify.app",
  ];
  return allowed.includes(origin);
}

export async function generateGeminiContent(prompt, apiKey) {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  if (!prompt || typeof prompt !== "string") {
    throw new Error("Invalid prompt");
  }
  if (prompt.length > MAX_PROMPT_LENGTH) {
    throw new Error("Prompt is too long");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      safetySettings: [],
      generationConfig,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      data?.error?.message || `Gemini request failed (${response.status})`;
    const err = new Error(message);
    err.status = response.status;
    throw err;
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Empty response from Gemini");
  }

  return text;
}
