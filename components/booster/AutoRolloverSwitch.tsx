/* ── Accessible checkbox control for Auto-Rollover ───────────────────────── */

"use client";

type Props = { checked: boolean; onChange: (v: boolean) => void };

export default function AutoRolloverSwitch({ checked, onChange }: Props) {
  /* ── Use native input for semantics; label increases tappable area ─────── */
  return (
    <label className="flex items-center gap-2 text-white/90 select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 accent-emerald-500"
      />
      <span>Enable Auto-Rollover</span>
    </label>
  );
}
