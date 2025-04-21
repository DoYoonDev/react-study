import React from "react";
import Banner from "./components/banner/Banner";
import PopularMoviesSlide from "./components/popularMovieSlide/PopularMoviesSlide";
import TopMoviesSlide from "./components/topMovieSlide/topMovieSlide";
import UpcomingMoviesSlide from "./components/upcomingMovieSlide/upcomingMovieSlide";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMoviesSlide/>
      <TopMoviesSlide/>
      <UpcomingMoviesSlide />
    </div>
  );
};

export default Homepage;
