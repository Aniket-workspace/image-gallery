import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

const ImageModal = ({ image, open, onClose }) => {
  if (!image) return null; // Prevent rendering if image is null or undefined

  const imageSrc = image?.urls?.full || ""; // Fallback to an empty string or a placeholder
  const altText = image?.alt_description || "No description available";
  const resolution =
    image?.width && image?.height
      ? `${image.width}x${image.height}`
      : "Unknown resolution";
  const author = image?.user?.name || "Unknown Author";
  const downloadLink = image?.links?.download || image?.urls?.full || "#"; 

  console.log("Image download link:", downloadLink); 

  // Function to handle the download
  const handleDownload = async () => {
    if (!downloadLink || downloadLink === "#") {
      console.error("No valid download link available for the image");
      return;
    }

    console.log("Triggering download...");

    const imageBlob = await fetch(downloadLink, { mode: "no-cors" })
      .then((res) => res.arrayBuffer())
      .then((buffer) => new Blob([buffer], { type: "image/jpeg" }));
    

    const link = document.createElement("a");
    link.href = URL.createObjectURL(imageBlob); 
    link.download = altText || "downloaded_image"; 

    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 

    console.log("Download triggered successfully!");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>

      {/* title */}
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        Image Details
      </DialogTitle>

      <DialogContent>

        {/* image */}
        {imageSrc ? (
          <Box sx={{ textAlign: "center" }}>
            <img
              src={imageSrc}
              alt={altText}
              style={{ width: "100%", maxHeight: "70vh", objectFit: "contain" }}
              onError={() => console.error("Failed to load image")} 
            />
          </Box>
        ) : (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        )}

        {/* resolution */}
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          <strong>Resolution:</strong> {resolution}
        </Typography>

        {/* author */}
        <Typography variant="body1">
          <strong>By:</strong> {author}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
        {/* Close Button */}
        <Button
          onClick={onClose}
          color="secondary"
          variant="outlined"
          sx={{ marginRight: 2 }}
        >
          Close
        </Button>

        {/* Download Button */}
        <Button
          onClick={handleDownload}
          color="primary"
          variant="contained"
          sx={{
            backgroundColor: "#00796b",
            "&:hover": { backgroundColor: "#004d40" },
          }}
        >
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageModal;
