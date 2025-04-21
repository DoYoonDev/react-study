import { useQuery } from '@tanstack/react-query';
import api from '../utils/api.js';

const fetchMovieGenre = () => {
    return api.get('/genre/movie/list');
}

export const useMovieGenreQuery = () => {
    return useQuery({
        queryKey: ['movie-genre'],
        queryFn: fetchMovieGenre,
        select:(result)=>result.data.genres,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}