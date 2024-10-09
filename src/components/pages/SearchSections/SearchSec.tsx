"use client";
import { useSearchQuery } from "@/redux/api/Search";
import scss from "./SearchSec.module.scss";
import { useParams } from "next/navigation";
import Loader from "@/components/ui/loader/Loader";
import Bloks from "@/components/ui/homeComponents/Bloks";

const SearchSec = () => {
  const params = useParams();
  const { searchQ } = params;

  const { data, isLoading } = useSearchQuery(String(searchQ));

  return (
    <section className={scss.SearchSec}>
      <div className="container">
        {isLoading ? (
          <Loader />
        ) : (
          <div className={scss.content}>
            {data && data.results && data.results.length > 0 ? (
              <div className={scss.search}>
                <h1>Search for Your Favorite Movies</h1>
                <div className={scss.box}>
                  <Bloks data={data} type="list" />
                </div>
              </div>
            ) : (
              <p>Такого фильма нету :{searchQ}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchSec;
