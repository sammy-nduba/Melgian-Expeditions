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
    packageClass: "SIGNATURE_ELITE_SAFARIS",
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
  {
    id: "2",
    slug: "maasai-mara-explorer",
    title: "Maasai Mara Explorer",
    subtitle: "Discover the heart of Kenya's wildlife",
    description:
      "A classic safari experience offering great value and incredible animal sightings in the Maasai Mara.",
    destination: "Kenya",
    durationDays: 5,
    priceFrom: 2100,
    currency: "USD",
    coverImage: "/images/hero/safari-hero.jpg",
    gallery: [],
    rating: 4.7,
    reviewCount: 95,
    groupSize: {
      min: 4,
      max: 14,
    },
    difficulty: "moderate",
    packageClass: "EXPLORER_SAFARIS",
    availability: "limited",
    highlights: [
      "Comfortable tented camps",
      "Wildebeest migration viewing (seasonal)",
      "Cultural Maasai village visit",
    ],
    included: [
      "Accommodation",
      "Meals",
      "Transport",
      "Park fees",
    ],
    excluded: ["International flights", "Travel insurance"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Nairobi",
        description: "Welcome to Kenya and transfer to your hotel.",
      },
      {
        day: 2,
        title: "To the Mara",
        description: "Drive to the Maasai Mara and enjoy an afternoon game drive.",
      },
    ],
  },
  {
    id: "3",
    slug: "kilimanjaro-adventure-trail",
    title: "Kilimanjaro Adventure Trail",
    subtitle: "Trek to the roof of Africa",
    description:
      "A thrilling and challenging climb up Mount Kilimanjaro via the scenic Machame route.",
    destination: "Tanzania",
    durationDays: 8,
    priceFrom: 3500,
    currency: "USD",
    coverImage: "/images/tours/serengeti.jpg",
    gallery: [],
    rating: 4.8,
    reviewCount: 210,
    groupSize: {
      min: 6,
      max: 15,
    },
    difficulty: "adventurous",
    packageClass: "ADVENTURE_TRAILS",
    availability: "available",
    highlights: [
      "Summit Mount Kilimanjaro",
      "Scenic Machame route",
      "Expert mountain guides and porters",
    ],
    included: [
      "Camping accommodation",
      "All meals on the mountain",
      "Park fees and rescue fees",
      "Guides and porters",
    ],
    excluded: ["International flights", "Climbing gear rental", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Moshi",
        description: "Pre-climb briefing and equipment check.",
      },
      {
        day: 2,
        title: "Machame Gate to Machame Camp",
        description: "Begin the trek through the rainforest.",
      },
    ],
  }
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