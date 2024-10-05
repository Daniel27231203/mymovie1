import { FC } from "react";
import scss from "./Bloks.module.scss";
import "react-circular-progressbar/dist/styles.css";
import CircularRating from "./Circle";
import { useRouter } from "next/navigation";
interface IData {
  data: ITrending | IPopular | ITopRated;
  value?: string;
}

const Bloks: FC<IData> = ({ data, value }) => {
  console.log("🚀 ~ data:", data);
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
    <div className={scss.blocks}>
      {data?.results.map((item, index) => (
        <>
          <div
            onClick={() => {
              router.push(`/${value || "movie"}/${item.id}`);
            }}
            key={item.id || index}
            className={scss.block}
          >
            <div className={scss.ganre}>
              {item.genre_ids.map((genreId) => (
                <span key={genreId}>{}</span>
              ))}
            </div>
            <div className={scss.box}>
              <div className={scss.circleRai}>
                <CircularRating rating={item.vote_average} />
              </div>
              <img
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt="movie"
              />
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
