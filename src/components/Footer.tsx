"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ArrowUpRight,
} from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "AI Assistant", href: "/ai-chatbot" },
    { label: "Loan Calculator", href: "/loan-calculator" },
    { label: "College List", href: "/college-list" },
    { label: "Blogs", href: "/blogs" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
  Countries: [
    { label: "🇺🇸 USA", href: "/college-list/US" },
    { label: "🇨🇦 Canada", href: "/college-list/CA" },
    { label: "🇬🇧 UK", href: "/college-list/UK" },
    { label: "🇩🇪 Germany", href: "/college-list/DE" },
    { label: "🇦🇺 Australia", href: "/college-list/AU" },
    { label: "🇮🇪 Ireland", href: "/college-list/IE" },
  ],
};

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[var(--card)] text-[color:var(--text)] border-t border-[color:var(--border)] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-400/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 py-6">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span
                className="font-display font-bold text-xl gradient-text"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                KlassFin
              </span>
            </Link>
            <p
              className="text-[color:var(--muted)] text-sm leading-relaxed mb-4 max-w-xs"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              KlassFin is a leading-edge company operating at the intersection
              of education and finance technologies, providing comprehensive and
              professional assistance to students seeking to pursue higher
              education opportunities abroad.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <a
                href="tel:+917678250373"
                className="flex items-center gap-3 text-sm text-[color:var(--muted)] hover:text-[var(--sky)] transition-colors"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                +91-76782-50373
              </a>
              <a
                href="mailto:contact@klassfin.com"
                className="flex items-center gap-3 text-sm text-[color:var(--muted)] hover:text-[var(--sky)] transition-colors"
              >
                <Mail className="w-4 h-4 text-sky-400" />
                contact@klassfin.com
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" />
                India (Serving students worldwide)
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -2, scale: 1.1 }}
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-sky-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3
                className="text-[color:var(--heading)] font-semibold text-sm mb-4 uppercase tracking-wider"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[color:var(--muted)] hover:text-[var(--sky)] text-sm transition-colors ..."
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent my-4" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-slate-500 text-sm"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            © 2024 KlassFin Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-slate-500 text-sm">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
