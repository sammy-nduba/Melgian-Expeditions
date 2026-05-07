import { TourPackage } from "@/domain/entities/TourPackage";

const tours: TourPackage[] = [
  {
    id: "1",
    slug: "serengeti-luxury-safari",
    title: "Serengeti Luxury Safari",
    subtitle: "A premium wildlife journey through Tanzania",
    description:
      "Experience the Serengeti with expert guides, luxury lodges, and unforgettable wildlife encounters.",
    destination: "Tanzania",
    durationDays: 7,
    priceFrom: 4200,
    currency: "USD",
    coverImage: "/images/tours/serengeti.jpg",
    gallery: [],
    rating: 4.9,
    reviewCount: 128,
    groupSize: {
      min: 2,
      max: 12,
    },
    difficulty: "easy",
    availability: "available",
    highlights: [
      "Luxury lodge accommodation",
      "Big Five wildlife viewing",
      "Private safari vehicle",
      "Expert local guides",
    ],
    included: [
      "Accommodation",
      "Meals",
      "Airport transfers",
      "Park fees",
      "Professional guide",
    ],
    excluded: ["International flights", "Travel insurance", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description: "Meet your guide and settle into your premium lodge.",
      },
      {
        day: 2,
        title: "Transfer to Serengeti",
        description: "Begin your safari adventure across the plains.",
      },
    ],
  },
];

export class ToursAPIService {
  async getFeaturedTours(): Promise<TourPackage[]> {
    return tours.slice(0, 3);
  }

  async getAllTours(): Promise<TourPackage[]> {
    return tours;
  }

  async getTourBySlug(slug: string): Promise<TourPackage | null> {
    return tours.find((tour) => tour.slug === slug) ?? null;
  }

  async searchTours(query: string): Promise<TourPackage[]> {
    const normalizedQuery = query.toLowerCase();

    return tours.filter(
      (tour) =>
        tour.title.toLowerCase().includes(normalizedQuery) ||
        tour.destination.toLowerCase().includes(normalizedQuery)
    );
  }
}