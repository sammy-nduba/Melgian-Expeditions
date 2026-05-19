"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { CTAButton } from "../common/CTAButton";
import { SubmitBookingRequest } from "@/domain/usecases/SubmitBookingRequest";
import { BookingRepositoryImpl } from "@/data/repositories/BookingRepositoryImpl";
import { CheckCircle2, AlertCircle } from "lucide-react";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Phone number is required"),
  travelDate: z.string().min(1, "Travel date is required"),
  adults: z.number().min(1, "At least 1 adult is required"),
  children: z.number().min(0),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const submitBookingUseCase = new SubmitBookingRequest(new BookingRepositoryImpl());

export function BookingForm() {
  return (
    <Suspense fallback={
      <div className="rounded-premium bg-white/10 backdrop-blur-md p-6 border border-white/20 text-ivory text-center min-h-[400px] flex items-center justify-center">
        <p className="text-sm font-semibold tracking-wide uppercase text-savannah animate-pulse">Loading Planning Form...</p>
      </div>
    }>
      <BookingFormContent />
    </Suspense>
  );
}

function BookingFormContent() {
  const searchParams = useSearchParams();
  const tourSlug = searchParams.get("tour") || undefined;
  
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    defaultValues: {
      adults: 1,
      children: 0,
      message: "",
    },
  });

  async function onSubmit(data: BookingFormData) {
    try {
      setSubmitStatus("idle");
      setErrorMessage("");

      const parsed = bookingSchema.safeParse(data);
      if (!parsed.success) {
        return;
      }

      await submitBookingUseCase.execute({
        ...parsed.data,
        tourSlug,
      } as any);

      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Booking submission error:", error);
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit booking inquiry.");
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="rounded-premium bg-white/10 backdrop-blur-md p-8 border border-white/20 max-w-md w-full text-center text-ivory flex flex-col items-center justify-center min-h-[400px]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-5 shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="font-heading text-2xl font-bold mb-3 text-white">Inquiry Submitted!</h3>
        <p className="text-sm text-ivory/80 leading-relaxed max-w-sm">
          Thank you for choosing Safari Luxe. Our luxury safari specialists are reviewing your travel preferences and will contact you within 24 hours.
        </p>
        <CTAButton onClick={() => setSubmitStatus("idle")} className="mt-8 px-8 py-3 bg-savannah hover:bg-white text-charcoal text-xs font-bold">
          Submit Another Inquiry
        </CTAButton>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-premium bg-white/10 backdrop-blur-md p-6 border border-white/20 max-w-md w-full"
    >
      <h2 className="font-heading text-2xl font-bold text-ivory mb-2">
        Plan Your Journey
      </h2>

      <p className="text-xs text-ivory/80 mb-5 leading-relaxed">
        Send your preferred travel details and our safari experts will tailor a bespoke experience for you.
      </p>

      {tourSlug && (
        <div className="mb-4 rounded-xl bg-savannah/10 border border-savannah/30 px-3.5 py-2 text-xs text-savannah flex items-center gap-2">
          <span className="font-bold">Inquiry For:</span>
          <span className="capitalize">{tourSlug.replace(/-/g, " ")}</span>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-4 rounded-xl bg-red-500/15 border border-red-500/30 px-3.5 py-2.5 text-xs text-red-300 flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="grid gap-3.5">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-ivory/90">Full Name</label>
          <input
            {...register("fullName")}
            className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-ivory placeholder:text-ivory/40 backdrop-blur-sm focus:border-savannah focus:outline-none text-sm transition-all"
            placeholder="Your full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-300 font-semibold">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-ivory/90">Email Address</label>
          <input
            {...register("email")}
            type="email"
            className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-ivory placeholder:text-ivory/40 backdrop-blur-sm focus:border-savannah focus:outline-none text-sm transition-all"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-300 font-semibold">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-ivory/90">Phone / WhatsApp</label>
          <input
            {...register("phone")}
            className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-ivory placeholder:text-ivory/40 backdrop-blur-sm focus:border-savannah focus:outline-none text-sm transition-all"
            placeholder="+1 234 567 890"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-300 font-semibold">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-ivory/90">Preferred Travel Date</label>
          <input
            {...register("travelDate")}
            type="date"
            className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-ivory placeholder:text-ivory/40 backdrop-blur-sm focus:border-savannah focus:outline-none text-sm transition-all"
          />
          {errors.travelDate && (
            <p className="mt-1 text-xs text-red-300 font-semibold">{errors.travelDate.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-ivory/90">Adults</label>
            <input
              {...register("adults", { valueAsNumber: true })}
              type="number"
              min={1}
              className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-ivory placeholder:text-ivory/40 backdrop-blur-sm focus:border-savannah focus:outline-none text-sm transition-all"
            />
            {errors.adults && (
              <p className="mt-1 text-xs text-red-300 font-semibold">{errors.adults.message}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-ivory/90">Children</label>
            <input
              {...register("children", { valueAsNumber: true })}
              type="number"
              min={0}
              className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-ivory placeholder:text-ivory/40 backdrop-blur-sm focus:border-savannah focus:outline-none text-sm transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-ivory/90">Special Requests / Message</label>
          <textarea
            {...register("message")}
            rows={3}
            className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-ivory placeholder:text-ivory/40 backdrop-blur-sm focus:border-savannah focus:outline-none text-sm transition-all resize-none"
            placeholder="Tell us about your dream safari..."
          />
        </div>

        <CTAButton type="submit" className="w-full mt-2 font-bold tracking-wider uppercase text-xs">
          {isSubmitting ? "Submitting..." : "Submit Booking Inquiry"}
        </CTAButton>
      </div>
    </form>
  );
}