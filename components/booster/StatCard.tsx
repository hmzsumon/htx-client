/* ── Compact KPI card used inside the stats row ──────────────────────────── */

"use client";

type Props = { label: string; value: string };

export default function StatCard({ label, value }: Props) {
  /* ── Keep typography simple; values are preformatted upstream ──────────── */
  return (
    <div className="rounded-lg bg-gradient-to-b from-[#1b2043] to-[#272b4e] shadow-[0_2px_0_0_#00333a,_0_6px_20px_0_rgba(0,0,0,0.8)]  backdrop-blur border border-white/10 px-3 py-2 text-white">
      <div className="text-sm uppercase tracking-widest text-white/70">
        {label}
      </div>
      <div className="mt-1 text-lg font-extrabold">{value}</div>
    </div>
  );
}
