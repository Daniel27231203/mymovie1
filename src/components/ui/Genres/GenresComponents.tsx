import { useGetGenreQuery } from "@/redux/api/Genre";
import scss from "./GenreComponents.module.scss";
import { FC } from "react";

interface GenreId {
  genreId: number[];
  type: "tv" | "movie";
}

const GenresComponents: FC<GenreId> = ({ genreId, type }) => {
  // Получаем жанры для фильмов и ТВ-шоу
  const { data: movieGenre, isError: isMovieError } = useGetGenreQuery("movie");
  const { data: tvGenre, isError: isTvError } = useGetGenreQuery("tv");

  // Проверка на ошибки при запросе данных
  if (isMovieError || isTvError) {
    console.error("Error fetching genres");
    return null;
  }

  // Проверка на то, что genreId является массивом
  if (!Array.isArray(genreId) || genreId.length === 0) {
    console.warn("Invalid genreId provided. Expected a non-empty array.");
    return null;
  }

  // Определяем, с какими жанрами работать (фильм или ТВ)
  let resId;
  if (type === "movie") {
    resId = movieGenre?.genres.filter((el: any) => genreId.includes(el.id));
  } else {
    resId = tvGenre?.genres.filter((el: any) => genreId.includes(el.id));
  }

  // Если жанры найдены, отображаем их
  return resId?.length ? (
    <div className={scss.Genre}>
      {resId.slice(0, 2).map((genre: any) => (
        <span key={genre.id}>{genre.name}</span>
      ))}
    </div>
  ) : null;
};

export default GenresComponents;
