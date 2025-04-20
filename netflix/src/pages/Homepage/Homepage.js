import React from "react";
import Banner from "./components/banner/Banner";
import PopularMoviesSlide from "./components/popularMovieSlide/PopularMoviesSlide";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMoviesSlide/>
    </div>
  );
};

export default Homepage;
