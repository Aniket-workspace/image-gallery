import React, { useState, useEffect, useCallback } from "react";
import { Box, CircularProgress, ImageList, Typography } from "@mui/material";
import ImageCard from "../components/ImageCard";
import ImageModal from "../components/ImageModal";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import { fetchBaseImages, fetchImages } from "../Api/api";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(""); // Added to track search query
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch images
  const fetchAndSetImages = useCallback(
    async (reset = false) => {
      if (loading) return;
      setLoading(true);

      try {
        const fetchedImages = await fetchImages(page, query);

        if (Array.isArray(fetchedImages)) {
          // if (query) {

          setImages((prevImages) => {
            const allImages = reset
              ? fetchedImages
              : [...prevImages, ...fetchedImages];

            // Remove duplicates based on `id`
            const uniqueImages = Array.from(
              new Map(allImages.map((img) => [img.id, img])).values()
            );

            return uniqueImages;
          });
          setHasMore(fetchedImages.length > 0);
        } else {
          console.error("Fetched data is not an array:", fetchedImages);
          setImages(reset ? [] : []);
        }
        if (Array.isArray(fetchedImages)) {
          if (query) {
            setImages(fetchedImages);
          } else {
            setImages((prevImages) => {
              const allImages = reset
                ? fetchedImages
                : [...prevImages, ...fetchedImages];
  
              // Remove duplicates based on `id`
              const uniqueImages = Array.from(
                new Map(allImages.map((img) => [img.id, img])).values()
              );
  
              return uniqueImages;
          })
          }
          setHasMore(fetchedImages.length > 0);
        } else {
          console.error("Fetched data is not an array:", fetchedImages);
          setImages(reset ? [] : []);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setImages(reset ? [] : []);
      }

      setLoading(false);
    },
    [page, query, loading]
  );

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

  // Search query
  const handleSearch = (newQuery) => {
    if (newQuery === query) return; // Avoid redundant search calls
    setQuery(newQuery);
    setPage(1);
    setImages([]); // Reset images to show fresh results
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
      {/* Navbar */}
      <Navbar>
        <SearchBar onSearch={handleSearch} />
      </Navbar>

      {/* Main container */}
      <div>
        <Box>
          {/* No results */}
          {images.length === 0 && !loading && (
            <Typography>No results found</Typography>
          )}

          {/* Image List */}
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
            <ImageList variant="masonry" cols={4} gap={8}>
              {Array.isArray(images) &&
                images.map((image, index) => (
                  <ImageCard
                    key={`${image.id}-${index}`} // Fallback to `index` if needed
                    image={image}
                    onClick={handleImageClick}
                    onFavorite={handleFavorite}
                    isFavorite={favorites.some((fav) => fav.id === image.id)}
                  />
                ))}
            </ImageList>

            {/* Loading spinner */}
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

        {/* Image Modal */}
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
