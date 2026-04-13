import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { Loader } from "../Loader/Loader";
import { Button } from "../../ui/Button/Button";
import IconClose from "../../assets/icon-closing-cross.svg?react";
import "./_FavoriteFilms.scss"

export const FavoriteFilms = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(15)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
            setLoading(true)
            const response = await api.get("/favorites")
            setMovies(response.data)
            } catch (error) {
            console.error("Ошибка загрузки фильмов", error)
            } finally {
            setLoading(false)
            }
        }

        fetchMovies()
    }, [])

    const handleClose = async (id: number) => {
        try {
            await api.delete(`/favorites/${id}`);
            setMovies(prev => prev.filter(movie => movie.id !== id));
        } catch (error) {
            console.error("Ошибка удаления", error);
        }
    };
    
    return (
        <>
            <div className="FavoriteFilms">
                {loading ? (
                    <div><Loader /></div>
                ) : (
                    <>
                        {movies.length === 0 && !loading && (
                            <p>У вас пока нет избранных фильмов</p>
                        )}
                        <ul className="FavoriteFilms__list">
                            {movies.slice(0, visibleCount).map((movie) => (
                                <li className="FavoriteFilms__item" key={movie.id}>
                                    <Link className="FavoriteFilms__link" to={`/movie/${movie.id}`}>
                                        <img className="FavoriteFilms__img" src={movie.posterUrl} alt={movie.title} loading="lazy" width={250} height={300} />
                                    </Link>
                                    <span className="FavoriteFilms__btn-wrapper">
                                        <IconClose
                                            className="FavoriteFilms__btn-close"
                                            onClick={() => handleClose(movie.id)}
                                        />
                                    </span>
                                </li>  
                            ))}
                        </ul>
                        {visibleCount < movies.length && (
                            <Button className="button FavoriteFilms__button" type="button" title="Показать еще" size="medium" onClick={() => setVisibleCount(prev => prev + 15)} />
                        )}
                    </>
                )
                }
            </div>
        </>
    )
}
