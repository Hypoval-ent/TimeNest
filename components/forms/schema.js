import { z } from "zod";

// 🧭 Common Time Validation Regex
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:MM 24-hour format

// ✅ Fixed Task Schema
export const fixedTaskSchema = z
  .object({
    title: z.string().min(1, "Event title is required"),
    startTime: z.string().regex(timeRegex),
    endTime: z.string().regex(timeRegex),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  });

// ✅ Not-Fixed Task Schema
export const notFixedTaskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  minTime: z.coerce.number().min(1, "Minimum time must be at least 1 minute"),
});

// ✅ Daily Task Schema
export const dailyTaskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  afterTime: z.string().regex(timeRegex, "After time must be in HH:MM format"),
});
