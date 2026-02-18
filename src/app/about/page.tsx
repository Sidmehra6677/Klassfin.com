"use client";
import { motion } from "framer-motion";
import { Heart, Target, Lightbulb, Users, Award, Globe, ArrowRight } from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Heart,
    title: "Student First",
    desc: "Every decision we make puts the student's best interest at the center.",
    color: "#38BDF8",
  },
  {
    icon: Target,
    title: "Transparency",
    desc: "No hidden fees, no surprises. Complete clarity in everything we do.",
    color: "#A78BFA",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "Using AI and technology to simplify the complex loan process.",
    color: "#60E9FF",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Committed to delivering exceptional results for every student.",
    color: "#F59E0B",
  },
];

const team = [
  {
    name: "Girish Mishra",
    role: "Founder & Loan Specialist",
    bio: "With years of experience in education finance, Girish has personally helped 5000+ students secure their dream education loans.",
    color: "#38BDF8",
  },
];

const milestones = [
  { year: "2021", event: "KlassFin Founded", desc: "Started with a mission to democratize education finance." },
  { year: "2022", event: "1000 Students Helped", desc: "Crossed the milestone of helping 1000 students." },
  { year: "2023", event: "15+ Bank Partners", desc: "Expanded our lending network across top banks and NBFCs." },
  { year: "2024", event: "₹500Cr+ Disbursed", desc: "Crossed the ₹500 Crore mark in total loan disbursals." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sky-400/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-sky-400 text-sm font-mono tracking-[0.2em] uppercase mb-6 px-4 py-2 rounded-full border border-sky-400/20 glass"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl font-bold mb-6"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            <span className="text-white">About </span>
            <span className="gradient-text">KlassFin</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            KlassFin is a leading-edge company at the intersection of education and finance technology,
            providing comprehensive assistance to students seeking higher education opportunities abroad.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span
                className="inline-block text-purple-400 text-sm font-mono tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full border border-purple-400/20 glass"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Our Mission
              </span>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold mb-6 text-white"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Making World-Class Education{" "}
                <span className="gradient-text">Accessible</span>
              </h2>
              <p
                className="text-slate-400 leading-relaxed mb-6"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                We believe financial barriers should never stop a talented student from achieving their dreams.
                KlassFin was born to bridge this gap — connecting students with the right lenders, the right rates,
                and the right guidance — completely free of charge.
              </p>
              <p
                className="text-slate-400 leading-relaxed"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Our AI-powered platform compares loan offers across 15+ banks and NBFCs, ensuring every student
                gets the best deal possible. With a dedicated counselor for each student, we make the
                entire process smooth, fast, and stress-free.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Students Helped", value: "5000+" },
                { label: "Loans Disbursed", value: "₹500Cr+" },
                { label: "Bank Partners", value: "15+" },
                { label: "Countries Covered", value: "15+" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-6 text-center card-hover"
                >
                  <div
                    className="font-display text-3xl font-bold gradient-text mb-2"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-slate-400 text-sm"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 section-glow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="font-display text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <span className="text-white">Our </span>
              <span className="gradient-text">Core Values</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-6 text-center card-hover"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${val.color}15`, border: `1px solid ${val.color}25` }}
                >
                  <val.icon className="w-6 h-6" style={{ color: val.color }} />
                </div>
                <h3
                  className="text-white font-semibold mb-2"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {val.title}
                </h3>
                <p
                  className="text-slate-400 text-sm"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="font-display text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <span className="text-white">Our </span>
              <span className="gradient-text">Journey</span>
            </h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-sky-400/50 via-purple-400/30 to-transparent" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-8 items-start"
                >
                  <div className="flex-shrink-0 w-16 h-16 glass rounded-2xl flex items-center justify-center border border-sky-400/20">
                    <span
                      className="text-sky-400 font-mono text-sm font-bold"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {m.year}
                    </span>
                  </div>
                  <div className="flex-1 glass rounded-2xl p-4">
                    <h3
                      className="text-white font-semibold mb-1"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {m.event}
                    </h3>
                    <p
                      className="text-slate-400 text-sm"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {m.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-10 animated-border"
          >
            <h2
              className="font-display text-3xl font-bold mb-4 gradient-text"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Ready to Get Started?
            </h2>
            <p
              className="text-slate-400 mb-8"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Our team is ready to help you secure the best education loan.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex"
            >
              <span className="flex items-center gap-2">
                Contact Us Today <ArrowRight className="w-4 h-4" />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
