/* ── কমেন্ট ───────────────────────────────── */
/** RTK Query endpoints for "Monthly Booster".
 *  - reserveBooster: lock an amount for the current cycle
 *  - getMyBoosterSummary: read current cycle, total locked, next payout
 */

import { apiSlice } from "../api/apiSlice";

export const boosterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    reserveBooster: builder.mutation<
      { success: boolean; data: any },
      { amount: number; autoRollover?: boolean }
    >({
      /* ── কমেন্ট ───────────────────────────────── */
      // POST to backend; invalidates "User" (balance) and "Booster" cache
      query: (body) => ({ url: "/booster/reserve", method: "POST", body }),
      invalidatesTags: ["User", "Booster"],
    }),

    getMyBoosterSummary: builder.query<any, void>({
      /* ── কমেন্ট ───────────────────────────────── */
      // GET the user's active reservations and computed totals
      query: () => ({ url: "/booster/me/summary" }),
      providesTags: ["Booster"],
    }),
  }),
});

export const { useReserveBoosterMutation, useGetMyBoosterSummaryQuery } =
  boosterApi;
