"use client";

// Imports
import Link from "next/link";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";

export default function AuthForgotPassword() {
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

    window.location.href = "/otp-verification";
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack mt={4} spacing={2}>
          <CustomFormLabel htmlFor="reset-email">
            Email Adddress
          </CustomFormLabel>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />

          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Forgot Password
          </Button>
          <Button
            color="primary"
            size="large"
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
