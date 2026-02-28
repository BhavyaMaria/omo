export type TransportMode = "car";

export interface Ride {
  id: string;
  from: string;
  to: string;
  mode: TransportMode;
  childMode: boolean;
  startedAt: string;
  endedAt?: string;
}

