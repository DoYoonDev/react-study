import React from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const UpcomingMovieSlide = () => {
    const { data, error, isLoading, isError } = useUpcomingMoviesQuery();
    console.log("ttt", data);
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (isError) {
      return <Alert variant="danger">Error: {error.message}</Alert>;
    }
    return (
      <div className="text-white">
      <MovieSlider
        title="Upcoming Movies"
        movies={data.results}
        response={responsive}
      />
    </div>
    );
}

export default UpcomingMovieSlide
