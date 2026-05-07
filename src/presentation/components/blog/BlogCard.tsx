import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { BlogPost } from "@/domain/entities/BlogPost";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="premium-card group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-bronze">
          {post.category}
        </p>

        <h3 className="mt-3 font-heading text-2xl font-semibold text-charcoal">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-charcoal/70">
          {post.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap gap-4 text-xs text-charcoal/50">
          <span className="flex items-center gap-1">
            <CalendarDays size={14} />
            {new Date(post.publishedAt).toLocaleDateString()}
          </span>

          <span className="flex items-center gap-1">
            <Clock size={14} />
            {post.readingTimeMinutes} min read
          </span>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex text-sm font-semibold text-forest"
        >
          Read Article →
        </Link>
      </div>
    </article>
  );
}