/* ── Page — wire up BoosterDrawer to confirm before cancelling ───────────── */

"use client";

import BoosterBackground from "@/components/booster/BoosterBackground";
import BoosterChart from "@/components/booster/BoosterChart";
import MonthlyBoosterPanel from "@/components/booster/MonthlyBoosterPanel";

import BoosterDrawer from "@/components/booster/BoosterDrawer"; // ← import the drawer
import InsetCircleParent from "@/components/ui-buttons/InsetCircleParent";
import SubmitButton from "@/components/ui-buttons/SubmitButton";

import { formatBalance } from "@/lib/functions";
import Logo from "@/public/images/logos/logo_black.png";
import {
  useBoosterProfitTransferMutation,
  useCancelBoosterMutation,
  useGetUserBoosterQuery,
} from "@/redux/features/booster/boosterApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Page() {
  const { user } = useSelector((state: any) => state.auth);
  const isBooster = user?.is_booster;

  const { data } = useGetUserBoosterQuery(undefined);
  const { booster } = data || {};

  const [cancelBooster, { isLoading: busy, isError, isSuccess, error }] =
    useCancelBoosterMutation();

  const [
    profitTransfer,
    {
      isLoading: busyTransfer,
      isError: isErrorTransfer,
      isSuccess: isSuccessTransfer,
      error: errorTransfer,
    },
  ] = useBoosterProfitTransferMutation();

  const handleSubmit = async () => {
    await cancelBooster({}).unwrap();
  };

  const handleProfitTransfer = async () => {
    await profitTransfer({}).unwrap();
  };

  useEffect(() => {
    if (isError)
      toast.error(
        (error as fetchBaseQueryError)?.data?.message ?? "Something went wrong"
      );
    if (isSuccess) {
      toast.success("Booster canceled successfully");
    }
  }, [isError, isSuccess, error]);

  useEffect(() => {
    if (isErrorTransfer)
      toast.error(
        (errorTransfer as fetchBaseQueryError)?.data?.message ??
          "Something went wrong"
      );
    if (isSuccessTransfer) {
      toast.success("Profit transferred successfully");
    }
  }, [isErrorTransfer, isSuccessTransfer, errorTransfer]);

  /* ── NEW: control the drawer ────────── */
  const [openCancelDrawer, setOpenCancelDrawer] = useState(false);

  return (
    <BoosterBackground>
      {isBooster ? (
        <div className="flex flex-col gap-4 items-center h-full bg-[#0a1c25] pt-4 px-1">
          {/* Chart */}
          <div className="w-full mx-auto">
            <div className="relative flex flex-col items-center justify-between z-40 space-y-3">
              <div className="absolute top-[35%] md:top-[50%]">
                <Image src={Logo} alt="logo" className="w-40 md:w-72" />
              </div>
              <div className="w-full mx-auto md:h-[300px]">
                <BoosterChart />
              </div>
            </div>
          </div>

          <InsetCircleParent size={200} className="mx-auto">
            <div className="flex text-xs gap-2 flex-col  place-items-start justify-center">
              <span className="text-white/90 font-semibold ">
                Amount: {formatBalance(booster?.amount || 0)} USDT
              </span>
              <span className="text-white/90 font-semibold">
                Profit: {formatBalance(booster?.profit || 0)} USDT
              </span>
            </div>
          </InsetCircleParent>

          <div className="flex flex-col gap-2 items-center w-full">
            {/* Open drawer instead of cancelling directly */}

            {booster?.is_active && (
              <SubmitButton
                onClick={() => setOpenCancelDrawer(true)}
                size="sm"
                className="w-full"
              >
                Cancel Booster
              </SubmitButton>
            )}

            {booster?.isPermitToTransfer && (
              <SubmitButton
                onClick={handleProfitTransfer}
                size="sm"
                className="w-full"
              >
                Transfer Profit {formatBalance(booster?.profit || 0)} USDT
              </SubmitButton>
            )}

            <Link href="/booster-history" className="w-full">
              <SubmitButton size="sm" className="w-full">
                Booster History
              </SubmitButton>
            </Link>
          </div>

          {/* Confirmation Drawer */}
          <BoosterDrawer
            open={openCancelDrawer}
            onOpenChange={setOpenCancelDrawer}
            amount={booster?.amount}
            busy={busy}
            onConfirm={handleSubmit}
          />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-1 md:py-12">
          <MonthlyBoosterPanel />
        </div>
      )}
    </BoosterBackground>
  );
}
