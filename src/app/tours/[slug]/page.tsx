import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, MapPin, Star, Users, CheckCircle, XCircle } from "lucide-react";
import { TourRepositoryImpl } from "@/data/repositories/TourRepositoryImpl";
import { ToursAPIService } from "@/data/services/ToursApiService";
import { formatCurrency } from "@/core/utils/currency";
import { CTAButton } from "@/presentation/components/common/CTAButton";
import { TourSchema } from "@/presentation/components/common/TourSchema";
import type { Metadata } from "next";

type TourDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const tourRepository = new TourRepositoryImpl(new ToursAPIService());

export async function generateMetadata({
  params,
}: TourDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await tourRepository.getTourBySlug(slug);

  if (!tour) {
    return {
      title: "Tour Not Found",
    };
  }

  return {
    title: tour.title,
    description: tour.description,
    openGraph: {
      title: tour.title,
      description: tour.description,
      images: [tour.coverImage],
    },
  };
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { slug } = await params;
  const tour = await tourRepository.getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <main>
      <TourSchema tour={tour} />

      <section className="relative min-h-[70vh] overflow-hidden">
        <Image
          src={tour.coverImage}
          alt={tour.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/50 to-charcoal/10" />

        <div className="container-premium relative z-10 flex min-h-[70vh] items-end pb-16">
          <div className="max-w-4xl text-ivory">
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-savannah">
              <MapPin size={16} />
              {tour.destination}
            </p>

            <h1 className="font-heading text-5xl font-bold leading-tight md:text-7xl">
              {tour.title}
            </h1>

            {tour.subtitle && (
              <p className="mt-5 max-w-2xl text-xl text-ivory/80">
                {tour.subtitle}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <span className="rounded-full bg-ivory/15 px-4 py-2 backdrop-blur">
                {tour.durationDays} Days
              </span>

              <span className="rounded-full bg-ivory/15 px-4 py-2 backdrop-blur">
                {tour.groupSize.min}-{tour.groupSize.max} Guests
              </span>

              <span className="rounded-full bg-ivory/15 px-4 py-2 backdrop-blur">
                From {formatCurrency(tour.priceFrom, tour.currency)}
              </span>

              <span className="rounded-full bg-savannah px-4 py-2 font-semibold text-charcoal">
                {tour.availability === "available"
                  ? "Available"
                  : tour.availability === "limited"
                  ? "Limited Spots"
                  : "Sold Out"}
              </span>

              <span className="rounded-full bg-forest px-4 py-2 font-semibold text-ivory">
                {tour.packageClass.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="grid gap-4 sm:grid-cols-4">
              <InfoCard icon={<Clock size={22} />} label="Duration" value={`${tour.durationDays} Days`} />
              <InfoCard icon={<Users size={22} />} label="Group Size" value={`${tour.groupSize.min}-${tour.groupSize.max}`} />
              <InfoCard icon={<Star size={22} />} label="Rating" value={`${tour.rating}/5`} />
              <InfoCard icon={<MapPin size={22} />} label="Destination" value={tour.destination} />
            </div>

            <div className="mt-12">
              <h2 className="font-heading text-4xl font-bold text-charcoal">
                Tour Overview
              </h2>

              <p className="mt-5 text-lg leading-8 text-charcoal/75">
                {tour.description}
              </p>
            </div>

            <div className="mt-12">
              <h2 className="font-heading text-4xl font-bold text-charcoal">
                Highlights
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {tour.highlights.map((highlight) => (
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

            <div className="mt-12">
              <h2 className="font-heading text-4xl font-bold text-charcoal">
                Day-by-Day Itinerary
              </h2>

              <div className="mt-8 space-y-6">
                {tour.itinerary.map((item) => (
                  <div
                    key={item.day}
                    className="rounded-premium border border-charcoal/10 bg-white p-6"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-bronze">
                      Day {item.day}
                    </p>

                    <h3 className="mt-2 font-heading text-2xl font-semibold text-charcoal">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-7 text-charcoal/70">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="rounded-premium bg-white p-6 shadow-sm">
                <h2 className="font-heading text-3xl font-semibold">
                  Included
                </h2>

                <ul className="mt-5 space-y-3">
                  {tour.included.map((item) => (
                    <li key={item} className="flex gap-3 text-charcoal/75">
                      <CheckCircle size={18} className="mt-1 text-forest" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-premium bg-white p-6 shadow-sm">
                <h2 className="font-heading text-3xl font-semibold">
                  Excluded
                </h2>

                <ul className="mt-5 space-y-3">
                  {tour.excluded.map((item) => (
                    <li key={item} className="flex gap-3 text-charcoal/75">
                      <XCircle size={18} className="mt-1 text-bronze" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-premium bg-white p-6 shadow-premium lg:sticky lg:top-28">
            <p className="text-sm uppercase tracking-[0.2em] text-bronze">
              Starting From
            </p>

            <p className="mt-2 text-4xl font-bold text-forest">
              {formatCurrency(tour.priceFrom, tour.currency)}
            </p>

            <p className="mt-2 text-sm text-charcoal/60">
              Per person, based on double occupancy.
            </p>

            <div className="mt-6 space-y-3 border-y border-charcoal/10 py-6 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal/60">Duration</span>
                <span className="font-semibold">{tour.durationDays} days</span>
              </div>

              <div className="flex justify-between">
                <span className="text-charcoal/60">Destination</span>
                <span className="font-semibold">{tour.destination}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-charcoal/60">Availability</span>
                <span className="font-semibold capitalize">
                  {tour.availability.replace("_", " ")}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <CTAButton href={`/booking?tour=${tour.slug}`} className="w-full">
                Book This Tour
              </CTAButton>

              <CTAButton href="/contact" variant="outline" className="w-full">
                Ask a Question
              </CTAButton>
            </div>

            <p className="mt-5 text-center text-xs text-charcoal/50">
              No payment required to send an inquiry.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="text-forest">{icon}</div>
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-charcoal/50">
        {label}
      </p>
      <p className="mt-1 font-semibold text-charcoal">{value}</p>
    </div>
  );
}