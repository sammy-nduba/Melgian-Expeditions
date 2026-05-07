import { BlogPost } from "@/domain/entities/BlogPost";

const posts: BlogPost[] = [
  {
    id: "1",
    slug: "best-time-for-serengeti-safari",
    title: "Best Time to Visit the Serengeti for a Luxury Safari",
    excerpt:
      "A seasonal guide to planning an unforgettable Serengeti safari experience.",
    content:
      "The Serengeti offers exceptional safari experiences year-round, but the best time depends on your travel goals, wildlife interests, and preferred level of exclusivity.",
    coverImage: "/images/blog/serengeti-season.jpg",
    category: "Safari Planning",
    author: "Melgian Expeditions Team",
    publishedAt: "2026-01-10",
    readingTimeMinutes: 5,
    seoTitle: "Best Time to Visit the Serengeti",
    seoDescription:
      "Learn when to visit the Serengeti for migration, big cats, photography, and luxury safari experiences.",
  },
  {
    id: "2",
    slug: "what-to-pack-for-luxury-safari",
    title: "What to Pack for a Luxury Safari",
    excerpt:
      "A practical yet refined packing guide for premium safari travelers.",
    content:
      "Packing for safari requires a balance of comfort, elegance, practicality, and respect for the natural environment.",
    coverImage: "/images/blog/safari-packing.jpg",
    category: "Travel Tips",
    author: "Melgian Expeditions Team",
    publishedAt: "2026-02-05",
    readingTimeMinutes: 6,
  },
];

export class BlogAPIService {
  async getAllPosts(): Promise<BlogPost[]> {
    return posts;
  }

  async getLatestPosts(limit = 3): Promise<BlogPost[]> {
    return posts.slice(0, limit);
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    return posts.find((post) => post.slug === slug) ?? null;
  }
}