export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string | null;
  readingTimeMinutes: number;
  seoTitle?: string;
  seoDescription?: string;
  isFeatured: boolean;
  tags: string[];
}