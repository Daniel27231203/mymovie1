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

  // State для хранения данных и текущей страницы
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<any[]>([]);

  // Получаем данные через запрос с параметром страницы
  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    value: String(value),
    page: page,
  });

  const { data: genre } = useGetGenreQuery(String(value));
  console.log("🚀 ~ genre:", genre);

  // Следим за изменениями в данных и обновляем список продуктов
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
                  <select name="" id="">
                    {genre?.genres.map((el) => (
                      <>
                        <option value={el.id}>{el.name}</option>
                      </>
                    ))}
                  </select>
                  <select name="" id="">
                    <option value="">Popularity</option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
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
