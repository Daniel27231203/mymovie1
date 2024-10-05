import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getPopular: builder.query<
      POPULAR.GetPopularResponse,
      POPULAR.GetPopularRequest
    >({
      query: (query) => ({
        url: `/${query}/popular`,
      }),
      providesTags: ["popular"],
    }),
  }),
});

export const { useGetPopularQuery } = api;
