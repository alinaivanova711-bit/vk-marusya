import { Link } from "react-router-dom";
import "./_SearchCard.scss";
import { InfoMovieMeta } from "../InfoMovieMeta/InfoMovieMeta";

type Props = {
  movie: any;
  onClick?: () => void;
};

export const SearchCard = ({ movie, onClick }: Props) => {
  return (
    <Link to={`/movie/${movie.id}`} className="search-card" onClick={onClick}>
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="search-card__img"
        width={40}
        height={52}
      />
      <div className={`search-card__info`}>
        <InfoMovieMeta movie={movie} />
        <p className="search-card__title">
          {movie.title || movie.originalTitle}
        </p>
      </div>
    </Link>
  );
};