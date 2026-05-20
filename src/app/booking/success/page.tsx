"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  CalendarCheck,
  Mail,
  Clock,
  ArrowRight,
  Copy,
} from "lucide-react";
import { useState } from "react";

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-forest flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-savannah border-t-transparent animate-spin" />
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || "";
  const [copied, setCopied] = useState(false);

  function copyRef() {
    if (!ref) return;
    navigator.clipboard.writeText(ref);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen bg-forest text-ivory flex flex-col">
      {/* Hero banner */}
      <section className="bg-forest border-b border-white/10 py-20">
        <div className="container-premium flex flex-col items-center text-center gap-6">
          {/* Animated success ring */}
          <div className="relative flex h-24 w-24 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping" />
            <span className="absolute inset-2 rounded-full bg-emerald-500/20" />
            <CheckCircle2 className="relative h-12 w-12 text-emerald-400 drop-shadow-lg" />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-savannah">
            Booking Inquiry Received
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white max-w-xl leading-tight">
            Your Safari Journey Begins Here
          </h1>
          <p className="text-ivory/70 max-w-lg leading-relaxed">
            Thank you for choosing Melgian Expeditions. Our luxury safari
            specialists are reviewing your preferences and will reach out within
            24 hours.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding flex-1">
        <div className="container-premium max-w-4xl mx-auto grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Left — What happens next */}
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold text-white">
              What Happens Next?
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  step: "1",
                  title: "Confirmation Email Sent",
                  desc: "A confirmation summary has been dispatched to your email address with full inquiry details.",
                },
                {
                  icon: Clock,
                  step: "2",
                  title: "24-Hour Expert Review",
                  desc: "A dedicated private travel designer will review your travel preferences and craft a bespoke itinerary.",
                },
                {
                  icon: CalendarCheck,
                  step: "3",
                  title: "Custom Quote & Itinerary",
                  desc: "You'll receive a day-by-day proposal with personalised pricing and lodge recommendations.",
                },
                {
                  icon: CheckCircle2,
                  step: "4",
                  title: "Confirm & Secure Your Dates",
                  desc: "Once you're happy, confirm your journey and secure your travel dates with a deposit.",
                },
              ].map(({ icon: Icon, step, title, desc }) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-savannah/30 transition-all"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-savannah/10 border border-savannah/20 text-savannah">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-savannah mb-1">
                      Step {step}
                    </p>
                    <h3 className="font-semibold text-sm text-white mb-1">
                      {title}
                    </h3>
                    <p className="text-xs text-ivory/60 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Estimate disclaimer */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3.5 text-xs text-amber-300/80 leading-relaxed">
              <span className="font-bold text-amber-300">Note: </span>
              Any estimated amounts shown are indicative only, calculated from
              the tour&apos;s base per-person rate. Your final quote — including
              child pricing, seasonal adjustments, and lodge upgrades — will be
              provided by your travel designer.
            </div>
          </div>

          {/* Right — Reference card */}
          <aside className="space-y-6">
            {ref && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-ivory/50">
                  Booking Reference
                </p>
                <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-3">
                  <code className="font-mono text-xs text-savannah flex-1 break-all">
                    {ref}
                  </code>
                  <button
                    onClick={copyRef}
                    title="Copy reference ID"
                    className="shrink-0 p-1.5 rounded-lg hover:bg-white/10 text-ivory/50 hover:text-white transition-colors cursor-pointer"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
                {copied && (
                  <p className="text-[10px] text-emerald-400 font-semibold">
                    ✓ Copied to clipboard
                  </p>
                )}
                <p className="text-[10px] text-ivory/45 leading-relaxed">
                  Keep this reference handy. Our team may ask for it when you
                  contact us about your booking.
                </p>
              </div>
            )}

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
              <h3 className="font-heading text-lg font-bold text-white">
                Explore More
              </h3>
              <p className="text-xs text-ivory/60 leading-relaxed">
                While you wait, browse our full collection of luxury safari
                experiences.
              </p>
              <Link
                href="/tours"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-savannah hover:bg-white text-charcoal font-bold text-xs uppercase tracking-widest px-6 py-3 transition-all"
              >
                Browse Tours
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 hover:border-savannah/40 bg-white/[0.02] hover:bg-white/[0.06] text-ivory/70 hover:text-white font-semibold text-xs uppercase tracking-widest px-6 py-3 transition-all"
              >
                Return Home
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
