import { Destination } from "@/domain/entities/Destination";
import { apiClient } from "@/core/api/apiClient";

function mapBackendDestinationToDestination(dest: any): Destination {
  return {
    id: dest.id,
    slug: dest.slug,
    name: dest.name,
    country: dest.country,
    description: dest.description,
    longDescription: dest.longDescription || undefined,
    coverImage: dest.coverImage,
    gallery: dest.gallery || [],
    bestSeason: dest.bestSeason,
    climate: dest.climate || undefined,
    highlights: dest.highlights || [],
    relatedTourSlugs: [], // The backend does not store this mapping directly; default to empty
  };
}

export class DestinationAPIService {
  async getAllDestinations(): Promise<Destination[]> {
    try {
      const data = await apiClient<any[]>("/destinations");
      return (data || []).map(mapBackendDestinationToDestination);
    } catch (error) {
      console.error("Failed to fetch all destinations from backend:", error);
      return [];
    }
  }

  async getPopularDestinations(): Promise<Destination[]> {
    try {
      const data = await apiClient<any[]>("/destinations?popular=true");
      return (data || []).map(mapBackendDestinationToDestination);
    } catch (error) {
      console.error("Failed to fetch popular destinations from backend:", error);
      return [];
    }
  }

  async getDestinationBySlug(slug: string): Promise<Destination | null> {
    try {
      const destination = await apiClient<any>(`/destinations/${slug}`);
      return destination ? mapBackendDestinationToDestination(destination) : null;
    } catch (error) {
      console.error(`Failed to fetch destination by slug: ${slug} from backend:`, error);
      return null;
    }
  }
}