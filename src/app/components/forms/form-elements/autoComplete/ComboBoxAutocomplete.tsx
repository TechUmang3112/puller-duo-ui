"use client";

// Imports
import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CustomTextField from "../../theme-elements/CustomTextField";

interface Film {
  label: string;
  year: number;
}

interface ComboBoxAutocompleteProps {
  placeholder?: string;
}

const ComboBoxAutocomplete = ({
  placeholder = "Select movie",
}: ComboBoxAutocompleteProps) => {
  const [inputValue, setInputValue] = useState(""); // State for input value
  const [options, setOptions] = useState<Film[]>([]); // State for options
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Function to fetch data from the backend
  const fetchData = async (query: string) => {
    if (!query) {
      setOptions([]); // Clear options if query is empty
      return;
    }

    setLoading(true); // Show loading indicator

    try {
      // Replace with your backend API endpoint
      const backend_response = [
        { label: "The Shawshank Redemption", year: 1994 },
        { label: "The Godfather", year: 1972 },
        { label: "The Godfather: Part II", year: 1974 },
      ];
      setOptions(backend_response); // Update options with backend response
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Debounce the API call to avoid excessive requests
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData(inputValue);
    }, 300); // Adjust the delay as needed

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      loading={loading} // Show loading indicator
      fullWidth
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue); // Update input value
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          placeholder={placeholder}
          aria-label="ComboBoxAutocomplete"
        />
      )}
    />
  );
};

export default ComboBoxAutocomplete;
