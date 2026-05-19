import { TourPackageClass } from "@/domain/entities/TourPackage";

export interface CategoryData {
  id: TourPackageClass;
  title: string;
  subtitle: string;
  description: string;
  priceFrom: number;
  currency: string;
  image: string;
  highlights: string[];
  icon: "mountain" | "compass" | "crown";
  colorClass: string;
}

export const CATEGORIES_DATA: CategoryData[] = [
  {
    id: "ADVENTURE_TRAILS",
    title: "Adventure Trails",
    subtitle: "Active Treks & Epic Climbs",
    description: "Designed for active travelers who crave rugged paths, epic treks, and immersive outdoor challenges, including climbing Mount Kilimanjaro and hiking through wild scenic trails.",
    priceFrom: 3500,
    currency: "USD",
    image: "/images/destinations/kruger.jpg",
    highlights: [
      "High altitude trekking & climbs",
      "Camping in premium wilderness spots",
      "Expert mountain guides & support crews",
      "Rigorous, high-reward itineraries"
    ],
    icon: "mountain",
    colorClass: "from-emerald-950/80 to-emerald-900/90 hover:border-emerald-500/50",
  },
  {
    id: "EXPLORER_SAFARIS",
    title: "Explorer Safaris",
    subtitle: "Classic Wildlife Journeys",
    description: "Perfect for classic safari enthusiasts seeking spectacular wildlife views, iconic parks, and comfortable mid-range luxury tented camps in the Maasai Mara and beyond.",
    priceFrom: 2100,
    currency: "USD",
    image: "/images/hero/safari-hero.jpg",
    highlights: [
      "Epic wildlife game drives",
      "Scenic national park explorations",
      "Comfortable classic tented camps",
      "Ideal for families & photography"
    ],
    icon: "compass",
    colorClass: "from-amber-950/80 to-amber-900/90 hover:border-savannah/50",
  },
  {
    id: "SIGNATURE_ELITE_SAFARIS",
    title: "Signature Elite",
    subtitle: "The Ultimate Ultra-Luxury",
    description: "The absolute pinnacle of luxury. Indulge in ultra-exclusive lodges, private charter flights, gourmet dining, and bespoke private game drives crafted for the most discerning travelers.",
    priceFrom: 4200,
    currency: "USD",
    image: "/images/tours/serengeti.jpg",
    highlights: [
      "Ultra-exclusive 5-star luxury lodges",
      "Private charter flights & transfers",
      "Bespoke private safari vehicles & guides",
      "Fine dining & premium wellness options"
    ],
    icon: "crown",
    colorClass: "from-stone-950/80 to-stone-900/90 hover:border-savannah/70",
  },
];
