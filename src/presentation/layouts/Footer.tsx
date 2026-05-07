import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container-premium py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="font-heading text-2xl font-bold">Melgian Expeditions</h3>
            <p className="mt-4 text-sm leading-6 text-ivory/70">
              Melgian Expeditions delivers premium safari and travel experiences
              designed for explorers who value comfort, authenticity, and
              unforgettable memories.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Explore</h4>
            <ul className="mt-4 space-y-3 text-sm text-ivory/70">
              <li><Link href="/tours">Tours</Link></li>
              <li><Link href="/destinations">Destinations</Link></li>
              <li><Link href="/blog">Travel Guides</Link></li>
              <li><Link href="/faq">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-4 space-y-3 text-sm text-ivory/70">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/booking">Book Now</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-ivory/70">
              <li>Email: hello@melgianexpeditions.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>WhatsApp: +1 234 567 890</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-ivory/10 pt-6 text-sm text-ivory/50">
          © {new Date().getFullYear()} Melgian Expeditions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}