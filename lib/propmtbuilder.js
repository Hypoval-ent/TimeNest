// lib/promptBuilder.js
export function buildPrompt(fixedTasks, mustDoTasks, dailyTasks) {
  return `
I have the following inputs:

1. Fixed Timetable (non-flexible):
// ${fixedTasks.map(e => `- ${e.title} from ${e.startTime} to ${e.endTime}`).join("\n")}

2. Must-Do Tasks (If some task not possible to add then remove):
${mustDoTasks.map(e => `- ${e.title} by ${e.minTime}`).join("\n")}

3. Daily Flexible Tasks:
${dailyTasks.map(e => `- ${e.title} after ${e.afterTime}`).join("\n")}

If input is in 15 minutes or 45 minutues round of it to 00:00 or 00:30
Don't add anything extra for the output but leave gaps for acitivities that doesn't need to be mentioned which ever is more opmtimised
Generate a day-wise 24-hour format schedule (e.g., 13:30 - 14:30) using this data.
Only return a JSON array of events, each having a title, start time, and end time. Don't wrap it inside a code block.

`;
}
