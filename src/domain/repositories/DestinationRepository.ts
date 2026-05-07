import { Destination } from "../entities/Destination";

export interface DestinationRepository {
  getAllDestinations(): Promise<Destination[]>;
  getPopularDestinations(): Promise<Destination[]>;
  getDestinationBySlug(slug: string): Promise<Destination | null>;
}