"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/presentation/layouts/Navbar";
import { Footer } from "@/presentation/layouts/Footer";
import { NewsletterSignup } from "@/presentation/components/common/NewsletterSignup";
import { MobileStickyCTA } from "@/presentation/components/common/MobileStickyCTA";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname ? pathname.startsWith("/admin") : false;

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <NewsletterSignup />
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
