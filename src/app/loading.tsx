export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-ivory">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-forest/20 border-t-forest" />
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-bronze">
          Preparing Your Journey
        </p>
      </div>
    </div>
  );
}