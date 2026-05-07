"use client";

import { useState } from "react";
import { CTAButton } from "./CTAButton";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email) return;

    console.log("Newsletter signup:", email);
    setEmail("");
  }

  return (
    <section className="bg-charcoal py-16 text-ivory">
      <div className="container-premium grid gap-8 md:grid-cols-[1fr_420px] md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-savannah">
            Safari Inspiration
          </p>

          <h2 className="mt-3 font-heading text-4xl font-bold">
            Receive Luxury Safari Guides
          </h2>

          <p className="mt-4 max-w-2xl text-ivory/70">
            Get destination inspiration, seasonal travel advice, and exclusive
            safari planning insights.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
            placeholder="Email address"
            className="min-h-12 flex-1 rounded-full border border-ivory/30 bg-ivory/15 px-5 text-charcoal placeholder:text-charcoal/50 outline-none focus:border-savannah focus-visible:ring-2 focus-visible:ring-savannah/40 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
          />

          <CTAButton type="submit" variant="secondary">
            Subscribe
          </CTAButton>
        </form>
      </div>
    </section>
  );
}