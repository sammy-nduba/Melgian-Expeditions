"use client";

import { CTAButton } from "@/presentation/components/common/CTAButton";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] items-center">
      <div className="container-premium text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bronze">
          Something Went Wrong
        </p>

        <h1 className="mt-4 font-heading text-5xl font-bold text-charcoal">
          We Couldn’t Load This Experience
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-charcoal/70">
          {error.message || "Please try again or return to the homepage."}
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-olive"
          >
            Try Again
          </button>

          <CTAButton href="/" variant="outline">
            Go Home
          </CTAButton>
        </div>
      </div>
    </main>
  );
}