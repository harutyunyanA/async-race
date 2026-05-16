const BASE_URL = import.meta.env.VITE_API_URL;

export class EngineBrokenError extends Error {
  public readonly carId: number;

  constructor(carId: number) {
    super(`Engine of car ${carId} broke down`);
    this.name = "EngineBrokenError";
    this.carId = carId;
  }
}

export interface EngineStartResponse {
  velocity: number;
  distance: number;
}

const engineUrl = (id: number, status: "started" | "stopped" | "drive"): string =>
  `${BASE_URL}/engine?id=${id}&status=${status}`;

export const startEngineApi = async (
  id: number,
  // signal?: AbortSignal,
): Promise<EngineStartResponse> => {
  const res = await fetch(engineUrl(id, "started"), {
    method: "PATCH",
    // signal
  });
  if (!res.ok) throw new Error(`Unable to start engine for car ${id}`);
  return res.json() as Promise<EngineStartResponse>;
};

export const driveApi = async (
  id: number,
  // signal?: AbortSignal
): Promise<{ success: true }> => {
  const res = await fetch(engineUrl(id, "drive"), {
    method: "PATCH",
    //  signal
  });
  if (res.status === 500) throw new EngineBrokenError(id);
  if (!res.ok) throw new Error(`Drive request failed for car ${id}: ${res.status}`);
  return res.json() as Promise<{ success: true }>;
};

export const stopEngineApi = async (
  id: number,
  // signal?: AbortSignal,
): Promise<EngineStartResponse> => {
  const res = await fetch(engineUrl(id, "stopped"), {
    method: "PATCH",
    // signal
  });
  if (!res.ok) throw new Error(`Unable to stop engine for car ${id}`);
  return res.json() as Promise<EngineStartResponse>;
};
