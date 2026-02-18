"use client";

import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Star,
  TrendingUp,
  Shield,
  BarChart3,
  Clock,
  BadgeCheck,
  FileText,
  Bot,
  Wand2,
} from "lucide-react";
const THEME = {
  sky: "#38BDF8",
  sky2: "#60E9FF",
  purple: "#A78BFA",
  purple2: "#C4B5FD",
};
const floatingElements = [
  { color: THEME.sky, size: 8, x: "10%", y: "20%", delay: 0 },
  { color: THEME.purple, size: 6, x: "85%", y: "15%", delay: 1 },
  { color: THEME.sky, size: 4, x: "70%", y: "70%", delay: 2 },
  { color: THEME.purple, size: 10, x: "15%", y: "75%", delay: 0.5 },
  { color: THEME.sky2, size: 5, x: "50%", y: "10%", delay: 1.5 },
  { color: THEME.purple2, size: 7, x: "90%", y: "55%", delay: 0.8 },
];

const stats = [
  { value: "5000+", label: "Students Helped", icon: Star },
  { value: "₹500Cr+", label: "Loans Disbursed", icon: TrendingUp },
  { value: "15+", label: "Partner Banks", icon: Shield },
  { value: "100%", label: "Free Service", icon: Sparkles },
];
const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

function formatNumber(n: number, digits = 0) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(n);
}

function buildPath(values: number[], w: number, h: number, pad = 10) {
  if (values.length < 2) return "";
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const range = Math.max(1e-6, maxV - minV);

  const step = (w - pad * 2) / (values.length - 1);
  const pts = values.map((v, i) => {
    const x = pad + i * step;
    const t = (v - minV) / range;
    const y = pad + (1 - t) * (h - pad * 2);
    return { x, y };
  });

  return pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
}

function buildArea(values: number[], w: number, h: number, pad = 10) {
  if (values.length < 2) return "";
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const range = Math.max(1e-6, maxV - minV);

  const step = (w - pad * 2) / (values.length - 1);
  const pts = values.map((v, i) => {
    const x = pad + i * step;
    const t = (v - minV) / range;
    const y = pad + (1 - t) * (h - pad * 2);
    return { x, y };
  });

  const top = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  const first = pts[0]!;
  const last = pts[pts.length - 1]!;
  return `${top} L ${last.x.toFixed(2)} ${(h - pad).toFixed(2)} L ${first.x.toFixed(
    2,
  )} ${(h - pad).toFixed(2)} Z`;
}

/* ===================== HOOKS ===================== */
function useParticlesCanvas(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    const colors = [THEME.sky, THEME.purple, THEME.sky2, THEME.purple2];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
      color: string;
    }> = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.12,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let raf = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color +
          Math.floor(p.alpha * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();
      });

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56,189,248,${(1 - dist / 120) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", setSize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setSize);
    };
  }, [canvasRef, reduce]);
}

function useLiveSeries(length = 28) {
  const reduce = useReducedMotion();

  const [series, setSeries] = useState<number[]>(() => {
    const arr: number[] = [];
    let v = 62;
    for (let i = 0; i < length; i++) {
      v = clamp(v + (Math.random() - 0.5) * 4, 40, 92);
      arr.push(v);
    }
    return arr;
  });

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setSeries((prev) => {
        const next = prev.slice(1);
        const cur = prev[prev.length - 1] ?? 62;
        const drift = (Math.random() - 0.5) * 5.2;
        const pull = (62 - cur) * 0.04;
        next.push(clamp(cur + drift + pull, 40, 92));
        return next;
      });
    }, 1200);

    return () => clearInterval(t);
  }, [reduce]);

  return series;
}

