/* ── Primary CTA for performing the reserve action ───────────────────────── */

"use client";

type Props = { disabled?: boolean; loading?: boolean; onClick?: () => void };

export default function ReserveButton({ disabled, loading, onClick }: Props) {
  /* ── Visual guardrails via disabled and loading states ─────────────────── */
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-2 transition"
    >
      {loading ? "Reserving..." : "Reserve"}
    </button>
  );
}
