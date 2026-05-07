import { BookingRequest } from "../entities/Booking";

export interface BookingRepository {
  submitBooking(data: BookingRequest): Promise<void>;
}