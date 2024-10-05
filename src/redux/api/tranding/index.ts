import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getTranding: builder.query<
      TRENDING.GetTrendingResponse,
      TRENDING.GetTrendingRequest
    >({
      query: (query) => ({
        url: `/trending/movie/${query}`,
      }),
      providesTags: ["trending"],
    }),
  }),
});

export const { useGetTrandingQuery } = api;
