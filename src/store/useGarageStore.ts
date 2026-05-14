import { create } from "zustand";
import type { GarageStore } from "../types/car";
import { createCarApi, updateCarApi, getCarsApi, deleteCarApi } from "../api/garage";

export const useGarageStore = create<GarageStore>((set, get) => ({
  cars: [],
  newCar: { name: "", color: "#ffffff" },
  updateCar: { id: -1, name: "", color: "#ffffff" },
  page: 1,
  selectedCar: null,
  setNewCar: (car) => set((s) => ({ newCar: { ...s.newCar, ...car } })),
  setUpdateCar: (car) => set((s) => ({ updateCar: { ...s.updateCar, ...car } })),
  setPage: (page) => set({ page }),

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
      selectedCar: null,  
    }));
    return data;
  },

  getCars: async () => {
    const data = await getCarsApi();
    set({ cars: data });
  },

  deleteCar: async (id) => {
    await deleteCarApi(id);
    const { page, setPage } = get();
    set((s) => {
      const cars = s.cars.filter((c) => c.id !== id);
      const pageStart = (page - 1) * 7;
      const isPageEmpty = cars.slice(pageStart, pageStart + 7).length === 0;
      if (isPageEmpty && page > 1) setPage(page - 1);
      return { cars };
    });
  },

  selectCar: (id) => {
    const { selectedCar, cars } = get();
    if (selectedCar === id) {
      set({ selectedCar: null, updateCar: { id: -1, name: "", color: "#ffffff" } });
      return;
    }
    const car = cars.find((c) => c.id === id);
    if (!car) return;
    set({ selectedCar: id, updateCar: car });
  },
}));
