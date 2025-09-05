/* ── Full-screen bokeh background using only Tailwind ────────────────────── */
import type { ReactNode } from "react";

export default function BoosterBackground({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="relative min-h-[100dvh] overflow-hidden
                    bg-gradient-to-br from-[#1b1232] via-[#1b2144] to-[#0f0f1e]"
    >
      {/* ── Bokeh layer with multiple radial-gradients (blurred) ──────────── */}
      <div
        className="pointer-events-none absolute inset-[-10%] opacity-80 blur-[18px]
                   [background:radial-gradient(220px_circle_at_12%_22%,rgba(255,255,255,0.07),transparent_60%),radial-gradient(180px_circle_at_85%_18%,rgba(124,58,237,0.22),transparent_60%),radial-gradient(260px_circle_at_88%_72%,rgba(59,130,246,0.18),transparent_60%),radial-gradient(240px_circle_at_22%_82%,rgba(168,85,247,0.18),transparent_65%),radial-gradient(200px_circle_at_50%_50%,rgba(255,255,255,0.05),transparent_60%)]"
      />
      {/* ── Optional extra sheen ───────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen opacity-40
                   [background:radial-gradient(900px_circle_at_-10%_-10%,rgba(255,255,255,0.03),transparent_40%),radial-gradient(900px_circle_at_110%_110%,rgba(255,255,255,0.03),transparent_40%)]"
      />
      {/* ── Your page content goes here ───────────────────────────────────── */}
      <div className="relative pb-24">{children}</div>
    </div>
  );
}
