import { Testimonial } from "@/domain/entities/Testimonial";

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "London, UK",
    rating: 5,
    comment: "Our safari with Melgian Expeditions exceeded all expectations. The attention to detail, luxury accommodations, and expert guides made this the trip of a lifetime.",
    tourName: "Serengeti Luxury Safari",
    avatar: "/images/testimonials/sarah.jpg",
  },
  {
    id: "2",
    name: "Michael Chen",
    location: "New York, USA",
    rating: 5,
    comment: "The wildlife encounters were incredible, but what really stood out was the cultural immersion and the genuine care our guides showed for conservation.",
    tourName: "Maasai Mara Adventure",
    avatar: "/images/testimonials/michael.jpg",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    location: "Barcelona, Spain",
    rating: 5,
    comment: "From the moment we landed to our departure, everything was perfectly orchestrated. The luxury camps were stunning and the food was exceptional.",
    tourName: "Kruger Premium Experience",
    avatar: "/images/testimonials/emma.jpg",
  },
];

export class TestimonialsAPIService {
  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return testimonials.slice(0, 3);
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return testimonials;
  }
}