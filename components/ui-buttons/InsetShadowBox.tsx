/* InsetShadowBox.tsx — parent container, dark-only, same design */
"use client";
import React from "react";

type Props = {
  children?: React.ReactNode;
  size?: number; // default 300 (আপনার আগের সাইজ)
  radius?: number; // default 35 (আপনার আগের রেডিয়াস)
  circle?: boolean; // true দিলে পুরো গোল
  className?: string;
};

export default function InsetShadowBox({
  children,
  size = 300,
  radius = 35,
  circle = false,
  className = "",
}: Props) {
  return (
    <>
      <div
        className={`shape inset-shadow ${className}`}
        style={{
          width: size,
          height: size,
          borderRadius: circle ? "9999px" : `${radius}px`,
        }}
      >
        {children}
      </div>

      <style>{`
        .shape {
          position: relative;
          display: grid;
          place-items: center; /* children center */
        }
        .inset-shadow {
          background-color: #212548; /* your dark panel */
          box-shadow:
             -12px -12px 30px 2px rgba(255,255,255,0.04),
             12px  12px 30px 5px rgba(0,0,0,0.55);
        }
      `}</style>
    </>
  );
}
