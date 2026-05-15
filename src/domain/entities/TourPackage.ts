export type TourDifficulty = "easy" | "moderate" | "adventurous";
export type TourAvailability = "available" | "limited" | "sold_out";
export type TourPackageClass = "ADVENTURE_TRAILS" | "EXPLORER_SAFARIS" | "SIGNATURE_ELITE_SAFARIS";

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  destination: string;
  durationDays: number;
  priceFrom: number;
  currency: string;
  coverImage: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  groupSize: {
    min: number;
    max: number;
  };
  difficulty: TourDifficulty;
  packageClass: TourPackageClass;
  availability: TourAvailability;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
}