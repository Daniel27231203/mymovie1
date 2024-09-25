import React from "react";
import Welcome from "./HomeSections/Welcome";
import Tranding from "./HomeSections/Tranding";
import Popular from "./HomeSections/Popular";
import TopRaited from "./HomeSections/TopRaited";

const HomePage = () => {
  return (
    <>
      <Welcome />
      <Tranding />
      <Popular />
      <TopRaited />
    </>
  );
};

export default HomePage;
