import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { MovieDetails } from "../types/movie";
import { getImageUrl, getMovieDetails } from "../services/tmdbApi";
import { Container, Typography, Box, Button } from "@mui/material";
import { toggleFavorite, isFavorite } from "../utils/localStorage";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    async function loadMovie() {
      if (!id) return;

      try {
        setLoading(true);
        setError("");

        const data = await getMovieDetails(id);
        setMovie(data);
        setFavorite(isFavorite(data.id));
      } catch {
        setError("Filmi detaile ei õnnestunud laadida");
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Laadimine...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!movie) return null;

  function handleFavorite() {
    if (!movie) return;

    toggleFavorite(movie);
    setFavorite(!favorite);
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          style={{ width: "300px", borderRadius: "10px" }}
        />

        <Box sx={{ maxWidth: "650px" }}>
          <Typography variant="h3" gutterBottom>
            {movie.title}
          </Typography>

          <Typography sx={{ mb: 2 }}>
            {movie.overview || "Kirjeldus puudub."}
          </Typography>

          <Typography>
            <strong>Aasta:</strong>{" "}
            {movie.release_date?.slice(0, 4) || "Andmed puuduvad"}
          </Typography>

          <Typography>
            <strong>Hinne:</strong> {movie.vote_average.toFixed(1)}
          </Typography>

          <Typography>
            <strong>Kestus:</strong> {movie.runtime || "Andmed puuduvad"} min
          </Typography>

          <Typography>
            <strong>Žanrid:</strong>{" "}
            {movie.genres.length > 0
              ? movie.genres.map((genre) => genre.name).join(", ")
              : "Andmed puuduvad"}
          </Typography>

          <Button sx={{ mt: 2 }} variant="contained" onClick={handleFavorite}>
            {favorite ? "Eemalda lemmikutest" : "Lisa lemmikutesse"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}