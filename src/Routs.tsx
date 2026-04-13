import { Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/HomePage/HomePage"
import { GenresPage } from "./pages/GenresPage/GenresPage"
import { MoviePage } from "./pages/MoviePage/MoviePage"
import { ProfilePage } from "./pages/ProfilePage/ProfilePage"
import { GenrePage } from "./pages/GenrePage/GenrePage"

export const Routs = () => {
  return (
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/genres" element={<GenresPage/>} />
          <Route path="/movie/:movieId" element={<MoviePage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/genres/:genre" element={<GenrePage />} />
        </Routes>
  )
}