import { BlogPost } from "@/domain/entities/BlogPost";
import { BlogRepository } from "@/domain/repositories/BlogRepository";
import { BlogAPIService } from "../services/BlogAPIService";

export class BlogRepositoryImpl implements BlogRepository {
  constructor(private service: BlogAPIService) {}

  getAllPosts(): Promise<BlogPost[]> {
    return this.service.getAllPosts();
  }

  getLatestPosts(limit?: number): Promise<BlogPost[]> {
    return this.service.getLatestPosts(limit);
  }

  getPostBySlug(slug: string): Promise<BlogPost | null> {
    return this.service.getPostBySlug(slug);
  }
}