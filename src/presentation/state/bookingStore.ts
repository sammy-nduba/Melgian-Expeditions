import { create } from "zustand";

type BookingState = {
  selectedTourId?: string;
  adults: number;
  children: number;
  travelDate?: string;
  setSelectedTourId: (tourId: string) => void;
  setTravelers: (adults: number, children: number) => void;
  setTravelDate: (date: string) => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  adults: 1,
  children: 0,

  setSelectedTourId: (tourId) => set({ selectedTourId: tourId }),

  setTravelers: (adults, children) => set({ adults, children }),

  setTravelDate: (travelDate) => set({ travelDate }),
}));