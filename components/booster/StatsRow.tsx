/* ── StatsRow.tsx — allow custom class for the next payout value ─────────── */

"use client";
import StatCard from "./StatCard";

type Props = {
  currentCycle: string;
  totalLockedText: string;
  nextPayoutText: string;
  nextPayoutValueClassName?: string; // e.g. "text-xs"
};

export default function StatsRow({
  currentCycle,
  totalLockedText,
  nextPayoutText,
  nextPayoutValueClassName,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <StatCard label="Current Cycle" value={currentCycle} />
      <StatCard label="Total Locked" value={totalLockedText} />
      <StatCard label="Next Payout" value={nextPayoutText} />
    </div>
  );
}
