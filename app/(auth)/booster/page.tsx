"use client";

/* ── Page shell wrapped by BoosterBackground ─────────────────────────────── */

import BoosterBackground from "@/components/booster/BoosterBackground";
import MonthlyBoosterPanel from "@/components/booster/MonthlyBoosterPanel";
import InsetCircleParent from "@/components/ui-buttons/InsetCircleParent";
import { useGetUserBoosterQuery } from "@/redux/features/booster/boosterApi";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Page() {
  const { user } = useSelector((state: any) => state.auth);
  const isBooster = user?.is_booster;

  /* ── Call useGetUserBoosterQuery ──── */
  const { data } = useGetUserBoosterQuery(undefined);
  const { booster } = data || {};

  return (
    <BoosterBackground>
      {isBooster ? (
        <div className="flex flex-col gap-4 items-center min-h-[85vh]  bg-[#0a1c25] pt-4 px-1">
          <InsetCircleParent size={250} className="mx-auto">
            <span className="text-white/90 font-semibold">
              {booster?.amount} / {booster?.profit} USDT
            </span>
          </InsetCircleParent>

          <Link
            href="/booster-history"
            className="px-6 py-2 border border-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition"
          >
            <span className="text-white/90 font-semibold">View History</span>
          </Link>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-1 md:py-12">
          <MonthlyBoosterPanel />
        </div>
      )}
    </BoosterBackground>
  );
}
/* ── End of Page shell ───────────────────────────────────────────────────── */
