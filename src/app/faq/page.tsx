import { Metadata } from "next";
import { FAQAccordion } from "@/presentation/components/common/FAQAccordion";
import { CTAButton } from "@/presentation/components/common/CTAButton";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about luxury safari bookings, travel planning, payments, safety, and destinations.",
};

const faqItems = [
  {
    question: "What destinations does Melgian Expeditions offer tours to?",
    answer: "Melgian Expeditions offers safari and adventure tours across East Africa. Popular destinations include the Maasai Mara, Amboseli National Park, Serengeti National Park, Ngorongoro Crater, Mount Kilimanjaro, Mount Kenya, Mombasa, Diani Beach, Malindi, Watamu and many other iconic wildlife and cultural destinations."
  },
  {
    question: "What types of tours do you offer?",
    answer: "We offer a wide range of travel experiences including wildlife safaris, mountain climbing expeditions, cultural tours, beach holidays, family vacations, honeymoon packages, photography safaris, group tours, and customized private adventures."
  },
  {
    question: "What is the best time to visit Kenya for a safari?",
    answer: "Kenya is a year-round destination, with excellent safari experiences throughout the year. The best wildlife viewing is generally during the dry seasons from June to October and January to March, when animals are easier to spot around water sources. Visitors can also witness the world-famous Great Migration in the Maasai Mara between July and October, making it one of the most sought-after safari experiences in Africa.\n\nFor travelers looking to combine a safari with a beach holiday, December to March offers warm, sunny weather ideal for both adventures and relaxation. Kenya's beautiful Indian Ocean coastline, including destinations such as Diani Beach, Watamu, and Malindi, provides the perfect setting for swimming, snorkeling, and unwinding after an exciting safari, making this period especially popular for family vacations, honeymoons, and festive holiday getaways."
  },
  {
    question: "Do I need to book my safari in advance?",
    answer: "Yes. We recommend booking your safari several months in advance, especially during peak travel seasons, to secure the best accommodations, park access, and travel arrangements."
  },
  {
    question: "Are your safaris suitable for families with children?",
    answer: "Absolutely. We offer family-friendly safari packages with accommodations and activities designed to provide safe, educational, and memorable experiences for travelers of all ages."
  },
  {
    question: "What is included in your safari packages?",
    answer: "Package inclusions vary depending on the tour class selected. Most packages include accommodation, transportation, professional guides, game drives, park entry fees, meals as specified, and airport transfers where applicable."
  },
  {
    question: "What is the difference between Adventure Trails, Explorer Safaris, and Signature Elite?",
    answer: "Adventure Trails offers budget-friendly experiences for travelers seeking value and adventure. Explorer Safaris provides enhanced comfort and personalized experiences at a mid-range level. Signature Elite delivers luxury accommodations, private services, and exclusive experiences for premium travelers."
  },
  {
    question: "Are your tours customizable?",
    answer: "Yes. We specialize in tailor-made itineraries that can be customized to match your travel preferences, budget, schedule, and special interests."
  },
  {
    question: "Is it safe to travel on safari in East Africa?",
    answer: "Yes. East Africa remains one of the world's most popular safari destinations. Melgian Expeditions prioritizes guest safety through experienced guides, reliable transportation, carefully selected accommodations, and adherence to industry safety standards."
  },
  {
    question: "What should I pack for a safari?",
    answer: "We recommend comfortable clothing in neutral colors, a hat, sunscreen, sunglasses, comfortable walking shoes, a camera, binoculars, insect repellent, and any personal medications you may require."
  },
  {
    question: "Can I see the Big Five during my safari?",
    answer: "Many of our safari destinations offer excellent opportunities to see the Big Five which includes lion, leopard, elephant, buffalo, and rhinoceros. All these are in renowned parks such as Maasai Mara, Amboseli, Serengeti, and Ngorongoro Conservation Area."
  },
  {
    question: "Do you offer airport transfers?",
    answer: "Yes. Airport transfers can be included in many of our safari packages to ensure a smooth and stress-free travel experience."
  },
  {
    question: "Do I need a visa to visit Kenya or Tanzania?",
    answer: "Visa requirements vary depending on your nationality. We recommend checking the latest immigration requirements for your destination before travel. Our team can provide guidance during the booking process."
  },
  {
    question: "Can you arrange honeymoon safaris?",
    answer: "Yes. We offer romantic honeymoon safari packages featuring luxury accommodations, private game drives, special dining experiences, and personalized services for couples."
  },
  {
    question: "How do I book a tour with Melgian Expeditions?",
    answer: "You can book directly through our website, submit an inquiry form, email our reservations team, or contact us through WhatsApp. Our travel specialists will guide you through every step of the booking process."
  },
  {
    question: "What wildlife can I expect to see on safari?",
    answer: "Depending on your destination, you may encounter elephants, lions, leopards, cheetahs, giraffes, zebras, rhinos, hippos, crocodiles, wildebeests, buffaloes, numerous bird species, and many other fascinating animals."
  },
  {
    question: "Do you offer group safari packages?",
    answer: "Yes. We organize group safaris for families, friends, corporate teams, schools, photography clubs, and special interest groups."
  },
  {
    question: "Why choose Melgian Expeditions?",
    answer: "Melgian Expeditions combines local expertise, professional guides, personalized service, carefully selected accommodations, and a passion for authentic African adventures. Our goal is to create unforgettable journeys tailored to every traveler."
  },
  {
    question: "Are your tours environmentally responsible?",
    answer: "Yes. We support responsible tourism practices that help protect wildlife, preserve natural habitats, and benefit local communities while providing meaningful travel experiences."
  },
  {
    question: "Which safari package is best for first-time visitors to Africa?",
    answer: "Our Explorer Safaris category is often the most popular choice for first-time visitors, offering an excellent balance of comfort, adventure, affordability, and immersive wildlife experiences."
  }
];

export default function FAQPage() {
  return (
    <main>
      <section className="bg-forest py-20 text-ivory">
        <div className="container-premium">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-savannah">
            Help Center
          </p>

          <h1 className="mt-4 font-heading text-5xl font-bold">
            Frequently Asked Questions
          </h1>

          <p className="mt-5 max-w-2xl text-ivory/75">
            Everything you need to know before planning your luxury safari
            journey.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium grid gap-12 lg:grid-cols-[1fr_360px]">
          <FAQAccordion items={faqItems} />

          <aside className="h-fit rounded-premium bg-white p-6 shadow-premium">
            <h2 className="font-heading text-3xl font-semibold">
              Still Have Questions?
            </h2>

            <p className="mt-4 text-sm leading-6 text-charcoal/70">
              Our safari specialists are ready to help you choose the right
              destination, dates, and travel style.
            </p>

            <div className="mt-6 space-y-3">
              <CTAButton href="/contact" className="w-full">
                Contact Us
              </CTAButton>

              <CTAButton href="/booking" variant="outline" className="w-full">
                Start Booking
              </CTAButton>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}