import { BlogPost } from "../entities/BlogPost";

export interface BlogRepository {
  getAllPosts(): Promise<BlogPost[]>;
  getLatestPosts(limit?: number): Promise<BlogPost[]>;
  getPostBySlug(slug: string): Promise<BlogPost | null>;
}