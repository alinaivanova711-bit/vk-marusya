import "./InfoMovieMeta.scss";
import { Rating } from "../Rating/Rating";
import type { Movie } from "../../types/movie";

type Props = {
  movie: Movie;
  className?: string;
};

export const InfoMovieMeta = ({ movie, className = "" }: Props) => {
  if (!movie) return null;

  return (
        <div className={`InfoMovieMeta__meta ${className}`}>
            {movie.tmdbRating && (
            <Rating rating={movie.tmdbRating} className="InfoMovieMeta__rating" />
            )}

            {movie.releaseYear && (
            <span className="InfoMovieMeta__year">{movie.releaseYear}</span>
            )}

            {movie.genres?.length > 0 && (
            <span className="InfoMovieMeta__genre">
                {movie.genres.join(", ")}
            </span>
            )}

            {movie.runtime && (
            <span className="InfoMovieMeta__length">
                {movie.runtime} мин
            </span>
            )}
        </div>    
  );
};