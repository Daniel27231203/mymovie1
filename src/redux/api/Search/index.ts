import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query<SEARCH.GetSearchResponse, SEARCH.GetSearchRequest>({
      query: (searchvalue) => ({
        url: `search/multi?query=${searchvalue}`,
      }),
    }),
  }),
});

export const { useSearchQuery } = api;
