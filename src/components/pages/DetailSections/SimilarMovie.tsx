"use client";
import { useParams } from "next/navigation";
import scss from "./SimilarMovie.module.scss";
import {
  useGetMovieSimilarQuery,
  useGetTVSimilarQuery,
} from "@/redux/api/detail";
import Bloks from "@/components/ui/homeComponents/Bloks";
import Skeleton from "@/components/ui/Sceleton/Sceleton";

const SimilarMovie = () => {
  const { movieQuary, tvQuary } = useParams(); // Убедись, что названия совпадают с параметрами маршрутизации

  // Получение данных для похожих фильмов и шоу
  const { data: movieSimilar, isLoading: mLoad } = useGetMovieSimilarQuery(
    +movieQuary
  );
  const { data: tvSimilar, isLoading: tvLoad } = useGetTVSimilarQuery(+tvQuary);

  const results = movieSimilar || tvSimilar;
  const load = mLoad || tvLoad;

  return (
    <section className={scss.SimilarMovie}>
      <div className="container">
        <div className={scss.content}>
          <h1>Similar {movieSimilar ? "Movies" : "TV Shows"}</h1>
          {load ? (
            <div className={scss.skeletonContainer}>
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} />
                ))}
            </div>
          ) : // После загрузки отображаем реальный контент
          results ? (
            <Bloks data={results} />
          ) : (
            <p>похожих данных нет</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SimilarMovie;
