// Centralized helpers around localStorage keys for OMO.

const USER_KEY = "omo_user";
const RIDES_KEY = "omo_rides";
const PASSKEY_ENABLED_KEY = "omo_passkey_enabled";
const LOCATION_PERMISSION_KEY = "omo_location_permission";
const CONTACTS_PERMISSION_KEY = "omo_contacts_permission";
const CHILD_MODE_KEY = "omo_child_mode";

export const storageKeys = {
  USER_KEY,
  RIDES_KEY,
  PASSKEY_ENABLED_KEY,
  LOCATION_PERMISSION_KEY,
  CONTACTS_PERMISSION_KEY,
  CHILD_MODE_KEY
} as const;

export function loadJSON<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function saveJSON(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Non-fatal for frontend-only prototype; ignore quota errors.
  }
}

export function setFlag(key: string, value: boolean) {
  window.localStorage.setItem(key, value ? "true" : "false");
}

export function getFlag(key: string): boolean {
  return window.localStorage.getItem(key) === "true";
}

export function setString(key: string, value: string) {
  window.localStorage.setItem(key, value);
}

export function getString(key: string): string | null {
  return window.localStorage.getItem(key);
}

