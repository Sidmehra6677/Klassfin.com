"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
  type ReactNode,
} from "react";
import ParticleBackground from "@/components/ui/ParticleBackground";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  animate,
  useSpring,
} from "framer-motion";
import {
  Sparkles,
  Info,
  Download,
  ArrowRight,
  IndianRupee,
  TrendingDown,
  Calculator,
  Calendar,
  ChevronDown,
  Wand2,
  BarChart3,
} from "lucide-react";

type AiAdvice = { summary: string; bullets: string[] };

type ScheduleRow = {
  month: number;
  payment: number;
  interest: number;
  principalPaid: number;
  balance: number;
};

type Schedule = {
  emiExact: number;
  emi: number;
  totalInterest: number;
  totalPayable: number;
  monthsUsed: number;
  rows: ScheduleRow[];
};

function cx(...arr: Array<string | false | null | undefined>) {
  return arr.filter(Boolean).join(" ");
}

function calcEmi(P: number, annualRatePct: number, months: number) {
  const r = annualRatePct / 100 / 12;
  if (months <= 0) return 0;
  if (r === 0) return P / months;

  const pow = Math.pow(1 + r, months);
  return (P * r * pow) / (pow - 1);
}

function buildSchedule(opts: {
  principal: number;
  annualRatePct: number;
  months: number;
  extraMonthly: number;
}): Schedule {
  const r = opts.annualRatePct / 100 / 12;
  const emi = calcEmi(opts.principal, opts.annualRatePct, opts.months);

  let balance = opts.principal;
  let totalInterest = 0;

  const rows: ScheduleRow[] = [];

  for (let m = 1; m <= opts.months && balance > 0; m++) {
    const interest = r === 0 ? 0 : balance * r;

    let principalPaid = Math.max(0, emi - interest);
    if (opts.extraMonthly > 0) principalPaid += opts.extraMonthly;
    if (principalPaid > balance) principalPaid = balance;

    balance -= principalPaid;

    const payment = interest + principalPaid;
    totalInterest += interest;

    rows.push({
      month: m,
      payment,
      interest,
      principalPaid,
      balance: Math.max(0, balance),
    });
  }

  return {
    emiExact: emi,
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayable: Math.round(opts.principal + totalInterest),
    monthsUsed: rows.length,
    rows,
  };
}

function formatCurrency(val: number) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  return `₹${Math.round(val).toLocaleString("en-IN")}`;
}

function makeSparkPath(values: number[]) {
  if (!values.length) return "";

  const W = 160;
  const H = 44;
  const pad = 5;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);
  const step = (W - pad * 2) / Math.max(1, values.length - 1);

  const pts = values.map((v, i) => {
    const x = pad + i * step;
    const y = pad + (H - pad * 2) * (1 - (v - min) / range);
    return { x, y };
  });

  return pts.reduce(
    (d, p, i) => d + `${i === 0 ? "M" : "L"} ${p.x} ${p.y} `,
    "",
  );
}

function getSparkLastPoint(values: number[]) {
  if (!values.length) return { x: 0, y: 0 };

  const W = 160;
  const H = 44;
  const pad = 5;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);
  const step = (W - pad * 2) / Math.max(1, values.length - 1);

  const i = values.length - 1;
  const v = values[i];

  const x = pad + i * step;
  const y = pad + (H - pad * 2) * (1 - (v - min) / range);

  return { x, y };
}

