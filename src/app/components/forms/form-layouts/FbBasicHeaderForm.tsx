"use client";

// Imports
import React, { useState, useRef } from "react";
import { Box, Button, Grid, MenuItem, IconButton } from "@mui/material";
import CustomTextField from "../theme-elements/CustomTextField";
import CustomSelect from "../theme-elements/CustomSelect";
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import ParentCard from "../../shared/ParentCard";
import BasicHeaderFormCode from "@/app/components/forms/form-layouts/code/BasicHeaderFormCode";
import CloseIcon from "@mui/icons-material/Close";
import { checkDocumentStatus } from "@/services/user.service";

const currencies = [
  {
    value: "female",
    label: "Female",
  },
  {
    value: "male",
    label: "Male",
  },
];

const user_type = [
  {
    value: "Driver",
    label: "Driver",
  },
  {
    value: "Rider",
    label: "Rider",
  },
];

const FbBasicHeaderForm = () => {
  const [currency, setCurrency] = useState("");
  const handleChange2 = (event: any) => {
    setCurrency(event.target.value);
  };

  const [userType, setUserType] = useState("");
  const onUserTypeChange = (event: any) => {
    setUserType(event.target.value);
  };

  // State for image upload
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image selection
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image file.");
    }

    // Clear the file input value to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Checkbox */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <ParentCard
        title="Update your profile"
        codeModel={<BasicHeaderFormCode />}
        footer={
          <>
            <Button
              variant="contained"
              color="error"
              sx={{
                mr: 1,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                localStorage.setItem("isProfileUpdated", "true");
                localStorage.setItem("isDocUnderVerification", "true");
                checkDocumentStatus();
              }}
            >
              Submit
            </Button>
          </>
        }
      >
        <>
          <form>
            <Grid container spacing={3} mb={3}>
              <Grid item lg={6} md={12} sm={12}>
                <CustomFormLabel htmlFor="fname-text">
                  Full Name
                </CustomFormLabel>
                <CustomTextField id="fname-text" variant="outlined" fullWidth />
                <CustomFormLabel htmlFor="standard-select-currency">
                  Select Gender
                </CustomFormLabel>
                <CustomSelect
                  id="standard-select-currency"
                  value={currency}
                  onChange={handleChange2}
                  fullWidth
                  variant="outlined"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>
              <Grid item lg={6} md={12} sm={12}>
                <CustomFormLabel htmlFor="date">Date of Birth</CustomFormLabel>

                <CustomTextField
                  id="date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <CustomFormLabel htmlFor="standard-select-currency">
                  User type
                </CustomFormLabel>
                <CustomSelect
                  id="user_type_id"
                  value={userType}
                  onChange={onUserTypeChange}
                  fullWidth
                  variant="outlined"
                >
                  {user_type.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>
            </Grid>

            {/* Upload Driver License Section */}
            {userType && (
              <Grid container spacing={3} mb={3}>
                <Grid item xs={12}>
                  <input
                    accept="image/*"
                    id="user-doc"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                  />
                  <label htmlFor="user-doc">
                    {!imagePreview && (
                      <Button
                        variant="contained"
                        component="span"
                        color="primary"
                        sx={{ mr: 2 }}
                      >
                        {userType == "Driver"
                          ? "Upload Driver License"
                          : "Upload Aadhaar card"}
                      </Button>
                    )}
                  </label>
                  {imagePreview && (
                    <Box mt={2} position="relative" display="inline-block">
                      <img
                        src={imagePreview}
                        alt="User doc Preview"
                        style={{ maxWidth: "100%", maxHeight: "200px" }}
                      />
                      <IconButton
                        onClick={handleRemoveImage}
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          color: "red",
                          backgroundColor: "white",
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  )}
                </Grid>
              </Grid>
            )}
          </form>
        </>
      </ParentCard>
    </div>
  );
};

export default FbBasicHeaderForm;
