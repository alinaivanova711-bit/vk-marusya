import { Link, useParams } from "react-router-dom";
import { genresMap } from "../../utils/genresMap"
import "./_GenrePage.scss"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { Loader } from "../../components/Loader/Loader";
import Arrow from "../../assets/arrow.svg?react";
import { Button } from "../../ui/Button/Button";

export const GenrePage = () => {
    const { genre = "" } = useParams()
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(15)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true)
                const response = await api.get("/movie", {
                params: {
                    genre: genre,
                },
                })
                setMovies(response.data)
            } catch (error) {
                console.error("Ошибка загрузки фильмов", error)
            } finally {
                setLoading(false)
            }
        }

        if (genre) {
            fetchMovies()
        }
    }, [genre])

    return (
        <>      
            <div className="GenrePage">
                <div className="GenrePage__wrapper-title">
                    <button className="GenrePage__button-last" type="button" onClick={() => navigate(-1)}>
                        <Arrow width={13} height={21} className="svg-icon-arrow" />
                    </button>
                    <h1 className="GenrePage__title">{genresMap[genre] || genre}</h1>
                </div>
                {loading ? (
                    <div><Loader/></div>
                    ) : (
                        <>
                        <ul className="GenrePage__list">
                            {movies.slice(0, visibleCount).map((movie) => (
                                <li className="GenrePage__item" key={movie.id}>
                                    <Link className="GenrePage__link" to={`/movie/${movie.id}`}>
                                        <img className="GenrePage__img" src={movie.posterUrl} alt={movie.title} loading="lazy" width={250} height={300}/>
                                    </Link>
                                </li>    
                            ))} 
                        </ul>
                        {visibleCount < movies.length && (
                            <Button className="button GenrePage__button" type="button" title="Показать еще" size="medium" onClick={() => setVisibleCount(prev => prev + 15)} />
                        )}
                        </>
                    )
                }
            </div>
        </>
    )
}