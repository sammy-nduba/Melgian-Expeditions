import { BookingRequest } from "@/domain/entities/Booking";
import { apiClient } from "@/core/api/apiClient";

export class BookingAPIService {
  async submitBooking(data: BookingRequest): Promise<{ id: string }> {
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

    const response = await apiClient<{ booking: { id: string } }>("/bookings", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return { id: response?.booking?.id ?? "" };
  }
}
