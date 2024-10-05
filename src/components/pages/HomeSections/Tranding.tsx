"use client";
import { useGetTrandingQuery } from "@/redux/api/tranding";
import scss from "./Tranding.module.scss";
import { useState } from "react";
import Bloks from "./homeComponents/Bloks";

const Tranding = () => {
  const [trending, setTranding] = useState("day");
  const { data, isLoading } = useGetTrandingQuery(trending);

  return (
    <section className={scss.Tranding}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.trendingHeader}>
            <h1>Trending</h1>
            <div className={scss.trendingBtnBlock}>
              <button
                className={
                  trending === "day" ? `${scss.day} ${scss.active}` : scss.day
                }
                onClick={() => setTranding("day")}
              >
                Day
              </button>
              <button
                className={
                  trending === "week"
                    ? `${scss.week} ${scss.active}`
                    : scss.week
                }
                onClick={() => setTranding("week")}
              >
                Week
              </button>
            </div>
          </div>
          <div className={scss.bigBox}>
            {isLoading ? <h1>load</h1> : <Bloks data={data!} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tranding;
