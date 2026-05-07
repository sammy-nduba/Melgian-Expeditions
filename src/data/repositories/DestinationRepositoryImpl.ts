import { Destination } from "@/domain/entities/Destination";
import { DestinationRepository } from "@/domain/repositories/DestinationRepository";
import { DestinationAPIService } from "../services/DestinationAPIService";

export class DestinationRepositoryImpl implements DestinationRepository {
  constructor(private service: DestinationAPIService) {}

  getAllDestinations(): Promise<Destination[]> {
    return this.service.getAllDestinations();
  }

  getPopularDestinations(): Promise<Destination[]> {
    return this.service.getPopularDestinations();
  }

  getDestinationBySlug(slug: string): Promise<Destination | null> {
    return this.service.getDestinationBySlug(slug);
  }
}