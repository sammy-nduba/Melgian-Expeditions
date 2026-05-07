import { CTAButton } from "@/presentation/components/common/CTAButton";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[70vh] items-center">
      <div className="container-premium text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bronze">
          404 Error
        </p>

        <h1 className="mt-4 font-heading text-5xl font-bold text-charcoal">
          This Trail Leads Nowhere
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-charcoal/70">
          The page you are looking for may have moved or no longer exists.
          Return home or explore our safari tours.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <CTAButton href="/">Go Home</CTAButton>
          <CTAButton href="/tours" variant="outline">
            Explore Tours
          </CTAButton>
        </div>
      </div>
    </main>
  );
}