"use client";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { Stack } from "@mui/system";
import { useState } from "react";
import { successfulLogIn } from "@/services/auth.service";

const AuthTwoSteps = () => {
  // State to manage OTP values
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  // Handle input change
  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to the next input if a digit is entered
    if (value && index < 5) {
      const nextInput = document.getElementById(
        `code-${index + 1}`
      ) as HTMLInputElement | null;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Handle backspace key
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to the previous input box
      const prevInput = document.getElementById(
        `code-${index - 1}`
      ) as HTMLInputElement | null;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);
  };

  return (
    <>
      <Box mt={4}>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="code">
            Type your 6 digits security code{" "}
          </CustomFormLabel>
          <Stack spacing={2} direction="row">
            {otp.map((digit, index) => (
              <CustomTextField
                key={index}
                id={`code-${index}`}
                variant="outlined"
                fullWidth
                value={digit}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(index, e)
                }
                onPaste={handlePaste}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center" }, // Center the text
                }}
                sx={{
                  "& input": {
                    textAlign: "center", // Ensure text is centered
                    fontSize: "1.5rem", // Optional: Increase font size for better visibility
                  },
                }}
              />
            ))}
          </Stack>
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={() => {
            successfulLogIn();
          }}
        >
          Verify My Account
        </Button>

        <Stack direction="row" spacing={1} mt={3}>
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            Didn&apos;t get the code?
          </Typography>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Resend
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default AuthTwoSteps;
