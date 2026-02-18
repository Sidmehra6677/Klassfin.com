"use client";
import { motion } from "framer-motion";
import { FileText, Users, AlertTriangle, Scale, Gavel, MessageCircle } from "lucide-react";

const sections = [
  {
    icon: Users,
    title: "1. Acceptance of Terms",
    content: `By accessing or using KlassFin's website, mobile application, or any of our services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.

These terms apply to all users of the platform, including students, applicants, and visitors. KlassFin reserves the right to update these terms at any time, and continued use of the platform constitutes acceptance of any changes.`,
  },
  {
    icon: FileText,
    title: "2. Services Description",
    content: `KlassFin provides education loan facilitation services including:

• Loan comparison across multiple bank partners and NBFCs
• Loan application assistance and document guidance
• Personalized counseling for education loan requirements
• AI-powered loan eligibility assessment
• Refinancing assistance for existing education loans

Our services are advisory in nature. KlassFin is not a lender and does not guarantee loan approval. Loan approvals are solely at the discretion of the respective lending institutions.`,
  },
  {
    icon: AlertTriangle,
    title: "3. User Responsibilities",
    content: `As a user of KlassFin's services, you agree to:

• Provide accurate, complete, and truthful information in all applications and forms
• Not misrepresent your financial situation, academic credentials, or loan requirements
• Keep your account credentials confidential and not share with third parties
• Use our services only for lawful purposes
• Not attempt to interfere with or disrupt our platform's operations
• Notify us immediately of any unauthorized use of your account

Providing false information may result in immediate termination of services and may have legal consequences.`,
  },
  {
    icon: Scale,
    title: "4. Disclaimer of Warranties",
    content: `KlassFin's services are provided "as is" without warranties of any kind. We do not warrant that:

• Loan applications will be approved by any lender
• Interest rates or loan terms shown are guaranteed to all applicants
• The platform will be uninterrupted or error-free
• Information provided is always current, accurate, or complete

Interest rates and loan eligibility depend on individual applicant profiles, lender policies, and market conditions. KlassFin makes no guarantees regarding the final terms offered by lenders.`,
  },
  {
    icon: Gavel,
    title: "5. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, KlassFin shall not be liable for:

• Any indirect, incidental, or consequential damages arising from service use
• Loss of data, profits, or business opportunities
• Decisions made based on information provided on our platform
• Actions of third-party lenders or their decisions

Our total liability for any claims shall not exceed the amount paid for the specific service in question (KlassFin's services are free, hence our liability is nil for facilitation services).`,
  },
  {
    icon: MessageCircle,
    title: "6. Governing Law",
    content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms or your use of KlassFin's services shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.

If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect. These Terms constitute the entire agreement between you and KlassFin regarding the use of our services.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-sky-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-400/15 border border-purple-400/25 mb-6 mx-auto">
            <Gavel className="w-8 h-8 text-purple-400" />
          </div>
          <h1
            className="font-display text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            <span className="text-white">Terms & </span>
            <span className="gradient-text">Conditions</span>
          </h1>
          <p
            className="text-slate-400 max-w-xl mx-auto mb-4"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Please read these terms carefully before using KlassFin&apos;s services.
          </p>
          <span className="text-slate-500 text-sm font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            Last updated: January 1, 2024
          </span>
        </motion.div>

        {/* Important notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-5 mb-8 border border-yellow-400/20 flex gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-slate-300 text-sm leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
            <span className="text-yellow-400 font-medium">Important:</span> KlassFin is a loan facilitation marketplace and not a lender. All loan approvals are made by partner banks and NBFCs. KlassFin does not charge any fees from students.
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
                <div className="w-10 h-10 rounded-xl bg-purple-400/15 border border-purple-400/25 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-white font-semibold text-lg" style={{ fontFamily: "Syne, sans-serif" }}>
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

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 text-center"
        >
          <p className="text-slate-500 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>
            For any questions about these terms, contact us at{" "}
            <a href="mailto:contact@klassfin.com" className="text-sky-400 hover:underline">
              contact@klassfin.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
