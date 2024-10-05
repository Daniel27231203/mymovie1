import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getTopRaited: builder.query<
      TOPRAITED.GetTopRaitedResponse,
      TOPRAITED.GetTopRaitedRequest
    >({
      query: (query) => ({
        url: `/${query}/top_rated`,
      }),
      providesTags: ["top_rated"],
    }),
  }),
});

export const { useGetTopRaitedQuery } = api;
