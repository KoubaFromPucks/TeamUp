export const inviteTypeEnum = [
  "public",
  "private",
  "invite_only",
] as const;

export type InviteType = (typeof inviteTypeEnum)[number];
