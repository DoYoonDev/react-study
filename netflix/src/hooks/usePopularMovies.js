import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
const fetchPopularMovies = () => {
    return api.get(`/movie/popular`);
}

const fetchTopMovies = () => {
    return api.get(`/movie/top_rated`);
}

const fetchUpcomingMovies = () => {
    return api.get(`/movie/upcoming`);
}

export const usePopularMoviesQuery = () => {
    return useQuery({
        queryKey: ['movie-popular'],
        queryFn:fetchPopularMovies,
        select: (result) => result.data,
        // refetchOnWindowFocus: false, 
        // refetchOnMount: false,
    });
}

export const useTopMoviesQuery = () => {
    return useQuery({
        queryKey: ['movie-top'],
        queryFn:fetchTopMovies,
        select: (result) => result.data,
        // refetchOnWindowFocus: false, 
        // refetchOnMount: false,
    });
}

export const useUpcomingMoviesQuery = () => {
    return useQuery({
        queryKey: ['movie-upcoming'],
        queryFn:fetchUpcomingMovies,
        select: (result) => result.data,
        // refetchOnWindowFocus: false, 
        // refetchOnMount: false,
    });
}