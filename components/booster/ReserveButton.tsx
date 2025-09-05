/* ── Primary CTA for performing the reserve action ───────────────────────── */

"use client";

type Props = { disabled?: boolean; loading?: boolean; onClick?: () => void };

/* ── Component ────────── */
export default function ReserveButton({ disabled, loading, onClick }: Props) {
  /* ── Derived flags ────────── */
  const isDisabled = disabled || loading;

  /* ── Render ────────── */
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      aria-busy={!!loading}
      className="w-full rounded-lg shadow-[0_2px_0_0_#00333a,_0_6px_20px_0_rgba(0,0,0,0.8)]
                 bg-gradient-to-b from-[#025f40] to-[#044932]
                 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed
                 text-white font-bold py-2 transition
                 inline-flex items-center justify-center gap-2"
    >
      {/* ── Spinner (visible only while loading) ────────── */}
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
        />
      )}
      <span>{loading ? "Creating..." : "Create Booster"}</span>
    </button>
  );
}
