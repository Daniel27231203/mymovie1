"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";

const SearchMovie = () => {
  const router = useRouter();
  const [hasFocusInput, setHasFocusInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (hasFocusInput) {
      if (searchValue) {
        router.push(`/search/${searchValue}`);
      } else {
        router.push(`/search/search`);
      }
    }
  }, [searchValue]);

  return (
    <>
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        value={searchValue}
        onReset={true}
        style={{
          color: "black",
        }}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        onFocus={() => {
          setHasFocusInput(true);
          router.push("/search/search");
        }}
      />
    </>
  );
};

export default SearchMovie;
