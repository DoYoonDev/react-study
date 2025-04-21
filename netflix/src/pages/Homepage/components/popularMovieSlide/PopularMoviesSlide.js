import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const PopularMoviesSlide = () => {
  const { data, error, isLoading, isError } = usePopularMoviesQuery();
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <Alert variant="danger">Error: {error.message}</Alert>;
  }
  return (
    <div className="text-white">
      <MovieSlider
        title="Popular Movies"
        movies={data.results}
        response={responsive}
      />
    </div>
  );
};

export default PopularMoviesSlide;
