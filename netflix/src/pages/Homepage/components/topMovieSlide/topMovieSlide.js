import React from "react";
import { useTopMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const TopMovieSlide = () => {
  const { data, error, isLoading, isError } = useTopMoviesQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <Alert variant="danger">Error: {error.message}</Alert>;
  }
  return (
    <div className="text-white">
      <MovieSlider
        title="Top Rated Movies"
        movies={data.results}
        response={responsive}
      />
    </div>
  );
};

export default TopMovieSlide;
