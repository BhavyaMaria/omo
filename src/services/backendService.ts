import type { User } from "@models/User";
import type { Ride } from "@models/Ride";
import { loadJSON, saveJSON, storageKeys } from "./localStorageService";

// This file mimics a scalable backend integration (Firebase / Node.js).
// For this frontend-only build we persist to localStorage, but the
// function boundaries are designed so you can replace internals with
// real network or Firebase SDK calls later without touching the UI.

export interface BackendAPI {
  saveUser(user: User): Promise<void>;
  getUser(): Promise<User | null>;
  saveRide(ride: Ride): Promise<void>;
  getRides(): Promise<Ride[]>;
  updateRide(ride: Ride): Promise<void>;
}

class LocalBackend implements BackendAPI {
  async saveUser(user: User) {
    saveJSON(storageKeys.USER_KEY, user);
  }

  async getUser() {
    return loadJSON<User>(storageKeys.USER_KEY);
  }

  async saveRide(ride: Ride) {
    const rides = (loadJSON<Ride[]>(storageKeys.RIDES_KEY) ?? []).concat(ride);
    saveJSON(storageKeys.RIDES_KEY, rides);
  }

  async getRides() {
    return loadJSON<Ride[]>(storageKeys.RIDES_KEY) ?? [];
  }

  async updateRide(ride: Ride) {
    const rides = loadJSON<Ride[]>(storageKeys.RIDES_KEY) ?? [];
    const updated = rides.map((r) => (r.id === ride.id ? ride : r));
    saveJSON(storageKeys.RIDES_KEY, updated);
  }
}

export const backend: BackendAPI = new LocalBackend();

