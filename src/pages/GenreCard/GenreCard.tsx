import type { FC } from "react"
import { Link } from "react-router-dom"
import { memo, useEffect, useState } from "react"
import { api } from "../../api/api";
import "./_GenreCard.scss"


type Props = {
    genre: string, 
    name:string
}

export const GenreCard: FC<Props> = memo(({ genre, name }) => {
    const [picture, setPicture] = useState<string>();
    useEffect(() => {
        const fetchListMovies = async () => {
          try {
            const response = await api.get("/movie", {
                params: {
                    genre: genre
                },
            });
            randomImgFilm(response.data);
          } catch (error) {
            console.error("Ошибка при загрузке списка фильмов", error);
          }
        };
        fetchListMovies();
    }, []);

    const randomImgFilm = (arr:[{posterUrl:string}]) => {
        const randomFilm = Math.floor(Math.random()*arr.length);
        const film = arr[randomFilm];
        const picture = film.posterUrl;
        setPicture(picture)
    }

    return (
        <Link
            to={`/genres/${genre}`}
            key={genre}
            className="GenreCard"
        >
            <div className="GenreCard__wrapper">
              <img
                src={picture}
                alt={name}
                className="GenreCard__image"
              />
              <p className="GenreCard__text">{name}</p>
            </div>
        </Link>
    )
})