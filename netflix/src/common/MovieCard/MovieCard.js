import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { data: genreData } = useMovieGenreQuery();
  const showGenre = (genreIdList) => {
    if (!genreData) {
      return [];
    }
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://image.tmdb.org/t/p/w533_and_h300_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      <div className="overlay">
        <h3>{movie.title}</h3>
        {showGenre(movie.genre_ids).map((genre, id) => (
          <Badge bg="danger" key={id}>
            {genre}
          </Badge>
        ))}
        <div className="movie-info">
          <div>{movie.vote_average}</div>
          <div>{movie.popularity}</div>
          <div>{movie.adult ? "over18" : "under18"}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
