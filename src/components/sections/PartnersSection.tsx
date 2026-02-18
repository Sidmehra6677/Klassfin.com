"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const partners = [
  { name: "Union Bank", logo: "/images/banks/union-bank.png" },
  { name: "Bank of Baroda", logo: "/images/banks/bank-of-baroda.png" },
  { name: "IDFC First", logo: "/images/banks/idfc-first.jpeg" },
  { name: "HDFC Credila", logo: "/images/banks/credila.png" },
  { name: "Axis Bank", logo: "/images/banks/axis-bank.png" },
  { name: "Yes Bank", logo: "/images/banks/yes-bank.png" },
  { name: "Avanse", logo: "/images/banks/avanse.png" },
  { name: "InCred", logo: "/images/banks/incred.png" },
  { name: "Prodigy Finance", logo: "/images/banks/prodigy.png" },
  { name: "MPower", logo: "/images/banks/mpower.png" },
  { name: "Bank1", logo: "/images/banks/bank1.png" },
  { name: "Bank2", logo: "/images/banks/bank2.png" },
  { name: "Bank4", logo: "/images/banks/bank3.png" },
];

function PartnerCard({ partner }: { partner: { name: string; logo: string } }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -6 }}
      className="
        flex-shrink-0
        w-28 h-28 md:w-32 md:h-32
        rounded-full bg-white
        flex items-center justify-center
        shadow-[0_6px_18px_rgba(0,0,0,0.01)]
        border border-black/5
      "
    >
      <div className="relative w-[72%] h-[72%]">
        <Image
          src={partner.logo}
          alt={partner.name}
          fill
          className="object-contain"
          unoptimized
        />
      </div>
    </motion.div>
  );
}

export default function PartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span
            className="inline-block text-sky-400 text-sm font-mono font-medium tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full border border-sky-400/20 glass"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Trusted Partners
          </span>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            <span className="text-white">Our </span>
            <span className="gradient-text">Bank Partners</span>
          </h2>
          <p
            className="text-slate-400 max-w-lg mx-auto"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            We work with India&apos;s top banks, NBFCs, and international
            lenders to get you the best rates.
          </p>
        </motion.div>
      </div>

      {/* Marquee Row 2 (reverse) */}
      <div className="relative overflow-hidden py-8">
        <div
          className="absolute left-0 top-0 bottom-0 w-36 z-10 pointer-events-none rounded-r-[60px]
  bg-gradient-to-r from-sky-200/80 via-purple-200/40 to-transparent"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-36 z-10 pointer-events-none rounded-l-[60px]
  bg-gradient-to-l from-sky-200/80 via-purple-200/40 to-transparent"
        />

        <div className="flex gap-4 animate-marquee-reverse">
          {[...partners.slice(5), ...partners, ...partners.slice(0, 5)].map(
            (partner, i) => (
              <PartnerCard key={i} partner={partner} />
            ),
          )}
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-4xl mx-auto px-4 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 grid grid-cols-3 gap-4 text-center border border-sky-400/10"
        >
          <div>
            <div
              className="font-display text-2xl font-bold gradient-text"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              15+
            </div>
            <div
              className="text-slate-400 text-sm mt-1"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Bank Partners
            </div>
          </div>
          <div className="border-x border-white/5">
            <div
              className="font-display text-2xl font-bold gradient-text"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              8.5%
            </div>
            <div
              className="text-slate-400 text-sm mt-1"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Starting Interest
            </div>
          </div>
          <div>
            <div
              className="font-display text-2xl font-bold gradient-text"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              ₹2Cr
            </div>
            <div
              className="text-slate-400 text-sm mt-1"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Max Loan Amount
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
