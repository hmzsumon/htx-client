/* ── BoosterDrawer — add overlay with #171717 (80% opacity) ──────────────── */

"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  // If your shadcn/ui exports this, use it:
  DrawerOverlay,
  DrawerTitle,
} from "@/components/ui/drawer";

/* ── Props ────────── */
type BoosterDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount?: number;
  busy?: boolean;
  onConfirm: () => Promise<void> | void;
  feeRate?: number; // e.g. 0.10 for 10%
};

/* ── Helper ────────── */
const fmtUSDT = (n: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

/* ── Component ────────── */
export default function BoosterDrawer({
  open,
  onOpenChange,
  amount = 0,
  busy = false,
  onConfirm,
  feeRate = 0.15,
}: BoosterDrawerProps) {
  const fee = Math.max(0, amount * feeRate);
  const credit = Math.max(0, amount - fee);

  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {/* Overlay with #171717 */}
      {/* If DrawerOverlay is available in your ui/drawer, use it: */}
      <DrawerOverlay className="fixed inset-0 z-40 bg-[#171717]/80" />

      {/* Fallback: if DrawerOverlay is NOT exported, uncomment this block:
      {open && (
        <div
          aria-hidden
          className="fixed inset-0 z-40 bg-[#171717]/80"
          onClick={() => onOpenChange(false)}
        />
      )}
      */}

      <DrawerContent className="max-h-[85vh] rounded-t-3xl drawer-wrapper py-3 z-50">
        <DrawerHeader>
          <DrawerTitle>Booster Cancel Confirmation</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>

        <div className="space-y-3 px-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to cancel your booster? This action cannot be
            undone.
          </p>

          {/* ── Highlight: 10% deduction note ────────── */}
          <div className="rounded-lg border border-amber-400/40 bg-amber-400/10 p-3 text-xs text-amber-300">
            <span className="font-semibold">Note:</span> A{" "}
            <span className="font-semibold">10% deduction</span> will be applied
            from your booster amount.
            <div className="mt-1">
              Deduction:{" "}
              <span className="font-semibold">{fmtUSDT(fee)} USDT</span> • You
              will receive:{" "}
              <span className="font-semibold">{fmtUSDT(credit)} USDT</span>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Upon cancellation, your remaining booster amount of{" "}
            <span className="font-semibold">{fmtUSDT(amount)} USDT</span> will
            be credited back to your main balance after the deduction.
          </p>
        </div>

        <DrawerFooter className="px-4">
          <Button
            className="w-full font-bold text-white"
            variant="destructive"
            disabled={busy}
            onClick={handleConfirm}
          >
            {busy ? "Cancelling..." : "Confirm Cancel Booster"}
          </Button>

          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Never mind
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
