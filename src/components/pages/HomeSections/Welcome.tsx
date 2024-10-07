"use client";
import Loader from "@/components/ui/loader/Loader";
import scss from "./Welcome.module.scss";
import { useGetUpcomingQuery } from "@/redux/api/upcoming";
import { useEffect, useState } from "react";

const Welcome = () => {
  const { data } = useGetUpcomingQuery();
  const [backRandomImage, setBackRandomImage] = useState<string>("");
  console.log("🚀 ~ Welcome ~ backRandomImage:", backRandomImage);

  const backgroundRandomImage = () => {
    if (data?.results) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const res = data.results[randomIndex].backdrop_path;
      setBackRandomImage(`https://image.tmdb.org/t/p/original${res}`);
    }
  };

  useEffect(() => {
    backgroundRandomImage();
  }, [data]);
  return (
    <div className={scss.all}>
      {backRandomImage ? (
        <div className={scss.Bg}>
          <img
            className={scss.bgImage}
            src={backRandomImage}
            alt="movieImage"
            width={1920}
            height={700}
          />
          <div className={scss.bg}></div>
        </div>
      ) : (
        <Loader />
      )}
      <section className={scss.Welcome}>
        <div className="container">
          <div className={scss.content}>
            {backRandomImage ? (
              <>
                {/* fix */}
                <h1></h1>
                <p>Открой для себя лучшие фильмы и шоу — всё в одном месте!</p>
                <div className={scss.searchBlock}>
                  <input type="text" placeholder="search movie or TV show" />
                  <button>search</button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
