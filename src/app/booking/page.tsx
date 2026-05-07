import { Metadata } from "next";
import { BookingForm } from "@/presentation/components/booking/BookingForm";

export const metadata: Metadata = {
  title: "Book Your Safari",
  description:
    "Start planning your luxury safari journey with our travel specialists.",
};

export default function BookingPage() {
  return (
    <main>
      <section className="bg-forest py-20 text-ivory">
        <div className="container-premium">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-savannah">
            Booking Inquiry
          </p>

          <h1 className="mt-4 font-heading text-5xl font-bold">
            Plan Your Luxury Safari
          </h1>

          <p className="mt-5 max-w-2xl text-ivory/75">
            Share your travel preferences and our team will design a tailored
            safari experience for you.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium grid gap-10 lg:grid-cols-[1fr_420px]">
          <BookingForm />

          <aside className="rounded-premium bg-savannah/20 p-8">
            <h2 className="font-heading text-3xl font-semibold text-charcoal">
              What Happens Next?
            </h2>

            <ul className="mt-6 space-y-5 text-charcoal/75">
              <li>1. Submit your preferred travel details.</li>
              <li>2. Our safari expert reviews your request.</li>
              <li>3. You receive a custom itinerary and quote.</li>
              <li>4. Confirm your trip securely.</li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}