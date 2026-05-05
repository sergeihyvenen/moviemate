import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";

export default function App() {
  return (
    <HashRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </HashRouter>
  );
}