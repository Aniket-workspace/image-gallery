import React from "react";
import { Card, CardMedia, CardContent, Box, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const ImageCard = ({ image, onClick, onFavorite, isFavorite }) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent image modal from opening
    onFavorite(image); // Trigger the favorite/unfavorite action
  };

  return (<Box m={2}>
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px",
        "&:hover": {
          "& .image-overlay": {
            opacity: 0.6,
          },
          "& .username": {
            opacity: 1,
          },
        },
      }}
      onClick={() => onClick(image)}
    >
      {/* Image with lazy loading */}
      <CardMedia
        component="img"
        height="200"
        image={image.urls.small}
        alt={image.alt_description || "Image"}
        sx={{
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        loading="lazy" // Native lazy loading
      />

      {/* Dark overlay on image */}
      <Box
        className="image-overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          zIndex: 5,
        }}
      ></Box>

      {/* Username on Hover */}
      <Box
        className="username"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "18px",
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {image.user.name}
      </Box>

      {/* Favorite Button */}
      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <IconButton sx={{ zIndex: 10 }} onClick={handleFavoriteClick}>
          {isFavorite ? <Favorite sx={{ color: "red" }} /> : <FavoriteBorder sx={{ color: "white" }} />}
        </IconButton>
      </CardContent>
    </Card></Box>
  );
};

export default ImageCard;
