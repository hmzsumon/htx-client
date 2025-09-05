/* NeoDonut.tsx — reference-perfect neumorphic ring (dark) */
"use client";
import * as React from "react";

type Props = {
  size?: number; // outer diameter (px)
  thickness?: number; // ring width (px)
  surface?: string; // ring surface color
  outerLight?: string; // outer highlight (top-left)
  outerDark?: string; // outer shadow (bottom-right)
  innerLight?: string; // inner rim highlight
  innerDark?: string; // inner rim shadow
  className?: string;
  children?: React.ReactNode;
};

export default function NeoDonut({
  size = 360,
  thickness = 68,
  // ডার্ক কম্বো; চাইলে লাইট থিমে #E5E5E5 দিন
  surface = "#0f2b3a",
  outerLight = "rgba(255,255,255,.55)",
  outerDark = "rgba(0,0,0,.50)",
  innerLight = "rgba(255,255,255,.85)",
  innerDark = "rgba(0,0,0,.42)",
  className = "",
  children,
}: Props) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative ${className}`}
    >
      {/* মূল রিং — mask দিয়ে মাঝখান ফাঁপা */}
      <div
        aria-hidden
        style={
          {
            "--t": `${thickness}px`,
            "--surf": surface,
            "--ol": outerLight,
            "--od": outerDark,
            "--il": innerLight,
            "--id": innerDark,
          } as React.CSSProperties
        }
        className="
          absolute inset-0 rounded-full bg-[var(--surf)]
          /* WebKit + standard mask — না থাকলে ফাঁপা হবে না */
          [-webkit-mask:radial-gradient(circle_at_center,transparent_calc(50%_-_var(--t)),#000_calc(50%_-_var(--t)+1px))]
          [mask:radial-gradient(circle_at_center,transparent_calc(50%_-_var(--t)),#000_calc(50%_-_var(--t)+1px))]
          /* Outer glow/highlight + drop shadow (top-left light, bottom-right dark) */
          [filter:drop-shadow(-14px_-14px_26px_var(--ol))_drop-shadow(18px_20px_32px_var(--od))]
          /* Inner bevel (top-left bright, bottom-right dark) */
          shadow-[inset_-30px_-30px_56px_var(--il),inset_28px_28px_54px_var(--id)]
        "
      />

      {/* আর্ক হাইলাইট (ছবির মত নরম সাদা রিম) */}
      <div
        aria-hidden
        className="
          absolute inset-0 rounded-full opacity-80 blur-[1px]
          [-webkit-mask:radial-gradient(circle_at_center,transparent_calc(50%_-_var(--t)),#000_calc(50%_-_var(--t)+1px))]
          [mask:radial-gradient(circle_at_center,transparent_calc(50%_-_var(--t)),#000_calc(50%_-_var(--t)+1px))]
          bg-[conic-gradient(from_230deg_at_28%_22%,rgba(255,255,255,.7)_0%,rgba(255,255,255,0)_34%)]
        "
        style={{} as React.CSSProperties}
      />

      {/* কনটেন্ট (রিংয়ের মাঝখান) */}
      <div className="absolute inset-0 grid place-items-center z-10">
        {children}
      </div>
    </div>
  );
}
