import { BlogPost } from "@/domain/entities/BlogPost";
import { apiClient } from "@/core/api/apiClient";

export class BlogAPIService {
  async getAllPosts(): Promise<BlogPost[]> {
    const res = await apiClient<{ posts: BlogPost[] }>("/blog");
    return res.posts || [];
  }

  async getLatestPosts(limit = 3): Promise<BlogPost[]> {
    const res = await apiClient<{ posts: BlogPost[] }>(`/blog?limit=${limit}&featured=true`);
    return res.posts || [];
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      return await apiClient<BlogPost>(`/blog/${slug}`);
    } catch {
      return null;
    }
  }
}