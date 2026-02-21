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
  ArrowRight,
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
    { label: "USA", href: "/college-list/US", flag: "/images/flags/us.png" },
    {
      label: "Canada",
      href: "/college-list/CA",
      flag: "/images/flags/canada.png",
    },
    {
      label: "UK",
      href: "/college-list/UK",
      flag: "/images/flags/united-kingdom.png",
    },
    {
      label: "Germany",
      href: "/college-list/DE",
      flag: "/images/flags/germany.png",
    },
    {
      label: "Australia",
      href: "/college-list/AU",
      flag: "/images/flags/australia.png",
    },
    {
      label: "Ireland",
      href: "/college-list/IE",
      flag: "/images/flags/ireland.png",
    },
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
    <footer className="relative overflow-hidden border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center shadow-sm">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span
                className="text-xl font-bold bg-gradient-to-r from-sky-500 to-purple-500 bg-clip-text text-transparent"
                style={{ fontFamily: "Arial" }}
              >
                KlassFin
              </span>
            </Link>

            <p
              className="mt-5 max-w-sm text-sm leading-relaxed text-slate-700 dark:text-slate-400"
              style={{ fontFamily: "Arial" }}
            >
              KlassFin is a leading-edge company operating at the intersection
              of education and finance technologies, providing comprehensive and
              professional assistance to students seeking to pursue higher
              education opportunities abroad.
            </p>

            {/* Socials */}
            <div className="mt-7 flex items-center gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -2, scale: 1.06 }}
                  className="
                    w-10 h-10 rounded-2xl flex items-center justify-center
                    border border-black/5 bg-white/60 text-slate-600
                    hover:text-sky-600 hover:border-sky-400/40
                    dark:border-white/10 dark:bg-white/5 dark:text-slate-300
                    dark:hover:text-sky-300 dark:hover:border-sky-300/40
                    backdrop-blur transition-colors
                  "
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links (Company) */}
          <div className="lg:col-span-2">
            <h3
              className="text-sm font-semibold tracking-wide text-slate-900 dark:text-white"
              style={{ fontFamily: "Arial" }}
            >
              Quick Links
            </h3>
            <ul className="mt-5 space-y-1">
              {footerLinks.Company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300 transition-colors"
                    style={{ fontFamily: "Arial" }}
                  >
                    {link.label}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h3
              className="text-sm font-semibold tracking-wide text-slate-900 dark:text-white"
              style={{ fontFamily: "Arial" }}
            >
              Legal
            </h3>
            <ul className="mt-5 space-y-1">
              {footerLinks.Legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300 transition-colors"
                    style={{ fontFamily: "Arial" }}
                  >
                    {link.label}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Countries */}
          <div className="lg:col-span-2">
            <h3
              className="text-sm font-semibold tracking-wide text-slate-900 dark:text-white"
              style={{ fontFamily: "Arial" }}
            >
              Countries
            </h3>
            <ul className="mt-3 space-y-1">
              {footerLinks.Countries.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-3 text-sm text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300 transition-colors"
                    style={{ fontFamily: "Arial" }}
                  >
                    {/* FLAG PNG */}
                    <img
                      src={link.flag}
                      alt={`${link.label} flag`}
                      className="h-5 w-5 rounded-sm object-cover ring-1 ring-black/10 dark:ring-white/10"
                      loading="lazy"
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3
              className="text-sm font-semibold tracking-wide text-slate-900 dark:text-white"
              style={{ fontFamily: "Arial" }}
            >
              Contact Us
            </h3>

            <div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sky-500" />
                <span style={{ fontFamily: "Arial" }}>+91-76782-50373</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sky-500" />
                <span style={{ fontFamily: "Arial" }}>
                  contact@klassfin.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-sky-500" />
                <span style={{ fontFamily: "Arial" }}>
                  India (Serving students worldwide)
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center overflow-hidden rounded-2xl border border-black/10 bg-white/60 backdrop-blur dark:border-white/10 dark:bg-white/5">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none dark:text-slate-200 dark:placeholder:text-slate-400"
                style={{ fontFamily: "Arial" }}
              />
              <button
                type="button"
                className="shrink-0 px-4 py-3 bg-gradient-to-r from-sky-500 to-purple-500 text-white"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-sky-400/25 to-transparent" />

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
          <p
            className="text-center sm:col-start-2 sm:justify-self-center text-sm text-slate-600 dark:text-slate-300"
            style={{ fontFamily: "Arial" }}
          >
            © 2026 KlassFin Pvt Ltd. All rights reserved
          </p>

          <div className="flex items-center justify-center sm:justify-self-end gap-2">
            <span
              className="text-sm text-slate-600 dark:text-slate-300"
              style={{ fontFamily: "Arial" }}
            >
              Live
            </span>
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}
