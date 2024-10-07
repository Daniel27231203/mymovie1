import React from "react";
import ItemDetail from "./DetailSections/ItemDetail";
import Casts from "./DetailSections/Casts";
import Videos from "./DetailSections/Videos";
import SimilarMovie from "./DetailSections/SimilarMovie";
import Recomendation from "./DetailSections/Recomendation";

const DetailPage = () => {
  return (
    <>
      <ItemDetail />
      <Casts />
      <Videos />
      <SimilarMovie />
      <Recomendation />
    </>
  );
};

export default DetailPage;
