import type { Movie } from "../types/movie";

const FAVORITES_KEY = "favoriteMovies";

export function getFavorites(): Movie[] {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveFavorites(movies: Movie[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(movies));
}

export function isFavorite(id: number): boolean {
  return getFavorites().some((movie) => movie.id === id);
}

export function toggleFavorite(movie: Movie) {
  const favorites = getFavorites();

  if (favorites.some((item) => item.id === movie.id)) {
    saveFavorites(favorites.filter((item) => item.id !== movie.id));
  } else {
    saveFavorites([...favorites, movie]);
  }
}