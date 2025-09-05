/* ── MonthlyBoosterPanel — import & render BoosterTradeInfo at bottom ────── */

"use client";
import "./Booster.css";

import {
  useCreateBoosterMutation,
  useGetMyBoosterSummaryQuery,
} from "@/redux/features/booster/boosterApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import { useEffect } from "react";
import toast from "react-hot-toast";
import BoosterTradeInfo from "./BoosterTradeInfo";
import ReserveForm from "./ReserveForm";
import StatsRow from "./StatsRow";
import Surface from "./Surface";
import { formatBDT } from "./utils";

/* ── helpers ────────── */
function getNextMonthFirst(base = new Date()): Date {
  const y = base.getFullYear();
  const m = base.getMonth();
  return new Date(y, m + 1, 1);
}
function formatMonthDayYear(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function MonthlyBoosterPanel() {
  /* ── data ────────── */
  const { data, isLoading, refetch } = useGetMyBoosterSummaryQuery();
  const { boosterSummary } = data || {};
  const cycle = boosterSummary?.current_amount ?? 0;
  const totalLocked = boosterSummary?.boosterSummary ?? 0;

  /* ── next payout (1st of next month, no time) ────────── */
  const nextPayoutText = formatMonthDayYear(getNextMonthFirst());

  /* ── mutation ────────── */
  const [createBooster, { isLoading: isReserving, error, isSuccess, isError }] =
    useCreateBoosterMutation();

  const handleSubmit = async (payload: any) => {
    await createBooster(payload).unwrap();
  };

  /* ── toasts ────────── */
  useEffect(() => {
    if (isError)
      toast.error(
        (error as fetchBaseQueryError)?.data?.message ?? "Something went wrong"
      );
    if (isSuccess) {
      toast.success("Booster reserved successfully");
      refetch();
    }
  }, [isError, isSuccess, error, refetch, isLoading, isReserving]);

  /* ── render ────────── */
  return (
    <Surface>
      <div className="p-2 md:p-6">
        <div className="mt-1 text-white">
          <h2 className="text-2xl md:text-3xl text-center font-extrabold">
            Monthly Booster
          </h2>
          <p className="text-white/75 text-xs mt-1 text-center">
            Reserve for the month. Get boosted on the 1st.
          </p>
        </div>

        <div className="mt-5">
          <StatsRow
            currentCycle={formatBDT(cycle)}
            totalLockedText={formatBDT(totalLocked)}
            nextPayoutText={nextPayoutText}
          />
        </div>

        <div className="mt-6">
          <ReserveForm busy={isReserving} onSubmit={handleSubmit} />
        </div>

        {/* ── Booster trade copy (text-xs) ────────── */}
        <div className="mt-8 text-white">
          <BoosterTradeInfo />
        </div>
      </div>
    </Surface>
  );
}