function AnimatedNumber({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const mv = useMotionValue(value);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [n, setN] = useState(value);

  useEffect(() => {
    const c = animate(mv, value, { duration: 0.65, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setN(v));
    return () => {
      c.stop();
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span className={className}>{formatCurrency(n)}</span>;
}

function Donut({
  percent,
  className,
}: {
  percent: number;
  className?: string;
}) {
  const size = 46;
  const r = 17;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="currentColor"
        strokeOpacity={0.18}
        strokeWidth="6"
        fill="none"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="currentColor"
        strokeOpacity={0.95}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c}`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

function TypingText({ text }: { text: string }) {
  const [out, setOut] = useState("");

  useEffect(() => {
    setOut("");
    let i = 0;

    const t = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, 12);

    return () => clearInterval(t);
  }, [text]);

  return (
    <p className="text-sm leading-relaxed text-slate-700 dark:text-white/85">
      {out}
    </p>
  );
}

function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 120, damping: 18 });
  const sy = useSpring(y, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;

        const r = el.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;

        x.set(dx);
        y.set(dy);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SoliraStylePill({ children }: { children: ReactNode }) {
  return (
    <div
      className={[
        "relative inline-flex rounded-full p-[1px]",
        "bg-gradient-to-r from-black/10 via-sky-500/20 to-black/10",
        "dark:from-white/10 dark:via-sky-400/25 dark:to-white/10",
      ].join(" ")}
    >
      <div
        className={[
          "relative inline-flex items-center gap-3 rounded-full px-5 py-2",
          "overflow-hidden isolate backdrop-blur-xl",
          "bg-white/85 text-slate-900",
          "border border-black/20",
          "dark:bg-[#0b1020]/75 dark:text-white/90",
          "dark:border-white/10",
          "ring-1 ring-black/40 dark:ring-white/10",
        ].join(" ")}
      >
        {/* moving shine */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <motion.span
            className={[
              "absolute -top-1/2 -left-[60%] h-[200%] w-[45%] rotate-12",
              "bg-gradient-to-r from-transparent via-black/12 to-transparent",
              "dark:via-white/20",
              "blur-xl opacity-70",
            ].join(" ")}
            animate={{ x: [-180, 520] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />
        </motion.span>

        {/* left dot + pulse */}
        <span className="relative flex h-2.5 w-2.5">
          <motion.span
            aria-hidden
            className="absolute inline-flex h-full w-full rounded-full bg-slate-400/50 dark:bg-slate-300/40"
            animate={{ scale: [1, 1.9, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-slate-500/70 dark:bg-slate-200/80" />
        </span>

        <span className="relative text-sm font-semibold">{children}</span>
      </div>
    </div>
  );
}

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenureMonths, setTenureMonths] = useState(120);

  const [monthlyIncome, setMonthlyIncome] = useState(150000);
  const [extraMonthly, setExtraMonthly] = useState(0);

  const [aiOpen, setAiOpen] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiAdvice, setAiAdvice] = useState<AiAdvice | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const didMountRef = useRef(false);

  const [autoAi, setAutoAi] = useState(true);
  const [aiUpdatedAt, setAiUpdatedAt] = useState<number | null>(null);

  const [tipIdx, setTipIdx] = useState(0);

  const base = useMemo(
    () =>
      buildSchedule({
        principal: loanAmount,
        annualRatePct: interestRate,
        months: tenureMonths,
        extraMonthly: 0,
      }),
    [loanAmount, interestRate, tenureMonths],
  );

  const plan = useMemo(
    () =>
      buildSchedule({
        principal: loanAmount,
        annualRatePct: interestRate,
        months: tenureMonths,
        extraMonthly,
      }),
    [loanAmount, interestRate, tenureMonths, extraMonthly],
  );

  const principalPercent = useMemo(() => {
    const total = plan.totalPayable;
    return total > 0 ? Math.round((loanAmount / total) * 100) : 0;
  }, [loanAmount, plan.totalPayable]);

  const emiToIncomePct =
    monthlyIncome > 0 ? (plan.emi / monthlyIncome) * 100 : 0;

  const payoffYears = Math.floor(plan.monthsUsed / 12);
  const payoffRem = plan.monthsUsed % 12;

  const interestSaved = Math.max(0, base.totalInterest - plan.totalInterest);

  const aiScore = useMemo(() => {
    let score = 100;

    score -= Math.max(0, emiToIncomePct - 35) * 1.4;
    score -= Math.max(0, interestRate - 11) * 3.2;
    score -= Math.max(0, tenureMonths / 12 - 10) * 2.2;

    score = Math.max(8, Math.min(99, Math.round(score)));
    return score;
  }, [emiToIncomePct, interestRate, tenureMonths]);

  const aiScoreLabel =
    aiScore >= 80 ? "Strong" : aiScore >= 60 ? "Balanced" : "Risky";

  const aiRecExtra = useMemo(() => {
    const basis = Math.max(1000, Math.round((plan.emi * 0.05) / 1000) * 1000);
    return Math.min(50000, basis);
  }, [plan.emi]);

  const aiWhatIf = useMemo(
    () =>
      buildSchedule({
        principal: loanAmount,
        annualRatePct: interestRate,
        months: tenureMonths,
        extraMonthly: aiRecExtra,
      }),
    [loanAmount, interestRate, tenureMonths, aiRecExtra],
  );

  const aiSaveIfApply = Math.max(
    0,
    base.totalInterest - aiWhatIf.totalInterest,
  );

  const aiPayoffY = Math.floor(aiWhatIf.monthsUsed / 12);
  const aiPayoffM = aiWhatIf.monthsUsed % 12;

  const aiTips = useMemo(() => {
    const tips: string[] = [
      `AI Score: ${aiScoreLabel} • EMI/Income ~${emiToIncomePct.toFixed(0)}%`,
      extraMonthly > 0
        ? `Your prepay is saving ~${formatCurrency(interestSaved)} already.`
        : `Try +${formatCurrency(aiRecExtra)}/mo to save ~${formatCurrency(aiSaveIfApply)}.`,
      tenureMonths / 12 >= 12
        ? "Long tenure = high interest. Consider a shorter tenure option."
        : "Tenure looks decent — focus on consistent prepay discipline.",
    ];
    return tips;
  }, [
    aiScoreLabel,
    emiToIncomePct,
    extraMonthly,
    interestSaved,
    aiRecExtra,
    aiSaveIfApply,
    tenureMonths,
  ]);

  useEffect(() => {
    if (!aiTips.length) return;

    const id = setInterval(() => {
      setTipIdx((i) => (i + 1) % aiTips.length);
    }, 2400);

    return () => clearInterval(id);
  }, [aiTips.length]);

  const showApply = extraMonthly < aiRecExtra;

  const sparkValues = useMemo(() => {
    const rows = plan.rows;
    if (!rows.length) return [];

    const points = 26;
    const step = Math.max(1, Math.floor(rows.length / points));
    const sampled = rows.filter((_, i) => i % step === 0).map((r) => r.balance);

    if (sampled.length < 2) sampled.push(rows[rows.length - 1].balance);

    return sampled;
  }, [plan.rows]);

  const sparkPath = useMemo(() => makeSparkPath(sparkValues), [sparkValues]);
  const sparkUid = useId().replace(/:/g, "");
  const sparkEnd = useMemo(() => getSparkLastPoint(sparkValues), [sparkValues]);

  const tag =
    emiToIncomePct <= 30
      ? "Comfortable"
      : emiToIncomePct <= 45
        ? "Manageable"
        : "Tight";

  const compareTenures = useMemo(() => {
    const candidates = [84, 120, 144];

    return candidates.map((m) => {
      const s = buildSchedule({
        principal: loanAmount,
        annualRatePct: interestRate,
        months: m,
        extraMonthly,
      });
      return { months: m, emi: s.emi, interest: s.totalInterest };
    });
  }, [loanAmount, interestRate, extraMonthly]);

  const getAiAdvice = async (force = false) => {
    setAiLoading(true);
    setAiError(null);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (force) setAiAdvice(null);

    try {
      const res = await fetch("/api/loan-advice", {
        method: "POST",
        cache: "no-store",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loanAmount,
          interestRate,
          tenureMonths,
          emi: plan.emi,
          totalInterest: plan.totalInterest,
          totalPayable: plan.totalPayable,
          monthlyIncome,
          extraMonthly,
          emiToIncomePct,
          payoffMonths: plan.monthsUsed,
          interestSaved,
          nonce: Date.now(),
        }),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "AI failed");
      }

      const data = (await res.json()) as AiAdvice;
      setAiAdvice(data);
      setAiUpdatedAt(Date.now());
    } catch (e: any) {
      setAiError(e?.message || "AI error");
      setAiAdvice({
        summary:
          "Quick tip: EMI-to-income ko 30–40% range me rakhna best hota hai. Extra monthly payment se interest kaafi reduce ho sakta hai.",
        bullets: [
          extraMonthly > 0
            ? `Extra ₹${extraMonthly.toLocaleString(
                "en-IN",
              )}/month se approx ${formatCurrency(interestSaved)} interest save.`
            : "Try extra monthly payment (even small) to reduce total interest.",
          payoffYears >= 10
            ? "If possible, tenure thoda kam karo to total interest drop hota hai."
            : "Tenure already decent — focus on regular prepayment/discipline.",
          "Rate compare karo + processing fee/moratorium check karo (education loans).",
        ],
      });
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (!autoAi || !aiOpen) return;

    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    const t = setTimeout(() => {
      getAiAdvice(false);
    }, 650);

    return () => clearTimeout(t);
  }, [
    autoAi,
    aiOpen,
    loanAmount,
    interestRate,
    tenureMonths,
    monthlyIncome,
    extraMonthly,
  ]);

  const downloadCSV = () => {
    const header = ["Month", "Payment", "Interest", "PrincipalPaid", "Balance"];
    const lines = plan.rows.map((r) =>
      [
        r.month,
        Math.round(r.payment),
        Math.round(r.interest),
        Math.round(r.principalPaid),
        Math.round(r.balance),
      ].join(","),
    );

    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "loan-amortization.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  const shell = "rounded-2xl border backdrop-blur-xl";
  const card = cx(
    shell,
    "border-slate-200/70 bg-white/70",
    "dark:border-white/10 dark:bg-white/5",
  );
  const muted = "text-slate-600 dark:text-white/60";
  const strong = "text-slate-900 dark:text-white";

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 text-slate-900 dark:bg-[#070B16] dark:text-white">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticleBackground />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 mt-12"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.05 }}
            className={cx(
              "relative overflow-hidden rounded-full",
              "inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.2em] uppercase",
              "border-2 border-black",
              "bg-white/90 backdrop-blur",
              "dark:border-white/20 dark:bg-white/5",
            )}
          >
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0"
            >
              <motion.span
                className={cx(
                  "absolute -top-1/2 -left-[60%] h-[200%] w-[45%] rotate-12 rounded-full",
                  "bg-gradient-to-r from-transparent via-black/20 to-transparent",
                  "dark:via-white/25",
                  "blur-lg opacity-60",
                )}
                animate={{ x: [-180, 520] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
            </motion.span>

            <span className="relative z-10 inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-300" />
              EMI CALCULATOR
            </span>
          </motion.div>

          <h1
            className={cx(
              "mt-4 text-3xl sm:text-4xl font-bold tracking-tight",
              strong,
            )}
          >
            Education{" "}
            <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-sky-300 dark:via-blue-400 dark:to-purple-400">
              Loan
            </span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            className={cx(card, "p-6 space-y-6")}
          >
            {/* Loan Amount */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={cx("text-sm", muted)}>Loan Amount</label>
                <span className="font-mono text-sm text-sky-600 dark:text-sky-300">
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
                className="range w-full"
              />

              <div
                className={cx(
                  "flex justify-between mt-1 text-[11px] font-mono",
                  muted,
                )}
              >
                <span>₹5L</span>
                <span>₹2Cr</span>
              </div>
            </div>

            {/* Interest */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={cx("text-sm", muted)}>
                  Interest Rate (P.A)
                </label>
                <span className="font-mono text-sm text-purple-600 dark:text-purple-300">
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
                className="range range-purple w-full"
              />

              <div
                className={cx(
                  "flex justify-between mt-1 text-[11px] font-mono",
                  muted,
                )}
              >
                <span>8%</span>
                <span>16%</span>
              </div>
            </div>

            {/* Tenure */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={cx("text-sm", muted)}>Loan Tenure</label>
                <span className="font-mono text-sm text-sky-600 dark:text-sky-300">
                  {tenureMonths / 12} years
                </span>
              </div>

              <input
                type="range"
                min="12"
                max="180"
                step="12"
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="range w-full"
              />

              <div
                className={cx(
                  "flex justify-between mt-1 text-[11px] font-mono",
                  muted,
                )}
              >
                <span>1 yr</span>
                <span>15 yrs</span>
              </div>
            </div>

            {/* Monthly income */}
            <div className={cx(card, "p-4")}>
              <div className="flex items-center justify-between">
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                  <motion.div
                    className="absolute top-[-40%] left-[-60%] h-[180%] w-[55%] rotate-12
               bg-gradient-to-r from-transparent via-white/35 to-transparent
               dark:via-white/10 blur-2xl"
                    animate={{ x: ["0%", "220%"] }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>

                <p className={cx("text-sm", muted)}>Monthly Income</p>
                <span
                  className={cx(
                    "text-[11px] px-2 py-1 rounded-full border",
                    "border-slate-200/70 bg-white/70 text-slate-700",
                    "dark:border-white/10 dark:bg-white/5 dark:text-white/70",
                  )}
                >
                  {tag} • {emiToIncomePct.toFixed(0)}% EMI
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className={muted}>₹</span>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className={cx(
                    "w-full bg-transparent outline-none font-mono text-sm",
                    strong,
                  )}
                />
              </div>

              <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, emiToIncomePct)}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-rose-400"
                />
              </div>
            </div>

            {/* Extra monthly */}
            <div className={cx(card, "p-4")}>
              <div className="flex items-center justify-between">
                <p className={cx("text-sm", muted)}>Extra Payment / Month</p>
                <span className={cx("text-sm font-mono", strong)}>
                  {extraMonthly
                    ? `₹${extraMonthly.toLocaleString("en-IN")}`
                    : "₹0"}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                value={extraMonthly}
                onChange={(e) => setExtraMonthly(Number(e.target.value))}
                className="range range-green w-full mt-3"
              />

              <div
                className={cx(
                  "flex justify-between mt-1 text-[11px] font-mono",
                  muted,
                )}
              >
                <span>₹0</span>
                <span>₹50k</span>
              </div>

              {extraMonthly > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-[12px] text-emerald-700 dark:text-emerald-200 flex items-center gap-2"
                >
                  <span className="inline-flex w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Save{" "}
                  <b className="text-emerald-800 dark:text-emerald-100">
                    {formatCurrency(interestSaved)}
                  </b>{" "}
                  • Payoff{" "}
                  <b className="text-emerald-800 dark:text-emerald-100">
                    {payoffYears}y {payoffRem}m
                  </b>
                </motion.div>
              )}
            </div>

            {/* Compare + CSV */}
            <div className={cx(card, "p-2")}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-sky-600 dark:text-sky-300" />
                  <p className={cx("font-semibold", strong)}>Compare Tenures</p>
                </div>

                <button
                  onClick={downloadCSV}
                  className={cx(
                    "inline-flex items-center gap-2 text-[11px] px-3 py-2 rounded-xl border transition",
                    "border-slate-200/70 bg-white/70 hover:bg-white",
                    "dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
                  )}
                >
                  <Download className="w-4 h-4" />
                  CSV
                </button>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-3">
                {compareTenures.map((t) => (
                  <button
                    key={t.months}
                    onClick={() => setTenureMonths(t.months)}
                    className={cx(
                      "text-left rounded-xl border px-3 py-3 transition",
                      tenureMonths === t.months
                        ? "border-sky-400/40 bg-sky-500/10 dark:border-sky-300/40 dark:bg-sky-400/10"
                        : "border-slate-200/70 bg-white/70 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
                    )}
                  >
                    <div className={cx("text-[11px]", muted)}>
                      {t.months / 12} years
                    </div>
                    <div className={cx("mt-1 font-semibold", strong)}>
                      {formatCurrency(t.emi)}
                    </div>
                    <div className={cx("mt-1 text-[11px]", muted)}>
                      Interest: {formatCurrency(t.interest)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className={cx(card, "p-4 flex gap-2")}>
              <Info className="w-4 h-4 text-sky-600 dark:text-sky-300 mt-0.5" />
              <p className={cx("text-sm", muted)}>
                Education loan: Section 80E tax benefit (interest) may apply.
              </p>
            </div>

            {/* CTA */}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-4
                         bg-gradient-to-r from-sky-500 to-purple-600 text-white hover:opacity-95 transition"
            >
              Apply for This Loan <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* Right: Results */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* HERO */}
            <TiltCard
              className={cx(
                "relative rounded-2xl overflow-hidden border p-6",
                "border-slate-200/70",
                "bg-gradient-to-r from-sky-200 via-blue-200 to-purple-200 text-slate-900",
                "dark:border-white/10 dark:from-sky-200/85 dark:via-blue-300/80 dark:to-purple-400/85 dark:text-white",
              )}
            >
              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-sm opacity-80">Monthly EMI</p>
                  <span className="inline-flex items-center gap-2 text-[11px] px-3 py-1 rounded-full bg-white/40 border border-white/60 text-slate-800 dark:bg-white/10 dark:border-white/15 dark:text-white/90">
                    <Wand2 className="w-4 h-4" />
                    AI Ready
                  </span>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="text-[42px] sm:text-[48px] font-extrabold tracking-tight leading-none">
                      <AnimatedNumber value={plan.emi} />
                    </div>
                    <p className="text-sm mt-2 opacity-80">
                      {tenureMonths / 12} years • Total interest{" "}
                      <b className="opacity-100">
                        {formatCurrency(plan.totalInterest)}
                      </b>
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Donut
                      percent={principalPercent}
                      className="text-slate-900/80 dark:text-white"
                    />
                    <span className="text-[11px] opacity-80">
                      Principal {principalPercent}%
                    </span>
                  </div>
                </motion.div>

                {/* chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    `Principal: ${principalPercent}%`,
                    `Interest: ${100 - principalPercent}%`,
                    `Payoff: ${payoffYears}y ${payoffRem}m`,
                  ].map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + i * 0.05 }}
                      className="text-[11px] px-3 py-1 rounded-full bg-white/45 border border-white/70 text-slate-800
                                 dark:bg-black/15 dark:border-white/15 dark:text-white/85"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  className="mt-4 rounded-2xl border border-white/60 bg-white/35 backdrop-blur-md
             dark:border-white/15 dark:bg-black/15 overflow-hidden"
                >
                  <div className="px-4 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-[11px] font-semibold tracking-wide uppercase opacity-90">
                        AI Insights
                      </span>
                      <span
                        className="text-[11px] px-2 py-0.5 rounded-full bg-white/45 border border-white/60
                       dark:bg-white/10 dark:border-white/15"
                      >
                        Score {aiScore}/100 • {aiScoreLabel}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setAiOpen(true);
                        getAiAdvice();
                      }}
                      className="text-[11px] px-3 py-1.5 rounded-xl border border-white/60 bg-white/45 hover:bg-white/60
                 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15 transition"
                    >
                      Boost with AI
                    </button>
                  </div>

                  <div className="px-4 pb-3">
                    {/* score bar */}
                    <div className="h-2 rounded-full bg-slate-900/10 dark:bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${aiScore}%` }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-500"
                      />
                    </div>

                    {/* rotating tip + apply */}
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <motion.p
                        key={tipIdx}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[12px] opacity-90"
                      >
                        {aiTips[tipIdx]}
                      </motion.p>

                      {showApply && (
                        <button
                          onClick={() => setExtraMonthly(aiRecExtra)}
                          className="shrink-0 text-[11px] px-3 py-1.5 rounded-xl
                     bg-slate-900/15 hover:bg-slate-900/20
                     dark:bg-white/10 dark:hover:bg-white/15 transition"
                        >
                          Apply +{formatCurrency(aiRecExtra)}/mo
                        </button>
                      )}
                    </div>

                    {/* bottom note */}
                    {showApply ? (
                      <p className="mt-1 text-[11px] opacity-75">
                        With +{formatCurrency(aiRecExtra)}/mo you could save ~
                        <b className="opacity-100">
                          {" "}
                          {formatCurrency(aiSaveIfApply)}{" "}
                        </b>
                        and finish in{" "}
                        <b className="opacity-100">
                          {aiPayoffY}y {aiPayoffM}m
                        </b>
                        .
                      </p>
                    ) : (
                      <p className="mt-1 text-[11px] opacity-75">
                        Nice — you’re already prepaying. Estimated saving:
                        <b className="opacity-100">
                          {" "}
                          {formatCurrency(interestSaved)}
                        </b>
                        .
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* sparkline (LIVE) */}
                <div className="mt-5 flex items-end justify-between">
                  <div className="text-[11px] opacity-80 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/60" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      Live
                    </span>
                    <span>Remaining balance trend</span>
                  </div>

                  <svg
                    width="160"
                    height="44"
                    viewBox="0 0 160 44"
                    className="opacity-90"
                  >
                    <defs>
                      <linearGradient
                        id={`sparkGrad-${sparkUid}`}
                        x1="0"
                        y1="0"
                        x2="160"
                        y2="0"
                      >
                        <stop
                          offset="0%"
                          stopColor="currentColor"
                          stopOpacity="0.05"
                        />
                        <stop
                          offset="45%"
                          stopColor="currentColor"
                          stopOpacity="0.95"
                        />
                        <stop
                          offset="55%"
                          stopColor="currentColor"
                          stopOpacity="0.95"
                        />
                        <stop
                          offset="100%"
                          stopColor="currentColor"
                          stopOpacity="0.05"
                        />
                      </linearGradient>

                      <filter
                        id={`sparkGlow-${sparkUid}`}
                        x="-40%"
                        y="-60%"
                        width="180%"
                        height="220%"
                      >
                        <feGaussianBlur stdDeviation="2.2" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {sparkPath ? (
                      <>
                        <path
                          d={sparkPath}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeOpacity="0.18"
                          filter={`url(#sparkGlow-${sparkUid})`}
                        />

                        <motion.path
                          d={sparkPath}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.05, ease: "easeOut" }}
                        />

                        <motion.path
                          d={sparkPath}
                          fill="none"
                          stroke={`url(#sparkGrad-${sparkUid})`}
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeDasharray="10 18"
                          animate={{ strokeDashoffset: [0, -160] }}
                          transition={{
                            duration: 2.2,
                            ease: "linear",
                            repeat: Infinity,
                          }}
                          opacity={0.9}
                        />

                        <motion.circle
                          cx={sparkEnd.x}
                          cy={sparkEnd.y}
                          r="3"
                          fill="currentColor"
                          initial={{ opacity: 0.8, scale: 1 }}
                          animate={{
                            opacity: [0.6, 1, 0.6],
                            scale: [1, 1.45, 1],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </>
                    ) : null}
                  </svg>
                </div>

                {/* 12-month mini bars */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] opacity-80">
                    <span>First 12 months</span>
                    <span>Interest vs Principal</span>
                  </div>

                  <div className="mt-2 flex gap-1.5 items-end h-12">
                    {plan.rows.slice(0, 12).map((r, i) => {
                      const max = Math.max(
                        1,
                        ...plan.rows
                          .slice(0, 12)
                          .map((x) => x.interest + x.principalPaid),
                      );
                      const hi = (r.interest / max) * 48;
                      const hp = (r.principalPaid / max) * 48;

                      return (
                        <div
                          key={i}
                          className="w-2.5 flex flex-col justify-end"
                        >
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: hi }}
                            transition={{
                              duration: 0.55,
                              delay: i * 0.02,
                              ease: "easeOut",
                            }}
                            className="rounded-t bg-slate-900/25 dark:bg-white/55"
                          />
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: hp }}
                            transition={{
                              duration: 0.55,
                              delay: i * 0.02,
                              ease: "easeOut",
                            }}
                            className="rounded-b bg-slate-900/40 dark:bg-white/85"
                            style={{ marginTop: 2 }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "Principal",
                  value: formatCurrency(loanAmount),
                  icon: IndianRupee,
                  tint: "text-sky-600 dark:text-sky-300",
                },
                {
                  label: "Total Interest",
                  value: formatCurrency(plan.totalInterest),
                  icon: TrendingDown,
                  tint: "text-purple-600 dark:text-purple-300",
                },
                {
                  label: "Total Payable",
                  value: formatCurrency(plan.totalPayable),
                  icon: Calculator,
                  tint: "text-cyan-600 dark:text-cyan-300",
                },
                {
                  label: "Tenure",
                  value: `${tenureMonths / 12} Years`,
                  icon: Calendar,
                  tint: "text-amber-600 dark:text-amber-300",
                },
              ].map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className={cx(card, "p-4")}
                >
                  <c.icon className={cx("w-4 h-4", c.tint)} />
                  <div className={cx("mt-2 text-base font-semibold", strong)}>
                    {c.value}
                  </div>
                  <div className={cx("mt-1 text-xs", muted)}>{c.label}</div>
                </motion.div>
              ))}
            </div>

            {/* AI Coach */}
            <div className={cx(card, "p-5")}>
              <button
                onClick={() => setAiOpen((s) => !s)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-sky-600 dark:text-sky-300" />
                  <p className={cx("font-semibold", strong)}>AI Repayment </p>
                </div>
                <ChevronDown
                  className={cx(
                    "w-5 h-5 transition",
                    muted,
                    aiOpen && "rotate-180",
                  )}
                />
              </button>

              <AnimatePresence>
                {aiOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={cx(
                              "w-2 h-2 rounded-full",
                              autoAi
                                ? "bg-emerald-500 animate-pulse"
                                : "bg-slate-400",
                            )}
                          />
                          <span className={cx("text-[11px]", muted)}>
                            {autoAi ? "Live advice ON" : "Live advice OFF"}
                            {aiUpdatedAt
                              ? ` • updated ${new Date(
                                  aiUpdatedAt,
                                ).toLocaleTimeString("en-IN", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}`
                              : ""}
                          </span>
                        </div>

                        <button
                          onClick={() => setAutoAi((s) => !s)}
                          className={cx(
                            "text-[11px] px-3 py-1.5 rounded-xl border transition",
                            "border-slate-200/70 bg-white/70 hover:bg-white",
                            "dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
                          )}
                        >
                          {autoAi ? "Pause" : "Go Live"}
                        </button>
                      </div>

                      {!aiAdvice && (
                        <p className={cx("text-sm", muted)}>
                          Click “Generate AI Advice” for personalised tips.
                        </p>
                      )}

                      {aiError && (
                        <p className="text-sm text-rose-600 dark:text-rose-300">
                          {aiError}
                        </p>
                      )}

                      {aiAdvice && (
                        <div className="space-y-2">
                          <TypingText text={aiAdvice.summary} />
                          <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700 dark:text-white/75">
                            {aiAdvice.bullets.slice(0, 4).map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button
                          onClick={() => getAiAdvice(true)}
                          disabled={aiLoading}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3
                                     bg-gradient-to-r from-sky-500 to-purple-600 text-white hover:opacity-95 transition
                                     disabled:opacity-60"
                        >
                          <Sparkles className="w-4 h-4" />
                          {aiLoading ? "Generating..." : "Generate AI Advice"}
                        </button>

                        <button
                          onClick={() => setAiAdvice(null)}
                          className={cx(
                            "inline-flex items-center justify-center rounded-xl px-4 py-3 border transition text-sm",
                            "border-slate-200/70 bg-white/70 hover:bg-white",
                            "dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
                          )}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
