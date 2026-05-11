import type { CreateCar, Car } from "../types/car";

const BASE_URL = import.meta.env.VITE_API_URL;

export const createCarApi = async (car: CreateCar): Promise<Car> => {
  const res = await fetch(`${BASE_URL}/garage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });

  if (res.status !== 201) {
    throw new Error("Unable to create new car");
  }

  return res.json() as Promise<Car>;
};

export const updateCarApi = async (id: number, car: CreateCar): Promise<Car> => {
  const res = await fetch(`${BASE_URL}/garage/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });

  if (res.status !== 200) {
    throw new Error("Unable to update car");
  }

  return res.json() as Promise<Car>;
};

export const getCarsApi = async (): Promise<Car[]> => {
  const res = await fetch(`${BASE_URL}/garage`);

  if (res.status !== 200) {
    throw new Error("Unable to get cars");
  }

  return res.json() as Promise<Car[]>;
};
