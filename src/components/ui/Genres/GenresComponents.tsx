import { useGetGenreQuery } from "@/redux/api/Genre";
import scss from "./GenreComponents.module.scss";
import { FC } from "react";

interface GenreId {
  genreId: number[];
  type: "tv" | "movie";
}

const GenresComponents: FC<GenreId> = ({ genreId, type }) => {
  const { data: movieGenre } = useGetGenreQuery("movie");
  const { data: tvGenre } = useGetGenreQuery("tv");

  let resId;

  if (type === "movie") {
    resId = movieGenre?.genres.filter((el: any) => genreId.includes(el.id));
  } else {
    resId = tvGenre?.genres.filter((el: any) => genreId.includes(el.id));
  }

  return resId?.length ? (
    <div className={scss.Genre}>
      {resId?.slice(0, 2).map((genre) => (
        <span key={genre.id}>{genre.name}</span>
      ))}
    </div>
  ) : null;
};

export default GenresComponents;
