import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { Testimonial } from "@/domain/entities/Testimonial";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="rounded-premium bg-white p-6 shadow-premium">
      <Quote size={32} className="mb-4 text-savannah" />

      <blockquote className="mb-6 text-lg text-charcoal/80 leading-relaxed">
        "{testimonial.comment}"
      </blockquote>

      <div className="flex items-center gap-4">
        {testimonial.avatar && (
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        )}

        <div>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < testimonial.rating
                    ? "fill-savannah text-savannah"
                    : "text-charcoal/20"
                }`}
              />
            ))}
          </div>

          <p className="font-semibold text-charcoal">{testimonial.name}</p>
          <p className="text-sm text-charcoal/70">{testimonial.location}</p>
          <p className="text-xs text-forest">{testimonial.tourName}</p>
        </div>
      </div>
    </div>
  );
}