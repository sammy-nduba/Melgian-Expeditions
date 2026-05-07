import { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/presentation/components/forms/contactForm";
import { CTAButton } from "@/presentation/components/common/CTAButton";
import { FAQAccordion } from "@/presentation/components/common/FAQAccordion";

export const metadata: Metadata = {
  title: "Contact Safari Experts",
  description:
    "Contact our luxury safari planning team for custom tours, booking inquiries, and destination advice.",
};

const contactFaqs = [
  {
    question: "How soon will you respond?",
    answer:
      "Our team typically responds within one business day. For urgent requests, WhatsApp is recommended.",
  },
  {
    question: "Can I request a custom safari?",
    answer:
      "Yes. Share your travel dates, destination preferences, budget, and traveler count, and we will design a custom itinerary.",
  },
];

export default function ContactPage() {
  return (
    <main>
      <section className="bg-forest py-20 text-ivory">
        <div className="container-premium">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-savannah">
            Speak With an Expert
          </p>

          <h1 className="mt-4 font-heading text-5xl font-bold">
            Contact Our Safari Team
          </h1>

          <p className="mt-5 max-w-2xl text-ivory/75">
            Have questions or want a custom itinerary? Our travel specialists
            are here to help.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium grid gap-12 lg:grid-cols-[1fr_420px]">
          <ContactForm />

          <aside className="space-y-6">
            <div className="rounded-premium bg-white p-6 shadow-premium">
              <h2 className="font-heading text-3xl font-semibold">
                Contact Details
              </h2>

              <div className="mt-6 space-y-5 text-sm text-charcoal/75">
                <p className="flex gap-3">
                  <Mail className="text-forest" size={20} />
                  hello@melgianexpeditions.com
                </p>

                <p className="flex gap-3">
                  <Phone className="text-forest" size={20} />
                  +1 234 567 890
                </p>

                <p className="flex gap-3">
                  <MapPin className="text-forest" size={20} />
                  New York, United States
                </p>

                <p className="flex gap-3">
                  <MessageCircle className="text-forest" size={20} />
                  WhatsApp support available
                </p>
              </div>

              <CTAButton
                href="https://wa.me/1234567890"
                variant="secondary"
                className="mt-6 w-full"
              >
                Chat on WhatsApp
              </CTAButton>
            </div>

            <div className="rounded-premium bg-savannah/20 p-6">
              <h2 className="font-heading text-3xl font-semibold">
                Quick Questions
              </h2>

              <div className="mt-5">
                <FAQAccordion items={contactFaqs} />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}