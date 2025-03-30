"use client";

// Imports
import Link from "next/link";
import { useState } from "react";
import { nAuth } from "@/constants/network";
import { Button, Stack } from "@mui/material";
import { post } from "@/services/api.service";
import { IconTrash } from "@tabler/icons-react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "@/store/hooks";
import { setIsAuthLoading, setOtpType } from "@/store/user/UserReducer";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";

export default function AuthForgotPassword() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);

  // State for form inputs
  const [email, setEmail] = useState("");

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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate fields
    const emailError = validateEmail(email);

    // Set errors if validation fails
    if (emailError) {
      setErrors({
        email: emailError,
      });
      return;
    }

    funReqOTPForForgetPassword();
  };

  async function funReqOTPForForgetPassword() {
    dispatch(setIsAuthLoading(true));

    const response = await post(nAuth.forgotPassword, { email });
    dispatch(setIsAuthLoading(false));
    if (response.isError) {
      return {};
    } else {
      window.location.href = "/otp-verification";
      dispatch(setOtpType("Forgot"));
      localStorage.setItem("otpType", "Forgot");
      localStorage.setItem("user_email", email);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack mt={4} spacing={2}>
          <CustomFormLabel htmlFor="reset-email">
            Email Adddress
          </CustomFormLabel>
          <CustomTextField
            id="email"
            disabled={userState.isAuthLoading}
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />

          {!userState.isAuthLoading && (
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
            >
              Forgot Password
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

          <Button
            color="primary"
            size="large"
            disabled={userState.isAuthLoading}
            fullWidth
            component={Link}
            href="/logIn"
          >
            Back to Login
          </Button>
        </Stack>
      </form>
    </>
  );
}
