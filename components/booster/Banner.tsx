/* ── Top banner for status and announcements ─────────────────────────────── */

"use client";

type Props = {
  message: string;
  tone?: "info" | "success" | "warning";
};

export default function Banner({ message, tone = "info" }: Props) {
  /* ── Map semantic tone to utility classes in a single place ────────────── */
  const clr =
    tone === "success"
      ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/30"
      : tone === "warning"
      ? "bg-amber-500/20 text-amber-100 border-amber-400/30"
      : "bg-indigo-500/20 text-indigo-100 border-indigo-400/30";

  /* ── Centered pill with medium emphasis for inline notices ─────────────── */
  return (
    <div
      className={`w-full rounded-2xl px-4 py-3 border ${clr} text-center font-semibold`}
    >
      {message}
    </div>
  );
}
