import React, { useState, useEffect, useCallback } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import debounce from "lodash/debounce";
import IconButton from "@mui/material/IconButton";

// Styled components for Search Bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

// SearchBar component
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Handle input change
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  // Handle clear search
  const handleClear = () => {
    setQuery(""); 
    onSearch(""); 
  };

  // Debounced search function with useCallback to memoize the function
  const debouncedSearch = useCallback(
    debounce((query) => {
      console.log("Debounced Search: ", query); // Debugging log
      onSearch(query);
    }, 500), // 500ms debounce
    [] // Only recreate the debounced function on mount
  );

  useEffect(() => {
    if (query) {
      debouncedSearch(query); // Trigger the debounced search
    }
    // Cleanup function to cancel any pending debounce
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={query}
        onChange={handleChange}
        endAdornment={
          query && (
            <IconButton
              sx={{ padding: 0 }}
              onClick={handleClear}
              aria-label="clear search"
            >
              <ClearIcon sx={{ color: "white" }} />
            </IconButton>
          )
        }
      />
    </Search>
  );
};

export default SearchBar;
