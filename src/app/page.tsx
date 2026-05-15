import { TourCard } from "@/presentation/components/tours/TourCard";
import { CTAButton } from "@/presentation/components/common/CTAButton";
import { DestinationCard } from "@/presentation/components/destinations/DestinationCard";
import { TestimonialCard } from "@/presentation/components/common/TestimonialCard";
import { BlogCard } from "@/presentation/components/blog/BlogCard";
import { SectionHeader } from "@/presentation/components/common/SectionHeader";
import { BookingForm } from "@/presentation/components/booking/BookingForm";
import { TourRepositoryImpl } from "@/data/repositories/TourRepositoryImpl";
import { ToursAPIService } from "@/data/services/ToursApiService";
import { DestinationAPIService } from "@/data/services/DestinationAPIService";
import { TestimonialsAPIService } from "@/data/services/TestimonialsAPIService";
import { BlogAPIService } from "@/data/services/BlogAPIService";
import Image from "next/image";

export default async function HomePage() {
  const tourRepository = new TourRepositoryImpl(new ToursAPIService());
  const featuredTours = await tourRepository.getFeaturedTours();

  const destinationsService = new DestinationAPIService();
  const featuredDestinations = await destinationsService.getPopularDestinations();

  const testimonialsService = new TestimonialsAPIService();
  const featuredTestimonials = await testimonialsService.getFeaturedTestimonials();

  const blogService = new BlogAPIService();
  const featuredPosts = await blogService.getLatestPosts();

  return (
    <>
      <section className="relative min-h-[calc(90vh-80px)] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/safari-hero.jpg"
            alt="Luxury safari landscape"
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />

        <div className="container-premium relative z-10 flex min-h-[calc(90vh-80px)] items-center">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center w-full">
            <div className="max-w-3xl text-ivory">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-savannah">
                Explore Beyond. Experience More.
              </p>

              <h1 className="font-heading text-5xl font-bold leading-tight md:text-7xl">
                Discover Africa’s Wild Beauty in Kenya
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/80">
                Bespoke safari journeys, handpicked lodges, expert guides, and
                unforgettable wildlife encounters crafted for discerning travelers.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <CTAButton href="/tours">Explore Tours</CTAButton>
                <CTAButton href="/booking" variant="secondary">
                  Plan Your Journey
                </CTAButton>
              </div>
            </div>

            <div className="lg:justify-self-end lg:pr-8">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-premium">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bronze">
                Curated Adventures
              </p>
              <h2 className="mt-3 font-heading text-4xl font-bold text-charcoal md:text-5xl">
                Featured Safari Tours
              </h2>
            </div>

            <CTAButton href="/tours" variant="outline">
              View All Tours
            </CTAButton>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-forest text-ivory">
        <div className="container-premium grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-savannah">
              Wildlife Conservation
            </p>

            <h2 className="mt-3 font-heading text-4xl font-bold md:text-5xl">
              Protecting Africa&apos;s Natural Heritage
            </h2>

            <p className="mt-6 text-lg leading-8 text-ivory/80">
              We believe in giving back to the wild. A portion of every safari booked with us goes directly to local conservation initiatives. You can also join us in protecting endangered species and supporting local communities by making a direct contribution.
            </p>

            <div className="mt-8">
              <CTAButton href="/donate" variant="secondary">
                Make a Contribution
              </CTAButton>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { title: "Anti-Poaching", desc: "Funding local ranger patrols and essential field equipment." },
              { title: "Habitat Rescue", desc: "Restoring and protecting critical wildlife ecosystems." },
              { title: "Community Ed.", desc: "Empowering locals through dedicated education programs." },
              { title: "Wildlife Rehab", desc: "Supporting the rescue and care of injured animals." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-ivory/15 bg-ivory/10 p-6 transition-colors hover:bg-ivory/20"
              >
                <h3 className="font-heading text-xl font-semibold text-savannah">{item.title}</h3>
                <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-premium">
          <SectionHeader
            subtitle="Explore Destinations"
            title="Iconic Safari Locations"
            description="Discover the most breathtaking wildlife destinations across Africa, each offering unique experiences and unforgettable encounters."
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <CTAButton href="/destinations" variant="outline">
              View All Destinations
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal text-ivory">
        <div className="container-premium">
          <SectionHeader
            subtitle="Guest Experiences"
            title="What Our Travelers Say"
            description="Real stories from discerning travelers who have experienced the luxury and authenticity of our safari journeys."
            centered
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-premium">
          <SectionHeader
            subtitle="Latest Insights"
            title="Safari Travel Blog"
            description="Expert guides, travel tips, and conservation stories from our team of safari specialists and wildlife experts."
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <CTAButton href="/blog" variant="outline">
              Read More Articles
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="section-padding bg-savannah">
        <div className="container-premium text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-4xl font-bold text-charcoal md:text-5xl">
              Ready to Begin Your Safari Adventure?
            </h2>

            <p className="mt-6 text-lg text-charcoal/80">
              Let our expert team craft your perfect African safari experience.
              From luxury lodges to private guided tours, we handle every detail.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <CTAButton href="/booking">Start Planning</CTAButton>
              <CTAButton href="/contact" variant="outline">
                Get in Touch
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}