import { TourRepository } from "../repositories/TourRepository";

export class SearchTours {
  constructor(private tourRepository: TourRepository) {}

  async execute(query: string) {
    if (!query.trim()) {
      return this.tourRepository.getAllTours();
    }

    return this.tourRepository.searchTours(query);
  }
}