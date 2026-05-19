import { BookingRequest } from "@/domain/entities/Booking";
import { apiClient } from "@/core/api/apiClient";

export class BookingAPIService {
  async submitBooking(data: BookingRequest): Promise<void> {
    const payload = {
      tourSlug: data.tourSlug || (data as any).tourId,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      travelDate: data.travelDate,
      adults: Number(data.adults),
      children: Number(data.children || 0),
      message: data.message,
    };

    await apiClient<any>("/bookings", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
}
