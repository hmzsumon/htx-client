/* NeoRing.tsx */
"use client";
import * as React from "react";

type NeoRingProps = {
  /** বাইরের ডায়ামিটার (px) */
  size?: number;
  /** রিং-এর পুরুত্ব (px) */
  thickness?: number;
  /** ব্যাকগ্রাউন্ড (পেজ/সেকশনের রঙ) */
  bg?: string;
  /** রিং সারফেস কালার */
  surface?: string;
  /** ডার্ক শ্যাডো কালার */
  shadowColor?: string;
  /** টপ-লাইট/হাইলাইট কালার */
  highlightColor?: string;
  /** আউটার গ্লো কালার */
  glowColor?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function NeoRing({
  size = 320,
  thickness = 64,
  bg = "#0b1f29", // ডার্ক ব্যাকগ্রাউন্ড
  surface = "#0f2b3a", // রিং সারফেস
  shadowColor = "rgba(0,0,0,.55)",
  highlightColor = "rgba(255,255,255,.9)",
  glowColor = "rgba(56,189,248,.18)", // সফট সায়ান গ্লো
  className = "",
  children,
}: NeoRingProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative ${className}`}
    >
      {/* রিং লেয়ার (mask দিয়ে মাঝখান ফাঁকা) */}
      <div
        aria-hidden
        style={
          {
            "--bg": bg,
            "--surface": surface,
            "--sh": shadowColor,
            "--hl": highlightColor,
            "--gl": glowColor,
            "--t": `${thickness}px`,
          } as React.CSSProperties
        }
        className="
          pointer-events-none absolute inset-0 rounded-full
          bg-[var(--surface)]
          [mask:radial-gradient(circle_at_center,transparent_calc(50%_-_var(--t)),#000_calc(50%_-_var(--t)+1px))]
          /* outer + inner combo (neumorphic) */
          shadow-[0_22px_50px_var(--sh),_0_0_0_1px_rgba(255,255,255,.06),_0_0_70px_var(--gl),_inset_-28px_-28px_48px_var(--hl),_inset_26px_26px_48px_var(--sh)]
        "
      />

      {/* কনটেন্ট—রিংয়ের মাঝখানে যা খুশি বসান */}
      <div className="absolute inset-0 grid place-items-center z-10">
        {children}
      </div>

      {/* রিংকে ব্যাকগ্রাউন্ডের সাথে মিশিয়ে দিতে বেস লেয়ার (ঐচ্ছিক) */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full -z-10"
        style={{ background: bg }}
      />
    </div>
  );
}
