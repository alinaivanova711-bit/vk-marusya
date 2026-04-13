import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { api } from "../../api/api";
import { genresMap } from "../../utils/genresMap";
import { Loader } from "../../components/Loader/Loader";
import { GenreCard } from "../GenreCard/GenreCard";
import "./_GenresPage.scss";

export const GenresPage = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  const [intersectionCounter, setIntersectionCounter] = useState(0);

  const target = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const response = await api.get("/movie/genres");
        setGenres(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке жанров", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);


  const sortedGenres = useMemo(() => {
    return [...genres].sort((a, b) => {
      const nameA = genresMap[a] ?? a;
      const nameB = genresMap[b] ?? b;
      return nameA.localeCompare(nameB, "ru");
    });
  }, [genres]);


  useEffect(() => {
    if (intersectionCounter > 0) {
      setVisibleCount((prev) => {
        const newCount = prev + 8;

        return prev >= genres.length ? prev : newCount;
      });
    }
  }, [intersectionCounter])


  const handleScroll: IntersectionObserverCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIntersectionCounter(prev => prev + 1);
      }
    });
  }, []);

  const visibleGenres = useMemo(() => sortedGenres.slice(0, visibleCount), [sortedGenres, visibleCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll);

    observer.observe(target.current);

    return () => {
      observer.disconnect();
    }
  }, [])

  const getGenreName = (genre: string) => genresMap[genre] ?? genre;

  return (
    <div className="GenresPage" >
      <h1 className="GenresPage__title">Жанры фильмов</h1>
      {loading ? (
        <div className="GenresPage__loader">
          <Loader />
        </div>
      ) : (
        <div className="GenresPage__wrapper">
          {visibleGenres.map((genre, index) => (
            <GenreCard genre={genre} name={getGenreName(genre)} key={index} />
          ))}
        </div>
      )}

      <div ref={target} style={{ height: "10px"}}/>
    </div>
  );
};
 