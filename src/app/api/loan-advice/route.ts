import { NextResponse } from "next/server";

export const runtime = "nodejs";

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
}) {
  const r = opts.annualRatePct / 100 / 12;
  const emi = calcEmi(opts.principal, opts.annualRatePct, opts.months);

  let balance = opts.principal;
  let totalInterest = 0;

  for (let m = 1; m <= opts.months && balance > 0; m++) {
    const interest = r === 0 ? 0 : balance * r;

    let principalPaid = Math.max(0, emi - interest);
    if (opts.extraMonthly > 0) principalPaid += opts.extraMonthly;
    if (principalPaid > balance) principalPaid = balance;

    balance -= principalPaid;
    totalInterest += interest;
  }

  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayable: Math.round(opts.principal + totalInterest),
    monthsUsed: Math.min(opts.months, Math.ceil(opts.months)),
  };
}

function inr(n: number) {
  const val = Math.round(n);
  return `₹${val.toLocaleString("en-IN")}`;
}

function ym(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  return `${y}y ${m}m`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const loanAmount = Number(body.loanAmount || 0);
    const interestRate = Number(body.interestRate || 0);
    const tenureMonths = Number(body.tenureMonths || 0);
    const monthlyIncome = Number(body.monthlyIncome || 0);
    const extraMonthly = Number(body.extraMonthly || 0);

    if (!loanAmount || !interestRate || !tenureMonths) {
      return NextResponse.json(
        { error: "Missing loanAmount / interestRate / tenureMonths" },
        { status: 400 },
      );
    }

    const base = buildSchedule({
      principal: loanAmount,
      annualRatePct: interestRate,
      months: tenureMonths,
      extraMonthly: 0,
    });

    const plan = buildSchedule({
      principal: loanAmount,
      annualRatePct: interestRate,
      months: tenureMonths,
      extraMonthly,
    });

    const emiToIncomePct =
      monthlyIncome > 0 ? (plan.emi / monthlyIncome) * 100 : 0;

    const recExtra = Math.min(
      50000,
      Math.max(1000, Math.round((plan.emi * 0.05) / 1000) * 1000),
    );

    const withRec = buildSchedule({
      principal: loanAmount,
      annualRatePct: interestRate,
      months: tenureMonths,
      extraMonthly: recExtra,
    });

    const savedWithRec = Math.max(
      0,
      base.totalInterest - withRec.totalInterest,
    );

    // rate -1%
    const rateMinus = Math.max(0, interestRate - 1);
    const withLowerRate = buildSchedule({
      principal: loanAmount,
      annualRatePct: rateMinus,
      months: tenureMonths,
      extraMonthly,
    });
    const savedIfRateDown = Math.max(
      0,
      base.totalInterest - withLowerRate.totalInterest,
    );

    let summary =
      "For maximum savings, choose ‘reduce tenure’ during prepayment (if your lender allows).";
    if (monthlyIncome > 0) {
      if (emiToIncomePct <= 30)
        summary =
          "Avoid aggressive prepay if it breaks your emergency fund (keep 3–6 months buffer).";
      else if (emiToIncomePct <= 45)
        summary =
          "Compare lenders on effective rate + processing fee + insurance cost (not just headline rate).";
      else
        summary =
          "If you get bonuses, split: some to emergency fund, some to principal prepayment.";
    }

    const bullets: string[] = [];

    if (monthlyIncome > 0) {
      bullets.push(
        `EMI/Income ~${emiToIncomePct.toFixed(0)}% (ideal ~30–40%).`,
      );
    }

    if (extraMonthly <= 0) {
      bullets.push(
        `Try +${inr(recExtra)}/mo: save ~${inr(savedWithRec)} interest (approx).`,
      );
    } else {
      bullets.push(`You’re prepaying ${inr(extraMonthly)}/mo — good habit.`);
    }

    bullets.push(
      `If rate drops by ~1%, you may save ~${inr(savedIfRateDown)} interest (approx).`,
    );

    bullets.push(
      `Before aggressive prepay: check prepayment penalty + keep 3–6 months emergency fund.`,
    );

    return NextResponse.json({ summary, bullets });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 },
    );
  }
}
