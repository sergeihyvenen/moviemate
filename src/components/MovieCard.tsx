import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { Movie } from "../types/movie";
import { getImageUrl } from "../services/tmdbApi";
import { isFavorite, toggleFavorite } from "../utils/localStorage";

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  const [favorite, setFavorite] = useState(isFavorite(movie.id));

  function handleFavorite() {
    toggleFavorite(movie);
    setFavorite(!favorite);
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="420"
        image={getImageUrl(movie.poster_path)}
        alt={movie.title}
      />

      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>

        <Typography variant="body2" color="text.secondary">
          Aasta: {movie.release_date?.slice(0, 4) || "Andmed puuduvad"}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Hinne: {movie.vote_average.toFixed(1)}
        </Typography>
      </CardContent>

      <CardActions>
        <Button component={Link} to={`/movies/${movie.id}`}>
          Detailid
        </Button>

        <Button onClick={handleFavorite}>
          {favorite ? "Eemalda" : "Lisa lemmikuks"}
        </Button>
      </CardActions>
    </Card>
  );
}