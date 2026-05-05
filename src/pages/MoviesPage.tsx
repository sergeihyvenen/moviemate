import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import type { Movie } from "../types/movie";
import { searchMovies } from "../services/tmdbApi";
import MovieCard from "../components/MovieCard";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sortBy, setSortBy] = useState("title");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError("");

      const data = await searchMovies(query);
      setMovies(data);
    } catch {
      setError("Viga filmide laadimisel");
    } finally {
      setLoading(false);
    }
  }

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === "rating") {
      return b.vote_average - a.vote_average;
    }

    if (sortBy === "year") {
      return (
        Number(b.release_date?.slice(0, 4) || 0) -
        Number(a.release_date?.slice(0, 4) || 0)
      );
    }

    return a.title.localeCompare(b.title);
  });

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Filmid
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          label="Sisesta filmi nimi"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button variant="contained" onClick={handleSearch}>
          Otsi
        </Button>

        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <MenuItem value="title">Sorteeri pealkirja järgi</MenuItem>
          <MenuItem value="rating">Sorteeri hinde järgi</MenuItem>
          <MenuItem value="year">Sorteeri aasta järgi</MenuItem>
        </Select>
      </Box>

      {loading && <Typography>Laadimine...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 3,
        }}
      >
        {sortedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
    </Container>
  );
}