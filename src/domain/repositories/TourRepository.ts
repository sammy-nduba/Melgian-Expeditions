import { TourPackage } from "../entities/TourPackage";

export interface TourRepository {
  getFeaturedTours(region?: string): Promise<TourPackage[]>;
  getAllTours(region?: string): Promise<TourPackage[]>;
  getTourBySlug(slug: string): Promise<TourPackage | null>;
  searchTours(query: string, region?: string): Promise<TourPackage[]>;
}