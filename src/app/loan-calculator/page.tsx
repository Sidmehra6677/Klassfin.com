"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, IndianRupee, TrendingDown, Calendar, ArrowRight, Info } from "lucide-react";

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(2500000); // ₹25L
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(120); // 10 years in months

  const results = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const n = tenure;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
      (Math.pow(1 + monthlyRate, n) - 1);

    const totalAmount = emi * n;
    const totalInterest = totalAmount - principal;

    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principalPercent: Math.round((principal / totalAmount) * 100),
    };
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-sky-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-sky-400 text-sm font-mono tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full border border-sky-400/20 glass"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            EMI Calculator
          </span>
          <h1
            className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            <span className="text-white">Loan </span>
            <span className="gradient-text">Calculator</span>
          </h1>
          <p
            className="text-slate-400 max-w-xl mx-auto"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Calculate your monthly EMI and plan your education loan repayment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-8 space-y-8"
          >
            {/* Loan Amount */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-slate-300 font-medium" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Loan Amount
                </label>
                <span className="gradient-text font-bold font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  {formatCurrency(loanAmount)}
                </span>
              </div>
              <input
                type="range"
                min="500000"
                max="20000000"
                step="100000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #38BDF8 ${((loanAmount - 500000) / (20000000 - 500000)) * 100}%, #1e293b ${((loanAmount - 500000) / (20000000 - 500000)) * 100}%)`,
                }}
              />
              <div className="flex justify-between mt-1 text-slate-500 text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                <span>₹5L</span><span>₹2Cr</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-slate-300 font-medium" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Interest Rate (p.a.)
                </label>
                <span className="gradient-text font-bold font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="16"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #A78BFA ${((interestRate - 8) / 8) * 100}%, #1e293b ${((interestRate - 8) / 8) * 100}%)`,
                }}
              />
              <div className="flex justify-between mt-1 text-slate-500 text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                <span>8%</span><span>16%</span>
              </div>
            </div>

            {/* Tenure */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-slate-300 font-medium" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Loan Tenure
                </label>
                <span className="gradient-text font-bold font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  {tenure / 12} years
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="180"
                step="12"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #38BDF8 ${((tenure - 12) / (180 - 12)) * 100}%, #1e293b ${((tenure - 12) / (180 - 12)) * 100}%)`,
                }}
              />
              <div className="flex justify-between mt-1 text-slate-500 text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                <span>1 yr</span><span>15 yrs</span>
              </div>
            </div>

            {/* Tax benefit note */}
            <div className="glass rounded-xl p-4 border border-sky-400/15 flex gap-3">
              <Info className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-400 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>
                <span className="text-sky-400 font-medium">Tax Benefit:</span> Interest paid is deductible under Section 80E of Income Tax Act — no upper limit!
              </p>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* EMI */}
            <motion.div
              key={results.emi}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="glass rounded-3xl p-8 text-center border border-sky-400/15 animated-border"
            >
              <p className="text-slate-400 text-sm mb-3" style={{ fontFamily: "DM Sans, sans-serif" }}>
                Monthly EMI
              </p>
              <div
                className="font-display text-5xl font-bold gradient-text mb-2"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {formatCurrency(results.emi)}
              </div>
              <p className="text-slate-500 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>
                Per month for {tenure / 12} years
              </p>
            </motion.div>

            {/* Breakdown cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Principal Amount", value: formatCurrency(loanAmount), color: "#38BDF8", icon: IndianRupee },
                { label: "Total Interest", value: formatCurrency(results.totalInterest), color: "#A78BFA", icon: TrendingDown },
                { label: "Total Payable", value: formatCurrency(results.totalAmount), color: "#60E9FF", icon: Calculator },
                { label: "Tenure", value: `${tenure / 12} Years`, color: "#F59E0B", icon: Calendar },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-4 card-hover"
                >
                  <item.icon className="w-4 h-4 mb-2" style={{ color: item.color }} />
                  <div
                    className="font-bold text-lg text-white"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {item.value}
                  </div>
                  <div
                    className="text-slate-400 text-xs mt-1"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="glass rounded-2xl p-5">
              <div className="flex justify-between mb-3 text-sm">
                <span className="text-sky-400" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Principal ({results.principalPercent}%)
                </span>
                <span className="text-purple-400" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Interest ({100 - results.principalPercent}%)
                </span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${results.principalPercent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-sky-400 to-purple-500 rounded-full"
                />
              </div>
            </div>

            {/* CTA */}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full justify-center py-4"
            >
              <span className="flex items-center gap-2">
                Apply for This Loan <ArrowRight className="w-5 h-5" />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
