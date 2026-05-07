"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { CTAButton } from "../common/CTAButton";

const contactSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  async function onSubmit(data: ContactFormData) {
    const parsed = contactSchema.safeParse(data);

    if (!parsed.success) {
      return;
    }

    console.log("Contact form:", parsed.data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-premium bg-white p-6 shadow-premium"
    >
      <h2 className="font-heading text-3xl font-semibold">
        Send Us a Message
      </h2>

      <div className="mt-8 grid gap-5">
        <div>
          <label className="text-sm font-semibold">Full Name</label>
          <input
            {...register("fullName")}
            className="mt-2 w-full rounded-xl border border-charcoal/15 px-4 py-3"
            placeholder="Your name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">Name is required.</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold">Email</label>
          <input
            {...register("email")}
            type="email"
            className="mt-2 w-full rounded-xl border border-charcoal/15 px-4 py-3"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">Valid email is required.</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold">Subject</label>
          <input
            {...register("subject")}
            className="mt-2 w-full rounded-xl border border-charcoal/15 px-4 py-3"
            placeholder="How can we help?"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Message</label>
          <textarea
            {...register("message")}
            rows={6}
            className="mt-2 w-full rounded-xl border border-charcoal/15 px-4 py-3"
            placeholder="Tell us more about your travel plans..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">
              Message must be at least 10 characters.
            </p>
          )}
        </div>

        <CTAButton type="submit" className="w-full">
          {isSubmitting ? "Sending..." : "Send Message"}
        </CTAButton>
      </div>
    </form>
  );
}