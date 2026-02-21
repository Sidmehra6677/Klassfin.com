"use client";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Calculator } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="text-left">
            <span
              className="inline-block text-sky-600 text-sm font-mono tracking-[0.2em] uppercase mb-6 px-4 py-2 rounded-full border border-black"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              Start Your Journey
            </span>

            <h2
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <span className="text-slate-900 dark:text-white">
                Ready to Fund
              </span>
              <br />
              <span className="gradient-text">Your Dream?</span>
            </h2>

            <p
              className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mb-10"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Join 5000+ students who secured their education loan through
              KlassFin. It&apos;s free, fast, and personalized.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="btn-primary text-base px-8 py-4"
              >
                <span className="flex items-center gap-2">
                  Apply for Free <ArrowRight className="w-5 h-5" />
                </span>
              </motion.a>

              <motion.a
                href="/loan-calculator"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="btn-outline text-base px-8 py-4"
              >
                <span className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" /> Loan Calculator
                </span>
              </motion.a>
            </div>
          </div>

          {/* RIGHT (Image) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="/images/cta.png"
              alt="CTA preview"
              className="w-full h-auto object-cover rounded-2xl"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
