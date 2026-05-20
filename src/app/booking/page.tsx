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
      {/* Hero */}
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

      {/* Form + aside — dark background so the glass form is visible */}
      <section className="bg-forest section-padding border-t border-white/10">
        <div className="container-premium grid gap-10 lg:grid-cols-[1fr_380px]">
          <BookingForm />

          <aside className="rounded-2xl bg-white/[0.06] border border-white/10 p-8 text-ivory self-start">
            <h2 className="font-heading text-2xl font-bold text-white mb-6">
              What Happens Next?
            </h2>

            <ul className="space-y-5">
              {[
                { n: "1", t: "Submit your preferences", d: "Fill in your travel dates, party size, and any special requests." },
                { n: "2", t: "Expert review", d: "Our safari specialist reviews your inquiry within 24 hours." },
                { n: "3", t: "Custom itinerary & quote", d: "You receive a personalised day-by-day proposal and pricing." },
                { n: "4", t: "Confirm your dates", d: "Approve your journey and secure your reservation with a deposit." },
              ].map(({ n, t, d }) => (
                <li key={n} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-savannah/15 border border-savannah/30 text-savannah text-xs font-extrabold">
                    {n}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{t}</p>
                    <p className="text-xs text-ivory/60 mt-0.5 leading-relaxed">{d}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl bg-savannah/10 border border-savannah/20 px-4 py-3.5 text-xs text-savannah/80 leading-relaxed">
              <span className="font-bold text-savannah">No commitment required.</span>{" "}
              Submitting this form is free — we&apos;ll reach out with a custom proposal before any payment is requested.
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}