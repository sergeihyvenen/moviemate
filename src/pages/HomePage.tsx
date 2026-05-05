import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h3" gutterBottom>
          MovieMate
        </Typography>

        <Typography variant="h6" gutterBottom>
          Filmide otsingu rakendus
        </Typography>

        <Typography sx={{ mb: 3 }}>
          Rakendus kasutab TMDb API-t. Siin saab filme otsida, sorteerida,
          vaadata detaile ja lisada filme lemmikutesse.
        </Typography>

        <Button variant="contained" component={Link} to="/movies">
          Mine filmide lehele
        </Button>
      </Box>
    </Container>
  );
}