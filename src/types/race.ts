import type { Car } from "./car";

export type CarStatus = "idle" | "starting" | "driving" | "broken" | "finished" | "stopping";

export interface EngineSpecs {
  velocity: number;
  distance: number;
  duration: number;
}

export interface CarRaceState {
  status: CarStatus;
  specs: EngineSpecs | null;
}

export interface WinnerInfo {
  id: number;
  name: string;
  time: number;
}

export interface RaceStore {
  cars: Record<number, CarRaceState>;
  winner: WinnerInfo | null;
  isRacing: boolean;
  startCar: (id: number) => Promise<void>;
  stopCar: (id: number) => Promise<void>;
  startRace: (cars: Car[]) => Promise<void>;
  resetRace: (ids: number[]) => Promise<void>;
  clearWinner: () => void;
}
