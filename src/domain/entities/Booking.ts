export interface BookingRequest {
  tourId?: string;
  tourSlug?: string;
  fullName: string;
  email: string;
  phone: string;
  travelDate: string;
  adults: number;
  children: number;
  message?: string;
}