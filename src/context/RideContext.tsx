import React, { createContext, useContext, useEffect, useState } from "react";
import type { Ride, TransportMode } from "@models/Ride";
import { backend } from "@services/backendService";
import { saveJSON, storageKeys } from "@services/localStorageService";

interface RideContextType {
  rides: Ride[];
  activeRide: Ride | null;
  startRide: (from: string, to: string, mode: TransportMode, childMode: boolean) => void;
  completeActiveRide: () => void;
}

const RideContext = createContext<RideContextType | undefined>(undefined);

export const RideProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [activeRide, setActiveRide] = useState<Ride | null>(null);

  useEffect(() => {
    backend.getRides().then((stored) => {
      setRides(stored);
    });
  }, []);

  useEffect(() => {
    saveJSON(storageKeys.RIDES_KEY, rides);
  }, [rides]);

  const startRide: RideContextType["startRide"] = (
    from,
    to,
    mode,
    childMode
  ) => {
    const ride: Ride = {
      id: `${Date.now()}`,
      from,
      to,
      mode,
      childMode,
      startedAt: new Date().toISOString()
    };
    setActiveRide(ride);
    setRides((prev) => [...prev, ride]);
    backend.saveRide(ride);
  };

  const completeActiveRide = () => {
    if (!activeRide) return;
    const finished: Ride = {
      ...activeRide,
      endedAt: new Date().toISOString()
    };
    setActiveRide(null);
    setRides((prev) => prev.map((r) => (r.id === finished.id ? finished : r)));
    backend.updateRide(finished);
  };

  return (
    <RideContext.Provider
      value={{ rides, activeRide, startRide, completeActiveRide }}
    >
      {children}
    </RideContext.Provider>
  );
};

export const useRides = () => {
  const ctx = useContext(RideContext);
  if (!ctx) {
    throw new Error("useRides must be used within RideProvider");
  }
  return ctx;
};

