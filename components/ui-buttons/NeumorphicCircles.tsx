/* NeumorphicCircleParents.tsx */
"use client";
import React from "react";

type CircleProps = {
  /** ব্যাস(px) */
  size?: number;
  /** বেজ ব্যাকগ্রাউন্ড রঙ (hex/rgb/hsl যেকোনো CSS color) */
  bg?: string;
  /** শ্যাডোর ডার্ক টোন */
  shadowColor?: string;
  /** ইনসেট হাইলাইট টোন (সাধারণত সাদা/হালকা) */
  highlightColor?: string;
  className?: string;
  children?: React.ReactNode;
};

/** Shadow 2 — Drop (বাইরের শ্যাডো) */
export function DropShadowCircle({
  size = 300,
  bg = "#E5E5E5",
  shadowColor = "rgba(13,39,80,0.16)",
  className = "",
  children,
}: CircleProps) {
  return (
    <div
      style={
        {
          width: size,
          height: size,
          "--bg": bg,
          "--sh": shadowColor,
        } as React.CSSProperties
      }
      className={`relative grid place-items-center rounded-full bg-[var(--bg)]
                  shadow-[28px_28px_50px_var(--sh)] ${className}`}
    >
      {children}
    </div>
  );
}

/** Shadow 4 — Inner (ভিতরের শ্যাডো/বেভেল) */
export function InnerShadowCircle({
  size = 300,
  bg = "#E5E5E5",
  shadowColor = "rgba(13,39,80,0.16)", // নিচের দিকের ইনসেট শ্যাডো
  highlightColor = "rgba(255,255,255,1)", // ওপরের দিকের ইনসেট হাইলাইট
  className = "",
  children,
}: CircleProps) {
  return (
    <div
      style={
        {
          width: size,
          height: size,
          "--bg": bg,
          "--sh": shadowColor,
          "--hl": highlightColor,
        } as React.CSSProperties
      }
      className={`relative grid place-items-center rounded-full bg-[var(--bg)]
                  shadow-[inset_-23px_-23px_45px_var(--hl),inset_26px_26px_48px_var(--sh)] ${className}`}
    >
      {children}
    </div>
  );
}

/** Mixed — Drop + Inner (দুটোর মিশ্রণ) */
export function MixedCircle({
  size = 383,
  bg = "#E5E5E5",
  shadowColor = "rgba(13,39,80,0.16)",
  highlightColor = "rgba(255,255,255,0.64)",
  className = "",
  children,
}: CircleProps) {
  return (
    <div
      style={
        {
          width: size,
          height: size,
          "--bg": bg,
          "--sh": shadowColor,
          "--hl": highlightColor,
        } as React.CSSProperties
      }
      className={`relative grid place-items-center rounded-full bg-[var(--bg)]
                  shadow-[28px_28px_50px_var(--sh),inset_-31px_-31px_43px_var(--hl),inset_26px_26px_48px_var(--sh)] ${className}`}
    >
      {children}
    </div>
  );
}
