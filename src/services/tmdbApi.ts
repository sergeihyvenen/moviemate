import type { Movie, MovieDetails } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
};

export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    options
  );

  if (!response.ok) {
    throw new Error("Filme ei õnnestunud laadida");
  }

  const data = await response.json();
  return data.results;
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  const response = await fetch(`${BASE_URL}/movie/${id}`, options);

  if (!response.ok) {
    throw new Error("Filmi detaile ei õnnestunud laadida");
  }

  return response.json();
}

export function getImageUrl(path: string | null): string {
  if (!path) {
    return "https://placehold.co/300x450?text=Pilt+puudub";
  }

  return `https://image.tmdb.org/t/p/w500${path}`;
}