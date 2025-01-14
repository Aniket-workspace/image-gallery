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

  // remove image from favorites
  const removeFavorite = (imageId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== imageId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // open the modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
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
      <div style={{ padding: "20px" }}>
        {/*if no favorites are present */}
        {favorites.length === 0 ? (
          <Typography>No favorite images added yet.</Typography>
        ) : (
          <Grid container spacing={2}>
            {favorites.map((image) => (
              <Grid item xs={12} sm={6} md={4} key={image.id}>
                <Box sx={{ position: "relative" }}>
                  <ImageCard
                    image={image}
                    isFavorite={true}
                    onClick={handleImageClick}
                    onFavorite={removeFavorite}
                  />

                  {/* Remove button  */}
                  <IconButton
                    onClick={() => removeFavorite(image.id)}
                    sx={{
                      zIndex: 10,
                      position: "absolute",
                      top: 10,
                      right: 25,
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                      },
                    }}
                  >
                    <AiOutlineDelete size={24} />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Image Modal */}
        <ImageModal
          image={selectedImage}
          open={!!selectedImage} // Modal is open when there is a selected image
          onClose={() => setSelectedImage(null)} // Close the modal
        />
      </div>
    </>
  );
};

export default Favorites;
