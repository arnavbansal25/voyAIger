const GENERATE_URL = "/api/gemini/generate";

export async function generateTripPlan(prompt) {
  const response = await fetch(GENERATE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate trip plan");
  }

  if (!data.text) {
    throw new Error("Empty response from trip planner");
  }

  return data.text;
}
