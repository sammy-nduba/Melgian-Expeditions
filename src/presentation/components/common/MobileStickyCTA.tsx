import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-charcoal/10 bg-ivory p-3 shadow-2xl lg:hidden">
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="https://wa.me/1234567890"
          className="flex items-center justify-center gap-2 rounded-full border border-forest px-4 py-3 text-sm font-semibold text-forest"
        >
          <MessageCircle size={18} />
          WhatsApp
        </Link>

        <Link
          href="/booking"
          className="rounded-full bg-forest px-4 py-3 text-center text-sm font-semibold text-ivory"
        >
          Plan Trip
        </Link>
      </div>
    </div>
  );
}