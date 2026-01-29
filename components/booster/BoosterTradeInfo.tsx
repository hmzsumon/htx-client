/* ── BoosterTradeInfoCard — smart card with thin golden border (0.5px) ──── */

"use client";

export default function BoosterTradeInfoCard() {
  return (
    <section
      className="
        relative rounded-xl p-[0.5px]
        bg-gradient-to-r from-[#C6A64F] via-[#F1D47A] to-[#C6A64F]
        shadow-[0_8px_24px_rgba(0,0,0,0.35)]
      "
    >
      <div
        className="
          rounded-xl bg-[#0e2330]/90
          px-4 py-4 md:px-6 md:py-5
          text-xs md:text-sm text-white/90
          shadow-[inset_0_1px_0_rgba(255,255,255,.06)]
        "
      >
        <h3 className="font-semibold tracking-tight">
          🚀 Welcome to Booster Trade!
        </h3>

        <p className="mt-2 leading-relaxed">
          Take your investment to the next level and earn daily profits by
          joining Booster Trade. This is a special trading program where you can
          start with just $50 and earn unlimited income every day.
        </p>

        <div className="mt-4 space-y-2">
          <h4 className="font-semibold tracking-tight">
            📌 Key Features of Booster Trade
          </h4>
          <ul className="space-y-1">
            <li>✅ Minimum Join Amount: $50 to Unlimited</li>
            <li>✅ Trading Fee: Only 2%</li>
            <li>✅ Daily Income: 0% up to 15%</li>
            <li>✅ Trading Starts: 3rd of every month</li>
            <li>✅ Trading Ends: 1st of every month</li>
            <li>✅ Booster bonus: 5%, 2% & 1% for 1st, 2nd & 3rd level</li>
          </ul>
        </div>

        <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="space-y-2">
          <h4 className="font-semibold tracking-tight">📅 Joining Rules</h4>

          <p>
            You can join <strong>Booster Trade</strong> on any day starting from
            the <strong>3rd</strong> of every month.
          </p>
          <p>
            However, if someone activates Booster{" "}
            <strong>after the 20th</strong> of the month:
          </p>
          <ul className="space-y-1">
            <li>
              🔸 They will <strong>NOT</strong> be eligible for the{" "}
              <strong>Booster Bonus</strong>
            </li>
            <li>
              🔸 But they can still participate in{" "}
              <strong>Booster Trade</strong>
            </li>
          </ul>
        </div>

        <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="space-y-2">
          <h4 className="font-semibold tracking-tight">
            🎯 Why Choose Booster Trade?
          </h4>
          <ul className="space-y-1">
            <li>✨ Low investment, high returns</li>
            <li>✨ Earn daily income</li>
            <li>✨ Unlimited joining capacity</li>
            <li>✨ Trusted &amp; secure trading platform.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
