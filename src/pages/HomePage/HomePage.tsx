import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Loader } from "../../components/Loader/Loader";
import { InfoMovie } from "../../components/InfoMovie/InfoMovie";
import { Top10Films } from "../../components/Top10Films/Top10Films";
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

export const HomePage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [topMovies, setTopMovies] = useState<any[]>([]);

  const fetchRandomMovie = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/movie/random`);
      setMovie(response.data);
    } catch (error) {
      console.error("Ошибка загрузки фильма", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTopMovies = async () => {
      const res = await api.get("/movie/top10");
      setTopMovies(res.data);
    };

    fetchTopMovies();
  }, []);

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  const handleUpdateMovie = () => {
    fetchRandomMovie();
  };

  if (loading) return <Loader />;
  if (!movie) return <p>Фильм не найден</p>;
  
  return (
    <>
      {isAuthOpen && (
        <AuthForm onClose={() => setIsAuthOpen(false)} />
      )}
    <div className="HomePage">
      <InfoMovie movie={movie} onAuthRequired={() => setIsAuthOpen(true)}  onUpdate={handleUpdateMovie} showDetailsButton={true} showUpdateButton={true}/>
      <Top10Films movies={topMovies} />
    </div>
    </>
  );
};
