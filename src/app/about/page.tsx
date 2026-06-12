import Image from "next/image";
import { Metadata } from "next";
import { Map, Compass, Users, Star, Leaf } from "lucide-react";
import { CTAButton } from "@/presentation/components/common/CTAButton";

export const metadata: Metadata = {
  title: "About Melgian Expeditions",
  description:
    "Learn about Melgian Expeditions, our expert guides, values, and commitment to premium African travel experiences.",
};

const differences = [
  {
    title: "Authentic Experiences",
    description: "We take you beyond sightseeing, offering genuine encounters with local communities, wildlife, and cultures that leave lasting impressions.",
    icon: Compass,
  },
  {
    title: "Tailor-Made Adventures",
    description: "Every traveler is unique. That's why we design customized itineraries that match your interests, travel style, budget, and pace.",
    icon: Map,
  },
  {
    title: "Expert Local Guides",
    description: "Our knowledgeable guides bring every destination to life through their passion, experience, and deep understanding of the region.",
    icon: Users,
  },
  {
    title: "Commitment to Excellence",
    description: "From your first inquiry to your final farewell, we are dedicated to providing exceptional service, attention to detail, and unforgettable moments.",
    icon: Star,
  },
  {
    title: "Responsible Tourism",
    description: "We believe in protecting the environments and communities that make our destinations special. Our tours promote sustainable travel practices that support conservation and local livelihoods.",
    icon: Leaf,
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section - About Melgian Expeditions */}
      <section className="relative min-h-[70vh] overflow-hidden">
        <Image
          src="/images/about/about-safari.jpg"
          alt="People enjoying a safari breakfast next to a land cruiser"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-transparent" />

        <div className="container-premium relative z-10 flex min-h-[70vh] items-center py-20 text-ivory">
          <div className="max-w-3xl mt-12">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-savannah">
              About Melgian Expeditions
            </p>

            <h1 className="mt-4 font-heading text-5xl font-bold md:text-7xl">
              Explore more experience beyond
            </h1>

            <div className="mt-6 space-y-6 text-lg leading-8 text-ivory/80">
              <p>
                At Melgian Expeditions, we believe that travel is more than visiting destinations, it is about creating unforgettable memories, experiencing authentic cultures, and connecting with the wild beauty of Africa.
              </p>
              <p>
                Founded with a passion for adventure and a deep love for East Africa's breathtaking landscapes, Melgian Expeditions specializes in crafting exceptional safari experiences, unforgettable beach experience, amazing cultural encounters, and tailor-made journeys designed around your dreams. Whether you are witnessing the Great Migration across the Maasai Mara, conquering the heights of Mount Kenya and Kilimanjaro, exploring the breathtaking coastal beaches of Kenya, or immersing yourself in local traditions, every expedition is carefully designed to deliver a once-in-a-lifetime experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-sand">
        <div className="container-premium grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative h-[600px] overflow-hidden rounded-premium shadow-premium order-last lg:order-first">
            <Image
              src="/images/about/luxury-lodge.jpg"
              alt="Luxury safari lodge"
              fill
              className="object-cover"
            />
          </div>
          
          <div>
            <h2 className="font-heading text-4xl font-bold md:text-5xl text-charcoal">
              Our Story
            </h2>

            <div className="mt-6 space-y-6 text-lg leading-8 text-charcoal/75">
              <p>
                Melgian Expeditions was born from a vision to share the magic of Africa with travelers from around the world. As a locally inspired and professionally managed tour company, we combine extensive destination knowledge with personalized service to ensure every journey is meaningful, seamless, and memorable.
              </p>
              <p>
                Our team consists of experienced travel specialists, passionate guides, and adventure experts who know Africa not just as a destination, but as home. This local expertise allows us to create authentic experiences that go beyond the typical tourist trail, bringing you closer to the people, wildlife, and natural wonders that make Africa truly extraordinary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="section-padding bg-ivory">
        <div className="container-premium">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-4xl font-bold md:text-5xl text-charcoal">
              What Makes Us Different
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {differences.map((diff, index) => (
              <div key={index} className="bg-white p-8 rounded-premium shadow-sm border border-sand hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-savannah/20 flex items-center justify-center mb-6 text-bronze">
                  <diff.icon size={24} />
                </div>
                <h3 className="font-heading text-xl font-bold text-charcoal mb-4">{diff.title}</h3>
                <p className="text-charcoal/75 leading-relaxed">{diff.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-forest py-24 text-ivory text-center">
        <div className="container-premium max-w-4xl">
          <h2 className="font-heading text-4xl font-bold md:text-5xl text-ivory mb-6">
            Our Mission
          </h2>
          <p className="font-heading text-2xl md:text-3xl leading-relaxed font-light">
            To create life-changing travel experiences that inspire adventure, foster cultural understanding, and showcase the extraordinary beauty of Africa while supporting local communities and preserving natural heritage for future generations.
          </p>
        </div>
      </section>

      {/* Your Journey Starts Here */}
      <section className="section-padding bg-sand">
        <div className="container-premium text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl font-bold md:text-5xl text-charcoal mb-6">
            Your Journey Starts Here
          </h2>
          <div className="space-y-6 text-lg leading-8 text-charcoal/75 mb-10">
            <p>
              Whether you're seeking thrilling wildlife safaris, mountain expeditions, family vacations, luxury escapes, cultural discoveries, chilled beach experiences, or customized group adventures, Melgian Expeditions is your trusted partner in exploring Africa.
            </p>
            <p>
              Join us and experience the spirit of adventure, the warmth of African hospitality, and the beauty of journeys that stay with you forever.
            </p>
            <p className="font-semibold text-charcoal italic mt-8 text-xl">
              Melgian Expeditions — Where Every Journey Becomes a Story Worth Telling.
            </p>
          </div>
          <CTAButton href="/booking" className="mt-4">
            Start Your Journey
          </CTAButton>
        </div>
      </section>
    </main>
  );
}