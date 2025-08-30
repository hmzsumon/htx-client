/* ── Orchestrates data fetching and renders the Monthly Booster UI ───────── */
/* ── Responsibilities: query summary, run reserve mutation, compose layout ─ */

"use client";

import {
  useGetMyBoosterSummaryQuery,
  useReserveBoosterMutation,
} from "@/redux/features/booster/boosterApi";
import Banner from "./Banner";
import ReserveForm from "./ReserveForm";
import StatsRow from "./StatsRow";
import Surface from "./Surface";
import { formatBDT, formatDateTime } from "./utils";

export default function MonthlyBoosterPanel() {
  /* ── Load user's booster summary (cycle, totals, next payout) ──────────── */
  const { data, isLoading, refetch } = useGetMyBoosterSummaryQuery();

  /* ── Prepare mutation to reserve and refetch after success ─────────────── */
  const [reserve, { isLoading: isReserving }] = useReserveBoosterMutation();

  const cycle = data?.data?.currentCycle ?? "-";
  const totalLocked = data?.data?.totalLocked ?? 0;
  const nextPayoutAt = data?.data?.nextPayoutAt ?? null;

  const bannerMsg =
    "Booster is OPEN — Reserve now. Payout on the 1st (Asia/Dhaka).";

  /* ── Compose surface → banner → title → stats → form ───────────────────── */
  return (
    <Surface>
      <div className="p-4 md:p-6">
        <Banner message={bannerMsg} tone="info" />

        {/* ── Title and short value proposition ────────────────────────────── */}
        <div className="mt-5 text-white">
          <h2 className="text-2xl md:text-3xl font-extrabold">
            Monthly Booster
          </h2>
          <p className="text-white/75 mt-1">
            Reserve for the month. Get boosted on the 1st.
          </p>
        </div>

        {/* ── KPIs are preformatted to keep this component light ───────────── */}
        <div className="mt-5">
          <StatsRow
            currentCycle={cycle}
            totalLockedText={formatBDT(totalLocked)}
            nextPayoutText={nextPayoutAt ? formatDateTime(nextPayoutAt) : "-"}
          />
        </div>

        {/* ── Submit reservation and refresh summary afterwards ────────────── */}
        <div className="mt-6">
          <ReserveForm
            busy={isReserving}
            onSubmit={async (p) => {
              await reserve(p).unwrap();
              await refetch();
            }}
          />
        </div>
      </div>
    </Surface>
  );
}
