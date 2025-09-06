/* ── Reusable Submit Button with loading spinner ─────────────────────────── */

"use client";
import React from "react";

/* ── Props ────────── */
type Props = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: "emerald" | "indigo" | "slate" | "danger" | "gold";
  size?: "sm" | "md" | "lg";
  className?: string;
};

/* ── Class helpers ────────── */
const variantClass = (v: NonNullable<Props["variant"]>) => {
  const base = "bg-gradient-to-b text-white hover:brightness-110";
  switch (v) {
    case "emerald":
      return `${base} from-[#025f40] to-[#044932]`;
    case "indigo":
      return `${base} from-indigo-600 to-indigo-700`;
    case "slate":
      return `${base} from-slate-600 to-slate-700`;
    case "danger":
      return `${base} from-rose-600 to-rose-700`;
    case "gold":
      return `${base} from-amber-500 to-yellow-600`;
  }
};

const sizeClass = (s: NonNullable<Props["size"]>) => {
  switch (s) {
    case "sm":
      return "text-sm px-3 py-1.5";
    case "md":
      return "text-base px-4 py-2";
    case "lg":
      return "text-lg px-6 py-3";
  }
};

const spinnerSize = (s: NonNullable<Props["size"]>) => {
  switch (s) {
    case "sm":
      return "h-4 w-4 border";
    case "md":
      return "h-4 w-4 border-2";
    case "lg":
      return "h-5 w-5 border-2";
  }
};

/* ── Component ────────── */
export default function SubmitButton({
  type = "submit",
  onClick,
  disabled,
  loading,
  loadingText = "Submitting...",
  children = "Submit",
  leftIcon,
  rightIcon,
  fullWidth = true,
  variant = "emerald",
  size = "md",
  className = "",
}: Props) {
  /* ── Derived flags ────────── */
  const isDisabled = !!loading || !!disabled;

  /* ── Render ────────── */
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={!!loading}
      data-variant={variant}
      className={[
        fullWidth ? "w-full" : "w-auto",
        "inline-flex items-center justify-center gap-2 rounded-lg font-bold transition",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        // depth shadow (kept from your original)
        "shadow-[0_2px_0_0_#00333a,_0_6px_20px_0_rgba(0,0,0,0.8)]",
        variantClass(variant),
        sizeClass(size),
        className,
      ].join(" ")}
    >
      {/* ── Left icon / spinner ────────── */}
      {loading ? (
        <span
          aria-hidden="true"
          className={[
            "rounded-full animate-spin border-t-white border-white/30",
            spinnerSize(size),
          ].join(" ")}
        />
      ) : (
        leftIcon
      )}

      {/* ── Label ────────── */}
      <span>{loading ? loadingText : children}</span>

      {/* ── Right icon (hidden while loading) ────────── */}
      {!loading && rightIcon}
    </button>
  );
}
