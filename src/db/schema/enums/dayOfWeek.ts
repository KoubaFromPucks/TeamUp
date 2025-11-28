export const dayOfWeekEnum = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;

export type DayOfWeek = (typeof dayOfWeekEnum)[number];
