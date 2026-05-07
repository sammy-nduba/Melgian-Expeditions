import { TourPackage } from "../entities/TourPackage";

export interface TourRepository {
  getFeaturedTours(): Promise<TourPackage[]>;
  getAllTours(): Promise<TourPackage[]>;
  getTourBySlug(slug: string): Promise<TourPackage | null>;
  searchTours(query: string): Promise<TourPackage[]>;
}