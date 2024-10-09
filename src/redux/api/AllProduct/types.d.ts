namespace ALLPRODUCT {
  type GetAllProductResponse = IMoviePage | ITVPage;
  type GetAllProductRequest = {
    page: number;
    value: string;
    genre: string;
    sort: string;
  };
}
