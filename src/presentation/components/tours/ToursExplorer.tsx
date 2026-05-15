"use client";

import { useMemo, useState } from "react";
import { TourPackage } from "@/domain/entities/TourPackage";
import { TourCard } from "./TourCard";
import { SearchBar } from "../common/SearchBar";

type ToursExplorerProps = {
  tours: TourPackage[];
};

export function ToursExplorer({ tours }: ToursExplorerProps) {
  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("all");
  const [duration, setDuration] = useState("all");
  const [packageClass, setPackageClass] = useState("all");
  const [sort, setSort] = useState("recommended");

  const destinations = useMemo(() => {
    return Array.from(new Set(tours.map((tour) => tour.destination)));
  }, [tours]);

  const filteredTours = useMemo(() => {
    let result = [...tours];

    if (search) {
      const normalizedSearch = search.toLowerCase();

      result = result.filter(
        (tour) =>
          tour.title.toLowerCase().includes(normalizedSearch) ||
          tour.destination.toLowerCase().includes(normalizedSearch) ||
          tour.description.toLowerCase().includes(normalizedSearch)
      );
    }

    if (destination !== "all") {
      result = result.filter((tour) => tour.destination === destination);
    }

    if (duration !== "all") {
      if (duration === "short") {
        result = result.filter((tour) => tour.durationDays <= 3);
      }

      if (duration === "medium") {
        result = result.filter(
          (tour) => tour.durationDays >= 4 && tour.durationDays <= 7
        );
      }

      if (duration === "long") {
        result = result.filter((tour) => tour.durationDays >= 8);
      }
    }

    if (packageClass !== "all") {
      result = result.filter((tour) => tour.packageClass === packageClass);
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.priceFrom - b.priceFrom);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.priceFrom - a.priceFrom);
    }

    if (sort === "duration") {
      result.sort((a, b) => a.durationDays - b.durationDays);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [tours, search, destination, duration, packageClass, sort]);

  return (
    <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-premium bg-white p-6 shadow-premium lg:sticky lg:top-28">
        <h2 className="font-heading text-2xl font-semibold">Refine Search</h2>

        <div className="mt-6 space-y-6">
          <SearchBar value={search} onChange={setSearch} />

          <div>
            <label className="text-sm font-semibold">Destination</label>
            <select
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              className="mt-2 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3"
            >
              <option value="all">All destinations</option>
              {destinations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Duration</label>
            <select
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              className="mt-2 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3"
            >
              <option value="all">Any duration</option>
              <option value="short">1 - 3 days</option>
              <option value="medium">4 - 7 days</option>
              <option value="long">8+ days</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Package Class</label>
            <select
              value={packageClass}
              onChange={(event) => setPackageClass(event.target.value)}
              className="mt-2 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3"
            >
              <option value="all">All Packages</option>
              <option value="ADVENTURE_TRAILS">Adventure Trails</option>
              <option value="EXPLORER_SAFARIS">Explorer Safaris</option>
              <option value="SIGNATURE_ELITE_SAFARIS">Signature Elite Safaris</option>
            </select>
          </div>
        </div>
      </aside>

      <div>
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <p className="text-charcoal/70">
            {filteredTours.length} tours found
          </p>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-xl border border-charcoal/15 bg-white px-4 py-3"
          >
            <option value="recommended">Sort by Recommended</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="duration">Duration</option>
          </select>
        </div>

        {filteredTours.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="rounded-premium bg-white p-10 text-center shadow-sm">
            <h3 className="font-heading text-3xl font-semibold">
              No Tours Found
            </h3>

            <p className="mt-3 text-charcoal/70">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}