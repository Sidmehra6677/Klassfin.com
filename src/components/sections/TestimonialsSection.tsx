"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Abha Kamble",
    college: "Humber College, Canada",
    avatar: "https://klassfin.s3.ap-south-1.amazonaws.com/testimonials/testimonial1.jpg",
    text: "The loan process, right from the approval request, was quick and smooth. I applied and it got approved within 3 weeks. The folks at KlassFin are doing a wonderful job enabling students to pursue their dreams.",
    rating: 5,
    bank: "InCred Finance",
  },
  {
    name: "Shubh Nahar",
    college: "Troy University, USA",
    avatar: "https://klassfin.s3.ap-south-1.amazonaws.com/testimonials/testimonial2.jpg",
    text: "I'm writing to express my appreciation for the excellent service I received from Girish at KlassFin. He went above and beyond to help me secure a loan within an incredibly short period of time.",
    rating: 5,
    bank: "HDFC Credila",
  },
  {
    name: "Suraj Verma",
    college: "McGill University, Canada",
    avatar: "https://klassfin.s3.ap-south-1.amazonaws.com/testimonials/testimonial3.jpg",
    text: "I highly recommend KlassFin for their exceptional service in helping me secure an education loan without collateral for my Masters in CS at McGill. The process was completely stress-free.",
    rating: 5,
    bank: "IDFC First Bank",
  },
  {
    name: "Sneha Shukla",
    college: "Golden Gate University, USA",
    avatar: "https://klassfin.s3.ap-south-1.amazonaws.com/sneha.jpg",
    text: "I was having a tough time getting an education loan. Girish Mishra was fabulous and the service provided was genuine. Thank you so much KlassFin!",
    rating: 5,
    bank: "Axis Bank",
  },
  {
    name: "Alpona Das",
    college: "Maynooth University, Ireland",
    avatar: "https://klassfin.s3.ap-south-1.amazonaws.com/alpona-das.jpg",
    text: "Girish demonstrated a wealth of knowledge, remarkable patience, and responsiveness. Thanks to his dedication, I could concentrate on my studies without financial burden.",
    rating: 5,
    bank: "Union Bank",
  },
  {
    name: "Ajeet Anand",
    college: "University of York, England",
    avatar: "https://klassfin.s3.ap-south-1.amazonaws.com/ajeet-anand.jpg",
    text: "Despite approaching various agents and banks without success, it was only through KlassFin that I found the support I needed. Girish stood by me for three continuous months.",
    rating: 5,
    bank: "Bank of Baroda",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir * 100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -100, opacity: 0 }),
  };

  return (
    <section className="relative py-10 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-purple-400 text-sm font-mono font-medium tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full border border-purple-400/20 glass"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Success Stories
          </span>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold mt-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            <span className="text-white">Student </span>
            <span className="gradient-text">Testimonials</span>
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <div className="relative h-72 sm:h-64">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="glass rounded-3xl p-8 h-full flex flex-col sm:flex-row gap-6 relative overflow-hidden">
                {/* Quote icon */}
                <div className="absolute top-4 right-6 opacity-10">
                  <Quote className="w-16 h-16 text-sky-400" />
                </div>

                {/* Avatar */}
                <div className="flex-shrink-0 flex flex-col items-center gap-3 sm:items-start">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-sky-400/30">
                    <Image
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <div
                      className="text-white font-semibold text-sm"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {testimonials[current].name}
                    </div>
                    <div
                      className="text-sky-400 text-xs mt-0.5"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {testimonials[current].college}
                    </div>
                    <div className="flex gap-0.5 mt-2">
                      {[...Array(testimonials[current].rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p
                    className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    &ldquo;{testimonials[current].text}&rdquo;
                  </p>
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs glass border border-sky-400/20 text-sky-400"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    Loan via {testimonials[current].bank}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-400/40 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-sky-400 w-8"
                    : "bg-slate-600 w-2 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-400/40 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
