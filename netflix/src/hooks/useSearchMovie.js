import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({keyword, page, genre, sortOrder}) => {  
  if (keyword) {
    return api.get(`/search/movie?query=${keyword}&page=${page}&sort_by=${sortOrder}`);
  }

  if (genre) {
    return api.get(`/discover/movie?with_genres=${genre}&page=${page}&sort_by=${sortOrder}`);
  }

  return api.get(`/movie/popular?page=${page}&sort_by=${sortOrder}`);
};

export const useSearchMovieQuery = ({keyword, page, genre, sortOrder}) => {
  return useQuery({
    queryKey: ["movie-search", {keyword, page, genre, sortOrder}],
    queryFn: () => fetchSearchMovie({keyword, page, genre, sortOrder}),
    select: (result) => result.data,
  });
};
