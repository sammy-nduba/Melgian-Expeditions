import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Destination } from "@/domain/entities/Destination";

type DestinationCardProps = {
  destination: Destination;
};

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <article className="group relative h-[420px] overflow-hidden rounded-premium shadow-premium">
      <Image
        src={destination.coverImage}
        alt={destination.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
        <p className="mb-3 flex items-center gap-2 text-sm text-savannah">
          <MapPin size={16} />
          {destination.country}
        </p>

        <h3 className="font-heading text-3xl font-bold">
          {destination.name}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-ivory/75">
          {destination.description}
        </p>

        <Link
          href={`/destinations/${destination.slug}`}
          className="mt-5 inline-flex text-sm font-semibold text-savannah"
        >
          Explore Destination →
        </Link>
      </div>
    </article>
  );
}