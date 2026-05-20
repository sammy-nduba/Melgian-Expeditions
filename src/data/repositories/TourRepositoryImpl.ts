import { TourPackage } from "@/domain/entities/TourPackage";
import { TourRepository } from "@/domain/repositories/TourRepository";
import { ToursAPIService } from "../services/ToursApiService";

export class TourRepositoryImpl implements TourRepository {
  constructor(private service: ToursAPIService) {}

  getFeaturedTours(region?: string): Promise<TourPackage[]> {
    return this.service.getFeaturedTours(region);
  }

  getAllTours(region?: string): Promise<TourPackage[]> {
    return this.service.getAllTours(region);
  }

  getTourBySlug(slug: string): Promise<TourPackage | null> {
    return this.service.getTourBySlug(slug);
  }

  searchTours(query: string, region?: string): Promise<TourPackage[]> {
    return this.service.searchTours(query, region);
  }
}