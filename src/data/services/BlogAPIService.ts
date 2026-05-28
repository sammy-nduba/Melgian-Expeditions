import { BlogPost } from "@/domain/entities/BlogPost";
import { apiClient } from "@/core/api/apiClient";

export class BlogAPIService {
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const res = await apiClient<{ posts: BlogPost[] }>("/blog");
      return res.posts || [];
    } catch (error) {
      console.error("Failed to fetch all posts from backend:", error);
      return [];
    }
  }

  async getLatestPosts(limit = 3): Promise<BlogPost[]> {
    try {
      const res = await apiClient<{ posts: BlogPost[] }>(`/blog?limit=${limit}&featured=true`);
      return res.posts || [];
    } catch (error) {
      console.error("Failed to fetch latest posts from backend:", error);
      return [];
    }
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      return await apiClient<BlogPost>(`/blog/${slug}`);
    } catch (error) {
      console.error(`Failed to fetch post by slug: ${slug} from backend:`, error);
      return null;
    }
  }
}