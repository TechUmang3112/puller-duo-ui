"use client";

// Imports
import { useState } from "react";
import { nAuth } from "@/constants/network";
import { post } from "@/services/api.service";
import { IconTrash } from "@tabler/icons-react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "@/store/hooks";
import { setIsAuthLoading, setOtpType } from "@/store/user/UserReducer";
import { Box, Typography, Button, Stack } from "@mui/material";
import { loginType } from "@/app/(DashboardLayout)/types/auth/auth";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";

const AuthRegister = ({ title, subtitle, subtext }: loginType) => {
  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userState: any = useSelector((state) => state.userReducer);

  // State for validation errors
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const validateName = (name: string) => {
    if (!name) return "Name is required";
    return "";
  };

  // Validation function for email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email";
    return "";
  };

  // Validation function for password
  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    if (password.length <= 5)
      return "Minimum password length should be 6 digit";
    return "";
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate fields
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    // Set errors if validation fails
    if (nameError || emailError || passwordError) {
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
      });
      return;
    }

    funSignUp();
  };

  async function funSignUp() {
    dispatch(setIsAuthLoading(true));

    const response = await post(nAuth.signUp, { email, password });
    if (!response.isError) {
      dispatch(setOtpType("Email"));
      localStorage.setItem("otpType", "Email");
      window.location.href = "/otp-verification";
    }

    dispatch(setIsAuthLoading(false));
  }

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <form onSubmit={handleSubmit}>
        <Stack>
          <Box>
            <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
            <CustomTextField
              id="name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
            <CustomTextField
              id="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          ></Stack>
        </Stack>
        <Box>
          {!userState.isAuthLoading && (
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
            >
              Create Account
            </Button>
          )}

          {userState.isAuthLoading && (
            <LoadingButton
              fullWidth
              loading
              variant="contained"
              color="secondary"
              endIcon={<IconTrash width={18} />}
            >
              Loading
            </LoadingButton>
          )}
        </Box>
      </form>

      {subtitle}
    </>
  );
};

export default AuthRegister;
