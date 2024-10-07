import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      ALLPRODUCT.GetAllProductResponse,
      ALLPRODUCT.GetAllProductRequest
    >({
      query: ({ value, page }) => ({
        url: `/discover/${value}`,
        method: "GET",
        params: {
          page: page,
        },
      }),
    }),
  }),
});
export const { useGetAllProductsQuery } = api;
