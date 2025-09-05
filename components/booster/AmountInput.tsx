/* ── Controlled numeric input for reserve amount ─────────────────────────── */

"use client";

type Props = {
  value: number;
  onChange: (n: number) => void;
  placeholder?: string;
};

export default function AmountInput({
  value,
  onChange,
  placeholder = "Enter amount to reserve",
}: Props) {
  /* ── Minimal styling with transparent background to blend with Surface ─── */
  return (
    <div className="rounded-lg bg-black/25 border border-white/15 px-3 py-1 text-white">
      <input
        type="number"
        min={1}
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => onChange(parseFloat(e.target.value || "0"))}
        className="bg-transparent outline-none w-full placeholder:text-white/50 border-none"
      />
    </div>
  );
}
