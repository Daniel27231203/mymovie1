"use client";
import { useParams } from "next/navigation";
import scss from "./Recomendation.module.scss";
import { useGetMovieRecQuery, useGetTVRecQuery } from "@/redux/api/detail";
import Bloks from "@/components/ui/homeComponents/Bloks";

const Recomendation = () => {
  const { movieQuary, tvQuary } = useParams();
  const { data: mRec, isLoading: mLoad } = useGetMovieRecQuery(+movieQuary);
  const { data: tvRec, isLoading: tvLoad } = useGetTVRecQuery(+tvQuary);

  const results = mRec || tvRec;
  const load = mLoad || tvLoad;

  return (
    <section className={scss.Recomendation}>
      <div className="container">
        <div className={scss.content}>
          <h1>Recommendations {mRec ? "Movies" : "TV Shows"}</h1>
          {results ? (
            <Bloks data={results} load={load} />
          ) : (
            <p>Похожие данные не найдены.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Recomendation;
