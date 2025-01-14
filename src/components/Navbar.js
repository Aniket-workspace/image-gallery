import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/apple.png"

const Navbar = ({ children }) => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#00796b" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Title */}
        <IconButton sx={{ color: "#fff" }} >
          <img src={logo}  width={35}/>
          <Typography variant="h6" sx={{ fontWeight: "bold",marginLeft:"5px" }}>
            I Gallery
          </Typography>
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ marginRight: 2 }}>{children}</Box>
          {/* Favorites Button */}
          <Button
            sx={{
              borderColor: "#fff",
              color: "#fff",
              "&:hover": { backgroundColor: "#004d40" },
            }}
            variant="outlined"
            size="small"
            component={Link}
            to="/favorites"
            aria-label="Go to favorites page"
          >
            Favorites
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