function getMetrics(last: number) {
  const approvalScore = clamp(55 + (last - 55) * 1.1, 35, 92);
  const avgRate = clamp(13.8 - (last - 50) * 0.08, 8.2, 14.9);
  const etaHrs = clamp(10.5 - (last - 50) * 0.15, 2.5, 14.0);
  const docCompletion = clamp(40 + (last - 45) * 1.25, 30, 98);
  const activeOffers = Math.round(clamp(10 + (last - 45) * 0.22, 6, 22));

  return { approvalScore, avgRate, etaHrs, docCompletion, activeOffers };
}

function useAIInsights(metrics: ReturnType<typeof getMetrics>) {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  const insights = useMemo(() => {
    const { approvalScore, docCompletion, avgRate, etaHrs, activeOffers } =
      metrics;

    const risk =
      approvalScore >= 75 ? "Low" : approvalScore >= 55 ? "Medium" : "High";

    const nextDoc =
      docCompletion < 60
        ? "Upload income proof + admission docs to improve eligibility match."
        : docCompletion < 80
          ? "Complete remaining checklist to unlock better offers."
          : "Docs look strong — proceed to lender submission.";

    const rateHint =
      avgRate <= 10.5
        ? "Great rate band detected — keep profile consistent for approval."
        : avgRate <= 12.5
          ? "Decent rate band — improving co-applicant profile may reduce rate."
          : "Rate band is higher — add collateral/co-applicant for better terms.";

    const etaHint =
      etaHrs <= 6
        ? "Fast approvals likely — submit during working hours for best speed."
        : "Approval time normal — ensure docs are clean to avoid delays.";

    return [
      {
        title: "AI Recommendation",
        text: nextDoc,
        confidence: clamp(72 + (docCompletion - 50) * 0.25, 60, 92),
      },
      {
        title: "AI Risk Signal",
        text: `Risk Level: ${risk}. Active offers: ${activeOffers}.`,
        confidence: clamp(68 + (approvalScore - 50) * 0.35, 55, 95),
      },
      {
        title: "AI Rate Optimizer",
        text: rateHint,
        confidence: clamp(66 + (12.5 - avgRate) * 3.5, 55, 94),
      },
      {
        title: "AI Timeline Predictor",
        text: etaHint,
        confidence: clamp(64 + (10 - etaHrs) * 2.2, 55, 92),
      },
    ];
  }, [metrics]);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % insights.length), 3500);
    return () => clearInterval(t);
  }, [insights.length, reduce]);

  return insights[idx]!;
}

