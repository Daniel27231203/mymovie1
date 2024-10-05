import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getDetailMovie: builder.query<
      DETAIL.GetDetailResponse,
      DETAIL.GetDetailRequest
    >({
      query: (_id) => ({
        url: `/movie/${_id}`,
        method: "GET",
      }),
    }),
    getDetailTv: builder.query<
      DETAIL.GetDetailTVResponse,
      DETAIL.GetDetailTVRequest
    >({
      query: (_id) => ({
        url: `/tv/${_id}`,
        method: "GET",
      }),
    }),
    getMCredits: builder.query<
      DETAIL.GetDetailCreditsMResponse,
      DETAIL.GetDetailCreditsMRequest
    >({
      query: (_id) => ({
        url: `/movie/${_id}/credits`,
        method: "GET",
      }),
    }),
    getTVCredits: builder.query<
      DETAIL.GetDetailCreditsTVResponse,
      DETAIL.GetDetailCreditsTVRequest
    >({
      query: (_id) => ({
        url: `/tv/${_id}/credits`,
        method: "GET",
      }),
    }),
    getMovieVideo: builder.query<
      DETAIL.GetDetailTreilerMResponse,
      DETAIL.GetDetailTreiletMRequest
    >({
      query: (_id) => ({
        url: `/movie/${_id}/videos`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetDetailMovieQuery,
  useGetDetailTvQuery,
  useGetMCreditsQuery,
  useGetTVCreditsQuery,
  useGetMovieVideoQuery,
} = api;
