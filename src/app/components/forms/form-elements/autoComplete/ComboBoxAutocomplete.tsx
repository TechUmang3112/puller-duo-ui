"use client";

// Imports
import { get } from "@/services/api.service";
import { nGoogle } from "@/constants/network";
import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CustomTextField from "../../theme-elements/CustomTextField";

interface AutoCompleteOptions {
  label: string;
  value: any;
}

interface ComboBoxAutocompleteProps {
  placeholder?: string;
  onChange?: (selectedOption: AutoCompleteOptions | null) => void; // Add this line
}

const ComboBoxAutocomplete = ({
  placeholder = "Choose option",
  onChange, // Destructure the new prop
}: ComboBoxAutocompleteProps) => {
  const [inputValue, setInputValue] = useState(""); // State for input value
  const [options, setOptions] = useState<AutoCompleteOptions[]>([]); // State for options
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Function to fetch data from the backend
  const fetchData = async (query: string) => {
    if (!query || query?.trim()?.length <= 1) {
      setOptions([]); // Clear options if query is empty
      return;
    }

    setLoading(true); // Show loading indicator

    try {
      const response = await get(nGoogle.searchPlaces, {
        searchText: inputValue.trim(),
      });

      // Replace with your backend API endpoint
      const backend_response: AutoCompleteOptions[] = [];
      response.forEach((el: any) => {
        backend_response.push({
          label: el?.name ?? "",
          value: el,
        });
      });

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
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      loading={loading} // Show loading indicator
      fullWidth
      onChange={(event, newValue) => {
        // Add this onChange handler
        if (onChange) {
          onChange(newValue);
        }
      }}
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
