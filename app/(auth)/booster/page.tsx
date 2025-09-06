"use client";

/* ── Page shell wrapped by BoosterBackground ─────────────────────────────── */
import BoosterBackground from "@/components/booster/BoosterBackground";
import MonthlyBoosterPanel from "@/components/booster/MonthlyBoosterPanel";
import InsetCircleParent from "@/components/ui-buttons/InsetCircleParent";
import SubmitButton from "@/components/ui-buttons/SubmitButton";
import {
  useCancelBoosterMutation,
  useGetUserBoosterQuery,
} from "@/redux/features/booster/boosterApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Page() {
  const { user } = useSelector((state: any) => state.auth);
  const isBooster = user?.is_booster;

  /* ── Call useGetUserBoosterQuery ──── */
  const { data } = useGetUserBoosterQuery(undefined);
  const { booster } = data || {};

  const [cancelBooster, { isLoading: busy, isError, isSuccess, error }] =
    useCancelBoosterMutation();

  const handleSubmit = async () => {
    await cancelBooster({}).unwrap();
  };

  /* ── toasts ────────── */
  useEffect(() => {
    if (isError)
      toast.error(
        (error as fetchBaseQueryError)?.data?.message ?? "Something went wrong"
      );
    if (isSuccess) {
      toast.success("Booster canceled successfully");
    }
  }, [isError, isSuccess, error]);

  return (
    <BoosterBackground>
      {isBooster ? (
        <div className="flex flex-col gap-4 items-center min-h-[85vh]  bg-[#0a1c25] pt-4 px-1">
          <InsetCircleParent size={200} className="mx-auto">
            <span className="text-white/90 font-semibold">
              {booster?.amount} / {booster?.profit} USDT
            </span>
          </InsetCircleParent>

          <div className="flex flex-col gap-2 items-center w-full">
            {/* ── Submit button ────────── */}
            <SubmitButton
              onClick={handleSubmit}
              size="sm"
              loading={busy}
              className="w-full"
            >
              Cancel Booster
            </SubmitButton>

            <Link href="/booster-history" className="w-full">
              <SubmitButton size="sm" className="w-full">
                Booster History
              </SubmitButton>
            </Link>
          </div>
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
