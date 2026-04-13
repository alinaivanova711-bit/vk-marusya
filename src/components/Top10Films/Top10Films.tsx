import { Link } from "react-router-dom";
import {  memo, useState } from "react";
import "./_Top10Films.scss"


export const Top10Films = memo(({ movies }: { movies: any[] }) => {
  const [visibleCount, setVisibleCount] = useState(10);

  return (
    <div className="Top10Films">
      <h2 className="Top10Films__title">Топ 10 фильмов</h2>

      {movies.length === 0 ? (
        <p>У вас пока нет избранных фильмов</p>
      ) : (
        <ul className="Top10Films__list">
          {movies.slice(0, visibleCount).map((movie, index) => (
            <li className="Top10Films__item" key={movie.id}>
              <Link className="Top10Films__link" to={`/movie/${movie.id}`}>
                <img
                  className="Top10Films__img"
                  src={movie.posterUrl}
                  alt={movie.title}
                  loading="lazy"
                  width={250}
                  height={300}
                />
              </Link>
              <span className="Top10Films__number">
                {index + 1}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});