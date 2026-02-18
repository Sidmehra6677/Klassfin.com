"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Menu,
  X,
  ChevronDown,
  Bot,
  Calculator,
  Globe2,
  Phone,
  FileText,
  Info,
} from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "College List",
    href: "/college-list",
    icon: Globe2,
    submenu: [
      { label: "🇺🇸 USA", href: "/college-list/US" },
      { label: "🇨🇦 Canada", href: "/college-list/CA" },
      { label: "🇬🇧 UK", href: "/college-list/UK" },
      { label: "🇩🇪 Germany", href: "/college-list/DE" },
      { label: "🇦🇺 Australia", href: "/college-list/AU" },
      { label: "🇮🇪 Ireland", href: "/college-list/IE" },
      { label: "🇫🇷 France", href: "/college-list/FR" },
      { label: "🇮🇹 Italy", href: "/college-list/IT" },
    ],
  },
  { label: "Loan Calculator", href: "/loan-calculator", icon: Calculator },
  { label: "AI Assistant", href: "/ai-chatbot", icon: Bot },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Phone },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-lg shadow-black/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center glow-sky"
          >
            <GraduationCap className="w-6 h-6 text-white" />
          </motion.div>
          <span
            className="font-display font-bold text-xl gradient-text"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            KlassFin
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() =>
                link.submenu && setActiveDropdown(link.label)
              }
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  pathname === link.href
                    ? "text-sky-400 bg-sky-400/10"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {link.label}
                {link.submenu && (
                  <ChevronDown className="w-3 h-3 transition-transform duration-200" />
                )}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {link.submenu && activeDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 glass rounded-2xl p-2 shadow-2xl shadow-black/40"
                  >
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-sky-400/10 transition-all"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Right Side - ThemeToggle + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-sm"
          >
            <span className="flex items-center gap-2">
              Apply Now <FileText className="w-4 h-4" />
            </span>
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl glass"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-sky-400" />
            ) : (
              <Menu className="w-5 h-5 text-slate-300" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass border-t border-white/5"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      pathname === link.href
                        ? "text-sky-400 bg-sky-400/10"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href="/contact"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="btn-primary text-sm mt-2 justify-center"
                onClick={() => setMobileOpen(false)}
              >
                <span>Apply Now</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}