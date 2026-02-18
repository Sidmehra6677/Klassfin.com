"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe2, GraduationCap, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

const countries = [
  { code: "US", name: "United States", flag: "🇺🇸", loanMax: "₹2 Crore", rate: "8.5%+", universities: 4500, popular: ["MIT", "Stanford", "Harvard", "NYU", "USC"] },
  { code: "CA", name: "Canada", flag: "🇨🇦", loanMax: "₹1.5 Crore", rate: "9%+", universities: 250, popular: ["UofT", "McGill", "UBC", "Waterloo", "McMaster"] },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧", loanMax: "₹1.5 Crore", rate: "9%+", universities: 165, popular: ["Oxford", "Cambridge", "Imperial", "UCL", "York"] },
  { code: "DE", name: "Germany", flag: "🇩🇪", loanMax: "₹1 Crore", rate: "10%+", universities: 400, popular: ["TU Munich", "LMU", "Heidelberg", "RWTH Aachen"] },
  { code: "AU", name: "Australia", flag: "🇦🇺", loanMax: "₹1.5 Crore", rate: "9.5%+", universities: 43, popular: ["Melbourne", "ANU", "USYD", "UNSW", "Monash"] },
  { code: "IE", name: "Ireland", flag: "🇮🇪", loanMax: "₹1 Crore", rate: "10%+", universities: 45, popular: ["Trinity College", "UCD", "Maynooth", "DCU"] },
  { code: "FR", name: "France", flag: "🇫🇷", loanMax: "₹75 Lakh", rate: "10.5%+", universities: 90, popular: ["Sciences Po", "HEC Paris", "Sorbonne"] },
  { code: "IT", name: "Italy", flag: "🇮🇹", loanMax: "₹75 Lakh", rate: "11%+", universities: 97, popular: ["Bocconi", "Politecnico Milano", "Bologna"] },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", loanMax: "₹75 Lakh", rate: "10.5%+", universities: 8, popular: ["Auckland", "Victoria", "Canterbury", "Otago"] },
  { code: "SG", name: "Singapore", flag: "🇸🇬", loanMax: "₹1 Crore", rate: "9.5%+", universities: 6, popular: ["NUS", "NTU", "SMU", "SUTD"] },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", loanMax: "₹50 Lakh", rate: "11%+", universities: 20, popular: ["UM", "UPM", "UTM", "Taylor's"] },
  { code: "HK", name: "Hong Kong", flag: "🇭🇰", loanMax: "₹75 Lakh", rate: "10%+", universities: 8, popular: ["HKU", "HKUST", "CUHK"] },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", loanMax: "₹75 Lakh", rate: "10.5%+", universities: 14, popular: ["TU Delft", "Erasmus", "UvA"] },
  { code: "SE", name: "Sweden", flag: "🇸🇪", loanMax: "₹75 Lakh", rate: "11%+", universities: 50, popular: ["KTH", "Uppsala", "Lund", "Stockholm"] },
  { code: "UAE", name: "UAE", flag: "🇦🇪", loanMax: "₹50 Lakh", rate: "11%+", universities: 30, popular: ["UAE University", "AUS", "Khalifa University"] },
];

export default function CollegeListPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  const selectedCountry = countries.find((c) => c.code === selected);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sky-400 text-sm font-mono tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full border border-sky-400/20 glass" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            Study Destinations
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-4" style={{ fontFamily: "Syne, sans-serif" }}>
            <span className="text-white">College List by </span>
            <span className="gradient-text">Country</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto mb-8" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Explore education loan options for universities across 15+ countries.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-brand pl-12 text-center"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            />
          </div>
        </motion.div>

        {/* Countries Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8"
        >
          {filtered.map((country, i) => (
            <motion.button
              key={country.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setSelected(selected === country.code ? null : country.code)}
              className={`glass rounded-2xl p-5 text-left card-hover relative overflow-hidden transition-all ${
                selected === country.code ? "border border-sky-400/40 bg-sky-400/5" : ""
              }`}
            >
              {/* Top line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400/0 via-sky-400/50 to-sky-400/0 opacity-0 group-hover:opacity-100" />

              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{country.flag}</span>
                <div>
                  <div className="text-white font-semibold text-sm" style={{ fontFamily: "Syne, sans-serif" }}>
                    {country.name}
                  </div>
                  <div className="text-slate-500 text-xs font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    {country.code}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="glass-light rounded-xl p-2">
                  <div className="text-sky-400 font-bold text-sm" style={{ fontFamily: "Syne, sans-serif" }}>
                    {country.loanMax}
                  </div>
                  <div className="text-slate-500 text-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>Max Loan</div>
                </div>
                <div className="glass-light rounded-xl p-2">
                  <div className="text-purple-400 font-bold text-sm" style={{ fontFamily: "Syne, sans-serif" }}>
                    {country.rate}
                  </div>
                  <div className="text-slate-500 text-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>Interest</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>
                <GraduationCap className="w-3 h-3" />
                {country.universities}+ Universities
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Expanded country detail */}
        <AnimatePresence>
          {selectedCountry && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass rounded-3xl p-8 mb-8 border border-sky-400/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">{selectedCountry.flag}</span>
                <div>
                  <h2 className="text-white font-bold text-2xl" style={{ fontFamily: "Syne, sans-serif" }}>
                    {selectedCountry.name}
                  </h2>
                  <p className="text-slate-400 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    Popular study destination for Indian students
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-slate-400 text-sm mb-3" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Popular Universities:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCountry.popular.map((uni) => (
                    <span
                      key={uni}
                      className="px-3 py-1.5 rounded-xl glass border border-sky-400/15 text-sky-400 text-sm"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {uni}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.03 }}
                  className="btn-primary text-sm"
                >
                  <span className="flex items-center gap-2">
                    Apply for {selectedCountry.name} Loan <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.a>
                <motion.a
                  href="/loan-calculator"
                  whileHover={{ scale: 1.03 }}
                  className="btn-outline text-sm"
                >
                  Calculate EMI
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 text-center border border-sky-400/15"
        >
          <Globe2 className="w-8 h-8 text-sky-400 mx-auto mb-3" />
          <h2 className="text-white font-bold text-2xl mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
            Your dream country isn&apos;t listed?
          </h2>
          <p className="text-slate-400 mb-6" style={{ fontFamily: "DM Sans, sans-serif" }}>
            We support even more countries. Contact us for a personalized consultation.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            className="btn-primary"
          >
            <span>Contact Us</span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
