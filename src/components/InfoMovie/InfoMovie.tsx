import "./InfoMovie.scss";
import { Button } from "../../ui/Button/Button";
import { InfoMovieMeta } from "../InfoMovieMeta/InfoMovieMeta";
import Like from '../../assets/like-icon.svg?react';
import Update from '../../assets/update.svg?react';
import { useState, useEffect } from "react";
import { TrailerModal } from "../TrailerModal/TrailerModal";
import { useMe } from "../../hooks/useMe";
import { useNavigate } from "react-router-dom";

type Props = {
  movie: any;
  onAuthRequired: () => void;
  onUpdate?: () => void;
  showDetailsButton?: boolean;
  showUpdateButton?: boolean;
};


export const InfoMovie = ({ movie, onAuthRequired, onUpdate, showDetailsButton, showUpdateButton}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: user, status } = useMe();
  const navigate = useNavigate();

  const handleFavorite = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    try {
      const body = new URLSearchParams({
        id: movie.id
      }).toString()
      const response = await fetch(
        isFavorite
          ? `https://cinemaguide.skillbox.cc/favorites/${movie.id}`
          : `https://cinemaguide.skillbox.cc/favorites`,
        {
          method: isFavorite ? "DELETE" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": isFavorite ? "application/json" : "application/x-www-form-urlencoded",
          },
          body: isFavorite ? null : body,
        }
      );

      if (!response.ok) {
        console.log(await response.text());
        throw new Error();
      }

      setIsFavorite(!isFavorite);
    } catch (e) {
      console.log(e);
      onAuthRequired();
    }
  };

  useEffect(() => {
    const checkFavorite = async () => {
      if (!user) return;

      const res = await fetch("https://cinemaguide.skillbox.cc/favorites", {
        credentials: "include",
      });

      if (!res.ok) return;

      const data = await res.json();
      const exists = data.some(
        (fav: any) => String(fav.id) === String(movie.id)
      );
      setIsFavorite(exists);
    };

    if (movie && user) checkFavorite();

  }, [movie, user]);

  const handleUpdate = () => {
    onUpdate?.();
  };

  const handleMovieInfo = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="InfoMovie">
      {isOpen && (
        <TrailerModal
          url={movie.trailerUrl}
          title={movie.title}
          onClose={() => setIsOpen(false)}
        />
      )}
      <div className="InfoMovie__content">
        <InfoMovieMeta movie={movie} className="InfoMovie__info" />
        <h1 className="InfoMovie__title">
          {movie.title || movie.originalTitle}
        </h1>

        <p className="InfoMovie__description">
          {movie.plot}
        </p>

        <div className="InfoMovie__actions">
          <Button className="InfoMovie__btn InfoMovie__btn--xl" type="button" title="Трейлер" size="medium" variant="primary" onClick={() => setIsOpen(true)} />
          {showDetailsButton && (<Button className="InfoMovie__btn" type="button" title="О фильме" size="medium" variant="secondary" onClick={handleMovieInfo}/>)}
          <Button className="InfoMovie__btn  button InfoMovie__btn--like" type="button" size="small" variant="secondary" onClick={handleFavorite}>
            <span className="InfoMovie__btn-wrapper">
              <Like width={24} height={24} style={{ stroke: isFavorite ? "none" : "white", fill: isFavorite ? "#B4A9FF" : "none" }}/>
            </span>
          </Button>
          {showUpdateButton && (<Button className="InfoMovie__btn  button InfoMovie__btn--like" type="button" size="small" variant="secondary" onClick={handleUpdate}>
            <span className="InfoMovie__btn-wrapper">
              <Update width={24} height={24} />
            </span>
          </Button>)}
        </div>
      </div>
      <img className="InfoMovie__image"  src={movie.backdropUrl} alt={movie.title} width={680} />
    </div>
  );
};