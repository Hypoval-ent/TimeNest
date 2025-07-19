export async function generateSchedule(prompt) {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }), // ✅ Send prompt here
  });

  if (!res.ok) {
    throw new Error("Failed to get Gemini schedule");
  }

  const data = await res.json();
  return data.text; 
}
