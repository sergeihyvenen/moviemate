import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MovieMate
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Avaleht
        </Button>

        <Button color="inherit" component={Link} to="/movies">
          Filmid
        </Button>

        <Button color="inherit" component={Link} to="/favorites">
          Lemmikud
        </Button>
      </Toolbar>
    </AppBar>
  );
}