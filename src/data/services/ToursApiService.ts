import { TourPackage } from "@/domain/entities/TourPackage";
import { apiClient } from "@/core/api/apiClient";

function mapBackendTourToTourPackage(tour: any): TourPackage {
  return {
    id: tour.id,
    slug: tour.slug,
    title: tour.title,
    subtitle: tour.subtitle || undefined,
    description: tour.description,
    destination: tour.destinationName,
    durationDays: tour.durationDays,
    priceFrom: typeof tour.priceFrom === "string" ? parseFloat(tour.priceFrom) : Number(tour.priceFrom),
    currency: tour.currency,
    coverImage: tour.coverImage,
    gallery: tour.gallery || [],
    rating: typeof tour.rating === "string" ? parseFloat(tour.rating) : Number(tour.rating),
    reviewCount: tour.reviewCount,
    groupSize: {
      min: tour.minGroupSize,
      max: tour.maxGroupSize,
    },
    difficulty: tour.difficulty.toLowerCase() as any,
    packageClass: tour.packageClass,
    availability: tour.availability.toLowerCase() as any,
    highlights: tour.highlights || [],
    included: tour.included || [],
    excluded: tour.excluded || [],
    itinerary: (tour.itinerary || []).map((day: any) => ({
      day: day.day,
      title: day.title,
      description: day.description,
    })),
  };
}

export class ToursAPIService {
  async getFeaturedTours(region?: string): Promise<TourPackage[]> {
    try {
      const qs = region ? `&region=${region}` : "";
      const data = await apiClient<any[]>(`/tours?featured=true${qs}`);
      return (data || []).map(mapBackendTourToTourPackage);
    } catch (error) {
      console.error("Failed to fetch featured tours:", error);
      return [];
    }
  }

  async getAllTours(region?: string): Promise<TourPackage[]> {
    try {
      const qs = region ? `?region=${region}` : "";
      const data = await apiClient<any[]>(`/tours${qs}`);
      return (data || []).map(mapBackendTourToTourPackage);
    } catch (error) {
      console.error("Failed to fetch all tours:", error);
      return [];
    }
  }

  async getTourBySlug(slug: string): Promise<TourPackage | null> {
    try {
      const tour = await apiClient<any>(`/tours/${slug}`);
      return tour ? mapBackendTourToTourPackage(tour) : null;
    } catch (error) {
      console.error(`Failed to fetch tour by slug: ${slug}`, error);
      return null;
    }
  }

  async searchTours(query: string, region?: string): Promise<TourPackage[]> {
    try {
      const qs = region ? `&region=${region}` : "";
      const data = await apiClient<any[]>(`/tours?q=${encodeURIComponent(query)}${qs}`);
      return (data || []).map(mapBackendTourToTourPackage);
    } catch (error) {
      console.error(`Failed to search tours with query: ${query}`, error);
      return [];
    }
  }
}