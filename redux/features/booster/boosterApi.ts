import { apiSlice } from "../api/apiSlice";

export const boosterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyBoosterSummary: builder.query<any, void>({
      query: () => ({ url: "/booster/summary" }),
      providesTags: ["Booster"],
    }),
    /* ── create ne booster ───────────────────────────────── */
    createBooster: builder.mutation<any, any>({
      query: (body) => ({ url: "/booster/new", method: "POST", body }),
      invalidatesTags: ["User", "Booster"],
    }),

    /* ── Get user booster ───────────────────────────────── */
    getUserBooster: builder.query<any, any>({
      query: () => `/booster/me`,
      providesTags: ["Booster"],
    }),
    /* ── cancel user booster ───────────────────────────────── */
    cancelBooster: builder.mutation<any, any>({
      query: (body) => ({ url: "/booster/cancel", method: "POST", body }),
      invalidatesTags: ["User", "Booster"],
    }),

    /* ── get logged in user booster logs ───────────────────────────────── */
    getBoosterLogs: builder.query<any, any>({
      query: () => `/booster/profit/logs`,
      providesTags: ["Booster"],
    }),
  }),
});

export const {
  useGetMyBoosterSummaryQuery,
  useCreateBoosterMutation,
  useGetUserBoosterQuery,
  useCancelBoosterMutation,
  useGetBoosterLogsQuery,
} = boosterApi;
