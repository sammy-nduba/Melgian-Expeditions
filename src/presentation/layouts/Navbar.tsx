"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";
import { CTAButton } from "../components/common/CTAButton";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-ivory/90 backdrop-blur-xl">
      <div className="container-premium flex h-20 items-center justify-between">
        <Link
          href="/"
          onClick={closeMenu}
          className="font-heading text-2xl font-bold text-forest"
        >
          Melgian Expeditions
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-charcoal/80 transition hover:text-forest"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/cart"
            className="flex items-center gap-2 text-sm font-semibold text-forest"
          >
            <ShoppingCart size={16} />
            Cart
          </Link>

          <CTAButton href="/booking">Plan Your Trip</CTAButton>
        </div>

        <button
          className="rounded-full border border-charcoal/20 p-2 lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-charcoal/10 bg-ivory lg:hidden">
          <nav className="container-premium grid gap-1 py-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-charcoal/80 hover:bg-forest hover:text-ivory"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-4 grid gap-3">
              <CTAButton href="/booking" className="w-full">
                Plan Your Trip
              </CTAButton>

              <CTAButton
                href="/cart"
                variant="outline"
                className="w-full"
              >
                View Cart
              </CTAButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}