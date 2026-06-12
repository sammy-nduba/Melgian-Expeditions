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
  perfectFor?: string;
}

export const CATEGORIES_DATA: CategoryData[] = [
  {
    id: "ADVENTURE_TRAILS",
    title: "Adventure Trails",
    subtitle: "Adventure Within Reach.",
    description: "Adventure Trails is designed for travelers who seek authentic experiences, breathtaking landscapes, and unforgettable wildlife encounters without stretching their budget. Whether you're tracking wildlife across iconic national parks, exploring vibrant local cultures, or discovering hidden natural wonders, Adventure Trails proves that great adventures don't have to come with a premium price tag.",
    priceFrom: 3500,
    currency: "USD",
    image: "/images/destinations/kruger.jpg",
    highlights: [
      "Budget-friendly accommodation options",
      "Professional local guides",
      "Comfortable and reliable transportation",
      "Excellent value for money",
      "Ideal for adventure seekers and first-time explorers"
    ],
    icon: "mountain",
    colorClass: "from-emerald-950/80 to-emerald-900/90 hover:border-emerald-500/50",
    perfectFor: "Budget-conscious travelers, backpackers, students, solo adventurers, and small groups seeking authentic African experiences.",
  },
  {
    id: "EXPLORER_SAFARIS",
    title: "Explorer Safaris",
    subtitle: "Comfort Meets Discovery.",
    description: "Explorer Safaris is our most popular travel class, offering the ideal blend of adventure, comfort, and exceptional service. Designed for travelers who want more personalized experiences and enhanced comfort, this category provides carefully selected accommodations, expertly planned itineraries, and immersive safari adventures and beach experiences. From witnessing spectacular wildlife encounters and magnificent beach experiences to enjoying comfortable lodges and scenic destinations, Explorer Safaris delivers a richer and more refined travel experience while maintaining excellent value.",
    priceFrom: 2100,
    currency: "USD",
    image: "/images/tours/1779558993631-beach.jpg",
    highlights: [
      "Quality hotels, lodges and camps",
      "Carefully crafted itineraries",
      "Flexible tour options",
      "Excellent balance between comfort and affordability"
    ],
    icon: "compass",
    colorClass: "from-amber-950/80 to-amber-900/90 hover:border-savannah/50",
    perfectFor: "Couples, families, groups, and travelers seeking a comfortable safari experience with outstanding value.",
  },
  {
    id: "SIGNATURE_ELITE_SAFARIS",
    title: "Signature Elite",
    subtitle: "Luxury Beyond Expectations.",
    description: "Signature Elite represents the pinnacle of luxury travel at Melgian Expeditions. Designed for discerning travelers who expect exceptional service, exclusivity, and unforgettable experiences, this premium class combines world-class accommodations, personalized itineraries, and extraordinary access to Africa's most spectacular destinations. Every detail is meticulously arranged to ensure a seamless and luxurious journey. From private transfers and exclusive safari experiences to elegant lodges and personalized attention throughout your adventure. Signature Elite is more than a safari; it is a bespoke African experience tailored to your lifestyle and preferences.",
    priceFrom: 4200,
    currency: "USD",
    image: "/images/tours/serengeti.jpg",
    highlights: [
      "Luxury lodges, tented camps, and premium resorts",
      "Private safari vehicles and dedicated guides",
      "Personalized and fully customizable itineraries",
      "Enhanced privacy and flexibility"
    ],
    icon: "crown",
    colorClass: "from-stone-950/80 to-stone-900/90 hover:border-savannah/70",
    perfectFor: "Luxury travelers, honeymooners, executives, families seeking exclusivity, and guests looking for the finest African safari experience.",
  },
];
