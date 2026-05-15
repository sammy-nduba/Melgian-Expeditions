import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Star, Users } from "lucide-react";
import { TourPackage } from "@/domain/entities/TourPackage";
import { formatCurrency } from "@/core/utils/currency";
import { CTAButton } from "../common/CTAButton";

type TourCardProps = {
  tour: TourPackage;
};

export function TourCard({ tour }: TourCardProps) {
  return (
    <article className="premium-card group">
      <Link href={`/tours/${tour.slug}`}>
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src={tour.coverImage}
            alt={tour.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute left-4 top-4 flex flex-col gap-2">
            <div className="w-fit rounded-full bg-ivory px-4 py-2 text-xs font-semibold text-forest">
              {tour.availability === "available"
                ? "Available"
                : tour.availability === "limited"
                ? "Limited Spots"
                : "Sold Out"}
            </div>
            <div className="w-fit rounded-full bg-savannah px-4 py-2 text-xs font-semibold text-charcoal">
              {tour.packageClass.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </div>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between text-sm text-bronze">
          <span className="flex items-center gap-1">
            <MapPin size={16} />
            {tour.destination}
          </span>

          <span className="flex items-center gap-1">
            <Star size={16} className="fill-savannah text-savannah" />
            {tour.rating}
          </span>
        </div>

        <h3 className="font-heading text-2xl font-semibold text-charcoal">
          {tour.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-charcoal/70">
          {tour.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-charcoal/75">
          <span className="flex items-center gap-2">
            <Clock size={16} />
            {tour.durationDays} days
          </span>

          <span className="flex items-center gap-2">
            <Users size={16} />
            {tour.groupSize.min}-{tour.groupSize.max} guests
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-charcoal/10 pt-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-charcoal/50">
              From
            </p>
            <p className="text-xl font-bold text-forest">
              {formatCurrency(tour.priceFrom, tour.currency)}
            </p>
          </div>

          <CTAButton href={`/tours/${tour.slug}`} variant="outline">
            View Tour
          </CTAButton>
        </div>
      </div>
    </article>
  );
}