/* ===================== RIGHT DASHBOARD (COMPACT DEFAULT) ===================== */
function LiveEducationDashboard({ compact = true }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  const series = useLiveSeries(28);

  const last = series[series.length - 1] ?? 62;
  const metrics = useMemo(() => getMetrics(last), [last]);
  const ai = useAIInsights(metrics);

  // live clock
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeText = useMemo(() => {
    try {
      return now.toLocaleString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return now.toString();
    }
  }, [now]);

  // compact tokens (smaller UI)
  const pad = compact ? "p-4 sm:p-5" : "p-5 sm:p-6";
  const tilePad = compact ? "p-3.5" : "p-4";
  const chartH = compact ? "h-[112px]" : "h-[140px]";
  const chartBoxPad = compact ? "px-4 pb-4 pt-2.5" : "px-4 pb-5 pt-3";
  const bottomCardPad = compact ? "p-4" : "p-5";

  const w = 560;
  const h = compact ? 145 : 160;

  const lineD = useMemo(() => buildPath(series, w, h, 12), [series, h]);
  const areaD = useMemo(() => buildArea(series, w, h, 12), [series, h]);

  const lastDot = useMemo(() => {
    const pad = 12;
    const minV = Math.min(...series);
    const maxV = Math.max(...series);
    const range = Math.max(1e-6, maxV - minV);
    const step = (w - pad * 2) / (series.length - 1);
    const i = series.length - 1;
    const v = series[i] ?? 62;
    const x = pad + i * step;
    const t = (v - minV) / range;
    const y = pad + (1 - t) * (h - pad * 2);
    return { x, y };
  }, [series, h]);

  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-r from-sky-500/20 via-purple-400/15 to-transparent blur-[80px]" />

      <div
        className="relative rounded-[32px] overflow-hidden
             border border-sky-500/15 dark:border-white/10
             bg-white/60 dark:bg-white/5 backdrop-blur-2xl
             shadow-[0_25px_70px_rgba(0,0,0,0.12)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.55)]
             [&_.text-slate-500]:text-slate-900
             [&_.text-slate-600]:text-slate-900
             dark:[&_.text-slate-500]:text-white/80
             dark:[&_.text-slate-600]:text-white/70"
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(56,189,248,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(65%_55%_at_10%_0%,rgba(167,139,250,0.14),transparent_60%)]" />

        <div className={`relative ${pad}`}>
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <div>
                <div className="text-base font-semibold text-slate-900 dark:text-white">
                  KlassFin Live Dashboard
                </div>
                <div className="text-xs text-slate-500 dark:text-white/55">
                  Updated:{" "}
                  <span className="font-bold text-slate-900 dark:text-white">
                    {timeText}
                  </span>
                </div>
              </div>
            </div>

            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs
                         border border-sky-500/15 dark:border-white/12
                         bg-white/50 dark:bg-white/6
                         text-slate-700 dark:text-white/75"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Realtime
            </span>
          </div>

          {/* AI Insight (NEW) */}
          <div
            className={`mt-4 rounded-2xl border border-sky-500/12 dark:border-white/10
                        bg-white/55 dark:bg-white/6 ${compact ? "p-3.5" : "p-4"}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/15 flex items-center justify-center">
                  <Bot className="w-4.5 h-4.5 text-sky-500" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    {ai.title}
                    <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-500/15">
                      <Wand2 className="w-3 h-3" /> AI
                    </span>
                  </div>
                  <motion.div
                    key={ai.text}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-xs text-slate-600 dark:text-white/70 mt-1 leading-relaxed"
                  >
                    {ai.text}
                  </motion.div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] text-slate-500 dark:text-white/55">
                  Confidence
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  {formatNumber(ai.confidence, 0)}%
                </div>
              </div>
            </div>

            <div className="mt-3 h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-purple-400"
                initial={{ width: "30%" }}
                animate={{ width: `${ai.confidence}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>

          {/* Top tiles */}
          <div className="mt-4 grid sm:grid-cols-2 gap-3.5">
            <div
              className={`rounded-2xl border border-sky-500/10 dark:border-white/10 bg-white/60 dark:bg-white/6 ${tilePad}`}
            >
              <div className="text-xs text-slate-500 dark:text-white/55 flex items-center gap-2">
                <BadgeCheck className="w-3.5 h-3.5 text-sky-500" />
                Approval Score
              </div>
              <div className="mt-1 text-slate-900 dark:text-white text-lg font-semibold">
                {formatNumber(metrics.approvalScore, 0)}%
                <span className="ml-2 text-xs text-slate-500 dark:text-white/55">
                  (profile fit)
                </span>
              </div>
            </div>

            <div
              className={`rounded-2xl border border-sky-500/10 dark:border-white/10 bg-white/60 dark:bg-white/6 ${tilePad}`}
            >
              <div className="text-xs text-slate-500 dark:text-white/55 flex items-center gap-2">
                <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
                Avg Rate Range
              </div>
              <div className="mt-1 text-slate-900 dark:text-white text-lg font-semibold">
                {formatNumber(metrics.avgRate, 1)}%
                <span className="ml-2 text-xs text-slate-500 dark:text-white/55">
                  (indicative)
                </span>
              </div>
            </div>

            <div
              className={`rounded-2xl border border-sky-500/10 dark:border-white/10 bg-white/60 dark:bg-white/6 ${tilePad}`}
            >
              <div className="text-xs text-slate-500 dark:text-white/55 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-sky-500" />
                Approval ETA
              </div>
              <div className="mt-1 text-slate-900 dark:text-white text-lg font-semibold">
                {formatNumber(metrics.etaHrs, 1)} hrs
                <span className="ml-2 text-xs text-slate-500 dark:text-white/55">
                  (avg)
                </span>
              </div>
            </div>

            <div
              className={`rounded-2xl border border-sky-500/10 dark:border-white/10 bg-white/60 dark:bg-white/6 ${tilePad}`}
            >
              <div className="text-xs text-slate-500 dark:text-white/55 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                Docs Completion
              </div>
              <div className="mt-1 text-slate-900 dark:text-white text-lg font-semibold">
                {formatNumber(metrics.docCompletion, 0)}%
                <span className="ml-2 text-xs text-slate-500 dark:text-white/55">
                  ({metrics.activeOffers} active offers)
                </span>
              </div>
            </div>
          </div>

          {/* Chart Panel */}
          <div className="mt-4 rounded-2xl border border-sky-500/10 dark:border-white/10 bg-white/55 dark:bg-black/20 overflow-hidden">
            <div className="px-4 pt-4 flex items-center justify-between">
              <div className="text-slate-900 dark:text-white font-semibold">
                Offer Strength Trend
              </div>
              <div className="text-xs text-slate-500 dark:text-white/55">
                Live signals
              </div>
            </div>

            <div className={`relative ${chartBoxPad}`}>
              <div
                className="absolute inset-x-4 top-3 bottom-4 rounded-2xl
                           bg-[linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)]
                           dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]"
                style={{ backgroundSize: "48px 48px" }}
              />

              <svg
                viewBox={`0 0 ${w} ${h}`}
                className={`relative w-full ${chartH}`}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="lineGradSky" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(56,189,248,1)" />
                    <stop offset="55%" stopColor="rgba(167,139,250,1)" />
                    <stop offset="100%" stopColor="rgba(196,181,253,1)" />
                  </linearGradient>

                  <linearGradient id="fillGradSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(56,189,248,0.16)" />
                    <stop offset="100%" stopColor="rgba(56,189,248,0)" />
                  </linearGradient>
                </defs>

                <motion.path
                  d={areaD}
                  fill="url(#fillGradSky)"
                  animate={reduce ? {} : { opacity: [0.85, 1, 0.85] }}
                  transition={
                    reduce
                      ? {}
                      : { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }
                />

                <motion.path
                  d={lineD}
                  fill="none"
                  stroke="url(#lineGradSky)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  transition={{ duration: 0.55, ease: "easeOut" }}
                />

                <motion.circle
                  cx={lastDot.x}
                  cy={lastDot.y}
                  r="5"
                  fill="rgba(56,189,248,1)"
                  animate={
                    reduce ? {} : { r: [5, 7, 5], opacity: [0.75, 1, 0.75] }
                  }
                  transition={
                    reduce
                      ? {}
                      : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                  }
                />
              </svg>

              <div className="mt-3 flex flex-wrap gap-2">
                {["Eligibility", "Rates", "Docs", "Timeline"].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-full text-xs
                               border border-sky-500/10 dark:border-white/10
                               bg-white/55 dark:bg-white/6
                               text-slate-700 dark:text-white/75"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-600 dark:text-white/60">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Offers stable
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Rate checks active
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  Doc validation on
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Cards (still there, compact) */}
          <div className="mt-4 grid sm:grid-cols-2 gap-3.5">
            <div
              className={`rounded-2xl border border-sky-500/10 dark:border-white/10 bg-white/60 dark:bg-white/6 ${bottomCardPad}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/15 flex items-center justify-center">
                  <BadgeCheck className="w-4.5 h-4.5 text-sky-500" />
                </span>
                <div>
                  <div className="text-slate-900 dark:text-white font-semibold">
                    Profile Fit
                  </div>
                  <div className="text-sm text-slate-600 dark:text-white/60">
                    Best lender match & terms
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`rounded-2xl border border-sky-500/10 dark:border-white/10 bg-white/60 dark:bg-white/6 ${bottomCardPad}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-purple-400/10 border border-purple-400/15 flex items-center justify-center">
                  <FileText className="w-4.5 h-4.5 text-purple-400" />
                </span>
                <div>
                  <div className="text-slate-900 dark:text-white font-semibold">
                    Documents
                  </div>
                  <div className="text-sm text-slate-600 dark:text-white/60">
                    Checklist, review, submission
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== MAIN HERO ===================== */
export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticlesCanvas(canvasRef);

  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />
      <div className="absolute inset-0 hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#05060F] dark:via-[#070816] dark:to-[#05060F]" />
      <div className="absolute inset-0 hidden opacity-30 dark:opacity-40 bg-[radial-gradient(60%_50%_at_50%_10%,rgba(56,189,248,0.18),transparent_70%)]" />
      <div className="absolute hidden top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[520px] rounded-full bg-sky-400/10 blur-[120px]" />
      <div className="absolute hidden bottom-1/4 right-1/4 w-[420px] h-[320px] rounded-full bg-purple-400/10 blur-[90px]" />

      {/* Floating dots */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: el.size,
            height: el.size,
            background: el.color,
            left: el.x,
            top: el.y,
            boxShadow: `0 0 ${el.size * 3}px ${el.color}`,
          }}
          animate={reduce ? {} : { y: [0, -20, 0], opacity: [0.35, 0.8, 0.35] }}
          transition={
            reduce ? {} : { duration: 4 + i, repeat: Infinity, delay: el.delay }
          }
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: SAME content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-7 border border-sky-400/20 bg-white/60 dark:bg-white/5 backdrop-blur-xl"
            >
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span
                className="text-sm text-slate-700 dark:text-white/80"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                India&apos;s #Top Education Loan Marketplace
              </span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.02] mb-5 text-slate-900 dark:text-white"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <span>Fund Your</span>
              <br />
              <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
                Dream
              </span>
              <br />
              <span>Abroad</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-slate-600 dark:text-white/70 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Get The Best Education Loan For Abroad Studies With{" "}
              <span className="text-sky-500 dark:text-sky-300 font-semibold">
                KlassFin
              </span>
              . Compare offers from top banks &amp; NBFCs and secure your future
              today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <motion.a
                href="/contact"
                whileHover={reduce ? {} : { scale: 1.04, y: -2 }}
                whileTap={reduce ? {} : { scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold
                           bg-gradient-to-r from-sky-500 to-purple-500 shadow-[0_18px_55px_rgba(56,189,248,0.20)]
                           hover:opacity-95 transition"
              >
                Get Free Consultation <ArrowRight className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="/loan-calculator"
                whileHover={reduce ? {} : { scale: 1.04, y: -2 }}
                whileTap={reduce ? {} : { scale: 0.96 }}
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold
                           border border-sky-400/20 bg-white/60 dark:bg-white/5 backdrop-blur-xl
                           text-slate-800 dark:text-white/85 hover:bg-white/80 dark:hover:bg-white/7 transition"
              >
                Check Eligibility
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto lg:mx-0"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.1 }}
                  whileHover={reduce ? {} : { y: -4, scale: 1.02 }}
                  className="rounded-2xl p-4 border border-sky-400/15 bg-white/60 dark:bg-white/5 backdrop-blur-xl"
                >
                  <stat.icon className="w-5 h-5 text-sky-500 dark:text-sky-300 mx-auto lg:mx-0 mb-2" />
                  <div
                    className="text-xl font-extrabold bg-gradient-to-r from-sky-500 to-purple-400 bg-clip-text text-transparent"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-slate-600 dark:text-white/60 text-xs mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Compact + scaled down for desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative w-full mx-auto lg:justify-self-end"
          >
            {/* ✅ This makes it smaller like your second screenshot */}
            <div className="origin-top-right lg:scale-[0.66] xl:scale-[0.78] 2xl:scale-[0.82]">
              <div className="max-w-[560px]">
                <LiveEducationDashboard compact />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
