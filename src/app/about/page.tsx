import Image from "next/image";
import { Metadata } from "next";
import { CheckCircle } from "lucide-react";
import { CTAButton } from "@/presentation/components/common/CTAButton";

export const metadata: Metadata = {
  title: "About Melgian Expeditions",
  description:
    "Learn about Melgian Expeditions, our expert guides, values, and commitment to premium African travel experiences.",
};

const values = [
  "Authentic safari expertise",
  "Premium hospitality standards",
  "Responsible tourism values",
  "Personalized itinerary design",
];

export default function AboutPage() {
  return (
    <main>
      <section className="relative min-h-[60vh] overflow-hidden">
        <Image
          src="/images/about/about-safari.jpg"
          alt="Safari guide overlooking wildlife plains"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/50 to-transparent" />

        <div className="container-premium relative z-10 flex min-h-[60vh] items-end pb-16 text-ivory">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-savannah">
              About Us
            </p>

            <h1 className="mt-4 font-heading text-5xl font-bold md:text-7xl">
              Luxury Safari Planning With Purpose
            </h1>

            <p className="mt-5 text-lg leading-8 text-ivory/80">
              We design premium safari journeys that combine comfort,
              authenticity, safety, and unforgettable wildlife encounters.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bronze">
              Our Story
            </p>

            <h2 className="mt-3 font-heading text-4xl font-bold md:text-5xl">
              Crafted for Travelers Who Expect More
            </h2>

            <p className="mt-6 text-lg leading-8 text-charcoal/75">
              Melgian Expeditions was created for travelers seeking immersive wildlife
              journeys without compromising comfort, service, or trust. Every
              itinerary is thoughtfully designed with expert guides, exceptional
              lodges, and seamless support from inquiry to return.
            </p>

            <div className="mt-8 grid gap-4">
              {values.map((value) => (
                <div key={value} className="flex gap-3">
                  <CheckCircle className="mt-1 text-forest" size={20} />
                  <p className="text-charcoal/75">{value}</p>
                </div>
              ))}
            </div>

            <CTAButton href="/booking" className="mt-8">
              Plan Your Safari
            </CTAButton>
          </div>

          <div className="relative h-[520px] overflow-hidden rounded-premium shadow-premium">
            <Image
              src="/images/about/luxury-lodge.jpg"
              alt="Luxury safari lodge"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-forest py-20 text-ivory">
        <div className="container-premium grid gap-8 md:grid-cols-4">
          {[
            ["15+", "Years Experience"],
            ["40+", "Safari Partners"],
            ["2,500+", "Happy Travelers"],
            ["98%", "Guest Satisfaction"],
          ].map(([number, label]) => (
            <div key={label}>
              <p className="font-heading text-5xl font-bold text-savannah">
                {number}
              </p>
              <p className="mt-2 text-ivory/70">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}