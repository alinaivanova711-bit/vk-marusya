import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Loader } from "../../components/Loader/Loader";
import { InfoMovie } from "../../components/InfoMovie/InfoMovie";
import {DescriptionMovie} from "../DescriptionMovie/DescriptionMovie"
import { AuthForm } from "../../components/AuthForm";

interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  plot: string;
  backdropUrl: string;
  language?: string;
  budget?: string | number;
  revenue?: string | number;
  director?: string;
  production?: string;
  awardsSummary?: string;
}

export const MoviePage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie|null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/movie/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Ошибка загрузки фильма", error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) fetchMovie();
  }, [movieId]);

  if (loading) return <Loader />;
  if (!movie) return <p>Фильм не найден</p>;

  return (
    <>
      {isAuthOpen && (
          <AuthForm onClose={() => setIsAuthOpen(false)} />
      )}
      <div className="MoviePage">
        <InfoMovie movie={movie} onAuthRequired={() => setIsAuthOpen(true)} showDetailsButton={false} showUpdateButton={false}/>
        <DescriptionMovie movie={movie}/>
      </div>
    </>
  );
};