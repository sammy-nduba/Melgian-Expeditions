import { Destination } from "@/domain/entities/Destination";

const destinations: Destination[] = [
  {
    id: "1",
    slug: "serengeti-national-park",
    name: "Serengeti National Park",
    country: "Tanzania",
    description:
      "A legendary safari destination known for endless plains, big cats, and the Great Migration.",
    longDescription:
      "The Serengeti is one of Africa’s most iconic wildlife regions, offering exceptional year-round safari experiences, luxury camps, and breathtaking landscapes.",
    coverImage: "/images/destinations/serengeti.jpg",
    gallery: [],
    bestSeason: "June to October",
    climate: "Warm days, cooler evenings, seasonal rains",
    highlights: [
      "Great Migration",
      "Big cat sightings",
      "Luxury tented camps",
      "Expansive savannah landscapes",
    ],
    relatedTourSlugs: ["serengeti-luxury-safari"],
  },
  {
    id: "2",
    slug: "masai-mara",
    name: "Masai Mara",
    country: "Kenya",
    description:
      "Kenya’s premier wildlife reserve, famous for dramatic predator sightings and open plains.",
    longDescription:
      "The Masai Mara delivers one of the richest wildlife-viewing experiences in Africa, with luxury lodges, Maasai culture, and exceptional photographic opportunities.",
    coverImage: "/images/destinations/masai-mara.jpg",
    gallery: [],
    bestSeason: "July to October",
    climate: "Mild temperatures with seasonal rains",
    highlights: [
      "The Great Migration crossings",
      "Excellent predator viewing",
      "Maasai cultural experiences",
      "Luxury safari lodges",
    ],
    relatedTourSlugs: [],
  },
  {
    id: "3",
    slug: "okavango-delta",
    name: "Okavango Delta",
    country: "Botswana",
    description:
      "A pristine wetland wilderness offering water-based safaris and secluded luxury camps.",
    longDescription:
      "The Okavango Delta is ideal for travelers seeking exclusivity, untouched nature, mokoro excursions, and high-end safari camps.",
    coverImage: "/images/destinations/okavango-delta.jpg",
    gallery: [],
    bestSeason: "May to September",
    climate: "Dry winter months with excellent wildlife viewing",
    highlights: [
      "Mokoro canoe safaris",
      "Remote luxury camps",
      "Birdwatching",
      "Elephants and wetlands",
    ],
    relatedTourSlugs: [],
  },
];

export class DestinationAPIService {
  async getAllDestinations(): Promise<Destination[]> {
    return destinations;
  }

  async getPopularDestinations(): Promise<Destination[]> {
    return destinations.slice(0, 3);
  }

  async getDestinationBySlug(slug: string): Promise<Destination | null> {
    return destinations.find((destination) => destination.slug === slug) ?? null;
  }
}