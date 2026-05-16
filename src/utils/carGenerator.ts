import { carNames } from "../lib/cars";

export function carGenerator() {
  const brands = Object.keys(carNames);

  const randomBrand = brands[Math.floor(Math.random() * brands.length)];

  const models = carNames[randomBrand];

  const randomModel = models[Math.floor(Math.random() * models.length)];
  const randomColor = `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

  return {
    name: `${randomBrand} ${randomModel}`,
    color: randomColor,
  };
}
