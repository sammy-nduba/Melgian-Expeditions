"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/core/utils/cn";

const heroImages = [
  {
    src: "/images/hero/safari-hero.jpg",
    alt: "Luxury safari landscape",
  },
  {
    src: "/images/destinations/maasai-mara.jpg",
    alt: "Maasai Mara wildlife",
  },
  {
    src: "/images/tours/1779558993631-beach.jpg",
    alt: "Pristine beach vacation",
  },
  {
    src: "/images/destinations/serengeti.jpg",
    alt: "Serengeti plains",
  },
  {
    src: "/images/about/about-safari.jpg",
    alt: "Safari breakfast experience",
  },
];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-charcoal">
      {heroImages.map((img, index) => (
        <div
          key={img.src}
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-in-out",
            index === currentIndex ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
          )}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={index === 0}
            unoptimized
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
