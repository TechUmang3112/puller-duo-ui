"use client";

// Imports
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "@/store/hooks";
import { IconTrash } from "@tabler/icons-react";
import LoadingButton from "@mui/lab/LoadingButton";
import { successfulLogIn } from "@/services/auth.service";
import { Box, Typography, Button, Stack } from "@mui/material";
import { loginType } from "@/app/(DashboardLayout)/types/auth/auth";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { nAuth } from "@/constants/network";
import { post } from "@/services/api.service";
import { setIsAuthLoading } from "@/store/user/UserReducer";

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  // State for form inputs
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userState = useSelector((state) => state.userReducer);

  // State for validation errors
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

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
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    // Set errors if validation fails
    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    funLogIn();
  };

  async function funLogIn() {
    dispatch(setIsAuthLoading(true));

    const response = await post(nAuth.logIn, { email, password });
    if (response.isError) {
      dispatch(setIsAuthLoading(false));
      return {};
    } else if (response.isEmailVerified) {
      successfulLogIn(response.id);
      return {};
    }
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
            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
            <CustomTextField
              disabled={userState.isAuthLoading}
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
              disabled={userState.isAuthLoading}
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
          >
            <Typography
              component={Link}
              href="/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Forgot Password ?
            </Typography>
          </Stack>
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
              Sign In
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

export default AuthLogin;
