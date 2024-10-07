import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getGenre: builder.query<GENRES.GetGenresResponse, GENRES.GetGenresRequest>({
      query: (value) => ({
        url: `/genre/${value}/list`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetGenreQuery } = api;
