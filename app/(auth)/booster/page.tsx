/* ── Page shell wrapped by BoosterBackground ─────────────────────────────── */

import BoosterBackground from "@/components/booster/BoosterBackground";
import MonthlyBoosterPanel from "@/components/booster/MonthlyBoosterPanel";

export default function Page() {
  /* ── Full-height bokeh background + centered content ──────────────────── */
  return (
    <BoosterBackground>
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <MonthlyBoosterPanel />
      </div>
    </BoosterBackground>
  );
}
