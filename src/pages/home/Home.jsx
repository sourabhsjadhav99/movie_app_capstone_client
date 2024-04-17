import React from "react";

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (

      <div className="homePage p-2">
        <HeroBanner />
        <Trending />
        <Popular />
        <TopRated />
      </div>

  );
};

export default Home;
