/* ── Minimal form composing AmountInput, Switch, and submit button ───────── */

"use client";
import { useState } from "react";
import AmountInput from "./AmountInput";
import AutoRolloverSwitch from "./AutoRolloverSwitch";
import ReserveButton from "./ReserveButton";

type Props = {
  onSubmit: (payload: {
    amount: number;
    autoRollover: boolean;
  }) => Promise<void> | void;
  busy?: boolean;
};

export default function ReserveForm({ onSubmit, busy }: Props) {
  /* ── Local UI state only; network handled by parent via onSubmit ───────── */
  const [amount, setAmount] = useState<number>(0);
  const [rollover, setRollover] = useState<boolean>(true);

  /* ── Prevent invalid submissions; backend still validates strictly ─────── */
  const handle = async () => {
    if (!amount || amount <= 0) return;
    await onSubmit({ amount, autoRollover: rollover });
    setAmount(0); // optional reset after success
  };

  /* ── Simple vertical stack with link to historical reservations ────────── */
  return (
    <div className="grid gap-3">
      <AmountInput value={amount} onChange={setAmount} />
      <AutoRolloverSwitch checked={rollover} onChange={setRollover} />
      <ReserveButton
        disabled={busy || amount <= 0}
        loading={busy}
        onClick={handle}
      />
      <div className="text-center">
        <a className="text-white/80 hover:underline" href="/booster/history">
          View History
        </a>
      </div>
    </div>
  );
}
