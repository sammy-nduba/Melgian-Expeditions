import { BookingRequest } from "@/domain/entities/Booking";
import { BookingRepository } from "@/domain/repositories/BookingRepository";
import { BookingAPIService } from "../services/BookingAPIService";

export class BookingRepositoryImpl implements BookingRepository {
  constructor(private service: BookingAPIService = new BookingAPIService()) {}

  async submitBooking(data: BookingRequest): Promise<{ id: string }> {
    return this.service.submitBooking(data);
  }
}
