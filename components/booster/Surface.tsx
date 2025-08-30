/* ── Glassy surface wrapper to unify card visuals ────────────────────────── */

"use client";
import { PropsWithChildren } from "react";

export default function Surface({ children }: PropsWithChildren) {
  /* ── Rounded, blurred, subtle bordered container ───────────────────────── */
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/15 shadow-xl">
      {children}
    </div>
  );
}
