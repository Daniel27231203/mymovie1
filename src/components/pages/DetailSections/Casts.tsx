"use client";
import { useParams } from "next/navigation";
import scss from "./Casts.module.scss";
import { useGetMCreditsQuery, useGetTVCreditsQuery } from "@/redux/api/detail";

const Casts = () => {
  const { movieQuary, tvQuary } = useParams();

  //   credits get
  const { data: MovieCredits } = useGetMCreditsQuery(+movieQuary);
  const { data: TVCredits } = useGetTVCreditsQuery(+tvQuary);

  // to map
  const creditsMap = MovieCredits ? MovieCredits : TVCredits;
  return (
    <section className={scss.Casts}>
      <div className="container">
        <div className={scss.content}>
          <h1>Top Cast</h1>
          <div className={scss.blocks}>
            {creditsMap?.cast.map((el, index) => (
              <div key={index} className={scss.block}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${el.profile_path}`}
                  alt=""
                />
                <div className={scss.info}>
                  <h2>{el.name}</h2>
                  <p>{el.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Casts;
