import { TourPackage } from "@/domain/entities/TourPackage";
import { TourRepository } from "@/domain/repositories/TourRepository";
import { ToursAPIService } from "../services/ToursApiService";

export class TourRepositoryImpl implements TourRepository {
  constructor(private service: ToursAPIService) {}

  getFeaturedTours(): Promise<TourPackage[]> {
    return this.service.getFeaturedTours();
  }

  getAllTours(): Promise<TourPackage[]> {
    return this.service.getAllTours();
  }

  getTourBySlug(slug: string): Promise<TourPackage | null> {
    return this.service.getTourBySlug(slug);
  }

  searchTours(query: string): Promise<TourPackage[]> {
    return this.service.searchTours(query);
  }
}