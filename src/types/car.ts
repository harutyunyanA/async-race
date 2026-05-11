export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface CreateCar {
  name: string;
  color: string;
}

export interface GarageStore {
  cars: Car[];
  newCar: CreateCar;
  updateCar: Car;
  setNewCar: (car: Partial<CreateCar>) => void;
  setUpdateCar: (car: Partial<Car>) => void;
  createCar: (car: CreateCar) => Promise<Car>;
  addCars: (cars: Car[]) => void;
  updateCarAction: () => Promise<Car>;
}
