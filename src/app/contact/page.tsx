"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle, Loader2, Clock, MessageSquare } from "lucide-react";

const countries = [
  "USA", "UK", "Canada", "Germany", "Australia", "Ireland",
  "France", "Italy", "New Zealand", "Singapore", "Other"
];

const loanAmounts = [
  "Up to ₹20 Lakhs",
  "₹20-50 Lakhs",
  "₹50 Lakhs - ₹1 Crore",
  "₹1 Crore+",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", country: "", loanAmount: "", message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));
    setStatus("success");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Background */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-sky-400 text-sm font-mono tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full border border-sky-400/20 glass"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Get In Touch
          </span>
          <h1
            className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            <span className="text-white">Request Free </span>
            <span className="gradient-text">Consultation</span>
          </h1>
          <p
            className="text-slate-400 max-w-xl mx-auto"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Fill in the form and our expert counselor will call you back within 24 hours.
            100% free, no obligations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact cards */}
            {[
              { icon: Phone, title: "Call Us", value: "+91-76782-50373", href: "tel:+917678250373", color: "#38BDF8" },
              { icon: Mail, title: "Email Us", value: "contact@klassfin.com", href: "mailto:contact@klassfin.com", color: "#A78BFA" },
              { icon: Clock, title: "Working Hours", value: "Mon–Sat, 9 AM – 7 PM", href: null, color: "#60E9FF" },
              { icon: MessageSquare, title: "WhatsApp", value: "+91-76782-50373", href: "https://wa.me/917678250373", color: "#25D366" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 4 }}
                className="glass rounded-2xl p-5 flex items-center gap-4 card-hover"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <div className="text-slate-400 text-xs mb-1" style={{ fontFamily: "DM Sans, sans-serif" }}>{item.title}</div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white font-medium hover:text-sky-400 transition-colors text-sm"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-white font-medium text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>
                      {item.value}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Why contact us */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-white font-semibold mb-4" style={{ fontFamily: "Syne, sans-serif" }}>
                What happens next?
              </h3>
              {[
                "Our counselor calls within 24 hours",
                "Free assessment of your loan needs",
                "Compare offers from 15+ lenders",
                "Get the best deal with guidance",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full bg-sky-400/15 border border-sky-400/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sky-400 text-xs font-mono">{i + 1}</span>
                  </div>
                  <span className="text-slate-400 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {step}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 rounded-full bg-green-400/15 border border-green-400/30 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </motion.div>
                <h2 className="text-white font-bold text-2xl mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
                  Request Submitted! 🎉
                </h2>
                <p className="text-slate-400" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Our expert counselor will call you back within 24 hours. 
                  Meanwhile, you can also reach us at{" "}
                  <a href="tel:+917678250373" className="text-sky-400">+91-76782-50373</a>
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-5">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2" style={{ fontFamily: "DM Sans, sans-serif" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="input-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2" style={{ fontFamily: "DM Sans, sans-serif" }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="input-brand"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-slate-400 text-sm mb-2" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="input-brand"
                  />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2" style={{ fontFamily: "DM Sans, sans-serif" }}>
                      Country of Study *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="input-brand"
                    >
                      <option value="">Select country</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2" style={{ fontFamily: "DM Sans, sans-serif" }}>
                      Loan Amount Required
                    </label>
                    <select
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleChange}
                      className="input-brand"
                    >
                      <option value="">Select amount</option>
                      {loanAmounts.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-slate-400 text-sm mb-2" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    Additional Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your course, university, and any specific requirements..."
                    className="input-brand resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full justify-center py-4 text-base"
                >
                  <span className="flex items-center gap-2">
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        Request Free Consultation <Send className="w-5 h-5" />
                      </>
                    )}
                  </span>
                </motion.button>

                <p className="text-slate-500 text-xs text-center" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  By submitting, you agree to our Privacy Policy. We never share your data.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
