import { Container, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { getFavorites } from "../utils/localStorage";
import MovieCard from "../components/MovieCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lemmikfilmid
      </Typography>

      {favorites.length === 0 && (
        <Typography>Lemmikuid pole veel lisatud.</Typography>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 3,
        }}
      >
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
    </Container>
  );
}