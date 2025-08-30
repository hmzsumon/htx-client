/* ── Three-up KPI row composed from StatCard ─────────────────────────────── */

"use client";
import StatCard from "./StatCard";

type Props = {
  currentCycle: string;
  totalLockedText: string;
  nextPayoutText: string;
};

export default function StatsRow({
  currentCycle,
  totalLockedText,
  nextPayoutText,
}: Props) {
  /* ── Responsive grid with tight gaps to match compact dashboard feel ───── */
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3">
      <StatCard label="Current Cycle" value={currentCycle} />
      <StatCard label="Total Locked" value={totalLockedText} />
      <StatCard label="Next Payout" value={nextPayoutText} />
    </div>
  );
}
