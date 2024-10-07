"use client";
import { useState } from "react";
import scss from "./Popular.module.scss";
import { useGetPopularQuery } from "@/redux/api/popular";
import Bloks from "../../ui/homeComponents/Bloks";
import Skeleton from "@/components/ui/Sceleton/Sceleton";

const Popular = () => {
  const [popular, setPopular] = useState("movie");
  const { data, isLoading } = useGetPopularQuery(popular);
  return (
    <section className={scss.Popular}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.popularHeader}>
            <h1>Popular</h1>
            <div className={scss.popularBtnBlock}>
              <button
                className={
                  popular === "movie"
                    ? `${scss.movies} ${scss.active}`
                    : scss.movies
                }
                onClick={() => setPopular("movie")}
              >
                Movies
              </button>
              <button
                className={
                  popular === "tv"
                    ? `${scss.TVShow} ${scss.active}`
                    : scss.TVShow
                }
                onClick={() => setPopular("tv")}
              >
                TV Show
              </button>
            </div>
          </div>
          <div className={scss.bigBox}>
            {/* Если данные загружаются, показываем скелетон */}
            {isLoading ? (
              <div className={scss.skeletonContainer}>
                {Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton key={index} />
                  ))}
              </div>
            ) : (
              // После загрузки отображаем реальный контент
              <Bloks data={data!} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Popular;
