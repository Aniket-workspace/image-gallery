import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { fetchImages } from "../Api/api";
import ImageCard from "../components/ImageCard";
import ImageModal from "../components/ImageModal";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";

const Gallery = () => {
  const [images, setImages] = useState([]); 
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true); 
  const [selectedImage, setSelectedImage] = useState(null); 

  // fetch images 
  const fetchAndSetImages = async () => {
    setLoading(true); 
    try {
      console.log(`Fetching images for query: "${query}" (Page: ${page})`);
      const fetchedImages = await fetchImages(page, query);

      if (Array.isArray(fetchedImages)) {
        if (query) {
          setImages(fetchedImages);
        } else {
          setImages((prevImages) => [...prevImages, ...fetchedImages]);
        }
        setHasMore(fetchedImages.length > 0);
      } else {
        console.error("Fetched data is not an array:", fetchedImages);
        setImages([]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]); 
    }
    setLoading(false); 
  };

  useEffect(() => {
    fetchAndSetImages();
  }, [page, query]);

  // Handle favorites
  const handleFavorite = (image) => {
    const updatedFavorites = favorites.some((fav) => fav.id === image.id)
      ? favorites.filter((fav) => fav.id !== image.id)
      : [...favorites, image];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Handle image modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  //  search query 
  const handleSearch = (newQuery) => {
    console.log(`Search query changed to: "${newQuery}"`);
    setQuery(newQuery); 
    setImages([]);
    setPage(1); 
  };

  // Infinite scroll 
  const handleScroll = (event) => {
    const bottom =
      event.target.scrollHeight ===
      event.target.scrollTop + event.target.clientHeight;

    if (bottom && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
    {/* navbar */}
      <Navbar>

        {/* searchbar */}
        <SearchBar onSearch={handleSearch} />
      </Navbar>

      {/* main container */}
      <div>
        <Box>

          {/* {images.length === 0 && !loading && !query && (
            <Typography>Loading default images...</Typography> 
          )} */}

          {/* if no result */}
          {images.length === 0 && !loading && query && (
            <Typography>No results found</Typography> 
          )}

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 2,
              overflowY: "auto",
              maxHeight: "calc(100vh - 80px)",
            }}
            onScroll={handleScroll} 
          >
            {/* image card */}
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              {Array.isArray(images) &&
                images.map((image) => (
                  <Grid item xs={12} sm={6} md={4} key={image.id}>
                    <ImageCard
                      image={image}
                      onClick={handleImageClick}
                      onFavorite={handleFavorite}
                      isFavorite={favorites.some((fav) => fav.id === image.id)}
                    />
                  </Grid>
                ))}
            </Grid>

           {/* loading spinner */}
            {loading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  mt: 2,
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Box>
        </Box>

        {/* image model */}
        <ImageModal
          image={selectedImage}
          open={!!selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      </div>
    </>
  );
};

export default Gallery;
