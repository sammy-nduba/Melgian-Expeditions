import { Metadata } from "next";
import { DestinationAPIService } from "@/data/services/DestinationAPIService";
import { DestinationRepositoryImpl } from "@/data/repositories/DestinationRepositoryImpl";
import { DestinationCard } from "@/presentation/components/destinations/DestinationCard";

export const metadata: Metadata = {
  title: "Safari Destinations",
  description:
    "Explore premium safari destinations across Africa, including Tanzania, Kenya, Botswana, and South Africa.",
};

export default async function DestinationsPage() {
  const destinationRepository = new DestinationRepositoryImpl(
    new DestinationAPIService()
  );

  const destinations = await destinationRepository.getAllDestinations();

  return (
    <main>
      <section className="bg-forest py-20 text-ivory">
        <div className="container-premium">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-savannah">
            Explore Africa
          </p>

          <h1 className="mt-4 font-heading text-5xl font-bold">
            Safari Destinations
          </h1>

          <p className="mt-5 max-w-2xl text-ivory/75">
            Discover breathtaking safari landscapes, iconic wildlife regions,
            and luxury travel experiences across Africa.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      </section>
    </main>
  );
}