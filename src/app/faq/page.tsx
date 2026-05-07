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
    question: "Do I need to pay immediately to book a safari?",
    answer:
      "No. You can first submit an inquiry. Our travel specialists will prepare a custom proposal before payment is required.",
  },
  {
    question: "Can I customize my safari itinerary?",
    answer:
      "Yes. Most luxury safari journeys can be customized based on your dates, preferred destinations, accommodation style, and budget.",
  },
  {
    question: "Are safari tours suitable for families?",
    answer:
      "Yes. Many lodges and itineraries are family-friendly. We recommend selecting destinations and camps that match children’s ages and comfort needs.",
  },
  {
    question: "What is included in a safari package?",
    answer:
      "Packages commonly include accommodation, meals, airport transfers, park fees, safari activities, and professional guiding. Exact inclusions vary by tour.",
  },
  {
    question: "Is travel insurance required?",
    answer:
      "Travel insurance is strongly recommended for medical coverage, trip cancellation, baggage protection, and emergency evacuation support.",
  },
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