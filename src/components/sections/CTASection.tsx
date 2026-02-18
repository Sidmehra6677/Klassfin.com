"use client";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Calculator } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-14 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden animated-border"
        >
          {/* Inner content */}
          <div className="relative glass p-12 sm:p-16 text-center">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[
                {
                  size: 260,
                  left: "6%",
                  top: "78%",
                  drift: 30,
                  dur: 14,
                  delay: 0,
                  tint: "rgba(56,189,248,0.35)",
                }, // sky
                {
                  size: 220,
                  left: "22%",
                  top: "84%",
                  drift: -22,
                  dur: 13,
                  delay: 1.2,
                  tint: "rgba(167,139,250,0.32)",
                }, // purple
                {
                  size: 180,
                  left: "42%",
                  top: "80%",
                  drift: 18,
                  dur: 12,
                  delay: 0.8,
                  tint: "rgba(56,189,248,0.28)",
                },
                {
                  size: 240,
                  left: "62%",
                  top: "86%",
                  drift: -28,
                  dur: 15,
                  delay: 2,
                  tint: "rgba(167,139,250,0.30)",
                },
                {
                  size: 200,
                  left: "78%",
                  top: "82%",
                  drift: 22,
                  dur: 13.5,
                  delay: 1.6,
                  tint: "rgba(96,233,255,0.30)",
                }, // cyan
                {
                  size: 160,
                  left: "90%",
                  top: "88%",
                  drift: -18,
                  dur: 12.5,
                  delay: 0.4,
                  tint: "rgba(56,189,248,0.24)",
                },

                // few top soft bokeh (depth)
                {
                  size: 140,
                  left: "12%",
                  top: "18%",
                  drift: 14,
                  dur: 18,
                  delay: 0.6,
                  tint: "rgba(167,139,250,0.20)",
                },
                {
                  size: 120,
                  left: "72%",
                  top: "14%",
                  drift: -12,
                  dur: 20,
                  delay: 1.1,
                  tint: "rgba(56,189,248,0.18)",
                },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full blur-[0.5px] opacity-90"
                  style={{
                    width: b.size,
                    height: b.size,
                    left: b.left,
                    top: b.top,
                    background: `radial-gradient(circle at 28% 28%, rgba(255,255,255,0.65), ${b.tint} 35%, rgba(255,255,255,0) 72%)`,
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{
                    y: [0, -220, -440],
                    x: [0, b.drift, 0],
                    opacity: [0, 0.75, 0],
                  }}
                  transition={{
                    duration: b.dur,
                    delay: b.delay,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}

              {/* subtle wash so it looks premium */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_55%)]" />
            </div>

            {/* Floating dots */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-sky-400/40"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 30}%`,
                }}
                animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}

            <span
              className="relative inline-block text-sky-400 text-sm font-mono tracking-[0.2em] uppercase mb-6 px-4 py-2 rounded-full border border-sky-400/20 glass"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              Start Your Journey
            </span>

            <h2
              className="relative font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <span className="text-white">Ready to Fund</span>
              <br />
              <span className="gradient-text">Your Dream?</span>
            </h2>

            <p
              className="relative text-slate-400 text-lg max-w-xl mx-auto mb-10"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Join 5000+ students who secured their education loan through
              KlassFin. It&apos;s free, fast, and personalized.
            </p>

            <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-base px-8 py-4"
              >
                <span className="flex items-center gap-2">
                  Apply for Free <ArrowRight className="w-5 h-5" />
                </span>
              </motion.a>
              <motion.a
                href="/ai-chatbot"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline text-base px-8 py-4"
              >
                <span className="flex items-center gap-2">
                  <Bot className="w-5 h-5" /> Ask AI Assistant
                </span>
              </motion.a>
              <motion.a
                href="/loan-calculator"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline text-base px-8 py-4"
              >
                <span className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" /> Loan Calculator
                </span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
