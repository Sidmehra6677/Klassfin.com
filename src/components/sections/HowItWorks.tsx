"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, FileCheck, BadgeCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Request Callback",
    desc: "Sign up and schedule a free call with our expert counselors. They'll understand your requirements, course, and financial needs.",
    color: "#38BDF8",
  },
  {
    icon: FileCheck,
    step: "02",
    title: "Document Submission",
    desc: "Submit your documents online through our secure portal. Your application gets shared with the best-matched lenders.",
    color: "#A78BFA",
  },
  {
    icon: BadgeCheck,
    step: "03",
    title: "Quick Approval",
    desc: "We ensure quick loan approval. Our team stays with you even after disbursal for any support you need.",
    color: "#60E9FF",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-purple-400 text-sm font-mono font-medium tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full border border-purple-400/20 glass"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            The Process
          </span>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold mt-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            <span className="text-white">How It</span>{" "}
            <span className="gradient-text">Works?</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-sky-400/20 via-purple-400/40 to-sky-400/20 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className="glass rounded-3xl p-8 card-hover relative overflow-hidden group text-center"
                >
                  {/* Glow */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }}
                  />

                  {/* Step number */}
                  <div
                    className="font-mono text-7xl font-bold absolute -top-2 -right-2 opacity-5"
                    style={{ fontFamily: "JetBrains Mono, monospace", color: step.color }}
                  >
                    {step.step}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style={{
                      background: `${step.color}15`,
                      border: `1px solid ${step.color}30`,
                      boxShadow: `0 0 30px ${step.color}15`,
                    }}
                  >
                    <step.icon className="w-8 h-8" style={{ color: step.color }} />
                  </motion.div>

                  {/* Step badge */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium mb-4"
                    style={{
                      background: `${step.color}15`,
                      color: step.color,
                      border: `1px solid ${step.color}25`,
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    Step {step.step}
                  </div>

                  <h3
                    className="text-white font-bold text-xl mb-4"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-slate-400 text-sm leading-relaxed"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {step.desc}
                  </p>
                </motion.div>

                {/* Arrow connector */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-6 -translate-y-1/2 z-20">
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5 text-sky-400/50" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-base px-8 py-4"
          >
            <span className="flex items-center gap-2">
              Start Your Journey Today <ArrowRight className="w-5 h-5" />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
