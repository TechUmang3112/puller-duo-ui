"use client";

// Imports
import FormData from "form-data";
import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Grid, MenuItem, IconButton } from "@mui/material";
import CustomTextField from "../theme-elements/CustomTextField";
import CustomSelect from "../theme-elements/CustomSelect";
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import ParentCard from "../../shared/ParentCard";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "@/store/hooks";
import { setIsAuthLoading, setType } from "@/store/user/UserReducer";
import { nUser } from "@/constants/network";
import { post } from "@/services/api.service";
import { IconTrash } from "@tabler/icons-react";
import LoadingButton from "@mui/lab/LoadingButton";

const currencies = [
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Male",
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
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [currency, setCurrency] = useState("");
  const [currencyError, setCurrencyError] = useState("");
  const handleChange2 = (event: any) => {
    setCurrency(event.target.value);
    setCurrencyError("");
  };

  const [userType, setUserType] = useState("");
  const [userTypeError, setUserTypeError] = useState("");
  const onUserTypeChange = (event: any) => {
    setUserType(event.target.value);
    setUserTypeError("");
    dispatch(setType(event.target.value));
  };

  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState("");

  // State for image upload
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState("");

  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get today's date in YYYY-MM-DD format for date input max value
  const today = new Date().toISOString().split("T")[0];

  // Calculate age from date of birth
  const calculateAge = (birthDate: string) => {
    const birthDateObj = new Date(birthDate);
    const todayObj = new Date();
    let age = todayObj.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = todayObj.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && todayObj.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Handle image selection
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setImageError("");
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
    setImageError("Please upload an image");
  };

  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    }

    if (!currency) {
      setCurrencyError("Gender is required");
      isValid = false;
    }

    if (!userType) {
      setUserTypeError("User type is required");
      isValid = false;
    }

    if (!dob) {
      setDobError("Date of birth is required");
      isValid = false;
    } else {
      // Check if date is in the future
      const selectedDate = new Date(dob);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time part for accurate comparison

      if (selectedDate > today) {
        setDobError("Date of birth cannot be in the future");
        isValid = false;
      } else {
        // Check age requirements based on user type
        const age = calculateAge(dob);

        if (userType === "Driver" && age < 18) {
          setDobError("Driver must be at least 18 years old");
          isValid = false;
        } else if (userType === "Rider" && age < 12) {
          setDobError("Rider must be at least 12 years old");
          isValid = false;
        }
      }
    }

    if (!selectedImage) {
      setImageError(
        userType === "Driver"
          ? "Driver license is required"
          : "Aadhaar card is required"
      );
      isValid = false;
    }

    return isValid;
  };

  async function updateProfile() {
    if (!validateForm()) {
      return;
    }

    dispatch(setIsAuthLoading(true));

    const body = new FormData();
    body.append("userId", localStorage.getItem("userId"));
    body.append("name", name);
    body.append("type", userType == "Driver" ? "1" : "0");
    body.append("gender", currency == "Male" ? "0" : "1");
    body.append("dob", dob);
    if (selectedImage) {
      body.append("file", selectedImage);
    }

    try {
      const response = await post(nUser.updateProfile, body, {
        "Content-Type": "multipart/form-data",
      });
      dispatch(setIsAuthLoading(false));

      localStorage.setItem("isProfileUpdated", "true");
      localStorage.setItem("isDocUnderVerification", "true");
      window.location.replace("/user/verification-pending");
    } catch (error) {
      dispatch(setIsAuthLoading(false));
      // Handle API error here
    }
  }

  useEffect(() => {
    setName(localStorage.getItem("user_name") ?? "");
  }, []);

  return (
    <div>
      <ParentCard
        title="Update your profile"
        footer={
          <>
            <Button
              disabled={userState.isAuthLoading}
              variant="contained"
              color="error"
              sx={{
                mr: 1,
              }}
            >
              Cancel
            </Button>

            {!userState.isAuthLoading && (
              <Button
                variant="contained"
                color="primary"
                onClick={updateProfile}
              >
                Submit
              </Button>
            )}

            {userState.isAuthLoading && (
              <LoadingButton
                loading
                variant="contained"
                color="secondary"
                endIcon={<IconTrash width={18} />}
              >
                Loading
              </LoadingButton>
            )}
          </>
        }
      >
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateProfile();
            }}
          >
            <Grid container spacing={3} mb={3}>
              <Grid item lg={6} md={12} sm={12}>
                <CustomFormLabel htmlFor="fname-text">
                  Full Name
                </CustomFormLabel>
                <CustomTextField
                  value={name}
                  disabled={userState.isAuthLoading}
                  onChange={(e: any) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                  id="fname-text"
                  variant="outlined"
                  fullWidth
                  error={!!nameError}
                  helperText={nameError}
                />
                <CustomFormLabel htmlFor="standard-select-currency">
                  Select Gender
                </CustomFormLabel>
                <CustomSelect
                  disabled={userState.isAuthLoading}
                  id="standard-select-currency"
                  value={currency}
                  onChange={handleChange2}
                  fullWidth
                  variant="outlined"
                  error={!!currencyError}
                >
                  <MenuItem value="">
                    <em>Select Gender</em>
                  </MenuItem>
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {currencyError && (
                  <Box color="error.main" fontSize="0.75rem" mt={0.5} ml={2}>
                    {currencyError}
                  </Box>
                )}
              </Grid>
              <Grid item lg={6} md={12} sm={12}>
                <CustomFormLabel htmlFor="date">Date of Birth</CustomFormLabel>
                <CustomTextField
                  disabled={userState.isAuthLoading}
                  id="date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={dob}
                  onChange={(e: any) => {
                    setDob(e.target.value);
                    setDobError("");
                  }}
                  error={!!dobError}
                  helperText={dobError}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    max: today, // Prevent selecting future dates
                  }}
                />

                <CustomFormLabel htmlFor="standard-select-currency">
                  User type
                </CustomFormLabel>
                <CustomSelect
                  disabled={userState.isAuthLoading}
                  id="user_type_id"
                  value={userType}
                  onChange={onUserTypeChange}
                  fullWidth
                  variant="outlined"
                  error={!!userTypeError}
                >
                  <MenuItem value="">
                    <em>Select User Type</em>
                  </MenuItem>
                  {user_type.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {userTypeError && (
                  <Box color="error.main" fontSize="0.75rem" mt={0.5} ml={2}>
                    {userTypeError}
                  </Box>
                )}
              </Grid>
            </Grid>

            {/* Upload Driver License Section */}
            {userType && (
              <Grid container spacing={3} mb={3}>
                <Grid item xs={12}>
                  <input
                    disabled={userState.isAuthLoading}
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
                  {imageError && (
                    <Box color="error.main" fontSize="0.75rem" mt={0.5} ml={2}>
                      {imageError}
                    </Box>
                  )}
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
