"use client";
import { useParams } from "next/navigation";
import scss from "./Videos.module.scss";
import {
  useGetDetailMovieQuery,
  useGetDetailTvQuery,
  useGetMovieVideoQuery,
  useGetTVVideoQuery,
} from "@/redux/api/detail";
import { useState } from "react";
import Treiler from "@/components/ui/DetailUI/Treiler";

const Videos = () => {
  const { movieQuary, tvQuary } = useParams(); // Убедись, что названия совпадают с параметрами маршрутизации

  const [modalTreiler, setModalTreiler] = useState(false);

  const { data: Mtreiler } = useGetMovieVideoQuery(+movieQuary);
  const mVideo = Mtreiler?.results.find((el) => el);
  const { data: Ttreiler } = useGetTVVideoQuery(+tvQuary);
  const tvVideo = Ttreiler?.results.find((el) => el);

  // all infa
  const { data: movie } = useGetDetailMovieQuery(+movieQuary);
  const { data: tv } = useGetDetailTvQuery(+tvQuary);

  const resultsMap = Mtreiler ? Mtreiler.results : Ttreiler?.results;

  return (
    <section className={scss.Videos}>
      <div className="container">
        <div className={scss.content}>
          <h1>Official Videos</h1>
          <div className={scss.blocks}>
            {resultsMap?.slice(0, 4).map((el, index) => (
              <>
                <div
                  onClick={() => {
                    setModalTreiler(true);
                  }}
                  key={index}
                  className={scss.block}
                >
                  <img
                    src={`https://img.youtube.com/vi/${el.key}/mqdefault.jpg`}
                    alt="image"
                  />

                  <h4>{el.name}</h4>
                </div>
              </>
            ))}
          </div>
        </div>
        {modalTreiler ? (
          <div className={scss.TreilerBlock}>
            <Treiler
              setTreilerModal={setModalTreiler}
              idMovie={mVideo ? mVideo.key : tvVideo?.key}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Videos;
