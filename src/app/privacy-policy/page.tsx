"use client";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Bell, Mail, ArrowRight } from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: `We collect information you provide directly to us, including:
    
• Personal identification information (name, email, phone number)
• Academic information (course, university, country of study)
• Financial information (loan requirement, income details)
• Communication data when you contact us or use our AI assistant

We also automatically collect certain information when you use our platform, including device information, IP address, browser type, and usage analytics to improve our services.`,
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: `KlassFin uses collected information for the following purposes:

• To provide and improve our education loan assistance services
• To connect you with appropriate bank partners and lenders
• To send service-related communications and updates
• To personalize your experience and recommendations
• To comply with legal obligations and prevent fraud
• To analyze and improve our platform performance

We use AI technology to provide intelligent loan recommendations, and your data may be processed to generate these insights.`,
  },
  {
    icon: Lock,
    title: "Data Security",
    content: `We implement industry-standard security measures to protect your personal information:

• SSL/TLS encryption for all data transmission
• Secure cloud infrastructure with regular security audits
• Access controls limiting who can view your personal data
• Regular security assessments and penetration testing

However, no internet transmission is 100% secure. We strive to protect your data but cannot guarantee absolute security.`,
  },
  {
    icon: Shield,
    title: "Information Sharing",
    content: `We do not sell, trade, or rent your personal information. We may share information with:

• Bank partners and lenders (only with your explicit consent)
• Service providers who assist our operations under strict confidentiality
• Legal authorities when required by law or to protect rights

All third-party partners are required to maintain confidentiality and use your data only for the specified purpose.`,
  },
  {
    icon: Bell,
    title: "Cookies & Tracking",
    content: `Our website uses cookies and similar technologies to:

• Remember your preferences and settings
• Analyze website traffic and usage patterns
• Provide personalized content and recommendations
• Improve website functionality

You can control cookie settings through your browser. Disabling cookies may affect website functionality.`,
  },
  {
    icon: Mail,
    title: "Your Rights",
    content: `You have the following rights regarding your personal data:

• Access: Request a copy of your personal data
• Correction: Request correction of inaccurate data
• Deletion: Request deletion of your personal data
• Portability: Request data in a portable format
• Opt-out: Unsubscribe from marketing communications

To exercise these rights, contact us at contact@klassfin.com`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-400/15 border border-sky-400/25 mb-6 mx-auto">
            <Shield className="w-8 h-8 text-sky-400" />
          </div>
          <h1
            className="font-display text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            <span className="text-white">Privacy </span>
            <span className="gradient-text">Policy</span>
          </h1>
          <p
            className="text-slate-400 max-w-xl mx-auto mb-4"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            We take your privacy seriously. This policy explains how KlassFin collects, uses, and protects your information.
          </p>
          <span
            className="text-slate-500 text-sm font-mono"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Last updated: January 1, 2024
          </span>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 mb-8 border border-sky-400/15"
        >
          <p
            className="text-slate-300 leading-relaxed"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            KlassFin Pvt Ltd (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy applies to our website klassfin.com and all related services. By using our services, you agree to the collection and use of information as described in this policy.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-400/15 border border-sky-400/25 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-sky-400" />
                </div>
                <h2
                  className="text-white font-semibold text-lg"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {section.title}
                </h2>
              </div>
              <div
                className="text-slate-400 text-sm leading-relaxed whitespace-pre-line"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 glass rounded-2xl p-6 text-center border border-purple-400/15"
        >
          <h3 className="text-white font-semibold mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
            Questions about Privacy?
          </h3>
          <p className="text-slate-400 text-sm mb-4" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Contact our privacy team at{" "}
            <a href="mailto:contact@klassfin.com" className="text-sky-400 hover:underline">
              contact@klassfin.com
            </a>{" "}
            or call{" "}
            <a href="tel:+917678250373" className="text-sky-400 hover:underline">
              +91-76782-50373
            </a>
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            className="btn-outline text-sm"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
