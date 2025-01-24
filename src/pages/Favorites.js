// src/components/Favorites.js
import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  ImageList,
} from "@mui/material";
import { Link } from "react-router-dom";
import ImageCard from "../components/ImageCard";
import { AiOutlineDelete } from "react-icons/ai";
import ImageModal from "../components/ImageModal";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // open the modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };



  // Handle favorites
  const handleFavorite = (image) => {
    const updatedFavorites = favorites.some((fav) => fav.id === image.id)
      ? favorites.filter((fav) => fav.id !== image.id)
      : [...favorites, image];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#00796b" }}>
        <Toolbar>
          {/* title */}
          <Typography variant="h6">My Favorites</Typography>

          <Box sx={{ marginLeft: "auto" }}>
            {/* Back to Gallery */}
            <Button
              sx={{
                borderColor: "#fff",
                color: "#fff",
                "&:hover": { backgroundColor: "#004d40" },
              }}
              variant="outlined"
              size="small"
              component={Link}
              to="/"
            >
              Back to Gallery
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {favorites.length === 0 ? (
        <Typography>No favorite images added yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.length === 0 ? (
            <Typography>No favorite images added yet.</Typography>
          ) : (
            <ImageList variant="masonry" cols={3} gap={8}>
              {favorites.map((image) => (
                <>
                  <ImageCard
                    key={image.id}
                    image={image}
                    isFavorite={true}
                    onClick={handleImageClick}
                    onFavorite={handleFavorite}
                  />
          
                </>
              ))}
            </ImageList>
          )}
        </Grid>
      )}

      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        open={!!selectedImage} // Modal is open when there is a selected image
        onClose={() => setSelectedImage(null)} // Close the modal
      />
    </>
  );
};

export default Favorites;
