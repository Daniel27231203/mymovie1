"use client";
import { useState } from "react";
import scss from "./TopRaited.module.scss";
import { useGetTopRaitedQuery } from "@/redux/api/TopRaited";
import Bloks from "./homeComponents/Bloks";
const TopRaited = () => {
  const [topRated, setTopRated] = useState("movie");
  const { data, isLoading } = useGetTopRaitedQuery(topRated);
  return (
    <section className={scss.TopRated}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.topRatedHeader}>
            <h1>Top Rated</h1>
            <div className={scss.topRatedBtnBlock}>
              <button
                className={
                  topRated === "movie"
                    ? `${scss.movie} ${scss.active}`
                    : scss.movie
                }
                onClick={() => setTopRated("movie")}
              >
                Movie
              </button>
              <button
                className={
                  topRated === "tv"
                    ? `${scss.TVShow} ${scss.active}`
                    : scss.TVShow
                }
                onClick={() => setTopRated("tv")}
              >
                TV Show
              </button>
            </div>
          </div>
          <div className={scss.bigBox}>
            {isLoading ? <h1>load</h1> : <Bloks data={data!} value={topRated}/>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopRaited;
