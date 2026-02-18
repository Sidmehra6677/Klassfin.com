"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, RefreshCw, ArrowRight, CheckCircle } from "lucide-react";

const offerings = [
  {
    icon: Zap,
    title: "Quick Approval Loan",
    description: "Get an education loan with the lowest interest rate for studying abroad from multiple partner banks and NBFCs.",
    features: [
      "Collateral & Non-Collateral options",
      "Loan up to Crore's",
      "Interest starting at 8.5% p.a.",
      "Fast disbursement",
      "Tax benefits under Section 80E",
    ],
    cta: "Check Eligibility",
    href: "/loan-calculator",
    color: "#38BDF8",
    gradient: "from-sky-400/20 to-transparent",
    popular: true,
  },
  {
    icon: RefreshCw,
    title: "Refinance Existing Loan",
    description: "Reduce your financial burden by transferring your loan to other lenders with a lower interest rate.",
    features: [
      "Lower EMI burden",
      "Better interest rates",
      "Flexible repayment",
      "Top-up loan options",
      "No prepayment penalty",
    ],
    cta: "Check Eligibility",
    href: "/loan-calculator",
    color: "#A78BFA",
    gradient: "from-purple-400/20 to-transparent",
    popular: false,
  },
];

export default function LoanOfferingsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative pt-10 pb-20 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-sky-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-sky-400 text-sm font-mono font-medium tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full border border-sky-400/20 glass"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Unlock Your Financial Potential
          </span>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold mt-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            <span className="text-white">Our Loan </span>
            <span className="gradient-text">Offerings</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {offerings.map((offer, i) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ y: -8 }}
              className="relative glass rounded-3xl p-8 card-hover overflow-hidden group"
            >
              {/* Popular badge */}
              {offer.popular && (
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono font-medium"
                  style={{
                    background: "linear-gradient(135deg, #38BDF8, #A78BFA)",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Top gradient */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                  i === 0 ? "from-sky-400 to-sky-400/0" : "from-purple-400 to-purple-400/0"
                }`}
              />

              {/* Background hover effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${offer.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Icon */}
              <div
                className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  background: `${offer.color}15`,
                  border: `1px solid ${offer.color}25`,
                }}
              >
                <offer.icon className="w-7 h-7" style={{ color: offer.color }} />
              </div>

              {/* Title & desc */}
              <h3
                className="relative text-white font-bold text-xl mb-3"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {offer.title}
              </h3>
              <p
                className="relative text-slate-400 text-sm leading-relaxed mb-6"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {offer.description}
              </p>

              {/* Features */}
              <ul className="relative space-y-2 mb-8">
                {offer.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-300" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: offer.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href={offer.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-medium text-sm transition-all duration-300"
                style={{
                  background: `${offer.color}15`,
                  border: `1px solid ${offer.color}25`,
                  color: offer.color,
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                {offer.cta}
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
