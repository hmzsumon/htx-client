/* ── Lightweight UI formatters used across Booster components ────────────── */

export const formatBDT = (n: number) =>
  ` ${Number(n || 0).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })} USDT`;

export const formatDateTime = (d?: Date | string | number) => {
  /* ── Defensive formatting for undefined/invalid dates ──────────────────── */
  if (!d) return "-";
  const dt = new Date(d);
  return dt.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
