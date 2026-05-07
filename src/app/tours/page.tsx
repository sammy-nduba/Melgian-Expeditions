import { Metadata } from "next";
import { TourRepositoryImpl } from "@/data/repositories/TourRepositoryImpl";
import { ToursAPIService } from "@/data/services/ToursApiService";
import { ToursExplorer } from "@/presentation/components/tours/ToursExplorer";

export const metadata: Metadata = {
  title: "Luxury Safari Tours",
  description:
    "Browse premium safari packages, wildlife tours, luxury lodges, and custom travel experiences.",
};

export default async function ToursPage() {
  const tourRepository = new TourRepositoryImpl(new ToursAPIService());
  const tours = await tourRepository.getAllTours();

  return (
    <main>
      <section className="bg-forest py-20 text-ivory">
        <div className="container-premium">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-savannah">
            Explore Packages
          </p>

          <h1 className="mt-4 font-heading text-5xl font-bold">
            Luxury Safari Tours
          </h1>

          <p className="mt-5 max-w-2xl text-ivory/75">
            Discover handpicked safari packages across breathtaking destinations.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium">
          <ToursExplorer tours={tours} />
        </div>
      </section>
    </main>
  );
}