"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Compass, Mountain, Crown } from "lucide-react";
import { formatCurrency } from "@/core/utils/currency";
import { CategoryData } from "./categoryData";

const IconMap = {
  mountain: Mountain,
  compass: Compass,
  crown: Crown,
};

type CategoryCardProps = {
  category: CategoryData;
  index: number;
};

export function CategoryCard({ category, index }: CategoryCardProps) {
  const IconComponent = IconMap[category.icon] || Compass;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="relative flex flex-col justify-end overflow-hidden rounded-premium border border-charcoal/10 bg-charcoal shadow-premium min-h-[500px] group"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={category.image}
          alt={category.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Dark elegant overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${category.colorClass} via-charcoal/40 to-transparent transition-colors duration-500`} />
      </div>

      {/* Card Content */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full justify-end text-ivory">
        {/* Category Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-savannah/20 border border-savannah/30 text-savannah shadow-inner">
            <IconComponent className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-savannah/90">
              {category.subtitle}
            </p>
            <h3 className="font-heading text-2xl font-bold tracking-tight text-white mt-0.5">
              {category.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-ivory/80 mb-6 font-body">
          {category.description}
        </p>

        {/* Highlights */}
        <div className="border-t border-white/10 pt-5 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-savannah mb-3">
            Key Inclusions
          </h4>
          <ul className="grid gap-2 text-xs text-ivory/90">
            {category.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-savannah/10 text-savannah mt-0.5">
                  <Check className="h-3 w-3" />
                </span>
                <span className="leading-tight">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action / Pricing footer */}
        <div className="border-t border-white/10 pt-5 flex items-center justify-between mt-auto">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-ivory/50">
              Starting from
            </p>
            <p className="text-2xl font-extrabold text-white font-body mt-0.5">
              {formatCurrency(category.priceFrom, category.currency)}
            </p>
          </div>

          <Link
            href={`/tours?class=${category.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-savannah px-5 py-2.5 text-xs font-bold text-charcoal transition-all duration-300 hover:bg-white hover:scale-105 shadow-md shadow-black/20"
          >
            <span>Explore Packages</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
