export type AvatarId =
  | "omo-cloud"
  | "omo-drop"
  | "omo-flower"
  | "omo-leaf"
  | "cat"
  | "dog"
  | "panda"
  | "bunny";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: AvatarId;
  joinedAt: string;
  passkeySet: boolean;
}

