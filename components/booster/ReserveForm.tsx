/* ── ReserveForm: Amount + Auto-rollover + Submit ────────── */

"use client";
import { useState } from "react";
import AmountInput from "./AmountInput";
import AutoRolloverSwitch from "./AutoRolloverSwitch";
import ReserveButton from "./ReserveButton";

/* ── Props ────────── */
type Props = {
  onSubmit: (payload: {
    amount: number;
    autoRollover: boolean;
  }) => Promise<void> | void;
  busy?: boolean;
};

/* ── Validation: minimum threshold ────────── */
const MIN_AMOUNT = 50;

/* ── Component ────────── */
export default function ReserveForm({ onSubmit, busy }: Props) {
  /* ── Local state ────────── */
  const [amount, setAmount] = useState<number>(0);
  const [rollover, setRollover] = useState<boolean>(true);

  /* ── Derived flags ────────── */
  const isInvalid = amount > 0 && amount < MIN_AMOUNT;

  /* ── Submit handler ────────── */
  const handle = async () => {
    if (!amount || amount < MIN_AMOUNT) return;
    await onSubmit({ amount, autoRollover: rollover });
    setAmount(0); // optional reset
  };

  /* ── Layout ────────── */
  return (
    <div className="grid gap-3">
      {/* ── Amount input + inline error ────────── */}
      <div>
        <AmountInput value={amount} onChange={setAmount} />
        {isInvalid && (
          <p
            className="mt-1 text-sm text-red-400"
            role="alert"
            aria-live="polite"
          >
            Minimum amount is {MIN_AMOUNT}.
          </p>
        )}
      </div>

      {/* ── Auto-rollover switch ────────── */}
      <AutoRolloverSwitch checked={rollover} onChange={setRollover} />

      {/* ── Submit button ────────── */}
      <ReserveButton
        disabled={busy || amount < MIN_AMOUNT}
        loading={busy}
        onClick={handle}
      />

      {/* ── Link to history ────────── */}
      <div className="text-center">
        <a className="text-white/80 hover:underline" href="/booster/history">
          View History
        </a>
      </div>
    </div>
  );
}
