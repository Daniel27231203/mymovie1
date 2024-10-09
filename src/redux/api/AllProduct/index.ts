import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      ALLPRODUCT.GetAllProductResponse,
      ALLPRODUCT.GetAllProductRequest
    >({
      query: ({ value, page, genre, sort }) => ({
        url: `/discover/${value}`,
        method: "GET",
        params: {
          page: page,
          with_genres: genre,
          sort_by: sort,
        },
      }),
    }),
  }),
});
export const { useGetAllProductsQuery } = api;
