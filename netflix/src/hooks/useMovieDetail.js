import { useQuery } from "@tanstack/react-query";
import api from "../utils/api.js";

// const fetchMovieDetail = ({id}) => {
//     return api.get(`/movie/${id}`);
// }

const fetchMovieDetail = async ({ id }) => {
  const [movieRes, reviewsRes, recommendationsRes, videos] = await Promise.all([
    api.get(`/movie/${id}`),
    api.get(`/movie/${id}/reviews`),
    api.get(`/movie/${id}/recommendations`),
    api.get(`/movie/${id}/videos`),
  ]);

  return {
    movie: movieRes.data,
    reviews: reviewsRes.data.results,
    recommendations: recommendationsRes.data.results,
    videos: videos.data.results,
  };
};

export const useMovieDetailQuery = ({ id }) => {
  return useQuery({
    queryKey: ["movie-detail", { id }],
    queryFn: () => fetchMovieDetail({ id }),
  });
};
