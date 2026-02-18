"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  IndianRupee,
  Users,
  CheckCircle2,
  Zap,
  Globe,
  HeartHandshake,
} from "lucide-react";

const features = [
  {
    icon: IndianRupee,
    title: "No Fees",
    description:
      "Absolutely free service to make your study abroad dream hassle-free.",
    color: "#38BDF8",
    gradient: "from-sky-400/20 to-sky-400/5",
  },
  {
    icon: CheckCircle2,
    title: "Assured Loan Approval",
    description:
      "Access lenders including top Banks and NBFCs. We maximize your approval chances.",
    color: "#A78BFA",
    gradient: "from-purple-400/20 to-purple-400/5",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Counselor",
    description:
      "Dedicated expert guides you from application to disbursal and beyond.",
    color: "#60E9FF",
    gradient: "from-cyan-400/20 to-cyan-400/5",
  },
  {
    icon: Zap,
    title: "Quick Processing",
    description:
      "Faster approvals with our streamlined digital process. Get funds in days, not weeks.",
    color: "#A78BFA",
    gradient: "from-purple-400/20 to-purple-400/5",
  },
  {
    icon: Globe,
    title: "15+ Countries",
    description:
      "Loans available for USA, UK, Canada, Germany, Australia, Ireland and more.",
    color: "#38BDF8",
    gradient: "from-sky-400/20 to-sky-400/5",
  },
  {
    icon: Users,
    title: "5000+ Students Helped",
    description:
      "Join thousands of students who turned their abroad study dreams into reality.",
    color: "#60E9FF",
    gradient: "from-cyan-400/20 to-cyan-400/5",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function WhyKlassFin() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative pt-20 pb-25 section-glow overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-400/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
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
            Why Choose Us
          </span>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-6"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            <span className="gradient-text">KlassFin?</span>
          </h2>
          <p
            className="#000-slate-400 max-w-xl mx-auto text-lg"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            We&apos;re not just a loan marketplace. We&apos;re your education
            finance partner.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              className={`glass rounded-2xl p-6 card-hover relative overflow-hidden group cursor-pointer`}
            >
              {/* Background gradient on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
              />

              {/* Icon */}
              <div
                className="relative w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{
                  background: `${feature.color}15`,
                  border: `1px solid ${feature.color}25`,
                }}
              >
                <feature.icon
                  className="w-6 h-6"
                  style={{ color: feature.color }}
                />
              </div>

              {/* Content */}
              <h3
                className="relative text-white font-semibold text-lg mb-3"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {feature.title}
              </h3>
              <p
                className="relative text-slate-400 text-sm leading-relaxed"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {feature.description}
              </p>

              {/* Number */}
              <span
                className="absolute top-4 right-4 font-mono text-5xl font-bold opacity-5 text-white"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              ></span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
