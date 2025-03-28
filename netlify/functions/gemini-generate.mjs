import {
  generateGeminiContent,
  isAllowedOrigin,
} from "../../server/gemini-generate.js";

const jsonHeaders = {
  "Content-Type": "application/json",
};

export async function handler(event) {
  const origin = event.headers.origin || event.headers.Origin;

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        ...jsonHeaders,
        "Access-Control-Allow-Origin": origin || "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: jsonHeaders,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  if (!isAllowedOrigin(origin)) {
    return {
      statusCode: 403,
      headers: jsonHeaders,
      body: JSON.stringify({ error: "Forbidden origin" }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers: jsonHeaders,
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  try {
    const text = await generateGeminiContent(
      body.prompt,
      process.env.GEMINI_API_KEY
    );
    return {
      statusCode: 200,
      headers: {
        ...jsonHeaders,
        "Access-Control-Allow-Origin": origin || "*",
      },
      body: JSON.stringify({ text }),
    };
  } catch (error) {
    const status = error.status && error.status >= 400 ? error.status : 500;
    const message =
      status === 500 && !process.env.GEMINI_API_KEY
        ? "Server misconfiguration"
        : error.message || "Generation failed";

    return {
      statusCode: status,
      headers: jsonHeaders,
      body: JSON.stringify({ error: message }),
    };
  }
}
