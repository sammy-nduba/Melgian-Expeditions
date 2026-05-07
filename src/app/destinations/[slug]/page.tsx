import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle, CalendarDays, CloudSun } from "lucide-react";
import { Metadata } from "next";
import { DestinationAPIService } from "@/data/services/DestinationAPIService";
import { DestinationRepositoryImpl } from "@/data/repositories/DestinationRepositoryImpl";
import { CTAButton } from "@/presentation/components/common/CTAButton";

type DestinationDetailPageProps = {
  params: {
    slug: string;
  };
};

const destinationRepository = new DestinationRepositoryImpl(
  new DestinationAPIService()
);

export async function generateMetadata({
  params,
}: DestinationDetailPageProps): Promise<Metadata> {
  const destination = await destinationRepository.getDestinationBySlug(
    params.slug
  );

  if (!destination) {
    return {
      title: "Destination Not Found",
    };
  }

  return {
    title: `${destination.name} Safari Destination`,
    description: destination.description,
    openGraph: {
      title: `${destination.name} Safari Destination`,
      description: destination.description,
      images: [destination.coverImage],
    },
  };
}

export default async function DestinationDetailPage({
  params,
}: DestinationDetailPageProps) {
  const destination = await destinationRepository.getDestinationBySlug(
    params.slug
  );

  if (!destination) {
    notFound();
  }

  return (
    <main>
      <section className="relative min-h-[65vh] overflow-hidden">
        <Image
          src={destination.coverImage}
          alt={destination.name}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/45 to-transparent" />

        <div className="container-premium relative z-10 flex min-h-[65vh] items-end pb-16 text-ivory">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-savannah">
              {destination.country}
            </p>

            <h1 className="mt-4 font-heading text-5xl font-bold md:text-7xl">
              {destination.name}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-ivory/80">
              {destination.description}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="font-heading text-4xl font-bold">
              Destination Overview
            </h2>

            <p className="mt-5 text-lg leading-8 text-charcoal/75">
              {destination.longDescription}
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-premium bg-white p-6 shadow-sm">
                <CalendarDays className="text-forest" />
                <h3 className="mt-4 font-heading text-2xl font-semibold">
                  Best Season
                </h3>
                <p className="mt-2 text-charcoal/70">
                  {destination.bestSeason}
                </p>
              </div>

              <div className="rounded-premium bg-white p-6 shadow-sm">
                <CloudSun className="text-forest" />
                <h3 className="mt-4 font-heading text-2xl font-semibold">
                  Climate
                </h3>
                <p className="mt-2 text-charcoal/70">
                  {destination.climate}
                </p>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="font-heading text-4xl font-bold">
                Destination Highlights
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {destination.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex gap-3 rounded-2xl bg-white p-5 shadow-sm"
                  >
                    <CheckCircle className="mt-1 text-forest" size={20} />
                    <p className="text-charcoal/75">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-premium bg-white p-6 shadow-premium lg:sticky lg:top-28">
            <h2 className="font-heading text-3xl font-semibold">
              Plan This Destination
            </h2>

            <p className="mt-4 text-sm leading-6 text-charcoal/70">
              Speak with a safari expert and build a custom itinerary around
              this destination.
            </p>

            <div className="mt-6 space-y-3">
              <CTAButton href="/booking" className="w-full">
                Start Planning
              </CTAButton>

              <CTAButton href="/tours" variant="outline" className="w-full">
                View Related Tours
              </CTAButton>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}