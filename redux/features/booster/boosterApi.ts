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
  }),
});

export const {
  useGetMyBoosterSummaryQuery,
  useCreateBoosterMutation,
  useGetUserBoosterQuery,
} = boosterApi;
