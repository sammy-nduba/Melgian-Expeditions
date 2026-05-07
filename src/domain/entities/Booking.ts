export interface BookingRequest {
  tourId: string;
  fullName: string;
  email: string;
  phone: string;
  travelDate: string;
  adults: number;
  children: number;
  message?: string;
}