export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  description: string;
  longDescription?: string;
  coverImage: string;
  gallery: string[];
  bestSeason: string;
  climate?: string;
  highlights: string[];
  relatedTourSlugs: string[];
}