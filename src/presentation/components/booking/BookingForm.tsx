"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { CTAButton } from "../common/CTAButton";

const bookingSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  travelDate: z.string().min(1),
  adults: z.number().min(1),
  children: z.number().min(0),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export function BookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    defaultValues: {
      adults: 1,
      children: 0,
    },
  });

  async function onSubmit(data: BookingFormData) {
    const parsed = bookingSchema.safeParse(data);

    if (!parsed.success) {
      return;
    }

    console.log("Booking request:", parsed.data);

    /**
     * Later:
     * await submitBookingUseCase.execute(parsed.data)
     */
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-premium bg-white/10 backdrop-blur-md p-3 border border-white/20 max-w-md w-full"
    >
      <h2 className="font-heading text-xl font-semibold text-ivory mb-3">
        Plan Your Journey
      </h2>

      <p className="text-sm text-ivory/80 mb-4">
        Send your preferred travel details and our safari experts will contact
        you.
      </p>

      <div className="grid gap-3">
        <div>
          <label className="text-sm font-semibold text-ivory">Full Name</label>
          <input
            {...register("fullName")}
            className="mt-1 w-full rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-ivory placeholder:text-ivory/60 backdrop-blur-sm focus:border-savannah focus:outline-none text-sm"
            placeholder="Your full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-300">Name is required.</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-ivory">Email</label>
          <input
            {...register("email")}
            type="email"
            className="mt-1 w-full rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-ivory placeholder:text-ivory/60 backdrop-blur-sm focus:border-savannah focus:outline-none text-sm"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-300">Valid email is required.</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-ivory">Phone / WhatsApp</label>
          <input
            {...register("phone")}
            className="mt-1 w-full rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-ivory placeholder:text-ivory/60 backdrop-blur-sm focus:border-savannah focus:outline-none text-sm"
            placeholder="+1 234 567 890"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-ivory">Preferred Travel Date</label>
          <input
            {...register("travelDate")}
            type="date"
            className="mt-1 w-full rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-ivory placeholder:text-ivory/60 backdrop-blur-sm focus:border-savannah focus:outline-none text-sm"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-ivory">Adults</label>
            <input
              {...register("adults", { valueAsNumber: true })}
              type="number"
              min={1}
              className="mt-1 w-full rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-ivory placeholder:text-ivory/60 backdrop-blur-sm focus:border-savannah focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-ivory">Children</label>
            <input
              {...register("children", { valueAsNumber: true })}
              type="number"
              min={0}
              className="mt-1 w-full rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-ivory placeholder:text-ivory/60 backdrop-blur-sm focus:border-savannah focus:outline-none text-sm"
            />
          </div>
        </div>

        <CTAButton type="submit" className="w-full">
          {isSubmitting ? "Submitting..." : "Submit Booking Inquiry"}
        </CTAButton>
      </div>
    </form>
  );
}