import { create } from "zustand";
import type { GarageStore } from "../types/car";
import { createCarApi, updateCarApi, getCarsApi } from "../api/garage";

export const useGarageStore = create<GarageStore>((set, get) => ({
  cars: [],
  newCar: { name: "", color: "#ffffff" },
  updateCar: { id: -1, name: "", color: "#ffffff" },

  setNewCar: (car) => set((s) => ({ newCar: { ...s.newCar, ...car } })),
  setUpdateCar: (car) => set((s) => ({ updateCar: { ...s.updateCar, ...car } })),

  createCar: async (car) => {
    const data = await createCarApi(car);
    set((s) => ({ cars: [...s.cars, data] }));
    return data;
  },

  addCars: (newCars) =>
    set((s) => ({
      cars: [...s.cars, ...newCars],
    })),

  updateCarAction: async () => {
    const { updateCar } = get();
    const data = await updateCarApi(updateCar.id, {
      name: updateCar.name,
      color: updateCar.color,
    });

    set((s) => ({
      updateCar: { id: -1, name: "", color: "#ffffff" },
      cars: s.cars.map((c) => (c.id === data.id ? data : c)),
    }));
    return data;
  },

  getCars: async () => {
    const data = await getCarsApi();
    set({ cars: data });
  },
}));
