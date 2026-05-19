import { create } from "zustand";
import type { CarRaceState, RaceStore } from "../types/race";
import { driveApi, EngineBrokenError, startEngineApi, stopEngineApi } from "../api/engine";
import { useWinnerStore } from "./useWinnersStore";

const IDLE_STATE: CarRaceState = { status: "idle", specs: null, brokenAtFraction: null };

export const useRaceStore = create<RaceStore>((set, get) => {
  const patchCar = (id: number, patch: Partial<CarRaceState>): void => {
    set((s) => ({
      cars: {
        ...s.cars,
        [id]: { ...(s.cars[id] ?? IDLE_STATE), ...patch },
      },
    }));
  };

  const runCar = async (id: number): Promise<{ id: number; durationMs: number }> => {
    patchCar(id, { status: "starting", specs: null, brokenAtFraction: null });

    const { velocity, distance } = await startEngineApi(id);
    const duration = distance / velocity;
    const drivingStartedAt = Date.now();
    patchCar(id, { status: "driving", specs: { velocity, distance, duration } });

    try {
      await driveApi(id);
      patchCar(id, { status: "finished" });
      return { id, durationMs: duration };
    } catch (err) {
      if (err instanceof EngineBrokenError) {
        const fraction = duration > 0 ? Math.min(1, (Date.now() - drivingStartedAt) / duration) : 0;
        patchCar(id, { status: "broken", brokenAtFraction: fraction });
      }
      throw err;
    }
  };

  const startCar = async (id: number): Promise<void> => {
    const currentCar = get().cars[id];
    if (currentCar && currentCar.status !== "idle") return;

    try {
      await runCar(id);
    } catch {
      const after = get().cars[id];
      if (after?.status !== "broken") {
        patchCar(id, { status: "idle", specs: null, brokenAtFraction: null });
      }
    }
  };

  const stopCar = async (id: number): Promise<void> => {
    const currentCar = get().cars[id];
    if (!currentCar || currentCar.status === "idle" || currentCar.status === "stopping") return;

    patchCar(id, { status: "stopping" });

    try {
      await stopEngineApi(id);
    } finally {
      patchCar(id, { status: "idle", specs: null, brokenAtFraction: null });
    }
  };

  return {
    cars: {},
    isRacing: false,
    winner: null,
    startCar,
    stopCar,

    startRace: async (cars) => {
      if (get().isRacing || cars.length === 0) return;
      set({ isRacing: true, winner: null });

      const runs = cars.map(async (car) =>
        runCar(car.id).then((result) => ({ ...result, name: car.name })),
      );

      try {
        const winner = await Promise.any(runs);
        const time = Number((winner.durationMs / 1000).toFixed(2));
        set({ winner: { id: winner.id, name: winner.name, time } });
        await useWinnerStore.getState().saveRaceWinner(winner.id, time);
      } catch {
        // every car broke down — no winner
      }

      await Promise.allSettled(runs);
      set({ isRacing: false });
    },

    resetRace: async (ids) => {
      set({ winner: null });
      await Promise.all(ids.map(async (id) => stopCar(id)));
    },

    clearWinner: () => set({ winner: null }),
  };
});
