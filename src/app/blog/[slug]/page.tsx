import { notFound } from "next/navigation";
import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";
import { Metadata } from "next";
import { BlogAPIService } from "@/data/services/BlogAPIService";
import { BlogRepositoryImpl } from "@/data/repositories/BlogRepositoryImpl";
import { CTAButton } from "@/presentation/components/common/CTAButton";

type BlogDetailPageProps = {
  params: {
    slug: string;
  };
};

const blogRepository = new BlogRepositoryImpl(new BlogAPIService());

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const post = await blogRepository.getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: "article",
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = await blogRepository.getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <article>
        <section className="relative min-h-[60vh] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />

          <div className="container-premium relative z-10 flex min-h-[60vh] items-end pb-16 text-ivory">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-savannah">
                {post.category}
              </p>

              <h1 className="mt-4 font-heading text-5xl font-bold leading-tight md:text-6xl">
                {post.title}
              </h1>

              <div className="mt-6 flex flex-wrap gap-5 text-sm text-ivory/75">
                <span>{post.author}</span>

                <span className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>

                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {post.readingTimeMinutes} min read
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-premium grid gap-12 lg:grid-cols-[1fr_340px]">
            <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-charcoal prose-p:text-charcoal/75">
              <p>{post.content}</p>

              <h2>Planning Your Safari Experience</h2>

              <p>
                A successful luxury safari combines timing, destination
                knowledge, expert guiding, and carefully chosen accommodation.
                Travelers should consider wildlife movement, seasonal climate,
                preferred comfort level, and photographic goals before choosing
                their itinerary.
              </p>

              <h2>Final Recommendation</h2>

              <p>
                Work with experienced safari planners who understand both the
                destination and your personal travel style. This ensures a
                smoother, safer, and more meaningful journey.
              </p>
            </div>

            <aside className="h-fit rounded-premium bg-white p-6 shadow-premium lg:sticky lg:top-28">
              <h2 className="font-heading text-3xl font-semibold">
                Ready to Plan?
              </h2>

              <p className="mt-4 text-sm leading-6 text-charcoal/70">
                Speak with our safari specialists and turn your travel ideas
                into a custom luxury itinerary.
              </p>

              <CTAButton href="/booking" className="mt-6 w-full">
                Start Planning
              </CTAButton>
            </aside>
          </div>
        </section>
      </article>
    </main>
  );
}