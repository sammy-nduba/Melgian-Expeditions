import { BookingRequest } from "../entities/Booking";
import { BookingRepository } from "../repositories/BookingRepository";

export class SubmitBookingRequest {
  constructor(private bookingRepository: BookingRepository) {}

  async execute(data: BookingRequest): Promise<{ id: string }> {
    if (!data.fullName || !data.email || !data.travelDate) {
      throw new Error("Missing required booking information.");
    }

    if (data.adults < 1) {
      throw new Error("At least one adult traveler is required.");
    }

    return this.bookingRepository.submitBooking(data);
  }
}