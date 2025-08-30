/* ── Compact KPI card used inside the stats row ──────────────────────────── */

"use client";

type Props = { label: string; value: string };

export default function StatCard({ label, value }: Props) {
  /* ── Keep typography simple; values are preformatted upstream ──────────── */
  return (
    <div className="rounded-xl bg-white/7 border border-white/10 px-3 py-3 text-white">
      <div className="text-xs/4 uppercase tracking-widest text-white/70">
        {label}
      </div>
      <div className="mt-1 text-lg font-extrabold">{value}</div>
    </div>
  );
}
