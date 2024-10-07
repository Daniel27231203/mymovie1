"use client";
import { useParams } from "next/navigation";
import scss from "./ItemDetail.module.scss";
import {
  useGetDetailMovieQuery,
  useGetDetailTvQuery,
  useGetMCreditsQuery,
  useGetMovieVideoQuery,
  useGetTVCreditsQuery,
  useGetTVVideoQuery,
} from "@/redux/api/detail";
import CircularRating from "../../ui/homeComponents/Circle";
import WatchTrailerButton from "./PlayBtn";
import { useState } from "react";
import Treiler from "@/components/ui/DetailUI/Treiler";
import Loader from "@/components/ui/loader/Loader";

const ItemDetail = () => {
  // State для открытия трейлера
  const [treilerModal, setTreilerModal] = useState(false);

  // Извлечение параметров маршрута
  const { movieQuary, tvQuary } = useParams();

  // Получение данных о фильме или сериале
  const { data: movie, isLoading: movieLoad } = useGetDetailMovieQuery(
    +movieQuary
  );
  const { data: tv, isLoading: tvLoad } = useGetDetailTvQuery(+tvQuary);
  const load = movieLoad || tvLoad;

  // Получение трейлеров
  const { data: Mtreiler } = useGetMovieVideoQuery(+movieQuary);
  const { data: Ttreiler } = useGetTVVideoQuery(+tvQuary);
  const keyForVideo = Mtreiler?.results?.[0]?.key;
  const keyForTVVideo = Ttreiler?.results?.[0]?.key;

  // Получение информации о создателях
  const { data: MovieCredits } = useGetMCreditsQuery(+movieQuary);
  const { data: TVCredits } = useGetTVCreditsQuery(+tvQuary);
  const creditsMap = MovieCredits || TVCredits;

  // Фильтрация режиссёров и сценаристов
  const director =
    creditsMap?.crew?.filter((el) => el.known_for_department === "Directing") ||
    [];
  const writer =
    creditsMap?.crew?.filter((el) => el.known_for_department === "Writing") ||
    [];

  // Форматирование даты
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Получение рейтинга и времени выполнения
  const movieAvarage = movie?.vote_average;
  const tvAvarage = tv?.vote_average;

  const formatRuntime = (time: number | undefined): string => {
    if (!time) return "0h 00min";
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}h ${minutes < 10 ? "0" : ""}${minutes}min`;
  };

  const runtime = movie
    ? formatRuntime(movie.runtime)
    : formatRuntime(tv?.episode_run_time?.[0]);

  return (
    <section className={scss.ItemDetail}>
      {load ? (
        <Loader />
      ) : (
        <div className={scss.detailBg}>
          <img
            src={
              movie
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : `https://image.tmdb.org/t/p/original${tv?.backdrop_path}`
            }
            alt=""
          />
          <div className={scss.detbg}></div>
        </div>
      )}
      <div className="container">
        {load ? (
          <h1>Loading...</h1>
        ) : (
          <div className={scss.content}>
            <div className={scss.block}>
              <img
                src={
                  movie
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : `https://image.tmdb.org/t/p/original${tv?.poster_path}`
                }
                alt=""
              />
              <div className={scss.detailTitle}>
                <h1>{movie ? movie.title : tv?.name}</h1>
                <p className={scss.tangle}>
                  {movie ? movie.tagline : tv?.tagline}
                </p>
                <div className={scss.genres}>
                  {(movie?.genres || tv?.genres || []).map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
                </div>
                <div className={scss.play}>
                  <div className={scss.circle}>
                    <CircularRating
                      rating={movie ? movieAvarage! : tvAvarage!}
                    />
                  </div>
                  <div className={scss.PlayBtn}>
                    <WatchTrailerButton onClick={() => setTreilerModal(true)} />
                  </div>
                </div>
                <div className={scss.overview}>
                  <h4>Overview</h4>
                  <p>{movie ? movie.overview : tv?.overview}</p>
                </div>
                <div className={scss.detBlock}>
                  <div className={scss.blocks}>
                    <div className={scss.detBox}>
                      <h5>Status:</h5>
                      <span>{movie ? movie.status : tv?.status}</span>
                    </div>
                    <div className={scss.detBox}>
                      <h5>Release Date:</h5>
                      <span>
                        {formatDate(
                          movie?.release_date || tv?.first_air_date || ""
                        )}
                      </span>
                    </div>
                    <div className={scss.detBox}>
                      <h5>Runtime:</h5>
                      <span>{runtime}</span>
                    </div>
                  </div>
                  <div className={scss.hr}></div>
                </div>
                <div className={scss.detBlock}>
                  <div className={scss.detBox}>
                    <h5>Director:</h5>
                    <span>{director[0]?.name || "Unknown"}</span>
                  </div>
                  <div className={scss.hr}></div>
                </div>
                <div className={scss.detBlock}>
                  <div className={scss.detBox}>
                    <h5>Writer:</h5>
                    <span>{writer[0]?.name || "Unknown"}</span>
                  </div>
                  <div className={scss.hr}></div>
                </div>
              </div>
            </div>
            {treilerModal && (
              <div className={scss.treilerModal}>
                <Treiler
                  setTreilerModal={setTreilerModal}
                  idMovie={keyForVideo || keyForTVVideo || ""}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ItemDetail;
