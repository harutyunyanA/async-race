import CarsList from "../components/carsList.tsx";
import RaceControls from "../components/raceControls.tsx";
import CreateCarForm from "../components/createCarForm.tsx";
import UpdateCarForm from "../components/updateCarForm.tsx";
import GenerateCars from "../components/generateCars.tsx";

export default function Garage() {
  return (
    <div className="flex flex-col gap-6 max-sm:gap-3">
      <div
        id="garage-controls"
        className="grid grid-cols-2 max-sm:grid-cols-1 xl:flex xl:flex-row xl:flex-wrap xl:justify-between gap-3 w-full items-center *:w-full xl:*:w-auto"
      >
        <RaceControls />
        <CreateCarForm />
        <UpdateCarForm />
        <GenerateCars />
      </div>
      <CarsList />
    </div>
  );
}
