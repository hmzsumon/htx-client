/* InsetCircleParent.tsx — same design, parent container */
"use client";
import clsx from "clsx";
import React from "react";

type Props = {
  /** ভেতরের সার্কেলের ডায়ামিটার (px). ডিফল্ট: 300 */
  size?: number;
  className?: string;
  children?: React.ReactNode;
};

export default function InsetCircleParent({
  size = 300,
  className = "",
  children,
}: Props) {
  return (
    <div className={clsx("text-center", className)}>
      {/* outer inset panel (exactly your design) */}
      <div
        className={clsx(
          "p-6 rounded-xl",
          // inset-shadow (bg + two inset shadows)
          "bg-[#0c1e28]",
          "shadow-[inset_-12px_-12px_30px_5px_rgba(255,255,255,0.08),_inset_12px_12px_30px_5px_rgba(0,0,0,0.55)]"
        )}
      >
        <div className="grid place-items-center">
          {/* inner circle (exactly your design) */}
          <div
            style={{ width: size, height: size }}
            className={clsx(
              "rounded-full grid place-items-center",
              "bg-[#102533]",
              "shadow-[-12px_-12px_30px_5px_rgba(255,255,255,0.08),_12px_12px_30px_5px_rgba(0,0,0,0.55)]"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
