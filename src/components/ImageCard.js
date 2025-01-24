import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  ImageList,
  ImageListItem,
  Box,
  IconButton,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const ImageCard = ({ image, onClick, onFavorite, isFavorite }) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent image modal from opening
    onFavorite(image); // Trigger the favorite/unfavorite action
  };

  return (
    <ImageListItem
      key={image.img}
      sx={{
        position: "relative",
        "&:hover": {
          "& .image-overlay": {
            opacity: 0.6,
          },
          "& .username": {
            opacity: 1,
          },
        },
      }}
    >
      <img
        srcSet={`${image.urls.small}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`${image.urls.small}?w=248&fit=crop&auto=format`}
        alt={image.alt_description}
        loading="lazy"
      />
      <Box
        className="image-overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 1)",
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          zIndex: 5,
        }}
      ></Box>

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
          zIndex: 20,
        }}
      >
        {image.user.name}
      </Box>
      <IconButton
        sx={{
          zIndex: 30,
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
        onClick={handleFavoriteClick}
      >
        {isFavorite ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <FavoriteBorder sx={{ color: "white" }} />
        )}
      </IconButton>
    </ImageListItem>
  );
};

export default ImageCard;
