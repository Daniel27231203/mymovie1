import { FC } from "react";
import scss from "./Bloks.module.scss";
import "react-circular-progressbar/dist/styles.css";
import CircularRating from "./Circle";
import { useRouter } from "next/navigation";
import GenresComponents from "../Genres/GenresComponents";
interface IData {
  data: ITrending | IPopular | ITopRated;
  value?: string;
  load?: boolean;
  type?: string;
}

const Bloks: FC<IData> = ({ data, value, type }) => {
  const router = useRouter();
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-EN", options);
  };

  return (
    <div className={type === "list" ? scss.list : scss.blocks}>
      {data?.results.map((item, index) => (
        <>
          <div
            onClick={() => {
              router.push(`/${value || "movie"}/${item.id}`);
            }}
            key={index}
            className={scss.block}
          >
            <div className={scss.ganre}>
              <GenresComponents
                genreId={item.genre_ids}
                type={value === "tv" ? "tv" : "movie"}
              />
            </div>
            <div className={scss.box}>
              <div className={scss.circleRai}>
                <CircularRating rating={item.vote_average} />
              </div>
              {item.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  alt="ma"
                />
              ) : (
                <img
                  className={scss.imageNoPoster}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/No_poster.svg/640px-No_poster.svg.png"
                  alt="ma"
                />
              )}
              <h3>{item.title || item.name}</h3>
              <p>{formatDate(item.release_date || item.first_air_date)}</p>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Bloks;
