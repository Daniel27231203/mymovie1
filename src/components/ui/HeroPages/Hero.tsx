"use client";
import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "@/redux/api/AllProduct";
import scss from "./Hero.module.scss";
import { useParams } from "next/navigation";
import Bloks from "../homeComponents/Bloks";
import Loader from "../loader/Loader";
import { useGetGenreQuery } from "@/redux/api/Genre";

const Hero: React.FC = () => {
  const { movieq, tvq } = useParams();
  const value = movieq || tvq;

  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<any[]>([]);
  5;

  const [genres, setGenres] = useState<any>("");

  const [sort, setSort] = useState<string>("");

  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    value: String(value),
    page: page,
    genre: String(genres),
    sort: sort,
  });

  const { data: genre } = useGetGenreQuery(String(value));

  useEffect(() => {
    setProducts([]);
    setPage(1); // сбрасываем страницу при смене жанра
  }, [genres, sort]);
  useEffect(() => {
    if (data) {
      setProducts((prev) => [...prev, ...data.results]); // добавляем новые данные в список
    }
  }, [data]);

  let obj = {
    results: products,
  };

  // Следим за прокруткой и загружаем следующую страницу
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 && // условие для загрузки
        !isFetching
      ) {
        setPage((prev) => prev + 1); // увеличиваем страницу
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // убираем слушатель при размонтировании
  }, [isFetching]);

  return (
    <section className={scss.HeroMovie}>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="container">
            <div className={scss.content}>
              <div className={scss.heroTitle}>
                <h2>Explore Movies....</h2>
                <div className={scss.filterBlock}>
                  <select
                    onChange={(e) => {
                      e.target.value ? setGenres(e.target.value) : "";
                    }}
                    name=""
                    id=""
                  >
                    {genre?.genres.map((el) => (
                      <>
                        <option key={el.id} value={el.id}>
                          {el.name}
                        </option>
                      </>
                    ))}
                  </select>
                  <select
                    onChange={(e) => {
                      e.target.value ? setSort(e.target.value) : "";
                    }}
                    name=""
                    id=""
                  >
                    <option value="popularity.desc">
                      Popularity Descending
                    </option>
                    <option value="popularity.asc">Popularity Ascending</option>
                    <option value="vote_average.desc">
                      Raiting Descending
                    </option>
                    <option value="vote_average.asc">Raiting Ascending</option>
                    <option value="primary_release_date.desc">
                      Release Descending
                    </option>
                    <option value="primary_release_date.asc">
                      Release Ascending
                    </option>
                    <option value="original_title.asc">A-Z</option>
                  </select>
                </div>
              </div>
              <Bloks data={obj} type="list" value={String(value)} />
              {isLoading || isFetching ? (
                <div className={scss.loader}>Loading more...</div>
              ) : null}
            </div>
          </div>
        )}
      </>
    </section>
  );
};

export default Hero;
