import { Metadata } from "next";
import { BlogAPIService } from "@/data/services/BlogAPIService";
import { BlogRepositoryImpl } from "@/data/repositories/BlogRepositoryImpl";
import { BlogCard } from "@/presentation/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Safari Travel Blog",
  description:
    "Luxury safari travel guides, destination insights, packing tips, and expert planning advice.",
};

export default async function BlogPage() {
  const blogRepository = new BlogRepositoryImpl(new BlogAPIService());
  const posts = await blogRepository.getAllPosts();

  return (
    <main>
      <section className="bg-forest py-20 text-ivory">
        <div className="container-premium">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-savannah">
            Travel Guides
          </p>

          <h1 className="mt-4 font-heading text-5xl font-bold">
            Safari Travel Blog
          </h1>

          <p className="mt-5 max-w-2xl text-ivory/75">
            Expert insights, seasonal guides, and luxury safari planning advice.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}