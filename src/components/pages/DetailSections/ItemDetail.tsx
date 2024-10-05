"use client";
import { useParams } from "next/navigation";
import scss from "./ItemDetail.module.scss";
import {
  useGetDetailMovieQuery,
  useGetDetailTvQuery,
  useGetMCreditsQuery,
  useGetMovieVideoQuery,
  useGetTVCreditsQuery,
} from "@/redux/api/detail";
import CircularRating from "../HomeSections/homeComponents/Circle";
import WatchTrailerButton from "./PlayBtn";
import { useState } from "react";
import Treiler from "@/components/ui/DetailUI/Treiler";

const ItemDetail = () => {
  //  states

  const [treilerModal, setTreilerModal] = useState(false);

  //
  const { movieQuary, tvQuary } = useParams(); // Убедись, что названия совпадают с параметрами маршрутизации
  const { data: movie, isLoading: movieLoad } = useGetDetailMovieQuery(
    +movieQuary
  );
  const { data: tv, isLoading: tvLoad } = useGetDetailTvQuery(+tvQuary);
  const { data: Mtreiler } = useGetMovieVideoQuery(+movieQuary);
  const keyForVideo = Mtreiler?.results.find((el) => el);

  const { data: MovieCredits } = useGetMCreditsQuery(+movieQuary);
  const { data: TVCredits } = useGetTVCreditsQuery(+tvQuary);

  const creditsMap = MovieCredits ? MovieCredits : TVCredits;
  const director =
    creditsMap?.crew?.filter((el) => el.known_for_department === "Directing") ||
    [];
  const writer =
    creditsMap?.crew?.filter((el) => el.known_for_department === "Writing") ||
    [];

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-EN", options);
  };

  const movieAvarage = movie?.vote_average;
  const tvAvarage = tv?.vote_average;

  // get time for hour and minute

  const movieTime = movie ? movie.runtime / 60 : null;
  const hourMTime = movieTime ? String(Math.floor(movieTime)) : "0";
  const minuteMTime = movieTime
    ? String(Math.round((movieTime - Math.floor(movieTime)) * 60))
    : "00";

  const tvTime = tv ? tv.episode_run_time?.[0] / 60 : null;
  const hourTVTime = tvTime ? String(Math.floor(tvTime)) : "0";
  const minuteTVTime = tvTime
    ? String(Math.round((tvTime - Math.floor(tvTime)) * 60))
    : "00";

  return (
    <section className={scss.ItemDetail}>
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
      <div className="container">
        {movieLoad || tvLoad ? (
          <>
            <h1>Loading...</h1>
          </>
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
                <div className={scss.modal}>
                  <h1>{movie ? movie.title : tv?.name}</h1>
                  <img
                    className={scss.modalImg}
                    src={
                      movie
                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                        : `https://image.tmdb.org/t/p/original${tv?.poster_path}`
                    }
                    alt=""
                  />{" "}
                </div>
                <p className={scss.tangle}>
                  {movie ? movie.tagline : tv?.tagline}
                </p>
                <div className={scss.genres}>
                  {movie?.genres?.map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
                  {tv?.genres?.map((genre) => (
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
                    <WatchTrailerButton
                      onClick={() => {
                        setTreilerModal(true); //
                      }}
                    />
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
                          movie ? movie.release_date : tv!.first_air_date
                        )}
                      </span>
                    </div>
                    <div className={scss.detBox}>
                      <h5>Runtime:</h5>
                      <span>{`${movie ? hourMTime : hourTVTime}h ${
                        movie ? minuteMTime : minuteTVTime
                      }min`}</span>
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
                  idMovie={keyForVideo?.key!}
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
