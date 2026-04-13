import { api } from "./api";
import type { Movie } from "../types/movie";

interface FetchMoviesByGenreParams {
  genre: string;
  limit?: number;
}

export const fetchMoviesByGenre = async (
  params: FetchMoviesByGenreParams
): Promise<Movie[]> => {
  const { genre, limit = 10 } = params;
  
  const response = await api.get<Movie[]>("/movie", {
    params: { genre, limit },
  });
  
  return response.data;
};

export const fetchMoviePosterByGenre = async (
  genre: string
): Promise<string | null> => {
  try {
    const movies = await fetchMoviesByGenre({ genre, limit: 1 });
    const movie = movies[0];
    
    return movie?.posterUrl || null;
  } catch {
    return null;
  }
};